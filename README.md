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
<img src="https://img.shields.io/badge/MCP-Model_Context_Protocol-black">
<img src="https://img.shields.io/badge/Self-Hosted-success">
<img src="https://img.shields.io/badge/Responsive-Mobile%20Friendly-blue">
</p>

---

**Nyxx** lets you build and manage Telegram bots through a beautiful web dashboard instead of editing code.

Deploy everything to your own Cloudflare account in minutes with the built-in installer. No servers, no VPS, no Docker, and no CLI required.

</div>

---

<div align="center">

## 🚀 Ready to build your own Telegram Bot?

### Start here:

### 👉 https://mahan07dev.github.io/Nyxx/installer
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
- [MCP Server](#mcp-server)
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
- Manage Telegram menu commands and custom featured commands
- Configure per-group AI behaviour, welcome messages, and moderation
- Broadcast to users and manage per-user memory
- Add an AI assistant powered by OpenAI, Gemini, DeepSeek, Groq, OpenRouter, Ollama, or any OpenAI-compatible API
- Let external AI agents (Claude Desktop, Cursor, Cline) manage your bot via **MCP**

All of your data — commands, users, groups, memory, settings — lives in **your own Cloudflare D1 database**, inside **your own Cloudflare account**.

---

## Why Nyxx?

Unlike many Telegram bot panels that require a VPS or complicated setup, Nyxx is designed to be deployed entirely on Cloudflare:

- **Zero server management** — no VPS, no Docker, no SSH
- **Global performance** — served from Cloudflare's edge network
- **Very generous free tier** — Workers + D1 free plans cover most personal projects
- **One-click installer** — deploy, update, or delete your panel from a web wizard
- **Easy updates** — update from inside the dashboard itself, with automatic webhook secret rotation
- **AI-native** — multi-provider AI with fallbacks, strict mode, memory, and knowledge bases
- **Agent-ready** — full MCP server so Claude Desktop, Cursor, or Cline can drive your bot
- **Secure by design** — PBKDF2 passwords, webhook secrets, CSRF origin checks, and a hardened proxy

---

## Features

### 🤖 Telegram Bot Engine

| Feature | Description |
|---|---|
| **Unlimited commands** | Text & photo responses |
| **Nested commands** | Organize commands into folders, navigate with breadcrumbs |
| **Enable / Disable** | Turn commands on and off without deleting them |
| **Admin-only commands** | Restrict commands to your admin users |
| **Inline keyboards** | URL, callback, and command buttons — built visually |
| **Reply keyboards** | Drag-and-drop button builder, no JSON required |
| **Menu commands** | Publish `/help`, `/start`, `/settings`… to Telegram with one click |
| **Featured commands** | Custom DM, Buttons, and MCP commands handled outside the command tree |
| **Automatic webhooks** | Registered, secured, and re-registered for you |
| **HTML sanitisation** | Safe rendering of `<b>`, `<i>`, `<code>`, `<a>`, … with automatic plain-text fallback |
| **Long-message splitting** | Auto-splits replies past 4,096 characters, preserving open tags |
| **User blocking** | Block users entirely or only from the AI chatbot |
| **Backup & restore** | Export everything (or selected sections) as JSON, restore later |

### 👥 Group Management

Add the bot to a group and configure each group independently:

- **AI mode** — inherit global, on, or off
- **Memory** — inherit, disabled, or last 5/10/20 messages
- **Mention required** — only reply when tagged with `@yourbot`
- **Welcome messages** — greet new members with placeholders
- **Rules** — `/rules` returns your custom rules text
- **Anti-flood** — delete messages after N per minute
- **Link filtering** — delete URLs from non-admins
- **Service message cleanup** — remove "X joined", pinned notices, etc.
- **Member tracking** — optionally track group members in the Users tab
- **Announcements** — post a one-off message to a specific group from the dashboard

### 🎛️ Beautiful Dashboard

- Modern responsive interface, mobile friendly, dark UI
- Secure login with an initial setup wizard
- Grouped sidebar navigation across Bot / Audience / Intelligence / System
- Live status indicators and toast notifications
- Overview page with real-time stats and a getting-started checklist
- Manage everything from one place — no CLI needed

### 👥 User Management

- See everyone who interacted with your bot, grouped as `Started bot`, `Group only`, `Admins`, `Blocked`
- Filter and search by name or username
- Per-user **Direct messages** tab: send DMs, attach buttons, edit or delete past messages
- Per-user **AI memory** tab: inspect, edit, or delete individual memory entries
- Promote to admin, block AI only, block everything
- Reachability check that confirms whether the user has started the bot

### 📣 Broadcast & Memory

- **Broadcast** to everyone who started the bot, only AI-blocked users, specific IDs, or a hand-picked list
- Attach photos and inline/reply keyboards
- Edit or delete a broadcast from every recipient's chat
- Pacing controls (batch size, delay, timeout) to stay under Telegram's ~30 msg/s limit
- **Memory tab** — overview of AI memory and DM counts per user, per-user and bulk clear, time-based auto-removal

### ⚙️ Bot Settings

- Change bot token (validated against Telegram, same-token re-save supported)
- Webhook URL with a **one-click diagnostic test** (reports what Telegram actually sees: URL match, pending updates, last delivery error)
- Change admin password
- Connection status + factory reset
- **In-dashboard updates** from the Update tab, with automatic webhook secret rotation

### ℹ️ Bot Information

Update your bot's profile without leaving Nyxx:

- Name, description, and short description
- Publish changes to Telegram instantly

### 🧹 Cleanup & Activity Log

- Optional scheduled cleanup of sessions, login attempts, rate-limit buckets, activity logs, AI memory, DM history, broadcast history, and inactive users
- Enable via Cloudflare Cron trigger (sample config provided) or run manually
- Activity log shows recent admin actions with optional auto-delete by age

### 🤖 AI Assistant

Built into the dashboard — turn your bot into a chatbot:

- **Providers**: OpenAI, Google Gemini, DeepSeek, Groq, OpenRouter, Ollama (local), or Custom (OpenAI-compatible)
- **Primary + up to 5 fallbacks**: rotate automatically when the main provider fails
- **Streaming replies** with live editing
- **System prompt** with placeholders, custom variables, and five built-in templates
- **Knowledge bases** — multiple, toggleable, injected into every prompt
- **Strict mode** — answer only from your instructions and knowledge bases
- **RTL support** — automatic right-to-left rendering for Persian and Arabic
- **Language, style, and length controls**
- **Memory** — per-chat, configurable depth, with per-user memory editor
- **Rate limiting** — per-user and global (per minute or per hour)
- **Response delay** and **typing indicator**
- **Suggested questions** — one-tap reply keyboard after each reply
- **Trigger conditions** — always, only when no command matches, or on text match
- **Ignore bots and forwarded messages**
- **AI Playground** — test prompts and provider configs before going live
- **One-click connection testing**

### 🔌 MCP Server

Nyxx ships with a full **Model Context Protocol** server so external AI agents can manage your bot. See [MCP Server](#mcp-server) below.

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

**2. The worker** (`worker.js`) is your bot engine, your dashboard, and an MCP server in one:

- Telegram sends updates to your worker's `/webhook` endpoint
- The webhook is protected by a secret token that only Telegram knows
- Commands, users, groups, settings, and AI memory are stored in your D1 database
- The dashboard (served by the worker itself) is protected by a session login and CSRF origin checks
- External AI clients (Claude Desktop, Cursor, Cline) POST JSON-RPC to `/mcp` with a bearer token

Your bot data never touches a third-party server.

---

## Dashboard Overview

The sidebar is grouped into four sections:

**Bot** — Overview, Commands, Menu & Featured, Bot Info
**Audience** — Users, Groups, Broadcast, Memory
**Intelligence** — AI, MCP
**System** — Settings, Cleanup, Backup, Activity Log, Update

### 📁 Commands

Manage your bot like a file explorer:

- Create, edit, and delete commands
- Organize commands into folders
- Navigate using breadcrumbs
- Enable / disable commands
- Restrict commands to admins only
- Move commands up / down within a folder

### 🎹 Inline Keyboard Builder

Create Telegram inline keyboards without writing JSON:

| Button type | Description |
|---|---|
| Callback | Trigger an action |
| Command | Open another command |
| URL | Open websites or channels |

### ⌨️ Reply Keyboard Builder

Design Reply Keyboards visually:

- Add, remove, reorder buttons
- Link buttons to commands
- Toggle keyboard visibility per command
- Set resize / one-time / persistent / placeholder
- No manual JSON editing

### ⭐ Menu & Featured

- Publish Telegram's built-in menu commands (`/help`, `/start`, `/settings`, …) directly from the dashboard
- Manage **Featured Commands** in three flavours:
  - **DM commands** — a user types `/contact hello boss` and the note lands in *Users → Direct messages* under that user. The bot deletes the trigger and confirms with your success message.
  - **Buttons commands** — users build their own inline keyboards: `/menu "Hi there!" {Google}(https://google.com){Say hi}(Hi!){Menu}(/start)`
  - **MCP commands** — `/mcp instruction` talks to the MCP agent from Telegram

### 👥 Users

Everyone who has interacted with your bot, split into `Started bot` (green — you can DM them) and `Group only` (yellow — they haven't pressed Start). Filter, search, check reachability, promote to admin, or block.

Opening a user shows a **Direct messages** tab (send DMs, edit/delete past ones) and an **AI memory** tab (inspect, edit, or delete individual memory entries).

### 👥 Groups

Per-group AI mode, memory, mention rules, welcome messages, rules text, anti-flood, link filtering, service-message cleanup, member tracking, and one-off announcements.

### 📣 Broadcast

Send a message to everyone who started the bot, only AI-blocked users, specific IDs, or a hand-picked list. Attach photos and keyboards, control delivery pacing, and edit or delete past broadcasts from every recipient's chat.

### 🧠 Memory

A single view of everything stored: AI memory count, DM count, and per-user breakdown. Clear one user, one scope, or everything. Configure time-based auto-removal that runs with scheduled cleanup.

### 🤖 AI Assistant

Configure providers, system prompts, knowledge bases, memory, suggested questions, rate limits, streaming, and safety controls — all from the dashboard.

### 🔌 MCP

Enable the `/mcp` endpoint, issue bearer tokens, pick an MCP AI provider, choose which tool categories are allowed, and chat with your bot through the built-in MCP console. See [MCP Server](#mcp-server).

### 🧹 Cleanup

Optional scheduled cleanup. Configurable per table with sensible defaults and a "Run now" button. A sample Cloudflare `[triggers]` block is shown inline.

### 📦 Backup

Full export, custom export (choose which sections), and restore. Secrets (bot token, webhook secret, API keys) are never included.

### 📋 Activity Log

Recent admin actions with optional auto-delete by age.

### ⬆️ Update

Checks `version.json`, validates your Cloudflare API token, uploads the latest `worker.js`, and **rotates the webhook secret automatically**.

---

## AI Assistant

Nyxx includes a full AI chatbot engine. Here's what you get:

- **Providers**: OpenAI, Google Gemini, DeepSeek, Groq, OpenRouter, Ollama (local), Custom (any OpenAI-compatible API)
- **Main + up to 5 fallbacks**: the bot keeps working if the primary provider fails
- **Streaming**: live-editing replies with sensible throttling
- **System prompt**: placeholders like `{{bot_name}}`, `{{user_first_name}}`, `{{current_time}}`, `{{available_commands}}`, and custom `{{key}}` variables
- **Knowledge bases**: add multiple content blocks; the AI uses only the ones you enable
- **Memory**: per-chat, configurable depth (0 = off), with a per-user memory editor and usage counter
- **Strict mode**: answer only from your instructions and knowledge bases
- **RTL support**: automatic right-to-left marks on Persian/Arabic paragraphs
- **Playground**: test prompts and provider configs before going live
- **Suggested questions**: render quick-reply chips in chat
- **Safety**: per-user and global rate limits, per-group mention rules, ignore prefixes / bots / forwards
- **Triggers**: always reply, reply only when no command matches, or reply on text match
- **Templates**: five ready-made prompts (Personal assistant, Customer support, Restaurant, Programming helper, Tutor)

---

## MCP Server

Nyxx is one of the few Telegram bot builders with a built-in **Model Context Protocol** server.

### Endpoint

```http
POST https://YOUR-WORKER.workers.dev/mcp
Authorization: Bearer nyxx_YOUR_TOKEN_HERE
Content-Type: application/json
```

- **Transport**: Streamable HTTP
- **Protocol version**: `2025-03-26`
- **Auth**: Bearer token, hashed in D1 with SHA-256. Tokens are shown **once** — copy them immediately.
- **Stateless**: no session ID, no SSE stream. `GET` returns `405`, `DELETE` returns `200`.

> Replace `YOUR-WORKER` with your Worker's subdomain and `YOUR_TOKEN_HERE` with the token generated in the **MCP → Bearer tokens** panel.

### Token categories

Each MCP token inherits the endpoint's tool permissions, which you enable in **MCP → Tool permissions**:

| Category | What it can do |
|---|---|
| **Read** | Stats, users, commands, groups, webhook health, bot info, memory overview |
| **Write** | Create / update / delete commands, publish menu, update AI settings, update bot profile |
| **Outbound** | Send DMs, broadcast messages |
| **Dangerous** | Delete users, clear all AI memory — always require `confirm: true` |

Outbound and Dangerous are **off by default**.

### Available tools

`get_stats`, `list_users`, `get_user`, `list_commands`, `get_command`, `list_groups`, `get_menu`, `get_settings`, `test_webhook`, `get_memory_overview`, `get_bot_info`, `create_command`, `update_command`, `delete_command`, `set_menu`, `update_ai_settings`, `set_bot_info`, `send_dm`, `send_broadcast`, `delete_user`, `clear_ai_memory`.

### Dashboard chat

The MCP tab includes a built-in chat that drives the same tool set — useful for testing and for quick admin actions without opening a client.

### Telegram integration

Enable MCP and the bot exposes a `/mcp` command. Users with the correct permissions (and, for admin-only featured commands, an admin role) can type:

```text
/mcp create a /help command that replies with a welcome message
```

The agent calls the appropriate tools, and the reply includes which tools were used.

### Client setup

The MCP tab shows ready-to-paste snippets for:

- **Claude Desktop** — via `mcp-remote`
- **Cursor** — native Streamable HTTP
- **curl** — smoke test

Debug with the official inspector:

```bash
npx @modelcontextprotocol/inspector
```

---

## Architecture

```text
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
  │  • REST API for the dashboard                       • groups
  │  • AI orchestration                                 • settings
  │  • MCP JSON-RPC endpoint                            • AI memory
  └──────────────┬──────────────────┬───────────────────┘ • DMs
                 │                  │                     • MCP tokens
                 ▼                  ▼
        Telegram (webhook,       AI providers                MCP clients
        secured by secret)       (OpenAI / Gemini /          (Claude Desktop,
                                 DeepSeek / Groq /            Cursor, Cline,
                                 OpenRouter / Ollama /        curl)
                                 custom)
```

---

## Repository Structure

```text
Nyxx/
│
├── installer.html        The web wizard — token verification, proxy selection,
│                         panel scanning, create/update/delete, custom worker names
│
├── worker.js             The Nyxx panel — Telegram bot engine, dashboard UI,
│                         REST API, authentication, D1 logic, AI assistant,
│                         MCP JSON-RPC server
│
├── proxy.js              The CORS proxy that relays browser ⇄ Cloudflare API
│                         requests (hardened: host allow-list + SSRF protection)
│
├── version.json          Release metadata — powers the installer's version chip
│                         and the panel's in-dashboard Update tab
│
├── logo.webp             Project logo
│
└── README.md             This file — the public GitHub README
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

# Optional: scheduled cleanup (see Cleanup tab)
# [triggers]
# crons = ["0 3 * * *"]
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

The **Update tab** in your panel:

1. Checks `version.json` for the latest release
2. Validates your Cloudflare API token
3. Downloads the latest `worker.js`
4. Deploys it to your Cloudflare account
5. **Rotates the webhook secret automatically**

Your bot token, D1 data, and configuration stay intact.

### Manual update

1. Download the latest release.
2. Replace your Worker code.
3. Deploy again.

Your D1 database and existing bot configuration remain intact.

> Always create a backup from the Backup tab before major updates.

---

## Security

Nyxx is designed so deployment happens directly into **your own Cloudflare account**, and the panel is hardened against common attacks:

- **API tokens stay in your browser.** The installer never sends your Cloudflare token to any third-party server — it only goes to Cloudflare's own API.
- **Everything belongs to you.** Your Worker and your D1 database run under your Cloudflare account.
- **PBKDF2 password hashing.** Admin passwords are stored as `pbkdf2$100000$SALT$HASH` (SHA-256, 100k iterations). Legacy `sha256$` hashes are still verifiable and are re-hashed automatically on the next successful login.
- **Webhook secret token.** Every webhook is registered with a `secret_token`, and the panel rejects any delivery that doesn't carry `X-Telegram-Bot-Api-Secret-Token`. The secret is rotated automatically on token changes and in-panel updates.
- **CSRF protection.** Every mutating `/api/*` request is checked for a same-origin `Origin` (or `Referer`) header. Cross-site POSTs, PATCHes, and DELETEs are rejected with `403`.
- **Session cookies.** `HttpOnly`, `SameSite=Lax`, `Secure` when served over HTTPS. Sessions are pruned daily.
- **MCP bearer tokens.** Hashed with SHA-256 in D1; the plaintext token is shown **once** when generated. Token updates are rate-limited by a per-request cache to keep D1 write volume low.
- **MCP confirmations.** Destructive tools (`delete_user`, `clear_ai_memory`) require `confirm: true` and are disabled by default until you enable the Dangerous category.
- **Hardened CORS proxy.** The default proxy only forwards to `api.cloudflare.com`, `raw.githubusercontent.com`, and `*.workers.dev`, and blocks targets that resolve to private, loopback, link-local, or cloud-metadata addresses (SSRF protection). Errors are returned as CORS-safe JSON.
- **Security headers.** `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Strict-Transport-Security`, and a restrictive `Permissions-Policy` are set on all responses. Errors never leak stack traces.

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
| Grouped Sidebar Navigation | ✅ |
| Overview Dashboard | ✅ |
| Nested Commands / Folders | ✅ |
| Inline Keyboards | ✅ |
| Reply Keyboards | ✅ |
| Telegram Menu Commands | ✅ |
| Featured Commands (DM / Buttons / MCP) | ✅ |
| User Management | ✅ |
| User Direct Messages (send/edit/delete) | ✅ |
| Admin-only Commands | ✅ |
| Text Responses | ✅ |
| Photo Responses | ✅ |
| Long-message Splitting | ✅ |
| HTML Sanitisation & Fallback | ✅ |
| Bot Information Editor | ✅ |
| Automatic Webhook | ✅ |
| Webhook Secret Token | ✅ |
| Webhook Diagnostic Test | ✅ |
| PBKDF2 Password Hashing | ✅ |
| CSRF Origin Checks | ✅ |
| Groups Management | ✅ |
| Anti-flood / Link Filter | ✅ |
| Welcome & Rules | ✅ |
| Group Announcements | ✅ |
| Broadcast (targeted audiences) | ✅ |
| Broadcast Editing & Deletion | ✅ |
| Memory Overview & Cleanup | ✅ |
| Scheduled Cleanup (Cron) | ✅ |
| Activity Log | ✅ |
| Full & Custom Backup | ✅ |
| Restore | ✅ |
| AI Assistant (multi-provider) | ✅ |
| AI Streaming | ✅ |
| AI Fallback Providers | ✅ |
| AI Knowledge Bases | ✅ |
| AI Strict Mode | ✅ |
| AI RTL Support | ✅ |
| AI Conversation Memory | ✅ |
| AI Playground | ✅ |
| AI Rate Limiting | ✅ |
| AI Suggested Questions | ✅ |
| MCP Server (`/mcp`) | ✅ |
| MCP Bearer Tokens | ✅ |
| MCP Dashboard Chat | ✅ |
| MCP Telegram Command | ✅ |
| MCP Tool Categories | ✅ |
| MCP Client Setup Snippets | ✅ |
| In-dashboard Update | ✅ |
| Factory Reset | ✅ |
| One-click Installer | ✅ |
| Self Hosted | ✅ |

---

## Screenshots

<p align="center">

<a href="screenshots/screenshot.png">
  <img src="screenshots/screenshot.png" width="80%" alt="Dashboard">
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

No. The installer is designed so your API token stays inside your browser during installation and is only ever sent to Cloudflare's API. When you use the in-dashboard Updater, the token is stored in your own D1 database (like your bot token) so you can trigger future updates without re-pasting it.

### Which AI providers can I use?

OpenAI, Google Gemini, DeepSeek, Groq, OpenRouter, Ollama (local), or any custom OpenAI-compatible API — with a main provider and up to five automatic fallbacks.

### What is MCP?

MCP (Model Context Protocol) is an open standard from Anthropic that lets AI agents call tools exposed by a server. Nyxx ships a full MCP server at `/mcp` so clients like **Claude Desktop**, **Cursor**, and **Cline** can manage your bot in natural language — with the same permission model as the dashboard.

### Can I use Claude Desktop or Cursor with Nyxx?

Yes. Open the **MCP** tab, enable the endpoint, generate a bearer token, and paste the ready-made config into `claude_desktop_config.json` (Claude Desktop) or `~/.cursor/mcp.json` (Cursor). Both snippets are shown inline.

### Does the panel send my data anywhere?

No. Your bot data stays in your own D1 database. The only outbound calls are to Telegram, to the AI provider you explicitly configure, to any MCP clients you connect, and to Cloudflare's API during updates.

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
- [ ] Plugin system
- [ ] Theme customization
- [ ] More MCP tools

---

## Changelog

### v4.2.0 — MCP, Featured Commands & Full Admin Suite

- **MCP (Model Context Protocol)** — full JSON-RPC 2.0 server at `/mcp` (Streamable HTTP, protocol `2025-03-26`), bearer-token auth, four tool categories, dashboard chat, client setup snippets, and a Telegram `/mcp` command.
- **Featured Commands** — DM commands (relay notes from users to you), Buttons commands (users build inline keyboards with `{Label}(value)` syntax), and MCP commands.
- **Groups management** — per-group AI mode, memory, mention rules, welcome messages, rules text, anti-flood, link filtering, service-message cleanup, member tracking, and one-off group announcements.
- **Memory control center** — combined AI + DM overview, per-user and bulk clear, time-based auto-removal that runs with scheduled cleanup.
- **Broadcast editor** — audience targeting, pacing controls, photo + button support, and the ability to edit or delete past broadcasts from every recipient's chat.
- **Activity Log** — recent admin actions with optional auto-delete by age.
- **Cleanup scheduler** — prune sessions, login attempts, rate-limit buckets, logs, AI memory, DM history, broadcasts, and inactive users; run manually or via Cloudflare Cron.
- **AI upgrades** — DeepSeek, Groq, OpenRouter, and Ollama providers; streaming replies; strict mode; RTL support; custom variables; five prompt templates; global rate limits; response delay; suggested questions.
- **Users** — DM tab with edit/delete, AI memory tab with edit/delete, block AI-only or full, promote/demote, reachability check.
- **Backup** — full export, custom export with section selection, and restore.
- **Update tab** — in-dashboard updates with automatic webhook secret rotation.
- **Security** — PBKDF2 password hashing (with SHA-256 legacy fallback), CSRF origin checks on all mutating API requests, hardened security headers, MCP token hashing.

### v3.0.0 — Major Overhaul (2026-08-18)

- **New Overview Dashboard** with statistics and quick actions.
- **Backup & Restore** – export/import all data.
- **User Management Enhancements** – block users, send private messages.
- **AI Assistant Overhaul**:
  - Up to 5 alternate providers as fallback.
  - Strict Mode (knowledge‑only answers).
  - RTL support for Persian/Arabic.
  - Rate limiting and memory trimming.
- **Command Management** – drag‑and‑drop reordering of keyboard buttons, move commands up/down.
- **UI/UX Redesign** – modern dark theme, Vazirmatn font, better mobile responsiveness.
- **Performance** – caching and batch DB operations.
- **Security** – webhook secret rotation on update.
- Bug fixes: command rename references, webhook test, same‑token updates, memory clear.

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
- The Model Context Protocol team at Anthropic
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