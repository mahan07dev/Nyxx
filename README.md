<div align="center">

<img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/logo.webp" width="120" alt="Nyxx Logo">

<h1>Nyxx</h1>

<p><b>A self-hosted Telegram bot builder for Cloudflare Workers — dashboard, AI assistant, and MCP server included.</b></p>

<p>
<a href="https://mahan07dev.github.io/Nyxx/installer">🚀 One-Click Installer</a> ·
<a href="https://github.com/Mahan07dev/Nyxx/releases">Releases</a> ·
<a href="https://t.me/nyxx_official_channel">Telegram</a>
</p>

<p>
<img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Workers">
<img src="https://img.shields.io/badge/Cloudflare-D1-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare D1">
<img src="https://img.shields.io/badge/Telegram-Bot_API-26A5E4?logo=telegram&logoColor=white" alt="Telegram Bot API">
<img src="https://img.shields.io/badge/MCP-Model_Context_Protocol-black" alt="MCP">
<img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
<a href="https://deepwiki.com/mahan07dev/Nyxx"><img src="https://img.shields.io/badge/Ask-DeepWiki-blue?logo=readthedocs" alt="Ask DeepWiki"></a>
</p>

</div>

<hr>

<h2>Quick Start</h2>

<p>The fastest way to install Nyxx is the automated installer — no CLI, no wrangler, no manual setup:</p>

<h3>👉 <a href="https://mahan07dev.github.io/Nyxx/installer">https://mahan07dev.github.io/Nyxx/installer</a></h3>

<p>The wizard creates the Worker, creates and binds the D1 database, uploads the latest code, and gives you your dashboard URL. It also handles updates and deletion of existing panels.</p>

<hr>

<h2>Features</h2>

<h3>Bot engine</h3>
<ul>
  <li>Nested commands with folders and breadcrumbs</li>
  <li><b>Session-scoped nested navigation</b> — reply keyboard buttons and Back actions resolve against the user's active command chain, so multilingual folders (<code>/en</code> vs <code>/fa</code>) no longer cross-talk</li>
  <li><b>Multi-argument commands</b> — <code>/start</code>, <code>/start fa</code> and <code>/start fa game</code> can coexist; Nyxx resolves the longest match and passes trailing text into <code>{{args}}</code> / <code>{{arg1}}</code></li>
  <li><b>Edit current message</b> — per-command toggle with individual trigger checkboxes (<b>Inline button</b>, <b>Reply button</b>, <b>Typed /command</b>) to edit the bot's message in place, with automatic fallback when media types change</li>
  <li><b>Per-command passwords</b> — lock individual commands behind a password prompt with customizable Dismiss and automatic Back buttons</li>
  <li><b>Command Templates</b> — one-click starter packs (Edit-in-Place Menu, Proxy Seller Bot, Support FAQ Desk, Protected Digital Store)</li>
  <li><b>Custom Popup alert &amp; Toast buttons</b> — inline buttons can open native Telegram centered popup alerts or top toast banners with custom text and placeholders</li>
  <li>Custom auto-back controls — separate toggles and custom back-button labels for both reply keyboards and inline keyboards</li>
  <li><b>Proxy sharing &amp; testing</b> — share MTProto/SOCKS5 buttons and test live ping, IP, location, ISP, and TLS secret details with <code>PROXY:</code> / <code>PROXY_MSG:</code> callbacks or <code>{{proxy_info:...}}</code></li>
  <li>Nine reply types: text, photo, video, animation, voice, audio, document, round video, sticker</li>
  <li><b>Multi-media attachments</b> — attach up to 10 compatible items per message via smart <code>sendMediaGroup</code> batching</li>
  <li><b>Media upload</b> through the dashboard (stored on Telegram via <code>file_id</code>) or direct URLs</li>
  <li><b>Command arguments</b> — <code>{{args}}</code>, <code>{{arg1}}</code>, <code>{{arg2}}</code>, … insert the user's input into replies (HTML-escaped)</li>
  <li>Inline and reply keyboards built visually with <b>full row &amp; layout control</b> — add buttons to specific rows, move them left/right/up/down, and set <b>per-button colors</b> (blue / green / red) with live preview</li>
  <li>Telegram menu commands and custom featured commands (DM / Buttons / MCP)</li>
  <li>Featured Buttons commands support <code>[blue]</code> / <code>[green]</code> / <code>[red]</code> label prefixes and a default button color</li>
  <li>Granular access control: per-command access levels (everyone, specific users, moderator+, admin), <b>allowed &amp; disallowed user IDs</b>, expiry dates, plus <b>per-message inline button batch restrictions</b></li>
  <li><b>Protect content</b> — prevent forwarding and saving on commands, DMs, group announcements and broadcasts</li>
