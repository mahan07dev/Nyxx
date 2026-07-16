// ============================================================================
// GLOBAL VERSION
// ============================================================================
const VERSION = '2.1.1'; // bump on each release

// ============================================================================
// EMBEDDED DASHBOARD HTML (with update tab)
// ============================================================================
const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <link rel="shortcut icon" href="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" type="image/x-icon">
    <title>Nyxx | Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        /* ... (all styles unchanged) ... */
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
            margin: 0;
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
        .logout-btn {
            background: transparent;
            border: 1px solid #dc2626;
            color: #f87171;
            height: 32px;
            width: 32px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 0.875rem;
        }
        .logout-btn i { color: red; }
        .logout-btn:hover { background: #dc2626; color: white; }
        .main-container {
            flex: 1;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            width: 100%;
        }
        .card {
            background: #1e293b;
            border-radius: 16px;
            border: 1px solid #334155;
            padding: 2rem;
            margin: 2rem 0;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .step { display: block; }
        .step-hidden { display: none !important; }
        .step-title {
            font-size: 1.5rem;
            font-weight: 700;
            border-bottom: 1px solid #334155;
            padding-bottom: 0.5rem;
            margin-top: 0;
            margin-bottom: 1.5rem;
        }
        .form-group { margin-bottom: 1.25rem; }
        .form-label { display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.25rem; }
        .form-input {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 0.6rem 0.75rem;
            color: #f1f5f9;
            width: 100%;
            font-family: system-ui, sans-serif;
            font-size: 0.9rem;
        }
        .form-input:focus { border-color: #3b82f6; outline: none; }
        #bot-description {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 0.6rem 0.75rem;
            color: #f1f5f9;
            width: 100%;
            min-height: 100px;
            font-family: system-ui, sans-serif;
            font-size: 0.9rem;
        }
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-weight: 700;
            padding: 0.6rem 1.2rem;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            transition: 0.2s;
            font-size: 1rem;
            min-height: 35px;
        }
        .btn-primary { background: #3b82f6; color: white; }
        .btn-primary:hover { background: #2563eb; }
        .btn-success { background: #22c55e; color: white; }
        .btn-success:hover { background: #16a34a; }
        .btn-gray { background: #334155; color: #e2e8f0; }
        .btn-gray:hover { background: #475569; }
        .btn-danger { background: #dc2626; color: white; }
        .btn-danger:hover { background: #b91c1c; }
        .btn-block { width: 100%; justify-content: center; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-sm { padding: 0.25rem 0.75rem; font-size: 0.875rem; border-radius: 8px; }
        .text-center { text-align: center; }
        .text-sm { font-size: 0.875rem; color: #94a3b8; }
        .mt-4 { margin-top: 1.5rem; }
        .mt-2 { margin-top: 0.5rem; }
        .flex { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
        .hidden { display: none !important; }
        .log-error { color: #f87171; }
        .log-success { color: #4ade80; }
        .dashboard { max-width: 1200px; margin: 0 auto; }
        .tabs-header {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            border-bottom: 1px solid #334155;
            margin-bottom: 1.5rem;
            height: 60px;
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
        }
        .tab-btn:hover { color: #e2e8f0; }
        .tab-btn.active { border-bottom-color: #60a5fa; color: white; }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        .hamburger {
            display: none;
            cursor: pointer;
            padding: 0.5rem;
            font-size: 1.5rem;
            color: #e2e8f0;
            user-select: none;
            transition: transform 0.2s;
        }
        .hamburgerfa.open { transform: rotate(90deg); }
        .mobile-tabs {
            display: block;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-height 0.35s ease-out, opacity 0.3s ease-out;
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
        .tree-command-name.folder { cursor: pointer; }
        .tree-command-name.folder:hover { text-decoration: underline; }
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
        .breadcrumb-link { color: #60a5fa; cursor: pointer; }
        .breadcrumb-link:hover { text-decoration: underline; }
        .breadcrumb-current { color: #e2e8f0; }
        .panel {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 1.5rem;
        }
        .panel-dark { background: #0f172a; border-color: #334155; }
        .panel-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; }
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
        }
        .modal-title { font-size: 1.25rem; font-weight: 700; margin-top: 0; margin-bottom: 1rem; }
        .modal-actions { display: flex; gap: 0.5rem; margin-top: 1.5rem; }
        .modal-error { color: #f87171; font-size: 0.875rem; margin-top: 0.5rem; display: none; }
        .modal-error.show { display: block; }
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
        .footer {
            text-align: center;
            padding: 1.25rem 0 0.625rem;
            border-top: 1px solid #334155;
            margin-top: 2rem;
            font-size: 0.875rem;
            color: #94a3b8;
        }
        .footer .brand { font-weight: 600; color: #60a5fa; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { box-shadow: inset 0 0 5px grey; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #0085f1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #b30000; }
    </style>
</head>
<body>
    <nav class="navbar" id="navbar">
        <div class="navbar-inner">
            <h1 class="navbar-title">
                <img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" alt="Logo" height="50px">
                Nyxx
                <button class="info-btn" onclick="showInfoModal()" title="About Nyxx"><i class="fa-solid fa-question"></i></button>
                <button id="logout-btn" class="logout-btn hidden" onclick="logout()"><i class="fa-solid fa-sign-out-alt"></i></button>
            </h1>
            <div class="navbar-actions">
                <div class="status-items">
                    <span id="status-d1"><i class="fa-solid fa-database"></i> D1: Unbound</span>
                    <span id="status-tg"><i class="fa-brands fa-telegram"></i> Bot: Unlinked</span>
                </div>
            </div>
        </div>
    </nav>
    <main class="main-container">
        <div id="step-status" class="step">
            <div class="card text-center">
                <div style="font-size: 3rem; margin-bottom: 1rem;"><i class="fa-solid fa-database"></i></div>
                <h2 class="step-title">Checking Database...</h2>
                <p id="status-message" class="text-sm">Loading...</p>
                <div id="status-actions" class="hidden mt-4">
                    <button onclick="window.location.reload()" class="btn btn-primary">Retry</button>
                    <button onclick="goToSetup()" class="btn btn-success">Set Up Admin Password</button>
                </div>
            </div>
        </div>
        <div id="step-setup" class="step step-hidden">
            <div class="card">
                <h2 class="step-title"><i class="fa-solid fa-user-lock"></i> Initial Setup</h2>
                <p class="text-sm">Set an admin password to protect your dashboard. You may also connect a bot token now (skip if you want to do it later).</p>
                <div class="form-group">
                    <label class="form-label">Bot Token (optional)</label>
                    <input type="password" id="setup-bot-token" class="form-input" placeholder="Get your token from @BotFather">
                    <div class="flex" style="margin-top: 0.25rem;">
                        <label style="font-size: 0.875rem;"><input type="checkbox" id="setup-skip-bot"> Skip bot token for now</label>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Admin Password</label>
                    <input type="password" id="setup-password" class="form-input" placeholder="Choose a strong password">
                </div>
                <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <input type="password" id="setup-password-confirm" class="form-input" placeholder="Confirm password">
                </div>
                <button onclick="submitSetup()" class="btn btn-success btn-block">Save & Continue</button>
                <div id="setup-error" class="log-error text-sm" style="margin-top: 1rem; display: none;"></div>
                <p class="text-sm" style="margin-top:1rem;">💡 You can also set an <strong>ADMIN_PASS</strong> environment variable in Cloudflare Worker to override this password.</p>
            </div>
        </div>
        <div id="step-login" class="step step-hidden">
            <div class="card">
                <h2 class="step-title"><i class="fa-solid fa-lock"></i> Login</h2>
                <p class="text-sm">Enter your admin password to access the dashboard.</p>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" id="login-password" class="form-input" placeholder="Enter your password">
                </div>
                <button onclick="submitLogin()" class="btn btn-primary btn-block">Login</button>
                <div id="login-error" class="log-error text-sm" style="margin-top: 1rem; display: none;"></div>
                <p class="text-sm" style="margin-top:1rem;">💡 If you set <strong>ADMIN_PASS</strong> environment variable, use that password.</p>
            </div>
        </div>
        <div id="step-dashboard" class="step step-hidden">
            <div class="tabs-header">
                <button class="tab-btn active" onclick="switchTab('commands')"><i class="fa-solid fa-list-ul"></i> Commands</button>
                <button class="tab-btn" onclick="switchTab('menu')"><i class="fa-solid fa-bars"></i> Menu</button>
                <button class="tab-btn" onclick="switchTab('users')"><i class="fa-solid fa-users"></i> Users</button>
                <button class="tab-btn" onclick="switchTab('settings')"><i class="fa-solid fa-gear"></i> Settings</button>
                <button class="tab-btn" onclick="switchTab('botinfo')"><i class="fa-solid fa-circle-info"></i> Bot Info</button>
                <button class="tab-btn" onclick="switchTab('update')"><i class="fa-solid fa-arrow-up"></i> Update</button>
            </div>
            <div class="hamburger" id="hamburger-btn" onclick="toggleHamburger()"><i class="fa-solid fa-bars hamburgerfa" id="hamburgerfa"></i></div>
            <div id="mobile-tabs" class="mobile-tabs">
                <button class="active" onclick="switchTab('commands'); closeHamburger();"><i class="fa-solid fa-list-ul"></i> Commands</button>
                <button onclick="switchTab('menu'); closeHamburger();"><i class="fa-solid fa-bars"></i> Menu</button>
                <button onclick="switchTab('users'); closeHamburger();"><i class="fa-solid fa-users"></i> Users</button>
                <button onclick="switchTab('settings'); closeHamburger();"><i class="fa-solid fa-gear"></i> Settings</button>
                <button onclick="switchTab('botinfo'); closeHamburger();"><i class="fa-solid fa-circle-info"></i> Bot Info</button>
                <button onclick="switchTab('update'); closeHamburger();"><i class="fa-solid fa-arrow-up"></i> Update</button>
            </div>
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
            <div id="tab-menu" class="tab-content">
                <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
                    <h3 class="panel-title" style="margin-bottom:0;">Telegram Menu Commands</h3>
                    <button onclick="addMenuCommandRow()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> Add Entry</button>
                </div>
                <p style="color:#94a3b8; font-size:0.875rem; margin-bottom:1rem;">These commands appear in the bot's menu.</p>
                <div id="menu-commands-container" class="panel" style="display:flex; flex-direction:column; gap:0.5rem;"></div>
                <button onclick="publishMenuCommands()" class="btn btn-success" style="margin-top:1rem;"><i class="fa-solid fa-cloud-arrow-up"></i> Publish to Telegram</button>
                <div id="menu-publish-result" class="hidden" style="margin-top:0.5rem; font-size:0.875rem;"></div>
            </div>
            <div id="tab-users" class="tab-content">
                <h3 class="panel-title">Users Who Have Interacted</h3>
                <div class="flex gap-2" style="margin-bottom:1rem;">
                    <input id="user-search" placeholder="Search by username or name..." class="form-input">
                    <button onclick="loadUsers()" class="btn btn-gray btn-sm"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div id="users-list" class="panel"></div>
            </div>
            <div id="tab-settings" class="tab-content">
                <h3 class="panel-title">Bot Settings</h3>
                <div class="panel" style="display:flex; flex-direction:column; gap:1.5rem;">
                    <div>
                        <label class="form-label">Bot Token</label>
                        <div class="flex gap-2" style="flex-wrap: nowrap;">
                            <input type="password" id="settings-bot-token" class="form-input" style="background:#1e293b; border-color:#475569; color:#e2e8f0; font-family:monospace;" readonly>
                            <button onclick="toggleTokenVisibility()" class="btn btn-gray btn-sm"><i class="fa-regular fa-eye"></i></button>
                        </div>
                        <button onclick="showChangeTokenModal()" class="btn btn-primary btn-sm" style="margin-top:0.5rem;">Change Bot Token</button>
                        <p class="text-sm" style="margin-top:0.25rem;">💡 Get your token from <strong>@BotFather</strong> on Telegram.</p>
                    </div>
                    <div>
                        <label class="form-label">Webhook URL</label>
                        <input type="text" id="settings-webhook-url" class="form-input" style="background:#1e293b; border-color:#475569; color:#94a3b8;" readonly>
                        <button onclick="testWebhook()" class="btn btn-gray btn-sm" style="margin-top:0.5rem;">Test Webhook</button>
                    </div>
                    <div>
                        <label class="form-label">Change Admin Password (D1)</label>
                        <div style="display:flex; flex-direction:column; gap:0.5rem;">
                            <input type="password" id="change-pass-new" class="form-input" placeholder="New password">
                            <input type="password" id="change-pass-confirm" class="form-input" placeholder="Confirm new password">
                            <button onclick="changeAdminPassword()" class="btn btn-primary btn-sm">Update Password</button>
                            <p class="text-sm" style="margin-top:0.25rem;">💡 If <strong>ADMIN_PASS</strong> environment variable is set, it will take priority over this.</p>
                        </div>
                    </div>
                    <div class="border-t" style="padding-top:1rem;">
                        <button onclick="factoryReset()" class="btn btn-danger"><i class="fa-solid fa-arrow-rotate-left"></i> Factory Reset</button>
                        <p style="color:#f87171; font-size:0.75rem; margin-top:0.5rem;">Erases all commands, users, settings, and bot info. The bot will be disconnected.</p>
                    </div>
                </div>
            </div>
            <div id="tab-botinfo" class="tab-content">
                <h3 class="panel-title">Bot Information</h3>
                <div class="panel" style="display:flex; flex-direction:column; gap:1rem;">
                    <div>
                        <label class="form-label">Bot Name</label>
                        <input id="bot-name" class="form-input" placeholder="My Awesome Bot">
                    </div>
                    <div>
                        <label class="form-label">Description</label>
                        <textarea id="bot-description" class="form-textarea" placeholder="What your bot does..."></textarea>
                    </div>
                    <div>
                        <label class="form-label">Short Description</label>
                        <textarea id="bot-short-description" class="form-input" placeholder="Short summary..." rows="3"></textarea>
                    </div>
                    <div class="flex gap-2 flex-wrap">
                        <button onclick="loadBotInfo()" class="btn btn-gray"><i class="fa-solid fa-download"></i> Load from Telegram</button>
                        <button onclick="publishBotInfo()" class="btn btn-success"><i class="fa-solid fa-cloud-arrow-up"></i> Publish Info</button>
                    </div>
                    <div id="bot-info-result" class="hidden" style="font-size:0.875rem;"></div>
                    <p class="text-sm">💡 To change bot profile picture or other settings not available here, use <strong>@BotFather</strong>.</p>
                </div>
            </div>
            <!-- UPDATE TAB -->
            <div id="tab-update" class="tab-content">
                <h3 class="panel-title"><i class="fa-solid fa-cloud-upload-alt"></i> Self‑Update</h3>
                <div class="panel" style="display:flex; flex-direction:column; gap:1.5rem;">
                    <div>
                        <label class="form-label">Current Version</label>
                        <input id="update-current-version" class="form-input" readonly value="${VERSION}">
                    </div>
                    <div>
                        <label class="form-label">Latest Version</label>
                        <input id="update-latest-version" class="form-input" readonly placeholder="Click 'Check for updates'">
                        <div id="update-version-details" style="margin-top:0.25rem; font-size:0.875rem; color:#94a3b8;"></div>
                        <button onclick="checkForUpdate()" class="btn btn-gray btn-sm" style="margin-top:0.5rem;"><i class="fa-solid fa-rotate"></i> Check for Updates</button>
                    </div>
                    <hr style="border-color:#334155;">
                    <div>
                        <label class="form-label">Cloudflare API Token</label>
                        <input type="password" id="update-cf-token" class="form-input" placeholder="Your Cloudflare API token (requires Workers Scripts:Edit)">
                        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem;">
                            <button onclick="openTokenGenerator()" class="btn btn-gray btn-sm"><i class="fa-solid fa-key"></i> Auto‑Generate API Token</button>
                        </div>
                        <div id="update-validation-result" class="hidden" style="margin-top:0.5rem; font-size:0.875rem;"></div>
                    </div>
                    <button id="update-btn" class="btn btn-success" disabled><i class="fa-solid fa-cloud-arrow-up"></i> Update to Latest</button>
                    <div id="update-status" class="hidden" style="font-size:0.875rem;"></div>
                    <p class="text-sm" style="margin-top:0.5rem;">
                        💡 The update will fetch the latest version from GitHub and deploy it to your Cloudflare Worker,
                        preserving all your bindings (D1, secrets, etc.).
                    </p>
                </div>
            </div>
        </div>
    </main>
    <footer class="footer">
        <div>
            Built with ❤️ by <span class="brand">@Mahan07dev</span>
            <br><br>
            <a href="https://github.com/Mahan07dev" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>
            <a href="https://t.me/nyxx_official_channel" target="_blank"><i class="fa-brands fa-telegram"></i> Telegram</a>
            <span style="margin:0 0.5rem;">|</span>
            <span style="color:#475569;">v${VERSION}</span>
        </div>
    </footer>

    <!-- MODALS -->
    <div id="command-modal" class="modal-overlay hidden">
        <div class="modal-box">
            <h3 class="modal-title" id="command-modal-title">Add Command</h3>
            <div class="form-group">
                <label class="form-label">Command (e.g., /start)</label>
                <input id="modal-command" class="form-input" placeholder="/command">
            </div>
            <div class="form-group">
                <label class="form-label">Parent (optional)</label>
                <select id="modal-parent" class="form-input"><option value="">None (Root)</option></select>
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
                <textarea id="modal-content" class="form-input" rows="3" placeholder="Response text..."></textarea>
            </div>
            <div class="form-group" id="media-field" style="display:none;">
                <label class="form-label">Photo URL</label>
                <input id="modal-media" class="form-input" placeholder="https://example.com/image.jpg">
            </div>
            <div class="form-group">
                <label class="form-label">Buttons (inline keyboard)</label>
                <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:6px;">
                    <input id="inline-btn-label" class="form-input" style="flex:1; min-width:80px;" placeholder="Label">
                    <select id="inline-btn-type" class="form-input" style="flex:0 0 auto; width:auto;">
                        <option value="callback">Callback</option>
                        <option value="url">URL</option>
                        <option value="command">Command</option>
                    </select>
                    <input id="inline-btn-value" class="form-input" style="flex:1; min-width:80px;" placeholder="Value/URL">
                    <select id="inline-btn-command-select" class="form-input hidden" style="flex:1; min-width:80px;"><option value="">Select command...</option></select>
                    <button onclick="addInlineButton()" class="btn btn-primary btn-sm" style="flex:0 0 auto;">Add</button>
                </div>
                <div id="inline-buttons-list" class="panel" style="padding:0.5rem; min-height:30px;"></div>
            </div>
            <div class="form-group">
                <div style="display:flex; align-items:center; gap:0.75rem;">
                    <span class="form-label" style="margin:0;">Reply Keyboard</span>
                    <div id="reply-toggle" class="toggle" onclick="toggleReplyKeyboard()"><span class="slider"></span></div>
                </div>
                <div id="reply-keyboard-section" class="hidden" style="margin-top:0.5rem;">
                    <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:6px;">
                        <input id="reply-btn-label" class="form-input" style="flex:1; min-width:80px;" placeholder="Button text">
                        <select id="reply-btn-command" class="form-input" style="flex:1; min-width:80px;"><option value="">Select command...</option></select>
                        <button onclick="addReplyButton()" class="btn btn-primary btn-sm" style="flex:0 0 auto;">Add</button>
                    </div>
                    <div id="reply-buttons-list" class="panel" style="padding:0.5rem; min-height:30px;"></div>
                </div>
            </div>
            <div class="form-group">
                <label style="display:flex; align-items:center; gap:0.5rem;">
                    <input type="checkbox" id="modal-admin-only"> Admin only
                </label>
            </div>
            <div class="form-group">
                <label style="display:flex; align-items:center; gap:0.5rem;">
                    <input type="checkbox" id="modal-enabled" checked> Enabled
                </label>
            </div>
            <div id="modal-error" class="modal-error"></div>
            <div class="modal-actions">
                <button onclick="closeCommandModal()" class="btn btn-gray">Cancel</button>
                <button id="modal-save-btn" onclick="saveCommand()" class="btn btn-success">Save</button>
            </div>
        </div>
    </div>

    <div id="token-modal" class="modal-overlay hidden">
        <div class="modal-box">
            <h3 class="modal-title">Update Bot Token</h3>
            <p class="text-sm">Paste your new Telegram bot token. The webhook will be updated automatically.</p>
            <div class="form-group">
                <label class="form-label">New Bot Token</label>
                <input id="new-token-input" class="form-input" placeholder="Get your token from @BotFather">
            </div>
            <div id="token-test-result" class="hidden text-sm" style="margin-top:0.5rem;"></div>
            <div class="modal-actions">
                <button onclick="closeTokenModal()" class="btn btn-gray">Cancel</button>
                <button onclick="updateBotToken()" class="btn btn-success">Update</button>
            </div>
        </div>
    </div>

    <div id="info-modal" class="modal-overlay hidden">
        <div class="modal-box">
            <h3 class="modal-title">About Nyxx</h3>
            <p><strong>Nyxx</strong> is a full-featured Telegram bot builder running on Cloudflare Workers.</p>
            <p>Built with ❤️ by <a href="https://github.com/Mahan07dev" target="_blank">@Mahan07dev</a></p>
            <p>Version ${VERSION}</p>
            <div style="margin-top:1rem;">
                <a href="https://github.com/Mahan07dev/Nyxx" target="_blank" class="btn btn-gray btn-block"><i class="fa-brands fa-github"></i> Source Code</a>
            </div>
            <div class="modal-actions">
                <button onclick="document.getElementById('info-modal').classList.add('hidden')" class="btn btn-primary btn-block">Close</button>
            </div>
        </div>
    </div>

    <div id="toast-container" class="toast-container"></div>

    <script>
        // ============================
        // GLOBAL STATE
        // ============================
        let editingCommand = null;
        let commandsCache = [];
        let inlineButtonsArray = [];
        let replyButtonsArray = [];
        let showReplyKeyboard = false;
        let currentParent = null;
        let pathSegments = [];
        let childrenMap = {};
        let menuCommands = [];

        // Update-related globals
        let cfAccountId = null;
        let cfScriptName = null;
        let latestVersion = null;
        let updateAvailable = false;
        let workerUrl = null;

        function showToast(message, type) {
            type = type || 'success';
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = 'toast ' + type;
            toast.innerText = message;
            container.appendChild(toast);
            setTimeout(() => toast.remove(), 5000);
        }

        function showStep(stepId) {
            document.querySelectorAll('.step').forEach(s => s.classList.add('step-hidden'));
            const target = document.getElementById(stepId);
            if (target) target.classList.remove('step-hidden');
            else {
                console.error('Step not found:', stepId);
                const fallback = document.getElementById('step-status');
                if (fallback) fallback.classList.remove('step-hidden');
            }
        }

        function goToSetup() { showStep('step-setup'); }
        function showInfoModal() { document.getElementById('info-modal').classList.remove('hidden'); }

        // ============================
        // STATUS CHECK
        // ============================
        async function checkStatus() {
            try {
                const res = await fetch('/api/status');
                const data = await res.json();
                const statusD1 = document.getElementById('status-d1');
                if (statusD1) {
                    statusD1.innerHTML = data.d1_bound ?
                        '<i class="fa-solid fa-database" style="color:#4ade80;"></i> D1: Bound' :
                        '<i class="fa-solid fa-database"></i> D1: Unbound';
                }
                if (!data.d1_bound) {
                    const msg = document.getElementById('status-message');
                    if (msg) msg.innerHTML = 'D1 database not bound. Please run the installer.';
                    const actions = document.getElementById('status-actions');
                    if (actions) actions.classList.remove('hidden');
                    showStep('step-status');
                    return;
                }
                const adminSet = data.admin_password_set;
                if (!adminSet) {
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
                const msg = document.getElementById('status-message');
                if (msg) msg.innerHTML = 'Error checking status: ' + e.message;
                showStep('step-status');
            }
        }

        // ============================
        // SETUP / LOGIN
        // ============================
        async function submitSetup() {
            const botToken = document.getElementById('setup-bot-token').value.trim();
            const skipBot = document.getElementById('setup-skip-bot').checked;
            const password = document.getElementById('setup-password').value;
            const confirm = document.getElementById('setup-password-confirm').value;
            const errorEl = document.getElementById('setup-error');
            errorEl.style.display = 'none';
            if (!password || password.length < 6) {
                errorEl.textContent = 'Password must be at least 6 characters.';
                errorEl.style.display = 'block';
                return;
            }
            if (password !== confirm) {
                errorEl.textContent = 'Passwords do not match.';
                errorEl.style.display = 'block';
                return;
            }
            if (!skipBot && !botToken) {
                errorEl.textContent = 'Please provide a bot token or check "Skip".';
                errorEl.style.display = 'block';
                return;
            }
            const payload = { adminPassword: password };
            if (botToken) payload.botToken = botToken;
            try {
                const res = await fetch('/api/setup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
        }

        async function submitLogin() {
            const password = document.getElementById('login-password').value;
            const errorEl = document.getElementById('login-error');
            errorEl.style.display = 'none';
            if (!password) {
                errorEl.textContent = 'Please enter your password.';
                errorEl.style.display = 'block';
                return;
            }
            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });
                const data = await res.json();
                if (!data.success) throw new Error(data.error || 'Login failed');
                showToast('Login successful!');
                showDashboard();
            } catch (err) {
                errorEl.textContent = err.message;
                errorEl.style.display = 'block';
            }
        }

        async function logout() {
            await fetch('/api/logout', { method: 'POST' });
            showToast('Logged out.');
            document.getElementById('logout-btn').classList.add('hidden');
            showStep('step-login');
        }

        function showDashboard() {
            showStep('step-dashboard');
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
            fetch('/api/status')
                .then(r => r.json())
                .then(data => {
                    document.getElementById('status-d1').innerHTML = data.d1_bound ?
                        '<i class="fa-solid fa-database" style="color:#4ade80;"></i> D1: Bound' :
                        '<i class="fa-solid fa-database"></i> D1: Unbound';
                    document.getElementById('status-tg').innerHTML = data.tg_configured ?
                        '<i class="fa-brands fa-telegram" style="color:#60a5fa;"></i> Bot: Active' :
                        '<i class="fa-brands fa-telegram"></i> Bot: Unlinked';
                });
            switchTab('commands');
            loadCommands();
            loadMenuCommands();
            loadSettings();
        }

        // ============================
        // TABS
        // ============================
        let currentTab = 'commands';
        function switchTab(tabId) {
            currentTab = tabId;
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            const el = document.getElementById('tab-' + tabId);
            if (el) el.classList.add('active');
            const map = { commands:0, menu:1, users:2, settings:3, botinfo:4, update:5 };
            const btns = document.querySelectorAll('.tabs-header .tab-btn');
            btns.forEach((b, i) => b.classList.toggle('active', i === map[tabId]));
            document.querySelectorAll('#mobile-tabs button').forEach((b, i) => {
                b.classList.toggle('active', i === map[tabId]);
            });
            if (tabId === 'commands') loadCommands();
            else if (tabId === 'menu') loadMenuCommands();
            else if (tabId === 'users') loadUsers();
            else if (tabId === 'settings') loadSettings();
            else if (tabId === 'botinfo') loadBotInfo();
            else if (tabId === 'update') loadUpdateTab();
            closeHamburger();
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

        // ============================
        // COMMANDS (simplified, same as original)
        // ============================
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
            if (!editingCommand && currentParent !== null) parentSelect.value = currentParent;
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
        function navigateTo(commandName) {
            var cmd = commandsCache.find(c => c.command === commandName);
            if (!cmd) return;
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
            breadcrumb.innerHTML = '';
            var rootSpan = document.createElement('span');
            rootSpan.textContent = 'Root';
            rootSpan.style.color = '#94a3b8';
            rootSpan.style.cursor = 'pointer';
            rootSpan.addEventListener('click', function(e) { e.stopPropagation(); navigateToRoot(); });
            breadcrumb.appendChild(rootSpan);
            for (var i = 0; i < pathSegments.length; i++) {
                var seg = pathSegments[i];
                var sep = document.createElement('span');
                sep.className = 'breadcrumb-sep';
                sep.textContent = ' / ';
                sep.style.color = '#475569';
                breadcrumb.appendChild(sep);
                var isLast = (i === pathSegments.length - 1);
                var span = document.createElement('span');
                span.textContent = seg;
                if (!isLast) {
                    span.className = 'breadcrumb-link';
                    span.style.cursor = 'pointer';
                    span.style.color = '#60a5fa';
                    span.addEventListener('click', function(e) { e.stopPropagation(); navigateTo(seg); });
                } else {
                    span.className = 'breadcrumb-current';
                    span.style.color = '#e2e8f0';
                }
                breadcrumb.appendChild(span);
            }
            upBtn.disabled = (currentParent === null);
            var children = childrenMap[currentParent] || [];
            if (children.length === 0) {
                container.innerHTML = '<div style="padding:1rem; text-align:center; color:#94a3b8; font-size:0.875rem;">This folder is empty.</div>';
                return;
            }
            children.sort(function(a, b) { return (a.order_idx || 0) - (b.order_idx || 0); });
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
                var folderClass = hasChildren ? 'folder' : '';
                var dataAttr = hasChildren ? 'data-command="' + encodeURIComponent(cmd.command) + '"' : '';
                listHtml += '<div class="tree-row" data-command="' + encodeURIComponent(cmd.command) + '">' +
                    '<span style="width:20px;">' + icon + '</span>' +
                    '<span class="tree-command-name ' + folderClass + '" ' + dataAttr + '>' + cmd.command + '</span>' +
                    typeBadge + adminBadge + replyBadge + statusBadge +
                    '<div class="tree-actions">' +
                    '<button class="add-child-btn btn btn-sm btn-primary" data-command="' + encodeURIComponent(cmd.command) + '"><i class="fa-solid fa-plus"></i></button>' +
                    '<button class="edit-btn btn btn-sm btn-gray" data-command="' + encodeURIComponent(cmd.command) + '"><i class="fa-regular fa-pen-to-square"></i></button>' +
                    '<button class="delete-btn btn btn-sm btn-danger" data-command="' + encodeURIComponent(cmd.command) + '"><i class="fa-regular fa-trash-can"></i></button>' +
                    '</div></div>';
            }
            container.innerHTML = listHtml;
            container.querySelectorAll('.tree-command-name.folder').forEach(function(el) {
                el.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var cmdName = decodeURIComponent(this.dataset.command);
                    navigateTo(cmdName);
                });
            });
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
        function loadCommands() {
            var container = document.getElementById('commands-list');
            return fetch('/api/commands')
            .then(function(res) { return res.json().then(function(data) { return { status: res.status, data: data }; }); })
            .then(function(result) {
                if (result.status >= 400) throw new Error(result.data.error || 'Failed');
                commandsCache = result.data.commands || [];
                childrenMap = {};
                for (var i = 0; i < commandsCache.length; i++) {
                    var cmd = commandsCache[i];
                    var parent = cmd.parent || null;
                    if (!childrenMap[parent]) childrenMap[parent] = [];
                    childrenMap[parent].push(cmd);
                }
                if (currentParent !== null && !commandsCache.some(function(c) { return c.command === currentParent; })) {
                    currentParent = null;
                    pathSegments = [];
                }
                renderFileManager();
                if (!document.getElementById('command-modal').classList.contains('hidden')) populateDropdowns();
            })
            .catch(function(err) {
                container.innerHTML = '<p style="color:#f87171; font-size:0.875rem;">Error: ' + err.message + '</p>';
            });
        }
        async function showAddCommandModal(command, parent) {
            await loadCommands();
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
                if (parent) parentSelect.value = parent;
                else if (currentParent !== null) parentSelect.value = currentParent;
                else parentSelect.value = '';
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
                loadCommands();
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
                if (currentParent === cmdName) navigateUp();
                else loadCommands();
            })
            .catch(function(err) { showToast(err.message, 'error'); });
        }

        // ============================
        // MENU COMMANDS
        // ============================
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
        // USERS
        // ============================
        function loadUsers() {
            var container = document.getElementById('users-list');
            var search = document.getElementById('user-search').value.trim();
            var url = '/api/users' + (search ? '?search=' + encodeURIComponent(search) : '');
            fetch(url)
            .then(function(res) { return res.json(); })
            .then(function(data) {
                var users = data.users || [];
                if (users.length === 0) { container.innerHTML = '<p style="color:#94a3b8; font-size:0.875rem;">No users yet. Interact with the bot to see them here.</p>'; return; }
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
        // SETTINGS
        // ============================
        function loadSettings() {
            fetch('/api/settings')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                document.getElementById('settings-bot-token').value = data.bot_token || '';
                document.getElementById('settings-webhook-url').value = data.webhook_url || '';
                // Also load saved CF token if present
                if (data.cf_token) {
                    document.getElementById('update-cf-token').value = data.cf_token;
                }
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
        // CHANGE PASSWORD
        // ============================
        function changeAdminPassword() {
            const newPass = document.getElementById('change-pass-new').value;
            const confirm = document.getElementById('change-pass-confirm').value;
            if (!newPass || newPass.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
            if (newPass !== confirm) { showToast('Passwords do not match.', 'error'); return; }
            fetch('/api/change_password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword: newPass })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showToast('Password updated successfully.');
                    document.getElementById('change-pass-new').value = '';
                    document.getElementById('change-pass-confirm').value = '';
                } else {
                    throw new Error(data.error || 'Failed');
                }
            })
            .catch(err => showToast(err.message, 'error'));
        }

        // ============================
        // BOT INFO
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

        // ============================
        // UPDATE / SELF-UPDATE
        // ============================
        function openTokenGenerator() {
            const url = 'https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=%5B%7B%22key%22%3A%22workers_scripts%22%2C%22type%22%3A%22edit%22%7D%5D&accountId=*&zoneId=all&name=Nyxx%20Updater';
            window.open(url, '_blank');
        }

        async function loadUpdateTab() {
            // Load saved CF token from settings
            await loadSettings(); // this will fill the token input if saved
            // Then check for updates
            await checkForUpdate();
        }

        async function checkForUpdate() {
            const latestInput = document.getElementById('update-latest-version');
            const detailsDiv = document.getElementById('update-version-details');
            latestInput.placeholder = 'Checking...';
            detailsDiv.innerText = '';
            try {
                const res = await fetch('/api/version');
                const data = await res.json();
                if (data.latest) {
                    latestInput.value = data.latest;
                    latestVersion = data.latest;
                    workerUrl = data.worker_url || null;
                    let details = '';
                    if (data.released) details += '📅 Released: ' + data.released;
                    if (data.notes) details += (details ? ' | ' : '') + '📝 Notes: ' + data.notes;
                    detailsDiv.innerText = details || '';
                    // Compare versions
                    updateAvailable = compareVersions(data.latest, data.current) > 0;
                } else {
                    latestInput.value = 'Error: ' + (data.error || 'unknown');
                    updateAvailable = false;
                }
            } catch (e) {
                latestInput.value = 'Error: ' + e.message;
                updateAvailable = false;
            }
            updateUpdateButtonState();
        }

        function compareVersions(v1, v2) {
            const parts1 = v1.split('.').map(Number);
            const parts2 = v2.split('.').map(Number);
            for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
                const n1 = parts1[i] || 0;
                const n2 = parts2[i] || 0;
                if (n1 > n2) return 1;
                if (n1 < n2) return -1;
            }
            return 0;
        }

        function updateUpdateButtonState() {
            const btn = document.getElementById('update-btn');
            // Enable only if update is available (token validation will happen on click)
            if (updateAvailable) {
                btn.disabled = false;
                btn.title = 'Update available';
            } else {
                btn.disabled = true;
                btn.title = 'No update available or already latest';
            }
        }

        // The "Update to Latest" button click handler – validates token and then updates
        document.getElementById('update-btn').addEventListener('click', performUpdate);

        async function performUpdate() {
            const statusDiv = document.getElementById('update-status');
            statusDiv.classList.remove('hidden');
            statusDiv.innerText = 'Preparing...';
            statusDiv.style.color = '#94a3b8';

            // 1. Check if update is available
            if (!updateAvailable) {
                statusDiv.innerText = '❌ No update available.';
                statusDiv.style.color = '#f87171';
                return;
            }

            // 2. Get token
            const token = document.getElementById('update-cf-token').value.trim();
            if (!token) {
                statusDiv.innerText = '❌ Please enter a Cloudflare API token.';
                statusDiv.style.color = '#f87171';
                return;
            }

            // 3. Validate token and get account/script info
            const resultDiv = document.getElementById('update-validation-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Validating token...';
            resultDiv.style.color = '#94a3b8';

            let validationData;
            try {
                const res = await fetch('/api/update/validate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                });
                validationData = await res.json();
                if (!validationData.valid) {
                    throw new Error(validationData.error || 'Invalid token');
                }
                resultDiv.innerText = '✅ Token validated. Account: ' + validationData.accountId + ', Script: ' + validationData.scriptName;
                resultDiv.style.color = '#4ade80';
            } catch (e) {
                resultDiv.innerText = '❌ Token validation failed: ' + e.message;
                resultDiv.style.color = '#f87171';
                statusDiv.innerText = '❌ Update aborted: token invalid.';
                statusDiv.style.color = '#f87171';
                return;
            }

            const accountId = validationData.accountId;
            const scriptName = validationData.scriptName;
            if (!accountId || !scriptName) {
                statusDiv.innerText = '❌ Could not determine Account ID or Script Name.';
                statusDiv.style.color = '#f87171';
                return;
            }

            // 4. Perform the update
            statusDiv.innerText = 'Updating...';
            statusDiv.style.color = '#94a3b8';

            try {
                const updateRes = await fetch('/api/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, accountId, scriptName, workerUrl })
                });
                const updateData = await updateRes.json();
                if (!updateData.success) {
                    throw new Error(updateData.error || 'Update failed');
                }
                statusDiv.innerText = '✅ Update successful! New version: ' + (updateData.version || 'unknown') + '. Updating takes time. Please wait 30 seconds and reload the page untill you see the new version appear here.';
                statusDiv.style.color = '#4ade80';
                // Refresh version info
                await checkForUpdate();
                showToast('Update completed! The worker has been updated.', 'success');
            } catch (e) {
                statusDiv.innerText = '❌ ' + e.message;
                statusDiv.style.color = '#f87171';
            }
        }

        // ============================
        // INIT
        // ============================
        window.onload = function() { checkStatus(); };
    </script>
</body>
</html>`;

// ============================================================================
// WORKER ENTRY POINT
// ============================================================================
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        try {
            // Serve dashboard HTML (public)
            if (request.method === 'GET' && url.pathname === '/') {
                return new Response(DASHBOARD_HTML, {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

            // ==================== PUBLIC API ====================
            if (request.method === 'GET' && url.pathname === '/api/status') {
                return await getStatus(env);
            }

            if (request.method === 'POST' && url.pathname === '/api/setup') {
                return await handleSetup(request, env);
            }

            if (request.method === 'POST' && url.pathname === '/api/login') {
                return await handleLogin(request, env);
            }

            // Public version endpoint (no auth needed)
            if (request.method === 'GET' && url.pathname === '/api/version') {
                return await getVersionInfo(env);
            }

            // ==================== WEBHOOK (PUBLIC) ====================
            if (request.method === 'POST' && url.pathname === '/webhook') {
                return await handleTelegramWebhook(request, env);
            }

            // ==================== PROTECTED API (require session) ====================
            const session = await getSession(request, env);
            if (!session) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
            }

            // Logout
            if (request.method === 'POST' && url.pathname === '/api/logout') {
                return await handleLogout(request, env);
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
            if (request.method === 'POST' && url.pathname === '/api/change_password') {
                return await changeAdminPassword(request, env);
            }

            // Bot Info
            if (request.method === 'GET' && url.pathname === '/api/bot_info') {
                return await getBotInfo(env);
            }
            if (request.method === 'POST' && url.pathname === '/api/bot_info') {
                return await setBotInfo(request, env);
            }

            // Factory Reset
            if (request.method === 'POST' && url.pathname === '/api/reset') {
                return await factoryReset(env);
            }

            // Update endpoints
            if (request.method === 'POST' && url.pathname === '/api/update/validate') {
                return await validateCloudflareToken(request, env);
            }
            if (request.method === 'POST' && url.pathname === '/api/update') {
                return await performUpdate(request, env);
            }

            // Check session (for frontend)
            if (request.method === 'GET' && url.pathname === '/api/check_session') {
                return Response.json({ logged_in: true });
            }

            return new Response('Not Found', { status: 404 });
        } catch (error) {
            console.error(error);
            return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
        }
    }
};

// ============================================================================
// DATABASE INITIALIZATION
// ============================================================================
async function initializeDatabase(db) {
    const schema = `
        CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, first_name TEXT, role TEXT DEFAULT 'user', is_premium BOOLEAN DEFAULT 0, last_active DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS commands (command TEXT PRIMARY KEY, parent TEXT, response_type TEXT DEFAULT 'text', content TEXT, media_url TEXT, buttons_json TEXT, is_admin_only BOOLEAN DEFAULT 0, enabled BOOLEAN DEFAULT 1, show_reply_keyboard BOOLEAN DEFAULT 0, reply_keyboard_json TEXT, order_idx INTEGER DEFAULT 0);
        CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER UNIQUE, command TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, action TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
    `;
    const statements = schema.split(';').filter(s => s.trim().length > 0);
    const batch = statements.map(s => db.prepare(s));
    await db.batch(batch);
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================
async function getSession(request, env) {
    const cookie = request.headers.get('Cookie') || '';
    const token = cookie.split(';').find(c => c.trim().startsWith('session='));
    if (!token) return null;
    const sessionToken = token.split('=')[1].trim();
    if (!sessionToken) return null;

    await initializeDatabase(env.DB);
    const result = await env.DB.prepare('SELECT token FROM sessions WHERE token = ? AND created_at > datetime("now", "-1 day")')
        .bind(sessionToken)
        .first();
    if (!result) return null;
    return sessionToken;
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
    if (sessionToken) {
        await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(sessionToken).run();
    }
}

// ============================================================================
// PUBLIC API HANDLERS
// ============================================================================
async function getStatus(env) {
    if (!env.DB) return Response.json({ d1_bound: false });
    try {
        await initializeDatabase(env.DB);
        const adminPass = await env.DB.prepare("SELECT value FROM settings WHERE key = 'admin_password'").first();
        const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
        const envPass = env.ADMIN_PASS || null;
        return Response.json({
            d1_bound: true,
            admin_password_set: !!adminPass || !!envPass,
            tg_configured: !!tokenRecord
        });
    } catch (e) {
        return Response.json({ d1_bound: false });
    }
}

async function handleSetup(request, env) {
    if (!env.DB) return Response.json({ error: 'D1 not available' }, { status: 500 });
    await initializeDatabase(env.DB);

    const envPass = env.ADMIN_PASS || null;
    if (envPass) {
        // env var takes precedence, but we still store in D1 as fallback
    }

    const existing = await env.DB.prepare("SELECT value FROM settings WHERE key = 'admin_password'").first();
    if (existing && !envPass) {
        return Response.json({ error: 'Admin password already set. Please login.' }, { status: 400 });
    }

    const body = await request.json();
    const { botToken, adminPassword } = body;
    if (!adminPassword || adminPassword.length < 6) {
        return Response.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    await env.DB.prepare(`
        INSERT INTO settings (key, value) VALUES ('admin_password', ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `).bind(adminPassword).run();

    if (botToken) {
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        const tgData = await tgRes.json();
        if (!tgData.ok) {
            return Response.json({ error: 'Invalid bot token' }, { status: 400 });
        }
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('bot_token', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(botToken).run();

        const webhookUrl = `${new URL(request.url).origin}/webhook`;
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('webhook_url', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(webhookUrl).run();

        await fetch(`https://api.telegram.org/bot${botToken}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
    }

    return Response.json({ success: true });
}

async function handleLogin(request, env) {
    if (!env.DB) return Response.json({ error: 'D1 not available' }, { status: 500 });
    await initializeDatabase(env.DB);

    const body = await request.json();
    const { password } = body;
    if (!password) {
        return Response.json({ error: 'Password required' }, { status: 400 });
    }

    // Check env var first
    const envPass = env.ADMIN_PASS || null;
    if (envPass && envPass === password) {
        const token = crypto.randomUUID();
        await env.DB.prepare('INSERT INTO sessions (token) VALUES (?)').bind(token).run();
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                'Set-Cookie': `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
                'Content-Type': 'application/json'
            }
        });
    }

    // Fallback to D1
    const stored = await env.DB.prepare("SELECT value FROM settings WHERE key = 'admin_password'").first();
    if (!stored || stored.value !== password) {
        return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = crypto.randomUUID();
    await env.DB.prepare('INSERT INTO sessions (token) VALUES (?)').bind(token).run();

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            'Set-Cookie': `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
            'Content-Type': 'application/json'
        }
    });
}

async function handleLogout(request, env) {
    await deleteSession(request, env);
    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            'Set-Cookie': 'session=; Path=/; Max-Age=0',
            'Content-Type': 'application/json'
        }
    });
}

// NEW: version info with release date, notes, and worker_url
async function getVersionInfo(env) {
    const current = VERSION;
    let latest = null;
    let released = null;
    let notes = null;
    let workerUrl = null;
    try {
        const res = await fetch('https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/version.json');
        if (res.ok) {
            const data = await res.json();
            latest = data.version || null;
            released = data.released || null;
            notes = data.notes || null;
            workerUrl = data.worker_url || null;
        } else {
            // Fallback: parse worker.js for VERSION constant
            const workerRes = await fetch('https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/worker.js');
            if (workerRes.ok) {
                const text = await workerRes.text();
                const match = text.match(/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);
                if (match) latest = match[1];
            }
        }
    } catch (e) {
        // ignore
    }
    return Response.json({ current, latest, released, notes, worker_url: workerUrl });
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
// SETTINGS API (extended with CF token)
// ============================================================================
async function getSettings(env, originUrl) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        await initializeDatabase(env.DB);
        const token = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
        const webhook = await env.DB.prepare("SELECT value FROM settings WHERE key = 'webhook_url'").first();
        const cfToken = await env.DB.prepare("SELECT value FROM settings WHERE key = 'cf_api_token'").first();
        const cfAccount = await env.DB.prepare("SELECT value FROM settings WHERE key = 'cf_account_id'").first();
        const cfScript = await env.DB.prepare("SELECT value FROM settings WHERE key = 'cf_script_name'").first();
        return Response.json({
            bot_token: token ? token.value : '',
            webhook_url: webhook ? webhook.value : `${originUrl}/webhook`,
            cf_token: cfToken ? cfToken.value : '',
            cf_account_id: cfAccount ? cfAccount.value : '',
            cf_script_name: cfScript ? cfScript.value : ''
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

async function changeAdminPassword(request, env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const body = await request.json();
        const { newPassword } = body;
        if (!newPassword || newPassword.length < 6) {
            return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        }
        await initializeDatabase(env.DB);
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('admin_password', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(newPassword).run();
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
// UPDATE / SELF-UPDATE
// ============================================================================
async function validateCloudflareToken(request, env) {
    try {
        const body = await request.json();
        const token = body.token;
        if (!token) {
            return Response.json({ valid: false, error: 'Token required' }, { status: 400 });
        }
        // Verify token
        const verifyRes = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || !verifyData.success) {
            return Response.json({ valid: false, error: 'Invalid or expired token' }, { status: 401 });
        }

        // List accounts
        const accountsRes = await fetch('https://api.cloudflare.com/client/v4/accounts', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const accountsData = await accountsRes.json();
        if (!accountsData.success || !Array.isArray(accountsData.result) || accountsData.result.length === 0) {
            return Response.json({ valid: false, error: 'No accounts found for this token' }, { status: 403 });
        }

        // Auto‑detect account: use the first account
        const account = accountsData.result[0];
        const accountId = account.id;

        // Auto‑detect script name from host (if workers.dev)
        const host = new URL(request.url).hostname;
        let scriptName = null;
        if (host.endsWith('.workers.dev')) {
            const parts = host.split('.');
            if (parts.length >= 3) scriptName = parts[0];
        }

        // If not found, try to list workers and find the one that has a route matching the host
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

        // If still not found, fallback to first script in list
        if (!scriptName) {
            const scriptsRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const scriptsData = await scriptsRes.json();
            if (scriptsData.success && Array.isArray(scriptsData.result) && scriptsData.result.length > 0) {
                scriptName = scriptsData.result[0].id;
            }
        }

        // Store token, account, script in D1 for future use
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('cf_api_token', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(token).run();
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('cf_account_id', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(accountId).run();
        if (scriptName) {
            await env.DB.prepare(`
                INSERT INTO settings (key, value) VALUES ('cf_script_name', ?)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value
            `).bind(scriptName).run();
        }

        return Response.json({
            valid: true,
            accountId,
            scriptName: scriptName || null
        });
    } catch (e) {
        return Response.json({ valid: false, error: e.message }, { status: 500 });
    }
}

async function performUpdate(request, env) {
    try {
        const body = await request.json();
        const { token, accountId, scriptName, workerUrl } = body;
        if (!token || !accountId || !scriptName) {
            return Response.json({ success: false, error: 'Token, Account ID, and Script Name required' }, { status: 400 });
        }

        // Re‑verify token
        const verifyRes = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || !verifyData.success) {
            return Response.json({ success: false, error: 'Invalid token' }, { status: 401 });
        }

        // Get current script settings to preserve bindings
        const settingsRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${scriptName}/settings`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const settingsData = await settingsRes.json();
        let bindings = [];
        if (settingsData.success && settingsData.result && settingsData.result.bindings) {
            bindings = settingsData.result.bindings;
        }

        // Download the new worker script from the provided workerUrl (or fallback)
        let scriptUrl = workerUrl || 'https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/worker.js';
        const scriptRes = await fetch(scriptUrl);
        if (!scriptRes.ok) {
            return Response.json({ success: false, error: 'Failed to download worker script from ' + scriptUrl }, { status: 500 });
        }
        const scriptText = await scriptRes.text();

        // Extract version from downloaded script (optional, for info)
        let newVersion = null;
        const match = scriptText.match(/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);
        if (match) newVersion = match[1];

        // Prepare upload metadata with bindings
        const metadata = {
            main_module: 'worker.js',
            bindings: bindings
        };
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
            const errMsg = uploadData.errors && uploadData.errors[0] && uploadData.errors[0].message || 'Upload failed';
            return Response.json({ success: false, error: errMsg }, { status: uploadRes.status });
        }

        // Store update version
        if (newVersion) {
            await env.DB.prepare(`
                INSERT INTO settings (key, value) VALUES ('last_update_version', ?)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value
            `).bind(newVersion).run();
        }

        return Response.json({ success: true, version: newVersion || 'unknown' });
    } catch (e) {
        return Response.json({ success: false, error: e.message }, { status: 500 });
    }
}

// ============================================================================
// TELEGRAM BOT ENGINE (unchanged)
// ============================================================================
async function handleTelegramWebhook(request, env) {
    if (!env.DB) return new Response('DB not available', { status: 500 });

    const update = await request.json();
    const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
    if (!tokenRecord || !tokenRecord.value) {
        console.error('Bot token not set');
        return new Response('Token not set', { status: 500 });
    }
    const BOT_TOKEN = tokenRecord.value;

    try {
        // Handle message
        if (update.message && update.message.text) {
            const msg = update.message;
            const chatId = msg.chat.id;
            const text = msg.text.trim();
            const userId = msg.from.id;

            // Register user
            await env.DB.prepare(`
                INSERT INTO users (id, username, first_name) VALUES (?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET last_active = CURRENT_TIMESTAMP
            `).bind(userId, msg.from.username || '', msg.from.first_name || '').run();

            let targetCommand = null;

            // Check for "Back" (navigate to parent)
            if (text === "Back") {
                const session = await env.DB.prepare("SELECT command FROM sessions WHERE user_id = ?").bind(userId).first();
                if (session && session.command) {
                    const parentCmd = await env.DB.prepare("SELECT parent FROM commands WHERE command = ?").bind(session.command).first();
                    if (parentCmd && parentCmd.parent) {
                        targetCommand = parentCmd.parent;
                    }
                }
            } else {
                // Check reply keyboard buttons
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

                // If not found and starts with '/', look for command
                if (!targetCommand && text.startsWith('/')) {
                    const cmdRecord = await env.DB.prepare("SELECT command FROM commands WHERE command = ? AND enabled = 1").bind(text).first();
                    if (cmdRecord) targetCommand = cmdRecord.command;
                }
            }

            // Execute found command
            if (targetCommand) {
                const cmdRecord = await env.DB.prepare("SELECT * FROM commands WHERE command = ? AND enabled = 1").bind(targetCommand).first();
                if (cmdRecord) {
                    await executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env);
                    return new Response('OK', { status: 200 });
                }
            }

            // Fallback: if command is /start and not found, show default
            if (text === '/start') {
                await sendDefaultStart(chatId, env, BOT_TOKEN);
                return new Response('OK', { status: 200 });
            }

            // No command matched
            await sendMessage(chatId, "Command not found. Use /start to see available options.", BOT_TOKEN);
            return new Response('OK', { status: 200 });
        }

        // Handle callback query
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

async function sendDefaultStart(chatId, env, BOT_TOKEN) {
    let botName = "Nyxx Bot";
    try {
        const nameRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMyName`);
        const nameData = await nameRes.json();
        if (nameData.ok && nameData.result.name) botName = nameData.result.name;
    } catch(e) {}

    let dashboardUrl = "https://dash.cloudflare.com";
    try {
        const webhookSetting = await env.DB.prepare("SELECT value FROM settings WHERE key = 'webhook_url'").first();
        if (webhookSetting && webhookSetting.value) {
            dashboardUrl = webhookSetting.value.replace(/\/webhook$/, '');
        }
    } catch(e) {}

    const text = `👋 Welcome to <b>${botName}</b>!\n\n` +
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

async function executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env) {
    await env.DB.prepare(`
        INSERT INTO sessions (user_id, command, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id) DO UPDATE SET command = excluded.command, updated_at = CURRENT_TIMESTAMP
    `).bind(userId, cmdRecord.command).run();

    if (cmdRecord.is_admin_only) {
        const user = await env.DB.prepare("SELECT role FROM users WHERE id = ?").bind(userId).first();
        if (!user || user.role !== 'admin') {
            await sendMessage(chatId, "⚠️ Unauthorized.", BOT_TOKEN);
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

async function sendMessage(chatId, text, BOT_TOKEN) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
        })
    });
}
