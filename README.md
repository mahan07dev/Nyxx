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
- Text & photo responses, with automatic long-message splitting
- Inline and reply keyboards built visually (no JSON)
- Telegram menu commands and custom featured commands (DM / Buttons / MCP)
- Per-command access levels: everyone, moderator+, or admin only

**Users & groups**
- User management with roles (user / moderator / admin)
- Block users entirely or only from the AI
- Per-user direct messages (send / edit / delete) and AI memory (view / edit / delete)
- Per-group settings: AI mode, AI trigger (mention / reply / either / both / every message), memory, welcome, rules, anti-flood, link filter, service-message cleanup, member tracking
- Per-group permission overrides for commands, featured commands, AI, callbacks, and MCP
- Broadcast with audience targeting, photos, keyboards, and delivery pacing

**AI assistant**
- 7 providers: OpenAI, Gemini, DeepSeek, Groq, OpenRouter, Ollama, Custom
- Primary + up to 5 fallback providers
- Streaming replies, strict mode, RTL support, knowledge bases
- Conversation memory, per-user and global rate limits
- Playground, suggested questions, and MCP tool integration

**MCP server**
- Full JSON-RPC 2.0 server at `/mcp` (Streamable HTTP)
- 21 tools across four categories: read / write / outbound / dangerous
- Bearer-token auth with hashed tokens, session memory, and rate limiting
- Dedicated chat UI at `/chat`
- Works with Claude Desktop, Cursor, Cline, and any MCP-compatible client

**Dashboard**
- Responsive UI, light & dark themes, mobile friendly
- Live status indicators and toast notifications
- Backup & restore (full or selective)
- Scheduled cleanup via Cloudflare Cron
- Activity log with auto-delete
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

---

## Security

- API tokens stay in your browser — only sent to Cloudflare's API
- PBKDF2 password hashing (SHA-256, 100k iterations)
- Webhook secret tokens, rotated automatically on updates
- CSRF origin checks on all mutating API requests
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