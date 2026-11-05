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


// in the Cloudflare dashboard for the nyxx-proxy worker:

// Go to Workers & Pages → nyxx-proxy → Settings → Bindings.
// Add a D1 database binding:
// Variable name: DB
// Database: create a new D1 database (e.g. nyxx-relay) or reuse an existing one.
// Save and redeploy the proxy.

// The relay tables (relay_oauth_state, relay_oauth_tokens) are created automatically on first use, so you don't need to run migrations manually.

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
    let url;
    try { url = new URL(request.url); } catch (e) {
      return jsonResponse({ error: 'Bad request URL' }, 400);
    }
    
    if (url.pathname === '/oauth/start') return handleRelayOAuthStart(request, env);
    if (url.pathname === '/oauth/callback') return handleRelayOAuthCallback(request, env);
    if (url.pathname === '/oauth/exchange') return handleRelayExchange(request, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
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

// ============================================================================
// CENTRAL OAUTH RELAY
// ============================================================================
// This section turns proxy.js into the single OAuth callback target for all
// Nyxx tenants. Tenant workers redirect here to start the flow, and retrieve
// tokens afterwards via a secure server-to-server exchange.
const RELAY_OAUTH_KEYS = {
  CLIENT_ID: '87f4c44a2c2d4df7af66628871fc7502', // Paste from Cloudflare Dashboard
  AUTH_URL: 'https://dash.cloudflare.com/oauth2/auth',
  TOKEN_URL: 'https://dash.cloudflare.com/oauth2/token',
  SCOPES: ['account-settings.read', 'workers-scripts.edit', 'workers-scripts.admin', 'workers-scripts.content_read', 'd1.write'],
  // The exchange secret prevents arbitrary callers from grabbing tokens.
  // It must match the value used by the tenant worker.
  EXCHANGE_SECRET: 'SECRET_ULTRA_PRO_MAX',
};

// D1 schema for the relay
async function initializeRelayDB(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS relay_oauth_state (
      state TEXT PRIMARY KEY,
      tenant_callback TEXT NOT NULL,
      verifier TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `).run();
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS relay_oauth_tokens (
      exchange_code TEXT PRIMARY KEY,
      access_token TEXT NOT NULL,
      refresh_token TEXT,
      expires_at INTEGER,
      account_id TEXT,
      script_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `).run();
}

function relayJson(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function b64url(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function randomB64url(n) {
  const a = new Uint8Array(n);
  crypto.getRandomValues(a);
  return b64url(a);
}
async function pkceChallenge(verifier) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return b64url(new Uint8Array(d));
}

async function handleRelayOAuthStart(request, env) {
  if (!env.DB) return relayJson({ error: 'DB binding missing on relay.' }, 500);
  await initializeRelayDB(env.DB);
  const url = new URL(request.url);
  const tenantCallback = url.searchParams.get('tenant_callback');
  if (!tenantCallback || !tenantCallback.startsWith('https://')) {
    return relayJson({ error: 'Missing or invalid tenant_callback.' }, 400);
  }
  const verifier = randomB64url(48);
  const state = randomB64url(24);
  const challenge = await pkceChallenge(verifier);

  await env.DB.prepare(
    'INSERT INTO relay_oauth_state (state, tenant_callback, verifier) VALUES (?, ?, ?)'
  ).bind(state, tenantCallback, verifier).run();

  const p = new URLSearchParams({
    response_type: 'code',
    client_id: RELAY_OAUTH_KEYS.CLIENT_ID,
    redirect_uri: new URL(request.url).origin + '/oauth/callback',
    scope: RELAY_OAUTH_KEYS.SCOPES.join(' '),
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });
  return Response.redirect(RELAY_OAUTH_KEYS.AUTH_URL + '?' + p.toString(), 302);
}

async function handleRelayOAuthCallback(request, env) {
  if (!env.DB) return relayJson({ error: 'DB binding missing on relay.' }, 500);
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  if (error) return relayJson({ error: 'Cloudflare denied: ' + error }, 400);
  if (!code || !state) return relayJson({ error: 'Missing code or state.' }, 400);

  const row = await env.DB.prepare('SELECT tenant_callback, verifier FROM relay_oauth_state WHERE state = ?').bind(state).first();
  if (!row) return relayJson({ error: 'Invalid or expired state.' }, 400);
  await env.DB.prepare('DELETE FROM relay_oauth_state WHERE state = ?').bind(state).run();

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: url.origin + '/oauth/callback',
    client_id: RELAY_OAUTH_KEYS.CLIENT_ID,
    code_verifier: row.verifier,
  });

  const tokenRes = await fetch(RELAY_OAUTH_KEYS.TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_token) {
    return relayJson({ error: 'Token exchange failed: ' + (tokenData.error_description || tokenData.error || 'unknown') }, 400);
  }

  // Best-effort discovery of account and script
  let accountId = '', scriptName = '';
  try {
    const accRes = await fetch('https://api.cloudflare.com/client/v4/accounts', {
      headers: { Authorization: 'Bearer ' + tokenData.access_token },
    });
    const accData = await accRes.json();
    if (accData.success && accData.result?.length) {
      accountId = accData.result[0].id;
      const host = new URL(row.tenant_callback).hostname;
      if (host.endsWith('.workers.dev')) {
        const parts = host.split('.');
        if (parts.length >= 3) scriptName = parts[0];
      }
    }
  } catch (e) { /* best effort */ }

  const exchangeCode = randomB64url(24);
  const expiresAt = tokenData.expires_in ? Date.now() + Number(tokenData.expires_in) * 1000 : 0;

  await env.DB.prepare(`
    INSERT INTO relay_oauth_tokens (exchange_code, access_token, refresh_token, expires_at, account_id, script_name)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(exchangeCode, tokenData.access_token, tokenData.refresh_token || null, expiresAt, accountId, scriptName).run();

  return Response.redirect(row.tenant_callback + '?exchange_code=' + exchangeCode, 302);
}

async function handleRelayExchange(request, env) {
  if (!env.DB) return relayJson({ error: 'DB binding missing on relay.' }, 500);
  const auth = request.headers.get('Authorization') || '';
  if (auth !== 'Bearer ' + RELAY_OAUTH_KEYS.EXCHANGE_SECRET) {
    return relayJson({ error: 'Unauthorized.' }, 401);
  }
  const { exchange_code } = await request.json().catch(() => ({}));
  if (!exchange_code) return relayJson({ error: 'Missing exchange_code.' }, 400);

  const row = await env.DB.prepare('SELECT * FROM relay_oauth_tokens WHERE exchange_code = ?').bind(exchange_code).first();
  if (!row) return relayJson({ error: 'Invalid or expired exchange code.' }, 404);
  // Single use
  await env.DB.prepare('DELETE FROM relay_oauth_tokens WHERE exchange_code = ?').bind(exchange_code).run();

  return relayJson({
    access_token: row.access_token,
    refresh_token: row.refresh_token,
    expires_at: row.expires_at,
    account_id: row.account_id,
    script_name: row.script_name,
  });
}