</ul>

<h3>Channels &amp; media library</h3>
<ul>
  <li><b>Channels tab</b> — auto-discovers channels when the bot is promoted or receives posts; manual connect via <code>@username</code> or <code>-100…</code> ID</li>
  <li><b>Channel post composer &amp; history</b> — rich HTML posts, multi-media albums, inline buttons, silent posts, <code>protect_content</code> posts, plus edit / pin / delete from the dashboard</li>
  <li><b>Channel automation</b> — auto-signature footer, auto-attach inline buttons, auto-capture media into the library, auto-pin new posts, one-click use as media storage channel</li>
  <li><b>Infinite Telegram archiving</b> — use a channel, group (with one-click <b>Use as Media Storage</b>), or your own DM as storage; the "delete after upload" switch defaults to OFF so files stay archived</li>
  <li><b>Reindex storage chat</b> — scan and import existing media from your storage channel, group, or supergroup with range selection, duplicate skipping, and live progress tracking</li>
  <li><b>2 GB auto-capture</b> — post media (up to 2 GB) into the storage chat or send it to the bot as an admin and Nyxx records the <code>file_id</code>, filename, size and caption, bypassing the 45 MB Bot API upload limit</li>
  <li><b>Access control &amp; expiry</b> — restrict commands and linked media to specific users, or set <code>expires_at</code>; admins always retain access</li>
  <li><b>Modern library UI</b> — list, grid and detailed views, lazy loading, bulk actions (validate, grant / revoke access, set expiry, delete)</li>
</ul>

<h3>Force Join &amp; Proxies</h3>
<ul>
  <li><b>Force Join tab</b> — require users to join selected channels or groups globally (Commands, AI, Featured commands, Inline callbacks) or per command, with custom warning messages, invite buttons, and a live <b>Check</b> button</li>
  <li><b>Proxies tab</b> — built for proxy publishers &amp; sellers: paste MTProto/SOCKS5 links, run single or bulk live ping/country/ISP tests, and generate single or multi-proxy commands with Connect + Test buttons in one click</li>
</ul>

<h3>Users &amp; groups</h3>
<ul>
  <li>User management with roles (user / moderator / admin) and manual <b>Add a user</b> / <b>Connect a group</b> tools</li>
  <li>Block users entirely or only from the AI</li>
  <li>Per-user direct messages (send / edit / delete with full media) and AI memory (view / edit / delete)</li>
  <li><b>Contact inbox</b> — collects messages from DM featured commands, with topbar &amp; sidebar unread indicators, per-message read tracking, 3-button admin DM notifications (Reply / Dismiss / Mark as seen), search, and stats</li>
  <li><b>Contact automation</b> — admin notifications, auto-reply, away mode, and per-user rate limits</li>
  <li>Per-group settings: AI mode, AI trigger (mention / reply / either / both / every message), memory, welcome, rules, anti-flood, link filter, service-message cleanup, member tracking</li>
  <li><b>Anti-flood escalation</b> — first offense triggers mute / kick / ban, then escalates after configurable thresholds</li>
  <li>Per-group permission overrides for commands, featured commands, AI, callbacks, rules, and MCP</li>
  <li>Broadcast with audience targeting, any media type, keyboards, and delivery pacing</li>
  <li>Automatic unreachable-user detection when Telegram reports blocked / deactivated users</li>
