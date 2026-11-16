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
//
// Resilience
// ----------
// The entire handler is wrapped in a top-level try/catch so that *every* error
// response (including unexpected exceptions) carries CORS headers. Without
// this, an unhandled throw produces a 500 with no Access-Control-Allow-Origin
// and the browser reports a "CORS error" that hides the real cause.
//
// Setup (Cloudflare dashboard → Workers & Pages → <this worker> → Settings → Bindings)
// -----------------------------------------------------------------------------------
// The OAuth relay endpoints (/oauth/start, /oauth/continue, /oauth/callback,
// /oauth/exchange) need a D1 binding named DB. Create a D1 database (e.g.
// nyxx-relay) and bind it as DB. Relay tables are created automatically on
// first use — no migrations needed.
//
// Optional: bind a Workers Rate Limiting namespace as RATE_LIMITER to throttle
// abuse per client IP (every route, fails open). See the relay section below
// for the other optional variables.

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
  // Never forward browser cookies to the upstream. The proxy authenticates
  // with a Bearer token; a stray CF session cookie would at best confuse the
  // upstream and at worst authenticate the wrong session. ACAO:* should mean
  // the browser doesn't send cookies, but a same-origin caller can.
  'cookie',
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
  'set-cookie',       // never let an upstream set cookies on the proxy origin
  'content-encoding', // body is delivered decoded by the runtime
  'content-length',   // recomputed by the runtime
]);

// Give slow uploads (worker.js deploy) plenty of headroom.
const UPSTREAM_TIMEOUT_MS = 60000;
// Hard cap so a huge body can't OOM the worker (which would bypass try/catch).
const MAX_BODY_BYTES = 25 * 1024 * 1024;

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

function errorResponse(message, status) {
  return jsonResponse({ success: false, error: message }, status || 500);
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
  // Never compare an IPv4 address against an IPv6 range (or vice versa):
  // byte 0 of a v4-in-v6 address like ::2 is 0x00 and would otherwise
  // match the first byte of 0.0.0.0/8, blocking/allow-listing the wrong
  // family. The mapped-IPv4 case is already sliced down to 4 bytes in
  // isBlockedIp() before reaching here, so this is a straight family
  // mismatch guard.
  if (ipBytes.length !== rangeBytes.length) return false;
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
    // Query A and AAAA in parallel. The DoH JSON endpoint returns only the
    // requested type, so a single type=A query can miss an IPv6-only
    // hostname whose only answer is e.g. fc00:: — i.e. a silent SSRF
    // bypass.
    const q = (type) => fetch(
      'https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(hostname) + '&type=' + type,
      { headers: { accept: 'application/dns-json' } }
    ).catch(() => null);
    const [aResp, aaaaResp] = await Promise.all([q('A'), q('AAAA')]);
    const ips = [];
    for (const resp of [aResp, aaaaResp]) {
      if (!resp || !resp.ok) continue;
      const data = await resp.json().catch(() => null);
      const answers = (data && data.Answer) || [];
      for (const a of answers) {
        if ((a.type === 1 || a.type === 28) && typeof a.data === 'string') ips.push(a.data);
      }
    }
    if (ips.length > 0) {
      // some(), not every(): any single private answer blocks. A hostname
      // with mixed public/private records could be used for a rebinding
      // race, and every() would let it through the first time.
      result = { known: true, blocked: ips.some(isBlockedIp) };
    }
  } catch (e) {
    // DNS lookup failed: leave as unknown and let the upstream fetch surface it.
  }
  // Only cache definite answers. Caching a transient DoH failure would
  // pin an allow decision for DNS_TTL_MS.
  if (result.known) dnsCache.set(hostname, { result, ts: now });
  return result;
}

// ---- main ------------------------------------------------------------------

export default {
  async fetch(request, env) {
    // CRITICAL: never let an exception escape without CORS headers, otherwise
    // the browser reports a "CORS error" that hides the real failure (e.g. a
    // ReferenceError inside the handler). This wrapper guarantees that every
    // path — success or failure — produces a CORS-visible response.
    try {
      return await handleRequest(request, env || {});
    } catch (e) {
      return errorResponse('Proxy error: ' + ((e && e.message) || 'unknown error'), 500);
    }
  },
};

