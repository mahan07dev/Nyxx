// ============================================================================
// NYXX — Worker ("Overhaul")
// Telegram bot builder + management dashboard for Cloudflare Workers + D1.
// ============================================================================
const VERSION = '3.0.0';

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
        .main-container { flex: 1; max-width: 1240px; margin: 0 auto; padding: 1.25rem 1.25rem 2.5rem; width: 100%; }
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
            display: flex; gap: 0.15rem;
            border-bottom: 1px solid var(--border); margin-bottom: 1.5rem;
            padding: 0 0.25rem; overflow-x: auto; scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
        }
        .tabs-header::-webkit-scrollbar { display: none; }
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
        .tab-btn .tab-label-full { display: inline; }
        .tab-btn .tab-label-short { display: none; }
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
            .tab-btn .tab-label-full { display: none; }
            .tab-btn .tab-label-short { display: inline; }
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
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ============ Chips (keyboard builder) ============ */
        .button-chip-list { display: flex; flex-direction: column; gap: 0.4rem; min-height: 30px; padding: 0.2rem 0; }
        .button-chip {
            display: flex; align-items: center; gap: 0.55rem; background: var(--bg-2);
            border: 1px solid var(--border); border-radius: 9px; padding: 0.45rem 0.65rem;
            font-size: 0.85rem; cursor: grab; transition: background 0.15s, border-color 0.15s, box-shadow 0.15s; width: 100%;
        }
        .button-chip:hover { background: var(--surface-2); border-color: var(--border-strong); }
        .button-chip.dragging { opacity: 0.4; border-color: var(--primary); }
        .button-chip.drag-over { border-color: var(--primary); box-shadow: 0 0 0 2px var(--primary-soft); }
        .chip-grip { color: var(--text-3); font-size: 0.85rem; cursor: grab; flex-shrink: 0; }
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
        .menu-row { display: flex; gap: 0.5rem; align-items: center; }
        .menu-row .form-input { flex: 1; min-width: 0; }
        .menu-del { color: var(--red); background: none; border: none; cursor: pointer; font-size: 1rem; padding: 0.4rem; border-radius: 8px; flex-shrink: 0; }
        .menu-del:hover { background: var(--red-soft); }
        .menu-fixed { color: var(--text-3); font-size: 0.72rem; display: inline-flex; align-items: center; gap: 0.3rem; flex-shrink: 0; }

        /* ============ Users table ============ */
        .table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid var(--border); }
        table.users-table { width: 100%; font-size: 0.85rem; border-collapse: collapse; min-width: 640px; }
        .users-table th {
            text-align: start; padding: 0.7rem 0.9rem; font-size: 0.72rem; text-transform: uppercase;
            letter-spacing: 0.06em; color: var(--text-3); background: var(--surface);
            border-bottom: 1px solid var(--border); font-weight: 700;
        }
        .users-table td { padding: 0.6rem 0.9rem; border-bottom: 1px solid rgba(38, 52, 90, 0.6); vertical-align: middle; }
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

        /* ============ RTL adjustments ============ */
        html[dir="rtl"] .tree-command-name { letter-spacing: 0; }
        html[dir="rtl"] .navbar-ver { letter-spacing: 0; }

        /* ============ Responsive ============ */
        @media (max-width: 866px) {
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
                <button class="tab-btn active" onclick="switchTab('overview')"><i class="fa-solid fa-house"></i> <span class="tab-label-full">Overview</span><span class="tab-label-short"><i class="fa-solid fa-house"></i></span></button>
                <button class="tab-btn" onclick="switchTab('commands')"><i class="fa-solid fa-list-ul"></i> <span class="tab-label-full">Commands</span><span class="tab-label-short"><i class="fa-solid fa-list-ul"></i></span></button>
                <button class="tab-btn" onclick="switchTab('menu')"><i class="fa-solid fa-bars"></i> <span class="tab-label-full">Menu</span><span class="tab-label-short"><i class="fa-solid fa-bars"></i></span></button>
                <button class="tab-btn" onclick="switchTab('users')"><i class="fa-solid fa-users"></i> <span class="tab-label-full">Users</span><span class="tab-label-short"><i class="fa-solid fa-users"></i></span></button>
                <button class="tab-btn" onclick="switchTab('ai')"><i class="fa-solid fa-robot"></i> <span class="tab-label-full">AI</span><span class="tab-label-short"><i class="fa-solid fa-robot"></i></span></button>
                <button class="tab-btn" onclick="switchTab('settings')"><i class="fa-solid fa-gear"></i> <span class="tab-label-full">Settings</span><span class="tab-label-short"><i class="fa-solid fa-gear"></i></span></button>
                <button class="tab-btn" onclick="switchTab('botinfo')"><i class="fa-solid fa-circle-info"></i> <span class="tab-label-full">Bot Info</span><span class="tab-label-short"><i class="fa-solid fa-circle-info"></i></span></button>
                <button class="tab-btn" onclick="switchTab('backup')"><i class="fa-solid fa-box-archive"></i> <span class="tab-label-full">Backup</span><span class="tab-label-short"><i class="fa-solid fa-box-archive"></i></span></button>
                <button class="tab-btn" onclick="switchTab('update')"><i class="fa-solid fa-arrow-up"></i> <span class="tab-label-full">Update</span><span class="tab-label-short"><i class="fa-solid fa-arrow-up"></i></span></button>
            </div>
            <div class="hamburger" id="hamburger-btn" onclick="toggleHamburger()"><i class="fa-solid fa-bars" id="hamburgerfa"></i> <span>Menu</span></div>
            <div id="mobile-tabs" class="mobile-tabs">
                <button class="active" onclick="switchTab('overview'); closeHamburger();"><i class="fa-solid fa-house"></i> <span>Overview</span></button>
                <button onclick="switchTab('commands'); closeHamburger();"><i class="fa-solid fa-list-ul"></i> <span>Commands</span></button>
                <button onclick="switchTab('menu'); closeHamburger();"><i class="fa-solid fa-bars"></i> <span>Menu</span></button>
                <button onclick="switchTab('users'); closeHamburger();"><i class="fa-solid fa-users"></i> <span>Users</span></button>
                <button onclick="switchTab('ai'); closeHamburger();"><i class="fa-solid fa-robot"></i> <span>AI</span></button>
                <button onclick="switchTab('settings'); closeHamburger();"><i class="fa-solid fa-gear"></i> <span>Settings</span></button>
                <button onclick="switchTab('botinfo'); closeHamburger();"><i class="fa-solid fa-circle-info"></i> <span>Bot Info</span></button>
                <button onclick="switchTab('backup'); closeHamburger();"><i class="fa-solid fa-box-archive"></i> <span>Backup</span></button>
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
                    <button onclick="showAddCommandModal()" class="btn btn-success btn-sm"><i class="fa-solid fa-plus"></i> <span>Add Command</span></button>
                </div>
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
                <div id="menu-commands-container" class="panel flex-col" style="gap:0.5rem;"></div>
                <button onclick="publishMenuCommands()" class="btn btn-success mt-3"><i class="fa-solid fa-cloud-arrow-up"></i> <span>Publish to Telegram</span></button>
                <div id="menu-publish-result" class="hidden mt-2" style="font-size:0.875rem;"></div>
            </div>

            <!-- ============ USERS TAB ============ -->
            <div id="tab-users" class="tab-content">
                <h3 class="panel-title" style="margin-bottom:0.6rem;"><i class="fa-solid fa-users"></i> <span>Users Who Have Interacted</span></h3>
                <div class="search-row">
                    <input id="user-search" class="form-input" placeholder="Search by username or name…">
                    <button onclick="loadUsers()" class="btn btn-gray btn-sm"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div id="users-list" class="panel" style="padding:0.9rem;"></div>
            </div>

            <!-- ============ AI TAB ============ -->
            <div id="tab-ai" class="tab-content">
                <h3 class="panel-title" style="margin-bottom:1rem;"><i class="fa-solid fa-robot"></i> <span>AI Configuration</span></h3>

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

                    <div class="toggle-row" style="padding:0.6rem 0.9rem; margin-bottom:1rem;">
                        <div>
                            <div class="label" style="font-size:0.85rem;">Strict Knowledge Mode</div>
                            <div class="sub" style="font-size:0.72rem;">When enabled, AI will ONLY use your instructions and knowledge base — never web search or invent info.</div>
                        </div>
                        <div id="ai-strict-mode-toggle" class="toggle" onclick="toggleStrictMode()"><span class="slider"></span></div>
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
                                <label class="form-label">Response Delay (ms)</label>
                                <input type="number" id="ai-response-delay" class="form-input" placeholder="0" value="0" min="0" max="5000">
                            </div>
                            <div class="form-group" style="display:flex; flex-direction:column; gap:0.35rem;">
                                <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; cursor:pointer;"><input type="checkbox" id="ai-typing-indicator" checked> <span>Show Typing Indicator</span></label>
                                <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; cursor:pointer;"><input type="checkbox" id="ai-retry-on-failure"> <span>Retry Failed Request Once</span></label>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3" style="border-top:1px solid var(--border); padding-top:0.9rem;">
                        <div class="toggle-row" style="padding:0.6rem 0.9rem; margin-bottom:0.6rem;">
                            <div>
                                <div class="label" style="font-size:0.85rem;">RTL Support (Farsi)</div>
                                <div class="sub" style="font-size:0.72rem;">Adds U+200F before English letters at the start of paragraphs that are actually in Farsi.</div>
                            </div>
                            <div id="ai-rtl-toggle" class="toggle" onclick="toggleRtlSupport()"><span class="slider"></span></div>
                        </div>
                        <div class="flex">
                            <span style="font-weight:600;"><i class="fa-solid fa-memory"></i> <span>AI Memory Usage</span></span>
                            <span id="memory-count-display" class="text-sm">…</span>
                            <button onclick="refreshMemoryCount()" class="btn btn-gray btn-sm"><i class="fa-solid fa-rotate"></i> <span>Refresh</span></button>
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
                        <div class="flex" style="margin-bottom:0.5rem;">
                            <input id="suggested-q-label" class="form-input" style="flex:1; min-width:130px;" placeholder="Button label">
                            <input id="suggested-q-value" class="form-input" style="flex:1; min-width:130px;" placeholder="Value (text to send)">
                            <button onclick="addSuggestedQuestion()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div id="suggested-questions-list" class="panel" style="padding:0.5rem; min-height:30px;"></div>
                    </div>
                    <span class="field-hint mt-2">These appear as a one-time reply keyboard. Once the user taps a button or closes the menu, it won't reappear automatically.</span>
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
                        <button onclick="testWebhook()" class="btn btn-gray btn-sm mt-2"><i class="fa-solid fa-stethoscope"></i> <span>Test Webhook</span></button>
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
                        <button onclick="exportBackup()" class="btn btn-success"><i class="fa-solid fa-download"></i> <span>Export Backup</span></button>
                        <button onclick="document.getElementById('backup-import-file').click()" class="btn btn-gray"><i class="fa-solid fa-upload"></i> <span>Import Backup</span></button>
                    </div>
                    <input type="file" id="backup-import-file" style="display:none;" onchange="importBackup(event)">
                    <div id="backup-result" class="hidden text-sm"></div>
                    <hr class="divider">
                    <p class="text-sm">⚠️ Restoring overwrites your current commands, users, AI settings and menu. The admin password is kept unless the backup contains one.</p>
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
                        <input id="inline-btn-label" class="form-input" style="flex:1; min-width:120px;" placeholder="Label">
                        <select id="inline-btn-type" class="form-input" style="flex:0 0 auto; width:auto;">
                            <option value="command" selected>Command</option>
                            <option value="callback">Callback</option>
                            <option value="url">URL</option>
                        </select>
                        <input id="inline-btn-value" class="form-input" style="flex:1; min-width:150px;" placeholder="Value/URL">
                        <select id="inline-btn-command-select" class="form-input hidden" style="flex:1; min-width:150px;"><option value=""></option></select>
                        <button onclick="addInlineButton()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div id="inline-buttons-list" class="panel" style="padding:0.5rem; min-height:30px;"></div>
                </div>

                <div class="toggle-row" style="padding:0.6rem 0.9rem; margin-bottom:0.9rem;">
                    <span class="label" style="font-size:0.85rem;">Reply Keyboard</span>
                    <div id="reply-toggle" class="toggle" onclick="toggleReplyKeyboard()"><span class="slider"></span></div>
                </div>
                <div id="reply-keyboard-section" class="hidden" style="margin-bottom:0.9rem;">
                    <div class="flex" style="margin-bottom:0.5rem;">
                        <input id="reply-btn-label" class="form-input" style="flex:1; min-width:140px;" placeholder="Button text">
                        <select id="reply-btn-command" class="form-input" style="flex:1; min-width:140px;"><option value=""></option></select>
                        <button onclick="addReplyButton()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div id="reply-buttons-list" class="panel" style="padding:0.5rem; min-height:30px;"></div>
                    <span class="field-hint">A “Back” button is added automatically for sub‑commands.</span>
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

    <!-- ============ USER MANAGE MODAL ============ -->
    <div id="user-manage-modal" class="modal-overlay hidden">
        <div class="modal-box" style="max-width:520px;">
            <div class="modal-title">
                <span id="user-manage-title">Manage User</span>
                <button class="modal-close-x" onclick="closeUserManageModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-scroll">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin-bottom:1rem;">
                    <div class="knowledge-base-item" style="margin-bottom:0; padding:0.6rem;">
                        <div style="font-size:0.72rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.04em;">User ID</div>
                        <div id="um-id" class="mono" style="font-size:0.9rem; margin-top:0.15rem;">—</div>
                    </div>
                    <div class="knowledge-base-item" style="margin-bottom:0; padding:0.6rem;">
                        <div style="font-size:0.72rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.04em;">Username</div>
                        <div id="um-username" style="font-size:0.9rem; margin-top:0.15rem;">—</div>
                    </div>
                    <div class="knowledge-base-item" style="margin-bottom:0; padding:0.6rem;">
                        <div style="font-size:0.72rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.04em;">Name</div>
                        <div id="um-name" style="font-size:0.9rem; margin-top:0.15rem;">—</div>
                    </div>
                    <div class="knowledge-base-item" style="margin-bottom:0; padding:0.6rem;">
                        <div style="font-size:0.72rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.04em;">Role</div>
                        <div id="um-role" style="font-size:0.9rem; margin-top:0.15rem;">—</div>
                    </div>
                    <div class="knowledge-base-item" style="margin-bottom:0; padding:0.6rem; grid-column:span 2;">
                        <div style="font-size:0.72rem; color:var(--text-3); text-transform:uppercase; letter-spacing:0.04em;">Last Active</div>
                        <div id="um-last-active" style="font-size:0.9rem; margin-top:0.15rem;">—</div>
                    </div>
                </div>

                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                    <button id="um-role-btn" class="btn btn-primary btn-block"><i class="fa-solid fa-user-shield"></i> Promote to Admin</button>
                    <button id="um-block-ai-btn" class="btn btn-danger btn-block"><i class="fa-solid fa-robot"></i> Block from AI Chatbot</button>
                    <button id="um-block-all-btn" class="btn btn-danger btn-block"><i class="fa-solid fa-ban"></i> Block from Entire Bot</button>
                    <div style="border-top:1px solid var(--border); padding-top:0.6rem; margin-top:0.2rem;">
                        <label class="form-label" style="font-size:0.82rem;">Send Private Message</label>
                        <div class="flex">
                            <input id="um-message" class="form-input" style="flex:1; min-width:0;" placeholder="Type a message to send via bot…">
                            <button onclick="sendUserMessage()" class="btn btn-primary btn-sm"><i class="fa-solid fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="closeUserManageModal()" class="btn btn-gray"><span>Close</span></button>
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
        showLoading();
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
        } finally {
            hideLoading();
        }
    }

    async function submitLogin() {
        const password = document.getElementById('login-password').value;
        const errorEl = document.getElementById('login-error');
        errorEl.style.display = 'none';
        if (!password) { errorEl.textContent = 'Please enter your password.'; errorEl.style.display = 'block'; return; }
        showLoading();
        try {
            const res = await fetch('/api/login', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Login failed');
            showToast('Login successful!');
            showDashboard();
        } catch (err) {
            errorEl.textContent = err.message;
            errorEl.style.display = 'block';
        } finally {
            hideLoading();
        }
    }

    async function logout() {
        showLoading();
        try {
            await fetch('/api/logout', { method: 'POST' });
            showToast('Logged out.');
            document.getElementById('logout-btn').classList.add('hidden');
            showStep('step-login');
        } finally {
            hideLoading();
        }
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
    }

    // ======================================================================
    // TABS
    // ======================================================================
    const TAB_ORDER = { overview: 0, commands: 1, menu: 2, users: 3, ai: 4, settings: 5, botinfo: 6, backup: 7, update: 8 };

    function switchTab(tabId) {
        currentTab = tabId;
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        const el = document.getElementById('tab-' + tabId);
        if (el) el.classList.add('active');
        document.querySelectorAll('.tabs-header .tab-btn').forEach((b, i) => b.classList.toggle('active', i === TAB_ORDER[tabId]));
        document.querySelectorAll('#mobile-tabs button').forEach((b, i) => b.classList.toggle('active', i === TAB_ORDER[tabId]));
        closeHamburger();
        if (tabId === 'commands') loadCommands();
        else if (tabId === 'menu') loadMenuCommands();
        else if (tabId === 'users') loadUsers();
        else if (tabId === 'ai') { loadAiSettings(); refreshMemoryCount(); }
        else if (tabId === 'settings') loadSettings();
        else if (tabId === 'botinfo') loadBotInfo();
        else if (tabId === 'overview') loadOverview();
        else if (tabId === 'update') loadUpdateTab();
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
                '<div class="stat-value">' + (s.ai_memory_count || 0) + '</div><div class="stat-label">' + 'AI Memory' + ' · ' + 'messages' + '</div></div>' +
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
        document.getElementById('inline-toggle').classList.toggle('active', showInlineKeyboard);
        document.getElementById('inline-keyboard-section').classList.toggle('hidden', !showInlineKeyboard);
    }
    function toggleReplyKeyboard() {
        showReplyKeyboard = !showReplyKeyboard;
        document.getElementById('reply-toggle').classList.toggle('active', showReplyKeyboard);
        document.getElementById('reply-keyboard-section').classList.toggle('hidden', !showReplyKeyboard);
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
            opt.textContent = 'cmd.command';
            parentSelect.appendChild(opt);
        }
        if (editingCommand && editingCommand.parent) parentSelect.value = editingCommand.parent;
        if (!editingCommand && currentParent !== null) parentSelect.value = currentParent;
        for (const selId of ['inline-btn-command-select', 'reply-btn-command']) {
            const sel = document.getElementById(selId);
            sel.innerHTML = '';
            let ph = document.createElement('option');
            ph.value = '';
            ph.textContent = 'Select command…';
            sel.appendChild(ph);
            for (const cmd of commandsCache) {
                if (cmd.command === currentCommand) continue;
                const opt = document.createElement('option');
                opt.value = cmd.command;
                opt.textContent = 'cmd.command';
                sel.appendChild(opt);
            }
        }
    }

    function renderInlineChips() {
        const container = document.getElementById('inline-buttons-list');
        if (inlineButtonsArray.length === 0) {
            container.innerHTML = '<div class="empty-state" style="padding:0.6rem;"><i class="fa-regular fa-keyboard"></i>' + 'No buttons added yet.' + '</div>';
            return;
        }
        let html = '<div class="button-chip-list"><span class="field-hint" style="margin-bottom:0.2rem;">' + 'Your buttons:' + '</span>';
        inlineButtonsArray.forEach((b, i) => {
            const icon = b.type === 'url' ? 'fa-link' : (b.type === 'command' ? 'fa-terminal' : 'fa-message');
            html += '<div class="button-chip" draggable="true" data-index="' + i + '" data-type="inline">' +
                '<span class="chip-grip"><i class="fa-solid fa-grip-lines"></i></span>' +
                '<i class="fa-solid ' + icon + '" style="color:var(--accent);"></i>' +
                '<span class="chip-text">' + escapeHtml(b.text) + '</span>' +
                '<span class="chip-badge">' + ({command:'Command',callback:'Callback',url:'URL'}[b.type] || b.type) + '</span>' +
                '<button class="chip-btn chip-delete" onclick="removeInlineButton(' + i + ')"><i class="fa-regular fa-circle-xmark"></i></button>' +
                '</div>';
        });
        container.innerHTML = html + '</div>';
        attachDragEvents(container);
    }

    function renderReplyChips() {
        const container = document.getElementById('reply-buttons-list');
        if (replyButtonsArray.length === 0) {
            container.innerHTML = '<div class="empty-state" style="padding:0.6rem;"><i class="fa-regular fa-keyboard"></i>' + 'No buttons added yet.' + '</div>';
            return;
        }
        let html = '<div class="button-chip-list"><span class="field-hint" style="margin-bottom:0.2rem;">' + 'Your buttons:' + '</span>';
        replyButtonsArray.forEach((b, i) => {
            html += '<div class="button-chip" draggable="true" data-index="' + i + '" data-type="reply">' +
                '<span class="chip-grip"><i class="fa-solid fa-grip-lines"></i></span>' +
                '<i class="fa-regular fa-keyboard" style="color:var(--accent);"></i>' +
                '<span class="chip-text">' + escapeHtml(b.text) + ' → ' + escapeHtml(b.command) + '</span>' +
                '<button class="chip-btn chip-delete" onclick="removeReplyButton(' + i + ')"><i class="fa-regular fa-circle-xmark"></i></button>' +
                '</div>';
        });
        container.innerHTML = html + '</div>';
        attachDragEvents(container);
    }

    function addInlineButton() {
        const text = document.getElementById('inline-btn-label').value.trim();
        const type = document.getElementById('inline-btn-type').value;
        let value = document.getElementById('inline-btn-value').value.trim();
        if (type === 'command') value = document.getElementById('inline-btn-command-select').value;
        if (!text || !value) { showToast('Fill both fields.', 'error'); return; }
        inlineButtonsArray.push({ text, type, value });
        renderInlineChips();
        document.getElementById('inline-btn-label').value = '';
        document.getElementById('inline-btn-value').value = '';
        document.getElementById('inline-btn-command-select').value = '';
    }
    function removeInlineButton(index) { inlineButtonsArray.splice(index, 1); renderInlineChips(); }

    function getInlineButtonsJSON() {
        if (inlineButtonsArray.length === 0) return '';
        const rows = [];
        for (let i = 0; i < inlineButtonsArray.length; i += 3) {
            rows.push(inlineButtonsArray.slice(i, i + 3).map(b => {
                const btn = { text: b.text };
                if (b.type === 'url') btn.url = b.value;
                else btn.callback_data = b.value;
                return btn;
            }));
        }
        return JSON.stringify({ inline_keyboard: rows });
    }

    function loadInlineButtonsFromJSON(json) {
        inlineButtonsArray = [];
        if (!json) { renderInlineChips(); return; }
        try {
            const obj = JSON.parse(json);
            if (obj.inline_keyboard) {
                obj.inline_keyboard.forEach(row => {
                    (row || []).forEach(btn => {
                        if (!btn) return;
                        const isUrl = !!btn.url;
                        const value = btn.url || btn.callback_data || '';
                        const type = isUrl ? 'url' : (value.startsWith('/') ? 'command' : 'callback');
                        inlineButtonsArray.push({ text: btn.text || '', type, value });
                    });
                });
            }
        } catch (e) {}
        renderInlineChips();
    }

    function addReplyButton() {
        const text = document.getElementById('reply-btn-label').value.trim();
        const command = document.getElementById('reply-btn-command').value;
        if (!text || !command) { showToast('Fill both fields.', 'error'); return; }
        replyButtonsArray.push({ text, command });
        renderReplyChips();
        document.getElementById('reply-btn-label').value = '';
        document.getElementById('reply-btn-command').value = '';
    }
    function removeReplyButton(index) { replyButtonsArray.splice(index, 1); renderReplyChips(); }
    function getReplyButtonsJSON() { return JSON.stringify(replyButtonsArray); }
    function loadReplyButtonsFromJSON(json) {
        replyButtonsArray = [];
        if (json) {
            try { const arr = JSON.parse(json); if (Array.isArray(arr)) replyButtonsArray = arr; } catch (e) {}
        }
        renderReplyChips();
    }

    function attachDragEvents(container) {
        container.querySelectorAll('.button-chip[draggable="true"]').forEach(chip => {
            chip.addEventListener('dragstart', handleDragStart);
            chip.addEventListener('dragover', handleDragOver);
            chip.addEventListener('drop', handleDrop);
            chip.addEventListener('dragend', handleDragEnd);
        });
    }
    function handleDragStart(e) {
        const target = e.target.closest('.button-chip');
        if (!target) return;
        e.dataTransfer.setData('text/plain', JSON.stringify({ type: target.dataset.type, index: parseInt(target.dataset.index) }));
        target.classList.add('dragging');
    }
    function handleDragOver(e) {
        e.preventDefault();
        const target = e.target.closest('.button-chip');
        if (target) target.classList.add('drag-over');
    }
    function handleDrop(e) {
        e.preventDefault();
        const target = e.target.closest('.button-chip');
        if (!target) return;
        target.classList.remove('drag-over');
        let from;
        try { from = JSON.parse(e.dataTransfer.getData('text/plain')); } catch (err) { return; }
        if (!from || from.type !== target.dataset.type) return;
        const array = from.type === 'inline' ? inlineButtonsArray : replyButtonsArray;
        const fromIdx = from.index;
        const toIdx = parseInt(target.dataset.index);
        if (fromIdx === toIdx) return;
        const item = array.splice(fromIdx, 1)[0];
        array.splice(toIdx, 0, item);
        if (from.type === 'inline') renderInlineChips();
        else renderReplyChips();
    }
    function handleDragEnd(e) {
        const target = e.target.closest('.button-chip');
        if (target) target.classList.remove('dragging', 'drag-over');
    }

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
            loadInlineButtonsFromJSON(editingCommand.buttons_json);
            showInlineKeyboard = !!(editingCommand.buttons_json && editingCommand.buttons_json.length > 2);
            document.getElementById('inline-toggle').classList.toggle('active', showInlineKeyboard);
            document.getElementById('inline-keyboard-section').classList.toggle('hidden', !showInlineKeyboard);
            showReplyKeyboard = !!editingCommand.show_reply_keyboard;
            document.getElementById('reply-toggle').classList.toggle('active', showReplyKeyboard);
            document.getElementById('reply-keyboard-section').classList.toggle('hidden', !showReplyKeyboard);
            loadReplyButtonsFromJSON(editingCommand.reply_keyboard_json);
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
            inlineButtonsArray = [];
            renderInlineChips();
            showInlineKeyboard = false;
            document.getElementById('inline-toggle').classList.remove('active');
            document.getElementById('inline-keyboard-section').classList.add('hidden');
            showReplyKeyboard = false;
            document.getElementById('reply-toggle').classList.remove('active');
            document.getElementById('reply-keyboard-section').classList.add('hidden');
            replyButtonsArray = [];
            renderReplyChips();
            document.getElementById('modal-save-btn').innerHTML = '<i class="fa-solid fa-plus"></i> ' + 'Save';
        }
        toggleMediaField();
        modal.classList.remove('hidden');
    }

    function toggleMediaField() {
        const type = document.getElementById('modal-type').value;
        document.getElementById('media-field').style.display = type === 'photo' ? 'block' : 'none';
    }

    document.getElementById('inline-btn-type').addEventListener('change', function () {
        const type = this.value;
        const valInput = document.getElementById('inline-btn-value');
        const cmdSelect = document.getElementById('inline-btn-command-select');
        if (type === 'command') { valInput.classList.add('hidden'); cmdSelect.classList.remove('hidden'); }
        else { valInput.classList.remove('hidden'); cmdSelect.classList.add('hidden'); }
    });

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
        const buttons_json = getInlineButtonsJSON();
        const show_reply_keyboard = showReplyKeyboard ? 1 : 0;
        const reply_keyboard_json = getReplyButtonsJSON();
        const errorEl = document.getElementById('modal-error');
        if (!command || !content) { errorEl.textContent = 'Fill both fields.'; errorEl.classList.add('show'); return; }
        if (response_type === 'photo' && !media_url) { errorEl.textContent = 'Photo URL' + ' *'; errorEl.classList.add('show'); return; }
        if (parent === command) { errorEl.textContent = 'A command cannot be its own parent or ancestor.'; errorEl.classList.add('show'); return; }
        const payload = { command, parent, response_type, content, media_url, is_admin_only, enabled, buttons_json, show_reply_keyboard, reply_keyboard_json };
        const url = editingCommand ? '/api/commands/' + encodeURIComponent(editingCommand.command) : '/api/commands';
        const method = editingCommand ? 'PUT' : 'POST';
        withLoading(
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
            const deleteBtn = isStart ?
                '<span class="menu-fixed"><i class="fa-solid fa-lock"></i> ' + 'fixed' + '</span>' :
                '<button class="menu-del" onclick="removeMenuRow(' + i + ')"><i class="fa-regular fa-trash-can"></i></button>';
            html += '<div class="menu-row">' +
                '<input class="form-input" style="font-size:0.875rem;" value="' + escapeHtml(entry.command) + '" placeholder="start" data-index="' + i + '" ' + (isStart ? 'readonly' : '') + '>' +
                '<input class="form-input" style="font-size:0.875rem;" value="' + escapeHtml(entry.description) + '" placeholder="Description" data-index="' + i + '">' +
                deleteBtn +
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
            html += '<tr>' +
                '<td>' + manageBtn + '</td>' +
                '<td class="mono">' + escapeHtml(u.id) + '</td>' +
                '<td>' + escapeHtml(u.username || '-') + '</td>' +
                '<td>' + escapeHtml(u.first_name || '') + '</td>' +
                '<td><span class="badge ' + (u.role === 'admin' ? 'badge-admin' : 'badge-gray') + '">' + escapeHtml(u.role || 'user') + '</span></td>' +
                '<td>' + statusBadge + '</td>' +
                '<td style="font-size:0.75rem; color:var(--text-3);">' + escapeHtml(u.last_active || '-') + '</td>' +
                '</tr>';
        });
        container.innerHTML = html + '</tbody></table></div>';
        container.querySelectorAll('.manage-user-btn').forEach(b => b.addEventListener('click', () => {
            const user = users.find(u => u.id === parseInt(b.dataset.id));
            if (user) openUserManageModal(user);
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
    // USER MANAGE MODAL
    // ======================================================================
    let manageUser = null;

    function openUserManageModal(user) {
        manageUser = user;
        managingUserId = user.id;
        document.getElementById('user-manage-title').textContent = 'Manage @' + (user.username || user.id);
        document.getElementById('um-id').textContent = user.id;
        document.getElementById('um-username').textContent = '@' + (user.username || '-');
        document.getElementById('um-name').textContent = user.first_name || '-';
        document.getElementById('um-role').textContent = user.role || 'user';
        document.getElementById('um-last-active').textContent = user.last_active || '-';
        document.getElementById('um-role-btn').innerHTML = user.role === 'admin'
            ? '<i class="fa-solid fa-user"></i> Demote to User'
            : '<i class="fa-solid fa-user-shield"></i> Promote to Admin';
        document.getElementById('um-role-btn').onclick = () => {
            const newRole = manageUser.role === 'admin' ? 'user' : 'admin';
            updateUserRole(manageUser.id, newRole);
            closeUserManageModal();
        };
        // Fetch current block status
        fetch('/api/users/block_status/' + user.id).then(r => r.json()).then(status => {
            const isAiBlocked = status.blocked && status.block_type === 'ai_only';
            const isFullBlocked = status.blocked && status.block_type === 'full';
            if (isAiBlocked) {
                document.getElementById('um-block-ai-btn').innerHTML = '<i class="fa-solid fa-unlock"></i> Unblock from AI Chatbot';
                document.getElementById('um-block-ai-btn').className = 'btn btn-success btn-block';
            } else {
                document.getElementById('um-block-ai-btn').innerHTML = '<i class="fa-solid fa-robot"></i> Block from AI Chatbot';
                document.getElementById('um-block-ai-btn').className = 'btn btn-danger btn-block';
            }
            if (isFullBlocked) {
                document.getElementById('um-block-all-btn').innerHTML = '<i class="fa-solid fa-unlock"></i> Unblock from Entire Bot';
                document.getElementById('um-block-all-btn').className = 'btn btn-success btn-block';
            } else {
                document.getElementById('um-block-all-btn').innerHTML = '<i class="fa-solid fa-ban"></i> Block from Entire Bot';
                document.getElementById('um-block-all-btn').className = 'btn btn-danger btn-block';
            }
            document.getElementById('um-block-ai-btn').onclick = () => toggleAiBlock(user.id, !isAiBlocked);
            document.getElementById('um-block-all-btn').onclick = () => toggleFullBlock(user.id, !isFullBlocked);
        }).catch(() => {});
        document.getElementById('user-manage-modal').classList.remove('hidden');
    }

    function toggleAiBlock(userId, shouldBlock) {
        const url = shouldBlock ? '/api/users/block' : '/api/users/unblock';
        const body = shouldBlock ? { userId, blockType: 'ai_only' } : { userId };
        fetch(url, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(r => r.json()).then(data => {
            if (data.success) {
                showToast(shouldBlock ? 'User blocked from AI chatbot' : 'User unblocked from AI chatbot');
                closeUserManageModal();
                loadUsers();
            } else throw new Error(data.error);
        }).catch(err => showToast(err.message, 'error'));
    }

    function toggleFullBlock(userId, shouldBlock) {
        const url = shouldBlock ? '/api/users/block' : '/api/users/unblock';
        const body = shouldBlock ? { userId, blockType: 'full' } : { userId };
        fetch(url, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(r => r.json()).then(data => {
            if (data.success) {
                showToast(shouldBlock ? 'User blocked from entire bot' : 'User unblocked from bot');
                closeUserManageModal();
                loadUsers();
            } else throw new Error(data.error);
        }).catch(err => showToast(err.message, 'error'));
    }

    function closeUserManageModal() {
        document.getElementById('user-manage-modal').classList.add('hidden');
        manageUser = null;
        managingUserId = null;
    }

    function sendUserMessage() {
        const msg = document.getElementById('um-message').value.trim();
        if (!msg) { showToast('Type a message first', 'error'); return; }
        if (!managingUserId) return;
        withLoading(
            fetch('/api/users/send_message', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: managingUserId, message: msg })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) { showToast('Message sent!'); document.getElementById('um-message').value = ''; }
                else throw new Error(data.error || 'Failed to send');
            })
            .catch(err => showToast(err.message, 'error'))
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
            html += '<div class="button-chip" draggable="true" data-index="' + idx + '" data-type="suggested">' +
                '<span class="chip-grip"><i class="fa-solid fa-grip-lines"></i></span>' +
                '<i class="fa-regular fa-message" style="color:var(--accent);"></i>' +
                '<span class="chip-text">' + escapeHtml(q.label) + ' → ' + escapeHtml(q.value) + '</span>' +
                '<button class="chip-btn chip-edit" onclick="editSuggestedQuestion(' + idx + ')"><i class="fa-regular fa-pen-to-square"></i></button>' +
                '<button class="chip-btn chip-delete" onclick="removeSuggestedQuestion(' + idx + ')"><i class="fa-regular fa-circle-xmark"></i></button>' +
                '</div>';
        });
        container.innerHTML = html + '</div>';
        attachDragEvents(container);
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
            ai_response_delay: document.getElementById('ai-response-delay').value || '0',
            ai_group_mention: document.getElementById('ai-group-mention').value,
            ai_private_reply: document.getElementById('ai-private-reply').value,
            ai_group_reply: document.getElementById('ai-group-reply').value,
            ai_ignore_bots: document.getElementById('ai-ignore-bots').value,
            ai_ignore_forwarded: document.getElementById('ai-ignore-forwarded').value,
            ai_typing_indicator: document.getElementById('ai-typing-indicator').checked ? '1' : '0',
            ai_retry_on_failure: document.getElementById('ai-retry-on-failure').checked ? '1' : '0',
            ai_fallback: document.getElementById('ai-fallback').value.trim(),
            ai_temperature: document.getElementById('ai-temperature').value || '0.7',
            ai_max_tokens: document.getElementById('ai-max-tokens').value || '1024',
            ai_top_p: document.getElementById('ai-top-p').value || '1.0',
            ai_suggested_questions_enabled: showSuggestedQuestions ? '1' : '0',
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
        document.getElementById('ai-response-delay').value = s.ai_response_delay || '0';
        document.getElementById('ai-group-mention').value = s.ai_group_mention || '1';
        document.getElementById('ai-private-reply').value = s.ai_private_reply || '1';
        document.getElementById('ai-group-reply').value = s.ai_group_reply || '1';
        document.getElementById('ai-ignore-bots').value = s.ai_ignore_bots || '1';
        document.getElementById('ai-ignore-forwarded').value = s.ai_ignore_forwarded || '1';
        document.getElementById('ai-typing-indicator').checked = (s.ai_typing_indicator === '1');
        document.getElementById('ai-retry-on-failure').checked = (s.ai_retry_on_failure === '1');
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
        return withLoading(
            fetch('/api/ai_settings')
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Failed to load AI settings');
                cache.ai.data = data.settings;
                cache.ai.loaded = true;
                cache.ai.timestamp = Date.now();
                renderAiSettings(data.settings);
            })
            .catch(err => showToast('Error loading AI settings:' + ' ' + err.message, 'error'))
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
        withLoading(
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
        resultEl.textContent = 'Testing main provider…';
        resultEl.className = 'test-result';
        withLoading(
            fetch('/api/ai/test', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings, provider: 'main' })
            })
            .then(res => res.json())
            .then(data => {
                const mainOk = data.success;
                const mainMsg = data.message || data.error;
                if (mainOk) {
                    resultEl.textContent = '✅ Main connection successful!';
                    resultEl.className = 'test-result success';
                } else {
                    resultEl.textContent = '❌ Main connection failed: ' + mainMsg;
                    resultEl.className = 'test-result error';
                }
            })
            .catch(err => { resultEl.textContent = '❌ ' + err.message; resultEl.className = 'test-result error'; })
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
        try {
            const res = await fetch('/api/ai/memory_count');
            const data = await res.json();
            display.textContent = data.success ? data.count + ' messages stored across all chats' : '…';
        } catch (e) { display.textContent = '…'; }
    }

    // ======================================================================
    // SETTINGS
    // ======================================================================
    function loadSettings(forceLoad) {
        if (!forceLoad && isCacheValid('settings')) {
            applySettingsData(cache.settings.data);
            return Promise.resolve();
        }
        return withLoading(
            fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                applySettingsData(data);
                cache.settings.data = data;
                cache.settings.loaded = true;
                cache.settings.timestamp = Date.now();
            })
            .catch(err => showToast('Error loading settings:' + ' ' + err.message, 'error'))
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

    function factoryReset() {
        confirmDialog('Delete ALL data (commands, users, settings, AI memory, bot info)? This cannot be undone.', 'Factory Reset').then(ok => {
            if (!ok) return;
            showToast('Resetting…');
            withLoading(
                fetch('/api/reset', { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        showToast('Reset successful. Reloading…');
                        invalidateCache();
                        setTimeout(() => window.location.reload(), 1400);
                    } else throw new Error(data.error);
                })
                .catch(err => showToast('Reset error:' + ' ' + err.message, 'error'))
            );
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
    function loadBotInfo(forceLoad) {
        const resultDiv = document.getElementById('bot-info-result');
        if (!forceLoad && isCacheValid('botinfo')) {
            const data = cache.botinfo.data;
            document.getElementById('bot-name').value = data.name || '';
            document.getElementById('bot-description').value = data.description || '';
            document.getElementById('bot-short-description').value = data.short_description || '';
            resultDiv.classList.remove('hidden');
            resultDiv.textContent = '✅ Loaded from Telegram.';
            resultDiv.style.color = 'var(--green)';
            return Promise.resolve();
        }
        resultDiv.classList.remove('hidden');
        resultDiv.textContent = 'Loading from Telegram…';
        resultDiv.style.color = 'var(--text-3)';
        return withLoading(
            fetch('/api/bot_info')
            .then(res => res.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || 'Failed');
                document.getElementById('bot-name').value = data.name || '';
                document.getElementById('bot-description').value = data.description || '';
                document.getElementById('bot-short-description').value = data.short_description || '';
                cache.botinfo.data = data;
                cache.botinfo.loaded = true;
                cache.botinfo.timestamp = Date.now();
                resultDiv.textContent = '✅ Loaded from Telegram.';
                resultDiv.style.color = 'var(--green)';
            })
            .catch(err => { resultDiv.textContent = '❌ ' + err.message; resultDiv.style.color = 'var(--red)'; })
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

const PASSWORD_PREFIX = 'sha256$';

async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const hex = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
    return PASSWORD_PREFIX + hex;
}

async function verifyPassword(stored, candidate) {
    if (!stored) return false;
    if (stored.startsWith(PASSWORD_PREFIX)) {
        const hash = await hashPassword(candidate);
        return hash === stored;
    }
    // Legacy installs stored the admin password in plain text; keep them working
    // until the password is next changed (which re-hashes it).
    return stored === candidate;
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
            if (request.method === 'GET' && url.pathname === '/api/status') return await getStatus(env);
            if (request.method === 'POST' && url.pathname === '/api/setup') return await handleSetup(request, env);
            if (request.method === 'POST' && url.pathname === '/api/login') return await handleLogin(request, env);
            if (request.method === 'GET' && url.pathname === '/api/version') return await getVersionInfo(env);
            if (request.method === 'POST' && url.pathname === '/webhook') return await handleTelegramWebhook(request, env);

            // Protected endpoints
            const session = await getSession(request, env);
            if (!session) return apiJson({ error: 'Unauthorized' }, 401);

            if (request.method === 'POST' && url.pathname === '/api/logout') return await handleLogout(request, env);

            // Commands
            if (url.pathname === '/api/commands') {
                if (request.method === 'GET') return await getCommands(env);
                if (request.method === 'POST') return await createCommand(request, env);
            }
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
            if (request.method === 'POST' && url.pathname === '/api/users/block') return await blockUser(request, env);
            if (request.method === 'POST' && url.pathname === '/api/users/unblock') return await unblockUser(request, env);
            if (request.method === 'GET' && url.pathname.startsWith('/api/users/block_status/')) return await getBlockStatus(env, url);

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
            if (request.method === 'POST' && url.pathname === '/api/reset') return await factoryReset(env);

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
    }
};