</ul>

<h3>AI assistant</h3>
<ul>
  <li>7 providers: OpenAI, Gemini, DeepSeek, Groq, OpenRouter, Ollama, Custom</li>
  <li>Primary + up to 5 fallback providers</li>
  <li>Streaming replies, strict mode, RTL support, knowledge bases</li>
  <li>Conversation memory (message-count and character-bounded), per-user and global rate limits</li>
  <li>Playground, suggested questions, and MCP tool integration</li>
  <li><b>Parallel MCP tool execution</b> — multiple tool calls in a single round-trip</li>
</ul>

<h3>MCP server</h3>
<ul>
  <li>Full JSON-RPC 2.0 server at <code>/mcp</code> (Streamable HTTP)</li>
  <li><b>32 tools</b> across four categories: read / write / outbound / dangerous</li>
  <li><b>Read:</b> stats, users, commands, groups, menu, settings, webhook health, memory, bot info, group settings, user memory, logs, broadcast history, featured commands</li>
  <li><b>Write:</b> commands, menu, AI settings, bot info, group settings, roles, blocks</li>
  <li><b>Outbound:</b> send DM, broadcast (with keyboards)</li>
  <li><b>Dangerous:</b> delete user, clear all AI memory, clear one user's memory — all require <code>confirm: true</code> and are off by default</li>
  <li>Bearer-token auth with hashed tokens, session memory, and rate limiting</li>
  <li>Multi-mode chat UI at <code>/chat</code> — switch between <b>Nyxx built-in support</b>, <b>Your Bot's AI</b>, and <b>MCP</b> right from the composer (also reachable via the <b>Nyxx AI support</b> button)</li>
  <li>Works with Claude Desktop, Cursor, Cline, and any MCP-compatible client</li>
</ul>

<h3>Dashboard</h3>
<ul>
  <li>Responsive UI, light &amp; dark themes, mobile friendly</li>
  <li><b>Navigation style presets</b> — switch live between visual styles (Classic, Modern Pills, Frosted Glass, Compact) and structures (Top Bar default with category dropdowns, Grouped, Flat List)</li>
  <li><b>Unified bulk progress modals</b> — live item counts, progress bars, and cancellation across reachability checks, deleting unreachable users, media validation/bulk edits, storage reindexing, and multi-wave broadcasts</li>
  <li><b>Privacy-first defaults</b> — on fresh D1 setups, memory and DM-saving options (<code>ai_memory</code>, <code>ai_group_memory</code>, <code>mcp_memory_limit</code>, <code>dm_save_private</code>, <code>dm_save_featured</code>) default to <b>OFF</b></li>
  <li><b>Searchable command combobox</b> — parent-folder and button-command pickers filter large command sets live and accept custom commands or argument variants</li>
  <li>Live status indicators and toast notifications, with errors surfaced as toasts above modals instead of inline boxes</li>
  <li>Backup &amp; restore (full or selective), including media library tables, <code>allowed_users</code> and <code>expires_at</code></li>
  <li>Scheduled cleanup via Cloudflare Cron</li>
  <li>Activity log with auto-delete and search</li>
  <li><b>Schema health</b> — dry-run drift report and one-click auto-heal (tables, columns, indexes, settings, backfills, and safe cleanup of expired / orphaned rows)</li>
  <li><b>Webhook diagnostics</b> — Telegram API latency, registered URL, pending updates, last error</li>
  <li><b>Media storage</b> setting for upload hosting</li>
  <li>In-dashboard updates with automatic webhook secret rotation</li>
  <li>Factory reset</li>
</ul>

<hr>

<h2>Installation</h2>

<h3>1. Automated (recommended)</h3>
<p>Use the installer: <a href="https://mahan07dev.github.io/Nyxx/installer">https://mahan07dev.github.io/Nyxx/installer</a></p>

