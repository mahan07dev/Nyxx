/**
 * Nyxx – Full Telegram Bot Builder with ReplyKeyboard, Bot Info, and Photo
 * 
 * Instructions:
 * 1. Paste this entire script into your Cloudflare Worker.
 * 2. Deploy the Worker.
 * 3. Visit the Worker's URL to access the Nyxx Setup Wizard.
 * 4. Use the Deep-Link button to generate your token, paste it, and the system auto-discovers your configuration.
 * 
 * Built by @Mahan07dev
 * Website: https://mahanverse.ir
 * Nyxx version: 2.0.0
 */

// ============================================================================
// EMBEDDED DASHBOARD HTML (fully custom CSS, no Tailwind, no utility classes)
// ============================================================================
const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <link rel="shortcut icon" href="https://raw.githubusercontent.com/mahan07dev/Nyxx/refs/heads/main/logo.webp" type="image/x-icon">
    <title>Nyxx | Dashboard</title>
    <!-- Font Awesome 6.5.1 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        /* ----- RESET & BASE ----- */
        * { box-sizing: border-box; }
        body {
            margin: 0;
            background: #0f172a;
            color: #e2e8f0;
            font-family: system-ui, -apple-system, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        a { color: #60a5fa; text-decoration: none; }
        a:hover { text-decoration: underline; }

        /* ----- NAVBAR ----- */
        .navbar {
            background: #0f172a;
            border-bottom: 1px solid #334155;
            padding: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
            z-index: 40;
        }
        .navbar-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .navbar-title {
            font-size: 1.25rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #e2e8f0;
        }
        .navbar-title i { color: #60a5fa; }
        .navbar-actions {
            display: flex;
            align-items: flex-end;
            flex-direction: row;
            gap: 0.75rem;
        }
        .navbar-title .info-btn {
            background: transparent;
            border: 1px solid #334155;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            color: #94a3b8;
            cursor: pointer;
            transition: 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .navbar-title .info-btn:hover {
            background: #1e293b;
            color: #e2e8f0;
        }
        .status-items {
            display: flex;
            gap: 1rem;
            font-size: 0.875rem;
            color: #94a3b8;
            flex-direction: column;
        }
        .status-items i { margin-right: 0.25rem; }

        /* ----- MAIN CONTAINER & WIZARD ----- */
        .main-container {
            flex: 1;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            width: 100%;
        }
        .wizard {
            background: #1e293b;
            border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            padding: 1.5rem 2rem;
            border: 1px solid #334155;
            margin: 1.5rem 0;
        }

        /* ----- STEPS ----- */
        .step { display: block; }
        .step-hidden { display: none !important; }

        .step-title {
            font-size: 1.5rem;
            font-weight: 700;
            border-bottom: 1px solid #334155;
            padding-bottom: 0.5rem;
            margin-top: 0;
            margin-bottom: 1rem;
        }
        .step-subtitle {
            color: #94a3b8;
            margin-bottom: 1.5rem;
        }

        /* ----- FORM ELEMENTS ----- */
        .form-group { margin-bottom: 1rem; }
        .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.25rem;
        }
        .form-input {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 0.5rem 0.75rem;
            color: #f1f5f9;
            width: 100%;
            font-family: ui-monospace, monospace;
            font-size: 0.9rem;
        }
        .form-input:focus { border-color: #3b82f6; outline: none; }
        .form-select {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 0.5rem 0.75rem;
            color: #f1f5f9;
            width: 100%;
            font-size: 0.9rem;
        }
        .form-select:focus { border-color: #3b82f6; outline: none; }
        .form-textarea {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 0.5rem 0.75rem;
            color: #f1f5f9;
            width: 100%;
            font-family: system-ui, sans-serif;
            font-size: 0.9rem;
            height: 6rem;
            resize: vertical;
        }
        .form-textarea:focus { border-color: #3b82f6; outline: none; }
        .form-checkbox {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .form-checkbox input { margin: 0; }

        /* ----- BUTTONS ----- */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-weight: 700;
            padding: 0.5rem 1rem;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
            font-size: 1rem;
            min-height: 35px;
        }
        .btn-primary { background: #3b82f6; color: white; }
        .btn-primary:hover { background: #2563eb; }
        .btn-danger { background: #dc2626; color: white; }
        .btn-danger:hover { background: #b91c1c; }
        .btn-success { background: #22c55e; color: white; }
        .btn-success:hover { background: #16a34a; }
        .btn-gray { background: #334155; color: #e2e8f0; }
        .btn-gray:hover { background: #475569; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-sm { padding: 0.25rem 0.75rem; font-size: 0.875rem; border-radius: 8px; }
        .btn-block { width: 100%; }

        /* ----- TABS ----- */
        .tabs-header {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            border-bottom: 1px solid #334155;
            margin-bottom: 1.5rem;
        }
        .tab-btn {
            padding: 0.5rem 1rem;
            border-bottom: 2px solid transparent;
            color: #94a3b8;
            background: transparent;
            border-top: none;
            border-left: none;
            border-right: none;
            cursor: pointer;
            font-weight: 500;
            font-size: 1rem;
            transition: color 0.2s, border-color 0.2s;
        }
        .tab-btn:hover { color: #e2e8f0; }
        .tab-btn.active {
            border-bottom-color: #60a5fa;
            color: white;
        }
        .tab-content { display: none; }
        .tab-content.active { display: block; }

        /* ----- HAMBURGER & MOBILE TABS ----- */
        .hamburger {
            display: none;
            cursor: pointer;
            padding: 0.5rem;
            font-size: 1.5rem;
            color: #e2e8f0;
            user-select: none;
        }
        .mobile-tabs {
            display: block;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-height 0.35s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 0 0.5rem;
            margin-top: 0;
        }
        .mobile-tabs.open {
            max-height: 500px;
            opacity: 1;
            padding: 0.5rem;
            margin-top: 0.5rem;
        }
        .mobile-tabs button {
            background: transparent;
            border: none;
            color: #cbd5e1;
            padding: 0.625rem 0.75rem;
            text-align: left;
            border-radius: 8px;
            font-size: 0.9rem;
            width: 100%;
            cursor: pointer;
        }
        .mobile-tabs button:hover { background: #334155; }
        .mobile-tabs button.active { background: #334155; color: white; }

        @media (max-width: 768px) {
            .tabs-header { display: none; }
            .hamburger { display: block; }
        }

        /* ----- COMMAND ROWS (file‑manager style) ----- */
        .tree-row {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.375rem 0.5rem;
            border-radius: 8px;
            transition: background 0.15s;
            cursor: default;
            overflow-x: auto;
        }
        .tree-row:hover { background: #1e293b; }
        .tree-command-name {
            font-family: ui-monospace, monospace;
            font-weight: 600;
            color: #60a5fa;
        }
        .tree-command-name.folder {
            cursor: pointer;
        }
        .tree-command-name.folder:hover {
            text-decoration: underline;
        }
        .tree-actions {
            margin-left: auto;
            display: flex;
            gap: 0.375rem;
        }
        .tree-actions button {
            background: transparent;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            padding: 0.125rem 0.375rem;
            border-radius: 4px;
            font-size: 0.85rem;
        }
        .tree-actions button:hover { background: #334155; color: white; }
        .tree-actions .edit-btn:hover { color: #60a5fa; }
        .tree-actions .delete-btn:hover { color: #f87171; }
        .tree-actions .add-child-btn:hover { color: #4ade80; }

        /* ----- BADGES ----- */
        .badge {
            display: inline-block;
            font-size: 0.6875rem;
            font-weight: 500;
            padding: 0 0.625rem;
            border-radius: 12px;
            line-height: 1.25rem;
        }
        .badge-admin { background: #1e3a5f; color: #93c5fd; }
        .badge-enabled { background: #14532d; color: #86efac; }
        .badge-disabled { background: #451a1a; color: #fca5a5; }
        .badge-reply { background: #3b0764; color: #c4b5fd; }
        .badge-gray { background: #334155; color: #94a3b8; }

        /* ----- BREADCRUMB ----- */
        .breadcrumb-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: #0f172a;
            padding: 0.5rem;
            border-radius: 8px;
            border: 1px solid #334155;
            margin-bottom: 1rem;
        }
        .breadcrumb-sep { color: #475569; }
        .breadcrumb-link {
            color: #60a5fa;
            cursor: pointer;
        }
        .breadcrumb-link:hover { text-decoration: underline; }
        .breadcrumb-current {
            color: #e2e8f0;
        }

        /* ----- TOGGLE SWITCH ----- */
        .toggle {
            position: relative;
            width: 40px;
            height: 22px;
            background: #475569;
            border-radius: 11px;
            cursor: pointer;
            transition: background 0.3s;
            display: inline-block;
            flex-shrink: 0;
        }
        .toggle.active { background: #3b82f6; }
        .toggle .slider {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 18px;
            height: 18px;
            background: white;
            border-radius: 50%;
            transition: transform 0.3s;
        }
        .toggle.active .slider { transform: translateX(18px); }

        /* ----- MODAL ----- */
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            padding: 1rem;
        }
        .modal-overlay.hidden { display: none; }
        .modal-box {
            background: #1e293b;
            border-radius: 16px;
            padding: 1.5rem;
            max-width: 672px;
            width: 100%;
            border: 1px solid #334155;
            max-height: 90vh;
            overflow-y: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .modal-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 1rem;
        }
        .modal-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1.5rem;
        }
        .modal-error {
            color: #f87171;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: none;
        }
        .modal-error.show { display: block; }

        /* ----- TOAST ----- */
        .toast-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            max-width: 90%;
        }
        .toast {
            background: #1e293b;
            border: 1px solid #334155;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            color: #f1f5f9;
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
        }
        .toast.success { border-left: 4px solid #22c55e; }
        .toast.error { border-left: 4px solid #ef4444; }

        /* ----- LOG CONTAINER ----- */
        .log-container {
            background: #0f172a;
            color: #4ade80;
            font-family: ui-monospace, monospace;
            font-size: 0.75rem;
            padding: 0.75rem;
            border-radius: 8px;
            border: 1px solid #334155;
            white-space: pre-wrap;
            word-break: break-word;
            max-height: 200px;
            overflow-y: auto;
            margin-top: 0.5rem;
        }

        /* ----- SPINNER ----- */
        .spinner {
            border: 3px solid rgba(255,255,255,0.15);
            border-radius: 50%;
            border-top: 3px solid #3b82f6;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
            display: inline-block;
            vertical-align: middle;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* ----- FOOTER ----- */
        .footer {
            text-align: center;
            padding: 1.25rem 0 0.625rem;
            border-top: 1px solid #334155;
            margin-top: 2rem;
            font-size: 0.875rem;
            color: #94a3b8;
        }
        .footer .brand { font-weight: 600; color: #60a5fa; }
        .footer a {
            color: #94a3b8;
            margin: 0 0.5rem;
            transition: color 0.2s;
        }
        .footer a:hover { color: #e2e8f0; }

        /* ----- PANEL / CARD ----- */
        .panel {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 1.5rem;
        }
        .panel-dark {
            background: #0f172a;
            border-color: #334155;
        }
        .panel-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        /* ----- UTILITY HELPERS (structural only) ----- */
        .hidden { display: none !important; }
        .block { display: block; }
        .text-center { text-align: center; }
        .w-full { width: 100%; }
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-4 { margin-top: 1rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .p-1 { padding: 0.25rem; }
        .p-2 { padding: 0.5rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .gap-1 { gap: 0.25rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .flex-wrap { flex-wrap: wrap; }
        .border-b { border-bottom: 1px solid #334155; }
        .border-t { border-top: 1px solid #334155; }
        .rounded { border-radius: 8px; }
        .rounded-xl { border-radius: 12px; }

        /* width */
        ::-webkit-scrollbar {
            width: 10px;
        }
        /* Track */
        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey; 
            border-radius: 10px;
        }
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #0085f1;
            border-radius: 10px;
        }
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #b30000;
        }
    </style>
</head>
<body>
    <!-- NAVBAR -->
    <nav class="navbar">
        <div class="navbar-inner">
            <h1 class="navbar-title"><img src="https://raw.githubusercontent.com/mahan07dev/Nyxx/refs/heads/main/logo.webp" alt="Logo" height="50px"> Nyxx                 <button class="info-btn" onclick="showInfoModal()" title="About Nyxx"><i class="fa-solid fa-question"></i></button></h1>
            <div class="navbar-actions">
                <div class="status-items">
                    <span id="status-d1"><i class="fa-solid fa-database"></i> D1: Unbound</span>
                    <span id="status-tg"><i class="fa-brands fa-telegram"></i> Bot: Unlinked</span>
                </div>
            </div>
        </div>
    </nav>

    <!-- MAIN CONTENT -->
    <main class="main-container">
        <div class="wizard">
            <!-- STEP 0: Copyright Splash -->
            <div id="step-0" class="step">
                <h2 class="step-title">Welcome to Nyxx</h2>
                <div class="panel" style="text-align:center; padding:2rem; margin-bottom:1.5rem;">
                    <img src="https://raw.githubusercontent.com/mahan07dev/Nyxx/refs/heads/main/logo.webp" alt="Logo" height="100px">
                    <p style="font-size:1.25rem; font-weight:600; margin:1rem 0 0.5rem;">Nyxx – Telegram Bot Builder</p>
                    <p style="color:#94a3b8;">Built with ❤️ by <strong style="color:#e2e8f0;">@Mahan07dev</strong></p>
                    <p style="color:#64748b; font-size:0.875rem; max-width:400px; margin:0.5rem auto;">
                        This open‑source tool lets you create and manage your Telegram bot with ease.
                        Follow the steps below to get started.
                    </p>
                    <div style="display:flex; gap:0.5rem; justify-content:center; margin-top:1rem;">
                        <a href="https://github.com/Mahan07dev" target="_blank" class="btn btn-gray btn-sm"><i class="fa-brands fa-github"></i> GitHub</a>
                        <a href="https://t.me/Mahan07dev" target="_blank" class="btn btn-gray btn-sm"><i class="fa-brands fa-telegram"></i> Telegram</a>
                    </div>
                    <p style="color:#475569; font-size:0.75rem; margin-top:1rem;">Nyxx v2.0.0</p>
                </div>
                <button onclick="goToStep1()" class="btn btn-primary btn-block"><i class="fa-solid fa-arrow-right"></i> Next – Connect to Cloudflare</button>
            </div>

            <!-- STEP 1 -->
            <div id="step-1" class="step step-hidden">
                <h2 class="step-title">Step 1: Connect to Cloudflare</h2>
                <p class="step-subtitle">We need permission to create a database and link it to this worker. Click the button below to generate a special token, then paste it here.</p>
                <div class="form-group">
                    <label class="form-label">1. Get Your Token</label>
                    <button onclick="openTokenPage()" class="btn btn-gray btn-block">
                        <i class="fa-solid fa-key" style="color:#facc15;"></i> Create Token (opens Cloudflare)
                    </button>
                    <p class="text-sm" style="color:#64748b; margin-top:0.25rem;">The token will have the exact permissions needed – just copy it after creation.</p>
                </div>
                <div class="form-group">
                    <label class="form-label">2. Paste Your API Token</label>
                    <input type="password" id="cf-token" oninput="handleTokenInput()" class="form-input" placeholder="Paste the token here">
                </div>
                <div id="discovery-loading" class="hidden" style="display:flex; align-items:center; gap:0.5rem; padding:0.25rem 0; color:#94a3b8; font-size:0.875rem;">
                    <span class="spinner"></span> Checking token and finding your account...
                </div>
                <div id="auto-fields" class="hidden panel panel-dark" style="margin-top:1rem;">
                    <div style="font-size:0.75rem; font-weight:700; color:#60a5fa; text-transform:uppercase; letter-spacing:0.05em;">✅ We found your Cloudflare details</div>
                    <div style="margin-top:0.5rem;">
                        <label style="font-size:0.75rem; color:#94a3b8; display:block; margin-bottom:0.25rem;">Account ID</label>
                        <input type="text" id="cf-account-id" class="form-input" style="background:#1e293b; border-color:#334155; color:#cbd5e1; font-family:monospace;" readonly>
                    </div>
                    <div style="margin-top:0.5rem;">
                        <label style="font-size:0.75rem; color:#94a3b8; display:block; margin-bottom:0.25rem;">Worker Script Name</label>
                        <input type="text" id="cf-script-name" class="form-input" style="background:#1e293b; border-color:#334155; color:#cbd5e1; font-family:monospace;" readonly>
                    </div>
                </div>
                <button onclick="runSetup()" id="btn-setup" disabled class="btn btn-gray btn-block">🚀 Provision Database & Link Worker</button>
                <div id="setup-logs" class="log-container hidden"></div>
            </div>

            <!-- STEP 2 -->
            <div id="step-2" class="step step-hidden">
                <h2 class="step-title">Step 2: Connect Your Telegram Bot</h2>
                <p class="step-subtitle">Paste the token you got from <a href="https://t.me/botfather" target="_blank">@BotFather</a>. We'll set up the webhook automatically.</p>
                <div class="form-group">
                    <label class="form-label">Bot Token</label>
                    <input type="password" id="tg-token" class="form-input" placeholder="123456789:ABCdefGHIjklMNOpqrSTUvwxyz">
                </div>
                <button onclick="saveTelegramConfig()" id="btn-tg" class="btn btn-primary btn-block">Connect Bot & Set Webhook</button>
                <div id="tg-logs" class="log-container hidden"></div>
            </div>

            <!-- STEP 3: DASHBOARD -->
            <div id="step-3" class="step step-hidden">
                <!-- Desktop Tabs -->
                <div class="tabs-header">
                    <button class="tab-btn active" onclick="switchTab('commands')"><i class="fa-solid fa-list-ul"></i> Commands</button>
                    <button class="tab-btn" onclick="switchTab('menu')"><i class="fa-solid fa-bars"></i> Menu</button>
                    <button class="tab-btn" onclick="switchTab('users')"><i class="fa-solid fa-users"></i> Users</button>
                    <button class="tab-btn" onclick="switchTab('settings')"><i class="fa-solid fa-gear"></i> Settings</button>
                    <button class="tab-btn" onclick="switchTab('botinfo')"><i class="fa-solid fa-circle-info"></i> Bot Info</button>
                </div>
                <!-- Hamburger (mobile) -->
                <div class="hamburger" onclick="toggleHamburger()"><i class="fa-solid fa-bars"></i></div>
                <div id="mobile-tabs" class="mobile-tabs">
                    <button class="active" onclick="switchTab('commands');"><i class="fa-solid fa-list-ul"></i> Commands</button>
                    <button onclick="switchTab('menu');"><i class="fa-solid fa-bars"></i> Menu</button>
                    <button onclick="switchTab('users');"><i class="fa-solid fa-users"></i> Users</button>
                    <button onclick="switchTab('settings');"><i class="fa-solid fa-gear"></i> Settings</button>
                    <button onclick="switchTab('botinfo');"><i class="fa-solid fa-circle-info"></i> Bot Info</button>
                </div>

                <!-- COMMANDS TAB -->
                <div id="tab-commands" class="tab-content active">
                    <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
                        <h3 class="panel-title" style="margin-bottom:0;">Commands</h3>
                        <button onclick="showAddCommandModal()" class="btn btn-success btn-sm"><i class="fa-solid fa-plus"></i> Add Command</button>
                    </div>
                    <div class="breadcrumb-container">
                        <span style="font-size:0.875rem; color:#94a3b8;"><i class="fa-regular fa-folder-open"></i></span>
                        <span id="breadcrumb" style="display:flex; gap:0.25rem; align-items:center; font-size:0.875rem; overflow-x: auto;"></span>
                        <button onclick="navigateUp()" id="btn-up" class="btn btn-gray btn-sm" style="margin-left:auto;"><i class="fa-solid fa-arrow-up"></i> ..</button>
                    </div>
                    <div id="commands-list" class="flex flex-col gap-1"></div>
                </div>

                <!-- MENU TAB -->
                <div id="tab-menu" class="tab-content">
                    <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
                        <h3 class="panel-title" style="margin-bottom:0;">Telegram Menu Commands</h3>
                        <button onclick="addMenuCommandRow()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> Add Entry</button>
                    </div>
                    <p style="color:#94a3b8; font-size:0.875rem; margin-bottom:1rem;">These commands appear in the bot's menu (when users type <span style="font-family:monospace; color:#cbd5e1;">/</span>).</p>
                    <div id="menu-commands-container" class="panel" style="display:flex; flex-direction:column; gap:0.5rem;"></div>
                    <button onclick="publishMenuCommands()" class="btn btn-success" style="margin-top:1rem;"><i class="fa-solid fa-cloud-arrow-up"></i> Publish to Telegram</button>
                    <div id="menu-publish-result" class="hidden" style="margin-top:0.5rem; font-size:0.875rem;"></div>
                </div>

                <!-- USERS TAB -->
                <div id="tab-users" class="tab-content">
                    <h3 class="panel-title">Users Who Have Interacted</h3>
                    <div class="flex gap-2" style="margin-bottom:1rem;">
                        <input id="user-search" placeholder="Search by username or name..." class="form-input">
                    </div>
                    <div id="users-list" class="panel"></div>
                </div>

                <!-- SETTINGS TAB -->
                <div id="tab-settings" class="tab-content">
                    <h3 class="panel-title">Bot Settings</h3>
                    <div class="panel" style="display:flex; flex-direction:column; gap:1.5rem;">
                        <div>
                            <label class="form-label">Bot Token</label>
                            <div class="flex gap-2">
                                <input type="password" id="settings-bot-token" class="form-input" style="background:#1e293b; border-color:#475569; color:#e2e8f0; font-family:monospace;" readonly>
                                <button onclick="toggleTokenVisibility()" class="btn btn-gray btn-sm"><i class="fa-regular fa-eye"></i></button>
                            </div>
                            <button onclick="showChangeTokenModal()" class="btn btn-primary btn-sm" style="margin-top:0.5rem;">Change Bot Token</button>
                        </div>
                        <div>
                            <label class="form-label">Webhook URL</label>
                            <input type="text" id="settings-webhook-url" class="form-input" style="background:#1e293b; border-color:#475569; color:#94a3b8;" readonly>
                            <button onclick="testWebhook()" class="btn btn-gray btn-sm" style="margin-top:0.5rem;">Test Webhook</button>
                        </div>
                        <div class="border-t" style="padding-top:1rem;">
                            <button onclick="factoryReset()" class="btn btn-danger"><i class="fa-solid fa-arrow-rotate-left"></i> Factory Reset – Delete All Data</button>
                            <p style="color:#f87171; font-size:0.75rem; margin-top:0.5rem;">Erases all commands, users, settings, and bot info. The bot will be disconnected.</p>
                        </div>
                    </div>
                </div>

                <!-- BOT INFO TAB -->
                <div id="tab-botinfo" class="tab-content">
                    <h3 class="panel-title">Bot Information</h3>
                    <div class="panel" style="display:flex; flex-direction:column; gap:1rem;">
                        <div>
                            <label class="form-label">Bot Name</label>
                            <input id="bot-name" class="form-input" placeholder="My Awesome Bot">
                        </div>
                        <div>
                            <label class="form-label">Description (appears in bot profile)</label>
                            <textarea id="bot-description" class="form-textarea" placeholder="What your bot does..."></textarea>
                        </div>
                        <div>
                            <label class="form-label">Short Description (appears when sharing)</label>
                            <input id="bot-short-description" class="form-input" placeholder="Short summary...">
                        </div>
                        <div>
                            <label class="form-label">Bot Photo (public image URL)</label>
                            <div class="flex gap-2 flex-wrap">
                                <input id="bot-photo-url" class="form-input" style="flex:1;" placeholder="https://example.com/photo.jpg">
                                <button onclick="setBotPhoto()" class="btn btn-primary btn-sm"><i class="fa-regular fa-image"></i> Set Photo</button>
                                <button onclick="deleteBotPhoto()" class="btn btn-danger btn-sm"><i class="fa-regular fa-trash-can"></i> Delete Photo</button>
                            </div>
                            <p style="color:#94a3b8; font-size:0.75rem; margin-top:0.25rem;">Image must be publicly accessible and at least 100x100px. Telegram will fetch it from the URL.</p>
                        </div>
                        <div class="flex gap-2 flex-wrap">
                            <button onclick="loadBotInfo()" class="btn btn-gray"><i class="fa-solid fa-download"></i> Load from Telegram</button>
                            <button onclick="publishBotInfo()" class="btn btn-success"><i class="fa-solid fa-cloud-arrow-up"></i> Publish Info</button>
                        </div>
                        <div id="bot-info-result" class="hidden" style="font-size:0.875rem;"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- FOOTER -->
    <footer class="footer">
        <div>
            Built with ❤️ by <span class="brand">@Mahan07dev</span>
            <br><br>
            <a href="https://github.com/Mahan07dev" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>
            <a href="https://t.me/Mahan07dev" target="_blank"><i class="fa-brands fa-telegram"></i> Telegram</a>
            <span style="margin:0 0.5rem;">|</span>
            <span style="color:#475569;">v2.0.0</span>
            <br><br>
        </div>
    </footer>

    <!-- COMMAND MODAL -->
    <div id="command-modal" class="modal-overlay hidden">
        <div class="modal-box">
            <h3 class="modal-title" id="command-modal-title">Add Command</h3>
            <div class="flex flex-col gap-4" style="overflow:auto;padding-right: 20px;">
                <div>
                    <label class="form-label">Command (e.g. <span class="font-mono">/start</span>)</label>
                    <input id="modal-command" class="form-input" placeholder="/command">
                </div>
                <div>
                    <label class="form-label">Parent (optional)</label>
                    <select id="modal-parent" class="form-select"><option value="">None (Root)</option></select>
                </div>
                <div>
                    <label class="form-label">Response Type</label>
                    <select id="modal-type" class="form-select">
                        <option value="text">Text</option>
                        <option value="photo">Photo</option>
                    </select>
                </div>
                <div>
                    <label class="form-label">Response Content</label>
                    <textarea id="modal-content" class="form-textarea" placeholder="What the bot replies..."></textarea>
                    <p style="color:#94a3b8; font-size:0.75rem; margin-top:0.25rem;">Supports HTML: <span class="font-mono">&lt;b&gt;bold&lt;/b&gt;</span>, <span class="font-mono">&lt;a href="..."&gt;link&lt;/a&gt;</span></p>
                </div>
                <div id="media-field">
                    <label class="form-label">Photo URL</label>
                    <input id="modal-media" class="form-input" placeholder="https://example.com/image.jpg">
                </div>

                <!-- Inline Keyboard -->
                <div>
                    <label class="form-label" style="margin-bottom:0.5rem;">Inline Buttons (optional)</label>
                    <div id="inline-buttons-list" class="flex flex-wrap gap-1" style="margin-bottom:0.5rem;"></div>
                    <div class="flex gap-2 items-center flex-wrap">
                        <input id="inline-btn-label" placeholder="Label" class="form-input" style="flex:1; min-width:80px; font-size:0.875rem;">
                        <select id="inline-btn-type" class="form-select" style="font-size:0.875rem;">
                            <option value="url">URL</option>
                            <option value="callback">Callback Data</option>
                            <option value="command">Command</option>
                        </select>
                        <input id="inline-btn-value" placeholder="Value" class="form-input" style="flex:1; min-width:120px; font-size:0.875rem;">
                        <select id="inline-btn-command-select" class="form-select hidden" style="font-size:0.875rem;"><option value="">Select command...</option></select>
                        <button onclick="addInlineButton()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>

                <!-- Reply Keyboard -->
                <div class="border-t" style="padding-top:1rem;">
                    <div class="flex items-center gap-3" style="margin-bottom:0.75rem;">
                        <label style="font-size:0.875rem; font-weight:500;">Show Reply Keyboard</label>
                        <div id="reply-toggle" class="toggle" onclick="toggleReplyKeyboard()"><div class="slider"></div></div>
                    </div>
                    <div id="reply-keyboard-section" class="hidden flex flex-col gap-2">
                        <div id="reply-buttons-list" class="flex flex-wrap gap-1" style="margin-bottom:0.5rem;"></div>
                        <div class="flex gap-2 items-center flex-wrap">
                            <input id="reply-btn-label" placeholder="Display Text" class="form-input" style="min-width:80px; font-size:0.875rem;">
                            <select id="reply-btn-command" class="form-select" style="flex:1; min-width:120px; font-size:0.875rem;"><option value="">Select command...</option></select>
                            <button onclick="addReplyButton()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <p style="color:#94a3b8; font-size:0.75rem;">If this command has a parent, a <b>Back</b> button will appear automatically.</p>
                    </div>
                </div>

                <div class="form-checkbox">
                    <input type="checkbox" id="modal-admin-only">
                    <label style="font-size:0.875rem;">Admin only</label>
                </div>
                <div class="form-checkbox">
                    <input type="checkbox" id="modal-enabled" checked>
                    <label style="font-size:0.875rem;">Enabled</label>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="closeCommandModal()" class="btn btn-gray">Cancel</button>
                <button onclick="saveCommand()" id="modal-save-btn" class="btn btn-primary">Save</button>
            </div>
            <div id="modal-error" class="modal-error"></div>
        </div>
    </div>

    <!-- TOKEN MODAL -->
    <div id="token-modal" class="modal-overlay hidden">
        <div class="modal-box">
            <h3 class="modal-title">Change Bot Token</h3>
            <div class="flex flex-col gap-4">
                <div>
                    <label class="form-label">New Bot Token</label>
                    <input type="password" id="new-token-input" class="form-input" placeholder="123456789:ABCdefGHIjklMNOpqrSTUvwxyz">
                </div>
                <div id="token-test-result" class="hidden" style="font-size:0.875rem;"></div>
            </div>
            <div class="modal-actions">
                <button onclick="closeTokenModal()" class="btn btn-gray">Cancel</button>
                <button onclick="updateBotToken()" class="btn btn-primary">Update</button>
            </div>
        </div>
    </div>

    <!-- INFO MODAL -->
    <div id="info-modal" class="modal-overlay hidden">
        <div class="modal-box">
            <h3 class="modal-title"><i class="fa-solid fa-circle-info" style="color:#60a5fa;"></i> About Nyxx</h3>
            <div style="text-align:center; padding:0.5rem 0;">
                <p style="font-size:1.25rem; font-weight:700;">Nyxx v2.0.0</p>
                <p style="color:#94a3b8; margin:0.5rem 0;">
                    A powerful Telegram bot builder for Cloudflare Workers.
                </p>
                <div style="display:flex; justify-content:center; gap:1rem; margin:1rem 0; flex-wrap:wrap;">
                    <a href="https://github.com/Mahan07dev" target="_blank" class="btn btn-gray btn-sm"><i class="fa-brands fa-github"></i> GitHub</a>
                    <a href="https://t.me/Mahan07dev" target="_blank" class="btn btn-gray btn-sm"><i class="fa-brands fa-telegram"></i> Telegram</a>
                    <a href="https://mahanverse.ir" target="_blank" class="btn btn-gray btn-sm"><i class="fa-solid fa-globe"></i> Website</a>
                </div>
                <hr style="border-color:#334155; margin:1rem 0;">
                <p style="color:#64748b; font-size:0.875rem;">
                    Built with ❤️ by <strong style="color:#e2e8f0;">@Mahan07dev</strong><br>
                    This project is open‑source and available on <a href="https://github.com/Mahan07dev/nyxx" target="_blank">GitHub</a>.
                </p>
                <p style="color:#475569; font-size:0.75rem; margin-top:0.5rem;">
                    © 2026 Mahan07dev. All rights reserved.
                </p>
            </div>
            <div class="modal-actions">
                <button onclick="document.getElementById('info-modal').classList.add('hidden')" class="btn btn-primary">Close</button>
            </div>
        </div>
    </div>

    <!-- TOAST CONTAINER -->
    <div id="toast-container" class="toast-container"></div>

    <script>
        // ============================
        // UTILITY
        // ============================
        function showToast(message, type) {
            type = type || 'success';
            var container = document.getElementById('toast-container');
            var toast = document.createElement('div');
            toast.className = 'toast ' + type;
            toast.innerText = message;
            container.appendChild(toast);
            setTimeout(function() { toast.remove(); }, 5000);
        }

        // ============================
        // INFO MODAL
        // ============================
        function showInfoModal() {
            document.getElementById('info-modal').classList.remove('hidden');
        }

        // ============================
        // STEP NAVIGATION
        // ============================
        function goToStep1() {
            document.getElementById('step-0').classList.add('step-hidden');
            document.getElementById('step-1').classList.remove('step-hidden');
        }

        // ============================
        // HAMBURGER
        // ============================
        function toggleHamburger() {
            var menu = document.getElementById('mobile-tabs');
            menu.classList.toggle('open');
        }

        // ============================
        // TAB SWITCHING
        // ============================
        function switchTab(tabId) {
            var contents = document.querySelectorAll('.tab-content');
            for (var i = 0; i < contents.length; i++) contents[i].classList.remove('active');
            document.getElementById('tab-' + tabId).classList.add('active');

            var desktopBtns = document.querySelectorAll('.tabs-header .tab-btn');
            for (var j = 0; j < desktopBtns.length; j++) {
                desktopBtns[j].classList.remove('active');
            }
            var map = { 'commands': 0, 'menu': 1, 'users': 2, 'settings': 3, 'botinfo': 4 };
            if (map[tabId] !== undefined) {
                desktopBtns[map[tabId]].classList.add('active');
            }

            var mobileBtns = document.querySelectorAll('#mobile-tabs button');
            for (var k = 0; k < mobileBtns.length; k++) {
                mobileBtns[k].classList.remove('active');
            }
            var mobileMap = { 'commands': 0, 'menu': 1, 'users': 2, 'settings': 3, 'botinfo': 4 };
            if (mobileMap[tabId] !== undefined) {
                mobileBtns[mobileMap[tabId]].classList.add('active');
            }

            if (tabId === 'commands') loadCommands();
            if (tabId === 'menu') loadMenuCommands();
            if (tabId === 'users') loadUsers();
            if (tabId === 'settings') loadSettings();
            if (tabId === 'botinfo') loadBotInfo();

            var menu = document.getElementById('mobile-tabs');
            if (menu.classList.contains('open')) {
                menu.classList.remove('open');
            }
        }

        // ============================
        // COMMANDS – File‑Manager UI
        // ============================
        var editingCommand = null;
        var commandsCache = [];
        var inlineButtonsArray = [];
        var replyButtonsArray = [];
        var showReplyKeyboard = false;

        // Navigation state
        var currentParent = null;          // command name or null for root
        var pathSegments = [];             // array of command names
        var childrenMap = {};              // parent -> array of commands

        function toggleReplyKeyboard() {
            showReplyKeyboard = !showReplyKeyboard;
            document.getElementById('reply-toggle').classList.toggle('active', showReplyKeyboard);
            document.getElementById('reply-keyboard-section').classList.toggle('hidden', !showReplyKeyboard);
        }

        function populateDropdowns() {
            var parentSelect = document.getElementById('modal-parent');
            var currentCommand = document.getElementById('modal-command').value.trim();
            parentSelect.innerHTML = '<option value="">None (Root)</option>';
            for (var i = 0; i < commandsCache.length; i++) {
                var cmd = commandsCache[i];
                if (cmd.command !== currentCommand) {
                    var opt = document.createElement('option');
                    opt.value = cmd.command;
                    opt.textContent = cmd.command;
                    parentSelect.appendChild(opt);
                }
            }
            if (editingCommand && editingCommand.parent) parentSelect.value = editingCommand.parent;
            // If not editing and we are in a folder, default to current parent
            if (!editingCommand && currentParent !== null) {
                parentSelect.value = currentParent;
            }

            var selects = ['inline-btn-command-select', 'reply-btn-command'];
            for (var s = 0; s < selects.length; s++) {
                var sel = document.getElementById(selects[s]);
                sel.innerHTML = '<option value="">Select command...</option>';
                for (var j = 0; j < commandsCache.length; j++) {
                    var cmd2 = commandsCache[j];
                    if (cmd2.command !== currentCommand) {
                        var opt2 = document.createElement('option');
                        opt2.value = cmd2.command;
                        opt2.textContent = cmd2.command;
                        sel.appendChild(opt2);
                    }
                }
            }
        }

        function renderInlineChips() {
            var container = document.getElementById('inline-buttons-list');
            if (inlineButtonsArray.length === 0) {
                container.innerHTML = '<span style="font-size:0.75rem; color:#64748b;">No inline buttons.</span>';
                return;
            }
            var html = '';
            for (var i = 0; i < inlineButtonsArray.length; i++) {
                var b = inlineButtonsArray[i];
                var icon = b.type === 'url' ? 'fa-link' : (b.type === 'command' ? 'fa-command' : 'fa-message');
                html += '<span class="button-chip" draggable="true" data-index="' + i + '" data-type="inline">' +
                    '<i class="fa-solid fa-grip-lines" style="cursor:grab;margin-right:6px;"></i>' +
                    '<i class="fa-solid ' + icon + '"></i>' + b.text + ' <span style="color:#64748b; font-size:0.75rem;">(' + b.type + ')</span> ' +
                    '<button onclick="removeInlineButton(' + i + ')" style="color:#f87171; background:none; border:none; cursor:pointer; margin-left:4px;"><i class="fa-regular fa-circle-xmark"></i></button>' +
                    '</span>';
            }
            container.innerHTML = html;
            attachDragEvents(container);
        }

        function addInlineButton() {
            var text = document.getElementById('inline-btn-label').value.trim();
            var type = document.getElementById('inline-btn-type').value;
            var value = document.getElementById('inline-btn-value').value.trim();
            if (type === 'command') value = document.getElementById('inline-btn-command-select').value;
            if (!text || !value) { showToast('Fill both fields.', 'error'); return; }
            inlineButtonsArray.push({ text: text, type: type, value: value });
            renderInlineChips();
            document.getElementById('inline-btn-label').value = '';
            document.getElementById('inline-btn-value').value = '';
            document.getElementById('inline-btn-command-select').value = '';
        }
        function removeInlineButton(index) { inlineButtonsArray.splice(index, 1); renderInlineChips(); }
        function getInlineButtonsJSON() {
            if (inlineButtonsArray.length === 0) return '';
            var rows = [];
            for (var i = 0; i < inlineButtonsArray.length; i += 3) {
                var row = inlineButtonsArray.slice(i, i + 3).map(function(b) {
                    var btn = { text: b.text };
                    if (b.type === 'url') btn.url = b.value;
                    else btn.callback_data = b.value;
                    return btn;
                });
                rows.push(row);
            }
            return JSON.stringify({ inline_keyboard: rows });
        }
        function loadInlineButtonsFromJSON(json) {
            inlineButtonsArray = [];
            if (!json) return;
            try {
                var obj = JSON.parse(json);
                if (obj.inline_keyboard) {
                    for (var r = 0; r < obj.inline_keyboard.length; r++) {
                        var row = obj.inline_keyboard[r];
                        for (var c = 0; c < row.length; c++) {
                            var btn = row[c];
                            var type = btn.url ? 'url' : 'callback';
                            var value = btn.url || btn.callback_data || '';
                            inlineButtonsArray.push({ text: btn.text, type: type, value: value });
                        }
                    }
                }
            } catch(e) {}
            renderInlineChips();
        }

        function renderReplyChips() {
            var container = document.getElementById('reply-buttons-list');
            if (replyButtonsArray.length === 0) {
                container.innerHTML = '<span style="font-size:0.75rem; color:#64748b;">No reply buttons.</span>';
                return;
            }
            var html = '';
            for (var i = 0; i < replyButtonsArray.length; i++) {
                var b = replyButtonsArray[i];
                html += '<span class="button-chip" draggable="true" data-index="' + i + '" data-type="reply">' +
                    '<i class="fa-solid fa-grip-lines" style="cursor:grab;margin-right:6px;"></i>' +
                    '<i class="fa-regular fa-keyboard"></i>' + b.text + ' → ' + b.command +
                    '<button onclick="removeReplyButton(' + i + ')" style="color:#f87171; background:none; border:none; cursor:pointer; margin-left:4px;"><i class="fa-regular fa-circle-xmark"></i></button>' +
                    '</span>';
            }
            container.innerHTML = html;
            attachDragEvents(container);
        }

        function addReplyButton() {
            var text = document.getElementById('reply-btn-label').value.trim();
            var command = document.getElementById('reply-btn-command').value;
            if (!text || !command) { showToast('Fill both fields.', 'error'); return; }
            replyButtonsArray.push({ text: text, command: command });
            renderReplyChips();
            document.getElementById('reply-btn-label').value = '';
            document.getElementById('reply-btn-command').value = '';
        }
        function removeReplyButton(index) { replyButtonsArray.splice(index, 1); renderReplyChips(); }
        function getReplyButtonsJSON() { return JSON.stringify(replyButtonsArray); }
        function loadReplyButtonsFromJSON(json) {
            replyButtonsArray = [];
            if (!json) return;
            try { var arr = JSON.parse(json); if (Array.isArray(arr)) replyButtonsArray = arr; } catch(e) {}
            renderReplyChips();
        }

        // Drag events for inline/reply buttons (still used inside modals)
        function attachDragEvents(container) {
            var chips = container.querySelectorAll('[draggable="true"]');
            for (var i = 0; i < chips.length; i++) {
                chips[i].addEventListener('dragstart', handleDragStart);
                chips[i].addEventListener('dragover', handleDragOver);
                chips[i].addEventListener('drop', handleDrop);
                chips[i].addEventListener('dragend', handleDragEnd);
            }
        }
        function handleDragStart(e) {
            var target = e.target.closest('[draggable="true"]');
            if (!target) return;
            e.dataTransfer.setData('text/plain', JSON.stringify({ type: target.dataset.type, index: parseInt(target.dataset.index) }));
            target.classList.add('dragging');
        }
        function handleDragOver(e) { e.preventDefault(); var target = e.target.closest('[draggable="true"]'); if (target) target.classList.add('drag-over'); }
        function handleDrop(e) {
            e.preventDefault();
            var target = e.target.closest('[draggable="true"]');
            if (!target) return;
            target.classList.remove('drag-over');
            var from = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (!from || from.type !== target.dataset.type) return;
            var array = from.type === 'inline' ? inlineButtonsArray : replyButtonsArray;
            var fromIdx = from.index, toIdx = parseInt(target.dataset.index);
            if (fromIdx === toIdx) return;
            var item = array.splice(fromIdx, 1)[0];
            array.splice(toIdx, 0, item);
            if (from.type === 'inline') renderInlineChips(); else renderReplyChips();
        }
        function handleDragEnd(e) { var target = e.target.closest('[draggable="true"]'); if (target) target.classList.remove('dragging', 'drag-over'); }

        // ----- File‑Manager navigation -----
        function navigateTo(commandName) {
            var cmd = commandsCache.find(c => c.command === commandName);
            if (!cmd) return;
            // Only navigate if it's a folder (has children)
            if (!childrenMap[commandName] || childrenMap[commandName].length === 0) {
                showToast('This command has no children.', 'error');
                return;
            }
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
    var container = document.getElementById('commands-list');
    var breadcrumb = document.getElementById('breadcrumb');
    var upBtn = document.getElementById('btn-up');

    // Clear breadcrumb
    breadcrumb.innerHTML = '';

    // Helper to add a clickable breadcrumb segment
    function addBreadcrumb(text, command, isLast) {
        var span = document.createElement('span');
        span.textContent = text;
        if (!isLast) {
            span.className = 'breadcrumb-link';
            span.style.cursor = 'pointer';
            span.style.color = '#60a5fa';
            span.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateTo(command);
            });
        } else {
            span.className = 'breadcrumb-current';
            span.style.color = '#e2e8f0';
        }
        breadcrumb.appendChild(span);
    }

    // Root
    var rootSpan = document.createElement('span');
    rootSpan.textContent = 'Root';
    rootSpan.style.color = '#94a3b8';
    rootSpan.style.cursor = 'pointer';
    rootSpan.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateToRoot();
    });
    breadcrumb.appendChild(rootSpan);

    // Segments
    for (var i = 0; i < pathSegments.length; i++) {
        var seg = pathSegments[i];
        // Separator
        var sep = document.createElement('span');
        sep.className = 'breadcrumb-sep';
        sep.textContent = ' / ';
        sep.style.color = '#475569';
        breadcrumb.appendChild(sep);

        var isLast = (i === pathSegments.length - 1);
        addBreadcrumb(seg, seg, isLast);
    }

    upBtn.disabled = (currentParent === null);

    // Get children
    var children = childrenMap[currentParent] || [];
    if (children.length === 0) {
        container.innerHTML = '<div style="padding:1rem; text-align:center; color:#94a3b8; font-size:0.875rem;">This folder is empty.</div>';
        return;
    }

    children.sort(function(a, b) {
        return (a.order_idx || 0) - (b.order_idx || 0);
    });

    var listHtml = '';
    for (var j = 0; j < children.length; j++) {
        var cmd = children[j];
        var hasChildren = childrenMap[cmd.command] && childrenMap[cmd.command].length > 0;
        var icon = hasChildren ? '<i class="fa-regular fa-folder" style="color:#60a5fa;"></i>' : '<i class="fa-regular fa-file" style="color:#94a3b8;"></i>';
        var enabled = cmd.enabled !== undefined ? cmd.enabled : 1;
        var adminBadge = cmd.is_admin_only ? '<span class="badge badge-admin">Admin</span>' : '';
        var replyBadge = cmd.show_reply_keyboard ? '<span class="badge badge-reply">Reply</span>' : '';
        var typeBadge = '<span class="badge badge-gray">' + cmd.response_type + '</span>';
        var statusBadge = '<span class="badge ' + (enabled ? 'badge-enabled' : 'badge-disabled') + '">' + (enabled ? 'Enabled' : 'Disabled') + '</span>';

        // Folder name – we use a data attribute and attach click later
        var folderClass = hasChildren ? 'folder' : '';
        var dataAttr = hasChildren ? 'data-command="' + encodeURIComponent(cmd.command) + '"' : '';

        var addChildBtn = '<button class="add-child-btn btn btn-sm btn-primary" data-command="' + encodeURIComponent(cmd.command) + '"><i class="fa-solid fa-plus"></i></button>';
        var editBtn = '<button class="edit-btn btn btn-sm btn-gray" data-command="' + encodeURIComponent(cmd.command) + '"><i class="fa-regular fa-pen-to-square"></i></button>';
        var deleteBtn = '<button class="delete-btn btn btn-sm btn-danger" data-command="' + encodeURIComponent(cmd.command) + '"><i class="fa-regular fa-trash-can"></i></button>';

        listHtml += '<div class="tree-row" data-command="' + encodeURIComponent(cmd.command) + '">' +
            '<span style="width:20px;">' + icon + '</span>' +
            '<span class="tree-command-name ' + folderClass + '" ' + dataAttr + '>' + cmd.command + '</span>' +
            typeBadge + adminBadge + replyBadge + statusBadge +
            '<div class="tree-actions">' +
            addChildBtn + editBtn + deleteBtn +
            '</div>' +
            '</div>';
    }
    container.innerHTML = listHtml;

    // Attach click events for folder navigation (delegated)
    container.querySelectorAll('.tree-command-name.folder').forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.stopPropagation();
            var cmdName = decodeURIComponent(this.dataset.command);
            navigateTo(cmdName);
        });
    });

    // Attach edit, delete, add-child as before
    container.querySelectorAll('.edit-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var cmdName = decodeURIComponent(this.dataset.command);
            var cmd = commandsCache.find(function(c) { return c.command === cmdName; });
            if (cmd) showAddCommandModal(cmd);
        });
    });
    container.querySelectorAll('.delete-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var cmdName = decodeURIComponent(this.dataset.command);
            deleteCommand(cmdName);
        });
    });
    container.querySelectorAll('.add-child-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var cmdName = decodeURIComponent(this.dataset.command);
            showAddCommandModal(null, cmdName);
        });
    });
}

        // ----- Load commands from API -----
        function loadCommands() {
            var container = document.getElementById('commands-list');
            fetch('/api/commands')
            .then(function(res) { return res.json().then(function(data) { return { status: res.status, data: data }; }); })
            .then(function(result) {
                if (result.status >= 400) throw new Error(result.data.error || 'Failed');
                commandsCache = result.data.commands || [];
                // Build children map
                childrenMap = {};
                for (var i = 0; i < commandsCache.length; i++) {
                    var cmd = commandsCache[i];
                    var parent = cmd.parent || null;
                    if (!childrenMap[parent]) childrenMap[parent] = [];
                    childrenMap[parent].push(cmd);
                }
                // If current parent was deleted, reset to root
                if (currentParent !== null && !commandsCache.some(function(c) { return c.command === currentParent; })) {
                    currentParent = null;
                    pathSegments = [];
                }
                renderFileManager();
                // Update modal dropdowns if modal is open
                if (!document.getElementById('command-modal').classList.contains('hidden')) {
                    populateDropdowns();
                }
            })
            .catch(function(err) {
                container.innerHTML = '<p style="color:#f87171; font-size:0.875rem;">Error: ' + err.message + '</p>';
            });
        }

        // ----- Show Add/Edit Command Modal -----
        function showAddCommandModal(command, parent) {
            editingCommand = command || null;
            var modal = document.getElementById('command-modal');
            document.getElementById('modal-error').classList.remove('show');
            populateDropdowns();

            var parentSelect = document.getElementById('modal-parent');
            if (editingCommand) {
                document.getElementById('command-modal-title').innerText = 'Edit Command';
                document.getElementById('modal-command').value = editingCommand.command;
                document.getElementById('modal-type').value = editingCommand.response_type || 'text';
                document.getElementById('modal-content').value = editingCommand.content || '';
                document.getElementById('modal-media').value = editingCommand.media_url || '';
                document.getElementById('modal-admin-only').checked = editingCommand.is_admin_only ? true : false;
                document.getElementById('modal-enabled').checked = editingCommand.enabled !== undefined ? (editingCommand.enabled == 1) : true;
                if (editingCommand.parent) parentSelect.value = editingCommand.parent;
                loadInlineButtonsFromJSON(editingCommand.buttons_json);
                showReplyKeyboard = editingCommand.show_reply_keyboard ? true : false;
                document.getElementById('reply-toggle').classList.toggle('active', showReplyKeyboard);
                document.getElementById('reply-keyboard-section').classList.toggle('hidden', !showReplyKeyboard);
                loadReplyButtonsFromJSON(editingCommand.reply_keyboard_json);
                document.getElementById('modal-save-btn').innerText = 'Update';
            } else {
                document.getElementById('command-modal-title').innerText = 'Add New Command';
                document.getElementById('modal-command').value = '';
                document.getElementById('modal-type').value = 'text';
                document.getElementById('modal-content').value = '';
                document.getElementById('modal-media').value = '';
                document.getElementById('modal-admin-only').checked = false;
                document.getElementById('modal-enabled').checked = true;
                // Set parent if provided
                if (parent) {
                    parentSelect.value = parent;
                } else if (currentParent !== null) {
                    parentSelect.value = currentParent;
                } else {
                    parentSelect.value = '';
                }
                inlineButtonsArray = []; renderInlineChips();
                showReplyKeyboard = false;
                document.getElementById('reply-toggle').classList.remove('active');
                document.getElementById('reply-keyboard-section').classList.add('hidden');
                replyButtonsArray = []; renderReplyChips();
                document.getElementById('modal-save-btn').innerText = 'Add';
            }
            toggleMediaField();
            modal.classList.remove('hidden');
        }

        function toggleMediaField() {
            var type = document.getElementById('modal-type').value;
            document.getElementById('media-field').style.display = type === 'photo' ? 'block' : 'none';
        }
        document.getElementById('modal-type').addEventListener('change', toggleMediaField);
        document.getElementById('inline-btn-type').addEventListener('change', function() {
            var type = this.value;
            var valInput = document.getElementById('inline-btn-value');
            var cmdSelect = document.getElementById('inline-btn-command-select');
            if (type === 'command') { valInput.classList.add('hidden'); cmdSelect.classList.remove('hidden'); }
            else { valInput.classList.remove('hidden'); cmdSelect.classList.add('hidden'); }
        });

        function closeCommandModal() { document.getElementById('command-modal').classList.add('hidden'); editingCommand = null; }

        function saveCommand() {
            var command = document.getElementById('modal-command').value.trim();
            var parent = document.getElementById('modal-parent').value.trim() || null;
            var response_type = document.getElementById('modal-type').value;
            var content = document.getElementById('modal-content').value.trim();
            var media_url = document.getElementById('modal-media').value.trim();
            var is_admin_only = document.getElementById('modal-admin-only').checked ? 1 : 0;
            var enabled = document.getElementById('modal-enabled').checked ? 1 : 0;
            var buttons_json = getInlineButtonsJSON();
            var show_reply_keyboard = showReplyKeyboard ? 1 : 0;
            var reply_keyboard_json = getReplyButtonsJSON();

            var errorEl = document.getElementById('modal-error');
            if (!command || !content) { errorEl.innerText = 'Command and content are required.'; errorEl.classList.add('show'); return; }
            if (response_type === 'photo' && !media_url) { errorEl.innerText = 'Photo URL required.'; errorEl.classList.add('show'); return; }
            if (parent === command) { errorEl.innerText = 'Cannot be its own parent.'; errorEl.classList.add('show'); return; }

            var payload = { command, parent, response_type, content, media_url, is_admin_only, enabled, buttons_json, show_reply_keyboard, reply_keyboard_json };
            var url = editingCommand ? '/api/commands/' + encodeURIComponent(editingCommand.command) : '/api/commands';
            var method = editingCommand ? 'PUT' : 'POST';

            fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
            .then(function(res) { return res.json().then(function(data) { return { status: res.status, data: data }; }); })
            .then(function(result) {
                if (result.status >= 400) throw new Error(result.data.error || 'Failed');
                closeCommandModal();
                showToast('Command saved!');
                loadCommands(); // refresh, stays in same folder if parent still exists
            })
            .catch(function(err) { errorEl.innerText = err.message; errorEl.classList.add('show'); });
        }

        function deleteCommand(cmdName) {
            if (!confirm('Delete "' + cmdName + '" and all children? This cannot be undone.')) return;
            fetch('/api/commands/' + encodeURIComponent(cmdName), { method: 'DELETE' })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (!data.success) throw new Error(data.error || 'Delete failed');
                showToast('Deleted.');
                // If we deleted the current folder, navigate up
                if (currentParent === cmdName) {
                    navigateUp();
                } else {
                    loadCommands();
                }
            })
            .catch(function(err) { showToast(err.message, 'error'); });
        }

        // ============================
        // MENU COMMANDS (unchanged)
        // ============================
        var menuCommands = [];
        function loadMenuCommands() {
            fetch('/api/menu_commands')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                menuCommands = data.menu || [];
                renderMenuRows();
            })
            .catch(function(err) { showToast(err.message, 'error'); });
        }
        function renderMenuRows() {
            var container = document.getElementById('menu-commands-container');
            if (menuCommands.length === 0) { container.innerHTML = '<p style="color:#94a3b8; font-size:0.875rem;">No menu entries. Add some.</p>'; return; }
            var html = '';
            for (var i = 0; i < menuCommands.length; i++) {
                var entry = menuCommands[i];
                html += '<div class="flex gap-2 items-center">' +
                    '<input class="form-input" style="flex:1; font-size:0.875rem;" value="' + entry.command + '" placeholder="Command (no slash)" data-index="' + i + '">' +
                    '<input class="form-input" style="flex:1; font-size:0.875rem;" value="' + entry.description + '" placeholder="Description" data-index="' + i + '">' +
                    '<button onclick="removeMenuRow(' + i + ')" style="color:#f87171; background:none; border:none; cursor:pointer;"><i class="fa-regular fa-trash-can"></i></button>' +
                    '</div>';
            }
            container.innerHTML = html;
        }
        function addMenuCommandRow() { menuCommands.push({ command: '', description: '' }); renderMenuRows(); }
        function removeMenuRow(index) { menuCommands.splice(index, 1); renderMenuRows(); }
        function publishMenuCommands() {
            var inputs = document.querySelectorAll('#menu-commands-container input[data-index]');
            var updated = [];
            for (var i = 0; i < inputs.length; i += 2) {
                var cmd = inputs[i].value.trim();
                var desc = inputs[i+1] ? inputs[i+1].value.trim() : '';
                if (cmd && desc) updated.push({ command: cmd, description: desc });
            }
            if (updated.length === 0) { showToast('Add at least one valid entry.', 'error'); return; }
            var resultDiv = document.getElementById('menu-publish-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Publishing...';
            resultDiv.style.color = '#94a3b8';
            fetch('/api/menu_commands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ menu: updated })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (!data.success) throw new Error(data.error || 'Publish failed');
                resultDiv.innerText = '✅ Published!';
                resultDiv.style.color = '#4ade80';
                menuCommands = updated;
                renderMenuRows();
            })
            .catch(function(err) {
                resultDiv.innerText = '❌ ' + err.message;
                resultDiv.style.color = '#f87171';
            });
        }

        // ============================
        // USERS (unchanged)
        // ============================
        function loadUsers() {
            var container = document.getElementById('users-list');
            var search = document.getElementById('user-search').value.trim();
            var url = '/api/users' + (search ? '?search=' + encodeURIComponent(search) : '');
            fetch(url)
            .then(function(res) { return res.json(); })
            .then(function(data) {
                var users = data.users || [];
                if (users.length === 0) { container.innerHTML = '<p style="color:#94a3b8; font-size:0.875rem;">No users.</p>'; return; }
                var html = '<div style="overflow-x:auto;"><table style="width:100%; font-size:0.875rem; border-collapse:collapse;"><thead><tr style="border-bottom:1px solid #334155;"><th style="text-align:left; padding:0.5rem;">ID</th><th style="text-align:left; padding:0.5rem;">Username</th><th style="text-align:left; padding:0.5rem;">Name</th><th style="text-align:left; padding:0.5rem;">Role</th><th style="text-align:left; padding:0.5rem;">Last Active</th><th style="text-align:left; padding:0.5rem;">Action</th></tr></thead><tbody>';
                for (var i = 0; i < users.length; i++) {
                    var u = users[i];
                    var roleBtn = u.role === 'admin' ? '<button class="demote-btn" style="background:#dc2626; color:white; border:none; border-radius:4px; padding:0.125rem 0.5rem; font-size:0.75rem; cursor:pointer;" data-id="' + u.id + '">Demote</button>' : '<button class="promote-btn" style="background:#22c55e; color:white; border:none; border-radius:4px; padding:0.125rem 0.5rem; font-size:0.75rem; cursor:pointer;" data-id="' + u.id + '">Promote</button>';
                    html += '<tr style="border-bottom:1px solid #334155;"><td style="padding:0.5rem; font-family:monospace;">' + u.id + '</td><td style="padding:0.5rem;">' + (u.username || '-') + '</td><td style="padding:0.5rem;">' + (u.first_name || '') + '</td><td style="padding:0.5rem;"><span class="badge ' + (u.role === 'admin' ? 'badge-admin' : 'badge-gray') + '">' + (u.role || 'user') + '</span></td><td style="padding:0.5rem; font-size:0.75rem; color:#94a3b8;">' + (u.last_active || '-') + '</td><td style="padding:0.5rem;">' + roleBtn + '</td></tr>';
                }
                html += '</tbody></table></div>';
                container.innerHTML = html;
                container.querySelectorAll('.promote-btn').forEach(function(b) { b.addEventListener('click', function() { updateUserRole(parseInt(this.dataset.id), 'admin'); }); });
                container.querySelectorAll('.demote-btn').forEach(function(b) { b.addEventListener('click', function() { updateUserRole(parseInt(this.dataset.id), 'user'); }); });
            })
            .catch(function(err) { container.innerHTML = '<p style="color:#f87171; font-size:0.875rem;">Error: ' + err.message + '</p>'; });
        }
        function updateUserRole(userId, role) {
            fetch('/api/users/role', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, role }) })
            .then(function(res) { return res.json(); })
            .then(function(data) { if (data.success) { showToast('Role updated.'); loadUsers(); } else throw new Error(data.error); })
            .catch(function(err) { showToast(err.message, 'error'); });
        }

        // ============================
        // SETTINGS (unchanged)
        // ============================
        function loadSettings() {
            fetch('/api/settings')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                document.getElementById('settings-bot-token').value = data.bot_token || '';
                document.getElementById('settings-webhook-url').value = data.webhook_url || '';
            })
            .catch(function(err) { showToast('Error loading settings: ' + err.message, 'error'); });
        }
        var tokenVisible = false;
        function toggleTokenVisibility() {
            tokenVisible = !tokenVisible;
            var input = document.getElementById('settings-bot-token');
            input.type = tokenVisible ? 'text' : 'password';
        }
        function showChangeTokenModal() {
            document.getElementById('token-modal').classList.remove('hidden');
            document.getElementById('new-token-input').value = '';
            document.getElementById('token-test-result').classList.add('hidden');
        }
        function closeTokenModal() { document.getElementById('token-modal').classList.add('hidden'); }
        function updateBotToken() {
            var newToken = document.getElementById('new-token-input').value.trim();
            if (!newToken) { showToast('Enter a token.', 'error'); return; }
            var resultDiv = document.getElementById('token-test-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Testing...';
            resultDiv.style.color = '#94a3b8';
            fetch('/api/settings/token', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ botToken: newToken }) })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (!data.success) throw new Error(data.error || 'Failed');
                resultDiv.innerText = '✅ Updated!';
                resultDiv.style.color = '#4ade80';
                setTimeout(function() { closeTokenModal(); loadSettings(); }, 1500);
            })
            .catch(function(err) { resultDiv.innerText = '❌ ' + err.message; resultDiv.style.color = '#f87171'; });
        }
        function testWebhook() {
            var url = document.getElementById('settings-webhook-url').value;
            if (!url) { showToast('No webhook URL.', 'error'); return; }
            showToast('Testing...');
            fetch(url, { method: 'POST', body: JSON.stringify({ ping: 'test' }), headers: { 'Content-Type': 'application/json' } })
            .then(function(res) { if (res.ok) showToast('Webhook reachable!'); else showToast('Status ' + res.status, 'error'); })
            .catch(function(err) { showToast('Test failed: ' + err.message, 'error'); });
        }
        function factoryReset() {
            if (!confirm('Delete ALL data? This cannot be undone.')) return;
            showToast('Resetting...');
            fetch('/api/reset', { method: 'POST' })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (data.success) { showToast('Reset successful. Reloading...'); setTimeout(function() { window.location.reload(); }, 1500); }
                else throw new Error(data.error);
            })
            .catch(function(err) { showToast('Reset error: ' + err.message, 'error'); });
        }

        // ============================
        // BOT INFO & PHOTO (unchanged)
        // ============================
        function loadBotInfo() {
            var resultDiv = document.getElementById('bot-info-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Loading from Telegram...';
            resultDiv.style.color = '#94a3b8';
            fetch('/api/bot_info')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (!data.success) throw new Error(data.error || 'Failed');
                document.getElementById('bot-name').value = data.name || '';
                document.getElementById('bot-description').value = data.description || '';
                document.getElementById('bot-short-description').value = data.short_description || '';
                resultDiv.innerText = '✅ Loaded from Telegram.';
                resultDiv.style.color = '#4ade80';
            })
            .catch(function(err) {
                resultDiv.innerText = '❌ ' + err.message;
                resultDiv.style.color = '#f87171';
            });
        }

        function publishBotInfo() {
            var name = document.getElementById('bot-name').value.trim();
            var description = document.getElementById('bot-description').value.trim();
            var short_description = document.getElementById('bot-short-description').value.trim();
            var resultDiv = document.getElementById('bot-info-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Publishing...';
            resultDiv.style.color = '#94a3b8';
            fetch('/api/bot_info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, short_description })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (!data.success) throw new Error(data.error || 'Publish failed');
                resultDiv.innerText = '✅ Published to Telegram!';
                resultDiv.style.color = '#4ade80';
            })
            .catch(function(err) {
                resultDiv.innerText = '❌ ' + err.message;
                resultDiv.style.color = '#f87171';
            });
        }

        function setBotPhoto() {
            var url = document.getElementById('bot-photo-url').value.trim();
            if (!url) { showToast('Please enter a photo URL.', 'error'); return; }
            var resultDiv = document.getElementById('bot-info-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Setting photo...';
            resultDiv.style.color = '#94a3b8';
            fetch('/api/bot_photo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ photo: url })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (!data.success) throw new Error(data.error || 'Failed to set photo');
                resultDiv.innerText = '✅ Photo set successfully!';
                resultDiv.style.color = '#4ade80';
                document.getElementById('bot-photo-url').value = '';
            })
            .catch(function(err) {
                resultDiv.innerText = '❌ ' + err.message;
                resultDiv.style.color = '#f87171';
            });
        }

        function deleteBotPhoto() {
            if (!confirm('Delete bot profile photo?')) return;
            var resultDiv = document.getElementById('bot-info-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Deleting photo...';
            resultDiv.style.color = '#94a3b8';
            fetch('/api/bot_photo', { method: 'DELETE' })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (!data.success) throw new Error(data.error || 'Failed to delete photo');
                resultDiv.innerText = '✅ Photo deleted.';
                resultDiv.style.color = '#4ade80';
            })
            .catch(function(err) {
                resultDiv.innerText = '❌ ' + err.message;
                resultDiv.style.color = '#f87171';
            });
        }

        // ============================
        // SETUP WIZARD (unchanged)
        // ============================
        function openTokenPage() {
            var permissions = [
                { "key": "workers_scripts", "type": "edit" },
                { "key": "d1", "type": "edit" },
                { "key": "account", "type": "read" }
            ];
            var TOKEN_DEEPLINK = "https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=" + encodeURIComponent(JSON.stringify(permissions)) + "&accountId=*&zoneId=all&name=Nyxx%20Platform";
            window.open(TOKEN_DEEPLINK, "_blank", "noopener");
        }
        var debounceTimeout;
        function handleTokenInput() {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(discoverInfrastructure, 500);
        }
        function discoverInfrastructure() {
            var token = document.getElementById('cf-token').value.trim();
            if (token.length < 20) return;
            document.getElementById('discovery-loading').classList.remove('hidden');
            document.getElementById('auto-fields').classList.add('hidden');
            var btn = document.getElementById('btn-setup');
            btn.disabled = true;
            btn.className = "btn btn-gray btn-block";
            fetch('/api/setup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'verify_token', cfToken: token, hostname: window.location.hostname }) })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (!data.success) throw new Error(data.error || 'Discovery failed');
                document.getElementById('cf-account-id').value = data.accountId;
                document.getElementById('cf-script-name').value = data.scriptName;
                document.getElementById('auto-fields').classList.remove('hidden');
                btn.disabled = false;
                btn.className = "btn btn-primary btn-block";
            })
            .catch(function(err) { alert('Discovery failed: ' + err.message); })
            .finally(function() { document.getElementById('discovery-loading').classList.add('hidden'); });
        }
        function runSetup() {
            var btn = document.getElementById('btn-setup');
            var logs = document.getElementById('setup-logs');
            var accId = document.getElementById('cf-account-id').value;
            var scriptName = document.getElementById('cf-script-name').value;
            var token = document.getElementById('cf-token').value;
            btn.innerHTML = '<span class="spinner"></span> Provisioning...';
            btn.disabled = true;
            logs.classList.remove('hidden');
            logs.innerHTML = 'Starting...<br>';
            fetch('/api/setup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'provision_infra', accountId: accId, scriptName: scriptName, cfToken: token }) })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (!data.success) throw new Error(data.error || 'Unknown error');
                logs.innerHTML += data.logs.join('<br>') + '<br><br>✅ Success! Reloading...';
                // Force reload with cache busting after a delay
                setTimeout(function() {
                    window.location.href = window.location.pathname + '?t=' + Date.now();
                }, 2000);
            })
            .catch(function(err) {
                logs.innerHTML += '<br>❌ Error: ' + err.message;
                btn.innerHTML = 'Provision Infrastructure';
                btn.disabled = false;
            });
        }
        function saveTelegramConfig() {
            var btn = document.getElementById('btn-tg');
            var logs = document.getElementById('tg-logs');
            var token = document.getElementById('tg-token').value;
            btn.innerHTML = '<span class="spinner"></span> Connecting...';
            logs.classList.remove('hidden');
            logs.innerHTML = '';
            fetch('/api/setup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'set_telegram', botToken: token }) })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                if (!data.success) throw new Error(data.error || 'Failed');
                logs.innerHTML = '✅ Bot connected and webhook set!';
                document.getElementById('status-tg').innerHTML = '<i class="fa-brands fa-telegram" style="color:#60a5fa;"></i> Bot: Active';
                setTimeout(function() {
                    document.getElementById('step-2').classList.add('step-hidden');
                    document.getElementById('step-3').classList.remove('step-hidden');
                    switchTab('commands');
                }, 1000);
            })
            .catch(function(err) {
                logs.innerHTML = '❌ Error: ' + err.message;
                btn.innerHTML = 'Connect & Set Webhook';
            });
        }

        window.onload = function() {
            fetch('/api/status')
            .then(function(res) { return res.json(); })
            .then(function(status) {
                if (status.d1_bound) {
                    document.getElementById('status-d1').innerHTML = '<i class="fa-solid fa-database" style="color:#4ade80;"></i> D1: Bound';
                    // D1 bound – skip steps 0,1,2 and go to step 3 (or step2 if bot not configured)
                    document.getElementById('step-0').classList.add('step-hidden');
                    document.getElementById('step-1').classList.add('step-hidden');
                    if (status.tg_configured) {
                        document.getElementById('status-tg').innerHTML = '<i class="fa-brands fa-telegram" style="color:#60a5fa;"></i> Bot: Active';
                        document.getElementById('step-3').classList.remove('step-hidden');
                        switchTab('commands');
                    } else {
                        document.getElementById('step-2').classList.remove('step-hidden');
                    }
                } else {
                    // Show step 0, hide others
                    document.getElementById('step-0').classList.remove('step-hidden');
                    document.getElementById('step-1').classList.add('step-hidden');
                    document.getElementById('step-2').classList.add('step-hidden');
                    document.getElementById('step-3').classList.add('step-hidden');
                }
            })
            .catch(function(e) { console.error("Status check failed", e); });
        }
    </script>
