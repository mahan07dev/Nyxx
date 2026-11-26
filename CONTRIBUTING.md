# Contributing to Nyxx

Thanks for your interest in Nyxx!

---

## 💬 Ideas, Feedback & Forking

I don't accept direct cooperation or pull requests on this project. However, if you have any **ideas, suggestions, or bug reports**, feel free to share them with me in any way you prefer:

### 👉 [@nyxx_official_channel](https://t.me/nyxx_official_channel) · [GitHub Issues](https://github.com/Mahan07dev/Nyxx/issues)

If you want to work on the project, modify it, or build your own features, you are welcome to **fork the repository** and work independently on your own fork under the [MIT License](LICENSE).

---

## Ways to help

- 🐛 **Report bugs** — open an issue with steps to reproduce
- 💡 **Suggest features** — share your ideas on Telegram or GitHub Issues
- 🧪 **Test releases** — try new versions and report breakage
- 📣 **Share the project** — star the repo, tell a friend
- 🍴 **Fork & build** — fork the repository to work on your own version

---

## Before you start

- **Ideas & bugs** — open an issue or message me on Telegram
- **Code changes** — fork the repository and work on your own fork (direct PRs / cooperation are not accepted)

Please read the [README](README.md) if you want to understand how the project is structured.

---

## Reporting bugs

Include:

1. What you expected
2. What actually happened
3. Steps to reproduce
4. Your environment (browser, Nyxx version from the dashboard, region if relevant)
5. Screenshots or logs if helpful

**Security issues** — do not open a public issue. Contact me on Telegram instead.

---

## Suggesting features

- Explain what you want and why
- Describe how it might fit the existing dashboard, if possible
- Check the roadmap in the README first

Not every idea will fit the project's scope, but I'll explain my reasoning when declining.

---

## Development

Three core files, no build step:

| File | Purpose |
|---|---|
| `worker.js` | Bot engine, dashboard, REST API, AI, MCP server, `/chat` UI |
| `installer.html` | Install / update / delete wizard |
| `proxy.js` | CORS proxy + optional OAuth relay |

### Testing locally

1. Create a Cloudflare Worker and a D1 database, bind the database as `DB`
2. Deploy `worker.js` and open the worker URL
3. Complete the setup wizard with a test bot token
4. For the installer: open `installer.html` in a browser (or serve locally)
5. For the proxy: deploy `proxy.js` to a Cloudflare Worker

Manual testing is the current standard. When testing your changes, verify:

- Dashboard loads and the setup wizard works
- Creating / editing / deleting commands works
- Broadcast and DM sending work with a bot connected
- MCP endpoint responds to `initialize`, `tools/list`, and `tools/call`
- Installer can still create and update workers
- **Channels Tab** — auto-discovery works when the bot is promoted, and manual connect accepts `@username` and `-100…` IDs
- **Channel Post Composer** — publishing rich HTML, albums, inline buttons, and `protect_content` posts succeeds; Edit, Pin, and Delete controls work
- **Channel Automation** — auto-signature, auto-attach buttons, auto-capture, and auto-pin rules fire correctly
- **Media Library** — uploads (direct and 2 GB auto-capture) index correctly; List, Grid, and Detailed views render; bulk actions (validate, grant/revoke access, set expiration, delete) complete without errors
- **Multi-media attachments** — commands and broadcasts send albums of up to 10 compatible items, falling back gracefully when incompatible
- **Multi-argument commands** — `/cmd arg1 arg2` resolves to the longest matching command and injects `{{args}}` / `{{argN}}` correctly in private chats, groups, deep links, and inline callbacks
- **Session-scoped navigation** — reply keyboard buttons and Back actions respect the active command chain in multilingual folders
- **Keyboard builders** — row/layout controls (Add row, move left/right/up/down) and per-button colours persist and render in both themes
- **Searchable command combobox** — filters large command lists live and allows typing custom commands / argument variants
- **Navigation style presets** — switching between visual styles and structures works and persists, and Top Bar dropdowns render cleanly without overlapping tab headers
- **Inline edit & auto-back** — commands with `edit_message` edit in place across both inline callbacks and reply keyboard buttons (with graceful fallback on incompatible media), and inline auto-back appends a working parent Back button
- **Custom popup alert & toast buttons** — `Popup alert` (`ALERT:`) and `Toast` (`TOAST:`) inline buttons display native Telegram dialogs/banners with placeholders replaced
- **Dynamic floating menus** — action dropdowns, command comboboxes, and Top Bar menus flip/clamp cleanly within the viewport on both mobile and desktop
- **Force Join** — global and per-command channel/group membership gating, Check callback, and `verify_chat` work as expected
- **Multi-mode `/chat` & Nyxx AI Support** — switching between Support, Bot AI, and MCP modes works across new and existing threads
- **Proxies tab & Command templates** — adding/testing proxies, `Paste & Update Cmd` bulk hourly workflow, `Delete not working`, bulk test/copy, building single/multi-proxy commands, and applying templates work cleanly
- **Media Library invalid pruning** — `Delete invalid` removes failed-validation entries cleanly
- **Group subtypes & Global Anti-Flood** — Forum `message_thread_id` replies, Discussion auto-comment & exempt linked forwards, DM Group alerts/auto-reply, and `Settings → Global Anti-Flood` escalation work cleanly
- **Permissions ACL & Broadcast Audience Builder** — per-permission Allowed/Disallowed IDs (global & per-group), Broadcast audience pills + include/exclude IDs, and new-to-old chat/DM/history ordering work as expected
- **Tabbed UI, Bot Profile & Recovery** — AI/Settings sub-tabs, tabbed Message Editor, dynamic `/chat` empty states, Bot Profile menu button & admin rights, Browser & Cache Tools (pre-login & Settings), and 15s Update lock timer work cleanly
- **Per-command password & Inline ACL** — command passwords prompt with Dismiss/Back buttons and clean up messages; inline ACL blocks disallowed/unauthorized taps in groups
- **Proxy sharing & testing** — `PROXY:` / `PROXY_MSG:` callbacks resolve DNS, test latency, and display proxy details cleanly
- **Storage reindexing & bulk modals** — `Reindex storage` probes and scans messages in chunks, and bulk actions across Users, Media Library, and Broadcast display live progress and cancel cleanly
- **Per-message Contact tracking** — Inbox "Mark read" and admin DM notification buttons (Reply / Dismiss / Mark as seen) mark only the targeted message as read and update the topbar Inbox pill
- **Featured commands suite & ACL** — choosing any of the 13 featured command types via the picker modal, filtering/searching, per-command Allowed/Disallowed user IDs, and executing Polls, Media Search (`/get`), Proxy Tester (`/checkproxy`), Quick Moderation (`/warn`/`/mute`/`/ban`), User Inspector (`/whois`), Anonymous Box (`/anon`), Chat Broadcast (`/announce`), Channel Post (`/post`), AI Transform (`/translate`/`/tldr`), and Temp Messages (`/temp`)
- **OAuth refresh** (if touching `proxy.js` or the update flow) — `/oauth/refresh` issues a new access token when a refresh token is present, and `/api/oauth/status` reports the correct connection state
- **Group management suite** — media locks, welcome/goodbye & rules, captcha, warns, slow mode, night mode, anti-raid, word blacklist / custom filters, and `inherit`/`on`/`off` anti-flood consistency
- **Mini-games** — Neon Snake, 2048, Brick Breaker, and Sky Dash launch cleanly, enforce per-game access/allowed-disallowed lists, and post cooldown-limited chat leaderboard updates
- **Accounts & concurrent editing** — username + password login, Accounts manager (tab-scoped accounts, renaming without password reset), and version-checked save conflict detection
- **Web Push notifications** — VAPID key auto-generation, subscribe/unsubscribe, preview toggle, and test notifications
- **Retention & locked Start button** — optional `0` retention settings, mini-game leaderboard retention, Memory/Activity Log sync, and click-countdown guard on the locked Start menu button

---

## Code style

- Plain modern JavaScript (ES2020+), no build step, no TypeScript
- No external runtime dependencies in `worker.js`
- Comments for non-obvious logic (security checks, rate limits, migrations)
- Defensive error handling — never leak stack traces to clients
- Never bypass CSRF checks, webhook secret validation, or password hashing
- When bumping `SCHEMA_VERSION`, write a non‑destructive migration (add tables/columns/indexes) and ensure `Settings → Schema health → Run auto-heal` can repair the change
- For multi‑argument commands, preserve the longest‑match resolution and HTML‑escape user input in `{{args}}` / `{{argN}}`

When adding a new endpoint: place it in the `fetch` router, apply the existing security helpers, and register it in the dashboard. When adding a new UI element: follow the existing design system, make sure it works on mobile, test in both themes.

---

## Commit messages

Use clear, descriptive messages. A simple convention:

```
<area>: <short summary>
```

Examples:

```
mcp: add clear_ai_memory tool with confirm guard
ai: fix streaming edit throttle for long replies
installer: show beta badge when latest is a prerelease
docs: clarify proxy deployment steps
channels: auto-capture media into library on channel post
media: support 2 GB auto-capture and bulk access grants
oauth: add POST /oauth/refresh with offline_access fallback
```

---

## Forking the project

Direct cooperation and pull requests are not accepted on this repository. If you'd like to work on Nyxx yourself:

1. Fork the repo on GitHub
2. Make whatever changes or experiments you want on your fork
3. Keep the [MIT License](LICENSE) notice intact when distributing

---

## License

By contributing, you agree your changes will be licensed under the same [MIT License](LICENSE) that covers the project.

---

## Questions?

- **Telegram** — [@nyxx_official_channel](https://t.me/nyxx_official_channel)
- **GitHub Issues** — https://github.com/Mahan07dev/Nyxx/issues