<h3>2. Manual with wrangler</h3>

<pre><code># wrangler.toml
name = "nyxx"
main = "worker.js"
compatibility_date = "2026-08-16"

[[d1_databases]]
binding = "DB"
database_name = "nyxx"
database_id = "&lt;your-d1-database-id&gt;"
</code></pre>

<pre><code>npx wrangler deploy
</code></pre>

<p>Open the worker URL and complete the setup wizard. The database schema is created automatically on first run.</p>

<h3>3. Manual with your own proxy</h3>
<p>Deploy <code>proxy.js</code> to a Cloudflare Worker, update the proxy URL inside <code>installer.html</code>, and use the installer as normal. This removes any dependency on the hosted proxy.</p>
<p>To also self-host the <b>Connect Cloudflare</b> OAuth relay, bind a D1 database as <code>DB</code>, create your own Cloudflare OAuth client, and point <code>RELAY_BASE</code> in <code>worker.js</code> (or the <code>RELAY_BASE</code> variable) at your proxy. Full steps are in <a href="SECURITY.md">SECURITY.md</a>.</p>

<hr>

<h2>Updating</h2>

<p>Open the <b>Update</b> tab in your dashboard. Nyxx will:</p>
<ol>
  <li>Check <code>version.json</code> for the latest release</li>
  <li>Validate your Cloudflare credentials (OAuth or API token)</li>
  <li>Download and validate the new <code>worker.js</code></li>
  <li>Deploy it and rotate the webhook secret automatically</li>
</ol>

<p>Your bot token, D1 data, and configuration stay intact. You can also force-redeploy the current version if a deployment feels broken.</p>

<blockquote>
<p><b>Upgrading from a version before 4.9.4?</b> The <b>Connect Cloudflare</b> button in the dashboard stops working until the worker is updated, because the OAuth relay no longer uses a shared secret. Update once through the installer (OAuth or API token); everything else keeps working in the meantime.</p>
<p><b>Upgrading to 4.9.6?</b> The schema moves to version <b>22</b> (adds the <code>channels</code> table plus <code>media_items_json</code>, <code>protect_content</code>, <code>auto_back</code> and <code>back_label</code> columns through non-destructive migrations). If you self-host <code>proxy.js</code>, redeploy it and make sure your Cloudflare OAuth client allows the <b>refresh token</b> grant so automatic token refresh works.</p>
<p><b>Upgrading to 4.9.7?</b> The schema moves to version <b>23</b> (adds <code>edit_message</code>, <code>inline_auto_back</code>, <code>inline_back_label</code> on <code>commands</code> and <code>contact_msg_id</code> on <code>contact_pending_reply</code> via non-destructive migrations).</p>
<p><b>Upgrading to 4.9.8?</b> The schema moves to version <b>24</b> (adds <code>last_msg_id</code>, <code>last_chat_id</code>, <code>last_msg_kind</code> on <code>sessions</code> for cross inline/reply message editing).</p>
<p><b>Upgrading to 4.9.9?</b> The schema moves to version <b>25</b> (adds <code>proxies</code> and <code>inline_acl</code> tables plus command passwords, edit triggers, disallowed users, and Force Join overrides via non-destructive migrations).</p>
</blockquote>

<p>If the dashboard ever shows <b>"Database schema is out of date"</b> after an update, open <b>Settings → Schema health → Run auto-heal</b> — it fixes missing tables, columns, indexes and settings without touching live data.</p>

<hr>

<h2>Media storage</h2>

<p>Media uploaded through the dashboard is stored on Telegram and referenced by <code>file_id</code>. Storage is configured inside the <b>Media Library</b> tab:</p>

<ol>
  <li>Start a chat with your bot (or use any group the bot is in)</li>
  <li>Open <b>Media Library</b> and choose a channel, group, or your own private DM as the storage chat</li>
  <li>The bot verifies permissions and either uploads directly (up to 45 MB through the dashboard) or indexes media posted to the storage chat (up to 2 GB)</li>