</body>
</html>`;

// ============================================================================
// WORKER ENTRY POINT & ROUTER (unchanged)
// ============================================================================
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        try {
            if (request.method === 'GET' && url.pathname === '/') {
                return new Response(DASHBOARD_HTML, {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

            if (request.method === 'GET' && url.pathname === '/api/status') {
                let d1Bound = typeof env.DB !== 'undefined';
                let tgConfigured = false;
                if (d1Bound) {
                    try {
                        const stmt = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
                        if (stmt && stmt.value) tgConfigured = true;
                    } catch (e) {}
                }
                return Response.json({ d1_bound: d1Bound, tg_configured: tgConfigured });
            }

            if (request.method === 'POST' && url.pathname === '/api/setup') {
                return await handleSetupAPI(request, env, url.origin);
            }

            // Commands
            if (url.pathname === '/api/commands') {
                if (request.method === 'GET') return await getCommands(env);
                if (request.method === 'POST') return await createCommand(request, env);
            }
            if (url.pathname === '/api/commands/reorder' && request.method === 'POST') {
                return await reorderCommands(request, env);
            }
            if (url.pathname.startsWith('/api/commands/') && request.method === 'PUT') {
                return await updateCommand(request, env);
            }
            if (url.pathname.startsWith('/api/commands/') && request.method === 'DELETE') {
                return await deleteCommand(request, env);
            }

            // Menu
            if (request.method === 'GET' && url.pathname === '/api/menu_commands') {
                return await getMenuCommands(env);
            }
            if (request.method === 'POST' && url.pathname === '/api/menu_commands') {
                return await setMenuCommands(request, env);
            }

            // Users
            if (request.method === 'GET' && url.pathname === '/api/users') {
                return await getUsers(env, url);
            }
            if (request.method === 'PUT' && url.pathname === '/api/users/role') {
                return await updateUserRole(request, env);
            }

            // Settings
            if (request.method === 'GET' && url.pathname === '/api/settings') {
                return await getSettings(env, url.origin);
            }
            if (request.method === 'POST' && url.pathname === '/api/settings/token') {
                return await updateBotToken(request, env, url.origin);
            }

            // Bot Info
            if (request.method === 'GET' && url.pathname === '/api/bot_info') {
                return await getBotInfo(env);
            }
            if (request.method === 'POST' && url.pathname === '/api/bot_info') {
                return await setBotInfo(request, env);
            }

            // Bot Photo
            if (request.method === 'POST' && url.pathname === '/api/bot_photo') {
                return await setBotPhoto(request, env);
            }
            if (request.method === 'DELETE' && url.pathname === '/api/bot_photo') {
                return await deleteBotPhoto(env);
            }

            // Factory Reset
            if (request.method === 'POST' && url.pathname === '/api/reset') {
                return await factoryReset(env);
            }

            // Webhook
            if (request.method === 'POST' && url.pathname === '/webhook') {
                return await handleTelegramWebhook(request, env);
            }

            return new Response('Not Found', { status: 404 });
        } catch (error) {
            return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
        }
    }
};

// ============================================================================
// CLOUDFLARE API AUTOMATION (unchanged)
// ============================================================================
async function handleSetupAPI(request, env, originUrl) {
    const body = await request.json();

    if (body.action === 'verify_token') {
        const { cfToken, hostname } = body;
        const headers = { 'Authorization': `Bearer ${cfToken}` };
        try {
            const accRes = await fetch('https://api.cloudflare.com/client/v4/accounts', { headers });
            const accData = await accRes.json();
            if (!accData.success || !accData.result || accData.result.length === 0) {
                return Response.json({ success: false, error: "Failed to access accounts." }, { status: 400 });
            }
            const accountId = accData.result[0].id;
            const scrRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts`, { headers });
            const scrData = await scrRes.json();
            let scriptName = 'nyxx-bot';
            if (scrData.success && scrData.result && scrData.result.length > 0) {
                const urlPrefix = hostname.split('.')[0];
                const match = scrData.result.find(s => s.id === urlPrefix);
                scriptName = match ? match.id : scrData.result[0].id;
            }
            return Response.json({ success: true, accountId, scriptName });
        } catch (err) {
            return Response.json({ success: false, error: err.message }, { status: 500 });
        }
    }

    if (body.action === 'provision_infra') {
        const { accountId, scriptName, cfToken } = body;
        const cfApiBase = `https://api.cloudflare.com/client/v4/accounts/${accountId}`;
        const headers = { 'Authorization': `Bearer ${cfToken}` };
        let logs = [];
        try {
            logs.push("[1/4] Creating D1 database...");
            const d1Res = await fetch(`${cfApiBase}/d1/database`, {
                method: 'POST',
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: `nyxx_db_${Date.now()}` })
            });
            const d1Data = await d1Res.json();
            if (!d1Data.success) throw new Error(`D1 creation failed: ${JSON.stringify(d1Data.errors)}`);
            const d1Uuid = d1Data.result.uuid;
            logs.push(`[1/4] Success! UUID: ${d1Uuid}`);

            logs.push("[2/4] Fetching worker script...");
            const scriptRes = await fetch(`${cfApiBase}/workers/scripts/${scriptName}`, { headers });
            if (!scriptRes.ok) throw new Error("Could not download worker script.");
            let scriptContent = "";
            const contentType = scriptRes.headers.get('content-type') || '';
            if (contentType.includes('multipart')) {
                const text = await scriptRes.text();
                const boundary = contentType.split('boundary=')[1];
                const parts = text.split(`--${boundary}`);
                for (const part of parts) {
                    if (part.includes('application/javascript')) {
                        scriptContent = part.split('\r\n\r\n')[1].trim();
                        break;
                    }
                }
            } else {
                scriptContent = await scriptRes.text();
            }
            if (!scriptContent) throw new Error("Failed to parse script content.");
            logs.push("[2/4] Script fetched.");

            logs.push("[3/4] Updating worker bindings...");
            const formData = new FormData();
            const metadata = {
                main_module: "worker.js",
                bindings: [
                    { type: "d1", name: "DB", id: d1Uuid }
                ]
            };
            formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
            formData.append("worker.js", new Blob([scriptContent], { type: "application/javascript+module" }));
            const uploadRes = await fetch(`${cfApiBase}/workers/scripts/${scriptName}`, {
                method: 'PUT',
                headers: headers,
                body: formData
            });
            const uploadData = await uploadRes.json();
            if (!uploadData.success) throw new Error(`Binding injection failed: ${JSON.stringify(uploadData.errors)}`);
            logs.push("[3/4] Bindings applied.");
            logs.push("[4/4] Done.");
            return Response.json({ success: true, logs });
        } catch (err) {
            return Response.json({ success: false, error: err.message, logs }, { status: 400 });
        }
    }

    if (body.action === 'set_telegram') {
        if (!env.DB) return Response.json({ error: "D1 missing" }, { status: 400 });
        const { botToken } = body;
        await initializeDatabase(env.DB);
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        const tgData = await tgRes.json();
        if (!tgData.ok) return Response.json({ error: "Invalid token" }, { status: 400 });
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('bot_token', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(botToken).run();
        // Store webhook URL for default /start buttons
        const webhookUrl = `${originUrl}/webhook`;
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('webhook_url', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(webhookUrl).run();
        const hookRes = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
        const hookData = await hookRes.json();
        if (!hookData.ok) return Response.json({ error: "Webhook set failed" }, { status: 500 });
        return Response.json({ success: true, bot: tgData.result });
    }
    return Response.json({ error: "Malformed instruction" }, { status: 400 });
}

// ============================================================================
// DATABASE INITIALIZATION (unchanged)
// ============================================================================
async function initializeDatabase(db) {
    const schema = `
        CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, first_name TEXT, role TEXT DEFAULT 'user', is_premium BOOLEAN DEFAULT 0, last_active DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS commands (command TEXT PRIMARY KEY, parent TEXT, response_type TEXT DEFAULT 'text', content TEXT, media_url TEXT, buttons_json TEXT, is_admin_only BOOLEAN DEFAULT 0, enabled BOOLEAN DEFAULT 1, show_reply_keyboard BOOLEAN DEFAULT 0, reply_keyboard_json TEXT, order_idx INTEGER DEFAULT 0);
        CREATE TABLE IF NOT EXISTS sessions (user_id INTEGER PRIMARY KEY, command TEXT, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, action TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
    `;
    const statements = schema.split(';').filter(s => s.trim().length > 0);
    const batch = statements.map(s => db.prepare(s));
    await db.batch(batch);
}

// ============================================================================
// COMMANDS API (unchanged)
// ============================================================================
async function getCommands(env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        await initializeDatabase(env.DB);
        const result = await env.DB.prepare("SELECT * FROM commands ORDER BY order_idx, command").all();
        return Response.json({ commands: result.results || [] });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function createCommand(request, env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const body = await request.json();
        const { command, parent, response_type, content, media_url, is_admin_only, enabled, buttons_json, show_reply_keyboard, reply_keyboard_json } = body;
        if (!command || !content) return Response.json({ error: "Command and content required" }, { status: 400 });
        await initializeDatabase(env.DB);
        const maxOrder = await env.DB.prepare("SELECT MAX(order_idx) as max FROM commands").first();
        const orderIdx = (maxOrder && maxOrder.max !== null) ? maxOrder.max + 1 : 0;
        await env.DB.prepare(`
            INSERT INTO commands (command, parent, response_type, content, media_url, buttons_json, is_admin_only, enabled, show_reply_keyboard, reply_keyboard_json, order_idx)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(command, parent || null, response_type || 'text', content, media_url || '', buttons_json || '', is_admin_only ? 1 : 0, enabled !== undefined ? enabled : 1, show_reply_keyboard ? 1 : 0, reply_keyboard_json || '', orderIdx).run();
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function updateCommand(request, env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const url = new URL(request.url);
        const oldCommand = decodeURIComponent(url.pathname.split('/').pop());
        const body = await request.json();
        const { command, parent, response_type, content, media_url, is_admin_only, enabled, buttons_json, show_reply_keyboard, reply_keyboard_json } = body;
        if (!command || !content) return Response.json({ error: "Command and content required" }, { status: 400 });
        await initializeDatabase(env.DB);
        if (command !== oldCommand) {
            await env.DB.prepare("DELETE FROM commands WHERE command = ?").bind(oldCommand).run();
            const maxOrder = await env.DB.prepare("SELECT MAX(order_idx) as max FROM commands").first();
            const orderIdx = (maxOrder && maxOrder.max !== null) ? maxOrder.max + 1 : 0;
            await env.DB.prepare(`
                INSERT INTO commands (command, parent, response_type, content, media_url, buttons_json, is_admin_only, enabled, show_reply_keyboard, reply_keyboard_json, order_idx)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(command, parent || null, response_type || 'text', content, media_url || '', buttons_json || '', is_admin_only ? 1 : 0, enabled !== undefined ? enabled : 1, show_reply_keyboard ? 1 : 0, reply_keyboard_json || '', orderIdx).run();
        } else {
            await env.DB.prepare(`
                UPDATE commands SET parent = ?, response_type = ?, content = ?, media_url = ?, buttons_json = ?, is_admin_only = ?, enabled = ?, show_reply_keyboard = ?, reply_keyboard_json = ?
                WHERE command = ?
            `).bind(parent || null, response_type || 'text', content, media_url || '', buttons_json || '', is_admin_only ? 1 : 0, enabled !== undefined ? enabled : 1, show_reply_keyboard ? 1 : 0, reply_keyboard_json || '', command).run();
        }
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function deleteCommand(request, env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const url = new URL(request.url);
        const command = decodeURIComponent(url.pathname.split('/').pop());
        await initializeDatabase(env.DB);
        let toDelete = [command];
        let idx = 0;
        while (idx < toDelete.length) {
            const current = toDelete[idx];
            const children = await env.DB.prepare("SELECT command FROM commands WHERE parent = ?").bind(current).all();
            for (const row of children.results) {
                toDelete.push(row.command);
            }
            idx++;
        }
        for (const cmd of toDelete) {
            await env.DB.prepare("DELETE FROM commands WHERE command = ?").bind(cmd).run();
        }
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function reorderCommands(request, env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const body = await request.json();
        const { order } = body;
        if (!Array.isArray(order)) return Response.json({ error: "Invalid order" }, { status: 400 });
        await initializeDatabase(env.DB);
        for (let i = 0; i < order.length; i++) {
            await env.DB.prepare("UPDATE commands SET order_idx = ? WHERE command = ?").bind(i, order[i]).run();
        }
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// ============================================================================
// MENU COMMANDS (unchanged)
// ============================================================================
async function getMenuCommands(env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        await initializeDatabase(env.DB);
        const result = await env.DB.prepare("SELECT value FROM settings WHERE key = 'menu_commands'").first();
        let menu = [];
        if (result && result.value) {
            try { menu = JSON.parse(result.value); } catch(e) {}
        }
        return Response.json({ menu });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function setMenuCommands(request, env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const body = await request.json();
        const { menu } = body;
        if (!menu || !Array.isArray(menu)) return Response.json({ error: "Invalid menu" }, { status: 400 });
        for (const entry of menu) {
            if (!entry.command || !entry.description) {
                return Response.json({ error: "Each entry needs command and description" }, { status: 400 });
            }
        }
        const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
        if (!tokenRecord || !tokenRecord.value) {
            return Response.json({ error: "Bot token not set" }, { status: 400 });
        }
        const BOT_TOKEN = tokenRecord.value;
        const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commands: menu })
        });
        const data = await resp.json();
        if (!data.ok) {
            return Response.json({ error: data.description || "Telegram API error" }, { status: 500 });
        }
        await initializeDatabase(env.DB);
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('menu_commands', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(JSON.stringify(menu)).run();
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// ============================================================================
// USERS API (unchanged)
// ============================================================================
async function getUsers(env, url) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        await initializeDatabase(env.DB);
        let query = "SELECT id, username, first_name, role, is_premium, last_active FROM users";
        const search = url.searchParams.get('search');
        const params = [];
        if (search && search.trim()) {
            query += " WHERE username LIKE ? OR first_name LIKE ?";
            const like = '%' + search.trim() + '%';
            params.push(like, like);
        }
        query += " ORDER BY last_active DESC";
        const result = await env.DB.prepare(query).bind(...params).all();
        return Response.json({ users: result.results || [] });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function updateUserRole(request, env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const body = await request.json();
        const { userId, role } = body;
        if (!userId || !role) return Response.json({ error: "userId and role required" }, { status: 400 });
        await initializeDatabase(env.DB);
        await env.DB.prepare("UPDATE users SET role = ? WHERE id = ?").bind(role, userId).run();
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// ============================================================================
// SETTINGS API (unchanged)
// ============================================================================
async function getSettings(env, originUrl) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        await initializeDatabase(env.DB);
        const token = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
        const webhook = await env.DB.prepare("SELECT value FROM settings WHERE key = 'webhook_url'").first();
        return Response.json({
            bot_token: token ? token.value : '',
            webhook_url: webhook ? webhook.value : `${originUrl}/webhook`
        });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function updateBotToken(request, env, originUrl) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const body = await request.json();
        const { botToken } = body;
        if (!botToken) return Response.json({ error: "Bot token required" }, { status: 400 });
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        const tgData = await tgRes.json();
        if (!tgData.ok) return Response.json({ error: "Invalid bot token" }, { status: 400 });
        await initializeDatabase(env.DB);
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('bot_token', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(botToken).run();
        const webhookUrl = `${originUrl}/webhook`;
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('webhook_url', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(webhookUrl).run();
        const hookRes = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
        const hookData = await hookRes.json();
        if (!hookData.ok) return Response.json({ error: "Webhook update failed" }, { status: 500 });
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// ============================================================================
// BOT INFO API (unchanged)
// ============================================================================
async function getBotInfo(env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        await initializeDatabase(env.DB);
        const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
        if (!tokenRecord || !tokenRecord.value) {
            return Response.json({ error: "Bot token not set" }, { status: 400 });
        }
        const BOT_TOKEN = tokenRecord.value;
        const [nameRes, descRes, shortDescRes] = await Promise.all([
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMyName`),
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMyDescription`),
            fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMyShortDescription`)
        ]);
        const nameData = await nameRes.json();
        const descData = await descRes.json();
        const shortData = await shortDescRes.json();
        return Response.json({
            success: true,
            name: nameData.ok ? nameData.result.name : '',
            description: descData.ok ? descData.result.description : '',
            short_description: shortData.ok ? shortData.result.short_description : ''
        });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function setBotInfo(request, env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const body = await request.json();
        const { name, description, short_description } = body;
        const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
        if (!tokenRecord || !tokenRecord.value) {
            return Response.json({ error: "Bot token not set" }, { status: 400 });
        }
        const BOT_TOKEN = tokenRecord.value;
        const promises = [];
        if (name !== undefined) promises.push(fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setMyName`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        }));
        if (description !== undefined) promises.push(fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setMyDescription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description })
        }));
        if (short_description !== undefined) promises.push(fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setMyShortDescription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ short_description })
        }));
        await Promise.all(promises);
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// ============================================================================
// BOT PHOTO API (unchanged)
// ============================================================================
async function setBotPhoto(request, env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const body = await request.json();
        const { photo } = body;
        if (!photo) return Response.json({ error: "Photo URL required" }, { status: 400 });
        const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
        if (!tokenRecord || !tokenRecord.value) {
            return Response.json({ error: "Bot token not set" }, { status: 400 });
        }
        const BOT_TOKEN = tokenRecord.value;
        const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setMyPhoto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ photo: photo })
        });
        const data = await resp.json();
        if (!data.ok) {
            return Response.json({ error: data.description || "Telegram API error" }, { status: 500 });
        }
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function deleteBotPhoto(env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
        if (!tokenRecord || !tokenRecord.value) {
            return Response.json({ error: "Bot token not set" }, { status: 400 });
        }
        const BOT_TOKEN = tokenRecord.value;
        const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteMyPhoto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await resp.json();
        if (!data.ok) {
            return Response.json({ error: data.description || "Telegram API error" }, { status: 500 });
        }
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// ============================================================================
// FACTORY RESET (unchanged)
// ============================================================================
async function factoryReset(env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const tables = ['settings', 'users', 'commands', 'sessions', 'logs'];
        for (const table of tables) {
            await env.DB.prepare(`DROP TABLE IF EXISTS ${table}`).run();
        }
        await initializeDatabase(env.DB);
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// ============================================================================
// TELEGRAM BOT ENGINE (with default /start)
// ============================================================================
async function handleTelegramWebhook(request, env) {
    if (!env.DB) return new Response('DB not available', { status: 500 });

    const update = await request.json();
    const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
    if (!tokenRecord || !tokenRecord.value) return new Response('Token not set', { status: 500 });
    const BOT_TOKEN = tokenRecord.value;
    const sendMessage = async (chatId, text, replyMarkup = null) => {
        const payload = { chat_id: chatId, text: text, parse_mode: 'HTML' };
        if (replyMarkup) payload.reply_markup = replyMarkup;
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    };

    try {
        if (update.message && update.message.text) {
            const msg = update.message;
            const chatId = msg.chat.id;
            const text = msg.text.trim();
            const userId = msg.from.id;

            await env.DB.prepare(`
                INSERT INTO users (id, username, first_name) VALUES (?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET last_active = CURRENT_TIMESTAMP
            `).bind(userId, msg.from.username || '', msg.from.first_name || '').run();

            // Check for reply button match (including "Back")
            let targetCommand = null;
            if (text === "Back") {
                const session = await env.DB.prepare("SELECT command FROM sessions WHERE user_id = ?").bind(userId).first();
                if (session && session.command) {
                    const cmd = await env.DB.prepare("SELECT parent FROM commands WHERE command = ?").bind(session.command).first();
                    if (cmd && cmd.parent) targetCommand = cmd.parent;
                }
            } else {
                const allCmds = await env.DB.prepare("SELECT command, reply_keyboard_json FROM commands WHERE enabled = 1 AND show_reply_keyboard = 1").all();
                for (const row of allCmds.results) {
                    if (row.reply_keyboard_json) {
                        try {
                            const buttons = JSON.parse(row.reply_keyboard_json);
                            if (Array.isArray(buttons)) {
                                for (const btn of buttons) {
                                    if (btn.text === text) {
                                        targetCommand = btn.command;
                                        break;
                                    }
                                }
                            }
                        } catch(e) {}
                    }
                    if (targetCommand) break;
                }
            }

            if (targetCommand) {
                const cmdRecord = await env.DB.prepare("SELECT * FROM commands WHERE command = ? AND enabled = 1").bind(targetCommand).first();
                if (cmdRecord) {
                    await executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env);
                    return new Response('OK', { status: 200 });
                }
            }

            // Normal command
            if (text.startsWith('/')) {
                const cmdRecord = await env.DB.prepare("SELECT * FROM commands WHERE command = ? AND enabled = 1").bind(text).first();
                if (cmdRecord) {
                    await executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env);
                } else {
                    // If command is /start and no custom command exists, send default
                    if (text === '/start') {
                        await sendDefaultStart(chatId, env, BOT_TOKEN);
                    } else {
                        await sendMessage(chatId, "Command not found.");
                    }
                }
                return new Response('OK', { status: 200 });
            }
        }

        if (update.callback_query) {
            const cb = update.callback_query;
            const data = cb.data;
            if (data && data.startsWith('/')) {
                const cmdRecord = await env.DB.prepare("SELECT * FROM commands WHERE command = ? AND enabled = 1").bind(data).first();
                if (cmdRecord) {
                    await executeCommand(cb.message.chat.id, cb.from.id, cmdRecord, BOT_TOKEN, env);
                    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ callback_query_id: cb.id })
                    });
                } else {
                    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ callback_query_id: cb.id, text: "Command not found." })
                    });
                }
            } else {
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callback_query_id: cb.id, text: "Done." })
                });
            }
        }
    } catch (err) {
        console.error("Webhook error:", err);
    }

    return new Response('OK', { status: 200 });
}

