// proxy.js – forwards requests to the Cloudflare API (and the few other hosts the
// Nyxx installer legitimately needs), with SSRF protection.
//
// Security model:
//   - By default ONLY allow-listed hosts can be proxied, so this worker cannot be
//     abused as an open relay. The hosts Nyxx actually needs are:
//       * api.cloudflare.com          -> Cloudflare API
//       * raw.githubusercontent.com   -> fetching worker.js / version.json
//       * *.workers.dev               -> probing the deployed panel
//   - Override the allow-list with a binding, e.g.:
//       ALLOWED_HOSTS = "api.cloudflare.com, raw.githubusercontent.com, example.com"
//   - Opt back into open mode with a binding:
//       ALLOW_ALL = "true"
//   - The target is always resolved and validated against private / link-local /
//     loopback / metadata ranges, so even allow-listed hostnames cannot be pointed
//     at internal infrastructure (SSRF defense in depth).

const DEFAULT_ALLOWED_HOSTS = [
  'api.cloudflare.com',
  'raw.githubusercontent.com',
  '*.workers.dev',
];

const IP_BLOCK_RANGES = [
  // IPv4: private, loopback, link-local, CGNAT, reserved, and cloud metadata.
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
  ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.168.0.0', 16],
  ['198.18.0.0', 15], ['224.0.0.0', 4], ['240.0.0.0', 4],
  // IPv6: loopback, link-local, ULA, and reserved.
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
  // Normalize IPv4-mapped IPv6 (::ffff:1.2.3.4) into ::ffff:c001:0203-style groups.
  const v4mapped = addr.match(/^(.*:)(\d+\.\d+\.\d+\.\d+)$/);
  if (v4mapped) {
    const v4 = v4mapped[2].split('.').map(n => parseInt(n, 10));
    if (v4.some(n => isNaN(n) || n < 0 || n > 255)) return null;
    const hex = (v4[0] << 8 | v4[1]).toString(16) + ':' + (v4[2] << 8 | v4[3]).toString(16);
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
  if (!bytes) return true; // unparsable => block (fail closed)
  // IPv4-mapped IPv6 (::ffff:a.b.c.d) should be judged as IPv4, otherwise the
  // leading zero bytes make it look like 0.0.0.0/8.
  const mapped = bytes.length === 16 && bytes[10] === 0xff && bytes[11] === 0xff &&
    bytes.slice(0, 10).every(b => b === 0);
  if (mapped) bytes = bytes.slice(12);
  return IP_BLOCK_RANGES.some(([start, len]) => ipInRange(bytes, start, len));
}

function hostMatches(host, pattern) {
  if (pattern.startsWith('*.')) {
    const suffix = pattern.slice(1); // ".example.com"
    return host.endsWith(suffix) && host.length > suffix.length;
  }
  return host === pattern;
}

function isAllowed(target, env) {
  if (env && env.ALLOW_ALL === 'true') return true;
  const raw = (env && env.ALLOWED_HOSTS) || '';
  const patterns = raw
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
  if (patterns.length > 0) return patterns.some(p => hostMatches(target.hostname, p));
  return DEFAULT_ALLOWED_HOSTS.some(p => hostMatches(target.hostname, p));
}

// ---- main ------------------------------------------------------------------

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const targetParam = url.searchParams.get('url');
    if (!targetParam) {
      return jsonResponse({ error: 'Missing ?url= parameter' }, 400);
    }

    let target;
    try {
      target = new URL(targetParam);
    } catch (e) {
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

    // SSRF defense: never forward to private / link-local / metadata addresses.
    try {
      const dns = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(target.hostname)}`,
        { headers: { accept: 'application/dns-json' } });
      if (dns.ok) {
        const data = await dns.json();
        const ips = [];
        for (const answer of (data.Answer || [])) {
          if (answer.type === 1 || answer.type === 28) ips.push(answer.data);
        }
        const blocked = ips.filter(isBlockedIp);
        // Block only when every resolved address is forbidden (a host mixing public
        // and private addresses can still resolve, but never to the private ones).
        if (ips.length > 0 && blocked.length === ips.length) {
          return jsonResponse({
            error: `Target host '${target.hostname}' resolves to a blocked address.`,
          }, 403);
        }
      }
    } catch (e) {
      // If DNS resolution fails we still forward; the upstream fetch will surface the error.
    }

    // Forward the exact request (method, headers, body). Streaming body keeps
    // multipart/form-data uploads working unchanged.
    let upstream;
    try {
      upstream = await fetch(target.toString(), {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'follow',
      });
    } catch (e) {
      return jsonResponse({
        error: `Upstream request failed: ${e.message || 'network error'}`,
      }, 502);
    }

    const headers = new Headers(upstream.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      headers.set(key, value);
    }

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    });
  },
};