</ol>

<p>Files are kept by default — the bot posts them to the storage chat, records the <code>file_id</code>, and leaves them archived. Direct URLs still work everywhere; the storage option is only for files that don't already have a stable public URL.</p>

<hr>

<h2>Security</h2>

<ul>
  <li>API tokens stay in your browser during install and are forwarded to Cloudflare's API through the CORS proxy (hosted default or your own). The proxy never stores them</li>
  <li><b>In-dashboard updater</b> stores the Cloudflare token / OAuth session in your own D1 database, never on a third-party server</li>
  <li><b>OAuth refresh</b> — the relay requests <code>offline_access</code> by default (with automatic fallback) and exposes <code>POST /oauth/refresh</code>; expired tokens refresh automatically and the UI reports the real connection state</li>
  <li>PBKDF2 password hashing (SHA-256, 100k iterations)</li>
  <li>Webhook secret tokens, rotated automatically on updates</li>
  <li><b>CSRF protection</b> — every mutating API request requires a session-bound token (<code>X-Nyxx-CSRF</code>)</li>
  <li><b>Distributed session invalidation</b> — changing the admin password signs out every browser on every worker isolate immediately</li>
  <li>HttpOnly, SameSite session cookies</li>
  <li>MCP bearer tokens hashed in D1, shown only once</li>
  <li>CORS proxy hardened against SSRF (allow-list + DNS-over-HTTPS resolution), no upstream redirects or cookies, sandboxed responses, optional rate limiting</li>
  <li><b>OAuth relay with no shared secret</b> — each login is bound to the worker that started it (PKCE-style verifier), requires a confirmation click naming the receiving host, and uses single-use, short-lived (≤ 5 min) exchange codes</li>
  <li>The hosted proxy/relay is operated by the maintainer; if you would rather not trust it, <a href="SECURITY.md">self-host it</a> or use the API token method</li>
  <li>Standard security headers on all responses (CSP, HSTS, X-Frame-Options, etc.)</li>
  <li>Destructive MCP tools require explicit <code>confirm: true</code> and are off by default</li>
  <li><b><code>ADMIN_PASS</code> environment variable</b> — an optional master override / recovery path for the D1 admin password</li>
</ul>

<hr>

<h2>Requirements</h2>

<ul>
  <li>A free Cloudflare account</li>
  <li>A Telegram bot token from <a href="https://t.me/BotFather">@BotFather</a></li>
  <li>A modern web browser</li>
</ul>

<p>Cloudflare's free plan is sufficient for most personal projects.</p>

<hr>

<h2>FAQ</h2>

<details>
<summary><b>Is Nyxx free?</b></summary>
<p>Yes, and it's designed to run on Cloudflare's free tier.</p>
</details>

<details>
<summary><b>Do I need a VPS?</b></summary>
<p>No. Everything runs on Cloudflare Workers.</p>
</details>

<details>
<summary><b>Is my Cloudflare token stored?</b></summary>
<p>Not by the installer. When you use the in-dashboard updater, the token (or OAuth session) is stored in your own D1 database. With <b>Connect Cloudflare</b>, the hosted relay holds the access token for up to 5 minutes until your worker collects it (single use), then deletes it. Since 4.9.6 the relay can also hold a refresh token so your connection survives access-token expiry. See <a href="SECURITY.md">SECURITY.md</a> for the trust model and how to self-host the relay.</p>
</details>

<details>
<summary><b>Which AI providers are supported?</b></summary>
<p>OpenAI, Gemini, DeepSeek, Groq, OpenRouter, Ollama (local), and any OpenAI-compatible API — with up to 5 fallbacks.</p>
</details>

<details>
<summary><b>What is MCP?</b></summary>
<p>Model Context Protocol — an open standard from Anthropic that lets AI agents call tools exposed by a server. Nyxx ships a full MCP server so Claude Desktop, Cursor, and Cline can manage your bot in natural language.</p>
</details>

