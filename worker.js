// ============================================================================
// NYXX — v4.3.0
// Telegram bot builder + management dashboard for Cloudflare Workers + D1.
// ============================================================================
const VERSION = '4.3.0';

const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en" data-theme="auto">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<link rel="shortcut icon" href="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" type="image/x-icon">
<title>Nyxx | Dashboard</title>
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
:root {
    --font: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    --s1: 4px; --s2: 8px; --s3: 12px; --s4: 16px; --s5: 20px;
    --s6: 24px; --s8: 32px; --s10: 40px; --s12: 48px; --s16: 64px;
    --r-xs: 6px; --r-sm: 10px; --r-md: 14px; --r-lg: 18px; --r-xl: 24px; --r-pill: 999px;
    --fs-large: 34px; --fs-title1: 28px; --fs-title2: 22px; --fs-title3: 20px;
    --fs-headline: 17px; --fs-body: 16px; --fs-callout: 15px; --fs-subhead: 14px;
    --fs-footnote: 13px; --fs-caption: 12px; --fs-caption2: 11px;
    --fill-1: rgba(120,120,128,0.10);
    --fill-2: rgba(120,120,128,0.16);
    --fill-3: rgba(120,120,128,0.24);
    --h-control: 38px; --h-control-sm: 32px; --h-control-lg: 44px;
}
html[data-theme="light"] {
    --bg: #f5f5f7; --bg-elev: #ffffff;
    --surface: #ffffff; --surface-2: #f5f5f7; --surface-3: #ebebed;
    --text: #1d1d1f; --text-2: #424245; --text-3: #6e6e73; --text-4: #86868b;
    --accent: #0071e3; --accent-2: #0066cc; --accent-soft: rgba(0,113,227,0.10);
    --green: #34c759; --green-soft: rgba(52,199,89,0.12);
    --red: #ff3b30; --red-soft: rgba(255,59,48,0.10);
    --orange: #ff9500; --orange-soft: rgba(255,149,0,0.12);
    --yellow: #ffcc00; --purple: #5e5ce6; --purple-soft: rgba(94,92,230,0.12);
    --teal: #30b0c7;
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.07);
    --shadow-lg: 0 18px 50px rgba(0,0,0,0.16);
    --glass: rgba(255,255,255,0.72);
    --hairline: rgba(0,0,0,0.09);
}
html[data-theme="dark"] {
    --bg: #000000; --bg-elev: #1c1c1e;
    --surface: #1c1c1e; --surface-2: #2c2c2e; --surface-3: #3a3a3c;
    --text: #f5f5f7; --text-2: #d1d1d6; --text-3: #98989d; --text-4: #8e8e93;
    --accent: #0a84ff; --accent-2: #409cff; --accent-soft: rgba(10,132,255,0.18);
    --green: #30d158; --green-soft: rgba(48,209,88,0.16);
    --red: #ff453a; --red-soft: rgba(255,69,58,0.16);
    --orange: #ff9f0a; --orange-soft: rgba(255,159,10,0.16);
    --yellow: #ffd60a; --purple: #bf5af2; --purple-soft: rgba(191,90,242,0.16);
    --teal: #40c8e0;
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
    --shadow-md: 0 6px 20px rgba(0,0,0,0.5);
    --shadow-lg: 0 24px 60px rgba(0,0,0,0.7);
    --glass: rgba(28,28,30,0.72);
    --hairline: rgba(255,255,255,0.12);
    --fill-1: rgba(120,120,128,0.24);
    --fill-2: rgba(120,120,128,0.32);
    --fill-3: rgba(120,120,128,0.42);
}
@media (prefers-color-scheme: dark) {
    html[data-theme="auto"] {
        --bg: #000000; --bg-elev: #1c1c1e;
        --surface: #1c1c1e; --surface-2: #2c2c2e; --surface-3: #3a3a3c;
        --text: #f5f5f7; --text-2: #d1d1d6; --text-3: #98989d; --text-4: #8e8e93;
        --accent: #0a84ff; --accent-2: #409cff; --accent-soft: rgba(10,132,255,0.18);
        --green: #30d158; --green-soft: rgba(48,209,88,0.16);
        --red: #ff453a; --red-soft: rgba(255,69,58,0.16);
        --orange: #ff9f0a; --orange-soft: rgba(255,159,10,0.16);
        --yellow: #ffd60a; --purple: #bf5af2; --purple-soft: rgba(191,90,242,0.16);
        --teal: #40c8e0;
        --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
        --shadow-md: 0 6px 20px rgba(0,0,0,0.5);
        --shadow-lg: 0 24px 60px rgba(0,0,0,0.7);
        --glass: rgba(28,28,30,0.72);
        --hairline: rgba(255,255,255,0.12);
        --fill-1: rgba(120,120,128,0.24);
        --fill-2: rgba(120,120,128,0.32);
        --fill-3: rgba(120,120,128,0.42);
    }
}
@media (prefers-color-scheme: light) {
    html[data-theme="auto"] {
        --bg: #f5f5f7; --bg-elev: #ffffff;
        --surface: #ffffff; --surface-2: #f5f5f7; --surface-3: #ebebed;
        --text: #1d1d1f; --text-2: #424245; --text-3: #6e6e73; --text-4: #86868b;
        --accent: #0071e3; --accent-2: #0066cc; --accent-soft: rgba(0,113,227,0.10);
        --green: #34c759; --green-soft: rgba(52,199,89,0.12);
        --red: #ff3b30; --red-soft: rgba(255,59,48,0.10);
        --orange: #ff9500; --orange-soft: rgba(255,149,0,0.12);
        --yellow: #ffcc00; --purple: #5e5ce6; --purple-soft: rgba(94,92,230,0.12);
        --teal: #30b0c7;
        --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
        --shadow-md: 0 4px 16px rgba(0,0,0,0.07);
        --shadow-lg: 0 18px 50px rgba(0,0,0,0.16);
        --glass: rgba(255,255,255,0.72);
        --hairline: rgba(0,0,0,0.09);
    }
}
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html, body { height: 100%; }
body {
    margin: 0; background: var(--bg); color: var(--text);
    font-family: var(--font); font-size: var(--fs-body); line-height: 1.5;
    letter-spacing: -0.01em; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
}
h1,h2,h3,h4 { margin: 0; letter-spacing: -0.022em; line-height: 1.18; font-weight: 700; }
h1 { font-size: var(--fs-large); } h2 { font-size: var(--fs-title1); }
h3 { font-size: var(--fs-title2); } h4 { font-size: var(--fs-title3); }
p { margin: 0 0 var(--s3); }
a { color: var(--accent); text-decoration: none; } a:hover { text-decoration: underline; }
code, .mono { font-family: var(--mono); font-size: 0.88em; }
code { background: var(--fill-1); padding: 2px 6px; border-radius: var(--r-xs); }
::selection { background: var(--accent-soft); }
input, textarea, select, button { font-family: inherit; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: var(--r-xs); }
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-thumb { background: var(--fill-2); border-radius: 8px; border: 2px solid transparent; background-clip: content-box; }
::-webkit-scrollbar-thumb:hover { background: var(--fill-3); background-clip: content-box; }
.hidden { display: none !important; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }

.app { display: flex; min-height: 100vh; }
.sidebar {
    position: fixed; left: 0; top: 0; bottom: 0; width: 276px;
    background: var(--surface); border-right: 1px solid var(--hairline);
    padding: var(--s4) var(--s3);
    display: flex; flex-direction: column; gap: var(--s2);
    overflow-y: auto; overflow-x: hidden; z-index: 60;
    transform: translateX(-102%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.app.sidebar-open .sidebar { transform: none; }
.brand { display: flex; align-items: center; gap: var(--s3); padding: var(--s2) var(--s3) var(--s4); }
.brand img { width: 36px; height: 36px; border-radius: 9px; }
.brand-name { font-size: var(--fs-title3); font-weight: 700; letter-spacing: -0.02em; }
.brand-ver { font-size: var(--fs-caption2); color: var(--text-4); font-weight: 600; }
.nav-group { display: flex; flex-direction: column; gap: 2px; margin-bottom: var(--s3); }
.nav-label { font-size: var(--fs-caption2); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-4); padding: var(--s2) var(--s3); }
.nav-item {
    display: flex; align-items: center; gap: var(--s3);
    padding: 9px var(--s3); border-radius: var(--r-sm);
    color: var(--text-2); font-size: var(--fs-subhead); font-weight: 500;
    cursor: pointer; border: none; background: none; width: 100%; text-align: left;
    transition: background 0.16s ease, color 0.16s ease; min-height: 42px;
    position: relative;
}
.nav-item i { width: 20px; text-align: center; font-size: 15px; color: var(--text-3); transition: color 0.16s; }
.nav-item:hover { background: var(--fill-1); color: var(--text); }
.nav-item:hover i { color: var(--text-2); }
.nav-item.active { background: var(--accent-soft); color: var(--accent); font-weight: 600; }
.nav-item.active i { color: var(--accent); }
.nav-item.active::before {
    content: ''; position: absolute; left: -12px; top: 8px; bottom: 8px;
    width: 3px; border-radius: 3px; background: var(--accent);
}
.nav-spacer { flex: 1; }
.nav-foot { display: flex; flex-direction: column; gap: var(--s2); padding-top: var(--s3); border-top: 1px solid var(--hairline); }
.nav-foot-row { display: flex; gap: var(--s2); }
.nav-foot .icon-btn { flex: 1; }

.main { min-width: 0; display: flex; flex-direction: column; flex: 1; margin-left: 0; transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.topbar {
    position: sticky; top: 0; z-index: 50;
    display: flex; align-items: center; gap: var(--s3);
    padding: var(--s3) var(--s6);
    background: var(--glass); backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid var(--hairline); min-height: 62px;
}
.topbar-title { font-size: var(--fs-title3); font-weight: 700; letter-spacing: -0.02em; }
.topbar-spacer { flex: 1; }
.status-pills { display: flex; gap: var(--s2); align-items: center; flex-wrap: wrap; }
.pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: var(--fs-caption); font-weight: 600; color: var(--text-3);
    background: var(--fill-1); padding: 5px 10px; border-radius: var(--r-pill); white-space: nowrap;
    cursor: default; transition: opacity 0.2s;
}
.pill.stale { opacity: 0.55; }
.pill.clickable { cursor: pointer; }
.pill.clickable:hover { opacity: 0.8; }
.pill.ok { color: var(--green); background: var(--green-soft); }
.pill.warn { color: var(--orange); background: var(--orange-soft); }
.pill.err { color: var(--red); background: var(--red-soft); }
.pill.bot { color: var(--accent); background: var(--accent-soft); }
.content { padding: var(--s6) var(--s6) var(--s16); max-width: 1120px; width: 100%; margin: 0 auto; }
.page { display: none; animation: fade 0.22s ease; }
.page.active { display: block; }
@keyframes fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.page-head { display: flex; align-items: flex-start; gap: var(--s4); margin-bottom: var(--s6); flex-wrap: wrap; }
.page-head .lead { flex: 1; min-width: 220px; }
.page-head p { color: var(--text-3); font-size: var(--fs-subhead); margin: var(--s1) 0 0; }
.page-actions { display: flex; gap: var(--s2); flex-wrap: wrap; align-self: flex-start; }
.hamburger { display: inline-flex; }

.btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    height: var(--h-control); padding: 0 16px;
    border-radius: var(--r-sm); border: 1px solid transparent;
    font-size: var(--fs-callout); font-weight: 600; font-family: var(--font);
    cursor: pointer; white-space: nowrap; user-select: none;
    background: var(--fill-1); color: var(--text);
    transition: transform 0.12s ease, filter 0.16s ease, background 0.16s ease, opacity 0.16s;
}
.btn:hover:not(:disabled) { filter: brightness(0.97); }
html[data-theme="dark"] .btn:hover:not(:disabled) { filter: brightness(1.15); }
.btn:active:not(:disabled) { transform: scale(0.97); }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover:not(:disabled) { background: var(--accent-2); filter: none; }
.btn-success { background: var(--green); color: #fff; }
.btn-danger { background: var(--red); color: #fff; }
.btn-gray { background: var(--fill-1); color: var(--text); }
.btn-bordered { background: transparent; border-color: var(--hairline); color: var(--text); }
.btn-plain { background: transparent; color: var(--accent); padding: 0 8px; }
.btn-plain.danger { color: var(--red); }
.btn-sm { height: var(--h-control-sm); padding: 0 12px; font-size: var(--fs-footnote); border-radius: var(--r-xs); }
.btn-lg { height: var(--h-control-lg); padding: 0 22px; font-size: var(--fs-body); }
.btn-block { width: 100%; }
.btn-icon { width: var(--h-control); padding: 0; }
.btn-icon.btn-sm { width: var(--h-control-sm); }
.icon-btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; border-radius: var(--r-sm);
    background: var(--fill-1); border: none; color: var(--text-2);
    cursor: pointer; font-size: 15px; transition: background 0.16s, color 0.16s, transform 0.12s;
}
.icon-btn:hover { background: var(--fill-2); color: var(--text); }
.icon-btn:active { transform: scale(0.94); }
.icon-btn.danger { color: var(--red); }
.icon-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.btn.loading { position: relative; pointer-events: none; opacity: 0.7; }
.btn.loading > :not(.btn-spinner) { visibility: hidden; }
.btn .btn-spinner { display: none; position: absolute; inset: 0; align-items: center; justify-content: center; }
.btn.loading .btn-spinner { display: flex; }
.mini-spinner { width: 15px; height: 15px; border-radius: 50%; border: 2px solid currentColor; border-top-color: transparent; animation: spin 0.7s linear infinite; display: inline-block; opacity: 0.8; }
.btn .mini-spinner { border-color: rgba(255,255,255,0.4); border-top-color: #fff; }
.btn-gray .mini-spinner, .btn-bordered .mini-spinner, .btn-plain .mini-spinner { border-color: var(--fill-3); border-top-color: var(--text-2); }
@keyframes spin { to { transform: rotate(360deg); } }
.busy-dots { display: inline-flex; gap: 3px; align-items: center; }
.busy-dots span { width: 4px; height: 4px; border-radius: 50%; background: currentColor; opacity: 0.35; animation: busyDot 1s infinite; }
.busy-dots span:nth-child(2) { animation-delay: .15s; }
.busy-dots span:nth-child(3) { animation-delay: .3s; }
@keyframes busyDot { 0%,100% { opacity: .25; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }

.field { margin-bottom: var(--s5); }
.field-label { display: block; font-size: var(--fs-subhead); font-weight: 600; margin-bottom: 6px; }
.field-hint { display: block; font-size: var(--fs-caption); color: var(--text-4); margin-top: 5px; line-height: 1.55; }
.field-hint i { color: var(--accent); margin-right: 3px; }
.input, .textarea, select.input {
    width: 100%; background: var(--surface); color: var(--text);
    border: 1px solid var(--hairline); border-radius: var(--r-sm);
    padding: 0 12px; font-size: var(--fs-callout); height: var(--h-control);
    transition: border-color 0.16s, box-shadow 0.16s, background 0.16s;
}
.textarea { height: auto; min-height: 92px; padding: 10px 12px; resize: vertical; line-height: 1.5; }
.input:focus, .textarea:focus, select.input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3.5px var(--accent-soft); }
.input[readonly] { background: var(--surface-2); color: var(--text-3); }
select.input { -webkit-appearance: none; appearance: none; padding-right: 34px;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2386868b' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center; }
.input-with-btn { display: flex; gap: var(--s2); align-items: stretch; }
.input-with-btn .input { flex: 1; min-width: 0; }
.input-with-btn .btn { flex-shrink: 0; }
.row { display: flex; gap: var(--s3); align-items: center; flex-wrap: wrap; }
.row.nowrap { flex-wrap: nowrap; }
.grid { display: grid; gap: var(--s4); }
.grid-2 { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
.switch {
    position: relative; width: 51px; height: 31px; flex-shrink: 0;
    background: var(--fill-3); border-radius: var(--r-pill);
    border: none; cursor: pointer; transition: background 0.25s ease; padding: 0;
}
.switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 27px; height: 27px; border-radius: 50%; background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.22); transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1.1); }
.switch:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.switch.on { background: var(--green); }
.switch.on::after { transform: translateX(20px); }
.switch-row { display: flex; align-items: center; justify-content: space-between; gap: var(--s4); padding: var(--s3) var(--s4); background: var(--surface); border-radius: var(--r-md); border: 1px solid var(--hairline); margin-bottom: var(--s3); }
.switch-row:last-child { margin-bottom: 0; }
.switch-row .sw-label { font-size: var(--fs-callout); font-weight: 500; }
.switch-row .sw-sub { font-size: var(--fs-caption); color: var(--text-4); margin-top: 2px; }
.segmented { display: inline-flex; background: var(--fill-1); border-radius: var(--r-sm); padding: 3px; gap: 2px; }
.segmented button { border: none; background: transparent; color: var(--text-2); font-size: var(--fs-footnote); font-weight: 600; padding: 7px 14px; border-radius: 8px; cursor: pointer; transition: background 0.16s, color 0.16s, box-shadow 0.16s; white-space: nowrap; }
.segmented button.active { background: var(--surface); color: var(--text); box-shadow: 0 1px 3px rgba(0,0,0,0.12); }
.check { display: flex; align-items: center; gap: var(--s2); font-size: var(--fs-subhead); cursor: pointer; }
.check input { width: 18px; height: 18px; accent-color: var(--accent); }
.pw-wrap { position: relative; }
.pw-wrap .input { padding-right: 40px; }
.pw-wrap .pw-toggle {
    position: absolute; right: 4px; top: 50%; transform: translateY(-50%);
    width: 32px; height: 32px; border: none; background: transparent;
    color: var(--text-3); cursor: pointer; border-radius: var(--r-xs);
}
.pw-wrap .pw-toggle:hover { background: var(--fill-1); color: var(--text); }

.card { background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--r-lg); padding: var(--s5); box-shadow: var(--shadow-sm); margin-bottom: var(--s5); }
.card.plain { box-shadow: none; }
.card.compact { padding: var(--s3) var(--s4); }
.card.flush { padding: 0; overflow: hidden; }
.card-head { display: flex; align-items: center; gap: var(--s3); margin-bottom: var(--s4); flex-wrap: wrap; }
.card-head:last-child { margin-bottom: 0; }
.card-title { font-size: var(--fs-headline); font-weight: 700; display: flex; align-items: center; gap: var(--s2); }
.card-title i { color: var(--accent); }
.card-title.c-purple i { color: var(--purple); }
.card-title.c-green i { color: var(--green); }
.card-title.c-orange i { color: var(--orange); }
.card-title.c-red i { color: var(--red); }
.card-sub { font-size: var(--fs-footnote); color: var(--text-4); margin-top: 2px; }
.list { background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--r-lg); overflow: visible; }
.list > .list-row:first-child { border-top-left-radius: var(--r-lg); border-top-right-radius: var(--r-lg); }
.list > .list-row:last-child { border-bottom-left-radius: var(--r-lg); border-bottom-right-radius: var(--r-lg); }
.list-row { display: flex; align-items: center; gap: var(--s3); padding: var(--s3) var(--s4); border-bottom: 1px solid var(--hairline); min-height: 56px; transition: background 0.14s; position: relative; }
.list-row:last-child { border-bottom: none; }
.list-row:hover { background: var(--surface-2); }
.list-row .lr-main { flex: 1; min-width: 0; }
.list-row .lr-title { font-size: var(--fs-callout); font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.list-row .lr-sub { font-size: var(--fs-caption); color: var(--text-4); margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.list-row .lr-actions { display: flex; gap: 4px; flex-shrink: 0; }
.badge { display: inline-flex; align-items: center; gap: 4px; font-size: var(--fs-caption2); font-weight: 600; padding: 3px 8px; border-radius: var(--r-pill); background: var(--fill-1); color: var(--text-3); white-space: nowrap; }
.badge.green { background: var(--green-soft); color: var(--green); }
.badge.red { background: var(--red-soft); color: var(--red); }
.badge.orange { background: var(--orange-soft); color: var(--orange); }
.badge.blue { background: var(--accent-soft); color: var(--accent); }
.badge.purple { background: var(--purple-soft); color: var(--purple); }
.empty { text-align: center; padding: var(--s10) var(--s4); color: var(--text-4); font-size: var(--fs-subhead); }
.empty i { display: block; font-size: 30px; margin-bottom: var(--s3); opacity: 0.4; }
.empty .empty-hint { font-size: var(--fs-caption); color: var(--text-4); margin-top: 6px; opacity: 0.85; }
.empty.err { color: var(--red); }
.empty.err i { color: var(--red); }
.divider { height: 1px; background: var(--hairline); border: none; margin: var(--s5) 0; }
.kv { display: flex; justify-content: space-between; gap: var(--s4); padding: var(--s2) 0; font-size: var(--fs-subhead); }
.kv .k { color: var(--text-4); }
.kv .v { font-weight: 600; text-align: right; word-break: break-word; }
.muted { color: var(--text-4); }
.small { font-size: var(--fs-footnote); }
.tiny { font-size: var(--fs-caption); }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--s4); margin-bottom: var(--s6); }
.stat { background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--r-lg); padding: var(--s4); box-shadow: var(--shadow-sm); }
.stat .st-ic { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 15px; margin-bottom: var(--s3); }
.stat .st-ic.blue { background: var(--accent-soft); color: var(--accent); }
.stat .st-ic.green { background: var(--green-soft); color: var(--green); }
.stat .st-ic.orange { background: var(--orange-soft); color: var(--orange); }
.stat .st-ic.purple { background: var(--purple-soft); color: var(--purple); }
.stat .st-ic.red { background: var(--red-soft); color: var(--red); }
.stat .st-val { font-size: 26px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; }
.stat .st-lbl { font-size: var(--fs-caption); color: var(--text-4); margin-top: 3px; }
.stat .st-extra { font-size: var(--fs-caption); color: var(--text-3); margin-top: 6px; }
.toolbar { display: flex; gap: var(--s3); align-items: center; margin-bottom: var(--s4); flex-wrap: wrap; }
.toolbar .grow { flex: 1; min-width: 160px; }
.search { display: flex; align-items: center; gap: var(--s2); background: var(--fill-1); border-radius: var(--r-sm); padding: 0 12px; height: var(--h-control); flex: 1; min-width: 160px; border: 1px solid transparent; transition: border-color 0.16s, background 0.16s; }
.search:focus-within { border-color: var(--accent); background: var(--surface); box-shadow: 0 0 0 3.5px var(--accent-soft); }
.search i { color: var(--text-4); font-size: 14px; }
.search input { border: none; background: none; outline: none; color: var(--text); font-size: var(--fs-callout); width: 100%; }
.chips { display: flex; gap: var(--s2); flex-wrap: wrap; margin-bottom: var(--s4); }
.chip { border: 1px solid var(--hairline); background: var(--surface); color: var(--text-2); font-size: var(--fs-footnote); font-weight: 600; padding: 7px 14px; border-radius: var(--r-pill); cursor: pointer; transition: all 0.16s; }
.chip:hover { background: var(--surface-2); }
.chip.active { background: var(--accent); border-color: var(--accent); color: #fff; }

.chat { display: flex; flex-direction: column; gap: var(--s3); padding: var(--s4); background: var(--surface-2); border-radius: var(--r-lg); border: 1px solid var(--hairline); max-height: 480px; overflow-y: auto; }
.bubble { max-width: 82%; padding: 10px 14px; border-radius: 18px; font-size: var(--fs-subhead); line-height: 1.5; word-break: break-word; white-space: pre-wrap; position: relative; unicode-bidi: plaintext; text-align: start; }
.bubble.in { align-self: flex-start; background: var(--surface); border: 1px solid var(--hairline); border-bottom-left-radius: 6px; }
.bubble.out { align-self: flex-end; background: var(--accent); color: #fff; border-bottom-right-radius: 6px; }
.bubble.out a { color: #fff; text-decoration: underline; }
.bubble .b-meta { font-size: var(--fs-caption2); opacity: 0.65; margin-top: 5px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.bubble.out .b-meta { color: rgba(255,255,255,0.85); }
.bubble .b-actions { display: flex; gap: 6px; margin-top: 7px; justify-content: flex-end; }
.bubble .b-actions button { border: none; background: rgba(255,255,255,0.2); color: inherit; font-size: var(--fs-caption2); font-weight: 600; padding: 3px 9px; border-radius: var(--r-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
.bubble.in .b-actions button { background: var(--fill-1); }
.bubble .b-actions button:hover { filter: brightness(0.95); }
.bubble .photo-tag { font-size: var(--fs-caption2); background: rgba(255,255,255,0.2); padding: 2px 7px; border-radius: var(--r-pill); display: inline-block; margin-bottom: 5px; }
.bubble.in .photo-tag { background: var(--fill-1); }
.chat-compose { display: flex; gap: var(--s2); align-items: flex-end; margin-top: var(--s3); }
.chat-compose .textarea { min-height: 44px; max-height: 160px; resize: none; border-radius: var(--r-md); }

.tabbar { display: flex; gap: 2px; border-bottom: 1px solid var(--hairline); margin-bottom: var(--s4); overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; }
.tabbar::-webkit-scrollbar { display: none; }
.tabbar button { border: none; background: none; color: var(--text-3); font-size: var(--fs-subhead); font-weight: 600; padding: 10px 16px; cursor: pointer; position: relative; white-space: nowrap; flex-shrink: 0; }
.tabbar button.active { color: var(--text); }
.tabbar button.active::after { content: ''; position: absolute; left: 12px; right: 12px; bottom: -1px; height: 2px; background: var(--accent); border-radius: 2px; }
.tabpane { display: none; }
.tabpane.active { display: block; }

.modal { position: fixed; inset: 0; z-index: 200; display: flex; align-items: center; justify-content: center; padding: var(--s4); }
.modal.hidden { display: none; }
.modal-bg { position: absolute; inset: 0; background: rgba(0,0,0,0.42); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.sheet { position: relative; width: 100%; max-width: 640px; max-height: 92vh; background: var(--bg-elev); border-radius: var(--r-xl); box-shadow: var(--shadow-lg); display: flex; flex-direction: column; overflow: hidden; animation: sheetIn 0.28s cubic-bezier(0.16, 1, 0.3, 1); border: 1px solid var(--hairline); }
@keyframes sheetIn { from { opacity: 0; transform: translateY(18px) scale(0.98); } to { opacity: 1; transform: none; } }
.sheet-head { display: flex; align-items: center; gap: var(--s3); padding: var(--s3) var(--s4); border-bottom: 1px solid var(--hairline); background: var(--glass); backdrop-filter: blur(20px); min-height: 56px; flex-shrink: 0; }
.sheet-title { flex: 1; text-align: center; font-size: var(--fs-headline); font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sheet-body { padding: var(--s5); overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; flex: 1; min-height: 0; }
.sheet-foot { padding: var(--s3) var(--s4); border-top: 1px solid var(--hairline); display: flex; gap: var(--s2); justify-content: flex-end; background: var(--bg-elev); flex-shrink: 0; }
.sheet.small { max-width: 440px; }
.sheet-close { border: none; background: none; color: var(--text-3); cursor: pointer; font-size: 17px; width: 32px; height: 32px; border-radius: var(--r-sm); }
.sheet-close:hover { background: var(--fill-1); color: var(--text); }
.err-box { background: var(--red-soft); color: var(--red); border-radius: var(--r-sm); padding: 10px 14px; font-size: var(--fs-footnote); margin-top: var(--s3); display: none; }
.err-box.show { display: block; }
.ok-box { background: var(--green-soft); color: var(--green); border-radius: var(--r-sm); padding: 10px 14px; font-size: var(--fs-footnote); margin-top: var(--s3); display: none; }
.ok-box.show { display: block; }
.warn-box { background: var(--orange-soft); color: var(--orange); border-radius: var(--r-sm); padding: 10px 14px; font-size: var(--fs-footnote); margin-top: var(--s3); }
@media (max-width: 640px) { .modal { padding: 0; align-items: flex-end; } .sheet { max-width: 100%; border-radius: var(--r-xl) var(--r-xl) 0 0; max-height: 94vh; } }

.kb-wrap { display: flex; flex-direction: column; gap: var(--s2); }
.kb-rowchips { display: flex; flex-wrap: wrap; gap: var(--s2); align-items: center; }
.kb-rlabel { font-size: var(--fs-caption2); text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-4); font-weight: 600; min-width: 46px; }
.kb-chip { display: inline-flex; align-items: center; gap: 6px; background: var(--surface-2); border: 1px solid var(--hairline); border-radius: var(--r-sm); padding: 6px 8px; font-size: var(--fs-footnote); max-width: 100%; }
.kb-chip .lbl { max-width: 130px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; }
.kb-chip .typ { font-size: var(--fs-caption2); color: var(--text-4); background: var(--fill-1); padding: 1px 6px; border-radius: var(--r-pill); }
.kb-chip .arw { border: none; background: none; color: var(--text-4); cursor: pointer; font-size: 10px; padding: 2px 3px; border-radius: 4px; }
.kb-chip .arw:hover:not(:disabled) { background: var(--fill-2); color: var(--text); }
.kb-chip .arw:disabled { opacity: 0.25; cursor: default; }
.kb-chip .arw.del:hover { color: var(--red); }
.kb-preview { display: flex; flex-direction: column; gap: 4px; margin-top: var(--s3); padding: var(--s3); background: var(--surface-2); border-radius: var(--r-sm); border: 1px dashed var(--hairline); }
.kb-preview .pvrow { display: flex; gap: 4px; }
.kb-preview .pvbtn { flex: 1; text-align: center; font-size: var(--fs-caption); padding: 5px 4px; border-radius: 6px; background: var(--surface); border: 1px solid var(--hairline); color: var(--text-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.toasts { position: fixed; bottom: var(--s6); right: var(--s6); z-index: 500; display: flex; flex-direction: column; gap: var(--s2); max-width: min(92vw, 400px); pointer-events: none; }
.toast { background: var(--glass); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--hairline); border-radius: var(--r-md); padding: 12px 14px 12px 16px; font-size: var(--fs-subhead); box-shadow: var(--shadow-lg); animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); word-break: break-word; pointer-events: auto; display: flex; align-items: flex-start; gap: 10px; }
.toast-body { flex: 1; }
.toast-close { border: none; background: none; color: var(--text-4); cursor: pointer; font-size: 16px; line-height: 1; padding: 0; width: 20px; height: 20px; flex-shrink: 0; }
.toast-close:hover { color: var(--text); }
.toast.success { border-left: 4px solid var(--green); }
.toast.error { border-left: 4px solid var(--red); }
.toast.info { border-left: 4px solid var(--accent); }
@keyframes toastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (max-width: 900px) { .toasts { right: var(--s4); bottom: var(--s4); left: var(--s4); max-width: none; } }

@keyframes shimmer { 0% { background-position: -320px 0; } 100% { background-position: 320px 0; } }
.skl { background: linear-gradient(90deg, var(--fill-1) 0%, var(--fill-2) 50%, var(--fill-1) 100%); background-size: 320px 100%; animation: shimmer 1.5s ease-in-out infinite; border-radius: var(--r-xs); color: transparent !important; }
.skl-line { height: 13px; margin-bottom: 9px; }
.skl-line.w40 { width: 40%; } .skl-line.w60 { width: 60%; } .skl-line.w80 { width: 80%; }
.skl-card { height: 92px; border-radius: var(--r-lg); margin-bottom: var(--s3); }
.skl-avatar { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; }
.skl-row { display: flex; align-items: center; gap: var(--s3); padding: var(--s3) var(--s4); border-bottom: 1px solid var(--hairline); }
.spinner-page { display: flex; justify-content: center; padding: var(--s12); }
.spinner-page .mini-spinner { width: 26px; height: 26px; border-width: 3px; border-color: var(--fill-2); border-top-color: var(--accent); }

.overlay-sidebar { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 55; }
.footer-note { text-align: center; color: var(--text-4); font-size: var(--fs-caption); padding: var(--s8) 0 var(--s4); }

.playground { display: flex; flex-direction: column; gap: var(--s3); padding: var(--s4); background: var(--surface-2); border-radius: var(--r-lg); border: 1px solid var(--hairline); min-height: 180px; height: 320px; overflow-y: auto; resize: vertical; margin-bottom: var(--s3); }
.pg-msg { max-width: 86%; padding: 10px 14px; border-radius: 16px; font-size: var(--fs-subhead); white-space: pre-wrap; word-break: break-word; unicode-bidi: plaintext; text-align: start; }
.pg-msg.user { align-self: flex-end; background: var(--accent); color: #fff; border-bottom-right-radius: 5px; }
.pg-msg.user a { color: #fff; }
.pg-msg.bot { align-self: flex-start; background: var(--surface); border: 1px solid var(--hairline); border-bottom-left-radius: 5px; }
.pg-msg.bot pre { background: var(--surface-2); padding: 10px; border-radius: 8px; overflow-x: auto; font-family: var(--mono); font-size: var(--fs-footnote); }
.pg-msg code { background: var(--fill-1); padding: 1px 5px; border-radius: 4px; font-family: var(--mono); font-size: 0.88em; }
.pg-msg b, .pg-msg strong { font-weight: 700; }
.pg-msg i, .pg-msg em { font-style: italic; }
.pg-msg u { text-decoration: underline; }
.pg-msg s { text-decoration: line-through; }
.pg-msg blockquote { border-inline-start: 3px solid var(--accent); padding-inline-start: 10px; margin: 6px 0; color: var(--text-2); }
.memory-pill { display: inline-flex; align-items: center; gap: 6px; background: var(--fill-1); border-radius: var(--r-pill); padding: 5px 12px; font-size: var(--fs-footnote); font-weight: 600; }
.section-title { font-size: var(--fs-caption); font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-4); margin: var(--s6) 0 var(--s3); }
.section-title:first-child { margin-top: 0; }
.sticky-actions { position: sticky; bottom: 0; display: flex; gap: var(--s2); justify-content: center; padding: var(--s3); background: var(--glass); backdrop-filter: blur(20px); border-top: 1px solid var(--hairline); margin: var(--s6) calc(-1 * var(--s6)) 0; z-index: 30; }
.tag-folder { color: var(--accent); }

.update-pill {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; border-radius: var(--r-pill);
    background: linear-gradient(135deg, var(--accent), var(--purple));
    color: #fff; font-size: var(--fs-footnote); font-weight: 600;
    border: none; cursor: pointer; box-shadow: 0 8px 20px -8px rgba(10,132,255,0.6);
    transition: transform 0.16s ease, box-shadow 0.16s ease;
}
.update-pill:hover { transform: translateY(-1px); box-shadow: 0 10px 24px -6px rgba(10,132,255,0.75); }
.update-pill .dot { width: 6px; height: 6px; background: #fff; border-radius: 50%; animation: pulseDot 1.6s ease-in-out infinite; }
@keyframes pulseDot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }

.featured-reply {
    border: 1px solid var(--hairline); border-radius: var(--r-md);
    padding: var(--s3) var(--s4); margin-bottom: var(--s2); background: var(--surface);
}
.featured-reply.disabled { opacity: 0.55; }
.featured-reply .fr-head { display: flex; align-items: center; gap: var(--s2); margin-bottom: 6px; flex-wrap: wrap; }
.featured-reply .fr-cmd { font-family: var(--mono); font-weight: 700; color: var(--accent); }
.featured-reply .fr-block { font-size: var(--fs-footnote); color: var(--text-3); margin-top: 6px; padding-left: 10px; border-left: 2px solid var(--hairline); white-space: pre-wrap; word-break: break-word; }
.featured-reply .fr-block.hint { border-color: var(--accent); }
.featured-reply .fr-block.success { border-color: var(--green); }
.featured-reply .fr-block.failure { border-color: var(--red); }
.featured-reply .fr-block b { font-weight: 700; }
.featured-reply .fr-actions { display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap; }

.hint-banner {
    display: flex; gap: 10px; align-items: flex-start;
    background: var(--accent-soft); color: var(--text);
    border-radius: var(--r-md); padding: 12px 16px; margin-bottom: var(--s4);
    font-size: var(--fs-footnote); line-height: 1.55;
}
.hint-banner i { color: var(--accent); margin-top: 2px; flex-shrink: 0; }
.hint-banner.warn { background: var(--orange-soft); }
.hint-banner.warn i { color: var(--orange); }
.hint-banner.danger { background: var(--red-soft); }
.hint-banner.danger i { color: var(--red); }
.hint-banner > div { flex: 1; }
details.help { background: var(--accent-soft); border-radius: var(--r-md); margin-bottom: var(--s4); overflow: hidden; }
details.help > summary { cursor: pointer; padding: 12px 16px; font-size: var(--fs-footnote); font-weight: 600; color: var(--accent); list-style: none; display: flex; align-items: center; gap: 8px; user-select: none; }
details.help > summary::-webkit-details-marker { display: none; }
details.help > summary::after { content: '\\f078'; font-family: 'Font Awesome 6 Free'; font-weight: 900; margin-left: auto; transition: transform 0.2s; font-size: 11px; }
details.help[open] > summary::after { transform: rotate(180deg); }
details.help > div { padding: 0 16px 14px; font-size: var(--fs-footnote); line-height: 1.55; }

.backup-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; border-radius: var(--r-sm);
    border: 1px solid var(--hairline); margin-bottom: 6px;
    background: var(--surface); cursor: pointer;
}
.backup-item input { width: 18px; height: 18px; accent-color: var(--accent); }
.backup-item .bi-title { font-weight: 600; font-size: var(--fs-subhead); }
.backup-item .bi-sub { font-size: var(--fs-caption); color: var(--text-4); }

/* ===== NEW: DROPDOWN MENU ===== */
.dropdown { position: relative; display: inline-block; }
.dropdown-menu {
    position: absolute; right: 0; top: calc(100% + 4px);
    background: var(--bg-elev); border: 1px solid var(--hairline);
    border-radius: var(--r-md); box-shadow: var(--shadow-md);
    padding: 4px; min-width: 180px; z-index: 100;
}
.dropdown-menu button {
    display: flex; align-items: center; gap: 10px;
    width: 100%; padding: 9px 12px; border: none; background: none;
    color: var(--text); font-size: var(--fs-subhead); text-align: left;
    border-radius: var(--r-xs); cursor: pointer; font-family: inherit;
    white-space: nowrap;
}
.dropdown-menu button:hover { background: var(--fill-1); }
.dropdown-menu button.danger { color: var(--red); }
.dropdown-menu button i { width: 16px; text-align: center; font-size: 13px; flex-shrink: 0; }
.dropdown-menu button:disabled { opacity: 0.35; cursor: not-allowed; }
.lr-actions-mobile { display: none; }

/* ===== NEW: USER CIRCLE ===== */
.user-circle {
    width: 38px; height: 38px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; flex-shrink: 0;
}
.user-circle.green { background: var(--green-soft); color: var(--green); }
.user-circle.yellow { background: var(--orange-soft); color: var(--orange); }

/* ===== NEW: MENU ENTRY ===== */
.menu-entry { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.menu-entry .menu-cmd { width: 150px; flex-shrink: 0; }
.menu-entry .menu-desc { flex: 1 1 200px; min-width: 0; }

/* ===== AUTH GATEWAY ===== */
.auth-shell { min-height: calc(100vh - 200px); display: flex; align-items: center; justify-content: center; padding: var(--s6) 0; }
.auth-card {
    background: var(--surface); border: 1px solid var(--hairline); border-radius: var(--r-xl);
    padding: var(--s8) var(--s6); width: 100%; max-width: 460px;
    box-shadow: var(--shadow-md);
}
.auth-brand { display: flex; align-items: center; gap: 12px; justify-content: center; margin-bottom: var(--s6); }
.auth-brand img { width: 40px; height: 40px; border-radius: 10px; }
.auth-brand .ab-name { font-size: var(--fs-title3); font-weight: 700; letter-spacing: -0.02em; }
.auth-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin: 0 auto var(--s4); }
.auth-icon.loading { background: var(--accent-soft); color: var(--accent); }
.auth-icon.success { background: var(--green-soft); color: var(--green); }
.auth-icon.warn { background: var(--orange-soft); color: var(--orange); }
.auth-icon.error { background: var(--red-soft); color: var(--red); }
.auth-title { text-align: center; font-size: var(--fs-title3); font-weight: 700; margin-bottom: 6px; }
.auth-msg { text-align: center; color: var(--text-3); font-size: var(--fs-subhead); margin-bottom: var(--s5); line-height: 1.55; }
.auth-actions { display: flex; gap: var(--s2); justify-content: center; flex-wrap: wrap; }
.auth-actions .btn { flex: 0 0 auto; }
.auth-help { text-align: center; font-size: var(--fs-caption); color: var(--text-4); margin-top: var(--s4); }

@media (min-width: 901px) {
    .app.sidebar-open .main { margin-left: 276px; }
    .app.sidebar-open .overlay-sidebar { display: none !important; }
    .hamburger { display: none; }
}
@media (max-width: 900px) {
    .app.sidebar-open .overlay-sidebar.show { display: block; }
    .app.sidebar-open .main { margin-left: 0; }
    .content { padding: var(--s4) var(--s4) var(--s12); }
    .topbar { padding: 6px var(--s3); min-height: 50px; gap: 6px; }
    .topbar-title { font-size: 17px; }
    .page-head { margin-bottom: var(--s4); }
    .page-head h1 { font-size: var(--fs-title1); }
    .auth-card { padding: var(--s6) var(--s4); }
    .pill { padding: 6px 8px; }
    .pill .txt { display: none; }
    .pill i { font-size: 13px; }
    .lr-actions-desktop { display: none !important; }
    .lr-actions-mobile { display: inline-block; }
    .mem-badge { display: none !important; }
}
@media (max-width: 640px) {
    .topbar:has(#update-pill:not(.hidden)) #status-pills { display: none !important; }
    .sticky-actions { margin: var(--s4) calc(-1 * var(--s4)) 0; }
    .stats { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
    .menu-entry .menu-cmd { width: auto; flex: 1 1 auto; }
    .menu-entry .menu-desc { flex-basis: 100%; }
    .sheet-body .row.nowrap { flex-wrap: wrap; }
    .sheet-body .row.nowrap > .input,
    .sheet-body .row.nowrap > select.input { flex: 1 1 140px; min-width: 0; }
    .sheet-body .row.nowrap > .btn { flex: 0 0 auto; }
}
</style>
</head>
<body>
<div class="app">
    <aside class="sidebar" id="sidebar">
        <div class="brand">
            <img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" alt="Nyxx">
            <div>
                <div class="brand-name">Nyxx</div>
                <div class="brand-ver">v${VERSION}</div>
            </div>
        </div>
        <nav class="nav-group">
            <div class="nav-label">Bot</div>
            <button class="nav-item active" data-page="overview" onclick="go('overview')"><i class="fa-solid fa-house"></i><span>Overview</span></button>
            <button class="nav-item" data-page="commands" onclick="go('commands')"><i class="fa-solid fa-terminal"></i><span>Commands</span></button>
            <button class="nav-item" data-page="menu" onclick="go('menu')"><i class="fa-solid fa-list"></i><span>Menu &amp; Featured</span></button>
            <button class="nav-item" data-page="botinfo" onclick="go('botinfo')"><i class="fa-solid fa-circle-info"></i><span>Bot Info</span></button>
        </nav>
        <nav class="nav-group">
            <div class="nav-label">Audience</div>
            <button class="nav-item" data-page="users" onclick="go('users')"><i class="fa-solid fa-user-group"></i><span>Users</span></button>
            <button class="nav-item" data-page="groups" onclick="go('groups')"><i class="fa-solid fa-comments"></i><span>Groups</span></button>
            <button class="nav-item" data-page="broadcast" onclick="go('broadcast')"><i class="fa-solid fa-bullhorn"></i><span>Broadcast</span></button>
            <button class="nav-item" data-page="memory" onclick="go('memory')"><i class="fa-solid fa-database"></i><span>Memory</span></button>
        </nav>
        <nav class="nav-group">
            <div class="nav-label">Intelligence</div>
            <button class="nav-item" data-page="ai" onclick="go('ai')"><i class="fa-solid fa-wand-magic-sparkles"></i><span>AI</span></button>
            <button class="nav-item" data-page="mcp" onclick="go('mcp')"><i class="fa-solid fa-plug"></i><span>MCP</span></button>
        </nav>
        <nav class="nav-group">
            <div class="nav-label">Admin</div>
            <button class="nav-item" data-page="permissions" onclick="go('permissions')"><i class="fa-solid fa-shield-halved"></i><span>Permissions</span></button>
        </nav>
        <nav class="nav-group">
            <div class="nav-label">System</div>
            <button class="nav-item" data-page="settings" onclick="go('settings')"><i class="fa-solid fa-gear"></i><span>Settings</span></button>
            <button class="nav-item" data-page="cron" onclick="go('cron')"><i class="fa-solid fa-clock-rotate-left"></i><span>Cleanup</span></button>
            <button class="nav-item" data-page="backup" onclick="go('backup')"><i class="fa-solid fa-box-archive"></i><span>Backup</span></button>
            <button class="nav-item" data-page="logs" onclick="go('logs')"><i class="fa-solid fa-clipboard-list"></i><span>Activity Log</span></button>
            <button class="nav-item" data-page="update" onclick="go('update')"><i class="fa-solid fa-cloud-arrow-up"></i><span>Update</span></button>
        </nav>
        <div class="nav-spacer"></div>
        <div class="nav-foot">
            <div class="nav-foot-row">
                <button class="icon-btn" id="theme-btn" onclick="cycleTheme()" title="Switch appearance" aria-label="Switch appearance"><i class="fa-solid fa-circle-half-stroke"></i></button>
                <button class="icon-btn" onclick="showInfo()" title="About Nyxx" aria-label="About Nyxx"><i class="fa-regular fa-circle-question"></i></button>
                <button class="icon-btn danger" id="logout-btn" onclick="logout()" title="Sign out" aria-label="Sign out"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>
        </div>
    </aside>
    <div class="overlay-sidebar" id="sidebar-overlay" onclick="toggleSidebar(false)"></div>

    <div class="main">
        <header class="topbar">
            <button class="icon-btn hamburger" id="hamburger" onclick="toggleSidebar()" title="Toggle menu" aria-label="Toggle menu"><i class="fa-solid fa-bars"></i></button>
            <div class="topbar-title" id="page-title">Overview</div>
            <div class="topbar-spacer"></div>
            <div class="status-pills" id="status-pills">
                <span class="pill clickable" id="pill-d1" onclick="refreshStatusPill()" title="Database status — tap to recheck"><i class="fa-solid fa-database"></i><span class="txt">D1</span></span>
                <span class="pill clickable" id="pill-bot" onclick="refreshStatusPill()" title="Bot status — tap to recheck"><i class="fa-brands fa-telegram"></i><span class="txt">Bot</span></span>
            </div>
            <button class="update-pill hidden" id="update-pill" onclick="go('update')"><span class="dot"></span> Update available</button>
        </header>

        <div id="step-status" class="content">
            <div class="auth-shell">
                <div class="auth-card">
                    <div class="auth-brand">
                        <img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" alt="Nyxx">
                        <div class="ab-name">Nyxx</div>
                    </div>
                    <div class="auth-icon loading" id="status-icon"><i class="fa-solid fa-circle-notch fa-spin"></i></div>
                    <div class="auth-title" id="status-title">Connecting…</div>
                    <div class="auth-msg" id="status-message">Checking your database connection.</div>
                    <div class="auth-actions" id="status-actions"></div>
                    <div class="auth-help" id="status-help"></div>
                </div>
            </div>
        </div>

        <div id="step-setup" class="content hidden">
            <div class="auth-shell">
                <div class="auth-card">
                    <div class="auth-brand">
                        <img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" alt="Nyxx">
                        <div class="ab-name">Nyxx</div>
                    </div>
                    <div class="auth-title"><i class="fa-solid fa-lock" style="color:var(--accent);margin-right:6px;"></i> Initial Setup</div>
                    <div class="auth-msg">Create your admin password. You can connect a bot token now or later.</div>
                    <div class="field">
                        <label class="field-label">Bot token <span class="muted">(optional)</span></label>
                        <div class="pw-wrap">
                            <input type="password" id="setup-bot-token" class="input" placeholder="123456:ABC…" autocomplete="off">
                            <button type="button" class="pw-toggle" onclick="togglePw('setup-bot-token',this)" aria-label="Show or hide token"><i class="fa-regular fa-eye"></i></button>
                        </div>
                        <span class="field-hint"><i class="fa-solid fa-circle-info"></i> Get this from <b>@BotFather</b> on Telegram. Send <code>/newbot</code> and copy the token.</span>
                        <label class="check" style="margin-top:8px;"><input type="checkbox" id="setup-skip-bot"> <span>Skip for now — I'll add it later</span></label>
                    </div>
                    <div class="field">
                        <label class="field-label">Admin password</label>
                        <div class="pw-wrap">
                            <input type="password" id="setup-password" class="input" placeholder="At least 6 characters" autocomplete="new-password" oninput="updatePwStrength()">
                            <button type="button" class="pw-toggle" onclick="togglePw('setup-password',this)" aria-label="Show or hide password"><i class="fa-regular fa-eye"></i></button>
                        </div>
                        <div id="pw-strength" class="field-hint" style="margin-top:6px;"></div>
                    </div>
                    <div class="field">
                        <label class="field-label">Confirm password</label>
                        <div class="pw-wrap">
                            <input type="password" id="setup-password-confirm" class="input" autocomplete="new-password">
                            <button type="button" class="pw-toggle" onclick="togglePw('setup-password-confirm',this)" aria-label="Show or hide password"><i class="fa-regular fa-eye"></i></button>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block btn-lg" onclick="submitSetup()"><i class="fa-solid fa-check"></i> Save &amp; continue</button>
                    <div class="err-box" id="setup-error"></div>
                </div>
            </div>
        </div>

        <div id="step-login" class="content hidden">
            <div class="auth-shell">
                <div class="auth-card">
                    <div class="auth-brand">
                        <img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" alt="Nyxx">
                        <div class="ab-name">Nyxx</div>
                    </div>
                    <div class="auth-title"><i class="fa-solid fa-lock" style="color:var(--accent);margin-right:6px;"></i> Sign in</div>
                    <div class="auth-msg">Enter your admin password to continue.</div>
                    <form onsubmit="event.preventDefault();submitLogin();">
                        <div class="field">
                            <label class="field-label">Password</label>
                            <div class="pw-wrap">
                                <input type="password" id="login-password" class="input" autocomplete="current-password" autofocus>
                                <button type="button" class="pw-toggle" onclick="togglePw('login-password',this)" aria-label="Show or hide password"><i class="fa-regular fa-eye"></i></button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block btn-lg"><i class="fa-solid fa-arrow-right-to-bracket"></i> Sign in</button>
                        <div class="err-box" id="login-error"></div>
                    </form>
                </div>
            </div>
        </div>

        <div id="step-dashboard" class="content hidden">
            <section class="page active" id="page-overview">
                <div class="page-head">
                    <div class="lead"><h1>Overview</h1><p>Everything happening in your bot right now.</p></div>
                    <div class="page-actions"><button class="btn btn-gray btn-sm" onclick="loadOverview(true)"><i class="fa-solid fa-rotate"></i> Refresh</button></div>
                </div>
                <div class="stats" id="ov-stats"></div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i class="fa-solid fa-flag-checkered"></i> Getting started</div></div>
                    <ul id="ov-checklist" style="list-style:none;padding:0;margin:0;"></ul>
                </div>
            </section>

            <section class="page" id="page-commands">
                <div class="page-head">
                    <div class="lead"><h1>Commands</h1><p>Build nested replies, photos and keyboards.</p></div>
                    <div class="page-actions">
                        <button class="btn btn-gray btn-sm" onclick="exportCommandPack()"><i class="fa-solid fa-file-export"></i> Export</button>
                        <button class="btn btn-gray btn-sm" onclick="document.getElementById('pack-file').click()"><i class="fa-solid fa-file-import"></i> Import</button>
                        <button class="btn btn-primary btn-sm" onclick="openCommandModal()"><i class="fa-solid fa-plus"></i> New command</button>
                    </div>
                </div>
                <input type="file" id="pack-file" accept=".json" class="hidden" onchange="importCommandPack(event)">
                <div class="toolbar"><div class="search"><i class="fa-solid fa-magnifying-glass"></i><input id="cmd-search" placeholder="Search commands" oninput="renderCommands()"></div></div>
                <div class="row" style="margin-bottom:12px;">
                    <span class="badge blue"><i class="fa-regular fa-folder-open"></i> <span id="crumb">Root</span></span>
                    <button class="btn btn-gray btn-sm" id="btn-up" onclick="navigateUp()"><i class="fa-solid fa-arrow-up"></i> Up</button>
                </div>
                <div id="cmd-list"></div>
            </section>

            <section class="page" id="page-menu">
                <div class="page-head">
                    <div class="lead"><h1>Menu &amp; Featured</h1><p>The Telegram menu button, plus commands your users can trigger with their own arguments.</p></div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title"><i class="fa-solid fa-list"></i> Telegram menu commands</div></div>
                    <div class="hint-banner">
                        <i class="fa-solid fa-circle-info"></i>
                        <div>These appear in the blue menu button (the "☰" that shows next to the message box in a chat). Use <b>lowercase</b>, no slash. <code>start</code> is fixed and always shown.</div>
                    </div>
                    <div id="menu-rows" class="grid" style="margin-bottom:16px;"></div>
                    <div class="row">
                        <button class="btn btn-gray btn-sm" onclick="addMenuRow()"><i class="fa-solid fa-plus"></i> Add entry</button>
                        <button class="btn btn-primary" onclick="publishMenu()"><i class="fa-solid fa-cloud-arrow-up"></i> Publish to Telegram</button>
                    </div>
                    <div id="menu-result" class="small" style="margin-top:10px;"></div>
                </div>

                <div class="card">
                    <div class="card-head">
                        <div class="card-title"><i class="fa-solid fa-wand-magic-sparkles"></i> Featured commands</div>
                        <div style="flex:1"></div>
                        <button class="btn btn-gray btn-sm" onclick="openFeaturedModal('text')"><i class="fa-solid fa-plus"></i> DM command</button>
                        <button class="btn btn-gray btn-sm" onclick="openFeaturedModal('buttons')"><i class="fa-solid fa-plus"></i> Buttons command</button>
                        <button class="btn btn-gray btn-sm" onclick="openFeaturedModal('mcp')"><i class="fa-solid fa-plug"></i> MCP command</button>
                    </div>
                    <details class="help">
                        <summary><i class="fa-solid fa-circle-question"></i> How featured commands work</summary>
                        <div>
                            <b>DM commands</b> quietly deliver a note from a user to you. When a user types <code>/contact hello boss</code>, the text <code>hello boss</code> lands in <b>Users → Direct messages</b> under that user. The bot deletes the trigger message and does not reply to the note itself — it just confirms with the success message you set.<br><br>
                            <b>Buttons commands</b> let users build their own inline keyboards. Example: <code>/menu "Hi there!" {Google}(https://google.com){Say hi}(Hi!){Menu}(/start)</code> — the bot sends "Hi there!" with those three buttons, three per row. Values starting with <b>http</b> open a link, values starting with <b>/</b> run a command, anything else is posted back as a new message.<br><br>
                            Each featured command has <b>three separate messages</b>: the <b>hint</b> (sent when the command is typed alone, with no arguments), the <b>success message</b> (sent after the action completes) and the <b>failure message</b> (sent if the action fails). Leave a field blank to stay silent in that case.
                        </div>
                    </details>
                    <div id="featured-list"></div>
                </div>
            </section>

            <section class="page" id="page-users">
                <div class="page-head">
                    <div class="lead"><h1>Users</h1><p>People who started your bot, plus group members you chose to track.</p></div>
                    <div class="page-actions">
                        <button class="btn btn-gray btn-sm" onclick="checkAllUsers()"><i class="fa-solid fa-stethoscope"></i> Check all reachable</button>
                        <button class="btn btn-gray btn-sm" onclick="go('broadcast')"><i class="fa-solid fa-bullhorn"></i> Broadcast</button>
                        <button class="btn btn-gray btn-sm" onclick="loadUsers(true)"><i class="fa-solid fa-rotate"></i></button>
                    </div>
                </div>
                <div class="hint-banner">
                    <i class="fa-solid fa-circle-info"></i>
                    <div><span class="badge green" style="margin-right:4px;"><i class="fa-solid fa-circle" style="font-size:8px;"></i></span> <b>Green</b> users started the bot — you can DM them. <span class="badge orange" style="margin-left:8px;margin-right:4px;"><i class="fa-solid fa-circle" style="font-size:8px;"></i></span> <b>Yellow</b> users only exist because of a group — they haven't pressed Start yet.</div>
                </div>
                <div class="toolbar"><div class="search"><i class="fa-solid fa-magnifying-glass"></i><input id="user-search" placeholder="Search by name or username" oninput="debouncedUsers()"></div></div>
                <div class="chips" id="user-filters">
                    <button class="chip active" data-filter="all" onclick="setUserFilter('all')">All</button>
                    <button class="chip" data-filter="private" onclick="setUserFilter('private')">Started bot</button>
                    <button class="chip" data-filter="group" onclick="setUserFilter('group')">Group only</button>
                    <button class="chip" data-filter="admin" onclick="setUserFilter('admin')">Admins</button>
                    <button class="chip" data-filter="blocked" onclick="setUserFilter('blocked')">Blocked</button>
                </div>
                <div id="users-list"></div>
            </section>

            <section class="page" id="page-user-manage">
                <div class="page-head">
                    <div class="lead">
                        <button class="btn btn-gray btn-sm" onclick="go('users')" style="margin-bottom:10px;"><i class="fa-solid fa-chevron-left"></i> Users</button>
                        <h1 id="um-title">User</h1>
                        <p id="um-sub"></p>
                    </div>
                </div>
                <div class="grid grid-3" id="um-cards" style="margin-bottom:16px;"></div>
                <div class="row" style="margin-bottom:16px;" id="um-actions"></div>

                <div class="card">
                    <div class="tabbar" id="um-tabs">
                        <button class="active" onclick="umSetTab('dm')" data-tab="dm"><i class="fa-solid fa-comment-dots"></i> Direct messages</button>
                        <button onclick="umSetTab('ai')" data-tab="ai"><i class="fa-solid fa-brain"></i> AI memory</button>
                    </div>

                    <div class="tabpane active" id="um-pane-dm">
                        <div class="hint-banner">
                            <i class="fa-solid fa-circle-info"></i>
                            <div>This is the private chat between you and the user, plus any messages sent through a <b>DM command</b>. It does <b>not</b> include AI conversations — those live in the AI memory tab.</div>
                        </div>
                        <div class="row" style="margin-bottom:8px;">
                            <span class="badge" id="um-dm-count">0</span>
                        </div>
                        <div class="chat" id="um-chat"></div>
                        <div class="chat-compose">
                            <textarea id="um-input" class="textarea" rows="2" placeholder="Write a message…  (Enter to send)" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendUserMessage();}"></textarea>
                            <button class="btn btn-primary btn-icon" onclick="sendUserMessage()" id="um-send" aria-label="Send message"><i class="fa-solid fa-paper-plane"></i></button>
                        </div>
                        <div class="row" style="margin-top:8px;">
                            <input id="um-photo" class="input" placeholder="Photo URL (optional — text becomes the caption)" style="flex:1;">
                            <button class="btn btn-gray btn-sm" onclick="openMsgEditor('dm-new')"><i class="fa-solid fa-keyboard"></i> Buttons</button>
                        </div>
                        <div class="field-hint">Attach an inline/reply keyboard with the Buttons button. It is saved with the message and can be edited later.</div>
                    </div>

                    <div class="tabpane" id="um-pane-ai">
                        <div class="hint-banner">
                            <i class="fa-solid fa-circle-info"></i>
                            <div>This is what the AI remembers about the user across conversations. You can edit or delete individual messages here — the AI will immediately use the updated context on the next reply.</div>
                        </div>
                        <div class="row" style="margin-bottom:8px;">
                            <div style="flex:1"></div>
                            <button class="btn btn-gray btn-sm" onclick="loadAiMemory()"><i class="fa-solid fa-rotate"></i></button>
                            <button class="btn btn-danger btn-sm" onclick="clearAiMemoryUser()"><i class="fa-solid fa-eraser"></i> Clear all</button>
                        </div>
                        <div class="chat" id="um-ai" style="background:var(--surface-2);"></div>
                    </div>
                </div>
            </section>

            <section class="page" id="page-groups">
                <div class="page-head">
                    <div class="lead"><h1>Groups</h1><p>Configure how the bot behaves in each group and supergroup.</p></div>
                    <div class="page-actions"><button class="btn btn-gray btn-sm" onclick="loadGroups(true)"><i class="fa-solid fa-rotate"></i> Refresh</button></div>
                </div>
                <div class="chips" id="group-filters">
                    <button class="chip active" data-gf="active" onclick="setGroupFilter('active')">Active</button>
                    <button class="chip" data-gf="inactive" onclick="setGroupFilter('inactive')">Left / removed</button>
                    <button class="chip" data-gf="all" onclick="setGroupFilter('all')">All</button>
                </div>
                <div id="groups-list"></div>
            </section>

            <section class="page" id="page-group-manage">
                <div class="page-head">
                    <div class="lead">
                        <button class="btn btn-gray btn-sm" onclick="go('groups')" style="margin-bottom:10px;"><i class="fa-solid fa-chevron-left"></i> Groups</button>
                        <h1 id="gm-title">Group</h1>
                        <p id="gm-sub"></p>
                    </div>
                </div>
                <div class="grid grid-3" id="gm-cards" style="margin-bottom:16px;"></div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-purple"><i class="fa-solid fa-wand-magic-sparkles"></i> AI behaviour</div></div>
                    <div class="field">
                        <label class="field-label">Reply in this group</label>
                        <div class="segmented" id="gm-ai-mode">
                            <button data-v="inherit" onclick="gmSet('ai','inherit')">Inherit</button>
                            <button data-v="on" onclick="gmSet('ai','on')">On</button>
                            <button data-v="off" onclick="gmSet('ai','off')">Off</button>
                        </div>
                        <span class="field-hint">Inherit uses the global setting from the AI tab.</span>
                    </div>
                    <div class="grid grid-2">
                        <div class="field">
                            <label class="field-label">Conversation memory</label>
                            <select class="input" id="gm-memory">
                                <option value="inherit">Inherit global</option>
                                <option value="0">Disabled — no memory</option>
                                <option value="5">Keep last 5 messages</option>
                                <option value="10">Keep last 10 messages</option>
                                <option value="20">Keep last 20 messages</option>
                            </select>
                            <span class="field-hint">How many past messages the AI sees when replying here.</span>
                        </div>
                        <div class="field">
                            <label class="field-label">Mention required</label>
                            <select class="input" id="gm-mention">
                                <option value="inherit">Inherit global</option>
                                <option value="1">Yes — only when tagged (@yourbot)</option>
                                <option value="0">No — reply to every text message</option>
                            </select>
                            <span class="field-hint">Recommended for busy groups: "Yes" avoids the bot butting into every conversation.</span>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-green"><i class="fa-solid fa-hand-sparkles"></i> Welcome &amp; rules</div></div>
                    <div class="switch-row"><div><div class="sw-label">Welcome new members</div><div class="sw-sub">Send a greeting when someone joins this group.</div></div><button class="switch" id="gm-welcome-toggle" onclick="gmToggle('welcome')"></button></div>
                    <div class="field">
                        <label class="field-label">Welcome message</label>
                        <textarea class="textarea" id="gm-welcome-text" rows="3" placeholder="Welcome {{first_name}} to {{title}}!"></textarea>
                        <span class="field-hint">Placeholders: <code>{{first_name}}</code> <code>{{username}}</code> <code>{{title}}</code> <code>{{id}}</code></span>
                    </div>
                    <div class="field" style="margin-bottom:0;">
                        <label class="field-label">Rules text <span class="muted small">(sent by /rules)</span></label>
                        <textarea class="textarea" id="gm-rules" rows="3" placeholder="1. Be kind&#10;2. No spam…"></textarea>
                        <span class="field-hint">Anyone typing <code>/rules</code> in this group gets this text. Leave blank to disable.</span>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-shield-halved"></i> Moderation</div></div>
                    <div class="switch-row"><div><div class="sw-label">Anti-flood</div><div class="sw-sub">Delete a member's messages after too many in a minute.</div></div><button class="switch" id="gm-flood-toggle" onclick="gmToggle('flood')"></button></div>
                    <div class="field" id="gm-flood-limit-wrap"><label class="field-label">Messages per minute before deletion</label><input type="number" class="input" id="gm-flood-limit" min="2" max="60" value="6"><span class="field-hint">Bot must be an admin in the group for this to work.</span></div>
                    <div class="switch-row"><div><div class="sw-label">Block links</div><div class="sw-sub">Delete messages containing URLs from non-admins.</div></div><button class="switch" id="gm-link-toggle" onclick="gmToggle('link')"></button></div>
                    <div class="switch-row"><div><div class="sw-label">Clean up service messages</div><div class="sw-sub">Delete "X joined", pinned notices and similar.</div></div><button class="switch" id="gm-service-toggle" onclick="gmToggle('service')"></button></div>
                    <div class="switch-row" style="margin-bottom:0;"><div><div class="sw-label">Track members in Users tab</div><div class="sw-sub">Off by default. When off, only members who DM the bot appear in Users.</div></div><button class="switch" id="gm-track-toggle" onclick="gmToggle('track')"></button></div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-bullhorn"></i> Send announcement</div></div>
                    <textarea class="textarea" id="gm-announce" rows="3" placeholder="Message to post in this group…"></textarea>
                    <input class="input" id="gm-announce-photo" placeholder="Photo URL (optional)" style="margin-top:8px;">
                    <div class="row" style="margin-top:10px;">
                        <button class="btn btn-gray btn-sm" onclick="openMsgEditor('group')"><i class="fa-solid fa-keyboard"></i> Buttons</button>
                        <button class="btn btn-primary" onclick="sendGroupAnnouncement()"><i class="fa-solid fa-paper-plane"></i> Send</button>
                    </div>
                </div>

                <div class="card">
                    <div class="row">
                        <button class="btn btn-primary" onclick="saveGroupSettings()"><i class="fa-solid fa-check"></i> Save settings</button>
                        <button class="btn btn-danger" onclick="removeGroup()"><i class="fa-solid fa-trash-can"></i> Remove from dashboard</button>
                    </div>
                </div>
            </section>

            <section class="page" id="page-broadcast">
                <div class="page-head"><div class="lead"><h1>Broadcast</h1><p>Send a message to many users at once.</p></div></div>
                <div class="hint-banner">
                    <i class="fa-solid fa-circle-info"></i>
                    <div><b>Important:</b> you can only message users who have started your bot. Users in the "Group only" list will be skipped automatically.</div>
                </div>
                <div class="card">
                    <div class="field">
                        <label class="field-label">Audience</label>
                        <select class="input" id="bc-target" onchange="onBroadcastTargetChange()">
                            <option value="all">Everyone who started the bot</option>
                            <option value="private">Only users who started the bot</option>
                            <option value="only_ai_blocked">Only AI-blocked users</option>
                            <option value="only_full_blocked">Only fully blocked users</option>
                            <option value="except_full_blocked">Everyone except blocked</option>
                            <option value="specific">Specific user IDs</option>
                            <option value="custom">Pick from list</option>
                        </select>
                        <span class="field-hint">Most of the time you want the first option.</span>
                    </div>
                    <div class="field hidden" id="bc-specific-wrap">
                        <label class="field-label">User IDs</label>
                        <textarea class="textarea" id="bc-specific" rows="3" placeholder="7407137804&#10;123456789" style="font-family:var(--mono);"></textarea>
                        <span class="field-hint">One ID per line. You can find IDs in the Users tab.</span>
                    </div>
                    <div class="field hidden" id="bc-custom-wrap">
                        <input class="input" id="bc-custom-search" placeholder="Search…" oninput="filterBroadcastCustom()">
                        <div class="row" style="margin:8px 0;">
                            <button class="btn btn-gray btn-sm" onclick="bcCustomAll(true)">Select all</button>
                            <button class="btn btn-gray btn-sm" onclick="bcCustomAll(false)">Clear</button>
                        </div>
                        <div id="bc-custom-list" style="max-height:280px;overflow:auto;"></div>
                    </div>
                    <div class="muted small" id="bc-count"></div>
                </div>
                <div class="card">
                    <details class="help" open>
                        <summary><i class="fa-solid fa-gauge-high"></i> Delivery pacing</summary>
                        <div>
                            Telegram limits bots to roughly <b>30 messages per second</b>. The defaults below are safe for most cases. Increase only if you know what you're doing.
                            <div class="grid grid-3" style="margin-top:12px;">
                                <div class="field"><label class="field-label">Batch size</label><input type="number" class="input" id="bc-batch" value="25" min="1" max="100"><span class="field-hint">How many messages sent at once per wave.</span></div>
                                <div class="field"><label class="field-label">Delay between batches (ms)</label><input type="number" class="input" id="bc-delay" value="1000" min="0" max="60000"><span class="field-hint">Pause between waves. 1000ms is safe.</span></div>
                                <div class="field"><label class="field-label">Timeout (ms)</label><input type="number" class="input" id="bc-timeout" value="10000" min="2000" max="60000"><span class="field-hint">Give up on a single send after this many ms.</span></div>
                            </div>
                            <button class="btn btn-gray btn-sm" onclick="saveBroadcastPacing()"><i class="fa-solid fa-check"></i> Save pacing</button>
                        </div>
                    </details>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title"><i class="fa-solid fa-paper-plane"></i> Compose</div></div>
                    <div class="chat" id="bc-chat"></div>
                    <div class="chat-compose">
                        <textarea class="textarea" id="bc-text" rows="2" placeholder="Write a broadcast…  (Enter to send)" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendBroadcast();}"></textarea>
                        <button class="btn btn-primary btn-icon" onclick="sendBroadcast()" id="bc-send" aria-label="Send broadcast"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                    <div class="row" style="margin-top:8px;">
                        <input class="input" id="bc-photo" placeholder="Photo URL (optional)" style="flex:1;">
                        <button class="btn btn-gray btn-sm" onclick="openMsgEditor('broadcast-new')"><i class="fa-solid fa-keyboard"></i> Buttons</button>
                    </div>
                </div>
            </section>

            <section class="page" id="page-memory">
                <div class="page-head">
                    <div class="lead"><h1>Memory</h1><p>Everything the bot has stored across every user — AI conversations and direct messages, all in one place.</p></div>
                    <div class="page-actions">
                        <button class="btn btn-gray btn-sm" onclick="loadMemory(true)"><i class="fa-solid fa-rotate"></i> Refresh</button>
                    </div>
                </div>
                <div class="hint-banner">
                    <i class="fa-solid fa-circle-info"></i>
                    <div><b>AI memory</b> is what the assistant remembers about each user's conversations. <b>Direct messages</b> are the private chats between you and your users (including messages sent through DM featured commands). Deleting is permanent.</div>
                </div>
                <div class="stats" id="mem-stats"></div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-clock-rotate-left"></i> Auto-remove memory</div></div>
                    <div class="hint-banner">
                        <i class="fa-solid fa-circle-info"></i>
                        <div>When enabled, the scheduled cleanup will prune old memory automatically. <b>AI memory</b> is governed by the value you set in the <a href="#" onclick="go('ai');return false;">AI</a> tab — it is kept in sync here. <b>Direct messages</b> are pruned by age using the unit you pick below. Off by default.</div>
                    </div>
                    <div class="switch-row" style="margin-bottom:0;">
                        <div><div class="sw-label">Enable auto-remove</div><div class="sw-sub">Requires a Cron trigger in wrangler.toml, or use "Run now" in the Cleanup tab.</div></div>
                        <button class="switch" id="arm-enable" onclick="toggleAutoRemove()"></button>
                    </div>
                    <div id="arm-settings" class="hidden" style="margin-top:16px;">
                        <div class="grid grid-2">
                            <div class="field">
                                <label class="field-label">AI memory retention</label>
                                <input class="input" id="arm-ai-value" readonly>
                                <span class="field-hint">Synced with the AI tab. Change it there to update.</span>
                            </div>
                            <div class="field">
                                <label class="field-label">Direct messages retention</label>
                                <div class="row nowrap">
                                    <input type="number" class="input" id="arm-dm-value" min="1" max="10000" style="flex:1;">
                                    <select class="input" id="arm-dm-unit" style="width:auto;">
                                        <option value="seconds">Seconds</option>
                                        <option value="minutes">Minutes</option>
                                        <option value="hours">Hours</option>
                                        <option value="days">Days</option>
                                        <option value="weeks">Weeks</option>
                                        <option value="months">Months</option>
                                    </select>
                                </div>
                                <span class="field-hint">Delete direct messages older than this. Runs with the scheduled cleanup.</span>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="saveAutoRemove()"><i class="fa-solid fa-check"></i> Save</button>
                    </div>
                </div>

                <details class="help">
                    <summary><i class="fa-solid fa-triangle-exclamation" style="color:var(--red);"></i> Bulk delete — affects every user, no undo</summary>
                    <div>
                        <div class="row" style="margin-top:8px;">
                            <button class="btn btn-danger btn-sm" onclick="bulkClear('ai')"><i class="fa-solid fa-brain"></i> Clear all AI memory</button>
                            <button class="btn btn-danger btn-sm" onclick="bulkClear('dm')"><i class="fa-solid fa-comment-dots"></i> Clear all direct messages</button>
                            <button class="btn btn-danger btn-sm" onclick="bulkClear('all')"><i class="fa-solid fa-bomb"></i> Clear everything</button>
                        </div>
                    </div>
                </details>

                <div class="chips" id="mem-filters">
                    <button class="chip active" data-mf="all" onclick="setMemFilter('all')">All users with memory</button>
                    <button class="chip" data-mf="ai" onclick="setMemFilter('ai')">AI memory only</button>
                    <button class="chip" data-mf="dm" onclick="setMemFilter('dm')">Direct messages only</button>
                </div>
                <div class="toolbar">
                    <div class="search"><i class="fa-solid fa-magnifying-glass"></i><input id="mem-search" placeholder="Search by name or username" oninput="renderMemory()"></div>
                </div>
                <div id="mem-list"></div>
            </section>

            <section class="page" id="page-ai">
                <div class="page-head"><div class="lead"><h1>AI</h1><p>Connect an AI provider and shape how your bot replies.</p></div></div>

                <div class="card">
                    <div class="switch-row" style="margin-bottom:0;">
                        <div><div class="sw-label">Enable AI replies</div><div class="sw-sub">Turn automatic AI responses on or off for the whole bot.</div></div>
                        <button class="switch" id="ai-enable" onclick="toggleAiEnabled()"></button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-purple"><i class="fa-solid fa-key"></i> Provider &amp; connection</div></div>
                    <div class="hint-banner">
                        <i class="fa-solid fa-circle-info"></i>
                        <div>
                            Pick an AI service, paste your API key, choose a model.<br>
                            <b>OpenAI</b>, <b>Gemini</b>, <b>DeepSeek</b>, <b>Groq</b> and <b>OpenRouter</b> all work with a key you can get from their website.<br>
                            <b>Ollama</b> is for self-hosted models — leave the base URL alone unless you run your own.
                        </div>
                    </div>
                    <div class="grid grid-2">
                        <div class="field"><label class="field-label">Provider</label>
                            <select class="input" id="ai-provider" onchange="onProviderChange()">
                                <option value="openai">OpenAI</option><option value="gemini">Google Gemini</option>
                                <option value="deepseek">DeepSeek</option><option value="groq">Groq</option>
                                <option value="openrouter">OpenRouter</option><option value="ollama">Ollama (local)</option>
                                <option value="custom">Custom (OpenAI-compatible)</option>
                            </select>
                            <span class="field-hint" id="ai-provider-hint"></span>
                        </div>
                        <div class="field"><label class="field-label">API key</label>
                            <div class="pw-wrap">
                                <input type="password" class="input" id="ai-key" autocomplete="off" placeholder="Paste your key here (e.g. sk-…)">
                                <button type="button" class="pw-toggle" onclick="togglePw('ai-key',this)" aria-label="Show or hide API key"><i class="fa-regular fa-eye"></i></button>
                            </div>
                            <span class="field-hint" id="ai-key-hint"><i class="fa-solid fa-circle-info"></i> Not sure what this is? Click "Get API key" below or check the provider's documentation.</span>
                        </div>
                        <div class="field"><label class="field-label">Model</label><input class="input" id="ai-model" placeholder="gpt-4o-mini">
                            <span class="field-hint" id="ai-model-hint">Autofilled with a recommended default.</span>
                        </div>
                        <div class="field hidden" id="ai-base-wrap"><label class="field-label">Base URL</label><input class="input" id="ai-base" placeholder="https://api.example.com/v1">
                            <span class="field-hint">Only needed for Custom / self-hosted providers.</span>
                        </div>
                        <div class="field"><label class="field-label">Custom headers (JSON)</label><input class="input" id="ai-headers" placeholder='{"X-Custom-Header":"value"}'>
                            <span class="field-hint">Optional. Leave empty unless your provider requires extra headers.</span>
                        </div>
                    </div>
                    <div id="ai-alts"></div>
                    <div class="row" style="margin-top:12px;">
                        <button class="btn btn-gray btn-sm" id="add-alt-provider-btn" onclick="addAltProvider()"><i class="fa-solid fa-plus"></i> Add fallback provider</button>
                        <button class="btn btn-primary btn-sm" onclick="testAi()"><i class="fa-solid fa-plug"></i> Test connections</button>
                    </div>
                    <div id="ai-test-result" class="small" style="margin-top:10px;"></div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-green"><i class="fa-solid fa-sliders"></i> Response shaping</div></div>
                    <div class="grid grid-2">
                        <div class="field"><label class="field-label">Display name</label><input class="input" id="ai-name" placeholder="Assistant">
                            <span class="field-hint">Used in the prompt as <code>{{bot_name}}</code>.</span>
                        </div>
                        <div class="field"><label class="field-label">Language</label>
                            <select class="input" id="ai-lang">
                                <option value="auto">Auto-detect (matches user)</option><option value="english">English</option>
                                <option value="farsi">Farsi</option><option value="arabic">Arabic</option>
                                <option value="spanish">Spanish</option><option value="french">French</option>
                                <option value="german">German</option><option value="russian">Russian</option>
                            </select>
                            <span class="field-hint">Force a specific reply language.</span>
                        </div>
                        <div class="field"><label class="field-label">Style</label>
                            <select class="input" id="ai-style">
                                <option value="friendly">Friendly</option><option value="professional">Professional</option>
                                <option value="casual">Casual</option><option value="formal">Formal</option>
                                <option value="funny">Funny</option>
                            </select>
                            <span class="field-hint">Tone of the AI's replies.</span>
                        </div>
                        <div class="field"><label class="field-label">Length</label>
                            <select class="input" id="ai-length">
                                <option value="very_short">Very short</option><option value="short">Short</option>
                                <option value="medium" selected>Medium</option><option value="detailed">Detailed</option>
                                <option value="automatic">Automatic</option>
                            </select>
                            <span class="field-hint">Roughly how long replies should be.</span>
                        </div>
                        <div class="field"><label class="field-label">Temperature</label><input type="number" class="input" id="ai-temp" value="0.7" step="0.1" min="0" max="2"><span class="field-hint">0 = predictable, 2 = creative. 0.7 is balanced.</span></div>
                        <div class="field"><label class="field-label">Max tokens</label><input type="number" class="input" id="ai-maxtok" value="1024" min="1"><span class="field-hint">Upper bound on reply length. 1024 is ~750 words.</span></div>
                        <div class="field"><label class="field-label">Top-P</label><input type="number" class="input" id="ai-topp" value="1.0" step="0.1" min="0" max="1"><span class="field-hint">Leave at 1.0 unless you know you need otherwise.</span></div>
                        <div class="field"><label class="field-label">Fallback message</label><textarea class="textarea" id="ai-fallback" rows="2">Sorry, I am currently unavailable. Please try again later.</textarea><span class="field-hint">Sent when every provider fails.</span></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-brain"></i> Instructions &amp; knowledge</div></div>
                    <div class="switch-row"><div><div class="sw-label">Strict knowledge mode</div><div class="sw-sub">Answer only from your instructions and knowledge bases.</div></div><button class="switch" id="ai-strict" onclick="toggleSwitch('ai-strict')"></button></div>
                    <div class="switch-row"><div><div class="sw-label">RTL support (Farsi / Arabic)</div><div class="sw-sub">Insert right-to-left marks on Persian paragraphs.</div></div><button class="switch" id="ai-rtl" onclick="toggleSwitch('ai-rtl')"></button></div>
                    <div class="field">
                        <label class="field-label">System prompt</label>
                        <textarea class="textarea" id="ai-prompt" rows="7" placeholder="You are {{bot_name}}, a helpful assistant…"></textarea>
                        <span class="field-hint">The core instruction the AI follows. You can use <code>{{bot_name}}</code> <code>{{user_first_name}}</code> <code>{{company_name}}</code> <code>{{website}}</code> <code>{{phone}}</code> <code>{{current_time}}</code> <code>{{available_commands}}</code></span>
                    </div>
                    <div class="field">
                        <label class="field-label">Start from a template</label>
                        <select class="input" id="ai-template" onchange="applyTemplate()">
                            <option value="custom">Custom</option><option value="assistant">Personal assistant</option>
                            <option value="support">Customer support</option><option value="restaurant">Restaurant</option>
                            <option value="programming">Programming helper</option><option value="school">Tutor</option>
                        </select>
                        <span class="field-hint">Replaces the prompt above. You can edit it after.</span>
                    </div>
                    <div class="field">
                        <label class="field-label">Knowledge bases</label>
                        <div id="kb-list"></div>
                        <button class="btn btn-gray btn-sm" onclick="addKb()"><i class="fa-solid fa-plus"></i> Add knowledge base</button>
                        <span class="field-hint">Free text the AI can reference. Toggle each one on or off.</span>
                    </div>
                    <div class="field">
                        <label class="field-label">Custom variables</label>
                        <textarea class="textarea" id="ai-vars" rows="3" placeholder="company_name=Acme&#10;website=acme.com"></textarea>
                        <span class="field-hint">One <code>key=value</code> per line. Use in the prompt as <code>{{key}}</code>.</span>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-filter"></i> Triggers</div></div>
                    <div class="grid grid-2">
                        <div class="field"><label class="field-label">When should the AI reply?</label>
                            <select class="input" id="ai-trigger">
                                <option value="no_command">Only when no command matches (recommended)</option>
                                <option value="all_messages">Every text message</option>
                                <option value="contains_text">Only when text contains…</option>
                            </select>
                            <span class="field-hint">The first option keeps commands authoritative.</span>
                        </div>
                        <div class="field hidden" id="ai-trigger-text-wrap"><label class="field-label">Trigger text</label><input class="input" id="ai-trigger-text"><span class="field-hint">Case-insensitive substring match.</span></div>
                        <div class="field"><label class="field-label">Ignore prefixes</label><input class="input" id="ai-prefixes" value="/, !, #"><span class="field-hint">Comma-separated. Messages starting with these are ignored.</span></div>
                        <div class="field"><label class="field-label">Ignore messages from bots</label><select class="input" id="ai-ignore-bots"><option value="1">Yes</option><option value="0">No</option></select><span class="field-hint">Recommended to keep on to avoid bot loops.</span></div>
                        <div class="field"><label class="field-label">Ignore forwarded messages</label><select class="input" id="ai-ignore-fwd"><option value="1">Yes</option><option value="0">No</option></select><span class="field-hint">Prevents the AI from replying to forwards from other chats.</span></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-plug"></i> MCP tools integration</div></div>
                    <div class="hint-banner warn">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <div>Tool calls let the AI <b>create commands, send messages, and (if enabled in MCP) delete users</b>. Only enable if you trust your prompt. Streaming is auto-disabled when tools are on.</div>
                    </div>
                    <div class="switch-row">
                        <div><div class="sw-label">Allow the AI to call MCP tools</div><div class="sw-sub">The AI can act on your bot, not just talk about it.</div></div>
                        <button class="switch" id="ai-use-mcp-tools" onclick="toggleAiUseMcp()"></button>
                    </div>
                    <div class="switch-row">
                        <div>
                            <div class="sw-label">Prompt mode during tool use</div>
                            <div class="sw-sub"><b>Auto</b>: local keyword/context detection (no extra API call). Clear bot-management requests get your persona + tools (no knowledge base); ambiguous ones get the full prompt + tools; everything else is plain chat. <b>Full</b>: always persona + KB + tools. <b>Minimal</b>: bare tool router first, then fall back.</div>
                        </div>
                        <select class="input" id="ai-mcp-prompt-mode" style="max-width:280px;">
                            <option value="auto">Auto — classify each message</option>
                            <option value="full">Full prompt always</option>
                            <option value="minimal">Minimal always</option>
                        </select>
                    </div>
                    <div class="switch-row" style="margin-bottom:0;">
                        <div><div class="sw-label">Tool categories to expose</div><div class="sw-sub">Empty = inherit from the MCP tab. Otherwise restricts the tools the AI can see.</div></div>
                        <select class="input" id="ai-mcp-categories" style="max-width:220px;">
                            <option value="">Inherit from MCP</option>
                            <option value="read">Read only</option>
                            <option value="read,write">Read + write</option>
                            <option value="read,write,outbound">Read + write + outbound</option>
                        </select>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-green"><i class="fa-solid fa-user"></i> Private chats</div></div>
                    <div class="grid grid-2">
                        <div class="field"><label class="field-label">Reply in private chats</label><select class="input" id="ai-private"><option value="1">Yes</option><option value="0">No</option></select><span class="field-hint">Users who opened a DM with your bot.</span></div>
                        <div class="field"><label class="field-label">Memory</label>
                            <select class="input" id="ai-memory">
                                <option value="0">Disabled</option><option value="5">Last 5 messages</option>
                                <option value="10">Last 10 messages</option><option value="20">Last 20 messages</option>
                            </select>
                            <span class="field-hint">How much context the AI remembers per user.</span>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-purple"><i class="fa-solid fa-users"></i> Groups — global defaults</div></div>
                    <div class="hint-banner">
                        <i class="fa-solid fa-circle-info"></i>
                        <div>Per-group overrides live in the <a href="#" onclick="go('groups');return false;">Groups</a> tab.</div>
                    </div>
                    <div class="grid grid-2">
                        <div class="field"><label class="field-label">Reply in groups</label><select class="input" id="ai-group"><option value="1">Yes</option><option value="0">No</option></select></div>
                        <div class="field"><label class="field-label">Mention required</label><select class="input" id="ai-mention"><option value="1">Yes — only when tagged</option><option value="0">No — reply to all text</option></select><span class="field-hint">Recommended: Yes for busy groups.</span></div>
                        <div class="field"><label class="field-label">Memory</label>
                            <select class="input" id="ai-gmemory">
                                <option value="0">Disabled</option><option value="5">Last 5 messages</option>
                                <option value="10">Last 10 messages</option><option value="20">Last 20 messages</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-gauge-high"></i> Performance</div></div>
                    <div class="grid grid-2">
                        <div class="field"><label class="field-label">Per-user limit / minute</label><input type="number" class="input" id="ai-rate" value="10" min="0"><span class="field-hint">0 = no limit. 10 is reasonable.</span></div>
                        <div class="field"><label class="field-label">Global limit</label>
                            <div class="row nowrap"><input type="number" class="input" id="ai-grate" value="0" min="0" style="flex:1;">
                                <select class="input" id="ai-gwindow" style="width:auto;"><option value="minute">per minute</option><option value="hour">per hour</option></select>
                            </div>
                            <span class="field-hint">Across all users. 0 = no limit.</span>
                        </div>
                        <div class="field"><label class="field-label">Response delay (ms)</label><input type="number" class="input" id="ai-delay" value="0" min="0" max="5000"><span class="field-hint">Adds a short pause before replying. Makes the bot feel more natural.</span></div>
                    </div>
                    <div class="switch-row"><div><div class="sw-label">Typing indicator</div><div class="sw-sub">Shows "typing…" while the AI is generating.</div></div><button class="switch" id="ai-typing" onclick="toggleSwitch('ai-typing')"></button></div>
                    <div class="switch-row"><div><div class="sw-label">Retry on failure</div><div class="sw-sub">Retry once, then use fallback providers.</div></div><button class="switch" id="ai-retry" onclick="toggleSwitch('ai-retry')"></button></div>
                    <div class="switch-row"><div><div class="sw-label">Streaming replies</div><div class="sw-sub">Edit the message live as the AI writes.</div></div><button class="switch" id="ai-stream" onclick="toggleSwitch('ai-stream')"></button></div>
                    <div class="switch-row" style="margin-bottom:0;"><div><div class="sw-label">Show reply keyboard after AI replies</div><div class="sw-sub">Buttons users can tap instead of typing.</div></div><button class="switch" id="ai-suggest" onclick="toggleSwitch('ai-suggest')"></button></div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-purple"><i class="fa-solid fa-keyboard"></i> Quick replies</div></div>
                    <div class="switch-row"><div><div class="sw-label">One-time keyboard</div><div class="sw-sub">Hide after the first tap.</div></div><button class="switch on" id="ai-sq-once" onclick="toggleSwitch('ai-sq-once')"></button></div>
                    <div class="row" style="margin-bottom:10px;">
                        <input class="input" id="sq-label" placeholder="Button label" style="flex:1;">
                        <input class="input" id="sq-value" placeholder="Text to send when tapped" style="flex:1;">
                        <button class="btn btn-primary btn-sm" onclick="addSq()"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div id="sq-list"></div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-green"><i class="fa-solid fa-flask"></i> Playground</div><div style="flex:1"></div><button class="btn btn-gray btn-sm" onclick="clearPlayground()" aria-label="Clear playground"><i class="fa-solid fa-trash-can"></i></button></div>
                    <div class="hint-banner">
                        <i class="fa-solid fa-lightbulb"></i>
                        <div>Test your AI without messaging the bot. Drag the bottom-right corner to resize. Supports <b>HTML</b> tags (<code>&lt;b&gt;</code>, <code>&lt;i&gt;</code>, <code>&lt;code&gt;</code>) and markdown-style <code>\`code\`</code>.</div>
                    </div>
                    <div class="playground" id="pg"></div>
                    <div class="row nowrap">
                        <input class="input" id="pg-input" placeholder="Type a test message…  (Enter to send)" onkeydown="if(event.key==='Enter')sendPlayground()" style="flex:1;">
                        <button class="btn btn-primary btn-icon" onclick="sendPlayground()" aria-label="Send test message"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>

                <div class="card">
                    <div class="row" style="justify-content:space-between;">
                        <span class="memory-pill"><i class="fa-solid fa-memory"></i> <span id="mem-count">…</span></span>
                        <div class="row">
                            <button class="btn btn-gray btn-sm" onclick="exportAi()" title="Export AI settings" aria-label="Export AI settings"><i class="fa-solid fa-download"></i></button>
                            <button class="btn btn-gray btn-sm" onclick="document.getElementById('ai-import').click()" title="Import AI settings" aria-label="Import AI settings"><i class="fa-solid fa-upload"></i></button>
                            <input type="file" id="ai-import" class="hidden" accept=".json" onchange="importAi(event)">
                            <button class="btn btn-danger btn-sm" onclick="clearAllAiMemory()" title="Clear every AI conversation" aria-label="Clear every AI conversation"><i class="fa-solid fa-eraser"></i></button>
                            <button class="btn btn-gray btn-sm" onclick="resetAi()" title="Reset AI settings to defaults" aria-label="Reset AI settings"><i class="fa-solid fa-rotate-left"></i></button>
                        </div>
                    </div>
                </div>

                <div class="sticky-actions">
                    <button class="btn btn-primary" onclick="saveAi()"><i class="fa-solid fa-check"></i> Save AI settings</button>
                </div>
            </section>

                        <section class="page" id="page-mcp">
                <div class="page-head">
                    <div class="lead"><h1>MCP</h1><p>Model Context Protocol — let AI (Claude Desktop, Cursor, Cline, or the built-in chat below) manage your bot with the tools you enable here.</p></div>
                    <div class="page-actions"><button class="btn btn-gray btn-sm" onclick="loadMcp(true)"><i class="fa-solid fa-rotate"></i> Refresh</button></div>
                </div>

                <div class="hint-banner warn">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <div>The <b>Bearer token</b> is a full credential — treat it like your admin password. Anyone who has it can call the tools you enable.</div>
                </div>

                <div class="card">
                    <div class="switch-row" style="margin-bottom:0;">
                        <div><div class="sw-label">Enable MCP endpoint</div><div class="sw-sub">Serves <code>/mcp</code> for external clients and enables the Telegram <code>/mcp</code> command.</div></div>
                        <button class="switch" id="mcp-enabled" onclick="toggleMcpEnabled()"></button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title"><i class="fa-solid fa-link"></i> Endpoint</div></div>
                    <div class="input-with-btn">
                        <input class="input mono" id="mcp-endpoint" readonly placeholder="https://your-worker.workers.dev/mcp">
                        <button class="btn btn-gray btn-sm" onclick="copyVal('mcp-endpoint')" aria-label="Copy"><i class="fa-regular fa-copy"></i></button>
                    </div>
                    <div class="field-hint">POST JSON-RPC here. Streamable HTTP transport, protocol version <code>2025-03-26</code>.</div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title"><i class="fa-solid fa-key"></i> Bearer tokens</div></div>
                    <div class="row">
                        <button class="btn btn-primary btn-sm" onclick="generateMcpToken()"><i class="fa-solid fa-plus"></i> Generate token</button>
                        <button class="btn btn-danger btn-sm" onclick="revokeMcpTokens()"><i class="fa-solid fa-trash-can"></i> Revoke all</button>
                    </div>
                    <div id="mcp-token-once" class="hidden" style="margin-top:12px;">
                        <div class="hint-banner danger">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            <div>Copy this token now — it is shown <b>once</b>. Only its hash is stored.</div>
                        </div>
                        <div class="input-with-btn">
                            <input class="input mono" id="mcp-token-value" readonly>
                            <button class="btn btn-primary btn-sm" onclick="copyVal('mcp-token-value')" aria-label="Copy"><i class="fa-regular fa-copy"></i></button>
                        </div>
                    </div>
                    <div id="mcp-tokens-list" style="margin-top:14px;"></div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-brain"></i> Session memory &amp; rate limit</div></div>
                    <div class="switch-row" style="margin-bottom:0;">
                        <div><div class="sw-label">Session memory</div><div class="sw-sub">Keep the last few messages per session so follow-ups work.</div></div>
                        <button class="switch" id="mcp-memory-enabled" onclick="toggleMcpMemory()"></button>
                    </div>
                    <div id="mcp-memory-settings" class="hidden" style="margin-top:16px;">
                        <div class="grid grid-2">
                            <div class="field"><label class="field-label">Memory size</label>
                                <select class="input" id="mcp-memory-limit">
                                    <option value="10">10 exchanges</option>
                                    <option value="20">20 exchanges</option>
                                    <option value="40">40 exchanges</option>
                                </select>
                                <span class="field-hint">1 exchange = 1 user message + 1 assistant reply.</span>
                            </div>
                            <div class="field"><label class="field-label">Retention (hours)</label>
                                <input type="number" class="input" id="mcp-memory-ttl" min="1" max="720" value="24">
                                <span class="field-hint">Sessions idle for longer than this are purged automatically.</span>
                            </div>
                            <div class="field"><label class="field-label">Rate limit</label>
                                <input type="number" class="input" id="mcp-rate-limit" min="0" max="1000" value="20">
                                <span class="field-hint">0 = no limit.</span>
                            </div>
                            <div class="field"><label class="field-label">Window</label>
                                <select class="input" id="mcp-rate-window">
                                    <option value="minute">per minute</option>
                                    <option value="hour">per hour</option>
                                </select>
                            </div>
                        </div>
                        <div class="row" style="margin-top:8px;">
                            <button class="btn btn-primary btn-sm" onclick="saveMcpMemorySettings()"><i class="fa-solid fa-check"></i> Save</button>
                            <button class="btn btn-danger btn-sm" onclick="clearAllMcpSessions()"><i class="fa-solid fa-eraser"></i> Clear all sessions</button>
                        </div>
                        <div id="mcp-sessions-list" class="small" style="margin-top:12px;"></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-purple"><i class="fa-solid fa-wand-magic-sparkles"></i> MCP AI provider</div></div>
                    <div class="hint-banner">
                        <i class="fa-solid fa-circle-info"></i>
                        <div>This provider powers the built-in chat below and the Telegram <code>/mcp</code> command. It is <b>separate</b> from the main AI tab.</div>
                    </div>
                    <div class="grid grid-2">
                        <div class="field"><label class="field-label">Provider</label>
                            <select class="input" id="mcp-provider" onchange="onMcpProviderChange()">
                                <option value="openai">OpenAI</option><option value="gemini">Google Gemini</option>
                                <option value="deepseek">DeepSeek</option><option value="groq">Groq</option>
                                <option value="openrouter">OpenRouter</option><option value="custom">Custom (OpenAI-compatible)</option>
                            </select>
                        </div>
                        <div class="field"><label class="field-label">API key</label>
                            <div class="pw-wrap">
                                <input type="password" class="input" id="mcp-api-key" autocomplete="off" placeholder="sk-…">
                                <button type="button" class="pw-toggle" onclick="togglePw('mcp-api-key',this)" aria-label="Show/hide"><i class="fa-regular fa-eye"></i></button>
                            </div>
                            <span class="field-hint" id="mcp-key-hint">Leave empty to keep the stored key.</span>
                        </div>
                        <div class="field"><label class="field-label">Model</label><input class="input" id="mcp-model" placeholder="gpt-4o-mini"></div>
                        <div class="field" id="mcp-base-wrap"><label class="field-label">Base URL</label><input class="input" id="mcp-base" placeholder="https://api.example.com/v1"></div>
                    </div>
                    <div class="row">
                        <button class="btn btn-primary btn-sm" onclick="saveMcpAiSettings()"><i class="fa-solid fa-check"></i> Save provider</button>
                        <button class="btn btn-gray btn-sm" onclick="testMcpAi()"><i class="fa-solid fa-plug"></i> Test connection</button>
                    </div>
                    <div id="mcp-test-result" class="small" style="margin-top:10px;"></div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-shield-halved"></i> Tool permissions</div></div>
                    <div class="switch-row"><div><div class="sw-label">Read tools</div><div class="sw-sub">Stats, users, commands, groups, webhook, bot info.</div></div><button class="switch" id="mcp-cat-read" onclick="toggleMcpCategory('read')"></button></div>
                    <div class="switch-row"><div><div class="sw-label">Write tools</div><div class="sw-sub">Create/update/delete commands, set menu, update AI settings.</div></div><button class="switch" id="mcp-cat-write" onclick="toggleMcpCategory('write')"></button></div>
                    <div class="switch-row"><div><div class="sw-label">Outbound messages</div><div class="sw-sub">Send DM or broadcast. Off by default.</div></div><button class="switch" id="mcp-cat-outbound" onclick="toggleMcpCategory('outbound')"></button></div>
                    <div class="switch-row" style="margin-bottom:0;"><div><div class="sw-label">Destructive actions</div><div class="sw-sub">Delete users, clear memory. Off by default, always require <code>confirm:true</code>.</div></div><button class="switch" id="mcp-cat-dangerous" onclick="toggleMcpCategory('dangerous')"></button></div>
                </div>

                <div class="card">
                    <div class="card-head">
                        <div class="card-title c-green"><i class="fa-solid fa-comments"></i> Chat with Nyxx</div>
                    </div>
                    <div class="hint-banner">
                        <i class="fa-solid fa-lightbulb"></i>
                        <div>Open a full-screen chat in its own tab — ask Nyxx to read stats, create commands, manage groups, tweak AI settings, and more. Each chat is a separate thread you can return to later.</div>
                    </div>
                    <div class="row">
                        <a class="btn btn-primary btn-lg" href="/chat" target="_blank" rel="noopener"><i class="fa-solid fa-up-right-from-square"></i> Open Chat</a>
                        <a class="btn btn-gray btn-lg" href="/chat" target="_blank" rel="noopener"><i class="fa-solid fa-plus"></i> Start a new chat</a>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title"><i class="fa-solid fa-clock-rotate-left"></i> Recent calls</div><div style="flex:1"></div><button class="btn btn-gray btn-sm" onclick="go('logs')"><i class="fa-solid fa-list"></i> View all</button><button class="btn btn-gray btn-sm" onclick="loadMcpCalls()"><i class="fa-solid fa-rotate"></i></button></div>
                    <div id="mcp-calls-list"></div>
                </div>

                <details class="help">
                    <summary><i class="fa-solid fa-code"></i> Client setup (Claude Desktop, Cursor, Cline)</summary>
                    <div>
                        <p class="small">Paste into <code>claude_desktop_config.json</code> (Claude Desktop bridges HTTP via <code>mcp-remote</code>):</p>
                        <pre id="mcp-snippet-claude" style="background:var(--surface-2);padding:12px;border-radius:8px;font-size:12px;overflow-x:auto;white-space:pre-wrap;"></pre>
                        <p class="small">Cursor (<code>~/.cursor/mcp.json</code>) — native Streamable HTTP:</p>
                        <pre id="mcp-snippet-cursor" style="background:var(--surface-2);padding:12px;border-radius:8px;font-size:12px;overflow-x:auto;white-space:pre-wrap;"></pre>
                        <p class="small">Curl smoke test:</p>
                        <pre id="mcp-snippet-curl" style="background:var(--surface-2);padding:12px;border-radius:8px;font-size:12px;overflow-x:auto;white-space:pre-wrap;"></pre>
                        <p class="small">Debug with the official inspector: <code>npx @modelcontextprotocol/inspector</code></p>
                    </div>
                </details>
            </section>

            <section class="page" id="page-permissions">
                <div class="page-head">
                    <div class="lead"><h1>Admin &amp; Permissions</h1><p>Centralised access control, synced across the whole worker. Applies to bot commands, AI replies, MCP tool calls, featured commands and button taps.</p></div>
                    <div class="page-actions"><button class="btn btn-gray btn-sm" onclick="loadPermissions(true)"><i class="fa-solid fa-rotate"></i> Refresh</button></div>
                </div>

                <div class="hint-banner warn">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <div><b>Admin-only</b> modes reject non-admin users with an <i>"unauthorised"</i> message. Admin accounts are managed below, or from <b>Users → Promote</b>.</div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-lock"></i> Global feature access</div></div>
                    <div id="perm-list"></div>
                    <div class="row" style="margin-top:16px;">
                        <button class="btn btn-primary" onclick="savePermissions()"><i class="fa-solid fa-check"></i> Save permissions</button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-purple"><i class="fa-solid fa-user-shield"></i> Administrators</div><div style="flex:1"></div><button class="btn btn-gray btn-sm" onclick="loadAdmins()" aria-label="Refresh admins"><i class="fa-solid fa-rotate"></i></button></div>
                    <div class="row" style="margin-bottom:12px;">
                        <input class="input" id="promote-user-id" placeholder="Telegram user ID" style="flex:1;max-width:240px;" type="number">
                        <button class="btn btn-primary btn-sm" onclick="promoteAdmin()"><i class="fa-solid fa-plus"></i> Promote</button>
                    </div>
                    <div id="admins-list"></div>
                </div>
            </section>

            <section class="page" id="page-settings">
                <div class="page-head"><div class="lead"><h1>Settings</h1><p>Bot connection and admin credentials.</p></div></div>
                <div class="card">
                    <div class="card-head"><div class="card-title c-green"><i class="fa-solid fa-robot"></i> Bot token</div></div>
                    <div class="input-with-btn">
                        <input type="password" class="input" id="set-token" readonly style="font-family:var(--mono);font-size:12px;">
                        <button class="btn btn-gray btn-sm" onclick="revealToken()" title="Reveal" aria-label="Reveal token"><i class="fa-regular fa-eye"></i></button>
                        <button class="btn btn-gray btn-sm" onclick="copyVal('set-token')" title="Copy" aria-label="Copy token"><i class="fa-regular fa-copy"></i></button>
                    </div>
                    <div class="field-hint">Secrets are masked for safety. Click the eye to reveal once — this action is logged in the activity feed.</div>
                    <button class="btn btn-primary btn-sm" style="margin-top:12px;" onclick="changeToken()"><i class="fa-solid fa-key"></i> Change token</button>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title c-purple"><i class="fa-solid fa-link"></i> Webhook</div></div>
                    <div class="input-with-btn">
                        <input class="input" id="set-hook" readonly style="font-size:12px;">
                        <button class="btn btn-gray btn-sm" onclick="copyVal('set-hook')" aria-label="Copy webhook URL"><i class="fa-regular fa-copy"></i></button>
                    </div>
                    <div class="field-hint">Telegram delivers updates to this URL. If it's ever broken, click <b>Health check</b> to repair it automatically.</div>
                    <div class="row" style="margin-top:12px;">
                        <button class="btn btn-gray btn-sm" onclick="testHook()"><i class="fa-solid fa-stethoscope"></i> Test</button>
                        <button class="btn btn-primary btn-sm" onclick="fixHook()"><i class="fa-solid fa-heart-pulse"></i> Health check</button>
                    </div>
                    <div id="hook-result" class="small" style="margin-top:10px;"></div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-lock"></i> Admin password</div></div>
                    <div class="grid grid-2" style="max-width:460px;">
                        <div class="field" style="margin-bottom:0;"><label class="field-label">New password</label>
                            <div class="pw-wrap">
                                <input type="password" class="input" id="pw1" autocomplete="new-password">
                                <button type="button" class="pw-toggle" onclick="togglePw('pw1',this)" aria-label="Show or hide password"><i class="fa-regular fa-eye"></i></button>
                            </div>
                            <span class="field-hint">At least 6 characters.</span>
                        </div>
                        <div class="field"><label class="field-label">Confirm</label>
                            <div class="pw-wrap">
                                <input type="password" class="input" id="pw2" autocomplete="new-password">
                                <button type="button" class="pw-toggle" onclick="togglePw('pw2',this)" aria-label="Show or hide password"><i class="fa-regular fa-eye"></i></button>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="changePassword()"><i class="fa-solid fa-check"></i> Update password</button>
                    <div id="pw-result" class="small" style="margin-top:8px;"></div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title c-red"><i class="fa-solid fa-triangle-exclamation"></i> Danger zone</div></div>
                    <div class="hint-banner danger">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <div>Factory reset erases <b>everything</b> — commands, users, groups, messages, settings. The bot is disconnected. There is no undo.</div>
                    </div>
                    <button class="btn btn-danger" onclick="factoryReset()"><i class="fa-solid fa-rotate-left"></i> Factory reset</button>
                </div>
            </section>

            <section class="page" id="page-botinfo">
                <div class="page-head"><div class="lead"><h1>Bot Info</h1><p>Name and descriptions shown in Telegram.</p></div></div>
                <div class="card">
                    <div class="field"><label class="field-label">Name</label><input class="input" id="bi-name" placeholder="My Bot"><span class="field-hint">The public name shown in chats and search.</span></div>
                    <div class="field"><label class="field-label">Description</label><textarea class="textarea" id="bi-desc" rows="5"></textarea><span class="field-hint">Shown on the bot's profile page before the user starts it.</span></div>
                    <div class="field"><label class="field-label">Short description</label><textarea class="textarea" id="bi-short" rows="3"></textarea><span class="field-hint">Shown on the chat's empty state, right under the name.</span></div>
                    <div class="row">
                        <button class="btn btn-gray" onclick="loadBotInfo(true)"><i class="fa-solid fa-download"></i> Load from Telegram</button>
                        <button class="btn btn-primary" onclick="publishBotInfo()"><i class="fa-solid fa-cloud-arrow-up"></i> Publish</button>
                    </div>
                    <div id="bi-result" class="small" style="margin-top:10px;"></div>
                </div>
            </section>

            <section class="page" id="page-cron">
                <div class="page-head"><div class="lead"><h1>Automatic cleanup</h1><p>Optionally prune old data on a schedule.</p></div></div>
                <div class="hint-banner warn">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <div><b>Automatic cleanup is OFF by default.</b> Turning it on will permanently delete old data on the schedule below. There is no undo.</div>
                </div>
                <div class="card">
                    <div class="switch-row"><div><div class="sw-label">Enable automatic cleanup</div><div class="sw-sub">Requires a Cron trigger in wrangler.toml or press Run now.</div></div><button class="switch" id="cron-enable" onclick="toggleCronEnabled()"></button></div>
                    <div id="cron-rows"></div>
                    <div class="row" style="margin-top:16px;">
                        <button class="btn btn-primary btn-sm" onclick="saveCron()"><i class="fa-solid fa-check"></i> Save</button>
                        <button class="btn btn-gray btn-sm" onclick="runCron()"><i class="fa-solid fa-play"></i> Run now</button>
                    </div>
                    <div id="cron-last" class="muted small" style="margin-top:10px;"></div>
                </div>

                <div class="card">
                    <div class="card-head"><div class="card-title c-purple"><i class="fa-solid fa-code"></i> Enabling Cron in wrangler.toml</div></div>
                    <p class="muted small" style="line-height:1.6;">To let Cloudflare run cleanup automatically, add a <code>[triggers]</code> block to your <code>wrangler.toml</code> and redeploy:</p>
                    <pre style="background:var(--surface-2);padding:14px;border-radius:8px;overflow-x:auto;font-family:var(--mono);font-size:13px;line-height:1.6;margin:0;"><code>[triggers]
crons = ["0 3 * * *"]</code></pre>
                    <p class="muted small" style="margin-top:12px;line-height:1.6;">The example above runs every day at <b>03:00 UTC</b>. Any <a href="https://crontab.guru/" target="_blank" rel="noopener">standard cron expression</a> works. Without a trigger you can still use <b>Run now</b> above, or add a Cron Trigger from the Cloudflare dashboard (Workers → your Worker → Settings → Triggers).</p>
                </div>
            </section>

            <section class="page" id="page-backup">
                <div class="page-head"><div class="lead"><h1>Backup</h1><p>Download or restore a snapshot of your bot.</p></div></div>
                <div class="hint-banner">
                    <i class="fa-solid fa-circle-info"></i>
                    <div>Backups include commands, users, groups, direct messages, AI memory, settings and history. <b>Secrets are never included</b> for your safety.</div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title c-green"><i class="fa-solid fa-download"></i> Export</div></div>
                    <div class="row">
                        <button class="btn btn-primary" onclick="exportBackup()"><i class="fa-solid fa-box-archive"></i> Full backup</button>
                        <button class="btn btn-gray" onclick="openCustomBackup()"><i class="fa-solid fa-sliders"></i> Custom backup…</button>
                    </div>
                    <div id="backup-result" class="small" style="margin-top:10px;"></div>
                </div>
                <div class="card">
                    <div class="card-head"><div class="card-title c-orange"><i class="fa-solid fa-upload"></i> Restore</div></div>
                    <div class="hint-banner warn">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <div>Restoring <b>overwrites</b> the data in the sections contained in the file. Restore early, restore often.</div>
                    </div>
                    <div class="row">
                        <button class="btn btn-primary" onclick="document.getElementById('restore-file').click()"><i class="fa-solid fa-upload"></i> Restore from file</button>
                        <input type="file" id="restore-file" class="hidden" accept=".json" onchange="restoreBackup(event)">
                    </div>
                </div>
            </section>

            <section class="page" id="page-logs">
                <div class="page-head">
                    <div class="lead"><h1>Activity Log</h1><p>Recent admin actions.</p></div>
                    <div class="page-actions">
                        <button class="btn btn-gray btn-sm" onclick="loadLogs()" aria-label="Refresh logs"><i class="fa-solid fa-rotate"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="clearLogs()"><i class="fa-solid fa-trash-can"></i> Clear all</button>
                    </div>
                </div>
                <div class="card">
                    <div class="switch-row"><div><div class="sw-label">Auto-delete old logs</div><div class="sw-sub">Off by default. When on, entries older than the number of days below are removed nightly.</div></div><button class="switch" id="logclean-toggle" onclick="toggleLogClean()"></button></div>
                    <div class="field" id="logclean-days-wrap">
                        <label class="field-label">Delete logs older than</label>
                        <input type="number" class="input" id="logclean-days" value="30" min="1" max="3650" style="max-width:200px;">
                        <span class="field-hint">days</span>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="saveLogClean()"><i class="fa-solid fa-check"></i> Save</button>
                </div>
                <div class="list" id="logs-list"></div>
            </section>

            <section class="page" id="page-update">
                <div class="page-head"><div class="lead"><h1>Update</h1><p>Deploy the latest Nyxx to your Worker.</p></div></div>
                <div class="card">
                    <div class="hint-banner">
                        <i class="fa-solid fa-circle-info"></i>
                        <div>The update downloads the latest code from GitHub and redeploys your Worker, keeping all your bindings and data.</div>
                    </div>
                    <div class="grid grid-2">
                        <div class="field"><label class="field-label">Current version</label><input class="input" id="up-current" readonly value="${VERSION}"></div>
                        <div class="field"><label class="field-label">Latest version</label>
                            <div class="input-with-btn"><input class="input" id="up-latest" readonly placeholder="Click to check…"><button class="btn btn-gray btn-sm" onclick="checkUpdate(true)" aria-label="Check for updates"><i class="fa-solid fa-rotate"></i></button></div>
                            <span class="field-hint" id="up-notes"></span>
                        </div>
                    </div>
                    <div class="field"><label class="field-label">Cloudflare API token</label>
                        <div class="input-with-btn">
                            <div class="pw-wrap" style="flex:1;">
                                <input type="password" class="input" id="up-token" placeholder="Workers Scripts:Edit" autocomplete="off">
                                <button type="button" class="pw-toggle" onclick="togglePw('up-token',this)" aria-label="Show or hide token"><i class="fa-regular fa-eye"></i></button>
                            </div>
                            <button class="btn btn-gray btn-sm" onclick="openTokenGen()"><i class="fa-solid fa-key"></i> Get token</button>
                        </div>
                        <span class="field-hint">Needs the <b>Workers Scripts:Edit</b> permission. Only used for this update, never shared.</span>
                    </div>
                    <button class="btn btn-primary" id="up-btn" onclick="performUpdate()" disabled><i class="fa-solid fa-cloud-arrow-up"></i> Update now</button>
                    <div id="up-result" class="small" style="margin-top:10px;"></div>
                </div>
            </section>
        </div>
    </div>
</div>

<div class="modal hidden" id="cmd-modal" role="dialog" aria-modal="true" aria-labelledby="cmd-modal-title">
    <div class="modal-bg" onclick="closeCommandModal()"></div>
    <div class="sheet">
        <div class="sheet-head">
            <button class="btn btn-plain" onclick="closeCommandModal()">Cancel</button>
            <div class="sheet-title" id="cmd-modal-title">New command</div>
            <button class="btn btn-plain" id="cmd-save" onclick="saveCommand()">Save</button>
        </div>
        <div class="sheet-body">
            <div class="field"><label class="field-label">Command</label><input class="input" id="cmd-name" placeholder="/start" style="font-family:var(--mono);"><span class="field-hint">Include the leading slash. Example: <code>/help</code>.</span></div>
            <div class="field"><label class="field-label">Parent folder</label><select class="input" id="cmd-parent"><option value="">None (root)</option></select><span class="field-hint">Group related commands under a folder.</span></div>
            <div class="field"><label class="field-label">Reply type</label>
                <select class="input" id="cmd-type" onchange="toggleMedia()"><option value="text">Text</option><option value="photo">Photo</option></select>
            </div>
            <div class="field"><label class="field-label">Content</label><textarea class="textarea" id="cmd-content" rows="3" placeholder="What the bot replies with…"></textarea><span class="field-hint">HTML tags are allowed: <code>&lt;b&gt;</code> <code>&lt;i&gt;</code> <code>&lt;code&gt;</code> <code>&lt;a href="…"&gt;</code></span></div>
            <div class="field hidden" id="cmd-media-wrap"><label class="field-label">Photo URL</label><input class="input" id="cmd-media" placeholder="https://…"><span class="field-hint">Direct link to an image.</span></div>
            <div class="switch-row"><div><div class="sw-label">Inline keyboard</div><div class="sw-sub">Buttons under the message.</div></div><button class="switch" id="cmd-inline-toggle" onclick="toggleCmdSection('inline')"></button></div>
            <div id="cmd-inline-section" class="hidden" style="margin-bottom:16px;">
                <div class="row nowrap" style="margin-bottom:8px;">
                    <input class="input" id="kbCmd-inline-label" placeholder="Label" style="flex:1.2;">
                    <select class="input" id="kbCmd-inline-type" onchange="kbInlineTypeToggle('kbCmd')" style="width:auto;">
                        <option value="command">Command</option><option value="callback">Callback</option><option value="url">URL</option>
                    </select>
                    <select class="input" id="kbCmd-inline-cmd" style="flex:1;"><option value="">Select…</option></select>
                    <input class="input hidden" id="kbCmd-inline-value" placeholder="Value / URL" style="flex:1;">
                    <button class="btn btn-primary btn-sm" onclick="kbCmd.inlineAdd()"><i class="fa-solid fa-plus"></i></button>
                </div>
                <div id="kbCmd-inline-list"></div>
            </div>
            <div class="switch-row"><div><div class="sw-label">Reply keyboard</div><div class="sw-sub">Persistent buttons below the input box.</div></div><button class="switch" id="cmd-reply-toggle" onclick="toggleCmdSection('reply')"></button></div>
            <div id="cmd-reply-section" class="hidden" style="margin-bottom:16px;">
                <div class="row nowrap" style="margin-bottom:8px;">
                    <input class="input" id="kbCmd-reply-label" placeholder="Button text" style="flex:1.2;">
                    <select class="input" id="kbCmd-reply-cmd" style="flex:1;"><option value="">Run command…</option></select>
                    <input class="input" id="kbCmd-reply-value" placeholder="Or /custom" style="flex:1;">
                    <button class="btn btn-primary btn-sm" onclick="kbCmd.replyAdd()"><i class="fa-solid fa-plus"></i></button>
                </div>
                <div id="kbCmd-reply-list"></div>
                <div id="kbCmd-reply-preview" class="kb-preview"></div>
                <div class="row" style="margin-top:8px;font-size:13px;color:var(--text-3);">
                    <label class="check"><input type="checkbox" id="kbCmd-reply-resize" checked> Resize</label>
                    <label class="check"><input type="checkbox" id="kbCmd-reply-onetime"> One-time</label>
                    <label class="check"><input type="checkbox" id="kbCmd-reply-persistent" checked> Persistent</label>
                    <input class="input" id="kbCmd-reply-placeholder" placeholder="Input placeholder" style="flex:1;min-width:140px;" oninput="kbSettingChanged('kbCmd')">
                </div>
            </div>
            <div class="switch-row"><div><div class="sw-label">Admin only</div><div class="sw-sub">Only promoted users can run it.</div></div><button class="switch" id="cmd-admin" onclick="toggleSwitch('cmd-admin')"></button></div>
            <div class="switch-row" style="margin-bottom:0;"><div><div class="sw-label">Enabled</div><div class="sw-sub">Disabled commands are hidden.</div></div><button class="switch on" id="cmd-enabled" onclick="toggleSwitch('cmd-enabled')"></button></div>
            <div class="err-box" id="cmd-error"></div>
        </div>
    </div>
</div>

<div class="modal hidden" id="msg-modal" role="dialog" aria-modal="true" aria-labelledby="msg-title">
    <div class="modal-bg" onclick="closeMsgEditor()"></div>
    <div class="sheet">
        <div class="sheet-head">
            <button class="btn btn-plain" onclick="closeMsgEditor()">Cancel</button>
            <div class="sheet-title" id="msg-title">Edit message</div>
            <button class="btn btn-plain" id="msg-save" onclick="saveMsgEditor()">Save</button>
        </div>
        <div class="sheet-body">
            <div class="field"><label class="field-label">Photo URL <span class="muted small">(optional)</span></label><input class="input" id="msg-photo" placeholder="https://…"><span class="field-hint">Leave empty for a text message.</span></div>
            <div class="field"><label class="field-label">Text / caption</label><textarea class="textarea" id="msg-text" rows="4" placeholder="Write the message…"></textarea></div>
            <div class="switch-row"><div><div class="sw-label">Attach buttons</div><div class="sw-sub">Inline and/or reply keyboard.</div></div><button class="switch" id="msg-kb-toggle" onclick="toggleMsgSection('kb')"></button></div>
            <div id="msg-kb-section" class="hidden">
                <div class="switch-row"><div><div class="sw-label">Inline keyboard</div><div class="sw-sub">Buttons under the message.</div></div><button class="switch" id="msg-inline-toggle" onclick="toggleMsgSection('inline')"></button></div>
                <div id="msg-inline-section" class="hidden" style="margin-bottom:16px;">
                    <div class="row nowrap" style="margin-bottom:8px;">
                        <input class="input" id="kbMe-inline-label" placeholder="Label" style="flex:1.2;">
                        <select class="input" id="kbMe-inline-type" onchange="kbInlineTypeToggle('kbMe')" style="width:auto;">
                            <option value="command">Command</option><option value="callback">Callback</option><option value="url">URL</option>
                        </select>
                        <select class="input" id="kbMe-inline-cmd" style="flex:1;"><option value="">Select…</option></select>
                        <input class="input hidden" id="kbMe-inline-value" placeholder="Value / URL" style="flex:1;">
                        <button class="btn btn-primary btn-sm" onclick="kbMe.inlineAdd()"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div id="kbMe-inline-list"></div>
                </div>
                <div class="switch-row"><div><div class="sw-label">Reply keyboard</div><div class="sw-sub">Persistent buttons below the input box.</div></div><button class="switch" id="msg-reply-toggle" onclick="toggleMsgSection('reply')"></button></div>
                <div id="msg-reply-section" class="hidden">
                    <div class="row nowrap" style="margin-bottom:8px;">
                        <input class="input" id="kbMe-reply-label" placeholder="Button text" style="flex:1.2;">
                        <select class="input" id="kbMe-reply-cmd" style="flex:1;"><option value="">Run command…</option></select>
                        <input class="input" id="kbMe-reply-value" placeholder="Or /custom" style="flex:1;">
                        <button class="btn btn-primary btn-sm" onclick="kbMe.replyAdd()"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div id="kbMe-reply-list"></div>
                    <div id="kbMe-reply-preview" class="kb-preview"></div>
                    <div class="row" style="margin-top:8px;font-size:13px;color:var(--text-3);">
                        <label class="check"><input type="checkbox" id="kbMe-reply-resize" checked> Resize</label>
                        <label class="check"><input type="checkbox" id="kbMe-reply-onetime"> One-time</label>
                        <label class="check"><input type="checkbox" id="kbMe-reply-persistent" checked> Persistent</label>
                        <input class="input" id="kbMe-reply-placeholder" placeholder="Input placeholder" style="flex:1;min-width:140px;" oninput="kbSettingChanged('kbMe')">
                    </div>
                </div>
            </div>
            <div class="err-box" id="msg-error"></div>
        </div>
    </div>
</div>

<div class="modal hidden" id="featured-modal" role="dialog" aria-modal="true" aria-labelledby="featured-modal-title">
    <div class="modal-bg" onclick="closeFeaturedModal()"></div>
    <div class="sheet">
        <div class="sheet-head">
            <button class="btn btn-plain" onclick="closeFeaturedModal()">Cancel</button>
            <div class="sheet-title" id="featured-modal-title">Featured command</div>
            <button class="btn btn-plain" id="featured-save" onclick="saveFeatured()">Save</button>
        </div>
        <div class="sheet-body">
            <div class="field">
                <label class="field-label">Command</label>
                <input class="input" id="featured-command" placeholder="/contact" style="font-family:var(--mono);">
                <span class="field-hint">The trigger. Include the leading slash.</span>
            </div>
            <div class="field">
                <label class="field-label">Usage hint</label>
                <textarea class="textarea" id="featured-hint" rows="2" placeholder="Shown when the command is sent alone, with no arguments."></textarea>
                <span class="field-hint" id="featured-hint-desc"></span>
            </div>
            <div class="field">
                <label class="field-label">Success message</label>
                <textarea class="textarea" id="featured-success" rows="2" placeholder="Shown after the action completes successfully."></textarea>
                <span class="field-hint">Leave empty to stay silent on success.</span>
            </div>
            <div class="field">
                <label class="field-label">Failure message</label>
                <textarea class="textarea" id="featured-failure" rows="2" placeholder="Shown if the action fails."></textarea>
                <span class="field-hint">Leave empty to stay silent on failure.</span>
            </div>
            <div class="switch-row">
                <div><div class="sw-label">Admin only</div><div class="sw-sub">Only users with the admin role can run this command.</div></div>
                <button class="switch" id="featured-admin" onclick="toggleSwitch('featured-admin')"></button>
            </div>
            <div class="switch-row" style="margin-bottom:0;">
                <div><div class="sw-label">Enabled</div><div class="sw-sub">Disabled entries stay here but the bot won't respond to them.</div></div>
                <button class="switch on" id="featured-enabled" onclick="toggleSwitch('featured-enabled')"></button>
            </div>
            <div class="err-box" id="featured-error"></div>
        </div>
    </div>
</div>

<div class="modal hidden" id="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
    <div class="modal-bg" onclick="closeConfirm(false)"></div>
    <div class="sheet small">
        <div class="sheet-head"><div class="sheet-title" id="confirm-title">Are you sure?</div></div>
        <div class="sheet-body"><p id="confirm-text" class="muted"></p><div id="confirm-extra"></div></div>
        <div class="sheet-foot">
            <button class="btn btn-gray" onclick="closeConfirm(false)">Cancel</button>
            <button class="btn btn-danger" id="confirm-ok" onclick="closeConfirm(true)">Confirm</button>
        </div>
    </div>
</div>

<div class="modal hidden" id="backup-modal" role="dialog" aria-modal="true">
    <div class="modal-bg" onclick="closeCustomBackup()"></div>
    <div class="sheet">
        <div class="sheet-head">
            <button class="btn btn-plain" onclick="closeCustomBackup()">Cancel</button>
            <div class="sheet-title">Custom backup</div>
            <button class="btn btn-plain" onclick="runCustomBackup()">Export</button>
        </div>
        <div class="sheet-body">
            <p class="muted small">Choose which sections to include. Unchecked sections are omitted from the file.</p>
            <div id="custom-backup-list"></div>
        </div>
    </div>
</div>

<div class="modal hidden" id="about-modal" role="dialog" aria-modal="true">
    <div class="modal-bg" onclick="document.getElementById('about-modal').classList.add('hidden')"></div>
    <div class="sheet small">
        <div class="sheet-head"><div class="sheet-title">About Nyxx</div></div>
        <div class="sheet-body">
            <p><strong>Nyxx</strong> — a full-featured Telegram bot builder for Cloudflare Workers.</p>
            <p class="muted small">Built with care by <a href="https://github.com/Mahan07dev" target="_blank" rel="noopener">@Mahan07dev</a></p>
            <p class="muted small">Version ${VERSION}</p>
            <a class="btn btn-gray btn-block" href="https://github.com/Mahan07dev/Nyxx" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Source code</a>
        </div>
        <div class="sheet-foot"><button class="btn btn-primary" onclick="document.getElementById('about-modal').classList.add('hidden')">Done</button></div>
    </div>
</div>

<div class="modal hidden" id="token-modal" role="dialog" aria-modal="true">
    <div class="modal-bg" onclick="document.getElementById('token-modal').classList.add('hidden')"></div>
    <div class="sheet small">
        <div class="sheet-head"><div class="sheet-title">Change bot token</div></div>
        <div class="sheet-body">
            <div class="field"><label class="field-label">New token</label><input class="input" id="token-input" placeholder="From @BotFather"></div>
            <div id="token-result" class="small"></div>
        </div>
        <div class="sheet-foot">
            <button class="btn btn-gray" onclick="document.getElementById('token-modal').classList.add('hidden')">Cancel</button>
            <button class="btn btn-primary" onclick="saveToken()">Save</button>
        </div>
    </div>
</div>

<div class="toasts" id="toasts"></div>

<script>
/* ============================================================
   HELPERS
   ============================================================ */
var KEEP_SENTINEL = '__NYXX_KEEP__';
function $(id) { return document.getElementById(id); }
function esc(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function show(el, yes) { if (el) el.classList.toggle('hidden', !yes); }
function togglePw(inputId, btn) {
    var el = $(inputId); if (!el) return;
    var isPw = el.type === 'password';
    el.type = isPw ? 'text' : 'password';
    if (btn) btn.innerHTML = isPw ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
}
function updatePwStrength() {
    var el = $('setup-password'), out = $('pw-strength'); if (!el || !out) return;
    var v = el.value, s = 0;
    if (v.length >= 6) s++;
    if (v.length >= 10) s++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    var label = s <= 1 ? 'Weak' : (s <= 3 ? 'Okay' : 'Strong');
    var color = s <= 1 ? 'var(--red)' : (s <= 3 ? 'var(--orange)' : 'var(--green)');
    out.innerHTML = v ? '<span style="color:' + color + '">' + label + '</span>' : '';
}

var activeToasts = [];
function toast(msg, type) {
    var host = $('toasts'); if (!host) return;
    while (activeToasts.length >= 3) {
        var old = activeToasts.shift();
        try { old.remove(); } catch (e) {}
    }
    var t = document.createElement('div');
    t.className = 'toast ' + (type || 'success');
    var body = document.createElement('div'); body.className = 'toast-body'; body.textContent = msg;
    var x = document.createElement('button'); x.className = 'toast-close'; x.innerHTML = '×'; x.setAttribute('aria-label', 'Dismiss');
    x.onclick = function () { dismissToast(t); };
    t.appendChild(body); t.appendChild(x);
    host.appendChild(t);
    activeToasts.push(t);
    setTimeout(function () { dismissToast(t); }, 4000);
}
function dismissToast(t) {
    var idx = activeToasts.indexOf(t);
    if (idx >= 0) activeToasts.splice(idx, 1);
    if (t && t.parentNode) {
        t.style.opacity = '0'; t.style.transition = 'opacity .25s';
        setTimeout(function () { try { t.remove(); } catch (e) {} }, 260);
    }
}

var PUBLIC_ENDPOINTS = ['/api/status', '/api/setup', '/api/login', '/api/check_session', '/api/version'];
function isPublicEndpoint(path) {
    for (var i = 0; i < PUBLIC_ENDPOINTS.length; i++) if (path === PUBLIC_ENDPOINTS[i]) return true;
    return false;
}

async function api(method, path, body) {
    var opts = { method: method, headers: {} };
    if (body !== undefined) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
    var ctrl = null;
    var timer = null;
    try {
        if (typeof AbortController !== 'undefined') {
            ctrl = new AbortController();
            opts.signal = ctrl.signal;
            timer = setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 30000);
        }
    } catch (e) {}
    var res;
    try {
        res = await fetch(path, opts);
    } catch (err) {
        if (timer) clearTimeout(timer);
        if (err && err.name === 'AbortError') throw new Error('Request timed out. Please try again.');
        throw new Error(err && err.message ? err.message : 'Network error. Please try again.');
    }
    if (timer) clearTimeout(timer);

    var data = null;
    try { data = await res.json(); } catch (e) { data = null; }

    if (res.status === 401 && !isPublicEndpoint(path)) {
        // Only treat 401 as session expiry if the server didn't supply a specific error
        var isSessionIssue = !(data && (data.valid === false || data.success === false));
        if (isSessionIssue) {
            showStep('step-login');
            toast('Session expired. Please sign in again.', 'info');
            throw new Error('__SESSION_EXPIRED__');
        }
    }
    if (!res.ok) {
        var msg = (data && data.error) || ('Request failed (' + res.status + ')');
        throw new Error(msg);
    }
    return data;
}
function busy(btn, on) { if (btn) btn.classList.toggle('loading', !!on); }
async function withBusy(btn, fn) { busy(btn, true); try { return await fn(); } finally { busy(btn, false); } }
function toggleSwitch(id, force) {
    var el = $(id); if (!el) return false;
    var on = typeof force === 'boolean' ? force : !el.classList.contains('on');
    el.classList.toggle('on', on); return on;
}
function sw(id) { var el = $(id); return !!(el && el.classList.contains('on')); }
function setSeg(containerId, value) {
    var c = $(containerId); if (!c) return;
    c.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b.dataset.v === value); });
}
function getSeg(containerId) {
    var c = $(containerId); if (!c) return null;
    var a = c.querySelector('button.active'); return a ? a.dataset.v : null;
}
function fmtTime(ts) { return ts ? String(ts).replace('T', ' ').slice(0, 16) : '—'; }
function scrollBottom(el) { if (el) requestAnimationFrame(function () { el.scrollTop = el.scrollHeight; }); }
function sameId(a, b) { return String(a) === String(b); }

function emptyState(icon, msg, hint, isErr) {
    return '<div class="empty' + (isErr ? ' err' : '') + '"><i class="' + icon + '"></i>' + esc(msg) + (hint ? '<div class="empty-hint">' + esc(hint) + '</div>' : '') + '</div>';
}
function errorState(msg, retryFn) {
    var html = '<div class="empty err"><i class="fa-solid fa-triangle-exclamation"></i>' + esc(msg || 'Something went wrong.');
    if (retryFn) html += '<div style="margin-top:14px;"><button class="btn btn-gray btn-sm" onclick="' + retryFn + '"><i class="fa-solid fa-rotate"></i> Retry</button></div>';
    return html + '</div>';
}
function skeletonRows(n) {
    var s = '<div class="list">';
    for (var i = 0; i < (n || 3); i++) s += '<div class="skl-row"><div class="skl skl-avatar"></div><div style="flex:1"><div class="skl skl-line w60"></div><div class="skl skl-line w40"></div></div></div>';
    return s + '</div>';
}

var openModals = [];
function trackModal(id) {
    var el = $(id); if (!el) return;
    openModals.push(id);
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
        var first = el.querySelector('input, textarea, select, button');
        if (first) try { first.focus(); } catch (e) {}
    }, 60);
}
function untrackModal(id) {
    var idx = openModals.indexOf(id);
    if (idx >= 0) openModals.splice(idx, 1);
    if (!openModals.length) document.body.style.overflow = '';
}

/* ===== Dropdown (mobile action menus) ===== */
function toggleDropdown(btn) {
    var dd = btn.closest('.dropdown'); if (!dd) return;
    var menu = dd.querySelector('.dropdown-menu'); if (!menu) return;
    var isOpen = !menu.classList.contains('hidden');
    closeAllDropdowns();
    if (!isOpen) menu.classList.remove('hidden');
}
function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(function (m) { m.classList.add('hidden'); });
}
document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) { closeAllDropdowns(); return; }
    if (e.target.closest('.dropdown-menu button')) setTimeout(closeAllDropdowns, 0);
});

/* ============================================================
   CONFIRM
   ============================================================ */
var confirmResolve = null;
function confirmDialog(text, title, danger, extraHtml) {
    $('confirm-title').textContent = title || 'Are you sure?';
    $('confirm-text').textContent = text;
    $('confirm-extra').innerHTML = extraHtml || '';
    $('confirm-ok').className = 'btn ' + (danger === false ? 'btn-primary' : 'btn-danger');
    $('confirm-modal').classList.remove('hidden');
    trackModal('confirm-modal');
    return new Promise(function (resolve) { confirmResolve = resolve; });
}
function closeConfirm(v) {
    $('confirm-modal').classList.add('hidden');
    untrackModal('confirm-modal');
    if (confirmResolve) { confirmResolve(v); confirmResolve = null; }
}

/* ============================================================
   THEME / NAV
   ============================================================ */
function applyTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    try { localStorage.setItem('nyxx-theme', mode); } catch (e) {}
}
function cycleTheme() {
    var cur = document.documentElement.getAttribute('data-theme') || 'auto';
    var next = cur === 'auto' ? 'light' : (cur === 'light' ? 'dark' : 'auto');
    applyTheme(next); toast('Appearance: ' + next, 'info');
}
(function initTheme() {
    var saved = 'auto';
    try { saved = localStorage.getItem('nyxx-theme') || 'auto'; } catch (e) {}
    applyTheme(saved);
})();

var PAGE_TITLES = {
    overview: 'Overview', commands: 'Commands', menu: 'Menu & Featured', users: 'Users',
    'user-manage': 'User', groups: 'Groups', 'group-manage': 'Group',
    broadcast: 'Broadcast', memory: 'Memory', ai: 'AI', settings: 'Settings', botinfo: 'Bot Info',
    cron: 'Cleanup', backup: 'Backup', logs: 'Activity Log', update: 'Update',
    permissions: 'Admin & Permissions'
};
var currentPage = 'overview';
function go(page) {
    currentPage = page;
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
    var el = $('page-' + page); if (el) el.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.toggle('active', n.dataset.page === page); });
    $('page-title').textContent = PAGE_TITLES[page] || 'Nyxx';
    if (window.innerWidth <= 900) toggleSidebar(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (page === 'overview') loadOverview();
    if (page === 'commands') loadCommands();
    if (page === 'menu') { loadMenu(); loadFeatured(); }
    if (page === 'users') loadUsers();
    if (page === 'groups') loadGroups();
    if (page === 'broadcast') loadBroadcast();
    if (page === 'memory') loadMemory();
    if (page === 'ai') { loadAi(); refreshMemoryCount(); }
    if (page === 'settings') loadSettings();
    if (page === 'botinfo') loadBotInfo();
    if (page === 'cron') loadCron();
    if (page === 'logs') { loadLogs(); loadLogClean(); }
    if (page === 'update') loadUpdateTab();
    if (page === 'permissions') loadPermissions();
}
function toggleSidebar(force) {
    var app = document.querySelector('.app'); if (!app) return;
    var open = typeof force === 'boolean' ? force : !app.classList.contains('sidebar-open');
    app.classList.toggle('sidebar-open', open);
    var overlay = document.getElementById('sidebar-overlay');
    if (overlay) overlay.classList.toggle('show', open);
}
function showInfo() { $('about-modal').classList.remove('hidden'); trackModal('about-modal'); }
function showStep(id) {
    ['step-status', 'step-setup', 'step-login', 'step-dashboard'].forEach(function (s) {
        var el = $(s); if (el) el.classList.toggle('hidden', s !== id);
    });
}

/* ============================================================
   AUTH STATE MACHINE
   ============================================================ */
function showAuthStatus(kind, title, msg, actions, help) {
    showStep('step-status');
    var icon = $('status-icon');
    if (icon) {
        icon.className = 'auth-icon ' + kind;
        var inner = {
            loading: '<i class="fa-solid fa-circle-notch fa-spin"></i>',
            success: '<i class="fa-solid fa-circle-check"></i>',
            warn: '<i class="fa-solid fa-triangle-exclamation"></i>',
            error: '<i class="fa-solid fa-circle-xmark"></i>'
        }[kind] || '<i class="fa-solid fa-circle-notch fa-spin"></i>';
        icon.innerHTML = inner;
    }
    var t = $('status-title'); if (t) t.textContent = title;
    var m = $('status-message'); if (m) m.textContent = msg;
    var a = $('status-actions'); if (a) a.innerHTML = actions || '';
    var h = $('status-help'); if (h) h.innerHTML = help || '';
}

function updateStatusPills(data) {
    var d1 = $('pill-d1'), bot = $('pill-bot');
    if (d1) {
        d1.className = 'pill clickable ' + (data.d1_bound ? 'ok' : 'err');
        var t1 = d1.querySelector('.txt');
        if (t1) t1.textContent = data.d1_bound ? 'D1' : 'D1 missing';
        d1.title = data.d1_bound ? 'Database connected — tap to recheck' : 'Database missing — tap to recheck';
    }
    if (bot) {
        bot.className = 'pill clickable ' + (data.tg_configured ? 'bot' : 'err');
        var t2 = bot.querySelector('.txt');
        if (t2) t2.textContent = data.tg_configured ? (data.bot_username ? '@' + data.bot_username : 'Bot') : 'No bot';
        bot.title = data.tg_configured ? ('Bot connected' + (data.bot_username ? ' (@' + data.bot_username + ')' : '') + ' — tap to recheck') : 'No bot token — tap to recheck';
    }
}

async function refreshStatusPill() {
    try {
        var data = await api('GET', '/api/status');
        updateStatusPills(data);
        toast('Status refreshed.', 'info');
    } catch (e) { toast('Could not refresh status.', 'error'); }
}

async function tryFetchStatus() { return await api('GET', '/api/status'); }

/* ============================================================
   MCP TAB
   ============================================================ */
var mcpSettings = {};

async function loadMcp(force) {
    try {
        var d = await api('GET', '/api/mcp/settings');
        mcpSettings = (d && d.settings) || {};
        renderMcp();
        loadMcpTokens();
        loadMcpCalls();
    } catch (e) { toast(e.message, 'error'); }
}

function renderMcp() {
    var s = mcpSettings;
    toggleSwitch('mcp-enabled', s.mcp_enabled === '1');
    // Endpoint
    var ep = window.location.origin + '/mcp';
    if ($('mcp-endpoint')) $('mcp-endpoint').value = ep;
    // AI provider
    $('mcp-provider').value = s.mcp_ai_provider || 'openai';
    $('mcp-api-key').value = '';
    $('mcp-api-key').placeholder = s.mcp_ai_api_key_set ? (s.mcp_ai_api_key_masked + '  (unchanged — type to replace)') : 'sk-…';
    $('mcp-model').value = s.mcp_ai_model || '';
    $('mcp-base').value = s.mcp_ai_base_url || '';
    onMcpProviderChange();
    if (s.mcp_ai_api_key_set) $('mcp-key-hint').innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--green)"></i> Key saved. Leave empty to keep it.';
    // Categories
    var cats = Array.isArray(s.mcp_categories) ? s.mcp_categories : ['read', 'write'];
    toggleSwitch('mcp-cat-read', cats.indexOf('read') >= 0);
    toggleSwitch('mcp-cat-write', cats.indexOf('write') >= 0);
    toggleSwitch('mcp-cat-outbound', cats.indexOf('outbound') >= 0);
    toggleSwitch('mcp-cat-dangerous', cats.indexOf('dangerous') >= 0);
    // Memory & rate limits
    const memOn = (parseInt(s.mcp_memory_limit) || 0) > 0;
    toggleSwitch('mcp-memory-enabled', memOn);
    show($('mcp-memory-settings'), memOn);
    if ($('mcp-memory-limit')) $('mcp-memory-limit').value = String(parseInt(s.mcp_memory_limit) || 10);
    if ($('mcp-memory-ttl')) $('mcp-memory-ttl').value = String(parseInt(s.mcp_memory_ttl_hours) || 24);
    if ($('mcp-rate-limit')) $('mcp-rate-limit').value = String(parseInt(s.mcp_rate_limit) || 20);
    if ($('mcp-rate-window')) $('mcp-rate-window').value = s.mcp_rate_limit_window === 'hour' ? 'hour' : 'minute';
    loadMcpSessionsList();
    // Snippets
    renderMcpSnippets();
}

function toggleMcpMemory() {
    const on = toggleSwitch('mcp-memory-enabled');
    show($('mcp-memory-settings'), on);
}

async function saveMcpMemorySettings() {
    try {
        await api('POST', '/api/mcp/settings', {
            mcp_memory_limit: sw('mcp-memory-enabled') ? (parseInt($('mcp-memory-limit').value) || 0) : 0,
            mcp_memory_ttl_hours: parseInt($('mcp-memory-ttl').value) || 24,
            mcp_rate_limit: parseInt($('mcp-rate-limit').value) || 20,
            mcp_rate_limit_window: $('mcp-rate-window').value || 'minute',
        });
        toast('MCP memory & rate limits saved.');
        loadMcp(true);
    } catch (e) { toast(e.message, 'error'); }
}

async function loadMcpSessionsList() {
    const box = $('mcp-sessions-list');
    if (!box) return;
    try {
        const d = await api('GET', '/api/mcp/sessions');
        const sessions = d.sessions || [];
        if (!sessions.length) { box.innerHTML = '<span class="muted">No active sessions.</span>'; return; }
        box.innerHTML = '<div class="muted">Active sessions: ' + sessions.length + '</div>' +
            sessions.slice(0, 10).map(s => '<div class="muted tiny">' + esc(s.session_key) + ' · ' + fmtTime(s.updated_at) + ' · ' + (s.size_bytes || 0) + ' bytes</div>').join('');
    } catch (e) { box.innerHTML = ''; }
}

async function clearAllMcpSessions() {
    const ok = await confirmDialog('Clear every MCP session? Follow-up context is lost.', 'Clear sessions');
    if (!ok) return;
    try {
        await api('POST', '/api/mcp/sessions/clear');
        toast('Sessions cleared.');
        loadMcpSessionsList();
    } catch (e) { toast(e.message, 'error'); }
}

function renderMcpSnippets() {
    var endpoint = window.location.origin + '/mcp';
    var tok = 'nyxx_YOUR_TOKEN_HERE';
    if ($('mcp-snippet-claude')) $('mcp-snippet-claude').textContent =
        '{\\n  "mcpServers": {\\n    "nyxx": {\\n      "command": "npx",\\n      "args": ["-y", "mcp-remote", "' + endpoint + '",\\n               "--header", "Authorization: Bearer ' + tok + '"]\\n    }\\n  }\\n}';
    if ($('mcp-snippet-cursor')) $('mcp-snippet-cursor').textContent =
        '{\\n  "mcpServers": {\\n    "nyxx": {\\n      "url": "' + endpoint + '",\\n      "headers": { "Authorization": "Bearer ' + tok + '" }\\n    }\\n  }\\n}';
    if ($('mcp-snippet-curl')) $('mcp-snippet-curl').textContent =
        'curl -X POST ' + endpoint + ' \\\\n  -H "Authorization: Bearer ' + tok + '" \\\\n  -H "Content-Type: application/json" \\\\n  -d \\'{"jsonrpc":"2.0","id":1,"method":"tools/list"}\\'';
}

function onMcpProviderChange() {
    var p = $('mcp-provider').value;
    show($('mcp-base-wrap'), p === 'custom');
    var defaults = { openai: 'gpt-4o-mini', gemini: 'gemini-2.0-flash', deepseek: 'deepseek-chat', groq: 'llama-3.3-70b-versatile', openrouter: 'openai/gpt-4o-mini' };
    if (defaults[p] && !$('mcp-model').value) $('mcp-model').value = defaults[p];
}

async function toggleMcpEnabled() {
    var on = !sw('mcp-enabled');
    toggleSwitch('mcp-enabled', on);
    try { await api('POST', '/api/mcp/settings', { mcp_enabled: on ? '1' : '0' }); toast(on ? 'MCP enabled.' : 'MCP disabled.'); }
    catch (e) { toast(e.message, 'error'); toggleSwitch('mcp-enabled', !on); }
}

async function toggleMcpCategory(cat) {
    var id = 'mcp-cat-' + cat;
    var on = !sw(id);
    toggleSwitch(id, on);
    var cats = [];
    if (sw('mcp-cat-read')) cats.push('read');
    if (sw('mcp-cat-write')) cats.push('write');
    if (sw('mcp-cat-outbound')) cats.push('outbound');
    if (sw('mcp-cat-dangerous')) cats.push('dangerous');
    try { await api('POST', '/api/mcp/settings', { mcp_categories: cats }); }
    catch (e) { toast(e.message, 'error'); }
}

async function saveMcpAiSettings() {
    var body = {
        mcp_ai_provider: $('mcp-provider').value,
        mcp_ai_model: $('mcp-model').value.trim(),
        mcp_ai_base_url: $('mcp-base').value.trim(),
    };
    var key = $('mcp-api-key').value.trim();
    if (key) body.mcp_ai_api_key = key;
    try { await api('POST', '/api/mcp/settings', body); toast('MCP AI provider saved.'); loadMcp(); }
    catch (e) { toast(e.message, 'error'); }
}

async function testMcpAi() {
    $('mcp-test-result').innerHTML = '<span class="mini-spinner"></span> Testing…';
    try {
        var body = {
            settings: {
                mcp_ai_provider: $('mcp-provider').value,
                mcp_ai_model: $('mcp-model').value.trim(),
                mcp_ai_base_url: $('mcp-base').value.trim(),
                mcp_ai_api_key: $('mcp-api-key').value.trim() || KEEP_SENTINEL,
            }
        };
        var d = await api('POST', '/api/mcp/ai/test', body);
        if (d.success) $('mcp-test-result').innerHTML = '<span style="color:var(--green)"><i class="fa-solid fa-circle-check"></i> Connected — reply: <code>' + esc(d.message || '') + '</code></span>';
        else $('mcp-test-result').innerHTML = '<span style="color:var(--red)"><i class="fa-solid fa-circle-xmark"></i> ' + esc(d.error || 'Failed') + '</span>';
    } catch (e) { $('mcp-test-result').innerHTML = '<span style="color:var(--red)">' + esc(e.message) + '</span>'; }
}

async function loadMcpTokens() {
    try {
        var d = await api('GET', '/api/mcp/tokens');
        var list = d.tokens || [];
        var box = $('mcp-tokens-list');
        if (!list.length) { box.innerHTML = '<div class="muted small">No tokens yet.</div>'; return; }
        box.innerHTML = list.map(function (t) {
            return '<div class="list-row" style="border-radius:10px;border:1px solid var(--hairline);margin-bottom:6px;padding:8px 12px;">' +
                '<i class="fa-solid fa-key" style="color:var(--text-3);"></i>' +
                '<div class="lr-main"><div class="lr-title mono" style="font-size:13px;">' + esc(t.token_prefix) + '••••••••</div>' +
                '<div class="lr-sub">Created ' + fmtTime(t.created_at) + ' · Last used ' + (t.last_used_at ? fmtTime(t.last_used_at) : 'never') + '</div></div>' +
                '</div>';
        }).join('');
    } catch (e) { /* silent */ }
}

async function generateMcpToken() {
    try {
        var d = await api('POST', '/api/mcp/token/generate', { label: 'dashboard' });
        $('mcp-token-value').value = d.token;
        show($('mcp-token-once'), true);
        loadMcpTokens();
        toast('Token generated — copy it now.', 'info');
    } catch (e) { toast(e.message, 'error'); }
}

async function revokeMcpTokens() {
    var ok = await confirmDialog('Revoke ALL MCP tokens? Every connected client will be disconnected immediately.', 'Revoke tokens');
    if (!ok) return;
    try { await api('POST', '/api/mcp/token/revoke'); toast('All tokens revoked.'); show($('mcp-token-once'), false); loadMcpTokens(); }
    catch (e) { toast(e.message, 'error'); }
}

// Chat with Nyxx now lives at /chat (a dedicated route).

async function loadMcpCalls() {
    var box = $('mcp-calls-list');
    if (!box) return;
    box.innerHTML = '<div class="spinner-page"><span class="mini-spinner"></span></div>';
    try {
        var d = await api('GET', '/api/mcp/calls');
        var list = (d.calls || []).slice(0, 5);
        if (!list.length) {
            box.innerHTML = '<div class="muted small">No MCP calls yet.</div>';
            return;
        }
        box.innerHTML = '<div class="list">' + list.map(function (c) {
            return '<div class="list-row" style="padding:8px 12px;">' +
                '<div class="lr-main">' +
                    '<div class="lr-title mono" style="font-size:13px;">' + esc(c.action) + '</div>' +
                    '<div class="lr-sub">' + fmtTime(c.timestamp) + '</div>' +
                '</div>' +
            '</div>';
        }).join('') + '</div>' +
        '<div class="tiny muted" style="margin-top:8px;">Showing last 5 · full history in Activity Log</div>';
    } catch (e) {
        box.innerHTML = '<div class="small" style="color:var(--red)">Could not load recent calls: ' + esc(e.message) + '</div>';
    }
}

/* ============================================================
   FEATURED MODAL — MCP kind support
   ============================================================ */
// Patch openFeaturedModal to accept 'mcp' and toggle admin switch default.
var __origOpenFeaturedModal = openFeaturedModal;
openFeaturedModal = function (kind, item) {
    var isMcp = kind === 'mcp';
    __origOpenFeaturedModal(isMcp ? 'mcp' : kind, item);
    var title = $('featured-modal-title');
    if (isMcp) title.textContent = (item ? 'Edit' : 'New') + ' MCP command';
    var hintDesc = $('featured-hint-desc');
    if (isMcp && hintDesc) hintDesc.innerHTML = 'Shown when <code>/mcp</code> is sent alone. Example: <code>Send a message or instruction for the MCP agent.</code>';
    // Default admin_only ON for new MCP commands, off otherwise.
    toggleSwitch('featured-admin', item ? !!item.admin_only : isMcp);
};

// Patch saveFeatured to send kind + admin_only.
var __origSaveFeatured = saveFeatured;
saveFeatured = async function () {
    var err = $('featured-error'); err.classList.remove('show');
    var command = $('featured-command').value.trim();
    if (!command || command === '/') { err.textContent = 'Command is required.'; err.classList.add('show'); return; }
    var payload = {
        command: command,
        kind: featuredKind,
        content: $('featured-hint').value.trim(),
        success_text: $('featured-success').value.trim(),
        failure_text: $('featured-failure').value.trim(),
        admin_only: sw('featured-admin') ? 1 : 0,
        enabled: sw('featured-enabled') ? 1 : 0
    };
    var btn = $('featured-save');
    await withBusy(btn, async function () {
        try {
            if (featuredEditing) await api('PUT', '/api/featured/' + featuredEditing.id, payload);
            else await api('POST', '/api/featured', payload);
            closeFeaturedModal(); toast('Featured command saved.'); loadFeatured();
        } catch (e) { err.textContent = e.message; err.classList.add('show'); }
    });
};

// Patch renderFeatured to show MCP badge + admin badge.
var __origRenderFeatured = renderFeatured;
renderFeatured = function () {
    var box = $('featured-list');
    if (!featured.length) { box.innerHTML = emptyState('fa-solid fa-wand-magic-sparkles', 'No featured commands yet.', 'Create one to get started.'); return; }
    box.innerHTML = featured.map(function (f) {
        var kindLabel =
            f.kind === 'buttons' ? '<span class="badge purple">Buttons</span>' :
            f.kind === 'mcp' ? '<span class="badge orange">MCP</span>' :
            '<span class="badge blue">DM</span>';
        var adminBadge = f.admin_only ? '<span class="badge red"><i class="fa-solid fa-lock"></i> Admin</span>' : '';
        var blocks = '';
        if (f.content) blocks += '<div class="fr-block hint"><b>Hint:</b> ' + esc(f.content) + '</div>';
        if (f.success_text) blocks += '<div class="fr-block success"><b style="color:var(--green)">Success:</b> ' + esc(f.success_text) + '</div>';
        if (f.failure_text) blocks += '<div class="fr-block failure"><b style="color:var(--red)">Failure:</b> ' + esc(f.failure_text) + '</div>';
        return '<div class="featured-reply ' + (f.enabled ? '' : 'disabled') + '">' +
            '<div class="fr-head">' +
                '<span class="fr-cmd">' + esc(f.command) + '</span>' + kindLabel + adminBadge +
                '<div style="flex:1"></div>' +
                '<button class="switch ' + (f.enabled ? 'on' : '') + '" onclick="toggleFeatured(' + f.id + ')" title="Enable or disable" aria-label="Toggle"></button>' +
            '</div>' +
            blocks +
            '<div class="fr-actions">' +
                '<button class="btn btn-gray btn-sm" onclick="editFeatured(' + f.id + ')"><i class="fa-regular fa-pen-to-square"></i> Edit</button>' +
                '<button class="btn btn-danger btn-sm" onclick="deleteFeatured(' + f.id + ')"><i class="fa-regular fa-trash-can"></i> Delete</button>' +
            '</div></div>';
    }).join('');
};

// Patch editFeatured to accept mcp kind.
var __origEditFeatured = editFeatured;
editFeatured = async function (id) {
    var item = featured.find(function (f) { return f.id === id; });
    if (!item) return;
    var kind = item.kind === 'buttons' ? 'buttons' : (item.kind === 'mcp' ? 'mcp' : 'text');
    openFeaturedModal(kind, item);
    // Pre-fill admin switch from saved value.
    setTimeout(function () { toggleSwitch('featured-admin', !!item.admin_only); }, 0);
};

// Route to correct page when go('mcp') is called.
var __origGo = go;
go = function (page) {
    __origGo(page);
    if (page === 'mcp') loadMcp(true);
};

async function checkStatus() {
    showAuthStatus('loading', 'Connecting…', 'Checking your database connection.');
    var attempt = 0, lastErr = null;
    while (attempt < 3) {
        try {
            var data = await tryFetchStatus();
            updateStatusPills(data);
            if (!data.d1_bound) {
                showAuthStatus(
                    'error', 'Database not bound',
                    'The D1 database binding is missing. Re-run the installer or check your wrangler.toml.',
                    '<button class="btn btn-primary" onclick="checkStatus()"><i class="fa-solid fa-rotate"></i> Retry</button>'
                );
                return;
            }
            if (!data.admin_password_set) { showStep('step-setup'); return; }
            try {
                var s = await api('GET', '/api/check_session');
                if (s.logged_in) enterDashboard(); else showStep('step-login');
            } catch (e) { showStep('step-login'); }
            return;
        } catch (e) {
            lastErr = e; attempt++;
            if (attempt < 3) {
                showAuthStatus('loading', 'Connecting…', 'Retrying (' + attempt + '/3)…');
                await new Promise(function (r) { setTimeout(r, 600 * attempt); });
            }
        }
    }
    var isTimeout = lastErr && /timed out/i.test(lastErr.message);
    var isNetwork = lastErr && /network|failed to fetch/i.test(lastErr.message);
    var title = isTimeout ? 'Request timed out' : (isNetwork ? 'Cannot reach the server' : 'Could not load status');
    var msg = isTimeout
        ? 'The server is taking longer than expected to respond. This does not mean your setup is broken.'
        : (isNetwork
            ? 'The dashboard could not reach the Worker. Check your internet connection and reload.'
            : 'Something went wrong while checking the dashboard. This does not mean your setup is broken.');
    showAuthStatus(
        'warn', title, msg,
        '<button class="btn btn-primary" onclick="checkStatus()"><i class="fa-solid fa-rotate"></i> Retry</button>',
        'Setup and sign-in are only shown when the server confirms the database state.'
    );
}

function enterDashboard() {
    showStep('step-dashboard');
    go('overview');
    loadCommands(true);
    loadMenu(true);
    loadFeatured();
    loadSettings(true);
    autoCheckUpdate();
}
async function submitSetup() {
    var err = $('setup-error'); err.classList.remove('show');
    var pw = $('setup-password').value, pw2 = $('setup-password-confirm').value;
    if (pw.length < 6) { err.textContent = 'Password must be at least 6 characters.'; err.classList.add('show'); return; }
    if (pw !== pw2) { err.textContent = 'Passwords do not match.'; err.classList.add('show'); return; }
    var body = { adminPassword: pw };
    var tok = $('setup-bot-token').value.trim();
    if (tok && !$('setup-skip-bot').checked) body.botToken = tok;
    try {
        await api('POST', '/api/setup', body);
        toast('Setup complete — please sign in.');
        showStep('step-login');
    } catch (e) { err.textContent = e.message; err.classList.add('show'); }
}
async function submitLogin() {
    var err = $('login-error'); err.classList.remove('show');
    try {
        await api('POST', '/api/login', { password: $('login-password').value });
        enterDashboard();
    } catch (e) { err.textContent = e.message; err.classList.add('show'); }
}
async function logout() {
    try { await api('POST', '/api/logout'); } catch (e) {}
    showStep('step-login');
}

/* ============================================================
   OVERVIEW
   ============================================================ */
async function loadOverview(force) {
    var st = $('ov-stats');
    st.innerHTML = '<div class="stat skl" style="height:120px"></div>'.repeat(5);
    try {
        var s = await api('GET', '/api/stats');
        function card(cls, icon, val, lbl, extra) {
            return '<div class="stat"><div class="st-ic ' + cls + '"><i class="fa-solid ' + icon + '"></i></div>' +
                '<div class="st-val">' + val + '</div><div class="st-lbl">' + lbl + '</div>' +
                (extra ? '<div class="st-extra">' + extra + '</div>' : '') + '</div>';
        }
        st.innerHTML =
            card('blue', 'fa-terminal', s.commands_total, 'Commands', s.commands_enabled + ' enabled') +
            card('green', 'fa-user-group', s.users_total, 'Users', s.users_private + ' started bot') +
            card('purple', 'fa-comments', s.groups_total, 'Groups', s.groups_active + ' active') +
            card('orange', 'fa-brain', s.ai_memory_count, 'AI memory', s.ai_replies_24h + ' replies / 24h') +
            card(s.bot_linked ? 'green' : 'red', 'fa-robot', s.bot_linked ? 'Linked' : 'Offline', 'Bot', s.bot_username ? '@' + esc(s.bot_username) : '');
        var steps = [
            { done: s.bot_linked, label: 'Connect your bot token', page: 'settings' },
            { done: s.commands_total > 0, label: 'Create your first command', page: 'commands' },
            { done: !!s.ai_enabled, label: 'Turn on the AI assistant', page: 'ai' },
            { done: s.groups_total > 0, label: 'Add the bot to a group', page: 'groups' }
        ];
        $('ov-checklist').innerHTML = steps.map(function (x) {
            return '<li class="list-row" style="border-radius:12px;border:1px solid var(--hairline);margin-bottom:8px;">' +
                '<span class="badge ' + (x.done ? 'green' : '') + '"><i class="fa-solid ' + (x.done ? 'fa-check' : 'fa-circle') + '"></i></span>' +
                '<div class="lr-main"><div class="lr-title">' + esc(x.label) + '</div></div>' +
                (x.done ? '' : '<button class="btn btn-gray btn-sm" onclick="go(\\\'' + x.page + '\\\')">Open</button>') +
                '</li>';
        }).join('');
    } catch (e) {
        st.innerHTML = '<div style="grid-column:1/-1">' + errorState(e.message, 'loadOverview(true)') + '</div>';
    }
}

/* ============================================================
   COMMANDS
   ============================================================ */
var commands = [];
var children = {};
var crumbPath = [];
var currentParent = null;
var editingCmd = null;

async function loadCommands(force) {
    var box = $('cmd-list');
    if (!commands.length || force) {
        box.innerHTML = skeletonRows(3);
        try {
            var d = await api('GET', '/api/commands');
            commands = d.commands || [];
        } catch (e) { box.innerHTML = errorState(e.message, 'loadCommands(true)'); return; }
    }
    buildTree(); renderCommands(); kbCmd.populateCommands();
}
function buildTree() {
    children = {};
    commands.forEach(function (c) {
        var p = c.parent || '';
        if (!children[p]) children[p] = [];
        children[p].push(c);
    });
    Object.keys(children).forEach(function (k) { children[k].sort(function (a, b) { return (a.order_idx || 0) - (b.order_idx || 0); }); });
    if (currentParent && !commands.some(function (c) { return c.command === currentParent; })) { currentParent = null; crumbPath = []; }
}
function renderCommands() {
    var box = $('cmd-list');
    var q = ($('cmd-search').value || '').toLowerCase();
    var list = (children[currentParent || ''] || []).slice();
    if (q) list = list.filter(function (c) { return c.command.toLowerCase().indexOf(q) >= 0; });
    $('crumb').textContent = crumbPath.length ? crumbPath.join(' / ') : 'Root';
    $('btn-up').disabled = !currentParent;
    if (!list.length) { box.innerHTML = emptyState('fa-regular fa-folder-open', 'Nothing here yet.', 'Create your first command with the button above.'); return; }
    var html = '<div class="list">';
    list.forEach(function (c, i) {
        var kids = (children[c.command] || []).length;
        var cmdEsc = esc(c.command).replace(/'/g, "\\\\'");
        html += '<div class="list-row">' +
            '<i class="fa-regular ' + (kids ? 'fa-folder tag-folder' : 'fa-file') + '"></i>' +
            '<div class="lr-main" onclick="' + (kids ? 'enterFolder(\\'' + cmdEsc + '\\')' : 'editCommand(\\'' + cmdEsc + '\\')') + '" style="cursor:pointer;">' +
                '<div class="lr-title mono">' + esc(c.command) + '</div>' +
                '<div class="lr-sub">' + (c.response_type === 'photo' ? 'Photo' : 'Text') + (kids ? ' · ' + kids + ' sub-command' + (kids > 1 ? 's' : '') : '') + '</div>' +
            '</div>' +
            '<span class="badge ' + (c.enabled == 1 ? 'green' : 'red') + '">' + (c.enabled == 1 ? 'On' : 'Off') + '</span>' +
            (c.is_admin_only == 1 ? '<span class="badge purple">Admin</span>' : '') +
            '<div class="lr-actions">' +
                '<div class="lr-actions-desktop" style="display:flex;gap:4px;">' +
                    '<button class="icon-btn" onclick="moveCmd(' + i + ',-1)" ' + (i === 0 ? 'disabled' : '') + ' aria-label="Move up"><i class="fa-solid fa-arrow-up"></i></button>' +
                    '<button class="icon-btn" onclick="moveCmd(' + i + ',1)" ' + (i === list.length - 1 ? 'disabled' : '') + ' aria-label="Move down"><i class="fa-solid fa-arrow-down"></i></button>' +
                    '<button class="icon-btn" onclick="openCommandModal(null, \\'' + cmdEsc + '\\')" aria-label="Add sub-command"><i class="fa-solid fa-plus"></i></button>' +
                    '<button class="icon-btn" onclick="editCommand(\\'' + cmdEsc + '\\')" aria-label="Edit"><i class="fa-regular fa-pen-to-square"></i></button>' +
                    '<button class="icon-btn danger" onclick="deleteCommand(\\'' + cmdEsc + '\\')" aria-label="Delete"><i class="fa-regular fa-trash-can"></i></button>' +
                '</div>' +
                '<div class="lr-actions-mobile dropdown">' +
                    '<button class="icon-btn" onclick="toggleDropdown(this)" aria-label="More actions"><i class="fa-solid fa-ellipsis-vertical"></i></button>' +
                    '<div class="dropdown-menu hidden">' +
                        '<button onclick="moveCmd(' + i + ',-1)" ' + (i === 0 ? 'disabled' : '') + '><i class="fa-solid fa-arrow-up"></i> Move up</button>' +
                        '<button onclick="moveCmd(' + i + ',1)" ' + (i === list.length - 1 ? 'disabled' : '') + '><i class="fa-solid fa-arrow-down"></i> Move down</button>' +
                        '<button onclick="openCommandModal(null, \\'' + cmdEsc + '\\')"><i class="fa-solid fa-plus"></i> Add sub-command</button>' +
                        '<button onclick="editCommand(\\'' + cmdEsc + '\\')"><i class="fa-regular fa-pen-to-square"></i> Edit</button>' +
                        '<button class="danger" onclick="deleteCommand(\\'' + cmdEsc + '\\')"><i class="fa-regular fa-trash-can"></i> Delete</button>' +
                    '</div>' +
                '</div>' +
            '</div></div>';
    });
    box.innerHTML = html + '</div>';
}
function enterFolder(name) { currentParent = name; crumbPath.push(name); renderCommands(); }
function navigateUp() {
    if (!currentParent) return;
    crumbPath.pop();
    currentParent = crumbPath.length ? crumbPath[crumbPath.length - 1] : null;
    renderCommands();
}
async function moveCmd(index, dir) {
    var list = children[currentParent || ''] || [];
    var j = index + dir;
    if (j < 0 || j >= list.length) return;
    var order = list.map(function (c) { return c.command; });
    var tmp = order[index]; order[index] = order[j]; order[j] = tmp;
    try { await api('POST', '/api/commands/reorder', { order: order }); loadCommands(true); }
    catch (e) { toast(e.message, 'error'); }
}
function toggleMedia() { show($('cmd-media-wrap'), $('cmd-type').value === 'photo'); }
function toggleCmdSection(which) {
    var id = which === 'inline' ? 'cmd-inline-toggle' : 'cmd-reply-toggle';
    var sec = which === 'inline' ? 'cmd-inline-section' : 'cmd-reply-section';
    var on = toggleSwitch(id);
    show($(sec), on);
    if (on && which === 'reply') kbCmd.render();
}
async function openCommandModal(cmd, parent) {
    await loadCommands();
    editingCmd = cmd || null;
    var parentSel = $('cmd-parent');
    parentSel.innerHTML = '<option value="">None (root)</option>';
    commands.forEach(function (c) {
        if (editingCmd && (c.command === editingCmd.command)) return;
        var o = document.createElement('option'); o.value = c.command; o.textContent = c.command; parentSel.appendChild(o);
    });
    $('cmd-error').classList.remove('show');
    kbCmd.reset();
    toggleSwitch('cmd-inline-toggle', false);
    toggleSwitch('cmd-reply-toggle', false);
    show($('cmd-inline-section'), false); show($('cmd-reply-section'), false);
    if (editingCmd) {
        $('cmd-modal-title').textContent = 'Edit command';
        $('cmd-name').value = editingCmd.command;
        $('cmd-type').value = editingCmd.response_type || 'text';
        $('cmd-content').value = editingCmd.content || '';
        $('cmd-media').value = editingCmd.media_url || '';
        parentSel.value = editingCmd.parent || '';
        toggleSwitch('cmd-admin', !!editingCmd.is_admin_only);
        toggleSwitch('cmd-enabled', editingCmd.enabled != 0);
        if (editingCmd.buttons_json) { kbCmd.loadInline(editingCmd.buttons_json); toggleSwitch('cmd-inline-toggle', true); show($('cmd-inline-section'), true); }
        if (editingCmd.show_reply_keyboard) { kbCmd.loadReply(editingCmd.reply_keyboard_json); toggleSwitch('cmd-reply-toggle', true); show($('cmd-reply-section'), true); }
    } else {
        $('cmd-modal-title').textContent = 'New command';
        $('cmd-name').value = ''; $('cmd-type').value = 'text';
        $('cmd-content').value = ''; $('cmd-media').value = '';
        parentSel.value = parent || currentParent || '';
        toggleSwitch('cmd-admin', false); toggleSwitch('cmd-enabled', true);
    }
    toggleMedia();
    $('cmd-modal').classList.remove('hidden');
    trackModal('cmd-modal');
}
function closeCommandModal() { $('cmd-modal').classList.add('hidden'); untrackModal('cmd-modal'); }
function editCommand(name) {
    var c = commands.find(function (x) { return x.command === name; });
    if (c) openCommandModal(c, null);
}
async function saveCommand() {
    var err = $('cmd-error'); err.classList.remove('show');
    var payload = {
        command: $('cmd-name').value.trim(),
        parent: $('cmd-parent').value || null,
        response_type: $('cmd-type').value,
        content: $('cmd-content').value.trim(),
        media_url: $('cmd-media').value.trim(),
        is_admin_only: sw('cmd-admin') ? 1 : 0,
        enabled: sw('cmd-enabled') ? 1 : 0,
        buttons_json: kbCmd.inlineJSON() ? JSON.stringify(kbCmd.inlineJSON()) : '',
        show_reply_keyboard: sw('cmd-reply-toggle') ? 1 : 0,
        reply_keyboard_json: kbCmd.replyJSON() ? JSON.stringify(kbCmd.replyJSON()) : ''
    };
    if (!payload.command || !payload.content) { err.textContent = 'Command and content are required.'; err.classList.add('show'); return; }
    var btn = $('cmd-save');
    await withBusy(btn, async function () {
        try {
            if (editingCmd) await api('PUT', '/api/commands/' + encodeURIComponent(editingCmd.command), payload);
            else await api('POST', '/api/commands', payload);
            closeCommandModal(); toast('Command saved.');
            commands = []; loadCommands(true);
        } catch (e) { err.textContent = e.message; err.classList.add('show'); }
    });
}
async function deleteCommand(name) {
    var ok = await confirmDialog('Delete "' + name + '" and all sub-commands? This cannot be undone.', 'Delete command');
    if (!ok) return;
    try { await api('DELETE', '/api/commands/' + encodeURIComponent(name)); toast('Deleted.'); if (currentParent === name) navigateUp(); commands = []; loadCommands(true); }
    catch (e) { toast(e.message, 'error'); }
}
async function exportCommandPack() {
    try { var d = await api('GET', '/api/commands/export'); downloadJson('nyxx-commands-' + stamp() + '.json', d.data); }
    catch (e) { toast(e.message, 'error'); }
}
function importCommandPack(ev) {
    var f = ev.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = async function () {
        try {
            var parsed = JSON.parse(r.result);
            if (!parsed || parsed.app !== 'nyxx-command-pack') throw new Error('Not a command pack.');
            var merge = await confirmDialog('Import ' + parsed.commands.length + ' commands? Existing commands with the same name are overwritten.', 'Merge import', false);
            if (!merge) return;
            await api('POST', '/api/commands/import', { data: parsed, mode: 'merge' });
            toast('Commands imported.'); commands = []; loadCommands(true);
        } catch (e) { toast(e.message, 'error'); }
        ev.target.value = '';
    };
    r.readAsText(f);
}
function stamp() { return new Date().toISOString().slice(0, 10); }
function downloadJson(name, obj) {
    var a = document.createElement('a');
    a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj, null, 2));
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
}

/* ============================================================
   MENU + FEATURED
   ============================================================ */
var menuEntries = [];
async function loadMenu(force) {
    if (menuEntries.length && !force) { renderMenu(); return; }
    $('menu-rows').innerHTML = '<div class="skl skl-card"></div><div class="skl skl-card"></div>';
    try {
        var d = await api('GET', '/api/menu_commands');
        menuEntries = d.menu || [];
        if (!menuEntries.some(function (e) { return e.command === 'start'; })) menuEntries.unshift({ command: 'start', description: 'Start the bot' });
        renderMenu();
    } catch (e) { $('menu-rows').innerHTML = errorState(e.message, 'loadMenu(true)'); }
}
function renderMenu() {
    var box = $('menu-rows');
    if (!menuEntries.length) { box.innerHTML = emptyState('fa-solid fa-list', 'No entries yet.'); return; }
    box.innerHTML = menuEntries.map(function (e, i) {
        var fixed = e.command === 'start';
        return '<div class="menu-entry">' +
            '<button class="icon-btn" onclick="moveMenu(' + i + ',-1)" ' + (i === 0 ? 'disabled' : '') + ' aria-label="Move up" style="flex-shrink:0;"><i class="fa-solid fa-arrow-up"></i></button>' +
            '<button class="icon-btn" onclick="moveMenu(' + i + ',1)" ' + (i === menuEntries.length - 1 ? 'disabled' : '') + ' aria-label="Move down" style="flex-shrink:0;"><i class="fa-solid fa-arrow-down"></i></button>' +
            '<input class="input mono menu-cmd" value="' + esc(e.command) + '" ' + (fixed ? 'readonly' : '') + ' oninput="menuEntries[' + i + '].command=this.value">' +
            '<input class="input menu-desc" value="' + esc(e.description) + '" placeholder="Description" oninput="menuEntries[' + i + '].description=this.value">' +
            (fixed ? '<span class="badge" title="Fixed" style="flex-shrink:0;"><i class="fa-solid fa-lock"></i></span>' : '<button class="icon-btn danger" onclick="removeMenu(' + i + ')" aria-label="Remove" style="flex-shrink:0;"><i class="fa-regular fa-trash-can"></i></button>') +
            '</div>';
    }).join('');
}
function addMenuRow() { menuEntries.push({ command: '', description: '' }); renderMenu(); }
function removeMenu(i) { menuEntries.splice(i, 1); renderMenu(); }
function moveMenu(i, d) {
    var j = i + d; if (j < 0 || j >= menuEntries.length) return;
    var t = menuEntries[i]; menuEntries[i] = menuEntries[j]; menuEntries[j] = t; renderMenu();
}
async function publishMenu() {
    var clean = menuEntries.filter(function (e) { return e.command && e.description; });
    if (!clean.some(function (e) { return e.command === 'start'; })) clean.unshift({ command: 'start', description: 'Start the bot' });
    try {
        var d = await api('POST', '/api/menu_commands', { menu: clean });
        if (d.warning) $('menu-result').innerHTML = '<span style="color:var(--orange)"><i class="fa-solid fa-triangle-exclamation"></i> ' + esc(d.warning) + '</span>';
        else $('menu-result').innerHTML = '<span style="color:var(--green)"><i class="fa-solid fa-check"></i> Published</span>';
        menuEntries = clean;
    } catch (e) { $('menu-result').innerHTML = '<span style="color:var(--red)">' + esc(e.message) + '</span>'; }
}

var featured = [];
var featuredEditing = null;
var featuredKind = 'text';
async function loadFeatured(force) {
    try { var d = await api('GET', '/api/featured'); featured = d.items || []; renderFeatured(); }
    catch (e) { $('featured-list').innerHTML = errorState(e.message, 'loadFeatured(true)'); }
}
function renderFeatured() {
    var box = $('featured-list');
    if (!featured.length) { box.innerHTML = emptyState('fa-solid fa-wand-magic-sparkles', 'No featured commands yet.', 'Create one to get started.'); return; }
    box.innerHTML = featured.map(function (f) {
        var kindLabel = f.kind === 'buttons' ? '<span class="badge purple">Buttons</span>' : '<span class="badge blue">DM</span>';
        var blocks = '';
        if (f.content) blocks += '<div class="fr-block hint"><b>Hint:</b> ' + esc(f.content) + '</div>';
        if (f.success_text) blocks += '<div class="fr-block success"><b style="color:var(--green)">Success:</b> ' + esc(f.success_text) + '</div>';
        if (f.failure_text) blocks += '<div class="fr-block failure"><b style="color:var(--red)">Failure:</b> ' + esc(f.failure_text) + '</div>';
        return '<div class="featured-reply ' + (f.enabled ? '' : 'disabled') + '">' +
            '<div class="fr-head">' +
                '<span class="fr-cmd">' + esc(f.command) + '</span>' + kindLabel +
                '<div style="flex:1"></div>' +
                '<button class="switch ' + (f.enabled ? 'on' : '') + '" onclick="toggleFeatured(' + f.id + ')" title="Enable or disable" aria-label="Toggle"></button>' +
            '</div>' +
            blocks +
            '<div class="fr-actions">' +
                '<button class="btn btn-gray btn-sm" onclick="editFeatured(' + f.id + ')"><i class="fa-regular fa-pen-to-square"></i> Edit</button>' +
                '<button class="btn btn-danger btn-sm" onclick="deleteFeatured(' + f.id + ')"><i class="fa-regular fa-trash-can"></i> Delete</button>' +
            '</div></div>';
    }).join('');
}
function openFeaturedModal(kind, item) {
    featuredKind = kind || 'text';
    featuredEditing = item || null;
    $('featured-error').classList.remove('show');
    $('featured-modal-title').textContent = (item ? 'Edit' : 'New') + ' ' + (kind === 'buttons' ? 'buttons command' : 'DM command');
    $('featured-command').value = item ? item.command : '/';
    $('featured-hint').value = item ? (item.content || '') : '';
    $('featured-success').value = item ? (item.success_text || '') : '';
    $('featured-failure').value = item ? (item.failure_text || '') : '';
    toggleSwitch('featured-enabled', item ? !!item.enabled : true);
    var hintDesc = $('featured-hint-desc');
    if (kind === 'buttons') {
        if (hintDesc) hintDesc.innerHTML = 'Shown when the command is sent alone. Example: <code>Use /menu "message" {Label}(value) {Label}(value)</code>';
    } else {
        if (hintDesc) hintDesc.innerHTML = 'Shown when the command is sent alone. Example: <code>Use /contact your message here</code>';
    }
    $('featured-modal').classList.remove('hidden');
    trackModal('featured-modal');
}
function closeFeaturedModal() { $('featured-modal').classList.add('hidden'); untrackModal('featured-modal'); }
async function saveFeatured() {
    var err = $('featured-error'); err.classList.remove('show');
    var command = $('featured-command').value.trim();
    if (!command || command === '/') { err.textContent = 'Command is required.'; err.classList.add('show'); return; }
    var payload = {
        command: command, kind: featuredKind,
        content: $('featured-hint').value.trim(),
        success_text: $('featured-success').value.trim(),
        failure_text: $('featured-failure').value.trim(),
        enabled: sw('featured-enabled') ? 1 : 0
    };
    var btn = $('featured-save');
    await withBusy(btn, async function () {
        try {
            if (featuredEditing) await api('PUT', '/api/featured/' + featuredEditing.id, payload);
            else await api('POST', '/api/featured', payload);
            closeFeaturedModal(); toast('Featured command saved.'); loadFeatured();
        } catch (e) { err.textContent = e.message; err.classList.add('show'); }
    });
}
async function editFeatured(id) {
    var item = featured.find(function (f) { return f.id === id; });
    if (!item) return;
    openFeaturedModal(item.kind === 'buttons' ? 'buttons' : 'text', item);
}
async function toggleFeatured(id) {
    var item = featured.find(function (f) { return f.id === id; });
    if (!item) return;
    try { await api('PUT', '/api/featured/' + id, { enabled: item.enabled ? 0 : 1 }); loadFeatured(); }
    catch (e) { toast(e.message, 'error'); }
}
async function deleteFeatured(id) {
    var ok = await confirmDialog('Delete this featured command?', 'Delete featured command');
    if (!ok) return;
    try { await api('DELETE', '/api/featured/' + id); toast('Deleted.'); loadFeatured(); }
    catch (e) { toast(e.message, 'error'); }
}

/* ============================================================
   USERS
   ============================================================ */
var users = [];
var userFilter = 'all';
var manageUser = null;
var userTimer = null;
var umCurrentTab = 'dm';
function umSetTab(tab) {
    umCurrentTab = tab;
    document.querySelectorAll('#um-tabs button').forEach(function (b) { b.classList.toggle('active', b.dataset.tab === tab); });
    document.querySelectorAll('.tabpane').forEach(function (p) { p.classList.remove('active'); });
    var pane = $('um-pane-' + tab); if (pane) pane.classList.add('active');
}
function debouncedUsers() { clearTimeout(userTimer); userTimer = setTimeout(function () { loadUsers(); }, 280); }
function setUserFilter(f) {
    userFilter = f;
    document.querySelectorAll('#user-filters .chip').forEach(function (c) { c.classList.toggle('active', c.dataset.filter === f); });
    loadUsers();
}
function userCircle(u) {
    var cls = u.private_started == 1 ? 'green' : 'yellow';
    var initial = (u.first_name || '?').charAt(0).toUpperCase();
    var title = u.private_started == 1 ? 'Started the bot — you can DM them' : 'Group only — has not pressed Start';
    return '<div class="user-circle ' + cls + '" title="' + title + '">' + esc(initial) + '</div>';
}
async function loadUsers(force) {
    var box = $('users-list');
    box.innerHTML = skeletonRows(3);
    try {
        var q = $('user-search').value.trim();
        var d = await api('GET', '/api/users?filter=' + userFilter + (q ? '&search=' + encodeURIComponent(q) : ''));
        users = d.users || []; renderUsers();
    } catch (e) { box.innerHTML = errorState(e.message, 'loadUsers(true)'); }
}
function renderUsers() {
    var box = $('users-list');
    if (!users.length) { box.innerHTML = emptyState('fa-regular fa-user', 'No users match this filter.'); return; }
    var html = '<div class="list">';
    users.forEach(function (u) {
        var status = u.block_type === 'full' ? '<span class="badge red">Blocked</span>' :
            (u.block_type === 'ai_only' ? '<span class="badge orange">AI off</span>' : '');
        var role = u.role === 'admin' ? '<span class="badge purple">Admin</span>' : '';
        var nameEsc = esc(u.first_name || '').replace(/'/g, '');
        html += '<div class="list-row">' +
            userCircle(u) +
            '<div class="lr-main">' +
                '<div class="lr-title">' + esc(u.first_name || 'Unknown') + (u.username ? ' <span class="muted">@' + esc(u.username) + '</span>' : '') + '</div>' +
                '<div class="lr-sub">ID ' + esc(u.id) + ' · ' + fmtTime(u.last_active) + '</div>' +
            '</div>' + role + status +
            '<div class="lr-actions">' +
                '<div class="lr-actions-desktop" style="display:flex;gap:4px;">' +
                    '<button class="icon-btn" onclick="checkUser(' + u.id + ')" aria-label="Check reachability"><i class="fa-solid fa-stethoscope"></i></button>' +
                    '<button class="icon-btn" onclick="openUser(' + u.id + ')" aria-label="Open user"><i class="fa-solid fa-chevron-right"></i></button>' +
                    '<button class="icon-btn danger" onclick="deleteUser(' + u.id + ',\\'' + nameEsc + '\\')" aria-label="Delete user"><i class="fa-regular fa-trash-can"></i></button>' +
                '</div>' +
                '<div class="lr-actions-mobile dropdown">' +
                    '<button class="icon-btn" onclick="toggleDropdown(this)" aria-label="More actions"><i class="fa-solid fa-ellipsis-vertical"></i></button>' +
                    '<div class="dropdown-menu hidden">' +
                        '<button onclick="checkUser(' + u.id + ')"><i class="fa-solid fa-stethoscope"></i> Check reachable</button>' +
                        '<button onclick="openUser(' + u.id + ')"><i class="fa-solid fa-chevron-right"></i> Open</button>' +
                        '<button class="danger" onclick="deleteUser(' + u.id + ',\\'' + nameEsc + '\\')"><i class="fa-regular fa-trash-can"></i> Delete</button>' +
                    '</div>' +
                '</div>' +
            '</div></div>';
    });
    box.innerHTML = html + '</div>';
}
async function checkUser(id) {
    try {
        var r = await api('POST', '/api/users/' + id + '/check_started', {});
        if (r.can_message) toast('This user has started the bot — you can DM them.', 'success');
        else toast('This user has not started the bot. You cannot DM them yet.', 'error');
        loadUsers();
    } catch (e) { toast(e.message, 'error'); }
}
async function checkAllUsers() {
    var ok = await confirmDialog('Check every user in the list? This can take a few seconds.', 'Check all users', false);
    if (!ok) return;
    var loaded = 0;
    for (var i = 0; i < users.length; i++) {
        try { await api('POST', '/api/users/' + users[i].id + '/check_started', {}); loaded++; }
        catch (e) { /* keep going */ }
    }
    toast('Checked ' + loaded + ' users.');
    loadUsers();
}
async function deleteUser(id, name) {
    var ok = await confirmDialog('Delete ' + (name || 'this user') + '? Their AI memory, direct messages and blocks are removed. This cannot be undone.', 'Delete user');
    if (!ok) return;
    try { await api('DELETE', '/api/users/' + id); toast('User deleted.'); loadUsers(); }
    catch (e) { toast(e.message, 'error'); }
}
async function openUser(idOrUser) {
    if (idOrUser && typeof idOrUser === 'object' && idOrUser.id !== undefined) {
        manageUser = idOrUser;
    } else {
        manageUser = users.find(function (u) { return sameId(u.id, idOrUser); });
        if (!manageUser && typeof memoryUsers !== 'undefined') {
            manageUser = memoryUsers.find(function (u) { return sameId(u.id, idOrUser); });
        }
        if (!manageUser) { toast('User not found. Try refreshing.', 'error'); return; }
    }
    go('user-manage');
    umSetTab('dm');
    $('um-title').textContent = manageUser.first_name || 'User';
    $('um-sub').textContent = (manageUser.username ? '@' + manageUser.username + ' · ' : '') + 'ID ' + manageUser.id;
    $('um-cards').innerHTML =
        kvCard('Role', manageUser.role || 'user') +
        kvCard('Source', manageUser.private_started == 1 ? 'Started the bot' : 'Group only') +
        kvCard('Last active', fmtTime(manageUser.last_active)) +
        kvCard('Block status', manageUser.block_type === 'full' ? 'Blocked' : (manageUser.block_type === 'ai_only' ? 'AI disabled' : 'Active'));
    $('um-actions').innerHTML =
        manageUser.first_name === 'Unknown'
        ? '<div class="muted small">This user record no longer exists — actions unavailable.</div>'
        : '<button class="btn btn-gray btn-sm" onclick="checkUser(' + manageUser.id + ')"><i class="fa-solid fa-stethoscope"></i> Check reachable</button>' +
        '<button class="btn btn-gray btn-sm" onclick="toggleRole()"><i class="fa-solid fa-user-shield"></i> ' + (manageUser.role === 'admin' ? 'Demote' : 'Promote') + '</button>' +
        '<button class="btn btn-gray btn-sm" onclick="toggleBlock(\\'ai_only\\')"><i class="fa-solid fa-robot"></i> ' + (manageUser.block_type === 'ai_only' ? 'Unblock AI' : 'Block AI') + '</button>' +
        '<button class="btn btn-danger btn-sm" onclick="toggleBlock(\\'full\\')"><i class="fa-solid fa-ban"></i> ' + (manageUser.block_type === 'full' ? 'Unblock' : 'Block all') + '</button>';
    $('um-input').value = ''; $('um-photo').value = '';
    loadDmMessages(manageUser.id); loadAiMemory();
}
function kvCard(k, v) { return '<div class="card compact" style="margin:0;"><div class="tiny muted">' + esc(k) + '</div><div style="font-weight:600;margin-top:4px;word-break:break-word;">' + esc(v) + '</div></div>'; }
async function toggleRole() {
    var role = manageUser.role === 'admin' ? 'user' : 'admin';
    try {
        await api('PUT', '/api/users/role', { userId: manageUser.id, role: role });
        toast('Role updated.');
        manageUser.role = role;
        openUser(manageUser);          // <— object, not ID
    } catch (e) { toast(e.message, 'error'); }
}

async function toggleBlock(type) {
    var isOn = manageUser.block_type === type;
    try {
        if (isOn) await api('POST', '/api/users/unblock', { userId: manageUser.id });
        else await api('POST', '/api/users/block', { userId: manageUser.id, blockType: type });
        toast('Updated.');
        manageUser.block_type = isOn ? null : type;
        openUser(manageUser);          // <— object, not ID
    } catch (e) { toast(e.message, 'error'); }
}
async function loadDmMessages(id) {
    var box = $('um-chat');
    if (!box) return;
    box.innerHTML = '<div class="spinner-page"><span class="mini-spinner"></span></div>';
    try {
        var d = await api('GET', '/api/users/' + id + '/dm_messages');
        window.__dmCache = (d && Array.isArray(d.messages)) ? d.messages : [];
        renderDm(window.__dmCache);
    } catch (e) { box.innerHTML = errorState(e.message, 'loadDmMessages(' + id + ')'); }
}
function renderDm(msgs) {
    var box = $('um-chat');
    msgs = msgs || [];
    $('um-dm-count').textContent = msgs.length;
    if (!msgs.length) { box.innerHTML = emptyState('fa-regular fa-comment', 'No direct messages yet.'); return; }
    box.innerHTML = msgs.map(function (m) {
        var out = m.direction === 'out';
        var actions = '';
        if (out && m.message_id) {
            actions = '<div class="b-actions">' +
                '<button onclick="openMsgEditor(\\'dm\\',' + m.id + ')"><i class="fa-regular fa-pen-to-square"></i> Edit</button>' +
                '<button onclick="deleteDm(' + m.chat_id + ',' + m.message_id + ')"><i class="fa-regular fa-trash-can"></i> Delete</button>' +
                '</div>';
        }
        var sourceTag = '';
        if (m.source === 'featured') sourceTag = ' · DM command';
        else if (m.source === 'featured_button') sourceTag = ' · button tap';
        else if (m.source === 'ai') sourceTag = ' · AI';
        return '<div class="bubble ' + (out ? 'out' : 'in') + '" dir="auto">' +
            (m.photo_url ? '<span class="photo-tag"><i class="fa-regular fa-image"></i> photo</span><br>' : '') +
            esc(m.text || '') +
            '<div class="b-meta">' + fmtTime(m.created_at) + (m.edited_at ? ' · edited' : '') + sourceTag + '</div>' +
            actions + '</div>';
    }).join('');
    scrollBottom(box);
}
async function sendUserMessage() {
    if (!manageUser) return;
    var text = $('um-input').value.trim();
    var photo = $('um-photo').value.trim();
    if (!text && !photo) { toast('Type a message first.', 'error'); return; }
    var body = { userId: manageUser.id, message: text };
    if (photo) body.photo_url = photo;
    if (draftButtonsJson) body.buttons_json = draftButtonsJson;
    try {
        await withBusy($('um-send'), function () { return api('POST', '/api/users/send_message', body); });
        $('um-input').value = ''; $('um-photo').value = '';
        draftButtonsJson = null; toast('Sent.'); loadDmMessages(manageUser.id);
    } catch (e) { toast(e.message, 'error'); }
}
async function deleteDm(chatId, messageId) {
    var ok = await confirmDialog('Delete this message from the chat?', 'Delete message');
    if (!ok) return;
    try { await api('POST', '/api/users/message/delete', { chatId: chatId, messageId: messageId }); toast('Deleted.'); loadDmMessages(manageUser.id); }
    catch (e) { toast(e.message, 'error'); }
}
async function loadAiMemory() {
    var box = $('um-ai');
    if (!box) return;
    if (!manageUser || !manageUser.id) { box.innerHTML = emptyState('fa-solid fa-brain', 'No user selected.'); return; }
    var uid = String(manageUser.id);
    box.innerHTML = '<div class="spinner-page"><span class="mini-spinner"></span></div>';
    try {
        var d = await api('GET', '/api/users/' + uid + '/chat_history');
        var msgs = (d && Array.isArray(d.messages)) ? d.messages : [];
        window.__aiCache = msgs;
        try { renderAiMemory(msgs); }
        catch (renderErr) { box.innerHTML = errorState('Could not render memory: ' + renderErr.message, 'loadAiMemory()'); }
    } catch (e) { box.innerHTML = errorState(e.message || 'Failed to load AI memory.', 'loadAiMemory()'); }
}
function renderAiMemory(msgs) {
    var box = $('um-ai');
    msgs = msgs || [];
    if (!msgs.length) { box.innerHTML = emptyState('fa-solid fa-brain', 'No AI memory stored.'); return; }
    box.innerHTML = msgs.map(function (m, i) {
        return '<div class="bubble ' + (m.role === 'user' ? 'in' : 'out') + '" dir="auto">' +
            esc(m.content) +
            '<div class="b-actions">' +
                '<button onclick="editAiMsg(' + i + ')"><i class="fa-regular fa-pen-to-square"></i> Edit</button>' +
                '<button onclick="deleteAiMsg(' + i + ')"><i class="fa-regular fa-trash-can"></i> Delete</button>' +
            '</div></div>';
    }).join('');
    scrollBottom(box);
}
async function editAiMsg(idx) {
    var m = window.__aiCache[idx]; if (!m) return;
    var newText = prompt('Edit this message:', m.content);
    if (newText === null || newText === m.content) return;
    try { await api('PUT', '/api/users/' + manageUser.id + '/ai_messages/' + m.id, { content: newText }); toast('Updated.'); loadAiMemory(); }
    catch (e) { toast(e.message, 'error'); }
}
async function deleteAiMsg(idx) {
    var m = window.__aiCache[idx]; if (!m) return;
    var ok = await confirmDialog('Delete this memory entry?', 'Delete memory');
    if (!ok) return;
    try { await api('DELETE', '/api/users/' + manageUser.id + '/ai_messages/' + m.id); toast('Deleted.'); loadAiMemory(); }
    catch (e) { toast(e.message, 'error'); }
}
async function clearAiMemoryUser() {
    var ok = await confirmDialog('Clear the AI conversation memory for this user?', 'Clear AI memory');
    if (!ok) return;
    try { await api('POST', '/api/users/' + manageUser.id + '/clear_memory'); toast('AI memory cleared.'); loadAiMemory(); }
    catch (e) { toast(e.message, 'error'); }
}

/* ============================================================
   MEMORY
   ============================================================ */
var memoryUsers = [];
var memoryTotals = { ai: 0, dm: 0, users: 0 };
var memFilter = 'all';
function setMemFilter(f) {
    memFilter = f;
    document.querySelectorAll('#mem-filters .chip').forEach(function (c) { c.classList.toggle('active', c.dataset.mf === f); });
    renderMemory();
}
async function loadMemory(force) {
    loadAutoRemove();
    var box = $('mem-list');
    box.innerHTML = skeletonRows(3);
    try {
        var d = await api('GET', '/api/memory/overview');
        memoryUsers = (d && d.users) || [];
        memoryTotals = (d && d.totals) || { ai: 0, dm: 0, users: 0 };
        var st = $('mem-stats');
        st.innerHTML =
            '<div class="stat"><div class="st-ic purple"><i class="fa-solid fa-brain"></i></div><div class="st-val">' + memoryTotals.ai + '</div><div class="st-lbl">AI memory messages</div></div>' +
            '<div class="stat"><div class="st-ic blue"><i class="fa-solid fa-comment-dots"></i></div><div class="st-val">' + memoryTotals.dm + '</div><div class="st-lbl">Direct messages</div></div>' +
            '<div class="stat"><div class="st-ic green"><i class="fa-solid fa-user-group"></i></div><div class="st-val">' + memoryTotals.users + '</div><div class="st-lbl">Users with memory</div></div>';
        renderMemory();
    } catch (e) { box.innerHTML = errorState(e.message, 'loadMemory(true)'); }
}
function renderMemory() {
    var box = $('mem-list');
    var q = ($('mem-search').value || '').toLowerCase().trim();
    var list = memoryUsers.slice();
    if (memFilter === 'ai') list = list.filter(function (u) { return u.ai_count > 0; });
    else if (memFilter === 'dm') list = list.filter(function (u) { return u.dm_count > 0; });
    if (q) list = list.filter(function (u) {
        return (String(u.first_name || '') + ' ' + String(u.username || '') + ' ' + String(u.id)).toLowerCase().indexOf(q) >= 0;
    });
    if (!list.length) { box.innerHTML = emptyState('fa-solid fa-database', 'Nothing stored yet.'); return; }
    var html = '<div class="list">';
    list.forEach(function (u) {
        html += '<div class="list-row">' +
            userCircle(u) +
            '<div class="lr-main" onclick="openUser(' + u.id + ')" style="cursor:pointer;">' +
                '<div class="lr-title">' + esc(u.first_name || 'Unknown') + (u.username ? ' <span class="muted">@' + esc(u.username) + '</span>' : '') + '</div>' +
                '<div class="lr-sub">ID ' + esc(u.id) + ' · ' + u.ai_count + ' AI · ' + u.dm_count + ' DM</div>' +
            '</div>' +
            (u.ai_count > 0 ? '<span class="badge purple mem-badge">' + u.ai_count + ' AI</span>' : '') +
            (u.dm_count > 0 ? '<span class="badge blue mem-badge">' + u.dm_count + ' DM</span>' : '') +
            '<div class="lr-actions">' +
                '<div class="lr-actions-desktop" style="display:flex;gap:4px;">' +
                    '<button class="icon-btn" onclick="openUser(' + u.id + ')" title="Open user" aria-label="Open user"><i class="fa-solid fa-chevron-right"></i></button>' +
                    (u.ai_count > 0 ? '<button class="icon-btn" onclick="clearMemForUser(' + u.id + ',\\'ai\\')" title="Clear AI memory" aria-label="Clear AI memory"><i class="fa-solid fa-brain"></i></button>' : '') +
                    (u.dm_count > 0 ? '<button class="icon-btn" onclick="clearMemForUser(' + u.id + ',\\'dm\\')" title="Clear direct messages" aria-label="Clear direct messages"><i class="fa-solid fa-comment-dots"></i></button>' : '') +
                    '<button class="icon-btn danger" onclick="clearMemForUser(' + u.id + ',\\'all\\')" title="Clear all memory" aria-label="Clear all memory"><i class="fa-regular fa-trash-can"></i></button>' +
                '</div>' +
                '<div class="lr-actions-mobile dropdown">' +
                    '<button class="icon-btn" onclick="toggleDropdown(this)" aria-label="More actions"><i class="fa-solid fa-ellipsis-vertical"></i></button>' +
                    '<div class="dropdown-menu hidden">' +
                        '<button onclick="openUser(' + u.id + ')"><i class="fa-solid fa-chevron-right"></i> Open</button>' +
                        (u.ai_count > 0 ? '<button class="danger" onclick="clearMemForUser(' + u.id + ',\\'ai\\')"><i class="fa-solid fa-brain"></i> Clear AI memory</button>' : '') +
                        (u.dm_count > 0 ? '<button class="danger" onclick="clearMemForUser(' + u.id + ',\\'dm\\')"><i class="fa-solid fa-comment-dots"></i> Clear direct messages</button>' : '') +
                        '<button class="danger" onclick="clearMemForUser(' + u.id + ',\\'all\\')"><i class="fa-regular fa-trash-can"></i> Clear all memory</button>' +
                    '</div>' +
                '</div>' +
            '</div></div>';
    });
    box.innerHTML = html + '</div>';
}
async function clearMemForUser(id, scope) {
    var label = scope === 'ai' ? 'AI memory' : (scope === 'dm' ? 'direct messages' : 'all memory');
    var ok = await confirmDialog('Clear ' + label + ' for this user? This cannot be undone.', 'Clear ' + label);
    if (!ok) return;
    try { await api('POST', '/api/memory/clear', { userId: id, scope: scope }); toast('Cleared.'); loadMemory(); }
    catch (e) { toast(e.message, 'error'); }
}
async function bulkClear(scope) {
    var label = scope === 'ai' ? 'ALL AI memory' : (scope === 'dm' ? 'ALL direct messages' : 'ALL memory (AI + DM) for every user');
    var ok = await confirmDialog('Clear ' + label + '? This affects every user and cannot be undone.', 'Bulk delete', true);
    if (!ok) return;
    try { await api('POST', '/api/memory/clear', { scope: scope }); toast('Cleared.'); loadMemory(); }
    catch (e) { toast(e.message, 'error'); }
}
function toggleAutoRemove() {
    var on = toggleSwitch('arm-enable');
    show($('arm-settings'), on);
}
async function loadAutoRemove() {
    try {
        var d = await api('GET', '/api/memory/auto_remove');
        toggleSwitch('arm-enable', d.enabled === '1');
        var aiVal = parseInt(d.ai_value) || 0;
        $('arm-ai-value').value = aiVal > 0 ? ('Keep last ' + aiVal + ' messages per chat') : 'Not set — AI memory grows forever';
        $('arm-dm-value').value = d.dm_value || 30;
        $('arm-dm-unit').value = d.dm_unit || 'days';
        show($('arm-settings'), d.enabled === '1');
    } catch (e) { /* silent */ }
}
async function saveAutoRemove() {
    var value = parseInt($('arm-dm-value').value);
    if (isNaN(value) || value < 1) { toast('Enter a positive number.', 'error'); return; }
    try {
        await api('POST', '/api/memory/auto_remove', { enabled: sw('arm-enable') ? '1' : '0', dm_value: value, dm_unit: $('arm-dm-unit').value });
        toast('Auto-remove saved.');
    } catch (e) { toast(e.message, 'error'); }
}

/* ============================================================
   GROUPS
   ============================================================ */
var groups = [];
var groupFilter = 'active';
var manageGroup = null;
var groupSettings = {};
function setGroupFilter(f) {
    groupFilter = f;
    document.querySelectorAll('#group-filters .chip').forEach(function (c) { c.classList.toggle('active', c.dataset.gf === f); });
    renderGroups();
}
async function loadGroups(force) {
    var box = $('groups-list');
    box.innerHTML = skeletonRows(3);
    try { var d = await api('GET', '/api/groups'); groups = d.groups || []; renderGroups(); }
    catch (e) { box.innerHTML = errorState(e.message, 'loadGroups(true)'); }
}
function renderGroups() {
    var box = $('groups-list');
    var list = groups.filter(function (g) {
        if (groupFilter === 'active') return g.is_active == 1;
        if (groupFilter === 'inactive') return g.is_active != 1;
        return true;
    });
    if (!list.length) { box.innerHTML = emptyState('fa-regular fa-comments', 'No groups yet.', 'Add the bot to a group and send a message.'); return; }
    box.innerHTML = '<div class="list">' + list.map(function (g) {
        var ai = g.ai_state === 'off' ? '<span class="badge red">AI off</span>' : (g.ai_state === 'on' ? '<span class="badge green">AI on</span>' : '<span class="badge">AI inherit</span>');
        return '<div class="list-row">' +
            '<i class="fa-solid ' + (g.type === 'supergroup' ? 'fa-users' : 'fa-user-group') + '" style="color:var(--accent);width:20px;text-align:center;"></i>' +
            '<div class="lr-main" onclick="openGroup(' + g.id + ')" style="cursor:pointer;">' +
                '<div class="lr-title">' + esc(g.title || 'Group ' + g.id) + '</div>' +
                '<div class="lr-sub">' + esc(g.type) + ' · ' + (g.member_count ? g.member_count + ' members · ' : '') + 'last active ' + fmtTime(g.last_active) + '</div>' +
            '</div>' + ai + (g.is_active == 1 ? '' : '<span class="badge red">Removed</span>') +
            '<div class="lr-actions"><button class="icon-btn" onclick="openGroup(' + g.id + ')" aria-label="Open group"><i class="fa-solid fa-chevron-right"></i></button></div>' +
            '</div>';
    }).join('') + '</div>';
}
async function openGroup(id) {
    go('group-manage');
    var box = $('gm-cards');
    box.innerHTML = '<div class="skl skl-card"></div><div class="skl skl-card"></div><div class="skl skl-card"></div>';
    try {
        var d = await api('GET', '/api/groups/' + id);
        manageGroup = d.group; groupSettings = d.settings || {};
        $('gm-title').textContent = manageGroup.title || ('Group ' + id);
        $('gm-sub').textContent = manageGroup.type + ' · ID ' + id + (manageGroup.username ? ' · @' + manageGroup.username : '');
        box.innerHTML = kvCard('Members tracked', manageGroup.member_count || 0) + kvCard('Added', fmtTime(manageGroup.added_at)) + kvCard('Last active', fmtTime(manageGroup.last_active));
        applyGroupSettings(groupSettings);
    } catch (e) { toast(e.message, 'error'); }
}
function applyGroupSettings(s) {
    setSeg('gm-ai-mode', s.ai || 'inherit');
    $('gm-memory').value = s.memory === undefined ? 'inherit' : String(s.memory);
    $('gm-mention').value = s.mention === undefined ? 'inherit' : String(s.mention);
    toggleSwitch('gm-welcome-toggle', !!s.welcome_enabled); $('gm-welcome-text').value = s.welcome_text || '';
    $('gm-rules').value = s.rules_text || '';
    toggleSwitch('gm-flood-toggle', !!s.anti_flood); $('gm-flood-limit').value = s.flood_limit || 6;
    toggleSwitch('gm-link-toggle', !!s.link_filter);
    toggleSwitch('gm-service-toggle', !!s.auto_delete_service);
    toggleSwitch('gm-track-toggle', !!s.track_members);
}
function gmToggle(key) {
    var map = { welcome: 'gm-welcome-toggle', flood: 'gm-flood-toggle', link: 'gm-link-toggle', service: 'gm-service-toggle', track: 'gm-track-toggle' };
    toggleSwitch(map[key]);
}
function gmSet(k, v) { setSeg('gm-ai-mode', v); }
async function saveGroupSettings() {
    var body = {
        ai: getSeg('gm-ai-mode') || 'inherit', memory: $('gm-memory').value, mention: $('gm-mention').value,
        welcome_enabled: sw('gm-welcome-toggle'), welcome_text: $('gm-welcome-text').value, rules_text: $('gm-rules').value,
        anti_flood: sw('gm-flood-toggle'), flood_limit: parseInt($('gm-flood-limit').value) || 6,
        link_filter: sw('gm-link-toggle'), auto_delete_service: sw('gm-service-toggle'), track_members: sw('gm-track-toggle')
    };
    try { await api('POST', '/api/groups/' + manageGroup.id + '/settings', body); toast('Group settings saved.'); }
    catch (e) { toast(e.message, 'error'); }
}
async function sendGroupAnnouncement() {
    var text = $('gm-announce').value.trim();
    var photo = $('gm-announce-photo').value.trim();
    if (!text && !photo) { toast('Write a message first.', 'error'); return; }
    var body = { message: text };
    if (photo) body.photo_url = photo;
    if (draftButtonsJson) body.buttons_json = draftButtonsJson;
    try {
        await api('POST', '/api/groups/' + manageGroup.id + '/send', body);
        toast('Announcement sent.');
        $('gm-announce').value = ''; $('gm-announce-photo').value = ''; draftButtonsJson = null;
    } catch (e) { toast(e.message, 'error'); }
}
async function removeGroup() {
    var ok = await confirmDialog('Remove this group from the dashboard? The bot stays in the group.', 'Remove group');
    if (!ok) return;
    try { await api('DELETE', '/api/groups/' + manageGroup.id); toast('Removed.'); groups = []; go('groups'); }
    catch (e) { toast(e.message, 'error'); }
}

/* ============================================================
   BROADCAST
   ============================================================ */
var bcHistory = [];
async function loadBroadcast() {
    loadBroadcastPacing(); loadBroadcastHistory();
    try { var d = await api('GET', '/api/users?filter=all'); users = d.users || []; } catch (e) {}
}
async function loadBroadcastPacing() {
    try {
        var d = await api('GET', '/api/broadcast/settings');
        if (d.settings) { $('bc-batch').value = d.settings.batch_size; $('bc-delay').value = d.settings.delay_ms; $('bc-timeout').value = d.settings.timeout_ms; }
    } catch (e) {}
}
async function saveBroadcastPacing() {
    try {
        await api('POST', '/api/broadcast/settings', {
            batch_size: parseInt($('bc-batch').value) || 25,
            delay_ms: parseInt($('bc-delay').value) || 0,
            timeout_ms: parseInt($('bc-timeout').value) || 10000
        });
        toast('Pacing saved.');
    } catch (e) { toast(e.message, 'error'); }
}
function onBroadcastTargetChange() {
    var t = $('bc-target').value;
    show($('bc-specific-wrap'), t === 'specific');
    show($('bc-custom-wrap'), t === 'custom');
    if (t === 'custom') renderBroadcastCustom();
    updateBcCount();
}
function renderBroadcastCustom() {
    var box = $('bc-custom-list');
    box.innerHTML = users.map(function (u) {
        return '<label class="check" style="padding:6px 0;" data-name="' + esc((u.first_name || '') + ' ' + (u.username || '')) + '">' +
            '<input type="checkbox" class="bc-cb" value="' + u.id + '" checked onchange="updateBcCount()">' +
            '<span>' + esc(u.first_name || 'User') + (u.username ? ' <span class="muted">@' + esc(u.username) + '</span>' : '') + '</span></label>';
    }).join('');
}
function filterBroadcastCustom() {
    var q = $('bc-custom-search').value.toLowerCase();
    document.querySelectorAll('#bc-custom-list .check').forEach(function (l) { l.style.display = l.dataset.name.toLowerCase().indexOf(q) >= 0 ? '' : 'none'; });
}
function bcCustomAll(on) { document.querySelectorAll('.bc-cb').forEach(function (c) { c.checked = on; }); updateBcCount(); }
function getBroadcastIds() {
    var t = $('bc-target').value;
    if (t === 'specific') return $('bc-specific').value.split(/[^0-9]+/).map(Number).filter(Boolean);
    if (t === 'custom') return Array.from(document.querySelectorAll('.bc-cb:checked')).map(function (c) { return parseInt(c.value); });
    return users.filter(function (u) {
        if (t === 'all' || t === 'private') return u.private_started == 1;
        if (t === 'only_ai_blocked') return u.block_type === 'ai_only';
        if (t === 'only_full_blocked') return u.block_type === 'full';
        if (t === 'except_full_blocked') return u.block_type !== 'full';
        return true;
    }).map(function (u) { return u.id; });
}
function updateBcCount() { $('bc-count').textContent = getBroadcastIds().length + ' recipient(s) will receive this message'; }
async function sendBroadcast() {
    var text = $('bc-text').value.trim();
    var photo = $('bc-photo').value.trim();
    var ids = getBroadcastIds();
    if (!ids.length) { toast('No recipients selected.', 'error'); return; }
    if (!text && !photo) { toast('Write a message first.', 'error'); return; }
    var body = { userIds: ids, message: text };
    if (photo) body.photo_url = photo;
    if (draftButtonsJson) body.buttons_json = draftButtonsJson;
    try {
        var d = await withBusy($('bc-send'), function () { return api('POST', '/api/broadcast', body); });
        toast('Delivered to ' + d.sent + ' user(s).');
        $('bc-text').value = ''; $('bc-photo').value = '';
        draftButtonsJson = null;
        loadBroadcastHistory();
    } catch (e) { toast(e.message, 'error'); }
}
async function loadBroadcastHistory() {
    var box = $('bc-chat');
    try {
        var d = await api('GET', '/api/broadcast/history');
        bcHistory = d.history || [];
        if (!bcHistory.length) { box.innerHTML = emptyState('fa-regular fa-paper-plane', 'Nothing broadcast yet.'); return; }
        box.innerHTML = bcHistory.map(function (h) {
            return '<div class="bubble out" style="max-width:100%;" dir="auto">' +
                '<div class="tiny" style="opacity:.8;margin-bottom:4px;">#' + h.id + ' · ' + fmtTime(h.sent_at) + ' · ' + (h.sent_count || 0) + '/' + (h.recipient_count || 0) + ' delivered' + (h.kind === 'photo' ? ' · photo' : '') + '</div>' +
                esc(h.message || '') +
                '<div class="b-actions">' +
                    '<button onclick="openMsgEditor(\\'broadcast\\',' + h.id + ')"><i class="fa-regular fa-pen-to-square"></i> Edit</button>' +
                    '<button onclick="deleteBroadcast(' + h.id + ')"><i class="fa-regular fa-trash-can"></i> Delete</button>' +
                '</div></div>';
        }).join('');
        scrollBottom(box);
    } catch (e) { box.innerHTML = errorState(e.message, 'loadBroadcastHistory()'); }
}
async function deleteBroadcast(id) {
    var ok = await confirmDialog('Delete broadcast #' + id + ' from every recipient?', 'Delete broadcast');
    if (!ok) return;
    try { var d = await api('POST', '/api/broadcast/delete', { broadcastId: id }); toast('Deleted from ' + (d.deleted || 0) + ' chat(s).'); loadBroadcastHistory(); }
    catch (e) { toast(e.message, 'error'); }
}

/* ============================================================
   MESSAGE EDITOR SHEET
   ============================================================ */
var msgContext = null;
var draftButtonsJson = null;
function toggleMsgSection(which) {
    var map = { kb: ['msg-kb-toggle', 'msg-kb-section'], inline: ['msg-inline-toggle', 'msg-inline-section'], reply: ['msg-reply-toggle', 'msg-reply-section'] };
    var m = map[which];
    var on = toggleSwitch(m[0]);
    show($(m[1]), on);
    if (on && which === 'reply') kbMe.render();
}
function openMsgEditor(mode, id) {
    msgContext = { mode: mode, id: id };
    $('msg-error').classList.remove('show');
    kbMe.reset();
    toggleSwitch('msg-kb-toggle', false); show($('msg-kb-section'), false);
    toggleSwitch('msg-inline-toggle', false); show($('msg-inline-section'), false);
    toggleSwitch('msg-reply-toggle', false); show($('msg-reply-section'), false);
    $('msg-photo').value = ''; $('msg-text').value = '';
    if (mode === 'dm' || mode === 'broadcast') {
        var rec = mode === 'dm' ? (window.__dmCache || []).find(function (m) { return m.id === id; }) : bcHistory.find(function (h) { return h.id === id; });
        $('msg-title').textContent = 'Edit message';
        if (rec) {
            $('msg-text').value = rec.text || rec.message || '';
            $('msg-photo').value = rec.photo_url || '';
            if (rec.buttons_json) {
                try {
                    var b = typeof rec.buttons_json === 'string' ? JSON.parse(rec.buttons_json) : rec.buttons_json;
                    if (b.inline) { kbMe.loadInline(b); toggleSwitch('msg-inline-toggle', true); show($('msg-inline-section'), true); toggleSwitch('msg-kb-toggle', true); show($('msg-kb-section'), true); }
                    if (b.reply) { kbMe.loadReply(b); toggleSwitch('msg-reply-toggle', true); show($('msg-reply-section'), true); toggleSwitch('msg-kb-toggle', true); show($('msg-kb-section'), true); }
                } catch (e) {}
            }
        }
    } else if (mode === 'dm-new') {
        $('msg-title').textContent = 'Attach buttons';
        $('msg-text').value = $('um-input').value; $('msg-photo').value = $('um-photo').value;
    } else if (mode === 'group') {
        $('msg-title').textContent = 'Attach buttons';
        $('msg-text').value = $('gm-announce').value; $('msg-photo').value = $('gm-announce-photo').value;
    } else if (mode === 'broadcast-new') {
        $('msg-title').textContent = 'Attach buttons';
        $('msg-text').value = $('bc-text').value; $('msg-photo').value = $('bc-photo').value;
    }
    kbMe.populateCommands();
    $('msg-modal').classList.remove('hidden');
    trackModal('msg-modal');
}
function closeMsgEditor() { $('msg-modal').classList.add('hidden'); untrackModal('msg-modal'); }
function collectButtons() {
    var inline = kbMe.inlineJSON();
    var reply = kbMe.replyJSON();
    if (!inline && !reply) return null;
    if (inline && reply) return JSON.stringify(Object.assign({}, inline, { reply: reply.reply }));
    return JSON.stringify(inline || reply);
}
async function saveMsgEditor() {
    var err = $('msg-error'); err.classList.remove('show');
    var text = $('msg-text').value.trim();
    var photo = $('msg-photo').value.trim();
    var buttons = collectButtons();
    if (!text && !photo) { err.textContent = 'A message or photo is required.'; err.classList.add('show'); return; }
    try {
        await withBusy($('msg-save'), async function () {
            if (msgContext.mode === 'dm') {
                var rec = (window.__dmCache || []).find(function (m) { return m.id === msgContext.id; });
                await api('POST', '/api/users/message/edit', { chatId: rec.chat_id, messageId: rec.message_id, kind: rec.kind || 'text', text: text, photo_url: photo, buttons_json: buttons });
                toast('Message updated.'); loadDmMessages(manageUser.id);
            } else if (msgContext.mode === 'broadcast') {
                await api('POST', '/api/broadcast/edit', { broadcastId: msgContext.id, message: text, buttons_json: buttons, photo_url: photo });
                toast('Broadcast updated.'); loadBroadcastHistory();
            } else {
                draftButtonsJson = buttons;
                if (msgContext.mode === 'dm-new') { $('um-input').value = text; $('um-photo').value = photo; }
                if (msgContext.mode === 'group') { $('gm-announce').value = text; $('gm-announce-photo').value = photo; }
                if (msgContext.mode === 'broadcast-new') { $('bc-text').value = text; $('bc-photo').value = photo; }
                toast('Buttons attached.');
            }
            closeMsgEditor();
        });
    } catch (e) { err.textContent = e.message; err.classList.add('show'); }
}

/* ============================================================
   KEYBOARD BUILDER
   ============================================================ */
function createKeyboardBuilder(prefix, opts) {
    opts = opts || {};
    var inline = [];
    var reply = { rows: [], actions: {}, resize: true, one_time: false, persistent: true, placeholder: '' };
    function el(id) { return $(prefix + '-' + id); }
    function renderInline() {
        var box = el('inline-list'); if (!box) return;
        if (!inline.length) { box.innerHTML = '<div class="empty" style="padding:14px;"><i class="fa-regular fa-keyboard"></i>No buttons yet.</div>'; return; }
        var html = '<div class="kb-wrap">';
        inline.forEach(function (row, ri) {
            html += '<div class="kb-rowchips"><span class="kb-rlabel">Row ' + (ri + 1) + '</span>';
            row.forEach(function (b, bi) {
                html += '<span class="kb-chip">' +
                    '<span class="lbl">' + esc(b.text) + '</span>' +
                    '<span class="typ">' + esc(b.type) + (b.value ? ' · ' + esc(b.value.slice(0, 16)) : '') + '</span>' +
                    '<button class="arw" onclick="' + prefix + 'MoveI(' + ri + ',' + bi + ',-1)" ' + (bi === 0 ? 'disabled' : '') + ' aria-label="Move left">&#171;</button>' +
                    '<button class="arw" onclick="' + prefix + 'MoveI(' + ri + ',' + bi + ',1)" ' + (bi === row.length - 1 ? 'disabled' : '') + ' aria-label="Move right">&#187;</button>' +
                    '<button class="arw" onclick="' + prefix + 'MoveIR(' + ri + ',-1)" ' + (ri === 0 ? 'disabled' : '') + ' aria-label="Move up">&#8593;</button>' +
                    '<button class="arw" onclick="' + prefix + 'MoveIR(' + ri + ',1)" ' + (ri === inline.length - 1 ? 'disabled' : '') + ' aria-label="Move down">&#8595;</button>' +
                    '<button class="arw del" onclick="' + prefix + 'DelI(' + ri + ',' + bi + ')" aria-label="Remove">&#10005;</button>' +
                    '</span>';
            });
            html += '</div>';
        });
        box.innerHTML = html + '</div>';
    }
    function renderReply() {
        var box = el('reply-list'); if (!box) return;
        if (!reply.rows.length) { box.innerHTML = '<div class="empty" style="padding:14px;"><i class="fa-regular fa-keyboard"></i>No reply buttons yet.</div>'; }
        else {
            var html = '<div class="kb-wrap">';
            reply.rows.forEach(function (row, ri) {
                html += '<div class="kb-rowchips"><span class="kb-rlabel">Row ' + (ri + 1) + '</span>';
                row.forEach(function (b, bi) {
                    var act = reply.actions[b.text] || '';
                    html += '<span class="kb-chip">' +
                        '<span class="lbl">' + esc(b.text) + '</span>' +
                        '<span class="typ" style="cursor:pointer;" onclick="' + prefix + 'SetAct(' + ri + ',' + bi + ')">' + esc(act || 'no action') + '</span>' +
                        '<button class="arw" onclick="' + prefix + 'MoveR(' + ri + ',' + bi + ',-1)" ' + (bi === 0 ? 'disabled' : '') + ' aria-label="Move left">&#171;</button>' +
                        '<button class="arw" onclick="' + prefix + 'MoveR(' + ri + ',' + bi + ',1)" ' + (bi === row.length - 1 ? 'disabled' : '') + ' aria-label="Move right">&#187;</button>' +
                        '<button class="arw" onclick="' + prefix + 'MoveRR(' + ri + ',-1)" ' + (ri === 0 ? 'disabled' : '') + ' aria-label="Move up">&#8593;</button>' +
                        '<button class="arw" onclick="' + prefix + 'MoveRR(' + ri + ',1)" ' + (ri === reply.rows.length - 1 ? 'disabled' : '') + ' aria-label="Move down">&#8595;</button>' +
                        '<button class="arw del" onclick="' + prefix + 'DelR(' + ri + ',' + bi + ')" aria-label="Remove">&#10005;</button>' +
                        '</span>';
                });
                html += '</div>';
            });
            box.innerHTML = html + '</div>';
        }
        renderPreview();
    }
    function renderPreview() {
        var pv = el('reply-preview'); if (!pv) return;
        if (!reply.rows.length) { pv.innerHTML = ''; return; }
        pv.innerHTML = reply.rows.map(function (row) {
            return '<div class="pvrow">' + row.map(function (b) { return '<span class="pvbtn">' + esc(b.text) + '</span>'; }).join('') + '</div>';
        }).join('');
    }
    function inlineAdd() {
        var lbl = el('inline-label').value.trim();
        var type = el('inline-type').value;
        var val = type === 'command' ? el('inline-cmd').value : el('inline-value').value.trim();
        if (!lbl) { toast('Enter a label.', 'error'); return; }
        if (!val) { toast('Choose a command or enter a value.', 'error'); return; }
        if (type === 'command' && val.charAt(0) !== '/') val = '/' + val;
        var last = inline.length ? inline[inline.length - 1] : null;
        if (!last || last.length >= 3) { last = []; inline.push(last); }
        last.push({ text: lbl, type: type, value: val });
        el('inline-label').value = ''; el('inline-value').value = ''; el('inline-cmd').value = '';
        renderInline();
    }
    function replyAdd() {
        var lbl = el('reply-label').value.trim();
        if (!lbl) { toast('Enter button text.', 'error'); return; }
        var act = el('reply-cmd').value || el('reply-value').value.trim();
        if (act && act.charAt(0) !== '/') act = '/' + act;
        var last = reply.rows.length ? reply.rows[reply.rows.length - 1] : null;
        if (!last || last.length >= 3) { last = []; reply.rows.push(last); }
        last.push({ text: lbl, command: '' });
        if (act) reply.actions[lbl] = act;
        el('reply-label').value = ''; el('reply-value').value = ''; el('reply-cmd').value = '';
        renderReply();
    }
    function setAct(ri, bi) {
        var b = reply.rows[ri][bi];
        var cur = reply.actions[b.text] || '';
        var v = prompt('Command for "' + b.text + '" (e.g. /menu):', cur);
        if (v === null) return;
        v = v.trim();
        if (v) reply.actions[b.text] = v.charAt(0) === '/' ? v : '/' + v;
        else delete reply.actions[b.text];
        renderReply();
    }
    function moveI(ri, bi, d) { var row = inline[ri]; var j = bi + d; if (j < 0 || j >= row.length) return; var t = row.splice(bi, 1)[0]; row.splice(j, 0, t); renderInline(); }
    function moveIR(ri, d) { var j = ri + d; if (j < 0 || j >= inline.length) return; var t = inline.splice(ri, 1)[0]; inline.splice(j, 0, t); renderInline(); }
    function delI(ri, bi) { inline[ri].splice(bi, 1); if (!inline[ri].length) inline.splice(ri, 1); renderInline(); }
    function moveR(ri, bi, d) { var row = reply.rows[ri]; var j = bi + d; if (j < 0 || j >= row.length) return; var t = row.splice(bi, 1)[0]; row.splice(j, 0, t); renderReply(); }
    function moveRR(ri, d) { var j = ri + d; if (j < 0 || j >= reply.rows.length) return; var t = reply.rows.splice(ri, 1)[0]; reply.rows.splice(j, 0, t); renderReply(); }
    function delR(ri, bi) { var t = reply.rows[ri].splice(bi, 1)[0]; delete reply.actions[t.text]; if (!reply.rows[ri].length) reply.rows.splice(ri, 1); renderReply(); }
    function loadInline(raw) {
        inline = [];
        if (raw) {
            try {
                var o = typeof raw === 'string' ? JSON.parse(raw) : raw;
                if (o.v === 2 && o.inline) inline = o.inline.map(function (r) { return r.map(function (b) { return { text: b.text, type: b.type || 'callback', value: b.value || '' }; }); });
                else if (o.inline_keyboard) inline = o.inline_keyboard.map(function (r) { return r.map(function (b) { return { text: b.text, type: b.url ? 'url' : 'command', value: b.url || b.callback_data || '' }; }); });
            } catch (e) {}
        }
        renderInline();
    }
    function loadReply(raw) {
        reply = { rows: [], actions: {}, resize: true, one_time: false, persistent: true, placeholder: '' };
        if (raw) {
            try {
                var o = typeof raw === 'string' ? JSON.parse(raw) : raw;
                var rep = (o.v === 2 && o.reply) ? o.reply : (o.keyboard ? { rows: o.keyboard, actions: {}, resize: o.resize_keyboard, one_time: o.one_time_keyboard, persistent: o.is_persistent, placeholder: o.input_field_placeholder } : o);
                if (rep && rep.rows) {
                    reply.rows = rep.rows.map(function (r) { return (Array.isArray(r) ? r : [r]).map(function (b) { return { text: typeof b === 'string' ? b : b.text, command: typeof b === 'object' ? (b.command || '') : '' }; }); });
                    reply.actions = rep.actions || {};
                    if (typeof rep.resize === 'boolean') reply.resize = rep.resize;
                    if (typeof rep.one_time === 'boolean') reply.one_time = rep.one_time;
                    if (typeof rep.persistent === 'boolean') reply.persistent = rep.persistent;
                    reply.placeholder = rep.placeholder || '';
                }
            } catch (e) {}
        }
        renderReply();
    }
    function inlineJSON() { return inline.length ? { v: 2, inline: inline } : null; }
    function replyJSON() {
        if (!reply.rows.length) return null;
        return { v: 2, reply: { rows: reply.rows, actions: reply.actions, resize: reply.resize, one_time: reply.one_time, persistent: reply.persistent, placeholder: reply.placeholder } };
    }
    function reset() { inline = []; reply = { rows: [], actions: {}, resize: true, one_time: false, persistent: true, placeholder: '' }; renderInline(); renderReply(); }
    function populateCommands() {
        ['inline-cmd', 'reply-cmd'].forEach(function (id) {
            var sel = el(id); if (!sel) return;
            var cur = sel.value;
            sel.innerHTML = '<option value="">' + (id === 'inline-cmd' ? 'Select…' : 'Run command…') + '</option>';
            commands.forEach(function (c) { var o = document.createElement('option'); o.value = c.command; o.textContent = c.command; sel.appendChild(o); });
            if (cur) sel.value = cur;
        });
    }
    function syncSettings() {
        if (el('reply-resize')) reply.resize = el('reply-resize').checked;
        if (el('reply-onetime')) reply.one_time = el('reply-onetime').checked;
        if (el('reply-persistent')) reply.persistent = el('reply-persistent').checked;
        if (el('reply-placeholder')) reply.placeholder = el('reply-placeholder').value;
    }
    var api = { inlineAdd: inlineAdd, replyAdd: replyAdd, loadInline: loadInline, loadReply: loadReply, inlineJSON: inlineJSON, replyJSON: replyJSON, reset: reset, render: renderReply, populateCommands: populateCommands, syncSettings: syncSettings };
    window[prefix + 'MoveI'] = moveI; window[prefix + 'MoveIR'] = moveIR; window[prefix + 'DelI'] = delI;
    window[prefix + 'MoveR'] = moveR; window[prefix + 'MoveRR'] = moveRR; window[prefix + 'DelR'] = delR;
    window[prefix + 'SetAct'] = setAct;
    return api;
}
var kbCmd = createKeyboardBuilder('kbCmd');
var kbMe = createKeyboardBuilder('kbMe');
function kbInlineTypeToggle(prefix) {
    var type = $(prefix + '-inline-type').value;
    show($(prefix + '-inline-cmd'), type === 'command');
    show($(prefix + '-inline-value'), type !== 'command');
    if (type !== 'command') $(prefix + '-inline-value').placeholder = type === 'url' ? 'https://…' : 'Callback data';
}
function kbSettingChanged(prefix) {
    var kb = { kbCmd: kbCmd, kbMe: kbMe }[prefix];
    if (kb) kb.syncSettings();
}

/* ============================================================
   PERMISSIONS
   ============================================================ */
var PERM_LABELS = {
    mcp_telegram: { label: 'MCP command in Telegram', sub: 'Whether non-admins can trigger a /mcp featured command in chats.' },
    mcp_ai: { label: 'AI can call MCP tools', sub: 'Whether the main AI is allowed to invoke MCP tools while replying.' },
    ai_chat: { label: 'AI replies to users', sub: 'Whether non-admins get AI replies in DMs and groups.' },
    commands: { label: 'Bot commands', sub: 'Whether non-admins can run regular bot commands. Per-command "admin only" still applies.' },
    featured_commands: { label: 'Featured commands', sub: 'Whether non-admins can use DM / Buttons / MCP featured commands.' },
    start_command: { label: 'Start command', sub: 'Whether non-admins can use /start. Usually Everyone.' },
    rules_command: { label: '/rules in groups', sub: 'Whether non-admins can read a group\\'s rules via /rules.' },
    callback_queries: { label: 'Inline button taps', sub: 'Whether non-admins can tap inline or reply buttons on messages.' }
};
var permState = {};
async function loadPermissions(force) {
    try {
        var d = await api('GET', '/api/permissions');
        permState = d.permissions || {};
        renderPermissions();
        loadAdmins();
    } catch (e) { toast(e.message, 'error'); }
}
function renderPermissions() {
    var box = $('perm-list');
    if (!box) return;
    box.innerHTML = Object.keys(PERM_LABELS).map(function (k) {
        var meta = PERM_LABELS[k];
        var val = permState[k] || 'everyone';
        return '<div class="switch-row" style="margin-bottom:10px;">' +
            '<div style="flex:1"><div class="sw-label">' + esc(meta.label) + '</div><div class="sw-sub">' + esc(meta.sub) + '</div></div>' +
            '<div class="segmented" data-perm="' + k + '">' +
            '<button data-v="everyone" class="' + (val === 'everyone' ? 'active' : '') + '" onclick="setPerm(\\\'' + k + '\\\',\\\'everyone\\\',this)">Everyone</button>' +
            '<button data-v="admin" class="' + (val === 'admin' ? 'active' : '') + '" onclick="setPerm(\\\'' + k + '\\\',\\\'admin\\\',this)">Admin only</button>' +
            '</div>' +
        '</div>';
    }).join('');
}
function setPerm(key, val, btn) {
    permState[key] = val;
    btn.parentNode.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b === btn); });
}
async function savePermissions() {
    try {
        await api('POST', '/api/permissions', { permissions: permState });
        toast('Permissions saved.');
    } catch (e) { toast(e.message, 'error'); }
}
async function loadAdmins() {
    var box = $('admins-list');
    if (!box) return;
    box.innerHTML = '<div class="spinner-page"><span class="mini-spinner"></span></div>';
    try {
        var d = await api('GET', '/api/admins');
        var admins = d.admins || [];
        if (!admins.length) { box.innerHTML = '<div class="muted small">No admins yet. Promote a user above.</div>'; return; }
        box.innerHTML = '<div class="list">' + admins.map(function (a) {
            return '<div class="list-row">' +
                userCircle({ private_started: 1, first_name: a.first_name || '?', username: a.username || '' }) +
                '<div class="lr-main"><div class="lr-title">' + esc(a.first_name || 'Admin') + (a.username ? ' <span class="muted">@' + esc(a.username) + '</span>' : '') + '</div>' +
                '<div class="lr-sub">ID ' + esc(a.id) + ' · last active ' + fmtTime(a.last_active) + '</div></div>' +
                '<button class="btn btn-gray btn-sm" onclick="demoteAdmin(' + a.id + ')"><i class="fa-solid fa-user-minus"></i> Demote</button>' +
            '</div>';
        }).join('') + '</div>';
    } catch (e) { box.innerHTML = errorState(e.message, 'loadAdmins()'); }
}
async function promoteAdmin() {
    var id = parseInt($('promote-user-id').value);
    if (!id) { toast('Enter a numeric user ID.', 'error'); return; }
    try {
        await api('POST', '/api/admins/promote', { userId: id });
        toast('User promoted to admin.');
        $('promote-user-id').value = '';
        loadAdmins();
    } catch (e) { toast(e.message, 'error'); }
}
async function demoteAdmin(userId) {
    var ok = await confirmDialog('Demote this user from admin?', 'Demote admin');
    if (!ok) return;
    try {
        await api('POST', '/api/admins/demote', { userId: userId });
        toast('User demoted.');
        loadAdmins();
    } catch (e) { toast(e.message, 'error'); }
}

/* ============================================================
   AI
   ============================================================ */
var aiEnabled = false;
var kbs = [];
var alts = [];
var sqs = [];
var pgHistory = [];
function toggleAiEnabled() { aiEnabled = toggleSwitch('ai-enable'); }
async function loadAi(force) {
    try { var d = await api('GET', '/api/ai_settings'); renderAi(d.settings || {}); }
    catch (e) { toast(e.message, 'error'); }
}
function renderAi(s) {
    aiEnabled = s.ai_enabled === '1';
    toggleSwitch('ai-enable', aiEnabled);
    $('ai-provider').value = s.ai_provider || 'openai';
    $('ai-key').value = '';
    $('ai-key').placeholder = s.ai_api_key_set ? (s.ai_api_key_masked + '  (unchanged — type to replace)') : 'sk-… paste your API key here';
    $('ai-model').value = s.ai_model || '';
    $('ai-base').value = s.ai_base_url || '';
    $('ai-headers').value = s.ai_custom_headers || '';
    $('ai-name').value = s.ai_display_name || '';
    $('ai-lang').value = s.ai_language || 'auto';
    $('ai-style').value = s.ai_style || 'friendly';
    $('ai-length').value = s.ai_length || 'medium';
    $('ai-temp').value = s.ai_temperature || '0.7';
    $('ai-maxtok').value = s.ai_max_tokens || '1024';
    $('ai-topp').value = s.ai_top_p || '1.0';
    $('ai-fallback').value = s.ai_fallback || '';
    $('ai-prompt').value = s.ai_system_prompt || '';
    $('ai-vars').value = s.ai_custom_vars_text || '';
    $('ai-trigger').value = s.ai_trigger || 'no_command';
    $('ai-trigger-text').value = s.ai_trigger_text || '';
    $('ai-prefixes').value = s.ai_ignore_prefixes || '/, !, #';
    $('ai-ignore-bots').value = s.ai_ignore_bots || '1';
    $('ai-ignore-fwd').value = s.ai_ignore_forwarded || '1';
    $('ai-private').value = s.ai_private_reply || '1';
    $('ai-memory').value = s.ai_memory || '0';
    $('ai-group').value = s.ai_group_reply || '1';
    $('ai-mention').value = s.ai_group_mention || '1';
    $('ai-gmemory').value = s.ai_group_memory || '0';
    $('ai-rate').value = s.ai_rate_limit || '10';
    $('ai-grate').value = s.ai_global_rate_limit || '0';
    $('ai-gwindow').value = s.ai_global_rate_window || 'minute';
    $('ai-delay').value = s.ai_response_delay || '0';
    toggleSwitch('ai-typing', s.ai_typing_indicator === '1');
    toggleSwitch('ai-retry', s.ai_retry_on_failure === '1');
    toggleSwitch('ai-stream', s.ai_streaming === '1');
    toggleSwitch('ai-strict', s.ai_strict_mode === '1');
    toggleSwitch('ai-rtl', s.ai_rtl_support === '1');
    toggleSwitch('ai-suggest', s.ai_suggested_questions_enabled === '1');
    toggleSwitch('ai-sq-once', s.ai_suggested_one_time !== '0');
    const toolsOn = s.ai_use_mcp_tools === '1';
    toggleSwitch('ai-use-mcp-tools', toolsOn);
    const promptModeSel = $('ai-mcp-prompt-mode');
    if (promptModeSel) {
        promptModeSel.value = s.ai_mcp_prompt_mode || 'auto';
        promptModeSel.disabled = !toolsOn;
    }
    if ($('ai-mcp-categories')) {
        $('ai-mcp-categories').value = s.ai_mcp_categories || '';
        $('ai-mcp-categories').disabled = !toolsOn;
    }
    const streamBtn = $('ai-stream');
    if (streamBtn) {
        streamBtn.disabled = toolsOn;
        streamBtn.title = toolsOn ? 'Disabled — MCP tools are enabled' : '';
        if (toolsOn) streamBtn.classList.remove('on');
    }
    try { kbs = JSON.parse(s.ai_knowledge_bases || '[]'); } catch (e) { kbs = []; }
    renderKbs();
    try { alts = JSON.parse(s.ai_alt_providers || '[]'); } catch (e) { alts = []; }
    renderAlts();
    try { sqs = JSON.parse(s.ai_suggested_questions || '[]'); } catch (e) { sqs = []; }
    renderSqs();
    onProviderChange(); onTriggerChange();
    if (s.ai_api_key_set && s.ai_api_key_masked) {
        $('ai-key-hint').innerHTML = '<i class="fa-solid fa-circle-check" style="color:var(--green)"></i> A key is saved (' + esc(s.ai_api_key_masked) + '). Leave the field empty to keep it.';
    }
}
function onProviderChange() {
    var p = $('ai-provider').value;
    show($('ai-base-wrap'), p === 'custom');
    var defs = { openai: 'gpt-4o-mini', gemini: 'gemini-2.0-flash', deepseek: 'deepseek-chat', groq: 'llama-3.3-70b-versatile', openrouter: 'openai/gpt-4o-mini', ollama: 'llama3' };
    if (defs[p] && !$('ai-model').value) $('ai-model').value = defs[p];
    var urls = {
        openai: { url: 'https://platform.openai.com/api-keys', name: 'OpenAI' },
        gemini: { url: 'https://aistudio.google.com/app/apikey', name: 'Google AI Studio' },
        deepseek: { url: 'https://platform.deepseek.com/api_keys', name: 'DeepSeek' },
        groq: { url: 'https://console.groq.com/keys', name: 'Groq Console' },
        openrouter: { url: 'https://openrouter.ai/keys', name: 'OpenRouter' },
        ollama: { url: 'https://ollama.com/', name: 'Ollama' },
        custom: { url: '', name: 'your provider' }
    };
    var u = urls[p];
    if (u && u.url) $('ai-provider-hint').innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Get your key from <a href="' + u.url + '" target="_blank" rel="noopener">' + u.name + '</a>';
    else $('ai-provider-hint').innerHTML = '';
    if (defs[p]) $('ai-model-hint').textContent = 'Recommended: ' + defs[p];
}
function onTriggerChange() { show($('ai-trigger-text-wrap'), $('ai-trigger').value === 'contains_text'); }
document.addEventListener('change', function (e) { if (e.target && e.target.id === 'ai-trigger') onTriggerChange(); });
function renderKbs() {
    var box = $('kb-list');
    if (!kbs.length) { box.innerHTML = '<div class="empty" style="padding:14px;">No knowledge bases yet.</div>'; return; }
    box.innerHTML = kbs.map(function (kb, i) {
        return '<div class="card compact" style="margin-bottom:10px;box-shadow:none;">' +
            '<div class="row" style="margin-bottom:8px;">' +
            '<button class="switch ' + (kb.enabled !== false ? 'on' : '') + '" onclick="toggleKb(' + i + ')" title="Enable" aria-label="Toggle"></button>' +
            '<input class="input" value="' + esc(kb.label || '') + '" placeholder="Label (e.g. FAQ)" oninput="kbs[' + i + '].label=this.value" style="flex:1;">' +
            '<button class="icon-btn danger" onclick="delKb(' + i + ')" aria-label="Remove"><i class="fa-regular fa-trash-can"></i></button></div>' +
            '<textarea class="textarea" rows="4" placeholder="Paste your facts, documentation, FAQ…" oninput="kbs[' + i + '].content=this.value">' + esc(kb.content || '') + '</textarea></div>';
    }).join('');
}
function addKb() { kbs.push({ enabled: true, label: '', content: '' }); renderKbs(); }
function delKb(i) { kbs.splice(i, 1); renderKbs(); }
function toggleKb(i) { kbs[i].enabled = kbs[i].enabled === false; renderKbs(); }
function renderAlts() {
    var box = $('ai-alts');
    if (!alts.length) { box.innerHTML = ''; return; }
    box.innerHTML = alts.map(function (a, i) {
        var keyPlaceholder = a.apiKeyMasked ? (a.apiKeyMasked + '  (unchanged)') : 'API key';
        var keyVal = a.apiKey && a.apiKey !== KEEP_SENTINEL ? a.apiKey : '';
        return '<div class="card compact" style="margin-bottom:10px;box-shadow:none;">' +
            '<div class="row" style="margin-bottom:8px;"><strong class="small">Fallback ' + (i + 1) + '</strong>' +
            '<div style="flex:1"></div><button class="icon-btn danger" onclick="delAlt(' + i + ')" aria-label="Remove"><i class="fa-regular fa-trash-can"></i></button></div>' +
            '<div class="grid grid-2">' +
            '<select class="input" onchange="alts[' + i + '].provider=this.value">' + ['openai', 'gemini', 'deepseek', 'groq', 'openrouter', 'ollama'].map(function (p) { return '<option value="' + p + '"' + (a.provider === p ? ' selected' : '') + '>' + p + '</option>'; }).join('') + '</select>' +
            '<input class="input" type="password" value="' + esc(keyVal) + '" placeholder="' + esc(keyPlaceholder) + '" oninput="alts[' + i + '].apiKey=this.value">' +
            '<input class="input" value="' + esc(a.model || '') + '" placeholder="Model" oninput="alts[' + i + '].model=this.value">' +
            '</div></div>';
    }).join('');
    var btn = $('add-alt-provider-btn');
    if (btn) btn.disabled = alts.length >= 5;
}
function addAltProvider() {
    if (alts.length >= 5) { toast('Maximum 5 fallback providers allowed.', 'error'); return; }
    alts.push({ provider: 'openai', apiKey: '', model: 'gpt-4o-mini' });
    renderAlts();
}
function delAlt(i) { alts.splice(i, 1); renderAlts(); }
function renderSqs() {
    var box = $('sq-list');
    if (!sqs.length) { box.innerHTML = '<div class="empty" style="padding:12px;">No quick replies yet.</div>'; return; }
    box.innerHTML = sqs.map(function (q, i) {
        return '<div class="kb-chip" style="width:100%;justify-content:space-between;margin-bottom:6px;">' +
            '<span>' + esc(q.label) + ' <span class="muted">→ ' + esc(q.value) + '</span></span>' +
            '<button class="arw del" onclick="sqs.splice(' + i + ',1);renderSqs();" aria-label="Remove">&#10005;</button></div>';
    }).join('');
}
function addSq() {
    var l = $('sq-label').value.trim(), v = $('sq-value').value.trim();
    if (!l || !v) { toast('Both fields are required.', 'error'); return; }
    sqs.push({ label: l, value: v }); $('sq-label').value = ''; $('sq-value').value = ''; renderSqs();
}
function collectAi() {
    var keyVal = $('ai-key').value.trim();
    var altsClean = alts.map(function (a) { var c = Object.assign({}, a); if (!c.apiKey) c.apiKey = KEEP_SENTINEL; return c; });
    return {
        ai_enabled: aiEnabled ? '1' : '0',
        ai_provider: $('ai-provider').value, ai_api_key: keyVal || KEEP_SENTINEL,
        ai_model: $('ai-model').value.trim(), ai_base_url: $('ai-base').value.trim(),
        ai_custom_headers: $('ai-headers').value.trim(), ai_alt_providers: JSON.stringify(altsClean),
        ai_display_name: $('ai-name').value.trim(), ai_language: $('ai-lang').value,
        ai_style: $('ai-style').value, ai_length: $('ai-length').value,
        ai_temperature: $('ai-temp').value, ai_max_tokens: $('ai-maxtok').value, ai_top_p: $('ai-topp').value,
        ai_fallback: $('ai-fallback').value.trim(), ai_system_prompt: $('ai-prompt').value.trim(),
        ai_knowledge_bases: JSON.stringify(kbs), ai_custom_vars_text: $('ai-vars').value.trim(),
        ai_trigger: $('ai-trigger').value, ai_trigger_text: $('ai-trigger-text').value.trim(),
        ai_ignore_prefixes: $('ai-prefixes').value.trim(),
        ai_ignore_bots: $('ai-ignore-bots').value, ai_ignore_forwarded: $('ai-ignore-fwd').value,
        ai_private_reply: $('ai-private').value, ai_memory: $('ai-memory').value,
        ai_group_reply: $('ai-group').value, ai_group_mention: $('ai-mention').value, ai_group_memory: $('ai-gmemory').value,
        ai_rate_limit: $('ai-rate').value, ai_global_rate_limit: $('ai-grate').value,
        ai_global_rate_window: $('ai-gwindow').value, ai_response_delay: $('ai-delay').value,
        ai_typing_indicator: sw('ai-typing') ? '1' : '0', ai_retry_on_failure: sw('ai-retry') ? '1' : '0',
        ai_streaming: sw('ai-stream') ? '1' : '0', ai_strict_mode: sw('ai-strict') ? '1' : '0',
        ai_rtl_support: sw('ai-rtl') ? '1' : '0',
        ai_suggested_questions_enabled: sw('ai-suggest') ? '1' : '0',
        ai_suggested_one_time: sw('ai-sq-once') ? '1' : '0',
        ai_suggested_questions: JSON.stringify(sqs),
        ai_use_mcp_tools: sw('ai-use-mcp-tools') ? '1' : '0',
        ai_mcp_prompt_mode: $('ai-mcp-prompt-mode').value || 'auto',
        ai_mcp_categories: $('ai-mcp-categories').value || ''
    };
}
function toggleAiUseMcp() {
    const on = toggleSwitch('ai-use-mcp-tools');
    if ($('ai-mcp-categories')) $('ai-mcp-categories').disabled = !on;
    if ($('ai-mcp-prompt-mode')) $('ai-mcp-prompt-mode').disabled = !on;
    const streamBtn = $('ai-stream');
    if (streamBtn) {
        streamBtn.disabled = on;
        streamBtn.title = on ? 'Disabled — MCP tools are enabled' : '';
        if (on) streamBtn.classList.remove('on');
    }
    if (on) toast('Streaming is disabled while tools are on.', 'info');
}
async function saveAi() {
    try { await api('POST', '/api/ai_settings', collectAi()); toast('AI settings saved.'); refreshMemoryCount(); loadAi(true); }
    catch (e) { toast(e.message, 'error'); }
}
async function testAi() {
    $('ai-test-result').innerHTML = '<span class="mini-spinner"></span> Testing connection…';
    try {
        var d = await api('POST', '/api/ai/test', { settings: collectAi(), provider: 'main' });
        if (d.success) $('ai-test-result').innerHTML = '<span style="color:var(--green)"><i class="fa-solid fa-circle-check"></i> Connected successfully — your API key works.</span>';
        else $('ai-test-result').innerHTML = '<span style="color:var(--red)"><i class="fa-solid fa-circle-xmark"></i> ' + esc(d.error || 'Test failed') + '</span>';
    } catch (e) { $('ai-test-result').innerHTML = '<span style="color:var(--red)"><i class="fa-solid fa-circle-xmark"></i> ' + esc(e.message) + '</span>'; }
}
async function refreshMemoryCount() {
    try { var d = await api('GET', '/api/ai/memory_count'); $('mem-count').textContent = d.count + ' messages'; }
    catch (e) { $('mem-count').textContent = '—'; }
}
function renderPgHtml(text) {
    var parts = String(text || '').split('\`\`\`');
    var out = '';
    for (var i = 0; i < parts.length; i++) {
        if (i % 2 === 1) out += '<pre><code>' + esc(parts[i]) + '</code></pre>';
        else {
            var t = esc(parts[i]);
            t = t.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
            t = t.replace(/&lt;(\\/?)(b|strong|i|em|u|s|code|blockquote|a[^&]*?)&gt;/g, function (m) { return m.replace(/&lt;/g, '<').replace(/&gt;/g, '>'); });
            out += t;
        }
    }
    return out;
}
async function sendPlayground() {
    var text = $('pg-input').value.trim(); if (!text) return;
    var box = $('pg');
    if (box.querySelector('.empty')) box.innerHTML = '';
    box.insertAdjacentHTML('beforeend', '<div class="pg-msg user" dir="auto">' + esc(text) + '</div>');
    $('pg-input').value = '';
    var id = 'pg-' + Date.now();
    box.insertAdjacentHTML('beforeend', '<div class="pg-msg bot" id="' + id + '"><span class="mini-spinner"></span></div>');
    scrollBottom(box);
    try {
        var d = await api('POST', '/api/ai/playground', { settings: collectAi(), history: pgHistory, message: text });
        $(id).innerHTML = renderPgHtml(d.response || '');
        pgHistory.push({ role: 'user', content: text }, { role: 'assistant', content: d.response });
    } catch (e) { $(id).innerHTML = '<span style="color:var(--red)">' + esc(e.message) + '</span>'; }
    scrollBottom(box);
}
function clearPlayground() { pgHistory = []; $('pg').innerHTML = '<div class="empty">Playground cleared.</div>'; }
function exportAi() { downloadJson('nyxx-ai-settings.json', collectAi()); }
function importAi(ev) {
    var f = ev.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () { try { renderAi(JSON.parse(r.result)); toast('Imported — press Save to apply.'); } catch (e) { toast('Invalid JSON.', 'error'); } ev.target.value = ''; };
    r.readAsText(f);
}
async function clearAllAiMemory() {
    var ok = await confirmDialog('Clear every stored AI conversation?', 'Clear AI memory');
    if (!ok) return;
    await api('POST', '/api/ai/clear_memory'); toast('AI memory cleared.'); refreshMemoryCount();
}
async function resetAi() {
    var ok = await confirmDialog('Reset all AI settings to defaults?', 'Reset AI');
    if (!ok) return;
    await api('POST', '/api/ai/reset'); toast('AI settings reset.'); loadAi(true);
}
function applyTemplate() {
    var t = $('ai-template').value;
    var p = {
        assistant: 'You are {{bot_name}}, a helpful assistant. Answer clearly and accurately, and say so when you are unsure.',
        support: 'You are a support agent for {{company_name}}. Help customers politely and accurately using the information you have.',
        restaurant: 'You are the assistant for {{company_name}} restaurant. Help with the menu, hours, reservations and policies.',
        programming: 'You are a programming assistant. Explain concepts, debug code and suggest practical solutions.',
        school: 'You are a patient tutor. Explain step by step, use examples and check understanding.'
    };
    if (p[t]) $('ai-prompt').value = p[t];
}

/* ============================================================
   SETTINGS / BOT INFO / CRON / BACKUP / LOGS / UPDATE
   ============================================================ */
async function loadSettings(force) {
    try {
        var d = await api('GET', '/api/settings');
        $('set-token').value = d.bot_token_masked || '';
        $('set-token').type = 'password';
        $('set-hook').value = d.webhook_url || '';
        window.__botTokenSet = d.bot_token_set;
        if (d.cf_token_set) $('up-token').placeholder = 'Token already stored — click Generate to replace';
    } catch (e) { /* silent */ }
}
async function revealToken() {
    if (!window.__botTokenSet) { toast('No bot token stored yet.', 'error'); return; }
    try {
        var d = await api('POST', '/api/settings/reveal_bot_token', {});
        $('set-token').value = d.token; $('set-token').type = 'text';
        toast('Token revealed — this action has been logged.', 'info');
    } catch (e) { toast(e.message, 'error'); }
}
function copyVal(id) { navigator.clipboard.writeText($(id).value); toast('Copied.'); }
function changeToken() { $('token-modal').classList.remove('hidden'); $('token-input').value = ''; $('token-result').innerHTML = ''; trackModal('token-modal'); }
async function saveToken() {
    var newTok = $('token-input').value.trim();
    if (!newTok) { $('token-result').innerHTML = '<span style="color:var(--red)">Please paste a token first.</span>'; return; }
    $('token-result').innerHTML = '<span class="mini-spinner"></span> Validating…';
    try {
        var d = await api('POST', '/api/settings/token', { botToken: newTok });
        toast(d.warning ? d.warning : 'Token updated.', d.warning ? 'error' : 'success');
        $('token-modal').classList.add('hidden'); untrackModal('token-modal'); loadSettings(true);
    } catch (e) { $('token-result').innerHTML = '<span style="color:var(--red)">' + esc(e.message) + '</span>'; }
}
async function testHook() {
    $('hook-result').innerHTML = '<span class="mini-spinner"></span> Testing…';
    try {
        var d = await api('POST', '/api/settings/webhook-test');
        if (d.url_matches) $('hook-result').innerHTML = '<span style="color:var(--green)"><i class="fa-solid fa-circle-check"></i> Webhook is healthy: ' + esc(d.url) + '</span>';
        else if (d.url) $('hook-result').innerHTML = '<span style="color:var(--orange)"><i class="fa-solid fa-triangle-exclamation"></i> Webhook points elsewhere: ' + esc(d.url) + '</span>';
        else $('hook-result').innerHTML = '<span style="color:var(--orange)"><i class="fa-solid fa-triangle-exclamation"></i> No webhook registered. Click Health check to fix.</span>';
    } catch (e) { $('hook-result').innerHTML = '<span style="color:var(--red)">' + esc(e.message) + '</span>'; }
}
async function fixHook() {
    $('hook-result').innerHTML = '<span class="mini-spinner"></span> Checking…';
    try {
        var d = await api('POST', '/api/settings/webhook-fix');
        if (d.fixed) $('hook-result').innerHTML = '<span style="color:var(--green)"><i class="fa-solid fa-circle-check"></i> Webhook re-registered: ' + esc(d.url) + '</span>';
        else $('hook-result').innerHTML = '<span style="color:var(--green)"><i class="fa-solid fa-circle-check"></i> Webhook is already healthy.</span>';
    } catch (e) { $('hook-result').innerHTML = '<span style="color:var(--red)">' + esc(e.message) + '</span>'; }
}
async function changePassword() {
    $('pw-result').innerHTML = '';
    if ($('pw1').value !== $('pw2').value) { $('pw-result').innerHTML = '<span style="color:var(--red)">Passwords do not match.</span>'; return; }
    if ($('pw1').value.length < 6) { $('pw-result').innerHTML = '<span style="color:var(--red)">Password must be at least 6 characters.</span>'; return; }
    $('pw-result').innerHTML = '<span class="mini-spinner"></span> Updating…';
    try {
        await api('POST', '/api/change_password', { newPassword: $('pw1').value });
        $('pw-result').innerHTML = '<span style="color:var(--green)"><i class="fa-solid fa-circle-check"></i> Password updated.</span>';
        $('pw1').value = ''; $('pw2').value = '';
    } catch (e) { $('pw-result').innerHTML = '<span style="color:var(--red)">' + esc(e.message) + '</span>'; }
}
async function factoryReset() {
    var ok = await confirmDialog('This permanently deletes everything. Type FACTORY RESET to confirm.', 'Factory reset', true,
        '<input class="input" id="fr-text" placeholder="FACTORY RESET" style="margin-top:10px;">');
    if (!ok) return;
    var t = $('fr-text');
    if (!t || t.value !== 'FACTORY RESET') { toast('Confirmation text did not match.', 'error'); return; }
    try { await api('POST', '/api/reset', { confirmation: 'FACTORY RESET' }); toast('Reset complete — reloading…'); setTimeout(function () { location.reload(); }, 1200); }
    catch (e) { toast(e.message, 'error'); }
}
async function loadBotInfo(force) {
    try {
        var d = await api('GET', '/api/bot_info');
        $('bi-name').value = d.name || ''; $('bi-desc').value = d.description || ''; $('bi-short').value = d.short_description || '';
        $('bi-result').innerHTML = '<span style="color:var(--green)">Loaded from Telegram.</span>';
    } catch (e) { $('bi-result').innerHTML = '<span style="color:var(--red)">' + esc(e.message) + '</span>'; }
}
async function publishBotInfo() {
    try {
        await api('POST', '/api/bot_info', { name: $('bi-name').value, description: $('bi-desc').value, short_description: $('bi-short').value });
        $('bi-result').innerHTML = '<span style="color:var(--green)">Published.</span>';
    } catch (e) { $('bi-result').innerHTML = '<span style="color:var(--red)">' + esc(e.message) + '</span>'; }
}
var CRON_FIELDS = [
    ['cron_sessions_days', 'Dashboard login sessions', 'days'],
    ['cron_bot_sessions_days', 'Bot conversation sessions', 'days'],
    ['cron_login_attempts_hours', 'Login attempt records', 'hours'],
    ['cron_rate_limits_hours', 'Rate-limit buckets', 'hours'],
    ['cron_logs_days', 'Activity log entries', 'days'],
    ['cron_ai_messages_days', 'AI memory', 'days (0 = keep forever)'],
    ['cron_dm_messages_days', 'Direct messages', 'days (0 = keep forever)'],
    ['cron_broadcast_days', 'Broadcast history', 'days (0 = keep forever)'],
    ['cron_inactive_users_days', 'Inactive users', 'days (0 = never delete)']
];
async function loadCron() {
    var box = $('cron-rows');
    box.innerHTML = CRON_FIELDS.map(function (f) {
        return '<div class="row nowrap" style="margin-bottom:10px;"><div style="flex:1;"><div class="small" style="font-weight:600;">' + f[1] + '</div><div class="tiny muted">' + f[2] + '</div></div>' +
            '<input type="number" class="input" id="cf-' + f[0] + '" style="max-width:130px;" min="' + (f[2].indexOf('0 =') >= 0 ? 0 : 1) + '"></div>';
    }).join('');
    try {
        var d = await api('GET', '/api/cron');
        toggleSwitch('cron-enable', d.settings.cron_enabled === '1');
        CRON_FIELDS.forEach(function (f) { var el = $('cf-' + f[0]); if (el && d.settings[f[0]] !== undefined) el.value = d.settings[f[0]]; });
        $('cron-last').textContent = d.last_run ? 'Last run: ' + d.last_run.at : 'Never run yet.';
    } catch (e) {}
}
async function toggleCronEnabled() {
    var turningOn = !sw('cron-enable');
    if (turningOn) {
        var ok = await confirmDialog('Automatic cleanup will permanently delete old data on the schedule below. There is no undo. Continue?', 'Enable cleanup?');
        if (!ok) return;
    }
    toggleSwitch('cron-enable', turningOn);
}
async function saveCron() {
    var body = { cron_enabled: sw('cron-enable') ? '1' : '0' };
    CRON_FIELDS.forEach(function (f) { var n = parseInt($('cf-' + f[0]).value); if (!isNaN(n)) body[f[0]] = n; });
    try { await api('POST', '/api/cron', body); toast('Cleanup settings saved.'); loadCron(); }
    catch (e) { toast(e.message, 'error'); }
}
async function runCron() {
    try { var r = await api('POST', '/api/cron/run'); if (r && r.skipped) toast(r.message, 'error'); else { toast('Cleanup run complete.'); loadCron(); } }
    catch (e) { toast(e.message, 'error'); }
}
async function exportBackup() {
    try { var d = await api('GET', '/api/backup'); downloadJson('nyxx-backup-' + stamp() + '.json', d.data); }
    catch (e) { toast(e.message, 'error'); }
}
const BACKUP_ITEMS = [
    { id: 'commands', title: 'Commands', sub: 'Bot commands and replies' },
    { id: 'featured', title: 'Featured commands', sub: 'DM commands and Buttons commands' },
    { id: 'users', title: 'Users', sub: 'User profiles and roles' },
    { id: 'groups', title: 'Groups', sub: 'Group settings and metadata' },
    { id: 'ai_messages', title: 'AI memory', sub: 'Every stored AI conversation' },
    { id: 'dm_messages', title: 'Direct messages', sub: 'Private chat history with your users' },
    { id: 'ai_settings', title: 'AI settings', sub: 'Providers, prompts, model choices' },
    { id: 'menu_commands', title: 'Telegram menu', sub: 'Menu button entries' },
    { id: 'bot_config', title: 'Bot config', sub: 'Name, username, webhook URL (not the token)' },
    { id: 'blocked_users', title: 'Block list', sub: 'Users you blocked' },
    { id: 'broadcast_history', title: 'Broadcast history', sub: 'Past broadcast messages' }
];
function openCustomBackup() {
    var box = $('custom-backup-list');
    box.innerHTML = BACKUP_ITEMS.map(function (it) {
        return '<label class="backup-item"><input type="checkbox" class="backup-cb" value="' + it.id + '" checked><div><div class="bi-title">' + it.title + '</div><div class="bi-sub">' + it.sub + '</div></div></label>';
    }).join('');
    $('backup-modal').classList.remove('hidden');
    trackModal('backup-modal');
}
function closeCustomBackup() { $('backup-modal').classList.add('hidden'); untrackModal('backup-modal'); }
async function runCustomBackup() {
    var checked = Array.from(document.querySelectorAll('.backup-cb:checked')).map(function (c) { return c.value; });
    if (!checked.length) { toast('Select at least one section.', 'error'); return; }
    try {
        var d = await api('GET', '/api/backup');
        var full = d.data;
        var custom = {
            app: 'nyxx', version: full.version, exported_at: full.exported_at, custom: true,
            selected: checked,
            commands: checked.indexOf('commands') >= 0 ? (full.commands || []) : [],
            featured: checked.indexOf('featured') >= 0 ? (full.featured || []) : [],
            users: checked.indexOf('users') >= 0 ? (full.users || []) : [],
            groups: checked.indexOf('groups') >= 0 ? (full.groups || []) : [],
            ai_messages: checked.indexOf('ai_messages') >= 0 ? (full.ai_messages || []) : [],
            dm_messages: checked.indexOf('dm_messages') >= 0 ? (full.dm_messages || []) : [],
            blocked_users: checked.indexOf('blocked_users') >= 0 ? (full.blocked_users || []) : [],
            broadcast_history: checked.indexOf('broadcast_history') >= 0 ? (full.broadcast_history || []) : [],
            settings: {}
        };
        if (full.settings) {
            if (checked.indexOf('ai_settings') >= 0) {
                Object.keys(full.settings).forEach(function (k) { if (k.indexOf('ai_') === 0) custom.settings[k] = full.settings[k]; });
            }
            if (checked.indexOf('menu_commands') >= 0 && full.settings.menu_commands !== undefined) custom.settings.menu_commands = full.settings.menu_commands;
            if (checked.indexOf('bot_config') >= 0) {
                ['bot_name', 'bot_username', 'webhook_url'].forEach(function (k) { if (full.settings[k] !== undefined) custom.settings[k] = full.settings[k]; });
            }
        }
        downloadJson('nyxx-backup-custom-' + stamp() + '.json', custom);
        closeCustomBackup();
        toast('Custom backup downloaded.');
    } catch (e) { toast(e.message, 'error'); }
}
function restoreBackup(ev) {
    var f = ev.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = async function () {
        try {
            var parsed = JSON.parse(r.result);
            var what = parsed.custom ? 'the sections inside this custom backup' : 'everything';
            var ok = await confirmDialog('Restore will overwrite ' + what + '. Continue?', 'Restore backup');
            if (!ok) return;
            await api('POST', '/api/backup/restore', { data: parsed });
            toast('Restored.'); commands = []; loadCommands(true); loadUsers(true); loadFeatured();
        } catch (e) { toast(e.message, 'error'); }
        ev.target.value = '';
    };
    r.readAsText(f);
}
async function loadLogs() {
    var box = $('logs-list');
    box.innerHTML = skeletonRows(4);
    try {
        var d = await api('GET', '/api/logs?limit=200');
        var logs = d.logs || [];
        if (!logs.length) { box.innerHTML = emptyState('fa-solid fa-clipboard-list', 'No activity yet.'); return; }
        box.innerHTML = logs.map(function (l) {
            return '<div class="list-row"><div class="lr-main"><div class="lr-title" style="font-weight:500;">' + esc(l.action) + '</div>' +
                '<div class="lr-sub">' + fmtTime(l.timestamp) + (l.user_id ? ' · user ' + l.user_id : '') + '</div></div></div>';
        }).join('');
    } catch (e) { box.innerHTML = errorState(e.message, 'loadLogs()'); }
}
async function loadLogClean() {
    try {
        var d = await api('GET', '/api/logs/settings');
        toggleSwitch('logclean-toggle', d.enabled === '1');
        $('logclean-days').value = d.days || 30;
        show($('logclean-days-wrap'), d.enabled === '1');
    } catch (e) {}
}
async function toggleLogClean() {
    var on = !sw('logclean-toggle');
    if (on) {
        var ok = await confirmDialog('Old activity log entries will be permanently deleted. Turn on auto-cleanup?', 'Enable log cleanup');
        if (!ok) return;
    }
    toggleSwitch('logclean-toggle', on);
    show($('logclean-days-wrap'), on);
}
async function saveLogClean() {
    var body = { enabled: sw('logclean-toggle') ? '1' : '0', days: parseInt($('logclean-days').value) || 30 };
    try { await api('POST', '/api/logs/settings', body); toast('Log cleanup saved.'); }
    catch (e) { toast(e.message, 'error'); }
}
async function clearLogs() {
    var ok = await confirmDialog('Delete all activity log entries?', 'Clear logs');
    if (!ok) return;
    await api('DELETE', '/api/logs'); toast('Cleared.'); loadLogs();
}
var latestVersion = null, updateAvailable = false, workerUrl = null;
async function loadUpdateTab() { await loadSettings(true); checkUpdate(true); }
async function checkUpdate(force) {
    $('up-latest').value = '…';
    try {
        var d = await api('GET', '/api/version');
        latestVersion = d.latest; workerUrl = d.worker_url;
        $('up-latest').value = d.latest || 'unknown';
        $('up-notes').textContent = d.released ? 'Released ' + d.released + (d.notes ? ' · ' + d.notes : '') : '';
        updateAvailable = d.latest && cmp(d.latest, d.current) > 0;
        $('up-btn').disabled = !updateAvailable;
        show($('update-pill'), updateAvailable);
    } catch (e) { $('up-latest').value = 'error'; }
}
function cmp(a, b) {
    var x = String(a).split('.').map(Number), y = String(b).split('.').map(Number);
    for (var i = 0; i < Math.max(x.length, y.length); i++) { var n = x[i] || 0, m = y[i] || 0; if (n > m) return 1; if (n < m) return -1; }
    return 0;
}
function autoCheckUpdate() { checkUpdate(true); }
function openTokenGen() { window.open('https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=%5B%7B%22key%22%3A%22workers_scripts%22%2C%22type%22%3A%22edit%22%7D%5D&accountId=*&zoneId=all&name=Nyxx%20Updater', '_blank'); }
async function performUpdate() {
    var token = $('up-token').value.trim();
    var d = await api('GET', '/api/settings');
    $('set-token').value = d.bot_token_masked || '';
    $('set-token').type = 'password';
    $('set-hook').value = d.webhook_url || '';
    window.__botTokenSet = d.bot_token_set;

    if (!token && !d.cf_token_set) { toast('Enter a Cloudflare API token.', 'error'); return; }

    $('up-result').innerHTML = '<span class="mini-spinner"></span> Validating token…';

    try {
        var v = await api('POST', '/api/update/validate', { token: token });
        if (!v.valid) throw new Error(v.error || 'Invalid token');

        $('up-result').innerHTML = '<span class="mini-spinner"></span> Deploying to ' + esc(v.scriptName || 'your Worker') + '…';

        var r = await api('POST', '/api/update', {
            token: token,
            accountId: v.accountId,
            scriptName: v.scriptName,
            workerUrl: workerUrl
        });

        // NEW: don't claim success when the server said it failed
        if (!r || !r.success) throw new Error((r && r.error) || 'Update failed.');

        $('up-result').innerHTML =
            '<span style="color:var(--green)"><i class="fa-solid fa-circle-check"></i> Updated to ' +
            esc(r.version || 'latest') + '.</span>';
        toast('Update complete.');
        checkUpdate(true);
    } catch (e) {
        $('up-result').innerHTML =
            '<span style="color:var(--red)"><i class="fa-solid fa-circle-xmark"></i> ' +
            esc(e.message) + '</span>';
    }
}

/* ============================================================
   INIT
   ============================================================ */
(function initSidebar() {
    var app = document.querySelector('.app');
    if (!app) return;
    if (window.innerWidth > 900) app.classList.add('sidebar-open');
})();
window.addEventListener('resize', function () {
    var app = document.querySelector('.app');
    if (!app) return;
    if (window.innerWidth > 900) app.classList.add('sidebar-open');
    else {
        app.classList.remove('sidebar-open');
        var ov = document.getElementById('sidebar-overlay');
        if (ov) ov.classList.remove('show');
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && openModals.length) {
        var top = openModals[openModals.length - 1];
        if (top === 'cmd-modal') closeCommandModal();
        else if (top === 'msg-modal') closeMsgEditor();
        else if (top === 'featured-modal') closeFeaturedModal();
        else if (top === 'confirm-modal') closeConfirm(false);
        else if (top === 'backup-modal') closeCustomBackup();
        else if (top === 'about-modal') { $('about-modal').classList.add('hidden'); untrackModal('about-modal'); }
        else if (top === 'token-modal') { $('token-modal').classList.add('hidden'); untrackModal('token-modal'); }
    }
    if (e.key === 'Escape') closeAllDropdowns();
});

checkStatus();
</script>
</body>
</html>`;

// ============================================================================
// SECURITY HELPERS
// ============================================================================
const SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Robots-Tag': 'noindex, nofollow',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
const HTML_HEADERS = {
    ...SECURITY_HEADERS,
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Security-Policy': [
        "default-src 'self'",
        "img-src 'self' https://raw.githubusercontent.com https://*.githubusercontent.com data:",
        "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
        "font-src 'self' https://cdnjs.cloudflare.com data:",
        "script-src 'self' 'unsafe-inline'",
        "connect-src 'self'",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
    ].join('; '),
};
const JSON_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...SECURITY_HEADERS,
};
function apiJson(body, status = 200) { return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS }); }
function internalError(err) {
    console.error('API error:', err);
    return apiJson({ error: 'Internal server error — please try again.' }, 500);
}

const PASSWORD_PREFIX = 'sha256$';
const PBKDF2_PREFIX = 'pbkdf2$';
const PBKDF2_ITERATIONS = 100000;

function timingSafeEqual(a, b) {
    const enc = new TextEncoder();
    const ab = enc.encode(String(a));
    const bb = enc.encode(String(b));
    const len = Math.max(ab.length, bb.length);
    let diff = ab.length ^ bb.length;
    for (let i = 0; i < len; i++) diff |= (ab[i] || 0) ^ (bb[i] || 0);
    return diff === 0;
}
function toHex(buf) { return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join(''); }
function hexToBytes(hex) {
    if (!hex || hex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hex)) return null;
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
    return out;
}
async function pbkdf2Hash(password, salt, iterations) {
    const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, keyMaterial, 256);
    return toHex(bits);
}
async function hashPassword(password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hex = await pbkdf2Hash(password, salt, PBKDF2_ITERATIONS);
    return `${PBKDF2_PREFIX}${PBKDF2_ITERATIONS}$${toHex(salt)}$${hex}`;
}
async function verifyPassword(stored, candidate) {
    if (!stored) return false;
    if (stored.startsWith(PBKDF2_PREFIX)) {
        const parts = stored.split('$');
        if (parts.length !== 4) return false;
        const iterations = parseInt(parts[1], 10);
        if (!iterations || iterations < 1) return false;
        const salt = hexToBytes(parts[2]);
        if (!salt) return false;
        const actual = await pbkdf2Hash(candidate, salt, iterations);
        return timingSafeEqual(actual, parts[3]);
    }
    if (stored.startsWith(PASSWORD_PREFIX)) {
        const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(candidate));
        return timingSafeEqual(PASSWORD_PREFIX + toHex(digest), stored);
    }
    return stored === candidate;
}
async function maybeRehashPassword(db, stored, candidate) {
    if (!stored || stored.startsWith(PBKDF2_PREFIX)) return;
    if (await verifyPassword(stored, candidate)) await setSetting(db, 'admin_password', await hashPassword(candidate));
}

const KEEP_SENTINEL = '__NYXX_KEEP__';
function maskSecret(value) {
    if (!value) return '';
    const s = String(value);
    if (s.length <= 12) return '••••••••';
    return s.slice(0, 6) + '••••••••' + s.slice(-4);
}
function simpleHashStr(str) {
    let hash = 0;
    const s = String(str || '');
    for (let i = 0; i < s.length; i++) {
        const ch = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash |= 0;
    }
    return Math.abs(hash).toString(36);
}

// ============================================================================
// WORKER ENTRY POINT
// ============================================================================
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        env.__requestUrl = url.toString();
        try {
            if (request.method === 'GET' && url.pathname === '/') return new Response(DASHBOARD_HTML, { headers: HTML_HEADERS });
            if (request.method === 'GET' && url.pathname === '/chat') return await handleChatPage(request, env);

            if (request.method !== 'GET' && url.pathname.startsWith('/api/')) {
                const origin = request.headers.get('Origin');
                const referer = request.headers.get('Referer');
                let sameOrigin = false;
                try {
                    if (origin) sameOrigin = new URL(origin).host === url.host;
                    else if (referer) sameOrigin = new URL(referer).host === url.host;
                } catch (e) { sameOrigin = false; }
                if (!sameOrigin) return apiJson({ error: 'Request blocked for security reasons.' }, 403);
            }

            if (request.method === 'GET' && url.pathname === '/api/status') return await getStatus(env);
            if (request.method === 'POST' && url.pathname === '/api/setup') return await handleSetup(request, env);
            if (request.method === 'POST' && url.pathname === '/api/login') return await handleLogin(request, env);
            if (request.method === 'GET' && url.pathname === '/api/version') {
                const fresh = url.searchParams.get('force') === '1';
                return await getVersionInfo(env, fresh);
            }
            if (request.method === 'GET' && url.pathname === '/api/check_session') {
                const s = await getSession(request, env);
                return apiJson({ logged_in: !!s });
            }
            if (request.method === 'POST' && url.pathname === '/webhook') return await handleTelegramWebhook(request, env, ctx);
            // MCP — bearer-token auth, no session cookie required.
            if (url.pathname === '/mcp') return await handleMcp(request, env);

            const session = await getSession(request, env);
            if (!session) return apiJson({ error: 'Please sign in again.' }, 401);

            if (request.method === 'POST' && url.pathname === '/api/logout') return await handleLogout(request, env);

            if (url.pathname === '/api/commands') {
                if (request.method === 'GET') return await getCommands(env);
                if (request.method === 'POST') return await createCommand(request, env);
            }
            if (url.pathname === '/api/commands/export' && request.method === 'GET') return await exportCommandPack(env);
            if (url.pathname === '/api/commands/import' && request.method === 'POST') return await importCommandPack(request, env);
            if (url.pathname === '/api/commands/reorder' && request.method === 'POST') return await reorderCommands(request, env);
            if (url.pathname.startsWith('/api/commands/')) {
                if (request.method === 'PUT') return await updateCommand(request, env);
                if (request.method === 'DELETE') return await deleteCommand(request, env);
            }

            if (request.method === 'GET' && url.pathname === '/api/menu_commands') return await getMenuCommands(env);
            if (request.method === 'POST' && url.pathname === '/api/menu_commands') return await setMenuCommands(request, env);

            if (request.method === 'GET' && url.pathname === '/api/featured') return await getFeatured(env);
            if (request.method === 'POST' && url.pathname === '/api/featured') return await createFeatured(request, env);
            if (/^\/api\/featured\/[0-9]+$/.test(url.pathname)) {
                if (request.method === 'PUT') return await updateFeatured(request, env, url);
                if (request.method === 'DELETE') return await deleteFeatured(env, url);
            }

            if (request.method === 'GET' && url.pathname === '/api/memory/overview') return await getMemoryOverview(env);
            if (request.method === 'POST' && url.pathname === '/api/memory/clear') return await handleMemoryClear(request, env);
                        if (request.method === 'GET'  && url.pathname === '/api/memory/auto_remove') return await getAutoRemoveSettings(env);
            if (request.method === 'POST' && url.pathname === '/api/memory/auto_remove') return await saveAutoRemoveSettings(request, env);

            if (request.method === 'GET' && url.pathname === '/api/users') return await getUsers(env, url);
            if (request.method === 'PUT' && url.pathname === '/api/users/role') return await updateUserRole(request, env);
            if (request.method === 'POST' && url.pathname === '/api/users/send_message') return await sendUserPrivateMessage(request, env);
            if (request.method === 'POST' && url.pathname === '/api/users/message/edit') return await editSentMessage(request, env);
            if (request.method === 'POST' && url.pathname === '/api/users/message/delete') return await deleteSentMessage(request, env);
            if (request.method === 'POST' && url.pathname === '/api/users/block') return await blockUser(request, env);
            if (request.method === 'POST' && url.pathname === '/api/users/unblock') return await unblockUser(request, env);
            if (request.method === 'POST' && url.pathname.endsWith('/check_started')) return await checkUserStarted(request, env, url);
            if (request.method === 'GET' && url.pathname.startsWith('/api/users/block_status/')) return await getBlockStatus(env, url);
            if (request.method === 'GET' && url.pathname.endsWith('/dm_messages')) return await getUserDmMessages(env, url);
            if (request.method === 'GET' && url.pathname.endsWith('/chat_history')) return await getUserChatHistory(env, url);
            if (request.method === 'POST' && url.pathname.endsWith('/clear_memory')) return await clearUserMemory(env, url);
            if (/^\/api\/users\/[0-9]+\/ai_messages\/[0-9]+$/.test(url.pathname)) {
                if (request.method === 'PUT') return await updateAiMessage(request, env, url);
                if (request.method === 'DELETE') return await deleteAiMessage(env, url);
            }
            if (request.method === 'DELETE' && /^\/api\/users\/[0-9]+$/.test(url.pathname)) return await deleteUser(request, env, url);

            if (request.method === 'GET' && url.pathname === '/api/groups') return await getGroups(env);
            if (request.method === 'GET' && /^\/api\/groups\/-?[0-9]+$/.test(url.pathname)) return await getGroupDetail(env, url);
            if (request.method === 'POST' && url.pathname.endsWith('/settings') && url.pathname.startsWith('/api/groups/')) return await saveGroupSettings(request, env, url);
            if (request.method === 'POST' && url.pathname.endsWith('/send') && url.pathname.startsWith('/api/groups/')) return await sendGroupMessage(request, env, url);
            if (request.method === 'DELETE' && /^\/api\/groups\/-?[0-9]+$/.test(url.pathname)) return await deleteGroup(env, url);

            if (request.method === 'POST' && url.pathname === '/api/broadcast') return await handleBroadcast(request, env);
            if (url.pathname === '/api/broadcast/settings') {
                if (request.method === 'GET') return await handleBroadcastSettings(request, env);
                if (request.method === 'POST') return await handleBroadcastSettings(request, env);
            }
            if (request.method === 'POST' && url.pathname === '/api/broadcast/edit') return await editBroadcastMessage(request, env);
            if (request.method === 'POST' && url.pathname === '/api/broadcast/delete') return await deleteBroadcastMessage(request, env);
            if (request.method === 'GET' && url.pathname === '/api/broadcast/history') return await getBroadcastHistory(env);

            if (request.method === 'GET' && url.pathname === '/api/cron') return await getCronSettings(env);
            if (request.method === 'POST' && url.pathname === '/api/cron') return await saveCronSettings(request, env);
            if (request.method === 'POST' && url.pathname === '/api/cron/run') return await runCronNow(env);

            if (request.method === 'GET' && url.pathname === '/api/ai_settings') return await getAiSettings(env);
            if (request.method === 'POST' && url.pathname === '/api/ai_settings') return await saveAiSettings(request, env);
            if (request.method === 'POST' && url.pathname === '/api/ai/test') return await handleAiTest(request, env);
            if (request.method === 'POST' && url.pathname === '/api/ai/playground') return await handleAiPlayground(request, env);
            if (request.method === 'POST' && url.pathname === '/api/ai/reset') return await resetAiSettings(env);
            if (request.method === 'POST' && url.pathname === '/api/ai/clear_memory') return await clearAiMemory(env);
            if (request.method === 'GET' && url.pathname === '/api/ai/memory_count') return await getAiMemoryCount(env);

            if (request.method === 'GET' && url.pathname === '/api/settings') return await getSettings(env, url.origin);
            if (request.method === 'POST' && url.pathname === '/api/settings/reveal_bot_token') return await revealBotToken(env);
            if (request.method === 'POST' && url.pathname === '/api/settings/token') return await updateBotToken(request, env, url.origin);
            if (request.method === 'POST' && url.pathname === '/api/settings/webhook-test') return await handleWebhookTest(env);
            if (request.method === 'POST' && url.pathname === '/api/settings/webhook-fix') return await handleWebhookFix(env, url.origin);
            if (request.method === 'POST' && url.pathname === '/api/change_password') return await changeAdminPassword(request, env);

            if (request.method === 'GET' && url.pathname === '/api/bot_info') return await getBotInfo(env);
            if (request.method === 'POST' && url.pathname === '/api/bot_info') return await setBotInfo(request, env);

            if (request.method === 'GET' && url.pathname === '/api/stats') return await getStats(env);
            // ---- MCP dashboard API ----
            if (request.method === 'GET'  && url.pathname === '/api/mcp/settings') return await getMcpSettings(request, env);
            if (request.method === 'POST' && url.pathname === '/api/mcp/settings') return await saveMcpSettings(request, env);
            if (request.method === 'POST' && url.pathname === '/api/mcp/ai/test') return await handleMcpAiTest(request, env);
            if (request.method === 'POST' && url.pathname === '/api/mcp/chat') return await handleMcpDashboardChat(request, env);
            if (request.method === 'GET'  && url.pathname === '/api/mcp/tokens') return await listMcpTokens(env);
            if (request.method === 'POST' && url.pathname === '/api/mcp/token/generate') return await generateMcpTokenHandler(request, env);
            if (request.method === 'POST' && url.pathname === '/api/mcp/token/revoke') return await revokeMcpTokens(env);
            if (request.method === 'GET'  && url.pathname === '/api/mcp/calls') return await getMcpCalls(env);
            if (request.method === 'GET'  && url.pathname === '/api/mcp/sessions') return await listMcpSessions(env);
            if (request.method === 'POST' && url.pathname === '/api/mcp/sessions/clear') return await clearMcpSessions(env);

            // Dedicated chat (ChatGPT-like)
            if (request.method === 'GET'  && url.pathname === '/api/chat/sessions') return await listChatSessions(env);
            if (request.method === 'POST' && url.pathname === '/api/chat/sessions') return await createChatSession(request, env);
            if (request.method === 'POST' && /^\/api\/chat\/sessions\/[^\/]+\/send$/.test(url.pathname)) return await sendChatMessage(request, env, url);
            if (request.method === 'GET'  && /^\/api\/chat\/sessions\/[^\/]+$/.test(url.pathname)) return await getChatSession(env, url);
            if (request.method === 'DELETE' && /^\/api\/chat\/sessions\/[^\/]+$/.test(url.pathname)) return await deleteChatSession(env, url);

            if (request.method === 'GET' && url.pathname === '/api/backup') return await exportBackup(env);
            if (request.method === 'POST' && url.pathname === '/api/backup/restore') return await restoreBackup(request, env);

            if (request.method === 'POST' && url.pathname === '/api/reset') return await factoryReset(request, env);

            if (request.method === 'GET' && url.pathname === '/api/logs') return await getAuditLogs(env, url);
            if (request.method === 'DELETE' && url.pathname === '/api/logs') return await clearAuditLogs(env);
            if (request.method === 'GET' && url.pathname === '/api/logs/settings') return await getLogCleanSettings(env);
            if (request.method === 'POST' && url.pathname === '/api/logs/settings') return await saveLogCleanSettings(request, env);

            if (request.method === 'GET'  && url.pathname === '/api/permissions') return await getPermissionsHandler(env);
            if (request.method === 'POST' && url.pathname === '/api/permissions') return await savePermissionsHandler(request, env);
            if (request.method === 'GET'  && url.pathname === '/api/admins') return await listAdminsHandler(env);
            if (request.method === 'POST' && url.pathname === '/api/admins/promote') return await promoteAdminHandler(request, env);
            if (request.method === 'POST' && url.pathname === '/api/admins/demote') return await demoteAdminHandler(request, env);

            if (request.method === 'POST' && url.pathname === '/api/update/validate') return await validateCloudflareToken(request, env);
            if (request.method === 'POST' && url.pathname === '/api/update') return await performUpdate(request, env);

            return new Response('Not Found', { status: 404, headers: SECURITY_HEADERS });
        } catch (error) {
            console.error(error);
            return apiJson({ error: 'Something went wrong on the server. Please try again.' }, 500);
        }
    },
    async scheduled(controller, env, ctx) { ctx.waitUntil(runScheduledCleanup(env)); }
};

// ============================================================================
// CRON / RETENTION
// ============================================================================
const CRON_DEFAULTS = {
    cron_enabled: '0',
    cron_sessions_days: 1,
    cron_bot_sessions_days: 30,
    cron_login_attempts_hours: 2,
    cron_rate_limits_hours: 24,
    cron_logs_days: 30,
    cron_ai_messages_days: 0,
    cron_broadcast_days: 30,
    cron_inactive_users_days: 0,
    cron_dm_messages_days: 0,
};
const CRON_BOUNDS = {
    cron_sessions_days: [1, 365], cron_bot_sessions_days: [1, 3650],
    cron_login_attempts_hours: [1, 720], cron_rate_limits_hours: [1, 2160], cron_logs_days: [1, 3650],
    cron_ai_messages_days: [0, 3650], cron_broadcast_days: [0, 3650], cron_inactive_users_days: [0, 3650], cron_dm_messages_days: [0, 3650],
};

async function getCronSettingsFromDb(env) {
    const keys = Object.keys(CRON_DEFAULTS);
    const placeholders = keys.map(() => '?').join(', ');
    const rows = await env.DB.prepare(`SELECT key, value FROM settings WHERE key IN (${placeholders})`).bind(...keys).all();
    const raw = {};
    for (const row of (rows.results || [])) raw[row.key] = row.value;
    const cfg = { cron_enabled: raw.cron_enabled === '1' ? '1' : '0' };
    for (const key of keys) {
        if (key === 'cron_enabled') continue;
        const [min, max] = CRON_BOUNDS[key];
        const parsed = parseInt(raw[key]);
        cfg[key] = isNaN(parsed) ? CRON_DEFAULTS[key] : Math.min(Math.max(parsed, min), max);
    }
    return cfg;
}
async function runScheduledCleanup(env) {
    if (!env.DB) return null;
    let cfg;
    try { await initializeDatabase(env.DB); cfg = await getCronSettingsFromDb(env); }
    catch (e) { console.error('Cron init failed:', e); return null; }
    try {
        const db = env.DB;
        const nowMinute = Math.floor(Date.now() / 60000);
        const changes = async (stmt) => { try { const r = await stmt.run(); return (r && r.meta && r.meta.changes) || 0; } catch (e) { return 0; } };
        const summary = {};
        await runAutoRemoveMemory(env, summary);
        if (cfg.cron_enabled === '1') {
        summary.dashboard_sessions = await changes(db.prepare(`DELETE FROM sessions WHERE user_id IS NULL AND created_at <= datetime('now', '-${cfg.cron_sessions_days} day')`));
        summary.bot_sessions = await changes(db.prepare(`DELETE FROM sessions WHERE token LIKE 'bot-%' AND updated_at <= datetime('now', '-${cfg.cron_bot_sessions_days} day')`));
        summary.login_attempts = await changes(db.prepare('DELETE FROM login_attempts WHERE minute <= ?').bind(nowMinute - cfg.cron_login_attempts_hours * 60));
        summary.ai_rate_limits = await changes(db.prepare('DELETE FROM ai_rate_limits WHERE minute < ?').bind(nowMinute - cfg.cron_rate_limits_hours * 60));
        summary.group_flood = await changes(db.prepare('DELETE FROM group_flood WHERE minute < ?').bind(nowMinute - 120));
        try {
            const ttlRaw = await getSetting(db, 'mcp_memory_ttl_hours');
            const ttl = Math.min(Math.max(parseInt(ttlRaw) || 24, 1), 720);
            summary.mcp_sessions = await changes(db.prepare(`DELETE FROM mcp_sessions WHERE updated_at <= datetime('now', '-${ttl} hours')`));
        } catch (e) { /* ignore */ }
        try { summary.mcp_rate_limits = await changes(db.prepare('DELETE FROM mcp_rate_limits WHERE minute < ?').bind(nowMinute - 60)); } catch (e) { /* ignore */ }
        const logCfg = await getLogCleanFromDb(db);
        if (logCfg.enabled) {
            summary.audit_logs = await changes(db.prepare(`DELETE FROM logs WHERE timestamp <= datetime('now', '-${logCfg.days} day')`));
        }
        if (cfg.cron_ai_messages_days > 0) summary.ai_messages = await changes(db.prepare(`DELETE FROM ai_messages WHERE timestamp <= datetime('now', '-${cfg.cron_ai_messages_days} day')`));
        if (cfg.cron_dm_messages_days > 0) summary.dm_messages = await changes(db.prepare(`DELETE FROM dm_messages WHERE created_at <= datetime('now', '-${cfg.cron_dm_messages_days} day')`));
        if (cfg.cron_broadcast_days > 0) {
            summary.broadcast_history = await changes(db.prepare(`DELETE FROM broadcast_history WHERE sent_at <= datetime('now', '-${cfg.cron_broadcast_days} day')`));
            await changes(db.prepare('DELETE FROM broadcast_recipients WHERE broadcast_id NOT IN (SELECT id FROM broadcast_history)'));
        }
        if (cfg.cron_inactive_users_days > 0) {
            const inactive = await db.prepare(`SELECT id FROM users WHERE last_active <= datetime('now', '-${cfg.cron_inactive_users_days} day')`).all();
            const ids = (inactive.results || []).map(r => r.id);
            if (ids.length) {
                const ph = ids.map(() => '?').join(', ');
                await db.prepare(`DELETE FROM ai_messages WHERE chat_id IN (${ph})`).bind(...ids).run();
                await db.prepare(`DELETE FROM dm_messages WHERE chat_id IN (${ph})`).bind(...ids).run();
                await db.prepare(`DELETE FROM blocked_users WHERE user_id IN (${ph})`).bind(...ids).run();
                await db.prepare(`DELETE FROM sessions WHERE user_id IN (${ph}) AND token LIKE 'bot-%'`).bind(...ids).run();
                summary.users = await changes(db.prepare(`DELETE FROM users WHERE id IN (${ph})`).bind(...ids));
            }
        }
        }
        if (!Object.keys(summary).length) return null;
        try { await setSetting(db, 'cron_last_run', JSON.stringify({ at: new Date().toISOString(), summary })); } catch (e) {}
        await logAction(db, null, 'Scheduled cleanup: ' + JSON.stringify(summary));
        return summary;
    } catch (e) { console.error('Scheduled cleanup failed:', e); return null; }
}
async function getCronSettings(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const cfg = await getCronSettingsFromDb(env);
        let lastRun = null;
        try { const raw = await getSetting(env.DB, 'cron_last_run'); if (raw) lastRun = JSON.parse(raw); } catch (e) {}
        return apiJson({ success: true, settings: cfg, last_run: lastRun });
    } catch (err) { return internalError(err); }
}
async function saveCronSettings(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        await initializeDatabase(env.DB);
        if (!body || typeof body !== 'object') return apiJson({ error: 'Invalid request.' }, 400);
        const updates = [];
        for (const key of Object.keys(CRON_DEFAULTS)) {
            if (body[key] === undefined || body[key] === null || body[key] === '') continue;
            if (key === 'cron_enabled') { updates.push([key, (body[key] === '1' || body[key] === 1 || body[key] === true) ? '1' : '0']); continue; }
            const [min, max] = CRON_BOUNDS[key];
            const parsed = parseInt(body[key]);
            if (isNaN(parsed)) continue;
            updates.push([key, String(Math.min(Math.max(parsed, min), max))]);
        }
        for (const [key, value] of updates) await setSetting(env.DB, key, value);
        await logAction(env.DB, null, 'Cleanup settings updated');
        return apiJson({ success: true, settings: await getCronSettingsFromDb(env) });
    } catch (err) { return internalError(err); }
}
async function runCronNow(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const summary = await runScheduledCleanup(env);
        if (!summary) return apiJson({ success: false, skipped: true, message: 'Cleanup is disabled or failed. Enable it and save first.' });
        return apiJson({ success: true, summary });
    } catch (err) { return internalError(err); }
}

async function getLogCleanFromDb(db) {
    try {
        const [en, days] = await Promise.all([getSetting(db, 'log_clean_enabled'), getSetting(db, 'log_clean_days')]);
        return { enabled: en === '1', days: parseInt(days) || 30 };
    } catch (e) { return { enabled: false, days: 30 }; }
}
async function getLogCleanSettings(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try { await initializeDatabase(env.DB); const c = await getLogCleanFromDb(env.DB); return apiJson({ enabled: c.enabled ? '1' : '0', days: c.days }); }
    catch (err) { return internalError(err); }
}
async function saveLogCleanSettings(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        await initializeDatabase(env.DB);
        const enabled = body.enabled === '1' || body.enabled === 1 || body.enabled === true;
        const days = Math.min(Math.max(parseInt(body.days) || 30, 1), 3650);
        await setSetting(env.DB, 'log_clean_enabled', enabled ? '1' : '0');
        await setSetting(env.DB, 'log_clean_days', String(days));
        await logAction(env.DB, null, 'Log cleanup settings updated');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
// ============================================================================
// PERMISSIONS
// ============================================================================
const DEFAULT_PERMISSIONS = {
    mcp_telegram: 'admin',      // /mcp featured command in Telegram
    mcp_ai: 'admin',            // main AI allowed to call MCP tools
    ai_chat: 'everyone',        // AI replies to regular users
    commands: 'everyone',       // regular bot commands (/help, /about…)
    featured_commands: 'everyone', // DM / Buttons / MCP featured commands
    start_command: 'everyone',  // /start
    rules_command: 'everyone',  // /rules in groups
    callback_queries: 'everyone' // inline / reply button taps
};
const PERMISSION_KEYS = Object.keys(DEFAULT_PERMISSIONS);

async function getPermissions(env) {
    let stored = {};
    try {
        const raw = await getSetting(env.DB, 'permissions_json');
        if (raw) stored = JSON.parse(raw) || {};
    } catch (e) {}
    const out = {};
    for (const k of PERMISSION_KEYS) {
        const v = stored[k];
        out[k] = (v === 'admin' || v === 'everyone') ? v : DEFAULT_PERMISSIONS[k];
    }
    return out;
}
async function isAdminUser(env, userId) {
    if (!userId) return false;
    try {
        const row = await env.DB.prepare('SELECT role FROM users WHERE id = ?').bind(userId).first();
        return !!(row && row.role === 'admin');
    } catch (e) { return false; }
}
const _permCache = new WeakMap(); // env → { data, at }
const PERM_CACHE_TTL_MS = 15000;

async function getPermissionsCached(env) {
    const entry = _permCache.get(env);
    if (entry && (Date.now() - entry.at) < PERM_CACHE_TTL_MS) return entry.data;
    const fresh = await getPermissions(env);
    _permCache.set(env, { data: fresh, at: Date.now() });
    return fresh;
}

async function checkPermission(env, userId, key) {
    const perms = await getPermissionsCached(env);
    const mode = perms[key] || 'everyone';
    if (mode === 'everyone') return true;
    return await isAdminUser(env, userId);
}
async function getPermissionsHandler(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const permissions = await getPermissions(env);
        return apiJson({ success: true, permissions, keys: PERMISSION_KEYS });
    } catch (err) { return internalError(err); }
}
async function savePermissionsHandler(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const incoming = body.permissions || {};
        const merged = await getPermissions(env);
        for (const k of PERMISSION_KEYS) {
            if (incoming[k] === 'admin' || incoming[k] === 'everyone') merged[k] = incoming[k];
        }
        await setSetting(env.DB, 'permissions_json', JSON.stringify(merged));
        _permCache.delete(env);
        await logAction(env.DB, null, 'Permissions updated');
        return apiJson({ success: true, permissions: merged });
    } catch (err) { return internalError(err); }
}
async function listAdminsHandler(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare(
            "SELECT id, username, first_name, last_active FROM users WHERE role = 'admin' ORDER BY last_active DESC LIMIT 200"
        ).all();
        return apiJson({ admins: rows.results || [] });
    } catch (err) { return internalError(err); }
}
async function promoteAdminHandler(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const userId = parseInt(body.userId);
        if (!userId) return apiJson({ error: 'Invalid userId.' }, 400);
        await initializeDatabase(env.DB);
        await env.DB.prepare("UPDATE users SET role = 'admin' WHERE id = ?").bind(userId).run();
        await logAction(env.DB, userId, 'User promoted to admin');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function demoteAdminHandler(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const userId = parseInt(body.userId);
        if (!userId) return apiJson({ error: 'Invalid userId.' }, 400);
        await initializeDatabase(env.DB);
        await env.DB.prepare("UPDATE users SET role = 'user' WHERE id = ?").bind(userId).run();
        await logAction(env.DB, userId, 'User demoted from admin');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// DATABASE
// ============================================================================
const dbInitCache = new WeakMap();
const SCHEMA_VERSION = 9;

const MIGRATIONS = {
    2: [
        `INSERT OR REPLACE INTO sessions (token, user_id, command, created_at, updated_at)
         SELECT 'bot-' || user_id, user_id, command, created_at, updated_at
         FROM sessions WHERE user_id IS NOT NULL AND (token IS NULL OR token NOT LIKE 'bot-%')`,
        `DELETE FROM sessions WHERE user_id IS NOT NULL AND (token IS NULL OR token NOT LIKE 'bot-%')`,
    ],
    3: [
        `CREATE TABLE IF NOT EXISTS admin_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, message_id INTEGER, kind TEXT DEFAULT 'text', text TEXT, buttons_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
        `CREATE TABLE IF NOT EXISTS broadcast_recipients (broadcast_id INTEGER NOT NULL, chat_id INTEGER NOT NULL, message_id INTEGER, PRIMARY KEY (broadcast_id, chat_id))`,
        `CREATE INDEX IF NOT EXISTS idx_admin_messages_chat ON admin_messages(chat_id)`,
        `ALTER TABLE broadcast_history ADD COLUMN photo_url TEXT`,
        `ALTER TABLE broadcast_history ADD COLUMN kind TEXT DEFAULT 'text'`,
    ],
    4: [
        `ALTER TABLE users ADD COLUMN private_started BOOLEAN DEFAULT 0`,
        `ALTER TABLE users ADD COLUMN last_group_id INTEGER`,
        `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY, title TEXT, type TEXT, username TEXT, added_at DATETIME DEFAULT CURRENT_TIMESTAMP, last_active DATETIME DEFAULT CURRENT_TIMESTAMP, is_active BOOLEAN DEFAULT 1, settings_json TEXT, member_count INTEGER DEFAULT 0)`,
        `CREATE TABLE IF NOT EXISTS dm_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, message_id INTEGER, direction TEXT, source TEXT, kind TEXT DEFAULT 'text', text TEXT, photo_url TEXT, buttons_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, edited_at DATETIME)`,
        `CREATE TABLE IF NOT EXISTS group_flood (chat_id INTEGER, user_id INTEGER, minute INTEGER, count INTEGER DEFAULT 0, PRIMARY KEY (chat_id, user_id, minute))`,
        `CREATE INDEX IF NOT EXISTS idx_dm_messages_chat ON dm_messages(chat_id)`,
        `CREATE INDEX IF NOT EXISTS idx_groups_active ON groups(is_active)`,
        `INSERT INTO dm_messages (chat_id, message_id, direction, source, kind, text, buttons_json, created_at)
         SELECT chat_id, message_id, 'out', 'admin', kind, text, buttons_json, created_at FROM admin_messages`,
    ],
    5: [
        `CREATE TABLE IF NOT EXISTS featured_replies (id INTEGER PRIMARY KEY AUTOINCREMENT, command TEXT UNIQUE NOT NULL, kind TEXT DEFAULT 'text', content TEXT, buttons_json TEXT, enabled BOOLEAN DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
        `CREATE INDEX IF NOT EXISTS idx_featured_command ON featured_replies(command)`,
    ],
    6: [
        `ALTER TABLE featured_replies ADD COLUMN success_text TEXT DEFAULT ''`,
        `ALTER TABLE featured_replies ADD COLUMN failure_text TEXT DEFAULT ''`,
    ],
    7: [
        `CREATE TABLE IF NOT EXISTS mcp_tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            label TEXT DEFAULT 'default',
            token_hash TEXT UNIQUE NOT NULL,
            token_prefix TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_used_at DATETIME
        )`,
        `ALTER TABLE featured_replies ADD COLUMN admin_only INTEGER DEFAULT 0`,
    ],
    8: [
        `CREATE TABLE IF NOT EXISTS mcp_sessions (
            session_key TEXT PRIMARY KEY,
            messages_json TEXT NOT NULL DEFAULT '[]',
            size_bytes INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE INDEX IF NOT EXISTS idx_mcp_sessions_updated ON mcp_sessions(updated_at)`,
        `CREATE TABLE IF NOT EXISTS mcp_rate_limits (
            session_key TEXT NOT NULL,
            minute INTEGER NOT NULL,
            count INTEGER NOT NULL DEFAULT 1,
            PRIMARY KEY (session_key, minute)
        )`,
    ],
    9: [
        `ALTER TABLE mcp_sessions ADD COLUMN title TEXT DEFAULT ''`,
    ],
};

async function initializeDatabase(db) {
    if (dbInitCache.has(db)) return dbInitCache.get(db);
    const schema = `
        CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, first_name TEXT, role TEXT DEFAULT 'user', is_premium BOOLEAN DEFAULT 0, private_started BOOLEAN DEFAULT 0, last_group_id INTEGER, last_active DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS commands (command TEXT PRIMARY KEY, parent TEXT, response_type TEXT DEFAULT 'text', content TEXT, media_url TEXT, buttons_json TEXT, is_admin_only BOOLEAN DEFAULT 0, enabled BOOLEAN DEFAULT 1, show_reply_keyboard BOOLEAN DEFAULT 0, reply_keyboard_json TEXT, order_idx INTEGER DEFAULT 0);
        CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER UNIQUE, command TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, action TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS ai_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, role TEXT, content TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS dm_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, message_id INTEGER, direction TEXT, source TEXT, kind TEXT DEFAULT 'text', text TEXT, photo_url TEXT, buttons_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, edited_at DATETIME);
        CREATE TABLE IF NOT EXISTS ai_rate_limits (user_id INTEGER NOT NULL, minute INTEGER NOT NULL, count INTEGER NOT NULL DEFAULT 1, PRIMARY KEY (user_id, minute));
        CREATE TABLE IF NOT EXISTS blocked_users (user_id INTEGER PRIMARY KEY, block_type TEXT NOT NULL DEFAULT 'full', blocked_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS login_attempts (minute INTEGER PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0);
        CREATE TABLE IF NOT EXISTS broadcast_history (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, photo_url TEXT, kind TEXT DEFAULT 'text', buttons_json TEXT, recipient_count INTEGER, sent_count INTEGER, sent_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS broadcast_recipients (broadcast_id INTEGER NOT NULL, chat_id INTEGER NOT NULL, message_id INTEGER, PRIMARY KEY (broadcast_id, chat_id));
        CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY, title TEXT, type TEXT, username TEXT, added_at DATETIME DEFAULT CURRENT_TIMESTAMP, last_active DATETIME DEFAULT CURRENT_TIMESTAMP, is_active BOOLEAN DEFAULT 1, settings_json TEXT, member_count INTEGER DEFAULT 0);
        CREATE TABLE IF NOT EXISTS group_flood (chat_id INTEGER, user_id INTEGER, minute INTEGER, count INTEGER DEFAULT 0, PRIMARY KEY (chat_id, user_id, minute));
        CREATE TABLE IF NOT EXISTS featured_replies (id INTEGER PRIMARY KEY AUTOINCREMENT, command TEXT UNIQUE NOT NULL, kind TEXT DEFAULT 'text', content TEXT, buttons_json TEXT, success_text TEXT DEFAULT '', failure_text TEXT DEFAULT '', enabled BOOLEAN DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE INDEX IF NOT EXISTS idx_commands_parent ON commands(parent);
        CREATE INDEX IF NOT EXISTS idx_ai_messages_chat ON ai_messages(chat_id);
        CREATE INDEX IF NOT EXISTS idx_dm_messages_chat ON dm_messages(chat_id);
        CREATE INDEX IF NOT EXISTS idx_logs_user ON logs(user_id);
        CREATE INDEX IF NOT EXISTS idx_groups_active ON groups(is_active);
        CREATE INDEX IF NOT EXISTS idx_featured_command ON featured_replies(command);
        CREATE TABLE IF NOT EXISTS mcp_sessions (session_key TEXT PRIMARY KEY, messages_json TEXT NOT NULL DEFAULT '[]', size_bytes INTEGER DEFAULT 0, title TEXT DEFAULT '', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE INDEX IF NOT EXISTS idx_mcp_sessions_updated ON mcp_sessions(updated_at);
        CREATE TABLE IF NOT EXISTS mcp_rate_limits (session_key TEXT NOT NULL, minute INTEGER NOT NULL, count INTEGER NOT NULL DEFAULT 1, PRIMARY KEY (session_key, minute));
    `;
    const statements = schema.split(';').filter(s => s.trim().length > 0);
    const p = (async () => {
        try { await db.batch(statements.map(s => db.prepare(s))); }
        catch (e) { console.error('Schema batch failed (continuing):', e.message); }

        let current = 1;
        try {
            const versionRow = await db.prepare("SELECT value FROM settings WHERE key = 'schema_version'").first();
            if (versionRow && versionRow.value) current = parseInt(versionRow.value, 10) || 1;
        } catch (e) {}

        for (let v = current + 1; v <= SCHEMA_VERSION; v++) {
            const steps = MIGRATIONS[v] || [];
            for (const sql of steps) {
                try { await db.prepare(sql).run(); }
                catch (e) { console.log(`Migration v${v} skipped: ${e.message}`); }
            }
            try {
                await db.prepare("INSERT INTO settings (key, value) VALUES ('schema_version', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").bind(String(v)).run();
            } catch (e) { console.error(`Failed to bump schema_version to ${v}:`, e.message); }
        }
    })();
    dbInitCache.set(db, p);
    try { await p; } catch (e) { dbInitCache.delete(db); throw e; }
}

async function getSetting(db, key) { const row = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(key).first(); return row ? row.value : null; }
async function setSetting(db, key, value) { await db.prepare(`INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`).bind(key, value).run(); }
async function logAction(db, userId, action) {
    try { await db.prepare('INSERT INTO logs (user_id, action) VALUES (?, ?)').bind(userId === undefined || userId === null ? null : userId, String(action)).run(); }
    catch (e) { console.error('logAction failed:', e); }
}

// ============================================================================
// SESSIONS
// ============================================================================
const sessionCache = new Map();
const SESSION_CACHE_TTL = 30000;
async function getSession(request, env) {
    if (!env.DB) return null;
    const cookie = request.headers.get('Cookie') || '';
    const part = cookie.split(';').find(c => c.trim().startsWith('session='));
    if (!part) return null;
    const token = part.split('=')[1].trim();
    if (!token) return null;
    const cached = sessionCache.get(token);
    if (cached && (Date.now() - cached) < SESSION_CACHE_TTL) return token;
    await initializeDatabase(env.DB);
    const result = await env.DB.prepare('SELECT token FROM sessions WHERE token = ? AND user_id IS NULL AND created_at > datetime("now", "-1 day")').bind(token).first();
    if (result) { sessionCache.set(token, Date.now()); return token; }
    return null;
}
function invalidateSessionCache(token) { if (token) sessionCache.delete(token); else sessionCache.clear(); }
function sessionCookie(token, secure) { return `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400` + (secure ? '; Secure' : ''); }

// ============================================================================
// PUBLIC HANDLERS
// ============================================================================
async function getStatus(env) {
    if (!env.DB) return apiJson({ d1_bound: false });
    try {
        await initializeDatabase(env.DB);
        const [adminPass, tokenRecord, botUsername] = await Promise.all([
            env.DB.prepare("SELECT value FROM settings WHERE key = 'admin_password'").first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_username'").first(),
        ]);
        return apiJson({
            d1_bound: true,
            admin_password_set: !!(adminPass && adminPass.value) || !!env.ADMIN_PASS,
            tg_configured: !!(tokenRecord && tokenRecord.value),
            bot_username: botUsername ? botUsername.value : ''
        });
    } catch (e) { return apiJson({ d1_bound: false }); }
}
async function handleSetup(request, env) {
    if (!env.DB) return apiJson({ error: 'Database is not connected. Please check your D1 binding.' }, 500);
    await initializeDatabase(env.DB);
    const envPass = env.ADMIN_PASS || null;
    const existing = await getSetting(env.DB, 'admin_password');
    if (existing && !envPass) return apiJson({ error: 'Admin password is already set. Please sign in.' }, 400);
    const body = await request.json();
    const { botToken, adminPassword } = body;
    if (!adminPassword || adminPassword.length < 6) return apiJson({ error: 'Password must be at least 6 characters.' }, 400);
    await setSetting(env.DB, 'admin_password', await hashPassword(adminPassword));
    if (botToken) {
        const check = await validateBotToken(botToken);
        if (!check.ok) return apiJson({ error: `Invalid bot token: ${check.error || 'please double-check it'}` }, 400);
        const webhookUrl = `${new URL(request.url).origin}/webhook`;
        const secret = crypto.randomUUID();
        try { await registerWebhook(botToken, webhookUrl, secret); }
        catch (e) { return apiJson({ error: `Could not register webhook: ${e.message}` }, 500); }
        await setSetting(env.DB, 'bot_token', botToken);
        await setSetting(env.DB, 'webhook_url', webhookUrl);
        await setSetting(env.DB, 'webhook_secret', secret);
        if (check.username) await setSetting(env.DB, 'bot_username', check.username);
        if (check.name) await setSetting(env.DB, 'bot_name', check.name);
    }
    return apiJson({ success: true });
}
async function handleLogin(request, env) {
    if (!env.DB) return apiJson({ error: 'Database is not connected.' }, 500);
    await initializeDatabase(env.DB);
    const { password } = await request.json();
    if (!password) return apiJson({ error: 'Please enter your password.' }, 400);
    const minute = Math.floor(Date.now() / 60000);
    const fails = await env.DB.prepare('SELECT COALESCE(SUM(count), 0) as n FROM login_attempts WHERE minute > ?').bind(minute - 5).first();
    if (fails && fails.n >= 20) return apiJson({ error: 'Too many failed attempts. Please wait a few minutes and try again.' }, 429);
    const envPass = env.ADMIN_PASS || null;
    const stored = await getSetting(env.DB, 'admin_password');
    let ok = envPass ? envPass === password : false;
    if (!ok) ok = !!(stored && await verifyPassword(stored, password));
    if (!ok) {
        await env.DB.prepare('INSERT INTO login_attempts (minute, count) VALUES (?, 1) ON CONFLICT(minute) DO UPDATE SET count = count + 1').bind(minute).run();
        await logAction(env.DB, null, 'Dashboard login failed');
        return apiJson({ error: 'Incorrect password.' }, 401);
    }
    await maybeRehashPassword(env.DB, stored, password);
    await env.DB.prepare('DELETE FROM login_attempts').run();
    await logAction(env.DB, null, 'Dashboard login successful');
    const token = crypto.randomUUID();
    await env.DB.prepare('INSERT INTO sessions (token, user_id) VALUES (?, NULL)').bind(token).run();
    await env.DB.prepare("DELETE FROM sessions WHERE user_id IS NULL AND created_at <= datetime('now', '-1 day')").run();
    const secure = new URL(request.url).protocol === 'https:';
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Set-Cookie': sessionCookie(token, secure), ...JSON_HEADERS } });
}
async function handleLogout(request, env) {
    const cookie = request.headers.get('Cookie') || '';
    const part = cookie.split(';').find(c => c.trim().startsWith('session='));
    if (part) {
        const token = part.split('=')[1].trim();
        await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
        invalidateSessionCache(token);
    }
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Set-Cookie': 'session=; Path=/; Max-Age=0', ...JSON_HEADERS } });
}
const VERSION_CACHE_TTL_MS = 60 * 60 * 1000;
const versionCache = { data: null, fetchedAt: 0 };
async function getVersionInfo(env, fresh) {
    const current = VERSION;
    const now = Date.now();
    if (!fresh && versionCache.data && (now - versionCache.fetchedAt) < VERSION_CACHE_TTL_MS) return apiJson({ current, ...versionCache.data });
    let latest = null, released = null, notes = null, workerUrl = null;
    try {
        const res = await fetch('https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/version.json');
        if (res.ok) {
            const data = await res.json();
            latest = data.version || null; released = data.released || null;
            notes = data.notes || null; workerUrl = data.worker_url || null;
        } else {
            const workerRes = await fetch('https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/worker.js');
            if (workerRes.ok) {
                const text = await workerRes.text();
                const match = text.match(/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);
                if (match) latest = match[1];
            }
        }
    } catch (e) {}
    versionCache.data = { latest, released, notes, worker_url: workerUrl };
    versionCache.fetchedAt = now;
    return apiJson({ current, latest, released, notes, worker_url: workerUrl });
}

// ============================================================================
// STATS
// ============================================================================
async function getStats(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const [cmds, enabledCmds, users, privateUsers, admins, groupsTotal, groupsActive, aiCount, tokenRec, aiEnabledRec, botUsernameRec, aiLast24h] = await Promise.all([
            env.DB.prepare('SELECT COUNT(*) as n FROM commands').first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM commands WHERE enabled = 1').first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM users').first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM users WHERE private_started = 1').first(),
            env.DB.prepare("SELECT COUNT(*) as n FROM users WHERE role = 'admin'").first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM groups').first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM groups WHERE is_active = 1').first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM ai_messages').first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'ai_enabled'").first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_username'").first(),
            env.DB.prepare("SELECT COUNT(*) as n FROM ai_messages WHERE role = 'assistant' AND timestamp > datetime('now', '-1 day')").first(),
        ]);
        return apiJson({
            success: true,
            bot_linked: !!(tokenRec && tokenRec.value),
            bot_username: botUsernameRec ? botUsernameRec.value : '',
            commands_total: cmds ? cmds.n : 0, commands_enabled: enabledCmds ? enabledCmds.n : 0,
            users_total: users ? users.n : 0, users_private: privateUsers ? privateUsers.n : 0,
            admins_total: admins ? admins.n : 0,
            groups_total: groupsTotal ? groupsTotal.n : 0, groups_active: groupsActive ? groupsActive.n : 0,
            ai_memory_count: aiCount ? aiCount.n : 0, ai_replies_24h: aiLast24h ? aiLast24h.n : 0,
            ai_enabled: !!(aiEnabledRec && (aiEnabledRec.value === '1' || aiEnabledRec.value === true)),
        });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// AUDIT LOGS
// ============================================================================
async function getAuditLogs(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const limit = Math.min(parseInt(url.searchParams.get('limit')) || 100, 500);
        const rows = await env.DB.prepare('SELECT id, user_id, action, timestamp FROM logs ORDER BY id DESC LIMIT ?').bind(limit).all();
        return apiJson({ logs: rows.results || [] });
    } catch (err) { return internalError(err); }
}
async function clearAuditLogs(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        await env.DB.prepare('DELETE FROM logs').run();
        await logAction(env.DB, null, 'Logs cleared');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// MEMORY MANAGEMENT
// ============================================================================
async function getMemoryOverview(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        // Filter out group chats (negative IDs) — this view is per-user.
        const [aiRows, dmRows] = await Promise.all([
            env.DB.prepare('SELECT chat_id, COUNT(*) as n FROM ai_messages WHERE chat_id > 0 GROUP BY chat_id').all(),
            env.DB.prepare('SELECT chat_id, COUNT(*) as n FROM dm_messages WHERE chat_id > 0 GROUP BY chat_id').all(),
        ]);
        const aiMap = {};
        const dmMap = {};
        const idSet = new Set();
        for (const r of (aiRows.results || [])) { aiMap[r.chat_id] = r.n; idSet.add(r.chat_id); }
        for (const r of (dmRows.results || [])) { dmMap[r.chat_id] = r.n; idSet.add(r.chat_id); }
        const ids = Array.from(idSet).filter(id => id > 0);
        const userMap = {};
        const blockMap = {};
        if (ids.length) {
            for (let i = 0; i < ids.length; i += 400) {
                const slice = ids.slice(i, i + 400);
                const ph = slice.map(() => '?').join(', ');
                const [users, blocks] = await Promise.all([
                    env.DB.prepare(`SELECT id, first_name, username, private_started, role, last_active FROM users WHERE id IN (${ph})`).bind(...slice).all(),
                    env.DB.prepare(`SELECT user_id, block_type FROM blocked_users WHERE user_id IN (${ph})`).bind(...slice).all(),
                ]);
                for (const u of (users.results || [])) userMap[u.id] = u;
                for (const b of (blocks.results || [])) blockMap[b.user_id] = b.block_type;
            }
        }
        let aiTotal = 0, dmTotal = 0;
        const out = ids.map(id => {
            const ai = aiMap[id] || 0;
            const dm = dmMap[id] || 0;
            aiTotal += ai; dmTotal += dm;
            const u = userMap[id] || {};
            return {
                id,
                first_name: u.first_name || 'Unknown',
                username: u.username || '',
                private_started: u.private_started || 0,
                role: u.role || 'user',
                last_active: u.last_active || null,
                block_type: blockMap[id] || null,
                ai_count: ai,
                dm_count: dm,
                total_count: ai + dm,
            };
        }).sort((a, b) => b.total_count - a.total_count);
        return apiJson({ success: true, users: out, totals: { ai: aiTotal, dm: dmTotal, users: ids.length } });
    } catch (err) { return internalError(err); }
}
async function handleMemoryClear(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const scope = (body.scope === 'ai' || body.scope === 'dm' || body.scope === 'all') ? body.scope : 'all';
        let userId = null;
        if (body.userId !== undefined && body.userId !== null && body.userId !== '') {
            const parsed = parseInt(body.userId);
            if (isNaN(parsed) || parsed <= 0) return apiJson({ error: 'Invalid userId.' }, 400);
            userId = parsed;
        }
        await initializeDatabase(env.DB);
        const ops = [];
        if (userId) {
            if (scope === 'ai' || scope === 'all') ops.push(env.DB.prepare('DELETE FROM ai_messages WHERE chat_id = ?').bind(userId));
            if (scope === 'dm' || scope === 'all') ops.push(env.DB.prepare('DELETE FROM dm_messages WHERE chat_id = ?').bind(userId));
        } else {
            if (scope === 'ai' || scope === 'all') ops.push(env.DB.prepare('DELETE FROM ai_messages'));
            if (scope === 'dm' || scope === 'all') ops.push(env.DB.prepare('DELETE FROM dm_messages'));
        }
        if (ops.length) await env.DB.batch(ops);
        await logAction(env.DB, userId, `Memory cleared (${scope}${userId ? ' for user ' + userId : ''})`);
        return apiJson({ success: true, scope, userId });
    } catch (err) { return internalError(err); }
}

const AUTO_REMOVE_UNITS_TO_SECONDS = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2592000 // 30-day month
};
async function getAutoRemoveSettingsFromDb(db) {
    try {
        const [enabled, value, unit] = await Promise.all([
            getSetting(db, 'auto_remove_enabled'),
            getSetting(db, 'auto_remove_dm_value'),
            getSetting(db, 'auto_remove_dm_unit'),
        ]);
        const units = Object.keys(AUTO_REMOVE_UNITS_TO_SECONDS);
        return {
            enabled: enabled === '1',
            dm_value: parseInt(value) || 30,
            dm_unit: units.includes(unit) ? unit : 'days',
        };
    } catch (e) { return { enabled: false, dm_value: 30, dm_unit: 'days' }; }
}
async function getAutoRemoveSettings(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const cfg = await getAutoRemoveSettingsFromDb(env.DB);
        const aiMem = parseInt(await getSetting(env.DB, 'ai_memory')) || 0;
        return apiJson({
            success: true,
            enabled: cfg.enabled ? '1' : '0',
            dm_value: cfg.dm_value,
            dm_unit: cfg.dm_unit,
            ai_value: aiMem
        });
    } catch (err) { return internalError(err); }
}
async function saveAutoRemoveSettings(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        await initializeDatabase(env.DB);
        const enabled = (body.enabled === '1' || body.enabled === 1 || body.enabled === true) ? '1' : '0';
        const value = Math.min(Math.max(parseInt(body.dm_value) || 30, 1), 10000);
        const units = Object.keys(AUTO_REMOVE_UNITS_TO_SECONDS);
        const unit = units.includes(body.dm_unit) ? body.dm_unit : 'days';
        await setSetting(env.DB, 'auto_remove_enabled', enabled);
        await setSetting(env.DB, 'auto_remove_dm_value', String(value));
        await setSetting(env.DB, 'auto_remove_dm_unit', unit);
        await logAction(env.DB, null, 'Auto-remove memory settings updated');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function runAutoRemoveMemory(env, summary) {
    if (!env.DB) return;
    let cfg;
    try { cfg = await getAutoRemoveSettingsFromDb(env.DB); }
    catch (e) { return; }
    if (!cfg.enabled) return;

    // ----- AI memory: per-chat, respects private vs group settings -----
    const aiKeepPrivate = parseInt(await getSetting(env.DB, 'ai_memory')) || 0;
    const aiKeepGroup = parseInt(await getSetting(env.DB, 'ai_group_memory')) || aiKeepPrivate;
    if (aiKeepPrivate > 0 || aiKeepGroup > 0) {
        try {
            const chats = await env.DB.prepare('SELECT DISTINCT chat_id FROM ai_messages').all();
            let removed = 0;
            for (const row of (chats.results || [])) {
                const chatId = row.chat_id;
                let keep = aiKeepPrivate;
                // Negative chat IDs are groups.
                if (chatId < 0) {
                    try {
                        const gs = await getGroupSettings(env.DB, chatId);
                        if (gs.memory !== 'inherit' && gs.memory !== undefined && gs.memory !== null) {
                            keep = parseInt(gs.memory) || 0;
                        } else {
                            keep = aiKeepGroup;
                        }
                    } catch (e) { keep = aiKeepGroup; }
                }
                if (keep <= 0) continue;
                const limit = keep * 2;
                const cutoff = await env.DB.prepare('SELECT id FROM ai_messages WHERE chat_id = ? ORDER BY id DESC LIMIT 1 OFFSET ?')
                    .bind(chatId, limit).first();
                if (cutoff) {
                    const r = await env.DB.prepare('DELETE FROM ai_messages WHERE chat_id = ? AND id <= ?')
                        .bind(chatId, cutoff.id).run();
                    removed += (r && r.meta && r.meta.changes) || 0;
                }
            }
            if (removed) summary.ai_messages = (summary.ai_messages || 0) + removed;
        } catch (e) { /* ignore */ }
    }

    // ----- Direct messages: time-based -----
    const seconds = cfg.dm_value * (AUTO_REMOVE_UNITS_TO_SECONDS[cfg.dm_unit] || 86400);
    if (seconds > 0) {
        try {
            const r = await env.DB.prepare("DELETE FROM dm_messages WHERE created_at <= datetime('now', ?)").bind('-' + seconds + ' seconds').run();
            const n = (r && r.meta && r.meta.changes) || 0;
            if (n) summary.dm_messages = (summary.dm_messages || 0) + n;
        } catch (e) { /* ignore */ }
    }
}

// ============================================================================
// KEYBOARD PIPELINE
// ============================================================================
function kbNormalizeInline(raw) {
    if (!raw) return null;
    let obj = raw;
    if (typeof raw === 'string') { try { obj = JSON.parse(raw); } catch (e) { return null; } }
    if (!obj || typeof obj !== 'object') return null;
    let rows = null;
    if (obj.v === 2 && obj.inline) {
        rows = (Array.isArray(obj.inline) ? obj.inline : []).map(row =>
            (Array.isArray(row) ? row : [row]).map(b => {
                const type = b.type === 'url' ? 'url' : (b.type === 'command' || String(b.value || '').startsWith('/') ? 'command' : 'callback');
                return { text: String(b.text || ''), type, value: String(b.value || '') };
            }).filter(b => b.text)
        ).filter(row => row.length);
    } else if (Array.isArray(obj.inline_keyboard)) {
        rows = obj.inline_keyboard.map(row =>
            (Array.isArray(row) ? row : [row]).map(b => {
                if (!b || !b.text) return null;
                if (b.url) return { text: String(b.text), type: 'url', value: String(b.url) };
                const value = String(b.callback_data || '');
                return { text: String(b.text), type: value.startsWith('/') ? 'command' : 'callback', value };
            }).filter(Boolean)
        ).filter(row => row.length);
    }
    return (rows && rows.length) ? rows : null;
}
function kbNormalizeReply(raw) {
    if (!raw) return null;
    let obj = raw;
    if (typeof raw === 'string') { try { obj = JSON.parse(raw); } catch (e) { return null; } }
    if (!obj || typeof obj !== 'object') return null;
    const spec = { rows: [], actions: {}, resize: true, one_time: false, persistent: true, placeholder: '' };
    const readItem = (item) => {
        if (typeof item === 'string') return { text: item, command: '' };
        if (item && typeof item === 'object') return { text: String(item.text || ''), command: String(item.command || item.value || '') };
        return null;
    };
    if (obj.v === 2 && obj.reply) {
        const rep = obj.reply;
        spec.rows = (rep.rows || []).map(row => (Array.isArray(row) ? row.map(readItem) : [readItem(row)]).filter(b => b && b.text));
        spec.actions = (rep.actions && typeof rep.actions === 'object') ? rep.actions : {};
        if (typeof rep.resize === 'boolean') spec.resize = rep.resize;
        if (typeof rep.one_time === 'boolean') spec.one_time = rep.one_time;
        if (typeof rep.persistent === 'boolean') spec.persistent = rep.persistent;
        if (rep.placeholder) spec.placeholder = String(rep.placeholder).slice(0, 64);
    } else if (Array.isArray(obj.keyboard)) {
        spec.rows = obj.keyboard.map(row => (Array.isArray(row) ? row.map(readItem) : [readItem(row)]).filter(b => b && b.text));
        if (obj.resize_keyboard === false) spec.resize = false;
        if (obj.one_time_keyboard === true) spec.one_time = true;
        if (obj.is_persistent === false) spec.persistent = false;
        if (obj.input_field_placeholder) spec.placeholder = String(obj.input_field_placeholder).slice(0, 64);
    } else if (Array.isArray(obj.rows)) {
        spec.rows = obj.rows.map(row => (Array.isArray(row) ? row.map(readItem) : [readItem(row)]).filter(b => b && b.text));
        spec.actions = (obj.actions && typeof obj.actions === 'object') ? obj.actions : {};
    } else if (Array.isArray(obj)) {
        spec.rows = obj.map(readItem).filter(b => b && b.text).map(b => [b]);
    }
    spec.rows = spec.rows.filter(row => row.length);
    if (!spec.rows.length) return null;
    for (const row of spec.rows) for (const b of row) if (b.command) spec.actions[b.text] = b.command;
    return spec;
}
function kbInlineMarkup(rows) {
    if (!rows || !rows.length) return null;
    return { inline_keyboard: rows.map(row => row.map(b => b.type === 'url' ? { text: b.text, url: b.value } : { text: b.text, callback_data: b.value })) };
}
function kbReplyMarkup(spec) {
    if (!spec || !spec.rows || !spec.rows.length) return null;
    const markup = { keyboard: spec.rows.map(row => row.map(b => ({ text: b.text }))) };
    markup.resize_keyboard = spec.resize !== false;
    markup.one_time_keyboard = !!spec.one_time;
    if (spec.persistent) markup.is_persistent = true;
    if (spec.placeholder) markup.input_field_placeholder = spec.placeholder;
    return markup;
}
function buildReplyMarkup(buttonsJson) {
    if (!buttonsJson) return null;
    let obj = buttonsJson;
    if (typeof buttonsJson === 'string') { try { obj = JSON.parse(buttonsJson); } catch (e) { return null; } }
    if (!obj || typeof obj !== 'object') return null;
    const inlineRows = kbNormalizeInline(obj.v === 2 && obj.inline ? { v: 2, inline: obj.inline } : (obj.inline_keyboard ? obj : null));
    const replySpec = obj.v === 2 && obj.reply ? kbNormalizeReply({ v: 2, reply: obj.reply }) : (obj.keyboard ? kbNormalizeReply(obj) : null);
    const inlineMarkup = kbInlineMarkup(inlineRows);
    const replyMarkup = kbReplyMarkup(replySpec);
    if (!inlineMarkup && !replyMarkup) return null;
    return { markup: inlineMarkup || replyMarkup, inlineMarkup, replyMarkup, replySpec: replySpec || null, both: !!(inlineMarkup && replyMarkup) };
}
async function mergeReplyActions(db, actions) {
    if (!actions || !Object.keys(actions).length) return;
    try {
        let merged = {};
        const raw = await getSetting(db, 'reply_actions');
        if (raw) { try { merged = JSON.parse(raw) || {}; } catch (e) { merged = {}; } }
        for (const [text, command] of Object.entries(actions)) { if (text && command) merged[text] = command; }
        const keys = Object.keys(merged);
        if (keys.length > 500) { for (const k of keys.slice(0, keys.length - 500)) delete merged[k]; }
        await setSetting(db, 'reply_actions', JSON.stringify(merged));
        replyActionsCache = { data: merged, fetchedAt: Date.now() };
    } catch (e) {}
}
let replyActionsCache = { data: null, fetchedAt: 0 };
const REPLY_ACTIONS_TTL_MS = 60 * 1000;
async function getReplyActions(db) {
    if (replyActionsCache.data && Date.now() - replyActionsCache.fetchedAt < REPLY_ACTIONS_TTL_MS) return replyActionsCache.data;
    let map = {};
    try { const raw = await getSetting(db, 'reply_actions'); if (raw) map = JSON.parse(raw) || {}; } catch (e) {}
    replyActionsCache = { data: map, fetchedAt: Date.now() };
    return map;
}
let replyButtonMapCache = { data: null, fetchedAt: 0 };
const REPLY_BUTTON_MAP_TTL_MS = 60000;
async function getReplyButtonMap(db) {
    if (replyButtonMapCache.data && (Date.now() - replyButtonMapCache.fetchedAt) < REPLY_BUTTON_MAP_TTL_MS) return replyButtonMapCache.data;
    const map = {};
    try {
        const rows = await db.prepare('SELECT reply_keyboard_json FROM commands WHERE enabled = 1 AND show_reply_keyboard = 1').all();
        for (const row of (rows.results || [])) {
            if (!row.reply_keyboard_json) continue;
            const spec = kbNormalizeReply(row.reply_keyboard_json);
            if (!spec) continue;
            for (const btnRow of spec.rows) for (const btn of btnRow) if (btn.text && btn.command) map[btn.text] = btn.command;
        }
    } catch (e) {}
    replyButtonMapCache = { data: map, fetchedAt: Date.now() };
    return map;
}
function invalidateReplyButtonMap() { replyButtonMapCache = { data: null, fetchedAt: 0 }; }

// ============================================================================
// COMMANDS
// ============================================================================
async function getCommands(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const result = await env.DB.prepare('SELECT * FROM commands ORDER BY order_idx, command').all();
        return apiJson({ commands: result.results || [] });
    } catch (err) { return internalError(err); }
}
async function commandIsDescendant(db, ancestor, candidate) {
    let cur = candidate;
    while (cur) {
        if (cur === ancestor) return true;
        const row = await db.prepare('SELECT parent FROM commands WHERE command = ?').bind(cur).first();
        cur = row && row.parent ? row.parent : null;
    }
    return false;
}
async function createCommand(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { command, parent, response_type, content, media_url, is_admin_only, enabled, buttons_json, show_reply_keyboard, reply_keyboard_json } = body;
        if (!command || !content) return apiJson({ error: 'Please fill in both the command and its content.' }, 400);
        if (parent && parent === command) return apiJson({ error: 'A command cannot be its own parent.' }, 400);
        await initializeDatabase(env.DB);
        if (parent && await commandIsDescendant(env.DB, command, parent)) return apiJson({ error: 'You cannot nest a command inside its own child.' }, 400);
        const maxOrder = await env.DB.prepare('SELECT MAX(order_idx) as max FROM commands').first();
        const orderIdx = (maxOrder && maxOrder.max !== null) ? maxOrder.max + 1 : 0;
        try {
            await env.DB.prepare(`INSERT INTO commands (command, parent, response_type, content, media_url, buttons_json, is_admin_only, enabled, show_reply_keyboard, reply_keyboard_json, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                .bind(command, parent || null, response_type || 'text', content, media_url || '', buttons_json || '', is_admin_only ? 1 : 0, enabled !== undefined ? enabled : 1, show_reply_keyboard ? 1 : 0, reply_keyboard_json || '', orderIdx).run();
        } catch (e) { if (String(e.message || '').includes('UNIQUE')) return apiJson({ error: `A command named "${command}" already exists.` }, 400); throw e; }
        invalidateReplyButtonMap();
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
function rewriteCommandRefs(value, oldCommand, newCommand) {
    if (!value) return value;
    try {
        const obj = JSON.parse(value);
        const walk = (node) => {
            if (Array.isArray(node)) { node.forEach(walk); return; }
            if (node && typeof node === 'object') {
                for (const k of Object.keys(node)) {
                    if ((k === 'callback_data' || k === 'command') && node[k] === oldCommand) node[k] = newCommand;
                    else if (typeof node[k] === 'object') walk(node[k]);
                }
            }
        };
        walk(obj); return JSON.stringify(obj);
    } catch (e) { return value; }
}
async function updateCommand(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const url = new URL(request.url);
        const oldCommand = decodeURIComponent(url.pathname.split('/').pop());
        const body = await request.json();
        const { command, parent, response_type, content, media_url, is_admin_only, enabled, buttons_json, show_reply_keyboard, reply_keyboard_json } = body;
        if (!command || !content) return apiJson({ error: 'Please fill in both the command and its content.' }, 400);
        if (parent && parent === command) return apiJson({ error: 'A command cannot be its own parent.' }, 400);
        await initializeDatabase(env.DB);
        if (command !== oldCommand) {
            const clash = await env.DB.prepare('SELECT command FROM commands WHERE command = ?').bind(command).first();
            if (clash) return apiJson({ error: `A command named "${command}" already exists.` }, 400);
            if (parent && await commandIsDescendant(env.DB, command, parent)) return apiJson({ error: 'You cannot nest a command inside its own child.' }, 400);
            await env.DB.prepare(`UPDATE commands SET command = ?, parent = ?, response_type = ?, content = ?, media_url = ?, buttons_json = ?, is_admin_only = ?, enabled = ?, show_reply_keyboard = ?, reply_keyboard_json = ? WHERE command = ?`)
                .bind(command, parent || null, response_type || 'text', content, media_url || '', buttons_json || '', is_admin_only ? 1 : 0, enabled !== undefined ? enabled : 1, show_reply_keyboard ? 1 : 0, reply_keyboard_json || '', oldCommand).run();
            await env.DB.prepare('UPDATE commands SET parent = ? WHERE parent = ?').bind(command, oldCommand).run();
            const refRows = await env.DB.prepare('SELECT command, buttons_json, reply_keyboard_json FROM commands WHERE buttons_json LIKE ? OR reply_keyboard_json LIKE ?').bind(`%${oldCommand}%`, `%${oldCommand}%`).all();
            for (const row of refRows.results) {
                const nb = rewriteCommandRefs(row.buttons_json, oldCommand, command);
                const nr = rewriteCommandRefs(row.reply_keyboard_json, oldCommand, command);
                if (nb !== row.buttons_json || nr !== row.reply_keyboard_json) {
                    await env.DB.prepare('UPDATE commands SET buttons_json = ?, reply_keyboard_json = ? WHERE command = ?').bind(nb, nr, row.command).run();
                }
            }
        } else {
            if (parent && await commandIsDescendant(env.DB, command, parent)) return apiJson({ error: 'You cannot nest a command inside its own child.' }, 400);
            await env.DB.prepare(`UPDATE commands SET parent = ?, response_type = ?, content = ?, media_url = ?, buttons_json = ?, is_admin_only = ?, enabled = ?, show_reply_keyboard = ?, reply_keyboard_json = ? WHERE command = ?`)
                .bind(parent || null, response_type || 'text', content, media_url || '', buttons_json || '', is_admin_only ? 1 : 0, enabled !== undefined ? enabled : 1, show_reply_keyboard ? 1 : 0, reply_keyboard_json || '', command).run();
        }
        invalidateReplyButtonMap();
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function deleteCommand(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const url = new URL(request.url);
        const command = decodeURIComponent(url.pathname.split('/').pop());
        await initializeDatabase(env.DB);
        const toDelete = [command];
        let idx = 0;
        while (idx < toDelete.length) {
            const children = await env.DB.prepare('SELECT command FROM commands WHERE parent = ?').bind(toDelete[idx]).all();
            for (const row of children.results) toDelete.push(row.command);
            idx++;
        }
        await runBatchChunks(env.DB, toDelete.map(c => env.DB.prepare('DELETE FROM commands WHERE command = ?').bind(c)));
        invalidateReplyButtonMap();
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function reorderCommands(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { order } = await request.json();
        if (!Array.isArray(order)) return apiJson({ error: 'Invalid order.' }, 400);
        await initializeDatabase(env.DB);
        await runBatchChunks(env.DB, order.map((cmd, i) => env.DB.prepare('UPDATE commands SET order_idx = ? WHERE command = ?').bind(i, cmd)));
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function runBatchChunks(db, statements, chunkSize = 60) {
    for (let i = 0; i < statements.length; i += chunkSize) await db.batch(statements.slice(i, i + chunkSize));
}

// ============================================================================
// COMMAND PACK
// ============================================================================
async function exportCommandPack(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const commands = await env.DB.prepare('SELECT command, parent, response_type, content, media_url, buttons_json, is_admin_only, enabled, show_reply_keyboard, reply_keyboard_json FROM commands ORDER BY order_idx, command').all();
        let menu = [];
        const raw = await getSetting(env.DB, 'menu_commands');
        if (raw) { try { menu = JSON.parse(raw); } catch (e) {} }
        return apiJson({ success: true, data: { app: 'nyxx-command-pack', version: VERSION, exported_at: new Date().toISOString(), commands: commands.results || [], menu } });
    } catch (err) { return internalError(err); }
}
async function importCommandPack(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const data = body.data || {};
        const mode = body.mode === 'replace' ? 'replace' : 'merge';
        const rows = data.commands;
        if (data.app !== 'nyxx-command-pack' || !Array.isArray(rows) || !rows.length) return apiJson({ error: 'This file is not a valid command pack.' }, 400);
        const valid = rows.filter(c => c && typeof c.command === 'string' && typeof c.content === 'string');
        if (!valid.length) return apiJson({ error: 'No valid commands found in the file.' }, 400);
        await initializeDatabase(env.DB);
        if (mode === 'replace') await env.DB.prepare('DELETE FROM commands').run();
        const stmts = valid.map((c, i) => env.DB.prepare(`
            INSERT INTO commands (command, parent, response_type, content, media_url, buttons_json, is_admin_only, enabled, show_reply_keyboard, reply_keyboard_json, order_idx)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(command) DO UPDATE SET
                parent = excluded.parent, response_type = excluded.response_type, content = excluded.content,
                media_url = excluded.media_url, buttons_json = excluded.buttons_json,
                is_admin_only = excluded.is_admin_only, enabled = excluded.enabled,
                show_reply_keyboard = excluded.show_reply_keyboard, reply_keyboard_json = excluded.reply_keyboard_json
        `).bind(c.command, c.parent || null, c.response_type || 'text', c.content || '', c.media_url || '', c.buttons_json || '', c.is_admin_only ? 1 : 0, c.enabled != 0 ? 1 : 0, c.show_reply_keyboard ? 1 : 0, c.reply_keyboard_json || '', i));
        await runBatchChunks(env.DB, stmts);
        if (Array.isArray(data.menu) && data.menu.length) {
            const ok = data.menu.filter(m => m && m.command && m.description);
            if (ok.length) await setSetting(env.DB, 'menu_commands', JSON.stringify(ok));
        }
        invalidateReplyButtonMap();
        await logAction(env.DB, null, `Command pack imported (${valid.length})`);
        return apiJson({ success: true, imported: valid.length });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// MENU COMMANDS
// ============================================================================
async function getMenuCommands(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const raw = await getSetting(env.DB, 'menu_commands');
        let menu = [];
        if (raw) { try { menu = JSON.parse(raw); } catch (e) {} }
        return apiJson({ menu });
    } catch (err) { return internalError(err); }
}
async function setMenuCommands(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { menu } = await request.json();
        if (!menu || !Array.isArray(menu)) return apiJson({ error: 'Menu data is invalid.' }, 400);
        for (const e of menu) if (!e.command || !e.description) return apiJson({ error: 'Every menu entry needs both a command and a description.' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        await setSetting(env.DB, 'menu_commands', JSON.stringify(menu));
        if (!token) {
            return apiJson({ success: true, warning: 'Saved locally. Connect your bot token in Settings to publish the menu to Telegram.' });
        }
        try {
            const resp = await tgFetchJson(`https://api.telegram.org/bot${token}/setMyCommands`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ commands: menu }) });
            if (!resp.ok) {
                return apiJson({ success: true, warning: 'Saved locally, but Telegram rejected the publish: ' + (resp.description || 'unknown error') });
            }
        } catch (e) {
            return apiJson({ success: true, warning: 'Saved locally, but could not reach Telegram: ' + e.message });
        }
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// FEATURED COMMANDS
// ============================================================================
async function getFeatured(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare('SELECT * FROM featured_replies ORDER BY id DESC').all();
        return apiJson({ items: rows.results || [] });
    } catch (err) { return internalError(err); }
}
async function createFeatured(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const command = String(body.command || '').trim();
        if (!command || command === '/') return apiJson({ error: 'Please enter a command starting with "/".' }, 400);
        const content = String(body.content || '').trim();
        const successText = String(body.success_text || '').trim();
        const failureText = String(body.failure_text || '').trim();
        const kind = (body.kind === 'buttons' || body.kind === 'mcp') ? body.kind : 'text';
        const enabled = body.enabled ? 1 : 0;
        const adminOnly = body.admin_only ? 1 : 0;
        await initializeDatabase(env.DB);
        try {
            await env.DB.prepare('INSERT INTO featured_replies (command, kind, content, buttons_json, success_text, failure_text, admin_only, enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
                .bind(command, kind, content, null, successText, failureText, adminOnly, enabled).run();
        } catch (e) {
            if (String(e.message || '').includes('UNIQUE')) return apiJson({ error: `A featured command with the command "${command}" already exists.` }, 400);
            throw e;
        }
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function updateFeatured(request, env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const id = parseInt(url.pathname.split('/').pop());
        const body = await request.json();
        await initializeDatabase(env.DB);
        const existing = await env.DB.prepare('SELECT * FROM featured_replies WHERE id = ?').bind(id).first();
        if (!existing) return apiJson({ error: 'This featured command no longer exists.' }, 404);
        const command = body.command !== undefined ? String(body.command).trim() : existing.command;
        const content = body.content !== undefined ? String(body.content).trim() : (existing.content || '');
        const successText = body.success_text !== undefined ? String(body.success_text).trim() : (existing.success_text || '');
        const failureText = body.failure_text !== undefined ? String(body.failure_text).trim() : (existing.failure_text || '');
        const kind = body.kind !== undefined ? ((body.kind === 'buttons' || body.kind === 'mcp') ? body.kind : 'text') : existing.kind;
        const enabled = body.enabled !== undefined ? (body.enabled ? 1 : 0) : existing.enabled;
        const adminOnly = body.admin_only !== undefined ? (body.admin_only ? 1 : 0) : (existing.admin_only || 0);
        await env.DB.prepare('UPDATE featured_replies SET command = ?, kind = ?, content = ?, buttons_json = NULL, success_text = ?, failure_text = ?, admin_only = ?, enabled = ? WHERE id = ?')
            .bind(command, kind, content, successText, failureText, adminOnly, enabled, id).run();
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function deleteFeatured(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const id = parseInt(url.pathname.split('/').pop());
        await initializeDatabase(env.DB);
        await env.DB.prepare('DELETE FROM featured_replies WHERE id = ?').bind(id).run();
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// --- Featured command parsing helpers -------------------------------------

function stripOuterQuotes(s) {
    s = String(s || '').trim();
    if (s.length >= 2) {
        const first = s[0], last = s[s.length - 1];
        if ((first === '"' && last === '"') || (first === "'" && last === "'")) return s.slice(1, -1);
    }
    return s;
}
function parseButtonsCommandArgs(args) {
    // Expected: "<message>" {label}(value) {label}(value) ...
    const result = { message: '', buttons: [] };
    let working = String(args || '').trim();
    if (!working) return result;
    const msgMatch = working.match(/^"((?:[^"\\]|\\.)*)"/);
    if (msgMatch) {
        result.message = msgMatch[1].replace(/\\"/g, '"');
        working = working.slice(msgMatch[0].length).trim();
    }
    const re = /\{([^{}]*)\}\(([^()]*)\)/g;
    let m;
    while ((m = re.exec(working))) {
        const label = stripOuterQuotes(m[1]);
        const value = stripOuterQuotes(m[2]);
        if (!label || !value) continue;
        let type = 'text';
        if (/^https?:\/\//i.test(value)) type = 'url';
        else if (value.startsWith('/')) type = 'command';
        result.buttons.push({ text: label, type, value });
    }
    return result;
}
async function encodeTextCallback(db, text) {
    const prefixed = 'T:' + text;
    if (prefixed.length <= 64) return prefixed;
    const hash = simpleHashStr(text);
    try { await setSetting(db, 'cbv_' + hash, text); } catch (e) {}
    return 'T:H:' + hash;
}
async function decodeTextCallback(db, data) {
    if (!data || typeof data !== 'string') return null;
    if (!data.startsWith('T:')) return null;
    const rest = data.slice(2);
    if (rest.startsWith('H:')) {
        const hash = rest.slice(2);
        try { return await getSetting(db, 'cbv_' + hash); } catch (e) { return null; }
    }
    return rest;
}
async function buildFeaturedInlineKeyboard(db, buttons) {
    if (!buttons || !buttons.length) return null;
    const rows = [];
    let current = [];
    for (const b of buttons) {
        let tgBtn;
        if (b.type === 'url') {
            tgBtn = { text: b.text, url: b.value };
        } else if (b.type === 'command') {
            tgBtn = { text: b.text, callback_data: b.value };
        } else {
            const cb = await encodeTextCallback(db, b.value);
            tgBtn = { text: b.text, callback_data: cb };
        }
        current.push(tgBtn);
        if (current.length >= 3) { rows.push(current); current = []; }
    }
    if (current.length) rows.push(current);
    return { inline_keyboard: rows };
}

// ============================================================================
// USERS
// ============================================================================
async function getUsers(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        let query = 'SELECT u.id, u.username, u.first_name, u.role, u.is_premium, u.private_started, u.last_active, b.block_type FROM users u LEFT JOIN blocked_users b ON u.id = b.user_id';
        const where = []; const params = [];
        const filter = url.searchParams.get('filter') || 'all';
        const search = (url.searchParams.get('search') || '').trim();
        if (filter === 'private') where.push('u.private_started = 1');
        else if (filter === 'group') where.push('COALESCE(u.private_started, 0) = 0');
        else if (filter === 'admin') where.push("u.role = 'admin'");
        else if (filter === 'blocked') where.push('b.block_type IS NOT NULL');
        if (search) { where.push('(u.username LIKE ? OR u.first_name LIKE ?)'); params.push('%' + search + '%', '%' + search + '%'); }
        if (where.length) query += ' WHERE ' + where.join(' AND ');
        query += ' ORDER BY u.last_active DESC LIMIT 300';
        const result = await env.DB.prepare(query).bind(...params).all();
        return apiJson({ users: result.results || [] });
    } catch (err) { return internalError(err); }
}
async function updateUserRole(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { userId, role } = await request.json();
        if (!userId || !role) return apiJson({ error: 'Missing user or role.' }, 400);
        await initializeDatabase(env.DB);
        await env.DB.prepare('UPDATE users SET role = ? WHERE id = ?').bind(role, userId).run();
        await logAction(env.DB, userId, `Role changed to ${role}`);
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function checkUserStarted(request, env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const id = parseInt(url.pathname.split('/')[3]);
        if (!id) return apiJson({ error: 'Invalid user ID.' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set, so we can\'t run the check.' }, 400);
        const res = await tgCall(token, 'sendChatAction', { chat_id: id, action: 'typing' });
        const canMessage = !!(res && res.ok);
        if (canMessage) {
            await env.DB.prepare('UPDATE users SET private_started = 1 WHERE id = ?').bind(id).run();
        } else {
            await env.DB.prepare('UPDATE users SET private_started = 0 WHERE id = ?').bind(id).run();
        }
        return apiJson({ success: true, can_message: canMessage, error: canMessage ? null : (res && res.description) || 'Cannot message this user.' });
    } catch (err) { return internalError(err); }
}
async function deleteUser(request, env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const id = parseInt(url.pathname.split('/').pop());
        if (!id) return apiJson({ error: 'Invalid user ID.' }, 400);
        await initializeDatabase(env.DB);
        await env.DB.batch([
            env.DB.prepare('DELETE FROM users WHERE id = ?').bind(id),
            env.DB.prepare('DELETE FROM ai_messages WHERE chat_id = ?').bind(id),
            env.DB.prepare('DELETE FROM dm_messages WHERE chat_id = ?').bind(id),
            env.DB.prepare('DELETE FROM blocked_users WHERE user_id = ?').bind(id),
            env.DB.prepare("DELETE FROM sessions WHERE user_id = ? AND token LIKE 'bot-%'").bind(id),
        ]);
        await logAction(env.DB, id, 'User deleted');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function blockUser(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { userId, blockType } = await request.json();
        if (!userId) return apiJson({ error: 'Missing userId.' }, 400);
        const type = blockType === 'ai_only' ? 'ai_only' : 'full';
        await initializeDatabase(env.DB);
        await env.DB.prepare('INSERT INTO blocked_users (user_id, block_type) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET block_type = excluded.block_type, blocked_at = CURRENT_TIMESTAMP').bind(userId, type).run();
        await logAction(env.DB, userId, `Blocked (${type})`);
        return apiJson({ success: true, block_type: type });
    } catch (err) { return internalError(err); }
}
async function unblockUser(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { userId } = await request.json();
        if (!userId) return apiJson({ error: 'Missing userId.' }, 400);
        await initializeDatabase(env.DB);
        await env.DB.prepare('DELETE FROM blocked_users WHERE user_id = ?').bind(userId).run();
        await logAction(env.DB, userId, 'Unblocked');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function getBlockStatus(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const userId = parseInt(url.pathname.split('/').pop());
        await initializeDatabase(env.DB);
        const row = await env.DB.prepare('SELECT block_type FROM blocked_users WHERE user_id = ?').bind(userId).first();
        return apiJson({ blocked: !!row, block_type: row ? row.block_type : null });
    } catch (err) { return internalError(err); }
}
async function isUserBlocked(env, userId) {
    if (!env.DB) return null;
    try {
        await initializeDatabase(env.DB);
        const row = await env.DB.prepare('SELECT block_type FROM blocked_users WHERE user_id = ?').bind(userId).first();
        return row ? row.block_type : null;
    } catch (e) { return null; }
}

// ============================================================================
// DM MESSAGES
// ============================================================================
async function logDm(db, chatId, direction, source, kind, text, photoUrl, messageId, buttonsJson) {
    try {
        await db.prepare('INSERT INTO dm_messages (chat_id, message_id, direction, source, kind, text, photo_url, buttons_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
            .bind(chatId, messageId || null, direction, source || null, kind || 'text', text || '', photoUrl || null, buttonsJson || null).run();
    } catch (e) {}
}
async function getUserDmMessages(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const userId = parseInt(url.pathname.split('/')[3]);
        if (isNaN(userId)) return apiJson({ error: 'Invalid user ID.' }, 400);
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare('SELECT * FROM dm_messages WHERE chat_id = ? ORDER BY id ASC LIMIT 300').bind(userId).all();
        return apiJson({ messages: rows.results || [] });
    } catch (err) { return internalError(err); }
}
async function getUserChatHistory(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const userId = parseInt(url.pathname.split('/')[3]);
        if (isNaN(userId)) return apiJson({ error: 'Invalid user ID.' }, 400);
        const rows = await env.DB.prepare('SELECT id, role, content, timestamp FROM (SELECT id, role, content, timestamp FROM ai_messages WHERE chat_id = ? ORDER BY id DESC LIMIT 200) ORDER BY id ASC').bind(userId).all();
        return apiJson({ messages: rows.results || [] });
    } catch (e) { return internalError(e); }
}
async function clearUserMemory(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const userId = parseInt(url.pathname.split('/')[3]);
        if (isNaN(userId)) return apiJson({ error: 'Invalid user ID.' }, 400);
        await env.DB.prepare('DELETE FROM ai_messages WHERE chat_id = ?').bind(userId).run();
        return apiJson({ success: true });
    } catch (e) { return internalError(e); }
}
async function updateAiMessage(request, env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const parts = url.pathname.split('/');
        const userId = parseInt(parts[3]);
        const msgId = parseInt(parts[5]);
        const { content } = await request.json();
        if (!userId || !msgId || content === undefined) return apiJson({ error: 'Missing fields.' }, 400);
        await initializeDatabase(env.DB);
        await env.DB.prepare('UPDATE ai_messages SET content = ? WHERE id = ? AND chat_id = ?').bind(String(content), msgId, userId).run();
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function deleteAiMessage(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const parts = url.pathname.split('/');
        const userId = parseInt(parts[3]);
        const msgId = parseInt(parts[5]);
        if (!userId || !msgId) return apiJson({ error: 'Missing fields.' }, 400);
        await initializeDatabase(env.DB);
        await env.DB.prepare('DELETE FROM ai_messages WHERE id = ? AND chat_id = ?').bind(msgId, userId).run();
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function sendUserPrivateMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { userId, message, photo_url: photoUrl, buttons_json: buttonsJson } = body;
        if (!userId || (!message && !photoUrl)) return apiJson({ error: 'Please provide a userId and a message or photo.' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set. Please add it in Settings.' }, 400);
        const built = buttonsJson ? buildReplyMarkup(buttonsJson) : null;
        const markup = built && built.markup ? JSON.stringify(built.markup) : null;
        const kind = photoUrl ? 'photo' : 'text';
        const payload = { chat_id: userId };
        if (photoUrl) { payload.photo = photoUrl; if (message) { payload.caption = message; payload.parse_mode = 'HTML'; } }
        else { payload.text = message; payload.parse_mode = 'HTML'; }
        if (markup) payload.reply_markup = markup;
        const method = photoUrl ? 'sendPhoto' : 'sendMessage';
        let resp = await tgFetchJson(`https://api.telegram.org/bot${token}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!resp.ok && isHtmlParseError(resp)) {
            const plain = Object.assign({}, payload);
            if (photoUrl) { if (message) plain.caption = htmlToPlain(message); delete plain.parse_mode; }
            else { plain.text = htmlToPlain(message); delete plain.parse_mode; }
            resp = await tgFetchJson(`https://api.telegram.org/bot${token}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(plain) });
        }
        if (!resp.ok) {
            const desc = (resp && resp.description) || 'Telegram error';
            const friendly = /blocked|not started|chat not found|user not found|bot can't initiate/i.test(desc) ?
                'This user has not started the bot or has blocked it, so we can\'t send them a message.' : desc;
            return apiJson({ error: friendly }, 500);
        }
        const messageId = resp.result && resp.result.message_id;
        if (built && built.both && built.replyMarkup) {
            await tgFetchJson(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: userId, text: ' ', reply_markup: JSON.stringify(built.replyMarkup) }) });
        }
        if (built && built.replySpec && built.replySpec.actions) await mergeReplyActions(env.DB, built.replySpec.actions);
        await logDm(env.DB, userId, 'out', 'admin', kind, message || '', photoUrl || null, messageId, buttonsJson || null);
        await logAction(env.DB, userId, 'Direct message sent');
        return apiJson({ success: true, message_id: messageId });
    } catch (err) { return internalError(err); }
}
async function editSentMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { chatId, messageId, kind, text, photo_url: photoUrl, buttons_json: buttonsJson } = await request.json();
        if (!chatId || !messageId) return apiJson({ error: 'Missing chatId or messageId.' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set.' }, 400);
        const built = buttonsJson ? buildReplyMarkup(buttonsJson) : null;
        const inlineMarkup = built && built.inlineMarkup ? built.inlineMarkup : null;
        const isPhoto = kind === 'photo' || !!photoUrl;
        const method = isPhoto ? 'editMessageCaption' : 'editMessageText';
        const payload = { chat_id: chatId, message_id: messageId };
        if (isPhoto) { if (text) payload.caption = text; } else payload.text = text || ' ';
        payload.reply_markup = inlineMarkup || { inline_keyboard: [] };
        payload.parse_mode = 'HTML';
        let resp = await tgFetchJson(`https://api.telegram.org/bot${token}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!resp.ok && isHtmlParseError(resp)) {
            const plain = Object.assign({}, payload); delete plain.parse_mode;
            if (isPhoto) { if (text) plain.caption = htmlToPlain(text); } else plain.text = htmlToPlain(text || ' ');
            resp = await tgFetchJson(`https://api.telegram.org/bot${token}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(plain) });
        }
        if (!resp.ok) return apiJson({ error: (resp && resp.description) || 'Telegram error' }, 500);
        if (built && built.replyMarkup) {
            await tgFetchJson(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: ' ', reply_markup: JSON.stringify(built.replyMarkup) }) });
        }
        if (built && built.replySpec && built.replySpec.actions) await mergeReplyActions(env.DB, built.replySpec.actions);
        try {
            await env.DB.prepare('UPDATE dm_messages SET text = ?, buttons_json = ?, photo_url = ?, edited_at = CURRENT_TIMESTAMP WHERE chat_id = ? AND message_id = ?')
                .bind(text || '', buttonsJson || null, photoUrl || null, chatId, messageId).run();
        } catch (e) {}
        await logAction(env.DB, chatId, 'Direct message edited');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function deleteSentMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { chatId, messageId } = await request.json();
        if (!chatId || !messageId) return apiJson({ error: 'Missing chatId or messageId.' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set.' }, 400);
        const resp = await tgFetchJson(`https://api.telegram.org/bot${token}/deleteMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, message_id: messageId }) });
        if (!resp.ok) return apiJson({ error: (resp && resp.description) || 'Telegram error' }, 500);
        await env.DB.prepare('DELETE FROM dm_messages WHERE chat_id = ? AND message_id = ?').bind(chatId, messageId).run();
        await logAction(env.DB, chatId, 'Direct message deleted');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// GROUPS
// ============================================================================
const GROUP_DEFAULT_SETTINGS = {
    ai: 'inherit', memory: 'inherit', mention: 'inherit',
    welcome_enabled: false, welcome_text: '', rules_text: '',
    anti_flood: false, flood_limit: 6, link_filter: false,
    auto_delete_service: false, track_members: false,
};
async function getGroups(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare('SELECT id, title, type, username, added_at, last_active, is_active, settings_json, member_count FROM groups ORDER BY last_active DESC LIMIT 300').all();
        const groups = (rows.results || []).map(g => {
            let s = {};
            try { s = JSON.parse(g.settings_json || '{}'); } catch (e) {}
            return Object.assign({}, g, { ai_state: s.ai === 'on' ? 'on' : (s.ai === 'off' ? 'off' : 'inherit') });
        });
        return apiJson({ groups });
    } catch (err) { return internalError(err); }
}
async function getGroupDetail(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const id = parseInt(url.pathname.split('/').pop());
        await initializeDatabase(env.DB);
        const row = await env.DB.prepare('SELECT * FROM groups WHERE id = ?').bind(id).first();
        if (!row) return apiJson({ error: 'Group not found.' }, 404);
        let settings = {};
        try { settings = JSON.parse(row.settings_json || '{}'); } catch (e) {}
        return apiJson({ group: row, settings: Object.assign({}, GROUP_DEFAULT_SETTINGS, settings) });
    } catch (err) { return internalError(err); }
}
async function saveGroupSettings(request, env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const id = parseInt(url.pathname.split('/')[3]);
        const body = await request.json();
        await initializeDatabase(env.DB);
        const clean = Object.assign({}, GROUP_DEFAULT_SETTINGS, body);
        await env.DB.prepare('UPDATE groups SET settings_json = ? WHERE id = ?').bind(JSON.stringify(clean), id).run();
        await logAction(env.DB, null, `Group ${id} settings updated`);
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function deleteGroup(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const id = parseInt(url.pathname.split('/').pop());
        await initializeDatabase(env.DB);
        await env.DB.prepare('DELETE FROM groups WHERE id = ?').bind(id).run();
        await logAction(env.DB, null, `Group ${id} removed from dashboard`);
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function sendGroupMessage(request, env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const id = parseInt(url.pathname.split('/')[3]);
        const { message, photo_url: photoUrl, buttons_json: buttonsJson } = await request.json();
        if (!message && !photoUrl) return apiJson({ error: 'Please write a message or set a photo.' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set.' }, 400);
        const built = buttonsJson ? buildReplyMarkup(buttonsJson) : null;
        const markup = built && built.markup ? built.markup : null;
        const payload = { chat_id: id };
        if (photoUrl) { payload.photo = photoUrl; if (message) { payload.caption = message; payload.parse_mode = 'HTML'; } }
        else { payload.text = message; payload.parse_mode = 'HTML'; }
        if (markup) payload.reply_markup = markup;
        const method = photoUrl ? 'sendPhoto' : 'sendMessage';
        const resp = await tgCall(token, method, payload);
        if (!resp || !resp.ok) return apiJson({ error: (resp && resp.description) || 'Telegram error' }, 500);
        if (built && built.both && built.replyMarkup) await tgCall(token, 'sendMessage', { chat_id: id, text: ' ', reply_markup: built.replyMarkup });
        if (built && built.replySpec && built.replySpec.actions) await mergeReplyActions(env.DB, built.replySpec.actions);
        await logAction(env.DB, null, `Announcement sent to group ${id}`);
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function getGroupSettings(db, chatId) {
    try {
        const row = await db.prepare('SELECT settings_json FROM groups WHERE id = ?').bind(chatId).first();
        let s = {};
        if (row && row.settings_json) { try { s = JSON.parse(row.settings_json); } catch (e) {} }
        return Object.assign({}, GROUP_DEFAULT_SETTINGS, s);
    } catch (e) { return Object.assign({}, GROUP_DEFAULT_SETTINGS); }
}
async function upsertGroup(db, chat, isActive) {
    try {
        await db.prepare(`
            INSERT INTO groups (id, title, type, username, is_active, last_active, member_count)
            VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 0)
            ON CONFLICT(id) DO UPDATE SET
                title = excluded.title, type = excluded.type, username = excluded.username,
                is_active = excluded.is_active, last_active = CURRENT_TIMESTAMP
        `).bind(chat.id, chat.title || '', chat.type || 'group', chat.username || '', isActive ? 1 : 0).run();
    } catch (e) {}
}

// ============================================================================
// BROADCAST
// ============================================================================
const BROADCAST_DEFAULTS = { batch_size: 25, delay_ms: 1000, timeout_ms: 10000 };
async function getBroadcastSettings(env) {
    const [bs, dm, tm] = await Promise.all([
        getSetting(env.DB, 'broadcast_batch_size'),
        getSetting(env.DB, 'broadcast_delay_ms'),
        getSetting(env.DB, 'broadcast_timeout_ms'),
    ]);
    const clamp = (v, def, min, max) => Math.min(Math.max(parseInt(v) || def, min), max);
    return { batch_size: clamp(bs, BROADCAST_DEFAULTS.batch_size, 1, 100), delay_ms: clamp(dm, BROADCAST_DEFAULTS.delay_ms, 0, 60000), timeout_ms: clamp(tm, BROADCAST_DEFAULTS.timeout_ms, 2000, 60000) };
}
async function handleBroadcastSettings(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        if (request.method === 'GET') return apiJson({ success: true, settings: await getBroadcastSettings(env) });
        const body = await request.json();
        if (body.batch_size !== undefined) await setSetting(env.DB, 'broadcast_batch_size', String(Math.min(Math.max(parseInt(body.batch_size) || 25, 1), 100)));
        if (body.delay_ms !== undefined) await setSetting(env.DB, 'broadcast_delay_ms', String(Math.min(Math.max(parseInt(body.delay_ms) || 0, 0), 60000)));
        if (body.timeout_ms !== undefined) await setSetting(env.DB, 'broadcast_timeout_ms', String(Math.min(Math.max(parseInt(body.timeout_ms) || 10000, 2000), 60000)));
        return apiJson({ success: true, settings: await getBroadcastSettings(env) });
    } catch (err) { return internalError(err); }
}
function sleepMs(ms) { return new Promise(r => setTimeout(r, ms)); }
async function broadcastToUser(token, uid, built, markup, content, timeoutMs) {
    if (content.kind === 'photo') {
        const payload = { chat_id: uid, photo: content.photoUrl };
        if (content.text) { payload.caption = content.text; payload.parse_mode = 'HTML'; }
        if (markup) payload.reply_markup = markup;
        let res = await tgCall(token, 'sendPhoto', payload, { timeoutMs });
        if ((!res || !res.ok) && content.text && isHtmlParseError(res)) res = await tgCall(token, 'sendPhoto', Object.assign({}, payload, { caption: htmlToPlain(content.text) }), { timeoutMs });
        if (!res || !res.ok) return { ok: false };
        if (built && built.both && built.replyMarkup) await tgCall(token, 'sendMessage', { chat_id: uid, text: ' ', reply_markup: built.replyMarkup }, { timeoutMs });
        return { ok: true, messageId: res.result && res.result.message_id };
    }
    const extra = markup ? { reply_markup: markup } : {};
    const res = await sendRichText(token, uid, content.text, extra);
    if (!res || !res.ok) return { ok: false };
    if (built && built.both && built.replyMarkup) await tgCall(token, 'sendMessage', { chat_id: uid, text: ' ', reply_markup: built.replyMarkup }, { timeoutMs });
    return { ok: true, messageId: res.result && res.result.message_id };
}
async function handleBroadcast(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not configured. Please add it in Settings.' }, 400);
        const { userIds, message, photo_url: photoUrl, buttons_json: buttonsJson } = await request.json();
        if ((!message || !String(message).trim()) && !photoUrl) return apiJson({ error: 'Please write a message or set a photo.' }, 400);
        if (!userIds || !userIds.length) return apiJson({ error: 'No recipients selected.' }, 400);
        const built = buttonsJson ? buildReplyMarkup(buttonsJson) : null;
        const markup = built && built.markup ? built.markup : null;
        const uniqueIds = [...new Set(userIds)];
        const settings = await getBroadcastSettings(env);
        const blockedSet = new Set();
        for (let i = 0; i < uniqueIds.length; i += 400) {
            const slice = uniqueIds.slice(i, i + 400);
            const ph = slice.map(() => '?').join(', ');
            const rows = await env.DB.prepare(`SELECT user_id FROM blocked_users WHERE block_type = 'full' AND user_id IN (${ph})`).bind(...slice).all();
            for (const r of (rows.results || [])) blockedSet.add(r.user_id);
        }
        const kind = photoUrl ? 'photo' : 'text';
        const content = { kind, text: message || '', photoUrl: photoUrl || '' };
        let broadcastId = null;
        try {
            const histRes = await env.DB.prepare('INSERT INTO broadcast_history (message, photo_url, kind, buttons_json, recipient_count, sent_count, sent_at) VALUES (?, ?, ?, ?, ?, 0, datetime("now"))').bind(message || '', photoUrl || null, kind, buttonsJson || null, uniqueIds.length).run();
            broadcastId = histRes && histRes.meta ? histRes.meta.last_row_id : null;
        } catch (e) {}
        let sent = 0, failed = 0, skipped = 0;
        const recipientRows = [];
        const chunks = [];
        for (let i = 0; i < uniqueIds.length; i += settings.batch_size) chunks.push(uniqueIds.slice(i, i + settings.batch_size));
        for (let ci = 0; ci < chunks.length; ci++) {
            const results = await Promise.allSettled(chunks[ci].map(async (uid) => {
                if (blockedSet.has(uid)) return { ok: false, skipped: true };
                return broadcastToUser(token, uid, built, markup, content, settings.timeout_ms);
            }));
            for (let ri = 0; ri < results.length; ri++) {
                const r = results[ri];
                const v = r.status === 'fulfilled' ? r.value : { ok: false };
                if (v.ok) { sent++; if (broadcastId !== null && v.messageId) recipientRows.push([broadcastId, chunks[ci][ri], v.messageId]); }
                else if (v.skipped) skipped++;
                else failed++;
            }
            if (settings.delay_ms > 0 && ci < chunks.length - 1) await sleepMs(settings.delay_ms);
        }
        if (broadcastId !== null && recipientRows.length) {
            try { await runBatchChunks(env.DB, recipientRows.map(r => env.DB.prepare('INSERT OR IGNORE INTO broadcast_recipients (broadcast_id, chat_id, message_id) VALUES (?, ?, ?)').bind(...r)), 100); } catch (e) {}
        }
        if (broadcastId !== null) { try { await env.DB.prepare('UPDATE broadcast_history SET sent_count = ? WHERE id = ?').bind(sent, broadcastId).run(); } catch (e) {} }
        if (built && built.replySpec && built.replySpec.actions) await mergeReplyActions(env.DB, built.replySpec.actions);
        await logAction(env.DB, null, `Broadcast sent to ${sent}/${uniqueIds.length}`);
        return apiJson({ success: true, sent, failed, skipped, broadcast_id: broadcastId });
    } catch (e) { return internalError(e); }
}
async function editBroadcastMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { broadcastId, message, buttons_json: buttonsJson, photo_url: photoUrl } = await request.json();
        if (!broadcastId) return apiJson({ error: 'Missing broadcast ID.' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set.' }, 400);
        const hist = await env.DB.prepare('SELECT kind, buttons_json FROM broadcast_history WHERE id = ?').bind(broadcastId).first();
        if (!hist) return apiJson({ error: 'Broadcast not found.' }, 404);
        const effectiveButtons = buttonsJson !== undefined ? buttonsJson : hist.buttons_json;
        const built = effectiveButtons ? buildReplyMarkup(effectiveButtons) : null;
        const inlineMarkup = built && built.inlineMarkup ? built.inlineMarkup : null;
        const settings = await getBroadcastSettings(env);
        const recRows = await env.DB.prepare('SELECT chat_id, message_id FROM broadcast_recipients WHERE broadcast_id = ?').bind(broadcastId).all();
        const recipients = recRows.results || [];
        const isPhoto = hist.kind === 'photo' || !!photoUrl;
        const method = isPhoto ? 'editMessageCaption' : 'editMessageText';
        let updated = 0, failed = 0;
        const chunks = [];
        for (let i = 0; i < recipients.length; i += settings.batch_size) chunks.push(recipients.slice(i, i + settings.batch_size));
        for (let ci = 0; ci < chunks.length; ci++) {
            const results = await Promise.allSettled(chunks[ci].map(async (row) => {
                const payload = { chat_id: row.chat_id, message_id: row.message_id, parse_mode: 'HTML' };
                if (isPhoto) { if (message) payload.caption = message; } else payload.text = message || ' ';
                payload.reply_markup = inlineMarkup || { inline_keyboard: [] };
                let resp = await tgCall(token, method, payload, { timeoutMs: settings.timeout_ms });
                if ((!resp || !resp.ok) && isHtmlParseError(resp)) {
                    const plain = Object.assign({}, payload); delete plain.parse_mode;
                    if (isPhoto) { if (message) plain.caption = htmlToPlain(message); } else plain.text = htmlToPlain(message || ' ');
                    resp = await tgCall(token, method, plain, { timeoutMs: settings.timeout_ms });
                }
                return !!(resp && resp.ok);
            }));
            for (const r of results) { if (r.status === 'fulfilled' && r.value) updated++; else failed++; }
            if (settings.delay_ms > 0 && ci < chunks.length - 1) await sleepMs(settings.delay_ms);
        }
        try { await env.DB.prepare('UPDATE broadcast_history SET message = ?, buttons_json = ? WHERE id = ?').bind(message || '', effectiveButtons || null, broadcastId).run(); } catch (e) {}
        await logAction(env.DB, null, `Broadcast #${broadcastId} edited`);
        return apiJson({ success: true, updated, failed, total: recipients.length });
    } catch (err) { return internalError(err); }
}
async function deleteBroadcastMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { broadcastId } = await request.json();
        if (!broadcastId) return apiJson({ error: 'Missing broadcast ID.' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set.' }, 400);
        const settings = await getBroadcastSettings(env);
        const recRows = await env.DB.prepare('SELECT chat_id, message_id FROM broadcast_recipients WHERE broadcast_id = ?').bind(broadcastId).all();
        const recipients = recRows.results || [];
        let deleted = 0, failed = 0;
        const chunks = [];
        for (let i = 0; i < recipients.length; i += settings.batch_size) chunks.push(recipients.slice(i, i + settings.batch_size));
        for (let ci = 0; ci < chunks.length; ci++) {
            const results = await Promise.allSettled(chunks[ci].map(row => tgCall(token, 'deleteMessage', { chat_id: row.chat_id, message_id: row.message_id }, { timeoutMs: settings.timeout_ms, retry: false })));
            for (const r of results) { if (r.status === 'fulfilled' && r.value && r.value.ok) deleted++; else failed++; }
            if (settings.delay_ms > 0 && ci < chunks.length - 1) await sleepMs(settings.delay_ms);
        }
        await env.DB.batch([
            env.DB.prepare('DELETE FROM broadcast_recipients WHERE broadcast_id = ?').bind(broadcastId),
            env.DB.prepare('DELETE FROM broadcast_history WHERE id = ?').bind(broadcastId),
        ]);
        await logAction(env.DB, null, `Broadcast #${broadcastId} deleted`);
        return apiJson({ success: true, deleted, failed, total: recipients.length });
    } catch (err) { return internalError(err); }
}
async function getBroadcastHistory(env) {
    if (!env.DB) return apiJson({ history: [] });
    try {
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare('SELECT * FROM broadcast_history ORDER BY sent_at DESC LIMIT 50').all();
        return apiJson({ history: rows.results || [] });
    } catch (e) { return apiJson({ history: [] }); }
}

// ============================================================================
// AI SETTINGS
// ============================================================================
const AI_KEYS = [
    'ai_enabled', 'ai_provider', 'ai_api_key', 'ai_base_url', 'ai_model',
    'ai_system_prompt', 'ai_trigger', 'ai_memory', 'ai_fallback',
    'ai_temperature', 'ai_max_tokens', 'ai_top_p',
    'ai_suggested_questions_enabled', 'ai_suggested_questions', 'ai_suggested_one_time',
    'ai_alt_providers', 'ai_custom_headers', 'ai_display_name', 'ai_language',
    'ai_style', 'ai_length', 'ai_rate_limit', 'ai_response_delay', 'ai_ignore_prefixes',
    'ai_global_rate_limit', 'ai_global_rate_window', 'ai_group_mention', 'ai_private_reply',
    'ai_group_reply', 'ai_ignore_bots', 'ai_ignore_forwarded', 'ai_typing_indicator',
    'ai_retry_on_failure', 'ai_custom_vars_text', 'ai_knowledge_bases', 'ai_trigger_text',
    'ai_group_memory', 'ai_strict_mode', 'ai_rtl_support', 'ai_streaming',
    'ai_use_mcp_tools', 'ai_mcp_prompt_mode', 'ai_mcp_categories'
];
async function getAiSettings(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const s = await getAiSettingsFromDb(env);
        const safe = Object.assign({}, s);
        safe.ai_api_key_set = !!s.ai_api_key;
        safe.ai_api_key_masked = maskSecret(s.ai_api_key);
        safe.ai_api_key = s.ai_api_key ? KEEP_SENTINEL : '';
        try {
            const alts = JSON.parse(safe.ai_alt_providers || '[]');
            alts.forEach(a => { if (a.apiKey) { a.apiKeyMasked = maskSecret(a.apiKey); a.apiKey = KEEP_SENTINEL; } });
            safe.ai_alt_providers = JSON.stringify(alts);
        } catch (e) {}
        return apiJson({ success: true, settings: safe });
    } catch (err) { return internalError(err); }
}
const aiSettingsCache = { data: null, fetchedAt: 0 };
const AI_CACHE_TTL_MS = 8000;
async function getAiSettingsFromDb(env) {
    if (aiSettingsCache.data && (Date.now() - aiSettingsCache.fetchedAt) < AI_CACHE_TTL_MS) return Object.assign({}, aiSettingsCache.data);
    const settings = {};
    for (const k of AI_KEYS) settings[k] = '';
    const placeholders = AI_KEYS.map(() => '?').join(', ');
    const rows = await env.DB.prepare(`SELECT key, value FROM settings WHERE key IN (${placeholders})`).bind(...AI_KEYS).all();
    for (const row of (rows.results || [])) if (row.value !== null && row.value !== undefined) settings[row.key] = row.value;
    const defaults = {
        ai_enabled: '0', ai_provider: 'openai', ai_model: '', ai_trigger: 'no_command',
        ai_memory: '0', ai_group_memory: '0', ai_fallback: 'Sorry, I am currently unavailable. Please try again later.',
        ai_temperature: '0.7', ai_max_tokens: '1024', ai_top_p: '1.0', ai_suggested_questions_enabled: '0', ai_suggested_one_time: '1',
        ai_rate_limit: '10', ai_global_rate_limit: '0', ai_global_rate_window: 'minute', ai_ignore_prefixes: '/, !, #',
        ai_group_mention: '1', ai_private_reply: '1', ai_group_reply: '1', ai_ignore_bots: '1', ai_ignore_forwarded: '1',
        ai_typing_indicator: '1', ai_retry_on_failure: '0', ai_knowledge_bases: '[]', ai_suggested_questions: '[]',
        ai_streaming: '0', ai_strict_mode: '0', ai_rtl_support: '0',
        ai_use_mcp_tools: '0', ai_mcp_prompt_mode: 'auto', ai_mcp_categories: '',
    };
    for (const [k, v] of Object.entries(defaults)) if (!settings[k]) settings[k] = v;
    aiSettingsCache.data = settings;
    aiSettingsCache.fetchedAt = Date.now();
    return Object.assign({}, settings);
}
async function saveAiSettings(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const settings = Object.assign({}, body.settings || body);
        await initializeDatabase(env.DB);
        if (settings.ai_api_key === KEEP_SENTINEL) delete settings.ai_api_key;
        if (settings.ai_alt_providers) {
            try {
                const incoming = JSON.parse(settings.ai_alt_providers);
                const current = JSON.parse(await getSetting(env.DB, 'ai_alt_providers') || '[]');
                const byProvider = {};
                for (const a of current) if (a && a.provider) byProvider[String(a.provider)] = a.apiKey || '';
                incoming.forEach(a => {
                    if ((a.apiKey === KEEP_SENTINEL || !a.apiKey) && byProvider[a.provider]) {
                        a.apiKey = byProvider[a.provider];
                    }
                    delete a.apiKeyMasked;
                });
                settings.ai_alt_providers = JSON.stringify(incoming);
            } catch (e) {}
        }
        const stmts = [];
        for (const k of AI_KEYS) {
            if (settings[k] === undefined) continue;
            stmts.push(env.DB.prepare(`INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`).bind(k, String(settings[k])));
        }
        await runBatchChunks(env.DB, stmts);
        aiSettingsCache.data = null;
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function getAiMemoryCount(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const result = await env.DB.prepare('SELECT COUNT(*) as count FROM ai_messages').first();
        return apiJson({ success: true, count: result ? result.count : 0 });
    } catch (err) { return internalError(err); }
}
async function resetAiSettings(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        await runBatchChunks(env.DB, AI_KEYS.map(k => env.DB.prepare('DELETE FROM settings WHERE key = ?').bind(k)));
        aiSettingsCache.data = null;
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function clearAiMemory(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try { await env.DB.prepare('DELETE FROM ai_messages').run(); return apiJson({ success: true }); }
    catch (err) { return internalError(err); }
}

async function resolveAiSettingsForApi(env, incoming) {
    const resolved = Object.assign({}, incoming || {});
    if (!env.DB) return resolved;
    if (resolved.ai_api_key === KEEP_SENTINEL || resolved.ai_api_key === undefined) {
        const stored = await getSetting(env.DB, 'ai_api_key');
        resolved.ai_api_key = stored || '';
    }
    if (resolved.ai_alt_providers) {
        try {
            const alts = JSON.parse(resolved.ai_alt_providers);
            const storedAlts = JSON.parse(await getSetting(env.DB, 'ai_alt_providers') || '[]');
            alts.forEach(function (a, i) {
                if ((a.apiKey === KEEP_SENTINEL || !a.apiKey) && storedAlts[i] && storedAlts[i].apiKey) {
                    a.apiKey = storedAlts[i].apiKey;
                }
                delete a.apiKeyMasked;
            });
            resolved.ai_alt_providers = JSON.stringify(alts);
        } catch (e) {}
    }
    return resolved;
}

function getProviderDefaults(provider, customBaseUrl) {
    switch (provider) {
        case 'openai': return { baseUrl: 'https://api.openai.com/v1', defaultModel: 'gpt-4o-mini' };
        case 'gemini': return { baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/', defaultModel: 'gemini-2.0-flash' };
        case 'deepseek': return { baseUrl: 'https://api.deepseek.com', defaultModel: 'deepseek-chat' };
        case 'groq': return { baseUrl: 'https://api.groq.com/openai/v1', defaultModel: 'llama-3.3-70b-versatile' };
        case 'openrouter': return { baseUrl: 'https://openrouter.ai/api/v1', defaultModel: 'openai/gpt-4o-mini' };
        case 'ollama': return { baseUrl: customBaseUrl || 'http://localhost:11434/v1', defaultModel: 'llama3' };
        default: return { baseUrl: customBaseUrl || '', defaultModel: '' };
    }
}
function parseCustomVars(text) {
    const vars = {};
    if (!text) return vars;
    for (const line of text.split('\n')) {
        const idx = line.indexOf('=');
        if (idx > 0) { const key = line.slice(0, idx).trim(); const val = line.slice(idx + 1).trim(); if (key) vars[key] = val; }
    }
    return vars;
}
function replacePlaceholders(text, ctx) {
    if (!text) return text;
    const placeholders = {
        bot_name: ctx.bot_name || 'Nyxx Bot', owner_name: ctx.owner_name || '',
        company_name: ctx.company_name || '', website: ctx.website || '', phone: ctx.phone || '',
        user_first_name: ctx.user_first_name || 'User', user_username: ctx.user_username || '',
        chat_id: ctx.chat_id || '', current_time: new Date().toLocaleString(),
        available_commands: ctx.available_commands || '', title: ctx.title || '',
    };
    if (ctx.custom_vars && typeof ctx.custom_vars === 'object') for (const [k, v] of Object.entries(ctx.custom_vars)) placeholders[k] = v;
    let result = text;
    for (const [key, value] of Object.entries(placeholders)) result = result.split('{{' + key + '}}').join(String(value));
    return result;
}
function isSafeTelegramHref(url) { return /^https?:\/\//i.test(url || ''); }
function escapeTelegramHTML(text) {
    if (!text) return '';
    const escPlain = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // 1) Code/pre blocks: contents are always literal text, never parsed as tags.
    const codeBlocks = [];
    const src = String(text).replace(/<pre>([\s\S]*?)<\/pre>|<code(?:\s+class="language-[\w+#.\-]+")?>([\s\S]*?)<\/code>/gi, (m, preInner, codeInner) => {
        let out;
        if (preInner !== undefined) {
            const inner = preInner.match(/^\s*<code(?:\s+class="(language-[\w+#.\-]+)")?>([\s\S]*?)<\/code>\s*$/i);
            out = inner ? '<pre><code' + (inner[1] ? ' class="' + inner[1] + '"' : '') + '>' + escPlain(inner[2]) + '</code></pre>' : '<pre>' + escPlain(preInner) + '</pre>';
        } else out = '<code>' + escPlain(codeInner) + '</code>';
        codeBlocks.push(out);
        return '\u0001' + (codeBlocks.length - 1) + '\u0001';
    });
    // 2) Whitelisted inline tags survive; everything else is escaped.
    const placeholders = [];
    const safe = src.replace(/<a\s+href="([^"]*)">|<\/a>|<blockquote\s+expandable>|<span\s+class="tg-spoiler">|<\/span>|<\/?(?:b|strong|i|em|u|ins|s|strike|del|code|pre|blockquote|tg-spoiler)>/gi, (m) => {
        if (m.toLowerCase().startsWith('<a ')) {
            const href = m.match(/href="([^"]*)"/i);
            if (href && !isSafeTelegramHref(href[1])) {
                placeholders.push(escPlain(m).replace(/"/g, '&quot;'));
                return '\u0000' + (placeholders.length - 1) + '\u0000';
            }
        }
        placeholders.push(m.replace(/&(?!amp;|lt;|gt;|quot;|#\d+;)/g, '&amp;'));
        return '\u0000' + (placeholders.length - 1) + '\u0000';
    });
    const escaped = escPlain(safe).replace(/"/g, '&quot;');
    const restored = escaped
        .replace(/\u0000(\d+)\u0000/g, (_, i) => placeholders[parseInt(i, 10)] || '')
        .replace(/\u0001(\d+)\u0001/g, (_, i) => codeBlocks[parseInt(i, 10)] || '');
    // 3) Fix unbalanced / mis-nested tags so Telegram never rejects the message.
    return balanceTelegramHtml(restored);
}
function balanceTelegramHtml(html) {
    const stack = [];
    let out = '', last = 0, m;
    const re = /<(\/?)([a-z][a-z-]*)((?:\s[^>]*)?)>/gi;
    while ((m = re.exec(html))) {
        out += html.slice(last, m.index);
        last = re.lastIndex;
        const tag = m[2].toLowerCase();
        if (m[1] !== '/') { stack.push({ tag, open: m[0] }); out += m[0]; continue; }
        const idx = stack.map(s => s.tag).lastIndexOf(tag);
        if (idx < 0) continue; // stray closing tag: drop it
        const above = stack.splice(idx);
        for (let i = above.length - 1; i >= 1; i--) out += '</' + above[i].tag + '>';
        out += '</' + tag + '>';
        for (let i = 1; i < above.length; i++) { out += above[i].open; stack.push(above[i]); }
    }
    out += html.slice(last);
    for (let i = stack.length - 1; i >= 0; i--) out += '</' + stack[i].tag + '>';
    return out;
}
// Converts the Markdown / reasoning-tag noise LLMs emit into Telegram-safe HTML.
// Output still goes through escapeTelegramHTML() before sending.
function formatAiReply(text) {
    let t = String(text || '').replace(/\r\n/g, '\n');
    if (/<\/think>/i.test(t)) t = t.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/^[\s\S]*<\/think>/i, '');
    const stash = [];
    const keep = (html) => '\u0002' + (stash.push(html) - 1) + '\u0002';
    t = t.replace(/```([\w+#.\-]*)[ \t]*\n?([\s\S]*?)```/g, (m, lang, body) => {
        body = body.replace(/\n$/, '');
        return keep(lang ? '<pre><code class="language-' + lang + '">' + body + '</code></pre>' : '<pre>' + body + '</pre>');
    });
    t = t.replace(/(?:^[ \t]*\|.*\|[ \t]*(?:\n|$))+/gm, (block) => {
        const lines = block.trim().split('\n');
        if (lines.length < 2) return block;
        const rows = lines.filter(r => !/^[\s|:\-]+$/.test(r)).map(r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()).join(' | '));
        return keep('<pre>' + rows.join('\n') + '</pre>') + '\n';
    });
    t = t.replace(/`([^`\n]+)`/g, (m, c) => keep('<code>' + c + '</code>'));
    t = t.replace(/^[ \t]*#{1,6}[ \t]+(.+?)[ \t]*#*[ \t]*$/gm, (m, h) => '<b>' + h.replace(/\*\*|__/g, '') + '</b>');
    t = t.replace(/^[ \t]*([-*_])(?:[ \t]*\1){2,}[ \t]*$/gm, '──────────');
    t = t.replace(/^([ \t]*)[-*+][ \t]+/gm, '$1• ');
    t = t.replace(/\*\*(?=\S)([^\n]*?\S)\*\*/g, '<b>$1</b>');
    t = t.replace(/(^|[^\w])__(?=\S)([^\n]*?\S)__(?!\w)/g, '$1<b>$2</b>');
    t = t.replace(/~~(?=\S)([^\n]*?\S)~~/g, '<s>$1</s>');
    t = t.replace(/(^|[^\w*])\*(?=\S)([^*\n]*?\S)\*(?![\w*])/g, '$1<i>$2</i>');
    t = t.replace(/(^|[^\w])_(?=\S)([^_\n]*?\S)_(?!\w)/g, '$1<i>$2</i>');
    t = t.replace(/\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)/g, (m, label, url) => '<a href="' + url.replace(/"/g, '%22') + '">' + label + '</a>');
    t = t.replace(/(?:^>[ \t]?.*(?:\n|$))+/gm, (block) => '<blockquote>' + block.replace(/\n$/, '').split('\n').map(l => l.replace(/^>[ \t]?/, '')).join('\n') + '</blockquote>\n');
    return t.replace(/\u0002(\d+)\u0002/g, (m, i) => stash[parseInt(i, 10)]).trim();
}
function htmlToPlain(html) {
    if (!html) return '';
    return String(html).replace(/<br\s*\/?>/gi, '\n').replace(/<\/(?:p|div|blockquote|pre)>/gi, '\n')
        .replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, ' ').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&amp;/gi, '&');
}
function isHtmlParseError(data) {
    const desc = String((data && data.description) || '');
    return /can't parse entities|unsupported start tag|unclosed tag|unclosed angle/i.test(desc);
}
function htmlToLiteral(html) { return String(html || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function addRtlMarkToPersian(text) {
    if (!text) return text;
    const persianRegex = /[\u0600-\u06FF]/;
    return text.split('\n').map(line => {
        const trimmed = line.trim();
        if (!trimmed || !persianRegex.test(trimmed)) return line;
        if (trimmed.startsWith('\u200F')) return line;
        return '\u200F' + line;
    }).join('\n');
}
const AI_STYLE_GUIDES = {
    friendly: 'Use a friendly, warm and approachable tone.',
    professional: 'Use a professional, polished and helpful tone.',
    casual: 'Use a casual, relaxed and informal tone.',
    formal: 'Use a very formal and courteous tone.',
    funny: 'Use a humorous and light-hearted tone.'
};
const AI_LENGTH_GUIDES = {
    very_short: 'Keep your responses very short (1-2 sentences).',
    short: 'Keep your responses short (about 3-5 sentences).',
    medium: 'Keep your responses a moderate length (about 6-10 sentences).',
    detailed: 'Provide detailed responses (about 10-20 sentences).',
    automatic: 'Decide the response length yourself based on complexity.'
};
const AI_LANGUAGE_NAMES = {
    english: 'English', spanish: 'Spanish', french: 'French', german: 'German',
    persian: 'Persian (Farsi)', arabic: 'Arabic', farsi: 'Farsi', russian: 'Russian'
};
function buildAiSystemPrompt(settings, context) {
    let systemContent = settings.ai_system_prompt || '';
    if (settings.ai_strict_mode === '1') systemContent += (systemContent ? '\n\n' : '') + 'CORE RULES:\n- Answer ONLY using the provided instructions and knowledge base.\n- NEVER invent information.\n- If the answer is not available, politely say you do not have that information.';
    if (settings.ai_rtl_support === '1') systemContent += (systemContent ? '\n\n' : '') + 'When the response is primarily Persian, begin each paragraph with the U+200F right-to-left mark. Never mention this rule.';
    try {
        const kbs = JSON.parse(settings.ai_knowledge_bases || '[]');
        const enabled = kbs.filter(kb => kb.enabled !== false && kb.content && kb.content.trim());
        if (enabled.length) systemContent += (systemContent ? '\n\n' : '') + enabled.map((kb, i) => `${kb.label || 'Knowledge ' + (i + 1)}:\n${kb.content.trim()}`).join('\n\n');
    } catch (e) {}
    systemContent += (systemContent ? '\n\n' : '') + 'FORMATTING: Plain text by default. No Markdown. HTML allowed only with <b>, <i>, <u>, <s>, <code>, <pre>, <a href>, <blockquote>, <tg-spoiler>. Always produce valid Telegram HTML.';
    const lang = AI_LANGUAGE_NAMES[settings.ai_language];
    if (lang) systemContent += `\n\nIMPORTANT: Always respond in ${lang}.`;
    const styleGuide = AI_STYLE_GUIDES[settings.ai_style];
    if (styleGuide) systemContent += '\n\n' + styleGuide;
    const lengthGuide = AI_LENGTH_GUIDES[settings.ai_length];
    if (lengthGuide) systemContent += '\n\n' + lengthGuide;
    if (context) systemContent = replacePlaceholders(systemContent, context);
    return systemContent;
}
async function callAiCompletion(settings, chatHistory, userPrompt, context, providerType, altIndex, stream, onChunk) {
    providerType = providerType || 'main';
    const isMain = providerType === 'main';
    let provider, apiKey, model, customHeaders, baseUrl;
    if (isMain) {
        provider = settings.ai_provider; apiKey = settings.ai_api_key;
        model = settings.ai_model; customHeaders = settings.ai_custom_headers; baseUrl = settings.ai_base_url;
    } else {
        let altList = [];
        try { altList = JSON.parse(settings.ai_alt_providers || '[]'); } catch (e) {}
        const alt = altList[altIndex || 0];
        if (!alt || !alt.provider) throw new Error('Fallback provider is not configured.');
        provider = alt.provider; apiKey = alt.apiKey || ''; model = alt.model || ''; customHeaders = ''; baseUrl = alt.baseUrl || '';
    }
    if (!provider || provider === 'none') throw new Error('No AI provider is selected.');
    const defaults = getProviderDefaults(provider, baseUrl);
    const finalBaseUrl = (provider === 'custom' ? baseUrl : defaults.baseUrl) || defaults.baseUrl;
    const finalModel = model || defaults.defaultModel;
    if (!apiKey) throw new Error('API key is missing. Please paste it in the AI tab.');
    if (!finalBaseUrl) throw new Error('Base URL is required for this provider.');
    const temperature = parseFloat(settings.ai_temperature) || 0.7;
    const maxTokens = parseInt(settings.ai_max_tokens) || 1024;
    const topP = parseFloat(settings.ai_top_p) || 1.0;
    const systemContent = buildAiSystemPrompt(settings, context);
    const messages = [];
    if (systemContent.trim()) messages.push({ role: 'system', content: systemContent.trim() });
    if (Array.isArray(chatHistory)) for (const m of chatHistory) messages.push({ role: m.role, content: m.content });
    messages.push({ role: 'user', content: userPrompt });
    const endpoint = finalBaseUrl.replace(/\/+$/, '') + '/chat/completions';
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = 'Bearer ' + apiKey;
    if (customHeaders) { try { Object.assign(headers, JSON.parse(customHeaders)); } catch (e) {} }
    const payload = { model: finalModel, messages, temperature, max_tokens: maxTokens, top_p: topP };
    if (stream === true) payload.stream = true;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), stream === true ? 120000 : 60000);
    let res;
    try { res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(payload), signal: ctrl.signal }); }
    finally { clearTimeout(timer); }
    if (!res.ok) { const errText = await res.text(); throw new Error(`AI provider error (${res.status}): ${errText.slice(0, 300)}`); }
    if (stream === true) { if (!res.body) throw new Error('Streaming is not supported by this provider.'); return await consumeStream(res.body, onChunk); }
    const data = await res.json();
    if (data.choices && data.choices[0] && data.choices[0].message) return data.choices[0].message.content;
    if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
    throw new Error('Unexpected response from the AI provider.');
}
const STREAM_EDIT_INTERVAL_MS = 1200;
const MIN_STREAM_DELTA = 10;
async function consumeStream(body, onChunk) {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = '', full = '', lastFire = 0, lastLen = 0;
    for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.indexOf('\n')) >= 0) {
            const line = buffer.slice(0, idx).trim();
            buffer = buffer.slice(idx + 1);
            if (!line.startsWith('data:')) continue;
            const payloadText = line.slice(5).trim();
            if (payloadText === '[DONE]') continue;
            try {
                const evt = JSON.parse(payloadText);
                const delta = evt.choices && evt.choices[0] && evt.choices[0].delta && evt.choices[0].delta.content;
                if (delta) {
                    full += delta;
                    const now = Date.now();
                    if (onChunk && (now - lastFire) >= STREAM_EDIT_INTERVAL_MS && (full.length - lastLen) >= MIN_STREAM_DELTA) { lastFire = now; lastLen = full.length; onChunk(full); }
                }
            } catch (e) {}
        }
    }
    return full;
}
async function handleAiTest(request, env) {
    try {
        if (!env.DB) return apiJson({ success: false, error: 'Database is not connected.' }, 200);
        const body = await request.json();
        const settings = await resolveAiSettingsForApi(env, body.settings || {});
        const provider = settings.ai_provider;
        if (!provider || provider === 'none') return apiJson({ success: false, error: 'No AI provider is selected.' }, 200);
        if (!settings.ai_api_key) return apiJson({ success: false, error: 'No API key is saved yet. Paste one above and save first.' }, 200);
        const ctx = { bot_name: settings.ai_display_name || 'Nyxx AI', user_first_name: 'Test' };
        const response = await callAiCompletion(settings, [], 'Hello! Confirm the connection.', ctx, 'main');
        return apiJson({ success: true, message: response });
    } catch (err) { return apiJson({ success: false, error: err.message }, 200); }
}
async function handleAiPlayground(request, env) {
    try {
        if (!env.DB) return apiJson({ success: false, error: 'Database is not connected.' }, 200);
        const body = await request.json();
        const settings = await resolveAiSettingsForApi(env, body.settings || {});
        const history = body.history || [];
        const message = body.message || '';
        if (!message) return apiJson({ error: 'Please type a message first.' }, 400);
        if (!settings.ai_api_key) return apiJson({ success: false, error: 'No API key is saved yet. Paste one in the AI tab and save first.' }, 200);
        let availableCommands = '';
        if (env.DB) {
            await initializeDatabase(env.DB);
            const rows = await env.DB.prepare('SELECT command FROM commands WHERE enabled = 1').all();
            availableCommands = (rows.results || []).map(r => r.command).join(', ');
        }
        const ctx = { bot_name: settings.ai_display_name || 'Nyxx AI', user_first_name: 'User', chat_id: 'playground', available_commands: availableCommands, custom_vars: parseCustomVars(settings.ai_custom_vars_text) };
        const reply = await callAiCompletion(settings, history, message, ctx, 'main');
        return apiJson({ success: true, response: reply });
    } catch (err) { return apiJson({ success: false, error: err.message }, 200); }
}

// ============================================================================
// SETTINGS
// ============================================================================
async function getSettings(env, originUrl) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const [token, webhook, cfToken] = await Promise.all([
            getSetting(env.DB, 'bot_token'), getSetting(env.DB, 'webhook_url'), getSetting(env.DB, 'cf_api_token'),
        ]);
        return apiJson({
            bot_token_masked: maskSecret(token),
            bot_token_set: !!token,
            webhook_url: webhook || `${originUrl}/webhook`,
            cf_token_masked: maskSecret(cfToken),
            cf_token_set: !!cfToken,
        });
    } catch (err) { return internalError(err); }
}
async function revealBotToken(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'No bot token is stored yet.' }, 404);
        await logAction(env.DB, null, 'Bot token revealed in dashboard');
        return apiJson({ token });
    } catch (err) { return internalError(err); }
}
async function tgFetchJson(url, options) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    try { const res = await fetch(url, Object.assign({ signal: ctrl.signal }, options)); return await res.json(); }
    finally { clearTimeout(timer); }
}
async function validateBotToken(botToken) {
    let lastError = 'unknown error';
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const data = await tgFetchJson(`https://api.telegram.org/bot${botToken}/getMe`);
            if (data.ok) return { ok: true, username: (data.result && data.result.username) || '', name: (data.result && data.result.first_name) || '' };
            lastError = data.description || 'unexpected response';
        } catch (err) { lastError = err.message || 'request failed'; }
        if (attempt < 2) await new Promise(r => setTimeout(r, 150 * (attempt + 1)));
    }
    return { ok: false, error: lastError };
}
async function registerWebhook(botToken, webhookUrl, secret, opts) {
    const params = new URLSearchParams({ url: webhookUrl });
    if (secret) params.set('secret_token', secret);
    if (opts && opts.dropPending) params.set('drop_pending_updates', 'true');
    const data = await tgFetchJson(`https://api.telegram.org/bot${botToken}/setWebhook?${params.toString()}`);
    if (!data.ok) throw new Error(data.description || 'unknown error');
    return data;
}
async function updateBotToken(request, env, originUrl) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { botToken } = await request.json();
        if (!botToken) return apiJson({ error: 'Please paste a bot token.' }, 400);
        await initializeDatabase(env.DB);
        const stored = await getSetting(env.DB, 'bot_token');
        const unchanged = !!(stored && stored === botToken);
        let botInfo = null;
        if (!unchanged) {
            const check = await validateBotToken(botToken);
            if (!check.ok) return apiJson({ error: `Invalid bot token: ${check.error || 'please double-check it.'}` }, 400);
            botInfo = check;
        }
        await setSetting(env.DB, 'bot_token', botToken);
        const webhookUrl = `${originUrl}/webhook`;
        await setSetting(env.DB, 'webhook_url', webhookUrl);
        let secret = await getSetting(env.DB, 'webhook_secret');
        if (!secret || !unchanged) { secret = crypto.randomUUID(); await setSetting(env.DB, 'webhook_secret', secret); }
        if (botInfo) {
            if (botInfo.username) await setSetting(env.DB, 'bot_username', botInfo.username);
            if (botInfo.name) await setSetting(env.DB, 'bot_name', botInfo.name);
        }
        try { await registerWebhook(botToken, webhookUrl, secret, { dropPending: !unchanged }); }
        catch (hookErr) {
            await logAction(env.DB, null, 'Bot token updated (webhook registration failed: ' + hookErr.message + ')');
            return apiJson({ success: true, warning: 'Token saved, but webhook registration failed: ' + hookErr.message + '. Click Health check in Settings to retry.' });
        }
        await logAction(env.DB, null, unchanged ? 'Bot token re-confirmed' : 'Bot token updated');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}
async function handleWebhookTest(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set. Please add it first.' }, 400);
        const data = await tgFetchJson(`https://api.telegram.org/bot${token}/getWebhookInfo`);
        if (!data.ok) return apiJson({ error: `Telegram error: ${data.description || 'unknown'}` }, 502);
        const info = data.result || {};
        const expectedUrl = (await getSetting(env.DB, 'webhook_url')) || '';
        return apiJson({
            success: true, url: info.url || '', expected_url: expectedUrl,
            registered: !!info.url, url_matches: !!(expectedUrl && info.url === expectedUrl),
            pending_updates: info.pending_update_count || 0, last_error: info.last_error_message || ''
        });
    } catch (err) { return internalError(err); }
}
async function handleWebhookFix(env, originUrl) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set. Please add it first.' }, 400);
        const info0 = await tgFetchJson(`https://api.telegram.org/bot${token}/getWebhookInfo`);
        if (!info0.ok) return apiJson({ error: `Telegram error: ${info0.description || 'unknown'}` }, 502);
        const before = (info0.result && info0.result.url) || '';
        const expectedUrl = (await getSetting(env.DB, 'webhook_url')) || `${originUrl}/webhook`;
        let fixed = false;
        if (before !== expectedUrl) {
            let secret = await getSetting(env.DB, 'webhook_secret');
            if (!secret) { secret = crypto.randomUUID(); await setSetting(env.DB, 'webhook_secret', secret); }
            try {
                await registerWebhook(token, expectedUrl, secret);
                fixed = true;
                await setSetting(env.DB, 'webhook_url', expectedUrl);
            } catch (e) {
                return apiJson({ error: 'Could not register webhook: ' + e.message + '. Please try again later.' }, 502);
            }
        }
        const info1 = await tgFetchJson(`https://api.telegram.org/bot${token}/getWebhookInfo`);
        const result = info1.ok ? (info1.result || {}) : {};
        await logAction(env.DB, null, fixed ? 'Webhook re-registered' : 'Webhook health check OK');
        return apiJson({ success: true, fixed, url: result.url || '', expected_url: expectedUrl, registered: !!result.url, url_matches: !!(result.url === expectedUrl), pending_updates: result.pending_update_count || 0, last_error: result.last_error_message || '' });
    } catch (err) { return internalError(err); }
}
async function changeAdminPassword(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { newPassword } = await request.json();
        if (!newPassword || newPassword.length < 6) return apiJson({ error: 'Password must be at least 6 characters.' }, 400);
        await initializeDatabase(env.DB);
        await setSetting(env.DB, 'admin_password', await hashPassword(newPassword));
        const cookie = request.headers.get('Cookie') || '';
        const part = cookie.split(';').find(c => c.trim().startsWith('session='));
        const currentToken = part ? part.split('=')[1].trim() : null;
        if (currentToken) await env.DB.prepare('DELETE FROM sessions WHERE user_id IS NULL AND token != ?').bind(currentToken).run();
        else await env.DB.prepare('DELETE FROM sessions WHERE user_id IS NULL').run();
        invalidateSessionCache();
        await logAction(env.DB, null, 'Admin password changed');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// BOT INFO
// ============================================================================
async function getBotInfo(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set.' }, 400);
        const [nameRes, descRes, shortRes] = await Promise.all([
            tgFetchJson(`https://api.telegram.org/bot${token}/getMyName`),
            tgFetchJson(`https://api.telegram.org/bot${token}/getMyDescription`),
            tgFetchJson(`https://api.telegram.org/bot${token}/getMyShortDescription`),
        ]);
        return apiJson({ success: true, name: nameRes.ok ? nameRes.result.name : '', description: descRes.ok ? descRes.result.description : '', short_description: shortRes.ok ? shortRes.result.short_description : '' });
    } catch (err) { return internalError(err); }
}
async function setBotInfo(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { name, description, short_description } = await request.json();
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token is not set.' }, 400);
        const jobs = [];
        if (name !== undefined) jobs.push(tgFetchJson(`https://api.telegram.org/bot${token}/setMyName`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) }));
        if (description !== undefined) jobs.push(tgFetchJson(`https://api.telegram.org/bot${token}/setMyDescription`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ description }) }));
        if (short_description !== undefined) jobs.push(tgFetchJson(`https://api.telegram.org/bot${token}/setMyShortDescription`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ short_description }) }));
        await Promise.all(jobs);
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// BACKUP
// ============================================================================
const SECRET_SETTING_KEYS = ['bot_token', 'webhook_secret', 'cf_api_token', 'ai_api_key'];
async function exportBackup(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const [commands, featured, users, messages, settingsRows, broadcastRows, groupsRows, dmRows] = await Promise.all([
            env.DB.prepare('SELECT * FROM commands').all(),
            env.DB.prepare('SELECT command, kind, content, buttons_json, success_text, failure_text, admin_only, enabled FROM featured_replies').all(),
            env.DB.prepare('SELECT * FROM users').all(),
            env.DB.prepare('SELECT chat_id, role, content, timestamp FROM ai_messages ORDER BY id').all(),
            env.DB.prepare('SELECT key, value FROM settings').all(),
            env.DB.prepare('SELECT message, photo_url, kind, buttons_json, recipient_count, sent_count, sent_at FROM broadcast_history ORDER BY id').all(),
            env.DB.prepare('SELECT * FROM groups').all(),
            env.DB.prepare('SELECT chat_id, direction, source, kind, text, photo_url, created_at FROM dm_messages ORDER BY id').all(),
        ]);
        const settings = {};
        for (const row of settingsRows.results) settings[row.key] = row.value;
        delete settings.session;
        for (const k of SECRET_SETTING_KEYS) delete settings[k];
        const blockedRows = await env.DB.prepare('SELECT user_id, block_type, blocked_at FROM blocked_users').all();
        return apiJson({
            success: true,
            data: {
                app: 'nyxx', version: VERSION, exported_at: new Date().toISOString(),
                commands: commands.results || [], featured: featured.results || [],
                users: users.results || [],
                ai_messages: messages.results || [], dm_messages: dmRows.results || [],
                groups: groupsRows.results || [], settings,
                blocked_users: blockedRows.results || [], broadcast_history: broadcastRows.results || [],
            }
        });
    } catch (err) { return internalError(err); }
}
async function restoreBackup(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const data = body.data;
        if (!data || data.app !== 'nyxx') return apiJson({ error: 'This is not a valid Nyxx backup file.' }, 400);
        const selected = Array.isArray(data.selected) ? data.selected : null;
        const wants = (key) => !selected || selected.indexOf(key) >= 0;
        await initializeDatabase(env.DB);
        const clearOps = [];
        if (wants('commands')) clearOps.push(env.DB.prepare('DELETE FROM commands'));
        if (wants('featured')) clearOps.push(env.DB.prepare('DELETE FROM featured_replies'));
        if (wants('users')) clearOps.push(env.DB.prepare('DELETE FROM users'));
        if (wants('ai_messages')) clearOps.push(env.DB.prepare('DELETE FROM ai_messages'));
        if (wants('dm_messages')) clearOps.push(env.DB.prepare('DELETE FROM dm_messages'));
        if (clearOps.length) await env.DB.batch(clearOps);

        if (wants('commands') && Array.isArray(data.commands)) {
            await runBatchChunks(env.DB, data.commands.filter(c => c && c.command).map(c => env.DB.prepare(`INSERT INTO commands (command, parent, response_type, content, media_url, buttons_json, is_admin_only, enabled, show_reply_keyboard, reply_keyboard_json, order_idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                .bind(c.command, c.parent || null, c.response_type || 'text', c.content || '', c.media_url || '', c.buttons_json || '', c.is_admin_only ? 1 : 0, c.enabled !== undefined ? c.enabled : 1, c.show_reply_keyboard ? 1 : 0, c.reply_keyboard_json || '', c.order_idx || 0)));
        }
        if (wants('featured') && Array.isArray(data.featured)) {
            await runBatchChunks(env.DB, data.featured.filter(f => f && f.command).map(f => env.DB.prepare('INSERT INTO featured_replies (command, kind, content, buttons_json, success_text, failure_text, admin_only, enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
                .bind(f.command, f.kind || 'text', f.content || '', null, f.success_text || '', f.failure_text || '', f.admin_only ? 1 : 0, f.enabled ? 1 : 0)));
        }
        if (wants('users') && Array.isArray(data.users)) {
            await runBatchChunks(env.DB, data.users.filter(u => u && u.id).map(u => env.DB.prepare(`INSERT INTO users (id, username, first_name, role, is_premium, private_started, last_group_id, last_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
                .bind(u.id, u.username || '', u.first_name || '', u.role || 'user', u.is_premium ? 1 : 0, u.private_started ? 1 : 0, u.last_group_id || null, u.last_active || new Date().toISOString())));
        }
        if (wants('blocked_users') && Array.isArray(data.blocked_users)) {
            await runBatchChunks(env.DB, data.blocked_users.filter(b => b && b.user_id).map(b => env.DB.prepare('INSERT INTO blocked_users (user_id, block_type, blocked_at) VALUES (?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET block_type = excluded.block_type')
                .bind(b.user_id, b.block_type || 'full', b.blocked_at || new Date().toISOString())));
        }
        if (wants('ai_messages') && Array.isArray(data.ai_messages)) {
            await runBatchChunks(env.DB, data.ai_messages.filter(m => m && m.chat_id !== undefined).map(m => env.DB.prepare('INSERT INTO ai_messages (chat_id, role, content, timestamp) VALUES (?, ?, ?, ?)')
                .bind(m.chat_id, m.role || 'user', m.content, m.timestamp || new Date().toISOString())));
        }
        if (wants('dm_messages') && Array.isArray(data.dm_messages)) {
            await runBatchChunks(env.DB, data.dm_messages.filter(m => m && m.chat_id).map(m => env.DB.prepare('INSERT INTO dm_messages (chat_id, direction, source, kind, text, photo_url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
                .bind(m.chat_id, m.direction || 'in', m.source || null, m.kind || 'text', m.text || '', m.photo_url || null, m.created_at || new Date().toISOString())));
        }
        if (wants('groups') && Array.isArray(data.groups)) {
            for (const g of data.groups) {
                if (!g || !g.id) continue;
                await env.DB.prepare('INSERT INTO groups (id, title, type, username, is_active, settings_json, member_count) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET title = excluded.title, settings_json = excluded.settings_json')
                    .bind(g.id, g.title || '', g.type || 'group', g.username || '', g.is_active != 0 ? 1 : 0, g.settings_json || null, g.member_count || 0).run();
            }
        }
        if (wants('broadcast_history') && Array.isArray(data.broadcast_history)) {
            await runBatchChunks(env.DB, data.broadcast_history.filter(h => h && h.message).map(h => env.DB.prepare('INSERT INTO broadcast_history (message, photo_url, kind, buttons_json, recipient_count, sent_count, sent_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
                .bind(h.message, h.photo_url || null, h.kind || 'text', h.buttons_json || null, h.recipient_count || 0, h.sent_count || 0, h.sent_at || new Date().toISOString())));
        }
        const settings = data.settings || {};
        const setStmts = [];
        for (const [k, v] of Object.entries(settings)) {
            if (k === 'session' || k === 'schema_version') continue;
            if (SECRET_SETTING_KEYS.includes(k)) continue;
            if (v === null || v === undefined) continue;
            setStmts.push(env.DB.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').bind(k, String(v)));
        }
        await runBatchChunks(env.DB, setStmts);
        aiSettingsCache.data = null;
        invalidateReplyButtonMap();
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// FACTORY RESET
// ============================================================================
async function factoryReset(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        let body = null;
        try { body = await request.json(); } catch (e) {}
        if (!body || body.confirmation !== 'FACTORY RESET') return apiJson({ error: 'Please type FACTORY RESET exactly to confirm.' }, 400);
        await initializeDatabase(env.DB);
        const tables = ['settings', 'users', 'commands', 'sessions', 'logs', 'ai_messages', 'dm_messages', 'ai_rate_limits', 'blocked_users', 'login_attempts', 'broadcast_history', 'broadcast_recipients', 'groups', 'group_flood', 'featured_replies'];
        await runBatchChunks(env.DB, tables.map(t => env.DB.prepare(`DROP TABLE IF EXISTS ${t}`)));
        dbInitCache.delete(env.DB);
        await initializeDatabase(env.DB);
        invalidateSessionCache();
        aiSettingsCache.data = null;
        invalidateReplyButtonMap();
        await logAction(env.DB, null, 'FACTORY RESET performed');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// UPDATE
// ============================================================================
async function validateCloudflareToken(request, env) {
    try {
        const body = await request.json();
        let token = body.token;

        // NEW: fall back to the stored token so an empty box still works
        if (!token && env.DB) {
            await initializeDatabase(env.DB);
            token = (await getSetting(env.DB, 'cf_api_token')) || '';
        }
        if (!token) return apiJson({ valid: false, error: 'Please paste your Cloudflare API token.' }, 400);

        const verifyRes  = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', { headers: { 'Authorization': 'Bearer ' + token } });
        const verifyData = await verifyRes.json();

        // CHANGED: 400, not 401 — this is not a session error
        if (!verifyRes.ok || !verifyData.success) {
            return apiJson({ valid: false, error: 'This token looks invalid or lacks the required permissions (Workers Scripts:Edit).' }, 400);
        }

        const accountsRes  = await fetch('https://api.cloudflare.com/client/v4/accounts', { headers: { 'Authorization': 'Bearer ' + token } });
        const accountsData = await accountsRes.json();
        if (!accountsData.success || !Array.isArray(accountsData.result) || !accountsData.result.length) {
            return apiJson({ valid: false, error: 'No Cloudflare accounts are attached to this token.' }, 400);
        }

        const accountId = accountsData.result[0].id;

        let scriptName = null;
        const host = new URL(request.url).hostname;
        if (host.endsWith('.workers.dev')) {
            const parts = host.split('.');
            if (parts.length >= 3) scriptName = parts[0];
        }
        if (!scriptName) {
            const scriptsRes  = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts`, { headers: { 'Authorization': 'Bearer ' + token } });
            const scriptsData = await scriptsRes.json();
            if (scriptsData.success && Array.isArray(scriptsData.result) && scriptsData.result.length) scriptName = scriptsData.result[0].id;
        }

        if (env.DB) {
            await initializeDatabase(env.DB);
            await setSetting(env.DB, 'cf_api_token', token);
            await setSetting(env.DB, 'cf_account_id', accountId);
            if (scriptName) await setSetting(env.DB, 'cf_script_name', scriptName);
        }

        return apiJson({ valid: true, accountId, scriptName: scriptName || null });
    } catch (e) {
        console.error('Token validation failed:', e);
        return apiJson({ valid: false, error: 'Could not reach Cloudflare. Please try again.' }, 400); // CHANGED: was 500
    }
}
async function performUpdate(request, env) {
    try {
        const body = await request.json();
        let { token, accountId, scriptName, workerUrl } = body;

        // NEW: fall back to stored credentials
        if (env.DB && (!token || !accountId || !scriptName)) {
            await initializeDatabase(env.DB);
            token      = token      || (await getSetting(env.DB, 'cf_api_token'))  || '';
            accountId  = accountId  || (await getSetting(env.DB, 'cf_account_id'))  || '';
            scriptName = scriptName || (await getSetting(env.DB, 'cf_script_name')) || '';
        }
        if (!token || !accountId || !scriptName) {
            return apiJson({ success: false, error: 'Missing token, account or script name.' }, 400);
        }

        const verifyRes  = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', { headers: { 'Authorization': 'Bearer ' + token } });
        const verifyData = await verifyRes.json();

        // CHANGED: 400, not 401
        if (!verifyRes.ok || !verifyData.success) {
            return apiJson({ success: false, error: 'Cloudflare rejected the token. It may be invalid or lack the Workers Scripts:Edit permission.' }, 400);
        }

        const settingsRes  = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${scriptName}/settings`, { headers: { 'Authorization': 'Bearer ' + token } });
        const settingsData = await settingsRes.json();
        let bindings = [];
        if (settingsData.success && settingsData.result && settingsData.result.bindings) bindings = settingsData.result.bindings;

        const DEFAULT_UPDATE_URL = 'https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/worker.js';
        let scriptUrl = workerUrl || DEFAULT_UPDATE_URL;
        try {
            const u = new URL(scriptUrl);
            if (u.protocol !== 'https:' || u.hostname !== 'raw.githubusercontent.com') {
                return apiJson({ success: false, error: 'Update URL is not allowed.' }, 400);
            }
        } catch (e) {
            return apiJson({ success: false, error: 'Invalid update URL.' }, 400);
        }

        const scriptRes = await fetch(scriptUrl);
        if (!scriptRes.ok) return apiJson({ success: false, error: 'Could not download the update file.' }, 400);
        const scriptText = await scriptRes.text();

        let newVersion = null;
        const match = scriptText.match(/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);
        if (match) newVersion = match[1];

        const metadata = { main_module: 'worker.js', bindings };
        const formData = new FormData();
        formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        formData.append('worker.js', new Blob([scriptText], { type: 'application/javascript+module' }), 'worker.js');

        const uploadRes  = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${scriptName}/content`, { method: 'PUT', headers: { 'Authorization': 'Bearer ' + token }, body: formData });
        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success) {
            const errMsg = (uploadData.errors && uploadData.errors[0] && uploadData.errors[0].message) || 'Upload to Cloudflare failed.';
            // CHANGED: 400, not uploadRes.status (Cloudflare can return 401 here)
            return apiJson({ success: false, error: errMsg }, 400);
        }

        if (env.DB) {
            await initializeDatabase(env.DB);
            if (newVersion) await setSetting(env.DB, 'last_update_version', newVersion);
            try {
                const tokenRecord   = await getSetting(env.DB, 'bot_token');
                const webhookRecord = await getSetting(env.DB, 'webhook_url');
                if (tokenRecord && webhookRecord) {
                    const secret = crypto.randomUUID();
                    await registerWebhook(tokenRecord, webhookRecord, secret);
                    await setSetting(env.DB, 'webhook_secret', secret);
                }
            } catch (e) { console.error('Secret rotation failed:', e); }
        }

        return apiJson({ success: true, version: newVersion || 'unknown' });
    } catch (e) {
        console.error('Update failed:', e);
        return apiJson({ success: false, error: 'Update failed unexpectedly. Please try again.' }, 500);
    }
}

// ============================================================================
// MCP — Model Context Protocol + built-in chat + Telegram /mcp command
// ============================================================================
const MCP_DEFAULT_SETTINGS = {
    mcp_enabled: '0',
    mcp_ai_provider: 'openai',
    mcp_ai_model: '',
    mcp_ai_base_url: '',
    mcp_categories: '["read","write"]',
    mcp_memory_limit: '0',
    mcp_memory_ttl_hours: '24',
    mcp_rate_limit: '20',
    mcp_rate_limit_window: 'minute',
};
const MCP_CATEGORY_KEYS = ['read', 'write', 'outbound', 'dangerous'];
const mcpTokenCache = new Map();
const MCP_TOKEN_CACHE_TTL = 30000;

async function getMcpSettingsFromDb(env) {
    const keys = Object.keys(MCP_DEFAULT_SETTINGS).concat(['mcp_ai_api_key']);
    const placeholders = keys.map(() => '?').join(', ');
    const rows = await env.DB.prepare(`SELECT key, value FROM settings WHERE key IN (${placeholders})`).bind(...keys).all();
    const out = Object.assign({}, MCP_DEFAULT_SETTINGS);
    for (const row of (rows.results || [])) out[row.key] = row.value;
    return out;
}

async function getMcpSettings(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const s = await getMcpSettingsFromDb(env);
        /** @type {Record<string, any>} */
        const safe = Object.assign({}, s);
        safe.mcp_ai_api_key_set = !!s.mcp_ai_api_key;
        safe.mcp_ai_api_key_masked = maskSecret(s.mcp_ai_api_key || '');
        safe.mcp_ai_api_key = s.mcp_ai_api_key ? KEEP_SENTINEL : '';
        safe.mcp_enabled = s.mcp_enabled === '1' ? '1' : '0';
        let cats = ['read', 'write'];
        try { const parsed = JSON.parse(s.mcp_categories || '[]'); if (Array.isArray(parsed)) cats = parsed.filter(c => MCP_CATEGORY_KEYS.includes(c)); } catch (e) {}
        safe.mcp_categories = cats;
        safe.mcp_memory_limit = String(parseInt(s.mcp_memory_limit) || 0);
        safe.mcp_memory_ttl_hours = String(parseInt(s.mcp_memory_ttl_hours) || 24);
        safe.mcp_rate_limit = String(parseInt(s.mcp_rate_limit) || 20);
        safe.mcp_rate_limit_window = s.mcp_rate_limit_window === 'hour' ? 'hour' : 'minute';
        try { safe.mcp_endpoint = new URL(request.url).origin + '/mcp'; } catch (e) { safe.mcp_endpoint = ''; }
        return apiJson({ success: true, settings: safe });
    } catch (err) { return internalError(err); }
}

async function saveMcpSettings(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        await initializeDatabase(env.DB);
        const writes = [];
        if (body.mcp_enabled !== undefined) writes.push(['mcp_enabled', body.mcp_enabled === '1' || body.mcp_enabled === 1 || body.mcp_enabled === true ? '1' : '0']);
        if (body.mcp_ai_provider !== undefined) writes.push(['mcp_ai_provider', String(body.mcp_ai_provider)]);
        if (body.mcp_ai_model !== undefined) writes.push(['mcp_ai_model', String(body.mcp_ai_model)]);
        if (body.mcp_ai_base_url !== undefined) writes.push(['mcp_ai_base_url', String(body.mcp_ai_base_url)]);
        if (body.mcp_ai_api_key !== undefined && body.mcp_ai_api_key !== KEEP_SENTINEL) writes.push(['mcp_ai_api_key', String(body.mcp_ai_api_key)]);
        if (Array.isArray(body.mcp_categories)) {
            const cats = body.mcp_categories.filter(c => MCP_CATEGORY_KEYS.includes(c));
            writes.push(['mcp_categories', JSON.stringify(cats)]);
        }
        if (body.mcp_memory_limit !== undefined) writes.push(['mcp_memory_limit', String(Math.min(Math.max(parseInt(body.mcp_memory_limit) || 0, 0), 200))]);
        if (body.mcp_memory_ttl_hours !== undefined) writes.push(['mcp_memory_ttl_hours', String(Math.min(Math.max(parseInt(body.mcp_memory_ttl_hours) || 24, 1), 720))]);
        if (body.mcp_rate_limit !== undefined) writes.push(['mcp_rate_limit', String(Math.min(Math.max(parseInt(body.mcp_rate_limit) || 20, 0), 1000))]);
        if (body.mcp_rate_limit_window !== undefined) writes.push(['mcp_rate_limit_window', body.mcp_rate_limit_window === 'hour' ? 'hour' : 'minute']);
        for (const [k, v] of writes) await setSetting(env.DB, k, v);
        await logAction(env.DB, null, 'MCP settings updated');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// ---- Tokens -----------------------------------------------------------------
async function listMcpTokens(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare('SELECT id, label, token_prefix, created_at, last_used_at FROM mcp_tokens ORDER BY id DESC').all();
        return apiJson({ tokens: rows.results || [] });
    } catch (err) { return internalError(err); }
}

async function generateMcpTokenHandler(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json().catch(() => ({}));
        const label = String(body.label || 'default').slice(0, 40);
        const raw = 'nyxx_' + Array.from(crypto.getRandomValues(new Uint8Array(24))).map(b => b.toString(16).padStart(2, '0')).join('');
        const hashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
        const hashHex = toHex(hashBuf);
        const prefix = raw.slice(0, 12);
        await env.DB.prepare('INSERT INTO mcp_tokens (label, token_hash, token_prefix) VALUES (?, ?, ?)').bind(label, hashHex, prefix).run();
        mcpTokenCache.delete(hashHex);
        await logAction(env.DB, null, 'MCP token generated');
        return apiJson({ success: true, token: raw, prefix, label });
    } catch (err) { return internalError(err); }
}

async function revokeMcpTokens(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await env.DB.prepare('DELETE FROM mcp_tokens').run();
        await env.DB.prepare("DELETE FROM mcp_sessions WHERE session_key LIKE 'ext:%'").run();
        await env.DB.prepare("DELETE FROM mcp_rate_limits WHERE session_key LIKE 'ext:%'").run();
        mcpTokenCache.clear();
        await logAction(env.DB, null, 'All MCP tokens revoked');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// D1 returns DATETIME columns as 'YYYY-MM-DD HH:MM:SS' (UTC, no timezone marker).
// new Date() treats that as LOCAL time in some runtimes — this handles both forms safely.
function parseDbTimestamp(s) {
    if (!s) return 0;
    if (s instanceof Date) { const t = s.getTime(); return isNaN(t) ? 0 : t; }
    const str = String(s);
    // Already ISO-8601 with Z or ±hh:mm → let the engine handle it.
    if (/T.*[Zz]|[+-]\d{2}:?\d{2}$/.test(str)) {
        const t = new Date(str).getTime();
        return isNaN(t) ? 0 : t;
    }
    // SQLite format: 'YYYY-MM-DD HH:MM:SS' → force UTC.
    if (/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}/.test(str)) {
        const t = new Date(str.replace(' ', 'T') + 'Z').getTime();
        return isNaN(t) ? 0 : t;
    }
    const t = new Date(str).getTime();
    return isNaN(t) ? 0 : t;
}

async function verifyMcpToken(env, rawToken) {
    if (!rawToken) return null;
    const hashBuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawToken));
    const hashHex = toHex(hashBuf);
    const cached = mcpTokenCache.get(hashHex);
    if (cached && (Date.now() - cached.at) < MCP_TOKEN_CACHE_TTL) return cached.row;
    const row = await env.DB.prepare('SELECT id, token_prefix, last_used_at FROM mcp_tokens WHERE token_hash = ?').bind(hashHex).first();
    if (!row) return null;
    mcpTokenCache.set(hashHex, { row, at: Date.now() });
    // Update last_used_at at most once per minute.
    // D1/SQLite returns 'YYYY-MM-DD HH:MM:SS' (UTC, no Z). Some rows may be ISO.
    const last = parseDbTimestamp(row.last_used_at);
    if (Date.now() - last > 60000) {
        try { await env.DB.prepare('UPDATE mcp_tokens SET last_used_at = CURRENT_TIMESTAMP WHERE id = ?').bind(row.id).run(); } catch (e) {}
    }
    return row;
}

// ---- MCP session memory & rate limiting -------------------------------------
async function getMcpMemoryLimit(db) {
    try {
        const raw = await getSetting(db, 'mcp_memory_limit');
        const n = parseInt(raw);
        return isNaN(n) ? 0 : Math.min(Math.max(n, 0), 200);
    } catch (e) { return 0; }
}
async function loadMcpSession(db, sessionKey) {
    if (!db || !sessionKey) return [];
    try {
        const row = await db.prepare('SELECT messages_json FROM mcp_sessions WHERE session_key = ?').bind(sessionKey).first();
        if (!row || !row.messages_json) return [];
        const parsed = JSON.parse(row.messages_json);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
}
async function saveMcpSession(db, sessionKey, messages, keep) {
    if (!db || !sessionKey || keep <= 0) return;
    try {
        let capped = messages.slice(-(keep * 2));
        let json = JSON.stringify(capped);
        if (json.length > 64000) {
            capped = capped.slice(-Math.max(2, Math.floor(keep / 2) * 2));
            json = JSON.stringify(capped);
        }
        await db.prepare(
            `INSERT INTO mcp_sessions (session_key, messages_json, size_bytes, updated_at)
             VALUES (?, ?, ?, CURRENT_TIMESTAMP)
             ON CONFLICT(session_key) DO UPDATE SET messages_json = excluded.messages_json, size_bytes = excluded.size_bytes, updated_at = CURRENT_TIMESTAMP`
        ).bind(sessionKey, json, json.length).run();
    } catch (e) { /* ignore */ }
}
async function checkMcpRateLimit(db, sessionKey) {
    if (!db) return { ok: true };
    try {
        const limit = parseInt(await getSetting(db, 'mcp_rate_limit')) || 0;
        if (limit <= 0) return { ok: true };
        const windowStr = await getSetting(db, 'mcp_rate_limit_window');
        const isHour = windowStr === 'hour';
        const minute = Math.floor(Date.now() / 60000);
        const bucket = isHour ? Math.floor(minute / 60) : minute;
        await db.prepare('INSERT INTO mcp_rate_limits (session_key, minute, count) VALUES (?, ?, 1) ON CONFLICT(session_key, minute) DO UPDATE SET count = count + 1').bind(sessionKey, minute).run();
        let used;
        if (isHour) {
            const row = await db.prepare('SELECT COALESCE(SUM(count), 0) as n FROM mcp_rate_limits WHERE session_key = ? AND minute >= ?').bind(sessionKey, bucket * 60).first();
            used = row ? row.n : 0;
        } else {
            const row = await db.prepare('SELECT count FROM mcp_rate_limits WHERE session_key = ? AND minute = ?').bind(sessionKey, minute).first();
            used = row ? row.count : 0;
        }
        if (used > limit) return { ok: false, message: 'Rate limit exceeded. Please try again shortly.' };
        return { ok: true };
    } catch (e) { return { ok: true }; }
}
async function listMcpSessions(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare('SELECT session_key, size_bytes, updated_at FROM mcp_sessions ORDER BY updated_at DESC LIMIT 100').all();
        return apiJson({ sessions: rows.results || [] });
    } catch (err) { return internalError(err); }
}
async function clearMcpSessions(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        await env.DB.prepare('DELETE FROM mcp_sessions').run();
        await env.DB.prepare('DELETE FROM mcp_rate_limits').run();
        await logAction(env.DB, null, 'All MCP sessions cleared');
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

// ---- Button input normalization ---------------------------------------------
// Accepts an ergonomic { inline: [...], reply: {...} } object OR raw JSON
// strings/objects, and produces the exact 3 fields the backend expects:
//   - buttons_json       (inline keyboard, {v:2, inline: [[...]]})
//   - reply_keyboard_json ({v:2, reply: {rows, actions, ...}})
//   - show_reply_keyboard (0/1)
// plus a merged `combined_json` for message-editor endpoints (send_dm/broadcast).
function normalizeInlineBtn(item) {
    if (!item) return null;
    if (typeof item === 'string') item = { text: item, value: item };
    if (typeof item !== 'object') return null;
    const text = String(item.text || item.label || '').trim();
    if (!text) return null;
    const rawValue = item.value !== undefined ? item.value
        : (item.callback_data !== undefined ? item.callback_data
        : (item.url !== undefined ? item.url
        : (item.command !== undefined ? item.command : '')));
    const value = String(rawValue).trim();
    if (!value) return null;
    let type = item.type;
    if (!type) {
        if (/^https?:\/\//i.test(value)) type = 'url';
        else if (value.startsWith('/')) type = 'command';
        else type = 'callback';
    }
    if (type !== 'url' && type !== 'command' && type !== 'callback') type = 'callback';
    if (type === 'command' && value.charAt(0) !== '/') return { text, type, value: '/' + value };
    return { text, type, value };
}
function normalizeInlineRows(input) {
    if (!Array.isArray(input)) return [];
    const rows = [];
    let current = [];
    for (const item of input) {
        if (Array.isArray(item)) {
            const row = item.map(normalizeInlineBtn).filter(Boolean);
            if (row.length) { if (current.length) { rows.push(current); current = []; } rows.push(row); }
        } else {
            const btn = normalizeInlineBtn(item);
            if (!btn) continue;
            current.push(btn);
            if (current.length >= 3) { rows.push(current); current = []; }
        }
    }
    if (current.length) rows.push(current);
    return rows;
}
function normalizeReplyInput(rep) {
    if (!rep || typeof rep !== 'object') return null;
    const rows = [];
    const actions = {};
    const readBtn = (x) => {
        if (typeof x === 'string') return { text: x, command: '' };
        if (!x || typeof x !== 'object') return null;
        const text = String(x.text || '');
        const cmd = String(x.command || x.value || '').trim();
        return text ? { text, command: cmd } : null;
    };
    if (Array.isArray(rep.rows)) {
        for (const r of rep.rows) {
            if (Array.isArray(r)) {
                const row = r.map(readBtn).filter(Boolean);
                if (row.length) rows.push(row);
            } else if (r && typeof r === 'object') {
                const b = readBtn(r);
                if (b) rows.push([b]);
            }
        }
    } else if (Array.isArray(rep)) {
        for (const r of rep) {
            const row = (Array.isArray(r) ? r : [r]).map(readBtn).filter(Boolean);
            if (row.length) rows.push(row);
        }
    }
    if (!rows.length) return null;
    // Explicit actions map from the caller.
    if (rep.actions && typeof rep.actions === 'object') {
        for (const [k, v] of Object.entries(rep.actions)) {
            if (k && v) {
                const s = String(v).trim();
                actions[k] = s.startsWith('/') ? s : '/' + s;
            }
        }
    }
    // Per-button `command` fields also become actions (backend merge handles both).
    for (const row of rows) for (const b of row) if (b.command) {
        actions[b.text] = b.command.startsWith('/') ? b.command : '/' + b.command;
    }
    return {
        rows: rows.map(row => row.map(b => ({ text: b.text }))),
        actions,
        resize: rep.resize !== false,
        one_time: rep.one_time === true,
        persistent: rep.persistent !== false,
        placeholder: String(rep.placeholder || '').slice(0, 64)
    };
}
function buildButtonPayloads(args) {
    const hasStructured = args && args.buttons && typeof args.buttons === 'object';
    const hasRawButtons = args && args.buttons_json !== undefined;
    const hasRawReply = args && args.reply_keyboard_json !== undefined;
    const hasFlag = args && args.show_reply_keyboard !== undefined;
    if (!hasStructured && !hasRawButtons && !hasRawReply && !hasFlag) return {};

    const out = {};

    if (hasStructured) {
        const b = args.buttons;
        if (b.inline !== undefined) {
            if (b.inline === null || b.inline === false) {
                out.buttons_json = '';
            } else {
                out.buttons_json = JSON.stringify({ v: 2, inline: normalizeInlineRows(b.inline) });
            }
        }
        if (b.reply !== undefined) {
            if (b.reply === null || b.reply === false) {
                out.reply_keyboard_json = '';
                out.show_reply_keyboard = 0;
            } else {
                const rep = normalizeReplyInput(b.reply);
                if (rep) {
                    out.reply_keyboard_json = JSON.stringify({ v: 2, reply: rep });
                    out.show_reply_keyboard = 1;
                } else {
                    out.reply_keyboard_json = '';
                    out.show_reply_keyboard = 0;
                }
            }
        }
    }
    if (hasRawButtons) {
        if (args.buttons_json === null || args.buttons_json === '') out.buttons_json = '';
        else out.buttons_json = typeof args.buttons_json === 'string' ? args.buttons_json : JSON.stringify(args.buttons_json);
    }
    if (hasRawReply) {
        if (args.reply_keyboard_json === null || args.reply_keyboard_json === '') {
            out.reply_keyboard_json = '';
            if (out.show_reply_keyboard === undefined) out.show_reply_keyboard = 0;
        } else {
            out.reply_keyboard_json = typeof args.reply_keyboard_json === 'string' ? args.reply_keyboard_json : JSON.stringify(args.reply_keyboard_json);
            if (out.show_reply_keyboard === undefined) out.show_reply_keyboard = 1;
        }
    }
    if (hasFlag) out.show_reply_keyboard = args.show_reply_keyboard ? 1 : 0;

    // Build a merged combined_json for message-editor endpoints.
    if (out.buttons_json !== undefined || out.reply_keyboard_json !== undefined) {
        const combined = { v: 2 };
        if (out.buttons_json) {
            try {
                const p = JSON.parse(out.buttons_json);
                if (p && Array.isArray(p.inline)) combined.inline = p.inline;
                else if (p && Array.isArray(p.inline_keyboard)) combined.inline = p.inline_keyboard;
            } catch (e) {}
        }
        if (out.reply_keyboard_json) {
            try {
                const p = JSON.parse(out.reply_keyboard_json);
                if (p && p.reply) combined.reply = p.reply;
                else if (p && Array.isArray(p.keyboard)) combined.reply = { rows: p.keyboard, actions: {} };
            } catch (e) {}
        }
        out.combined_json = (combined.inline || combined.reply) ? JSON.stringify(combined) : '';
    }
    return out;
}

// ---- Tool registry ----------------------------------------------------------
function getMcpToolDefinitions(categories) {
    const enabled = new Set(categories || ['read', 'write']);
    const tools = [];
    const push = (def, cat) => { if (enabled.has(cat)) tools.push(def); };

    // ---- READ -----------------------------------------------------------------
    push({ type: 'function', function: {
        name: 'get_stats',
        description: 'Return dashboard overview numbers: total commands, users, groups, AI memory, bot linkage.',
        parameters: { type: 'object', properties: {} }
    }}, 'read');

    push({ type: 'function', function: {
        name: 'list_users',
        description: 'List users. filter: all | private (started bot) | group (group-only, never started) | admin | blocked. Optional search.',
        parameters: { type: 'object', properties: {
            filter: { type: 'string', enum: ['all','private','group','admin','blocked'] },
            search: { type: 'string' }
        }}
    }}, 'read');

    push({ type: 'function', function: {
        name: 'get_user',
        description: 'Get a single user by ID (profile, role, private_started, block status, DM count, AI memory count).',
        parameters: { type: 'object', properties: { userId: { type: 'number' } }, required: ['userId'] }
    }}, 'read');

    push({ type: 'function', function: {
        name: 'list_commands',
        description: 'List all commands (summary). Includes parent, response_type, enabled, is_admin_only, has_buttons, has_reply_keyboard, and a 120-char content preview. Use get_command for full details.',
        parameters: { type: 'object', properties: {} }
    }}, 'read');

    push({ type: 'function', function: {
        name: 'get_command',
        description: 'Get a single command with full details: content, media_url, response_type, is_admin_only, enabled, and its inline/reply keyboard objects.',
        parameters: { type: 'object', properties: { command: { type: 'string', description: 'Command name including slash, e.g. /help' } }, required: ['command'] }
    }}, 'read');

    push({ type: 'function', function: {
        name: 'list_groups',
        description: 'List groups the bot is in. filter: "active" (default) | "all". Returns id, title, type, is_active, member_count, last_active, ai_mode, track_members.',
        parameters: { type: 'object', properties: { filter: { type: 'string', enum: ['active','all'] } } }
    }}, 'read');

    push({ type: 'function', function: {
        name: 'get_menu',
        description: 'Return the current Telegram menu-button entries. Call this BEFORE set_menu so you can preserve existing entries.',
        parameters: { type: 'object', properties: {} }
    }}, 'read');

    push({ type: 'function', function: {
        name: 'get_settings',
        description: 'Return bot settings: bot_token_masked, bot_token_set, webhook_url, cf_token_masked.',
        parameters: { type: 'object', properties: {} }
    }}, 'read');

    push({ type: 'function', function: {
        name: 'test_webhook',
        description: 'Check Telegram webhook health: registered URL, whether it matches, pending update count, last error.',
        parameters: { type: 'object', properties: {} }
    }}, 'read');

    push({ type: 'function', function: {
        name: 'get_memory_overview',
        description: 'Summarize memory usage per user (AI messages and DM counts).',
        parameters: { type: 'object', properties: {} }
    }}, 'read');

    push({ type: 'function', function: {
        name: 'get_bot_info',
        description: 'Get the bot name, description and short description as shown in Telegram.',
        parameters: { type: 'object', properties: {} }
    }}, 'read');

    // ---- WRITE ----------------------------------------------------------------
    push({ type: 'function', function: {
        name: 'create_command',
        description: 'Create a new bot command. Attach keyboards with the `buttons` object: { inline: [{text,type,value}, ...] or [[...rows]], reply: { rows:[[{text}],...], actions:{"Label":"/cmd"}, resize, one_time, persistent, placeholder } }. For backwards compat you may also pass raw strings via buttons_json / reply_keyboard_json.',
        parameters: { type: 'object', properties: {
            command: { type: 'string', description: 'Command name including slash, e.g. /help' },
            parent: { type: 'string', description: 'Optional parent command name; leave empty for root.' },
            response_type: { type: 'string', enum: ['text','photo'] },
            content: { type: 'string', description: 'Message content (Telegram HTML allowed).' },
            media_url: { type: 'string', description: 'Photo URL when response_type is photo.' },
            is_admin_only: { type: 'boolean' },
            enabled: { type: 'boolean', description: 'Default true.' },
            buttons: {
                type: 'object',
                description: 'Structured keyboard: inline buttons and/or reply keyboard.',
                properties: {
                    inline: { type: 'array', description: 'Inline buttons. Each: {text, type:"callback"|"url"|"command", value}. May be flat (auto-wrapped 3/row) or array-of-arrays for exact rows.' },
                    reply: { type: 'object', description: 'Reply keyboard: { rows: [[{text},...]], actions: {"Label":"/cmd"}, resize, one_time, persistent, placeholder }.' }
                }
            },
            buttons_json: { type: 'string', description: 'Advanced: raw JSON for inline buttons column.' },
            reply_keyboard_json: { type: 'string', description: 'Advanced: raw JSON for reply keyboard column.' },
            show_reply_keyboard: { type: 'boolean', description: 'Force enable/disable reply keyboard (auto-set from buttons.reply).' }
        }, required: ['command','content'] }
    }}, 'write');

    push({ type: 'function', function: {
        name: 'update_command',
        description: 'Update an existing command. `command` is the CURRENT name. To rename, pass `new_command`. All other fields are optional and merge with existing values — send only what you want to change. Use buttons.inline=[] or buttons.reply=null to clear keyboards.',
        parameters: { type: 'object', properties: {
            command: { type: 'string', description: 'Current command name (with slash).' },
            new_command: { type: 'string', description: 'New name if renaming (with slash).' },
            parent: { type: 'string', description: 'Set to "" or null to move to root; omit to keep current parent.' },
            response_type: { type: 'string', enum: ['text','photo'] },
            content: { type: 'string' },
            media_url: { type: 'string' },
            is_admin_only: { type: 'boolean' },
            enabled: { type: 'boolean' },
            buttons: {
                type: 'object',
                description: 'Structured keyboard (same shape as create_command). Omit to keep existing. Pass {inline:[]} to clear inline, {reply:null} to clear reply.'
            },
            buttons_json: { type: 'string' },
            reply_keyboard_json: { type: 'string' },
            show_reply_keyboard: { type: 'boolean' }
        }, required: ['command'] }
    }}, 'write');

    push({ type: 'function', function: {
        name: 'delete_command',
        description: 'Delete a command and all its sub-commands.',
        parameters: { type: 'object', properties: { command: { type: 'string' } }, required: ['command'] }
    }}, 'write');

    push({ type: 'function', function: {
        name: 'set_menu',
        description: 'Publish the Telegram menu-button entries (replaces the entire menu). Each entry: {command:"help", description:"Show help"} — command WITHOUT slash. `/start` is auto-added if missing. Use get_menu first to preserve existing entries.',
        parameters: { type: 'object', properties: {
            menu: { type: 'array', items: { type: 'object', properties: {
                command: { type: 'string' }, description: { type: 'string' }
            }, required: ['command','description'] } }
        }, required: ['menu'] }
    }}, 'write');

    push({ type: 'function', function: {
        name: 'update_ai_settings',
        description: 'Update safe AI settings (everything EXCEPT the API keys). Cannot change: ai_api_key, or any apiKey inside ai_alt_providers. To add a fallback provider, pass ai_alt_providers as an array of {provider, model} — existing stored keys are preserved by index.',
        parameters: { type: 'object', properties: { settings: { type: 'object' } }, required: ['settings'] }
    }}, 'write');

    push({ type: 'function', function: {
        name: 'set_bot_info',
        description: 'Set the bot name (max 64), description (max 512) and short_description (max 120) in Telegram. Send only the fields you want to change.',
        parameters: { type: 'object', properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            short_description: { type: 'string' }
        } }
    }}, 'write');

    // ---- OUTBOUND -------------------------------------------------------------
    push({ type: 'function', function: {
        name: 'send_dm',
        description: 'Send a direct message to a user. Only works if they have started the bot. Provide text and/or photo_url. Optional `buttons` object for keyboards (same shape as create_command).',
        parameters: { type: 'object', properties: {
            userId: { type: 'number' },
            text: { type: 'string', description: 'Message text or photo caption (optional if photo_url is provided).' },
            photo_url: { type: 'string' },
            buttons: { type: 'object', description: 'Optional keyboard.' },
            buttons_json: { type: 'string' }
        }, required: ['userId'] }
    }}, 'outbound');

    push({ type: 'function', function: {
        name: 'send_broadcast',
        description: 'Broadcast a message to a list of user IDs. Provide message and/or photo_url. Optional `buttons` for keyboards.',
        parameters: { type: 'object', properties: {
            userIds: { type: 'array', items: { type: 'number' }, description: 'Non-empty list of user IDs.' },
            message: { type: 'string' },
            photo_url: { type: 'string' },
            buttons: { type: 'object', description: 'Optional keyboard.' },
            buttons_json: { type: 'string' }
        }, required: ['userIds'] }
    }}, 'outbound');

    // ---- DANGEROUS ------------------------------------------------------------
    push({ type: 'function', function: {
        name: 'delete_user',
        description: 'Delete a user and all their memory and DM history. You MUST ask the user for explicit confirmation before calling this. Set confirm=true only after the user says yes.',
        parameters: { type: 'object', properties: {
            userId: { type: 'number' },
            confirm: { type: 'boolean', description: 'Must be true. Only set after user confirms.' }
        }, required: ['userId','confirm'] }
    }}, 'dangerous');

    push({ type: 'function', function: {
        name: 'clear_ai_memory',
        description: 'Delete ALL AI conversation memory for every user. You MUST ask for explicit confirmation. Set confirm=true only after the user confirms.',
        parameters: { type: 'object', properties: {
            confirm: { type: 'boolean', description: 'Must be true.' }
        }, required: ['confirm'] }
    }}, 'dangerous');

    return tools;
}

async function executeMcpTool(name, args, env, categories) {
    args = args || {};
    const enabled = new Set(categories || ['read', 'write']);
    const allowed = (cat) => enabled.has(cat);
    const requireRead = () => { if (!allowed('read')) throw new Error('Read tools are disabled.'); };
    const requireWrite = () => { if (!allowed('write')) throw new Error('Write tools are disabled.'); };
    const requireOutbound = () => { if (!allowed('outbound')) throw new Error('Outbound tools are disabled. Enable them in the MCP tab.'); };
    const requireDangerous = () => { if (!allowed('dangerous')) throw new Error('Destructive tools are disabled.'); };
    const getBody = (body) => new Request('http://localhost' + (body.path || '/api'), {
        method: body.method || 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body.payload !== undefined ? JSON.stringify(body.payload) : undefined
    });
    const callApi = async (body) => {
        const req = getBody(body);
        const res = await body.handler(req, env);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
        return data;
    };

    switch (name) {

        // ---- READ --------------------------------------------------------------
        case 'get_stats':
            requireRead();
            return await callApi({ path: '/api/stats', method: 'GET', handler: async (r, e) => await getStats(e) });

        case 'list_users': {
            requireRead();
            const q = new URLSearchParams();
            if (args.filter) q.set('filter', String(args.filter));
            if (args.search) q.set('search', String(args.search));
            const url = new URL('http://localhost/api/users?' + q.toString());
            return await callApi({ path: url.pathname + url.search, method: 'GET', handler: async (r, e) => await getUsers(e, url) });
        }

        case 'get_user': {
            requireRead();
            const uid = parseInt(args.userId);
            if (!uid) throw new Error('userId is required.');
            const user = await env.DB.prepare(
                'SELECT id, username, first_name, role, is_premium, private_started, last_active, last_group_id FROM users WHERE id = ?'
            ).bind(uid).first();
            if (!user) throw new Error(`User ${uid} not found.`);
            const [block, dmCount, aiCount] = await Promise.all([
                env.DB.prepare('SELECT block_type FROM blocked_users WHERE user_id = ?').bind(uid).first(),
                env.DB.prepare('SELECT COUNT(*) as n FROM dm_messages WHERE chat_id = ?').bind(uid).first(),
                env.DB.prepare('SELECT COUNT(*) as n FROM ai_messages WHERE chat_id = ?').bind(uid).first(),
            ]);
            return {
                id: user.id, username: user.username || '', first_name: user.first_name || '',
                role: user.role || 'user', is_premium: !!user.is_premium,
                private_started: !!user.private_started,
                last_active: user.last_active || null, last_group_id: user.last_group_id || null,
                block_type: block ? block.block_type : null, blocked: !!block,
                dm_count: dmCount ? dmCount.n : 0, ai_count: aiCount ? aiCount.n : 0,
            };
        }

        case 'list_commands': {
            requireRead();
            const rows = await env.DB.prepare(
                'SELECT command, parent, response_type, content, enabled, is_admin_only, buttons_json, show_reply_keyboard FROM commands ORDER BY order_idx, command'
            ).all();
            const commands = (rows.results || []).map(r => ({
                command: r.command, parent: r.parent || null,
                response_type: r.response_type || 'text',
                enabled: r.enabled !== 0, is_admin_only: !!r.is_admin_only,
                has_buttons: !!r.buttons_json, has_reply_keyboard: !!r.show_reply_keyboard,
                content_preview: (r.content || '').slice(0, 120),
            }));
            return { count: commands.length, commands };
        }

        case 'get_command': {
            requireRead();
            const cmdName = String(args.command || '').trim();
            if (!cmdName) throw new Error('command is required.');
            const row = await env.DB.prepare('SELECT * FROM commands WHERE command = ?').bind(cmdName).first();
            if (!row) throw new Error(`Command "${cmdName}" not found.`);
            let buttons = null, replyKb = null;
            if (row.buttons_json) { try { buttons = JSON.parse(row.buttons_json); } catch (e) { buttons = row.buttons_json; } }
            if (row.reply_keyboard_json) { try { replyKb = JSON.parse(row.reply_keyboard_json); } catch (e) { replyKb = row.reply_keyboard_json; } }
            return {
                command: row.command, parent: row.parent || null,
                response_type: row.response_type || 'text',
                content: row.content || '', media_url: row.media_url || '',
                is_admin_only: !!row.is_admin_only, enabled: row.enabled !== 0,
                show_reply_keyboard: !!row.show_reply_keyboard,
                buttons, reply_keyboard: replyKb,
            };
        }

        case 'list_groups': {
            requireRead();
            const filter = args.filter === 'all' ? 'all' : 'active';
            const rows = await env.DB.prepare(
                'SELECT id, title, type, username, is_active, member_count, last_active, settings_json FROM groups ORDER BY last_active DESC LIMIT 300'
            ).all();
            let groups = rows.results || [];
            if (filter === 'active') groups = groups.filter(g => g.is_active == 1);
            return {
                count: groups.length, filter,
                groups: groups.map(g => {
                    let settings = {};
                    try { settings = JSON.parse(g.settings_json || '{}'); } catch (e) {}
                    return {
                        id: g.id, title: g.title || '', type: g.type || '', username: g.username || '',
                        is_active: g.is_active == 1, member_count: g.member_count || 0,
                        last_active: g.last_active, ai_mode: settings.ai || 'inherit',
                        track_members: !!settings.track_members,
                    };
                }),
            };
        }

        case 'get_menu': {
            requireRead();
            const raw = await getSetting(env.DB, 'menu_commands');
            let menu = [];
            if (raw) { try { menu = JSON.parse(raw); } catch (e) {} }
            return { menu, count: menu.length };
        }

        case 'get_settings': {
            requireRead();
            let origin = 'https://worker.local';
            try { origin = new URL(env.__requestUrl || 'https://worker.local').origin; } catch (e) {}
            return await callApi({ method: 'GET', handler: async (r, e) => await getSettings(e, origin) });
        }

        case 'test_webhook':
            requireRead();
            return await callApi({ path: '/api/settings/webhook-test', method: 'POST', handler: async (r, e) => await handleWebhookTest(e) });

        case 'get_memory_overview':
            requireRead();
            return await callApi({ path: '/api/memory/overview', method: 'GET', handler: async (r, e) => await getMemoryOverview(e) });

        case 'get_bot_info':
            requireRead();
            return await callApi({ path: '/api/bot_info', method: 'GET', handler: async (r, e) => await getBotInfo(e) });

        // ---- WRITE -------------------------------------------------------------
        case 'create_command': {
            requireWrite();
            const cmdName = String(args.command || '').trim();
            if (!cmdName) throw new Error('command is required.');
            const content = String(args.content || '');
            if (!content) throw new Error('content is required.');
            const existing = await env.DB.prepare('SELECT command FROM commands WHERE command = ?').bind(cmdName).first();
            if (existing) throw new Error(`Command "${cmdName}" already exists. Use update_command to modify it.`);
            const payload = {
                command: cmdName,
                parent: args.parent || null,
                response_type: args.response_type || 'text',
                content,
                media_url: args.media_url || '',
                is_admin_only: args.is_admin_only ? 1 : 0,
                enabled: args.enabled !== undefined ? (args.enabled ? 1 : 0) : 1,
            };
            const bp = buildButtonPayloads(args);
            if (bp.buttons_json !== undefined) payload.buttons_json = bp.buttons_json;
            if (bp.reply_keyboard_json !== undefined) payload.reply_keyboard_json = bp.reply_keyboard_json;
            if (bp.show_reply_keyboard !== undefined) payload.show_reply_keyboard = bp.show_reply_keyboard;
            return await callApi({ path: '/api/commands', method: 'POST', payload, handler: async (r, e) => await createCommand(r, e) });
        }

        case 'update_command': {
            requireWrite();
            const oldCommand = String(args.command || '').trim();
            if (!oldCommand) throw new Error('command (current name) is required.');
            const existing = await env.DB.prepare('SELECT * FROM commands WHERE command = ?').bind(oldCommand).first();
            if (!existing) throw new Error(`Command "${oldCommand}" not found.`);
            const newCommand = args.new_command ? String(args.new_command).trim() : oldCommand;
            const payload = {
                command: newCommand,
                parent: args.parent !== undefined ? (args.parent || null) : existing.parent,
                response_type: args.response_type !== undefined ? args.response_type : (existing.response_type || 'text'),
                content: args.content !== undefined ? String(args.content) : (existing.content || ''),
                media_url: args.media_url !== undefined ? String(args.media_url) : (existing.media_url || ''),
                is_admin_only: args.is_admin_only !== undefined ? (args.is_admin_only ? 1 : 0) : (existing.is_admin_only ? 1 : 0),
                enabled: args.enabled !== undefined ? (args.enabled ? 1 : 0) : (existing.enabled !== 0 ? 1 : 0),
                buttons_json: existing.buttons_json || '',
                reply_keyboard_json: existing.reply_keyboard_json || '',
                show_reply_keyboard: existing.show_reply_keyboard ? 1 : 0,
            };
            const bp = buildButtonPayloads(args);
            if (bp.buttons_json !== undefined) payload.buttons_json = bp.buttons_json;
            if (bp.reply_keyboard_json !== undefined) payload.reply_keyboard_json = bp.reply_keyboard_json;
            if (bp.show_reply_keyboard !== undefined) payload.show_reply_keyboard = bp.show_reply_keyboard;

            // No-op short-circuit: nothing changed → don't write, don't log.
            const eq = (a, b) => String(a == null ? '' : a) === String(b == null ? '' : b);
            const anyChange = Object.keys(payload).some(k => !eq(payload[k], existing[k]));
            if (!anyChange) return { success: true, command: oldCommand, changes: 0, note: 'No changes needed.' };

            const url = new URL(`http://localhost/api/commands/${encodeURIComponent(oldCommand)}`);
            return await callApi({ path: url.pathname, method: 'PUT', payload, handler: async (r, e) => await updateCommand(r, e) });
        }

        case 'delete_command': {
            requireWrite();
            const cmdName = String(args.command || '').trim();
            if (!cmdName) throw new Error('command is required.');
            const url = new URL(`http://localhost/api/commands/${encodeURIComponent(cmdName)}`);
            return await callApi({ path: url.pathname, method: 'DELETE', handler: async (r, e) => await deleteCommand(r, e) });
        }

        case 'set_menu': {
            requireWrite();
            if (!Array.isArray(args.menu)) throw new Error('menu must be an array of {command, description}.');
            const menu = args.menu.map(e => ({
                command: String((e && (e.command || e.name || e.cmd)) || '').replace(/^\//, '').trim(),
                description: String((e && (e.description || e.desc)) || '').trim(),
            })).filter(e => e.command && e.description);
            if (!menu.length) throw new Error('menu must contain at least one {command, description} entry.');
            if (menu.length > 100) throw new Error('Telegram allows at most 100 menu entries.');
            for (const e of menu) {
                if (e.command.length > 32) throw new Error(`Menu command "${e.command}" is too long (max 32 chars).`);
                if (e.description.length < 3) throw new Error(`Menu description for "${e.command}" is too short (min 3 chars).`);
                if (e.description.length > 256) throw new Error(`Menu description for "${e.command}" is too long (max 256 chars).`);
            }
            if (!menu.some(e => e.command === 'start')) menu.unshift({ command: 'start', description: 'Start the bot' });
            return await callApi({ path: '/api/menu_commands', method: 'POST', payload: { menu }, handler: async (r, e) => await setMenuCommands(r, e) });
        }

        case 'update_ai_settings': {
            requireWrite();
            const incoming = Object.assign({}, args.settings || {});
            delete incoming.ai_api_key; // never allow AI to touch the main key

            if (incoming.ai_alt_providers !== undefined) {
                try {
                    const incomingAlts = typeof incoming.ai_alt_providers === 'string'
                        ? JSON.parse(incoming.ai_alt_providers)
                        : incoming.ai_alt_providers;
                    if (Array.isArray(incomingAlts)) {
                        let storedAlts = [];
                        try { const raw = await getSetting(env.DB, 'ai_alt_providers'); storedAlts = raw ? JSON.parse(raw) : []; } catch (e) {}
                        // Preserve existing API keys keyed by provider NAME, not index —
                        // reordering or inserting a new provider can't steal another's key.
                        const storedByProvider = {};
                        for (const a of storedAlts) if (a && a.provider) storedByProvider[String(a.provider)] = a.apiKey || '';
                        const cleaned = incomingAlts.map(a => {
                            const prov = String((a && a.provider) || '').trim();
                            const incomingKey = a && a.apiKey && a.apiKey !== KEEP_SENTINEL ? String(a.apiKey) : '';
                            const resolvedKey = incomingKey || storedByProvider[prov] || '';
                            if (!resolvedKey) throw new Error(`Provider "${prov}" has no API key. Add it in the dashboard first, then retry.`);
                            return {
                                provider: prov,
                                model: String((a && a.model) || '').trim(),
                                apiKey: resolvedKey,
                            };
                        }).filter(a => a.provider);
                        incoming.ai_alt_providers = JSON.stringify(cleaned);
                    } else {
                        delete incoming.ai_alt_providers;
                    }
                } catch (e) {
                    if (e && e.message && e.message.includes('has no API key')) throw e;
                    delete incoming.ai_alt_providers;
                }
            }

            // Also strip secrets hidden in custom headers.
            if (typeof incoming.ai_custom_headers === 'string' && incoming.ai_custom_headers.trim()) {
                try {
                    const parsed = JSON.parse(incoming.ai_custom_headers);
                    if (parsed && typeof parsed === 'object') {
                        delete parsed.Authorization;
                        delete parsed.authorization;
                        incoming.ai_custom_headers = JSON.stringify(parsed);
                    }
                } catch (e) { /* leave as-is */ }
            }

            return await callApi({ path: '/api/ai_settings', method: 'POST', payload: { settings: incoming }, handler: async (r, e) => await saveAiSettings(r, e) });
        }

        case 'set_bot_info': {
            requireWrite();
            const payload = {};
            if (args.name !== undefined) {
                const n = String(args.name).trim();
                if (!n) throw new Error('name cannot be empty.');
                if (n.length > 64) throw new Error('Bot name must be ≤ 64 characters.');
                payload.name = n;
            }
            if (args.description !== undefined) {
                const d = String(args.description);
                if (d.length > 512) throw new Error('Bot description must be ≤ 512 characters.');
                payload.description = d;
            }
            if (args.short_description !== undefined) {
                const s = String(args.short_description);
                if (s.length > 120) throw new Error('Bot short_description must be ≤ 120 characters.');
                payload.short_description = s;
            }
            if (!Object.keys(payload).length) throw new Error('Provide at least one of: name, description, short_description.');
            return await callApi({ path: '/api/bot_info', method: 'POST', payload, handler: async (r, e) => await setBotInfo(r, e) });
        }

        // ---- OUTBOUND ----------------------------------------------------------
        case 'send_dm': {
            requireOutbound();
            const uid = parseInt(args.userId);
            if (!uid) throw new Error('userId is required.');
            const text = String(args.text || '').trim();
            const photoUrl = String(args.photo_url || '').trim();
            if (!text && !photoUrl) throw new Error('Provide text and/or photo_url.');
            const bp = buildButtonPayloads(args);
            const payload = { userId: uid, message: text };
            if (photoUrl) payload.photo_url = photoUrl;
            const buttonsToSend = bp.combined_json !== undefined ? bp.combined_json
                                 : (bp.buttons_json !== undefined ? bp.buttons_json : undefined);
            if (buttonsToSend) payload.buttons_json = buttonsToSend;
            return await callApi({ path: '/api/users/send_message', method: 'POST', payload, handler: async (r, e) => await sendUserPrivateMessage(r, e) });
        }

        case 'send_broadcast': {
            requireOutbound();
            if (!Array.isArray(args.userIds) || !args.userIds.length) throw new Error('userIds must be a non-empty array of user IDs.');
            const userIds = args.userIds.map(x => parseInt(x)).filter(x => Number.isFinite(x) && x > 0);
            if (!userIds.length) throw new Error('userIds contained no valid numeric IDs.');
            const message = String(args.message || '').trim();
            const photoUrl = String(args.photo_url || '').trim();
            if (!message && !photoUrl) throw new Error('Provide message and/or photo_url.');
            const bp = buildButtonPayloads(args);
            const payload = { userIds, message };
            if (photoUrl) payload.photo_url = photoUrl;
            const buttonsToSend = bp.combined_json !== undefined ? bp.combined_json
                                 : (bp.buttons_json !== undefined ? bp.buttons_json : undefined);
            if (buttonsToSend) payload.buttons_json = buttonsToSend;
            return await callApi({ path: '/api/broadcast', method: 'POST', payload, handler: async (r, e) => await handleBroadcast(r, e) });
        }

        // ---- DANGEROUS ---------------------------------------------------------
        case 'delete_user': {
            requireDangerous();
            if (!args.confirm) throw new Error('You must set confirm=true after the user explicitly confirms.');
            const uid = parseInt(args.userId);
            if (!uid) throw new Error('userId is required.');
            const url = new URL(`http://localhost/api/users/${uid}`);
            return await callApi({ path: url.pathname, method: 'DELETE', handler: async (r, e) => await deleteUser(r, e, url) });
        }

        case 'clear_ai_memory': {
            requireDangerous();
            if (!args.confirm) throw new Error('You must set confirm=true after the user explicitly confirms.');
            return await callApi({ path: '/api/ai/clear_memory', method: 'POST', handler: async (r, e) => await clearAiMemory(e) });
        }

        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}

// ---- JSON-RPC handler (stateless Streamable HTTP) ---------------------------
const MCP_CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type, Mcp-Session-Id, Mcp-Protocol-Version',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Expose-Headers': 'WWW-Authenticate, Content-Type',
};
function mcpJsonHeaders(extra) {
    return Object.assign({}, JSON_HEADERS, MCP_CORS_HEADERS, extra || {});
}
async function handleMcp(request, env) {
    if (!env.DB) return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32603, message: 'DB not available' }, id: null }), { status: 500, headers: mcpJsonHeaders() });
    try {
        await initializeDatabase(env.DB);

        // CORS preflight — always 204, no auth required.
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: mcpJsonHeaders() });
        }

        const enabled = await getSetting(env.DB, 'mcp_enabled');
        if (enabled !== '1') {
            return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32000, message: 'MCP disabled' }, id: null }), { status: 403, headers: mcpJsonHeaders() });
        }

        // GET = no SSE stream (spec: return 405 for clients that try).
        if (request.method === 'GET') {
            return new Response(null, { status: 405, headers: mcpJsonHeaders({ 'Allow': 'POST, DELETE, OPTIONS' }) });
        }
        // DELETE — stateless transport, no session to terminate.
        if (request.method === 'DELETE') {
            return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32001, message: 'No session to terminate' }, id: null }), { status: 404, headers: mcpJsonHeaders() });
        }
        if (request.method !== 'POST') {
            return new Response(null, { status: 405, headers: mcpJsonHeaders({ 'Allow': 'POST, DELETE, OPTIONS' }) });
        }

        const auth = request.headers.get('Authorization') || '';
        const bearer = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
        const tokenRow = await verifyMcpToken(env, bearer);
        if (!tokenRow) {
            return new Response(
                JSON.stringify({ jsonrpc: '2.0', error: { code: -32001, message: 'Unauthorized' }, id: null }),
                { status: 401, headers: mcpJsonHeaders({ 'WWW-Authenticate': 'Bearer realm="nyxx-mcp"' }) }
            );
        }

        let body = null;
        try { body = await request.json(); } catch (e) {
            return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' }, id: null }), { status: 200, headers: mcpJsonHeaders() });
        }
        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32600, message: 'Invalid request' }, id: null }), { status: 200, headers: mcpJsonHeaders() });
        }

        const method = body.method;
        const id = body.id !== undefined ? body.id : null;

        // Any notification (no id, method starting with 'notifications/') → 202, no body.
        // This is per spec — the client never expects a reply.
        if (typeof method === 'string' && method.startsWith('notifications/')) {
            return new Response(null, { status: 202, headers: mcpJsonHeaders() });
        }
        // A method with no id that isn't a notification — this is a client bug, but don't hang.
        if (id === null && method !== 'initialize') {
            return new Response(null, { status: 202, headers: mcpJsonHeaders() });
        }
        if (typeof method !== 'string' || !method) {
            return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32600, message: 'Missing or invalid method' }, id: null }), { status: 200, headers: mcpJsonHeaders() });
        }

        const settings = await getMcpSettingsFromDb(env);
        let categories = ['read', 'write'];
        try {
            const parsed = JSON.parse(settings.mcp_categories || '[]');
            if (Array.isArray(parsed)) categories = parsed.filter(c => MCP_CATEGORY_KEYS.includes(c));
        } catch (e) { /* keep default */ }

        if (method === 'initialize') {
            const requestedVersion = body.params && body.params.protocolVersion;
            const SUPPORTED = ['2025-03-26', '2024-11-05'];
            const negotiate = SUPPORTED.includes(requestedVersion) ? requestedVersion : '2025-03-26';
            return new Response(JSON.stringify({
                jsonrpc: '2.0',
                id,
                result: {
                    protocolVersion: negotiate,
                    capabilities: { tools: { listChanged: false } },
                    serverInfo: { name: 'nyxx', version: VERSION }
                }
            }), { status: 200, headers: mcpJsonHeaders() });
        }
        if (method === 'ping') {
            return new Response(JSON.stringify({ jsonrpc: '2.0', id, result: {} }), { status: 200, headers: mcpJsonHeaders() });
        }
        if (method === 'tools/list') {
            const tools = getMcpToolDefinitions(categories).map(t => ({
                name: t.function.name,
                description: t.function.description,
                inputSchema: t.function.parameters || { type: 'object', properties: {} },
            }));
            return new Response(JSON.stringify({
                jsonrpc: '2.0',
                id,
                result: { tools }
            }), { status: 200, headers: mcpJsonHeaders() });
        }
        if (method === 'tools/call') {
            const toolName = body.params && body.params.name;
            const toolArgs = (body.params && body.params.arguments) || {};
            if (!toolName || typeof toolName !== 'string') {
                return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32602, message: 'Missing tool name' }, id }), { status: 200, headers: mcpJsonHeaders() });
            }
            const hdrSession = (request.headers.get('Mcp-Session-Id') || '').trim();
            const sessionKey = 'ext:' + (hdrSession || tokenRow.token_prefix || 'unknown');
            const rl = await checkMcpRateLimit(env.DB, sessionKey);
            if (!rl.ok) {
                return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32002, message: rl.message }, id }), { status: 429, headers: mcpJsonHeaders({ 'Retry-After': '60' }) });
            }
            try {
                const result = await executeMcpTool(toolName, toolArgs, env, categories);
                try { await logAction(env.DB, null, 'MCP: ' + toolName + ' ' + JSON.stringify(toolArgs).slice(0, 200)); } catch (e) {}
                return new Response(JSON.stringify({
                    jsonrpc: '2.0',
                    id,
                    result: {
                        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
                        structuredContent: result,
                        isError: false
                    }
                }), { status: 200, headers: mcpJsonHeaders() });
            } catch (toolErr) {
                try { await logAction(env.DB, null, 'MCP (error): ' + toolName + ' — ' + String(toolErr.message || '').slice(0, 200)); } catch (e) {}
                return new Response(JSON.stringify({
                    jsonrpc: '2.0',
                    id,
                    result: {
                        content: [{ type: 'text', text: 'Tool error: ' + String(toolErr.message || toolErr) }],
                        isError: true
                    }
                }), { status: 200, headers: mcpJsonHeaders() });
            }
        }
        return new Response(JSON.stringify({
            jsonrpc: '2.0',
            error: { code: -32601, message: 'Method not found: ' + method },
            id
        }), { status: 200, headers: mcpJsonHeaders() });
    } catch (err) {
        console.error('MCP error:', err);
        return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32603, message: 'Internal error' }, id: null }), { status: 500, headers: mcpJsonHeaders() });
    }
}
function jsonRpcResult(id, result) {
    return new Response(JSON.stringify({ jsonrpc: '2.0', result, id }), { status: 200, headers: JSON_HEADERS });
}
function jsonRpcError(id, code, message) {
    return new Response(JSON.stringify({ jsonrpc: '2.0', error: { code, message }, id: id === undefined ? null : id }), { status: 200, headers: JSON_HEADERS });
}

// ---- MCP AI (provider test, agent loop, dashboard chat) ---------------------
async function resolveMcpAiSettings(env, incoming) {
    const s = Object.assign({}, incoming || {});
    if (!s.mcp_ai_api_key || s.mcp_ai_api_key === KEEP_SENTINEL) {
        s.mcp_ai_api_key = (await getSetting(env.DB, 'mcp_ai_api_key')) || '';
    }
    return s;
}

async function callMcpAiCompletion(settings, systemPrompt, messages, tools) {
    const provider = settings.mcp_ai_provider || 'openai';
    const apiKey = settings.mcp_ai_api_key;
    if (!apiKey) throw new Error('MCP AI API key is not set.');
    const defaults = getProviderDefaults(provider, settings.mcp_ai_base_url);
    const baseUrl = (provider === 'custom' ? settings.mcp_ai_base_url : defaults.baseUrl) || defaults.baseUrl;
    const model = settings.mcp_ai_model || defaults.defaultModel;
    if (!baseUrl) throw new Error('Base URL is required for this provider.');
    const endpoint = baseUrl.replace(/\/+$/, '') + '/chat/completions';
    const payload = {
        model,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        temperature: 0.3,
        max_tokens: 2048
    };
    if (tools && tools.length) { payload.tools = tools; payload.tool_choice = 'auto'; }
    let res;
    for (let attempt = 0; ; attempt++) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 60000);
        try {
            res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey }, body: JSON.stringify(payload), signal: ctrl.signal });
        } finally { clearTimeout(timer); }
        if (res.status === 429 && attempt < 2) {
            const t = await res.text();
            const m = t.match(/try again in ([\d.]+)s/i);
            await new Promise(r => setTimeout(r, Math.min(((m ? parseFloat(m[1]) : 5) + 0.5) * 1000, 10000)));
            continue;
        }
        break;
    }
    if (!res.ok) { const t = await res.text(); throw new Error(`AI error ${res.status}: ${t.slice(0, 300)}`); }
    const data = await res.json();
    const choice = data.choices && data.choices[0];
    if (!choice || !choice.message) throw new Error('Empty response from AI.');
    return choice.message;
}

const MCP_SYSTEM_PROMPT = `You are the admin assistant for a Telegram bot management dashboard called Nyxx.

You have access to tools that let you read and modify the bot: users, commands, groups, settings, AI config, broadcasts.

Guidelines:
- For destructive actions (delete_user, clear_ai_memory), you MUST ask the user for explicit confirmation before setting confirm=true. Say what will happen and wait for a clear "yes".
- For send_dm and send_broadcast, double-check the target before sending.
- Summarize what you did at the end, in plain language the user can understand.
- If a tool returns an error, explain it briefly and suggest a fix.
- Do not reveal API keys, bot tokens, or other secrets, even if asked. They are masked on the server side anyway.
- Be concise but complete. Format lists with bullets. Use plain text, no markdown.`;

async function runMcpAgent(userMessage, env, opts) {
    opts = opts || {};
    const sessionKey = opts.sessionKey || null;
    const maxIter = Math.min(opts.maxIterations || 8, 8);

    if (sessionKey) {
        const rl = await checkMcpRateLimit(env.DB, sessionKey);
        if (!rl.ok) {
            return { finalMessage: '⚠️ ' + rl.message, toolCalls: [], messages: [], iterations: 0, rateLimited: true };
        }
    }

    const dbSettings = await getMcpSettingsFromDb(env);
    const aiSettings = await resolveMcpAiSettings(env, opts.settings || dbSettings);
    let categories = ['read', 'write'];
    try {
        const parsed = JSON.parse(dbSettings.mcp_categories || '[]');
        if (Array.isArray(parsed)) categories = parsed.filter(c => MCP_CATEGORY_KEYS.includes(c));
    } catch (e) { /* keep default */ }
    const tools = getMcpToolDefinitions(categories);

    const keep = await getMcpMemoryLimit(env.DB);
    let history = [];
    if (sessionKey && keep > 0) history = await loadMcpSession(env.DB, sessionKey);
    if (!history.length && Array.isArray(opts.history)) {
        history = opts.history
            .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
            .slice(-20);
    }

    return await runAgentLoop({
        env,
        sessionKey,
        persistSession: true,
        providerSettings: aiSettings,
        systemPrompt: MCP_SYSTEM_PROMPT,
        history,
        userText: userMessage,
        tools,
        maxIter,
        categories,
    });
}

async function runAgentLoop({ env, sessionKey, persistSession, providerSettings, systemPrompt, history, userText, tools, maxIter, categories, forceKeep = 0 }) {
    const toolCallsLog = [];
    const messages = (history || []).concat([{ role: 'user', content: userText }]);
    const keep = forceKeep || (persistSession && sessionKey ? await getMcpMemoryLimit(env.DB) : 0);
    let iteration = 0;

    while (iteration < maxIter) {
        iteration++;
        const response = await callMcpAiCompletion(providerSettings, systemPrompt, messages, tools);
        const toolCalls = response.tool_calls || [];
        if (!toolCalls.length) {
            const finalMessages = messages.concat([{ role: 'assistant', content: response.content || '' }]);
            if (persistSession && sessionKey && keep > 0) await saveMcpSession(env.DB, sessionKey, finalMessages, keep);
            return { finalMessage: response.content || '(no response)', toolCalls: toolCallsLog, messages: finalMessages, iterations: iteration };
        }
        messages.push({ role: 'assistant', content: response.content || null, tool_calls: toolCalls });
        for (const call of toolCalls) {
            const fnName = call.function && call.function.name;
            let parsedArgs = {};
            try { parsedArgs = JSON.parse(call.function.arguments || '{}'); } catch (e) {}
            let toolResult = null, toolError = null;
            try {
                toolResult = await executeMcpTool(fnName, parsedArgs, env, categories);
                try { await logAction(env.DB, null, 'MCP agent: ' + fnName + ' ' + JSON.stringify(parsedArgs).slice(0, 200)); } catch (e) {}
            } catch (err) {
                toolError = String(err.message || err);
                try { await logAction(env.DB, null, 'MCP (error): ' + fnName + ' — ' + String(toolError).slice(0, 200)); } catch (e) {}
            }
            toolCallsLog.push({ name: fnName, args: parsedArgs, result: toolResult, error: toolError });
            messages.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(toolError ? { error: toolError } : toolResult) });
        }
    }

    const finalMessages = messages.concat([{ role: 'assistant', content: '(Reached maximum iterations without a final answer.)' }]);
    if (persistSession && sessionKey && keep > 0) await saveMcpSession(env.DB, sessionKey, finalMessages, keep);
    return { finalMessage: '(Reached maximum iterations without a final answer.)', toolCalls: toolCallsLog, messages: finalMessages, iterations: iteration };
}

async function handleMcpDashboardChat(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const enabled = await getSetting(env.DB, 'mcp_enabled');
        if (enabled !== '1') return apiJson({ error: 'MCP is disabled. Enable it in the MCP tab first.' }, 400);
        const body = await request.json().catch(() => null);
        if (!body || typeof body !== 'object') return apiJson({ error: 'Invalid request body.' }, 400);
        const msg = body.message;
        if (typeof msg !== 'string' || !msg.trim()) return apiJson({ error: 'Message must be a non-empty string.' }, 400);
        if (msg.length > 4000) return apiJson({ error: 'Message is too long (max 4000 chars).' }, 400);

        // Stable key — history must survive logout/login cycles.
        const sessionKey = 'dash:admin';

        const clientHistory = Array.isArray(body.history)
            ? body.history
                .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
                .slice(-20)
                .map(m => ({ role: m.role, content: String(m.content).slice(0, 4000) }))
            : [];

        const result = await runMcpAgent(msg.trim(), env, { sessionKey, history: clientHistory, maxIterations: 6 });
        return apiJson({
            success: !result.rateLimited,
            response: result.finalMessage,
            toolCalls: result.toolCalls,
            iterations: result.iterations,
            rateLimited: !!result.rateLimited
        });
        } catch (err) {
            return apiJson({ success: false, error: String(err.message || err) }, 500);
        }
}

async function handleMcpAiTest(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const body = await request.json().catch(() => ({}));
        const settings = await resolveMcpAiSettings(env, body.settings || {});
        if (!settings.mcp_ai_api_key) return apiJson({ success: false, error: 'No API key saved yet. Paste one and press Save provider first.' }, 200);
        const reply = await callMcpAiCompletion(settings, 'You are a test endpoint. Reply with "OK" and nothing else.', [{ role: 'user', content: 'Reply with OK.' }], null);
        return apiJson({ success: true, message: (reply && reply.content) || '(empty)' });
    } catch (err) { return apiJson({ success: false, error: String(err.message || err) }, 200); }
}

async function getMcpCalls(env) {
    if (!env.DB) return apiJson({ calls: [] });
    try {
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare(
            "SELECT id, action, timestamp FROM logs WHERE (action LIKE 'MCP:%' OR action LIKE 'MCP agent:%' OR action LIKE 'MCP (error):%') ORDER BY id DESC LIMIT 5"
        ).all();
        return apiJson({ calls: rows.results || [] });
    } catch (err) { return internalError(err); }
}

// ============================================================================
// DEDICATED CHAT ROUTE (ChatGPT-like)
// ============================================================================
const CHAT_HTML = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Nyxx | Chat</title>
<link rel="shortcut icon" href="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" type="image/x-icon">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
:root{--bg:#0a0a0a;--surface:#161616;--surface-2:#212121;--border:#2a2a2a;--text:#ececec;--text-2:#a3a3a3;--accent:#10a37f;--danger:#ef4444;--radius:12px}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;padding:0;height:100%;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:15px}
.app{display:flex;height:100vh;overflow:hidden}
.sidebar{width:260px;background:#080808;border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;transition:transform .25s ease}
.sidebar-head{padding:14px;border-bottom:1px solid var(--border)}
.brand{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.brand img{width:28px;height:28px;border-radius:6px}
.brand .name{font-weight:600;font-size:15px}
.new-chat-btn{width:100%;padding:10px 14px;border:1px solid var(--border);background:transparent;color:var(--text);border-radius:var(--radius);cursor:pointer;font-size:14px;text-align:left;display:flex;align-items:center;gap:8px}
.new-chat-btn:hover{background:var(--surface)}
.chat-list{flex:1;overflow-y:auto;padding:8px}
.chat-list .empty-sideless{padding:20px;color:var(--text-2);font-size:13px;text-align:center}
.chat-item{padding:10px 12px;border-radius:8px;cursor:pointer;font-size:14px;color:var(--text-2);display:flex;align-items:center;gap:8px;margin-bottom:2px;transition:background .1s}
.chat-item:hover{background:var(--surface)}
.chat-item.active{background:var(--surface-2);color:var(--text)}
.chat-item .ti{font-size:13px;color:var(--text-2);flex-shrink:0}
.chat-item .title{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.chat-item .del{background:none;border:none;color:var(--text-2);cursor:pointer;padding:4px;border-radius:4px;display:none;font-size:12px;flex-shrink:0}
.chat-item:hover .del{display:inline-flex}
.chat-item .del:hover{background:rgba(239,68,68,.15);color:var(--danger)}
.sidebar-foot{padding:12px;border-top:1px solid var(--border);font-size:12px;color:var(--text-2)}
.sidebar-foot a{color:var(--text-2);text-decoration:none}
.sidebar-foot a:hover{color:var(--text)}
.main{flex:1;display:flex;flex-direction:column;min-width:0}
.topbar{padding:12px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;min-height:56px}
.topbar .hamburger{display:none;background:none;border:none;color:var(--text);font-size:18px;cursor:pointer;padding:6px;border-radius:6px}
.topbar .hamburger:hover{background:var(--surface)}
.topbar h1{font-size:16px;font-weight:600;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}
.topbar .back{color:var(--text-2);font-size:13px;text-decoration:none;padding:6px 10px;border-radius:6px;border:1px solid var(--border);display:inline-flex;align-items:center;gap:6px}
.topbar .back:hover{background:var(--surface);color:var(--text)}
.messages{flex:1;overflow-y:auto;padding:20px;max-width:900px;margin:0 auto;width:100%}
.empty-chat{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;color:var(--text-2);padding:20px}
.empty-chat .ic{font-size:40px;color:var(--accent);margin-bottom:16px}
.empty-chat h2{color:var(--text);font-size:26px;margin:0 0 10px;font-weight:600}
.empty-chat p{max-width:520px;line-height:1.6;margin:0 0 24px}
.suggestions{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;width:100%;max-width:640px}
.sugg{padding:14px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;font-size:13px;text-align:left;color:var(--text);line-height:1.5}
.sugg:hover{background:var(--surface-2);border-color:#3a3a3a}
.sugg b{display:block;margin-bottom:4px;color:var(--text);font-weight:600}
.sugg span{color:var(--text-2);font-size:12px}
.msg{display:flex;gap:12px;margin-bottom:22px;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.msg .avatar{width:32px;height:32px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600}
.msg.user .avatar{background:var(--accent);color:#fff}
.msg.assistant .avatar{background:var(--surface-2);color:var(--text)}
.msg .body{flex:1;min-width:0}
.msg .role{font-size:11px;font-weight:700;color:var(--text-2);margin-bottom:5px;text-transform:uppercase;letter-spacing:.06em}
.msg .content{line-height:1.7;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word}
.msg .content pre{background:#000;padding:14px;border-radius:8px;overflow-x:auto;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;margin:8px 0;line-height:1.5}
.msg .content code{background:rgba(255,255,255,.08);padding:1px 6px;border-radius:4px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9em}
.msg .content pre code{background:none;padding:0;font-size:13px}
.tools{margin-top:10px;padding:8px 12px;background:var(--surface);border-radius:8px;font-size:12px;border-left:3px solid var(--accent)}
.tools .tool{color:var(--text-2);margin-bottom:4px;display:flex;gap:6px;align-items:center}
.tools .tool:last-child{margin-bottom:0}
.tools .tool .ok{color:var(--accent)}
.tools .tool .fail{color:var(--danger)}
.thinking{display:inline-flex;gap:5px;align-items:center;color:var(--text-2);font-size:13px}
.thinking .dot{width:6px;height:6px;border-radius:50%;background:var(--text-2);animation:bounce 1.2s infinite}
.thinking .dot:nth-child(2){animation-delay:.15s}
.thinking .dot:nth-child(3){animation-delay:.3s}
@keyframes bounce{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}
.composer{padding:12px 20px 20px;max-width:900px;margin:0 auto;width:100%}
.composer-inner{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:12px 14px;display:flex;gap:10px;align-items:flex-end;transition:border-color .15s}
.composer-inner:focus-within{border-color:#3a3a3a}
.composer textarea{flex:1;background:none;border:none;color:var(--text);font-family:inherit;font-size:15px;resize:none;max-height:220px;min-height:24px;line-height:1.5;outline:none;padding:0;overflow-y:auto}
.composer .send{background:var(--accent);border:none;color:#fff;width:34px;height:34px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .15s}
.composer .send:disabled{opacity:.35;cursor:not-allowed}
.composer .send:not(:disabled):hover{background:#0d8a6a}
.composer .hint{text-align:center;font-size:11px;color:var(--text-2);margin-top:8px}
.overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:5}
@media (max-width:768px){
    .sidebar{position:fixed;left:0;top:0;bottom:0;z-index:10;transform:translateX(-100%)}
    .sidebar.open{transform:none}
    .topbar .hamburger{display:inline-flex}
    .overlay.show{display:block}
    .messages{padding:12px}
    .composer{padding:12px}
}
</style></head>
<body>
<div class="app">
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-head">
            <div class="brand">
                <img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" alt="Nyxx">
                <span class="name">Nyxx Chat</span>
            </div>
            <button class="new-chat-btn" onclick="newChat()"><i class="fa-solid fa-plus"></i> New chat</button>
        </div>
        <div class="chat-list" id="chat-list"></div>
        <div class="sidebar-foot">
            <a href="/">← Back to dashboard</a>
        </div>
    </aside>
    <div class="overlay" id="overlay" onclick="toggleSidebar(false)"></div>
    <main class="main">
        <header class="topbar">
            <button class="hamburger" onclick="toggleSidebar()" aria-label="Toggle menu"><i class="fa-solid fa-bars"></i></button>
            <h1 id="chat-title">Nyxx Chat</h1>
            <a class="back" href="/"><i class="fa-solid fa-arrow-left"></i> Dashboard</a>
        </header>
        <div class="messages" id="messages"></div>
        <div class="composer">
            <div class="composer-inner">
                <textarea id="input" rows="1" placeholder="Message Nyxx…" oninput="autoGrow(this)" onkeydown="onKey(event)"></textarea>
                <button class="send" id="send-btn" onclick="send()" aria-label="Send"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
            <div class="hint">Enter to send · Shift+Enter for newline · AI can manage your bot</div>
        </div>
    </main>
</div>
<script>
function $(id){return document.getElementById(id);}
function esc(s){if(s==null)return '';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function renderMarkdown(text){
    var parts=String(text||'').split('\`\`\`');
    var out='';
    for(var i=0;i<parts.length;i++){
        if(i%2===1){
            var block=parts[i];
            var nl=block.indexOf('\\n');
            if(nl>0)block=block.slice(nl+1);
            out+='<pre><code>'+esc(block.replace(/\\n$/,''))+'</code></pre>';
        } else {
            var t=esc(parts[i]);
            t=t.replace(/\`([^\`\\n]+)\`/g,'<code>$1</code>');
            out+=t;
        }
    }
    return out;
}
async function api(method,path,body){
    var opts={method:method,headers:{},credentials:'same-origin'};
    if(body!==undefined){opts.headers['Content-Type']='application/json';opts.body=JSON.stringify(body);}
    var res=await fetch(path,opts);
    if(res.status===401){window.location.href='/';throw new Error('Session expired');}
    var data=null;
    try{data=await res.json();}catch(e){}
    if(!res.ok)throw new Error((data&&data.error)||('Request failed ('+res.status+')'));
    return data;
}

var currentKey=null;
var currentMessages=[];
var sessions=[];
var sending=false;

function toggleSidebar(force){
    var s=$('sidebar'),o=$('overlay');
    var open=(typeof force==='boolean')?force:!s.classList.contains('open');
    s.classList.toggle('open',open);
    o.classList.toggle('show',open);
}
function autoGrow(el){el.style.height='auto';el.style.height=Math.min(el.scrollHeight,220)+'px';}
function onKey(e){
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}
}
function scrollBottom(){var m=$('messages');requestAnimationFrame(function(){m.scrollTop=m.scrollHeight;});}

function emptyState(){
    return '<div class="empty-chat">'+
        '<div class="ic"><i class="fa-solid fa-wand-magic-sparkles"></i></div>'+
        '<h2>How can I help with your bot?</h2>'+
        '<p>I can read stats, create and edit commands, manage groups, send messages, tweak AI settings — anything enabled in the MCP tab.</p>'+
        '<div class="suggestions">'+
        '<div class="sugg" onclick="fillAndSend(\\'Show me the bot stats\\')"><b>Bot overview</b><span>Show me the bot stats</span></div>'+
        '<div class="sugg" onclick="fillAndSend(\\'List all users who started the bot\\')"><b>Users</b><span>List all users who started the bot</span></div>'+
        '<div class="sugg" onclick="fillAndSend(\\'Create a /help command that replies with a friendly welcome\\')"><b>Create command</b><span>Create a /help command</span></div>'+
        '<div class="sugg" onclick="fillAndSend(\\'Show me the current AI system prompt\\')"><b>AI settings</b><span>Show the current AI prompt</span></div>'+
        '</div>'+
    '</div>';
}
function fillAndSend(text){
    $('input').value=text;
    autoGrow($('input'));
    send();
}

function renderMessages(){
    var box=$('messages');
    if(!currentMessages.length){box.innerHTML=emptyState();return;}
    var html='';
    for(var i=0;i<currentMessages.length;i++){
        var m=currentMessages[i];
        var role=m.role==='user'?'user':'assistant';
        var initial=role==='user'?'U':'N';
        html+='<div class="msg '+role+'">'+
            '<div class="avatar">'+initial+'</div>'+
            '<div class="body">'+
                '<div class="role">'+(role==='user'?'You':'Nyxx')+'</div>'+
                '<div class="content">'+renderMarkdown(m.content||'')+'</div>'+
                (m.toolCalls&&m.toolCalls.length?renderTools(m.toolCalls):'')+
            '</div>'+
        '</div>';
    }
    box.innerHTML=html;
    scrollBottom();
}
function renderTools(tools){
    var h='<div class="tools">';
    for(var i=0;i<tools.length;i++){
        var t=tools[i];
        var cls=t.error?'fail':'ok';
        var sym=t.error?'✗':'✓';
        h+='<div class="tool"><span class="'+cls+'">'+sym+'</span> <code>'+esc(t.name)+'</code>'+
            (t.error?' — <span class="fail">'+esc(String(t.error).slice(0,200))+'</span>':'')+
        '</div>';
    }
    h+='</div>';
    return h;
}
function appendLive(role,content,toolCalls){
    var box=$('messages');
    if(box.querySelector('.empty-chat'))box.innerHTML='';
    var initial=role==='user'?'U':'N';
    var div=document.createElement('div');
    div.className='msg '+role;
    div.innerHTML='<div class="avatar">'+initial+'</div>'+
        '<div class="body">'+
            '<div class="role">'+(role==='user'?'You':'Nyxx')+'</div>'+
            '<div class="content">'+renderMarkdown(content||'')+'</div>'+
            (toolCalls&&toolCalls.length?renderTools(toolCalls):'')+
        '</div>';
    box.appendChild(div);
    scrollBottom();
}
function appendThinking(){
    var box=$('messages');
    var div=document.createElement('div');
    div.className='msg assistant';
    div.id='thinking';
    div.innerHTML='<div class="avatar">N</div>'+
        '<div class="body">'+
            '<div class="role">Nyxx</div>'+
            '<div class="content"><span class="thinking"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span></div>'+
        '</div>';
    box.appendChild(div);
    scrollBottom();
}
function removeThinking(){var t=$('thinking');if(t)t.remove();}

async function loadSessions(){
    try{
        var d=await api('GET','/api/chat/sessions');
        sessions=d.sessions||[];
        renderSessions();
    }catch(e){/* silent */}
}
function renderSessions(){
    var box=$('chat-list');
    if(!sessions.length){box.innerHTML='<div class="empty-sideless">No chats yet</div>';return;}
    var html='';
    for(var i=0;i<sessions.length;i++){
        var s=sessions[i];
        var active=(s.session_key===currentKey)?' active':'';
        html+='<div class="chat-item'+active+'" onclick="openSession(\\''+esc(s.session_key)+'\\')">'+
            '<i class="fa-regular fa-comment ti"></i>'+
            '<span class="title">'+esc(s.title||'New chat')+'</span>'+
            '<button class="del" onclick="deleteSession(event,\\''+esc(s.session_key)+'\\')" aria-label="Delete"><i class="fa-solid fa-trash"></i></button>'+
        '</div>';
    }
    box.innerHTML=html;
}
async function openSession(key){
    currentKey=key;
    toggleSidebar(false);
    var box=$('messages');
    box.innerHTML='<div style="text-align:center;padding:30px;color:var(--text-2)">Loading…</div>';
    try{
        var d=await api('GET','/api/chat/sessions/'+encodeURIComponent(key));
        currentMessages=(d.messages||[]).filter(function(m){return m.role==='user'||m.role==='assistant';});
        $('chat-title').textContent=d.title||'Chat';
        renderMessages();
        loadSessions();
    }catch(e){
        box.innerHTML='<div style="text-align:center;padding:30px;color:var(--danger)">'+esc(e.message)+'</div>';
    }
}
function newChat(){
    currentKey=null;
    currentMessages=[];
    $('chat-title').textContent='Nyxx Chat';
    renderMessages();
    renderSessions();
    toggleSidebar(false);
    $('input').focus();
}
async function deleteSession(ev,key){
    ev.stopPropagation();
    if(!confirm('Delete this chat?'))return;
    try{
        await api('DELETE','/api/chat/sessions/'+encodeURIComponent(key));
        if(currentKey===key){newChat();}
        await loadSessions();
    }catch(e){alert(e.message);}
}
async function send(){
    if(sending)return;
    var input=$('input');
    var text=input.value.trim();
    if(!text)return;
    sending=true;
    $('send-btn').disabled=true;
    var wasNew=!currentKey;
    input.value='';
    autoGrow(input);
    appendLive('user',text);
    appendThinking();
try{
    var path=wasNew?'/api/chat/sessions/new/send':'/api/chat/sessions/'+encodeURIComponent(currentKey)+'/send';
    var d=await api('POST',path,{message:text});
    removeThinking();
    if(d.sessionKey)currentKey=d.sessionKey;

    if(d && d.success === false){
        // Server reported a real error (bad/missing API key, provider 4xx/5xx, etc.).
        var errMsg='⚠️ '+(d.error||'The AI returned an error.');
        appendLive('assistant',errMsg);
    } else {
        var respText=(d && d.response) || '(no response)';
        appendLive('assistant',respText,(d && d.toolCalls)||[]);
        currentMessages.push({role:'user',content:text});
        currentMessages.push({role:'assistant',content:respText,toolCalls:(d && d.toolCalls)||[]});
    }

    if(wasNew||!$('chat-title').textContent||$('chat-title').textContent==='Nyxx Chat'){
        $('chat-title').textContent=text.replace(/\\s+/g,' ').slice(0,60);
    }
    loadSessions();
}catch(e){
    removeThinking();
    appendLive('assistant','⚠️ '+e.message);
}finally{
        sending=false;
        $('send-btn').disabled=false;
        $('input').focus();
    }
}

(async function init(){
    await loadSessions();
    var q=new URLSearchParams(window.location.search);
    var k=q.get('s');
    if(k){await openSession(k);}else{renderMessages();}
    $('input').focus();
})();
</script>
</body></html>`;

async function handleChatPage(request, env) {
    const session = await getSession(request, env);
    if (!session) {
        return new Response(null, { status: 302, headers: { Location: '/' } });
    }
    return new Response(CHAT_HTML, { headers: HTML_HEADERS });
}

async function listChatSessions(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare(
            "SELECT session_key, title, size_bytes, updated_at FROM mcp_sessions WHERE session_key LIKE 'chat:%' ORDER BY updated_at DESC LIMIT 100"
        ).all();
        return apiJson({ sessions: rows.results || [] });
    } catch (err) { return internalError(err); }
}

async function createChatSession(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const mcpOn = await getSetting(env.DB, 'mcp_enabled');
        if (mcpOn !== '1') return apiJson({ error: 'MCP is disabled. Enable it in the MCP tab first.' }, 400);
        const body = await request.json().catch(() => ({}));
        const key = 'chat:' + crypto.randomUUID().slice(0, 8);
        const title = String(body.title || 'New chat').slice(0, 60);
        await env.DB.prepare(
            "INSERT INTO mcp_sessions (session_key, messages_json, size_bytes, title) VALUES (?, '[]', 2, ?)"
        ).bind(key, title).run();
        return apiJson({ success: true, sessionKey: key, title });
    } catch (err) { return internalError(err); }
}

async function getChatSession(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const key = decodeURIComponent(url.pathname.split('/')[4]);
        if (!key || !key.startsWith('chat:')) return apiJson({ error: 'Invalid session key.' }, 400);
        await initializeDatabase(env.DB);
        const row = await env.DB.prepare(
            "SELECT session_key, title, messages_json, updated_at FROM mcp_sessions WHERE session_key = ?"
        ).bind(key).first();
        if (!row) return apiJson({ error: 'Session not found.' }, 404);
        let messages = [];
        try { messages = JSON.parse(row.messages_json || '[]'); } catch (e) {}
        return apiJson({ sessionKey: key, title: row.title || 'New chat', messages, updated_at: row.updated_at });
    } catch (err) { return internalError(err); }
}

async function deleteChatSession(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const key = decodeURIComponent(url.pathname.split('/')[4]);
        if (!key || !key.startsWith('chat:')) return apiJson({ error: 'Invalid session key.' }, 400);
        await initializeDatabase(env.DB);
        await env.DB.prepare("DELETE FROM mcp_sessions WHERE session_key = ?").bind(key).run();
        return apiJson({ success: true });
    } catch (err) { return internalError(err); }
}

async function sendChatMessage(request, env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const keyIn = decodeURIComponent(url.pathname.split('/')[4]);
        const body = await request.json().catch(() => null);
        if (!body || typeof body !== 'object') return apiJson({ error: 'Invalid body.' }, 400);
        const message = String(body.message || '').trim();
        if (!message) return apiJson({ error: 'Message is required.' }, 400);
        if (message.length > 8000) return apiJson({ error: 'Message too long (max 8000 chars).' }, 400);

        await initializeDatabase(env.DB);
        const mcpOn = await getSetting(env.DB, 'mcp_enabled');
        if (mcpOn !== '1') return apiJson({ error: 'MCP is disabled. Enable it in the MCP tab first.' }, 400);

        let key = keyIn;
        let isNew = false;
        if (key === 'new') {
            key = 'chat:' + crypto.randomUUID().slice(0, 8);
            isNew = true;
            const firstTitle = message.replace(/\s+/g, ' ').trim().slice(0, 60) || 'New chat';
            await env.DB.prepare(
                "INSERT INTO mcp_sessions (session_key, messages_json, size_bytes, title) VALUES (?, '[]', 2, ?)"
            ).bind(key, firstTitle).run();
        } else if (!key.startsWith('chat:')) {
            return apiJson({ error: 'Invalid session key.' }, 400);
        }

        const existing = await env.DB.prepare('SELECT title FROM mcp_sessions WHERE session_key = ?').bind(key).first();
        if (!existing) return apiJson({ error: 'Session not found.' }, 404);

        const settings = await getMcpSettingsFromDb(env);
        const aiSettings = await resolveMcpAiSettings(env, settings);
        let categories = ['read', 'write'];
        try {
            const parsed = JSON.parse(settings.mcp_categories || '[]');
            if (Array.isArray(parsed)) categories = parsed.filter(c => MCP_CATEGORY_KEYS.includes(c));
        } catch (e) { /* keep default */ }

        const tools = getMcpToolDefinitions(categories);
        const history = await loadMcpSession(env.DB, key);

        const result = await runAgentLoop({
            env,
            sessionKey: key,
            persistSession: true,
            forceKeep: 50,
            providerSettings: aiSettings,
            systemPrompt: MCP_SYSTEM_PROMPT,
            history,
            userText: message,
            tools,
            maxIter: 8,
            categories,
        });

        // Update title if still "New chat"
        if (!isNew && (!existing.title || existing.title === 'New chat')) {
            const newTitle = message.replace(/\s+/g, ' ').trim().slice(0, 60) || 'New chat';
            await env.DB.prepare('UPDATE mcp_sessions SET title = ? WHERE session_key = ?').bind(newTitle, key).run();
        }

        return apiJson({
            success: true,
            sessionKey: key,
            response: result.finalMessage,
            toolCalls: result.toolCalls,
            iterations: result.iterations,
        });
    } catch (err) {
    return apiJson({ success: false, error: String(err.message || err) }, 500);
    }
}

// ============================================================================
// TELEGRAM ENGINE
// ============================================================================
const botUsernameCache = { username: null, fetchedAt: 0 };
const BOT_USERNAME_TTL_MS = 60 * 60 * 1000;
async function getBotUsername(env, BOT_TOKEN) {
    const now = Date.now();
    if (botUsernameCache.username && (now - botUsernameCache.fetchedAt) < BOT_USERNAME_TTL_MS) return botUsernameCache.username;
    const stored = await getSetting(env.DB, 'bot_username');
    if (stored) { botUsernameCache.username = stored; botUsernameCache.fetchedAt = now; return stored; }
    try {
        const info = await tgFetchJson(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
        if (info && info.ok && info.result && info.result.username) { botUsernameCache.username = info.result.username; botUsernameCache.fetchedAt = now; return botUsernameCache.username; }
    } catch (e) {}
    return '';
}
const TG_API_BASE = 'https://api.telegram.org';
const TG_TIMEOUT_MS = 10000;
const TG_BENIGN_ERROR_CODES = new Set([400, 403, 429]);
async function tgCall(token, method, payload, opts = {}) {
    const body = payload === undefined ? undefined : JSON.stringify(payload);
    const maxAttempts = opts.retry === false ? 1 : 2;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs || TG_TIMEOUT_MS);
        try {
            const res = await fetch(`${TG_API_BASE}/bot${token}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, signal: ctrl.signal });
            const data = await res.json().catch(() => null);
            if (data && data.ok === true) return data;
            const description = (data && (data.description || data.error_code)) || `HTTP ${res.status}`;
            if (TG_BENIGN_ERROR_CODES.has(res.status)) console.log(`Telegram ${method}: ${description}`);
            else console.error(`Telegram ${method}: ${description}`);
            const retryAfter = data && data.parameters && data.parameters.retry_after ? parseInt(data.parameters.retry_after, 10) || 1 : (res.status === 429 ? 1 : 0);
            if (attempt < maxAttempts && retryAfter > 0) { await new Promise(r => setTimeout(r, Math.min(retryAfter, 3) * 1000)); continue; }
            return data;
        } catch (err) {
            console.error(`Telegram ${method} request failed: ${err.message}`);
            if (attempt < maxAttempts) { await new Promise(r => setTimeout(r, 500)); continue; }
            return null;
        } finally { clearTimeout(timer); }
    }
    return null;
}
async function sendRichText(token, chatId, text, extra = {}) {
    if (!text) return null;
    const payload = Object.assign({ chat_id: chatId, text, parse_mode: 'HTML' }, extra);
    const data = await tgCall(token, 'sendMessage', payload);
    if (data && data.ok) return data;
    if (isHtmlParseError(data)) {
        const desc = String((data && data.description) || '');
        const fallbackText = /unsupported start tag|unclosed tag/i.test(desc) ? htmlToPlain(text) : htmlToLiteral(text);
        return tgCall(token, 'sendMessage', Object.assign({ chat_id: chatId, text: fallbackText, parse_mode: 'HTML' }, extra));
    }
    return data;
}
function stripTagsForPreview(text) { return String(text || '').replace(/<[^>]*>/g, ''); }
const TG_MESSAGE_LIMIT = 4096;
function splitTelegramMessage(text, limit = TG_MESSAGE_LIMIT) {
    if (!text) return [];
    if (text.length <= limit) return [text];
    const chunks = [];
    let rest = text;
    while (rest.length > limit) {
        let cut = rest.lastIndexOf('\n\n', limit);
        if (cut < limit * 0.3) cut = rest.lastIndexOf('\n', limit);
        if (cut < limit * 0.3) cut = rest.lastIndexOf(' ', limit);
        if (cut <= 0) cut = limit;
        chunks.push(rest.slice(0, cut));
        rest = rest.slice(cut).replace(/^\n+/, '');
    }
    if (rest) chunks.push(rest);
    return chunks;
}
const TELEGRAM_HTML_TAGS = new Set(['b','strong','i','em','u','ins','s','strike','del','code','pre','blockquote','tg-spoiler','a']);
const HTML_TAG_RE = /<(\/?)([a-zA-Z-]+)((?:\s+[^>]*)?)>/g;
function splitEscapedHtml(html, limit = TG_MESSAGE_LIMIT) {
    if (!html) return [];
    if (html.length <= limit) return [html];
    const effectiveLimit = Math.max(256, limit - 80);
    const chunks = [];
    let rest = html;
    while (rest.length > effectiveLimit) {
        let cut = rest.lastIndexOf('\n\n', effectiveLimit);
        if (cut < effectiveLimit * 0.3) cut = rest.lastIndexOf('\n', effectiveLimit);
        if (cut < effectiveLimit * 0.3) cut = rest.lastIndexOf(' ', effectiveLimit);
        if (cut <= 0) cut = effectiveLimit;
        let chunk = rest.slice(0, cut);
        rest = rest.slice(cut).replace(/^\s+/, '');
        const stack = [];
        let m;
        HTML_TAG_RE.lastIndex = 0;
        while ((m = HTML_TAG_RE.exec(chunk))) {
            const closing = m[1] === '/';
            const tag = m[2].toLowerCase();
            if (!TELEGRAM_HTML_TAGS.has(tag)) continue;
            if (closing) { for (let i = stack.length - 1; i >= 0; i--) if (stack[i].tag === tag) { stack.splice(i, 1); break; } }
            else stack.push({ tag, attrs: m[3] || '' });
        }
        for (let i = stack.length - 1; i >= 0; i--) chunk += '</' + stack[i].tag + '>';
        chunks.push(chunk);
        if (stack.length) { let prefix = ''; for (const t of stack) prefix += '<' + t.tag + t.attrs + '>'; rest = prefix + rest; }
    }
    if (rest) chunks.push(rest);
    return chunks;
}
async function sendMessage(chatId, text, BOT_TOKEN, parseMode) {
    if (!text) return null;
    let last = null;
    if (parseMode === 'HTML') {
        const escaped = escapeTelegramHTML(text);
        const chunks = splitEscapedHtml(escaped);
        for (const chunk of chunks) {
            const data = await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: chunk, parse_mode: 'HTML' });
            if ((!data || !data.ok) && isHtmlParseError(data)) last = await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: htmlToPlain(chunk) });
            else last = data;
        }
        return last;
    }
    const chunks = splitTelegramMessage(text);
    for (const chunk of chunks) last = await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: chunk });
    return last;
}
const BOT_STRINGS = {
    en: {
        not_found: 'Command not found. Use /start to see available options.',
        unauthorized: '⚠️ You are not authorised to use this command.',
        back: 'Back',
        rate_limited: '⏳ Too many requests. Please wait a moment.',
        rate_limited_global: '🌍 The bot is busy right now. Please try again shortly.',
        welcome: (botName) => `👋 Welcome to <b>${botName}</b>!\n\nThis bot is powered by <a href="https://github.com/Mahan07dev/Nyxx">Nyxx</a>, an open-source Telegram bot builder for Cloudflare Workers.\n\nMade with ❤️ by <b>@Mahan07dev</b>`
    }
};
function botStrings() { return BOT_STRINGS.en; }
function isBackWord(text) { return (text || '').trim().toLowerCase() === 'back'; }
function aiEnabledFor(chatType) { return chatType === 'private' || chatType === 'group' || chatType === 'supergroup'; }
async function handleTelegramWebhook(request, env, ctx) {
    if (!env.DB) return new Response('DB not available', { status: 500 });
    const runWithAck = (p) => {
        if (ctx && typeof ctx.waitUntil === 'function') {
            ctx.waitUntil(p.catch(err => console.error('Background update failed:', err)));
            return new Response('OK', { status: 200 });
        }
        return p.then(() => new Response('OK', { status: 200 })).catch(err => { console.error('Update failed:', err); return new Response('OK', { status: 200 }); });
    };
    try {
        await initializeDatabase(env.DB);
        const secret = await getSetting(env.DB, 'webhook_secret');
        if (secret) {
            const header = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
            if (!header || !timingSafeEqual(header, secret)) return new Response('OK', { status: 200 });
        }
    } catch (e) { return new Response('Internal error', { status: 500 }); }
    let update;
    try { update = await request.json(); } catch (e) { return new Response('OK', { status: 200 }); }
    if (update && typeof update === 'object' && update.update_id !== undefined) {
        if (wasUpdateSeen(update.update_id)) return new Response('OK', { status: 200 });
        markUpdateSeen(update.update_id);
    }
    return runWithAck(processTelegramUpdate(update, env));
}
const seenUpdateIds = new Map();
const UPDATE_DEDUP_TTL_MS = 10 * 60 * 1000;
function wasUpdateSeen(id) {
    const now = Date.now();
    if (seenUpdateIds.size > 500) for (const [k, ts] of seenUpdateIds) if (now - ts > UPDATE_DEDUP_TTL_MS) seenUpdateIds.delete(k);
    const ts = seenUpdateIds.get(id);
    return ts !== undefined && (now - ts) < UPDATE_DEDUP_TTL_MS;
}
function markUpdateSeen(id) { seenUpdateIds.set(id, Date.now()); }
async function processTelegramUpdate(update, env) {
    const BOT_TOKEN = await getSetting(env.DB, 'bot_token');
    if (!BOT_TOKEN) return;
    const upsertUser = async (from, opts) => {
        if (!from || !from.id) return;
        const privateStarted = opts && opts.privateStarted ? 1 : 0;
        const groupId = opts && opts.groupId ? opts.groupId : null;
        await env.DB.prepare(`
            INSERT INTO users (id, username, first_name, private_started, last_group_id) VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                username = excluded.username, first_name = excluded.first_name,
                last_active = CURRENT_TIMESTAMP,
                private_started = MAX(COALESCE(users.private_started, 0), excluded.private_started),
                last_group_id = COALESCE(excluded.last_group_id, users.last_group_id)
        `).bind(from.id, from.username || '', from.first_name || '', privateStarted, groupId).run();
    };
    try {
        if (update.my_chat_member) {
            const m = update.my_chat_member;
            const chat = m.chat;
            if (chat && (chat.type === 'group' || chat.type === 'supergroup')) {
                const status = m.new_chat_member && m.new_chat_member.status;
                const active = status === 'member' || status === 'administrator';
                await initializeDatabase(env.DB);
                await upsertGroup(env.DB, chat, active);
            }
            return;
        }
        if (update.message && update.message.chat) {
            const msg = update.message;
            const chatId = msg.chat.id;
            const isGroup = msg.chat.type === 'group' || msg.chat.type === 'supergroup';
            const isPrivate = msg.chat.type === 'private';
            let groupSettings = null;
            if (isGroup) {
                await initializeDatabase(env.DB);
                await upsertGroup(env.DB, msg.chat, true);
                groupSettings = await getGroupSettings(env.DB, chatId);
            }
            if (msg.new_chat_members && isGroup) {
                if (groupSettings && groupSettings.welcome_enabled && groupSettings.welcome_text) {
                    for (const member of msg.new_chat_members) {
                        if (member.is_bot) continue;
                        const text = replacePlaceholders(groupSettings.welcome_text, { user_first_name: member.first_name || '', user_username: member.username || '', chat_id: String(chatId), title: msg.chat.title || '' });
                        await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: escapeTelegramHTML(text), parse_mode: 'HTML' });
                    }
                }
                if (groupSettings && groupSettings.auto_delete_service) await tgCall(BOT_TOKEN, 'deleteMessage', { chat_id: chatId, message_id: msg.message_id });
                return;
            }
            if (isGroup && (msg.left_chat_member || msg.new_chat_title || msg.new_chat_photo || msg.pinned_message)) {
                if (groupSettings && groupSettings.auto_delete_service) await tgCall(BOT_TOKEN, 'deleteMessage', { chat_id: chatId, message_id: msg.message_id });
                return;
            }
            if (isGroup && msg.from && !msg.from.is_bot) {
                if (groupSettings && groupSettings.link_filter && msg.text && /https?:\/\/|t\.me\//i.test(msg.text)) {
                    const role = await env.DB.prepare('SELECT role FROM users WHERE id = ?').bind(msg.from.id).first();
                    if (!role || role.role !== 'admin') { await tgCall(BOT_TOKEN, 'deleteMessage', { chat_id: chatId, message_id: msg.message_id }); return; }
                }
                if (groupSettings && groupSettings.anti_flood) {
                    const minute = Math.floor(Date.now() / 60000);
                    await env.DB.prepare('INSERT INTO group_flood (chat_id, user_id, minute, count) VALUES (?, ?, ?, 1) ON CONFLICT(chat_id, user_id, minute) DO UPDATE SET count = count + 1').bind(chatId, msg.from.id, minute).run();
                    const row = await env.DB.prepare('SELECT count FROM group_flood WHERE chat_id = ? AND user_id = ? AND minute = ?').bind(chatId, msg.from.id, minute).first();
                    if (row && row.count > (groupSettings.flood_limit || 6)) {
                        const role = await env.DB.prepare('SELECT role FROM users WHERE id = ?').bind(msg.from.id).first();
                        if (!role || role.role !== 'admin') {
                            await tgCall(BOT_TOKEN, 'deleteMessage', { chat_id: chatId, message_id: msg.message_id });
                            if (row.count === (groupSettings.flood_limit || 6) + 1) await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: '⚠️ Please slow down.' });
                            return;
                        }
                    }
                }
                if (msg.text && msg.text.split('@')[0].trim() === '/rules' && groupSettings && groupSettings.rules_text) {
                    if (!await checkPermission(env, msg.from.id, 'rules_command')) {
                        await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: escapeTelegramHTML(botStrings().unauthorized), parse_mode: 'HTML' });
                        return;
                    }
                    await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: escapeTelegramHTML(groupSettings.rules_text), parse_mode: 'HTML' });
                    return;
                }
            }
            if (msg.text && msg.from) {
                const text = String(msg.text || '').trim();
                const userId = msg.from.id;
                if (msg.from.is_bot) return;
                const trackMembers = groupSettings ? !!groupSettings.track_members : false;
                const shouldTrack = isPrivate || trackMembers;
                if (shouldTrack) await upsertUser(msg.from, { privateStarted: isPrivate, groupId: isGroup ? chatId : null });
                else if (isGroup) {
                    const existing = await env.DB.prepare('SELECT id FROM users WHERE id = ?').bind(userId).first();
                    if (existing) await env.DB.prepare('UPDATE users SET last_active = CURRENT_TIMESTAMP, last_group_id = ? WHERE id = ?').bind(chatId, userId).run();
                }
                const blockType = await isUserBlocked(env, userId);
                if (blockType === 'full') return;

                // Featured command match — must run BEFORE the AI / DM decision,
                // because DM commands explicitly write into dm_messages and never
                // reach the AI, and Buttons commands never write anywhere except
                // (optionally) dm_messages on a button tap.
                if (text.startsWith('/')) {
                    const firstSpace = text.indexOf(' ');
                    const cmdPart = firstSpace >= 0 ? text.slice(0, firstSpace) : text;
                    const args = firstSpace >= 0 ? text.slice(firstSpace + 1) : '';
                    const bare = cmdPart.split('@')[0].trim();
                    if (bare) {
                        const feat = await env.DB.prepare('SELECT * FROM featured_replies WHERE command = ? AND enabled = 1').bind(bare).first();
                        if (feat) {
                            const argsTrimmed = args.trim();
                            // Always delete the user's trigger message so the chat stays clean.
                            await tgCall(BOT_TOKEN, 'deleteMessage', { chat_id: chatId, message_id: msg.message_id });

                            // Global permission: featured commands
                            if (!await checkPermission(env, userId, 'featured_commands')) {
                                await sendMessage(chatId, botStrings().unauthorized, BOT_TOKEN, 'HTML');
                                return;
                            }
                            // Global permission: /mcp featured commands
                            if (feat.kind === 'mcp' && !await checkPermission(env, userId, 'mcp_telegram')) {
                                await sendMessage(chatId, botStrings().unauthorized, BOT_TOKEN, 'HTML');
                                return;
                            }

                            // --- Admin-only guard (per-command, applies to all kinds) ---
                            if (feat.admin_only) {
                                const u = await env.DB.prepare('SELECT role FROM users WHERE id = ?').bind(userId).first();
                                if (!u || u.role !== 'admin') {
                                    await sendMessage(chatId, botStrings().unauthorized, BOT_TOKEN, 'HTML');
                                    return;
                                }
                            }

                            // --- MCP kind ---
                            if (feat.kind === 'mcp') {
                                const mcpOn = await getSetting(env.DB, 'mcp_enabled');
                                if (mcpOn !== '1') {
                                    await sendRichText(BOT_TOKEN, chatId, '⚠️ MCP is not enabled. Turn it on in the dashboard (System → MCP).');
                                    return;
                                }
                                if (!argsTrimmed) {
                                    if (feat.content) await sendRichText(BOT_TOKEN, chatId, feat.content);
                                    else await sendRichText(BOT_TOKEN, chatId, 'Usage: <code>/mcp your question or instruction</code>');
                                    return;
                                }
                                // Show typing while the agent runs.
                                await tgCall(BOT_TOKEN, 'sendChatAction', { chat_id: chatId, action: 'typing' });
                                try {
                                    const sessionKey = 'tg:' + chatId + ':' + userId;
                                    const result = await runMcpAgent(argsTrimmed, env, { sessionKey, maxIterations: 3 });
                                    if (result.rateLimited) {
                                        await sendMessage(chatId, formatAiReply(result.finalMessage), BOT_TOKEN, 'HTML');
                                        return;
                                    }
                                    const lines = [formatAiReply(result.finalMessage || '(no response)')];
                                    if (result.toolCalls && result.toolCalls.length) {
                                        lines.push('');
                                        lines.push('<i>Tools used:</i>');
                                        for (const tc of result.toolCalls) {
                                            const mark = tc.error ? '✗' : '✓';
                                            lines.push(`• ${mark} ${tc.name}`);
                                        }
                                    }
                                    const finalText = lines.join('\n');
                                    await sendMessage(chatId, finalText, BOT_TOKEN, 'HTML');
                                } catch (err) {
                                    await sendRichText(BOT_TOKEN, chatId, '⚠️ MCP error: ' + String(err.message || err).slice(0, 400));
                                }
                                return;
                            }

                            // --- Buttons kind (unchanged) ---
                            if (feat.kind === 'buttons') {
                                if (!argsTrimmed) {
                                    if (feat.content) await sendRichText(BOT_TOKEN, chatId, feat.content);
                                    return;
                                }
                                const parsed = parseButtonsCommandArgs(argsTrimmed);
                                if (!parsed.buttons.length) {
                                    const msgText = feat.failure_text || feat.content;
                                    if (msgText) await sendRichText(BOT_TOKEN, chatId, msgText);
                                    return;
                                }
                                try {
                                    const messageText = parsed.message || 'Here you go:';
                                    const inlineKb = await buildFeaturedInlineKeyboard(env.DB, parsed.buttons);
                                    const payload = { chat_id: chatId, text: escapeTelegramHTML(messageText), parse_mode: 'HTML' };
                                    if (inlineKb) payload.reply_markup = inlineKb;
                                    let resp = await tgCall(BOT_TOKEN, 'sendMessage', payload);
                                    if ((!resp || !resp.ok) && isHtmlParseError(resp)) {
                                        resp = await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: messageText, reply_markup: inlineKb });
                                    }
                                    if (!resp || !resp.ok) {
                                        if (feat.failure_text) await sendRichText(BOT_TOKEN, chatId, feat.failure_text);
                                        return;
                                    }
                                    if (isPrivate && resp.result) {
                                        await logDm(env.DB, userId, 'out', 'featured_button', 'text', messageText, null, resp.result.message_id, null);
                                    }
                                    if (feat.success_text) await sendRichText(BOT_TOKEN, chatId, feat.success_text);
                                } catch (err) {
                                    if (feat.failure_text) await sendRichText(BOT_TOKEN, chatId, feat.failure_text);
                                }
                                return;
                            }

                            // --- DM kind (unchanged) ---
                            if (!argsTrimmed) {
                                if (feat.content) await sendRichText(BOT_TOKEN, chatId, feat.content);
                                return;
                            }
                            try {
                                await logDm(env.DB, userId, 'in', 'featured', 'text', argsTrimmed, null, null, null);
                                if (feat.success_text) await sendRichText(BOT_TOKEN, chatId, feat.success_text);
                            } catch (err) {
                                if (feat.failure_text) await sendRichText(BOT_TOKEN, chatId, feat.failure_text);
                            }
                            return;
                        }
                    }
                }

                // Figure out the AI decision up front so we know whether we should
                // write the incoming message into dm_messages.
                const aiSettings = await getAiSettingsFromDb(env);
                let aiWillHandle = false;
                if (aiSettings.ai_enabled === '1') {
                    let shouldReply = true;
                    const trigger = aiSettings.ai_trigger || 'no_command';
                    if (trigger === 'contains_text') { const t = aiSettings.ai_trigger_text || ''; if (t && text.toLowerCase().indexOf(t.toLowerCase()) < 0) shouldReply = false; }
                    else if (trigger !== 'no_command' && trigger !== 'all_messages') shouldReply = false;
                    if (shouldReply) {
                        if (!aiEnabledFor(msg.chat.type)) shouldReply = false;
                        if (isPrivate && aiSettings.ai_private_reply === '0') shouldReply = false;
                        if (isGroup && aiSettings.ai_group_reply === '0') shouldReply = false;
                    }
                    if (shouldReply && isGroup && groupSettings) {
                        if (groupSettings.ai === 'off') shouldReply = false;
                        if (groupSettings.mention === '1') { const bu = await getBotUsername(env, BOT_TOKEN); if (!bu || text.indexOf('@' + bu) < 0) shouldReply = false; }
                        else if (groupSettings.mention === '0') {}
                        else if (aiSettings.ai_group_mention === '1') { const bu = await getBotUsername(env, BOT_TOKEN); if (!bu || text.indexOf('@' + bu) < 0) shouldReply = false; }
                    } else if (shouldReply && isGroup && aiSettings.ai_group_mention === '1') {
                        const bu = await getBotUsername(env, BOT_TOKEN); if (!bu || text.indexOf('@' + bu) < 0) shouldReply = false;
                    }
                    if (shouldReply && aiSettings.ai_ignore_bots === '1' && msg.from.is_bot) shouldReply = false;
                    if (shouldReply && aiSettings.ai_ignore_forwarded === '1' && msg.forward_date) shouldReply = false;
                    if (shouldReply && aiSettings.ai_ignore_prefixes) {
                        const prefixes = aiSettings.ai_ignore_prefixes.split(',').map(s => s.trim()).filter(Boolean);
                        if (prefixes.some(p => text.startsWith(p))) shouldReply = false;
                    }
                    if (shouldReply && blockType === 'ai_only') shouldReply = false;
                    aiWillHandle = shouldReply;
                }

                // If AI is enabled but the message won't reach it (rate-limit
                // aside — we don't know yet), still skip the DM write. The rule is
                // simply: AI enabled → text goes to AI's domain, not the DM log.
                const shouldLogToDm = isPrivate && aiSettings.ai_enabled !== '1';
                if (shouldLogToDm) {
                    await logDm(env.DB, userId, 'in', 'user', 'text', text, null, msg.message_id, null);
                }

                if (aiWillHandle) {
                    if (!await checkPermission(env, userId, 'ai_chat')) {
                        await sendMessage(chatId, botStrings().unauthorized, BOT_TOKEN, 'HTML');
                        return;
                    }
                    const effective = Object.assign({}, aiSettings);
                    if (isGroup && groupSettings) { if (groupSettings.memory !== 'inherit') effective.ai_group_memory = groupSettings.memory; }
                    await processAiReply(chatId, userId, text, effective, env, BOT_TOKEN, msg.chat.type);
                    return;
                }

                let targetCommand = null;
                if (text.startsWith('/')) {
                    const bare = text.split('@')[0].split('?')[0].split(' ')[0];
                    const cmdRecord = await env.DB.prepare('SELECT command FROM commands WHERE command = ? AND enabled = 1').bind(bare).first();
                    if (cmdRecord) targetCommand = cmdRecord.command;
                }
                if (!targetCommand && isBackWord(text)) {
                    const session = await env.DB.prepare("SELECT command FROM sessions WHERE user_id = ? AND token LIKE 'bot-%'").bind(userId).first();
                    if (session && session.command) {
                        const parentCmd = await env.DB.prepare('SELECT parent FROM commands WHERE command = ?').bind(session.command).first();
                        if (parentCmd && parentCmd.parent) targetCommand = parentCmd.parent;
                    }
                }
                if (!targetCommand && !text.startsWith('/')) {
                    const map = await getReplyButtonMap(env.DB);
                    if (map[text]) targetCommand = map[text];
                    else { const globalActions = await getReplyActions(env.DB); if (globalActions[text]) targetCommand = globalActions[text]; }
                }
                if (targetCommand) {
                    const cmdRecord = await env.DB.prepare('SELECT * FROM commands WHERE command = ? AND enabled = 1').bind(targetCommand).first();
                    if (cmdRecord) {
                        if (!await checkPermission(env, userId, 'commands')) {
                            await sendMessage(chatId, botStrings().unauthorized, BOT_TOKEN, 'HTML');
                            return;
                        }
                        await executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env, msg.chat.type);
                        return;
                    }
                }
                if (text === '/start') {
                    if (!await checkPermission(env, userId, 'start_command')) {
                        await sendMessage(chatId, botStrings().unauthorized, BOT_TOKEN, 'HTML');
                        return;
                    }
                    await sendDefaultStart(chatId, env, BOT_TOKEN);
                    return;
                }
                if (isPrivate) await sendMessage(chatId, botStrings().not_found, BOT_TOKEN, 'HTML');
                return;
            }
            if (!msg.text && isPrivate && msg.from && !msg.from.is_bot) {
                const blockType = await isUserBlocked(env, msg.from.id);
                if (blockType === 'full') return;
                await upsertUser(msg.from, { privateStarted: true });
                const aiSettings = await getAiSettingsFromDb(env);
                if (aiSettings.ai_enabled !== '1') {
                    await logDm(env.DB, msg.from.id, 'in', 'user', 'text', '[media]', null, msg.message_id, null);
                }
                await sendMessage(chatId, botStrings().not_found, BOT_TOKEN, 'HTML');
                return;
            }
            return;
        }
        if (update.callback_query && update.callback_query.message && update.callback_query.message.chat) {
            const cb = update.callback_query;
            const data = typeof cb.data === 'string' ? cb.data.trim() : '';
            const chatId = cb.message.chat.id;
            if (cb.from) await upsertUser(cb.from, { privateStarted: cb.message.chat.type === 'private' });
            const cbBlockType = cb.from ? await isUserBlocked(env, cb.from.id) : null;
            if (cbBlockType === 'full') { await tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id }); return; }
            if (cb.from && !await checkPermission(env, cb.from.id, 'callback_queries')) {
                await tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                return;
            }
            if (data && data.startsWith('/')) {
                if (data === '/start') {
                    const answer = tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                    await sendDefaultStart(chatId, env, BOT_TOKEN);
                    await answer;
                    return;
                }
                const cmdRecord = await env.DB.prepare('SELECT * FROM commands WHERE command = ? AND enabled = 1').bind(data).first();
                const answer = tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                if (cmdRecord) await executeCommand(chatId, cb.from.id, cmdRecord, BOT_TOKEN, env, cb.message.chat.type);
                await answer;
                return;
            } else if (data && data.startsWith('T:') && cbBlockType !== 'ai_only') {
                const textToSend = await decodeTextCallback(env.DB, data);
                const answer = tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                if (textToSend) {
                    const resp = await sendMessage(chatId, textToSend, BOT_TOKEN, 'HTML');
                    if (cb.message.chat.type === 'private' && resp && resp.result) {
                        await logDm(env.DB, chatId, 'out', 'featured_button', 'text', textToSend, null, resp.result.message_id, null);
                    }
                }
                await answer;
                return;
            } else if (data && cbBlockType !== 'ai_only') {
                const aiSettings = await getAiSettingsFromDb(env);
                const answer = tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                if (aiSettings.ai_enabled === '1' && aiEnabledFor(cb.message.chat.type)) {
                    if (!await checkPermission(env, cb.from.id, 'ai_chat')) {
                        await tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                        return;
                    }
                    await processAiReply(chatId, cb.from.id, data, aiSettings, env, BOT_TOKEN, cb.message.chat.type);
                } else {
                    await sendMessage(chatId, data, BOT_TOKEN, 'HTML');
                }
                await answer;
                return;
            }
            return;
        }
    } catch (err) { console.error('Webhook error:', err); }
}
const botNameCache = { name: null, fetchedAt: 0 };
const BOT_NAME_TTL_MS = 10 * 60 * 1000;
async function sendDefaultStart(chatId, env, BOT_TOKEN) {
    let botName = 'Nyxx Bot';
    try {
        const stored = await getSetting(env.DB, 'bot_name');
        if (stored) botName = stored;
        else if (botNameCache.name && (Date.now() - botNameCache.fetchedAt) < BOT_NAME_TTL_MS) botName = botNameCache.name;
        else {
            const nameRes = await tgFetchJson(`https://api.telegram.org/bot${BOT_TOKEN}/getMyName`);
            if (nameRes.ok && nameRes.result.name) { botName = nameRes.result.name; botNameCache.name = botName; botNameCache.fetchedAt = Date.now(); }
        }
    } catch (e) {}
    let dashboardUrl = 'https://dash.cloudflare.com';
    try { const webhookSetting = await getSetting(env.DB, 'webhook_url'); if (webhookSetting) dashboardUrl = webhookSetting.replace(/\/webhook$/, ''); } catch (e) {}
    const keyboard = { inline_keyboard: [[{ text: '🔗 GitHub', url: 'https://github.com/Mahan07dev' }, { text: '📊 Dashboard', url: dashboardUrl }]] };
    await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: botStrings().welcome(botName), parse_mode: 'HTML', reply_markup: keyboard });
}
async function executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env, chatType) {
    const strings = botStrings();
    await env.DB.prepare(`
        INSERT INTO sessions (token, user_id, command, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id) DO UPDATE SET token = excluded.token, command = excluded.command, updated_at = CURRENT_TIMESTAMP
    `).bind('bot-' + userId, userId, cmdRecord.command).run();
    if (cmdRecord.is_admin_only) {
        const user = await env.DB.prepare('SELECT role FROM users WHERE id = ?').bind(userId).first();
        if (!user || user.role !== 'admin') { await sendMessage(chatId, strings.unauthorized, BOT_TOKEN, 'HTML'); return; }
    }
    const built = cmdRecord.buttons_json ? buildReplyMarkup(cmdRecord.buttons_json) : null;
    const inlineMarkup = built && built.inlineMarkup ? built.inlineMarkup : null;
    let replySpec = (cmdRecord.show_reply_keyboard && cmdRecord.reply_keyboard_json) ? kbNormalizeReply(cmdRecord.reply_keyboard_json) : null;
    if (replySpec && cmdRecord.parent) {
        const hasBack = replySpec.rows.some(row => row.some(b => b.text === strings.back));
        if (!hasBack) replySpec.rows.push([{ text: strings.back, command: '' }]);
    }
    const replyKeyboardMarkup = replySpec ? kbReplyMarkup(replySpec) : null;
    if (replySpec && replySpec.actions && Object.keys(replySpec.actions).length) await mergeReplyActions(env.DB, replySpec.actions);
    const markup = inlineMarkup || replyKeyboardMarkup || undefined;
    if (cmdRecord.response_type === 'photo') {
        const photoPayload = { chat_id: chatId, photo: cmdRecord.media_url };
        if (cmdRecord.content) { photoPayload.caption = cmdRecord.content; photoPayload.parse_mode = 'HTML'; }
        if (markup) photoPayload.reply_markup = markup;
        let res = null;
        if (cmdRecord.media_url) {
            res = await tgCall(BOT_TOKEN, 'sendPhoto', photoPayload);
            if (res && !res.ok && cmdRecord.content && isHtmlParseError(res)) res = await tgCall(BOT_TOKEN, 'sendPhoto', Object.assign({}, photoPayload, { caption: htmlToPlain(cmdRecord.content) }));
        }
        if ((!res || !res.ok) && cmdRecord.content) await sendRichText(BOT_TOKEN, chatId, cmdRecord.content, markup ? { reply_markup: markup } : {});
        if (inlineMarkup && replyKeyboardMarkup) await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: ' ', reply_markup: replyKeyboardMarkup });
        return;
    }
    const extra = {};
    if (markup) extra.reply_markup = markup;
    if (cmdRecord.content) await sendRichText(BOT_TOKEN, chatId, cmdRecord.content, extra);
    else if (extra.reply_markup) await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: ' ', reply_markup: extra.reply_markup });
    if (inlineMarkup && replyKeyboardMarkup) await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: ' ', reply_markup: replyKeyboardMarkup });
}
async function getAiHistory(db, chatId, limit) {
    if (!limit || limit <= 0) return [];
    const result = await db.prepare('SELECT role, content FROM ai_messages WHERE chat_id = ? ORDER BY id DESC LIMIT ?').bind(chatId, limit).all();
    return (result.results || []).reverse();
}
async function saveAiMessage(db, chatId, role, content) { await db.prepare('INSERT INTO ai_messages (chat_id, role, content) VALUES (?, ?, ?)').bind(chatId, role, content).run(); }
async function trimAiMessages(db, chatId, keep) {
    if (!keep || keep <= 0) return;
    const row = await db.prepare('SELECT id FROM ai_messages WHERE chat_id = ? ORDER BY id DESC LIMIT 1 OFFSET ?').bind(chatId, keep * 2).first();
    if (row) await db.prepare('DELETE FROM ai_messages WHERE chat_id = ? AND id <= ?').bind(chatId, row.id).run();
}
// Local, zero-API-call intent detector for "auto" prompt mode.
//   strong → bot-management entity + action (or a pending confirmation)
//   weak   → bot-management entity only (let the model decide natively)
//   none   → plain chat, tools are not attached at all
const TOOL_ENTITY_RE = /\b(users?|members?|subscribers?|commands?|groups?|chats?|channels?|stats?|statistics|analytics|broadcasts?|menu|buttons?|keyboard|webhook|settings?|config(?:uration)?|bot|memory|logs?|bans?|unban|block(?:ed)?|admins?|welcome|database|ai)\b|کاربر|ممبر|عضو|دستور|کامند|گروه|آمار|همگانی|منو|دکمه|وب.?هوک|تنظیمات|ربات|بات|حافظه|مسدود|بن\b|ادمین|لاگ|خوشامد|هوش مصنوعی/i;
const TOOL_ACTION_RE = /\b(list|show|get|give|fetch|count|how many|who|what(?:'s| is| are)|check|view|find|search|create|add|make|new|delete|remove|clear|reset|update|change|edit|set|rename|enable|disable|turn (?:on|off)|send|dm|message|test|ban|unban|block)\b|نشان|نمایش|لیست|بده|بگو|چند|چقدر|کیست|بساز|ایجاد|اضافه|حذف|پاک|تغییر|ویرایش|آپدیت|بروز|تنظیم|فعال|غیرفعال|ارسال|بفرست|تست|بررسی|چک/i;
const TOOL_CONFIRM_PROMPT_RE = /\b(confirm|are you sure|proceed|go ahead|irreversible)\b|مطمئن|تایید|تأیید/i;
function detectToolIntent(userText, history) {
    const t = String(userText || '').trim().slice(0, 1000);
    if (!t) return 'none';
    // Short reply to a pending confirmation ("yes", "do it", "بله") must stay on the tool path.
    const lastAssistant = [...(history || [])].reverse().find(h => h.role === 'assistant');
    if (lastAssistant && t.length <= 40 && TOOL_CONFIRM_PROMPT_RE.test(String(lastAssistant.content || '').slice(-400))) return 'strong';
    const entity = TOOL_ENTITY_RE.test(t);
    if (!entity) return 'none';
    return TOOL_ACTION_RE.test(t) ? 'strong' : 'weak';
}
async function resolveAiMcpCategories(aiSettings, env) {
    let mcpCats = ['read', 'write'];
    try {
        const dbMcp = await getMcpSettingsFromDb(env);
        const parsed = JSON.parse(dbMcp.mcp_categories || '[]');
        if (Array.isArray(parsed)) mcpCats = parsed.filter(c => MCP_CATEGORY_KEYS.includes(c));
    } catch (e) {}
    const restrict = String(aiSettings.ai_mcp_categories || '').trim();
    if (!restrict) return mcpCats;
    const wanted = restrict.split(',').map(s => s.trim()).filter(Boolean);
    return mcpCats.filter(c => wanted.includes(c));
}
async function processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN, chatType) {
    const strings = botStrings();
    let streamMsgId = null;
    try {
        if (aiSettings.ai_typing_indicator === '1') await tgCall(BOT_TOKEN, 'sendChatAction', { chat_id: chatId, action: 'typing' });
        const rateLimit = parseInt(aiSettings.ai_rate_limit) || 0;
        if (rateLimit > 0) {
            const minute = Math.floor(Date.now() / 60000);
            await env.DB.prepare('INSERT INTO ai_rate_limits (user_id, minute, count) VALUES (?, ?, 1) ON CONFLICT(user_id, minute) DO UPDATE SET count = count + 1').bind(userId, minute).run();
            const row = await env.DB.prepare('SELECT count FROM ai_rate_limits WHERE user_id = ? AND minute = ?').bind(userId, minute).first();
            if (row && row.count > rateLimit) { await sendMessage(chatId, strings.rate_limited, BOT_TOKEN, 'HTML'); return; }
        }
        const globalLimit = parseInt(aiSettings.ai_global_rate_limit) || 0;
        if (globalLimit > 0) {
            const minute = Math.floor(Date.now() / 60000);
            const isHour = aiSettings.ai_global_rate_window === 'hour';
            const windowMinute = isHour ? Math.floor(minute / 60) * 60 : minute;
            await env.DB.prepare('INSERT INTO ai_rate_limits (user_id, minute, count) VALUES (0, ?, 1) ON CONFLICT(user_id, minute) DO UPDATE SET count = count + 1').bind(minute).run();
            let used = 0;
            if (isHour) { const row = await env.DB.prepare('SELECT COALESCE(SUM(count), 0) as n FROM ai_rate_limits WHERE user_id = 0 AND minute >= ?').bind(windowMinute).first(); used = row ? row.n : 0; }
            else { const row = await env.DB.prepare('SELECT count FROM ai_rate_limits WHERE user_id = 0 AND minute = ?').bind(minute).first(); used = row ? row.count : 0; }
            if (used > globalLimit) { await sendMessage(chatId, strings.rate_limited_global, BOT_TOKEN, 'HTML'); return; }
        }
        const userRow = await env.DB.prepare('SELECT first_name, username FROM users WHERE id = ?').bind(userId).first();
        const cmds = await env.DB.prepare('SELECT command FROM commands WHERE enabled = 1').all();
        const ctx = {
            bot_name: aiSettings.ai_display_name || 'Nyxx Bot',
            user_first_name: userRow ? userRow.first_name : 'User',
            user_username: userRow ? userRow.username : '',
            chat_id: String(chatId),
            available_commands: (cmds.results || []).map(r => r.command).join(', '),
            custom_vars: parseCustomVars(aiSettings.ai_custom_vars_text)
        };
        const isGroup = chatType === 'group' || chatType === 'supergroup';
        const memoryLimit = parseInt(isGroup ? (aiSettings.ai_group_memory || '0') : (aiSettings.ai_memory || '0'));
        let history = [];
        if (memoryLimit > 0) history = await getAiHistory(env.DB, chatId, memoryLimit);

        const toolsOn = aiSettings.ai_use_mcp_tools === '1';
        const streaming = !toolsOn && aiSettings.ai_streaming === '1';
        let reply = null, mainError = null;
        let publishChain = Promise.resolve();
        let lastPreview = '';

        if (toolsOn) {
            const mcpLive = await getSetting(env.DB, 'mcp_enabled');
            const aiMcpAllowed = mcpLive === '1' && await checkPermission(env, userId, 'mcp_ai');
            const cats = aiMcpAllowed ? await resolveAiMcpCategories(aiSettings, env) : [];
            if (cats.length) {
                // ---- Decide how much prompt to send -------------------------
                //   full    → always full persona + KB + tools (current behaviour)
                //   minimal → always try the bare tool prompt first
                //   auto    → classifier decides; skip the tool block entirely
                //             when the message looks like plain chat
                const promptMode = aiSettings.ai_mcp_prompt_mode || 'auto';
                let useToolPath = true;
                let useMinimalPrompt = false;
                let useLeanPrompt = false;
                if (promptMode === 'full') {
                    useToolPath = true;
                    useMinimalPrompt = false;
                } else if (promptMode === 'minimal') {
                    useToolPath = true;
                    useMinimalPrompt = true;
                } else { // auto — local intent detection, no extra API call
                    const intent = detectToolIntent(text, history);
                    useToolPath = intent !== 'none';
                    useLeanPrompt = intent === 'strong';
                }

                if (useToolPath) {
                    const providerShape = {
                        mcp_ai_provider: aiSettings.ai_provider,
                        mcp_ai_api_key: aiSettings.ai_api_key,
                        mcp_ai_model: aiSettings.ai_model,
                        mcp_ai_base_url: aiSettings.ai_base_url,
                    };
                    const destructiveGuard =
                        '\n\nBefore calling any destructive tool (delete_user, clear_ai_memory), ' +
                        'ask the user for explicit confirmation and only set confirm=true after they clearly say yes.';
                    const sysPrompt = useMinimalPrompt
                        ? 'You are a tool router for a Telegram bot management system.\n\n' +
                          'If the user\'s request can be fully handled by calling one or more of the available tools, ' +
                          'call the appropriate tool(s) now. After the tools return, reply with a brief 1-3 sentence summary.\n\n' +
                          'If the request cannot be handled by any tool — greetings, chit-chat, general questions, or ' +
                          'anything outside bot management — reply with EXACTLY: <NO_TOOL>\n\n' +
                          'Never add persona, opinions, or knowledge beyond what the tools return.' +
                          destructiveGuard
                        : useLeanPrompt
                        ? buildAiSystemPrompt({ ...aiSettings, ai_knowledge_bases: '[]' }, ctx) +
                          '\n\nYou have admin tools for managing this bot. Call them when the request is an action or data lookup about the bot; otherwise answer normally.' +
                          destructiveGuard
                        : buildAiSystemPrompt(aiSettings, ctx) +
                          '\n\nYou have admin tools available. Call them only when the request needs bot data or an action.' +
                          destructiveGuard;

                    let usedTools = false;
                    try {
                        const result = await runAgentLoop({
                            env,
                            sessionKey: null,
                            persistSession: false,
                            providerSettings: providerShape,
                            systemPrompt: sysPrompt,
                            history: history.map(h => ({ role: h.role, content: h.content })),
                            userText: text,
                            tools: getMcpToolDefinitions(cats),
                            maxIter: 4,
                            categories: cats,
                        });
                        usedTools = !!(result.toolCalls && result.toolCalls.length);
                        // In minimal mode, if the model declined (<NO_TOOL>) we
                        // discard its reply and fall through to the normal AI
                        // call below (full persona + KB, no tools).
                        if ((useMinimalPrompt || useLeanPrompt) && !usedTools) reply = null;
                        else reply = result.finalMessage;
                    } catch (err) {
                        mainError = err.message;
                        console.error('AI MCP agent error:', err);
                        try { await logAction(env.DB, null, 'MCP AI (error): ' + String(err.message || err).slice(0, 300)); } catch (e) {}
                    }
                }
                // If useToolPath was false (auto + classifier said CHAT),
                // we fall through here and the normal callAiCompletion()
                // runs with the full prompt — exactly the "same as now" path.

                if (reply && String(reply).trim()) {
                    if (memoryLimit > 0) {
                        await saveAiMessage(env.DB, chatId, 'user', text);
                        await saveAiMessage(env.DB, chatId, 'assistant', reply);
                        await trimAiMessages(env.DB, chatId, memoryLimit);
                    }
                    reply = formatAiReply(reply);
                    if (aiSettings.ai_rtl_support === '1') reply = addRtlMarkToPersian(reply);
                    const delay = parseInt(aiSettings.ai_response_delay) || 0;
                    if (delay > 0) await new Promise(r => setTimeout(r, Math.min(delay, 5000)));
                    await sendMessage(chatId, reply, BOT_TOKEN, 'HTML');
                    if (aiSettings.ai_suggested_questions_enabled === '1') {
                        try {
                            const questions = JSON.parse(aiSettings.ai_suggested_questions || '[]');
                            if (Array.isArray(questions) && questions.length) {
                                const rows = [];
                                for (let i = 0; i < questions.length; i += 3) rows.push(questions.slice(i, i + 3).map(q => ({ text: q.label })));
                                await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: ' ', reply_markup: { keyboard: rows, resize_keyboard: true, one_time_keyboard: aiSettings.ai_suggested_one_time !== '0' } });
                            }
                        } catch (e) {}
                    }
                    return;
                }
            }
        }

        try {
            const onChunk = streaming ? (partial) => {
                const t = stripTagsForPreview(partial);
                if (!t || t === lastPreview) return;
                lastPreview = t;
                const bodyText = (t + ' ▌').slice(0, 4000);
                publishChain = publishChain.then(async () => {
                    if (streamMsgId === null) {
                        const data = await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: bodyText });
                        if (data && data.ok && data.result && data.result.message_id) streamMsgId = data.result.message_id;
                    } else await tgCall(BOT_TOKEN, 'editMessageText', { chat_id: chatId, message_id: streamMsgId, text: bodyText });
                }).catch(() => {});
            } : null;
            reply = await callAiCompletion(aiSettings, history, text, ctx, 'main', undefined, streaming, onChunk);
        } catch (err) {
            mainError = err.message;
            if (aiSettings.ai_retry_on_failure === '1') {
                try { reply = await callAiCompletion(aiSettings, history, text, ctx, 'main'); mainError = null; }
                catch (err2) { mainError = err2.message; }
            }
            if (mainError) {
                let altList = [];
                try { altList = JSON.parse(aiSettings.ai_alt_providers || '[]'); } catch (e) {}
                for (let i = 0; i < altList.length; i++) {
                    try { reply = await callAiCompletion(aiSettings, history, text, ctx, 'alt', i); mainError = null; break; }
                    catch (altErr) {}
                }
            }
            if (mainError) throw new Error(mainError);
        }
        if (!reply || !String(reply).trim()) throw new Error('The AI returned an empty reply.');
        const rawReply = reply;
        reply = formatAiReply(reply);
        if (!reply.trim()) throw new Error('The AI returned an empty reply.');
        if (aiSettings.ai_rtl_support === '1') reply = addRtlMarkToPersian(reply);
        const finalHtml = escapeTelegramHTML(reply || '');
        const finalChunks = splitEscapedHtml(finalHtml, 4000);
        let sentFinal = false;
        if (streamMsgId !== null) {
            await publishChain;
            const first = finalChunks.shift() || '';
            const edit = await tgCall(BOT_TOKEN, 'editMessageText', { chat_id: chatId, message_id: streamMsgId, text: first, parse_mode: 'HTML' });
            sentFinal = !!(edit && edit.ok);
            if (!sentFinal) { const plainEdit = await tgCall(BOT_TOKEN, 'editMessageText', { chat_id: chatId, message_id: streamMsgId, text: htmlToPlain(first) }); sentFinal = !!(plainEdit && plainEdit.ok); }
        }
        if (memoryLimit > 0 && reply) {
            await saveAiMessage(env.DB, chatId, 'user', text);
            await saveAiMessage(env.DB, chatId, 'assistant', rawReply);
            await trimAiMessages(env.DB, chatId, memoryLimit);
        }
        let lastSent = null;
        if (!sentFinal) {
            if (streamMsgId !== null) await tgCall(BOT_TOKEN, 'deleteMessage', { chat_id: chatId, message_id: streamMsgId });
            const delay = parseInt(aiSettings.ai_response_delay) || 0;
            if (delay > 0) await new Promise(r => setTimeout(r, Math.min(delay, 5000)));
            lastSent = await sendMessage(chatId, reply, BOT_TOKEN, 'HTML');
        } else if (finalChunks.length) {
            for (const extra of finalChunks) lastSent = await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: extra, parse_mode: 'HTML' });
        }
        if (aiSettings.ai_suggested_questions_enabled === '1') {
            try {
                const questions = JSON.parse(aiSettings.ai_suggested_questions || '[]');
                if (Array.isArray(questions) && questions.length) {
                    const rows = [];
                    for (let i = 0; i < questions.length; i += 3) rows.push(questions.slice(i, i + 3).map(q => ({ text: q.label })));
                    const oneTime = aiSettings.ai_suggested_one_time !== '0';
                    await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: ' ', reply_markup: { keyboard: rows, resize_keyboard: true, one_time_keyboard: oneTime } });
                }
            } catch (e) {}
        }
    } catch (err) {
        console.error('AI reply error:', err);
        try { await logAction(env.DB, null, 'AI reply (error): ' + String(err && err.message || err).slice(0, 300)); } catch (e) {}
        const fallback = aiSettings.ai_fallback || 'Sorry, I am currently unavailable. Please try again later.';
        try {
            if (streamMsgId !== null) await tgCall(BOT_TOKEN, 'deleteMessage', { chat_id: chatId, message_id: streamMsgId });
            await sendMessage(chatId, fallback, BOT_TOKEN, 'HTML');
        } catch (e) {}
    }
}