async function handleRequest(request, env) {
  let url;
  try { url = new URL(request.url); } catch (e) {
    return errorResponse('Bad request URL', 400);
  }

  // Preflight — always answer, always with CORS.
  if (request.method === 'OPTIONS') {
    const headers = new Headers(CORS_HEADERS);
    // '*' does not cover Authorization in browsers, so echo what was requested.
    const reqHeaders = request.headers.get('Access-Control-Request-Headers');
    if (reqHeaders) {
      headers.set('Access-Control-Allow-Headers', reqHeaders);
      headers.append('Vary', 'Access-Control-Request-Headers');
    }
    return new Response(null, { status: 204, headers });
  }

  // Optional abuse protection (RATE_LIMITER binding). Fails open.
  if (env.RATE_LIMITER && typeof env.RATE_LIMITER.limit === 'function') {
    try {
      const { success } = await env.RATE_LIMITER.limit({ key: request.headers.get('cf-connecting-ip') || 'anon' });
      if (!success) return errorResponse('Rate limit exceeded. Try again shortly.', 429);
    } catch (e) { /* ignore limiter failures */ }
  }

  // OAuth relay routes.
  if (url.pathname === '/oauth/start')    return handleRelayOAuthStart(request, env);
  if (url.pathname === '/oauth/continue') return handleRelayOAuthContinue(request, env);
  if (url.pathname === '/oauth/callback') return handleRelayOAuthCallback(request, env);
  if (url.pathname === '/oauth/exchange') return handleRelayExchange(request, env);

  // ---- CORS forwarding proxy ----
  const targetParam = url.searchParams.get('url');
  if (!targetParam) return errorResponse('Missing ?url= parameter', 400);

  let target;
  try { target = new URL(targetParam); } catch (e) {
    return errorResponse('Invalid ?url= parameter', 400);
  }

  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return errorResponse('Only http/https targets are allowed', 400);
  }

  if (!isAllowed(target, env)) {
    return errorResponse(`Target host '${target.hostname}' is not in the proxy allow-list.`, 403);
  }

  // SSRF defense-in-depth.
  if (isIpLiteral(target.hostname)) {
    const bare = target.hostname.replace(/^\[|\]$/g, '');
    if (isBlockedIp(bare)) {
      return errorResponse(`Target host '${target.hostname}' is a blocked address.`, 403);
    }
  } else {
    const check = await resolvesToBlockedAddress(target.hostname);
    if (check.known && check.blocked) {
      return errorResponse(`Target host '${target.hostname}' resolves to a blocked address.`, 403);
    }
  }

  const method = request.method.toUpperCase();
  const hasBody = method !== 'GET' && method !== 'HEAD';

  // Size guard — prevents an OOM abort (which would bypass the top-level catch
  // and manifest as a CORS error in the browser).
  if (hasBody) {
    const declaredLength = parseInt(request.headers.get('content-length') || '0', 10);
    if (declaredLength > MAX_BODY_BYTES) {
      return errorResponse(
        `Request body too large (${declaredLength} bytes, max ${MAX_BODY_BYTES}).`,
        413
      );
    }
  }

  // Buffer the body into an ArrayBuffer. DO NOT stream request.body here:
  // in the Workers runtime, passing a ReadableStream body together with the
  // rebuilt headers silently drops `Authorization` on PUT/POST requests.
  let bodyBuffer = null;
  if (hasBody) {
    try {
      bodyBuffer = await request.arrayBuffer();
    } catch (e) {
      return errorResponse('Failed to read request body', 400);
    }
    if (bodyBuffer.byteLength > MAX_BODY_BYTES) {
      return errorResponse(
        `Request body too large (${bodyBuffer.byteLength} bytes, max ${MAX_BODY_BYTES}).`,
        413
      );
    }
  }

  // Rebuild request headers from scratch.
  const fwdHeaders = new Headers();
  for (const [k, v] of request.headers) {
    if (!DROP_REQUEST_HEADERS.has(k.toLowerCase())) fwdHeaders.set(k, v);
  }
  // Belt-and-braces: never lose Authorization.
  const auth = request.headers.get('authorization');
  if (auth) fwdHeaders.set('Authorization', auth);

  // redirect:'manual' — never follow upstream redirects inside the worker.
  // A server-side follow bypasses the SSRF allow-list: an allow-listed host
  // could 302 to 169.254.169.254 and Workers would fetch it. With 'manual'
  // the 3xx is returned to the browser (with CORS), and the browser's own
  // CORS + Private Network Access protections apply to the target. The
  // worker never issues a second request.
  const init = { method, headers: fwdHeaders, redirect: 'manual' };
  if (bodyBuffer !== null) init.body = bodyBuffer;

  // Abort hung upstream requests so the browser's fetch never silently dies.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  init.signal = controller.signal;

  let upstream;
  try {
    upstream = await fetch(target.toString(), init);
  } catch (e) {
    clearTimeout(timer);
    if (e && e.name === 'AbortError') {
      return errorResponse(`Upstream request timed out after ${UPSTREAM_TIMEOUT_MS}ms.`, 504);
    }
    return errorResponse(`Upstream request failed: ${(e && e.message) || 'network error'}`, 502);
  }
  clearTimeout(timer);

  // Rebuild response headers, dropping framing/encoding headers the runtime
  // would otherwise duplicate, then layer on CORS.
  const outHeaders = new Headers();
  for (const [k, v] of upstream.headers) {
    if (!DROP_RESPONSE_HEADERS.has(k.toLowerCase())) outHeaders.set(k, v);
  }
  for (const [k, v] of Object.entries(CORS_HEADERS)) outHeaders.set(k, v);
  outHeaders.set('X-Content-Type-Options', 'nosniff');
  // If a proxied page is ever opened directly, it must not run script on this origin.
  outHeaders.set('Content-Security-Policy', "sandbox; default-src 'none'");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: outHeaders,
  });
}

