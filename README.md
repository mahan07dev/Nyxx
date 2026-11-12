<div align="center">

<img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/logo.webp" width="120" alt="Nyxx Logo">

# Nyxx

**A self-hosted Telegram bot builder for Cloudflare Workers — dashboard, AI assistant, and MCP server included.**

[🚀 One-Click Installer](https://mahan07dev.github.io/Nyxx/installer) · [Releases](https://github.com/Mahan07dev/Nyxx/releases) · [Telegram](https://t.me/nyxx_official_channel)

<img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white">
<img src="https://img.shields.io/badge/Cloudflare-D1-F38020?logo=cloudflare&logoColor=white">
<img src="https://img.shields.io/badge/Telegram-Bot_API-26A5E4?logo=telegram&logoColor=white">
<img src="https://img.shields.io/badge/MCP-Model_Context_Protocol-black">
<img src="https://img.shields.io/badge/License-MIT-green">

</div>

---

## Quick Start

The fastest way to install Nyxx is the automated installer — no CLI, no wrangler, no manual setup:

### 👉 https://mahan07dev.github.io/Nyxx/installer

The wizard creates the Worker, creates and binds the D1 database, uploads the latest code, and gives you your dashboard URL. It also handles updates and deletion of existing panels.

---

## Features

**Bot engine**
- Nested commands with folders and breadcrumbs
- Nine reply types: text, photo, video, animation, voice, audio, document, round video, sticker
- **Media upload** through the dashboard (stored on Telegram via `file_id`) or direct URLs
- **Command arguments** — `{{args}}`, `{{arg1}}`, `{{arg2}}`, … insert the user's input into replies (HTML-escaped)
- Inline and reply keyboards built visually (no JSON), with **per-button colors** (blue / green / red)
- Telegram menu commands and custom featured commands (DM / Buttons / MCP)
- Featured Buttons commands support `[blue]` / `[green]` / `[red]` label prefixes and a default button color
- Per-command access levels: everyone, moderator+, or admin only

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
- Live status indicators and toast notifications
- Backup & restore (full or selective), now including media fields and contact settings
- Scheduled cleanup via Cloudflare Cron
- Activity log with auto-delete and search
- **Schema health** — dry-run drift report and one-click auto-heal (tables, columns, indexes, settings, backfills, and safe cleanup of expired / orphaned rows)
- **Webhook diagnostics** — Telegram API latency, registered URL, pending updates, last error
- **Media storage** setting for upload hosting
- In-dashboard updates with automatic webhook secret rotation
- Factory reset

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

---

## Updating

Open the **Update** tab in your dashboard. Nyxx will:

1. Check `version.json` for the latest release
2. Validate your Cloudflare credentials (OAuth or API token)
3. Download and validate the new `worker.js`
4. Deploy it and rotate the webhook secret automatically

Your bot token, D1 data, and configuration stay intact. You can also force-redeploy the current version if a deployment feels broken.

If the dashboard ever shows **"Database schema is out of date"** after an update, open **Settings → Schema health → Run auto-heal** — it fixes missing tables, columns, indexes and settings without touching live data.

---

## Media storage

Media uploaded through the dashboard is stored on Telegram and referenced by `file_id`. To enable uploads:

1. Start a chat with your bot (or use any group the bot is in)
2. Open **Settings → Media storage** and paste the chat ID (your own Telegram user ID is the simplest choice)
3. The bot will post files to that chat temporarily, copy the `file_id`, and delete the message immediately

Direct URLs still work everywhere — the upload option is only for files that don't already have a stable public URL.

---

## Security

- API tokens stay in your browser during install — only sent to Cloudflare's API
- **In-dashboard updater** stores the Cloudflare token / OAuth session in your own D1 database, never on a third-party server
- PBKDF2 password hashing (SHA-256, 100k iterations)
- Webhook secret tokens, rotated automatically on updates
- **CSRF protection** — every mutating API request requires a session-bound token (`X-Nyxx-CSRF`)
- **Distributed session invalidation** — changing the admin password signs out every browser on every worker isolate immediately
- HttpOnly, SameSite session cookies
- MCP bearer tokens hashed in D1, shown only once
- CORS proxy hardened against SSRF (allow-list + DNS-over-HTTPS resolution)
- Standard security headers on all responses (CSP, HSTS, X-Frame-Options, etc.)
- Destructive MCP tools require explicit `confirm: true` and are off by default

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
Not by the installer. When you use the in-dashboard updater, the token (or OAuth session) is stored in your own D1 database, not on any third-party server.

**Which AI providers are supported?**
OpenAI, Gemini, DeepSeek, Groq, OpenRouter, Ollama (local), and any OpenAI-compatible API — with up to 5 fallbacks.

**What is MCP?**
Model Context Protocol — an open standard from Anthropic that lets AI agents call tools exposed by a server. Nyxx ships a full MCP server so Claude Desktop, Cursor, and Cline can manage your bot in natural language.

**How do I send videos, voice notes, or documents?**
Commands, direct messages, group announcements and broadcasts all support nine reply types. Use a direct URL, or upload the file through the dashboard — it will be hosted on Telegram via `file_id` so it never expires.

**How do command arguments work?**
Add `{{args}}` (everything after the command) or `{{arg1}}`, `{{arg2}}`, … (individual tokens) to a command's content. Example: a command `/echo` with content `You said: {{args}}` replies `You said: hello world` when the user types `/echo hello world`. Input is HTML-escaped so it can never inject tags.

**Can I color the buttons?**
Yes. In the keyboard builder, pick a color per button (Default, Blue, Green, Red). In Buttons featured commands, prefix any label with `[blue]`, `[green]` or `[red]`, or set a default color in the command editor.

**What happens if a migration fails?**
The schema is normally kept up-to-date automatically. If a migration ever fails silently, use **Settings → Schema health → Run auto-heal** — it inspects the actual database and creates any missing tables, columns, indexes or settings, and cleans up expired / orphaned rows. Safe to run multiple times.

**Can I customize the worker?**
Yes. `worker.js` is fully open source and meant to be modified.

---

## Repository Structure

| File | Purpose |
|---|---|
| `worker.js` | The Nyxx panel — bot engine, dashboard, REST API, AI, MCP server, `/chat` UI |
| `installer.html` | The install / update / delete wizard |
| `proxy.js` | Hardened CORS proxy + optional OAuth relay |
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