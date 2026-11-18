# Nyxx

**A self-hosted Telegram bot builder for Cloudflare Workers — dashboard, AI assistant, and MCP server included.**

[🚀 One-Click Installer](https://mahan07dev.github.io/Nyxx/installer) · [Releases](https://github.com/Mahan07dev/Nyxx/releases) · [Telegram](https://t.me/nyxx_official_channel)

<img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white">
<img src="https://img.shields.io/badge/Cloudflare-D1-F38020?logo=cloudflare&logoColor=white">
<img src="https://img.shields.io/badge/Telegram-Bot_API-26A5E4?logo=telegram&logoColor=white">
<img src="https://img.shields.io/badge/MCP-Model_Context_Protocol-black">
<img src="https://img.shields.io/badge/License-MIT-green">
<a href="https://deepwiki.com/mahan07dev/Nyxx"><img src="https://img.shields.io/badge/Ask-DeepWiki-blue?logo=readthedocs" alt="Ask DeepWiki"></a>

---

## Quick Start

The fastest way to install Nyxx is the automated installer — no CLI, no wrangler, no manual setup:

### 👉 https://mahan07dev.github.io/Nyxx/installer

The wizard creates the Worker, creates and binds the D1 database, uploads the latest code, and gives you your dashboard URL. It also handles updates and deletion of existing panels.

---

## Features

**Bot engine**
- Nested commands with folders and breadcrumbs
- **Multi-argument commands** — create `/start`, `/start fa`, and `/start fa game` side by side; Nyxx resolves the longest match and passes trailing text into `{{args}}` / `{{arg1}}`
- **Session-scoped nested navigation** — reply keyboard buttons and Back actions resolve against the user's active command chain, preventing cross-talk between multilingual folders
- Nine reply types: text, photo, video, animation, voice, audio, document, round video, sticker
- **Multi-media attachments** — attach up to 10 compatible documents, photos, videos, or audio files per message using smart `sendMediaGroup` batching
- **Media upload** through the dashboard (stored on Telegram via `file_id`) or direct URLs
- **Command arguments** — `{{args}}`, `{{arg1}}`, `{{arg2}}`, … insert the user's input into replies (HTML-escaped)
- Inline and reply keyboards built visually with **full row & layout control** — add buttons to specific rows, move buttons left/right or up/down, and apply **per-button colors** (Default, Blue, Green, Red) with live previews
- Telegram menu commands and custom featured commands (DM / Buttons / MCP)
- Featured Buttons commands support `[blue]` / `[green]` / `[red]` label prefixes and a default button color
- Per-command access levels: everyone, moderator+, admin only, or **specific users** with expiration dates

**Channels & Creator Studio** (new in v4.9.6)
- **Channels Tab** — auto-discovers channels when the bot is promoted or receives posts; manual connect via `@username` or `-100…` ID
- **Channel Post Composer & History** — publish rich HTML posts, multi-media albums, inline buttons, silent posts, and `protect_content` posts directly from the dashboard, with Edit, Pin, and Delete controls
- **Channel Automation Rules** — auto-signature/footer on new posts, auto-attach inline buttons, auto-capture media into your Media Library, auto-pin new posts, and one-click use as Media Storage Channel
- **Protect Content** (`protect_content`) — prevent forwarding and saving on commands, DMs, channel posts, group announcements, and broadcasts

**Media Library & access control** (overhauled in v4.9.5)
- **Infinite Telegram archiving** — use a Channel, Group, or your own DM as storage; uploaded files stay archived indefinitely (the "delete after upload" switch now defaults to OFF)
- **2 GB auto-capture** — post media (up to 2 GB) into your storage channel or send it to the bot as an admin, and Nyxx automatically saves the `file_id`, filename, size, and caption to the library, bypassing the standard 45 MB Bot API upload limit
- **Direct multi-file upload** — drag-and-drop or select multiple files at once from the Media tab (up to 45 MB via web upload)
- **User-based access control & expirations** — restrict commands and linked media to specific users or set expiration dates (`expires_at`); admins always retain access
- **Modern library UI** — List, Grid, and Detailed views; lazy loading and preview toggles; built-in seller & storage guide
- **Bulk actions** — validate, grant/revoke user access, set/clear expiration, and bulk delete (with optional deletion from the Telegram storage chat)

**Users & groups**
- User management with roles (user / moderator / admin)
- Block users entirely or only from the AI
- Per-user direct messages (send / edit / delete with full media) and AI memory (view / edit / delete)
- **Contact inbox** — collects messages from DM featured commands, with unread badge, per-user read tracking, search, and stats
- **Contact automation** — admin notifications, auto-reply, away mode, and per-user rate limits
- Per-group settings: AI mode, AI trigger (mention / reply / either / both / every message), memory, welcome, rules, anti-flood, link filter, service-message cleanup, member tracking
- **Anti-flood escalation** — first offense triggers mute / kick / ban, then escalates after configurable thresholds
- Per-group permission overrides for commands, featured commands, AI, callbacks, rules, and MCP
- Broadcast with audience targeting, any media type, keyboards, and delivery pacing
- Automatic unreachable-user detection when Telegram reports blocked / deactivated users

**AI assistant**
- 7 providers: OpenAI, Gemini, DeepSeek, Groq, OpenRouter, Ollama, Custom
- Primary + up to 5 fallback providers
- Streaming replies, strict mode, RTL support, knowledge bases
- Conversation memory (message-count and character-bounded), per-user and global rate limits
- Playground, suggested questions, and MCP tool integration
- **Parallel MCP tool execution** — multiple tool calls in a single round-trip

**MCP server**
- Full JSON-RPC 2.0 server at `/mcp` (Streamable HTTP)
- **32 tools** across four categories: read / write / outbound / dangerous
- Read: stats, users, commands, groups, menu, settings, webhook health, memory, bot info, group settings, user memory, logs, broadcast history, featured commands
- Write: commands, menu, AI settings, bot info, group settings, roles, blocks
- Outbound: send DM, broadcast (with keyboards)
- Dangerous: delete user, clear all AI memory, clear one user's memory (all require `confirm: true`, off by default)
- Bearer-token auth with hashed tokens, session memory, and rate limiting
- Dedicated chat UI at `/chat`
- Works with Claude Desktop, Cursor, Cline, and any MCP-compatible client

**Dashboard**
- Responsive UI, light & dark themes, mobile friendly
- **Navigation style presets** — switch live between 4 visual styles (Classic, Modern Pills, Frosted Glass, Compact) and 3 structures (Grouped, Flat List, Top Bar horizontal desktop nav)
- **Privacy-first memory defaults** — on fresh D1 setups, memory and DM-saving options (`ai_memory`, `ai_group_memory`, `mcp_memory_limit`, `auto_remove_enabled`, `dm_save_private`, `dm_save_featured`) now default to **OFF**
- **Automatic error toasts** — validation/API errors pop up as toast notifications above modals instead of inline error boxes
- **Searchable command combobox** — parent-folder and button-command pickers now filter 1,000+ commands live and let you type custom commands or argument variants manually
- Live status indicators and toast notifications
- Backup & restore (full or selective), now including media library tables, `allowed_users`, and `expires_at`
- Scheduled cleanup via Cloudflare Cron
- Activity log with auto-delete and search
- **Schema health** — dry-run drift report and one-click auto-heal (tables, columns, indexes, settings, backfills, and safe cleanup of expired / orphaned rows)
- **Webhook diagnostics** — Telegram API latency, registered URL, pending updates, last error
- **Media storage** setting for upload hosting
- In-dashboard updates with automatic webhook secret rotation
- Factory reset

**Performance** (v4.9.3)
- Client-side module splitting for lazy-loaded dashboard JS, API request coalescing, and stale-while-revalidate service worker caching for instant repeat visits

---

## Installation

### 1. Automated (recommended)

Use the installer: https://mahan07dev.github.io/Nyxx/installer

### 2. Manual with wrangler

```toml
# wrangler.toml
name = "nyxx"
main = "worker.js"
compatibility_date = "2026-08-16"

[[d1_databases]]
binding = "DB"
database_name = "nyxx"
database_id = "<your-d1-database-id>"
```

```bash
npx wrangler deploy
```

Open the worker URL and complete the setup wizard. The database schema is created automatically on first run.

### 3. Manual with your own proxy

Deploy `proxy.js` to a Cloudflare Worker, update the proxy URL inside `installer.html`, and use the installer as normal. This removes any dependency on the hosted proxy.

To also self-host the **Connect Cloudflare** OAuth relay, bind a D1 database as `DB`, create your own Cloudflare OAuth client, and point `RELAY_BASE` in `worker.js` (or the `RELAY_BASE` variable) at your proxy. Full steps are in [SECURITY.md](SECURITY.md).

---

## Updating

Open the **Update** tab in your dashboard. Nyxx will:

1. Check `version.json` for the latest release
2. Validate your Cloudflare credentials (OAuth or API token)
3. Download and validate the new `worker.js`
4. Deploy it and rotate the webhook secret automatically

Your bot token, D1 data, and configuration stay intact. You can also force-redeploy the current version if a deployment feels broken.

> **Upgrading from a version before 4.9.4?** The **Connect Cloudflare** button in the dashboard stops working until the worker is updated, because the OAuth relay no longer uses a shared secret. Update once through the installer (OAuth or API token); everything else keeps working in the meantime.

> **Upgrading to v4.9.6?** The schema is bumped to version **22** (adds the `channels` table plus `media_items_json`, `protect_content`, `auto_back`, and `back_label` columns via automatic non-destructive migrations). If you self-host `proxy.js`, **redeploy it** and ensure your Cloudflare OAuth client has the **Refresh Token grant** enabled so automatic token refresh works.

If the dashboard ever shows **"Database schema is out of date"** after an update, open **Settings → Schema health → Run auto-heal** — it fixes missing tables, columns, indexes and settings without touching live data.

---

## Media storage & Creator Studio

Media uploaded through the dashboard is stored on Telegram and referenced by `file_id`. With the v4.9.5 overhaul, storage settings now live directly inside the **Media Library** tab:

1. Start a chat with your bot (or use any group the bot is in)
2. Open **Media Library** and configure a **Channel**, **Group**, or your own **Private DM** as the storage chat
3. Nyxx verifies bot permissions and either uploads directly (up to 45 MB via web) or indexes media posted to the storage chat (up to **2 GB**)

Uploaded files are **kept by default** (the "delete after upload" switch now defaults to OFF), so your Telegram chat becomes an infinite, lossless archive. You can attach multiple files to commands, DMs, broadcasts, and channel posts, and restrict access to specific users or set expiration dates per command and per media item.

Direct URLs still work everywhere — the storage option is only for files that don't already have a stable public URL.

---

## Security

- API tokens stay in your browser during install and are forwarded to Cloudflare's API through the CORS proxy (hosted default or your own). The proxy never stores them
- **In-dashboard updater** stores the Cloudflare token / OAuth session in your own D1 database, never on a third-party server
- **OAuth refresh tokens** — `proxy.js` now requests `offline_access` by default (with automatic fallback) and includes a `POST /oauth/refresh` endpoint; expired tokens auto-refresh in `/api/oauth/status`, and the UI shows the real connection state (Auto-refresh ON / No refresh token / Session expired)
- PBKDF2 password hashing (SHA-256, 100k iterations)
- Webhook secret tokens, rotated automatically on updates
- **CSRF protection** — every mutating API request requires a session-bound token (`X-Nyxx-CSRF`)
- **Distributed session invalidation** — changing the admin password signs out every browser on every worker isolate immediately
- HttpOnly, SameSite session cookies
- MCP bearer tokens hashed in D1, shown only once
- CORS proxy hardened against SSRF (allow-list + DNS-over-HTTPS resolution), no upstream redirects or cookies, sandboxed responses, optional rate limiting
- **OAuth relay with no shared secret** — each login is bound to the worker that started it (PKCE-style verifier), requires a confirmation click naming the receiving host, and uses single-use, short-lived (≤ 5 min) exchange codes
- The hosted proxy/relay is operated by the maintainer; if you would rather not trust it, [self-host it](SECURITY.md) or use the API token method
- Standard security headers on all responses (CSP, HSTS, X-Frame-Options, etc.)
- Destructive MCP tools require explicit `confirm: true` and are off by default
- **`ADMIN_PASS` environment variable** — can be used as a master override or recovery option for the D1 admin password; hints are shown in Initial Setup, Sign In, and Settings

---

## Requirements

- A free Cloudflare account
- A Telegram bot token from [@BotFather](https://t.me/BotFather)
- A modern web browser

Cloudflare's free plan is sufficient for most personal projects.

---

## FAQ

**Is Nyxx free?**
Yes, and it's designed to run on Cloudflare's free tier.

**Do I need a VPS?**
No. Everything runs on Cloudflare Workers.

**Is my Cloudflare token stored?**
Not by the installer. When you use the in-dashboard updater, the token (or OAuth session) is stored in your own D1 database. With **Connect Cloudflare**, the hosted relay holds the access token for up to 5 minutes until your worker collects it (single use), then deletes it. The v4.9.6 release adds refresh-token support so your connection persists. See [SECURITY.md](SECURITY.md) for the trust model and how to self-host the relay.

**Which AI providers are supported?**
OpenAI, Gemini, DeepSeek, Groq, OpenRouter, Ollama (local), and any OpenAI-compatible API — with up to 5 fallbacks.

**What is MCP?**
Model Context Protocol — an open standard from Anthropic that lets AI agents call tools exposed by a server. Nyxx ships a full MCP server so Claude Desktop, Cursor, and Cline can manage your bot in natural language.

**How do I send videos, voice notes, or documents?**
Commands, direct messages, group announcements, channel posts, and broadcasts all support nine reply types plus **multi-media albums** (up to 10 compatible items). Use a direct URL, upload files through the Media Library, or post them to your Telegram storage chat (up to 2 GB) for automatic capture.

**How do command arguments work?**
Add `{{args}}` (everything after the command) or `{{arg1}}`, `{{arg2}}`, … to a command's content. Example: `/echo` with content `You said: {{args}}` replies `You said: hello world` for `/echo hello world`. You can also create argument-specific commands (`/start fa`) that resolve to the longest match. Input is HTML-escaped so it can never inject tags.

**Can I color the buttons?**
Yes. The keyboard builders now support **full row/layout control** and per-button colors (Default, Blue, Green, Red) with live previews. In Buttons featured commands, prefix any label with `[blue]`, `[green]` or `[red]`, or set a default color.

**What happens if a migration fails?**
The schema is normally kept up-to-date automatically (now at version 22). If a migration ever fails silently, use **Settings → Schema health → Run auto-heal** — it inspects the actual database and creates any missing tables, columns, indexes or settings, and cleans up expired / orphaned rows. Safe to run multiple times.

**Can I customize the worker?**
Yes. `worker.js` is fully open source and meant to be modified.

---

## Repository Structure

| File | Purpose |
|---|---|
| `worker.js` | The Nyxx panel — bot engine, dashboard, REST API, AI, MCP server, `/chat` UI |
| `installer.html` | The install / update / delete wizard |
| `proxy.js` | Hardened CORS proxy + central OAuth relay (OAuth needs a D1 binding named `DB`) |
| `SECURITY.md` | Trust model, self-hosting the proxy / relay, vulnerability reporting |
| `version.json` | Release metadata |
| `logo.webp` | Project logo |

---

## Contributing

Contributions are welcome — bug reports, feature suggestions, documentation fixes, and pull requests.

**Want to contribute or cooperate directly?** Message me on Telegram: [@nyxx_official_channel](https://t.me/nyxx_official_channel). Whether it's an idea, a bug, or a partnership, I read every message.

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE) — free to use, modify, and distribute.

---

## Contact

- **GitHub** — [@Mahan07dev](https://github.com/Mahan07dev)
- **Telegram** — [@nyxx_official_channel](https://t.me/nyxx_official_channel)

<div align="center">

Made with ❤️ using Cloudflare Workers & the Telegram Bot API.

⭐ Star the repo if you find it useful.

</div>