// ============================================================================
// CENTRAL OAUTH RELAY
// ============================================================================
// This section turns proxy.js into the single OAuth callback target for all
// Nyxx tenants. Tenant workers redirect here to start the flow, and retrieve
// tokens afterwards via a secure server-to-server exchange.
// There is NO shared secret between relay and tenants. This repo is public, so
// any secret compiled into it would be public too. Instead:
//   1. Each login is bound to the tenant that started it (PKCE-style). The tenant
//      keeps a random verifier private and sends only SHA-256(verifier) to
//      /oauth/start. /oauth/exchange releases tokens only for a matching verifier.
//   2. /oauth/start shows a confirmation page naming the host that will receive
//      the sign-in result, so a link sent by an attacker cannot silently
//      deliver a victim's tokens elsewhere.
//   3. All single-use records are consumed atomically (DELETE ... RETURNING) and
//      expire server-side: state 10 min, exchange code 5 min.
//
// Optional variables (Settings → Variables):
//   CF_OAUTH_CLIENT_ID       OAuth client ID (public). Defaults to the one below.
//   RELAY_ALLOWED_CALLBACKS  Comma-separated hostnames/patterns allowed as tenant
//                            callbacks, e.g. "*.workers.dev,panel.example.com".
//                            Unset = any https host (the confirmation page still applies).
const RELAY_OAUTH_KEYS = {
  AUTH_URL: 'https://dash.cloudflare.com/oauth2/auth',
  TOKEN_URL: 'https://dash.cloudflare.com/oauth2/token',
  SCOPES: [
    'account-settings.read',
    'workers-scripts.edit',
    'workers-scripts.admin',
    'workers-scripts.content_read',
    'd1.write',
  ],
  CLIENT_ID_FALLBACK: '87f4c44a2c2d4df7af66628871fc7502',
};
const RELAY_STATE_TTL_MS = 10 * 60 * 1000;
const RELAY_CODE_TTL_MS = 5 * 60 * 1000;
// Upper bound on unfinished logins so /oauth/start cannot be used to fill D1.
const RELAY_MAX_PENDING = 2000;

