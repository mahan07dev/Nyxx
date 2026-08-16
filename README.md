<div align="center">

<img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/logo.webp" width="130" alt="Nyxx Logo">
<br>

# Nyxx

### 🚀 Deploy & Manage Powerful Telegram Bots on Cloudflare Workers

A modern, self-hosted Telegram Bot Builder with an intuitive web dashboard, one-click installation, Cloudflare D1 storage, and zero server maintenance.

<p>
<a href="https://mahan07dev.github.io/Nyxx/installer"><img src="https://img.shields.io/badge/🚀%20One--Click%20Installer-Live-7c3aed?style=for-the-badge" /></a>
<br><br>
<a href="https://github.com/Mahan07dev/Nyxx/releases">
  <img src="https://img.shields.io/github/v/release/Mahan07dev/Nyxx?style=for-the-badge" alt="Latest Version">
</a>
<a href="https://github.com/Mahan07dev/Nyxx/releases">
  <img src="https://img.shields.io/github/release-date/Mahan07dev/Nyxx?style=for-the-badge" alt="Latest Release Date">
</a>
<a href="https://github.com/Mahan07dev/Nyxx"><img src="https://img.shields.io/github/stars/Mahan07dev/Nyxx?style=for-the-badge" /></a>
<a href="https://github.com/Mahan07dev/Nyxx/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Mahan07dev/Nyxx?style=for-the-badge" /></a>
</p>

<p>
<img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white">
<img src="https://img.shields.io/badge/Cloudflare-D1-F38020?logo=cloudflare&logoColor=white">
<img src="https://img.shields.io/badge/Telegram-Bot_API-26A5E4?logo=telegram&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Self-Hosted-success">
<img src="https://img.shields.io/badge/Responsive-Mobile%20Friendly-blue">
</p>

---

**Nyxx** lets you build and manage Telegram bots through a beautiful web dashboard instead of editing code.

Deploy everything to your own Cloudflare account in minutes with the built-in installer. No servers, no VPS, no Docker, and no CLI required.

</div>

---

## Table of Contents