// ============================================================================
// DATABASE INIT (cached per isolate — schema is created once, not per request)
// ============================================================================
const dbInitCache = new WeakMap();

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
        CREATE INDEX IF NOT EXISTS idx_commands_parent ON commands(parent);
        CREATE INDEX IF NOT EXISTS idx_ai_messages_chat ON ai_messages(chat_id);
    `;
    const statements = schema.split(';').filter(s => s.trim().length > 0);
    const p = (async () => {
        await db.batch(statements.map(s => db.prepare(s)));
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

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================
async function getSession(request, env) {
    if (!env.DB) return null;
    const cookie = request.headers.get('Cookie') || '';
    const token = cookie.split(';').find(c => c.trim().startsWith('session='));
    if (!token) return null;
    const sessionToken = token.split('=')[1].trim();
    if (!sessionToken) return null;
    await initializeDatabase(env.DB);
    const result = await env.DB.prepare('SELECT token FROM sessions WHERE token = ? AND created_at > datetime("now", "-1 day")')
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

    const secure = new URL(request.url).protocol === 'https:';
    const envPass = env.ADMIN_PASS || null;
    let ok = false;
    if (envPass && envPass === password) ok = true;
    if (!ok) {
        const stored = await getSetting(env.DB, 'admin_password');
        ok = !!(stored && await verifyPassword(stored, password));
    }
    if (!ok) return apiJson({ error: 'Invalid password' }, 401);

    const token = crypto.randomUUID();
    await env.DB.prepare('INSERT INTO sessions (token) VALUES (?)').bind(token).run();
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

async function getVersionInfo(env) {
    const current = VERSION;
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
    return apiJson({ current, latest, released, notes, worker_url: workerUrl });
}

// ============================================================================
// OVERVIEW STATS
// ============================================================================
async function getStats(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const [cmds, enabledCmds, users, admins, aiCount, tokenRec, aiEnabledRec, botUsernameRec] = await Promise.all([
            env.DB.prepare('SELECT COUNT(*) as n FROM commands').first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM commands WHERE enabled = 1').first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM users').first(),
            env.DB.prepare("SELECT COUNT(*) as n FROM users WHERE role = 'admin'").first(),
            env.DB.prepare('SELECT COUNT(*) as n FROM ai_messages').first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'ai_enabled'").first(),
            env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_username'").first(),
        ]);
        return apiJson({
            success: true,
            bot_linked: !!(tokenRec && tokenRec.value),
            bot_username: botUsernameRec ? botUsernameRec.value : '',
            commands_total: cmds ? cmds.n : 0,
            commands_enabled: enabledCmds ? enabledCmds.n : 0,
            users_total: users ? users.n : 0,
            admins_total: admins ? admins.n : 0,
            ai_memory_count: aiCount ? aiCount.n : 0,
            ai_enabled: !!(aiEnabledRec && (aiEnabledRec.value === '1' || aiEnabledRec.value === true)),
        });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
    }
}

// ============================================================================
// BACKUP & RESTORE
// ============================================================================
async function exportBackup(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const [commands, users, messages, settingsRows] = await Promise.all([
            env.DB.prepare('SELECT * FROM commands').all(),
            env.DB.prepare('SELECT * FROM users').all(),
            env.DB.prepare('SELECT chat_id, role, content, timestamp FROM ai_messages ORDER BY id').all(),
            env.DB.prepare('SELECT key, value FROM settings').all(),
        ]);
        const settings = {};
        for (const row of settingsRows.results) settings[row.key] = row.value;
        // Never ship live sessions in a backup
        delete settings.session;
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
            }
        });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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

        // Restore AI messages
        const msgStmts = [];
        for (const m of data.ai_messages || []) {
            if (!m || m.chat_id === undefined || m.content === undefined) continue;
            msgStmts.push(env.DB.prepare('INSERT INTO ai_messages (chat_id, role, content, timestamp) VALUES (?, ?, ?, ?)')
                .bind(m.chat_id, m.role || 'user', m.content, m.timestamp || new Date().toISOString()));
        }
        await runBatchChunks(env.DB, msgStmts);

        // Restore settings (only ones present in the backup; admin password is
        // preserved unless the backup explicitly contains one)
        const settings = data.settings || {};
        const setStmts = [];
        for (const [k, v] of Object.entries(settings)) {
            if (k === 'session') continue;
            if (v === null || v === undefined) continue;
            setStmts.push(env.DB.prepare(`
                INSERT INTO settings (key, value) VALUES (?, ?)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value
            `).bind(k, String(v)));
        }
        await runBatchChunks(env.DB, setStmts);

        return apiJson({ success: true });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
    }
}
// ============================================================================
// COMMANDS API
// ============================================================================
const COMMAND_FIELDS = ['command', 'parent', 'response_type', 'content', 'media_url', 'is_admin_only', 'enabled', 'buttons_json', 'show_reply_keyboard', 'reply_keyboard_json'];

async function getCommands(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const result = await env.DB.prepare('SELECT * FROM commands ORDER BY order_idx, command').all();
        return apiJson({ commands: result.results || [] });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ success: true });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
    }
}

async function sendUserPrivateMessage(request, env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const body = await request.json();
        const { userId, message } = body;
        if (!userId || !message) return apiJson({ error: 'userId and message required' }, 400);
        await initializeDatabase(env.DB);
        const token = await getSetting(env.DB, 'bot_token');
        if (!token) return apiJson({ error: 'Bot token not set' }, 400);
        const resp = await tgFetchJson(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: userId, text: message, parse_mode: 'HTML' })
        });
        if (!resp.ok) return apiJson({ error: resp.description || 'Telegram API error' }, 500);
        return apiJson({ success: true });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ success: true, block_type: type });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ success: true });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
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
// AI API HANDLERS & ENGINE
// ============================================================================
const AI_KEYS = [
    'ai_enabled', 'ai_provider', 'ai_api_key', 'ai_base_url', 'ai_model',
    'ai_system_prompt', 'ai_trigger', 'ai_memory', 'ai_fallback',
    'ai_temperature', 'ai_max_tokens', 'ai_top_p',
    'ai_suggested_questions_enabled', 'ai_suggested_questions',
    'ai_alt_providers',
    'ai_custom_headers',
    'ai_display_name', 'ai_language', 'ai_style', 'ai_length',
    'ai_rate_limit', 'ai_response_delay', 'ai_ignore_prefixes',
    'ai_group_mention', 'ai_private_reply', 'ai_group_reply',
    'ai_ignore_bots', 'ai_ignore_forwarded', 'ai_typing_indicator',
    'ai_retry_on_failure', 'ai_custom_vars_text', 'ai_knowledge_bases',
    'ai_trigger_text', 'ai_group_memory', 'ai_strict_mode', 'ai_rtl_support'
];

async function getAiSettings(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        return apiJson({ success: true, settings: await getAiSettingsFromDb(env) });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
    }
}

async function getAiSettingsFromDb(env) {
    const settings = {};
    for (const k of AI_KEYS) {
        const value = await getSetting(env.DB, k);
        settings[k] = value || '';
    }
    const defaults = {
        ai_enabled: '0', ai_provider: 'openai', ai_model: 'gpt-4o-mini', ai_trigger: 'no_command',
        ai_memory: '0', ai_group_memory: '0', ai_fallback: 'Sorry, I am currently unavailable. Please try again later.',
        ai_temperature: '0.7', ai_max_tokens: '1024', ai_top_p: '1.0', ai_suggested_questions_enabled: '0',
        ai_rate_limit: '10', ai_ignore_prefixes: '/, !, #', ai_group_mention: '1', ai_private_reply: '1',
        ai_group_reply: '1', ai_ignore_bots: '1', ai_ignore_forwarded: '1', ai_typing_indicator: '1',
        ai_retry_on_failure: '0', ai_knowledge_bases: '[]', ai_suggested_questions: '[]',
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
        return apiJson({ error: err.message }, 500);
    }
}

async function getAiMemoryCount(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        const result = await env.DB.prepare('SELECT COUNT(*) as count FROM ai_messages').first();
        return apiJson({ success: true, count: result ? result.count : 0 });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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
    detailed: 'Provide detailed responses (about 10-20 sentences).'
};
const AI_LANGUAGE_NAMES = {
    english: 'English', spanish: 'Spanish', french: 'French', german: 'German',
    persian: 'Persian (Farsi)', arabic: 'Arabic', farsi: 'Farsi', russian: 'Russian'
};

async function callAiCompletion(settings, chatHistory, userPrompt, context, providerType, altIndex) {
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
    const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(payload) });
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`AI API error (${res.status}): ${errText.slice(0, 400)}`);
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
        return apiJson({ error: err.message }, 500);
    }
}

async function clearAiMemory(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await env.DB.prepare('DELETE FROM ai_messages').run();
        return apiJson({ success: true });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ success: true });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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
            url_matches: !!(expectedUrl && info.url === expectedUrl),
            pending_updates: info.pending_update_count || 0,
            last_error: info.last_error_message || '',
            last_error_date: info.last_error_date || 0,
            ip_address: info.ip_address || ''
        });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ success: true });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ error: err.message }, 500);
    }
}

// ============================================================================
// FACTORY RESET
// ============================================================================
async function factoryReset(env) {
    if (!env.DB) return apiJson({ error: 'DB not available' }, 500);
    try {
        await initializeDatabase(env.DB);
        const tables = ['settings', 'users', 'commands', 'sessions', 'logs', 'ai_messages', 'ai_rate_limits', 'blocked_users'];
        await runBatchChunks(env.DB, tables.map(t => env.DB.prepare(`DROP TABLE IF EXISTS ${t}`)));
        // The tables were just dropped, so the cached schema-init promise is
        // stale — drop it from the cache so the schema is recreated below.
        dbInitCache.delete(env.DB);
        await initializeDatabase(env.DB);
        return apiJson({ success: true });
    } catch (err) {
        return apiJson({ error: err.message }, 500);
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
        return apiJson({ valid: false, error: e.message }, 500);
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

        const scriptUrl = workerUrl || 'https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/worker.js';
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
        return apiJson({ success: false, error: e.message }, 500);
    }
}
// ============================================================================
// TELEGRAM BOT ENGINE
// ============================================================================
const BOT_STRINGS = {
    en: {
        not_found: 'Command not found. Use /start to see available options.',
        unauthorized: '⚠️ Unauthorized.',
        back: 'Back',
        rate_limited: '⏳ Too many requests. Please wait a moment and try again.',
        welcome: (botName, dashboardUrl) => `👋 Welcome to <b>${botName}</b>!\n\n` +
            `This bot is powered by <a href="https://github.com/Mahan07dev/nyxx">Nyxx</a>, ` +
            `an open‑source Telegram bot builder for Cloudflare Workers.\n\n` +
            `Created with ❤️ by <b>@Mahan07dev</b>`
    }

};

function botStrings(languageCode) {
    return BOT_STRINGS.en;
}

function isBackWord(text) {
    const lower = (text || '').trim().toLowerCase();
    return lower === 'back';
}

async function handleTelegramWebhook(request, env) {
    if (!env.DB) return new Response('DB not available', { status: 500 });

    // If a webhook secret is configured, only Telegram (which echoes it back in
    // the X-Telegram-Bot-Api-Secret-Token header) may deliver updates.
    try {
        await initializeDatabase(env.DB);
        const secret = await getSetting(env.DB, 'webhook_secret');
        if (secret) {
            const header = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
            if (!header || header !== secret) {
                return new Response('Forbidden', { status: 401 });
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

    const BOT_TOKEN = await getSetting(env.DB, 'bot_token');
    if (!BOT_TOKEN) {
        console.error('Bot token not set');
        return new Response('Token not set', { status: 500 });
    }

    const upsertUser = async (from) => {
        if (!from || !from.id) return;
        await env.DB.prepare(`
            INSERT INTO users (id, username, first_name) VALUES (?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET username = excluded.username, first_name = excluded.first_name, last_active = CURRENT_TIMESTAMP
        `).bind(from.id, from.username || '', from.first_name || '').run();
    };

    try {
        if (update.message && update.message.text) {
            const msg = update.message;
            const chatId = msg.chat.id;
            const text = msg.text.trim();
            const userId = msg.from.id;
            const languageCode = msg.from.language_code;
            const strings = botStrings(languageCode);

            await upsertUser(msg.from);

            // Check if user is fully blocked
            const blockType = await isUserBlocked(env, userId);
            if (blockType === 'full') return new Response('OK', { status: 200 });

            let targetCommand = null;
            if (isBackWord(text)) {
                const session = await env.DB.prepare('SELECT command FROM sessions WHERE user_id = ?').bind(userId).first();
                if (session && session.command) {
                    const parentCmd = await env.DB.prepare('SELECT parent FROM commands WHERE command = ?').bind(session.command).first();
                    if (parentCmd && parentCmd.parent) targetCommand = parentCmd.parent;
                }
            } else {
                const allCmds = await env.DB.prepare('SELECT command, reply_keyboard_json FROM commands WHERE enabled = 1 AND show_reply_keyboard = 1').all();
                for (const row of allCmds.results) {
                    if (row.reply_keyboard_json) {
                        try {
                            const buttons = JSON.parse(row.reply_keyboard_json);
                            if (Array.isArray(buttons)) {
                                for (const btn of buttons) {
                                    if (btn.text === text) { targetCommand = btn.command; break; }
                                }
                            }
                        } catch (e) {}
                    }
                    if (targetCommand) break;
                }
                if (!targetCommand && text.startsWith('/')) {
                    const cmdRecord = await env.DB.prepare('SELECT command FROM commands WHERE command = ? AND enabled = 1').bind(text).first();
                    if (cmdRecord) targetCommand = cmdRecord.command;
                }
            }

            const aiSettings = await getAiSettingsFromDb(env);

            if (targetCommand) {
                const cmdRecord = await env.DB.prepare('SELECT * FROM commands WHERE command = ? AND enabled = 1').bind(targetCommand).first();
                if (cmdRecord) {
                    await executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env, languageCode);
                    if (aiSettings.ai_enabled === '1' && aiSettings.ai_trigger === 'all_messages' && blockType !== 'ai_only') {
                        await processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN, msg.chat.type, languageCode);
                    }
                    return new Response('OK', { status: 200 });
                }
            }

            if (text === '/start') {
                await sendDefaultStart(chatId, env, BOT_TOKEN, languageCode);
                if (aiSettings.ai_enabled === '1' && aiSettings.ai_trigger === 'all_messages' && blockType !== 'ai_only') {
                    await processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN, msg.chat.type, languageCode);
                }
                return new Response('OK', { status: 200 });
            }

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
                    const isPrivate = msg.chat.type === 'private';
                    const isGroup = msg.chat.type === 'group' || msg.chat.type === 'supergroup';
                    if (isPrivate && aiSettings.ai_private_reply === '0') shouldReply = false;
                    if (isGroup && aiSettings.ai_group_reply === '0') shouldReply = false;
                }

                // Group mention requirement
                if (shouldReply && (msg.chat.type === 'group' || msg.chat.type === 'supergroup')) {
                    if (aiSettings.ai_group_mention === '1') {
                        const botInfo = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`).then(r => r.json());
                        const botUsername = botInfo.ok ? botInfo.result.username : '';
                        if (!text.includes('@' + botUsername)) shouldReply = false;
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
            return new Response('OK', { status: 200 });
        }

        if (update.callback_query) {
            const cb = update.callback_query;
            const data = cb.data;
            const languageCode = cb.from.language_code;
            await upsertUser(cb.from);
            const cbBlockType = await isUserBlocked(env, cb.from.id);
            if (cbBlockType === 'full') {
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callback_query_id: cb.id })
                });
                return new Response('OK', { status: 200 });
            }
            if (data && data.startsWith('/')) {
                const cmdRecord = await env.DB.prepare('SELECT * FROM commands WHERE command = ? AND enabled = 1').bind(data).first();
                if (cmdRecord) {
                    await executeCommand(cb.message.chat.id, cb.from.id, cmdRecord, BOT_TOKEN, env, languageCode);
                }
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callback_query_id: cb.id })
                });
            } else if (data && cbBlockType !== 'ai_only') {
                const aiSettings = await getAiSettingsFromDb(env);
                await processAiReply(cb.message.chat.id, cb.from.id, data, aiSettings, env, BOT_TOKEN, cb.message.chat.type, languageCode);
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callback_query_id: cb.id })
                });
            }
        }
    } catch (err) {
        console.error('Webhook error:', err);
    }
    return new Response('OK', { status: 200 });
}

