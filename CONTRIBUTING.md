# Contributing to Nyxx

Thanks for your interest in Nyxx! Whether you're fixing a typo, reporting a bug, or opening a full pull request, every contribution helps.

---

## 💬 Want to contribute or cooperate?

For contributions, collaboration, or partnerships, message me directly on Telegram:

### 👉 [@nyxx_official_channel](https://t.me/nyxx_official_channel)

Ideas, bugs, feature proposals, partnership inquiries — all welcome. I read every message.

---

## Ways to help

- 🐛 **Report bugs** — open an issue with steps to reproduce
- 💡 **Suggest features** — describe what and why
- 📖 **Improve docs** — fix typos, clarify confusing sections
- 🧪 **Test releases** — try new versions and report breakage
- 🔧 **Open pull requests** — fix bugs, add features, refactor
- 📣 **Share the project** — star the repo, tell a friend
- 🤝 **Cooperate** — reach out on Telegram for partnerships

---

## Before you start

- **Small changes** (typos, minor bugs, docs) — open a PR directly
- **Larger changes** (new features, refactors) — open an issue first to discuss

Please read the [README](README.md) and skim the code before opening a PR.

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

---

## Code style

- Plain modern JavaScript (ES2020+), no build step, no TypeScript
- No external runtime dependencies in `worker.js`
- Comments for non-obvious logic (security checks, rate limits, migrations)
- Defensive error handling — never leak stack traces to clients
- Never bypass CSRF checks, webhook secret validation, or password hashing

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
```

---

## Pull request process

1. Fork the repo and create a branch: `git checkout -b feature/your-feature`
2. Make focused changes — keep the diff easy to review
3. Test everything affected (dashboard, bot, MCP, installer)
4. Update the README if your change affects user-facing behaviour
5. Push to your fork and open a PR against `main`
6. In the PR description, include what, why, and how you tested
7. Be responsive to review feedback

Small, focused PRs are merged faster than large ones.

---

## License

By contributing, you agree your changes will be licensed under the same [MIT License](LICENSE) that covers the project.

---

## Questions?

- **Telegram** — [@nyxx_official_channel](https://t.me/nyxx_official_channel)
- **GitHub Issues** — https://github.com/Mahan07dev/Nyxx/issues