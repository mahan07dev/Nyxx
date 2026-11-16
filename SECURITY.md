# Security notes

## Hosted proxy and OAuth relay (trust)

The installer's "Default proxy" and the dashboard's "Connect Cloudflare" button use a hosted
Cloudflare Worker (`proxy.js`). It forwards your API requests to Cloudflare and, for OAuth, holds
your access token in its D1 database for up to 5 minutes until your own Nyxx worker collects it
(single use, deleted on collection). It does not keep tokens after that, but you are trusting
whoever operates it. If that matters, self-host it (below) or use the API token method.

## Self-hosting the proxy / relay

1. Create a Worker from `proxy.js`.
2. For OAuth: create a D1 database and bind it as `DB` (tables are created automatically).
3. Create your own Cloudflare OAuth client; set its redirect URL to `https://<your-proxy>/oauth/callback`.
4. Variables (all optional): `CF_OAUTH_CLIENT_ID`, `RELAY_ALLOWED_CALLBACKS` (e.g. `*.workers.dev`),
   `ALLOWED_HOSTS` / `ALLOW_ALL` (proxy allow-list). Bind a Rate Limiting namespace as `RATE_LIMITER` to throttle abuse.
   `RELAY_REQUEST_REFRESH=true` makes the relay request `offline_access` so panels stay connected after the
   access token expires. Your OAuth client must allow the `refresh_token` grant (Manage Account → OAuth clients);
   if Cloudflare rejects the scope the relay retries once without it. Off by default.
5. In `worker.js` set `RELAY_BASE` (or the `RELAY_BASE` variable) to your proxy URL, and update
   `DEFAULT_PROXY` / `OAUTH.CLIENT_ID` / `OAUTH.REDIRECT_URI` in `installer.html`.

## How the relay is protected

- No shared secret exists in source. Each login is bound to the Nyxx worker that started it via a
  private verifier (only its SHA-256 is sent to the relay).
- The relay shows a confirmation page naming the host that will receive the sign-in result.
- State and exchange codes are single use (atomic delete), expire server-side, and callbacks must be
  `https://<host>/oauth/callback`.

## Reporting a vulnerability

Open a private security advisory on the GitHub repository, or contact the maintainer directly.
Please do not file public issues for undisclosed vulnerabilities.