// ----- Default /start handler -----
async function sendDefaultStart(chatId, env, BOT_TOKEN) {
    // Retrieve stored webhook URL for dashboard link
    let dashboardUrl = "https://dash.cloudflare.com";
    try {
        const webhookSetting = await env.DB.prepare("SELECT value FROM settings WHERE key = 'webhook_url'").first();
        if (webhookSetting && webhookSetting.value) {
            // webhook_url ends with /webhook, strip it to get base URL
            dashboardUrl = webhookSetting.value.replace(/\/webhook$/, '');
        }
    } catch(e) {}

    const text = `👋 Welcome to <b>Nyxx</b>!\n\n` +
        `This bot is powered by <a href="https://github.com/Mahan07dev/nyxx">Nyxx</a>, ` +
        `an open‑source Telegram bot builder for Cloudflare Workers.\n\n` +
        `Created with ❤️ by <b>@Mahan07dev</b>`;

    const keyboard = {
        inline_keyboard: [
            [
                { text: "🔗 GitHub", url: "https://github.com/Mahan07dev" },
                { text: "📊 Dashboard", url: dashboardUrl }
            ]
        ]
    };

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML',
            reply_markup: keyboard
        })
    });
}

// ============================================================================
// Helper: execute command with session & reply keyboard (unchanged)
// ============================================================================
async function executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env) {
    // Update session
    await env.DB.prepare(`
        INSERT INTO sessions (user_id, command) VALUES (?, ?)
        ON CONFLICT(user_id) DO UPDATE SET command = excluded.command, updated_at = CURRENT_TIMESTAMP
    `).bind(userId, cmdRecord.command).run();

    // Admin check
    if (cmdRecord.is_admin_only) {
        const user = await env.DB.prepare("SELECT role FROM users WHERE id = ?").bind(userId).first();
        if (!user || user.role !== 'admin') {
            await sendMessage(chatId, "⚠️ Unauthorized.");
            return;
        }
    }

    let replyMarkup = null;
    if (cmdRecord.buttons_json) {
        try { replyMarkup = JSON.parse(cmdRecord.buttons_json); } catch(e) {}
    }

    let keyboard = null;
    if (cmdRecord.show_reply_keyboard && cmdRecord.reply_keyboard_json) {
        try {
            const buttons = JSON.parse(cmdRecord.reply_keyboard_json);
            if (Array.isArray(buttons) && buttons.length > 0) {
                const rows = [];
                const rowSize = 3;
                for (let i = 0; i < buttons.length; i += rowSize) {
                    const row = buttons.slice(i, i + rowSize).map(b => ({ text: b.text }));
                    rows.push(row);
                }
                // Auto Back button if parent exists
                if (cmdRecord.parent) {
                    rows.push([{ text: "Back" }]);
                }
                keyboard = rows;
            }
        } catch(e) {}
    }

    const sendReply = async (chatId, text, keyboardData) => {
        const payload = {
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML',
            reply_markup: keyboardData ? { keyboard: keyboardData, resize_keyboard: true, one_time_keyboard: false } : undefined
        };
        if (replyMarkup && !keyboardData) payload.reply_markup = replyMarkup;
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    };

    if (cmdRecord.response_type === 'text') {
        await sendReply(chatId, cmdRecord.content, keyboard);
    } else if (cmdRecord.response_type === 'photo') {
        const photoPayload = { chat_id: chatId, photo: cmdRecord.media_url, caption: cmdRecord.content };
        if (replyMarkup) photoPayload.reply_markup = replyMarkup;
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(photoPayload)
        });
    }
}