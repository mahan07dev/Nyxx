<p align="center">
  <img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/logo.webp" alt="Nyxx Logo" width="200">
</p>

<h1 align="center">Nyxx</h1>

<p align="center">
  Telegram Bot Builder for Cloudflare Workers
</p>

<p align="center">
  <a href="https://workers.cloudflare.com/">
    <img src="https://img.shields.io/badge/Cloudflare-Worker-F38020?logo=cloudflare" alt="Cloudflare Worker">
  </a>
  <a href="https://core.telegram.org/bots/api">
    <img src="https://img.shields.io/badge/Telegram-Bot%20API-26A5E4?logo=telegram" alt="Telegram Bot API">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License">
  </a>
</p>

**Nyxx** is a complete, self‑hosted solution to create and manage Telegram bots directly from your Cloudflare Worker.  
It provides a visual dashboard (no Tailwind, pure CSS) where you can:

- 📝 Create **commands** with nested folders, inline buttons, and reply keyboards
- 🖼️ Send **photos** with captions
- 👤 Manage **users** and promote/demote admins
- 📋 Set the **bot info** (name, description, short description, profile photo)
- 📌 Publish **menu commands** (the `/` list) to Telegram
- 🔗 Auto‑provision a **D1 database** and bind it to your Worker
- ⚡️ Fully **open‑source** – you own your data

> Built with ❤️ by [@Mahan07dev](https://t.me/Mahan07dev)

---

## 🚀 Features

- **Zero‑config setup** – just paste your Cloudflare API token, and Nyxx creates and binds a D1 database for you.
- **Intuitive file‑manager** – commands can be nested in folders; you get a breadcrumb navigation.
- **Rich message formats** – supports HTML (`<b>`, `<i>`, `<a>`), photos, and custom inline keyboards.
- **Reply keyboards** – define buttons that trigger other commands, plus an automatic **Back** button for parent‑child navigation.
- **User management** – track who used the bot, search, and assign admin roles.
- **Bot customisation** – change the bot’s name, description, short description, and profile photo via the dashboard.
- **Menu commands** – easily set the bot’s command list (`/start`, `/help`, etc.) and publish to Telegram.
- **Factory reset** – wipe all data and start fresh.

---

## 📦 Installation & Deployment

### Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/)
- A Telegram bot token from [@BotFather](https://t.me/botfather)

### Steps

1. **Create a Worker** on Cloudflare (or use an existing one).
2. **Copy the entire `worker.js`** from this repository into your Worker’s code editor.
3. **Deploy** the Worker.
4. Visit the Worker’s URL – you’ll see the **Nyxx Setup Wizard**.
5. Follow the steps:
   - **Step 0**: Welcome & credits.
   - **Step 1**: Generate a Cloudflare API token (with permissions for Workers and D1) and paste it – Nyxx auto‑discovers your account and script name.
   - **Step 2**: Paste your Telegram bot token – Nyxx sets the webhook automatically.
   - **Step 3**: Use the full dashboard to build your bot!

> **Note**: Nyxx requires the `DB` D1 binding. The setup wizard creates and binds it for you.

---

## 🧩 Usage (Dashboard)

After setup, you land on the dashboard with five tabs:

- **Commands** – add/edit/delete commands. Commands can be nested (folders). Supports:
  - Response type: text or photo
  - Inline buttons (URL, callback, or command)
  - Reply keyboard buttons (with auto‑Back)
  - Admin‑only toggle
- **Menu** – define the bot’s global command list (e.g., `/start`, `/help`) and publish to Telegram.
- **Users** – view all users who have interacted, search, and change roles.
- **Settings** – view/change bot token, test webhook, factory reset.
- **Bot Info** – edit and publish the bot’s name, description, short description, and profile photo.

---

## 🔧 Development & Customisation

Nyxx is written as a single **Cloudflare Worker** (ES module).  
The code is well‑commented; you can extend it easily:

- Add new API endpoints in the router.
- Modify the HTML/CSS to change the dashboard look.
- Enhance the Telegram bot logic (e.g., add support for locations, documents, etc.).

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

- **Author**: [@Mahan07dev](https://t.me/Mahan07dev)  
- **GitHub**: [Mahan07dev](https://github.com/Mahan07dev)  
- **Built with**: Cloudflare Workers, D1, Telegram Bot API, Font Awesome

---

## 🌟 Support & Contributions

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or pull request on [GitHub](https://github.com/Mahan07dev/nyxx).

If you find Nyxx useful, please ⭐ star the repository and share it with others!
