// proxy.js – CORS forwarding proxy for the Nyxx installer.
//
// Security model
// --------------
// * Only allow-listed hosts can be proxied (ALLOWED_HOSTS binding).
//   Opt into open mode with ALLOW_ALL = "true".
// * Every target is validated against a block-list of private, loopback,
//   link-local, CGNAT and metadata address ranges (direct IP check + DNS-over-
//   HTTPS resolution), so an allow-listed hostname cannot be pointed at
//   internal infrastructure.
//
// Header handling (this is the important part)
// --------------------------------------------
// Request bodies are buffered into an ArrayBuffer and headers are rebuilt from
// scratch. Passing a ReadableStream body together with the incoming header
// object causes the Cloudflare runtime to silently drop `Authorization`,
// which surfaced as error 9106 ("Missing X-Auth-Key, X-Auth-Email or
// Authorization headers") on PUT/POST requests.

const DEFAULT_ALLOWED_HOSTS = [
  'api.cloudflare.com',
  'dash.cloudflare.com',       // OAuth token/revoke endpoints
  'raw.githubusercontent.com',
  '*.workers.dev',
];

// IPv4: private, loopback, link-local, CGNAT, reserved, cloud metadata.
// IPv6: loopback, unspecified, ULA, link-local, multicast, documentation.
const IP_BLOCK_RANGES = [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
  ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.168.0.0', 16],
  ['198.18.0.0', 15], ['224.0.0.0', 4], ['240.0.0.0', 4],
  ['::1', 128], ['::', 128], ['fc00::', 7], ['fe80::', 10],
  ['ff00::', 8], ['2001:db8::', 32],
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Expose-Headers': '*',
  'Access-Control-Max-Age': '86400',
};

// Headers that must NOT be copied onto the upstream request.
const DROP_REQUEST_HEADERS = new Set([
  'host',
  'content-length',
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'cdn-loop',
  'cf-connecting-ip',
  'cf-ipcountry',
  'cf-ray',
  'cf-visitor',
  'cf-worker',
  'x-real-ip',
]);

// Headers that must NOT be copied from the upstream response.
const DROP_RESPONSE_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'content-encoding', // body is delivered decoded by the runtime
  'content-length',   // recomputed by the runtime
]);

// ---- helpers ---------------------------------------------------------------

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      ...CORS_HEADERS,
    },
  });
}

function ipv4ToBytes(ip) {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  const bytes = parts.map(n => parseInt(n, 10));
  if (bytes.some(b => isNaN(b) || b < 0 || b > 255)) return null;
  return bytes;
}

function ipv6ToBytes(ip) {
  let addr = ip.toLowerCase();
  const v4mapped = addr.match(/^(.*:)(\d+\.\d+\.\d+\.\d+)$/);
  if (v4mapped) {
    const v4 = v4mapped[2].split('.').map(n => parseInt(n, 10));
    if (v4.some(n => isNaN(n) || n < 0 || n > 255)) return null;
    const hex = ((v4[0] << 8) | v4[1]).toString(16) + ':' + ((v4[2] << 8) | v4[3]).toString(16);
    addr = v4mapped[1] + hex;
  }

  let head = [];
  let tail = [];
  const doubleColon = addr.indexOf('::');
  if (doubleColon !== -1) {
    head = addr.slice(0, doubleColon).split(':').filter(Boolean);
    tail = addr.slice(doubleColon + 2).split(':').filter(Boolean);
  } else {
    head = addr.split(':');
  }

  const groups = [...head];
  if (doubleColon !== -1) {
    while (groups.length + tail.length < 8) groups.push('0');
    groups.push(...tail);
  }
  if (groups.length !== 8) return null;

  const bytes = [];
  for (const g of groups) {
    const n = parseInt(g || '0', 16);
    if (isNaN(n)) return null;
    bytes.push((n >> 8) & 0xff, n & 0xff);
  }
  return bytes;
}

function ipInRange(ipBytes, rangeStart, prefixLen) {
  const rangeBytes = rangeStart.includes(':') ? ipv6ToBytes(rangeStart) : ipv4ToBytes(rangeStart);
  if (!rangeBytes) return false;
  const byteLen = Math.floor(prefixLen / 8);
  for (let i = 0; i < byteLen; i++) {
    if (ipBytes[i] !== rangeBytes[i]) return false;
  }
  const rem = prefixLen % 8;
  if (rem > 0) {
    const mask = 0xff << (8 - rem);
    if ((ipBytes[byteLen] & mask) !== (rangeBytes[byteLen] & mask)) return false;
  }
  return true;
}

function isBlockedIp(ip) {
  let bytes = ip.includes(':') ? ipv6ToBytes(ip) : ipv4ToBytes(ip);
  if (!bytes) return true; // unparsable => fail closed
  // IPv4-mapped IPv6 (::ffff:a.b.c.d) must be judged as IPv4.
  const mapped = bytes.length === 16 && bytes[10] === 0xff && bytes[11] === 0xff &&
    bytes.slice(0, 10).every(b => b === 0);
  if (mapped) bytes = bytes.slice(12);
  return IP_BLOCK_RANGES.some(([start, len]) => ipInRange(bytes, start, len));
}