async function sendDefaultStart(chatId, env, BOT_TOKEN, languageCode) {
    const strings = botStrings(languageCode);
    let botName = 'Nyxx Bot';
    try {
        const stored = await getSetting(env.DB, 'bot_name');
        if (stored) botName = stored;
        else {
            const nameRes = await tgFetchJson(`https://api.telegram.org/bot${BOT_TOKEN}/getMyName`);
            if (nameRes.ok && nameRes.result.name) botName = nameRes.result.name;
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
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: strings.welcome(botName, dashboardUrl),
            parse_mode: 'HTML',
            reply_markup: keyboard
        })
    });
}

async function executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env, languageCode) {
    const strings = botStrings(languageCode);
    await env.DB.prepare(`
        INSERT INTO sessions (user_id, command, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id) DO UPDATE SET command = excluded.command, updated_at = CURRENT_TIMESTAMP
    `).bind(userId, cmdRecord.command).run();

    if (cmdRecord.is_admin_only) {
        const user = await env.DB.prepare('SELECT role FROM users WHERE id = ?').bind(userId).first();
        if (!user || user.role !== 'admin') {
            await sendMessage(chatId, strings.unauthorized, BOT_TOKEN, 'HTML');
            return;
        }
    }

    let replyMarkup = null;
    if (cmdRecord.buttons_json) {
        try { replyMarkup = JSON.parse(cmdRecord.buttons_json); } catch (e) {}
    }

    let keyboard = null;
    if (cmdRecord.show_reply_keyboard && cmdRecord.reply_keyboard_json) {
        try {
            const buttons = JSON.parse(cmdRecord.reply_keyboard_json);
            if (Array.isArray(buttons) && buttons.length > 0) {
                const rows = [];
                const rowSize = 3;
                for (let i = 0; i < buttons.length; i += rowSize) {
                    rows.push(buttons.slice(i, i + rowSize).map(b => ({ text: b.text })));
                }
                if (cmdRecord.parent) rows.push([{ text: strings.back }]);
                keyboard = rows;
            }
        } catch (e) {}
    }
    const replyKeyboardMarkup = keyboard ? { keyboard, resize_keyboard: true, one_time_keyboard: false } : undefined;

    if (cmdRecord.response_type === 'photo') {
        const photoPayload = { chat_id: chatId, photo: cmdRecord.media_url, caption: cmdRecord.content };
        if (replyMarkup) photoPayload.reply_markup = replyMarkup;
        if (replyKeyboardMarkup) photoPayload.reply_markup = replyKeyboardMarkup;
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(photoPayload)
        });
        return;
    }

    const payload = {
        chat_id: chatId,
        text: cmdRecord.content,
        parse_mode: 'HTML'
    };
    if (replyKeyboardMarkup) payload.reply_markup = replyKeyboardMarkup;
    else if (replyMarkup) payload.reply_markup = replyMarkup;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}

