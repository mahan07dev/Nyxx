// ============================================================================
// NYXX
// Telegram bot builder + management dashboard for Cloudflare Workers + D1.
// ============================================================================
const VERSION = '3.2.0';

// ============================================================================
// EMBEDDED DASHBOARD (single page app — HTML + CSS + JS)
// ============================================================================
const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en" dir="ltr" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="robots" content="noindex, nofollow">
    <link rel="shortcut icon" href="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" type="image/x-icon">
    <title>Nyxx | Dashboard</title>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        /* ============ Design tokens ============ */
        :root {
            --bg: #0b1120;
            --bg-2: #0f1729;
            --surface: #131d36;
            --surface-2: #182440;
            --surface-3: #1f2d50;
            --border: #26345a;
            --border-strong: #3a4c7d;
            --text: #e8eefb;
            --text-2: #a7b4d3;
            --text-3: #64748b;
            --primary: #7c5cf0;
            --primary-2: #6a46e8;
            --primary-soft: rgba(124, 92, 240, 0.16);
            --accent: #38bdf8;
            --green: #34d399;
            --green-soft: rgba(52, 211, 153, 0.14);
            --red: #f87171;
            --red-soft: rgba(248, 113, 113, 0.14);
            --amber: #fbbf24;
            --amber-soft: rgba(251, 191, 36, 0.14);
            --radius: 14px;
            --radius-sm: 10px;
            --radius-xs: 8px;
            --shadow: 0 20px 45px -20px rgba(0, 0, 0, 0.6);
            --font: 'Vazirmatn', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
            --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
            margin: 0;
            background:
                radial-gradient(1100px 500px at 85% -10%, rgba(124, 92, 240, 0.13), transparent 60%),
                radial-gradient(900px 420px at -10% 0%, rgba(56, 189, 248, 0.09), transparent 55%),
                var(--bg);
            background-attachment: fixed;
            color: var(--text);
            font-family: var(--font);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            line-height: 1.55;
            -webkit-font-smoothing: antialiased;
        }
        a { color: var(--accent); text-decoration: none; }
        a:hover { text-decoration: underline; }
        code {
            font-family: var(--mono);
            background: var(--surface-2);
            padding: 0.1em 0.4em;
            border-radius: 5px;
            font-size: 0.9em;
            color: #b7a8ff;
        }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2c3a63; border-radius: 8px; border: 2px solid transparent; background-clip: content-box; }
        ::-webkit-scrollbar-thumb:hover { background: #3b4f82; background-clip: content-box; }
        *:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; border-radius: 4px; }
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        /* ============ Navbar ============ */
        .navbar {
            background: rgba(11, 17, 32, 0.85);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border);
            padding: 0.7rem 1.25rem;
            position: sticky;
            top: 0;
            z-index: 60;
        }
        .navbar-inner { display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; flex-wrap: wrap; max-width: 1240px; margin: 0 auto; }
        .navbar-left { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }
        .navbar-title {
            font-size: 1.3rem; font-weight: 800; margin: 0;
            display: flex; align-items: center; gap: 0.5rem; color: var(--text);
            letter-spacing: 0.2px;
        }
        #logo-header { height: 40px; width: auto; border-radius: 10px; }
        .navbar-ver {
            font-size: 0.7rem; font-weight: 600; color: var(--text-3);
            background: var(--surface-2); border: 1px solid var(--border);
            padding: 0.1rem 0.5rem; border-radius: 999px;
        }
        .navbar-right { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
        .status-items { display: flex; gap: 0.9rem; font-size: 0.8rem; color: var(--text-2); align-items: center; }
        .status-items .status-pill {
            display: inline-flex; align-items: center; gap: 0.35rem;
            background: var(--surface-2); border: 1px solid var(--border);
            padding: 0.25rem 0.7rem; border-radius: 999px; white-space: nowrap;
        }
        .status-items .status-pill .status-text { display: inline; }
        .status-pill.ok { color: var(--green); border-color: rgba(52, 211, 153, 0.35); }
        .status-pill.bot { color: var(--accent); border-color: rgba(56, 189, 248, 0.35); }
        .status-pill.warn { color: var(--amber); border-color: rgba(251, 191, 36, 0.35); }
        .status-pill.error { color: var(--red); border-color: rgba(248, 113, 113, 0.35); }
        .status-pill.error i { color: var(--red); }
        .icon-btn {
            background: var(--surface-2); border: 1px solid var(--border); color: var(--text-2);
            border-radius: 10px; width: 36px; height: 36px; cursor: pointer;
            display: inline-flex; align-items: center; justify-content: center;
            transition: all 0.18s; font-size: 0.95rem;
        }
        .icon-btn:hover { background: var(--surface-3); color: var(--text); border-color: var(--border-strong); }
        .icon-btn.danger { border-color: rgba(248, 113, 113, 0.4); color: var(--red); }
        .icon-btn.danger:hover { background: var(--red-soft); }
        .update-banner-btn {
            background: linear-gradient(135deg, var(--green), #0ea5e9);
            color: #06121a; border: none; border-radius: 999px;
            padding: 0.35rem 1rem; font-size: 0.8rem; font-weight: 700; cursor: pointer;
            display: inline-flex; align-items: center; gap: 0.45rem;
            transition: transform 0.18s, box-shadow 0.18s;
            box-shadow: 0 6px 18px -8px rgba(52, 211, 153, 0.7);
            animation: pulse-soft 2.4s ease-in-out infinite;
        }
        .update-banner-btn:hover { transform: translateY(-1px); }
        @keyframes pulse-soft { 0%, 100% { box-shadow: 0 6px 18px -8px rgba(52, 211, 153, 0.7); } 50% { box-shadow: 0 6px 26px -6px rgba(52, 211, 153, 0.95); } }
.dropdown-content {
            display: none; position: absolute; top: calc(100% + 6px); inset-inline-start: 0;
            background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
            min-width: 160px; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5); padding: 0.35rem; z-index: 70;
        }
        .dropdown-content.show { display: block; }
        .dropdown-content button {
            display: flex; align-items: center; gap: 0.5rem; width: 100%;
            background: none; border: none; color: var(--text-2); padding: 0.5rem 0.75rem;
            border-radius: 8px; cursor: pointer; font-size: 0.875rem; text-align: start;
        }
        .dropdown-content button:hover { background: var(--surface-2); color: var(--text); }
        .dropdown-content button.active { color: var(--accent); background: rgba(56, 189, 248, 0.08); }

        /* ============ Layout ============ */
        .main-container { flex: 1; min-width: 0; max-width: 1240px; margin: 0 auto; padding: 1.25rem 1.25rem 2.5rem; width: 100%; }
        .step { display: block; }
        .step-hidden { display: none !important; }
        .hidden { display: none !important; }

        /* ============ Buttons ============ */
        .btn {
            display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
            font-weight: 600; padding: 0.6rem 1.2rem; border-radius: 12px; border: 1px solid transparent;
            cursor: pointer; transition: all 0.18s; font-size: 0.9rem; min-height: 38px;
            font-family: var(--font); line-height: 1.2; white-space: nowrap;
        }
        .btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .btn-primary { background: linear-gradient(135deg, var(--primary), var(--primary-2)); color: #fff; box-shadow: 0 10px 24px -12px rgba(124, 92, 240, 0.8); }
        .btn-primary:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.08); }
        .btn-success { background: linear-gradient(135deg, #10b981, #059669); color: #fff; box-shadow: 0 10px 24px -12px rgba(16, 185, 129, 0.8); }
        .btn-success:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.08); }
        .btn-gray { background: var(--surface-2); color: var(--text); border-color: var(--border); }
        .btn-gray:hover:not(:disabled) { background: var(--surface-3); border-color: var(--border-strong); }
        .btn-danger { background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; box-shadow: 0 10px 24px -12px rgba(239, 68, 68, 0.8); }
        .btn-danger:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.08); }
        .btn-block { width: 100%; }
        .btn-sm { padding: 0.3rem 0.8rem; font-size: 0.8rem; border-radius: 9px; min-height: 30px; }
        .btn-icon { padding: 0.35rem 0.6rem; border-radius: 8px; font-size: 0.8rem; }

        /* ============ Forms ============ */
        .form-group { margin-bottom: 1.1rem; }
        .form-label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.35rem; color: var(--text); }
        .form-label .hint, .form-label .text-sm { font-weight: 400; color: var(--text-3); font-size: 0.75rem; display: inline-block; }
        .form-input, .form-textarea, select.form-input {
            background: var(--bg-2); border: 1px solid var(--border); border-radius: 10px;
            padding: 0.6rem 0.8rem; color: var(--text); width: 100%;
            font-family: var(--font); font-size: 0.9rem; transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input:focus, .form-textarea:focus {
            border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px var(--primary-soft);
        }
        .form-input[readonly] { opacity: 0.85; }
        .form-textarea { min-height: 80px; resize: vertical; line-height: 1.5; }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--text-3); }
        .field-hint { font-size: 0.72rem; color: var(--text-3); margin-top: 0.25rem; display: block; }
        .field-hint a { color: var(--accent); text-decoration: underline; }
        .input-with-btn { display: flex; gap: 0.5rem; align-items: stretch; flex-wrap: nowrap; }
        .input-with-btn .form-input { flex: 1; min-width: 0; }

        /* ============ Cards / Panels / Steps ============ */
        .card {
            background: linear-gradient(180deg, var(--surface), var(--bg-2));
            border: 1px solid var(--border); border-radius: 20px; padding: 2rem;
            box-shadow: var(--shadow); max-width: 520px; margin: 2.5rem auto;
        }
        .card-icon { font-size: 2.6rem; margin-bottom: 0.75rem; color: var(--primary); }
        .step-title { font-size: 1.45rem; font-weight: 800; margin: 0 0 0.75rem; }
        .step-sub { color: var(--text-2); font-size: 0.9rem; margin: 0 0 1.4rem; }
        .panel {
            background: linear-gradient(180deg, var(--surface), var(--bg-2));
            border: 1px solid var(--border); border-radius: 16px; padding: 1.4rem;
        }
        .panel-title { font-size: 1.15rem; font-weight: 700; margin: 0; display: flex; align-items: center; gap: 0.55rem; }
        .panel-title i { color: var(--primary); }
        .text-center { text-align: center; }
        .text-sm { font-size: 0.85rem; color: var(--text-2); }
        .text-danger { color: var(--red); }
        .mt-2 { margin-top: 0.5rem; }
        .mt-3 { margin-top: 0.9rem; }
        .mt-4 { margin-top: 1.5rem; }
        .flex { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
        .flex-col { display: flex; flex-direction: column; gap: 0.75rem; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .gap-1 { gap: 0.35rem; }
        .gap-2 { gap: 0.6rem; }
        .divider { border: none; border-top: 1px solid var(--border); margin: 1.1rem 0; }
        .log-error { color: var(--red); font-size: 0.85rem; }
        .log-success { color: var(--green); }
        .muted { color: var(--text-3); }

        /* ============ Tabs ============ */
        .tabs-header {
            display: flex; gap: 0.15rem; flex-wrap: nowrap;
            border-bottom: 1px solid var(--border);
            padding: 0 0.25rem; max-width: 100%;
            margin-bottom: 1.5rem; position: relative;
        }
        .tab-btn {
            padding: 0.65rem 0.85rem; border: none; border-bottom: 2px solid transparent;
            background: transparent; color: var(--text-2); cursor: pointer; font-weight: 600;
            font-size: 0.82rem; white-space: nowrap; transition: color 0.15s, border-color 0.15s;
            display: inline-flex; align-items: center; gap: 0.35rem; font-family: var(--font);
            flex-shrink: 0;
        }
        .tab-btn i { opacity: 0.85; font-size: 0.78rem; }
        .tab-btn:hover { color: var(--text); }
        .tab-btn.active { color: #fff; border-bottom-color: var(--primary); }
        .tab-btn.active i { color: var(--primary); }

        .tab-content { display: none; animation: fade-in 0.2s ease; }
        .tab-content.active { display: block; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        .hamburger {
            display: none; cursor: pointer; padding: 0.55rem 0.75rem; font-size: 1rem;
            color: var(--text); user-select: none; border: 1px solid var(--border);
            border-radius: 10px; background: var(--surface); align-items: center; gap: 0.5rem;
            margin-bottom: 1rem; width: fit-content;
        }
        .mobile-tabs {
            display: block; max-height: 0; overflow: hidden; opacity: 0;
            transition: max-height 0.3s ease, opacity 0.25s ease;
            background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 0;
        }
        .mobile-tabs.open { max-height: 460px; opacity: 1; padding: 0.5rem; margin-bottom: 1rem; }
        .mobile-tabs button {
            background: transparent; border: none; color: var(--text-2); padding: 0.6rem 0.75rem;
            text-align: start; border-radius: 8px; font-size: 0.9rem; width: 100%; cursor: pointer;
            display: flex; align-items: center; gap: 0.5rem; font-family: var(--font);
        }
        .mobile-tabs button:hover { background: var(--surface-2); }
        .mobile-tabs button.active { background: var(--primary-soft); color: #fff; }
        @media (max-width: 680px) {
            .tab-btn { padding: 0.6rem 0.65rem; font-size: 0.78rem; gap: 0.25rem; }
        }

        /* ============ Badges ============ */
        .badge {
            display: inline-flex; align-items: center; gap: 0.25rem;
            font-size: 0.68rem; font-weight: 600; padding: 0.05rem 0.6rem;
            border-radius: 999px; line-height: 1.4rem; white-space: nowrap;
        }
        .badge-admin { background: rgba(147, 197, 253, 0.15); color: #93c5fd; border: 1px solid rgba(147, 197, 253, 0.3); }
        .badge-enabled { background: var(--green-soft); color: var(--green); border: 1px solid rgba(52, 211, 153, 0.3); }
        .badge-disabled { background: var(--red-soft); color: var(--red); border: 1px solid rgba(248, 113, 113, 0.3); }
        .badge-reply { background: rgba(196, 181, 253, 0.12); color: #c4b5fd; border: 1px solid rgba(196, 181, 253, 0.3); }
        .badge-gray { background: var(--surface-2); color: var(--text-3); border: 1px solid var(--border); }
        .badge-type { background: rgba(56, 189, 248, 0.12); color: var(--accent); border: 1px solid rgba(56, 189, 248, 0.3); }

        /* ============ Tree / File manager ============ */
        .tree-row {
            display: flex; align-items: center; gap: 0.55rem; padding: 0.45rem 0.6rem;
            border-radius: 10px; transition: background 0.12s; border: 1px solid transparent;
            background: var(--surface); margin-bottom: 0.35rem;
            overflow: hidden; max-width: 100%;
        }
        .tree-row:hover { background: var(--surface-2); border-color: var(--border); }
        .tree-icon { width: 22px; text-align: center; flex-shrink: 0; }
        .tree-command-name { font-family: var(--mono); font-weight: 600; color: var(--accent); cursor: default; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .tree-command-name.folder { cursor: pointer; }
        .tree-command-name.folder:hover { text-decoration: underline; }
        .tree-actions { margin-inline-start: auto; display: flex; gap: 0.3rem; flex-shrink: 0; }
        .tree-actions button {
            background: transparent; border: none; color: var(--text-3); cursor: pointer;
            padding: 0.2rem 0.4rem; border-radius: 6px; font-size: 0.85rem; transition: all 0.12s;
        }
        .tree-actions button:hover { background: var(--surface-3); color: var(--text); }
        .tree-actions .edit-btn:hover { color: var(--accent); }
        .tree-actions .delete-btn:hover { color: var(--red); }
        .tree-actions .add-child-btn:hover { color: var(--green); }
        .tree-actions .up-btn:hover, .tree-actions .down-btn:hover { color: var(--amber); }
        .tree-actions .up-btn:disabled, .tree-actions .down-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .empty-state { padding: 1.4rem; text-align: center; color: var(--text-3); font-size: 0.875rem; }
        .empty-state i { display: block; font-size: 1.6rem; margin-bottom: 0.5rem; opacity: 0.5; }
        .breadcrumb-container {
            display: flex; align-items: center; gap: 0.5rem; background: var(--bg-2);
            padding: 0.5rem 0.7rem; border-radius: 10px; border: 1px solid var(--border); margin-bottom: 1rem;
        }
        .breadcrumb-sep { color: var(--text-3); }
        .breadcrumb-link { color: var(--accent); cursor: pointer; }
        .breadcrumb-link:hover { text-decoration: underline; }
        .breadcrumb-current { color: var(--text); font-weight: 600; }
        .search-row { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .search-row .form-input { flex: 1; }

        /* ============ Toggle ============ */
        .toggle {
            position: relative; width: 42px; height: 24px; background: #3b4a72;
            border-radius: 12px; cursor: pointer; transition: background 0.25s;
            display: inline-block; flex-shrink: 0; border: none;
        }
        .toggle.active { background: linear-gradient(135deg, var(--primary), var(--primary-2)); }
        .toggle .slider {
            position: absolute; top: 3px; inset-inline-start: 3px; width: 18px; height: 18px;
            background: #fff; border-radius: 50%; transition: transform 0.25s;
        }
        .toggle.active .slider { transform: translateX(18px); }
        html[dir="rtl"] .toggle.active .slider { transform: translateX(-18px); }
        .toggle-row {
            display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
            background: var(--bg-2); border: 1px solid var(--border); border-radius: 12px;
            padding: 0.8rem 1rem;
        }
        .toggle-row .label { font-weight: 600; font-size: 0.95rem; }
        .toggle-row .sub { font-size: 0.78rem; color: var(--text-3); margin-top: 0.15rem; }

        /* ============ Modal ============ */
        .modal-overlay {
            position: fixed; inset: 0; background: rgba(4, 8, 18, 0.72);
            display: flex; align-items: center; justify-content: center; z-index: 90;
            padding: 1rem; backdrop-filter: blur(4px);
        }
        .modal-overlay.hidden { display: none; }
        .modal-box {
            background: linear-gradient(180deg, var(--surface-2), var(--bg-2));
            border: 1px solid var(--border-strong); border-radius: 18px; padding: 1.4rem;
            max-width: 680px; width: 100%; max-height: 92vh; display: flex; flex-direction: column;
            box-shadow: 0 30px 70px -20px rgba(0, 0, 0, 0.8);
        }
        .modal-scroll { flex: 1; overflow-y: auto; padding-inline-end: 6px; min-height: 0; }
        .modal-title {
            font-size: 1.2rem; font-weight: 800; margin: 0 0 1rem;
            display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
        }
        .modal-title .enabled-toggle { font-size: 1.6rem; cursor: pointer; transition: 0.2s; padding: 0 0.25rem; user-select: none; }
        .modal-title .enabled-toggle:hover { transform: scale(1.15); }
        .modal-title .enabled-toggle.on { color: var(--green); }
        .modal-title .enabled-toggle.off { color: var(--red); }
        .modal-actions {
            display: flex; gap: 0.6rem; margin-top: 1rem; padding-top: 0.9rem;
            border-top: 1px solid var(--border); justify-content: flex-end; flex-shrink: 0;
        }
        .modal-error { color: var(--red); font-size: 0.85rem; margin-top: 0.5rem; display: none; }
        .modal-error.show { display: block; }
        .modal-close-x {
            background: none; border: none; color: var(--text-3); font-size: 1.1rem; cursor: pointer;
            padding: 0.3rem 0.5rem; border-radius: 8px;
        }
        .modal-close-x:hover { color: var(--text); background: var(--surface-3); }

        /* ============ Toast ============ */
        .toast-container {
            position: fixed; bottom: 24px; inset-inline-end: 24px; z-index: 999;
            display: flex; flex-direction: column; gap: 0.5rem; max-width: min(92vw, 420px);
        }
        .toast {
            background: var(--surface-2); border: 1px solid var(--border-strong);
            padding: 0.75rem 1.1rem; border-radius: 12px; color: var(--text);
            box-shadow: 0 14px 40px rgba(0, 0, 0, 0.55); font-size: 0.875rem;
            animation: toast-in 0.22s ease; word-break: break-word;
        }
        .toast.success { border-inline-start: 4px solid var(--green); }
        .toast.error { border-inline-start: 4px solid var(--red); }
        .toast.info { border-inline-start: 4px solid var(--accent); }
        @keyframes toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

        /* ============ Skeleton loading components ============ */
        @keyframes skeleton-shimmer {
            0% { background-position: -300px 0; }
            100% { background-position: 300px 0; }
        }
        .skl-bg {
            background: linear-gradient(90deg, var(--surface-2) 0%, var(--surface-3) 50%, var(--surface-2) 100%);
            background-size: 300px 100%; animation: skeleton-shimmer 1.6s ease-in-out infinite;
            border-radius: 8px; color: transparent !important; pointer-events: none;
        }
        .skl-bg * { color: transparent !important; background: none !important; border-color: transparent !important; }
        .skl-circle {
            background: linear-gradient(90deg, var(--surface-2) 0%, var(--surface-3) 50%, var(--surface-2) 100%);
            background-size: 300px 100%; animation: skeleton-shimmer 1.6s ease-in-out infinite;
            border-radius: 50%;
        }
        .skl-block {
            background: linear-gradient(90deg, var(--surface-2) 0%, var(--surface-3) 50%, var(--surface-2) 100%);
            background-size: 300px 100%; animation: skeleton-shimmer 1.6s ease-in-out infinite;
            border-radius: 6px;
        }
        .skl-input {
            background: linear-gradient(90deg, var(--surface-2) 0%, var(--surface-3) 50%, var(--surface-2) 100%);
            background-size: 300px 100%; animation: skeleton-shimmer 1.6s ease-in-out infinite;
            border-radius: 10px; height: 38px; width: 100%;
        }
        .skl-textarea {
            background: linear-gradient(90deg, var(--surface-2) 0%, var(--surface-3) 50%, var(--surface-2) 100%);
            background-size: 300px 100%; animation: skeleton-shimmer 1.6s ease-in-out infinite;
            border-radius: 10px; height: 120px; width: 100%;
        }

        /* Sending-in-progress skeleton bubble for chat panels */
        .chat-sending { align-self: flex-start; display: flex; align-items: center; gap: 0.45rem; padding: 0.6rem 0.9rem; border-radius: 14px; background: var(--surface-2); border: 1px solid var(--border); }
        .chat-sending .skl-block { display: inline-block; }

        .skl-stat-card {
            background: linear-gradient(160deg, var(--surface), var(--bg-2));
            border: 1px solid var(--border); border-radius: 16px; padding: 1.1rem 1.2rem;
        }
        .skl-stat-icon { width: 38px; height: 38px; border-radius: 11px; margin-bottom: 0.6rem; }
        .skl-stat-value { width: 60px; height: 28px; margin-bottom: 0.3rem; }
        .skl-stat-label { width: 80px; height: 12px; }

        .skl-check-item {
            display: flex; align-items: center; gap: 0.7rem; padding: 0.55rem 0;
            border-bottom: 1px dashed var(--border); font-size: 0.9rem;
        }
        .skl-check-icon { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; }
        .skl-check-text { flex: 1; height: 14px; }

        .skl-table-row { display: grid; grid-template-columns: 100px 60px 1fr 1fr 60px 80px 90px; gap: 1rem; padding: 0.6rem 0.9rem; border-bottom: 1px solid rgba(38, 52, 90, 0.6); align-items: center; }
        .skl-table-row .skl-block { height: 14px; }
        .skl-table-row .skl-btn { width: 60px; height: 28px; border-radius: 8px; }

        .skl-file-row {
            display: flex; align-items: center; gap: 0.55rem; padding: 0.45rem 0.6rem;
            border-radius: 10px; border: 1px solid transparent; background: var(--surface);
            margin-bottom: 0.35rem;
        }
        .skl-file-icon { width: 22px; height: 22px; border-radius: 4px; flex-shrink: 0; }
        .skl-file-name { flex: 1; height: 14px; max-width: 200px; }
        .skl-file-badge { width: 50px; height: 18px; border-radius: 999px; }

        .skl-menu-row { display: flex; gap: 0.5rem; align-items: center; }
        .skl-menu-input { flex: 1; height: 38px; border-radius: 10px; }
        .skl-menu-del { width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0; }

        .skl-form-row { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1.1rem; }
        .skl-label { width: 120px; height: 12px; }

        /* ============ Loading overlay (for complex forms) ============ */
        .loading-overlay {
            position: relative;
        }
        .loading-overlay::after {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(90deg, var(--surface) 0%, var(--surface-2) 50%, var(--surface) 100%);
            background-size: 300px 100%; animation: skeleton-shimmer 1.6s ease-in-out infinite;
            border-radius: 14px; z-index: 5; opacity: 0.92;
            pointer-events: none;
        }

        /* ============ Inline loading spinner ============ */
        .inline-spinner {
            display: inline-flex; align-items: center; justify-content: center;
            padding: 2rem; width: 100%; text-align: center;
        }
        .inline-spinner .loading-spinner {
            width: 28px; height: 28px; border-radius: 50%;
            border: 3px solid var(--surface-3); border-top-color: var(--primary);
            animation: spin 0.85s linear infinite;
        }
        .inline-spinner-compact {
            display: inline-flex; align-items: center; justify-content: center;
            padding: 0.4rem; width: 100%; text-align: center;
        }
        .inline-spinner-compact .loading-spinner {
            width: 16px; height: 16px; border-radius: 50%;
            border: 2px solid var(--surface-3); border-top-color: var(--primary);
            animation: spin 0.85s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ============ Mini spinners for buttons/inline actions ============ */
        .mini-spinner {
            display: inline-block; width: 14px; height: 14px; border-radius: 50%;
            border: 2px solid var(--surface-3); border-top-color: var(--primary);
            animation: spin 0.85s linear infinite; vertical-align: middle;
        }
        .mini-spinner.on-primary { border-color: rgba(255,255,255,0.35); border-top-color: #fff; }

        /* ============ Button loading state ============ */
        .btn.loading { position: relative; pointer-events: none; opacity: 0.85; }
        .btn.loading > :not(.btn-spinner) { visibility: hidden; }
        .form-busy .form-input { opacity: 0.55; pointer-events: none; transition: opacity 0.2s; }
        .form-busy { position: relative; }
        .btn .btn-spinner {
            display: none; position: absolute; inset: 0; align-items: center; justify-content: center; gap: 0.4rem;
            font-size: 0.85rem; color: inherit;
        }
        .btn.loading .btn-spinner { display: flex; }
        .btn-spinner .mini-spinner { width: 13px; height: 13px; }

        /* ============ Inline button pulsing dots (in-place busy hint) ============ */
        .busy-dots { display: inline-flex; gap: 3px; align-items: center; }
        .busy-dots span { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.4; animation: busyDot 1s infinite; }
        .busy-dots span:nth-child(2) { animation-delay: 0.15s; }
        .busy-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes busyDot { 0%, 100% { opacity: 0.25; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }

        /* ============ Keyboard builder ============ */
        .kb-grid { display: flex; flex-direction: column; gap: 0.45rem; }
        .kb-row-chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .kb-chip {
            display: inline-flex; align-items: center; gap: 0.4rem; background: var(--bg-2);
            border: 1px solid var(--border); border-radius: 9px; padding: 0.4rem 0.6rem;
            font-size: 0.8rem; max-width: 100%;
        }
        .kb-chip:hover { border-color: var(--border-strong); background: var(--surface-2); }
        .kb-chip .chip-label { max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .kb-chip .kb-arrow { color: var(--text-3); background: none; border: none; cursor: pointer; font-size: 0.72rem; padding: 0 0.12rem; border-radius: 5px; }
        .kb-chip .kb-arrow:hover:not(:disabled) { color: var(--text); background: var(--surface-3); }
        .kb-chip .kb-arrow:disabled { opacity: 0.25; cursor: default; }
        .kb-chip .chip-delete:hover { color: var(--red); }
        .kb-row-head {
            font-size: 0.66rem; color: var(--text-3); display: flex; align-items: center; gap: 0.4rem;
            text-transform: uppercase; letter-spacing: 0.05em;
        }
        .kb-preview {
            display: flex; flex-direction: column; gap: 0.3rem; margin-top: 0.5rem; padding: 0.6rem;
            background: var(--bg-2); border: 1px dashed var(--border); border-radius: 10px;
        }
        .kb-preview-row { display: flex; gap: 0.3rem; justify-content: stretch; }
        .kb-preview-btn {
            flex: 1; text-align: center; font-size: 0.74rem; padding: 0.35rem 0.3rem; border-radius: 7px;
            background: var(--surface-2); border: 1px solid var(--border); color: var(--text-2);
            overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .kb-preview-btn.kb-pv-url { color: var(--accent); }
        .kb-preview-btn.kb-pv-command { color: var(--green); }

        /* ============ Sent admin messages in user chat ============ */
        .chat-msg.admin-msg { background: rgba(124, 92, 240, 0.14); border: 1px solid rgba(124, 92, 240, 0.35); align-self: flex-end; }
        .msg-actions { display: flex; gap: 0.3rem; margin-top: 0.35rem; justify-content: flex-end; }
        .msg-action-btn {
            background: none; border: 1px solid var(--border); color: var(--text-3); cursor: pointer;
            font-size: 0.68rem; padding: 0.14rem 0.5rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 0.25rem;
        }
        .msg-action-btn:hover { color: var(--text); border-color: var(--border-strong); background: var(--surface-2); }
        .msg-action-btn.danger:hover { color: var(--red); border-color: var(--red); }
        .msg-photo-chip {
            font-size: 0.66rem; color: var(--accent); background: rgba(56, 189, 248, 0.1);
            padding: 0.05rem 0.45rem; border-radius: 999px; display: inline-block; margin-bottom: 0.25rem;
        }

        /* ============ Chips (keyboard builder) ============ */
        .button-chip-list { display: flex; flex-direction: column; gap: 0.4rem; min-height: 30px; padding: 0.2rem 0; }
        .button-chip {
            display: flex; align-items: center; gap: 0.55rem; background: var(--bg-2);
            border: 1px solid var(--border); border-radius: 9px; padding: 0.45rem 0.65rem;
            font-size: 0.85rem; transition: background 0.15s, border-color 0.15s, box-shadow 0.15s; width: 100%;
        }
        .button-chip:hover { background: var(--surface-2); border-color: var(--border-strong); }
        .chip-grip { color: var(--text-3); font-size: 0.85rem; flex-shrink: 0; }
        .chip-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .chip-badge {
            font-size: 0.62rem; color: var(--text-2); background: var(--surface-2);
            padding: 0.08rem 0.5rem; border-radius: 999px; flex-shrink: 0;
        }
        .chip-btn {
            color: var(--text-3); background: none; border: none; cursor: pointer;
            font-size: 0.9rem; padding: 0 0.2rem; flex-shrink: 0; border-radius: 6px;
        }
        .chip-btn:hover { color: var(--text); }
        .chip-delete:hover { color: var(--red); }
        .chip-edit:hover { color: var(--accent); }

        /* ============ Menu editor ============ */
        .menu-hint {
            background: var(--bg-2); border: 1px solid var(--border); border-radius: 10px;
            padding: 0.7rem 0.95rem; font-size: 0.8rem; color: var(--text-2);
            margin: 0.5rem 0 0.9rem; line-height: 1.6;
        }
        .menu-commands-container { overflow-x: auto; }
        .menu-row { display: flex; gap: 0.5rem; align-items: center; position: relative; min-width: max-content; }
        .menu-row .form-input { flex: 1; min-width: 0; }
        .menu-row .form-input[data-role='desc'] { min-width: 200px; }
        .menu-row .form-input[data-role='cmd'] { min-width: 100px; }
        .menu-del { color: var(--red); background: none; border: none; cursor: pointer; font-size: 1rem; padding: 0.4rem; border-radius: 8px; flex-shrink: 0; z-index: 1; }
        .menu-del:hover { background: var(--red-soft); }
        .menu-fixed-icon { color: var(--text-3); font-size: 1rem; flex-shrink: 0; padding: 0.3rem; z-index: 1; }
        .menu-arrow-btn { background: none; border: none; color: var(--text-3); cursor: pointer; font-size: 0.8rem; padding: 0.2rem 0.35rem; border-radius: 6px; flex-shrink: 0; z-index: 1; }
        .menu-arrow-btn:hover { background: var(--surface-3); color: var(--amber); }
        .menu-arrow-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .menu-arrow-btn:disabled:hover { background: none; color: var(--text-3); }

        /* ============ Users table ============ */
        .table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid var(--border); }
        table.users-table { width: 100%; font-size: 0.85rem; border-collapse: collapse; min-width: 640px; }
        .users-table th {
            text-align: start; padding: 0.7rem 0.9rem; font-size: 0.72rem; text-transform: uppercase;
            letter-spacing: 0.06em; color: var(--text-3); background: var(--surface);
            border-bottom: 1px solid var(--border); font-weight: 700;
        }
        .users-table td { padding: 0.6rem 0.9rem; border-bottom: 1px solid rgba(38, 52, 90, 0.6); vertical-align: middle; white-space: nowrap; }
        .users-table td.td-name { max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .users-table tr:last-child td { border-bottom: none; }
        .users-table tr:hover td { background: rgba(24, 36, 64, 0.5); }
        .mono { font-family: var(--mono); font-size: 0.8rem; }
        .role-btn {
            border: none; border-radius: 8px; padding: 0.2rem 0.7rem; font-size: 0.75rem;
            cursor: pointer; font-weight: 600; transition: filter 0.15s;
        }
        .role-btn:hover { filter: brightness(1.15); }
        .role-btn.promote { background: rgba(52, 211, 153, 0.16); color: var(--green); border: 1px solid rgba(52, 211, 153, 0.4); }
        .role-btn.demote { background: rgba(248, 113, 113, 0.16); color: var(--red); border: 1px solid rgba(248, 113, 113, 0.4); }

        /* ============ AI tab ============ */
        .ai-section {
            background: linear-gradient(180deg, var(--surface), var(--bg-2));
            border: 1px solid var(--border); border-radius: 14px; padding: 1.1rem 1.25rem; margin-bottom: 1.1rem;
        }
        .ai-section-title {
            font-size: 0.95rem; font-weight: 700; color: var(--primary); margin: 0 0 0.8rem;
            display: flex; align-items: center; gap: 0.5rem;
        }
        .ai-section-title .sub { font-weight: 400; font-size: 0.78rem; color: var(--text-3); }
        .ai-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 0.9rem; }
        .knowledge-base-item {
            background: var(--bg-2); border: 1px solid var(--border); border-radius: 10px;
            padding: 0.8rem; margin-bottom: 0.6rem;
        }
        .kb-header { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; }
        .kb-header .toggle { width: 34px; height: 19px; }
        .kb-header .toggle .slider { width: 15px; height: 15px; top: 2px; inset-inline-start: 2px; }
        .kb-header .toggle.active .slider { transform: translateX(15px); }
        html[dir="rtl"] .kb-header .toggle.active .slider { transform: translateX(-15px); }
        .test-result { font-size: 0.85rem; }
        .test-result.success { color: var(--green); }
        .test-result.error { color: var(--red); }
        .test-result.partial { color: var(--amber); }
        .memory-indicator {
            display: flex; align-items: center; gap: 0.8rem; background: var(--bg-2);
            padding: 0.6rem 1rem; border-radius: 10px; border: 1px solid var(--border); margin-top: 0.6rem; flex-wrap: wrap;
        }
        .memory-indicator .count { font-weight: 700; color: var(--primary); }
        .playground-messages {
            min-height: 150px; max-height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem;
            padding: 0.7rem; background: var(--bg-2); border-radius: 12px; border: 1px solid var(--border); margin-bottom: 0.75rem;
        }
        .playground-message {
            max-width: 85%; padding: 0.55rem 0.9rem; border-radius: 12px; font-size: 0.875rem;
            white-space: pre-wrap; word-break: break-word; line-height: 1.55;
        }
        .playground-message.user {
            align-self: flex-end; background: var(--primary-soft); border: 1px solid rgba(124, 92, 240, 0.35); color: var(--text);
        }
        .playground-message.bot {
            align-self: flex-start; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-2);
        }
        .playground-message pre {
            background: #0a0f1f; border: 1px solid var(--border); border-radius: 8px; padding: 0.6rem;
            overflow-x: auto; font-family: var(--mono); font-size: 0.8rem;
        }
        .playground-message code { background: rgba(124, 92, 240, 0.18); }
        .ai-save-bar {
            position: sticky; bottom: 12px; display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;
            justify-content: center;
            background: rgba(13, 20, 40, 0.92); backdrop-filter: blur(10px);
            border: 1px solid var(--border-strong); border-radius: 14px; padding: 0.8rem 1rem;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5); margin-top: 1rem; z-index: 20;
        }

        /* ============ Overview / stat cards ============ */
        .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.9rem; margin-bottom: 1.4rem; }
        .stat-card {
            background: linear-gradient(160deg, var(--surface), var(--bg-2));
            border: 1px solid var(--border); border-radius: 16px; padding: 1.1rem 1.2rem;
            transition: transform 0.15s, border-color 0.15s; position: relative; overflow: hidden;
        }
        .stat-card:hover { transform: translateY(-2px); border-color: var(--border-strong); }
        .stat-card .stat-icon {
            width: 38px; height: 38px; border-radius: 11px; display: flex; align-items: center; justify-content: center;
            font-size: 1rem; margin-bottom: 0.6rem;
        }
        .stat-card .stat-value { font-size: 1.7rem; font-weight: 800; line-height: 1.1; }
        .stat-card .stat-label { font-size: 0.78rem; color: var(--text-3); margin-top: 0.15rem; }
        .stat-card.primary .stat-icon { background: var(--primary-soft); color: var(--primary); }
        .stat-card.green .stat-icon { background: var(--green-soft); color: var(--green); }
        .stat-card.blue .stat-icon { background: rgba(56, 189, 248, 0.14); color: var(--accent); }
        .stat-card.amber .stat-icon { background: var(--amber-soft); color: var(--amber); }
        .stat-card.red .stat-icon { background: var(--red-soft); color: var(--red); }
        .quick-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.4rem; }
        .checklist { list-style: none; padding: 0; margin: 0; }
        .checklist li {
            display: flex; align-items: center; gap: 0.7rem; padding: 0.55rem 0;
            border-bottom: 1px dashed var(--border); font-size: 0.9rem;
        }
        .checklist li:last-child { border-bottom: none; }
        .checklist .check { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; flex-shrink: 0; }
        .checklist .check.done { background: var(--green-soft); color: var(--green); }
        .checklist .check.todo { background: var(--surface-2); color: var(--text-3); border: 1px dashed var(--border-strong); }
        .checklist .check-btn { margin-inline-start: auto; }

        /* ============ Backup ============ */
        .backup-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 1rem; }

        /* ============ Footer ============ */
        .footer {
            text-align: center; padding: 1.4rem 1rem 1rem; border-top: 1px solid var(--border);
            margin-top: 1.5rem; font-size: 0.85rem; color: var(--text-3);
        }
        .footer .brand { font-weight: 700; color: var(--primary); }
        .footer a { margin: 0 0.4rem; color: var(--text-2); }
        .footer a:hover { color: var(--text); }

        /* ============ Chat messenger ============ */
        .chat-messages { display: flex; flex-direction: column; gap: 0.5rem; max-height: 400px; overflow-y: auto; padding: 1rem; background: var(--bg-2); border: 1px solid var(--border); border-radius: 14px; margin-bottom: 0.75rem; }
        .chat-msg { max-width: 80%; padding: 0.6rem 0.9rem; border-radius: 14px; font-size: 0.875rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word; }
        .chat-msg.user-msg { align-self: flex-end; background: var(--primary-soft); border: 1px solid rgba(124, 92, 240, 0.3); color: var(--text); }
        .chat-msg.bot-msg { align-self: flex-start; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-2); }
        .chat-msg .msg-time { font-size: 0.65rem; color: var(--text-3); margin-top: 0.2rem; }
        .chat-input-area { display: flex; gap: 0.5rem; align-items: flex-end; }
        .chat-input-area .form-textarea { flex: 1; min-height: 42px; max-height: 120px; resize: none; }
        .chat-empty { display: flex; align-items: center; justify-content: center; padding: 2rem; color: var(--text-3); font-size: 0.875rem; }

        /* ============ User manage view ============ */
        .um-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.2rem; position: sticky; top: 60px; z-index: 25; background: var(--bg); padding: 10px; border-radius: 10px; }
        .um-header .panel-title { margin: 0; }
        .um-header .btn { font-weight: 700; }
        .um-val { overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; max-height: 3.1em; }
        .um-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.6rem; margin-bottom: 1rem; }
        .um-card { background: var(--bg-2); border: 1px solid var(--border); border-radius: 10px; padding: 0.6rem 0.8rem; }
        .um-card .um-lbl { font-size: 0.72rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.04em; }
        .um-card .um-val { font-size: 0.9rem; margin-top: 0.15rem; word-break: break-word; }
        .um-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }

        /* ============ Broadcast view ============ */
        .bcast-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.2rem; position: sticky; top: 60px; z-index: 25; background: var(--bg); padding: 10px; border-radius: 10px; }
        .bcast-header .panel-title { margin: 0; }
        .bcast-header .btn { font-weight: 700; }
        .bcast-opts { background: var(--bg-2); border: 1px solid var(--border); border-radius: 12px; padding: 0.8rem 1rem; margin-bottom: 1rem; }
        .bcast-count { font-size: 0.8rem; color: var(--text-3); margin-top: 0.3rem; }
        .bcast-custom-list { max-height: 260px; overflow-y: auto; margin-top: 0.5rem; border: 1px solid var(--border); border-radius: 8px; padding: 0.5rem; }
        .bcast-custom-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0; font-size: 0.85rem; }
        .bcast-custom-item input[type="checkbox"] { accent-color: var(--primary); }
        .bcast-custom-controls { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
        .bcast-custom-controls .form-input { flex: 1; min-width: 120px; }
        .bcast-custom-controls .btn { font-size: 0.75rem; padding: 0.2rem 0.6rem; min-height: 26px; }
        #factory-reset-confirm-text { font-family: var(--mono); letter-spacing: 0.5px; }

        /* ============ More tabs dropdown ============ */
        .more-tabs-wrapper { display: inline-flex; flex-shrink: 0; position: relative; }
        .more-tabs-btn { padding: 0.65rem 0.85rem; border: none; border-bottom: 2px solid transparent; background: transparent; color: var(--text-2); cursor: pointer; font-weight: 600; font-size: 0.82rem; white-space: nowrap; transition: color 0.15s, border-color 0.15s; display: inline-flex; align-items: center; gap: 0.35rem; font-family: var(--font); }
        .more-tabs-btn:hover { color: var(--text); }
        .more-tabs-btn.active { color: #fff; border-bottom-color: var(--primary); }
        .more-tabs-dropdown { display: none; position: absolute; top: 100%; inset-inline-end: 0; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; min-width: 140px; box-shadow: 0 12px 30px rgba(0,0,0,0.5); padding: 0.35rem; z-index: 70; }
        .more-tabs-dropdown.show { display: block; }
        .more-tabs-dropdown button { display: flex; align-items: center; gap: 0.5rem; width: 100%; background: none; border: none; color: var(--text-2); padding: 0.5rem 0.75rem; border-radius: 8px; cursor: pointer; font-size: 0.82rem; text-align: start; font-family: var(--font); }
        .more-tabs-dropdown button:hover { background: var(--surface-2); color: var(--text); }
        .more-tabs-dropdown button.active { color: var(--accent); background: rgba(56, 189, 248, 0.08); }
        .tab-btn.overflow-hidden { display: none !important; }

        /* ============ RTL adjustments ============ */
        html[dir="rtl"] .tree-command-name { letter-spacing: 0; }
        html[dir="rtl"] .navbar-ver { letter-spacing: 0; }

        /* ============ Responsive ============ */
        @media (max-width: 490px) {
            .tabs-header { display: none; }
            .hamburger { display: inline-flex; }
            .navbar { padding: 0.6rem 0.9rem; }
            .status-items .status-pill { padding: 0.2rem 0.55rem; font-size: 0.72rem; }
            .card { padding: 1.4rem; margin: 1.5rem auto; }
            .main-container { padding: 1rem 0.9rem 2rem; }
            .modal-box { padding: 1.1rem; }
        }
        @media (max-width: 560px) {
            .navbar-title { font-size: 1.1rem; }
            #logo-header { height: 34px; }
            .status-items { gap: 0.4rem; }
            .status-items .status-pill .status-text { display: none; }
            .status-items .status-pill { padding: 0.2rem 0.45rem; }
            .stat-grid { grid-template-columns: repeat(2, 1fr); }
            .ai-save-bar { bottom: 8px; }
            .btn { padding: 0.55rem 1rem; }
            .tree-row .badge { font-size: 0.6rem; padding: 0.05rem 0.35rem; }
            .tree-row { gap: 0.35rem; padding: 0.4rem 0.5rem; }
        }
        @media (max-width: 450px) {
            .tree-row .badge { display: none; }
        }
    </style>
</head>
<body>
    <!-- Loading overlay removed — inline spinners used instead -->

    <nav class="navbar" id="navbar">
        <div class="navbar-inner">
            <div class="navbar-left">
                <img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" alt="Nyxx" id="logo-header">
                <h1 class="navbar-title">
                    Nyxx
                    <span class="navbar-ver">v${VERSION}</span>
                </h1>
            </div>
            <div class="navbar-right">
                <div class="status-items" id="status-items">
                    <span class="status-pill" id="status-d1"><i class="fa-solid fa-database"></i> <span class="status-text">D1: …</span></span>
                    <span class="status-pill" id="status-tg"><i class="fa-brands fa-telegram"></i> <span class="status-text">Bot: …</span></span>
                </div>
                <button id="update-banner-btn" class="update-banner-btn hidden" onclick="switchTab('update')">
                    <i class="fa-solid fa-arrow-up"></i> <span>Update Available</span>
                </button>
                <!-- Language switcher removed — English only -->
                <button id="logout-btn" class="icon-btn danger hidden" onclick="logout()" title="Logout"><i class="fa-solid fa-sign-out-alt"></i></button>
            </div>
        </div>
    </nav>

    <main class="main-container">
        <div id="step-status" class="step">
            <div class="card text-center">
                <div class="card-icon"><i class="fa-solid fa-database"></i></div>
                <h2 class="step-title">Checking Database…</h2>
                <p id="status-message" class="text-sm"></p>
                <div id="status-actions" class="hidden mt-4">
                    <button onclick="window.location.reload()" class="btn btn-primary"><i class="fa-solid fa-rotate"></i> <span>Retry</span></button>
                    <button onclick="goToSetup()" class="btn btn-success"><i class="fa-solid fa-user-lock"></i> <span>Set Up Admin Password</span></button>
                </div>
            </div>
        </div>

        <div id="step-setup" class="step step-hidden">
            <div class="card">
                <h2 class="step-title"><i class="fa-solid fa-user-lock"></i> <span>Initial Setup</span></h2>
                <p class="step-sub">Set an admin password to protect your dashboard. You may also connect a bot token now (skip if you want to do it later).</p>
                <div class="form-group">
                    <label class="form-label">Bot Token (optional)</label>
                    <input type="password" id="setup-bot-token" class="form-input" autocomplete="off" placeholder="Get your token from @BotFather">
                    <label style="font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; margin-top: 0.35rem; cursor: pointer;">
                        <input type="checkbox" id="setup-skip-bot"> <span>Skip bot token for now</span>
                    </label>
                </div>
                <div class="form-group">
                    <label class="form-label">Admin Password</label>
                    <input type="password" id="setup-password" class="form-input" autocomplete="new-password" placeholder="Choose a strong password">
                </div>
                <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <input type="password" id="setup-password-confirm" class="form-input" autocomplete="new-password" placeholder="Confirm password">
                </div>
                <button onclick="submitSetup()" class="btn btn-success btn-block"><i class="fa-solid fa-floppy-disk"></i> <span>Save &amp; Continue</span></button>
                <div id="setup-error" class="log-error mt-3" style="display: none;"></div>
                <p class="text-sm mt-3">💡 You can also set an <strong>ADMIN_PASS</strong> environment variable in Cloudflare Worker to override this password.</p>
            </div>
        </div>

        <div id="step-login" class="step step-hidden">
            <div class="card">
                <h2 class="step-title"><i class="fa-solid fa-lock"></i> <span>Login</span></h2>
                <p class="step-sub">Enter your admin password to access the dashboard.</p>
                <form onsubmit="event.preventDefault(); submitLogin();">
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" id="login-password" class="form-input" autocomplete="current-password" placeholder="Enter your password">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block"><i class="fa-solid fa-right-to-bracket"></i> <span>Login</span></button>
                    <div id="login-error" class="log-error mt-3" style="display: none;"></div>
                </form>
                <p class="text-sm mt-3">💡 If you set <strong>ADMIN_PASS</strong> environment variable, use that password.</p>
            </div>
        </div>

        <div id="step-dashboard" class="step step-hidden">
            <div class="tabs-header" id="tabs-header">
                <button class="tab-btn active" onclick="switchTab('overview')"><i class="fa-solid fa-house"></i> <span>Overview</span></button>
                <button class="tab-btn" onclick="switchTab('commands')"><i class="fa-solid fa-list-ul"></i> <span>Commands</span></button>
                <button class="tab-btn" onclick="switchTab('menu')"><i class="fa-solid fa-bars"></i> <span>Menu</span></button>
                <button class="tab-btn" onclick="switchTab('users')"><i class="fa-solid fa-users"></i> <span>Users</span></button>
                <button class="tab-btn" onclick="switchTab('ai')"><i class="fa-solid fa-robot"></i> <span>AI</span></button>
                <button class="tab-btn" onclick="switchTab('settings')"><i class="fa-solid fa-gear"></i> <span>Settings</span></button>
                <button class="tab-btn" onclick="switchTab('cron')"><i class="fa-solid fa-clock-rotate-left"></i> <span>Cron</span></button>
                <button class="tab-btn" onclick="switchTab('botinfo')"><i class="fa-solid fa-circle-info"></i> <span>Bot Info</span></button>
                <button class="tab-btn" onclick="switchTab('backup')"><i class="fa-solid fa-box-archive"></i> <span>Backup</span></button>
                <button class="tab-btn" onclick="switchTab('logs')"><i class="fa-solid fa-clipboard-list"></i> <span>Logs</span></button>
                <button class="tab-btn" onclick="switchTab('update')"><i class="fa-solid fa-arrow-up"></i> <span>Update</span></button>
                <div class="more-tabs-wrapper" id="more-tabs-wrapper" style="display:none;">
                    <button class="more-tabs-btn" onclick="toggleMoreTabsDropdown(event)"><i class="fa-solid fa-ellipsis"></i> <span>More</span></button>
                    <div class="more-tabs-dropdown" id="more-tabs-dropdown"></div>
                </div>
            </div>
            <div class="hamburger" id="hamburger-btn" onclick="toggleHamburger()"><i class="fa-solid fa-bars" id="hamburgerfa"></i> <span>Menu</span></div>
            <div id="mobile-tabs" class="mobile-tabs">
                <button class="active" onclick="switchTab('overview'); closeHamburger();"><i class="fa-solid fa-house"></i> <span>Overview</span></button>
                <button onclick="switchTab('commands'); closeHamburger();"><i class="fa-solid fa-list-ul"></i> <span>Commands</span></button>
                <button onclick="switchTab('menu'); closeHamburger();"><i class="fa-solid fa-bars"></i> <span>Menu</span></button>
                <button onclick="switchTab('users'); closeHamburger();"><i class="fa-solid fa-users"></i> <span>Users</span></button>
                <button onclick="switchTab('ai'); closeHamburger();"><i class="fa-solid fa-robot"></i> <span>AI</span></button>
                <button onclick="switchTab('settings'); closeHamburger();"><i class="fa-solid fa-gear"></i> <span>Settings</span></button>
                <button onclick="switchTab('cron'); closeHamburger();"><i class="fa-solid fa-clock-rotate-left"></i> <span>Cron</span></button>
                <button onclick="switchTab('botinfo'); closeHamburger();"><i class="fa-solid fa-circle-info"></i> <span>Bot Info</span></button>
                <button onclick="switchTab('backup'); closeHamburger();"><i class="fa-solid fa-box-archive"></i> <span>Backup</span></button>
                <button onclick="switchTab('logs'); closeHamburger();"><i class="fa-solid fa-clipboard-list"></i> <span>Logs</span></button>
                <button onclick="switchTab('update'); closeHamburger();"><i class="fa-solid fa-arrow-up"></i> <span>Update</span></button>
            </div>

            <!-- ============ OVERVIEW TAB ============ -->
            <div id="tab-overview" class="tab-content active">
                <div class="flex justify-between items-center mb-3" style="margin-bottom:1.2rem;">
                    <h3 class="panel-title"><i class="fa-solid fa-house"></i> <span>Overview</span></h3>
                    <button onclick="loadOverview(true)" class="btn btn-gray btn-sm"><i class="fa-solid fa-rotate"></i> <span>Refresh</span></button>
                </div>
                <div id="overview-error" class="log-error" style="display:none;"></div>
                <div class="stat-grid" id="overview-stats"></div>
                <div class="panel" style="margin-bottom:1.1rem;">
                    <h4 class="panel-title" style="font-size:1rem; margin-bottom:0.8rem;"><i class="fa-solid fa-bolt"></i> <span>Quick Actions</span></h4>
                    <div class="quick-actions">
                        <button onclick="switchTab('commands'); showAddCommandModal()" class="btn btn-success btn-sm"><i class="fa-solid fa-plus"></i> <span>Add Command</span></button>
                        <button onclick="switchTab('menu')" class="btn btn-primary btn-sm"><i class="fa-solid fa-bars"></i> <span>Menu</span></button>
                        <button onclick="switchTab('ai')" class="btn btn-gray btn-sm"><i class="fa-solid fa-robot"></i> <span>AI</span></button>
                        <button onclick="switchTab('settings')" class="btn btn-gray btn-sm"><i class="fa-solid fa-gear"></i> <span>Settings</span></button>
                    </div>
                </div>
                <div class="panel">
                    <h4 class="panel-title" style="font-size:1rem; margin-bottom:0.6rem;"><i class="fa-solid fa-flag-checkered"></i> <span>Getting Started</span></h4>
                    <ul class="checklist" id="overview-checklist"></ul>
                </div>
            </div>

            <!-- ============ COMMANDS TAB ============ -->
            <div id="tab-commands" class="tab-content">
                <div class="flex justify-between items-center mb-3" style="margin-bottom:1.2rem;">
                    <h3 class="panel-title"><i class="fa-solid fa-list-ul"></i> <span>Commands</span></h3>
                    <div class="flex">
                        <button onclick="exportCommandPack()" class="btn btn-gray btn-sm" title="Download commands as a shareable pack"><i class="fa-solid fa-file-export"></i> <span>Export Pack</span></button>
                        <button onclick="document.getElementById('command-pack-file').click()" class="btn btn-gray btn-sm" title="Import a command pack"><i class="fa-solid fa-file-import"></i> <span>Import Pack</span></button>
                        <button onclick="showAddCommandModal()" class="btn btn-success btn-sm"><i class="fa-solid fa-plus"></i> <span>Add Command</span></button>
                    </div>
                </div>
                <input type="file" id="command-pack-file" accept=".json,application/json" style="display:none;" onchange="importCommandPack(event)">
                <div class="search-row">
                    <input id="command-search" class="form-input" placeholder="Search commands…" oninput="renderFileManager()">
                </div>
                <div class="breadcrumb-container">
                    <span style="color:var(--text-3); font-size:0.9rem;"><i class="fa-regular fa-folder-open"></i></span>
                    <span id="breadcrumb" style="display:flex; gap:0.2rem; align-items:center; font-size:0.875rem; overflow-x:auto;"></span>
                    <button onclick="navigateUp()" id="btn-up" class="btn btn-gray btn-sm" style="margin-inline-start:auto;"><i class="fa-solid fa-arrow-up"></i> ..</button>
                </div>
                <div id="commands-list" class="flex-col gap-1" style="gap:0.35rem;"></div>
            </div>

            <!-- ============ MENU TAB ============ -->
            <div id="tab-menu" class="tab-content">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="panel-title"><i class="fa-solid fa-bars"></i> <span>Telegram Menu Commands</span></h3>
                    <button onclick="addMenuCommandRow()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> <span>Add Entry</span></button>
                </div>
                <div class="menu-hint">
                    <i class="fa-regular fa-lightbulb" style="margin-inline-end:0.4rem;"></i>
                    <span>Commands appear in the bot's menu. Use lowercase, no slash. Examples:</span>
                    <code>start</code>, <code>help</code>, <code>support</code>.
                    <span><strong>start</strong> is fixed and cannot be removed.</span>
                </div>
                <div id="menu-commands-container" class="panel flex-col menu-commands-container" style="gap:0.5rem;"></div>
                <button onclick="publishMenuCommands()" class="btn btn-success mt-3"><i class="fa-solid fa-cloud-arrow-up"></i> <span>Publish to Telegram</span></button>
                <div id="menu-publish-result" class="hidden mt-2" style="font-size:0.875rem;"></div>
            </div>

            <!-- ============ USERS TAB ============ -->
            <div id="tab-users" class="tab-content">
                <h3 class="panel-title" style="margin-bottom:0.6rem;"><i class="fa-solid fa-users"></i> <span>Users Who Have Interacted</span></h3>
                <div class="search-row">
                    <input id="user-search" class="form-input" placeholder="Search by username or name…">
                    <button onclick="loadUsers()" class="btn btn-gray btn-sm"><i class="fa-solid fa-magnifying-glass"></i></button>
                    <button onclick="openBroadcastTab()" class="btn btn-primary btn-sm" title="Global Broadcast"><i class="fa-solid fa-bullhorn"></i></button>
                </div>
                <div id="users-list" class="panel" style="padding:0.9rem;"></div>
            </div>

            <!-- ============ USER MANAGE TAB ============ -->
            <div id="tab-user-manage" class="tab-content">
                <div class="um-header">
                    <button onclick="closeUserManageTab()" class="btn btn-gray btn-sm"><i class="fa-solid fa-arrow-left"></i> <span>Back</span></button>
                    <h3 class="panel-title"><i class="fa-solid fa-user-gear"></i> <span id="um-tab-title">Manage User</span></h3>
                </div>
                <div id="um-tab-cards" class="um-cards"></div>
                <div id="um-tab-actions" class="um-actions"></div>
                <div style="border-top:1px solid var(--border); padding-top:0.6rem; margin-bottom:1rem;">
                    <button onclick="clearUserMemoryFromTab()" class="btn btn-danger btn-sm"><i class="fa-solid fa-eraser"></i> <span>Clear Chat Memory</span></button>
                    <span class="field-hint" style="margin-inline-start:0.5rem;">Removes all AI conversation history for this user.</span>
                </div>
                <h4 class="panel-title" style="font-size:0.95rem; margin-bottom:0.6rem;"><i class="fa-solid fa-comments"></i> <span>Chat History</span></h4>
                <div id="um-tab-chat" class="chat-messages"><div class="chat-empty"><i class="fa-regular fa-comments" style="margin-inline-end:0.4rem;"></i> No messages yet.</div></div>
                <div id="um-admin-messages" style="margin-top:0.4rem;"></div>
                <div style="margin-bottom:0.6rem;">
                    <div class="toggle-row" style="padding:0.4rem 0.7rem;">
                        <span class="label" style="font-size:0.82rem;">Attach Keyboard Buttons</span>
                        <div id="um-kb-toggle" class="toggle" onclick="toggleUmKB()"><span class="slider"></span></div>
                    </div>
                    <div id="um-kb-section" class="hidden" style="margin-top:0.5rem;">
                        <div class="toggle-row" style="padding:0.3rem 0.6rem; margin-bottom:0.4rem;">
                            <span class="label" style="font-size:0.78rem;">Inline Keyboard</span>
                            <div id="um-inline-toggle" class="toggle" onclick="toggleUmInline()"><span class="slider"></span></div>
                        </div>
                        <div id="um-inline-section" class="hidden">
                            <div class="flex" style="margin-bottom:0.4rem;">
                                <input id="kbUm-inline-label" class="form-input" style="flex:1.1; min-width:80px; font-size:0.8rem;" placeholder="Label">
                                <select id="kbUm-inline-type" class="form-input" style="flex:0 0 auto; width:auto; font-size:0.8rem;" onchange="kbInlineTypeToggle('kbUm')">
                                    <option value="command" selected>Command</option>
                                    <option value="callback">Callback</option>
                                    <option value="url">URL</option>
                                </select>
                                <select id="kbUm-inline-cmd" class="form-input" style="flex:1; min-width:100px; font-size:0.8rem;"><option value="">Select command…</option></select>
                                <input id="kbUm-inline-value" class="form-input hidden" style="flex:1; min-width:90px; font-size:0.8rem;" placeholder="Value / URL">
                                <button onclick="kbUm.inlineAdd()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <div id="kbUm-inline-list" class="button-chip-list" style="min-height:24px;"></div>
                        </div>
                        <div class="toggle-row" style="padding:0.3rem 0.6rem; margin-bottom:0.4rem; margin-top:0.4rem;">
                            <span class="label" style="font-size:0.78rem;">Reply Keyboard</span>
                            <div id="um-reply-toggle" class="toggle" onclick="toggleUmReply()"><span class="slider"></span></div>
                        </div>
                        <div id="um-reply-section" class="hidden">
                            <div class="flex" style="margin-bottom:0.4rem;">
                                <input id="kbUm-reply-label" class="form-input" style="flex:1.1; min-width:90px; font-size:0.8rem;" placeholder="Button text">
                                <select id="kbUm-reply-cmd" class="form-input" style="flex:1; min-width:100px; font-size:0.8rem;"><option value="">Run command… (optional)</option></select>
                                <button onclick="kbUm.replyAdd()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <div id="kbUm-reply-list" class="button-chip-list" style="min-height:24px;"></div>
                            <div id="kbUm-reply-preview" class="kb-preview"></div>
                            <div class="flex" style="gap:0.9rem; margin-top:0.4rem; flex-wrap:wrap; font-size:0.74rem; color:var(--text-2);">
                                <label style="display:flex; align-items:center; gap:0.3rem; cursor:pointer;"><input type="checkbox" id="kbUm-reply-resize" checked> Resize</label>
                                <label style="display:flex; align-items:center; gap:0.3rem; cursor:pointer;"><input type="checkbox" id="kbUm-reply-onetime"> One-time</label>
                                <label style="display:flex; align-items:center; gap:0.3rem; cursor:pointer;"><input type="checkbox" id="kbUm-reply-persistent" checked> Persistent</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-input-area">
                    <textarea id="um-tab-message" class="form-textarea" rows="4" placeholder="Type a message to send via bot… (or set a photo URL below)" style="resize:none;" onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault(); sendUserMessageFromTab();}"></textarea>
                    <div class="flex gap-1" style="flex-direction: column; justify-content: center;">
                        <button onclick="sendUserMessageFromTab()" id="um-send-btn" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i></button>
                        <button onclick="clearUmPhoto()" id="um-photo-clear" class="btn btn-danger btn-sm hidden" title="Clear photo"><i class="fa-solid fa-xmark"></i> <span>Photo</span></button>
                    </div>
                </div>
                <div class="flex" style="margin-top:0.5rem; gap:0.5rem; align-items:center;">
                    <input id="um-photo-url" class="form-input" style="flex:1; font-size:0.78rem;" placeholder="📷 Photo URL (optional — sends a photo, text becomes the caption)">
                </div>
            </div>

            <!-- ============ BROADCAST TAB ============ -->
            <div id="tab-broadcast" class="tab-content">
                <div class="bcast-header">
                    <button onclick="closeBroadcastTab()" class="btn btn-gray btn-sm"><i class="fa-solid fa-arrow-left"></i> <span>Back</span></button>
                    <h3 class="panel-title"><i class="fa-solid fa-bullhorn"></i> <span>Global Broadcast</span></h3>
                </div>
                <div class="bcast-opts">
                    <label class="form-label">Send to:</label>
                    <select id="broadcast-target" class="form-input" onchange="onBroadcastTargetChange()">
                        <option value="all">All Users</option>
                        <option value="only_ai_blocked">Only AI-Blocked Users</option>
                        <option value="only_full_blocked">Only Fully Blocked Users</option>
                        <option value="except_ai_blocked">All except AI-Blocked</option>
                        <option value="except_full_blocked">All except Fully Blocked</option>
                        <option value="specific">Specific User ID(s)</option>
                        <option value="custom">Custom Selection</option>
                    </select>
                    <div id="bcast-specific-group" class="hidden" style="margin-top:0.6rem;">
                        <label class="form-label" style="font-size:0.82rem;">User IDs (one per line)</label>
                        <textarea id="broadcast-specific-ids" class="form-textarea" rows="3" placeholder="7407137804&#10;123456789" style="resize:none; font-family:var(--mono); font-size:0.8rem;"></textarea>
                        <span class="field-hint">Enter Telegram user IDs, one per line.</span>
                    </div>
                    <div id="bcast-count" class="bcast-count"></div>
                    <div id="broadcast-custom-list" class="bcast-custom-list hidden"></div>
                </div>

                <!-- Keyboard buttons -->
                <div class="ai-section" style="margin-bottom:1rem;">
                    <div class="toggle-row" style="padding:0.5rem 0.8rem;">
                        <span class="label" style="font-size:0.85rem;">Attach Keyboard Buttons</span>
                        <div id="bcast-kb-toggle" class="toggle" onclick="toggleBroadcastKB()"><span class="slider"></span></div>
                    </div>
                    <div id="bcast-kb-section" class="hidden" style="margin-top:0.8rem;">
                        <div class="toggle-row" style="padding:0.4rem 0.7rem; margin-bottom:0.6rem;">
                            <span class="label" style="font-size:0.82rem;">Inline Keyboard</span>
                            <div id="bcast-inline-toggle" class="toggle" onclick="toggleBroadcastInline()"><span class="slider"></span></div>
                        </div>
                        <div id="bcast-inline-section" class="hidden">
                            <div class="flex" style="margin-bottom:0.5rem;">
                                <input id="kbBc-inline-label" class="form-input" style="flex:1.1; min-width:100px;" placeholder="Label">
                                <select id="kbBc-inline-type" class="form-input" style="flex:0 0 auto; width:auto;" onchange="kbInlineTypeToggle('kbBc')">
                                    <option value="command" selected>Command</option>
                                    <option value="callback">Callback</option>
                                    <option value="url">URL</option>
                                </select>
                                <select id="kbBc-inline-cmd" class="form-input" style="flex:1; min-width:120px;"><option value="">Select command…</option></select>
                                <input id="kbBc-inline-value" class="form-input hidden" style="flex:1; min-width:110px;" placeholder="Value / URL">
                                <button onclick="kbBc.inlineAdd()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <div id="kbBc-inline-list" class="button-chip-list" style="min-height:30px;"></div>
                        </div>
                        <div class="toggle-row" style="padding:0.4rem 0.7rem; margin-bottom:0.6rem; margin-top:0.6rem;">
                            <span class="label" style="font-size:0.82rem;">Reply Keyboard</span>
                            <div id="bcast-reply-toggle" class="toggle" onclick="toggleBroadcastReply()"><span class="slider"></span></div>
                        </div>
                        <div id="bcast-reply-section" class="hidden">
                            <div class="flex" style="margin-bottom:0.5rem;">
                                <input id="kbBc-reply-label" class="form-input" style="flex:1.1; min-width:100px;" placeholder="Button text">
                                <select id="kbBc-reply-cmd" class="form-input" style="flex:1; min-width:120px;"><option value="">Run command… (optional)</option></select>
                                <button onclick="kbBc.replyAdd()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <div id="kbBc-reply-list" class="button-chip-list" style="min-height:30px;"></div>
                            <div id="kbBc-reply-preview" class="kb-preview"></div>
                            <div class="flex" style="gap:0.9rem; margin-top:0.4rem; flex-wrap:wrap; font-size:0.74rem; color:var(--text-2);">
                                <label style="display:flex; align-items:center; gap:0.3rem; cursor:pointer;"><input type="checkbox" id="kbBc-reply-resize" checked> Resize</label>
                                <label style="display:flex; align-items:center; gap:0.3rem; cursor:pointer;"><input type="checkbox" id="kbBc-reply-onetime"> One-time</label>
                                <label style="display:flex; align-items:center; gap:0.3rem; cursor:pointer;"><input type="checkbox" id="kbBc-reply-persistent" checked> Persistent</label>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Delivery pacing (Telegram rate-limit protection) -->
                <div class="ai-section" style="margin-bottom:1rem;">
                    <div class="ai-section-title" style="font-size:0.85rem;"><i class="fa-solid fa-gauge-high"></i> <span>Delivery Pacing</span> <span class="sub">Protects against Telegram rate limits</span></div>
                    <div id="bcast-pacing" class="ai-grid">
                        <div class="form-group">
                            <label class="form-label">Batch Size (parallel sends)</label>
                            <input type="number" id="bcast-batch-size" class="form-input" min="1" max="100" placeholder="25">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Delay Between Batches (ms)</label>
                            <input type="number" id="bcast-delay-ms" class="form-input" min="0" max="60000" placeholder="0">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Per-Request Timeout (ms)</label>
                            <input type="number" id="bcast-timeout-ms" class="form-input" min="2000" max="60000" placeholder="10000">
                        </div>
                        <div class="form-group" style="display:flex; align-items:flex-end;">
                            <button onclick="saveBroadcastSettings()" id="bcast-pacing-save" class="btn btn-gray btn-sm"><i class="fa-solid fa-floppy-disk"></i> <span>Save Pacing</span></button>
                        </div>
                    </div>
                    <span class="field-hint">Tip: ~25 per batch with a 1000–1500 ms delay keeps even large broadcasts well under Telegram's ~30 msg/sec limit. 429 flood-waits are always honored automatically.</span>
                </div>

                <h4 class="panel-title" style="font-size:0.95rem; margin-bottom:0.6rem;"><i class="fa-solid fa-comments"></i> <span>Broadcast Chat</span></h4>
                <div id="broadcast-chat" class="chat-messages"><div class="chat-empty"><i class="fa-regular fa-paper-plane" style="margin-inline-end:0.4rem;"></i> Messages you send here will be delivered to selected users.</div></div>
                <div class="chat-input-area">
                    <textarea id="broadcast-message" class="form-textarea" rows="4" placeholder="Type your broadcast message… (or set a photo URL below)" style="resize:none;" onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault(); sendBroadcast();}"></textarea>
                    <div class="flex gap-1" style="flex-direction: column; justify-content: center;">
                        <button onclick="sendBroadcast()" id="bcast-send-btn" class="btn btn-success"><i class="fa-solid fa-paper-plane"></i> <span>Send</span></button>
                        <button onclick="clearBroadcastChat()" style="width: 100%;" class="btn btn-danger btn-sm" title="Clear chat"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
                <div class="flex" style="margin-top:0.5rem; gap:0.5rem; align-items:center;">
                    <input id="broadcast-photo-url" class="form-input" style="flex:1; font-size:0.78rem;" placeholder="📷 Photo URL (optional — broadcasts a photo, text becomes the caption)">
                    <button onclick="clearBroadcastPhoto()" id="bcast-photo-clear" class="btn btn-danger btn-sm hidden" title="Clear photo"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>

            <!-- ============ AI TAB ============ -->
            <div id="tab-ai" class="tab-content">
                <h3 class="panel-title" style="margin-bottom:1rem;"><i class="fa-solid fa-robot"></i> <span>AI Configuration</span></h3>
                <div id="ai-settings-content">

                <div class="ai-section">
                    <div class="ai-section-title"><i class="fa-solid fa-power-off"></i> <span>Enable AI</span></div>
                    <div class="toggle-row">
                        <div>
                            <div class="label">Enable AI Replies</div>
                            <div class="sub">Turn AI auto-responses on or off for your bot.</div>
                        </div>
                        <div id="ai-toggle" class="toggle" onclick="toggleAiEnabled()" role="switch" aria-checked="false"><span class="slider"></span></div>
                    </div>
                </div>

                <div class="ai-section">
                    <div class="ai-section-title"><i class="fa-solid fa-key"></i> <span>Provider &amp; API Keys</span></div>
                    <div class="ai-grid">
                        <div class="form-group">
                            <label class="form-label">Main Provider</label>
                            <select id="ai-provider" class="form-input" onchange="onAiProviderChange('main')">
                                <option value="openai">OpenAI</option>
                                <option value="gemini">Gemini</option>
                                <option value="deepseek">DeepSeek</option>
                                <option value="groq">Groq</option>
                                <option value="openrouter">OpenRouter</option>
                                <option value="ollama">Ollama</option>
                                <option value="custom">Custom (OpenAI-Compatible)</option>
                            </select>
                            <div class="field-hint" id="main-provider-hint"></div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Main API Key</label>
                            <input type="password" id="ai-api-key" class="form-input" autocomplete="off" placeholder="Enter Main API Key">
                            <div class="field-hint">Get your API key from the provider's website.</div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Main Model</label>
                            <input type="text" id="ai-model" class="form-input" placeholder="e.g. gpt-4o-mini">
                            <div class="field-hint" id="main-model-hint">Autofilled with recommended free model.</div>
                        </div>
                        <div class="form-group" id="main-base-url-group" style="display:none;">
                            <label class="form-label">Base URL (Custom)</label>
                            <input type="text" id="ai-base-url" class="form-input" placeholder="https://api.your-provider.com/v1">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Custom Headers (JSON)</label>
                            <input type="text" id="ai-custom-headers" class="form-input" placeholder='{"X-Custom-Header": "value"}'>
                        </div>
                    </div>

                    <hr class="divider">

                    <div id="alt-providers-container"></div>
                    <button onclick="addAlternateProvider()" class="btn btn-gray btn-sm mt-2" id="add-alt-provider-btn"><i class="fa-solid fa-plus"></i> Add Alternate Provider</button>
                    <span class="field-hint">You can add up to 5 alternate providers as fallback.</span>

                    <div class="flex mt-3">
                        <button type="button" onclick="testAiConnection()" class="btn btn-gray btn-sm"><i class="fa-solid fa-plug"></i> <span>Test Connections</span></button>
                        <span id="ai-test-result" class="test-result"></span>
                    </div>
                </div>

                <div class="ai-section">
                    <div class="ai-section-title"><i class="fa-solid fa-comment-dots"></i> <span>Response Settings</span></div>
                    <div class="ai-grid">
                        <div class="form-group">
                            <label class="form-label">Display Name <span class="text-sm">(e.g., Assistant)</span></label>
                            <input type="text" id="ai-display-name" class="form-input" placeholder="e.g., Assistant / Support AI">
                            <span class="field-hint">Used in system prompt as {{bot_name}}.</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Language</label>
                            <select id="ai-language" class="form-input">
                                <option value="auto">Auto Detect User Language</option>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="french">French</option>
                                <option value="german">German</option>
                                <option value="arabic">Arabic</option>
                                <option value="farsi">Farsi</option>
                                <option value="russian">Russian</option>
                            </select>
                            <span class="field-hint">Preferred language for responses.</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Reply Style</label>
                            <select id="ai-style" class="form-input">
                                <option value="friendly">Friendly</option>
                                <option value="professional">Professional</option>
                                <option value="casual">Casual</option>
                                <option value="formal">Formal</option>
                                <option value="funny">Funny</option>
                            </select>
                            <span class="field-hint">Tone of the AI.</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Reply Length</label>
                            <select id="ai-length" class="form-input">
                                <option value="very_short">Very Short (~1-2 lines)</option>
                                <option value="short">Short (~3-5 lines)</option>
                                <option value="medium" selected>Medium (~6-10 lines)</option>
                                <option value="detailed">Detailed (~10-20 lines)</option>
                                <option value="automatic">Automatic (AI decides)</option>
                            </select>
                            <span class="field-hint">Length of responses (recommended: Medium).</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Temperature <span class="text-sm">(0.0–2.0)</span></label>
                            <input type="number" id="ai-temperature" class="form-input" placeholder="0.7" step="0.1" min="0" max="2" value="0.7">
                            <span class="field-hint">Higher = more creative. Recommended: 0.7</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Max Tokens</label>
                            <input type="number" id="ai-max-tokens" class="form-input" placeholder="1024" step="1" min="1" value="1024">
                            <span class="field-hint">Maximum length of response. Recommended: 1024</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Top‑P</label>
                            <input type="number" id="ai-top-p" class="form-input" placeholder="1.0" step="0.1" min="0" max="1" value="1.0">
                            <span class="field-hint">Nucleus sampling. 1.0 = no filtering.</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Fallback Message</label>
                            <textarea id="ai-fallback" class="form-textarea" rows="3" style="resize:vertical;">Sorry, I am currently unavailable. Please try again later.</textarea>
                            <span class="field-hint">Shown when the AI API fails.</span>
                        </div>
                    </div>
                </div>

                <div class="ai-section">
                    <div class="ai-section-title"><i class="fa-solid fa-brain"></i> <span>Instructions &amp; Knowledge</span></div>

                    <div class="toggle-row" style="padding:0.6rem 0.9rem; margin-bottom:0.6rem;">
                        <div>
                            <div class="label" style="font-size:0.85rem;">Strict Knowledge Mode</div>
                            <div class="sub" style="font-size:0.72rem;">When enabled, AI will ONLY use your instructions and knowledge base — never web search or invent info.</div>
                        </div>
                        <div id="ai-strict-mode-toggle" class="toggle" onclick="toggleStrictMode()"><span class="slider"></span></div>
                    </div>
                    <div class="toggle-row" style="padding:0.6rem 0.9rem; margin-bottom:1rem;">
                        <div>
                            <div class="label" style="font-size:0.85rem;">RTL Support (Farsi)</div>
                            <div class="sub" style="font-size:0.72rem;">Adds U+200F before English letters at the start of paragraphs that are actually in Farsi.</div>
                        </div>
                        <div id="ai-rtl-toggle" class="toggle" onclick="toggleRtlSupport()"><span class="slider"></span></div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">System Prompt (Instructions)</label>
                        <textarea id="ai-system-prompt" class="form-textarea" rows="7" placeholder="You are a helpful assistant for {{company_name}}…"></textarea>
                        <span class="field-hint">Placeholders: <code>{{bot_name}}</code>, <code>{{user_first_name}}</code>, <code>{{owner_name}}</code>, <code>{{company_name}}</code>, <code>{{website}}</code>, <code>{{phone}}</code>, <code>{{current_time}}</code>, <code>{{available_commands}}</code>. HTML tags like <b>bold</b> are allowed.</span>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Preset Templates</label>
                        <select id="ai-template-preset" class="form-input" onchange="applyPromptTemplate()">
                            <option value="custom">Custom</option>
                            <option value="assistant">Personal Assistant</option>
                            <option value="support">Customer Support</option>
                            <option value="restaurant">Restaurant &amp; Food</option>
                            <option value="programming">Programming Helper</option>
                            <option value="school">Tutor &amp; Education</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Knowledge Bases</label>
                        <div id="knowledge-bases-container"></div>
                        <button onclick="addKnowledgeBase()" class="btn btn-gray btn-sm mt-2"><i class="fa-solid fa-plus"></i> <span>Add Knowledge Base</span></button>
                        <span class="field-hint">Each knowledge base can be toggled on/off. Only enabled ones are used. You can rename the label by clicking on it.</span>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Custom Variables (key=value per line)</label>
                        <textarea id="ai-custom-vars-text" class="form-textarea" rows="3" placeholder="owner_name=Mahan&#10;company_name=My Corp&#10;website=example.com"></textarea>
                        <span class="field-hint">One per line, e.g. <code>key=value</code>. Replaces <code>{{key}}</code> in prompts.</span>
                    </div>
                </div>

                <div class="ai-section">
                    <div class="ai-section-title"><i class="fa-solid fa-filter"></i> <span>Triggers &amp; Filters</span></div>

                    <div style="margin-bottom:1rem;">
                        <div class="ai-section-title" style="font-size:0.85rem; margin-bottom:0.5rem;"><i class="fa-solid fa-globe"></i> <span>General</span></div>
                        <div class="ai-grid">
                            <div class="form-group">
                                <label class="form-label">AI Trigger</label>
                                <select id="ai-trigger" class="form-input">
                                    <option value="no_command">Only when no command matches (recommended)</option>
                                    <option value="all_messages">Reply to every text message</option>
                                    <option value="contains_text">Trigger only when message contains specific text</option>
                                </select>
                                <span class="field-hint" id="trigger-hint"></span>
                            </div>
                            <div class="form-group" id="trigger-contains-group" style="display:none;">
                                <label class="form-label">Trigger Text</label>
                                <input type="text" id="ai-trigger-text" class="form-input" placeholder="e.g. 'help' or 'support'">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ignore Prefixes</label>
                                <input type="text" id="ai-ignore-prefixes" class="form-input" placeholder="/, !, #" value="/, !, #">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ignore Messages From Bots</label>
                                <select id="ai-ignore-bots" class="form-input">
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ignore Forwarded Messages</label>
                                <select id="ai-ignore-forwarded" class="form-input">
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style="margin-bottom:1rem;">
                        <div class="ai-section-title" style="font-size:0.85rem; margin-bottom:0.5rem;"><i class="fa-regular fa-comment"></i> <span>Private Chat Settings</span></div>
                        <div class="ai-grid">
                            <div class="form-group">
                                <label class="form-label">Reply in Private Chats</label>
                                <select id="ai-private-reply" class="form-input">
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Conversation Memory (private)</label>
                                <select id="ai-memory" class="form-input">
                                    <option value="0">Disabled</option>
                                    <option value="5">Last 5 messages</option>
                                    <option value="10">Last 10 messages</option>
                                    <option value="20">Last 20 messages</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style="margin-bottom:1rem;">
                        <div class="ai-section-title" style="font-size:0.85rem; margin-bottom:0.5rem;"><i class="fa-solid fa-users"></i> <span>Group Settings</span></div>
                        <div class="ai-grid">
                            <div class="form-group">
                                <label class="form-label">Reply in Groups / Supergroups</label>
                                <select id="ai-group-reply" class="form-input">
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Mention Required in Groups</label>
                                <select id="ai-group-mention" class="form-input">
                                    <option value="1">Yes (only when tagged/replied to)</option>
                                    <option value="0">No (reply to all group text)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Conversation Memory (groups)</label>
                                <select id="ai-group-memory" class="form-input">
                                    <option value="0">Disabled</option>
                                    <option value="5">Last 5 messages</option>
                                    <option value="10">Last 10 messages</option>
                                    <option value="20">Last 20 messages</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="ai-section-title" style="font-size:0.85rem; margin-bottom:0.5rem;"><i class="fa-solid fa-gauge-high"></i> <span>Performance</span></div>
                        <div class="ai-grid">
                            <div class="form-group">
                                <label class="form-label">Rate Limit (per user / minute)</label>
                                <input type="number" id="ai-rate-limit" class="form-input" placeholder="10" value="10" min="0">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Global Rate Limit (all users combined, 0 = off)</label>
                                <div class="flex" style="gap:0.4rem;">
                                    <input type="number" id="ai-global-rate-limit" class="form-input" placeholder="0 = disabled" value="0" min="0" style="flex:1;">
                                    <select id="ai-global-rate-window" class="form-input" style="flex:0 0 auto; width:auto;">
                                        <option value="minute">per minute</option>
                                        <option value="hour">per hour</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Response Delay (ms)</label>
                                <input type="number" id="ai-response-delay" class="form-input" placeholder="0" value="0" min="0" max="5000">
                            </div>
                            <div class="form-group">
                                <div class="toggle-row" style="padding:0.5rem 0.7rem;">
                                    <div>
                                        <div class="label" style="font-size:0.82rem;">Show Typing Indicator</div>
                                        <div class="sub" style="font-size:0.68rem;">Shows "typing..." while AI is generating a reply.</div>
                                    </div>
                                    <div id="ai-typing-toggle" class="toggle active" onclick="toggleTypingIndicator()"><span class="slider"></span></div>
                                </div>
                                <div class="toggle-row" style="padding:0.5rem 0.7rem; margin-top:0.4rem;">
                                    <div>
                                        <div class="label" style="font-size:0.82rem;">Retry Failed Request Once</div>
                                        <div class="sub" style="font-size:0.68rem;">Automatically retries once if the AI request fails.</div>
                                    </div>
                                    <div id="ai-retry-toggle" class="toggle" onclick="toggleRetryOnFailure()"><span class="slider"></span></div>
                                </div>
                                <div class="toggle-row" style="padding:0.5rem 0.7rem; margin-top:0.4rem;">
                                    <div>
                                        <div class="label" style="font-size:0.82rem;">Streaming Replies</div>
                                        <div class="sub" style="font-size:0.68rem;">ChatGPT-style live typing — the reply is progressively edited as the AI generates it.</div>
                                    </div>
                                    <div id="ai-streaming-toggle" class="toggle" onclick="toggleAiStreaming()"><span class="slider"></span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3" style="border-top:1px solid var(--border); padding-top:0.9rem;">
                        <div class="flex" id="memory-count-row">
                            <span style="font-weight:600;"><i class="fa-solid fa-memory"></i> <span>AI Memory Usage</span></span>
                            <span id="memory-count-display" class="text-sm">…</span>
                            <button onclick="refreshMemoryCount()" class="btn btn-gray btn-sm" id="memory-refresh-btn"><i class="fa-solid fa-rotate"></i> <span>Refresh</span></button>
                        </div>
                    </div>
                </div>

                <div class="ai-section">
                    <div class="ai-section-title"><i class="fa-solid fa-keyboard"></i> <span>Reply Keyboard Buttons</span></div>
                    <div class="toggle-row" style="padding:0.6rem 0.9rem;">
                        <div>
                            <span class="label" style="font-size:0.85rem;">Show reply keyboard after AI response</span>
                            <div class="sub" style="font-size:0.72rem;">Shows a one-time keyboard that disappears after user taps a button or closes it.</div>
                        </div>
                        <div id="ai-suggested-toggle" class="toggle" onclick="toggleSuggestedQuestions()"><span class="slider"></span></div>
                    </div>
                    <div id="suggested-questions-editor" style="margin-top:0.6rem;">
                        <div class="toggle-row" style="padding:0.4rem 0.7rem; margin-bottom:0.5rem;">
                            <span class="label" style="font-size:0.82rem;">One-time keyboard (disappears after use)</span>
                            <div id="ai-sq-onetime-toggle" class="toggle active" onclick="toggleSuggestedOneTime()"><span class="slider"></span></div>
                        </div>
                        <div class="flex" style="margin-bottom:0.5rem;">
                            <input id="suggested-q-label" class="form-input" style="flex:1; min-width:130px;" placeholder="Button label">
                            <input id="suggested-q-value" class="form-input" style="flex:1; min-width:130px;" placeholder="Value (text to send)">
                            <button onclick="addSuggestedQuestion()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div id="suggested-questions-list" class="panel" style="padding:0.5rem; min-height:30px;"></div>
                    </div>
                    <span class="field-hint mt-2">These appear as a reply keyboard. If one-time is enabled, it disappears after the user taps a button or closes the menu.</span>
                </div>

                <div class="ai-section">
                    <div class="ai-section-title"><i class="fa-solid fa-vial"></i> <span>Playground</span> <span class="sub">Test your AI configuration in real‑time</span></div>
                    <div class="playground-messages" id="playground-messages">
                        <div style="font-size:0.8rem; color:var(--text-3); text-align:center;">Playground started. Send a message below to test.</div>
                    </div>
                    <div class="flex" style="flex-wrap:nowrap;">
                        <input id="playground-input" class="form-input" placeholder="Type a message to test…" onkeydown="if(event.key==='Enter') sendPlaygroundMessage()">
                        <button onclick="sendPlaygroundMessage()" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i></button>
                        <button onclick="clearPlaygroundChat()" class="btn btn-gray" title="Clear"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>

                </div>

                <div class="ai-save-bar">
                    <button onclick="saveAiSettings()" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> <span>Save Settings</span></button>
                    <div class="more-options-wrapper" style="position:relative;">
                        <button onclick="toggleMoreOptions(event)" class="btn btn-gray btn-sm"><i class="fa-solid fa-ellipsis-vertical"></i> <span>More Options</span></button>
                        <div id="more-options-dropdown" class="dropdown-content" style="top:auto; bottom:calc(100% + 6px);">
                            <button onclick="exportAiSettings()"><i class="fa-solid fa-download"></i> <span>Export JSON</span></button>
                            <button onclick="triggerImportAiSettings()"><i class="fa-solid fa-upload"></i> <span>Import JSON</span></button>
                            <button onclick="clearAiMemory()"><i class="fa-solid fa-eraser"></i> <span>Clear Memory</span></button>
                            <button onclick="resetAiSettings()"><i class="fa-solid fa-rotate-left"></i> <span>Reset Defaults</span></button>
                        </div>
                    </div>
                    <input type="file" id="ai-import-file" style="display:none;" onchange="importAiSettings(event)">
                </div>
            </div>

            <!-- ============ SETTINGS TAB ============ -->
            <div id="tab-settings" class="tab-content">
                <h3 class="panel-title" style="margin-bottom:1rem;"><i class="fa-solid fa-gear"></i> <span>Bot Settings</span></h3>
                <div class="panel flex-col" style="gap:1.4rem;">
                    <div>
                        <label class="form-label">Bot Token</label>
                        <div class="input-with-btn">
                            <input type="password" id="settings-bot-token" class="form-input" style="font-family:var(--mono); font-size:0.8rem;" readonly>
                            <button onclick="toggleTokenVisibility()" class="btn btn-gray btn-sm" title="Show/Hide"><i class="fa-regular fa-eye"></i></button>
                            <button onclick="copyText('settings-bot-token')" class="btn btn-gray btn-sm" title="Copy"><i class="fa-regular fa-copy"></i></button>
                        </div>
                        <button onclick="showChangeTokenModal()" class="btn btn-primary btn-sm mt-2"><i class="fa-solid fa-key"></i> <span>Change Bot Token</span></button>
                        <p class="text-sm mt-2">💡 Get your token from <strong>@BotFather</strong> on Telegram.</p>
                    </div>
                    <div>
                        <label class="form-label">Webhook URL</label>
                        <div class="input-with-btn">
                            <input type="text" id="settings-webhook-url" class="form-input" style="font-size:0.8rem;" readonly>
                            <button onclick="copyText('settings-webhook-url')" class="btn btn-gray btn-sm" title="Copy"><i class="fa-regular fa-copy"></i></button>
                        </div>
                        <div class="flex" style="gap:0.5rem; flex-wrap:wrap;">
                            <button onclick="testWebhook()" class="btn btn-gray btn-sm mt-2"><i class="fa-solid fa-stethoscope"></i> <span>Test Webhook</span></button>
                            <button id="webhook-fix-btn" onclick="fixWebhook()" class="btn btn-primary btn-sm mt-2"><i class="fa-solid fa-heart-pulse"></i> <span>Health Check / Fix</span></button>
                        </div>
                        <div id="webhook-test-detail" class="text-sm mt-2" style="display:none;"></div>
                    </div>
                    <div>
                        <label class="form-label">Change Admin Password (D1)</label>
                        <div class="flex-col" style="gap:0.5rem; max-width:420px;">
                            <input type="password" id="change-pass-new" class="form-input" autocomplete="new-password" placeholder="New password">
                            <input type="password" id="change-pass-confirm" class="form-input" autocomplete="new-password" placeholder="Confirm new password">
                            <button onclick="changeAdminPassword()" class="btn btn-primary btn-sm"><i class="fa-solid fa-lock"></i> <span>Update Password</span></button>
                            <p class="text-sm mt-2">💡 If <strong>ADMIN_PASS</strong> environment variable is set, it takes priority over this.</p>
                        </div>
                    </div>
                    <div class="divider" style="margin:0;"></div>
                    <div>
                        <button onclick="factoryReset()" class="btn btn-danger"><i class="fa-solid fa-arrow-rotate-left"></i> <span>Factory Reset</span></button>
                        <p class="text-danger mt-2" style="font-size:0.78rem;">Erases all commands, users, settings, AI memory and bot info. The bot will be disconnected.</p>
                    </div>
                </div>
            </div>

            <!-- ============ CRON TAB ============ -->
            <div id="tab-cron" class="tab-content">
                <h3 class="panel-title" style="margin-bottom:1rem;"><i class="fa-solid fa-clock-rotate-left"></i> <span>Cron / Retention Manager</span></h3>
                <div class="panel flex-col" style="gap:1rem;">
                    <div class="toggle-row">
                        <span class="label">Automatic cleanup enabled</span>
                        <div id="cron-enabled-toggle" class="toggle" onclick="toggleCronEnabled()" role="switch" aria-checked="false"><span class="slider"></span></div>
                    </div>
                    <p class="text-sm" style="margin-top:-0.4rem;">💡 Requires a scheduled trigger in your <strong>wrangler.toml</strong> (<span style="font-family:var(--mono);">"triggers": { "crons": ["0 3 * * *"] }</span>). The dashboard below still works without it via “Run now”.</p>
                    <div class="divider" style="margin:0.2rem 0;"></div>
                    <div style="overflow-x:auto;">
                        <table style="width:100%; border-collapse:collapse; font-size:0.82rem;">
                            <thead><tr style="text-align:start; color:var(--text-3);">
                                <th style="padding:0.4rem 0.5rem; font-weight:500;">Data / feature</th>
                                <th style="padding:0.4rem 0.5rem; font-weight:500;">Delete older than</th>
                            </tr></thead>
                            <tbody id="cron-rows"></tbody>
                        </table>
                    </div>
                    <div class="flex" style="gap:0.5rem; flex-wrap:wrap;">
                        <button id="cron-save-btn" onclick="saveCronSettings()" class="btn btn-primary btn-sm"><i class="fa-solid fa-floppy-disk"></i> <span>Save Retention</span></button>
                        <button id="cron-run-btn" onclick="runCronNow()" class="btn btn-gray btn-sm"><i class="fa-solid fa-play"></i> <span>Run Now</span></button>
                    </div>
                    <div id="cron-last-run" class="text-sm" style="color:var(--text-3);"></div>
                </div>
            </div>

            <!-- ============ BOT INFO TAB ============ -->
            <div id="tab-botinfo" class="tab-content">
                <h3 class="panel-title" style="margin-bottom:1rem;"><i class="fa-solid fa-circle-info"></i> <span>Bot Information</span></h3>
                <div class="panel flex-col" style="gap:1rem;">
                    <div>
                        <label class="form-label">Bot Name</label>
                        <input id="bot-name" class="form-input" placeholder="My Awesome Bot">
                    </div>
                    <div>
                        <label class="form-label">Description</label>
                        <textarea id="bot-description" rows="6" class="form-textarea" placeholder="What your bot does…"></textarea>
                    </div>
                    <div>
                        <label class="form-label">Short Description</label>
                        <textarea id="bot-short-description" rows="4" class="form-textarea" rows="2" placeholder="Short summary…"></textarea>
                    </div>
                    <div class="flex">
                        <button onclick="loadBotInfo()" class="btn btn-gray"><i class="fa-solid fa-download"></i> <span>Load from Telegram</span></button>
                        <button onclick="publishBotInfo()" class="btn btn-success"><i class="fa-solid fa-cloud-arrow-up"></i> <span>Publish Info</span></button>
                    </div>
                    <div id="bot-info-result" class="hidden text-sm"></div>
                    <p class="text-sm">💡 To change the bot profile picture or other settings not available here, use <strong>@BotFather</strong>.</p>
                </div>
            </div>

            <!-- ============ BACKUP TAB ============ -->
            <div id="tab-backup" class="tab-content">
                <h3 class="panel-title" style="margin-bottom:1rem;"><i class="fa-solid fa-box-archive"></i> <span>Backup &amp; Restore</span></h3>
                <div class="panel flex-col" style="gap:1rem;">
                    <div class="toggle-row" style="justify-content:flex-start;">
                        <div>
                            <div class="label">Export everything</div>
                            <div class="sub">Downloads all commands, users, AI settings, menu entries and bot token config as a JSON file. Safe to keep anywhere.</div>
                        </div>
                    </div>
                    <div class="backup-actions">
                        <button onclick="exportBackup()" class="btn btn-success"><i class="fa-solid fa-download"></i> <span>Export Full Backup</span></button>
                        <button onclick="document.getElementById('custom-backup-modal').classList.remove('hidden')" class="btn btn-primary"><i class="fa-solid fa-sliders"></i> <span>Custom Backup</span></button>
                        <button onclick="document.getElementById('backup-import-file').click()" class="btn btn-gray"><i class="fa-solid fa-upload"></i> <span>Import Backup</span></button>
                    </div>
                    <input type="file" id="backup-import-file" style="display:none;" onchange="importBackup(event)">
                    <div id="backup-result" class="hidden text-sm"></div>
                    <hr class="divider">
                    <p class="text-sm">⚠️ Restoring overwrites your current commands, users, AI settings and menu. The admin password is kept unless the backup contains one.</p>
                </div>
            </div>

            <!-- ============ LOGS TAB (#22) ============ -->
            <div id="tab-logs" class="tab-content">
                <div class="flex justify-between items-center" style="margin-bottom:1rem;">
                    <h3 class="panel-title"><i class="fa-solid fa-clipboard-list"></i> <span>Audit Logs</span></h3>
                    <div class="flex">
                        <button onclick="loadAuditLogs()" class="btn btn-gray btn-sm"><i class="fa-solid fa-rotate"></i> <span>Refresh</span></button>
                        <button onclick="clearAuditLogs()" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i> <span>Clear</span></button>
                    </div>
                </div>
                <p class="text-sm" style="margin-bottom:0.9rem;">Recent administrative events: logins, role changes, blocks, broadcasts, token updates and resets.</p>
                <div class="table-wrap">
                    <table class="users-table">
                        <thead><tr><th>Time</th><th>User</th><th>Action</th></tr></thead>
                        <tbody id="audit-logs-body">
                            <tr><td colspan="3" class="empty-state">Loading…</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- ============ UPDATE TAB ============ -->
            <div id="tab-update" class="tab-content">
                <h3 class="panel-title" style="margin-bottom:1rem;"><i class="fa-solid fa-cloud-upload-alt"></i> <span>Self‑Update</span></h3>
                <div class="panel flex-col" style="gap:1.2rem;">
                    <div class="ai-grid">
                        <div>
                            <label class="form-label">Current Version</label>
                            <input id="update-current-version" class="form-input" readonly value="${VERSION}">
                        </div>
                        <div>
                            <label class="form-label">Latest Version</label>
                            <div class="input-with-btn">
                                <input id="update-latest-version" class="form-input" readonly placeholder="Click 'Check for updates'">
                                <button onclick="checkForUpdate(true)" class="btn btn-gray btn-sm"><i class="fa-solid fa-rotate"></i></button>
                            </div>
                            <div id="update-version-details" class="field-hint"></div>
                        </div>
                    </div>
                    <hr class="divider" style="margin:0;">
                    <div id="update-cf-section">
                        <label class="form-label">Cloudflare API Token</label>
                        <div class="input-with-btn">
                            <input type="password" id="update-cf-token" class="form-input" autocomplete="off" placeholder="Your Cloudflare API token (Workers Scripts:Edit)">
                            <button onclick="openTokenGenerator()" class="btn btn-gray btn-sm"><i class="fa-solid fa-key"></i> <span>Auto‑Generate</span></button>
                        </div>
                        <div id="update-validation-result" class="hidden mt-2 text-sm"></div>
                    </div>
                    <button id="update-btn" class="btn btn-success" disabled><i class="fa-solid fa-cloud-arrow-up"></i> <span>Update to Latest</span></button>
                    <div id="update-status" class="hidden text-sm"></div>
                    <p class="text-sm">💡 The update fetches the latest version from GitHub and deploys it to your Cloudflare Worker, preserving all bindings (D1, secrets, etc.).</p>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div>
            <span>Built with ❤️ by</span> <span class="brand">@Mahan07dev</span>
            <br><br>
            <a href="https://github.com/Mahan07dev" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a>
            <a href="https://t.me/nyxx_official_channel" target="_blank" rel="noopener"><i class="fa-brands fa-telegram"></i> Telegram</a>
            <span style="margin:0 0.5rem;">|</span>
            <span style="color:var(--text-3);">v${VERSION}</span>
        </div>
    </footer>

    <!-- ============ COMMAND MODAL ============ -->
    <div id="command-modal" class="modal-overlay hidden">
        <div class="modal-box">
            <div class="modal-title">
                <span id="command-modal-title">Add Command</span>
                <span style="display:flex; align-items:center; gap:0.5rem;">
                    <span id="enabled-toggle-icon" class="enabled-toggle on" onclick="toggleEnabledIcon()" title="Enabled"><i class="fa-regular fa-circle-check"></i></span>
                    <button class="modal-close-x" onclick="closeCommandModal()"><i class="fa-solid fa-xmark"></i></button>
                </span>
            </div>
            <div class="modal-scroll">
                <div class="form-group">
                    <label class="form-label">Command (e.g., /start)</label>
                    <input id="modal-command" class="form-input" placeholder="/command">
                </div>
                <div class="form-group">
                    <label class="form-label">Parent (optional)</label>
                    <select id="modal-parent" class="form-input"><option value=""></option></select>
                </div>
                <div class="form-group">
                    <label class="form-label">Response Type</label>
                    <select id="modal-type" class="form-input" onchange="toggleMediaField()">
                        <option value="text">Text</option>
                        <option value="photo">Photo</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Content</label>
                    <textarea id="modal-content" class="form-textarea" rows="3" placeholder="Response text…"></textarea>
                </div>
                <div class="form-group" id="media-field" style="display:none;">
                    <label class="form-label">Photo URL</label>
                    <input id="modal-media" class="form-input" placeholder="https://example.com/image.jpg">
                    <span class="field-hint">Public image URL. Send photo + caption via Telegram.</span>
                </div>

                <div class="toggle-row" style="padding:0.6rem 0.9rem; margin-bottom:0.9rem;">
                    <span class="label" style="font-size:0.85rem;">Inline Keyboard</span>
                    <div id="inline-toggle" class="toggle" onclick="toggleInlineKeyboard()"><span class="slider"></span></div>
                </div>
                <div id="inline-keyboard-section" class="hidden" style="margin-bottom:1rem;">
                    <div class="flex" style="margin-bottom:0.5rem;">
                        <input id="kbCmd-inline-label" class="form-input" style="flex:1.2; min-width:110px;" placeholder="Label">
                        <select id="kbCmd-inline-type" class="form-input" style="flex:0 0 auto; width:auto;" onchange="kbInlineTypeToggle('kbCmd')">
                            <option value="command" selected>Command</option>
                            <option value="callback">Callback</option>
                            <option value="url">URL</option>
                        </select>
                        <select id="kbCmd-inline-cmd" class="form-input" style="flex:1; min-width:140px;"><option value="">Select command…</option></select>
                        <input id="kbCmd-inline-value" class="form-input hidden" style="flex:1; min-width:140px;" placeholder="Value / URL">
                        <button onclick="kbCmd.inlineAdd()" class="btn btn-primary btn-sm" title="Add button"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div id="kbCmd-inline-list" class="panel" style="padding:0.5rem; min-height:30px;"></div>
                    <span class="field-hint">Command runs a bot command · Callback sends the value to your AI · URL opens a link. Up to 3 buttons share a row, then a new row starts.</span>
                </div>

                <div class="toggle-row" style="padding:0.6rem 0.9rem; margin-bottom:0.9rem;">
                    <span class="label" style="font-size:0.85rem;">Reply Keyboard</span>
                    <div id="reply-toggle" class="toggle" onclick="toggleReplyKeyboard()"><span class="slider"></span></div>
                </div>
                <div id="reply-keyboard-section" class="hidden" style="margin-bottom:0.9rem;">
                    <div class="flex" style="margin-bottom:0.5rem;">
                        <input id="kbCmd-reply-label" class="form-input" style="flex:1.2; min-width:110px;" placeholder="Button text">
                        <select id="kbCmd-reply-cmd" class="form-input" style="flex:1; min-width:140px;"><option value="">Run command… (optional)</option></select>
                        <input id="kbCmd-reply-value" class="form-input" style="flex:1; min-width:120px;" placeholder="Or custom command (e.g. /menu)">
                        <button onclick="kbCmd.replyAdd()" class="btn btn-primary btn-sm" title="Add button"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div id="kbCmd-reply-list" class="panel" style="padding:0.5rem; min-height:30px;"></div>
                    <div id="kbCmd-reply-preview" class="kb-preview"></div>
                    <div class="flex" style="gap:1rem; margin-top:0.5rem; flex-wrap:wrap; font-size:0.78rem; color:var(--text-2);">
                        <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer;"><input type="checkbox" id="kbCmd-reply-resize" checked> Resize keyboard</label>
                        <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer;"><input type="checkbox" id="kbCmd-reply-onetime"> One-time</label>
                        <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer;"><input type="checkbox" id="kbCmd-reply-persistent" checked> Always visible</label>
                        <input id="kbCmd-reply-placeholder" class="form-input" style="flex:1; min-width:130px; font-size:0.75rem;" placeholder="Input placeholder (optional)" oninput="kbSettingChanged('kbCmd')">
                    </div>
                    <span class="field-hint">A “Back” button is added automatically for sub‑commands. Text-only buttons still work as a menu.</span>
                </div>

                <div class="form-group">
                    <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; cursor:pointer;">
                        <input type="checkbox" id="modal-admin-only"> <span>Admin only</span>
                    </label>
                    <span class="field-hint">Only users promoted to Admin in the Users tab can run this command.</span>
                </div>
                <div id="modal-error" class="modal-error"></div>
            </div>
            <div class="modal-actions">
                <button onclick="closeCommandModal()" class="btn btn-gray"><span>Cancel</span></button>
                <button id="modal-save-btn" onclick="saveCommand()" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> <span>Save</span></button>
            </div>
        </div>
    </div>

    <!-- ============ TOKEN MODAL ============ -->
    <div id="token-modal" class="modal-overlay hidden">
        <div class="modal-box">
            <div class="modal-title"><span>Update Bot Token</span><button class="modal-close-x" onclick="closeTokenModal()"><i class="fa-solid fa-xmark"></i></button></div>
            <p class="text-sm">Paste your new Telegram bot token. The webhook will be updated automatically.</p>
            <div class="form-group">
                <label class="form-label">Bot Token</label>
                <input id="new-token-input" class="form-input" placeholder="Get your token from @BotFather">
            </div>
            <div id="token-test-result" class="hidden text-sm mt-2"></div>
            <div class="modal-actions">
                <button onclick="closeTokenModal()" class="btn btn-gray"><span>Cancel</span></button>
                <button onclick="updateBotToken()" class="btn btn-success"><i class="fa-solid fa-key"></i> <span>Update</span></button>
            </div>
        </div>
    </div>

    <!-- ============ INFO MODAL ============ -->
    <div id="info-modal" class="modal-overlay hidden">
        <div class="modal-box" style="max-width:480px;">
            <div class="modal-title"><span>About Nyxx</span><button class="modal-close-x" onclick="document.getElementById('info-modal').classList.add('hidden')"><i class="fa-solid fa-xmark"></i></button></div>
            <p><strong>Nyxx</strong> is a full-featured Telegram bot builder running on Cloudflare Workers.</p>
            <p>Built with ❤️ by <a href="https://github.com/Mahan07dev" target="_blank" rel="noopener">@Mahan07dev</a></p>
            <p>Version ${VERSION}</p>
            <a href="https://github.com/Mahan07dev/Nyxx" target="_blank" rel="noopener" class="btn btn-gray btn-block"><i class="fa-brands fa-github"></i> <span>Source Code</span></a>
            <div class="modal-actions">
                <button onclick="document.getElementById('info-modal').classList.add('hidden')" class="btn btn-primary btn-block"><span>Close</span></button>
            </div>
        </div>
    </div>

    <!-- ============ CONFIRM MODAL ============ -->
    <div id="confirm-modal" class="modal-overlay hidden">
        <div class="modal-box" style="max-width:440px;">
            <div class="modal-title"><i class="fa-solid fa-triangle-exclamation" style="color:var(--amber);"></i> <span>Are you sure?</span></div>
            <p id="confirm-message" style="margin:0 0 0.5rem; color:var(--text-2);"></p>
            <div class="modal-actions">
                <button id="confirm-cancel" class="btn btn-gray"><span>Cancel</span></button>
                <button id="confirm-ok" class="btn btn-danger"><span>Confirm</span></button>
            </div>
        </div>
    </div>

    <!-- ============ CUSTOM BACKUP MODAL ============ -->
    <div id="custom-backup-modal" class="modal-overlay hidden">
        <div class="modal-box" style="max-width:560px;">
            <div class="modal-title">
                <span><i class="fa-solid fa-sliders"></i> Custom Backup</span>
                <button class="modal-close-x" onclick="document.getElementById('custom-backup-modal').classList.add('hidden')"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-scroll">
                <p class="text-sm" style="margin-bottom:0.8rem;">Choose what to include in your backup. Uncheck items you don't need.</p>
                <div style="margin-bottom:0.6rem; display:flex; gap:0.5rem;">
                    <button class="btn btn-gray btn-sm" onclick="customBackupCheckAll(true)">Check All</button>
                    <button class="btn btn-gray btn-sm" onclick="customBackupCheckAll(false)">Uncheck All</button>
                </div>
                <div id="custom-backup-items">
                    <label style="display:flex; align-items:center; gap:0.6rem; padding:0.5rem 0; border-bottom:1px dashed var(--border); font-size:0.9rem; cursor:pointer;">
                        <input type="checkbox" class="custom-backup-cb" value="commands" checked style="accent-color:var(--primary);"> <i class="fa-solid fa-terminal" style="color:var(--primary); width:20px;"></i> <span>Commands</span>
                        <span class="field-hint" style="margin-inline-start:auto;">Bot commands &amp; responses</span>
                    </label>
                    <label style="display:flex; align-items:center; gap:0.6rem; padding:0.5rem 0; border-bottom:1px dashed var(--border); font-size:0.9rem; cursor:pointer;">
                        <input type="checkbox" class="custom-backup-cb" value="users" checked style="accent-color:var(--primary);"> <i class="fa-solid fa-users" style="color:var(--accent); width:20px;"></i> <span>Users</span>
                        <span class="field-hint" style="margin-inline-start:auto;">User profiles &amp; roles</span>
                    </label>
                    <label style="display:flex; align-items:center; gap:0.6rem; padding:0.5rem 0; border-bottom:1px dashed var(--border); font-size:0.9rem; cursor:pointer;">
                        <input type="checkbox" class="custom-backup-cb" value="ai_messages" checked style="accent-color:var(--primary);"> <i class="fa-solid fa-brain" style="color:var(--green); width:20px;"></i> <span>AI Memory</span>
                        <span class="field-hint" style="margin-inline-start:auto;">Conversation history</span>
                    </label>
                    <label style="display:flex; align-items:center; gap:0.6rem; padding:0.5rem 0; border-bottom:1px dashed var(--border); font-size:0.9rem; cursor:pointer;">
                        <input type="checkbox" class="custom-backup-cb" value="ai_settings" checked style="accent-color:var(--primary);"> <i class="fa-solid fa-robot" style="color:var(--amber); width:20px;"></i> <span>AI Settings</span>
                        <span class="field-hint" style="margin-inline-start:auto;">AI config, providers, prompts</span>
                    </label>
                    <label style="display:flex; align-items:center; gap:0.6rem; padding:0.5rem 0; border-bottom:1px dashed var(--border); font-size:0.9rem; cursor:pointer;">
                        <input type="checkbox" class="custom-backup-cb" value="menu_commands" checked style="accent-color:var(--primary);"> <i class="fa-solid fa-bars" style="color:var(--text-2); width:20px;"></i> <span>Menu Commands</span>
                        <span class="field-hint" style="margin-inline-start:auto;">Telegram bot menu</span>
                    </label>
                    <label style="display:flex; align-items:center; gap:0.6rem; padding:0.5rem 0; border-bottom:1px dashed var(--border); font-size:0.9rem; cursor:pointer;">
                        <input type="checkbox" class="custom-backup-cb" value="bot_config" checked style="accent-color:var(--primary);"> <i class="fa-solid fa-key" style="color:var(--red); width:20px;"></i> <span>Bot Token &amp; Webhook</span>
                        <span class="field-hint" style="margin-inline-start:auto;">Telegram connection</span>
                    </label>
                    <label style="display:flex; align-items:center; gap:0.6rem; padding:0.5rem 0; font-size:0.9rem; cursor:pointer;">
                        <input type="checkbox" class="custom-backup-cb" value="blocked_users" checked style="accent-color:var(--primary);"> <i class="fa-solid fa-ban" style="color:var(--red); width:20px;"></i> <span>Blocked Users</span>
                        <span class="field-hint" style="margin-inline-start:auto;">Block list</span>
                    </label>
                </div>
                <div class="field-hint" style="margin-top:0.5rem;">\u26a0\ufe0f Bot token and webhook secret are included for convenience. Keep the backup file safe.</div>
            </div>
            <div class="modal-actions">
                <button onclick="document.getElementById('custom-backup-modal').classList.add('hidden')" class="btn btn-gray"><span>Cancel</span></button>
                <button onclick="exportCustomBackup()" class="btn btn-success"><i class="fa-solid fa-download"></i> <span>Export Selected</span></button>
            </div>
        </div>
    </div>

    <div id="toast-container" class="toast-container"></div>

    <script>
    // ======================================================================
    // CORE HELPERS
    // ======================================================================
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-menu') && !e.target.closest('#more-options-dropdown') && !e.target.closest('.ai-save-bar .more-options-wrapper')) {
            const dd = document.getElementById('more-options-dropdown');
            if (dd) dd.classList.remove('show');
        }
    });

    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    async function copyText(inputId) {
        const el = document.getElementById(inputId);
        if (!el || !el.value) return;
        try {
            await navigator.clipboard.writeText(el.value);
        } catch (e) {
            el.select();
            document.execCommand('copy');
        }
        showToast('Copied!', 'info');
    }

    // ======================================================================
    // GLOBAL STATE
    // ======================================================================
    let editingCommand = null;
    let commandsCache = [];
    let inlineButtonsArray = [];
    let replyButtonsArray = [];
    let showReplyKeyboard = false;
    let showInlineKeyboard = false;
    let currentParent = null;
    let pathSegments = [];
    let childrenMap = {};
    let menuCommands = [];
    let commandEnabled = true;
    let aiEnabled = false;
    let showSuggestedQuestions = false;
    let showSuggestedOneTime = true;
    let playgroundHistory = [];
    let latestVersion = null;
    let updateAvailable = false;
    let workerUrl = null;
    let updateChecked = false;
    let updateCheckTimestamp = 0;
    const UPDATE_COOLDOWN_MS = 30 * 60 * 1000;
    let currentTab = 'overview';
    let knowledgeBases = [];
    let suggestedQuestions = [];
    let tokenVisible = false;

    // ----- CACHE -----
    const CACHE_TTL = 60000;
    const cache = {
        commands: { data: null, loaded: false, timestamp: 0 },
        menu: { data: null, loaded: false, timestamp: 0 },
        users: { data: null, loaded: false, timestamp: 0 },
        ai: { data: null, loaded: false, timestamp: 0 },
        settings: { data: null, loaded: false, timestamp: 0 },
        botinfo: { data: null, loaded: false, timestamp: 0 },
    };

    function isCacheValid(key) {
        const entry = cache[key];
        return entry.loaded && (Date.now() - entry.timestamp < CACHE_TTL);
    }

    function invalidateCache(key) {
        if (key) {
            cache[key].loaded = false; cache[key].data = null; cache[key].timestamp = 0;
        } else {
            Object.keys(cache).forEach(k => { cache[k].loaded = false; cache[k].data = null; cache[k].timestamp = 0; });
        }
    }

    // ----- Inline loading helpers -----
    function showInlineSpinner(container) {
        if (!container) return null;
        const spinner = document.createElement('div');
        spinner.className = 'inline-spinner';
        spinner.innerHTML = '<div class="loading-spinner"></div>';
        container.innerHTML = '';
        container.appendChild(spinner);
        return spinner;
    }
    // Legacy compatibility — these now do nothing (no global overlay)
    function showLoading() {}
    function hideLoading() {}
    function withLoading(promise) { return Promise.resolve(promise); }

    // ----- Compact inline spinner (for inline status labels) -----
    function showInlineSpinnerCompact(container) {
        if (!container) return;
        const spinner = document.createElement('div');
        spinner.className = 'inline-spinner-compact';
        spinner.innerHTML = '<div class="loading-spinner"></div>';
        container.innerHTML = '';
        container.appendChild(spinner);
    }

    // ----- Skeleton loaders per section -----
    function showOverviewSkeleton() {
        const statsEl = document.getElementById('overview-stats');
        const listEl = document.getElementById('overview-checklist');
        const errEl = document.getElementById('overview-error');
        if (errEl) errEl.style.display = 'none';
        if (statsEl) statsEl.innerHTML =
            '<div class="skl-stat-card"><div class="skl-stat-icon skl-bg"></div><div class="skl-stat-value skl-bg"></div><div class="skl-stat-label skl-bg"></div></div>' +
            '<div class="skl-stat-card"><div class="skl-stat-icon skl-bg"></div><div class="skl-stat-value skl-bg"></div><div class="skl-stat-label skl-bg"></div></div>' +
            '<div class="skl-stat-card"><div class="skl-stat-icon skl-bg"></div><div class="skl-stat-value skl-bg"></div><div class="skl-stat-label skl-bg"></div></div>' +
            '<div class="skl-stat-card"><div class="skl-stat-icon skl-bg"></div><div class="skl-stat-value skl-bg"></div><div class="skl-stat-label skl-bg"></div></div>';
        if (listEl) listEl.innerHTML =
            '<li class="skl-check-item"><span class="skl-check-icon skl-circle"></span><span class="skl-check-text skl-block"></span></li>' +
            '<li class="skl-check-item"><span class="skl-check-icon skl-circle"></span><span class="skl-check-text skl-block"></span></li>' +
            '<li class="skl-check-item"><span class="skl-check-icon skl-circle"></span><span class="skl-check-text skl-block"></span></li>';
    }
    function showCommandsSkeleton() {
        const el = document.getElementById('commands-list');
        if (!el) return;
        let h = '';
        for (let i = 0; i < 6; i++) {
            h += '<div class="skl-file-row"><div class="skl-file-icon skl-bg"></div><div class="skl-file-name skl-bg"></div><div class="skl-file-badge skl-bg"></div><div class="skl-file-badge skl-bg"></div></div>';
        }
        el.innerHTML = h;
    }
    function showMenuSkeleton() {
        const el = document.getElementById('menu-commands-container');
        if (!el) return;
        let h = '';
        for (let i = 0; i < 4; i++) {
            h += '<div class="skl-menu-row"><div class="skl-menu-input skl-bg"></div><div class="skl-menu-input skl-bg"></div><div class="skl-menu-del skl-bg"></div></div>';
        }
        el.innerHTML = h;
    }
    function showUsersSkeleton() {
        const el = document.getElementById('users-list');
        if (!el) return;
        el.innerHTML = '<div class="skl-table-row"><div class="skl-btn skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div></div>' +
            '<div class="skl-table-row"><div class="skl-btn skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div></div>' +
            '<div class="skl-table-row"><div class="skl-btn skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div><div class="skl-block skl-bg"></div></div>';
    }
    function showAiSettingsSkeleton() {
        var el = document.getElementById('ai-settings-content');
        if (!el) return;
        el.classList.add('loading-overlay');
    }
    function hideAiSettingsSkeleton() {
        var el = document.getElementById('ai-settings-content');
        if (!el) return;
        el.classList.remove('loading-overlay');
    }
    function showSettingsSkeleton() {
        const panel = document.querySelector('#tab-settings .panel');
        if (!panel) return;
        let existing = document.getElementById('settings-skeleton');
        if (existing) existing.remove();
        const skeleton = document.createElement('div');
        skeleton.id = 'settings-skeleton';
        skeleton.innerHTML =
            '<div class="skl-form-row"><div class="skl-label skl-bg"></div><div class="skl-input"></div></div>' +
            '<div class="skl-form-row"><div class="skl-label skl-bg"></div><div class="skl-input"></div></div>';
        panel.appendChild(skeleton);
    }
    function showBotInfoSkeleton() {
        const inputs = [
            document.getElementById('bot-name'),
            document.getElementById('bot-description'),
            document.getElementById('bot-short-description')
        ];
        inputs.forEach(el => {
            if (!el) return;
            if (el.tagName === 'TEXTAREA') {
                el.setAttribute('data-skeleton', 'true');
                el.outerHTML = '<div id="' + el.id + '" class="skl-textarea" data-skeleton="true"></div>';
            } else {
                el.outerHTML = '<div id="' + el.id + '" class="skl-input" data-skeleton="true" style="margin-bottom:1.1rem;"></div>';
            }
        });
    }

    // ----- Toast -----
    function showToast(message, type) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast ' + (type || 'success');
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .3s'; }, 4400);
        setTimeout(() => toast.remove(), 4800);
    }

    // ----- Button loading states -----
    // Turn any button into a spinner for the duration of a promise. Visual
    // style is contextual: full-block buttons get a centered spinner, small
    // icon-only buttons get busy dots.
    function withButtonLoading(btn, promise) {
        if (!btn) return promise;
        if (btn.dataset.busy === '1') return promise;
        btn.dataset.busy = '1';
        const inner = btn.innerHTML;
        const spinner = '<span class="btn-spinner"><span class="mini-spinner"></span></span>';
        const dots = '<span class="btn-spinner busy-dots"><span></span><span></span><span></span></span>';
        btn.classList.add('loading');
        btn.innerHTML = inner + (btn.classList.contains('btn-sm') || btn.querySelectorAll('span').length === 0 ? dots : spinner);
        const done = () => { btn.classList.remove('loading'); btn.innerHTML = inner; delete btn.dataset.busy; };
        Promise.resolve(promise).finally(done);
        return promise;
    }
    // In-place busy hint inside a status/detail element (no spinner swap).
    function busyDotsHtml() { return '<span class="busy-dots"><span></span><span></span><span></span></span>'; }

    // ======================================================================
    // SHARED KEYBOARD BUILDER
    // ======================================================================
    // One component powers the Commands modal, the Users panel and the
    // Broadcast tab. Each instance keeps its own state:
    //   inline: [[{text,type:'command'|'callback'|'url',value}]]  (rows × buttons)
    //   reply:  { rows: [['Text']], actions: {'Text': '/command'}, resize, one_time, persistent, placeholder }
    // Output format is the v2 JSON understood by the worker:
    //   { v:2, inline:[[btn]], reply:{ rows, actions, resize, one_time, persistent, placeholder } }
    // Stored per command in buttons_json / reply_keyboard_json respectively.
    function createKeyboardBuilder(prefix, opts) {
        opts = opts || {};
        const allowReply = opts.reply !== false;
        const commands = () => (typeof commandsCache !== 'undefined' && Array.isArray(commandsCache)) ? commandsCache : [];
        let inline = [];
        let reply = { rows: [], actions: {}, resize: true, one_time: false, persistent: true, placeholder: '' };

        const el = (id) => document.getElementById(prefix + '-' + id);
        const esc = (s) => escapeHtml(String(s === undefined || s === null ? '' : s));

        function render() {
            renderInline();
            if (allowReply) renderReply();
        }

        // ---------- inline ----------
        function renderInline() {
            const box = el('inline-list');
            if (!box) return;
            if (!inline.length) {
                box.innerHTML = '<div class="empty-state" style="padding:0.5rem;"><i class="fa-regular fa-keyboard"></i> No inline buttons yet.</div>';
                return;
            }
            const typeLabel = { command: 'Command', callback: 'Callback', url: 'URL' };
            let html = '<div class="kb-grid">';
            inline.forEach(function(row, ri) {
                html += '<div class="kb-row-chips" data-row="' + ri + '">';
                html += '<span class="kb-row-head">Row ' + (ri + 1) + '</span>';
                row.forEach(function(b, bi) {
                    const icon = b.type === 'url' ? 'fa-link' : (b.type === 'command' ? 'fa-terminal' : 'fa-message');
                    html += '<span class="kb-chip">' +
                        '<i class="fa-solid ' + icon + '" style="color:var(--accent);font-size:0.72rem;"></i>' +
                        '<span class="chip-label">' + esc(b.text) + '</span>' +
                        '<span class="chip-badge">' + (typeLabel[b.type] || b.type) + (b.value ? ' · ' + esc(b.value.length > 18 ? b.value.slice(0, 18) + '…' : b.value) : '') + '</span>' +
                        '<button class="kb-arrow" title="Move left" onclick="' + prefix + 'KbInlineMove(' + ri + ',' + bi + ',-1)"' + (bi === 0 ? ' disabled' : '') + '><i class="fa-solid fa-angles-left"></i></button>' +
                        '<button class="kb-arrow" title="Move right" onclick="' + prefix + 'KbInlineMove(' + ri + ',' + bi + ',1)"' + (bi === row.length - 1 ? ' disabled' : '') + '><i class="fa-solid fa-angles-right"></i></button>' +
                        '<button class="kb-arrow" title="Move up" onclick="' + prefix + 'KbInlineRowMove(' + ri + ',-1)"' + (ri === 0 ? ' disabled' : '') + '><i class="fa-solid fa-chevron-up"></i></button>' +
                        '<button class="kb-arrow" title="Move down" onclick="' + prefix + 'KbInlineRowMove(' + ri + ',1)"' + (ri === inline.length - 1 ? ' disabled' : '') + '><i class="fa-solid fa-chevron-down"></i></button>' +
                        '<button class="kb-arrow chip-delete" title="Remove" onclick="' + prefix + 'KbInlineRemove(' + ri + ',' + bi + ')"><i class="fa-regular fa-circle-xmark"></i></button>' +
                        '</span>';
                });
                html += '</div>';
            });
            html += '</div>';
            box.innerHTML = html;
        }

        function inlineAdd() {
            const label = el('inline-label').value.trim();
            const type = el('inline-type').value;
            const cmdSel = el('inline-cmd');
            const valueInput = el('inline-value');
            let value = type === 'command' ? (cmdSel ? cmdSel.value.trim() : '') : valueInput.value.trim();
            if (!label) { showToast('Enter a button label.', 'error'); return; }
            if (!value) { showToast(type === 'command' ? 'Select a command.' : (type === 'url' ? 'Enter the URL.' : 'Enter callback data.'), 'error'); return; }
            if (type === 'command' && !value.startsWith('/')) value = '/' + value.replace(/^\\/+/, '');
            // Add into the last row while it has fewer than 3 buttons,
            // otherwise start a fresh row — matches Telegram's visual rhythm.
            let last = inline.length ? inline[inline.length - 1] : null;
            if (!last || last.length >= (opts.maxPerRow || 3)) { last = []; inline.push(last); }
            last.push({ text: label, type: type, value: value });
            el('inline-label').value = '';
            valueInput.value = '';
            if (cmdSel) cmdSel.value = '';
            render();
        }

        function inlineMove(ri, bi, dir) {
            const row = inline[ri];
            if (!row) return;
            const ni = bi + dir;
            if (ni < 0 || ni >= row.length) return;
            const item = row.splice(bi, 1)[0];
            row.splice(ni, 0, item);
            render();
        }

        function inlineRowMove(ri, dir) {
            const ni = ri + dir;
            if (ni < 0 || ni >= inline.length) return;
            const r = inline.splice(ri, 1)[0];
            inline.splice(ni, 0, r);
            render();
        }

        function inlineRemove(ri, bi) {
            const row = inline[ri];
            if (!row) return;
            row.splice(bi, 1);
            if (!row.length) inline.splice(ri, 1);
            render();
        }

        // ---------- reply ----------
        function renderReply() {
            const box = el('reply-list');
            if (!box) return;
            if (!reply.rows.length) {
                box.innerHTML = '<div class="empty-state" style="padding:0.5rem;"><i class="fa-regular fa-keyboard"></i> No reply buttons yet.</div>';
            } else {
                let html = '<div class="kb-grid">';
                reply.rows.forEach(function(row, ri) {
                    html += '<div class="kb-row-chips" data-row="' + ri + '">';
                    html += '<span class="kb-row-head">Row ' + (ri + 1) + '</span>';
                    row.forEach(function(text, bi) {
                        const action = reply.actions[text];
                        html += '<span class="kb-chip">' +
                            '<i class="fa-regular fa-keyboard" style="color:var(--accent);font-size:0.72rem;"></i>' +
                            '<span class="chip-label">' + esc(text) + '</span>' +
                            (action ? '<span class="chip-badge" style="cursor:pointer;" title="Click to change the command" onclick=\"' + prefix + 'KbReplySetAction(' + ri + ',' + bi + ')\">' + esc(action) + '</span>' : '<span class="chip-badge" style="cursor:pointer;opacity:0.65;" title="Click to attach a command" onclick=\"' + prefix + 'KbReplySetAction(' + ri + ',' + bi + ')\">no action</span>') +
                            '<button class="kb-arrow" title="Move left" onclick="' + prefix + 'KbReplyMove(' + ri + ',' + bi + ',-1)"' + (bi === 0 ? ' disabled' : '') + '><i class="fa-solid fa-angles-left"></i></button>' +
                            '<button class="kb-arrow" title="Move right" onclick="' + prefix + 'KbReplyMove(' + ri + ',' + bi + ',1)"' + (bi === row.length - 1 ? ' disabled' : '') + '><i class="fa-solid fa-angles-right"></i></button>' +
                            '<button class="kb-arrow" title="Move up" onclick="' + prefix + 'KbReplyRowMove(' + ri + ',-1)"' + (ri === 0 ? ' disabled' : '') + '><i class="fa-solid fa-chevron-up"></i></button>' +
                            '<button class="kb-arrow" title="Move down" onclick="' + prefix + 'KbReplyRowMove(' + ri + ',1)"' + (ri === reply.rows.length - 1 ? ' disabled' : '') + '><i class="fa-solid fa-chevron-down"></i></button>' +
                            '<button class="kb-arrow chip-delete" title="Remove" onclick="' + prefix + 'KbReplyRemove(' + ri + ',' + bi + ')"><i class="fa-regular fa-circle-xmark"></i></button>' +
                            '</span>';
                    });
                    html += '</div>';
                });
                html += '</div>';
                box.innerHTML = html;
            }
            renderReplyPreview();
        }

        function renderReplyPreview() {
            const pv = el('reply-preview');
            if (!pv) return;
            if (!reply.rows.length) { pv.innerHTML = ''; return; }
            let html = '';
            reply.rows.forEach(function(row) {
                html += '<div class="kb-preview-row">' + row.map(function(t) {
                    const action = reply.actions[t];
                    return '<span class="kb-preview-btn' + (action ? ' kb-pv-command' : '') + '">' + esc(t) + '</span>';
                }).join('') + '</div>';
            });
            pv.innerHTML = html;
        }

        function replyAdd() {
            const label = el('reply-label').value.trim();
            if (!label) { showToast('Enter the button text.', 'error'); return; }
            const cmdSel = el('reply-cmd');
            const valIn = el('reply-value');
            let action = cmdSel && cmdSel.value ? cmdSel.value.trim() : '';
            if (!action && valIn) action = valIn.value.trim();
            if (action && !action.startsWith('/')) action = '/' + action.replace(/^\\/+/, '');
            if (reply.rows.some(function(row) { return row.indexOf(label) >= 0; })) {
                showToast('A button with this text already exists.', 'error'); return;
            }
            let last = reply.rows.length ? reply.rows[reply.rows.length - 1] : null;
            if (!last || last.length >= (opts.maxPerRow || 3)) { last = []; reply.rows.push(last); }
            last.push(label);
            if (action) reply.actions[label] = action;
            el('reply-label').value = '';
            if (valIn) valIn.value = '';
            if (cmdSel) cmdSel.value = '';
            render();
        }

        function replySetAction(text) {
            const cur = reply.actions[text] || '';
            const val = prompt('Command to run when “' + text + '” is tapped:\\n(e.g. /menu — leave empty for no action)', cur);
            if (val === null) return;
            const v = val.trim();
            if (v) { reply.actions[text] = v.startsWith('/') ? v : '/' + v.replace(/^\\/+/, ''); }
            else delete reply.actions[text];
            render();
        }

        function replyMove(ri, bi, dir) {
            const row = reply.rows[ri];
            if (!row) return;
            const ni = bi + dir;
            if (ni < 0 || ni >= row.length) return;
            const item = row.splice(bi, 1)[0];
            row.splice(ni, 0, item);
            render();
        }

        function replyRowMove(ri, dir) {
            const ni = ri + dir;
            if (ni < 0 || ni >= reply.rows.length) return;
            const r = reply.rows.splice(ri, 1)[0];
            reply.rows.splice(ni, 0, r);
            render();
        }

        function replyRemove(ri, bi) {
            const row = reply.rows[ri];
            if (!row) return;
            const text = row.splice(bi, 1)[0];
            delete reply.actions[text];
            if (!row.length) reply.rows.splice(ri, 1);
            render();
        }

        // ---------- settings row ----------
        function syncSettings() {
            if (!allowReply) return;
            const r = el('reply-resize');
            const o = el('reply-onetime');
            const p = el('reply-persistent');
            const ph = el('reply-placeholder');
            if (r) reply.resize = r.checked;
            if (o) reply.one_time = o.checked;
            if (p) reply.persistent = p.checked;
            if (ph) reply.placeholder = ph.value.trim().slice(0, 64);
        }

        function populateCommands() {
            ['inline-cmd', 'reply-cmd'].forEach(function(id) {
                const sel = el(id);
                if (!sel) return;
                const cur = sel.value;
                sel.innerHTML = '';
                const ph = document.createElement('option');
                ph.value = '';
                ph.textContent = id === 'inline-cmd' ? 'Select command…' : 'Run command… (optional)';
                sel.appendChild(ph);
                commands().forEach(function(cmd) {
                    const opt = document.createElement('option');
                    opt.value = cmd.command;
                    opt.textContent = cmd.command;
                    sel.appendChild(opt);
                });
                if (cur) sel.value = cur;
            });
        }

        // ---------- load / save (accepts every legacy shape) ----------
        function loadInline(raw) {
            inline = [];
            if (raw) {
                try {
                    const obj = typeof raw === 'string' ? JSON.parse(raw) : raw;
                    if (obj && Array.isArray(obj.inline) && obj.v === 2) {
                        inline = obj.inline.map(function(row) {
                            return (Array.isArray(row) ? row : [row]).map(function(b) {
                                return { text: String(b.text || ''), type: b.type || 'callback', value: String(b.value || '') };
                            }).filter(function(b) { return b.text; });
                        }).filter(function(row) { return row.length; });
                    } else if (obj && Array.isArray(obj.inline_keyboard)) {
                        inline = obj.inline_keyboard.map(function(row) {
                            return (Array.isArray(row) ? row : [row]).map(function(b) {
                                if (!b || !b.text) return null;
                                if (b.url) return { text: b.text, type: 'url', value: b.url };
                                const value = String(b.callback_data || '');
                                return { text: b.text, type: value.startsWith('/') ? 'command' : 'callback', value: value };
                            }).filter(Boolean);
                        }).filter(function(row) { return row.length; });
                    } else if (obj && Array.isArray(obj.inline)) {
                        inline = obj.inline.map(function(b) {
                            if (!b || !b.text) return null;
                            if (b.type === 'url' || b.url) return [{ text: b.text, type: 'url', value: b.url || b.value || '' }];
                            const value = String(b.value !== undefined ? b.value : (b.callback_data || ''));
                            return [{ text: b.text, type: value.startsWith('/') ? 'command' : 'callback', value: value }];
                        }).filter(Boolean);
                    }
                } catch (e) { inline = []; }
            }
            renderInline();
        }

        function loadReply(raw) {
            reply = { rows: [], actions: {}, resize: true, one_time: false, persistent: true, placeholder: '' };
            if (raw) {
                try {
                    const obj = typeof raw === 'string' ? JSON.parse(raw) : raw;
                    const readItem = function(item) {
                        if (typeof item === 'string') return { text: item, command: '' };
                        if (item && typeof item === 'object') return { text: String(item.text || ''), command: String(item.command || item.value || '') };
                        return null;
                    };
                    if (obj && obj.v === 2 && obj.reply) {
                        const rep = obj.reply;
                        reply.rows = (rep.rows || []).map(function(row) {
                            return (Array.isArray(row) ? row : [row]).map(function(item) {
                                const it = readItem(item);
                                return it && it.text;
                            }).filter(Boolean);
                        }).filter(function(row) { return row.length; });
                        reply.actions = (rep.actions && typeof rep.actions === 'object') ? rep.actions : {};
                        if (typeof rep.resize === 'boolean') reply.resize = rep.resize;
                        if (typeof rep.one_time === 'boolean') reply.one_time = rep.one_time;
                        if (typeof rep.persistent === 'boolean') reply.persistent = rep.persistent;
                        reply.placeholder = rep.placeholder || '';
                    } else if (obj && Array.isArray(obj.keyboard)) {
                        reply.rows = obj.keyboard.map(function(row) {
                            return (Array.isArray(row) ? row : [row]).map(function(item) {
                                const it = readItem(item);
                                return it && it.text;
                            }).filter(Boolean);
                        }).filter(function(row) { return row.length; });
                        if (obj.resize_keyboard === false) reply.resize = false;
                        if (obj.one_time_keyboard === true) reply.one_time = true;
                        if (obj.is_persistent === false) reply.persistent = false;
                        reply.placeholder = obj.input_field_placeholder || '';
                    } else if (obj && Array.isArray(obj.reply)) {
                        reply.rows = obj.reply.map(function(row) {
                            return (Array.isArray(row) ? row : [row]).map(function(item) {
                                const it = readItem(item);
                                return it && it.text;
                            }).filter(Boolean);
                        }).filter(function(row) { return row.length; });
                    } else if (Array.isArray(obj)) {
                        // Legacy commands format: flat [{text, command}].
                        reply.rows = obj.map(function(item) {
                            const it = readItem(item);
                            return it && it.text;
                        }).filter(Boolean).map(function(text) { return [text]; });
                        obj.forEach(function(item) {
                            if (item && item.text && item.command) reply.actions[item.text] = item.command;
                        });
                    }
                } catch (e) { reply = { rows: [], actions: {}, resize: true, one_time: false, persistent: true, placeholder: '' }; }
            }
            renderReply();
        }

        function inlineJSON() {
            if (!inline.length) return null;
            return { v: 2, inline: inline };
        }

        function replyJSON() {
            if (!reply.rows.length) return null;
            return { v: 2, reply: reply };
        }

        function hasAny() {
            return !!(inline.length || reply.rows.length);
        }

        function reset() {
            inline = [];
            reply = { rows: [], actions: {}, resize: true, one_time: false, persistent: true, placeholder: '' };
            render();
        }

        // Expose the per-instance action functions on window so inline onclick
        // handlers in the chips can reach them.
        window[prefix + 'KbInlineMove'] = inlineMove;
        window[prefix + 'KbInlineRowMove'] = inlineRowMove;
        window[prefix + 'KbInlineRemove'] = inlineRemove;
        window[prefix + 'KbReplyMove'] = replyMove;
        window[prefix + 'KbReplyRowMove'] = replyRowMove;
        window[prefix + 'KbReplyRemove'] = replyRemove;
        window[prefix + 'KbReplySetAction'] = function(ri, bi) {
            const row = reply.rows[ri];
            if (row && row[bi] !== undefined) replySetAction(row[bi]);
        };

        return {
            inlineAdd: inlineAdd,
            replyAdd: replyAdd,
            populateCommands: populateCommands,
            loadInline: loadInline,
            loadReply: loadReply,
            inlineJSON: inlineJSON,
            replyJSON: replyJSON,
            hasAny: hasAny,
            reset: reset,
            render: render,
            syncSettings: syncSettings
        };
    }

    // Three shared-builder instances (commands modal, user panel, broadcast).
    const kbCmd = createKeyboardBuilder('kbCmd', { reply: true, maxPerRow: 3 });
    const kbUm = createKeyboardBuilder('kbUm', { reply: true, maxPerRow: 3 });
    const kbBc = createKeyboardBuilder('kbBc', { reply: true, maxPerRow: 3 });

    // Show the value input or the command select depending on inline type.
    function kbInlineTypeToggle(prefix) {
        const type = document.getElementById(prefix + '-inline-type').value;
        const cmdSel = document.getElementById(prefix + '-inline-cmd');
        const valIn = document.getElementById(prefix + '-inline-value');
        if (!cmdSel || !valIn) return;
        if (type === 'command') { cmdSel.classList.remove('hidden'); valIn.classList.add('hidden'); }
        else { cmdSel.classList.add('hidden'); valIn.classList.remove('hidden'); valIn.placeholder = type === 'url' ? 'https://example.com' : 'Callback data'; }
    }

    // Push the settings-row checkboxes into the builder state.
    function kbSettingChanged(prefix) {
        const kb = { kbCmd: kbCmd, kbUm: kbUm, kbBc: kbBc }[prefix];
        if (kb && kb.syncSettings) kb.syncSettings();
    }

    // Reflect the builder's current reply spec back onto the settings-row UI.
    function kbSyncSettingsUI(prefix, kb) {
        const spec = kb.replyJSON();
        const rep = spec ? spec.reply : null;
        const set = (id, val) => { const elx = document.getElementById(prefix + '-' + id); if (elx) elx.checked = !!val; };
        set('reply-resize', rep ? rep.resize !== false : true);
        set('reply-onetime', rep ? !!rep.one_time : false);
        set('reply-persistent', rep ? rep.persistent !== false : true);
        const ph = document.getElementById(prefix + '-reply-placeholder');
        if (ph) ph.value = (rep && rep.placeholder) || '';
    }

    // ----- Custom confirm modal -----
    function confirmDialog(message, dangerLabel) {
        return new Promise(resolve => {
            const modal = document.getElementById('confirm-modal');
            document.getElementById('confirm-message').textContent = message;
            const okBtn = document.getElementById('confirm-ok');
            const cancelBtn = document.getElementById('confirm-cancel');
            okBtn.querySelector('span').textContent = dangerLabel || 'Confirm';
            modal.classList.remove('hidden');
            const done = (val) => {
                modal.classList.add('hidden');
                okBtn.onclick = null; cancelBtn.onclick = null; modal.onclick = null;
                const box = modal.querySelector('.modal-box');
                if (box) box.onclick = null;
                resolve(val);
            };
            okBtn.onclick = () => done(true);
            cancelBtn.onclick = () => done(false);
            modal.onclick = () => done(false);
            modal.querySelector('.modal-box').onclick = (e) => e.stopPropagation();
        });
    }

    // ----- Step navigation -----
    function showStep(stepId) {
        document.querySelectorAll('.step').forEach(s => s.classList.add('step-hidden'));
        const target = document.getElementById(stepId);
        if (target) target.classList.remove('step-hidden');
    }
    function goToSetup() { showStep('step-setup'); }
    function showInfoModal() { document.getElementById('info-modal').classList.remove('hidden'); }

    // ======================================================================
    // STATUS CHECK
    // ======================================================================
    async function checkStatus() {
        showLoading();
        try {
            const res = await fetch('/api/status');
            const data = await res.json();
            const statusD1 = document.getElementById('status-d1');
            if (statusD1) {
                if (data.d1_bound) {
                    statusD1.innerHTML = '<i class="fa-solid fa-database" style="color:var(--green);"></i> <span class="status-text">D1: Bound</span>';
                    statusD1.classList.add('ok'); statusD1.classList.remove('error');
                } else {
                    statusD1.innerHTML = '<i class="fa-solid fa-database" style="color:var(--red);"></i> <span class="status-text">D1: Unbound</span>';
                    statusD1.classList.add('error'); statusD1.classList.remove('ok');
                }
            }
            if (!data.d1_bound) {
                document.getElementById('status-message').textContent = 'D1 database not bound. Please run the installer.';
                document.getElementById('status-actions').classList.remove('hidden');
                showStep('step-status');
                return;
            }
            if (!data.admin_password_set) {
                showStep('step-setup');
                return;
            }
            const sessionRes = await fetch('/api/check_session');
            const sessionData = await sessionRes.json();
            if (sessionData.logged_in) {
                showDashboard();
            } else {
                showStep('step-login');
            }
        } catch (e) {
            document.getElementById('status-message').textContent = 'Error checking status:' + ' ' + e.message;
            showStep('step-status');
        } finally {
            hideLoading();
        }
    }

    // ======================================================================
    // SETUP / LOGIN / LOGOUT
    // ======================================================================
    async function submitSetup() {
        const botToken = document.getElementById('setup-bot-token').value.trim();
        const skipBot = document.getElementById('setup-skip-bot').checked;
        const password = document.getElementById('setup-password').value;
        const confirmPw = document.getElementById('setup-password-confirm').value;
        const errorEl = document.getElementById('setup-error');
        errorEl.style.display = 'none';
        if (!password || password.length < 6) { errorEl.textContent = 'Password must be at least 6 characters.'; errorEl.style.display = 'block'; return; }
        if (password !== confirmPw) { errorEl.textContent = 'Passwords do not match.'; errorEl.style.display = 'block'; return; }
        if (!skipBot && !botToken) { errorEl.textContent = 'Please provide a bot token or check “Skip”.'; errorEl.style.display = 'block'; return; }
        const payload = { adminPassword: password };
        if (botToken) payload.botToken = botToken;
        const btn = document.querySelector('#step-setup .btn-success');
        const form = btn ? btn.closest('form') : null;
        if (form) form.classList.add('form-busy');
        withButtonLoading(btn, (async () => {
            try {
                const res = await fetch('/api/setup', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (!data.success) throw new Error(data.error || 'Setup failed');
                showToast('Setup complete! Please log in.');
                showStep('step-login');
            } catch (err) {
                errorEl.textContent = err.message;
                errorEl.style.display = 'block';
            }
        })()).finally(() => { if (form) form.classList.remove('form-busy'); });
    }

    async function submitLogin() {
        const password = document.getElementById('login-password').value;
        const errorEl = document.getElementById('login-error');
        errorEl.style.display = 'none';
        if (!password) { errorEl.textContent = 'Please enter your password.'; errorEl.style.display = 'block'; return; }
        const btn = document.querySelector('#step-login .btn-primary');
        const form = btn ? btn.closest('form') : null;
        if (form) form.classList.add('form-busy');
        withButtonLoading(btn, (async () => {
            try {
                const res = await fetch('/api/login', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                const data = await res.json();
                if (!data.success) throw new Error(data.error || 'Login failed');
                showToast('Login successful!');
                await showDashboard();
            } catch (err) {
                errorEl.textContent = err.message;
                errorEl.style.display = 'block';
            }
        })()).finally(() => { if (form) form.classList.remove('form-busy'); });
    }

    async function logout() {
        const btn = document.getElementById('logout-btn');
        withButtonLoading(btn, (async () => {
            try {
                await fetch('/api/logout', { method: 'POST' });
                showToast('Logged out.');
                btn.classList.add('hidden');
                showStep('step-login');
            } finally {}
        })());
    }

    async function showDashboard() {
        showStep('step-dashboard');
        document.getElementById('logout-btn').classList.remove('hidden');
        const statusRes = await fetch('/api/status');
        const data = await statusRes.json();
        document.getElementById('status-d1').innerHTML = data.d1_bound ?
            '<i class="fa-solid fa-database" style="color:var(--green);"></i> <span class="status-text">D1: Bound</span>' :
            '<i class="fa-solid fa-database" style="color:var(--red);"></i> <span class="status-text">D1: Unbound</span>';
        if (data.d1_bound) {
            document.getElementById('status-d1').classList.add('ok');
            document.getElementById('status-d1').classList.remove('error');
        } else {
            document.getElementById('status-d1').classList.add('error');
            document.getElementById('status-d1').classList.remove('ok');
        }
        document.getElementById('status-tg').innerHTML = data.tg_configured ?
            '<i class="fa-brands fa-telegram" style="color:var(--accent);"></i> <span class="status-text">' + 'Bot: Active' + '</span>' :
            '<i class="fa-brands fa-telegram" style="color:var(--red);"></i> <span class="status-text">' + 'Bot: Unlinked' + '</span>';
        if (data.tg_configured) {
            document.getElementById('status-tg').classList.add('bot');
            document.getElementById('status-tg').classList.remove('error');
        } else {
            document.getElementById('status-tg').classList.add('error');
            document.getElementById('status-tg').classList.remove('bot');
        }
        switchTab('overview');
        loadCommands(true);
        loadMenuCommands(true);
        loadSettings(true);
        autoCheckForUpdate();
        setTimeout(collapseTabs, 250);
    }

    // ======================================================================
    // TABS
    // ======================================================================
    const TAB_ORDER = { overview: 0, commands: 1, menu: 2, users: 3, ai: 4, settings: 5, cron: 6, botinfo: 7, backup: 8, logs: 9, update: 10 };
    const SUB_TABS = { 'user-manage': true, 'broadcast': true };

    function switchTab(tabId) {
        currentTab = tabId;
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        const el = document.getElementById('tab-' + tabId);
        if (el) el.classList.add('active');
        document.querySelectorAll('.tabs-header .tab-btn').forEach((b, i) => b.classList.toggle('active', i === TAB_ORDER[tabId]));
        document.querySelectorAll('#mobile-tabs button').forEach((b, i) => b.classList.toggle('active', i === TAB_ORDER[tabId]));
        // Update More dropdown active state
        var moreDropdown = document.getElementById('more-tabs-dropdown');
        if (moreDropdown) moreDropdown.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
        closeHamburger();
        if (tabId === 'commands') loadCommands();
        else if (tabId === 'menu') loadMenuCommands();
        else if (tabId === 'users') loadUsers();
        else if (tabId === 'ai') { loadAiSettings(); refreshMemoryCount(); }
        else if (tabId === 'settings') loadSettings();
        else if (tabId === 'cron') loadCronSettings();
        else if (tabId === 'botinfo') loadBotInfo();
        else if (tabId === 'overview') loadOverview();
        else if (tabId === 'backup') { /* loaded on demand */ }
        else if (tabId === 'logs') loadAuditLogs();
        else if (tabId === 'update') loadUpdateTab();
        collapseTabs();
    }

    function toggleHamburger() {
        const menu = document.getElementById('mobile-tabs');
        const btn = document.getElementById('hamburgerfa');
        if (!menu || !btn) return;
        menu.classList.toggle('open');
        btn.className = menu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
    function closeHamburger() {
        const menu = document.getElementById('mobile-tabs');
        const btn = document.getElementById('hamburgerfa');
        if (!menu || !btn) return;
        menu.classList.remove('open');
        btn.className = 'fa-solid fa-bars';
    }
    // ======================================================================
    // OVERVIEW
    // ======================================================================
    async function loadOverview(force) {
        const errEl = document.getElementById('overview-error');
        const statsEl = document.getElementById('overview-stats');
        const listEl = document.getElementById('overview-checklist');
        errEl.style.display = 'none';
        showOverviewSkeleton();
        try {
            const res = await withLoading(fetch('/api/stats'));
            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Failed');
            const s = data;
            const botLinked = !!s.bot_linked;
            statsEl.innerHTML =
                '<div class="stat-card primary"><div class="stat-icon"><i class="fa-solid fa-terminal"></i></div>' +
                '<div class="stat-value">' + (s.commands_total || 0) + '</div><div class="stat-label">' + 'Commands' +
                ' · <span style="color:var(--green);">' + (s.commands_enabled || 0) + ' ' + 'enabled' + '</span></div></div>' +
                '<div class="stat-card blue"><div class="stat-icon"><i class="fa-solid fa-users"></i></div>' +
                '<div class="stat-value">' + (s.users_total || 0) + '</div><div class="stat-label">' + 'Users' +
                ' · <span style="color:var(--primary);">' + (s.admins_total || 0) + ' ' + 'admins' + '</span></div></div>' +
                '<div class="stat-card green"><div class="stat-icon"><i class="fa-solid fa-memory"></i></div>' +
                '<div class="stat-value">' + (s.ai_memory_count || 0) + '</div><div class="stat-label">' + 'AI Memory' + ' · ' +
                ' · <span style="color:var(--accent);">' + (s.ai_replies_24h || 0) + ' replies/24h</span></div></div>' +
                '<div class="stat-card blue"><div class="stat-icon"><i class="fa-solid fa-user-clock"></i></div>' +
                '<div class="stat-value">' + (s.users_active_7d || 0) + '</div><div class="stat-label">' + 'Active users · 7d' +
                ' · <span style="color:var(--primary);">' + (s.ai_requests_60m || 0) + ' AI req/60m</span></div></div>' +
                '<div class="stat-card ' + (botLinked ? 'green' : 'amber') + '"><div class="stat-icon"><i class="fa-brands fa-telegram"></i></div>' +
                '<div class="stat-value" style="font-size:1.1rem; word-break:break-word;">' + (s.bot_username ? '@' + escapeHtml(s.bot_username) : (botLinked ? 'Linked' : 'Unlinked')) + '</div>' +
                '<div class="stat-label">' + 'Bot' + ' · ' + (s.ai_enabled ? 'AI enabled' : 'AI disabled') + '</div></div>';
            const steps = [
                { done: botLinked, label: 'Connect your bot token in Settings', tab: 'settings' },
                { done: (s.commands_total || 0) > 0, label: 'Create your first command', tab: 'commands' },
                { done: !!s.ai_enabled, label: 'Enable the AI assistant', tab: 'ai' }
            ];
            listEl.innerHTML = steps.map((st, i) =>
                '<li><span class="check ' + (st.done ? 'done' : 'todo') + '"><i class="fa-solid ' + (st.done ? 'fa-check' : 'fa-arrow-right') + '"></i></span>' +
                '<span style="flex:1;">' + escapeHtml(st.label) + '</span>' +
                (st.done ? '' : '<button class="btn btn-primary btn-sm check-btn" onclick="switchTab(\\'' + st.tab + '\\')"><i class="fa-solid fa-arrow-right"></i> ' + 'Go' + '</button>') +
                '</li>').join('');
        } catch (e) {
            errEl.style.display = 'block';
            errEl.textContent = e.message;
            statsEl.innerHTML = '';
            listEl.innerHTML = '';
        }
    }

    // ======================================================================
    // COMMANDS
    // ======================================================================
    function toggleInlineKeyboard() {
        showInlineKeyboard = !showInlineKeyboard;
        if (showInlineKeyboard) { showReplyKeyboard = false; }
        document.getElementById('inline-toggle').classList.toggle('active', showInlineKeyboard);
        document.getElementById('inline-keyboard-section').classList.toggle('hidden', !showInlineKeyboard);
        document.getElementById('reply-toggle').classList.toggle('active', showReplyKeyboard);
        document.getElementById('reply-keyboard-section').classList.toggle('hidden', !showReplyKeyboard);
    }
    function toggleReplyKeyboard() {
        showReplyKeyboard = !showReplyKeyboard;
        if (showReplyKeyboard) { showInlineKeyboard = false; }
        document.getElementById('reply-toggle').classList.toggle('active', showReplyKeyboard);
        document.getElementById('reply-keyboard-section').classList.toggle('hidden', !showReplyKeyboard);
        document.getElementById('inline-toggle').classList.toggle('active', showInlineKeyboard);
        document.getElementById('inline-keyboard-section').classList.toggle('hidden', !showInlineKeyboard);
    }
    function toggleEnabledIcon() {
        commandEnabled = !commandEnabled;
        updateEnabledIconUI();
    }
    function updateEnabledIconUI() {
        const icon = document.getElementById('enabled-toggle-icon');
        if (commandEnabled) {
            icon.className = 'enabled-toggle on';
            icon.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
            icon.title = 'Enabled';
        } else {
            icon.className = 'enabled-toggle off';
            icon.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
            icon.title = 'Disabled';
        }
    }

    function getDescendants(commandName, exclude) {
        // Returns every command that has commandName in its ancestor chain.
        const result = [];
        const stack = [commandName];
        while (stack.length) {
            const cur = stack.pop();
            for (const c of commandsCache) {
                if ((c.parent || null) === cur && !result.includes(c.command)) {
                    result.push(c.command);
                    stack.push(c.command);
                }
            }
        }
        return result;
    }

    function populateDropdowns() {
        const parentSelect = document.getElementById('modal-parent');
        const currentCommand = document.getElementById('modal-command').value.trim();
        parentSelect.innerHTML = '';
        let rootOpt = document.createElement('option');
        rootOpt.value = '';
        rootOpt.textContent = 'None (Root)';
        parentSelect.appendChild(rootOpt);
        const blocked = currentCommand ? getDescendants(currentCommand) : [];
        const seen = new Set();
        for (const cmd of commandsCache) {
            if (cmd.command === currentCommand || blocked.includes(cmd.command) || seen.has(cmd.command)) continue;
            seen.add(cmd.command);
            const opt = document.createElement('option');
            opt.value = cmd.command;
            opt.textContent = cmd.command;
            parentSelect.appendChild(opt);
        }
        if (editingCommand && editingCommand.parent) parentSelect.value = editingCommand.parent;
        if (!editingCommand && currentParent !== null) parentSelect.value = currentParent;
        kbCmd.populateCommands();
    }

    // (Keyboard building for the command modal lives in the shared
    // createKeyboardBuilder above — instance kbCmd.)

    // ----- Tree / file manager -----
    function getSortedChildren(parentName) {
        const children = (childrenMap[parentName] || []).slice();
        children.sort((a, b) => (a.order_idx || 0) - (b.order_idx || 0));
        return children;
    }

    function navigateTo(commandName) {
        const children = childrenMap[commandName] || [];
        if (children.length === 0) { showToast('This command has no children.', 'error'); return; }
        pathSegments.push(commandName);
        currentParent = commandName;
        renderFileManager();
    }
    function navigateToRoot() {
        currentParent = null;
        pathSegments = [];
        renderFileManager();
    }
    function navigateUp() {
        if (currentParent === null) return;
        pathSegments.pop();
        currentParent = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : null;
        renderFileManager();
    }

    function renderFileManager() {
        const container = document.getElementById('commands-list');
        const breadcrumb = document.getElementById('breadcrumb');
        const upBtn = document.getElementById('btn-up');
        const query = (document.getElementById('command-search').value || '').trim().toLowerCase();

        breadcrumb.innerHTML = '';
        const rootSpan = document.createElement('span');
        rootSpan.textContent = 'Root';
        rootSpan.style.color = 'var(--text-3)';
        rootSpan.style.cursor = 'pointer';
        rootSpan.addEventListener('click', (e) => { e.stopPropagation(); navigateToRoot(); });
        breadcrumb.appendChild(rootSpan);
        for (let i = 0; i < pathSegments.length; i++) {
            const seg = pathSegments[i];
            const isLast = (i === pathSegments.length - 1);
            const sep = document.createElement('span');
            sep.className = 'breadcrumb-sep';
            sep.textContent = ' / ';
            breadcrumb.appendChild(sep);
            const span = document.createElement('span');
            span.textContent = seg;
            if (!isLast) {
                span.className = 'breadcrumb-link';
                span.addEventListener('click', (e) => { e.stopPropagation(); navigateTo(seg); });
            } else {
                span.className = 'breadcrumb-current';
            }
            breadcrumb.appendChild(span);
        }
        upBtn.disabled = (currentParent === null);

        let children = getSortedChildren(currentParent);
        if (query) {
            children = children.filter(c => c.command.toLowerCase().includes(query));
        }
        if (children.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fa-regular fa-folder-open"></i>' + 'This folder is empty.' + '</div>';
            return;
        }
        let listHtml = '';
        children.forEach((cmd, idx) => {
            const hasChildren = (childrenMap[cmd.command] || []).length > 0;
            const icon = hasChildren ? '<i class="fa-regular fa-folder" style="color:var(--primary);"></i>' : '<i class="fa-regular fa-file" style="color:var(--text-3);"></i>';
            const enabled = cmd.enabled !== undefined ? cmd.enabled : 1;
            const adminBadge = cmd.is_admin_only ? '<span class="badge badge-admin"><i class="fa-solid fa-shield-halved"></i> ' + 'Admin' + '</span>' : '';
            const replyBadge = cmd.show_reply_keyboard ? '<span class="badge badge-reply"><i class="fa-regular fa-keyboard"></i> ' + 'Reply' + '</span>' : '';
            const typeBadge = '<span class="badge badge-type">' + (cmd.response_type === 'photo' ? 'Photo' : 'Text') + '</span>';
            const statusBadge = '<span class="badge ' + (enabled ? 'badge-enabled' : 'badge-disabled') + '">' + (enabled ? 'Enabled' : 'Disabled') + '</span>';
            const name = escapeHtml(cmd.command);
            const enc = encodeURIComponent(cmd.command);
            const upDisabled = idx === 0;
            const downDisabled = idx === children.length - 1;
            listHtml += '<div class="tree-row" data-command="' + enc + '">' +
                '<span class="tree-icon">' + icon + '</span>' +
                '<span class="tree-command-name' + (hasChildren ? ' folder' : '') + '" data-command="' + enc + '">' + name + '</span>' +
                typeBadge + adminBadge + replyBadge + statusBadge +
                '<div class="tree-actions">' +
                '<button class="up-btn" data-command="' + enc + '" ' + (upDisabled ? 'disabled' : '') + ' title="↑"><i class="fa-solid fa-arrow-up"></i></button>' +
                '<button class="down-btn" data-command="' + enc + '" ' + (downDisabled ? 'disabled' : '') + ' title="↓"><i class="fa-solid fa-arrow-down"></i></button>' +
                '<button class="add-child-btn" data-command="' + enc + '"><i class="fa-solid fa-plus"></i></button>' +
                '<button class="edit-btn" data-command="' + enc + '"><i class="fa-regular fa-pen-to-square"></i></button>' +
                '<button class="delete-btn" data-command="' + enc + '"><i class="fa-regular fa-trash-can"></i></button>' +
                '</div></div>';
        });
        container.innerHTML = listHtml;
        container.querySelectorAll('.tree-command-name.folder').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateTo(decodeURIComponent(el.dataset.command));
            });
        });
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const cmd = commandsCache.find(c => c.command === decodeURIComponent(btn.dataset.command));
                if (cmd) showAddCommandModal(cmd);
            });
        });
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteCommand(decodeURIComponent(btn.dataset.command));
            });
        });
        container.querySelectorAll('.add-child-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                showAddCommandModal(null, decodeURIComponent(btn.dataset.command));
            });
        });
        container.querySelectorAll('.up-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                moveCommand(-1, decodeURIComponent(btn.dataset.command));
            });
        });
        container.querySelectorAll('.down-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                moveCommand(1, decodeURIComponent(btn.dataset.command));
            });
        });
    }

    function moveCommand(dir, cmdName) {
        const children = getSortedChildren(currentParent);
        const idx = children.findIndex(c => c.command === cmdName);
        if (idx < 0) return;
        const swapIdx = idx + dir;
        if (swapIdx < 0 || swapIdx >= children.length) return;
        const order = children.map(c => c.command);
        [order[idx], order[swapIdx]] = [order[swapIdx], order[idx]];
        withLoading(
            fetch('/api/commands/reorder', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order })
            })
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Reorder failed');
                showToast('Order updated.');
                invalidateCache('commands');
                loadCommands(true);
            })
            .catch(err => showToast(err.message, 'error'))
        );
    }

    function buildChildrenMap() {
        childrenMap = {};
        commandsCache.forEach(cmd => {
            const parent = cmd.parent || null;
            if (!childrenMap[parent]) childrenMap[parent] = [];
            childrenMap[parent].push(cmd);
        });
        if (currentParent !== null && !commandsCache.some(c => c.command === currentParent)) {
            currentParent = null;
            pathSegments = [];
        }
    }

    function loadCommands(forceLoad) {
        const container = document.getElementById('commands-list');
        if (!forceLoad && isCacheValid('commands')) {
            commandsCache = cache.commands.data;
            buildChildrenMap();
            renderFileManager();
            if (!document.getElementById('command-modal').classList.contains('hidden')) populateDropdowns();
            return Promise.resolve();
        }
        showCommandsSkeleton();
        return withLoading(
            fetch('/api/commands')
            .then(res => res.json().then(data => ({ status: res.status, data })))
            .then(result => {
                if (result.status >= 400) throw new Error(result.data.error || 'Failed');
                commandsCache = result.data.commands || [];
                cache.commands.data = commandsCache;
                cache.commands.loaded = true;
                cache.commands.timestamp = Date.now();
                buildChildrenMap();
                renderFileManager();
                if (!document.getElementById('command-modal').classList.contains('hidden')) populateDropdowns();
            })
            .catch(err => {
                if (container) container.innerHTML = '<p style="color:var(--red); font-size:0.875rem;">' + escapeHtml(err.message) + '</p>';
            })
        );
    }

    async function showAddCommandModal(command, parent) {
        await loadCommands();
        editingCommand = command || null;
        const modal = document.getElementById('command-modal');
        document.getElementById('modal-error').classList.remove('show');
        commandEnabled = true;
        populateDropdowns();
        const parentSelect = document.getElementById('modal-parent');
        kbCmd.populateCommands();
        if (editingCommand) {
            document.getElementById('command-modal-title').textContent = 'Edit Command';
            document.getElementById('modal-command').value = editingCommand.command || '';
            document.getElementById('modal-type').value = editingCommand.response_type || 'text';
            document.getElementById('modal-content').value = editingCommand.content || '';
            document.getElementById('modal-media').value = editingCommand.media_url || '';
            document.getElementById('modal-admin-only').checked = !!editingCommand.is_admin_only;
            commandEnabled = editingCommand.enabled !== undefined ? (editingCommand.enabled == 1) : true;
            updateEnabledIconUI();
            if (editingCommand.parent) parentSelect.value = editingCommand.parent;
            kbCmd.loadInline(editingCommand.buttons_json);
            showInlineKeyboard = !!(editingCommand.buttons_json && editingCommand.buttons_json.length > 2);
            showReplyKeyboard = !!editingCommand.show_reply_keyboard;
            document.getElementById('inline-toggle').classList.toggle('active', showInlineKeyboard);
            document.getElementById('inline-keyboard-section').classList.toggle('hidden', !showInlineKeyboard);
            document.getElementById('reply-toggle').classList.toggle('active', showReplyKeyboard);
            document.getElementById('reply-keyboard-section').classList.toggle('hidden', !showReplyKeyboard);
            kbCmd.loadReply(editingCommand.reply_keyboard_json);
            kbSyncSettingsUI('kbCmd', kbCmd);
            document.getElementById('modal-save-btn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> ' + 'Update';
        } else {
            document.getElementById('command-modal-title').textContent = 'Add Command';
            document.getElementById('modal-command').value = '';
            document.getElementById('modal-type').value = 'text';
            document.getElementById('modal-content').value = '';
            document.getElementById('modal-media').value = '';
            document.getElementById('modal-admin-only').checked = false;
            commandEnabled = true;
            updateEnabledIconUI();
            if (parent) parentSelect.value = parent;
            else if (currentParent !== null) parentSelect.value = currentParent;
            else parentSelect.value = '';
            kbCmd.reset();
            showInlineKeyboard = false;
            document.getElementById('inline-toggle').classList.remove('active');
            document.getElementById('inline-keyboard-section').classList.add('hidden');
            showReplyKeyboard = false;
            document.getElementById('reply-toggle').classList.remove('active');
            document.getElementById('reply-keyboard-section').classList.add('hidden');
            document.getElementById('modal-save-btn').innerHTML = '<i class="fa-solid fa-plus"></i> ' + 'Save';
        }
        toggleMediaField();
        modal.classList.remove('hidden');
    }

    function toggleMediaField() {
        const type = document.getElementById('modal-type').value;
        document.getElementById('media-field').style.display = type === 'photo' ? 'block' : 'none';
    }

    function closeCommandModal() {
        document.getElementById('command-modal').classList.add('hidden');
        editingCommand = null;
    }

    function saveCommand() {
        const command = document.getElementById('modal-command').value.trim();
        const parent = document.getElementById('modal-parent').value.trim() || null;
        const response_type = document.getElementById('modal-type').value;
        const content = document.getElementById('modal-content').value.trim();
        const media_url = document.getElementById('modal-media').value.trim();
        const is_admin_only = document.getElementById('modal-admin-only').checked ? 1 : 0;
        const enabled = commandEnabled ? 1 : 0;
        const inlineObj = kbCmd.inlineJSON();
        const buttons_json = inlineObj ? JSON.stringify(inlineObj) : '';
        const show_reply_keyboard = showReplyKeyboard ? 1 : 0;
        kbCmd.syncSettings();
        const replyObj = kbCmd.replyJSON();
        const reply_keyboard_json = replyObj ? JSON.stringify(replyObj) : '';
        const errorEl = document.getElementById('modal-error');
        if (!command || !content) { errorEl.textContent = 'Fill both fields.'; errorEl.classList.add('show'); return; }
        if (response_type === 'photo' && !media_url) { errorEl.textContent = 'Photo URL' + ' *'; errorEl.classList.add('show'); return; }
        if (parent === command) { errorEl.textContent = 'A command cannot be its own parent or ancestor.'; errorEl.classList.add('show'); return; }
        const payload = { command, parent, response_type, content, media_url, is_admin_only, enabled, buttons_json, show_reply_keyboard, reply_keyboard_json };
        const url = editingCommand ? '/api/commands/' + encodeURIComponent(editingCommand.command) : '/api/commands';
        const method = editingCommand ? 'PUT' : 'POST';
        const saveBtn = document.getElementById('modal-save-btn');
        withButtonLoading(saveBtn,
            fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
            .then(res => res.json().then(data => ({ status: res.status, data })))
            .then(result => {
                if (result.status >= 400) throw new Error(result.data.error || 'Failed');
                closeCommandModal();
                showToast('Command saved!');
                invalidateCache('commands');
                loadCommands(true);
            })
            .catch(err => { errorEl.textContent = err.message; errorEl.classList.add('show'); })
        );
    }

    async function deleteCommand(cmdName) {
        const ok = await confirmDialog('Delete "' + cmdName + '" and all its children? This cannot be undone.');
        if (!ok) return;
        withLoading(
            fetch('/api/commands/' + encodeURIComponent(cmdName), { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Delete failed');
                showToast('Deleted.');
                invalidateCache('commands');
                if (currentParent === cmdName) navigateUp();
                else loadCommands(true);
            })
            .catch(err => showToast(err.message, 'error'))
        );
    }

    // ======================================================================
    // MENU COMMANDS
    // ======================================================================
    function loadMenuCommands(forceLoad) {
        if (!forceLoad && isCacheValid('menu')) {
            menuCommands = cache.menu.data;
            renderMenuRows();
            return Promise.resolve();
        }
        showMenuSkeleton();
        return withLoading(
            fetch('/api/menu_commands')
            .then(res => res.json())
            .then(data => {
                menuCommands = data.menu || [];
                if (!menuCommands.some(e => e.command === 'start')) {
                    menuCommands.unshift({ command: 'start', description: 'Start the bot' });
                }
                cache.menu.data = menuCommands;
                cache.menu.loaded = true;
                cache.menu.timestamp = Date.now();
                renderMenuRows();
            })
            .catch(err => showToast(err.message, 'error'))
        );
    }

    function syncMenuInputsToData() {
        const container = document.getElementById('menu-commands-container');
        const inputs = container.querySelectorAll('input[data-index]');
        inputs.forEach(inp => {
            const idx = parseInt(inp.dataset.index);
            if (isNaN(idx) || idx < 0 || idx >= menuCommands.length) return;
            if (inp.placeholder === 'start') menuCommands[idx].command = inp.value;
            else menuCommands[idx].description = inp.value;
        });
    }

    function renderMenuRows() {
        const container = document.getElementById('menu-commands-container');
        if (menuCommands.length === 0) {
            container.innerHTML = '<p class="empty-state">' + 'No menu entries. Add some.' + '</p>';
            return;
        }
        let html = '';
        menuCommands.forEach((entry, i) => {
            const isStart = entry.command === 'start';
            const upDisabled = i === 0;
            const downDisabled = i === menuCommands.length - 1;
            let actionBtns = '';
            if (isStart) {
                actionBtns = '<span class="menu-fixed-icon" title="Fixed command"><i class="fa-solid fa-lock"></i></span>';
            } else {
                actionBtns = '<button class="menu-del" onclick="removeMenuRow(' + i + ')"><i class="fa-regular fa-trash-can"></i></button>';
            }
            html += '<div class="menu-row">' +
                '<button class="menu-arrow-btn" onclick="moveMenuRow(-1,' + i + ')" ' + (upDisabled ? 'disabled' : '') + ' title="Move up"><i class="fa-solid fa-arrow-up"></i></button>' +
                '<button class="menu-arrow-btn" onclick="moveMenuRow(1,' + i + ')" ' + (downDisabled ? 'disabled' : '') + ' title="Move down"><i class="fa-solid fa-arrow-down"></i></button>' +
                '<input class="form-input" style="font-size:0.875rem;" value="' + escapeHtml(entry.command) + '" placeholder="start" data-index="' + i + '" data-role="cmd" ' + (isStart ? 'readonly' : '') + '>' +
                '<input class="form-input" style="font-size:0.875rem;" value="' + escapeHtml(entry.description) + '" placeholder="Description" data-index="' + i + '" data-role="desc">' +
                actionBtns +
                '</div>';
        });
        container.innerHTML = html;
    }

    function addMenuCommandRow() { syncMenuInputsToData(); menuCommands.push({ command: '', description: '' }); renderMenuRows(); }

    function removeMenuRow(index) {
        const entry = menuCommands[index];
        if (entry && entry.command === 'start') { showToast('Cannot remove the fixed “start” command.', 'error'); return; }
        syncMenuInputsToData();
        menuCommands.splice(index, 1);
        renderMenuRows();
    }

    function moveMenuRow(dir, index) {
        syncMenuInputsToData();
        const newIndex = index + dir;
        if (newIndex < 0 || newIndex >= menuCommands.length) return;
        const item = menuCommands.splice(index, 1)[0];
        menuCommands.splice(newIndex, 0, item);
        renderMenuRows();
    }

    function publishMenuCommands() {
        syncMenuInputsToData();
        const rows = document.querySelectorAll('#menu-commands-container .menu-row');
        const updated = [];
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input[data-index]');
            if (inputs.length < 2) return;
            const cmd = inputs[0].value.trim().toLowerCase();
            const desc = inputs[1].value.trim();
            if (cmd && desc) updated.push({ command: cmd, description: desc });
        });
        if (!updated.some(e => e.command === 'start')) {
            updated.unshift({ command: 'start', description: 'Start the bot' });
        }
        if (updated.length === 0) { showToast('Fill both fields.', 'error'); return; }
        const resultDiv = document.getElementById('menu-publish-result');
        resultDiv.classList.remove('hidden');
        resultDiv.textContent = 'Publishing…';
        resultDiv.style.color = 'var(--text-3)';
        withLoading(
            fetch('/api/menu_commands', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ menu: updated })
            })
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Publish failed');
                resultDiv.textContent = '✅ Published!';
                resultDiv.style.color = 'var(--green)';
                menuCommands = updated;
                cache.menu.data = updated;
                cache.menu.loaded = true;
                cache.menu.timestamp = Date.now();
                renderMenuRows();
            })
            .catch(err => { resultDiv.textContent = '❌ ' + err.message; resultDiv.style.color = 'var(--red)'; })
        );
    }

    // ======================================================================
    // USERS
    // ======================================================================
    let userSearchTimer = null;
    document.getElementById('user-search').addEventListener('input', function () {
        clearTimeout(userSearchTimer);
        userSearchTimer = setTimeout(loadUsers, 300);
    });

    function loadUsers() {
        const container = document.getElementById('users-list');
        const search = document.getElementById('user-search').value.trim();
        const url = '/api/users' + (search ? '?search=' + encodeURIComponent(search) : '');
        if (!search && isCacheValid('users')) {
            renderUsers(cache.users.data, container);
            return;
        }
        showUsersSkeleton();
        withLoading(
            fetch(url)
            .then(res => res.json())
            .then(data => {
                const users = data.users || [];
                if (!search) {
                    cache.users.data = users;
                    cache.users.loaded = true;
                    cache.users.timestamp = Date.now();
                }
                renderUsers(users, container);
            })
            .catch(err => { container.innerHTML = '<p class="empty-state">' + escapeHtml(err.message) + '</p>'; })
        );
    }

    function renderUsers(users, container) {
        if (users.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fa-regular fa-user"></i>' + 'No users yet. Interact with the bot to see them here.' + '</div>';
            return;
        }
        let html = '<div class="table-wrap"><table class="users-table"><thead><tr>' +
            '<th>' + 'Action' + '</th><th>' + 'ID' + '</th><th>' + 'Username' + '</th><th>' + 'Name' + '</th><th>' + 'Role' + '</th><th>Status</th><th>' + 'Last Active' + '</th>' +
            '</tr></thead><tbody>';
        users.forEach(u => {
            const manageBtn = '<button class="role-btn promote manage-user-btn" data-id="' + u.id + '"><i class="fa-solid fa-user-gear"></i> Manage</button>';
            let statusBadge = '';
            if (u.block_type === 'full') {
                statusBadge = '<span class="badge badge-disabled"><i class="fa-solid fa-ban"></i> Blocked</span>';
            } else if (u.block_type === 'ai_only') {
                statusBadge = '<span class="badge" style="background:var(--amber-soft); color:var(--amber); border:1px solid rgba(251,191,36,0.3);"><i class="fa-solid fa-robot"></i> AI Blocked</span>';
            } else {
                statusBadge = '<span class="badge badge-enabled">Active</span>';
            }
            const displayName = (u.first_name || '').substring(0, 30);
            html += '<tr>' +
                '<td>' + manageBtn + '</td>' +
                '<td class="mono">' + escapeHtml(u.id) + '</td>' +
                '<td>' + escapeHtml(u.username || '-') + '</td>' +
                '<td class="td-name" title="' + escapeHtml(u.first_name || '') + '">' + escapeHtml(displayName) + '</td>' +
                '<td><span class="badge ' + (u.role === 'admin' ? 'badge-admin' : 'badge-gray') + '">' + escapeHtml(u.role || 'user') + '</span></td>' +
                '<td>' + statusBadge + '</td>' +
                '<td style="font-size:0.75rem; color:var(--text-3);">' + escapeHtml(u.last_active || '-') + '</td>' +
                '</tr>';
        });
        container.innerHTML = html + '</tbody></table></div>';
        container.querySelectorAll('.manage-user-btn').forEach(b => b.addEventListener('click', () => {
            const user = users.find(u => u.id === parseInt(b.dataset.id));
            if (user) openUserManageTab(user);
        }));
    }

    function updateUserRole(userId, role) {
        withLoading(
            fetch('/api/users/role', {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, role })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) { showToast('Role updated.'); cache.users.loaded = false; loadUsers(); }
                else throw new Error(data.error);
            })
            .catch(err => showToast(err.message, 'error'))
        );
    }
    // ======================================================================
    // USER MANAGE TAB
    // ======================================================================
    let manageUser = null;

    function openUserManageTab(user) {
        manageUser = user;
        managingUserId = user.id;
        resetUmKeyboard();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.getElementById('um-tab-title').textContent = '@' + (user.username || user.id);
        // Render cards
        document.getElementById('um-tab-cards').innerHTML =
            '<div class="um-card"><div class="um-lbl">User ID</div><div class="um-val mono">' + escapeHtml(user.id) + '</div></div>' +
            '<div class="um-card"><div class="um-lbl">Username</div><div class="um-val">' + escapeHtml('@' + (user.username || '-')) + '</div></div>' +
            '<div class="um-card"><div class="um-lbl">Name</div><div class="um-val">' + escapeHtml(user.first_name || '-') + '</div></div>' +
            '<div class="um-card"><div class="um-lbl">Role</div><div class="um-val"><span class="badge ' + (user.role === 'admin' ? 'badge-admin' : 'badge-gray') + '">' + escapeHtml(user.role || 'user') + '</span></div></div>' +
            '<div class="um-card" style="grid-column:span 2;"><div class="um-lbl">Last Active</div><div class="um-val">' + escapeHtml(user.last_active || '-') + '</div></div>';
        // Render actions
        var roleBtnHtml = user.role === 'admin'
            ? '<button class="btn btn-primary btn-sm" onclick="umActionRole()"><i class="fa-solid fa-user"></i> Demote to User</button>'
            : '<button class="btn btn-primary btn-sm" onclick="umActionRole()"><i class="fa-solid fa-user-shield"></i> Promote to Admin</button>';
        document.getElementById('um-tab-actions').innerHTML = roleBtnHtml +
            ' <button id="um-tab-block-ai" class="btn btn-danger btn-sm" onclick="umActionBlockAI()"><i class="fa-solid fa-robot"></i> Block AI</button>' +
            ' <button id="um-tab-block-all" class="btn btn-danger btn-sm" onclick="umActionBlockAll()"><i class="fa-solid fa-ban"></i> Block All</button>';
        // Fetch block status
        fetch('/api/users/block_status/' + user.id).then(r => r.json()).then(status => {
            var aiBtn = document.getElementById('um-tab-block-ai');
            var allBtn = document.getElementById('um-tab-block-all');
            if (!aiBtn || !allBtn) return;
            if (status.blocked && status.block_type === 'ai_only') {
                aiBtn.innerHTML = '<i class="fa-solid fa-unlock"></i> Unblock AI'; aiBtn.className = 'btn btn-success btn-sm';
                aiBtn.dataset.blocked = '1';
            } else {
                aiBtn.innerHTML = '<i class="fa-solid fa-robot"></i> Block AI'; aiBtn.className = 'btn btn-danger btn-sm';
                aiBtn.dataset.blocked = '0';
            }
            if (status.blocked && status.block_type === 'full') {
                allBtn.innerHTML = '<i class="fa-solid fa-unlock"></i> Unblock All'; allBtn.className = 'btn btn-success btn-sm';
                allBtn.dataset.blocked = '1';
            } else {
                allBtn.innerHTML = '<i class="fa-solid fa-ban"></i> Block All'; allBtn.className = 'btn btn-danger btn-sm';
                allBtn.dataset.blocked = '0';
            }
        }).catch(() => {});
        // Load chat history + previously sent admin messages (editable/deletable)
        loadUserChatHistory(user.id);
        loadUserAdminMessages(user.id);
        switchTab('user-manage');
    }

    function loadUserChatHistory(userId) {
        var chatEl = document.getElementById('um-tab-chat');
        chatEl.innerHTML = '<div class="chat-empty"><div class="loading-spinner" style="width:20px;height:20px;border-width:2px;border-top-color:var(--primary);border-color:var(--surface-3);border-top-color:var(--primary);animation:spin 0.85s linear infinite;border-radius:50%;display:inline-block;"></div> Loading…</div>';
        fetch('/api/users/' + userId + '/chat_history')
            .then(r => r.json())
            .then(data => {
                var messages = data.messages || [];
                if (messages.length === 0) {
                    chatEl.innerHTML = '<div class="chat-empty"><i class="fa-regular fa-comments" style="margin-inline-end:0.4rem;"></i> No messages yet.</div>';
                    return;
                }
                var html = '';
                messages.forEach(function(m) {
                    var cls = m.role === 'user' ? 'user-msg' : 'bot-msg';
                    html += '<div class="chat-msg ' + cls + '">' + escapeHtml(m.content) + '</div>';
                });
                chatEl.innerHTML = html;
                chatEl.scrollTop = chatEl.scrollHeight;
            })
            .catch(function() {
                chatEl.innerHTML = '<div class="chat-empty"><i class="fa-regular fa-comments" style="margin-inline-end:0.4rem;"></i> No messages yet.</div>';
            });
    }

    function closeUserManageTab() {
        manageUser = null;
        managingUserId = null;
        switchTab('users');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===== User Manage Tab Keyboard State (shared builder, instance kbUm) =====
    function toggleUmKB() {
        var toggle = document.getElementById('um-kb-toggle');
        var section = document.getElementById('um-kb-section');
        toggle.classList.toggle('active');
        section.classList.toggle('hidden');
        if (!section.classList.contains('hidden')) kbUm.populateCommands();
    }
    function toggleUmInline() {
        var toggle = document.getElementById('um-inline-toggle');
        var section = document.getElementById('um-inline-section');
        var isActive = toggle.classList.toggle('active');
        section.classList.toggle('hidden', !isActive);
    }
    function toggleUmReply() {
        var toggle = document.getElementById('um-reply-toggle');
        var section = document.getElementById('um-reply-section');
        var isActive = toggle.classList.toggle('active');
        section.classList.toggle('hidden', !isActive);
    }
    function getUmButtonsJSON() {
        kbUm.syncSettings();
        var inline = kbUm.inlineJSON();
        var reply = kbUm.replyJSON();
        if (!inline && !reply) return null;
        if (inline && reply) return JSON.stringify(Object.assign({}, inline, { reply: reply.reply }));
        return JSON.stringify(inline || reply);
    }
    function resetUmKeyboard() {
        kbUm.reset();
        var kbToggle = document.getElementById('um-kb-toggle');
        if (kbToggle) kbToggle.classList.remove('active');
        var kbSection = document.getElementById('um-kb-section');
        if (kbSection) kbSection.classList.add('hidden');
        var inToggle = document.getElementById('um-inline-toggle');
        if (inToggle) inToggle.classList.remove('active');
        var inSection = document.getElementById('um-inline-section');
        if (inSection) inSection.classList.add('hidden');
        var rpToggle = document.getElementById('um-reply-toggle');
        if (rpToggle) rpToggle.classList.remove('active');
        var rpSection = document.getElementById('um-reply-section');
        if (rpSection) rpSection.classList.add('hidden');
        var photo = document.getElementById('um-photo-url');
        if (photo) photo.value = '';
        var photoClear = document.getElementById('um-photo-clear');
        if (photoClear) photoClear.classList.add('hidden');
    }
    function clearUmPhoto() {
        var photo = document.getElementById('um-photo-url');
        if (photo) photo.value = '';
        var photoClear = document.getElementById('um-photo-clear');
        if (photoClear) photoClear.classList.add('hidden');
    }
    // (Keyboard building for the user panel lives in the shared
    // createKeyboardBuilder above — instance kbUm.)

    // Show a shimmering "sending" bubble in a chat panel while a request is
    // in flight. Returns a function that removes it (or swaps in the final
    // message on success).
    function showChatSendingSkeleton(chatEl, text) {
        var wrap = document.createElement('div');
        wrap.className = 'chat-sending';
        var label = document.createElement('span');
        label.className = 'skl-block';
        label.style.cssText = 'width:auto; height:14px; border-radius:6px;';
        var inner = document.createElement('span');
        inner.className = 'skl-bg';
        inner.style.cssText = 'display:inline-block; width:' + Math.min(24 + text.length * 7, 220) + 'px; height:14px; border-radius:6px;';
        label.appendChild(inner);
        wrap.appendChild(label);
        chatEl.appendChild(wrap);
        chatEl.scrollTop = chatEl.scrollHeight;
        return {
            // Replace the skeleton with the real message bubble.
            complete: function() {
                var msgDiv = document.createElement('div');
                msgDiv.className = 'chat-msg bot-msg';
                msgDiv.textContent = text;
                wrap.replaceWith(msgDiv);
                chatEl.scrollTop = chatEl.scrollHeight;
            },
            fail: function() { wrap.remove(); }
        }; 
    }

    function sendUserMessageFromTab() {
        var textarea = document.getElementById('um-tab-message');
        var msg = textarea.value.trim();
        var photoInput = document.getElementById('um-photo-url');
        var photoUrl = photoInput ? photoInput.value.trim() : '';
        if (!msg && !photoUrl) { showToast('Type a message or set a photo URL first', 'error'); return; }
        if (!managingUserId) return;
        var chatEl = document.getElementById('um-tab-chat');
        if (chatEl.querySelector('.chat-empty')) chatEl.innerHTML = '';
        // Loading skeleton while the message is being delivered.
        var skel = showChatSendingSkeleton(chatEl, msg || '📷 Photo');
        textarea.value = '';
        var buttonsJson = getUmButtonsJSON();
        var body = { userId: managingUserId, message: msg };
        if (photoUrl) body.photo_url = photoUrl;
        if (buttonsJson) body.buttons_json = buttonsJson;
        var sendBtn = document.getElementById('um-send-btn');
        withButtonLoading(sendBtn,
            fetch('/api/users/send_message', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    skel.complete();
                    showToast('Message sent!');
                    resetUmKeyboard();
                    loadUserAdminMessages(managingUserId);
                }
                else throw new Error(data.error || 'Failed to send');
            })
            .catch(err => {
                skel.fail();
                textarea.value = msg;
                showToast(err.message, 'error');
            })
        );
    }

    // ----- Sent admin messages: edit / delete after delivery -----
    function loadUserAdminMessages(userId) {
        fetch('/api/users/' + userId + '/admin_messages')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                var container = document.getElementById('um-admin-messages');
                if (!container) return;
                var messages = data.messages || [];
                if (!messages.length) { container.innerHTML = ''; return; }
                var html = '';
                messages.forEach(function(m) {
                    var isPhoto = m.kind === 'photo';
                    html += '<div class="chat-msg admin-msg" data-chat="' + m.chat_id + '" data-mid="' + m.message_id + '" data-kind="' + m.kind + '">' +
                        (isPhoto ? '<span class="msg-photo-chip"><i class=\"fa-regular fa-image\"></i> photo</span><br>' : '') +
                        '<div class="msg-text">' + escapeHtml(m.text || '') + '</div>' +
                        '<div class="msg-actions">' +
                        '<button class="msg-action-btn" onclick="editAdminMessage(this)"><i class="fa-regular fa-pen-to-square"></i> Edit</button>' +
                        '<button class="msg-action-btn danger" onclick="deleteAdminMessage(this)"><i class="fa-regular fa-trash-can"></i> Delete</button>' +
                        '</div></div>';
                });
                container.innerHTML = '<div class="kb-row-head" style="margin-bottom:0.3rem;">Your sent messages (edit / delete)</div>' + html;
            })
            .catch(function() {});
    }

    function editAdminMessage(btn) {
        var box = btn.closest('.admin-msg');
        var chatId = parseInt(box.dataset.chat);
        var messageId = parseInt(box.dataset.mid);
        var kind = box.dataset.kind;
        var textEl = box.querySelector('.msg-text');
        var current = textEl.textContent;
        var updated = prompt(kind === 'photo' ? 'Edit the photo caption:' : 'Edit the message:', current);
        if (updated === null || updated.trim() === current) return;
        var originalBtn = btn.innerHTML;
        btn.innerHTML = busyDotsHtml();
        btn.disabled = true;
        fetch('/api/users/message/edit', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatId: chatId, messageId: messageId, kind: kind, text: updated })
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) { textEl.textContent = updated; showToast('Message updated on Telegram.'); }
            else throw new Error(data.error || 'Failed');
        })
        .catch(function(err) { showToast(err.message, 'error'); })
        .finally(function() { btn.innerHTML = originalBtn; btn.disabled = false; });
    }

    function deleteAdminMessage(btn) {
        var box = btn.closest('.admin-msg');
        var chatId = parseInt(box.dataset.chat);
        var messageId = parseInt(box.dataset.mid);
        confirmDialog('Delete this message from the user\\'s chat on Telegram?').then(function(ok) {
            if (!ok) return;
            var originalBtn = btn.innerHTML;
            btn.innerHTML = busyDotsHtml();
            btn.disabled = true;
            fetch('/api/users/message/delete', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chatId: chatId, messageId: messageId })
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data.success) { box.remove(); showToast('Message deleted from Telegram.'); }
                else throw new Error(data.error || 'Failed');
            })
            .catch(function(err) { showToast(err.message, 'error'); btn.innerHTML = originalBtn; btn.disabled = false; });
        });
    }

    function umActionRole() {
        if (!manageUser) return;
        var newRole = manageUser.role === 'admin' ? 'user' : 'admin';
        updateUserRole(manageUser.id, newRole);
        closeUserManageTab();
    }

    function umActionBlockAI() {
        if (!manageUser) return;
        var btn = document.getElementById('um-tab-block-ai');
        var shouldBlock = btn.dataset.blocked !== '1';
        toggleAiBlock(manageUser.id, shouldBlock);
    }

    function umActionBlockAll() {
        if (!manageUser) return;
        var btn = document.getElementById('um-tab-block-all');
        var shouldBlock = btn.dataset.blocked !== '1';
        toggleFullBlock(manageUser.id, shouldBlock);
    }

    function clearUserMemoryFromTab() {
        if (!manageUser) return;
        confirmDialog('Clear all AI conversation history for @' + (manageUser.username || manageUser.id) + '?').then(function(ok) {
            if (!ok) return;
            fetch('/api/users/' + manageUser.id + '/clear_memory', { method: 'POST' })
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    if (data.success) { showToast('Chat memory cleared!'); loadUserChatHistory(manageUser.id); }
                    else throw new Error(data.error);
                })
                .catch(function(err) { showToast(err.message, 'error'); });
        });
    }

    function toggleAiBlock(userId, shouldBlock) {
        var url = shouldBlock ? '/api/users/block' : '/api/users/unblock';
        var body = shouldBlock ? { userId: userId, blockType: 'ai_only' } : { userId: userId };
        fetch(url, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(function(r) { return r.json(); }).then(function(data) {
            if (data.success) {
                showToast(shouldBlock ? 'User blocked from AI chatbot' : 'User unblocked from AI chatbot');
                closeUserManageTab();
                loadUsers();
            } else throw new Error(data.error);
        }).catch(function(err) { showToast(err.message, 'error'); });
    }

    function toggleFullBlock(userId, shouldBlock) {
        var url = shouldBlock ? '/api/users/block' : '/api/users/unblock';
        var body = shouldBlock ? { userId: userId, blockType: 'full' } : { userId: userId };
        fetch(url, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(function(r) { return r.json(); }).then(function(data) {
            if (data.success) {
                showToast(shouldBlock ? 'User blocked from entire bot' : 'User unblocked from bot');
                closeUserManageTab();
                loadUsers();
            } else throw new Error(data.error);
        }).catch(function(err) { showToast(err.message, 'error'); });
    }

    // ======================================================================
    // BROADCAST TAB
    // ======================================================================

    function openBroadcastTab() {
        document.getElementById('broadcast-target').value = 'all';
        document.getElementById('broadcast-chat').innerHTML = '<div class="chat-empty"><i class="fa-regular fa-paper-plane" style="margin-inline-end:0.4rem;"></i> Messages you send here will be delivered to selected users.</div>';
        document.getElementById('broadcast-message').value = '';
        document.getElementById('broadcast-custom-list').classList.add('hidden');
        document.getElementById('broadcast-custom-list').innerHTML = '';
        document.getElementById('bcast-specific-group').classList.add('hidden');
        kbBc.reset();
        document.getElementById('bcast-kb-section').classList.add('hidden');
        var kbToggle = document.getElementById('bcast-kb-toggle');
        if (kbToggle) kbToggle.classList.remove('active');
        var photoInput = document.getElementById('broadcast-photo-url');
        if (photoInput) photoInput.value = '';
        var photoClear = document.getElementById('bcast-photo-clear');
        if (photoClear) photoClear.classList.add('hidden');
        onBroadcastTargetChange();
        loadBroadcastSettings();
        loadBroadcastHistory();
        switchTab('broadcast');
    }

    // ----- Delivery pacing settings -----
    function loadBroadcastSettings() {
        fetch('/api/broadcast/settings')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (!data || !data.settings) return;
                document.getElementById('bcast-batch-size').value = data.settings.batch_size;
                document.getElementById('bcast-delay-ms').value = data.settings.delay_ms;
                document.getElementById('bcast-timeout-ms').value = data.settings.timeout_ms;
            })
            .catch(function() {});
    }
    function saveBroadcastSettings() {
        var body = {
            batch_size: parseInt(document.getElementById('bcast-batch-size').value) || 25,
            delay_ms: parseInt(document.getElementById('bcast-delay-ms').value) || 0,
            timeout_ms: parseInt(document.getElementById('bcast-timeout-ms').value) || 10000,
        };
        var btn = document.getElementById('bcast-pacing-save');
        withButtonLoading(btn,
            fetch('/api/broadcast/settings', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data.success) { showToast('Delivery pacing saved.'); if (data.settings) loadBroadcastSettings(); }
                else throw new Error(data.error || 'Failed');
            })
            .catch(function(err) { showToast(err.message, 'error'); })
        );
    }
    function clearBroadcastPhoto() {
        var photoInput = document.getElementById('broadcast-photo-url');
        if (photoInput) photoInput.value = '';
        var photoClear = document.getElementById('bcast-photo-clear');
        if (photoClear) photoClear.classList.add('hidden');
    }

    function closeBroadcastTab() { switchTab('users'); window.scrollTo({ top: 0, behavior: 'smooth' }); }

    function onBroadcastTargetChange() {
        var target = document.getElementById('broadcast-target').value;
        var countEl = document.getElementById('bcast-count');
        var customEl = document.getElementById('broadcast-custom-list');
        var specEl = document.getElementById('bcast-specific-group');
        var users = cache.users.data || [];
        customEl.classList.add('hidden');
        specEl.classList.add('hidden');
        var filtered = users;
        if (target === 'all') { filtered = users; }
        else if (target === 'only_ai_blocked') { filtered = users.filter(function(u) { return u.block_type === 'ai_only'; }); }
        else if (target === 'only_full_blocked') { filtered = users.filter(function(u) { return u.block_type === 'full'; }); }
        else if (target === 'except_ai_blocked') { filtered = users.filter(function(u) { return u.block_type !== 'ai_only'; }); }
        else if (target === 'except_full_blocked') { filtered = users.filter(function(u) { return u.block_type !== 'full'; }); }
        else if (target === 'specific') { specEl.classList.remove('hidden'); filtered = []; }
        else if (target === 'custom') {
            customEl.classList.remove('hidden');
            var controlsHtml = '<div class="bcast-custom-controls">' +
                '<input type="text" class="form-input" id="bcast-custom-search" placeholder="\uD83D\uDD0D Search users..." oninput="filterBroadcastCustom()" style="font-size:0.8rem;">' +
                '<button type="button" class="btn btn-gray" onclick="broadcastCustomCheckAll(true)">Check All</button>' +
                '<button type="button" class="btn btn-gray" onclick="broadcastCustomCheckAll(false)">Uncheck All</button>' +
                '</div>';
            var html = controlsHtml;
            users.forEach(function(u) {
                html += '<label class="bcast-custom-item"><input type="checkbox" value="' + u.id + '" checked data-username="' + escapeHtml(u.username || '') + '" data-name="' + escapeHtml(u.first_name || '') + '"> <span>' + escapeHtml('@' + (u.username || u.id) + ' (' + u.id + ')') + '</span></label>';
            });
            customEl.innerHTML = html || '<div style="padding:0.5rem; color:var(--text-3); font-size:0.85rem;">No users found.</div>';
            customEl.querySelectorAll('input[type=checkbox]').forEach(function(cb) { cb.addEventListener('change', function() {
                countEl.textContent = customEl.querySelectorAll('input:checked').length + ' user(s) selected';
            }); });
            countEl.textContent = customEl.querySelectorAll('input:checked').length + ' user(s) selected';
            return;
        }
        countEl.textContent = filtered.length + ' user(s) will receive this message';
    }

    function filterBroadcastCustom() {
        var search = (document.getElementById('bcast-custom-search').value || '').toLowerCase();
        var items = document.querySelectorAll('#broadcast-custom-list .bcast-custom-item');
        items.forEach(function(item) {
            var cb = item.querySelector('input');
            if (!cb) return;
            var text = (cb.dataset.username + ' ' + cb.dataset.name + ' ' + cb.value).toLowerCase();
            item.style.display = text.includes(search) ? '' : 'none';
        });
    }
    function broadcastCustomCheckAll(check) {
        var items = document.querySelectorAll('#broadcast-custom-list input[type=checkbox]');
        items.forEach(function(cb) {
            var item = cb.closest('.bcast-custom-item');
            if (item && item.style.display !== 'none') cb.checked = check;
        });
        var countEl = document.getElementById('bcast-count');
        if (countEl) countEl.textContent = document.querySelectorAll('#broadcast-custom-list input:checked').length + ' user(s) selected';
    }

    function getBroadcastUserIds() {
        var target = document.getElementById('broadcast-target').value;
        var users = cache.users.data || [];
        var userIds = [];
        if (target === 'all') { userIds = users.map(function(u) { return u.id; }); }
        else if (target === 'only_ai_blocked') { userIds = users.filter(function(u) { return u.block_type === 'ai_only'; }).map(function(u) { return u.id; }); }
        else if (target === 'only_full_blocked') { userIds = users.filter(function(u) { return u.block_type === 'full'; }).map(function(u) { return u.id; }); }
        else if (target === 'except_ai_blocked') { userIds = users.filter(function(u) { return u.block_type !== 'ai_only'; }).map(function(u) { return u.id; }); }
        else if (target === 'except_full_blocked') { userIds = users.filter(function(u) { return u.block_type !== 'full'; }).map(function(u) { return u.id; }); }
        else if (target === 'specific') {
            var text = document.getElementById('broadcast-specific-ids').value.trim();
            userIds = text.split(/[\\n, ]+/).map(function(s) { return parseInt(s.trim()); }).filter(function(n) { return !isNaN(n) && n > 0; });
        } else if (target === 'custom') {
            var checked = document.querySelectorAll('#broadcast-custom-list input:checked');
            userIds = Array.from(checked).map(function(cb) { return parseInt(cb.value); });
        }
        return userIds;
    }

    function getBroadcastButtonsJSON() {
        kbBc.syncSettings();
        var inline = kbBc.inlineJSON();
        var reply = kbBc.replyJSON();
        if (!inline && !reply) return null;
        if (inline && reply) return JSON.stringify(Object.assign({}, inline, { reply: reply.reply }));
        return JSON.stringify(inline || reply);
    }

    function sendBroadcast() {
        var textarea = document.getElementById('broadcast-message');
        var msg = textarea.value.trim();
        var photoInput = document.getElementById('broadcast-photo-url');
        var photoUrl = photoInput ? photoInput.value.trim() : '';
        if (!msg && !photoUrl) { showToast('Type a message or set a photo URL first', 'error'); return; }
        var userIds = getBroadcastUserIds();
        if (userIds.length === 0) { showToast('No users selected', 'error'); return; }
        var chatEl = document.getElementById('broadcast-chat');
        if (chatEl.querySelector('.chat-empty')) chatEl.innerHTML = '';
        // Loading skeleton while the broadcast is being delivered.
        var skel = showChatSendingSkeleton(chatEl, photoUrl && !msg ? '\ud83d\udcf7 Photo broadcast' : msg);
        textarea.value = '';
        var buttonsJson = getBroadcastButtonsJSON();
        var body = { userIds: userIds, message: msg, buttons_json: buttonsJson };
        if (photoUrl) body.photo_url = photoUrl;
        var sendBtn = document.getElementById('bcast-send-btn');
        withButtonLoading(sendBtn,
            fetch('/api/broadcast', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data.success) {
                    skel.complete();
                    showToast('Broadcast sent to ' + data.sent + ' user(s)!' + (data.failed ? ' (' + data.failed + ' failed)' : ''));
                    var statusDiv = document.createElement('div');
                    statusDiv.className = 'chat-msg bot-msg';
                    statusDiv.textContent = '\u2705 Delivered to ' + data.sent + ' user(s).' + (data.failed ? ' ' + data.failed + ' failed.' : '') + (data.skipped ? ' ' + data.skipped + ' skipped.' : '');
                    chatEl.appendChild(statusDiv);
                    chatEl.scrollTop = chatEl.scrollHeight;
                    loadBroadcastHistory();
                } else throw new Error(data.error || 'Failed');
            })
            .catch(function(err) {
                skel.fail();
                textarea.value = msg;
                showToast(err.message, 'error');
            })
        );
    }

    // Broadcast keyboard buttons (shared builder, instance kbBc)
    function toggleBroadcastKB() {
        var toggle = document.getElementById('bcast-kb-toggle');
        var section = document.getElementById('bcast-kb-section');
        toggle.classList.toggle('active');
        section.classList.toggle('hidden');
        if (!section.classList.contains('hidden')) kbBc.populateCommands();
    }
    function toggleBroadcastInline() {
        var toggle = document.getElementById('bcast-inline-toggle');
        var section = document.getElementById('bcast-inline-section');
        var isActive = toggle.classList.toggle('active');
        section.classList.toggle('hidden', !isActive);
    }
    function toggleBroadcastReply() {
        var toggle = document.getElementById('bcast-reply-toggle');
        var section = document.getElementById('bcast-reply-section');
        var isActive = toggle.classList.toggle('active');
        section.classList.toggle('hidden', !isActive);
    }

    // Broadcast history — each entry can be edited (re-sends editMessageText /
    // editMessageCaption to every recipient) or deleted (deleteMessage to
    // every recipient) using the tracked per-recipient message ids.
    function loadBroadcastHistory() {
        var chatEl = document.getElementById('broadcast-chat');
        if (!chatEl) return;
        fetch('/api/broadcast/history').then(function(r) { return r.json(); }).then(function(data) {
            var history = data.history || [];
            if (!history.length) {
                chatEl.innerHTML = '<div class="chat-empty"><i class="fa-regular fa-paper-plane" style="margin-inline-end:0.4rem;"></i> Messages you send here will be delivered to selected users.</div>';
                return;
            }
            var html = '';
            history.forEach(function(h) {
                var meta = escapeHtml(h.sent_at) + ' \u2022 ' + (h.sent_count || 0) + '/' + (h.recipient_count || 0) + ' delivered';
                html += '<div class="chat-msg bot-msg" data-bid="' + h.id + '" data-kind="' + (h.kind || 'text') + '">' +
                    '<div style="font-size:0.7rem;color:var(--text-3);margin-bottom:0.2rem;">#' + h.id + ' \u2022 ' + meta + (h.kind === 'photo' ? ' \u2022 \ud83d\udcf7' : '') + '</div>' +
                    '<div class="bcast-text">' + escapeHtml(h.message || '') + '</div>' +
                    '<div class="msg-actions">' +
                    '<button class="msg-action-btn" onclick="editBroadcastEntry(this)"><i class="fa-regular fa-pen-to-square"></i> Edit</button>' +
                    '<button class="msg-action-btn danger" onclick="deleteBroadcastEntry(this)"><i class="fa-regular fa-trash-can"></i> Delete</button>' +
                    '</div></div>';
            });
            chatEl.innerHTML = html;
        }).catch(function() {
            chatEl.innerHTML = '<div class="chat-empty">Failed to load history.</div>';
        });
    }

    // ----- Edit / delete a delivered broadcast (applies to every tracked recipient) -----
    function editBroadcastEntry(btn) {
        var box = btn.closest('.bot-msg');
        var bid = parseInt(box.dataset.bid);
        var textEl = box.querySelector('.bcast-text');
        var current = textEl.textContent;
        var kind = box.dataset.kind || 'text';
        var updated = prompt(kind === 'photo' ? 'Edit the photo caption (applies to every recipient):' : 'Edit the broadcast message (applies to every recipient):', current);
        if (updated === null || updated.trim() === current) return;
        var originalBtn = btn.innerHTML;
        btn.innerHTML = busyDotsHtml();
        btn.disabled = true;
        fetch('/api/broadcast/edit', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ broadcastId: bid, text: updated })
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                textEl.textContent = updated;
                var meta = box.querySelector('div');
                if (meta && typeof data.edited === 'number') {
                    meta.textContent = meta.textContent.replace(/\\d+\\/\\d+ delivered/, data.edited + ' edited');
                }
                showToast('Broadcast edited for ' + (data.edited || 0) + ' recipient(s).');
            }
            else throw new Error(data.error || 'Failed');
        })
        .catch(function(err) { showToast(err.message, 'error'); })
        .finally(function() { btn.innerHTML = originalBtn; btn.disabled = false; });
    }

    function deleteBroadcastEntry(btn) {
        var box = btn.closest('.bot-msg');
        var bid = parseInt(box.dataset.bid);
        confirmDialog('Delete this broadcast from every recipient\\'s chat on Telegram?').then(function(ok) {
            if (!ok) return;
            var originalBtn = btn.innerHTML;
            btn.innerHTML = busyDotsHtml();
            btn.disabled = true;
            fetch('/api/broadcast/delete', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ broadcastId: bid })
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data.success) {
                    box.remove();
                    showToast('Broadcast deleted from ' + (data.deleted || 0) + ' chat(s).');
                }
                else throw new Error(data.error || 'Failed');
            })
            .catch(function(err) { showToast(err.message, 'error'); btn.innerHTML = originalBtn; btn.disabled = false; });
        });
    }

    function clearBroadcastChat() {
        confirmDialog('Clear all broadcast history?').then(function(ok) {
            if (!ok) return;
            fetch('/api/broadcast/clear_history', { method: 'POST' })
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    if (data.success) {
                        showToast('History cleared!');
                        var chatEl = document.getElementById('broadcast-chat');
                        if (chatEl) chatEl.innerHTML = '<div class="chat-empty"><i class="fa-regular fa-paper-plane" style="margin-inline-end:0.4rem;"></i> Messages you send here will be delivered to selected users.</div>';
                    }
                    else throw new Error(data.error);
                })
                .catch(function(err) { showToast(err.message, 'error'); });
        });
    }

    // ======================================================================
    // RESPONSIVE TAB COLLAPSE
    // ======================================================================
    function toggleMoreTabsDropdown(e) {
        if (e) e.stopPropagation();
        var dd = document.getElementById('more-tabs-dropdown');
        dd.classList.toggle('show');
    }

function collapseTabs() {
    if (window.innerWidth <= 490) return;

    const header = document.getElementById('tabs-header');
    const wrapper = document.getElementById('more-tabs-wrapper');
    const dropdown = document.getElementById('more-tabs-dropdown');

    if (!header || !wrapper || !dropdown) return;

    if (header.offsetWidth === 0) {
        requestAnimationFrame(collapseTabs);
        return;
    }

    const tabs = Array.from(header.children)
        .filter(el => el.classList.contains('tab-btn'));

    // Reset
    tabs.forEach(tab => tab.classList.remove('overflow-hidden'));
    dropdown.innerHTML = '';
    wrapper.style.display = 'inline-flex';

    const hiddenTabs = [];

    // Hide tabs from the END until the actual rendered layout fits.
    for (let i = tabs.length - 1; i >= 0; i--) {
        if (header.scrollWidth <= header.clientWidth) {
            break;
        }

        const tab = tabs[i];
        const onclick = tab.getAttribute('onclick') || '';
        const match = onclick.match(/switchTab\\(['"](.+?)['"]\\)/);

        tab.classList.add('overflow-hidden');

        if (match) {
            hiddenTabs.push({
                id: match[1],
                element: tab
            });
        }
    }

    // Everything fits without More.
    if (hiddenTabs.length === 0) {
        wrapper.style.display = 'none';
        return;
    }

    // Put hidden tabs into More.
    hiddenTabs.reverse().forEach(({ id, element }) => {
        const button = document.createElement('button');

        button.type = 'button';
        button.dataset.tab = id;
        button.textContent = element.textContent.trim();

        if (currentTab === id) {
            button.classList.add('active');
        }

        button.addEventListener('click', function () {
            switchTab(id);
            dropdown.classList.remove('show');
        });

        dropdown.appendChild(button);
    });
}

    document.addEventListener('click', function(e) {
        var dd = document.getElementById('more-tabs-dropdown');
        var wrapper = document.getElementById('more-tabs-wrapper');
        if (dd && wrapper && !wrapper.contains(e.target)) dd.classList.remove('show');
    });

    window.addEventListener('resize', collapseTabs);

    // ======================================================================
    // CRON / RETENTION TAB
    // ======================================================================
    // One retention knob per feature. "0" means keep forever (the cleanup
    // skips that feature); every other value prunes rows older than the
    // configured number of days/hours.
    const CRON_FIELDS = [
        { key: 'cron_sessions_days', label: 'Dashboard login sessions', unit: 'days', min: 1, max: 365, def: 1 },
        { key: 'cron_bot_sessions_days', label: 'Bot user sessions', unit: 'days', min: 1, max: 3650, def: 30 },
        { key: 'cron_login_attempts_hours', label: 'Login attempt records', unit: 'hours', min: 1, max: 720, def: 2 },
        { key: 'cron_rate_limits_hours', label: 'AI rate-limit buckets', unit: 'hours', min: 1, max: 2160, def: 24 },
        { key: 'cron_logs_days', label: 'Audit logs', unit: 'days', min: 1, max: 3650, def: 7 },
        { key: 'cron_ai_messages_days', label: 'AI chat memory', unit: 'days (0 = keep forever)', min: 0, max: 3650, def: 0 },
        { key: 'cron_broadcast_days', label: 'Broadcast history & recipients', unit: 'days (0 = keep forever)', min: 0, max: 3650, def: 30 },
        { key: 'cron_inactive_users_days', label: 'Inactive users (removes user + memory)', unit: 'days (0 = never)', min: 0, max: 3650, def: 0 },
    ];
    let cronEnabled = true;

    function loadCronSettings() {
        var rowsEl = document.getElementById('cron-rows');
        var lastRunEl = document.getElementById('cron-last-run');
        if (!rowsEl) return;
        rowsEl.innerHTML = CRON_FIELDS.map(function(f) {
            return '<tr><td style="padding:0.45rem 0.5rem;">' + escapeHtml(f.label) + '</td>' +
                '<td style="padding:0.45rem 0.5rem;"><input type="number" class="form-input" id="cron-' + f.key + '" min="' + f.min + '" max="' + f.max + '" ' +
                'value="' + f.def + '" style="width:190px; font-size:0.8rem;" data-key="' + f.key + '"></td></tr>';
        }).join('');
        if (lastRunEl) lastRunEl.innerHTML = '<span class="skl-block skl-bg" style="display:inline-block; width:260px; height:12px; border-radius:6px;"></span>';
        fetch('/api/cron')
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (!data || data.error || !data.settings) { if (lastRunEl) lastRunEl.textContent = ''; return; }
                cronEnabled = data.settings.cron_enabled !== '0';
                var t = document.getElementById('cron-enabled-toggle');
                if (t) { t.classList.toggle('active', cronEnabled); t.setAttribute('aria-checked', String(cronEnabled)); }
                CRON_FIELDS.forEach(function(f) {
                    var el = document.getElementById('cron-' + f.key);
                    if (el && data.settings[f.key] !== undefined) el.value = data.settings[f.key];
                });
                if (lastRunEl) {
                    if (data.last_run) {
                        var s = data.last_run.summary || {};
                        var parts = Object.keys(s).map(function(k) { return k + ': ' + s[k]; });
                        lastRunEl.textContent = 'Last cleanup: ' + data.last_run.at + (parts.length ? ' \u2014 ' + parts.join(', ') : '');
                    } else lastRunEl.textContent = 'Cleanup has not run yet.';
                }
            })
            .catch(function() { if (lastRunEl) lastRunEl.textContent = ''; });
    }

    function toggleCronEnabled() {
        cronEnabled = !cronEnabled;
        var t = document.getElementById('cron-enabled-toggle');
        if (t) { t.classList.toggle('active', cronEnabled); t.setAttribute('aria-checked', String(cronEnabled)); }
    }

    function saveCronSettings() {
        var body = { cron_enabled: cronEnabled ? '1' : '0' };
        var valid = true;
        CRON_FIELDS.forEach(function(f) {
            var el = document.getElementById('cron-' + f.key);
            if (!el) return;
            var v = parseInt(el.value);
            if (isNaN(v) || v < f.min || v > f.max) { el.style.borderColor = 'var(--red)'; valid = false; }
            else { el.style.borderColor = ''; body[f.key] = v; }
        });
        if (!valid) { showToast('Fix the highlighted values first', 'error'); return; }
        var btn = document.getElementById('cron-save-btn');
        withButtonLoading(btn,
            fetch('/api/cron', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (data.success) showToast('Retention settings saved.');
                else throw new Error(data.error || 'Failed');
            })
            .catch(function(err) { showToast(err.message, 'error'); })
        );
    }

    function runCronNow() {
        var btn = document.getElementById('cron-run-btn');
        withButtonLoading(btn,
            fetch('/api/cron/run', { method: 'POST' })
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    if (data.success) {
                        var s = data.summary || {};
                        var parts = Object.keys(s).map(function(k) { return k + ': ' + s[k]; });
                        showToast('Cleanup done.' + (parts.length ? ' ' + parts.join(', ') : ''));
                        loadCronSettings();
                    }
                    else throw new Error(data.error || 'Failed');
                })
                .catch(function(err) { showToast(err.message, 'error'); })
        );
    }

    // ======================================================================
    // AI SETTINGS
    // ======================================================================
    let strictModeEnabled = false;
    let rtlSupportEnabled = false;
    let altProviders = [];
    let managingUserId = null;

    function toggleAiEnabled() {
        aiEnabled = !aiEnabled;
        const toggle = document.getElementById('ai-toggle');
        if (toggle) { toggle.classList.toggle('active', aiEnabled); toggle.setAttribute('aria-checked', String(aiEnabled)); }
    }

    function toggleSuggestedQuestions() {
        showSuggestedQuestions = !showSuggestedQuestions;
        const toggle = document.getElementById('ai-suggested-toggle');
        if (toggle) toggle.classList.toggle('active', showSuggestedQuestions);
        document.getElementById('suggested-questions-editor').style.display = showSuggestedQuestions ? 'block' : 'none';
    }
    function toggleSuggestedOneTime() {
        showSuggestedOneTime = !showSuggestedOneTime;
        const toggle = document.getElementById('ai-sq-onetime-toggle');
        if (toggle) toggle.classList.toggle('active', showSuggestedOneTime);
    }

    // ===== Strict Mode =====
    function toggleStrictMode() {
        strictModeEnabled = !strictModeEnabled;
        document.getElementById('ai-strict-mode-toggle').classList.toggle('active', strictModeEnabled);
    }

    // ===== RTL Support =====
    function toggleRtlSupport() {
        rtlSupportEnabled = !rtlSupportEnabled;
        document.getElementById('ai-rtl-toggle').classList.toggle('active', rtlSupportEnabled);
    }

    // ===== Typing Indicator =====
    let typingIndicatorEnabled = true;
    function toggleTypingIndicator() {
        typingIndicatorEnabled = !typingIndicatorEnabled;
        document.getElementById('ai-typing-toggle').classList.toggle('active', typingIndicatorEnabled);
    }

    // ===== Retry on Failure =====
    let retryOnFailureEnabled = false;
    function toggleRetryOnFailure() {
        retryOnFailureEnabled = !retryOnFailureEnabled;
        document.getElementById('ai-retry-toggle').classList.toggle('active', retryOnFailureEnabled);
    }

    // ===== Streaming Replies (#30) =====
    let aiStreamingEnabled = false;
    function toggleAiStreaming() {
        aiStreamingEnabled = !aiStreamingEnabled;
        document.getElementById('ai-streaming-toggle').classList.toggle('active', aiStreamingEnabled);
    }

    // ===== Alternate Providers =====
    function renderAltProviders() {
        const container = document.getElementById('alt-providers-container');
        if (!altProviders.length) {
            container.innerHTML = '<div style="font-size:0.85rem; color:var(--text-3); padding:0.5rem 0;">No alternate providers added. Click "Add Alternate Provider" below.</div>';
            return;
        }
        let html = '';
altProviders.forEach((ap, idx) => {
    html += \`<div class="knowledge-base-item" style="margin-bottom:0.7rem;">
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.6rem;">
            <span style="font-weight:600; font-size:0.9rem;">Alternate Provider \${idx + 1}</span>
            <button onclick="removeAltProvider(\${idx})" class="chip-btn chip-delete" style="margin-inline-start:auto;"><i class="fa-regular fa-trash-can"></i> Remove</button>
        </div>
        <div class="ai-grid">
            <div class="form-group">
                <label class="form-label">Provider</label>
                <select class="form-input alt-provider-select" data-index="\${idx}" onchange="onAltProviderSelect(this)">
                    <option value="openai" \${ap.provider === 'openai' ? 'selected' : ''}>OpenAI</option>
                    <option value="gemini" \${ap.provider === 'gemini' ? 'selected' : ''}>Gemini</option>
                    <option value="deepseek" \${ap.provider === 'deepseek' ? 'selected' : ''}>DeepSeek</option>
                    <option value="groq" \${ap.provider === 'groq' ? 'selected' : ''}>Groq</option>
                    <option value="openrouter" \${ap.provider === 'openrouter' ? 'selected' : ''}>OpenRouter</option>
                    <option value="ollama" \${ap.provider === 'ollama' ? 'selected' : ''}>Ollama</option>
                    <option value="custom" \${ap.provider === 'custom' ? 'selected' : ''}>Custom</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">API Key</label>
                <input type="password" class="form-input alt-api-key" data-index="\${idx}" value="\${escapeHtml(ap.apiKey || '')}" placeholder="API Key" autocomplete="off">
            </div>
            <div class="form-group">
                <label class="form-label">Model</label>
                <input type="text" class="form-input alt-model" data-index="\${idx}" value="\${escapeHtml(ap.model || '')}" placeholder="e.g. gpt-4o-mini">
            </div>
            <div class="form-group" style="display:\${ap.provider === 'custom' ? 'block' : 'none'};" data-baseurl-group="\${idx}">
                <label class="form-label">Base URL</label>
                <input type="text" class="form-input alt-base-url" data-index="\${idx}" value="\${escapeHtml(ap.baseUrl || '')}" placeholder="https://api.your-provider.com/v1">
            </div>
        </div>
    </div>\`;
});
        container.innerHTML = html;
    }

    function addAlternateProvider() {
        if (altProviders.length >= 5) { showToast('Maximum 5 alternate providers allowed', 'error'); return; }
        altProviders.push({ provider: 'openai', apiKey: '', model: 'gpt-4o-mini', baseUrl: '' });
        renderAltProviders();
        updateAddAltBtnState();
    }

    function removeAltProvider(idx) {
        altProviders.splice(idx, 1);
        renderAltProviders();
        updateAddAltBtnState();
    }

    function onAltProviderSelect(sel) {
        const idx = parseInt(sel.dataset.index);
        altProviders[idx].provider = sel.value;
        renderAltProviders();
    }

    function syncAltProvidersFromUI() {
        document.querySelectorAll('.alt-provider-select').forEach(sel => {
            const idx = parseInt(sel.dataset.index);
            if (altProviders[idx]) altProviders[idx].provider = sel.value;
        });
        document.querySelectorAll('.alt-api-key').forEach(inp => {
            const idx = parseInt(inp.dataset.index);
            if (altProviders[idx]) altProviders[idx].apiKey = inp.value;
        });
        document.querySelectorAll('.alt-model').forEach(inp => {
            const idx = parseInt(inp.dataset.index);
            if (altProviders[idx]) altProviders[idx].model = inp.value;
        });
        document.querySelectorAll('.alt-base-url').forEach(inp => {
            const idx = parseInt(inp.dataset.index);
            if (altProviders[idx]) altProviders[idx].baseUrl = inp.value;
        });
    }

    function updateAddAltBtnState() {
        const btn = document.getElementById('add-alt-provider-btn');
        if (btn) btn.disabled = altProviders.length >= 5;
    }

    function onAiProviderChange(type) {
        if (type !== 'main') return; // alt providers handled dynamically
        const providerSelect = document.getElementById('ai-provider');
        const provider = providerSelect.value;
        const baseUrlGroup = document.getElementById('main-base-url-group');
        const modelInput = document.getElementById('ai-model');
        const hintEl = document.getElementById('main-model-hint');
        const hintContainer = document.getElementById('main-provider-hint');

        const defaults = {
            openai: { model: 'gpt-4o-mini', baseUrl: 'https://api.openai.com/v1' },
            gemini: { model: 'gemini-2.0-flash', baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/' },
            deepseek: { model: 'deepseek-chat', baseUrl: 'https://api.deepseek.com' },
            groq: { model: 'llama-3.3-70b-versatile', baseUrl: 'https://api.groq.com/openai/v1' },
            openrouter: { model: 'openai/gpt-4o-mini', baseUrl: 'https://openrouter.ai/api/v1' },
            ollama: { model: 'llama3', baseUrl: 'http://localhost:11434/v1' },
            custom: { model: '', baseUrl: '' }
        };
        const providerHints = {
            openai: { url: 'https://platform.openai.com/api-keys', label: 'OpenAI' },
            gemini: { url: 'https://ai.google.dev/gemini-api', label: 'Gemini' },
            deepseek: { url: 'https://platform.deepseek.com/api_keys', label: 'DeepSeek' },
            groq: { url: 'https://console.groq.com/keys', label: 'Groq' },
            openrouter: { url: 'https://openrouter.ai/keys', label: 'OpenRouter' },
            ollama: { url: 'https://ollama.com/', label: 'Ollama (local)' },
            custom: { url: '', label: 'Custom' }
        };
        baseUrlGroup.style.display = provider === 'custom' ? 'block' : 'none';
        if (defaults[provider] && (!modelInput.value || Object.values(defaults).some(d => d.model === modelInput.value))) {
            modelInput.value = defaults[provider].model;
        }
        const hint = providerHints[provider] || providerHints.custom;
        hintContainer.innerHTML = hint.url ?
            '🔑 ' + 'Get your API key from' + ' <a href="' + hint.url + '" target="_blank" rel="noopener">' + hint.label + '</a>' : '';
        if (defaults[provider] && defaults[provider].model) {
            hintEl.textContent = 'Recommended free model' + ': ' + defaults[provider].model;
        } else {
            hintEl.textContent = '';
        }
    }

    function renderKnowledgeBases() {
        const container = document.getElementById('knowledge-bases-container');
        if (knowledgeBases.length === 0) {
            container.innerHTML = '<div class="empty-state" style="padding:0.5rem;">' + 'No knowledge bases added yet.' + '</div>';
            return;
        }
        let html = '';
        knowledgeBases.forEach((kb, idx) => {
            const enabled = kb.enabled !== undefined ? kb.enabled : true;
            const label = kb.label || ('Knowledge Base' + ' ' + (idx + 1));
            html += '<div class="knowledge-base-item" data-index="' + idx + '">' +
                '<div class="kb-header">' +
                '<div class="toggle ' + (enabled ? 'active' : '') + '" onclick="toggleKnowledgeBase(' + idx + ')"><span class="slider"></span></div>' +
                '<input type="text" class="form-input kb-label-input" data-index="' + idx + '" value="' + escapeHtml(label) + '" style="background:transparent; border:none; font-weight:600; font-size:0.95rem; padding:0; width:auto; flex:1; min-width:0;" onchange="updateKnowledgeBaseLabel(' + idx + ', this.value)">' +
                '<button onclick="removeKnowledgeBase(' + idx + ')" class="chip-btn chip-delete" style="margin-inline-start:auto;"><i class="fa-regular fa-trash-can"></i></button>' +
                '</div>' +
                '<textarea class="form-textarea" rows="7" placeholder="Enter knowledge content…" onchange="updateKnowledgeBase(' + idx + ', this.value)">' + escapeHtml(kb.content || '') + '</textarea>' +
                '</div>';
        });
        container.innerHTML = html;
    }
    function addKnowledgeBase() { knowledgeBases.push({ enabled: true, content: '', label: '' }); renderKnowledgeBases(); }
    function removeKnowledgeBase(idx) { knowledgeBases.splice(idx, 1); renderKnowledgeBases(); }
    function toggleKnowledgeBase(idx) { knowledgeBases[idx].enabled = !knowledgeBases[idx].enabled; renderKnowledgeBases(); }
    function updateKnowledgeBase(idx, value) { knowledgeBases[idx].content = value; }
    function updateKnowledgeBaseLabel(idx, label) { knowledgeBases[idx].label = label; }

    function renderSuggestedQuestions() {
        const container = document.getElementById('suggested-questions-list');
        if (suggestedQuestions.length === 0) {
            container.innerHTML = '<div class="empty-state" style="padding:0.4rem;">' + 'No buttons added yet.' + '</div>';
            return;
        }
        let html = '<div class="button-chip-list">';
        suggestedQuestions.forEach((q, idx) => {
            var su=idx===0?'disabled':'',sd=idx===suggestedQuestions.length-1?'disabled':'';
            html += '<div class="button-chip" data-index="' + idx + '" data-type="suggested">' +
                '<button class="chip-btn" onclick="moveSuggestedQuestion(-1,'+idx+')" '+su+' title="Up"><i class="fa-solid fa-arrow-up"></i></button>' +
                '<button class="chip-btn" onclick="moveSuggestedQuestion(1,'+idx+')" '+sd+' title="Down"><i class="fa-solid fa-arrow-down"></i></button>' +
                '<i class="fa-regular fa-message" style="color:var(--accent);"></i>' +
                '<span class="chip-text">' + escapeHtml(q.label) + ' → ' + escapeHtml(q.value) + '</span>' +
                '<button class="chip-btn chip-edit" onclick="editSuggestedQuestion(' + idx + ')"><i class="fa-regular fa-pen-to-square"></i></button>' +
                '<button class="chip-btn chip-delete" onclick="removeSuggestedQuestion(' + idx + ')"><i class="fa-regular fa-circle-xmark"></i></button>' +
                '</div>';
        });
        container.innerHTML = html + '</div>';
    }

    function moveSuggestedQuestion(dir, index) {
        const newIndex = index + dir;
        if (newIndex < 0 || newIndex >= suggestedQuestions.length) return;
        const item = suggestedQuestions.splice(index, 1)[0];
        suggestedQuestions.splice(newIndex, 0, item);
        renderSuggestedQuestions();
    }

    function addSuggestedQuestion() {
        const label = document.getElementById('suggested-q-label').value.trim();
        const value = document.getElementById('suggested-q-value').value.trim();
        if (!label || !value) { showToast('Both label and value are required.', 'error'); return; }
        suggestedQuestions.push({ label, value });
        renderSuggestedQuestions();
        document.getElementById('suggested-q-label').value = '';
        document.getElementById('suggested-q-value').value = '';
    }
    function removeSuggestedQuestion(idx) { suggestedQuestions.splice(idx, 1); renderSuggestedQuestions(); }
    function editSuggestedQuestion(idx) {
        const q = suggestedQuestions[idx];
        const newLabel = prompt('Label:', q.label);
        if (newLabel === null) return;
        const newValue = prompt('Value:', q.value);
        if (newValue === null) return;
        q.label = newLabel.trim();
        q.value = newValue.trim();
        renderSuggestedQuestions();
    }

    function gatherAiSettingsFromUI() {
        syncAltProvidersFromUI();
        return {
            ai_enabled: aiEnabled ? '1' : '0',
            ai_display_name: document.getElementById('ai-display-name').value.trim(),
            ai_language: document.getElementById('ai-language').value,
            ai_style: document.getElementById('ai-style').value,
            ai_length: document.getElementById('ai-length').value,
            ai_provider: document.getElementById('ai-provider').value,
            ai_api_key: document.getElementById('ai-api-key').value.trim(),
            ai_base_url: document.getElementById('ai-base-url').value.trim(),
            ai_model: document.getElementById('ai-model').value.trim(),
            ai_custom_headers: document.getElementById('ai-custom-headers').value.trim(),
            ai_alt_providers: JSON.stringify(altProviders),
            ai_system_prompt: document.getElementById('ai-system-prompt').value.trim(),
            ai_knowledge_bases: JSON.stringify(knowledgeBases),
            ai_custom_vars_text: document.getElementById('ai-custom-vars-text').value.trim(),
            ai_trigger: document.getElementById('ai-trigger').value,
            ai_trigger_text: document.getElementById('ai-trigger-text').value.trim(),
            ai_memory: document.getElementById('ai-memory').value,
            ai_group_memory: document.getElementById('ai-group-memory').value || '0',
            ai_rate_limit: document.getElementById('ai-rate-limit').value || '10',
            ai_global_rate_limit: document.getElementById('ai-global-rate-limit').value || '0',
            ai_global_rate_window: document.getElementById('ai-global-rate-window').value || 'minute',
            ai_response_delay: document.getElementById('ai-response-delay').value || '0',
            ai_group_mention: document.getElementById('ai-group-mention').value,
            ai_private_reply: document.getElementById('ai-private-reply').value,
            ai_group_reply: document.getElementById('ai-group-reply').value,
            ai_ignore_bots: document.getElementById('ai-ignore-bots').value,
            ai_ignore_forwarded: document.getElementById('ai-ignore-forwarded').value,
            ai_typing_indicator: typingIndicatorEnabled ? '1' : '0',
            ai_retry_on_failure: retryOnFailureEnabled ? '1' : '0',
            ai_streaming: aiStreamingEnabled ? '1' : '0',
            ai_fallback: document.getElementById('ai-fallback').value.trim(),
            ai_temperature: document.getElementById('ai-temperature').value || '0.7',
            ai_max_tokens: document.getElementById('ai-max-tokens').value || '1024',
            ai_top_p: document.getElementById('ai-top-p').value || '1.0',
            ai_suggested_questions_enabled: showSuggestedQuestions ? '1' : '0',
            ai_suggested_one_time: showSuggestedOneTime ? '1' : '0',
            ai_suggested_questions: JSON.stringify(suggestedQuestions),
            ai_ignore_prefixes: document.getElementById('ai-ignore-prefixes').value.trim(),
            ai_strict_mode: strictModeEnabled ? '1' : '0',
            ai_rtl_support: rtlSupportEnabled ? '1' : '0',
        };
    }

    function renderAiSettings(s) {
        if (!s) return;
        aiEnabled = (s.ai_enabled === '1' || s.ai_enabled === true);
        const toggle = document.getElementById('ai-toggle');
        if (toggle) { toggle.classList.toggle('active', aiEnabled); toggle.setAttribute('aria-checked', String(aiEnabled)); }

        showSuggestedQuestions = (s.ai_suggested_questions_enabled === '1' || s.ai_suggested_questions_enabled === true);
        const sqToggle = document.getElementById('ai-suggested-toggle');
        if (sqToggle) sqToggle.classList.toggle('active', showSuggestedQuestions);
        document.getElementById('suggested-questions-editor').style.display = showSuggestedQuestions ? 'block' : 'none';
        showSuggestedOneTime = (s.ai_suggested_one_time === undefined || s.ai_suggested_one_time === '1' || s.ai_suggested_one_time === true);
        const sqOneTimeToggle = document.getElementById('ai-sq-onetime-toggle');
        if (sqOneTimeToggle) sqOneTimeToggle.classList.toggle('active', showSuggestedOneTime);

        document.getElementById('ai-display-name').value = s.ai_display_name || '';
        document.getElementById('ai-language').value = s.ai_language || 'auto';
        document.getElementById('ai-style').value = s.ai_style || 'friendly';
        document.getElementById('ai-length').value = s.ai_length || 'medium';
        document.getElementById('ai-provider').value = s.ai_provider || 'openai';
        document.getElementById('ai-api-key').value = s.ai_api_key || '';
        document.getElementById('ai-base-url').value = s.ai_base_url || '';
        document.getElementById('ai-model').value = s.ai_model || 'gpt-4o-mini';
        document.getElementById('ai-custom-headers').value = s.ai_custom_headers || '';
        document.getElementById('ai-system-prompt').value = s.ai_system_prompt || '';
        try { knowledgeBases = JSON.parse(s.ai_knowledge_bases || '[]'); } catch (e) { knowledgeBases = []; }
        renderKnowledgeBases();
        document.getElementById('ai-custom-vars-text').value = s.ai_custom_vars_text || '';
        document.getElementById('ai-trigger').value = s.ai_trigger || 'no_command';
        document.getElementById('ai-trigger-text').value = s.ai_trigger_text || '';
        document.getElementById('ai-memory').value = s.ai_memory || '0';
        document.getElementById('ai-group-memory').value = s.ai_group_memory || '0';
        document.getElementById('ai-rate-limit').value = s.ai_rate_limit || '10';
        document.getElementById('ai-global-rate-limit').value = s.ai_global_rate_limit || '0';
        document.getElementById('ai-global-rate-window').value = (s.ai_global_rate_window === 'hour') ? 'hour' : 'minute';
        document.getElementById('ai-response-delay').value = s.ai_response_delay || '0';
        document.getElementById('ai-group-mention').value = s.ai_group_mention || '1';
        document.getElementById('ai-private-reply').value = s.ai_private_reply || '1';
        document.getElementById('ai-group-reply').value = s.ai_group_reply || '1';
        document.getElementById('ai-ignore-bots').value = s.ai_ignore_bots || '1';
        document.getElementById('ai-ignore-forwarded').value = s.ai_ignore_forwarded || '1';
        typingIndicatorEnabled = (s.ai_typing_indicator === '1');
        document.getElementById('ai-typing-toggle').classList.toggle('active', typingIndicatorEnabled);
        retryOnFailureEnabled = (s.ai_retry_on_failure === '1');
        document.getElementById('ai-retry-toggle').classList.toggle('active', retryOnFailureEnabled);
        aiStreamingEnabled = (s.ai_streaming === '1');
        document.getElementById('ai-streaming-toggle').classList.toggle('active', aiStreamingEnabled);
        document.getElementById('ai-fallback').value = s.ai_fallback || 'Sorry, I am currently unavailable. Please try again later.';
        document.getElementById('ai-temperature').value = s.ai_temperature || '0.7';
        document.getElementById('ai-max-tokens').value = s.ai_max_tokens || '1024';
        document.getElementById('ai-top-p').value = s.ai_top_p || '1.0';
        try { suggestedQuestions = JSON.parse(s.ai_suggested_questions || '[]'); } catch (e) { suggestedQuestions = []; }
        renderSuggestedQuestions();
        document.getElementById('ai-ignore-prefixes').value = s.ai_ignore_prefixes || '/, !, #';
        onAiProviderChange('main');
        try { altProviders = JSON.parse(s.ai_alt_providers || '[]'); } catch(e) { altProviders = []; }
        renderAltProviders();
        updateAddAltBtnState();
        strictModeEnabled = (s.ai_strict_mode === '1');
        document.getElementById('ai-strict-mode-toggle').classList.toggle('active', strictModeEnabled);
        rtlSupportEnabled = (s.ai_rtl_support === '1');
        document.getElementById('ai-rtl-toggle').classList.toggle('active', rtlSupportEnabled);
        updateTriggerHint(s.ai_trigger || 'no_command');
    }

    function updateTriggerHint(trigger) {
        const hintEl = document.getElementById('trigger-hint');
        const texts = {
            'no_command': 'The AI replies only when no command matches. Recommended.',
            'all_messages': 'The AI replies to every text message (after command checks).',
            'contains_text': 'The AI replies only if the message contains the text you set.'
        };
        hintEl.textContent = texts[trigger] || '';
    }

    function loadAiSettings(forceLoad) {
        if (!forceLoad && isCacheValid('ai')) {
            renderAiSettings(cache.ai.data);
            return Promise.resolve();
        }
        showAiSettingsSkeleton();
        return withLoading(
            fetch('/api/ai_settings')
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Failed to load AI settings');
                cache.ai.data = data.settings;
                cache.ai.loaded = true;
                cache.ai.timestamp = Date.now();
                renderAiSettings(data.settings);
                hideAiSettingsSkeleton();
            })
            .catch(err => { hideAiSettingsSkeleton(); showToast('Error loading AI settings:' + ' ' + err.message, 'error'); })
        );
    }

    function applyPromptTemplate() {
        const preset = document.getElementById('ai-template-preset').value;
        const promptEl = document.getElementById('ai-system-prompt');
    const templates = {
        assistant:"You are a helpful AI assistant named {{bot_name}}. Provide clear, accurate, and useful answers based on your instructions and available knowledge. Be honest when information is uncertain or unavailable, and ask for clarification when necessary.",
        support:"You are a professional customer support representative for {{company_name}}. Help customers with their questions in a clear, polite, and practical manner. Use the available instructions and knowledge to provide accurate information, and clearly explain when additional information or assistance is needed.",
        restaurant:"You are the virtual assistant for {{company_name}} restaurant. Help customers with restaurant-related questions in a friendly and professional manner, including information about the menu, opening hours, reservations, services, and policies. Provide clear and accurate answers based on the available information.",
        programming:"You are a programming assistant. Help users understand programming concepts, write and debug code, solve technical problems, and improve their software. Provide accurate, practical, and well-explained solutions while considering the user's existing code and requirements.",
        school:"You are an educational tutor. Help students understand concepts clearly and effectively. Explain difficult topics step by step, provide examples when useful, and adapt explanations to the student's level. Encourage understanding and reasoning rather than simply providing answers."};
        if (preset !== 'custom' && templates[preset]) promptEl.value = templates[preset];
    }

    document.getElementById('ai-system-prompt').addEventListener('input', function () {
        const select = document.getElementById('ai-template-preset');
        if (select.value !== 'custom') select.value = 'custom';
    });

    function toggleMoreOptions(e) {
        if (e) e.stopPropagation();
        const dropdown = document.getElementById('more-options-dropdown');
        dropdown.classList.toggle('show');
    }

    function exportAiSettings() {
        const settings = gatherAiSettingsFromUI();
        downloadJson('ai_settings.json', settings);
    }
    function triggerImportAiSettings() { document.getElementById('ai-import-file').click(); }
    function importAiSettings(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const parsed = JSON.parse(e.target.result);
                renderAiSettings(parsed);
                showToast('AI settings imported into preview! Click Save to apply.');
            } catch (err) { showToast('Invalid JSON file.', 'error'); }
        };
        reader.readAsText(file);
        event.target.value = '';
    }

    function clearAiMemory() {
        confirmDialog('Clear all stored AI conversation history?').then(ok => {
            if (!ok) return;
            withLoading(
                fetch('/api/ai/clear_memory', { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    if (data.success) { showToast('AI memory cleared!'); refreshMemoryCount(); }
                    else throw new Error(data.error);
                })
                .catch(err => showToast(err.message, 'error'))
            );
        });
    }

    function resetAiSettings() {
        confirmDialog('Reset all AI settings to default values?').then(ok => {
            if (!ok) return;
            withLoading(
                fetch('/api/ai/reset', { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        showToast('AI settings reset!');
                        loadAiSettings(true);
                        refreshMemoryCount();
                    } else throw new Error(data.error);
                })
                .catch(err => showToast(err.message, 'error'))
            );
        });
    }

    function saveAiSettings() {
        const settings = gatherAiSettingsFromUI();
        const btn = document.querySelector('#tab-ai .btn-success');
        withButtonLoading(btn,
            fetch('/api/ai_settings', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            })
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Failed to save settings');
                showToast('AI settings saved successfully!');
                cache.ai.data = settings;
                cache.ai.loaded = true;
                cache.ai.timestamp = Date.now();
                refreshMemoryCount();
            })
            .catch(err => showToast(err.message, 'error'))
        );
    }

    function testAiConnection() {
        const settings = gatherAiSettingsFromUI();
        const resultEl = document.getElementById('ai-test-result');
        resultEl.innerHTML = '<span class="mini-spinner"></span> Testing main provider…';
        resultEl.className = 'test-result';
        withLoading(
            fetch('/api/ai/test', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings, provider: 'main' })
            })
            .then(res => res.json())
            .then(data => {
                let html = data.success
                    ? '✅ <b>Main</b> (' + settings.ai_provider + '): Connected!'
                    : '❌ <b>Main</b> (' + settings.ai_provider + '): ' + (data.error || 'Failed');
                resultEl.innerHTML = html;
                resultEl.className = 'test-result ' + (data.success ? 'success' : 'error');
                // Test all alternate providers
                const altTests = [];
                altProviders.forEach((ap, idx) => {
                    if (!ap.apiKey) { altTests.push(Promise.resolve({ idx, ok: false, msg: 'No API key' })); return; }
                    altTests.push(
                        fetch('/api/ai/test', {
                            method: 'POST', headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ settings: { ...settings, ai_provider: ap.provider, ai_api_key: ap.apiKey, ai_model: ap.model, ai_base_url: ap.baseUrl }, provider: 'main' })
                        }).then(r => r.json()).then(d => ({ idx, ok: d.success, msg: d.success ? 'Connected!' : (d.error || 'Failed') }))
                        .catch(e => ({ idx, ok: false, msg: e.message }))
                    );
                });
                return Promise.all(altTests);
            })
            .then(altResults => {
                let html = resultEl.innerHTML;
                altResults.forEach(r => {
                    const ap = altProviders[r.idx];
                    if (!ap) return;
                    const icon = r.ok ? '✅' : '❌';
                    html += '<br>' + icon + ' <b>Alt ' + (r.idx + 1) + '</b> (' + ap.provider + '): ' + r.msg;
                });
                resultEl.innerHTML = html;
                if (altResults.length > 0) {
                    const allOk = altResults.every(r => r.ok);
                    const someOk = altResults.some(r => r.ok);
                    resultEl.className = 'test-result ' + (allOk ? 'success' : (someOk ? 'partial' : 'error'));
                }
            })
            .catch(err => { resultEl.innerHTML = '❌ ' + err.message; resultEl.className = 'test-result error'; })
        );
    }

    document.getElementById('ai-trigger').addEventListener('change', function () {
        const container = document.getElementById('trigger-contains-group');
        const shouldShow = this.value === 'contains_text';
        container.style.display = shouldShow ? 'block' : 'none';
        updateTriggerHint(this.value);
    });

    // Group reply read-only logic
    function updateGroupReplyFields() {
        const groupReply = document.getElementById('ai-group-reply').value;
        const readOnly = groupReply === '0';
        document.getElementById('ai-group-mention').disabled = readOnly;
        document.getElementById('ai-group-memory').disabled = readOnly;
        document.getElementById('ai-group-mention').style.opacity = readOnly ? '0.5' : '1';
        document.getElementById('ai-group-memory').style.opacity = readOnly ? '0.5' : '1';
    }
    document.getElementById('ai-group-reply').addEventListener('change', updateGroupReplyFields);
    updateGroupReplyFields();

    function updatePrivateReplyFields() {
        const privateReply = document.getElementById('ai-private-reply').value;
        const readOnly = privateReply === '0';
        document.getElementById('ai-memory').disabled = readOnly;
        document.getElementById('ai-memory').style.opacity = readOnly ? '0.5' : '1';
    }
    document.getElementById('ai-private-reply').addEventListener('change', updatePrivateReplyFields);
    updatePrivateReplyFields();

    // ----- Playground -----
    function renderMarkdown(text) {
        // Playground rendering: code fences + inline code. Newlines render
        // natively thanks to white-space: pre-wrap on the message bubbles.
        let html = escapeHtml(text);
        const parts = html.split('\`\`\`');
        let out = '';
        for (let i = 0; i < parts.length; i++) {
            out += (i % 2 === 1) ? '<pre><code>' + parts[i] + '</code></pre>' : parts[i];
        }
        return out.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
    }

    function sendPlaygroundMessage() {
        const input = document.getElementById('playground-input');
        const msg = input.value.trim();
        if (!msg) return;
        const container = document.getElementById('playground-messages');
        const placeholder = container.querySelector('div[style*="text-align:center"]');
        if (placeholder && container.children.length === 1) container.innerHTML = '';
        const userDiv = document.createElement('div');
        userDiv.className = 'playground-message user';
        userDiv.textContent = msg;
        container.appendChild(userDiv);
        input.value = '';
        container.scrollTop = container.scrollHeight;
        const botDiv = document.createElement('div');
        botDiv.className = 'playground-message bot';
        botDiv.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;
        const settings = gatherAiSettingsFromUI();
        const memoryLimit = parseInt(settings.ai_memory || '0');
        const historyToSend = memoryLimit > 0 ? playgroundHistory.slice(-memoryLimit) : [];
        fetch('/api/ai/playground', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ settings, history: historyToSend, message: msg })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                botDiv.innerHTML = renderMarkdown(data.response);
                if (memoryLimit > 0) {
                    playgroundHistory.push({ role: 'user', content: msg });
                    playgroundHistory.push({ role: 'assistant', content: data.response });
                }
            } else {
                botDiv.style.color = 'var(--red)';
                botDiv.textContent = 'Error: ' + (data.error || 'Failed to generate response');
            }
            container.scrollTop = container.scrollHeight;
        })
        .catch(err => {
            botDiv.style.color = 'var(--red)';
            botDiv.textContent = 'Error: ' + err.message;
            container.scrollTop = container.scrollHeight;
        });
    }

    function clearPlaygroundChat() {
        playgroundHistory = [];
        const container = document.getElementById('playground-messages');
        container.innerHTML = '<div style="font-size:0.8rem; color:var(--text-3); text-align:center;">' + 'Playground started. Send a message below to test.' + '</div>';
    }

    async function refreshMemoryCount() {
        const display = document.getElementById('memory-count-display');
        const row = document.getElementById('memory-count-row');
        if (row) row.classList.add('skl-bg');
        try {
            const res = await fetch('/api/ai/memory_count');
            const data = await res.json();
            display.textContent = data.success ? data.count + ' messages stored across all chats' : '…';
        } catch (e) { display.textContent = '…'; }
        if (row) row.classList.remove('skl-bg');
    }

    // ======================================================================
    // SETTINGS
    // ======================================================================
    function loadSettings(forceLoad) {
        if (!forceLoad && isCacheValid('settings')) {
            applySettingsData(cache.settings.data);
            return Promise.resolve();
        }
        showSettingsSkeleton();
        return withLoading(
            fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                applySettingsData(data);
                var skel = document.getElementById('settings-skeleton');
                if (skel) skel.remove();
                cache.settings.data = data;
                cache.settings.loaded = true;
                cache.settings.timestamp = Date.now();
            })
            .catch(err => { var skel = document.getElementById('settings-skeleton'); if (skel) skel.remove(); showToast('Error loading settings:' + ' ' + err.message, 'error'); })
        );
    }
    function applySettingsData(data) {
        document.getElementById('settings-bot-token').value = data.bot_token || '';
        document.getElementById('settings-webhook-url').value = data.webhook_url || '';
        if (data.cf_token) document.getElementById('update-cf-token').value = data.cf_token;
    }

    function toggleTokenVisibility() {
        tokenVisible = !tokenVisible;
        document.getElementById('settings-bot-token').type = tokenVisible ? 'text' : 'password';
    }

    function showChangeTokenModal() {
        document.getElementById('token-modal').classList.remove('hidden');
        document.getElementById('new-token-input').value = '';
        document.getElementById('token-test-result').classList.add('hidden');
    }
    function closeTokenModal() { document.getElementById('token-modal').classList.add('hidden'); }

    function updateBotToken() {
        const newToken = document.getElementById('new-token-input').value.trim();
        if (!newToken) { showToast('Enter a token.', 'error'); return; }
        const resultDiv = document.getElementById('token-test-result');
        resultDiv.classList.remove('hidden');
        resultDiv.textContent = 'Testing…';
        resultDiv.style.color = 'var(--text-3)';
        withLoading(
            fetch('/api/settings/token', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ botToken: newToken })
            })
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Failed');
                resultDiv.textContent = '✅ ' + 'Updated!';
                resultDiv.style.color = 'var(--green)';
                cache.settings.loaded = false;
                setTimeout(() => { closeTokenModal(); loadSettings(true); }, 1200);
            })
            .catch(err => { resultDiv.textContent = '❌ ' + err.message; resultDiv.style.color = 'var(--red)'; })
        );
    }

    function testWebhook() {
        const detail = document.getElementById('webhook-test-detail');
        detail.style.display = 'block';
        detail.textContent = 'Testing…';
        detail.style.color = 'var(--text-3)';
        withLoading(
            fetch('/api/settings/webhook-test', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Test failed');
                if (data.last_error) {
                    detail.textContent = '❌ ' + 'Telegram delivery failing' + ': ' + data.last_error;
                    detail.style.color = 'var(--red)';
                    return;
                }
                if (data.url && data.url_matches) {
                    let msg = '✅ Webhook OK' + ': ' + data.url;
                    if (data.pending_updates > 0) msg += ' (' + data.pending_updates + ' ' + 'pending' + ')';
                    detail.textContent = msg;
                    detail.style.color = 'var(--green)';
                } else if (data.url) {
                    detail.textContent = '⚠️ Webhook points elsewhere:' + ' ' + data.url;
                    detail.style.color = 'var(--amber)';
                } else {
                    detail.textContent = '⚠️ No webhook registered. Change the bot token to register it.';
                    detail.style.color = 'var(--amber)';
                }
            })
            .catch(err => { detail.textContent = '❌ ' + err.message; detail.style.color = 'var(--red)'; })
        );
    }

    function fixWebhook() {
        const detail = document.getElementById('webhook-test-detail');
        const btn = document.getElementById('webhook-fix-btn');
        if (detail) { detail.style.display = 'block'; detail.textContent = 'Checking webhook health…'; detail.style.color = 'var(--text-3)'; }
        withButtonLoading(btn,
            fetch('/api/settings/webhook-fix', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Fix failed');
                if (data.fixed) {
                    let msg = '✅ Webhook was missing — registered now: ' + data.url;
                    if (data.pending_updates > 0) msg += ' (' + data.pending_updates + ' pending)';
                    detail.textContent = msg;
                    detail.style.color = 'var(--green)';
                    cache.settings.loaded = false;
                    loadSettings();
                } else if (data.url && data.url_matches) {
                    detail.textContent = '✅ Webhook already healthy: ' + data.url;
                    detail.style.color = 'var(--green)';
                } else {
                    detail.textContent = '⚠️ Could not confirm registration. Try again or re-save the bot token.';
                    detail.style.color = 'var(--amber)';
                }
            })
            .catch(err => { detail.textContent = '❌ ' + err.message; detail.style.color = 'var(--red)'; })
        );
    }

function factoryReset() {
    confirmDialog(
        'WARNING: This will permanently delete ALL data including commands, users, settings, AI memory, bot info, menu commands, and broadcast history. This action is IRREVERSIBLE.',
        'Factory Reset'
    ).then(ok => {
        if (!ok) return;

        // Second safeguard: require typing confirmation
        var cm = document.getElementById('confirm-modal');
        var msg = document.getElementById('confirm-message');
        var okBtn = document.getElementById('confirm-ok');
        var cancelBtn = document.getElementById('confirm-cancel');

        var origOkClick = okBtn.onclick;
        var origCancelClick = cancelBtn.onclick;

        msg.innerHTML =
            '<p style="color:var(--red);font-weight:700;margin-bottom:0.6rem;">⚠️ FINAL CONFIRMATION</p>' +
            '<p>To proceed, type <b style="color:var(--red);font-family:var(--mono);letter-spacing:1px;">FACTORY RESET</b> below:</p>';

        okBtn.querySelector('span').textContent = 'Reset Everything';
        okBtn.disabled = true;

        var inp = document.createElement('input');
        inp.type = 'text';
        inp.id = 'factory-reset-confirm-text';
        inp.className = 'form-input';
        inp.style.marginTop = '0.5rem';
        inp.placeholder = 'Type FACTORY RESET here';

        inp.addEventListener('input', function () {
            okBtn.disabled = inp.value !== 'FACTORY RESET';
        });

        msg.appendChild(inp);
        cm.classList.remove('hidden');

        setTimeout(function () {
            inp.focus();
        }, 100);

        okBtn.onclick = function () {
            if (inp.value !== 'FACTORY RESET') return;

            cm.classList.add('hidden');
            okBtn.onclick = origOkClick;
            cancelBtn.onclick = origCancelClick;

            showToast('Resetting…');

            withLoading(
                fetch('/api/reset', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ confirmation: 'FACTORY RESET' })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            showToast('Reset successful. Reloading…');
                            invalidateCache();

                            setTimeout(() => {
                                window.location.reload();
                            }, 1400);
                        } else {
                            throw new Error(data.error);
                        }
                    })
                    .catch(err => {
                        showToast('Reset error: ' + err.message, 'error');
                    })
            );
        };

        cancelBtn.onclick = function () {
            cm.classList.add('hidden');
            okBtn.onclick = origOkClick;
            cancelBtn.onclick = origCancelClick;
        };
    });
}

    function changeAdminPassword() {
        const newPass = document.getElementById('change-pass-new').value;
        const confirmPw = document.getElementById('change-pass-confirm').value;
        if (!newPass || newPass.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
        if (newPass !== confirmPw) { showToast('Passwords do not match.', 'error'); return; }
        withLoading(
            fetch('/api/change_password', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword: newPass })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showToast('Password updated successfully.');
                    document.getElementById('change-pass-new').value = '';
                    document.getElementById('change-pass-confirm').value = '';
                } else throw new Error(data.error || 'Failed');
            })
            .catch(err => showToast(err.message, 'error'))
        );
    }

    // ======================================================================
    // BOT INFO
    // ======================================================================
function loadBotInfo(forceLoad = false) {
    const resultDiv = document.getElementById('bot-info-result');
    const fields = ['bot-name', 'bot-description', 'bot-short-description'];

    cache.botinfo ??= {
        data: null,
        loaded: false,
        timestamp: 0
    };

    const setLoadingState = (loading) => {
        fields.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.toggle('skl-bg', loading);
            }
        });
    };

    const applyBotInfo = (data) => {
        const name = document.getElementById('bot-name');
        const description = document.getElementById('bot-description');
        const shortDescription = document.getElementById('bot-short-description');

        if (name) name.value = data.name || '';
        if (description) description.value = data.description || '';
        if (shortDescription) shortDescription.value = data.short_description || '';
    };

    if (!forceLoad && isCacheValid('botinfo')) {
        applyBotInfo(cache.botinfo.data);

        if (resultDiv) {
            resultDiv.classList.remove('hidden');
            resultDiv.textContent = '✅ Loaded from Telegram.';
            resultDiv.style.color = 'var(--green)';
        }

        return Promise.resolve(cache.botinfo.data);
    }

    if (resultDiv) {
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = '<span class="mini-spinner"></span> Loading from Telegram…';
        resultDiv.style.color = 'var(--text-3)';
    }

    setLoadingState(true);

    return withLoading(
        fetch('/api/bot_info', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(async res => {
                let data;

                try {
                    data = await res.json();
                } catch {
                    throw new Error(\`Server returned invalid JSON (HTTP \${res.status})\`);
                }

                if (!res.ok) {
                    throw new Error(data.error || \`Request failed (HTTP \${res.status})\`);
                }

                if (!data.success) {
                    throw new Error(data.error || 'Failed to load bot information');
                }

                return data;
            })
            .then(data => {
                applyBotInfo(data);

                cache.botinfo.data = data;
                cache.botinfo.loaded = true;
                cache.botinfo.timestamp = Date.now();

                if (resultDiv) {
                    resultDiv.textContent = '✅ Loaded from Telegram.';
                    resultDiv.style.color = 'var(--green)';
                }

                return data;
            })
            .catch(err => {
                if (resultDiv) {
                    resultDiv.textContent = '❌ ' + (err.message || 'Failed to load bot information');
                    resultDiv.style.color = 'var(--red)';
                }

                throw err;
            })
            .finally(() => {
                setLoadingState(false);
            })
    );
}

    function publishBotInfo() {
        const name = document.getElementById('bot-name').value.trim();
        const description = document.getElementById('bot-description').value.trim();
        const short_description = document.getElementById('bot-short-description').value.trim();
        const resultDiv = document.getElementById('bot-info-result');
        resultDiv.classList.remove('hidden');
        resultDiv.textContent = 'Publishing…';
        resultDiv.style.color = 'var(--text-3)';
        withLoading(
            fetch('/api/bot_info', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, short_description })
            })
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Publish failed');
                resultDiv.textContent = '✅ Published to Telegram!';
                resultDiv.style.color = 'var(--green)';
                cache.botinfo.loaded = false;
            })
            .catch(err => { resultDiv.textContent = '❌ ' + err.message; resultDiv.style.color = 'var(--red)'; })
        );
    }

    // ======================================================================
    // BACKUP & RESTORE
    // ======================================================================
    // ======================================================================
    // COMMAND PACK IMPORT/EXPORT (#31)
    // ======================================================================
    function exportCommandPack() {
        fetch('/api/commands/export')
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Export failed');
                const stamp = new Date().toISOString().slice(0, 10);
                downloadJson('nyxx-command-pack-' + stamp + '.json', data.data);
                showToast('Command pack exported.', 'success');
            })
            .catch(err => showToast(err.message, 'error'));
    }

    function importCommandPack(event) {
        const file = event.target.files[0];
        if (!file) { event.target.value = ''; return; }
        const reader = new FileReader();
        reader.onload = function (e) {
            let parsed;
            try { parsed = JSON.parse(e.target.result); } catch (err) { showToast('Invalid command pack file.', 'error'); event.target.value = ''; return; }
            if (!parsed || parsed.app !== 'nyxx-command-pack') { showToast('Invalid command pack file.', 'error'); event.target.value = ''; return; }
            const cmdCount = (parsed.commands || []).length;
            // Two-step choice: Merge (overwrite same names) or Replace (wipe
            // everything first). Cancelling at either step aborts.
            confirmDialog('Import ' + cmdCount + ' commands as MERGE?\\nExisting commands with the same name will be overwritten.')
                .then(merge => {
                    if (merge) { sendCommandPackImport(event, parsed, 'merge'); return; }
                    return confirmDialog('REPLACE all current commands with the pack?\\nYour existing commands will be deleted first!')
                        .then(replace => {
                            if (replace) sendCommandPackImport(event, parsed, 'replace');
                            else event.target.value = '';
                        });
                })
                .catch(() => { event.target.value = ''; });
        };
        reader.readAsText(file);
    }

    function sendCommandPackImport(event, parsed, mode) {
        fetch('/api/commands/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: parsed, mode })
        })
            .then(res => res.json())
            .then(data => {
                event.target.value = '';
                if (!data.success) throw new Error(data.error || 'Import failed');
                showToast('Imported ' + data.imported + ' commands.', 'success');
                invalidateCache();
                loadCommands();
            })
            .catch(err => { event.target.value = ''; showToast(err.message, 'error'); });
    }

    function downloadJson(filename, obj) {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj, null, 2));
        const a = document.createElement('a');
        a.href = dataStr;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    function exportBackup() {
        const resultDiv = document.getElementById('backup-result');
        resultDiv.classList.remove('hidden');
        resultDiv.textContent = '…';
        resultDiv.style.color = 'var(--text-3)';
        withLoading(
            fetch('/api/backup')
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Export failed');
                const stamp = new Date().toISOString().slice(0, 10);
                downloadJson('nyxx-backup-' + stamp + '.json', data.data);
                resultDiv.textContent = 'Backup exported!';
                resultDiv.style.color = 'var(--green)';
            })
            .catch(err => { resultDiv.textContent = 'Export failed:' + ' ' + err.message; resultDiv.style.color = 'var(--red)'; })
        );
    }

    // ======================================================================
    // AUDIT LOGS (#22)
    // ======================================================================
    function loadAuditLogs() {
        const body = document.getElementById('audit-logs-body');
        if (!body) return;
        fetch('/api/logs?limit=150')
            .then(res => res.json())
            .then(data => {
                if (!data.logs) throw new Error(data.error || 'Failed to load logs');
                if (data.logs.length === 0) {
                    body.innerHTML = '<tr><td colspan="3" class="empty-state"><i class="fa-solid fa-inbox"></i>No activity recorded yet.</td></tr>';
                    return;
                }
                body.innerHTML = data.logs.map(l => {
                    const time = l.timestamp ? escapeHtml(String(l.timestamp).replace('T', ' ').slice(0, 19)) : '';
                    const user = (l.user_id === null || l.user_id === undefined) ? '<span class="muted">—</span>' : escapeHtml(String(l.user_id));
                    return '<tr><td class="mono">' + time + '</td><td class="mono">' + user + '</td><td>' + escapeHtml(l.action || '') + '</td></tr>';
                }).join('');
            })
            .catch(err => {
                body.innerHTML = '<tr><td colspan="3" class="empty-state text-danger">' + escapeHtml(err.message) + '</td></tr>';
            });
    }

    function clearAuditLogs() {
        confirmDialog('Delete all audit log entries? This cannot be undone.').then(ok => {
            if (!ok) return;
            fetch('/api/logs', { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                    if (!data.success) throw new Error(data.error || 'Failed to clear logs');
                    showToast('Audit logs cleared.', 'success');
                    loadAuditLogs();
                })
                .catch(err => showToast(err.message, 'error'));
        });
    }

    function importBackup(event) {
        const file = event.target.files[0];
        if (!file) { event.target.value = ''; return; }
        const reader = new FileReader();
        reader.onload = function (e) {
            let parsed;
            try { parsed = JSON.parse(e.target.result); } catch (err) { showToast('Invalid backup file.', 'error'); event.target.value = ''; return; }
            if (!parsed || parsed.app !== 'nyxx') { showToast('Invalid backup file.', 'error'); event.target.value = ''; return; }
            confirmDialog('Restore this backup? Current data will be overwritten.').then(ok => {
                if (!ok) { event.target.value = ''; return; }
                const resultDiv = document.getElementById('backup-result');
                resultDiv.classList.remove('hidden');
                resultDiv.textContent = '…';
                resultDiv.style.color = 'var(--text-3)';
                withLoading(
                    fetch('/api/backup/restore', {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ data: parsed })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (!data.success) throw new Error(data.error || 'Restore failed');
                        resultDiv.textContent = 'Backup restored successfully!';
                        resultDiv.style.color = 'var(--green)';
                        invalidateCache();
                        loadCommands(true);
                    })
                    .catch(err => { resultDiv.textContent = 'Import failed:' + ' ' + err.message; resultDiv.style.color = 'var(--red)'; })
                );
            });
        };
        reader.readAsText(file);
        event.target.value = '';
    }

    function customBackupCheckAll(check) {
        document.querySelectorAll('.custom-backup-cb').forEach(function(cb) { cb.checked = check; });
    }

    async function exportCustomBackup() {
        var checked = [];
        document.querySelectorAll('.custom-backup-cb:checked').forEach(function(cb) { checked.push(cb.value); });
        if (checked.length === 0) { showToast('Select at least one item to export.', 'error'); return; }
        var resultDiv = document.getElementById('backup-result');
        document.getElementById('custom-backup-modal').classList.add('hidden');
        resultDiv.classList.remove('hidden');
        resultDiv.textContent = '\u2026';
        resultDiv.style.color = 'var(--text-3)';
        try {
            var res = await fetch('/api/backup');
            var data = await res.json();
            if (!data.success) throw new Error(data.error || 'Export failed');
            var fullData = data.data;
            // Arrays are always present (possibly empty) so /api/backup/restore
            // accepts the file even when only settings were selected.
            var customData = { app: 'nyxx', version: fullData.version, exported_at: fullData.exported_at, commands: [], users: [], ai_messages: [], blocked_users: [], settings: {}, custom: true };
            if (checked.includes('commands')) customData.commands = fullData.commands || [];
            if (checked.includes('users')) customData.users = fullData.users || [];
            if (checked.includes('ai_messages')) customData.ai_messages = fullData.ai_messages || [];
            if (checked.includes('ai_settings') || checked.includes('menu_commands') || checked.includes('bot_config')) {
                customData.settings = {};
                var settings = fullData.settings || {};
                var aiKeys = ['ai_enabled','ai_provider','ai_api_key','ai_base_url','ai_model','ai_system_prompt','ai_trigger','ai_memory','ai_fallback','ai_temperature','ai_max_tokens','ai_top_p','ai_suggested_questions_enabled','ai_suggested_questions','ai_suggested_one_time','ai_alt_providers','ai_custom_headers','ai_display_name','ai_language','ai_style','ai_length','ai_rate_limit','ai_response_delay','ai_ignore_prefixes','ai_group_mention','ai_private_reply','ai_group_reply','ai_ignore_bots','ai_ignore_forwarded','ai_typing_indicator','ai_retry_on_failure','ai_custom_vars_text','ai_knowledge_bases','ai_trigger_text','ai_group_memory','ai_strict_mode','ai_rtl_support','ai_streaming','ai_global_rate_limit','ai_global_rate_window'];
                if (checked.includes('ai_settings')) aiKeys.forEach(function(k) { if (settings[k] !== undefined) customData.settings[k] = settings[k]; });
                if (checked.includes('menu_commands') && settings.menu_commands) customData.settings.menu_commands = settings.menu_commands;
                if (checked.includes('bot_config')) {
                    ['bot_token','webhook_url','webhook_secret','bot_username','bot_name'].forEach(function(k) { if (settings[k] !== undefined) customData.settings[k] = settings[k]; });
                }
            }
            if (checked.includes('blocked_users')) customData.blocked_users = fullData.blocked_users || [];
            var stamp = new Date().toISOString().slice(0, 10);
            downloadJson('nyxx-custom-backup-' + stamp + '.json', customData);
            resultDiv.textContent = 'Custom backup exported (' + checked.length + ' item(s))!';
            resultDiv.style.color = 'var(--green)';
        } catch (err) {
            resultDiv.textContent = 'Export failed: ' + err.message;
            resultDiv.style.color = 'var(--red)';
        }
    }

    // ======================================================================
    // UPDATE / SELF-UPDATE
    // ======================================================================
    function openTokenGenerator() {
        const url = 'https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=%5B%7B%22key%22%3A%22workers_scripts%22%2C%22type%22%3A%22edit%22%7D%5D&accountId=*&zoneId=all&name=Nyxx%20Updater';
        window.open(url, '_blank');
    }

    async function loadUpdateTab() {
        await loadSettings(true);
        await checkForUpdate(true);
        toggleCfSection();
    }

    function toggleCfSection() {
        document.getElementById('update-cf-section').style.display = updateAvailable ? 'block' : 'none';
        updateUpdateButtonState();
    }

    async function autoCheckForUpdate() {
        const now = Date.now();
        const lastCheck = parseInt(localStorage.getItem('updateCheckTimestamp') || '0');
        if (now - lastCheck < UPDATE_COOLDOWN_MS && updateChecked) {
            if (updateAvailable) showUpdateBanner(true);
            return;
        }
        await checkForUpdate(true);
        localStorage.setItem('updateCheckTimestamp', String(now));
        updateChecked = true;
    }

    function checkForUpdate(force) {
        const latestInput = document.getElementById('update-latest-version');
        const detailsDiv = document.getElementById('update-version-details');
        latestInput.placeholder = '…';
        detailsDiv.textContent = '';
        return withLoading(
            fetch('/api/version')
            .then(res => res.json())
            .then(data => {
                if (data.latest) {
                    latestInput.value = data.latest;
                    latestVersion = data.latest;
                    workerUrl = data.worker_url || null;
                    let details = '';
                    if (data.released) details += '📅 ' + data.released;
                    if (data.notes) details += (details ? ' | ' : '') + '📝 ' + data.notes;
                    detailsDiv.textContent = details;
                    updateAvailable = compareVersions(data.latest, data.current) > 0;
                } else {
                    latestInput.value = 'Error';
                    updateAvailable = false;
                }
            })
            .catch(() => { latestInput.value = 'Error'; updateAvailable = false; })
            .finally(() => {
                updateUpdateButtonState();
                toggleCfSection();
                showUpdateBanner(updateAvailable);
            })
        );
    }

    function compareVersions(v1, v2) {
        const parts1 = String(v1).split('.').map(Number);
        const parts2 = String(v2).split('.').map(Number);
        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const n1 = parts1[i] || 0;
            const n2 = parts2[i] || 0;
            if (n1 > n2) return 1;
            if (n1 < n2) return -1;
        }
        return 0;
    }

    function showUpdateBanner(show) {
        const banner = document.getElementById('update-banner-btn');
        const statusItems = document.getElementById('status-items');
        banner.classList.toggle('hidden', !show);
        statusItems.style.display = show ? 'none' : 'flex';
    }

    function updateUpdateButtonState() {
        const btn = document.getElementById('update-btn');
        btn.disabled = !updateAvailable;
        btn.title = updateAvailable ? '' : 'No update available or already latest.';
    }

    async function performUpdate() {
        const statusDiv = document.getElementById('update-status');
        statusDiv.classList.remove('hidden');
        statusDiv.textContent = '…';
        statusDiv.style.color = 'var(--text-3)';
        if (!updateAvailable) { statusDiv.textContent = '❌ No update available.'; statusDiv.style.color = 'var(--red)'; return; }
        const token = document.getElementById('update-cf-token').value.trim();
        if (!token) { statusDiv.textContent = '❌ Please enter a Cloudflare API token.'; statusDiv.style.color = 'var(--red)'; return; }
        const resultDiv = document.getElementById('update-validation-result');
        resultDiv.classList.remove('hidden');
        resultDiv.textContent = 'Validating token…';
        resultDiv.style.color = 'var(--text-3)';
        let validationData;
        try {
            const res = await fetch('/api/update/validate', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            validationData = await res.json();
            if (!validationData.valid) throw new Error(validationData.error || 'Invalid token');
            resultDiv.textContent = '✅ ' + validationData.accountId + ' · ' + validationData.scriptName;
            resultDiv.style.color = 'var(--green)';
        } catch (e) {
            resultDiv.textContent = '❌ ' + e.message;
            resultDiv.style.color = 'var(--red)';
            statusDiv.textContent = '❌ Update aborted: token invalid.';
            statusDiv.style.color = 'var(--red)';
            return;
        }
        const accountId = validationData.accountId;
        const scriptName = validationData.scriptName;
        if (!accountId || !scriptName) {
            statusDiv.textContent = '❌ Could not determine Account ID or Script Name.';
            statusDiv.style.color = 'var(--red)';
            return;
        }
        statusDiv.textContent = 'Updating…';
        statusDiv.style.color = 'var(--text-3)';
        try {
            const updateRes = await fetch('/api/update', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, accountId, scriptName, workerUrl })
            });
            const updateData = await updateRes.json();
            if (!updateData.success) throw new Error(updateData.error || 'Update failed');
            statusDiv.textContent = '✅ Update successful! New version: ' + (updateData.version || 'unknown') + '.';
            statusDiv.style.color = 'var(--green)';
            showToast('Update completed!', 'error');
            await checkForUpdate(true);
        } catch (e) {
            statusDiv.textContent = '❌ ' + e.message;
            statusDiv.style.color = 'var(--red)';
        }
    }

    // ======================================================================
    // INIT
    // ======================================================================
    document.getElementById('update-btn').addEventListener('click', performUpdate);
    window.onload = function () {
        checkStatus();
        requestAnimationFrame(function() { collapseTabs(); });
    };
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
};
const JSON_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...SECURITY_HEADERS,
};

function apiJson(body, status = 200) {
    return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

// Uniform 500 for unexpected internal errors (#27): details go to the server
// log, clients only get a generic message.
function internalError(err) {
    console.error('API error:', err);
    return apiJson({ error: 'Internal server error' }, 500);
}

const PASSWORD_PREFIX = 'sha256$';

// Constant-time string comparison for secrets (webhook token, etc.) so
// response timing cannot leak how many leading characters matched.
function timingSafeEqual(a, b) {
    const enc = new TextEncoder();
    const ab = enc.encode(String(a));
    const bb = enc.encode(String(b));
    const len = Math.max(ab.length, bb.length);
    let diff = ab.length ^ bb.length;
    for (let i = 0; i < len; i++) {
        diff |= (ab[i] || 0) ^ (bb[i] || 0);
    }
    return diff === 0;
}

const PBKDF2_PREFIX = 'pbkdf2$';
const PBKDF2_ITERATIONS = 100000;

// Salted PBKDF2-SHA256 password hashing (#7). Stored format:
//   pbkdf2$<iterations>$<salt-hex>$<hash-hex>
// Legacy formats (plain text and unsalted "sha256$<hex>") still verify and
// are transparently re-hashed on the next successful login.
async function hashPassword(password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hex = await pbkdf2Hash(password, salt, PBKDF2_ITERATIONS);
    return `${PBKDF2_PREFIX}${PBKDF2_ITERATIONS}$${toHex(salt)}$${hex}`;
}

function toHex(buf) {
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

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
        const data = new TextEncoder().encode(candidate);
        const digest = await crypto.subtle.digest('SHA-256', data);
        const hex = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
        return timingSafeEqual(PASSWORD_PREFIX + hex, stored);
    }
    // Legacy installs stored the admin password in plain text; keep them
    // working until the password is next changed (which re-hashes it).
    return stored === candidate;
}

// Transparent upgrade: re-hash legacy (plain / sha256) records with the
// current salted scheme after a successful verification.
async function maybeRehashPassword(db, stored, candidate) {
    if (!stored || stored.startsWith(PBKDF2_PREFIX)) return;
    if (await verifyPassword(stored, candidate)) {
        await setSetting(db, 'admin_password', await hashPassword(candidate));
    }
}

// ============================================================================
// WORKER ENTRY POINT
// ============================================================================
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        try {
            // Dashboard
            if (request.method === 'GET' && url.pathname === '/') {
                return new Response(DASHBOARD_HTML, {
                    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...SECURITY_HEADERS }
                });
            }

            // Public endpoints
            // CSRF defense: state-changing requests must originate from the
            // dashboard itself. Telegram webhook deliveries (/webhook) are
            // exempt — they carry the secret token instead of an Origin.
            if (request.method !== 'GET' && url.pathname.startsWith('/api/')) {
                const origin = request.headers.get('Origin');
                if (origin) {
                    let originOk = false;
                    try { originOk = new URL(origin).host === url.host; } catch (e) {}
                    if (!originOk) return apiJson({ error: 'Cross-origin request rejected' }, 403);
                }
            }
            if (request.method === 'GET' && url.pathname === '/api/status') return await getStatus(env);
            if (request.method === 'POST' && url.pathname === '/api/setup') return await handleSetup(request, env);
            if (request.method === 'POST' && url.pathname === '/api/login') return await handleLogin(request, env);
            if (request.method === 'GET' && url.pathname === '/api/version') return await getVersionInfo(env);
            if (request.method === 'POST' && url.pathname === '/webhook') return await handleTelegramWebhook(request, env, ctx);

            // Protected endpoints
            const session = await getSession(request, env);
            if (!session) return apiJson({ error: 'Unauthorized' }, 401);

            if (request.method === 'POST' && url.pathname === '/api/logout') return await handleLogout(request, env);

            // Commands
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

            // Menu
            if (request.method === 'GET' && url.pathname === '/api/menu_commands') return await getMenuCommands(env);
            if (request.method === 'POST' && url.pathname === '/api/menu_commands') return await setMenuCommands(request, env);

            // Users
            if (request.method === 'GET' && url.pathname === '/api/users') return await getUsers(env, url);
            if (request.method === 'PUT' && url.pathname === '/api/users/role') return await updateUserRole(request, env);
            if (request.method === 'POST' && url.pathname === '/api/users/send_message') return await sendUserPrivateMessage(request, env);
            if (request.method === 'POST' && url.pathname === '/api/users/message/edit') return await editSentMessage(request, env);
            if (request.method === 'POST' && url.pathname === '/api/users/message/delete') return await deleteSentMessage(request, env);
            if (request.method === 'GET' && url.pathname.startsWith('/api/users/') && url.pathname.endsWith('/admin_messages')) return await getUserAdminMessages(env, url);
            if (request.method === 'POST' && url.pathname === '/api/users/block') return await blockUser(request, env);
            if (request.method === 'POST' && url.pathname === '/api/users/unblock') return await unblockUser(request, env);
            if (request.method === 'GET' && url.pathname.startsWith('/api/users/block_status/')) return await getBlockStatus(env, url);
            if (request.method === 'GET' && url.pathname.startsWith('/api/users/') && url.pathname.endsWith('/chat_history')) return await getUserChatHistory(env, url);
            if (request.method === 'POST' && url.pathname === '/api/broadcast') return await handleBroadcast(request, env);
            if (url.pathname === '/api/broadcast/settings') {
                if (request.method === 'GET') return await handleBroadcastSettings(request, env);
                if (request.method === 'POST') return await handleBroadcastSettings(request, env);
            }
            if (request.method === 'POST' && url.pathname === '/api/broadcast/edit') return await editBroadcastMessage(request, env);
            if (request.method === 'POST' && url.pathname === '/api/broadcast/delete') return await deleteBroadcastMessage(request, env);
            if (request.method === 'GET' && url.pathname === '/api/broadcast/history') return await getBroadcastHistory(env);
            if (request.method === 'POST' && url.pathname === '/api/broadcast/clear_history') return await clearBroadcastHistory(env);

            // Cron management (#30)
            if (request.method === 'GET' && url.pathname === '/api/cron') return await getCronSettings(env);
            if (request.method === 'POST' && url.pathname === '/api/cron') return await saveCronSettings(request, env);
            if (request.method === 'POST' && url.pathname === '/api/cron/run') return await runCronNow(env);
            if (request.method === 'POST' && url.pathname.startsWith('/api/users/') && url.pathname.endsWith('/clear_memory')) return await clearUserMemory(env, url);

            // AI
            if (request.method === 'GET' && url.pathname === '/api/ai_settings') return await getAiSettings(env);
            if (request.method === 'POST' && url.pathname === '/api/ai_settings') return await saveAiSettings(request, env);
            if (request.method === 'POST' && url.pathname === '/api/ai/test') return await handleAiTest(request, env);
            if (request.method === 'POST' && url.pathname === '/api/ai/playground') return await handleAiPlayground(request, env);
            if (request.method === 'POST' && url.pathname === '/api/ai/reset') return await resetAiSettings(env);
            if (request.method === 'POST' && url.pathname === '/api/ai/clear_memory') return await clearAiMemory(env);
            if (request.method === 'GET' && url.pathname === '/api/ai/memory_count') return await getAiMemoryCount(env);

            // Settings
            if (request.method === 'GET' && url.pathname === '/api/settings') return await getSettings(env, url.origin);
            if (request.method === 'POST' && url.pathname === '/api/settings/token') return await updateBotToken(request, env, url.origin);
            if (request.method === 'POST' && url.pathname === '/api/settings/webhook-test') return await handleWebhookTest(env);
            if (request.method === 'POST' && url.pathname === '/api/settings/webhook-fix') return await handleWebhookFix(env, url.origin);
            if (request.method === 'POST' && url.pathname === '/api/change_password') return await changeAdminPassword(request, env);

            // Bot info
            if (request.method === 'GET' && url.pathname === '/api/bot_info') return await getBotInfo(env);
            if (request.method === 'POST' && url.pathname === '/api/bot_info') return await setBotInfo(request, env);

            // Overview stats
            if (request.method === 'GET' && url.pathname === '/api/stats') return await getStats(env);

            // Backup & restore
            if (request.method === 'GET' && url.pathname === '/api/backup') return await exportBackup(env);
            if (request.method === 'POST' && url.pathname === '/api/backup/restore') return await restoreBackup(request, env);

            // Reset
            if (request.method === 'POST' && url.pathname === '/api/reset') return await factoryReset(request, env);

            // Audit logs (#22)
            if (request.method === 'GET' && url.pathname === '/api/logs') return await getAuditLogs(env, url);
            if (request.method === 'DELETE' && url.pathname === '/api/logs') return await clearAuditLogs(env);

            // Update
            if (request.method === 'POST' && url.pathname === '/api/update/validate') return await validateCloudflareToken(request, env);
            if (request.method === 'POST' && url.pathname === '/api/update') return await performUpdate(request, env);

            // Session check
            if (request.method === 'GET' && url.pathname === '/api/check_session') return apiJson({ logged_in: true });

            return new Response('Not Found', { status: 404, headers: SECURITY_HEADERS });
        } catch (error) {
            console.error(error);
            // Never leak internal error details to clients.
            return apiJson({ error: 'Internal server error' }, 500);
        }
    },

    // Cron entry point (#29). Enable by adding a trigger in wrangler, e.g.:
    //   "triggers": { "crons": ["0 3 * * *"] }
    async scheduled(controller, env, ctx) {
        ctx.waitUntil(runScheduledCleanup(env));
    }
};

// Daily housekeeping — fully configurable per feature from the Cron tab. Each
// part of the data model has its own retention knob, and the whole job can be
// disabled without touching the wrangler trigger. Safe to run at any frequency.
const CRON_DEFAULTS = {
    cron_enabled: '1',
    cron_sessions_days: 1,
    cron_bot_sessions_days: 30,
    cron_login_attempts_hours: 2,
    cron_rate_limits_hours: 24,
    cron_logs_days: 7,
    cron_ai_messages_days: 0,
    cron_broadcast_days: 30,
    cron_inactive_users_days: 0,
};
const CRON_BOUNDS = {
    cron_sessions_days: [1, 365],
    cron_bot_sessions_days: [1, 3650],
    cron_login_attempts_hours: [1, 720],
    cron_rate_limits_hours: [1, 2160],
    cron_logs_days: [1, 3650],
    cron_ai_messages_days: [0, 3650],
    cron_broadcast_days: [1, 3650],
    cron_inactive_users_days: [0, 3650],
};

async function getCronSettingsFromDb(env) {
    const keys = Object.keys(CRON_DEFAULTS);
    const placeholders = keys.map(() => '?').join(', ');
    const rows = await env.DB.prepare(`SELECT key, value FROM settings WHERE key IN (${placeholders})`).bind(...keys).all();
    const raw = {};
    for (const row of (rows.results || [])) raw[row.key] = row.value;
    const cfg = { cron_enabled: raw.cron_enabled === '0' ? '0' : '1' };
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
    try {
        await initializeDatabase(env.DB);
        cfg = await getCronSettingsFromDb(env);
    } catch (e) {
        console.error('Scheduled cleanup failed:', e);
        return null;
    }
    if (cfg.cron_enabled === '0') return null;
    try {
        const db = env.DB;
        const nowMinute = Math.floor(Date.now() / 60000);
        const changes = async (stmt) => { try { const r = await stmt.run(); return (r && r.meta && r.meta.changes) || 0; } catch (e) { return 0; } };
        const summary = {};
        summary.dashboard_sessions = await changes(db.prepare(`DELETE FROM sessions WHERE user_id IS NULL AND created_at <= datetime('now', '-${cfg.cron_sessions_days} day')`));
        summary.bot_sessions = await changes(db.prepare(`DELETE FROM sessions WHERE token LIKE 'bot-%' AND updated_at <= datetime('now', '-${cfg.cron_bot_sessions_days} day')`));
        summary.login_attempts = await changes(db.prepare('DELETE FROM login_attempts WHERE minute <= ?').bind(nowMinute - cfg.cron_login_attempts_hours * 60));
        summary.ai_rate_limits = await changes(db.prepare('DELETE FROM ai_rate_limits WHERE minute < ?').bind(nowMinute - cfg.cron_rate_limits_hours * 60));
        summary.audit_logs = await changes(db.prepare(`DELETE FROM logs WHERE timestamp <= datetime('now', '-${cfg.cron_logs_days} day')`));
        if (cfg.cron_ai_messages_days > 0) {
            summary.ai_messages = await changes(db.prepare(`DELETE FROM ai_messages WHERE timestamp <= datetime('now', '-${cfg.cron_ai_messages_days} day')`));
        }
        if (cfg.cron_broadcast_days > 0) {
            summary.broadcast_history = await changes(db.prepare(`DELETE FROM broadcast_history WHERE sent_at <= datetime('now', '-${cfg.cron_broadcast_days} day')`));
            await changes(db.prepare('DELETE FROM broadcast_recipients WHERE broadcast_id NOT IN (SELECT id FROM broadcast_history)'));
        }
        if (cfg.cron_inactive_users_days > 0) {
            const inactive = await db.prepare(`SELECT id FROM users WHERE last_active <= datetime('now', '-${cfg.cron_inactive_users_days} day')`).all();
            const ids = (inactive.results || []).map(r => r.id);
            if (ids.length) {
                const placeholders = ids.map(() => '?').join(', ');
                await db.prepare(`DELETE FROM ai_messages WHERE chat_id IN (${placeholders})`).bind(...ids).run();
                await db.prepare(`DELETE FROM blocked_users WHERE user_id IN (${placeholders})`).bind(...ids).run();
                await db.prepare(`DELETE FROM sessions WHERE user_id IN (${placeholders}) AND token LIKE 'bot-%'`).bind(...ids).run();
                summary.users = await changes(db.prepare(`DELETE FROM users WHERE id IN (${placeholders})`).bind(...ids));
            }
        }
        try {
            await setSetting(db, 'cron_last_run', JSON.stringify({ at: new Date().toISOString(), summary }));
        } catch (e) {}
        await logAction(db, null, 'Scheduled cleanup: ' + JSON.stringify(summary));
        return summary;
    } catch (e) {
        console.error('Scheduled cleanup failed:', e);
        return null;
    }
}

async function getCronSettings(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const cfg = await getCronSettingsFromDb(env);
        let lastRun = null;
        try {
            const raw = await getSetting(env.DB, 'cron_last_run');
            if (raw) lastRun = JSON.parse(raw);
        } catch (e) {}
        return apiJson({ success: true, settings: cfg, last_run: lastRun });
    } catch (err) {
        return internalError(err);
    }
}

async function saveCronSettings(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        await initializeDatabase(env.DB);
        for (const key of Object.keys(CRON_DEFAULTS)) {
            if (body[key] === undefined) continue;
            if (key === 'cron_enabled') {
                await setSetting(env.DB, key, body[key] === '1' || body[key] === 1 || body[key] === true ? '1' : '0');
                continue;
            }
            const [min, max] = CRON_BOUNDS[key];
            const parsed = parseInt(body[key]);
            if (isNaN(parsed) || parsed < min || parsed > max) {
                return apiJson({ error: `Invalid value for ${key} (allowed ${min}-${max})` }, 400);
            }
            await setSetting(env.DB, key, String(parsed));
        }
        await logAction(env.DB, null, 'Cron retention settings updated');
        return apiJson({ success: true, settings: await getCronSettingsFromDb(env) });
    } catch (err) {
        return internalError(err);
    }
}

async function runCronNow(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const summary = await runScheduledCleanup(env);
        if (!summary) return apiJson({ error: 'Cron is disabled (enable it first) or cleanup failed' }, 400);
        return apiJson({ success: true, summary });
    } catch (err) {
        return internalError(err);
    }
}

// ============================================================================
// DATABASE INIT (cached per isolate — schema is created once, not per request)
// ============================================================================
const dbInitCache = new WeakMap();

// Bump SCHEMA_VERSION when adding migrations below. Version 1 is the original
// schema (created by the idempotent statements, safe on fresh databases too).
const SCHEMA_VERSION = 3;

// Ordered migrations: each key runs exactly once, guarded by the stored
// schema_version setting (#17).
const MIGRATIONS = {
    // 1 -> 2: bot conversation state now uses synthetic 'bot-<user_id>'
    // tokens so it never collides with dashboard session rows (#16).
    2: [
        `INSERT INTO sessions (token, user_id, command, created_at, updated_at)
         SELECT 'bot-' || user_id, user_id, command, created_at, updated_at
         FROM sessions WHERE user_id IS NOT NULL AND token NOT LIKE 'bot-%'`,
        `DELETE FROM sessions WHERE user_id IS NOT NULL AND token NOT LIKE 'bot-%'`,
    ],
    // 2 -> 3: sent-message tracking (edit/delete from the dashboard) and
    // broadcast photo/kind columns. ALTER TABLE statements are wrapped by the
    // runner so they are safe to re-run.
    3: [
        `CREATE TABLE IF NOT EXISTS admin_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, message_id INTEGER, kind TEXT DEFAULT 'text', text TEXT, buttons_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
        `CREATE TABLE IF NOT EXISTS broadcast_recipients (broadcast_id INTEGER NOT NULL, chat_id INTEGER NOT NULL, message_id INTEGER, PRIMARY KEY (broadcast_id, chat_id))`,
        `CREATE INDEX IF NOT EXISTS idx_admin_messages_chat ON admin_messages(chat_id)`,
        `ALTER TABLE broadcast_history ADD COLUMN photo_url TEXT`,
        `ALTER TABLE broadcast_history ADD COLUMN kind TEXT DEFAULT 'text'`,
    ],
};

async function initializeDatabase(db) {
    if (dbInitCache.has(db)) return dbInitCache.get(db);
    const schema = `
        CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, first_name TEXT, role TEXT DEFAULT 'user', is_premium BOOLEAN DEFAULT 0, last_active DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS commands (command TEXT PRIMARY KEY, parent TEXT, response_type TEXT DEFAULT 'text', content TEXT, media_url TEXT, buttons_json TEXT, is_admin_only BOOLEAN DEFAULT 0, enabled BOOLEAN DEFAULT 1, show_reply_keyboard BOOLEAN DEFAULT 0, reply_keyboard_json TEXT, order_idx INTEGER DEFAULT 0);
        CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER UNIQUE, command TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, action TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS ai_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, role TEXT, content TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS ai_rate_limits (user_id INTEGER NOT NULL, minute INTEGER NOT NULL, count INTEGER NOT NULL DEFAULT 1, PRIMARY KEY (user_id, minute));
        CREATE TABLE IF NOT EXISTS blocked_users (user_id INTEGER PRIMARY KEY, block_type TEXT NOT NULL DEFAULT 'full', blocked_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS login_attempts (minute INTEGER PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0);
        CREATE TABLE IF NOT EXISTS broadcast_history (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, photo_url TEXT, kind TEXT DEFAULT 'text', buttons_json TEXT, recipient_count INTEGER, sent_count INTEGER, sent_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS admin_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, message_id INTEGER, kind TEXT DEFAULT 'text', text TEXT, buttons_json TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS broadcast_recipients (broadcast_id INTEGER NOT NULL, chat_id INTEGER NOT NULL, message_id INTEGER, PRIMARY KEY (broadcast_id, chat_id));
        CREATE INDEX IF NOT EXISTS idx_commands_parent ON commands(parent);
        CREATE INDEX IF NOT EXISTS idx_ai_messages_chat ON ai_messages(chat_id);
        CREATE INDEX IF NOT EXISTS idx_logs_user ON logs(user_id);
        CREATE INDEX IF NOT EXISTS idx_sessions_bot ON sessions(user_id) WHERE user_id IS NOT NULL;
        CREATE INDEX IF NOT EXISTS idx_admin_messages_chat ON admin_messages(chat_id);
    `;
    const statements = schema.split(';').filter(s => s.trim().length > 0);
    const p = (async () => {
        // Base schema: idempotent, runs on fresh and existing databases alike.
        await db.batch(statements.map(s => db.prepare(s)));
        // Then apply any pending versioned migrations.
        let versionRow = null;
        try {
            versionRow = await db.prepare("SELECT value FROM settings WHERE key = 'schema_version'").first();
        } catch (e) { /* settings table was just created; treat as version 1 */ }
        const current = versionRow && versionRow.value ? parseInt(versionRow.value, 10) || 1 : 1;
        for (let v = current + 1; v <= SCHEMA_VERSION; v++) {
            const steps = MIGRATIONS[v] || [];
            for (const sql of steps) {
                // Individual steps may legitimately fail (e.g. ALTER TABLE on
                // a column that already exists); the rest must still run.
                try {
                    await db.prepare(sql).run();
                } catch (e) {
                    if (!/duplicate column|already exists/i.test(String(e.message || ''))) throw e;
                }
            }
            await db.prepare("INSERT INTO settings (key, value) VALUES ('schema_version', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
                .bind(String(v)).run();
        }
    })();
    dbInitCache.set(db, p);
    try {
        await p;
    } catch (e) {
        dbInitCache.delete(db);
        throw e;
    }
}

async function getSetting(db, key) {
    const row = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(key).first();
    return row ? row.value : null;
}

async function setSetting(db, key, value) {
    await db.prepare(`
        INSERT INTO settings (key, value) VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `).bind(key, value).run();
}

// Append an audit event to the `logs` table (#22). Never throws: logging must
// not break the calling flow.
async function logAction(db, userId, action) {
    try {
        await db.prepare('INSERT INTO logs (user_id, action) VALUES (?, ?)')
            .bind(userId === undefined || userId === null ? null : userId, String(action)).run();
    } catch (e) {
        console.error('logAction failed:', e);
    }
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================
// Dashboard sessions are purged when older than this (matching the 1-day
// validity in getSession). Rows are deleted opportunistically so the table
// stays small.
const SESSION_TTL_SECONDS = 86400;

// Dashboard cookie sessions live in `sessions` with user_id NULL. Bot command
// state lives in the same table with user_id set (kept separate so the two
// never interfere).
async function getSession(request, env) {
    if (!env.DB) return null;
    const cookie = request.headers.get('Cookie') || '';
    const token = cookie.split(';').find(c => c.trim().startsWith('session='));
    if (!token) return null;
    const sessionToken = token.split('=')[1].trim();
    if (!sessionToken) return null;
    await initializeDatabase(env.DB);
    const result = await env.DB.prepare('SELECT token FROM sessions WHERE token = ? AND user_id IS NULL AND created_at > datetime("now", "-1 day")')
        .bind(sessionToken)
        .first();
    return result ? sessionToken : null;
}

async function createSession(env) {
    const token = crypto.randomUUID();
    await env.DB.prepare('INSERT INTO sessions (token) VALUES (?)').bind(token).run();
    return token;
}

async function deleteSession(request, env) {
    const cookie = request.headers.get('Cookie') || '';
    const token = cookie.split(';').find(c => c.trim().startsWith('session='));
    if (!token) return;
    const sessionToken = token.split('=')[1].trim();
    if (sessionToken) await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(sessionToken).run();
}

function sessionCookie(token, secure) {
    return `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400` + (secure ? '; Secure' : '');
}

// ============================================================================
// PUBLIC API HANDLERS
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
    } catch (e) {
        return apiJson({ d1_bound: false });
    }
}

async function handleSetup(request, env) {
    if (!env.DB) return apiJson({ error: 'D1 not available' }, 500);
    await initializeDatabase(env.DB);
    const envPass = env.ADMIN_PASS || null;
    const existing = await getSetting(env.DB, 'admin_password');
    if (existing && !envPass) {
        return apiJson({ error: 'Admin password already set. Please login.' }, 400);
    }
    const body = await request.json();
    const { botToken, adminPassword } = body;
    if (!adminPassword || adminPassword.length < 6) {
        return apiJson({ error: 'Password must be at least 6 characters.' }, 400);
    }
    const hashedPassword = await hashPassword(adminPassword);
    await setSetting(env.DB, 'admin_password', hashedPassword);

    if (botToken) {
        const check = await validateBotToken(botToken);
        if (!check.ok) {
            return apiJson({ error: `Invalid bot token${check.error ? ` (${check.error})` : ''}` }, 400);
        }
        const webhookUrl = `${new URL(request.url).origin}/webhook`;
        // Register the webhook with Telegram FIRST, then persist the secret —
        // if registration fails we never store a secret that would 401 real
        // Telegram deliveries.
        const secret = crypto.randomUUID();
        await registerWebhook(botToken, webhookUrl, secret);
        await setSetting(env.DB, 'bot_token', botToken);
        await setSetting(env.DB, 'webhook_url', webhookUrl);
        await setSetting(env.DB, 'webhook_secret', secret);
        if (check.username) await setSetting(env.DB, 'bot_username', check.username);
        if (check.name) await setSetting(env.DB, 'bot_name', check.name);
    }
    return apiJson({ success: true });
}

async function handleLogin(request, env) {
    if (!env.DB) return apiJson({ error: 'D1 not available' }, 500);
    await initializeDatabase(env.DB);
    const body = await request.json();
    const { password } = body;
    if (!password) return apiJson({ error: 'Password required' }, 400);

    // Login rate limiting (#8): after 20 failed attempts within the last 5
    // minutes, reject further attempts for a while. There is a single admin
    // account, so failures are counted globally per minute bucket.
    const minute = Math.floor(Date.now() / 60000);
    const recentFails = await env.DB.prepare(
        'SELECT COALESCE(SUM(count), 0) as n FROM login_attempts WHERE minute > ?'
    ).bind(minute - 5).first();
    if (recentFails && recentFails.n >= 20) {
        return apiJson({ error: 'Too many failed login attempts. Please try again in a few minutes.' }, 429);
    }

    const secure = new URL(request.url).protocol === 'https:';
    const envPass = env.ADMIN_PASS || null;
    const stored = await getSetting(env.DB, 'admin_password');
    let ok = false;
    if (envPass && envPass === password) ok = true;
    if (!ok) {
        ok = !!(stored && await verifyPassword(stored, password));
    }
    if (!ok) {
        await env.DB.prepare(
            'INSERT INTO login_attempts (minute, count) VALUES (?, 1) ON CONFLICT(minute) DO UPDATE SET count = count + 1'
        ).bind(minute).run();
        await env.DB.prepare('DELETE FROM login_attempts WHERE minute <= ?').bind(minute - 60).run();
        await logAction(env.DB, null, 'Dashboard login failed');
        return apiJson({ error: 'Invalid password' }, 401);
    }
    // Transparently upgrade legacy (plain / unsalted sha256) records.
    await maybeRehashPassword(env.DB, stored, password);
    // Successful login clears the failure counters.
    await env.DB.prepare('DELETE FROM login_attempts').run();
    await logAction(env.DB, null, 'Dashboard login successful');

    const token = crypto.randomUUID();
    await env.DB.prepare('INSERT INTO sessions (token, user_id) VALUES (?, NULL)').bind(token).run();
    // Opportunistically purge expired dashboard sessions (cheap single DELETE
    // bounded by the partial index) so the table does not grow forever.
    await env.DB.prepare("DELETE FROM sessions WHERE user_id IS NULL AND created_at <= datetime('now', '-1 day')").run();
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Set-Cookie': sessionCookie(token, secure), ...JSON_HEADERS }
    });
}

async function handleLogout(request, env) {
    await deleteSession(request, env);
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Set-Cookie': 'session=; Path=/; Max-Age=0', ...JSON_HEADERS }
    });
}

// Cache the GitHub version lookup for an hour per isolate (#21) so the
// dashboard does not hit raw.githubusercontent.com on every load.
const VERSION_CACHE_TTL_MS = 60 * 60 * 1000;
const versionCache = { data: null, fetchedAt: 0 };

async function getVersionInfo(env) {
    const current = VERSION;
    const now = Date.now();
    if (versionCache.data && (now - versionCache.fetchedAt) < VERSION_CACHE_TTL_MS) {
        return apiJson({ current, ...versionCache.data });
    }
    let latest = null, released = null, notes = null, workerUrl = null;
    try {
        const res = await fetch('https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/version.json');
        if (res.ok) {
            const data = await res.json();
            latest = data.version || null;
            released = data.released || null;
            notes = data.notes || null;
            workerUrl = data.worker_url || null;
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
// OVERVIEW STATS
// ============================================================================
async function getStats(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const nowMinute = Math.floor(Date.now() / 60000);
        const [cmds, enabledCmds, users, admins, aiCount, tokenRec, aiEnabledRec, botUsernameRec, active7d, aiLast24h, aiLast60m, aiTopUsers, broadcastLast24h] = await Promise.all([
            env.DB.prepare('SELECT COUNT(*) as n FROM commands').first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM commands WHERE enabled = 1').first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM users').first(),
            env.DB.prepare("SELECT COUNT(*) as n FROM users WHERE role = 'admin'").first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM ai_messages').first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'ai_enabled'").first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_username'").first(),
            // Active users in the last 7 days (D1 timestamps are UTC strings)
            env.DB.prepare("SELECT COUNT(*) as n FROM users WHERE last_active > datetime('now', '-7 day')").first(),
            env.DB.prepare("SELECT COUNT(*) as n FROM ai_messages WHERE role = 'assistant' AND timestamp > datetime('now', '-1 day')").first(),
            env.DB.prepare("SELECT COALESCE(SUM(count), 0) as n FROM ai_rate_limits WHERE minute > ?").bind(nowMinute - 60).first(),
            env.DB.prepare("SELECT chat_id, COUNT(*) as n FROM ai_messages WHERE role = 'assistant' AND timestamp > datetime('now', '-7 day') GROUP BY chat_id ORDER BY n DESC LIMIT 5").all(),
            env.DB.prepare("SELECT COALESCE(SUM(sent_count), 0) as n FROM broadcast_history WHERE sent_at > datetime('now', '-1 day')").first(),
        ]);
        return apiJson({
            success: true,
            bot_linked: !!(tokenRec && tokenRec.value),
            bot_username: botUsernameRec ? botUsernameRec.value : '',
            commands_total: cmds ? cmds.n : 0,
            commands_enabled: enabledCmds ? enabledCmds.n : 0,
            users_total: users ? users.n : 0,
            admins_total: admins ? admins.n : 0,
            users_active_7d: active7d ? active7d.n : 0,
            ai_memory_count: aiCount ? aiCount.n : 0,
            ai_replies_24h: aiLast24h ? aiLast24h.n : 0,
            ai_requests_60m: aiLast60m ? aiLast60m.n : 0,
            ai_top_users: (aiTopUsers && aiTopUsers.results) || [],
            broadcast_sends_24h: broadcastLast24h ? broadcastLast24h.n : 0,
            ai_enabled: !!(aiEnabledRec && (aiEnabledRec.value === '1' || aiEnabledRec.value === true)),
        });
    } catch (err) {
        return internalError(err);
    }
}

// ============================================================================
// BACKUP & RESTORE
// ============================================================================
// Settings keys that must never appear in an exported backup (#9).
const SECRET_SETTING_KEYS = ['bot_token', 'webhook_secret', 'cf_api_token', 'ai_api_key'];

async function exportBackup(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const [commands, users, messages, settingsRows, broadcastRows] = await Promise.all([
            env.DB.prepare('SELECT * FROM commands').all(),
            env.DB.prepare('SELECT * FROM users').all(),
            env.DB.prepare('SELECT chat_id, role, content, timestamp FROM ai_messages ORDER BY id').all(),
            env.DB.prepare('SELECT key, value FROM settings').all(),
            env.DB.prepare('SELECT message, buttons_json, recipient_count, sent_count, sent_at FROM broadcast_history ORDER BY id').all(),
        ]);
        const settings = {};
        for (const row of settingsRows.results) settings[row.key] = row.value;
        // Never ship live sessions in a backup
        delete settings.session;
        // Never ship secrets in a backup file (#9): tokens and keys are
        // replaced with a sentinel that restore() skips.
        for (const k of SECRET_SETTING_KEYS) delete settings[k];
        const blockedRows = await env.DB.prepare('SELECT user_id, block_type, blocked_at FROM blocked_users').all();
        return apiJson({
            success: true,
            data: {
                app: 'nyxx',
                version: VERSION,
                exported_at: new Date().toISOString(),
                commands: commands.results || [],
                users: users.results || [],
                ai_messages: messages.results || [],
                settings,
                blocked_users: blockedRows.results || [],
                broadcast_history: broadcastRows.results || [],
            }
        });
    } catch (err) {
        return internalError(err);
    }
}

async function runBatchChunks(db, statements, chunkSize = 40) {
    for (let i = 0; i < statements.length; i += chunkSize) {
        await db.batch(statements.slice(i, i + chunkSize));
    }
}

async function restoreBackup(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const data = body.data;
        if (!data || data.app !== 'nyxx' || !Array.isArray(data.commands)) {
            return apiJson({ error: 'Invalid backup format' }, 400);
        }
        await initializeDatabase(env.DB);

        // Wipe data that will be restored (keep sessions alive)
        await env.DB.batch([
            env.DB.prepare('DELETE FROM commands'),
            env.DB.prepare('DELETE FROM users'),
            env.DB.prepare('DELETE FROM ai_messages'),
            env.DB.prepare('DELETE FROM ai_rate_limits'),
        ]);

        // Restore commands
        const cmdStmts = [];
        for (const c of data.commands) {
            if (!c || !c.command) continue;
            cmdStmts.push(env.DB.prepare(`
                INSERT INTO commands (command, parent, response_type, content, media_url, buttons_json, is_admin_only, enabled, show_reply_keyboard, reply_keyboard_json, order_idx)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
                c.command, c.parent || null, c.response_type || 'text', c.content || '', c.media_url || '',
                c.buttons_json || '', c.is_admin_only ? 1 : 0, c.enabled !== undefined ? c.enabled : 1,
                c.show_reply_keyboard ? 1 : 0, c.reply_keyboard_json || '', c.order_idx || 0
            ));
        }
        await runBatchChunks(env.DB, cmdStmts);

        // Restore users
        const userStmts = [];
        for (const u of data.users) {
            if (!u || !u.id) continue;
            userStmts.push(env.DB.prepare(`
                INSERT INTO users (id, username, first_name, role, is_premium, last_active) VALUES (?, ?, ?, ?, ?, ?)
            `).bind(
                u.id, u.username || '', u.first_name || '', u.role || 'user',
                u.is_premium ? 1 : 0, u.last_active || new Date().toISOString()
            ));
        }
        await runBatchChunks(env.DB, userStmts);

        // Restore blocked users (#18)
        if (Array.isArray(data.blocked_users)) {
            const blockStmts = [];
            for (const b of data.blocked_users) {
                if (!b || !b.user_id) continue;
                blockStmts.push(env.DB.prepare(
                    'INSERT INTO blocked_users (user_id, block_type, blocked_at) VALUES (?, ?, ?) ON CONFLICT(user_id) DO UPDATE SET block_type = excluded.block_type'
                ).bind(b.user_id, b.block_type || 'full', b.blocked_at || new Date().toISOString()));
            }
            await runBatchChunks(env.DB, blockStmts);
        }

        // Restore AI messages
        const msgStmts = [];
        for (const m of data.ai_messages || []) {
            if (!m || m.chat_id === undefined || m.content === undefined) continue;
            msgStmts.push(env.DB.prepare('INSERT INTO ai_messages (chat_id, role, content, timestamp) VALUES (?, ?, ?, ?)')
                .bind(m.chat_id, m.role || 'user', m.content, m.timestamp || new Date().toISOString()));
        }
        await runBatchChunks(env.DB, msgStmts);

        // Restore broadcast history
        if (data.broadcast_history && Array.isArray(data.broadcast_history)) {
            const bcStmts = [];
            for (const h of data.broadcast_history) {
                if (!h || !h.message) continue;
                bcStmts.push(env.DB.prepare('INSERT INTO broadcast_history (message, buttons_json, recipient_count, sent_count, sent_at) VALUES (?, ?, ?, ?, ?)')
                    .bind(h.message, h.buttons_json || null, h.recipient_count || 0, h.sent_count || 0, h.sent_at || new Date().toISOString()));
            }
            await runBatchChunks(env.DB, bcStmts);
        }

        // Restore settings (only ones present in the backup; admin password is
        // preserved unless the backup explicitly contains one)
        const settings = data.settings || {};
        const setStmts = [];
        for (const [k, v] of Object.entries(settings)) {
            if (k === 'session') continue;
            if (k === 'schema_version') continue; // migrations own this value
            if (SECRET_SETTING_KEYS.includes(k)) continue; // secrets are never restored from files (#9)
            if (v === null || v === undefined) continue;
            setStmts.push(env.DB.prepare(`
                INSERT INTO settings (key, value) VALUES (?, ?)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value
            `).bind(k, String(v)));
        }
        await runBatchChunks(env.DB, setStmts);

        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}
// ============================================================================
// AUDIT LOGS (#22)
// ============================================================================
async function getAuditLogs(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const limit = Math.min(parseInt(url.searchParams.get('limit')) || 100, 500);
        const rows = await env.DB.prepare('SELECT id, user_id, action, timestamp FROM logs ORDER BY id DESC LIMIT ?').bind(limit).all();
        return apiJson({ logs: rows.results || [] });
    } catch (err) {
        return internalError(err);
    }
}

async function clearAuditLogs(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        await env.DB.prepare('DELETE FROM logs').run();
        await logAction(env.DB, null, 'Logs cleared');
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

// ============================================================================
// KEYBOARD PIPELINE
// ============================================================================
const COMMAND_FIELDS = ['command', 'parent', 'response_type', 'content', 'media_url', 'is_admin_only', 'enabled', 'buttons_json', 'show_reply_keyboard', 'reply_keyboard_json'];

// ---------------------------------------------------------------------------
// Canonical on-disk formats (v2):
//   buttons_json        {"v":2,"inline":[[{"text":"A","type":"command|callback|url","value":"..."}]]}
//   reply_keyboard_json {"v":2,"rows":[["Back","Menu"]],"actions":{"Menu":"/menu"},
//                        "resize":true,"one_time":false,"persistent":true,"placeholder":""}
// Legacy formats (still parsed everywhere, so nothing saved by an older
// version is ever lost):
//   {"inline_keyboard":[[...]]} / {"keyboard":[[...]]}   — raw Telegram wire format
//   {"inline":[{text,type,url|value}],"reply":[rows]}   — dashboard <=3.4 composer
//   [{text, command}]                                    — flat reply-keyboard array
// Every consumer (commands runtime, direct message, broadcast) reads keyboards
// through this pipeline, so all send paths behave identically.
// ---------------------------------------------------------------------------

// Parse any known inline-button shape into rows of normalized buttons
// { text, type: 'command'|'callback'|'url', value }.
function kbNormalizeInline(raw) {
    if (!raw) return null;
    let obj = raw;
    if (typeof raw === 'string') {
        try { obj = JSON.parse(raw); } catch (e) { return null; }
    }
    if (!obj || typeof obj !== 'object') return null;
    let rows = null;
    if (obj.v === 2 && obj.inline) {
        // v2: rows of normalized buttons.
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
    } else if (Array.isArray(obj.inline)) {
        // Legacy composer: flat list → one button per row (same look as 3.4).
        rows = obj.inline.map(b => {
            if (!b || !b.text) return null;
            if (b.type === 'url' || b.url) return [{ text: String(b.text), type: 'url', value: String(b.url || b.value || '') }];
            const value = String(b.value !== undefined ? b.value : (b.callback_data || ''));
            return [{ text: String(b.text), type: value.startsWith('/') ? 'command' : 'callback', value }];
        }).filter(Boolean);
    }
    return (rows && rows.length) ? rows : null;
}

// Parse any known reply-keyboard shape into a normalized spec.
function kbNormalizeReply(raw) {
    if (!raw) return null;
    let obj = raw;
    if (typeof raw === 'string') {
        try { obj = JSON.parse(raw); } catch (e) { return null; }
    }
    if (!obj || typeof obj !== 'object') return null;
    const spec = { rows: [], actions: {}, resize: true, one_time: false, persistent: true, placeholder: '' };
    const readItem = (item) => {
        if (typeof item === 'string') return { text: item, command: '' };
        if (item && typeof item === 'object') return { text: String(item.text || ''), command: String(item.command || item.value || '') };
        return null;
    };
    if (obj.v === 2 && obj.reply) {
        const rep = obj.reply;
        const rows = Array.isArray(rep.rows) ? rep.rows : [];
        spec.rows = rows.map(row => (Array.isArray(row) ? row.map(readItem) : [readItem(row)]).filter(b => b && b.text));
        Object.assign(spec.actions, (rep.actions && typeof rep.actions === 'object') ? rep.actions : {});
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
    } else if (Array.isArray(obj.reply)) {
        spec.rows = obj.reply.map(row => (Array.isArray(row) ? row.map(readItem) : [readItem(row)]).filter(b => b && b.text));
    } else if (Array.isArray(obj.rows)) {
        spec.rows = obj.rows.map(row => (Array.isArray(row) ? row.map(readItem) : [readItem(row)]).filter(b => b && b.text));
        Object.assign(spec.actions, (obj.actions && typeof obj.actions === 'object') ? obj.actions : {});
    } else if (Array.isArray(obj)) {
        // Legacy commands format: flat [{text, command}].
        spec.rows = obj.map(item => readItem(item)).filter(b => b && b.text).map(b => [b]);
    }
    spec.rows = spec.rows.filter(row => row.length);
    if (!spec.rows.length) return null;
    // Merge text → command pairs from the rows themselves into the actions map.
    for (const row of spec.rows) for (const b of row) if (b.command) spec.actions[b.text] = b.command;
    return spec;
}

// Build the Telegram inline_keyboard wire object from normalized rows.
function kbInlineMarkup(rows) {
    if (!rows || !rows.length) return null;
    return {
        inline_keyboard: rows.map(row => row.map(b => {
            if (b.type === 'url') return { text: b.text, url: b.value };
            return { text: b.text, callback_data: b.type === 'command' && !b.value.startsWith('/') ? '/' + b.value.replace(/^\/+/, '') : b.value };
        }))
    };
}

// Build the Telegram reply_keyboard wire object from a normalized spec.
function kbReplyMarkup(spec) {
    if (!spec || !spec.rows || !spec.rows.length) return null;
    const markup = { keyboard: spec.rows.map(row => row.map(b => ({ text: b.text }))) };
    markup.resize_keyboard = spec.resize !== false;
    markup.one_time_keyboard = !!spec.one_time;
    if (spec.persistent) markup.is_persistent = true;
    if (spec.placeholder) markup.input_field_placeholder = spec.placeholder;
    return markup;
}

// Top-level entry used by every send path. Accepts any supported format and
// returns both markups plus counts. When both exist Telegram shows the inline
// keyboard on the main message; the reply keyboard travels on a carrier
// message (Telegram allows only one reply_markup per message).
function buildReplyMarkup(buttonsJson) {
    if (!buttonsJson) return null;
    let inlineRows = null;
    let replySpec = null;
    if (typeof buttonsJson === 'string') {
        let obj = null;
        try { obj = JSON.parse(buttonsJson); } catch (e) { return null; }
        if (!obj || typeof obj !== 'object') return null;
        // A v2 object may carry both parts.
        if (obj.v === 2) {
            inlineRows = kbNormalizeInline(obj);
            replySpec = kbNormalizeReply(obj.reply ? obj : null);
        } else {
            inlineRows = kbNormalizeInline(obj);
            if (!inlineRows) replySpec = kbNormalizeReply(obj);
        }
    } else {
        inlineRows = kbNormalizeInline(buttonsJson.inline ? { inline: buttonsJson.inline } : (buttonsJson.v === 2 ? buttonsJson : null));
        replySpec = kbNormalizeReply(buttonsJson.reply ? { v: 2, reply: buttonsJson.reply } : buttonsJson);
    }
    const inlineMarkup = kbInlineMarkup(inlineRows);
    const replyMarkup = kbReplyMarkup(replySpec);
    if (!inlineMarkup && !replyMarkup) return null;
    return {
        markup: inlineMarkup || replyMarkup,
        inlineMarkup,
        replyMarkup,
        replySpec: replySpec || null,
        inlineCount: inlineRows ? inlineRows.reduce((n, r) => n + r.length, 0) : 0,
        replyCount: replySpec ? replySpec.rows.reduce((n, r) => n + r.length, 0) : 0,
        both: !!(inlineMarkup && replyMarkup)
    };
}

// Persist reply-keyboard text → command mappings so buttons from direct
// messages / broadcasts keep working after the original message is gone.
async function mergeReplyActions(db, actions) {
    if (!actions || !Object.keys(actions).length) return;
    try {
        let merged = {};
        const raw = await getSetting(db, 'reply_actions');
        if (raw) { try { merged = JSON.parse(raw) || {}; } catch (e) { merged = {}; } }
        for (const [text, command] of Object.entries(actions)) {
            if (text && command) merged[text] = command;
        }
        // Bound the map so it can never grow unbounded.
        const keys = Object.keys(merged);
        if (keys.length > 500) { for (const k of keys.slice(0, keys.length - 500)) delete merged[k]; }
        await setSetting(db, 'reply_actions', JSON.stringify(merged));
        replyActionsCache = { data: merged, fetchedAt: Date.now() };
    } catch (e) { /* never break a send because of the action map */ }
}

let replyActionsCache = { data: null, fetchedAt: 0 };
const REPLY_ACTIONS_TTL_MS = 60 * 1000;
async function getReplyActions(db) {
    if (replyActionsCache.data && Date.now() - replyActionsCache.fetchedAt < REPLY_ACTIONS_TTL_MS) return replyActionsCache.data;
    let map = {};
    try {
        const raw = await getSetting(db, 'reply_actions');
        if (raw) map = JSON.parse(raw) || {};
    } catch (e) {}
    replyActionsCache = { data: map, fetchedAt: Date.now() };
    return map;
}

async function getCommands(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const result = await env.DB.prepare('SELECT * FROM commands ORDER BY order_idx, command').all();
        return apiJson({ commands: result.results || [] });
    } catch (err) {
        return internalError(err);
    }
}

async function commandIsDescendant(db, ancestor, candidate) {
    // Returns true if candidate is ancestor itself or somewhere below it
    // in the folder tree (i.e. making candidate the parent would create a cycle).
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
        if (!command || !content) return apiJson({ error: 'Command and content required' }, 400);
        if (parent && parent === command) return apiJson({ error: 'A command cannot be its own parent' }, 400);
        await initializeDatabase(env.DB);
        if (parent && await commandIsDescendant(env.DB, command, parent)) {
            return apiJson({ error: 'Cannot nest a command inside one of its own children' }, 400);
        }
        const maxOrder = await env.DB.prepare('SELECT MAX(order_idx) as max FROM commands').first();
        const orderIdx = (maxOrder && maxOrder.max !== null) ? maxOrder.max + 1 : 0;
        try {
            await env.DB.prepare(`
                INSERT INTO commands (command, parent, response_type, content, media_url, buttons_json, is_admin_only, enabled, show_reply_keyboard, reply_keyboard_json, order_idx)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(command, parent || null, response_type || 'text', content, media_url || '', buttons_json || '', is_admin_only ? 1 : 0, enabled !== undefined ? enabled : 1, show_reply_keyboard ? 1 : 0, reply_keyboard_json || '', orderIdx).run();
        } catch (e) {
            if (String(e.message || '').includes('UNIQUE')) {
                return apiJson({ error: `Command "${command}" already exists` }, 400);
            }
            throw e;
        }
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

// Rewrite command references inside keyboard JSON (exact string match on
// callback_data / command fields) so a rename never orphans buttons.
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
        walk(obj);
        return JSON.stringify(obj);
    } catch (e) {
        return value;
    }
}

async function updateCommand(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const url = new URL(request.url);
        const oldCommand = decodeURIComponent(url.pathname.split('/').pop());
        const body = await request.json();
        const { command, parent, response_type, content, media_url, is_admin_only, enabled, buttons_json, show_reply_keyboard, reply_keyboard_json } = body;
        if (!command || !content) return apiJson({ error: 'Command and content required' }, 400);
        if (parent && parent === command) return apiJson({ error: 'A command cannot be its own parent' }, 400);
        await initializeDatabase(env.DB);

        if (command !== oldCommand) {
            // Renaming: make sure the new name is free
            const clash = await env.DB.prepare('SELECT command FROM commands WHERE command = ?').bind(command).first();
            if (clash) return apiJson({ error: `Command "${command}" already exists` }, 400);
            if (parent && await commandIsDescendant(env.DB, command, parent)) {
                return apiJson({ error: 'Cannot nest a command inside one of its own children' }, 400);
            }
            await env.DB.prepare(`
                UPDATE commands SET command = ?, parent = ?, response_type = ?, content = ?, media_url = ?, buttons_json = ?, is_admin_only = ?, enabled = ?, show_reply_keyboard = ?, reply_keyboard_json = ?
                WHERE command = ?
            `).bind(command, parent || null, response_type || 'text', content, media_url || '', buttons_json || '', is_admin_only ? 1 : 0, enabled !== undefined ? enabled : 1, show_reply_keyboard ? 1 : 0, reply_keyboard_json || '', oldCommand).run();

            // Re-parent children that pointed at the old name
            await env.DB.prepare('UPDATE commands SET parent = ? WHERE parent = ?').bind(command, oldCommand).run();
            // Rewrite keyboard button references to the old name
            const refRows = await env.DB.prepare('SELECT command, buttons_json, reply_keyboard_json FROM commands WHERE buttons_json LIKE ? OR reply_keyboard_json LIKE ?')
                .bind(`%${oldCommand}%`, `%${oldCommand}%`).all();
            for (const row of refRows.results) {
                const nb = rewriteCommandRefs(row.buttons_json, oldCommand, command);
                const nr = rewriteCommandRefs(row.reply_keyboard_json, oldCommand, command);
                if (nb !== row.buttons_json || nr !== row.reply_keyboard_json) {
                    await env.DB.prepare('UPDATE commands SET buttons_json = ?, reply_keyboard_json = ? WHERE command = ?')
                        .bind(nb, nr, row.command).run();
                }
            }
        } else {
            if (parent && await commandIsDescendant(env.DB, command, parent)) {
                return apiJson({ error: 'Cannot nest a command inside one of its own children' }, 400);
            }
            await env.DB.prepare(`
                UPDATE commands SET parent = ?, response_type = ?, content = ?, media_url = ?, buttons_json = ?, is_admin_only = ?, enabled = ?, show_reply_keyboard = ?, reply_keyboard_json = ?
                WHERE command = ?
            `).bind(parent || null, response_type || 'text', content, media_url || '', buttons_json || '', is_admin_only ? 1 : 0, enabled !== undefined ? enabled : 1, show_reply_keyboard ? 1 : 0, reply_keyboard_json || '', command).run();
        }
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
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
            const current = toDelete[idx];
            const children = await env.DB.prepare('SELECT command FROM commands WHERE parent = ?').bind(current).all();
            for (const row of children.results) toDelete.push(row.command);
            idx++;
        }
        await runBatchChunks(env.DB, toDelete.map(c => env.DB.prepare('DELETE FROM commands WHERE command = ?').bind(c)));
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

async function reorderCommands(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { order } = body;
        if (!Array.isArray(order)) return apiJson({ error: 'Invalid order' }, 400);
        await initializeDatabase(env.DB);
        await runBatchChunks(env.DB, order.map((cmd, i) => env.DB.prepare('UPDATE commands SET order_idx = ? WHERE command = ?').bind(i, cmd)));
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

// ============================================================================
// COMMAND PACK IMPORT/EXPORT (#31)
// ============================================================================
// Shareable bundles of commands (and menu entries) so bot builders can
// distribute templates independently of full backups.
async function exportCommandPack(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const commands = await env.DB.prepare('SELECT command, parent, response_type, content, media_url, buttons_json, is_admin_only, enabled, show_reply_keyboard, reply_keyboard_json FROM commands ORDER BY order_idx, command').all();
        let menu = [];
        const raw = await getSetting(env.DB, 'menu_commands');
        if (raw) { try { menu = JSON.parse(raw); } catch (e) {} }
        return apiJson({ success: true, data: {
            app: 'nyxx-command-pack',
            version: VERSION,
            exported_at: new Date().toISOString(),
            commands: commands.results || [],
            menu,
        } });
    } catch (err) {
        return internalError(err);
    }
}

function isValidCommandPackRow(c) {
    return c && typeof c.command === 'string' && c.command.startsWith('/')
        && typeof c.content === 'string'
        && (!c.parent || typeof c.parent === 'string');
}

async function importCommandPack(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const data = body.data || {};
        const mode = body.mode === 'replace' ? 'replace' : 'merge';
        const rows = data.commands;
        if (data.app !== 'nyxx-command-pack' || !Array.isArray(rows) || rows.length === 0) {
            return apiJson({ error: 'Invalid command pack' }, 400);
        }
        const valid = rows.filter(isValidCommandPackRow);
        if (valid.length === 0) {
            return apiJson({ error: 'No valid commands in pack' }, 400);
        }
        await initializeDatabase(env.DB);

        // Parents must exist before children: sort rows so parents come first.
        const byName = new Map(valid.map(c => [c.command, c]));
        const ordered = [];
        const seen = new Set();
        const visit = (c, chain) => {
            if (!c || seen.has(c.command) || chain.has(c.command)) return;
            chain.add(c.command);
            if (c.parent && byName.has(c.parent)) visit(byName.get(c.parent), chain);
            chain.delete(c.command);
            seen.add(c.command);
            ordered.push(c);
        };
        for (const c of valid) visit(c, new Set());

        if (mode === 'replace') {
            await env.DB.batch([
                env.DB.prepare('DELETE FROM commands'),
            ]);
        }

        let imported = 0;
        const stmts = ordered.map((c, i) => env.DB.prepare(`
            INSERT INTO commands (command, parent, response_type, content, media_url, buttons_json, is_admin_only, enabled, show_reply_keyboard, reply_keyboard_json, order_idx)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(command) DO UPDATE SET
                parent = excluded.parent, response_type = excluded.response_type, content = excluded.content,
                media_url = excluded.media_url, buttons_json = excluded.buttons_json,
                is_admin_only = excluded.is_admin_only, enabled = excluded.enabled,
                show_reply_keyboard = excluded.show_reply_keyboard, reply_keyboard_json = excluded.reply_keyboard_json
        `).bind(
            c.command, c.parent || null, c.response_type || 'text', c.content || '', c.media_url || '',
            c.buttons_json || '', c.is_admin_only ? 1 : 0, c.enabled !== undefined && c.enabled !== null ? (c.enabled ? 1 : 0) : 1,
            c.show_reply_keyboard ? 1 : 0, c.reply_keyboard_json || '', i
        ));
        await runBatchChunks(env.DB, stmts);
        imported = ordered.length;

        // Menu entries are optional in a pack.
        if (Array.isArray(data.menu) && data.menu.length > 0) {
            const okMenu = data.menu.filter(m => m && m.command && m.description);
            if (okMenu.length > 0) {
                await setSetting(env.DB, 'menu_commands', JSON.stringify(okMenu));
            }
        }
        await logAction(env.DB, null, `Command pack imported (${imported} commands, ${mode} mode)`);
        return apiJson({ success: true, imported });
    } catch (err) {
        return internalError(err);
    }
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
    } catch (err) {
        return internalError(err);
    }
}

async function setMenuCommands(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { menu } = body;
        if (!menu || !Array.isArray(menu)) return apiJson({ error: 'Invalid menu' }, 400);
        for (const entry of menu) {
            if (!entry.command || !entry.description) {
                return apiJson({ error: 'Each entry needs command and description' }, 400);
            }
        }
        const tokenRecord = await getSetting(env.DB, 'bot_token');
        if (!tokenRecord) return apiJson({ error: 'Bot token not set' }, 400);
        const resp = await tgFetchJson(`https://api.telegram.org/bot${tokenRecord}/setMyCommands`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commands: menu })
        });
        if (!resp.ok) {
            return apiJson({ error: resp.description || 'Telegram API error' }, 500);
        }
        await initializeDatabase(env.DB);
        await setSetting(env.DB, 'menu_commands', JSON.stringify(menu));
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

// ============================================================================
// USERS API
// ============================================================================
async function getUsers(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        let query = 'SELECT u.id, u.username, u.first_name, u.role, u.is_premium, u.last_active, b.block_type FROM users u LEFT JOIN blocked_users b ON u.id = b.user_id';
        const search = url.searchParams.get('search');
        const params = [];
        if (search && search.trim()) {
            query += ' WHERE u.username LIKE ? OR u.first_name LIKE ?';
            const like = '%' + search.trim() + '%';
            params.push(like, like);
        }
        query += ' ORDER BY u.last_active DESC LIMIT 200';
        const result = await env.DB.prepare(query).bind(...params).all();
        return apiJson({ users: result.results || [] });
    } catch (err) {
        return internalError(err);
    }
}

async function updateUserRole(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { userId, role } = body;
        if (!userId || !role) return apiJson({ error: 'userId and role required' }, 400);
        await initializeDatabase(env.DB);
        await env.DB.prepare('UPDATE users SET role = ? WHERE id = ?').bind(role, userId).run();
        await logAction(env.DB, userId, `User role changed to "${role}"`);
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

async function sendUserPrivateMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { userId, message, photo_url: photoUrl, buttons_json: buttonsJson } = body;
        if (!userId || (!message && !photoUrl)) return apiJson({ error: 'userId and message or photo URL required' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token not set' }, 400);

        const built = buttonsJson ? buildReplyMarkup(buttonsJson) : null;
        const markup = built && built.markup ? JSON.stringify(built.markup) : null;
        const kind = photoUrl ? 'photo' : 'text';

        let payload = /** @type {Record<string, any>} */ ({});
        if (photoUrl) {
            payload.chat_id = userId; payload.photo = photoUrl;
            if (message) { payload.caption = message; payload.parse_mode = 'HTML'; }
        } else {
            payload.chat_id = userId; payload.text = message; payload.parse_mode = 'HTML';
        }
        if (markup) payload.reply_markup = markup;

        const method = photoUrl ? 'sendPhoto' : 'sendMessage';
        let resp = await tgFetchJson(`https://api.telegram.org/bot${token}/${method}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        // Admin-written text may contain a stray < or &; fall back to plain
        // text instead of reporting a failure Telegram caused.
        if (!resp.ok && isHtmlParseError(resp)) {
            const plainPayload = /** @type {Record<string, any>} */ (Object.assign({}, payload));
            if (photoUrl) {
                if (message) plainPayload.caption = htmlToPlain(message);
                delete plainPayload.parse_mode;
            } else {
                plainPayload.text = htmlToPlain(message);
                delete plainPayload.parse_mode;
            }
            resp = await tgFetchJson(`https://api.telegram.org/bot${token}/${method}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(plainPayload)
            });
        }
        if (!resp.ok) return apiJson({ error: resp.description || 'Telegram API error' }, 500);
        const messageId = resp.result && resp.result.message_id;

        // Both keyboards exist: Telegram shows one per message, so the reply
        // keyboard rides on a carrier message.
        if (built && built.both && built.replyMarkup) {
            await tgFetchJson(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: userId, text: ' ', reply_markup: JSON.stringify(built.replyMarkup) })
            });
        }

        // Track the sent message so it can be edited or deleted later.
        try {
            await env.DB.prepare('INSERT INTO admin_messages (chat_id, message_id, kind, text, buttons_json) VALUES (?, ?, ?, ?, ?)')
                .bind(userId, messageId, kind, message || '', buttonsJson || null).run();
        } catch (e) {}

        // Keyboard text → command mappings stay alive after the message is gone.
        if (built && built.replySpec && built.replySpec.actions) {
            await mergeReplyActions(env.DB, built.replySpec.actions);
        }

        // Save admin message as assistant in AI memory (text only)
        try {
            if (!photoUrl) {
                const aiSettings = await getAiSettingsFromDb(env);
                const memoryLimit = parseInt(aiSettings.ai_memory || '0');
                if (memoryLimit > 0) {
                    await saveAiMessage(env.DB, userId, 'assistant', message);
                    await trimAiMessages(env.DB, userId, memoryLimit);
                }
            }
        } catch (e) {}
        return apiJson({ success: true, message_id: messageId });
    } catch (err) {
        return internalError(err);
    }
}

// ---------------------------------------------------------------------------
// Sent-message management: direct messages are tracked in admin_messages so
// the owner can edit or delete them after delivery.
// ---------------------------------------------------------------------------
async function getUserAdminMessages(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const parts = url.pathname.split('/');
        const userId = parseInt(parts[3]);
        if (isNaN(userId)) return apiJson({ error: 'Invalid user ID' }, 400);
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare('SELECT id, chat_id, message_id, kind, text, created_at FROM admin_messages WHERE chat_id = ? ORDER BY id DESC LIMIT 30').bind(userId).all();
        return apiJson({ messages: (rows.results || []).reverse() });
    } catch (err) {
        return internalError(err);
    }
}

async function editSentMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { chatId, messageId, kind, text } = await request.json();
        if (!chatId || !messageId || text === undefined) return apiJson({ error: 'chatId, messageId and text required' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token not set' }, 400);
        const method = kind === 'photo' ? 'editMessageCaption' : 'editMessageText';
        const payload = /** @type {Record<string, any>} */ ({ chat_id: chatId, message_id: messageId, parse_mode: 'HTML' });
        if (kind === 'photo') { if (text) payload.caption = text; } else { payload.text = text; }
        let resp = await tgFetchJson(`https://api.telegram.org/bot${token}/${method}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        if (!resp.ok && isHtmlParseError(resp)) {
            const plain = /** @type {Record<string, any>} */ (Object.assign({}, payload));
            delete plain.parse_mode;
            if (kind === 'photo') { if (text) plain.caption = htmlToPlain(text); } else { plain.text = htmlToPlain(text); }
            resp = await tgFetchJson(`https://api.telegram.org/bot${token}/${method}`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(plain)
            });
        }
        if (!resp.ok) return apiJson({ error: resp.description || 'Telegram API error' }, 500);
        try { await env.DB.prepare('UPDATE admin_messages SET text = ? WHERE chat_id = ? AND message_id = ?').bind(text || '', chatId, messageId).run(); } catch (e) {}
        await logAction(env.DB, null, `Direct message edited (chat ${chatId})`);
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

async function deleteSentMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { chatId, messageId } = await request.json();
        if (!chatId || !messageId) return apiJson({ error: 'chatId and messageId required' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token not set' }, 400);
        const resp = await tgFetchJson(`https://api.telegram.org/bot${token}/deleteMessage`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, message_id: messageId })
        });
        if (!resp.ok) return apiJson({ error: resp.description || 'Telegram API error' }, 500);
        try { await env.DB.prepare('DELETE FROM admin_messages WHERE chat_id = ? AND message_id = ?').bind(chatId, messageId).run(); } catch (e) {}
        await logAction(env.DB, null, `Direct message deleted (chat ${chatId})`);
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

async function blockUser(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { userId, blockType } = body;
        if (!userId) return apiJson({ error: 'userId required' }, 400);
        const type = blockType === 'ai_only' ? 'ai_only' : 'full';
        await initializeDatabase(env.DB);
        await env.DB.prepare(
            'INSERT INTO blocked_users (user_id, block_type) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET block_type = excluded.block_type, blocked_at = CURRENT_TIMESTAMP'
        ).bind(userId, type).run();
        await logAction(env.DB, userId, `User blocked (${type})`);
        return apiJson({ success: true, block_type: type });
    } catch (err) {
        return internalError(err);
    }
}

async function unblockUser(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { userId } = body;
        if (!userId) return apiJson({ error: 'userId required' }, 400);
        await initializeDatabase(env.DB);
        await env.DB.prepare('DELETE FROM blocked_users WHERE user_id = ?').bind(userId).run();
        await logAction(env.DB, userId, 'User unblocked');
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

async function getBlockStatus(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const parts = url.pathname.split('/');
        const userId = parseInt(parts[parts.length - 1]);
        if (!userId) return apiJson({ error: 'userId required' }, 400);
        await initializeDatabase(env.DB);
        const row = await env.DB.prepare('SELECT block_type FROM blocked_users WHERE user_id = ?').bind(userId).first();
        return apiJson({ blocked: !!row, block_type: row ? row.block_type : null });
    } catch (err) {
        return internalError(err);
    }
}

// Check if a user is blocked. Returns null if not blocked, or the block_type.
async function isUserBlocked(env, userId) {
    if (!env.DB) return null;
    try {
        await initializeDatabase(env.DB);
        const row = await env.DB.prepare('SELECT block_type FROM blocked_users WHERE user_id = ?').bind(userId).first();
        return row ? row.block_type : null;
    } catch (e) { return null; }
}

// ============================================================================
// USER CHAT HISTORY
// ============================================================================
async function getUserChatHistory(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const parts = url.pathname.split('/');
        const userId = parseInt(parts[3]);
        if (isNaN(userId)) return apiJson({ error: 'Invalid user ID' }, 400);
        const rows = await env.DB.prepare(
            'SELECT role, content, timestamp FROM ai_messages WHERE chat_id = ? ORDER BY timestamp ASC LIMIT 200'
        ).bind(userId).all();
        return apiJson({ messages: (rows.results || []).map(r => ({ role: r.role, content: r.content, time: r.timestamp })) });
    } catch (e) {
        return apiJson({ messages: [] });
    }
}

// ============================================================================
// BROADCAST
// ============================================================================
// BROADCAST
// ============================================================================
// Pacing is fully configurable from the dashboard: batch_size = parallel sends
// per wave, delay_ms = pause between waves, timeout_ms = per-request timeout.
// tgCall additionally honors Telegram's 429 retry_after, so bursts degrade
// gracefully instead of dropping messages.
const BROADCAST_DEFAULTS = { batch_size: 25, delay_ms: 0, timeout_ms: 10000 };

async function getBroadcastSettings(env) {
    const [bs, dm, tm] = await Promise.all([
        getSetting(env.DB, 'broadcast_batch_size'),
        getSetting(env.DB, 'broadcast_delay_ms'),
        getSetting(env.DB, 'broadcast_timeout_ms'),
    ]);
    const clamp = (v, def, min, max) => Math.min(Math.max(parseInt(v) || def, min), max);
    return {
        batch_size: clamp(bs, BROADCAST_DEFAULTS.batch_size, 1, 100),
        delay_ms: clamp(dm, BROADCAST_DEFAULTS.delay_ms, 0, 60000),
        timeout_ms: clamp(tm, BROADCAST_DEFAULTS.timeout_ms, 2000, 60000),
    };
}

async function handleBroadcastSettings(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        if (request.method === 'GET') {
            return apiJson({ success: true, settings: await getBroadcastSettings(env) });
        }
        const body = await request.json();
        const stmts = [];
        if (body.batch_size !== undefined) stmts.push(['broadcast_batch_size', String(Math.min(Math.max(parseInt(body.batch_size) || 25, 1), 100))]);
        if (body.delay_ms !== undefined) stmts.push(['broadcast_delay_ms', String(Math.min(Math.max(parseInt(body.delay_ms) || 0, 0), 60000))]);
        if (body.timeout_ms !== undefined) stmts.push(['broadcast_timeout_ms', String(Math.min(Math.max(parseInt(body.timeout_ms) || 10000, 2000), 60000))]);
        for (const [k, v] of stmts) await setSetting(env.DB, k, v);
        await logAction(env.DB, null, 'Broadcast pacing settings updated');
        return apiJson({ success: true, settings: await getBroadcastSettings(env) });
    } catch (err) {
        return internalError(err);
    }
}

function sleepMs(ms) { return new Promise(r => setTimeout(r, ms)); }

// Send one broadcast message (text or photo) to a single chat. Returns
// { ok, status, messageId }.
async function broadcastToUser(token, uid, built, markup, content, timeoutMs) {
    if (content.kind === 'photo') {
        const payload = /** @type {Record<string, any>} */ ({ chat_id: uid, photo: content.photoUrl });
        if (content.text) { payload.caption = content.text; payload.parse_mode = 'HTML'; }
        if (markup) payload.reply_markup = markup;
        let res = await tgCall(token, 'sendPhoto', payload, { timeoutMs });
        if ((!res || !res.ok) && content.text && isHtmlParseError(res)) {
            res = await tgCall(token, 'sendPhoto', Object.assign({}, payload, { caption: htmlToPlain(content.text) }), { timeoutMs });
        }
        if (!res || !res.ok) return { ok: false, status: 'failed' };
        if (built && built.both && built.replyMarkup) {
            await tgCall(token, 'sendMessage', { chat_id: uid, text: ' ', reply_markup: built.replyMarkup }, { timeoutMs });
        }
        return { ok: true, status: 'sent', messageId: res.result && res.result.message_id };
    }
    const extra = markup ? { reply_markup: markup } : {};
    const res = await sendRichText(token, uid, content.text, extra);
    if (!res || !res.ok) return { ok: false, status: 'failed' };
    if (built && built.both && built.replyMarkup) {
        await tgCall(token, 'sendMessage', { chat_id: uid, text: ' ', reply_markup: built.replyMarkup }, { timeoutMs });
    }
    return { ok: true, status: 'sent', messageId: res.result && res.result.message_id };
}

async function handleBroadcast(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const BOT_TOKEN = await getSetting(env.DB, 'bot_token');
        if (!BOT_TOKEN) return apiJson({ error: 'Bot token not configured' }, 400);
        const { userIds, message, photo_url: photoUrl, buttons_json: buttonsJson } = await request.json();
        if ((!message || !String(message).trim()) && !photoUrl) return apiJson({ error: 'Message and recipients required' }, 400);
        if (!userIds || !userIds.length) return apiJson({ error: 'Message and recipients required' }, 400);
        if (photoUrl && !/^https?:\/\//i.test(photoUrl)) return apiJson({ error: 'Photo URL must start with http(s)://' }, 400);

        // Precompute the reply_markup once instead of re-parsing per recipient.
        const built = buttonsJson ? buildReplyMarkup(buttonsJson) : null;
        const markup = built && built.markup ? built.markup : null;
        const uniqueIds = [...new Set(userIds)];
        const settings = await getBroadcastSettings(env);

        // Skip users who blocked the bot entirely so they are not counted as
        // failures.
        const placeholders = uniqueIds.map(() => '?').join(', ');
        let blockedRows = { results: [] };
        try {
            blockedRows = await env.DB.prepare(`SELECT user_id FROM blocked_users WHERE block_type = 'full' AND user_id IN (${placeholders})`)
                .bind(...uniqueIds).all();
        } catch (e) {}
        const blockedSet = new Set((blockedRows.results || []).map(r => r.user_id));

        const kind = photoUrl ? 'photo' : 'text';
        const content = { kind, text: message || '', photoUrl: photoUrl || '' };

        // History row is created up-front so recipient tracking (edit/delete
        // later) is possible even for long broadcasts.
        let broadcastId = null;
        try {
            const histRes = await env.DB.prepare(
                'INSERT INTO broadcast_history (message, photo_url, kind, buttons_json, recipient_count, sent_count, sent_at) VALUES (?, ?, ?, ?, ?, 0, datetime("now"))'
            ).bind(message || '', photoUrl || null, kind, buttonsJson || null, uniqueIds.length).run();
            broadcastId = histRes && histRes.meta ? histRes.meta.last_row_id : null;
        } catch (e) {}

        let sent = 0;
        let failed = 0;
        let skipped = 0;
        const recipientRows = [];
        const chunks = [];
        for (let i = 0; i < uniqueIds.length; i += settings.batch_size) chunks.push(uniqueIds.slice(i, i + settings.batch_size));
        for (let ci = 0; ci < chunks.length; ci++) {
            // Parallel within a chunk; sequential across chunks with a
            // configurable pause so a large broadcast respects Telegram's
            // rate limits.
            const results = await Promise.allSettled(chunks[ci].map(async (uid) => {
                if (blockedSet.has(uid)) return { ok: false, status: 'skipped' };
                return broadcastToUser(BOT_TOKEN, uid, built, markup, content, settings.timeout_ms);
            }));
            for (let ri = 0; ri < results.length; ri++) {
                const r = results[ri];
                const v = r.status === 'fulfilled' ? r.value : { ok: false, status: 'failed' };
                if (v.ok) {
                    sent++;
                    if (broadcastId !== null && v.messageId) recipientRows.push([broadcastId, chunks[ci][ri], v.messageId]);
                }
                else if (v.status === 'skipped') skipped++;
                else failed++;
            }
            if (settings.delay_ms > 0 && ci < chunks.length - 1) await sleepMs(settings.delay_ms);
        }

        // Persist per-recipient message ids so this broadcast can be edited
        // or deleted from the dashboard later.
        if (broadcastId !== null && recipientRows.length) {
            try {
                await runBatchChunks(env.DB, recipientRows.map(r =>
                    env.DB.prepare('INSERT OR IGNORE INTO broadcast_recipients (broadcast_id, chat_id, message_id) VALUES (?, ?, ?)').bind(...r)
                ), 100);
            } catch (e) {}
        }
        if (broadcastId !== null) {
            try {
                await env.DB.prepare('UPDATE broadcast_history SET sent_count = ? WHERE id = ?').bind(sent, broadcastId).run();
            } catch (e) {}
        }
        if (built && built.replySpec && built.replySpec.actions) {
            await mergeReplyActions(env.DB, built.replySpec.actions);
        }
        await logAction(env.DB, null, `Broadcast sent to ${sent}/${uniqueIds.length} recipients`);
        return apiJson({ success: true, sent, failed, skipped, broadcast_id: broadcastId });
    } catch (e) {
        return internalError(e);
    }
}

// Edit a previously sent broadcast in every recipient's chat.
async function editBroadcastMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { broadcastId, message } = await request.json();
        if (!broadcastId || message === undefined || !String(message).trim()) return apiJson({ error: 'broadcastId and message required' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token not set' }, 400);
        const hist = await env.DB.prepare('SELECT kind FROM broadcast_history WHERE id = ?').bind(broadcastId).first();
        if (!hist) return apiJson({ error: 'Broadcast not found' }, 404);
        const settings = await getBroadcastSettings(env);
        const recRows = await env.DB.prepare('SELECT chat_id, message_id FROM broadcast_recipients WHERE broadcast_id = ?').bind(broadcastId).all();
        const recipients = recRows.results || [];
        const method = hist.kind === 'photo' ? 'editMessageCaption' : 'editMessageText';
        let updated = 0;
        let failed = 0;
        const chunks = [];
        for (let i = 0; i < recipients.length; i += settings.batch_size) chunks.push(recipients.slice(i, i + settings.batch_size));
        for (let ci = 0; ci < chunks.length; ci++) {
            const results = await Promise.allSettled(chunks[ci].map(async (row) => {
                const payload = /** @type {Record<string, any>} */ ({ chat_id: row.chat_id, message_id: row.message_id, parse_mode: 'HTML' });
                if (hist.kind === 'photo') { if (message) payload.caption = message; } else { payload.text = message; }
                let resp = await tgCall(token, method, payload, { timeoutMs: settings.timeout_ms });
                if ((!resp || !resp.ok) && isHtmlParseError(resp)) {
                    const plain = /** @type {Record<string, any>} */ (Object.assign({}, payload));
                    delete plain.parse_mode;
                    if (hist.kind === 'photo') { if (message) plain.caption = htmlToPlain(message); } else { plain.text = htmlToPlain(message); }
                    resp = await tgCall(token, method, plain, { timeoutMs: settings.timeout_ms });
                }
                return !!(resp && resp.ok);
            }));
            for (const r of results) { if (r.status === 'fulfilled' && r.value) updated++; else failed++; }
            if (settings.delay_ms > 0 && ci < chunks.length - 1) await sleepMs(settings.delay_ms);
        }
        try { await env.DB.prepare('UPDATE broadcast_history SET message = ? WHERE id = ?').bind(message, broadcastId).run(); } catch (e) {}
        await logAction(env.DB, null, `Broadcast #${broadcastId} edited (${updated}/${recipients.length} chats)`);
        return apiJson({ success: true, updated, failed, total: recipients.length });
    } catch (err) {
        return internalError(err);
    }
}

// Delete a previously sent broadcast from every recipient's chat.
async function deleteBroadcastMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const { broadcastId } = await request.json();
        if (!broadcastId) return apiJson({ error: 'broadcastId required' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token not set' }, 400);
        const settings = await getBroadcastSettings(env);
        const recRows = await env.DB.prepare('SELECT chat_id, message_id FROM broadcast_recipients WHERE broadcast_id = ?').bind(broadcastId).all();
        const recipients = recRows.results || [];
        let deleted = 0;
        let failed = 0;
        const chunks = [];
        for (let i = 0; i < recipients.length; i += settings.batch_size) chunks.push(recipients.slice(i, i + settings.batch_size));
        for (let ci = 0; ci < chunks.length; ci++) {
            const results = await Promise.allSettled(chunks[ci].map(row =>
                tgCall(token, 'deleteMessage', { chat_id: row.chat_id, message_id: row.message_id }, { timeoutMs: settings.timeout_ms, retry: false })
            ));
            for (const r of results) { if (r.status === 'fulfilled' && r.value && r.value.ok) deleted++; else failed++; }
            if (settings.delay_ms > 0 && ci < chunks.length - 1) await sleepMs(settings.delay_ms);
        }
        try {
            await runBatchChunks(env.DB, [
                env.DB.prepare('DELETE FROM broadcast_recipients WHERE broadcast_id = ?').bind(broadcastId),
                env.DB.prepare('DELETE FROM broadcast_history WHERE id = ?').bind(broadcastId),
            ]);
        } catch (e) {}
        await logAction(env.DB, null, `Broadcast #${broadcastId} deleted (${deleted}/${recipients.length} chats)`);
        return apiJson({ success: true, deleted, failed, total: recipients.length });
    } catch (err) {
        return internalError(err);
    }
}

async function getBroadcastHistory(env) {
    if (!env.DB) return apiJson({ history: [] });
    try {
        await initializeDatabase(env.DB);
        const rows = await env.DB.prepare('SELECT * FROM broadcast_history ORDER BY sent_at DESC LIMIT 50').all();
        return apiJson({ history: rows.results || [] });
    } catch (e) { return apiJson({ history: [] }); }
}

async function clearBroadcastHistory(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        await env.DB.prepare('DELETE FROM broadcast_history').run();
        return apiJson({ success: true });
    } catch (e) { return internalError(e); }
}

async function clearUserMemory(env, url) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const parts = url.pathname.split('/');
        const userId = parseInt(parts[3]);
        if (isNaN(userId)) return apiJson({ error: 'Invalid user ID' }, 400);
        await env.DB.prepare('DELETE FROM ai_messages WHERE chat_id = ?').bind(userId).run();
        return apiJson({ success: true });
    } catch (e) { return internalError(e); }
}

// ============================================================================
// AI API HANDLERS & ENGINE
// ============================================================================
const AI_KEYS = [
    'ai_enabled', 'ai_provider', 'ai_api_key', 'ai_base_url', 'ai_model',
    'ai_system_prompt', 'ai_trigger', 'ai_memory', 'ai_fallback',
    'ai_temperature', 'ai_max_tokens', 'ai_top_p',
    'ai_suggested_questions_enabled', 'ai_suggested_questions', 'ai_suggested_one_time',
    'ai_alt_providers',
    'ai_custom_headers',
    'ai_display_name', 'ai_language', 'ai_style', 'ai_length',
    'ai_rate_limit', 'ai_response_delay', 'ai_ignore_prefixes',
    'ai_global_rate_limit', 'ai_global_rate_window',
    'ai_group_mention', 'ai_private_reply', 'ai_group_reply',
    'ai_ignore_bots', 'ai_ignore_forwarded', 'ai_typing_indicator',
    'ai_retry_on_failure', 'ai_custom_vars_text', 'ai_knowledge_bases',
    'ai_trigger_text', 'ai_group_memory', 'ai_strict_mode', 'ai_rtl_support',
    'ai_streaming'
];

async function getAiSettings(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        return apiJson({ success: true, settings: await getAiSettingsFromDb(env) });
    } catch (err) {
        return internalError(err);
    }
}

// Load all AI settings in a single D1 query instead of one round trip per
// key (this runs on every incoming Telegram message).
async function getAiSettingsFromDb(env) {
    const settings = {};
    for (const k of AI_KEYS) settings[k] = '';
    const placeholders = AI_KEYS.map(() => '?').join(', ');
    const rows = await env.DB.prepare(`SELECT key, value FROM settings WHERE key IN (${placeholders})`)
        .bind(...AI_KEYS).all();
    for (const row of (rows.results || [])) {
        if (row.value !== null && row.value !== undefined) settings[row.key] = row.value;
    }
    const defaults = {
        ai_enabled: '0', ai_provider: 'openai', ai_model: 'gpt-4o-mini', ai_trigger: 'no_command',
        ai_memory: '0', ai_group_memory: '0', ai_fallback: 'Sorry, I am currently unavailable. Please try again later.',
        ai_temperature: '0.7', ai_max_tokens: '1024', ai_top_p: '1.0', ai_suggested_questions_enabled: '0', ai_suggested_one_time: '1',
        ai_rate_limit: '10', ai_global_rate_limit: '0', ai_global_rate_window: 'minute', ai_ignore_prefixes: '/, !, #', ai_group_mention: '1', ai_private_reply: '1',
        ai_group_reply: '1', ai_ignore_bots: '1', ai_ignore_forwarded: '1', ai_typing_indicator: '1',
        ai_retry_on_failure: '0', ai_knowledge_bases: '[]', ai_suggested_questions: '[]',
        ai_streaming: '0',
    };
    for (const [k, v] of Object.entries(defaults)) {
        if (!settings[k]) settings[k] = v;
    }
    return settings;
}

async function saveAiSettings(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const settings = body.settings || body;
        await initializeDatabase(env.DB);
        const stmts = [];
        for (const k of AI_KEYS) {
            if (settings[k] !== undefined) {
                stmts.push(env.DB.prepare(`
                    INSERT INTO settings (key, value) VALUES (?, ?)
                    ON CONFLICT(key) DO UPDATE SET value = excluded.value
                `).bind(k, String(settings[k])));
            }
        }
        await runBatchChunks(env.DB, stmts);
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

async function getAiMemoryCount(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const result = await env.DB.prepare('SELECT COUNT(*) as count FROM ai_messages').first();
        return apiJson({ success: true, count: result ? result.count : 0 });
    } catch (err) {
        return internalError(err);
    }
}

function getProviderDefaults(provider, customBaseUrl) {
    switch (provider) {
        case 'openai': return { baseUrl: 'https://api.openai.com/v1', defaultModel: 'gpt-4o-mini' };
        case 'gemini': return { baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/', defaultModel: 'gemini-2.0-flash' };
        case 'deepseek': return { baseUrl: 'https://api.deepseek.com', defaultModel: 'deepseek-chat' };
        case 'groq': return { baseUrl: 'https://api.groq.com/openai/v1', defaultModel: 'llama-3.3-70b-versatile' };
        case 'openrouter': return { baseUrl: 'https://openrouter.ai/api/v1', defaultModel: 'openai/gpt-4o-mini' };
        case 'ollama': return { baseUrl: customBaseUrl || 'http://localhost:11434/v1', defaultModel: 'llama3' };
        case 'custom':
        default: return { baseUrl: customBaseUrl || '', defaultModel: '' };
    }
}

function replacePlaceholders(text, ctx) {
    if (!text) return text;
    const placeholders = {
        'bot_name': ctx.bot_name || 'Nyxx Bot',
        'owner_name': ctx.owner_name || '',
        'company_name': ctx.company_name || '',
        'website': ctx.website || '',
        'phone': ctx.phone || '',
        'user_first_name': ctx.user_first_name || 'User',
        'user_username': ctx.user_username || '',
        'chat_id': ctx.chat_id || '',
        'current_time': new Date().toLocaleString(),
        'available_commands': ctx.available_commands || ''
    };
    if (ctx.custom_vars && typeof ctx.custom_vars === 'object') {
        for (const [k, v] of Object.entries(ctx.custom_vars)) placeholders[k] = v;
    }
    let result = text;
    for (const [key, value] of Object.entries(placeholders)) {
        result = result.split('{{' + key + '}}').join(String(value));
    }
    return result;
}

function isSafeTelegramHref(url) {
    return /^https?:\/\//i.test(url || '');
}

// Escape HTML special characters while preserving the exact tags Telegram
// supports (<b>, <i>, <u>, <s>, <a href>, <code>, <pre>, <blockquote>,
// <tg-spoiler>). Everything else — including malformed tags — is escaped.
function escapeTelegramHTML(text) {
    if (!text) return '';
    const placeholders = [];
    const safe = text.replace(/<a\s+href="([^"]*)">|<\/a>|<\/?(?:b|strong|i|em|u|ins|s|strike|del|code|pre|blockquote|tg-spoiler)>/gi, (m) => {
        if (m.toLowerCase().startsWith('<a ')) {
            const href = m.match(/href="([^"]*)"/i);
            if (href && !isSafeTelegramHref(href[1])) {
                // Store the pre-escaped version so it won't be double-escaped later
                placeholders.push(m.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));
                return '\u0000' + (placeholders.length - 1) + '\u0000';
            }
        }
        placeholders.push(m);
        return '\u0000' + (placeholders.length - 1) + '\u0000';
    });
    const escaped = safe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    return escaped.replace(/\u0000(\d+)\u0000/g, (_, i) => placeholders[parseInt(i, 10)] || '');
}

function addRtlMarkToPersian(text) {
    if (!text) return text;
    // Detect Persian/Arabic script (Unicode range U+0600–U+06FF)
    const persianRegex = /[\u0600-\u06FF]/;
    const lines = text.split('\n');
    const processed = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return line; // preserve blank lines
        // Check if the line contains at least one Persian character
        if (persianRegex.test(trimmed)) {
            // If the line doesn't already start with U+200F, prepend it
            if (!trimmed.startsWith('\u200F')) {
                return '\u200F' + line;
            }
        }
        return line;
    });
    return processed.join('\n');
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
    automatic: 'Decide the response length yourself based on the complexity of the question. Keep it natural and appropriate.'
};
const AI_LANGUAGE_NAMES = {
    english: 'English', spanish: 'Spanish', french: 'French', german: 'German',
    persian: 'Persian (Farsi)', arabic: 'Arabic', farsi: 'Farsi', russian: 'Russian'
};

async function callAiCompletion(settings, chatHistory, userPrompt, context, providerType, altIndex, stream, onChunk) {
    providerType = providerType || 'main';
    const isMain = providerType === 'main';
    let provider, apiKey, model, customHeaders, baseUrl;

    if (isMain) {
        provider = settings.ai_provider;
        apiKey = settings.ai_api_key;
        model = settings.ai_model;
        customHeaders = settings.ai_custom_headers;
        baseUrl = settings.ai_base_url;
    } else {
        let altList = [];
        try { altList = JSON.parse(settings.ai_alt_providers || '[]'); } catch(e) {}
        const alt = altList[altIndex || 0];
        if (!alt || !alt.provider) throw new Error('Alternate provider not configured');
        provider = alt.provider;
        apiKey = alt.apiKey || '';
        model = alt.model || '';
        customHeaders = '';
        baseUrl = alt.baseUrl || '';
    }
    if (!provider || provider === 'none') throw new Error('Provider not selected');

    const defaults = getProviderDefaults(provider, baseUrl);
    const finalBaseUrl = (provider === 'custom' ? baseUrl : defaults.baseUrl) || defaults.baseUrl;
    const finalModel = model || defaults.defaultModel;

    if (!apiKey) throw new Error('API key is required for ' + provider);
    if (!finalBaseUrl) throw new Error('Base URL is required for custom provider');

    const temperature = parseFloat(settings.ai_temperature) || 0.7;
    const maxTokens = parseInt(settings.ai_max_tokens) || 1024;
    const topP = parseFloat(settings.ai_top_p) || 1.0;

    let systemContent = settings.ai_system_prompt || '';

    // Strict mode
    if (settings.ai_strict_mode === '1') {
        systemContent += (systemContent ? '\n\n' : '') + 'CORE RULES:\n- Answer ONLY using the provided instructions and knowledge base.\n- NEVER use web search.\n- NEVER make assumptions or invent information.\n- NEVER answer unrelated questions.\n- If the answer is not available in the knowledge base, politely say you do not have that information and suggest contacting support.';
    }

// RTL support
if (settings.ai_rtl_support === '1') {
    systemContent += (systemContent ? '\n\n' : '') + `RTL SUPPORT:
- When the response is primarily in Persian (Farsi), use proper RTL formatting for every paragraph and standalone text block.
- Start every Persian paragraph or standalone text block with the character "\u200F" (U+200F RIGHT-TO-LEFT MARK).
- For Persian text after a line break, add "\u200F" at the beginning of the new paragraph or text block.
- Do not add "\u200F" before English-only text, URLs, code, or other content that is not primarily Persian.
- For mixed Persian and English text, keep the natural language direction and use "\u200F" at the beginning when the text block is primarily Persian.
- Do not place "\u200F" inside HTML tags. It must appear immediately before the visible text.
- Preserve the existing Telegram HTML formatting rules and ensure RTL handling does not break HTML tags, links, code blocks, or other formatting.
- Never mention or explain these RTL rules in the response.

The final response must render Persian text correctly in Telegram while keeping English, URLs, code, and mixed-language content readable.`;
}

    // Knowledge bases
    try {
        const knowledgeBases = JSON.parse(settings.ai_knowledge_bases || '[]');
        const enabledKbs = knowledgeBases.filter(kb => kb.enabled !== false && kb.content && kb.content.trim());
        if (enabledKbs.length > 0) {
            const kbText = enabledKbs.map((kb, idx) => {
                const label = kb.label || `Knowledge Base ${idx + 1}`;
                return `${label}:\n${kb.content.trim()}`;
            }).join('\n\n');
            systemContent += (systemContent ? '\n\n' : '') + kbText;
        }
    } catch (e) {}

    // Telegram formatting instructions
systemContent += (systemContent ? '\n\n' : '') + `FORMATTING RULES:
- Default response format is plain text.
- Markdown formatting is completely forbidden.
- Never use *, **, #, _, or any other Markdown syntax for formatting.
- Dashes (-) or dots may be used only as plain-text list markers.
- HTML formatting is allowed ONLY with the exact tags listed below.
- No other HTML tags are allowed under any circumstances.
- Do not use HTML for structure, only for text formatting.
- For lists, NEVER use HTML list tags. Use normal text lists with numbers, dots, or dashes.

Allowed HTML tags ONLY:

<b>Bold</b>
<i>Italic</i>
<u>Underline</u>
<s>Strikethrough</s>
<code>inline code</code>
<pre>
multi-line code
</pre>
<a href="https://example.com">Link</a>
<blockquote>Quote</blockquote>
<tg-spoiler>Spoiler</tg-spoiler>

Before sending every response:
1. Never generate Markdown formatting.
2. Use HTML formatting only when it is necessary and only with the allowed tags above.
3. Remove or convert any unsupported formatting into plain text.
4. Ensure all HTML tags are properly opened and closed.
5. Ensure <a> tags contain valid href attributes.
6. Never output raw or malformed HTML.

The final output will be sent directly to Telegram with HTML parsing enabled. Invalid HTML will cause errors. Always produce valid Telegram HTML.`;

    // Response behaviour guides (language / style / length)
    const lang = AI_LANGUAGE_NAMES[settings.ai_language];
    if (lang) systemContent += `\n\nIMPORTANT: Always respond in ${lang}.`;
    const styleGuide = AI_STYLE_GUIDES[settings.ai_style];
    if (styleGuide) systemContent += `\n\n${styleGuide}`;
    const lengthGuide = AI_LENGTH_GUIDES[settings.ai_length];
    if (lengthGuide) systemContent += `\n\n${lengthGuide}`;

    if (context && context.available_commands) {
        systemContent = replacePlaceholders(systemContent, context);
    }

    const messages = [];
    if (systemContent.trim()) messages.push({ role: 'system', content: systemContent.trim() });
    if (Array.isArray(chatHistory)) {
        for (const msg of chatHistory) messages.push({ role: msg.role, content: msg.content });
    }
    messages.push({ role: 'user', content: userPrompt });

    const endpoint = finalBaseUrl.replace(/\/+$/, '') + '/chat/completions';
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = 'Bearer ' + apiKey;
    if (customHeaders) {
        try { Object.assign(headers, JSON.parse(customHeaders)); } catch (e) {}
    }

    const payload = { model: finalModel, messages, temperature, max_tokens: maxTokens, top_p: topP };
    if (stream === true) payload.stream = true;
    // Bound the provider call: a hanging API used to stall the whole reply so
    // retries and fallback providers never got a chance to run.
    const aiCtrl = new AbortController();
    const aiTimer = setTimeout(() => aiCtrl.abort(), stream === true ? 120000 : 60000);
    let res;
    try {
        res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(payload), signal: aiCtrl.signal });
    } finally {
        clearTimeout(aiTimer);
    }
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`AI API error (${res.status}): ${errText.slice(0, 400)}`);
    }
    if (stream === true) {
        if (!res.body) throw new Error('Streaming not supported by provider');
        return await consumeStream(res.body, onChunk);
    }
    const data = await res.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
    } else if (data.error) {
        throw new Error(data.error.message || JSON.stringify(data.error));
    } else {
        throw new Error('Invalid response structure from AI provider');
    }
}

// Consume an OpenAI-compatible SSE stream and concatenate the message deltas.
// onChunk(fullTextSoFar) is throttled so Telegram's editMessageText is called
// at most every STREAM_EDIT_INTERVAL_MS AND only when meaningful new content
// arrived (≥ MIN_STREAM_DELTA chars) — that keeps the preview feeling live
// like ChatGPT without tripping Telegram's flood limits.
const STREAM_EDIT_INTERVAL_MS = 1200;
const MIN_STREAM_DELTA = 10;

async function consumeStream(body, onChunk) {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let full = '';
    let lastFire = 0;
    let lastLen = 0;
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
                    if (onChunk && (now - lastFire) >= STREAM_EDIT_INTERVAL_MS && (full.length - lastLen) >= MIN_STREAM_DELTA) {
                        lastFire = now;
                        lastLen = full.length;
                        onChunk(full);
                    }
                }
            } catch (e) { /* ignore malformed keep-alive lines */ }
        }
    }
    return full;
}

async function handleAiTest(request, env) {
    try {
        const body = await request.json();
        const settings = body.settings || {};
        const providerType = body.provider || 'main';
        const isMain = providerType === 'main';
        const provider = isMain ? settings.ai_provider : settings.ai_alt_provider;
        if (!provider || provider === 'none') {
            return apiJson({ success: false, error: 'Provider not configured' }, 200);
        }
        const ctx = {
            bot_name: settings.ai_display_name || 'Nyxx AI',
            user_first_name: 'Test User',
            user_username: 'testuser',
            chat_id: 'test',
            custom_vars: {}
        };
        const response = await callAiCompletion(settings, [], 'Hello! Please confirm the connection.', ctx, providerType);
        return apiJson({ success: true, message: response });
    } catch (err) {
        return apiJson({ success: false, error: err.message }, 200);
    }
}

async function handleAiPlayground(request, env) {
    try {
        const body = await request.json();
        const settings = body.settings || {};
        const history = body.history || [];
        const message = body.message || '';
        if (!message) return apiJson({ error: 'Message required' }, 400);

        let availableCommands = '';
        if (env.DB) {
            await initializeDatabase(env.DB);
            const commands = await env.DB.prepare('SELECT command FROM commands WHERE enabled = 1').all();
            availableCommands = commands.results.map(r => r.command).join(', ');
        }
        const ctx = {
            bot_name: settings.ai_display_name || 'Nyxx AI',
            user_first_name: 'User',
            user_username: 'testuser',
            chat_id: 'playground',
            available_commands: availableCommands,
            custom_vars: parseCustomVars(settings.ai_custom_vars_text)
        };
        const reply = await callAiCompletion(settings, history, message, ctx, 'main');
        return apiJson({ success: true, response: reply });
    } catch (err) {
        return apiJson({ success: false, error: err.message }, 200);
    }
}

function parseCustomVars(text) {
    const vars = {};
    if (!text) return vars;
    for (const line of text.split('\n')) {
        const idx = line.indexOf('=');
        if (idx > 0) {
            const key = line.slice(0, idx).trim();
            const val = line.slice(idx + 1).trim();
            if (key) vars[key] = val;
        }
    }
    return vars;
}

async function resetAiSettings(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const stmts = AI_KEYS.map(k => env.DB.prepare('DELETE FROM settings WHERE key = ?').bind(k));
        await runBatchChunks(env.DB, stmts);
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

async function clearAiMemory(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await env.DB.prepare('DELETE FROM ai_messages').run();
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}
// ============================================================================
// SETTINGS API
// ============================================================================
async function getSettings(env, originUrl) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const [token, webhook, cfToken, cfAccount, cfScript] = await Promise.all([
            getSetting(env.DB, 'bot_token'), getSetting(env.DB, 'webhook_url'),
            getSetting(env.DB, 'cf_api_token'), getSetting(env.DB, 'cf_account_id'), getSetting(env.DB, 'cf_script_name'),
        ]);
        return apiJson({
            bot_token: token || '',
            webhook_url: webhook || `${originUrl}/webhook`,
            cf_token: cfToken || '',
            cf_account_id: cfAccount || '',
            cf_script_name: cfScript || ''
        });
    } catch (err) {
        return internalError(err);
    }
}

// Fetch a Telegram API endpoint as JSON with a 10s timeout so a stalled
// request can never hang the panel.
async function tgFetchJson(url, options) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    try {
        const res = await fetch(url, Object.assign({ signal: ctrl.signal }, options));
        return await res.json();
    } finally {
        clearTimeout(timer);
    }
}

// Ask Telegram whether a bot token is valid, retrying briefly to ride out
// transient failures (e.g. 429 rate limits). Returns { ok, error, username, name }.
async function validateBotToken(botToken) {
    let lastError = 'unknown error';
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const data = await tgFetchJson(`https://api.telegram.org/bot${botToken}/getMe`);
            if (data.ok) {
                return {
                    ok: true,
                    username: (data.result && data.result.username) || '',
                    name: (data.result && data.result.first_name) || ''
                };
            }
            lastError = data.description || (data.error_code ? `error_code ${data.error_code}` : 'unexpected Telegram response');
        } catch (err) {
            lastError = err.message || 'request failed';
        }
        if (attempt < 2) await new Promise(r => setTimeout(r, 150 * (attempt + 1)));
    }
    return { ok: false, error: lastError };
}

// Register a Telegram webhook with its secret token, surfacing Telegram's own
// error message (rate limits, bad URL, ...) instead of a bare failure.
async function registerWebhook(botToken, webhookUrl, secret, opts) {
    const params = new URLSearchParams({ url: webhookUrl });
    if (secret) params.set('secret_token', secret);
    if (opts && opts.dropPending) params.set('drop_pending_updates', 'true');
    const data = await tgFetchJson(`https://api.telegram.org/bot${botToken}/setWebhook?${params.toString()}`);
    if (!data.ok) {
        throw new Error(data.description || (data.error_code ? `error_code ${data.error_code}` : 'unknown error'));
    }
    return data;
}

async function updateBotToken(request, env, originUrl) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { botToken } = body;
        if (!botToken) return apiJson({ error: 'Bot token required' }, 400);
        await initializeDatabase(env.DB);

        // Re-entering the same token must always succeed: it is already known
        // to be valid, so skip the (rate-limitable) getMe round-trip entirely.
        const stored = await getSetting(env.DB, 'bot_token');
        const unchanged = !!(stored && stored === botToken);
        let botInfo = null;
        if (!unchanged) {
            const check = await validateBotToken(botToken);
            if (!check.ok) {
                return apiJson({ error: `Invalid bot token${check.error ? ` (${check.error})` : ''}` }, 400);
            }
            botInfo = check;
        }

        await setSetting(env.DB, 'bot_token', botToken);
        const webhookUrl = `${originUrl}/webhook`;
        await setSetting(env.DB, 'webhook_url', webhookUrl);
        const secret = crypto.randomUUID();
        await setSetting(env.DB, 'webhook_secret', secret);
        if (botInfo) {
            if (botInfo.username) await setSetting(env.DB, 'bot_username', botInfo.username);
            if (botInfo.name) await setSetting(env.DB, 'bot_name', botInfo.name);
        }

        // Drop stale queued updates only when switching to a different bot;
        // re-registering the same bot keeps its queue intact.
        try {
            await registerWebhook(botToken, webhookUrl, secret, { dropPending: !unchanged });
        } catch (hookErr) {
            return apiJson({ error: `Webhook update failed (${hookErr.message})` }, 500);
        }
        await logAction(env.DB, null, unchanged ? 'Bot token re-confirmed' : 'Bot token updated / webhook re-registered');
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

// Diagnostic test for the Settings > Test Webhook button. Reports what
// Telegram actually sees via getWebhookInfo.
async function handleWebhookTest(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token not set — configure a token first' }, 400);
        const data = await tgFetchJson(`https://api.telegram.org/bot${token}/getWebhookInfo`);
        if (!data.ok) {
            const msg = data.description || (data.error_code ? `error_code ${data.error_code}` : 'unknown error');
            return apiJson({ error: `Telegram API error: ${msg}` }, 502);
        }
        const info = data.result || {};
        const expectedUrl = (await getSetting(env.DB, 'webhook_url')) || '';
        return apiJson({
            success: true,
            url: info.url || '',
            expected_url: expectedUrl,
            registered: !!(info.url),
            url_matches: !!(expectedUrl && info.url === expectedUrl),
            pending_updates: info.pending_update_count || 0,
            last_error: info.last_error_message || '',
            last_error_date: info.last_error_date || 0,
            ip_address: info.ip_address || ''
        });
    } catch (err) {
        return internalError(err);
    }
}

// Webhook health-check + auto-repair: verifies the webhook is actually
// registered at Telegram for the stored token and re-registers it when it is
// missing or points somewhere else (a common state after token changes or
// manual deletions).
async function handleWebhookFix(env, originUrl) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token not set — configure a token first' }, 400);
        const info0 = await tgFetchJson(`https://api.telegram.org/bot${token}/getWebhookInfo`);
        if (!info0.ok) {
            const msg = info0.description || (info0.error_code ? `error_code ${info0.error_code}` : 'unknown error');
            return apiJson({ error: `Telegram API error: ${msg}` }, 502);
        }
        const before = (info0.result && info0.result.url) || '';
        const expectedUrl = (await getSetting(env.DB, 'webhook_url')) || `${originUrl}/webhook`;
        let fixed = false;
        if (before !== expectedUrl) {
            let secret = await getSetting(env.DB, 'webhook_secret');
            if (!secret) {
                secret = crypto.randomUUID();
                await setSetting(env.DB, 'webhook_secret', secret);
            }
            try {
                await registerWebhook(token, expectedUrl, secret);
                fixed = true;
            } catch (e) {
                return apiJson({ error: `Failed to register webhook: ${e.message}`, url: before, expected_url: expectedUrl }, 502);
            }
            await setSetting(env.DB, 'webhook_url', expectedUrl);
        }
        const info1 = await tgFetchJson(`https://api.telegram.org/bot${token}/getWebhookInfo`);
        const result = info1.ok ? (info1.result || {}) : {};
        await logAction(env.DB, null, fixed ? 'Webhook was missing/mismatched — re-registered' : 'Webhook health-check: already registered');
        return apiJson({
            success: true,
            fixed,
            url: result.url || '',
            expected_url: expectedUrl,
            registered: !!(result.url),
            url_matches: !!(result.url && result.url === expectedUrl),
            pending_updates: result.pending_update_count || 0,
            last_error: result.last_error_message || ''
        });
    } catch (err) {
        return internalError(err);
    }
}

async function changeAdminPassword(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { newPassword } = body;
        if (!newPassword || newPassword.length < 6) {
            return apiJson({ error: 'Password must be at least 6 characters' }, 400);
        }
        await initializeDatabase(env.DB);
        await setSetting(env.DB, 'admin_password', await hashPassword(newPassword));
        await logAction(env.DB, null, 'Admin password changed');
        // Invalidate all other dashboard sessions so a stolen cookie cannot
        // outlive a password change; the caller's own session stays alive.
        const cookie = request.headers.get('Cookie') || '';
        const currentRaw = cookie.split(';').find(c => c.trim().startsWith('session='));
        const currentToken = currentRaw ? currentRaw.split('=')[1].trim() : null;
        if (currentToken) {
            await env.DB.prepare('DELETE FROM sessions WHERE user_id IS NULL AND token != ?').bind(currentToken).run();
        } else {
            await env.DB.prepare('DELETE FROM sessions WHERE user_id IS NULL').run();
        }
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

// ============================================================================
// BOT INFO API
// ============================================================================
async function getBotInfo(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token not set' }, 400);
        const [nameRes, descRes, shortDescRes] = await Promise.all([
            tgFetchJson(`https://api.telegram.org/bot${token}/getMyName`),
            tgFetchJson(`https://api.telegram.org/bot${token}/getMyDescription`),
            tgFetchJson(`https://api.telegram.org/bot${token}/getMyShortDescription`),
        ]);
        return apiJson({
            success: true,
            name: nameRes.ok ? nameRes.result.name : '',
            description: descRes.ok ? descRes.result.description : '',
            short_description: shortDescRes.ok ? shortDescRes.result.short_description : ''
        });
    } catch (err) {
        return internalError(err);
    }
}

async function setBotInfo(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { name, description, short_description } = body;
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token not set' }, 400);
        const promises = [];
        if (name !== undefined) {
            promises.push(tgFetchJson(`https://api.telegram.org/bot${token}/setMyName`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            }));
        }
        if (description !== undefined) {
            promises.push(tgFetchJson(`https://api.telegram.org/bot${token}/setMyDescription`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description })
            }));
        }
        if (short_description !== undefined) {
            promises.push(tgFetchJson(`https://api.telegram.org/bot${token}/setMyShortDescription`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ short_description })
            }));
        }
        await Promise.all(promises);
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

// ============================================================================
// FACTORY RESET
// ============================================================================
// The dashboard must send the exact confirmation phrase (#13); the old
// client-side-only check is not a real safeguard.
async function factoryReset(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        let body = null;
        try { body = await request.json(); } catch (e) {}
        if (!body || body.confirmation !== 'FACTORY RESET') {
            return apiJson({ error: 'Confirmation phrase required' }, 400);
        }
        await initializeDatabase(env.DB);
        const tables = ['settings', 'users', 'commands', 'sessions', 'logs', 'ai_messages', 'ai_rate_limits', 'blocked_users', 'login_attempts', 'broadcast_history'];
        await runBatchChunks(env.DB, tables.map(t => env.DB.prepare(`DROP TABLE IF EXISTS ${t}`)));
        // The tables were just dropped, so the cached schema-init promise is
        // stale — drop it from the cache so the schema is recreated below.
        dbInitCache.delete(env.DB);
        await initializeDatabase(env.DB);
        await logAction(env.DB, null, 'FACTORY RESET performed — all data wiped');
        return apiJson({ success: true });
    } catch (err) {
        return internalError(err);
    }
}

// ============================================================================
// UPDATE / SELF-UPDATE
// ============================================================================
async function validateCloudflareToken(request, env) {
    try {
        const body = await request.json();
        const token = body.token;
        if (!token) return apiJson({ valid: false, error: 'Token required' }, 400);

        const verifyRes = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || !verifyData.success) {
            return apiJson({ valid: false, error: 'Invalid or expired token' }, 401);
        }

        const accountsRes = await fetch('https://api.cloudflare.com/client/v4/accounts', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const accountsData = await accountsRes.json();
        if (!accountsData.success || !Array.isArray(accountsData.result) || accountsData.result.length === 0) {
            return apiJson({ valid: false, error: 'No accounts found' }, 403);
        }

        const account = accountsData.result[0];
        const accountId = account.id;
        let scriptName = null;
        const host = new URL(request.url).hostname;
        if (host.endsWith('.workers.dev')) {
            const parts = host.split('.');
            if (parts.length >= 3) scriptName = parts[0];
        }

        if (!scriptName) {
            const workersRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const workersData = await workersRes.json();
            if (workersData.success && Array.isArray(workersData.result)) {
                for (const w of workersData.result) {
                    const routesRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${w.id}/routes`, {
                        headers: { 'Authorization': 'Bearer ' + token }
                    });
                    const routesData = await routesRes.json();
                    if (routesData.success && Array.isArray(routesData.result)) {
                        for (const route of routesData.result) {
                            if (route.pattern && host.includes(route.pattern.replace(/^https?:\/\//, '').replace(/\/\*$/, ''))) {
                                scriptName = w.id;
                                break;
                            }
                        }
                    }
                    if (scriptName) break;
                }
            }
        }

        if (!scriptName) {
            const scriptsRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const scriptsData = await scriptsRes.json();
            if (scriptsData.success && Array.isArray(scriptsData.result) && scriptsData.result.length > 0) {
                scriptName = scriptsData.result[0].id;
            }
        }

        await initializeDatabase(env.DB);
        await setSetting(env.DB, 'cf_api_token', token);
        await setSetting(env.DB, 'cf_account_id', accountId);
        if (scriptName) await setSetting(env.DB, 'cf_script_name', scriptName);

        return apiJson({ valid: true, accountId, scriptName: scriptName || null });
    } catch (e) {
        console.error('Token validation failed:', e);
        return apiJson({ valid: false, error: 'Internal error while validating token' }, 500);
    }
}

async function performUpdate(request, env) {
    try {
        const body = await request.json();
        const { token, accountId, scriptName, workerUrl } = body;
        if (!token || !accountId || !scriptName) {
            return apiJson({ success: false, error: 'Token, Account ID, and Script Name required' }, 400);
        }

        const verifyRes = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || !verifyData.success) {
            return apiJson({ success: false, error: 'Invalid token' }, 401);
        }

        const settingsRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${scriptName}/settings`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const settingsData = await settingsRes.json();
        let bindings = [];
        if (settingsData.success && settingsData.result && settingsData.result.bindings) {
            bindings = settingsData.result.bindings;
        }

        // Only allow updating from the project's own repository (#14). An
        // arbitrary URL would let a hijacked dashboard deploy any code.
        const DEFAULT_UPDATE_URL = 'https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/worker.js';
        const allowedHosts = ['raw.githubusercontent.com'];
        let scriptUrl = workerUrl || DEFAULT_UPDATE_URL;
        try {
            const u = new URL(scriptUrl);
            if (u.protocol !== 'https:' || !allowedHosts.includes(u.hostname)) {
                return apiJson({ success: false, error: 'Update URL is not allowed' }, 400);
            }
        } catch (e) {
            return apiJson({ success: false, error: 'Invalid update URL' }, 400);
        }
        const scriptRes = await fetch(scriptUrl);
        if (!scriptRes.ok) {
            return apiJson({ success: false, error: 'Failed to download script from ' + scriptUrl }, 500);
        }
        const scriptText = await scriptRes.text();

        let newVersion = null;
        const match = scriptText.match(/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);
        if (match) newVersion = match[1];

        const metadata = { main_module: 'worker.js', bindings };
        const formData = new FormData();
        formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        formData.append('worker.js', new Blob([scriptText], { type: 'application/javascript+module' }), 'worker.js');

        const uploadRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${scriptName}/content`, {
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + token },
            body: formData
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.success) {
            const errMsg = (uploadData.errors && uploadData.errors[0] && uploadData.errors[0].message) || 'Upload failed';
            return apiJson({ success: false, error: errMsg }, uploadRes.status);
        }

        await initializeDatabase(env.DB);
        if (newVersion) await setSetting(env.DB, 'last_update_version', newVersion);

        // After an in-place update, rotate the webhook secret so installs upgraded
        // from older versions also get the new webhook protection.
        try {
            const tokenRecord = await getSetting(env.DB, 'bot_token');
            const webhookRecord = await getSetting(env.DB, 'webhook_url');
            if (tokenRecord && webhookRecord) {
                // Register the new secret with Telegram FIRST so a failed
                // setWebhook never leaves the panel rejecting real updates.
                const secret = crypto.randomUUID();
                await registerWebhook(tokenRecord, webhookRecord, secret);
                await setSetting(env.DB, 'webhook_secret', secret);
            }
        } catch (e) {
            console.error('Webhook secret rotation failed:', e);
        }

        return apiJson({ success: true, version: newVersion || 'unknown' });
    } catch (e) {
        console.error('Update failed:', e);
        return apiJson({ success: false, error: 'Update failed due to an internal error' }, 500);
    }
}
// ============================================================================
// TELEGRAM BOT ENGINE
// ============================================================================
// Per-isolate bot username cache. Groups mention-requirement checks need the
// bot username on every group message; instead of a getMe round trip per
// message we read the stored username and refresh from Telegram at most once
// per hour per isolate.
const botUsernameCache = { username: null, fetchedAt: 0 };
const BOT_USERNAME_TTL_MS = 60 * 60 * 1000;

async function getBotUsername(env, BOT_TOKEN) {
    const now = Date.now();
    if (botUsernameCache.username && (now - botUsernameCache.fetchedAt) < BOT_USERNAME_TTL_MS) {
        return botUsernameCache.username;
    }
    const stored = await getSetting(env.DB, 'bot_username');
    if (stored) {
        botUsernameCache.username = stored;
        botUsernameCache.fetchedAt = now;
        return stored;
    }
    try {
        const info = await tgFetchJson(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
        if (info && info.ok && info.result && info.result.username) {
            botUsernameCache.username = info.result.username;
            botUsernameCache.fetchedAt = now;
            return botUsernameCache.username;
        }
    } catch (e) { /* fall through */ }
    return '';
}

// Central Telegram API client. Centralizing the fetch lets every call get a
// timeout, an error check, and consistent logging — see #26/#20.
const TG_API_BASE = 'https://api.telegram.org';
const TG_TIMEOUT_MS = 10000;

// Non-fatal Telegram error codes: a send that hits these is expected under
// load and must not be logged as an engine error.
const TG_BENIGN_ERROR_CODES = new Set([400, 403, 429]);

async function tgCall(token, method, payload, opts = {}) {
    const body = payload === undefined ? undefined : JSON.stringify(payload);
    // One bounded retry on 429 so short flood-waits never silently drop a
    // reply under burst load.
    const maxAttempts = opts.retry === false ? 1 : 2;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs || TG_TIMEOUT_MS);
        try {
            const res = await fetch(`${TG_API_BASE}/bot${token}/${method}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body,
                signal: ctrl.signal,
            });
            const data = await res.json().catch(() => null);
            if (data && data.ok === true) return data;
            const description = (data && (data.description || data.error_code)) || `HTTP ${res.status}`;
            // 400 (parse/bad request), 403 (blocked bot) and 429 (flood) are
            // routine outcomes for a broadcast to arbitrary chat ids.
            if (TG_BENIGN_ERROR_CODES.has(res.status)) {
                console.log(`Telegram ${method} failed: ${description}`);
            } else {
                console.error(`Telegram ${method} failed: ${description}`);
            }
            const retryAfter = data && data.parameters && data.parameters.retry_after
                ? parseInt(data.parameters.retry_after, 10) || 1
                : (res.status === 429 ? 1 : 0);
            if (attempt < maxAttempts && retryAfter > 0) {
                await new Promise(r => setTimeout(r, Math.min(retryAfter, 3) * 1000));
                continue;
            }
            return data;
        } catch (err) {
            console.error(`Telegram ${method} request failed: ${err.message}`);
            // A transient network blip must not silently drop a reply — retry
            // once before giving up.
            if (attempt < maxAttempts) {
                await new Promise(r => setTimeout(r, 500));
                continue;
            }
            return null;
        } finally {
            clearTimeout(timer);
        }
    }
    return null;
}

// Fire-and-forget message send: never throws, logs failures.
async function tgSend(token, method, payload) {
    return tgCall(token, method, payload);
}

// Strict send used for critical replies: returns the Telegram result or null.
async function tgSendStrict(token, method, payload) {
    const data = await tgCall(token, method, payload);
    return (data && data.ok) ? data.result : null;
}

// ============================================================================
// BOT STRINGS
// ============================================================================
const BOT_STRINGS = {
    en: {
        not_found: 'Command not found. Use /start to see available options.',
        unauthorized: '⚠️ Unauthorized.',
        back: 'Back',
        rate_limited: '⏳ Too many requests. Please wait a moment and try again.',
        rate_limited_global: '🌍 The bot is receiving a lot of requests right now. Please try again in a few minutes.',
        welcome: (botName, dashboardUrl) => `👋 Welcome to <b>${botName}</b>!\n\n` +
            `This bot is powered by <a href="https://github.com/Mahan07dev/nyxx">Nyxx</a>, ` +
            `an open‑source Telegram bot builder for Cloudflare Workers.\n\n` +
            `Created with ❤️ by <b>@Mahan07dev</b>`
    }

};

function botStrings(languageCode) {
    // Only English is implemented; the languageCode parameter is kept so the
    // call sites do not need to change if more languages are added later.
    return BOT_STRINGS.en;
}

function isBackWord(text) {
    const lower = (text || '').trim().toLowerCase();
    return lower === 'back';
}

// Does the AI respond in this chat type at all? Shared by text and callback
// paths so the two can never disagree.
function aiEnabledFor(chatType) {
    if (chatType === 'private') return true;
    if (chatType === 'group' || chatType === 'supergroup') return true;
    return false;
}

async function handleTelegramWebhook(request, env, ctx) {
    if (!env.DB) return new Response('DB not available', { status: 500 });

    // CRITICAL: every path through the webhook must resolve to a real 200
    // Response. Returning undefined (e.g. a bare Promise.resolve()) makes the
    // Workers runtime answer Telegram with 500, and Telegram then redelivers
    // the same update again and again — the bot re-executes the command and
    // sends the same reply to the user NON-STOP. This was the root cause of
    // the endless repeated replies.
    const runWithAck = (p) => {
        if (ctx && typeof ctx.waitUntil === 'function') {
            ctx.waitUntil(p.catch(err => console.error('Background update processing failed:', err)));
            return new Response('OK', { status: 200 });
        }
        return p.then(() => new Response('OK', { status: 200 })).catch(err => {
            console.error('Update processing failed:', err);
            return new Response('OK', { status: 200 });
        });
    };

    // If a webhook secret is configured, only Telegram (which echoes it back in
    // the X-Telegram-Bot-Api-Secret-Token header) may deliver updates.
    try {
        await initializeDatabase(env.DB);
        const secret = await getSetting(env.DB, 'webhook_secret');
        if (secret) {
            const header = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
            if (!header || !timingSafeEqual(header, secret)) {
                // 403 makes Telegram retry and eventually disable the webhook;
                // 200 acknowledges an unauthorised delivery without retrying.
                return new Response('OK', { status: 200 });
            }
        }
    } catch (e) {
        return new Response('Internal error', { status: 500 });
    }

    let update;
    try {
        update = await request.json();
    } catch (e) {
        // Malformed body (not a Telegram update): acknowledge without retrying.
        return new Response('OK', { status: 200 });
    }

    // De-duplicate redelivered updates: if this update was already processed
    // (e.g. the connection dropped right after our 200 OK), never re-run it —
    // re-running is the other way the same reply gets sent over and over.
    if (update && typeof update === 'object' && update.update_id !== undefined) {
        if (wasUpdateSeen(update.update_id)) return new Response('OK', { status: 200 });
        markUpdateSeen(update.update_id);
    }

    // Everything else (D1 reads, matching, sends, AI) runs in the background
    // so Telegram gets its 200 OK immediately. Slow acknowledgements are
    // another classic cause of Telegram redelivering updates (the "delays").
    return runWithAck(processTelegramUpdate(update, env));
}

// De-duplication of webhook updates within this isolate. Telegram retries any
// delivery it considers unacknowledged; a small TTL map catches the immediate
// retries that produce duplicate replies.
const seenUpdateIds = new Map();
const UPDATE_DEDUP_TTL_MS = 10 * 60 * 1000;
function wasUpdateSeen(updateId) {
    const now = Date.now();
    if (seenUpdateIds.size > 500) {
        for (const [id, ts] of seenUpdateIds) {
            if (now - ts > UPDATE_DEDUP_TTL_MS) seenUpdateIds.delete(id);
        }
    }
    const ts = seenUpdateIds.get(updateId);
    return ts !== undefined && (now - ts) < UPDATE_DEDUP_TTL_MS;
}
function markUpdateSeen(updateId) {
    seenUpdateIds.set(updateId, Date.now());
}

// Process one already-authenticated Telegram update. Runs in the background
// (ctx.waitUntil) after the webhook has been acknowledged, so a slow AI
// provider or a burst of commands never delays the 200 OK.
async function processTelegramUpdate(update, env) {
    const BOT_TOKEN = await getSetting(env.DB, 'bot_token');
    if (!BOT_TOKEN) {
        console.error('Bot token not set');
        return;
    }

    const upsertUser = async (from) => {
        if (!from || !from.id) return;
        await env.DB.prepare(`
            INSERT INTO users (id, username, first_name) VALUES (?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET username = excluded.username, first_name = excluded.first_name, last_active = CURRENT_TIMESTAMP
        `).bind(from.id, from.username || '', from.first_name || '').run();
    };

    // Guard every user-supplied field: channels can post updates without a
    // from (or chat), and malformed ids must not crash the engine.
    try {
        if (update.message && update.message.text && update.message.chat && update.message.from) {
            const msg = update.message;
            const chatId = msg.chat.id;
            const userId = msg.from.id;
            if (!userId) return;
            // Never react to bot-originated messages (ours or other bots').
            // A bot echoing a command could otherwise trigger itself forever.
            if (msg.from.is_bot) return;

            const text = String(msg.text || '').trim();
            const languageCode = msg.from.language_code;
            const strings = botStrings(languageCode);

            // Upsert and block-check are independent — run them together.
            const [, blockType] = await Promise.all([upsertUser(msg.from), isUserBlocked(env, userId)]);
            if (blockType === 'full') return;

            let targetCommand = null;
            if (text.startsWith('/')) {
                // Slash commands: one indexed lookup — cheapest match first.
                // /cmd@BotName is what Telegram sends in groups; match the
                // bare name.
                const bare = text.split('@')[0].split('?')[0].split(' ')[0];
                const cmdRecord = await env.DB.prepare('SELECT command FROM commands WHERE command = ? AND enabled = 1').bind(bare).first();
                if (cmdRecord) targetCommand = cmdRecord.command;
            }
            if (!targetCommand && isBackWord(text)) {
                const session = await env.DB.prepare("SELECT command FROM sessions WHERE user_id = ? AND token LIKE 'bot-%'").bind(userId).first();
                if (session && session.command) {
                    const parentCmd = await env.DB.prepare('SELECT parent FROM commands WHERE command = ?').bind(session.command).first();
                    // 'Back' at a root command (or with no session) is not an
                    // error — fall through to normal handling instead of
                    // replying "Command not found".
                    if (parentCmd && parentCmd.parent) targetCommand = parentCmd.parent;
                }
            }
            // Reply-keyboard button text → command. First the commands table
            // (per-command keyboards), then the global actions map that
            // direct messages / broadcasts contribute to. Only runs when the
            // cheaper matches missed.
            if (!targetCommand && !text.startsWith('/')) {
                const allCmds = await env.DB.prepare('SELECT reply_keyboard_json FROM commands WHERE enabled = 1 AND show_reply_keyboard = 1').all();
                for (const row of allCmds.results) {
                    if (!row.reply_keyboard_json) continue;
                    const spec = kbNormalizeReply(row.reply_keyboard_json);
                    if (!spec) continue;
                    for (const btnRow of spec.rows) {
                        for (const btn of btnRow) {
                            if (btn.text === text && btn.command) { targetCommand = btn.command; break; }
                        }
                        if (targetCommand) break;
                    }
                    if (targetCommand) break;
                }
                if (!targetCommand) {
                    const globalActions = await getReplyActions(env.DB);
                    if (globalActions[text]) targetCommand = globalActions[text];
                }
            }

            if (targetCommand) {
                const cmdRecord = await env.DB.prepare('SELECT * FROM commands WHERE command = ? AND enabled = 1').bind(targetCommand).first();
                if (cmdRecord) {
                    await executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env, languageCode);
                    // Optional AI commentary when the trigger asks for every message.
                    if (blockType !== 'ai_only') {
                        const aiSettings = await getAiSettingsFromDb(env);
                        if (aiSettings.ai_enabled === '1' && aiSettings.ai_trigger === 'all_messages') {
                            await processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN, msg.chat.type, languageCode);
                        }
                    }
                    return;
                }
            }

            if (text === '/start') {
                await sendDefaultStart(chatId, env, BOT_TOKEN, languageCode);
                if (blockType !== 'ai_only') {
                    const aiSettings = await getAiSettingsFromDb(env);
                    if (aiSettings.ai_enabled === '1' && aiSettings.ai_trigger === 'all_messages') {
                        await processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN, msg.chat.type, languageCode);
                    }
                }
                return;
            }

            const aiSettings = await getAiSettingsFromDb(env);
            if (aiSettings.ai_enabled === '1') {
                let shouldReply = true;
                const trigger = aiSettings.ai_trigger || 'no_command';
                if (trigger === 'contains_text') {
                    const triggerText = aiSettings.ai_trigger_text || '';
                    if (triggerText && !text.toLowerCase().includes(triggerText.toLowerCase())) shouldReply = false;
                } else if (trigger !== 'no_command' && trigger !== 'all_messages') {
                    shouldReply = false;
                }

                // Chat type filters
                if (shouldReply) {
                    if (!aiEnabledFor(msg.chat.type)) shouldReply = false;
                    const isPrivate = msg.chat.type === 'private';
                    const isGroup = msg.chat.type === 'group' || msg.chat.type === 'supergroup';
                    if (isPrivate && aiSettings.ai_private_reply === '0') shouldReply = false;
                    if (isGroup && aiSettings.ai_group_reply === '0') shouldReply = false;
                }

                // Group mention requirement
                if (shouldReply && (msg.chat.type === 'group' || msg.chat.type === 'supergroup')) {
                    if (aiSettings.ai_group_mention === '1') {
                        const botUsername = await getBotUsername(env, BOT_TOKEN);
                        if (!botUsername || !text.includes('@' + botUsername)) shouldReply = false;
                    }
                }

                if (shouldReply && aiSettings.ai_ignore_bots === '1' && msg.from.is_bot) shouldReply = false;
                if (shouldReply && aiSettings.ai_ignore_forwarded === '1' && msg.forward_date) shouldReply = false;
                if (shouldReply && aiSettings.ai_ignore_prefixes) {
                    const prefixes = aiSettings.ai_ignore_prefixes.split(',').map(s => s.trim()).filter(Boolean);
                    if (prefixes.some(p => text.startsWith(p))) shouldReply = false;
                }
                // AI-only block check
                if (shouldReply && blockType === 'ai_only') shouldReply = false;

                if (shouldReply) {
                    await processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN, msg.chat.type, languageCode);
                }
            } else {
                await sendMessage(chatId, strings.not_found, BOT_TOKEN, 'HTML');
            }
            return;
        }

        if (update.message && !update.message.text && update.message.chat) {
            const m = update.message;
            if (m.chat.type === 'private' && m.from && m.from.id && !m.from.is_bot) {
                const mediaBlockType = await isUserBlocked(env, m.from.id);
                if (mediaBlockType !== 'full') {
                    await upsertUser(m.from);
                    await sendMessage(m.chat.id, botStrings(m.from.language_code).not_found, BOT_TOKEN, 'HTML');
                }
            }
        }

        if (update.callback_query && update.callback_query.message && update.callback_query.message.chat) {
            const cb = update.callback_query;
            const data = typeof cb.data === 'string' ? cb.data.trim() : '';
            const languageCode = cb.from.language_code;
            await upsertUser(cb.from);
            const cbBlockType = await isUserBlocked(env, cb.from.id);
            if (cbBlockType === 'full') {
                await tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                return;
            }
            if (data && data.startsWith('/')) {
                // /start is served by sendDefaultStart, not the commands table.
                if (data === '/start') {
                    const answer = tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                    await sendDefaultStart(cb.message.chat.id, env, BOT_TOKEN, languageCode);
                    await answer;
                    return;
                }
                const cmdRecord = await env.DB.prepare('SELECT * FROM commands WHERE command = ? AND enabled = 1').bind(data).first();
                const answer = tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                if (cmdRecord) {
                    await executeCommand(cb.message.chat.id, cb.from.id, cmdRecord, BOT_TOKEN, env, languageCode);
                }
                await answer;
                return;
            } else if (data && cbBlockType !== 'ai_only') {
                // Custom callback buttons only make sense when the AI is on;
                // with the AI off they used to trigger the fallback message on
                // every click. Answer the query and stay quiet instead.
                const aiSettings = await getAiSettingsFromDb(env);
                if (aiSettings.ai_enabled === '1' && aiEnabledFor(cb.message.chat.type)) {
                    const answer = tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                    await processAiReply(cb.message.chat.id, cb.from.id, data, aiSettings, env, BOT_TOKEN, cb.message.chat.type, languageCode);
                    await answer;
                    return;
                }
                await tgCall(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cb.id });
                return;
            }
            return;
        }
    } catch (err) {
        console.error('Webhook error:', err);
    }
}

// Cache the bot display name (getMyName) so /start does not pay a Telegram
// round-trip on every call when no name is stored in settings.
const botNameCache = { name: null, fetchedAt: 0 };
const BOT_NAME_TTL_MS = 10 * 60 * 1000;

async function sendDefaultStart(chatId, env, BOT_TOKEN, languageCode) {
    const strings = botStrings(languageCode);
    let botName = 'Nyxx Bot';
    try {
        const stored = await getSetting(env.DB, 'bot_name');
        if (stored) botName = stored;
        else if (botNameCache.name && (Date.now() - botNameCache.fetchedAt) < BOT_NAME_TTL_MS) {
            botName = botNameCache.name;
        } else {
            const nameRes = await tgFetchJson(`https://api.telegram.org/bot${BOT_TOKEN}/getMyName`);
            if (nameRes.ok && nameRes.result.name) {
                botName = nameRes.result.name;
                botNameCache.name = botName;
                botNameCache.fetchedAt = Date.now();
            }
        }
    } catch (e) {}

    let dashboardUrl = 'https://dash.cloudflare.com';
    try {
        const webhookSetting = await getSetting(env.DB, 'webhook_url');
        if (webhookSetting) dashboardUrl = webhookSetting.replace(/\/webhook$/, '');
    } catch (e) {}

    const keyboard = {
        inline_keyboard: [
            [{ text: '🔗 GitHub', url: 'https://github.com/Mahan07dev' }, { text: '📊 Dashboard', url: dashboardUrl }]
        ]
    };
    await tgCall(BOT_TOKEN, 'sendMessage', {
        chat_id: chatId,
        text: strings.welcome(botName, dashboardUrl),
        parse_mode: 'HTML',
        reply_markup: keyboard
    });
}

// Convert authored HTML to readable plain text (used when Telegram rejects
// the HTML entities of a message and we fall back to a plain resend).
function htmlToPlain(html) {
    if (!html) return '';
    return String(html)
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/(?:p|div|blockquote|pre)>/gi, '\n')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&amp;/gi, '&');
}

// Detect Telegram's HTML entity parse failures (bad/unclosed tags, stray <).
function isHtmlParseError(data) {
    const desc = String((data && data.description) || '');
    return /can't parse entities|unsupported start tag|unclosed tag|unclosed angle/i.test(desc);
}

// Render the text exactly as authored (fully escaped). Used when Telegram
// rejects an ambiguous entity such as a stray < — nothing is lost this way.
function htmlToLiteral(html) {
    return String(html || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Send text that may contain user-authored HTML. Tries HTML first so authors
// keep their formatting, and resends as plain text when Telegram rejects the
// entities — a reply must never be silently dropped.
async function sendRichText(token, chatId, text, extra = {}) {
    if (!text) return null;
    const payload = Object.assign({ chat_id: chatId, text, parse_mode: 'HTML' }, extra);
    const data = await tgCall(token, 'sendMessage', payload);
    if (data && data.ok) return data;
    if (isHtmlParseError(data)) {
        const desc = String((data && data.description) || '');
        // Ambiguous entity (e.g. "a < b"): escape everything literally.
        // Structural tag error (e.g. <div>): strip tags, keep the words.
        const fallbackText = /unsupported start tag|unclosed tag/i.test(desc) ? htmlToPlain(text) : htmlToLiteral(text);
        const plainPayload = Object.assign({ chat_id: chatId, text: fallbackText, parse_mode: 'HTML' }, extra);
        return tgCall(token, 'sendMessage', plainPayload);
    }
    return data;
}

// Streaming previews are plain text: a partial tag (e.g. an unclosed <b>)
// would fail Telegram's parser on every edit.
function stripTagsForPreview(text) {
    return String(text || '').replace(/<[^>]*>/g, '');
}

async function executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env, languageCode) {
    const strings = botStrings(languageCode);
    // Bot conversation state lives in the sessions table under a synthetic
    // token so it is fully separated from dashboard login sessions (#16).
    await env.DB.prepare(`
        INSERT INTO sessions (token, user_id, command, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(token) DO UPDATE SET command = excluded.command, updated_at = CURRENT_TIMESTAMP
    `).bind('bot-' + userId, userId, cmdRecord.command).run();

    if (cmdRecord.is_admin_only) {
        const user = await env.DB.prepare('SELECT role FROM users WHERE id = ?').bind(userId).first();
        if (!user || user.role !== 'admin') {
            await sendMessage(chatId, strings.unauthorized, BOT_TOKEN, 'HTML');
            return;
        }
    }

    // Both keyboards flow through the shared pipeline so commands, direct
    // messages and broadcasts render identically.
    const built = cmdRecord.buttons_json ? buildReplyMarkup(cmdRecord.buttons_json) : null;
    const inlineMarkup = built && built.inlineMarkup ? built.inlineMarkup : null;

    let replySpec = (cmdRecord.show_reply_keyboard && cmdRecord.reply_keyboard_json)
        ? kbNormalizeReply(cmdRecord.reply_keyboard_json) : null;
    if (replySpec && cmdRecord.parent) {
        // Sub-commands always offer a way back up the tree.
        const hasBack = replySpec.rows.some(row => row.some(b => b.text === strings.back));
        if (!hasBack) replySpec.rows.push([{ text: strings.back, command: '' }]);
    }
    const replyKeyboardMarkup = replySpec ? kbReplyMarkup(replySpec) : null;
    if (replySpec && replySpec.actions && Object.keys(replySpec.actions).length) {
        await mergeReplyActions(env.DB, replySpec.actions);
    }

    const markup = inlineMarkup || replyKeyboardMarkup || undefined;

    if (cmdRecord.response_type === 'photo') {
        const caption = cmdRecord.content || undefined;
        const photoPayload = /** @type {Record<string, any>} */ ({ chat_id: chatId, photo: cmdRecord.media_url });
        if (caption) photoPayload.caption = caption;
        if (markup) photoPayload.reply_markup = markup;
        let res = null;
        if (cmdRecord.media_url) {
            res = await tgCall(BOT_TOKEN, 'sendPhoto', photoPayload);
            if (res && !res.ok && caption && isHtmlParseError(res)) {
                // Telegram rejected the caption entities — resend with a
                // plain caption instead of dropping the whole photo reply.
                res = await tgCall(BOT_TOKEN, 'sendPhoto', Object.assign({}, photoPayload, { caption: htmlToPlain(caption) }));
            }
        }
        if ((!res || !res.ok) && cmdRecord.content) {
            // Photo failed (missing/broken URL, network): never lose the
            // message content — deliver it as text with the same keyboard.
            await sendRichText(BOT_TOKEN, chatId, cmdRecord.content, markup ? { reply_markup: markup } : {});
        }
        // Both keyboards exist: the reply keyboard rides on a carrier message.
        if (inlineMarkup && replyKeyboardMarkup) {
            await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: ' ', reply_markup: replyKeyboardMarkup });
        }
        return;
    }

    const extra = /** @type {Record<string, any>} */ ({});
    if (markup) extra.reply_markup = markup;
    if (cmdRecord.content) {
        // HTML first with a plain-text fallback: a stray < or & in the command
        // content used to make Telegram reject the whole reply silently.
        await sendRichText(BOT_TOKEN, chatId, cmdRecord.content, extra);
    } else if (extra.reply_markup) {
        // Keyboard-only command: Telegram only shows a keyboard attached to a
        // message, so send a minimal carrier message for it.
        await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: ' ', reply_markup: extra.reply_markup });
    }
    // Both keyboards exist: the reply keyboard rides on a carrier message.
    if (inlineMarkup && replyKeyboardMarkup) {
        await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: ' ', reply_markup: replyKeyboardMarkup });
    }
}

// Telegram's hard limit for a single message.
const TG_MESSAGE_LIMIT = 4096;

// Split long text into Telegram-sized chunks (#4). Split preference:
// paragraph (blank line) > newline > space > hard cut, so chunks stay readable.
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

async function sendMessage(chatId, text, BOT_TOKEN, parseMode) {
    if (!text) return;
    const chunks = splitTelegramMessage(text);
    for (const chunk of chunks) {
        let finalText = chunk;
        if (parseMode === 'HTML') finalText = escapeTelegramHTML(finalText);
        const payload = /** @type {Record<string, any>} */ ({ chat_id: chatId, text: finalText });
        if (parseMode) payload.parse_mode = parseMode;
        const data = await tgCall(BOT_TOKEN, 'sendMessage', payload);
        // If HTML parsing failed (e.g. the AI produced a malformed tag),
        // resend as plain text instead of dropping the reply entirely (#5).
        if ((!data || !data.ok) && parseMode === 'HTML') {
            if (isHtmlParseError(data)) {
                // finalText is escaped HTML: strip tags AND decode entities,
                // otherwise the plain resend shows double-escaped text.
                await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: htmlToPlain(finalText) });
            }
        }
    }
}

async function getAiHistory(db, chatId, limit) {
    if (!limit || limit <= 0) return [];
    const result = await db.prepare('SELECT role, content FROM ai_messages WHERE chat_id = ? ORDER BY id DESC LIMIT ?').bind(chatId, limit).all();
    return (result.results || []).reverse();
}

async function saveAiMessage(db, chatId, role, content) {
    await db.prepare('INSERT INTO ai_messages (chat_id, role, content) VALUES (?, ?, ?)').bind(chatId, role, content).run();
}

// Keep the stored history bounded per chat (a little more than the memory
// window so the last messages are always available to read).
async function trimAiMessages(db, chatId, keep) {
    if (!keep || keep <= 0) return;
    const row = await db.prepare('SELECT id FROM ai_messages WHERE chat_id = ? ORDER BY id DESC LIMIT 1 OFFSET ?').bind(chatId, keep * 2).first();
    if (row) await db.prepare('DELETE FROM ai_messages WHERE chat_id = ? AND id <= ?').bind(chatId, row.id).run();
}

async function processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN, chatType, languageCode) {
    const strings = botStrings(languageCode);
    // Hoisted above the try so the error handler can clean up a stuck
    // streaming preview even when the failure happens mid-stream.
    let streamMsgId = null;
    try {
        // Typing indicator
        if (aiSettings.ai_typing_indicator === '1') {
            await tgCall(BOT_TOKEN, 'sendChatAction', { chat_id: chatId, action: 'typing' });
        }

        // Rate limiting (per user per minute)
        const rateLimit = parseInt(aiSettings.ai_rate_limit) || 0;
        if (rateLimit > 0) {
            const minute = Math.floor(Date.now() / 60000);
            // Cleanup of old buckets happens in the daily cron, not on every
            // message — one less D1 round-trip per reply.
            await env.DB.prepare(`
                INSERT INTO ai_rate_limits (user_id, minute, count) VALUES (?, ?, 1)
                ON CONFLICT(user_id, minute) DO UPDATE SET count = count + 1
            `).bind(userId, minute).run();
            const row = await env.DB.prepare('SELECT count FROM ai_rate_limits WHERE user_id = ? AND minute = ?').bind(userId, minute).first();
            if (row && row.count > rateLimit) {
                await sendMessage(chatId, strings.rate_limited, BOT_TOKEN, 'HTML');
                return;
            }
        }

        // Global rate limit (per minute or per hour across ALL users). Stored
        // under the reserved user_id = 0 sentinel in the same bucket table;
        // the owner can disable it (limit 0) and rely on the per-user cap,
        // or combine both.
        const globalLimit = parseInt(aiSettings.ai_global_rate_limit) || 0;
        if (globalLimit > 0) {
            const minute = Math.floor(Date.now() / 60000);
            const isHour = aiSettings.ai_global_rate_window === 'hour';
            const windowMinute = isHour ? Math.floor(minute / 60) * 60 : minute;
            await env.DB.prepare(`
                INSERT INTO ai_rate_limits (user_id, minute, count) VALUES (0, ?, 1)
                ON CONFLICT(user_id, minute) DO UPDATE SET count = count + 1
            `).bind(minute).run();
            let used = 0;
            if (isHour) {
                const row = await env.DB.prepare('SELECT COALESCE(SUM(count), 0) as n FROM ai_rate_limits WHERE user_id = 0 AND minute >= ?').bind(windowMinute).first();
                used = row ? row.n : 0;
            } else {
                const row = await env.DB.prepare('SELECT count FROM ai_rate_limits WHERE user_id = 0 AND minute = ?').bind(minute).first();
                used = row ? row.count : 0;
            }
            if (used > globalLimit) {
                await sendMessage(chatId, strings.rate_limited_global, BOT_TOKEN, 'HTML');
                return;
            }
        }

        const userRow = await env.DB.prepare('SELECT first_name, username FROM users WHERE id = ?').bind(userId).first();
        const commands = await env.DB.prepare('SELECT command FROM commands WHERE enabled = 1').all();
        const availableCommands = commands.results.map(r => r.command).join(', ');
        const ctx = {
            bot_name: aiSettings.ai_display_name || 'Nyxx Bot',
            user_first_name: userRow ? userRow.first_name : 'User',
            user_username: userRow ? userRow.username : '',
            chat_id: String(chatId),
            available_commands: availableCommands,
            custom_vars: parseCustomVars(aiSettings.ai_custom_vars_text)
        };

        const isGroup = chatType === 'group' || chatType === 'supergroup';
        const memoryLimit = parseInt(isGroup ? (aiSettings.ai_group_memory || '0') : (aiSettings.ai_memory || '0'));
        let history = [];
        if (memoryLimit > 0) history = await getAiHistory(env.DB, chatId, memoryLimit);

        // Opt-in streaming (#30): when enabled, progressively edit a single
        // Telegram message while tokens arrive from the provider. Retries and
        // fallback providers run non-streamed.
        const streaming = aiSettings.ai_streaming === '1';
        let reply = null;
        let mainError = null;
        // All preview sends/edits are serialized in order and awaited before
        // the final edit, so a preview can never race or overwrite the reply.
        let publishChain = Promise.resolve();
        let lastPreview = '';
        try {
            const onChunk = streaming ? (partial) => {
                const t = stripTagsForPreview(partial);
                if (!t || t === lastPreview) return;
                lastPreview = t;
                const body = (t + ' ▌').slice(0, 4000);
                publishChain = publishChain.then(async () => {
                    if (streamMsgId === null) {
                        const data = await tgCall(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: body });
                        if (data && data.ok && data.result && data.result.message_id) streamMsgId = data.result.message_id;
                    } else {
                        await tgCall(BOT_TOKEN, 'editMessageText', { chat_id: chatId, message_id: streamMsgId, text: body });
                    }
                }).catch(() => {});
            } : null;
            reply = await callAiCompletion(aiSettings, history, text, ctx, 'main', undefined, streaming, onChunk);
        } catch (err) {
            mainError = err.message;
            // Optional single retry on the main provider (non-streamed)
            if (aiSettings.ai_retry_on_failure === '1') {
                try {
                    reply = await callAiCompletion(aiSettings, history, text, ctx, 'main');
                    mainError = null;
                } catch (err2) {
                    mainError = err2.message;
                }
            }
            if (mainError) {
                let altList = [];
                try { altList = JSON.parse(aiSettings.ai_alt_providers || '[]'); } catch(e) {}
                for (let i = 0; i < altList.length; i++) {
                    try {
                        reply = await callAiCompletion(aiSettings, history, text, ctx, 'alt', i);
                        mainError = null;
                        break;
                    } catch (altErr) { /* try next */ }
                }
            }
            if (mainError) throw new Error(mainError);
        }
        // An empty provider response must fall through to the fallback message
        // instead of silently sending nothing.
        if (!reply || !String(reply).trim()) {
            throw new Error('Empty response from AI provider');
        }

        // If streaming produced a placeholder message, replace it with the
        // final formatted text; otherwise send normally.
        let sentFinal = false;
        if (streamMsgId !== null) {
            await publishChain;
            const finalHtml = escapeTelegramHTML(reply || '').slice(0, 4000);
            const edit = await tgCall(BOT_TOKEN, 'editMessageText', { chat_id: chatId, message_id: streamMsgId, text: finalHtml, parse_mode: 'HTML' });
            sentFinal = !!(edit && edit.ok);
            if (!sentFinal) {
                // The final edit can fail on Telegram's entity parser — fall
                // back to plain text on the same message, never leave the ▌.
                const plainEdit = await tgCall(BOT_TOKEN, 'editMessageText', { chat_id: chatId, message_id: streamMsgId, text: htmlToPlain(reply || '').slice(0, 4000) });
                sentFinal = !!(plainEdit && plainEdit.ok);
            }
        }

        // Memory and RTL must apply for both streamed and non-streamed replies.
        if (memoryLimit > 0 && reply) {
            await saveAiMessage(env.DB, chatId, 'user', text);
            await saveAiMessage(env.DB, chatId, 'assistant', reply);
            await trimAiMessages(env.DB, chatId, memoryLimit);
        }

        if (aiSettings.ai_rtl_support === '1' && reply) {
            reply = addRtlMarkToPersian(reply);
        }

        if (!sentFinal) {
            if (streamMsgId !== null) {
                // Both final edits failed: remove the stuck preview (still
                // showing the ▌ cursor) so the chat is not left with an
                // orphan partial message next to the fresh reply.
                await tgCall(BOT_TOKEN, 'deleteMessage', { chat_id: chatId, message_id: streamMsgId });
            }
            // Artificial delay before replying
            const delay = parseInt(aiSettings.ai_response_delay) || 0;
            if (delay > 0) await new Promise(r => setTimeout(r, Math.min(delay, 5000)));
            await sendMessage(chatId, reply, BOT_TOKEN, 'HTML');
        }

        // Suggested quick replies as one-time reply keyboard
        if (aiSettings.ai_suggested_questions_enabled === '1') {
            try {
                const questions = JSON.parse(aiSettings.ai_suggested_questions || '[]');
                if (Array.isArray(questions) && questions.length > 0) {
                    const rows = [];
                    for (let i = 0; i < questions.length; i += 3) {
                        rows.push(questions.slice(i, i + 3).map(q => ({ text: q.label })));
                    }
                    const oneTime = aiSettings.ai_suggested_one_time !== '0';
                    const replyKeyboard = { keyboard: rows, resize_keyboard: true, one_time_keyboard: oneTime };
                    // text is mandatory on sendMessage — omitting it made
                    // Telegram reject the keyboard with a 400 so the quick
                    // replies never appeared.
                    await tgCall(BOT_TOKEN, 'sendMessage', {
                        chat_id: chatId,
                        text: ' ',
                        reply_markup: replyKeyboard
                    });
                }
            } catch (e) {}
        }
    } catch (err) {
        console.error('AI reply error:', err);
        const fallback = aiSettings.ai_fallback || 'Sorry, I am currently unavailable. Please try again later.';
        try {
            if (streamMsgId !== null) {
                // The AI failed after streaming started: clear the partial
                // preview before showing the fallback message.
                await tgCall(BOT_TOKEN, 'deleteMessage', { chat_id: chatId, message_id: streamMsgId });
            }
            await sendMessage(chatId, fallback, BOT_TOKEN, 'HTML');
        } catch (e) {
            console.error('Fallback send failed:', e);
        }
    }
}