function relayClientId(env) {
  return (env && env.CF_OAUTH_CLIENT_ID) || RELAY_OAUTH_KEYS.CLIENT_ID_FALLBACK;
}

// Returns the normalized callback URL, or null if it is not acceptable.
function validTenantCallback(raw, env) {
  let u;
  try { u = new URL(raw); } catch (e) { return null; }
  if (u.protocol !== 'https:' || u.username || u.password || u.port || u.search || u.hash) return null;
  if (u.pathname !== '/oauth/callback') return null;
  const allow = ((env && env.RELAY_ALLOWED_CALLBACKS) || '')
    .split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  if (allow.length && !allow.some(p => hostMatches(u.hostname.toLowerCase(), p))) return null;
  return u.origin + u.pathname;
}

// D1 schema for the relay. DDL runs once per isolate; GC runs on every start.
let relayDbReady = false;
async function initializeRelayDB(db) {
  if (!relayDbReady) {
    await db.batch([
      db.prepare(`CREATE TABLE IF NOT EXISTS relay_state_v2 (
        state TEXT PRIMARY KEY,
        tenant_callback TEXT NOT NULL,
        tenant_challenge TEXT NOT NULL,
        verifier TEXT NOT NULL,
        created_at INTEGER NOT NULL
      )`),
      db.prepare(`CREATE TABLE IF NOT EXISTS relay_tokens_v2 (
        exchange_code TEXT PRIMARY KEY,
        tenant_challenge TEXT NOT NULL,
        access_token TEXT NOT NULL,
        refresh_token TEXT,
        expires_at INTEGER,
        account_id TEXT,
        script_name TEXT,
        created_at INTEGER NOT NULL
      )`),
      // Legacy tables have no tenant binding and may still hold live tokens.
      db.prepare('DROP TABLE IF EXISTS relay_oauth_state'),
      db.prepare('DROP TABLE IF EXISTS relay_oauth_tokens'),
    ]);
    relayDbReady = true;
  }
  try {
    const now = Date.now();
    await db.batch([
      db.prepare('DELETE FROM relay_state_v2 WHERE created_at < ?').bind(now - RELAY_STATE_TTL_MS),
      db.prepare('DELETE FROM relay_tokens_v2 WHERE created_at < ?').bind(now - RELAY_CODE_TTL_MS),
    ]);
  } catch (e) { /* best-effort GC */ }
}

function relayJson(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      // /oauth/exchange returns access tokens, so never let anything cache them.
      'Cache-Control': 'no-store',
      ...CORS_HEADERS,
    },
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Browser-facing page. Callers must escape any dynamic value they put in bodyHtml.
function relayPage(title, bodyHtml, status = 200) {
  const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">' +
    '<title>' + escapeHtml(title) + '</title><style>' +
    ':root{color-scheme:light dark}' +
    'body{font:16px/1.5 system-ui,sans-serif;max-width:30rem;margin:12vh auto;padding:0 1.25rem}' +
    'h1{font-size:1.3rem}code{padding:.15em .4em;border-radius:4px;background:rgba(127,127,127,.2);word-break:break-all}' +
    '.btn{display:inline-block;margin-top:1rem;padding:.65rem 1.2rem;border-radius:8px;background:#2563eb;color:#fff;text-decoration:none;font-weight:600}' +
    '</style></head><body>' + bodyHtml + '</body></html>';
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'no-referrer',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
    },
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