async function sendMessage(chatId, text, BOT_TOKEN, parseMode) {
    let finalText = text;
    if (parseMode === 'HTML') finalText = escapeTelegramHTML(text);
    const payload = { chat_id: chatId, text: finalText };
    if (parseMode) payload.parse_mode = parseMode;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
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
    try {
        // Typing indicator
        if (aiSettings.ai_typing_indicator === '1') {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendChatAction`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, action: 'typing' })
            });
        }

        // Rate limiting (per user per minute)
        const rateLimit = parseInt(aiSettings.ai_rate_limit) || 0;
        if (rateLimit > 0) {
            const minute = Math.floor(Date.now() / 60000);
            await env.DB.prepare('DELETE FROM ai_rate_limits WHERE minute < ?').bind(minute - 1440).run();
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

        let reply = null;
        let mainError = null;
        try {
            reply = await callAiCompletion(aiSettings, history, text, ctx, 'main');
        } catch (err) {
            mainError = err.message;
            // Optional single retry on the main provider
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

        if (memoryLimit > 0) {
            await saveAiMessage(env.DB, chatId, 'user', text);
            await saveAiMessage(env.DB, chatId, 'assistant', reply);
            await trimAiMessages(env.DB, chatId, memoryLimit);
        }

        // Artificial delay before replying
        const delay = parseInt(aiSettings.ai_response_delay) || 0;
        if (delay > 0) await new Promise(r => setTimeout(r, Math.min(delay, 5000)));

        if (aiSettings.ai_rtl_support === '1' && reply) {
            reply = addRtlMarkToPersian(reply);
        }

        await sendMessage(chatId, reply, BOT_TOKEN, 'HTML');

        // Suggested quick replies as one-time reply keyboard
        if (aiSettings.ai_suggested_questions_enabled === '1') {
            try {
                const questions = JSON.parse(aiSettings.ai_suggested_questions || '[]');
                if (Array.isArray(questions) && questions.length > 0) {
                    const rows = [];
                    for (let i = 0; i < questions.length; i += 3) {
                        rows.push(questions.slice(i, i + 3).map(q => ({ text: q.label })));
                    }
                    const replyKeyboard = { keyboard: rows, resize_keyboard: true, one_time_keyboard: true };
                    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            reply_markup: replyKeyboard,
                            parse_mode: 'HTML'
                        })
                    });
                }
            } catch (e) {}
        }
    } catch (err) {
        console.error('AI reply error:', err);
        const fallback = aiSettings.ai_fallback || 'Sorry, I am currently unavailable. Please try again later.';
        try {
            await sendMessage(chatId, fallback, BOT_TOKEN, 'HTML');
        } catch (e) {
            console.error('Fallback send failed:', e);
        }
    }
}