- [What is Nyxx?](#what-is-nyxx)
- [Why Nyxx?](#why-nyxx)
- [Features](#features)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Dashboard Overview](#dashboard-overview)
- [AI Assistant](#ai-assistant)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Installation](#installation)
- [Updating Nyxx](#updating-nyxx)
- [Security](#security)
- [Requirements](#requirements)
- [Feature Matrix](#feature-matrix)
- [Screenshots](#screenshots)
- [FAQ](#faq)
- [Roadmap](#roadmap)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)
- [Credits & Contact](#credits--contact)

---

## What is Nyxx?

Nyxx is a **self-hosted Telegram bot builder** that runs entirely on Cloudflare's free tier.

Instead of writing code, you use a visual dashboard to:

- Create and organize commands (text & photo responses)
- Build inline and reply keyboards without touching JSON
- Manage Telegram menu commands
- Add an AI assistant powered by OpenAI, Gemini, Groq, or any OpenAI-compatible API
- Manage users, bot profile info, and webhooks

All of your data — commands, users, settings, AI memory — lives in **your own Cloudflare D1 database**, inside **your own Cloudflare account**.

---

## Why Nyxx?

Unlike many Telegram bot panels that require a VPS or complicated setup, Nyxx is designed to be deployed entirely on Cloudflare:

- **Zero server management** — no VPS, no Docker, no SSH
- **Global performance** — served from Cloudflare's edge network
- **Very generous free tier** — Workers + D1 free plans cover most personal projects
- **One-click installer** — deploy, update, or delete your panel from a web wizard
- **Easy updates** — update from inside the dashboard itself
- **Secure by design** — webhook secrets, hashed passwords, and a hardened proxy

---

## Features

### 🤖 Telegram Bot Engine

| Feature | Description |
|---|---|
| Unlimited commands | Text & photo responses |
| Nested commands | Organize commands into folders, navigate with breadcrumbs |
| Enable / Disable | Turn commands on and off without deleting them |
| Admin-only commands | Restrict commands to your admin users |
| Inline keyboards | URL, callback, and command buttons — built visually |
| Reply keyboards | Drag-and-drop button builder, no JSON required |
| Menu commands | Publish `/help`, `/start`, `/settings`… to Telegram with one click |
| Automatic webhooks | Registered, secured, and re-registered for you |

### 🎛️ Beautiful Dashboard

- Modern responsive interface, mobile friendly, dark UI
- Secure login with an initial setup wizard
- Live status indicators and toast notifications
- Manage everything from one place — no CLI needed

### 👥 User Management

- See everyone who interacted with your bot
- Username + display name, with search support
- Assign admin roles right from the dashboard

### ⚙️ Bot Settings

- Change bot token (validated against Telegram, same-token re-save supported)
- Webhook URL with a **one-click diagnostic test** (reports what Telegram actually sees: URL match, pending updates, last delivery error)
- Change admin password
- Connection status + factory reset

### ℹ️ Bot Information

Update your bot's profile without leaving Nyxx:

- Name, description, and short description
- Publish changes to Telegram instantly

### 🤖 AI Assistant

Built into the dashboard — turn your bot into a chatbot:

- **Multiple providers**: OpenAI, Gemini, Groq, or a custom OpenAI-compatible endpoint
- **Primary + fallback**: if the main provider fails, the backup kicks in
- Custom system prompts
- Local knowledge bases (multiple, toggleable)
- Per-chat conversation memory
- AI Playground for testing prompts
- Suggested question buttons
- Rate limiting & safety controls
- Optional trigger conditions
- One-click provider connection testing

---

## Quick Start

The fastest way to install, update, or manage Nyxx is the automated installer:

### 👉 https://mahan07dev.github.io/Nyxx/installer

It's a guided wizard that walks you through:

1. **Account** — paste a Cloudflare API token (it never leaves your browser)
2. **Proxy** — pick the hosted proxy, or bring your own
3. **Scan** — detects existing workers & D1 databases on your account
4. **Create** — name your panel (or tap 🎲 for a random one) and deploy

The installer automatically:

- ✅ Creates a Cloudflare Worker
- ✅ Creates a D1 database
- ✅ Binds the database to the Worker
- ✅ Uploads and deploys the latest Worker code
- ✅ Gives you your dashboard URL
- ✅ Updates existing panels
- ✅ Deletes panels
- ✅ Manages D1 databases & bindings

It also shows the **latest published version** before you install, runs **proxy health checks**, and never hangs on a dead connection — every API call has a timeout with automatic retry.

No manual configuration required.

---

## How It Works

Nyxx is two pieces working together:

**1. The installer** (a static web page) talks to the Cloudflare API through a small CORS proxy, using *your* API token, to create the Worker, the D1 database, and their binding — all inside your Cloudflare account.

**2. The worker** (`worker.js`) is both your bot engine and your dashboard:

- Telegram sends updates to your worker's `/webhook` endpoint
- The webhook is protected by a secret token that only Telegram knows
- Commands, users, settings, and AI memory are stored in your D1 database
- The dashboard (served by the worker itself) is protected by a session login

Your bot data never touches a third-party server.

---

## Dashboard Overview

### 📁 Commands

Manage your bot like a file explorer:

- Create, edit, and delete commands
- Organize commands into folders
- Navigate using breadcrumbs
- Enable / disable commands
- Restrict commands to admins only

### 🎹 Inline Keyboard Builder

Create beautiful Telegram inline keyboards without writing JSON:

| Button type | Description |
|---|---|
| Callback | Trigger an action |
| Command | Open another command |
| URL | Open websites or channels |

### ⌨️ Reply Keyboard Builder

Design Reply Keyboards visually:

- Drag & organize buttons
- Link buttons to commands
- Toggle keyboard visibility per command
- No manual JSON editing

### 📋 Telegram Menu

Publish Telegram's built-in menu commands (`/help`, `/start`, `/settings`, `/about`, …) directly from the dashboard — perfect for discovery.

### 👥 Users

View everyone who has interacted with your bot and search by username or display name.

### ⚙️ Settings

Manage everything from a single page: bot token, webhook, password, connection status, and factory reset.

### 🤖 Bot Information

Update your bot's name, description, and short description — then publish to Telegram instantly.

### 🧠 AI Assistant

Configure AI providers, system prompts, knowledge bases, memory, suggested questions, and safety limits — all from the dashboard.

---

## AI Assistant

Nyxx includes a full AI chatbot engine. Here's what you get:

- **Providers**: OpenAI, Gemini, Groq, or Custom (any OpenAI-compatible API)
- **Main + fallback**: configure a backup provider so the bot keeps working if the primary fails
- **System prompt**: control the bot's personality entirely
- **Knowledge bases**: add up to multiple content blocks that the AI uses to answer
- **Memory**: the bot remembers the conversation (with a clear-memory button and usage counter)
- **Playground**: test prompts and provider configs before going live
- **Suggested questions**: render quick-reply chips in chat
- **Safety**: rate limiting and optional trigger conditions (e.g. only respond to certain words)

---

## Architecture

```
                         ┌─────────────────────────────┐
                         │   Installer (GitHub Pages)  │
                         │        installer.html       │
                         └──────────────┬──────────────┘
                                        │ browser ⇄ CORS proxy (proxy.js)
                                        ▼
                              Cloudflare REST API
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
  Cloudflare Worker (worker.js)                         Cloudflare D1
  │  • Dashboard UI + session login                     • commands
  │  • Telegram bot engine                              • users
  │  • REST API for the dashboard                       • settings
  │  • AI orchestration                                 • AI memory
  └──────────────┬──────────────────┬───────────────────┘
                 ▼                  ▼
        Telegram (webhook,       AI providers
        secured by secret)      (OpenAI / Gemini /
                                Groq / custom)
```

---

## Repository Structure

```
Nyxx/
│
├── installer.html        The web wizard — token verification, proxy selection,
│                         panel scanning, create/update/delete, custom worker names
│
├── worker.js             The Nyxx panel — Telegram bot engine, dashboard UI,
│                         REST API, authentication, D1 logic, AI assistant
│
├── proxy.js              The CORS proxy that relays browser ⇄ Cloudflare API
│                         requests (hardened: host allow-list + SSRF protection)
│
├── version.json          Release metadata — powers the installer's version chip
│                         and the panel's in-dashboard Update tab
│
├── logo.webp             Project logo
│
└── README.md      This file — the public GitHub README
```

---

## Installation

### Option 1 — Automated (Recommended)

Visit:

### 👉 https://mahan07dev.github.io/Nyxx/installer

The installer handles everything automatically — creating the Worker, creating and binding the D1 database, uploading the latest code, and deploying.

### Option 2 — Manual (bring your own proxy)

If the installer can't reach the public proxy:

1. Deploy `proxy.js` to your own Cloudflare Worker.
2. (Optional) Lock it down further with bindings:
   - `ALLOWED_HOSTS` — comma-separated host list overriding the default allow-list
   - `ALLOW_ALL` — set to `"true"` to opt back into unrestricted proxying *(not recommended)*
3. Replace the proxy URL inside `installer.html`.
4. Open the installer again and continue.

This fallback exists so you're never dependent on a single hosted proxy.

### Option 3 — Fully manual (wrangler)

If you prefer to deploy without the installer:

1. Create a Worker and a D1 database in the Cloudflare dashboard (or via `wrangler`).
2. Create a `wrangler.toml`:

```toml
name = "nyxx"
main = "worker.js"
compatibility_date = "2026-08-16"

[[d1_databases]]
binding = "DB"                # must be named "DB" — worker.js reads env.DB
database_name = "nyxx"
database_id = "<your-d1-database-id>"

# Optional: a fixed admin password instead of the in-dashboard setup wizard
# [vars]
# ADMIN_PASS = "changeme"
```

3. Deploy:

```bash
npx wrangler deploy
```

The database schema is created automatically on first run — no migration files needed. Then open your worker's URL and complete the setup wizard (or log in with `ADMIN_PASS`).

---

## Updating Nyxx

Updating is simple — and you can even do it from inside the panel.

### In-dashboard update (recommended)

The **Update tab** in your panel checks `version.json`, downloads the latest `worker.js`, deploys it to your Cloudflare account, and **rotates the webhook secret automatically** — so upgraded installs keep the same security guarantees.

### Manual update

1. Download the latest release.
2. Replace your Worker code.
3. Deploy again.

Your D1 database and existing bot configuration remain intact.

> Always create a database backup before major updates.

---

## Security

Nyxx is designed so deployment happens directly into **your own Cloudflare account**, and the panel is hardened against common attacks:

- **API tokens stay in your browser.** The installer never sends your Cloudflare token to any third-party server — it only goes to Cloudflare's own API.
- **Everything belongs to you.** Your Worker and your D1 database run under your Cloudflare account.
- **Webhook secret token.** Every webhook is registered with a `secret_token`, and the panel rejects any delivery that doesn't carry `X-Telegram-Bot-Api-Secret-Token`. The secret is rotated automatically on token changes and in-panel updates.
- **Hashed admin passwords.** Passwords are stored as `sha256$<hash>` in D1 — never in plain text. Existing installs are re-hashed on the next password change.
- **Hardened CORS proxy.** The default proxy only forwards to `api.cloudflare.com`, `raw.githubusercontent.com`, and `*.workers.dev`, and blocks targets that resolve to private, loopback, link-local, or cloud-metadata addresses (SSRF protection). Errors are returned as CORS-safe JSON.
- **Protected sessions & headers.** Session cookies are `HttpOnly` with `SameSite=Lax`, responses include `nosniff`, `Referrer-Policy`, and `X-Frame-Options`, and errors never leak stack traces.

> The public proxy only forwards requests to the Cloudflare API. If you prefer, you can deploy your own copy using `proxy.js`.

---

## Requirements

Before installing you'll need:

- A free Cloudflare account
- A Telegram bot created with **@BotFather**
- A modern web browser

Cloudflare's free plan is sufficient for most personal projects.

---

## Feature Matrix

| Feature | Supported |
|-----------|:--------:|
| Cloudflare Workers | ✅ |
| Cloudflare D1 | ✅ |
| Web Dashboard | ✅ |
| Mobile Friendly | ✅ |
| Secure Login | ✅ |
| Initial Setup Wizard | ✅ |
| Nested Commands / Folders | ✅ |
| Inline Keyboards | ✅ |
| Reply Keyboards | ✅ |
| Telegram Menu Commands | ✅ |
| User Management | ✅ |
| Admin-only Commands | ✅ |
| Text Responses | ✅ |
| Photo Responses | ✅ |
| Bot Information Editor | ✅ |
| Automatic Webhook | ✅ |
| Webhook Secret Token | ✅ |
| Webhook Diagnostic Test | ✅ |
| Hashed Passwords | ✅ |
| AI Assistant (multi-provider) | ✅ |
| AI Knowledge Bases | ✅ |
| AI Conversation Memory | ✅ |
| AI Playground | ✅ |
| In-dashboard Update | ✅ |
| Factory Reset | ✅ |
| One-click Installer | ✅ |
| Self Hosted | ✅ |

---

## Screenshots

<p align="center">

<a href="screenshots/dashboard.webp">
  <img src="screenshots/dashboard.png" width="80%" alt="Dashboard">
</a>

</p>

---

## FAQ

### Is Nyxx free?

Yes. Nyxx is open-source and designed to work with Cloudflare's generous free plan.

### Do I need a VPS?

No. Everything runs on Cloudflare Workers.

### Can I host it myself?

Yes. Every component belongs to you and can be self-hosted — including the installer's proxy.

### What happens if the public proxy goes offline?

Simply deploy your own copy of `proxy.js` and update the proxy URL inside `installer.html`. The repository includes the proxy source for exactly this reason.

### Is my Cloudflare token stored?

No. The installer is designed so your API token stays inside your browser during installation and is only ever sent to Cloudflare's API.

### Which AI providers can I use?

OpenAI, Gemini, Groq, or any custom OpenAI-compatible API — with a primary provider and an automatic fallback.

### Does the panel send my data anywhere?

No. Your bot data stays in your own D1 database. The only outbound calls are to Telegram, to the AI provider you explicitly configure, and to Cloudflare's API during updates.

### Can I customize the Worker?

Absolutely. `worker.js` is fully open source and intended to be modified.

---

## Roadmap

Future ideas include:

- [ ] File uploads
- [ ] Video & audio responses
- [ ] Rich media support
- [ ] Multi-language dashboard
- [ ] Scheduled broadcasts
- [ ] Analytics dashboard
- [ ] Import / Export commands
- [ ] Backup & Restore
- [ ] Plugin system
- [ ] Theme customization

---

## Changelog

### v2.3.1 — Bugfixes

- **Test Webhook works again.** The button now uses a protected diagnostic endpoint that queries Telegram's `getWebhookInfo` and reports the real state (URL match, pending updates, last delivery error) — no more `401`.
- **Re-saving the same bot token no longer fails.** Tokens are only re-validated when they actually change; Telegram API calls retry transient failures (e.g. `429` rate limits) and surface Telegram's own error message.
- **Safer setup & update ordering.** Webhooks are registered with Telegram *before* secrets are persisted, so a failed registration can never lock out real deliveries.

### v2.3.0 — Security hardening

- Admin passwords hashed (`sha256$`) — backward compatible with existing installs
- Telegram webhook secret tokens with automatic rotation
- CORS proxy is no longer an open relay (host allow-list + SSRF protection)
- Installer resilience: timeouts, retries, proxy health banner, live version info, custom worker names

---

## Contributing

Contributions are always welcome.

You can help by:

- Reporting bugs
- Suggesting features
- Improving documentation
- Opening Pull Requests
- Sharing ideas

Before submitting major changes, please open an issue to discuss your proposal.

---

## License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute it according to the license terms.

---

## Credits & Contact

Created and maintained by **Mahan (@Mahan07dev)**.

Special thanks to:

- Cloudflare
- Telegram
- Everyone who tests, reports bugs, and contributes to the project.

**GitHub** — https://github.com/Mahan07dev

**Telegram** — https://t.me/nyxx_official_channel

---

<div align="center">

## 🚀 Ready to build your own Telegram Bot?

### Start here:

# 👉 https://mahan07dev.github.io/Nyxx/installer

---

Made with ❤️ using Cloudflare Workers & Telegram Bot API.

If you like this project, don't forget to ⭐ the repository.

</div>