// Best-effort: find the account that owns the tenant's worker. With several
// accounts, probe each for the script (same endpoint the updater uses).
async function discoverRelayAccount(accessToken, tenantCallback) {
  let accountId = '', scriptName = '';
  try {
    const host = new URL(tenantCallback).hostname;
    if (host.endsWith('.workers.dev')) {
      const parts = host.split('.');
      if (parts.length >= 3) scriptName = parts[0];
    }
    const auth = { Authorization: 'Bearer ' + accessToken };
    const accRes = await fetch('https://api.cloudflare.com/client/v4/accounts?per_page=50', { headers: auth });
    const accData = await accRes.json();
    const accounts = (accData && accData.success && accData.result) || [];
    if (accounts.length) {
      accountId = accounts[0].id;
      if (accounts.length > 1 && scriptName) {
        const hits = await Promise.all(accounts.slice(0, 10).map(a =>
          fetch('https://api.cloudflare.com/client/v4/accounts/' + a.id + '/workers/scripts/' + encodeURIComponent(scriptName) + '/settings', { headers: auth })
            .then(r => (r.ok ? a.id : null)).catch(() => null)));
        accountId = hits.find(Boolean) || accountId;
      }
    }
  } catch (e) { /* best effort */ }
  return { accountId, scriptName };
}

async function handleRelayOAuthStart(request, env) {
  if (request.method !== 'GET') return relayJson({ error: 'Method not allowed.' }, 405);
  if (!env.DB) return relayJson({ error: 'DB binding missing on relay.' }, 500);
  const url = new URL(request.url);
  const tenantCallback = validTenantCallback(url.searchParams.get('tenant_callback') || '', env);
  if (!tenantCallback) return relayJson({ error: 'Missing or invalid tenant_callback.' }, 400);
  const tenantChallenge = url.searchParams.get('tenant_challenge') || '';
  if (!/^[A-Za-z0-9_-]{43}$/.test(tenantChallenge)) {
    return relayJson({ error: 'Missing or invalid tenant_challenge. Update your Nyxx worker.' }, 400);
  }
  await initializeRelayDB(env.DB);

  const pending = await env.DB.prepare('SELECT COUNT(*) AS n FROM relay_state_v2').first();
  if (pending && pending.n >= RELAY_MAX_PENDING) {
    return relayPage('Try again later', '<h1>Too many sign-ins in progress</h1><p>Please try again in a few minutes.</p>', 429);
  }

  const verifier = randomB64url(48);
  const state = randomB64url(24);
  await env.DB.prepare(
    'INSERT INTO relay_state_v2 (state, tenant_callback, tenant_challenge, verifier, created_at) VALUES (?, ?, ?, ?, ?)'
  ).bind(state, tenantCallback, tenantChallenge, verifier, Date.now()).run();

  const host = new URL(tenantCallback).host;
  return relayPage('Connect Cloudflare to Nyxx',
    '<h1>Connect your Cloudflare account to Nyxx?</h1>' +
    '<p>Nyxx will be able to manage Workers and D1 databases on your Cloudflare account, and the sign-in result will be sent to:</p>' +
    '<p><code>' + escapeHtml(host) + '</code></p>' +
    '<p>Continue only if you started this from your own Nyxx dashboard at that address. If someone sent you this link, close this tab.</p>' +
    '<a class="btn" href="/oauth/continue?state=' + encodeURIComponent(state) + '">Continue to Cloudflare</a>');
}

async function handleRelayOAuthContinue(request, env) {
  if (request.method !== 'GET') return relayJson({ error: 'Method not allowed.' }, 405);
  if (!env.DB) return relayJson({ error: 'DB binding missing on relay.' }, 500);
  const url = new URL(request.url);
  const state = url.searchParams.get('state') || '';
  const row = /^[A-Za-z0-9_-]{20,64}$/.test(state)
    ? await env.DB.prepare('SELECT verifier FROM relay_state_v2 WHERE state = ? AND created_at > ?')
        .bind(state, Date.now() - RELAY_STATE_TTL_MS).first()
    : null;
  if (!row) {
    return relayPage('Link expired',
      '<h1>This sign-in link expired</h1><p>Go back to your Nyxx dashboard and click <b>Connect Cloudflare</b> again.</p>', 400);
  }
  const p = new URLSearchParams({
    response_type: 'code',
    client_id: relayClientId(env),
    redirect_uri: url.origin + '/oauth/callback',
    scope: RELAY_OAUTH_KEYS.SCOPES.join(' '),
    state,
    code_challenge: await pkceChallenge(row.verifier),
    code_challenge_method: 'S256',
  });
  return Response.redirect(RELAY_OAUTH_KEYS.AUTH_URL + '?' + p.toString(), 302);
}