<details>
<summary><b>How do I send videos, voice notes, or documents?</b></summary>
<p>Commands, direct messages, group announcements, channel posts and broadcasts all support nine reply types, and can attach up to 10 compatible items as an album. Use a direct URL, upload through the Media Library, or post the file into your Telegram storage chat (up to 2 GB) and let auto-capture record it.</p>
</details>

<details>
<summary><b>How do command arguments work?</b></summary>
<p>Add <code>{{args}}</code> (everything after the command) or <code>{{arg1}}</code>, <code>{{arg2}}</code>, … to a command's content. Example: a command <code>/echo</code> with content <code>You said: {{args}}</code> replies <code>You said: hello world</code> when the user types <code>/echo hello world</code>. You can also register <code>/start fa</code> as its own command — Nyxx picks the longest match. Input is HTML-escaped so it can never inject tags.</p>
</details>

<details>
<summary><b>Can I color the buttons?</b></summary>
<p>Yes. In the keyboard builders, pick a color per button (Default, Blue, Green, Red) and arrange rows freely. In Buttons featured commands, prefix any label with <code>[blue]</code>, <code>[green]</code> or <code>[red]</code>, or set a default color in the command editor.</p>
</details>

<details>
<summary><b>What happens if a migration fails?</b></summary>
<p>The schema is normally kept up-to-date automatically. If a migration ever fails silently, use <b>Settings → Schema health → Run auto-heal</b> — it inspects the actual database and creates any missing tables, columns, indexes or settings, and cleans up expired / orphaned rows. Safe to run multiple times.</p>
</details>

<details>
<summary><b>Can I customize the worker?</b></summary>
<p>Yes. <code>worker.js</code> is fully open source and meant to be modified.</p>
</details>

<hr>

<h2>Repository Structure</h2>

<table>
  <thead>
    <tr>
      <th align="left">File</th>
      <th align="left">Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="left"><code>worker.js</code></td>
      <td align="left">The Nyxx panel — bot engine, dashboard, REST API, AI, MCP server, <code>/chat</code> UI</td>
    </tr>
    <tr>
      <td align="left"><code>installer.html</code></td>
      <td align="left">The install / update / delete wizard</td>
    </tr>
    <tr>
      <td align="left"><code>proxy.js</code></td>
      <td align="left">Hardened CORS proxy + central OAuth relay (OAuth needs a D1 binding named <code>DB</code>)</td>
    </tr>
    <tr>
      <td align="left"><code>SECURITY.md</code></td>
      <td align="left">Trust model, self-hosting the proxy / relay, vulnerability reporting</td>
    </tr>
    <tr>
      <td align="left"><code>version.json</code></td>
      <td align="left">Release metadata</td>
    </tr>
    <tr>
      <td align="left"><code>logo.webp</code></td>
      <td align="left">Project logo</td>
    </tr>
  </tbody>
</table>

<hr>

<h2>Contributing</h2>

<p>Contributions are welcome — bug reports, feature suggestions, documentation fixes, and pull requests.</p>

<p><b>Want to contribute or cooperate directly?</b> Message me on Telegram: <a href="https://t.me/nyxx_official_channel">@nyxx_official_channel</a>. Whether it's an idea, a bug, or a partnership, I read every message.</p>

<p>See <a href="CONTRIBUTING.md">CONTRIBUTING.md</a> for guidelines.</p>

<hr>

<h2>License</h2>

<p><a href="LICENSE">MIT</a> — free to use, modify, and distribute.</p>

<hr>

<h2>Contact</h2>

<ul>
  <li><b>GitHub</b> — <a href="https://github.com/Mahan07dev">@Mahan07dev</a></li>
  <li><b>Telegram</b> — <a href="https://t.me/nyxx_official_channel">@nyxx_official_channel</a></li>
</ul>

<div align="center">

<p>Made with ❤️ using Cloudflare Workers &amp; the Telegram Bot API.</p>

<p>⭐ Star the repo if you find it useful.</p>

</div>