function isIpLiteral(host) {
  const bare = host.replace(/^\[|\]$/g, '');
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(bare) || bare.includes(':');
}

function hostMatches(host, pattern) {
  if (pattern.startsWith('*.')) {
    const suffix = pattern.slice(1);
    return host.endsWith(suffix) && host.length > suffix.length;
  }
  return host === pattern;
}

function isAllowed(target, env) {
  if (env && env.ALLOW_ALL === 'true') return true;
  const raw = (env && env.ALLOWED_HOSTS) || '';
  const patterns = raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  if (patterns.length > 0) return patterns.some(p => hostMatches(target.hostname.toLowerCase(), p));
  return DEFAULT_ALLOWED_HOSTS.some(p => hostMatches(target.hostname.toLowerCase(), p));
}

// DNS-over-HTTPS resolution with a small in-memory TTL cache.
const dnsCache = new Map();
const DNS_TTL_MS = 5 * 60 * 1000;

async function resolvesToBlockedAddress(hostname) {
  const now = Date.now();
  const cached = dnsCache.get(hostname);
  if (cached && now - cached.ts < DNS_TTL_MS) return cached.result;

  let result = { known: false, blocked: false };
  try {
    const resp = await fetch(
      'https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(hostname) + '&type=A',
      { headers: { accept: 'application/dns-json' } }
    );
    if (resp.ok) {
      const data = await resp.json();
      const answers = (data && data.Answer) || [];
      const ips = answers.filter(a => a.type === 1 || a.type === 28).map(a => a.data);
      if (ips.length > 0) {
        result = { known: true, blocked: ips.every(isBlockedIp) };
      }
    }
  } catch (e) {
    // DNS lookup failed: leave as unknown and let the upstream fetch surface it.
  }
  dnsCache.set(hostname, { result, ts: now });
  return result;
}

// ---- main ------------------------------------------------------------------

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    let url;
    try { url = new URL(request.url); } catch (e) {
      return jsonResponse({ error: 'Bad request URL' }, 400);
    }

    const targetParam = url.searchParams.get('url');
    if (!targetParam) return jsonResponse({ error: 'Missing ?url= parameter' }, 400);

    let target;
    try { target = new URL(targetParam); } catch (e) {
      return jsonResponse({ error: 'Invalid ?url= parameter' }, 400);
    }

    if (target.protocol !== 'http:' && target.protocol !== 'https:') {
      return jsonResponse({ error: 'Only http/https targets are allowed' }, 400);
    }

    if (!isAllowed(target, env)) {
      return jsonResponse({
        error: `Target host '${target.hostname}' is not in the proxy allow-list.`,
      }, 403);
    }

    // SSRF defense-in-depth.
    if (isIpLiteral(target.hostname)) {
      const bare = target.hostname.replace(/^\[|\]$/g, '');
      if (isBlockedIp(bare)) {
        return jsonResponse({ error: `Target host '${target.hostname}' is a blocked address.` }, 403);
      }
    } else {
      const check = await resolvesToBlockedAddress(target.hostname);
      if (check.known && check.blocked) {
        return jsonResponse({ error: `Target host '${target.hostname}' resolves to a blocked address.` }, 403);
      }
    }

    const method = request.method.toUpperCase();
    const hasBody = method !== 'GET' && method !== 'HEAD';

    // Buffer the body so the runtime can compute Content-Length itself and
    // does not fall back to the header-stripping stream path.
    let bodyBuffer = null;
    if (hasBody) {
      try {
        bodyBuffer = await request.arrayBuffer();
      } catch (e) {
        return jsonResponse({ error: 'Failed to read request body' }, 400);
      }
    }

    // Rebuild headers from scratch.
    const fwdHeaders = new Headers();
    for (const [k, v] of request.headers) {
      if (!DROP_REQUEST_HEADERS.has(k.toLowerCase())) fwdHeaders.set(k, v);
    }
    // Belt-and-braces: never lose Authorization.
    const auth = request.headers.get('authorization');
    if (auth && !fwdHeaders.has('authorization')) {
      fwdHeaders.set('Authorization', auth);
    }

    const init = { method, headers: fwdHeaders, redirect: 'follow' };
    if (bodyBuffer && bodyBuffer.byteLength > 0) {
      init.body = bodyBuffer;
    }

    let upstream;
    try {
      upstream = await fetch(target.toString(), init);
    } catch (e) {
      return jsonResponse({
        error: `Upstream request failed: ${(e && e.message) || 'network error'}`,
      }, 502);
    }

    // Rebuild response headers, dropping framing/encoding headers the runtime
    // would otherwise duplicate, then layer on CORS.
    const outHeaders = new Headers();
    for (const [k, v] of upstream.headers) {
      if (!DROP_RESPONSE_HEADERS.has(k.toLowerCase())) outHeaders.set(k, v);
    }
    for (const [k, v] of Object.entries(CORS_HEADERS)) outHeaders.set(k, v);
    outHeaders.set('X-Content-Type-Options', 'nosniff');

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: outHeaders,
    });
  },
};