async function handleRelayOAuthCallback(request, env) {
  if (request.method !== 'GET') return relayJson({ error: 'Method not allowed.' }, 405);
  if (!env.DB) return relayJson({ error: 'DB binding missing on relay.' }, 500);
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  if (error) {
    return relayPage('Sign-in cancelled',
      '<h1>Sign-in was not completed</h1><p>Cloudflare reported: <code>' + escapeHtml(error) + '</code></p><p>Go back to your Nyxx dashboard to try again.</p>', 400);
  }
  if (!code || !state) return relayPage('Invalid request', '<h1>Missing code or state</h1>', 400);

  // Atomic single-use: only one request can ever consume a given state.
  const { results } = await env.DB.prepare(
    'DELETE FROM relay_state_v2 WHERE state = ? AND created_at > ? RETURNING tenant_callback, tenant_challenge, verifier'
  ).bind(state, Date.now() - RELAY_STATE_TTL_MS).all();
  const row = results && results[0];
  if (!row) {
    return relayPage('Link expired',
      '<h1>This sign-in link expired or was already used</h1><p>Go back to your Nyxx dashboard and click <b>Connect Cloudflare</b> again.</p>', 400);
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: url.origin + '/oauth/callback',
    client_id: relayClientId(env),
    code_verifier: row.verifier,
  });
  const tokenRes = await fetch(RELAY_OAUTH_KEYS.TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  const tokenData = await tokenRes.json().catch(() => ({}));
  if (!tokenRes.ok || !tokenData.access_token) {
    return relayPage('Sign-in failed',
      '<h1>Cloudflare sign-in failed</h1><p><code>' + escapeHtml(tokenData.error_description || tokenData.error || 'unknown error') + '</code></p><p>Go back to your Nyxx dashboard to try again.</p>', 400);
  }

  const { accountId, scriptName } = await discoverRelayAccount(tokenData.access_token, row.tenant_callback);

  const exchangeCode = randomB64url(24);
  const expiresAt = tokenData.expires_in ? Date.now() + Number(tokenData.expires_in) * 1000 : 0;
  await env.DB.prepare(`
    INSERT INTO relay_tokens_v2 (exchange_code, tenant_challenge, access_token, refresh_token, expires_at, account_id, script_name, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(exchangeCode, row.tenant_challenge, tokenData.access_token, tokenData.refresh_token || null, expiresAt, accountId, scriptName, Date.now()).run();

  return Response.redirect(row.tenant_callback + '?exchange_code=' + exchangeCode, 302);
}

async function handleRelayExchange(request, env) {
  if (request.method !== 'POST') return relayJson({ error: 'Method not allowed.' }, 405);
  if (!env.DB) return relayJson({ error: 'DB binding missing on relay.' }, 500);
  const { exchange_code, tenant_verifier } = await request.json().catch(() => ({}));
  if (typeof exchange_code !== 'string' || !exchange_code ||
      typeof tenant_verifier !== 'string' || !/^[A-Za-z0-9_-]{43,128}$/.test(tenant_verifier)) {
    return relayJson({ error: 'Missing exchange_code or tenant_verifier.' }, 400);
  }
  const challenge = await pkceChallenge(tenant_verifier);

  // Atomic single-use: the row is deleted only if code, verifier hash and TTL
  // all match. A wrong verifier matches nothing and reveals nothing.
  const { results } = await env.DB.prepare(
    'DELETE FROM relay_tokens_v2 WHERE exchange_code = ? AND tenant_challenge = ? AND created_at > ? ' +
    'RETURNING access_token, refresh_token, expires_at, account_id, script_name'
  ).bind(exchange_code, challenge, Date.now() - RELAY_CODE_TTL_MS).all();
  const row = results && results[0];
  if (!row) return relayJson({ error: 'Invalid or expired exchange code.' }, 404);

  return relayJson({
    access_token: row.access_token,
    refresh_token: row.refresh_token,
    expires_at: row.expires_at,
    account_id: row.account_id,
    script_name: row.script_name,
  });
}