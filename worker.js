// ============================================================================
// GLOBAL VERSION
// ============================================================================
const VERSION = '2.3.1';

// ============================================================================
// EMBEDDED DASHBOARD HTML (with updated AI tab)
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
        /* (styles unchanged) */
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
            align-items: center;
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
            align-items: center;
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
        .logout-btn:hover {
            background: #dc2626;
            color: white;
        }
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
        .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.25rem;
        }
        .form-label .hint {
            font-weight: 400;
            color: #94a3b8;
            font-size: 0.75rem;
            display: block;
        }
        .form-input, .form-textarea {
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 0.6rem 0.75rem;
            color: #f1f5f9;
            width: 100%;
            font-family: system-ui, sans-serif;
            font-size: 0.9rem;
        }
        .form-input:focus, .form-textarea:focus {
            border-color: #3b82f6;
            outline: none;
        }
        .form-textarea {
            min-height: 80px;
            resize: vertical;
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
        .tab-btn.active {
            border-bottom-color: #60a5fa;
            color: white;
        }
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
        .mobile-tabs button.active {
            background: #334155;
            color: white;
        }
        @media (max-width: 800px) {
            .tabs-header { display: none; }
            .hamburger { display: block; }
        }
        @media (max-width: 490px) {
            .update-banner-btn { font-size: 0.6rem !important; }
            .panel {
                padding: 1rem !important;
            }
            .navbar {
                padding: 0.5rem;
            }
            .status-items {
                gap: 0.5rem;
            }
            #logo-header {
                height: 40px;
            }
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
        .tree-actions button:hover {
            background: #334155;
            color: white;
        }
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
        .breadcrumb-link {
            color: #60a5fa;
            cursor: pointer;
        }
        .breadcrumb-link:hover { text-decoration: underline; }
        .breadcrumb-current { color: #e2e8f0; }
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
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }
        .modal-scroll {
            flex: 1;
            overflow-y: auto;
            padding-right: 4px;
        }
        .modal-scroll::-webkit-scrollbar { width: 6px; }
        .modal-scroll::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 4px;
        }
        .modal-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .modal-title .enabled-toggle {
            font-size: 1.5rem;
            cursor: pointer;
            transition: 0.2s;
            padding: 0 0.25rem;
            user-select: none;
        }
        .modal-title .enabled-toggle:hover { transform: scale(1.15); }
        .modal-title .enabled-toggle.on { color: #4ade80; }
        .modal-title .enabled-toggle.off { color: #f87171; }
        .modal-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
            padding-top: 0.75rem;
            border-top: 1px solid #334155;
            justify-content: center;
            flex-shrink: 0;
            background: #1e293b;
            position: sticky;
            bottom: 0;
            z-index: 5;
            padding-bottom: 0.25rem;
        }
        .modal-error {
            color: #f87171;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: none;
        }
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
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .footer {
            text-align: center;
            padding: 1.25rem 0 0.625rem;
            border-top: 1px solid #334155;
            margin-top: 2rem;
            font-size: 0.875rem;
            color: #94a3b8;
        }
        .footer .brand {
            font-weight: 600;
            color: #60a5fa;
        }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
            background: #0085f1;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover { background: #b30000; }

        .button-chip-list {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            min-height: 30px;
            padding: 0.25rem 0;
        }
        .button-chip {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 6px;
            padding: 0.4rem 0.6rem;
            font-size: 0.85rem;
            cursor: grab;
            transition: background 0.15s, border-color 0.15s;
            width: 100%;
        }
        .button-chip:hover {
            background: #1a2332;
            border-color: #475569;
        }
        .button-chip.dragging {
            opacity: 0.4;
            border-color: #60a5fa;
        }
        .button-chip.drag-over {
            border-color: #60a5fa;
            background: #1e293b;
            box-shadow: 0 0 0 2px #3b82f6;
        }
        .button-chip .chip-text {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .button-chip .chip-badge {
            font-size: 0.65rem;
            color: #94a3b8;
            background: #1e293b;
            padding: 0.1rem 0.5rem;
            border-radius: 4px;
            flex-shrink: 0;
        }
        .button-chip .chip-delete {
            color: #f87171;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            padding: 0 0.2rem;
            flex-shrink: 0;
        }
        .button-chip .chip-delete:hover { color: #ef4444; }
        .button-chip .chip-grip {
            color: #475569;
            font-size: 0.85rem;
            cursor: grab;
            flex-shrink: 0;
        }
        .button-chip .chip-edit {
            color: #60a5fa;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 0.9rem;
            padding: 0 0.2rem;
            flex-shrink: 0;
        }
        .button-chip .chip-edit:hover { color: #93c5fd; }

        .update-banner-btn {
            background: #22c55e;
            color: #0f172a;
            border: none;
            border-radius: 20px;
            padding: 0.3rem 0.9rem;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            transition: 0.2s;
            white-space: nowrap;
        }
        .update-banner-btn:hover {
            background: #16a34a;
            transform: scale(1.03);
        }
        .update-banner-btn i { font-size: 0.85rem; }

        .inline-toggle-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.5rem;
        }
        .inline-toggle-row .form-label { margin: 0; }
        .menu-hint {
            background: #0f172a;
            border-radius: 8px;
            padding: 0.6rem 0.9rem;
            font-size: 0.8rem;
            color: #94a3b8;
            border: 1px solid #334155;
            margin-bottom: 0.75rem;
            margin-top: 0.75rem;
        }
        .menu-hint code {
            background: #1e293b;
            padding: 0.1rem 0.4rem;
            border-radius: 4px;
            color: #60a5fa;
            font-size: 0.8rem;
        }
        .menu-hint .example { color: #e2e8f0; }

        #loading-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15,23,42,0.85);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(4px);
            transition: opacity 0.2s;
        }
        #loading-overlay.hidden { display: none; }
        .loading-spinner {
            width: 56px;
            height: 56px;
            border: 6px solid #334155;
            border-top: 6px solid #3b82f6;
            border-radius: 50%;
            animation: spin 0.9s linear infinite;
        }
        .loading-text {
            margin-top: 1.5rem;
            font-size: 1.1rem;
            color: #e2e8f0;
            letter-spacing: 0.5px;
        }

        /* AI Tab specific styles */
        .ai-section {
            background: #0f172a;
            border-radius: 12px;
            padding: 1rem 1.25rem;
            border: 1px solid #334155;
            margin-bottom: 1.5rem;
        }
        .ai-actions-fixed {
        position:fixed;
        left:0;
        right:0;
        bottom:0;
        z-index:999;

        display:flex;
        justify-content:center;

        padding:12px;

        background:#0f172a;
        border-top:1px solid #334155;
        margin: 0;
        }
        .ai-section-title {
            font-size: 1rem;
            font-weight: 600;
            color: #60a5fa;
            margin: 0 0 0.75rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .ai-field-hint {
            font-size: 0.75rem;
            color: #64748b;
            margin-top: 0.15rem;
        }
        .ai-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
        }
        .knowledge-base-item {
            background: #1e293b;
            border-radius: 8px;
            padding: 0.75rem;
            border: 1px solid #334155;
            margin-bottom: 0.5rem;
        }
        .knowledge-base-item .form-group { margin-bottom: 0.5rem; }
        .knowledge-base-item .form-group:last-child { margin-bottom: 0; }
        .kb-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }
        .kb-header .toggle { width: 32px; height: 18px; }
        .kb-header .toggle .slider { width: 14px; height: 14px; }
        .kb-header .toggle.active .slider { transform: translateX(14px); }

        .dropdown-menu {
            position: relative;
            display: inline-block;
        }
        .dropdown-content {
    display: none;
    position: absolute;
    left: 0;
    bottom: 100%;
    background-color: #1e293b;
    min-width: 160px;
    box-shadow: 0 -6px 16px rgba(0, 0, 0, 0.6);
    border: 1px solid #334155;
    border-radius: 8px;
    z-index: 1;
    padding: 0.25rem 0;
        }
        .dropdown-content.show { display: block; }
        .dropdown-content button {
            background: none;
            border: none;
            color: #e2e8f0;
            padding: 0.5rem 1rem;
            text-align: left;
            width: 100%;
            cursor: pointer;
            font-size: 0.875rem;
        }
        .dropdown-content button:hover { background: #334155; }

        .provider-hint {
            font-size: 0.7rem;
            color: #94a3b8;
            margin-top: 0.2rem;
        }
        .provider-hint a { color: #60a5fa; text-decoration: underline; }
        .test-result { font-size: 0.875rem; margin-left: 0.5rem; }
        .test-result.success { color: #4ade80; }
        .test-result.error { color: #f87171; }
        .test-result.partial { color: #fbbf24; }

        /* New memory indicator */
        .memory-indicator {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: #0f172a;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            border: 1px solid #334155;
            margin-top: 0.5rem;
        }
        .memory-indicator .count {
            font-weight: 600;
            color: #60a5fa;
        }
    </style>
</head>
<body>
    <!-- Loading Overlay -->
    <div id="loading-overlay" class="hidden">
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading…</div>
    </div>

    <nav class="navbar" id="navbar">
        <div class="navbar-inner">
            <h1 class="navbar-title">
                <img src="https://raw.githubusercontent.com/Mahan07dev/Nyxx/refs/heads/main/logo.webp" alt="Logo" height="50px" id="logo-header">
                Nyxx
                <button class="info-btn" onclick="showInfoModal()" title="About Nyxx"><i class="fa-solid fa-question"></i></button>
                <button id="logout-btn" class="logout-btn hidden" onclick="logout()"><i class="fa-solid fa-sign-out-alt"></i></button>
            </h1>
            <div class="navbar-actions">
                <div class="status-items" id="status-items">
                    <span id="status-d1"><i class="fa-solid fa-database"></i> D1: Unbound</span>
                    <span id="status-tg"><i class="fa-brands fa-telegram"></i> Bot: Unlinked</span>
                </div>
                <button id="update-banner-btn" class="update-banner-btn hidden" onclick="switchTab('update')">
                    <i class="fa-solid fa-arrow-up"></i> Update Available
                </button>
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
                <button class="tab-btn" onclick="switchTab('ai')"><i class="fa-solid fa-robot"></i> AI</button>
                <button class="tab-btn" onclick="switchTab('settings')"><i class="fa-solid fa-gear"></i> Settings</button>
                <button class="tab-btn" onclick="switchTab('botinfo')"><i class="fa-solid fa-circle-info"></i> Bot Info</button>
                <button class="tab-btn" onclick="switchTab('update')"><i class="fa-solid fa-arrow-up"></i> Update</button>
            </div>
            <div class="hamburger" id="hamburger-btn" onclick="toggleHamburger()"><i class="fa-solid fa-bars hamburgerfa" id="hamburgerfa"></i> Menu</div>
            <div id="mobile-tabs" class="mobile-tabs">
                <button class="active" onclick="switchTab('commands'); closeHamburger();"><i class="fa-solid fa-list-ul"></i> Commands</button>
                <button onclick="switchTab('menu'); closeHamburger();"><i class="fa-solid fa-bars"></i> Menu</button>
                <button onclick="switchTab('users'); closeHamburger();"><i class="fa-solid fa-users"></i> Users</button>
                <button onclick="switchTab('ai'); closeHamburger();"><i class="fa-solid fa-robot"></i> AI</button>
                <button onclick="switchTab('settings'); closeHamburger();"><i class="fa-solid fa-gear"></i> Settings</button>
                <button onclick="switchTab('botinfo'); closeHamburger();"><i class="fa-solid fa-circle-info"></i> Bot Info</button>
                <button onclick="switchTab('update'); closeHamburger();"><i class="fa-solid fa-arrow-up"></i> Update</button>
            </div>
            <div id="tab-commands" class="tab-content active">
                <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
                    <h3 class="panel-title">Commands</h3>
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
                    <h3 class="panel-title">Telegram Menu Commands</h3>
                    <button onclick="addMenuCommandRow()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> Add Entry</button>
                </div>
                <div class="menu-hint">
                    <i class="fa-regular fa-lightbulb" style="margin-right:0.4rem;"></i>
                    Commands appear in the bot's menu. Use lowercase, no slash. Examples:
                    <span class="example"><code>start</code>, <code>help</code>, <code>support</code></span>.
                    <strong>start</strong> is fixed and cannot be removed.
                </div>
                <div id="menu-commands-container" class="panel" style="display:flex; flex-direction:column; gap:0.5rem;"></div>
                <button onclick="publishMenuCommands()" class="btn btn-success" style="margin-top:1rem;"><i class="fa-solid fa-cloud-arrow-up"></i> Publish to Telegram</button>
                <div id="menu-publish-result" class="hidden" style="margin-top:0.5rem; font-size:0.875rem;"></div>
            </div>
            <div id="tab-users" class="tab-content">
                <h3 class="panel-title">Users Who Have Interacted</h3>
                <div class="flex gap-2" style="margin-bottom:1rem;flex-wrap: nowrap;">
                    <input id="user-search" placeholder="Search by username or name..." class="form-input">
                    <button onclick="loadUsers()" class="btn btn-gray btn-sm"><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div id="users-list" class="panel"></div>
            </div>
            <!-- ============================================================== -->
            <!-- AI TAB - UPDATED                                               -->
            <!-- ============================================================== -->
            <div id="tab-ai" class="tab-content">
                <h3 class="panel-title"><i class="fa-solid fa-robot"></i> AI Configuration</h3>
                <div class="panel" style="display:flex; flex-direction:column; gap:1.5rem;">

                    <!-- BASIC ENABLE -->
                    <div class="ai-section">
                        <div class="ai-section-title"><i class="fa-solid fa-power-off"></i> Enable AI</div>
                        <div class="inline-toggle-row" style="justify-content: space-between; background: #0f172a; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #334155;">
                            <div>
                                <strong style="font-size:1rem; color:#e2e8f0;">Enable AI Replies</strong>
                                <p class="text-sm" style="margin:0.25rem 0 0 0;">Turn AI auto-responses on or off for your bot.</p>
                            </div>
                            <div id="ai-toggle" class="toggle" onclick="toggleAiEnabled()"><span class="slider"></span></div>
                        </div>
                    </div>

                    <!-- PROVIDER & API SETTINGS (Main + Alt) -->
                    <div class="ai-section">
                        <div class="ai-section-title"><i class="fa-solid fa-key"></i> Provider & API Keys</div>
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
                                <div class="provider-hint" id="main-provider-hint"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Main API Key</label>
                                <input type="password" id="ai-api-key" class="form-input" placeholder="Enter Main API Key">
                                <div class="provider-hint">Get your API key from the provider's website.</div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Main Model</label>
                                <input type="text" id="ai-model" class="form-input" placeholder="e.g. gpt-4o-mini">
                                <div class="provider-hint" id="main-model-hint">Autofilled with recommended free model.</div>
                            </div>
                            <div class="form-group" id="main-base-url-group" style="display:none;">
                                <label class="form-label">Base URL (Custom)</label>
                                <input type="text" id="ai-base-url" class="form-input" placeholder="https://api.your-provider.com/v1">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Main Custom Headers (JSON)</label>
                                <input type="text" id="ai-custom-headers" class="form-input" placeholder='{"X-Custom-Header": "value"}'>
                            </div>
                        </div>

                        <hr style="border-color:#334155; margin:1rem 0;">

                        <div class="ai-grid">
                            <div class="form-group">
                                <label class="form-label">Alternate Provider (Backup)</label>
                                <select id="ai-alt-provider" class="form-input" onchange="onAiProviderChange('alt')">
                                    <option value="none">None (Disabled)</option>
                                    <option value="openai">OpenAI</option>
                                    <option value="gemini">Gemini</option>
                                    <option value="deepseek">DeepSeek</option>
                                    <option value="groq">Groq</option>
                                    <option value="openrouter">OpenRouter</option>
                                    <option value="ollama">Ollama</option>
                                    <option value="custom">Custom (OpenAI-Compatible)</option>
                                </select>
                                <div class="provider-hint" id="alt-provider-hint"></div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Alternate API Key</label>
                                <input type="password" id="ai-alt-api-key" class="form-input" placeholder="Enter Backup API Key">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Alternate Model</label>
                                <input type="text" id="ai-alt-model" class="form-input" placeholder="e.g. gpt-3.5-turbo">
                                <div class="provider-hint" id="alt-model-hint">Autofilled with recommended free model.</div>
                            </div>
                            <div class="form-group" id="alt-base-url-group" style="display:none;">
                                <label class="form-label">Base URL (Custom)</label>
                                <input type="text" id="ai-alt-base-url" class="form-input" placeholder="https://api.your-provider.com/v1">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Alternate Custom Headers (JSON)</label>
                                <input type="text" id="ai-alt-custom-headers" class="form-input" placeholder='{"X-Custom-Header": "value"}'>
                            </div>
                        </div>

                        <div style="margin-top:0.75rem; display:flex; flex-wrap:wrap; gap:0.5rem; align-items:center;">
                            <button type="button" onclick="testAiConnection()" class="btn btn-gray btn-sm"><i class="fa-solid fa-plug"></i> Test Connections</button>
                            <span id="ai-test-result" class="test-result"></span>
                        </div>
                    </div>

                    <!-- RESPONSE SETTINGS (removed format dropdown) -->
                    <div class="ai-section">
                        <div class="ai-section-title"><i class="fa-solid fa-comment-dots"></i> Response Settings</div>
                        <div class="ai-grid">
                            <div class="form-group">
                                <label class="form-label">Display Name <span class="text-sm">(e.g., Assistant)</span></label>
                                <input type="text" id="ai-display-name" class="form-input" placeholder="e.g., Assistant / Support AI">
                                <span class="ai-field-hint">Used in system prompt as {{bot_name}}.</span>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Language</label>
                                <select id="ai-language" class="form-input">
                                    <option value="auto">Auto Detect User Language</option>
                                    <option value="english">English</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="french">French</option>
                                    <option value="german">German</option>
                                    <option value="persian">Persian (Farsi)</option>
                                    <option value="arabic">Arabic</option>
                                    <option value="russian">Russian</option>
                                </select>
                                <span class="ai-field-hint">Prefer language for responses.</span>
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
                                <span class="ai-field-hint">Tone of the AI.</span>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Reply Length</label>
                                <select id="ai-length" class="form-input">
                                    <option value="very_short">Very Short (~1-2 lines)</option>
                                    <option value="short">Short (~3-5 lines)</option>
                                    <option value="medium" selected>Medium (~6-10 lines)</option>
                                    <option value="detailed">Detailed (~10-20 lines)</option>
                                </select>
                                <span class="ai-field-hint">Length of responses (recommended: Medium).</span>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Temperature <span class="text-sm">(0.0–2.0)</span></label>
                                <input type="number" id="ai-temperature" class="form-input" placeholder="0.7" step="0.1" min="0" max="2" value="0.7">
                                <span class="ai-field-hint">Higher = more creative, lower = more deterministic. Recommended: 0.7</span>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Max Tokens</label>
                                <input type="number" id="ai-max-tokens" class="form-input" placeholder="1024" step="1" min="1" value="1024">
                                <span class="ai-field-hint">Maximum length of response. Recommended: 1024</span>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Top‑P</label>
                                <input type="number" id="ai-top-p" class="form-input" placeholder="1.0" step="0.1" min="0" max="1" value="1.0">
                                <span class="ai-field-hint">Nucleus sampling. 1.0 = no filtering. Recommended: 1.0</span>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Fallback Message</label>
                                <textarea id="ai-fallback" class="form-textarea" rows="3" placeholder="Custom message on API error" style="resize:vertical;">Sorry, I am currently unavailable. Please try again later.</textarea>
                                <span class="ai-field-hint">Shown when AI API fails.</span>
                            </div>
                        </div>
                    </div>

                    <!-- INSTRUCTIONS & KNOWLEDGE -->
                    <div class="ai-section">
                        <div class="ai-section-title"><i class="fa-solid fa-brain"></i> Instructions & Knowledge</div>
                        <div class="form-group">
                            <label class="form-label">System Prompt (Instructions)</label>
                            <textarea id="ai-system-prompt" class="form-textarea" rows="4" placeholder="You are a helpful assistant for {{company_name}}..."></textarea>
                            <span class="ai-field-hint">Use placeholders like <code>{{bot_name}}</code>, <code>{{user_first_name}}</code>, <code>{{owner_name}}</code>, <code>{{company_name}}</code>, <code>{{website}}</code>, <code>{{phone}}</code>, <code>{{current_time}}</code>. Also <code>{{available_commands}}</code> will be replaced with a list of your bot's command names. You can use <b>HTML</b> tags for formatting (e.g., <b>bold</b>, <i>italic</i>).</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Preset Templates</label>
                            <select id="ai-template-preset" class="form-input" onchange="applyPromptTemplate()">
                                <option value="custom">Custom</option>
                                <option value="assistant">Personal Assistant</option>
                                <option value="support">Customer Support</option>
                                <option value="restaurant">Restaurant & Food</option>
                                <option value="programming">Programming Helper</option>
                                <option value="school">Tutor & Education</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Knowledge Bases</label>
                            <div id="knowledge-bases-container"></div>
                            <button onclick="addKnowledgeBase()" class="btn btn-gray btn-sm" style="margin-top:0.5rem;"><i class="fa-solid fa-plus"></i> Add Knowledge Base</button>
                            <span class="ai-field-hint">Each knowledge base can be toggled on/off. Only enabled ones are used.</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Custom Variables (key=value per line)</label>
                            <textarea id="ai-custom-vars-text" class="form-textarea" rows="2" placeholder="owner_name=Mahan&#10;company_name=My Corp&#10;website=example.com"></textarea>
                            <span class="ai-field-hint">Add one per line, e.g., <code>key=value</code>. These will replace <code>{{key}}</code> in prompts.</span>
                        </div>
                    </div>

                    <!-- TRIGGERS & FILTERS - RESTRUCTURED -->
                    <div class="ai-section">
                        <div class="ai-section-title"><i class="fa-solid fa-filter"></i> Triggers & Filters</div>

                        <!-- General -->
                        <div style="margin-bottom:1rem;">
                            <div class="ai-section-title" style="font-size:0.9rem; margin-bottom:0.5rem;"><i class="fa-solid fa-globe"></i> General</div>
                            <div class="ai-grid">
                                <div class="form-group">
                                    <label class="form-label">AI Trigger</label>
                                    <select id="ai-trigger" class="form-input">
                                        <option value="no_command">Only when no command matches (recommended)</option>
                                        <option value="all_messages">Reply to every text message</option>
                                        <option value="contains_text">Trigger only when message contains specific text</option>
                                    </select>
                                    <span class="ai-field-hint" id="trigger-hint">Determines when the AI should reply.</span>
                                </div>
                                <div class="form-group" id="trigger-contains-group" style="display:none;">
                                    <label class="form-label">Trigger Text</label>
                                    <input type="text" id="ai-trigger-text" class="form-input" placeholder="e.g., 'help' or 'support'">
                                    <span class="ai-field-hint">The AI will reply only if the message contains this text (case-insensitive).</span>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Ignore Prefixes</label>
                                    <input type="text" id="ai-ignore-prefixes" class="form-input" placeholder="/, !, #" value="/, !, #">
                                    <span class="ai-field-hint">Messages starting with these won't trigger AI (comma-separated).</span>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Ignore Messages From Bots</label>
                                    <select id="ai-ignore-bots" class="form-input">
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                    <span class="ai-field-hint">Do not reply to messages sent by other bots.</span>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Ignore Forwarded Messages</label>
                                    <select id="ai-ignore-forwarded" class="form-input">
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                    <span class="ai-field-hint">Do not reply to forwarded messages.</span>
                                </div>
                            </div>
                        </div>

                        <!-- Private Chat Settings -->
                        <div style="margin-bottom:1rem;">
                            <div class="ai-section-title" style="font-size:0.9rem; margin-bottom:0.5rem;"><i class="fa-regular fa-comment"></i> Private Chat Settings</div>
                            <div class="ai-grid">
                                <div class="form-group">
                                    <label class="form-label">Reply in Private Chats</label>
                                    <select id="ai-private-reply" class="form-input">
                                        <option value="1">Yes (reply to all private messages)</option>
                                        <option value="0">No (never reply in private)</option>
                                    </select>
                                    <span class="ai-field-hint">If disabled, the AI will ignore private messages.</span>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Conversation Memory (private)</label>
                                    <select id="ai-memory" class="form-input">
                                        <option value="0">Disabled</option>
                                        <option value="5">Last 5 messages</option>
                                        <option value="10">Last 10 messages</option>
                                        <option value="20">Last 20 messages</option>
                                    </select>
                                    <span class="ai-field-hint">How many previous messages to remember per chat. Recommended: 5–10.</span>
                                </div>
                            </div>
                        </div>

                        <!-- Group Settings -->
                        <div style="margin-bottom:1rem;">
                            <div class="ai-section-title" style="font-size:0.9rem; margin-bottom:0.5rem;"><i class="fa-solid fa-users"></i> Group Settings</div>
                            <div class="ai-grid">
                                <div class="form-group">
                                    <label class="form-label">Reply in Groups / Supergroups</label>
                                    <select id="ai-group-reply" class="form-input">
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                    <span class="ai-field-hint">If disabled, the AI will never reply in groups.</span>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Mention Required in Groups</label>
                                    <select id="ai-group-mention" class="form-input">
                                        <option value="1">Yes (only when tagged/replied to)</option>
                                        <option value="0">No (reply to all group text)</option>
                                    </select>
                                    <span class="ai-field-hint">If yes, the bot must be mentioned (e.g., @bot) or reply to a message.</span>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Conversation Memory (groups)</label>
                                    <select id="ai-group-memory" class="form-input">
                                        <option value="0">Disabled</option>
                                        <option value="5">Last 5 messages</option>
                                        <option value="10">Last 10 messages</option>
                                        <option value="20">Last 20 messages</option>
                                    </select>
                                    <span class="ai-field-hint">Separate memory for group chats.</span>
                                </div>
                            </div>
                        </div>

                        <!-- Performance -->
                        <div>
                            <div class="ai-section-title" style="font-size:0.9rem; margin-bottom:0.5rem;"><i class="fa-solid fa-gauge-high"></i> Performance</div>
                            <div class="ai-grid">
                                <div class="form-group">
                                    <label class="form-label">Rate Limit (per user / minute)</label>
                                    <input type="number" id="ai-rate-limit" class="form-input" placeholder="10" value="10">
                                    <span class="ai-field-hint">Max requests per user per minute. Recommended: 10</span>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Response Delay (ms)</label>
                                    <input type="number" id="ai-response-delay" class="form-input" placeholder="0" value="0" min="0" max="5000">
                                    <span class="ai-field-hint">Artificial delay before sending reply. Recommended: 0 (no delay).</span>
                                </div>
                                <div class="form-group" style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                                    <label class="text-sm"><input type="checkbox" id="ai-typing-indicator" checked> Show Typing Indicator</label>
                                    <label class="text-sm"><input type="checkbox" id="ai-retry-on-failure"> Retry Failed Request Once</label>
                                    <span class="ai-field-hint" style="width:100%;">Typing indicator shows the bot is "typing". Retry may help with temporary API errors.</span>
                                </div>
                            </div>
                        </div>

                        <!-- Memory Indicator -->
                        <div style="margin-top:1rem; border-top:1px solid #334155; padding-top:1rem;">
                            <div style="display:flex; align-items:center; gap:1rem; flex-wrap:wrap;">
                                <span><strong>AI Memory Usage</strong></span>
                                <span id="memory-count-display" class="text-sm">Loading...</span>
                                <button onclick="refreshMemoryCount()" class="btn btn-gray btn-sm"><i class="fa-solid fa-rotate"></i> Refresh</button>
                            </div>
                            <span class="ai-field-hint">Total stored messages across all chats. Older messages may be automatically trimmed based on memory settings.</span>
                        </div>
                    </div>

                    <!-- SUGGESTED QUICK REPLIES (as button list) -->
                    <div class="ai-section">
                        <div class="ai-section-title"><i class="fa-solid fa-list"></i> Suggested Quick Replies</div>
                        <div class="inline-toggle-row">
                            <span class="form-label" style="margin:0;">Show as buttons after AI reply</span>
                            <div id="ai-suggested-toggle" class="toggle" onclick="toggleSuggestedQuestions()"><span class="slider"></span></div>
                        </div>
                        <div id="suggested-questions-editor" style="margin-top:0.5rem;">
                            <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.5rem;">
                                <input id="suggested-q-label" class="form-input" style="flex:2; min-width:150px;" placeholder="Button label">
                                <input id="suggested-q-value" class="form-input" style="flex:2; min-width:150px;" placeholder="Value (text to send)">
                                <button onclick="addSuggestedQuestion()" class="btn btn-primary btn-sm"><i class="fa-solid fa-plus"></i> Add</button>
                            </div>
                            <div id="suggested-questions-list" class="panel" style="padding:0.5rem; min-height:30px;"></div>
                        </div>
                        <span class="ai-field-hint">These buttons will appear as inline keyboard below the AI's response.</span>
                    </div>

                    <!-- PLAYGROUND -->
                    <div class="ai-section">
                        <div class="ai-section-title"><i class="fa-solid fa-vial"></i> Playground <span class="text-sm" style="font-weight:400;color:#94a3b8;">Test your AI configuration in real‑time</span></div>
                        <div id="playground-messages" style="min-height:150px; max-height:300px; overflow-y:auto; display:flex; flex-direction:column; gap:0.5rem; padding:0.5rem; background:#0f172a; border-radius:8px; border:1px solid #334155; margin-bottom:0.75rem;">
                            <div style="font-size:0.8rem; color:#64748b; text-align:center;">Playground started. Send a message below to test.</div>
                        </div>
                        <div style="display:flex; gap:0.5rem;">
                            <input id="playground-input" class="form-input" placeholder="Type a message to test..." onkeydown="if(event.key==='Enter') sendPlaygroundMessage()">
                            <button onclick="sendPlaygroundMessage()" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i></button>
                            <button onclick="clearPlaygroundChat()" class="btn btn-gray" title="Clear chat"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>

                    <!-- MANAGEMENT ACTIONS -->
                    
                </div>
            </div>
            <!-- END AI TAB -->

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
                    <div id="update-cf-section">
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

                <div class="ai-section ai-actions-fixed hidden" id="ai-actions-fixed" style="border-top: 1px solid #334155; padding-top:1rem;">
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem; align-items:center;">
                    <button onclick="saveAiSettings()" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Save Settings</button>
                    <div class="dropdown-menu">
                        <button onclick="toggleMoreOptions()" class="btn btn-gray btn-sm"><i class="fa-solid fa-ellipsis-vertical"></i> More Options</button>
                        <div id="more-options-dropdown" class="dropdown-content">
                            <button onclick="exportAiSettings()"><i class="fa-solid fa-download"></i> Export JSON</button>
                            <button onclick="triggerImportAiSettings()"><i class="fa-solid fa-upload"></i> Import JSON</button>
                            <button onclick="clearAiMemory()"><i class="fa-solid fa-eraser"></i> Clear Memory</button>
                            <button onclick="resetAiSettings()"><i class="fa-solid fa-rotate-left"></i> Reset Defaults</button>
                        </div>
                    </div>
                </div>
                <input type="file" id="ai-import-file" style="display:none;" onchange="importAiSettings(event)">
            </div>

    <!-- MODALS (unchanged) -->
    <div id="command-modal" class="modal-overlay hidden">
        <div class="modal-box">
            <div class="modal-title">
                <span id="command-modal-title">Add Command</span>
                <span id="enabled-toggle-icon" class="enabled-toggle on" onclick="toggleEnabledIcon()" title="Toggle command enabled/disabled">
                    <i class="fa-regular fa-circle-check"></i>
                </span>
            </div>
            <div class="modal-scroll">
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

                <!-- Inline Keyboard Toggle -->
                <div class="inline-toggle-row">
                    <span class="form-label" style="margin:0;">Inline Keyboard</span>
                    <div id="inline-toggle" class="toggle" onclick="toggleInlineKeyboard()"><span class="slider"></span></div>
                </div>
                <div id="inline-keyboard-section" class="hidden" style="margin-bottom:1rem;">
                    <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:6px;">
                        <input id="inline-btn-label" class="form-input" style="flex:1; min-width:140px;" placeholder="Label">
                        <select id="inline-btn-type" class="form-input" style="flex:0 0 auto; width:auto;">
                            <option value="command" selected>Command</option>
                            <option value="callback">Callback</option>
                            <option value="url">URL</option>
                        </select>
                        <input id="inline-btn-value" class="form-input" style="flex:1; min-width:200px;" placeholder="Value/URL">
                        <select id="inline-btn-command-select" class="form-input hidden" style="flex:1; min-width:200px;"><option value="">Select command...</option></select>
                        <button onclick="addInlineButton()" class="btn btn-primary btn-sm" style="flex:1 0 auto;">Add</button>
                    </div>
                    <div id="inline-buttons-list" class="panel" style="padding:0.5rem; min-height:30px;"></div>
                </div>

                <!-- Reply Keyboard Toggle -->
                <div class="form-group">
                    <div style="display:flex; align-items:center; gap:0.75rem;">
                        <span class="form-label" style="margin:0;">Reply Keyboard</span>
                        <div id="reply-toggle" class="toggle" onclick="toggleReplyKeyboard()"><span class="slider"></span></div>
                    </div>
                    <div id="reply-keyboard-section" class="hidden" style="margin-top:0.5rem;">
                        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:6px;">
                            <input id="reply-btn-label" class="form-input" style="flex:1; min-width:150px;" placeholder="Button text">
                            <select id="reply-btn-command" class="form-input" style="flex:1; min-width:150px;"><option value="">Select command...</option></select>
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
                <div id="modal-error" class="modal-error"></div>
            </div>
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
        let cfAccountId = null;
        let cfScriptName = null;
        let latestVersion = null;
        let updateAvailable = false;
        let workerUrl = null;
        let updateChecked = false;
        let updateCheckTimestamp = 0;
        const UPDATE_COOLDOWN_MS = 30 * 60 * 1000;

        // AI specific state
        let knowledgeBases = [];
        let suggestedQuestions = [];

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
                cache[key].loaded = false;
                cache[key].data = null;
                cache[key].timestamp = 0;
            } else {
                Object.keys(cache).forEach(k => {
                    cache[k].loaded = false;
                    cache[k].data = null;
                    cache[k].timestamp = 0;
                });
            }
        }

        // ----- Loading overlay -----
        let loadingCounter = 0;
        let hideTimer = null;

        function showLoading() {
            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
            if (loadingCounter === 0) {
                document.getElementById('loading-overlay').classList.remove('hidden');
            }
            loadingCounter++;
        }

        function hideLoading() {
            loadingCounter--;
            if (loadingCounter === 0) {
                if (hideTimer) clearTimeout(hideTimer);
                hideTimer = setTimeout(() => {
                    document.getElementById('loading-overlay').classList.add('hidden');
                    hideTimer = null;
                }, 300);
            }
        }

        function withLoading(promise) {
            showLoading();
            return promise.finally(hideLoading);
        }

        // ----- Toast -----
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
            } finally {
                hideLoading();
            }
        }

        // ======================================================================
        // SETUP / LOGIN
        // ======================================================================
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
            showLoading();
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
            } finally {
                hideLoading();
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
            showLoading();
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

        function showDashboard() {
            showStep('step-dashboard');
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
            withLoading(
                fetch('/api/status')
                .then(r => r.json())
                .then(data => {
                    document.getElementById('status-d1').innerHTML = data.d1_bound ?
                        '<i class="fa-solid fa-database" style="color:#4ade80;"></i> D1: Bound' :
                        '<i class="fa-solid fa-database"></i> D1: Unbound';
                    document.getElementById('status-tg').innerHTML = data.tg_configured ?
                        '<i class="fa-brands fa-telegram" style="color:#60a5fa;"></i> Bot: Active' :
                        '<i class="fa-brands fa-telegram"></i> Bot: Unlinked';
                })
            );
            loadCommands(true);
            loadMenuCommands(true);
            loadSettings(true);
            autoCheckForUpdate();
        }

        // ======================================================================
        // TABS
        // ======================================================================
        let currentTab = 'commands';

        function switchTab(tabId) {
            currentTab = tabId;
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            const el = document.getElementById('tab-' + tabId);
            if (el) el.classList.add('active');
            const map = { commands: 0, menu: 1, users: 2, ai: 3, settings: 4, botinfo: 5, update: 6 };
            const btns = document.querySelectorAll('.tabs-header .tab-btn');
            btns.forEach((b, i) => b.classList.toggle('active', i === map[tabId]));
            document.querySelectorAll('#mobile-tabs button').forEach((b, i) => {
                b.classList.toggle('active', i === map[tabId]);
            });
            const saveBar = document.getElementById("ai-actions-fixed");

            if (tabId === "ai") {
                saveBar.classList.remove("hidden");
            } else {
                saveBar.classList.add("hidden");
            }
            if (tabId === 'commands') loadCommands();
            else if (tabId === 'menu') loadMenuCommands();
            else if (tabId === 'users') loadUsers();
            else if (tabId === 'ai') { loadAiSettings(); refreshMemoryCount(); }
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

        // ======================================================================
        // COMMANDS (unchanged)
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
                container.innerHTML = '<div style="font-size:0.75rem; color:#64748b; padding:0.25rem 0;">No inline buttons.</div>';
                return;
            }
            var html = '<div class="button-chip-list"><span class="form-label" style="margin:0;">Your current buttons :</span>';
            for (var i = 0; i < inlineButtonsArray.length; i++) {
                var b = inlineButtonsArray[i];
                var icon = b.type === 'url' ? 'fa-link' : (b.type === 'command' ? 'fa-terminal' : 'fa-message');
                html += '<div class="button-chip" draggable="true" data-index="' + i + '" data-type="inline">' +
                    '<span class="chip-grip"><i class="fa-solid fa-grip-lines"></i></span>' +
                    '<i class="fa-solid ' + icon + '" style="color:#60a5fa;"></i>' +
                    '<span class="chip-text">' + escapeHtml(b.text) + '</span>' +
                    '<span class="chip-badge">' + b.type + '</span>' +
                    '<button class="chip-delete" onclick="removeInlineButton(' + i + ')"><i class="fa-regular fa-circle-xmark"></i></button>' +
                    '</div>';
            }
            html += '</div>';
            container.innerHTML = html;
            attachDragEvents(container);
        }

        function renderReplyChips() {
            var container = document.getElementById('reply-buttons-list');
            if (replyButtonsArray.length === 0) {
                container.innerHTML = '<div style="font-size:0.75rem; color:#64748b; padding:0.25rem 0;">No reply buttons.</div>';
                return;
            }
            var html = '<div class="button-chip-list"><span class="form-label" style="margin:0;">Your current buttons :</span>';
            for (var i = 0; i < replyButtonsArray.length; i++) {
                var b = replyButtonsArray[i];
                html += '<div class="button-chip" draggable="true" data-index="' + i + '" data-type="reply">' +
                    '<span class="chip-grip"><i class="fa-solid fa-grip-lines"></i></span>' +
                    '<i class="fa-regular fa-keyboard" style="color:#60a5fa;"></i>' +
                    '<span class="chip-text">' + escapeHtml(b.text) + ' → ' + escapeHtml(b.command) + '</span>' +
                    '<button class="chip-delete" onclick="removeReplyButton(' + i + ')"><i class="fa-regular fa-circle-xmark"></i></button>' +
                    '</div>';
            }
            html += '</div>';
            container.innerHTML = html;
            attachDragEvents(container);
        }

        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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

        function removeInlineButton(index) { inlineButtonsArray.splice(index, 1);
            renderInlineChips(); }

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
            } catch (e) {}
            renderInlineChips();
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

        function removeReplyButton(index) { replyButtonsArray.splice(index, 1);
            renderReplyChips(); }

        function getReplyButtonsJSON() { return JSON.stringify(replyButtonsArray); }

        function loadReplyButtonsFromJSON(json) {
            replyButtonsArray = [];
            if (!json) return;
            try { var arr = JSON.parse(json); if (Array.isArray(arr)) replyButtonsArray = arr; } catch (e) {}
            renderReplyChips();
        }

        function attachDragEvents(container) {
            var chips = container.querySelectorAll('.button-chip[draggable="true"]');
            for (var i = 0; i < chips.length; i++) {
                chips[i].addEventListener('dragstart', handleDragStart);
                chips[i].addEventListener('dragover', handleDragOver);
                chips[i].addEventListener('drop', handleDrop);
                chips[i].addEventListener('dragend', handleDragEnd);
            }
        }

        function handleDragStart(e) {
            var target = e.target.closest('.button-chip');
            if (!target) return;
            e.dataTransfer.setData('text/plain', JSON.stringify({ type: target.dataset.type, index: parseInt(target.dataset
                    .index) }));
            target.classList.add('dragging');
        }

        function handleDragOver(e) {
            e.preventDefault();
            var target = e.target.closest('.button-chip');
            if (target) target.classList.add('drag-over');
        }

        function handleDrop(e) {
            e.preventDefault();
            var target = e.target.closest('.button-chip');
            if (!target) return;
            target.classList.remove('drag-over');
            var from = JSON.parse(e.dataTransfer.getData('text/plain'));
            if (!from || from.type !== target.dataset.type) return;
            var array = from.type === 'inline' ? inlineButtonsArray : replyButtonsArray;
            var fromIdx = from.index,
                toIdx = parseInt(target.dataset.index);
            if (fromIdx === toIdx) return;
            var item = array.splice(fromIdx, 1)[0];
            array.splice(toIdx, 0, item);
            if (from.type === 'inline') renderInlineChips();
            else renderReplyChips();
        }

        function handleDragEnd(e) {
            var target = e.target.closest('.button-chip');
            if (target) target.classList.remove('dragging', 'drag-over');
        }

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
            rootSpan.addEventListener('click', function(e) { e.stopPropagation();
                navigateToRoot(); });
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
                    span.addEventListener('click', function(e) { e.stopPropagation();
                        navigateTo(seg); });
                } else {
                    span.className = 'breadcrumb-current';
                    span.style.color = '#e2e8f0';
                }
                breadcrumb.appendChild(span);
            }
            upBtn.disabled = (currentParent === null);
            var children = childrenMap[currentParent] || [];
            if (children.length === 0) {
                container.innerHTML =
                    '<div style="padding:1rem; text-align:center; color:#94a3b8; font-size:0.875rem;">This folder is empty.</div>';
                return;
            }
            children.sort(function(a, b) { return (a.order_idx || 0) - (b.order_idx || 0); });
            var listHtml = '';
            for (var j = 0; j < children.length; j++) {
                var cmd = children[j];
                var hasChildren = childrenMap[cmd.command] && childrenMap[cmd.command].length > 0;
                var icon = hasChildren ? '<i class="fa-regular fa-folder" style="color:#60a5fa;"></i>' :
                    '<i class="fa-regular fa-file" style="color:#94a3b8;"></i>';
                var enabled = cmd.enabled !== undefined ? cmd.enabled : 1;
                var adminBadge = cmd.is_admin_only ? '<span class="badge badge-admin">Admin</span>' : '';
                var replyBadge = cmd.show_reply_keyboard ? '<span class="badge badge-reply">Reply</span>' : '';
                var typeBadge = '<span class="badge badge-gray">' + cmd.response_type + '</span>';
                var statusBadge = '<span class="badge ' + (enabled ? 'badge-enabled' : 'badge-disabled') + '">' + (enabled ?
                    'Enabled' : 'Disabled') + '</span>';
                var folderClass = hasChildren ? 'folder' : '';
                var dataAttr = hasChildren ? 'data-command="' + encodeURIComponent(cmd.command) + '"' : '';
                listHtml += '<div class="tree-row" data-command="' + encodeURIComponent(cmd.command) + '">' +
                    '<span style="width:20px;">' + icon + '</span>' +
                    '<span class="tree-command-name ' + folderClass + '" ' + dataAttr + '>' + cmd.command + '</span>' +
                    typeBadge + adminBadge + replyBadge + statusBadge +
                    '<div class="tree-actions">' +
                    '<button class="add-child-btn btn btn-sm btn-primary" data-command="' + encodeURIComponent(cmd
                    .command) + '"><i class="fa-solid fa-plus"></i></button>' +
                    '<button class="edit-btn btn btn-sm btn-gray" data-command="' + encodeURIComponent(cmd.command) +
                    '"><i class="fa-regular fa-pen-to-square"></i></button>' +
                    '<button class="delete-btn btn btn-sm btn-danger" data-command="' + encodeURIComponent(cmd
                    .command) + '"><i class="fa-regular fa-trash-can"></i></button>' +
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

        function loadCommands(forceLoad) {
            var container = document.getElementById('commands-list');
            if (!forceLoad && isCacheValid('commands')) {
                commandsCache = cache.commands.data;
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
                return Promise.resolve();
            }
            return withLoading(
                fetch('/api/commands')
                .then(function(res) { return res.json().then(function(data) { return { status: res.status, data: data }; }); })
                .then(function(result) {
                    if (result.status >= 400) throw new Error(result.data.error || 'Failed');
                    commandsCache = result.data.commands || [];
                    cache.commands.data = commandsCache;
                    cache.commands.loaded = true;
                    cache.commands.timestamp = Date.now();
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
                })
            );
        }

        async function showAddCommandModal(command, parent) {
            await loadCommands();
            editingCommand = command || null;
            var modal = document.getElementById('command-modal');
            document.getElementById('modal-error').classList.remove('show');
            commandEnabled = true;
            populateDropdowns();
            var parentSelect = document.getElementById('modal-parent');
            if (editingCommand) {
                document.getElementById('command-modal-title').innerText = 'Edit Command';
                document.getElementById('modal-command').value = editingCommand.command;
                document.getElementById('modal-type').value = editingCommand.response_type || 'text';
                document.getElementById('modal-content').value = editingCommand.content || '';
                document.getElementById('modal-media').value = editingCommand.media_url || '';
                document.getElementById('modal-admin-only').checked = editingCommand.is_admin_only ? true : false;
                var enabledVal = editingCommand.enabled !== undefined ? (editingCommand.enabled == 1) : true;
                commandEnabled = enabledVal;
                updateEnabledIconUI();
                if (editingCommand.parent) parentSelect.value = editingCommand.parent;
                loadInlineButtonsFromJSON(editingCommand.buttons_json);
                showInlineKeyboard = editingCommand.buttons_json && editingCommand.buttons_json.length > 2 ? true :
                false;
                document.getElementById('inline-toggle').classList.toggle('active', showInlineKeyboard);
                document.getElementById('inline-keyboard-section').classList.toggle('hidden', !showInlineKeyboard);
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
                document.getElementById('modal-save-btn').innerText = 'Add';
            }
            toggleMediaField();
            modal.classList.remove('hidden');
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

        function toggleMediaField() {
            var type = document.getElementById('modal-type').value;
            document.getElementById('media-field').style.display = type === 'photo' ? 'block' : 'none';
        }
        document.getElementById('modal-type').addEventListener('change', toggleMediaField);

        document.getElementById('inline-btn-type').addEventListener('change', function() {
            var type = this.value;
            var valInput = document.getElementById('inline-btn-value');
            var cmdSelect = document.getElementById('inline-btn-command-select');
            if (type === 'command') { valInput.classList.add('hidden');
                cmdSelect.classList.remove('hidden'); } else { valInput.classList.remove('hidden');
                cmdSelect.classList.add('hidden'); }
        });

        function closeCommandModal() { document.getElementById('command-modal').classList.add('hidden');
            editingCommand = null; }

        function saveCommand() {
            var command = document.getElementById('modal-command').value.trim();
            var parent = document.getElementById('modal-parent').value.trim() || null;
            var response_type = document.getElementById('modal-type').value;
            var content = document.getElementById('modal-content').value.trim();
            var media_url = document.getElementById('modal-media').value.trim();
            var is_admin_only = document.getElementById('modal-admin-only').checked ? 1 : 0;
            var enabled = commandEnabled ? 1 : 0;
            var buttons_json = getInlineButtonsJSON();
            var show_reply_keyboard = showReplyKeyboard ? 1 : 0;
            var reply_keyboard_json = getReplyButtonsJSON();
            var errorEl = document.getElementById('modal-error');
            if (!command || !content) { errorEl.innerText = 'Command and content are required.';
                errorEl.classList.add('show'); return; }
            if (response_type === 'photo' && !media_url) { errorEl.innerText = 'Photo URL required.';
                errorEl.classList.add('show'); return; }
            if (parent === command) { errorEl.innerText = 'Cannot be its own parent.';
                errorEl.classList.add('show'); return; }
            var payload = { command, parent, response_type, content, media_url, is_admin_only, enabled, buttons_json,
                show_reply_keyboard, reply_keyboard_json };
            var url = editingCommand ? '/api/commands/' + encodeURIComponent(editingCommand.command) : '/api/commands';
            var method = editingCommand ? 'PUT' : 'POST';
            withLoading(
                fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                .then(function(res) { return res.json().then(function(data) { return { status: res.status, data: data }; }); })
                .then(function(result) {
                    if (result.status >= 400) throw new Error(result.data.error || 'Failed');
                    closeCommandModal();
                    showToast('Command saved!');
                    invalidateCache('commands');
                    loadCommands(true);
                })
                .catch(function(err) { errorEl.innerText = err.message;
                    errorEl.classList.add('show'); })
            );
        }

        function deleteCommand(cmdName) {
            if (!confirm('Delete "' + cmdName + '" and all children? This cannot be undone.')) return;
            withLoading(
                fetch('/api/commands/' + encodeURIComponent(cmdName), { method: 'DELETE' })
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (!data.success) throw new Error(data.error || 'Delete failed');
                    showToast('Deleted.');
                    invalidateCache('commands');
                    if (currentParent === cmdName) navigateUp();
                    else loadCommands(true);
                })
                .catch(function(err) { showToast(err.message, 'error'); })
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
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    menuCommands = data.menu || [];
                    var hasStart = menuCommands.some(function(e) { return e.command === 'start'; });
                    if (!hasStart) {
                        menuCommands.unshift({ command: 'start', description: 'Start the bot' });
                    }
                    cache.menu.data = menuCommands;
                    cache.menu.loaded = true;
                    cache.menu.timestamp = Date.now();
                    renderMenuRows();
                })
                .catch(function(err) { showToast(err.message, 'error'); })
            );
        }

        function renderMenuRows() {
            var container = document.getElementById('menu-commands-container');
            if (menuCommands.length === 0) {
                container.innerHTML = '<p style="color:#94a3b8; font-size:0.875rem;">No menu entries. Add some.</p>';
                return;
            }
            var html = '';
            for (var i = 0; i < menuCommands.length; i++) {
                var entry = menuCommands[i];
                var isStart = entry.command === 'start';
                var deleteBtn = isStart ?
                    '<span style="color:#475569; font-size:0.75rem; margin-left:0.5rem;"><i class="fa-solid fa-lock"></i> fixed</span>' :
                    '<button onclick="removeMenuRow(' + i + ')" style="color:#f87171; background:none; border:none; cursor:pointer;"><i class="fa-regular fa-trash-can"></i></button>';
                html += '<div class="flex gap-2 items-center">' +
                    '<input class="form-input" style="flex:1; font-size:0.875rem;" value="' + entry.command +
                    '" placeholder="Command (no slash)" data-index="' + i + '" ' + (isStart ? 'readonly' : '') + '>' +
                    '<input class="form-input" style="flex:1; font-size:0.875rem;" value="' + entry.description +
                    '" placeholder="Description" data-index="' + i + '">' +
                    deleteBtn +
                    '</div>';
            }
            container.innerHTML = html;
        }

        function addMenuCommandRow() { menuCommands.push({ command: '', description: '' });
            renderMenuRows(); }

        function removeMenuRow(index) {
            var entry = menuCommands[index];
            if (entry && entry.command === 'start') {
                showToast('Cannot remove the fixed "start" command.', 'error');
                return;
            }
            menuCommands.splice(index, 1);
            renderMenuRows();
        }

        function publishMenuCommands() {
            var inputs = document.querySelectorAll('#menu-commands-container input[data-index]');
            var updated = [];
            for (var i = 0; i < inputs.length; i += 2) {
                var cmd = inputs[i].value.trim().toLowerCase();
                var desc = inputs[i + 1] ? inputs[i + 1].value.trim() : '';
                if (cmd && desc) updated.push({ command: cmd, description: desc });
            }
            var hasStart = updated.some(function(e) { return e.command === 'start'; });
            if (!hasStart) {
                updated.unshift({ command: 'start', description: 'Start the bot' });
            }
            if (updated.length === 0) { showToast('Add at least one valid entry.', 'error'); return; }
            var resultDiv = document.getElementById('menu-publish-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Publishing...';
            resultDiv.style.color = '#94a3b8';
            withLoading(
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
                    cache.menu.data = updated;
                    cache.menu.loaded = true;
                    cache.menu.timestamp = Date.now();
                    renderMenuRows();
                })
                .catch(function(err) {
                    resultDiv.innerText = '❌ ' + err.message;
                    resultDiv.style.color = '#f87171';
                })
            );
        }

        // ======================================================================
        // AI SETTINGS (revamped)
        // ======================================================================
        function toggleAiEnabled() {
            aiEnabled = !aiEnabled;
            const toggle = document.getElementById('ai-toggle');
            if (toggle) toggle.classList.toggle('active', aiEnabled);
        }

        function toggleSuggestedQuestions() {
            showSuggestedQuestions = !showSuggestedQuestions;
            const toggle = document.getElementById('ai-suggested-toggle');
            if (toggle) toggle.classList.toggle('active', showSuggestedQuestions);
            document.getElementById('suggested-questions-editor').style.display = showSuggestedQuestions ? 'block' : 'none';
        }

        function onAiProviderChange(type) {
            const providerSelect = document.getElementById(type === 'main' ? 'ai-provider' : 'ai-alt-provider');
            const provider = providerSelect.value;
            const baseUrlGroup = document.getElementById(type === 'main' ? 'main-base-url-group' : 'alt-base-url-group');
            const modelInput = document.getElementById(type === 'main' ? 'ai-model' : 'ai-alt-model');
            const hintEl = document.getElementById(type === 'main' ? 'main-model-hint' : 'alt-model-hint');

            const defaults = {
                openai: { model: 'gpt-4o-mini', baseUrl: 'https://api.openai.com/v1' },
                gemini: { model: 'gemini-1.5-flash', baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/' },
                deepseek: { model: 'deepseek-chat', baseUrl: 'https://api.deepseek.com' },
                groq: { model: 'llama-3.3-70b-versatile', baseUrl: 'https://api.groq.com/openai/v1' },
                openrouter: { model: 'openai/gpt-4o-mini', baseUrl: 'https://openrouter.ai/api/v1' },
                ollama: { model: 'llama3', baseUrl: 'http://localhost:11434/v1' },
                custom: { model: '', baseUrl: '' }
            };

            if (provider === 'custom') {
                baseUrlGroup.style.display = 'block';
            } else {
                baseUrlGroup.style.display = 'none';
            }

            if (defaults[provider] && (!modelInput.value || Object.values(defaults).some(d => d.model === modelInput.value))) {
                modelInput.value = defaults[provider].model;
            }

            // Update hint
            const providerHints = {
                openai: { url: 'https://platform.openai.com/api-keys', label: 'OpenAI' },
                gemini: { url: 'https://ai.google.dev/gemini-api', label: 'Gemini' },
                deepseek: { url: 'https://platform.deepseek.com/api_keys', label: 'DeepSeek' },
                groq: { url: 'https://console.groq.com/keys', label: 'Groq' },
                openrouter: { url: 'https://openrouter.ai/keys', label: 'OpenRouter' },
                ollama: { url: 'https://ollama.com/', label: 'Ollama (local)' },
                custom: { url: '', label: 'Custom' }
            };
            const hint = providerHints[provider] || providerHints.custom;
            const hintContainer = document.getElementById(type === 'main' ? 'main-provider-hint' : 'alt-provider-hint');
            if (hint.url) {
                hintContainer.innerHTML = \`🔑 Get your API key from <a href="\${hint.url}" target="_blank">\${hint.label}</a>\`;
            } else {
                hintContainer.innerHTML = '';
            }

            if (defaults[provider] && defaults[provider].model) {
                hintEl.innerText = \`Recommended free model: \${defaults[provider].model}\`;
            } else {
                hintEl.innerText = '';
            }
        }

        // Knowledge Bases
        function renderKnowledgeBases() {
            const container = document.getElementById('knowledge-bases-container');
            if (knowledgeBases.length === 0) {
                container.innerHTML = '<div style="color:#64748b; font-size:0.875rem;">No knowledge bases added.</div>';
                return;
            }
            let html = '';
            knowledgeBases.forEach((kb, idx) => {
                const enabled = kb.enabled !== undefined ? kb.enabled : true;
                html += \`<div class="knowledge-base-item" data-index="\${idx}">
                            <div class="kb-header">
                                <div class="toggle \${enabled ? 'active' : ''}" onclick="toggleKnowledgeBase(\${idx})"><span class="slider"></span></div>
                                <span style="font-weight:500;">Knowledge Base \${idx+1}</span>
                                <button onclick="removeKnowledgeBase(\${idx})" style="margin-left:auto; background:none; border:none; color:#f87171; cursor:pointer;"><i class="fa-regular fa-trash-can"></i></button>
                            </div>
                            <div class="form-group" style="margin-bottom:0;">
                                <textarea class="form-textarea" rows="2" placeholder="Enter knowledge content..." onchange="updateKnowledgeBase(\${idx}, 'content', this.value)">\${escapeHtml(kb.content || '')}</textarea>
                            </div>
                        </div>\`;
            });
            container.innerHTML = html;
        }

        function addKnowledgeBase() {
            knowledgeBases.push({ enabled: true, content: '' });
            renderKnowledgeBases();
        }

        function removeKnowledgeBase(idx) {
            knowledgeBases.splice(idx, 1);
            renderKnowledgeBases();
        }

        function toggleKnowledgeBase(idx) {
            knowledgeBases[idx].enabled = !knowledgeBases[idx].enabled;
            renderKnowledgeBases();
        }

        function updateKnowledgeBase(idx, field, value) {
            knowledgeBases[idx][field] = value;
        }

        // Suggested Questions (as chips)
        function renderSuggestedQuestions() {
            const container = document.getElementById('suggested-questions-list');
            if (suggestedQuestions.length === 0) {
                container.innerHTML = '<div style="font-size:0.75rem; color:#64748b; padding:0.25rem 0;">No suggested questions added.</div>';
                return;
            }
            let html = '<div class="button-chip-list">';
            suggestedQuestions.forEach((q, idx) => {
                html += \`<div class="button-chip" draggable="true" data-index="\${idx}" data-type="suggested">
                            <span class="chip-grip"><i class="fa-solid fa-grip-lines"></i></span>
                            <i class="fa-regular fa-message" style="color:#60a5fa;"></i>
                            <span class="chip-text">\${escapeHtml(q.label)} → \${escapeHtml(q.value)}</span>
                            <button class="chip-edit" onclick="editSuggestedQuestion(\${idx})"><i class="fa-regular fa-pen-to-square"></i></button>
                            <button class="chip-delete" onclick="removeSuggestedQuestion(\${idx})"><i class="fa-regular fa-circle-xmark"></i></button>
                        </div>\`;
            });
            html += '</div>';
            container.innerHTML = html;
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

        function removeSuggestedQuestion(idx) {
            suggestedQuestions.splice(idx, 1);
            renderSuggestedQuestions();
        }

        function editSuggestedQuestion(idx) {
            const q = suggestedQuestions[idx];
            const newLabel = prompt('Edit label:', q.label);
            if (newLabel === null) return;
            const newValue = prompt('Edit value:', q.value);
            if (newValue === null) return;
            q.label = newLabel.trim();
            q.value = newValue.trim();
            renderSuggestedQuestions();
        }

        // Gather AI Settings from UI
        function gatherAiSettingsFromUI() {
            return {
                ai_enabled: aiEnabled ? '1' : '0',
                ai_display_name: document.getElementById('ai-display-name').value.trim(),
                ai_language: document.getElementById('ai-language').value,
                ai_style: document.getElementById('ai-style').value,
                ai_length: document.getElementById('ai-length').value,
                ai_provider: document.getElementById('ai-provider').value,
                ai_alt_provider: document.getElementById('ai-alt-provider').value,
                ai_api_key: document.getElementById('ai-api-key').value.trim(),
                ai_alt_api_key: document.getElementById('ai-alt-api-key').value.trim(),
                ai_base_url: document.getElementById('ai-base-url').value.trim(),
                ai_alt_base_url: document.getElementById('ai-alt-base-url').value.trim(),
                ai_model: document.getElementById('ai-model').value.trim(),
                ai_alt_model: document.getElementById('ai-alt-model').value.trim(),
                ai_custom_headers: document.getElementById('ai-custom-headers').value.trim(),
                ai_alt_custom_headers: document.getElementById('ai-alt-custom-headers').value.trim(),
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
            };
        }

        function renderAiSettings(s) {
            if (!s) return;
            aiEnabled = (s.ai_enabled === '1' || s.ai_enabled === true);
            const toggle = document.getElementById('ai-toggle');
            if (toggle) toggle.classList.toggle('active', aiEnabled);

            showSuggestedQuestions = (s.ai_suggested_questions_enabled === '1' || s.ai_suggested_questions_enabled === true);
            const sqToggle = document.getElementById('ai-suggested-toggle');
            if (sqToggle) sqToggle.classList.toggle('active', showSuggestedQuestions);
            document.getElementById('suggested-questions-editor').style.display = showSuggestedQuestions ? 'block' : 'none';

            document.getElementById('ai-display-name').value = s.ai_display_name || '';
            document.getElementById('ai-language').value = s.ai_language || 'auto';
            document.getElementById('ai-style').value = s.ai_style || 'friendly';
            document.getElementById('ai-length').value = s.ai_length || 'medium';
            document.getElementById('ai-provider').value = s.ai_provider || 'openai';
            document.getElementById('ai-alt-provider').value = s.ai_alt_provider || 'none';
            document.getElementById('ai-api-key').value = s.ai_api_key || '';
            document.getElementById('ai-alt-api-key').value = s.ai_alt_api_key || '';
            document.getElementById('ai-base-url').value = s.ai_base_url || '';
            document.getElementById('ai-alt-base-url').value = s.ai_alt_base_url || '';
            document.getElementById('ai-model').value = s.ai_model || 'gpt-4o-mini';
            document.getElementById('ai-alt-model').value = s.ai_alt_model || '';
            document.getElementById('ai-custom-headers').value = s.ai_custom_headers || '';
            document.getElementById('ai-alt-custom-headers').value = s.ai_alt_custom_headers || '';
            document.getElementById('ai-system-prompt').value = s.ai_system_prompt || '';
            try { knowledgeBases = JSON.parse(s.ai_knowledge_bases || '[]'); } catch(e) { knowledgeBases = []; }
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
            try { suggestedQuestions = JSON.parse(s.ai_suggested_questions || '[]'); } catch(e) { suggestedQuestions = []; }
            renderSuggestedQuestions();
            document.getElementById('ai-ignore-prefixes').value = s.ai_ignore_prefixes || '/, !, #';

            onAiProviderChange('main');
            onAiProviderChange('alt');

            // Trigger hint
            updateTriggerHint(s.ai_trigger);
        }

        function updateTriggerHint(trigger) {
            const hintEl = document.getElementById('trigger-hint');
            const texts = {
                'no_command': 'The AI replies only when no command matches. This is the recommended setting.',
                'all_messages': 'The AI replies to every text message (after command checks).',
                'contains_text': 'The AI replies only if the message contains the specific text you set.'
            };
            hintEl.innerText = texts[trigger] || '';
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
                .catch(err => showToast('Error loading AI settings: ' + err.message, 'error'))
            );
        }

        function applyPromptTemplate() {
            const preset = document.getElementById('ai-template-preset').value;
            const promptEl = document.getElementById('ai-system-prompt');
            const templates = {
                assistant: "You are a helpful AI assistant named {{bot_name}}. Answer only using the information provided in your instructions and knowledge base. Never search the web, invent information, or answer questions unrelated to your assigned purpose. If the answer cannot be found in your knowledge base or instructions, politely state that you don't have that information.",

                support: "You are a professional customer support representative for {{company_name}}. Answer customer questions only using the provided instructions and knowledge base. Never search the web, make assumptions, or answer unrelated questions. If the requested information is unavailable, politely inform the customer and suggest contacting support.",

                restaurant: "You are the virtual assistant for {{company_name}} restaurant. Answer only questions related to the restaurant using the provided instructions and knowledge base, such as the menu, opening hours, reservations, and policies. Never search the web or answer unrelated questions. If the information isn't available, politely say so.",

                programming: "You are a programming assistant. Answer programming-related questions only using the provided instructions and knowledge base. Do not search the web or answer questions outside your assigned scope. If the answer isn't available in the provided information, state that you don't have enough information.",

                school: "You are an educational tutor. Explain topics only according to the provided instructions and knowledge base. Never search the web, invent facts, or answer unrelated questions. If the necessary information isn't available, politely say that you don't have enough information to answer."
            };
            if (preset !== 'custom' && templates[preset]) {
                promptEl.value = templates[preset];
            }
        }

        // Detect manual edit of system prompt -> set template to custom
        document.getElementById('ai-system-prompt').addEventListener('input', function() {
            const select = document.getElementById('ai-template-preset');
            const current = select.value;
            if (current !== 'custom') {
                select.value = 'custom';
            }
        });

        // More options dropdown
        function toggleMoreOptions() {
            const dropdown = document.getElementById('more-options-dropdown');
            dropdown.classList.toggle('show');
        }
        document.addEventListener('click', function(e) {
            const dropdown = document.getElementById('more-options-dropdown');
            if (dropdown && !e.target.closest('.dropdown-menu')) {
                dropdown.classList.remove('show');
            }
        });

        function exportAiSettings() {
            const settings = gatherAiSettingsFromUI();
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "ai_settings.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        }

        function triggerImportAiSettings() {
            document.getElementById('ai-import-file').click();
        }

        function importAiSettings(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const parsed = JSON.parse(e.target.result);
                    renderAiSettings(parsed);
                    showToast('AI Settings imported into preview! Click Save to apply.');
                } catch(err) {
                    showToast('Invalid JSON file.', 'error');
                }
            };
            reader.readAsText(file);
        }

        function clearAiMemory() {
            if (!confirm('Clear all stored AI conversation history?')) return;
            withLoading(
                fetch('/api/ai/clear_memory', { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    if (data.success) { showToast('AI Memory cleared!'); refreshMemoryCount(); }
                    else throw new Error(data.error);
                })
                .catch(err => showToast(err.message, 'error'))
            );
        }

        function resetAiSettings() {
            if (!confirm('Reset all AI settings to default values?')) return;
            withLoading(
                fetch('/api/ai/reset', { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        showToast('AI Settings reset!');
                        loadAiSettings(true);
                        refreshMemoryCount();
                    } else throw new Error(data.error);
                })
                .catch(err => showToast(err.message, 'error'))
            );
        }

        function saveAiSettings() {
            const settings = gatherAiSettingsFromUI();
            withLoading(
                fetch('/api/ai_settings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
            resultEl.innerText = 'Testing main...';
            resultEl.className = 'test-result';
            resultEl.style.color = '#94a3b8';

            withLoading(
                fetch('/api/ai/test', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ settings: settings, provider: 'main' })
                })
                .then(res => res.json())
                .then(data => {
                    let mainOk = data.success;
                    let mainMsg = data.message || data.error;
                    if (settings.ai_alt_provider && settings.ai_alt_provider !== 'none') {
                        resultEl.innerText = 'Testing alternate...';
                        return fetch('/api/ai/test', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ settings: settings, provider: 'alt' })
                        })
                        .then(res => res.json())
                        .then(altData => {
                            let altOk = altData.success;
                            let altMsg = altData.message || altData.error;
                            let finalMsg = '';
                            if (mainOk && altOk) {
                                finalMsg = '✅ Both main and alternate connected successfully!';
                                resultEl.className = 'test-result success';
                            } else if (mainOk && !altOk) {
                                finalMsg = '⚠️ Main works, alternate failed: ' + altMsg;
                                resultEl.className = 'test-result partial';
                            } else if (!mainOk && altOk) {
                                finalMsg = '⚠️ Main failed: ' + mainMsg + ' but alternate works!';
                                resultEl.className = 'test-result partial';
                            } else {
                                finalMsg = '❌ Both failed. Main: ' + mainMsg + ' | Alt: ' + altMsg;
                                resultEl.className = 'test-result error';
                            }
                            resultEl.innerText = finalMsg;
                        });
                    } else {
                        if (mainOk) {
                            resultEl.innerText = '✅ Main connection successful!';
                            resultEl.className = 'test-result success';
                        } else {
                            resultEl.innerText = '❌ Main connection failed: ' + mainMsg;
                            resultEl.className = 'test-result error';
                        }
                    }
                })
                .catch(err => {
                    resultEl.innerText = '❌ Error: ' + err.message;
                    resultEl.className = 'test-result error';
                })
            );
        }

        // Trigger "contains_text" toggle
        document.getElementById('ai-trigger').addEventListener('change', function() {
            const container = document.getElementById('trigger-contains-group');
            const shouldShow = this.value === 'contains_text';
            container.style.display = shouldShow ? 'block' : 'none';
            updateTriggerHint(this.value);
        });

        // Playground
            function renderMarkdown(text) {
    let html = escapeHtml(text);
    html = html.replace(/\`\`\`([\s\S]+?)\`\`\`/g, '<pre><code>$1</code></pre>');
    html = html.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
    html = html.replace(/\\n/g, '<br>');
    return html;
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
            botDiv.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Thinking...';
            container.appendChild(botDiv);
            container.scrollTop = container.scrollHeight;

            const settings = gatherAiSettingsFromUI();
            const memoryLimit = parseInt(settings.ai_memory || '0');
            const historyToSend = memoryLimit > 0 ? playgroundHistory.slice(-memoryLimit) : [];

            fetch('/api/ai/playground', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    settings: settings,
                    history: historyToSend,
                    message: msg,
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let rendered = data.response;
                    // Convert markdown-like to HTML? We'll send plain text.
                    botDiv.textContent = rendered;
                    if (memoryLimit > 0) {
                        playgroundHistory.push({ role: 'user', content: msg });
                        playgroundHistory.push({ role: 'assistant', content: data.response });
                    }
                } else {
                    botDiv.style.color = '#f87171';
                    botDiv.textContent = 'Error: ' + (data.error || 'Failed to generate response');
                }
                container.scrollTop = container.scrollHeight;
            })
            .catch(err => {
                botDiv.style.color = '#f87171';
                botDiv.textContent = 'Error: ' + err.message;
                container.scrollTop = container.scrollHeight;
            });
        }

        function clearPlaygroundChat() {
            playgroundHistory = [];
            const container = document.getElementById('playground-messages');
            container.innerHTML = '<div style="font-size:0.8rem; color:#64748b; text-align:center;">Playground cleared. Send a message below to test.</div>';
        }

        // Memory count
        async function refreshMemoryCount() {
            const display = document.getElementById('memory-count-display');
            try {
                const res = await fetch('/api/ai/memory_count');
                const data = await res.json();
                if (data.success) {
                    display.innerText = \`\${data.count} messages stored across all chats\`;
                } else {
                    display.innerText = 'Error loading count';
                }
            } catch(e) {
                display.innerText = 'Error';
            }
        }

        // ======================================================================
        // USERS
        // ======================================================================
        function loadUsers() {
            var container = document.getElementById('users-list');
            var search = document.getElementById('user-search').value.trim();
            var url = '/api/users' + (search ? '?search=' + encodeURIComponent(search) : '');
            if (!search && isCacheValid('users')) {
                var users = cache.users.data;
                renderUsers(users, container);
                return;
            }
            withLoading(
                fetch(url)
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    var users = data.users || [];
                    if (!search) {
                        cache.users.data = users;
                        cache.users.loaded = true;
                        cache.users.timestamp = Date.now();
                    }
                    renderUsers(users, container);
                })
                .catch(function(err) { container.innerHTML = '<p style="color:#f87171; font-size:0.875rem;">Error: ' + err
                        .message + '</p>'; })
            );
        }

        function renderUsers(users, container) {
            if (users.length === 0) {
                container.innerHTML =
                    '<p style="color:#94a3b8; font-size:0.875rem;">No users yet. Interact with the bot to see them here.</p>';
                return;
            }
            var html =
                '<div style="overflow-x:auto;"><table style="width:100%; font-size:0.875rem; border-collapse:collapse;"><thead><tr style="border-bottom:1px solid #334155;"><th style="text-align:left; padding:0.5rem;">ID</th><th style="text-align:left; padding:0.5rem;">Username</th><th style="text-align:left; padding:0.5rem;">Name</th><th style="text-align:left; padding:0.5rem;">Role</th><th style="text-align:left; padding:0.5rem;">Last Active</th><th style="text-align:left; padding:0.5rem;">Action</th></tr></thead><tbody>';
            for (var i = 0; i < users.length; i++) {
                var u = users[i];
                var roleBtn = u.role === 'admin' ?
                    '<button class="demote-btn" style="background:#dc2626; color:white; border:none; border-radius:4px; padding:0.125rem 0.5rem; font-size:0.75rem; cursor:pointer;" data-id="' + u.id + '">Demote</button>' :
                    '<button class="promote-btn" style="background:#22c55e; color:white; border:none; border-radius:4px; padding:0.125rem 0.5rem; font-size:0.75rem; cursor:pointer;" data-id="' + u.id + '">Promote</button>';
                html += '<tr style="border-bottom:1px solid #334155;"><td style="padding:0.5rem; font-family:monospace;">' +
                    u.id + '</td><td style="padding:0.5rem;">' + (u.username || '-') + '</td><td style="padding:0.5rem;">' +
                    (u.first_name || '') + '</td><td style="padding:0.5rem;"><span class="badge ' + (u.role ===
                        'admin' ? 'badge-admin' : 'badge-gray') + '">' + (u.role || 'user') + '</span></td><td style="padding:0.5rem; font-size:0.75rem; color:#94a3b8;">' +
                    (u.last_active || '-') + '</td><td style="padding:0.5rem;">' + roleBtn + '</td></tr>';
            }
            html += '</tbody></table></div>';
            container.innerHTML = html;
            container.querySelectorAll('.promote-btn').forEach(function(b) { b.addEventListener('click',
                    function() { updateUserRole(parseInt(this.dataset.id), 'admin'); }); });
            container.querySelectorAll('.demote-btn').forEach(function(b) { b.addEventListener('click',
                    function() { updateUserRole(parseInt(this.dataset.id), 'user'); }); });
        }

        function updateUserRole(userId, role) {
            withLoading(
                fetch('/api/users/role', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                        userId, role }) })
                .then(function(res) { return res.json(); })
                .then(function(data) { if (data.success) { showToast('Role updated.');
                        cache.users.loaded = false;
                        loadUsers(); } else throw new Error(data.error); })
                .catch(function(err) { showToast(err.message, 'error'); })
            );
        }

        // ======================================================================
        // SETTINGS
        // ======================================================================
        function loadSettings(forceLoad) {
            if (!forceLoad && isCacheValid('settings')) {
                var data = cache.settings.data;
                document.getElementById('settings-bot-token').value = data.bot_token || '';
                document.getElementById('settings-webhook-url').value = data.webhook_url || '';
                if (data.cf_token) {
                    document.getElementById('update-cf-token').value = data.cf_token;
                }
                return Promise.resolve();
            }
            return withLoading(
                fetch('/api/settings')
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    document.getElementById('settings-bot-token').value = data.bot_token || '';
                    document.getElementById('settings-webhook-url').value = data.webhook_url || '';
                    if (data.cf_token) {
                        document.getElementById('update-cf-token').value = data.cf_token;
                    }
                    cache.settings.data = data;
                    cache.settings.loaded = true;
                    cache.settings.timestamp = Date.now();
                })
                .catch(function(err) { showToast('Error loading settings: ' + err.message, 'error'); })
            );
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
            withLoading(
                fetch('/api/settings/token', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ botToken: newToken }) })
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (!data.success) throw new Error(data.error || 'Failed');
                    resultDiv.innerText = '✅ Updated!';
                    resultDiv.style.color = '#4ade80';
                    cache.settings.loaded = false;
                    setTimeout(function() { closeTokenModal();
                        loadSettings(true); }, 1500);
                })
                .catch(function(err) { resultDiv.innerText = '❌ ' + err.message;
                    resultDiv.style.color = '#f87171'; })
            );
        }

        function testWebhook() {
            showToast('Testing...');
            withLoading(
                fetch('/api/settings/webhook-test', { method: 'POST' })
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (!data.success) throw new Error(data.error || 'Test failed');
                    if (data.last_error) {
                        showToast('❌ Telegram delivery failing: ' + data.last_error, 'error');
                        return;
                    }
                    if (data.url && data.url_matches) {
                        var msg = '✅ Webhook OK: ' + data.url;
                        if (data.pending_updates > 0) msg += ' (' + data.pending_updates + ' pending)';
                        showToast(msg);
                    } else if (data.url) {
                        showToast('⚠️ Webhook points elsewhere: ' + data.url, 'error');
                    } else {
                        showToast('⚠️ No webhook registered. Change the bot token to register it.', 'error');
                    }
                })
                .catch(function(err) { showToast('Test failed: ' + err.message, 'error'); })
            );
        }

        function factoryReset() {
            if (!confirm('Delete ALL data? This cannot be undone.')) return;
            showToast('Resetting...');
            withLoading(
                fetch('/api/reset', { method: 'POST' })
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (data.success) {
                        showToast('Reset successful. Reloading...');
                        Object.keys(cache).forEach(k => { cache[k].loaded = false;
                            cache[k].data = null;
                            cache[k].timestamp = 0; });
                        setTimeout(function() { window.location.reload(); }, 1500);
                    } else throw new Error(data.error);
                })
                .catch(function(err) { showToast('Reset error: ' + err.message, 'error'); })
            );
        }

        // ======================================================================
        // CHANGE PASSWORD
        // ======================================================================
        function changeAdminPassword() {
            const newPass = document.getElementById('change-pass-new').value;
            const confirm = document.getElementById('change-pass-confirm').value;
            if (!newPass || newPass.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
            if (newPass !== confirm) { showToast('Passwords do not match.', 'error'); return; }
            withLoading(
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
                    .catch(err => showToast(err.message, 'error'))
            );
        }

        // ======================================================================
        // BOT INFO
        // ======================================================================
        function loadBotInfo(forceLoad) {
            var resultDiv = document.getElementById('bot-info-result');
            if (!forceLoad && isCacheValid('botinfo')) {
                var data = cache.botinfo.data;
                document.getElementById('bot-name').value = data.name || '';
                document.getElementById('bot-description').value = data.description || '';
                document.getElementById('bot-short-description').value = data.short_description || '';
                resultDiv.classList.remove('hidden');
                resultDiv.innerText = '✅ Loaded from Telegram.';
                resultDiv.style.color = '#4ade80';
                return Promise.resolve();
            }
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Loading from Telegram...';
            resultDiv.style.color = '#94a3b8';
            return withLoading(
                fetch('/api/bot_info')
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (!data.success) throw new Error(data.error || 'Failed');
                    document.getElementById('bot-name').value = data.name || '';
                    document.getElementById('bot-description').value = data.description || '';
                    document.getElementById('bot-short-description').value = data.short_description || '';
                    cache.botinfo.data = data;
                    cache.botinfo.loaded = true;
                    cache.botinfo.timestamp = Date.now();
                    resultDiv.innerText = '✅ Loaded from Telegram.';
                    resultDiv.style.color = '#4ade80';
                })
                .catch(function(err) {
                    resultDiv.innerText = '❌ ' + err.message;
                    resultDiv.style.color = '#f87171';
                })
            );
        }

        function publishBotInfo() {
            var name = document.getElementById('bot-name').value.trim();
            var description = document.getElementById('bot-description').value.trim();
            var short_description = document.getElementById('bot-short-description').value.trim();
            var resultDiv = document.getElementById('bot-info-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Publishing...';
            resultDiv.style.color = '#94a3b8';
            withLoading(
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
                        cache.botinfo.loaded = false;
                    })
                    .catch(function(err) {
                        resultDiv.innerText = '❌ ' + err.message;
                        resultDiv.style.color = '#f87171';
                    })
            );
        }

        // ======================================================================
        // UPDATE / SELF-UPDATE
        // ======================================================================
        function openTokenGenerator() {
            const url =
                'https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=%5B%7B%22key%22%3A%22workers_scripts%22%2C%22type%22%3A%22edit%22%7D%5D&accountId=*&zoneId=all&name=Nyxx%20Updater';
            window.open(url, '_blank');
        }

        async function loadUpdateTab() {
            await loadSettings(true);
            await checkForUpdate(true);
            toggleCfSection();
        }

        function toggleCfSection() {
            const section = document.getElementById('update-cf-section');
            if (updateAvailable) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
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

        async function checkForUpdate(force) {
            const latestInput = document.getElementById('update-latest-version');
            const detailsDiv = document.getElementById('update-version-details');
            latestInput.placeholder = 'Checking...';
            detailsDiv.innerText = '';
            withLoading(
                fetch('/api/version')
                .then(res => res.json())
                .then(data => {
                    if (data.latest) {
                        latestInput.value = data.latest;
                        latestVersion = data.latest;
                        workerUrl = data.worker_url || null;
                        let details = '';
                        if (data.released) details += '📅 Released: ' + data.released;
                        if (data.notes) details += (details ? ' | ' : '') + '📝 Notes: ' + data.notes;
                        detailsDiv.innerText = details || '';
                        updateAvailable = compareVersions(data.latest, data.current) > 0;
                    } else {
                        latestInput.value = 'Error: ' + (data.error || 'unknown');
                        updateAvailable = false;
                    }
                })
                .catch(e => {
                    latestInput.value = 'Error: ' + e.message;
                    updateAvailable = false;
                })
                .finally(() => {
                    updateUpdateButtonState();
                    toggleCfSection();
                    if (updateAvailable) showUpdateBanner(true);
                    else showUpdateBanner(false);
                })
            );
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

        function showUpdateBanner(show) {
            const banner = document.getElementById('update-banner-btn');
            const statusItems = document.getElementById('status-items');
            if (show) {
                banner.classList.remove('hidden');
                statusItems.style.display = 'none';
            } else {
                banner.classList.add('hidden');
                statusItems.style.display = 'flex';
            }
        }

        function updateUpdateButtonState() {
            const btn = document.getElementById('update-btn');
            if (updateAvailable) {
                btn.disabled = false;
                btn.title = 'Update available';
            } else {
                btn.disabled = true;
                btn.title = 'No update available or already latest';
            }
        }

        document.getElementById('update-btn').addEventListener('click', performUpdate);

        async function performUpdate() {
            const statusDiv = document.getElementById('update-status');
            statusDiv.classList.remove('hidden');
            statusDiv.innerText = 'Preparing...';
            statusDiv.style.color = '#94a3b8';

            if (!updateAvailable) {
                statusDiv.innerText = '❌ No update available.';
                statusDiv.style.color = '#f87171';
                return;
            }

            const token = document.getElementById('update-cf-token').value.trim();
            if (!token) {
                statusDiv.innerText = '❌ Please enter a Cloudflare API token.';
                statusDiv.style.color = '#f87171';
                return;
            }

            const resultDiv = document.getElementById('update-validation-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerText = 'Validating token...';
            resultDiv.style.color = '#94a3b8';

            let validationData;
            try {
                const res = await withLoading(fetch('/api/update/validate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                }));
                validationData = await res.json();
                if (!validationData.valid) {
                    throw new Error(validationData.error || 'Invalid token');
                }
                resultDiv.innerText = '✅ Token validated. Account: ' + validationData.accountId + ', Script: ' +
                    validationData.scriptName;
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

            statusDiv.innerText = 'Updating...';
            statusDiv.style.color = '#94a3b8';

            try {
                const updateRes = await withLoading(fetch('/api/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token, accountId, scriptName, workerUrl })
                }));
                const updateData = await updateRes.json();
                if (!updateData.success) {
                    throw new Error(updateData.error || 'Update failed');
                }
                statusDiv.innerText = '✅ Update successful! New version: ' + (updateData.version || 'unknown') +
                    '. Updating takes time. Please wait 30 seconds and reload the page until you see the new version appear here.';
                statusDiv.style.color = '#4ade80';
                await checkForUpdate(true);
                showToast('Update completed! The worker has been updated.', 'success');
            } catch (e) {
                statusDiv.innerText = '❌ ' + e.message;
                statusDiv.style.color = '#f87171';
            }
        }

        // ======================================================================
        // INIT
        // ======================================================================
        window.onload = function() { checkStatus(); };
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
};

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
            if (request.method === 'GET' && url.pathname === '/') {
                return new Response(DASHBOARD_HTML, {
                    headers: { 'Content-Type': 'text/html; charset=utf-8', ...SECURITY_HEADERS }
                });
            }

            // Public endpoints
            if (request.method === 'GET' && url.pathname === '/api/status') {
                return await getStatus(env);
            }
            if (request.method === 'POST' && url.pathname === '/api/setup') {
                return await handleSetup(request, env);
            }
            if (request.method === 'POST' && url.pathname === '/api/login') {
                return await handleLogin(request, env);
            }
            if (request.method === 'GET' && url.pathname === '/api/version') {
                return await getVersionInfo(env);
            }
            if (request.method === 'POST' && url.pathname === '/webhook') {
                return await handleTelegramWebhook(request, env);
            }

            // Protected endpoints
            const session = await getSession(request, env);
            if (!session) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json', ...SECURITY_HEADERS } });
            }

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
            if (url.pathname.startsWith('/api/commands/')) {
                if (request.method === 'PUT') return await updateCommand(request, env);
                if (request.method === 'DELETE') return await deleteCommand(request, env);
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

            // AI
            if (request.method === 'GET' && url.pathname === '/api/ai_settings') {
                return await getAiSettings(env);
            }
            if (request.method === 'POST' && url.pathname === '/api/ai_settings') {
                return await saveAiSettings(request, env);
            }
            if (request.method === 'POST' && url.pathname === '/api/ai/test') {
                return await handleAiTest(request, env);
            }
            if (request.method === 'POST' && url.pathname === '/api/ai/playground') {
                return await handleAiPlayground(request, env);
            }
            if (request.method === 'POST' && url.pathname === '/api/ai/reset') {
                return await resetAiSettings(env);
            }
            if (request.method === 'POST' && url.pathname === '/api/ai/clear_memory') {
                return await clearAiMemory(env);
            }
            if (request.method === 'GET' && url.pathname === '/api/ai/memory_count') {
                return await getAiMemoryCount(env);
            }

            // Settings
            if (request.method === 'GET' && url.pathname === '/api/settings') {
                return await getSettings(env, url.origin);
            }
            if (request.method === 'POST' && url.pathname === '/api/settings/token') {
                return await updateBotToken(request, env, url.origin);
            }
            if (request.method === 'POST' && url.pathname === '/api/settings/webhook-test') {
                return await handleWebhookTest(env);
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

            // Reset
            if (request.method === 'POST' && url.pathname === '/api/reset') {
                return await factoryReset(env);
            }

            // Update
            if (request.method === 'POST' && url.pathname === '/api/update/validate') {
                return await validateCloudflareToken(request, env);
            }
            if (request.method === 'POST' && url.pathname === '/api/update') {
                return await performUpdate(request, env);
            }

            // Session check
            if (request.method === 'GET' && url.pathname === '/api/check_session') {
                return Response.json({ logged_in: true });
            }

            return new Response('Not Found', { status: 404, headers: SECURITY_HEADERS });
        } catch (error) {
            console.error(error);
            // Never leak internal error details to clients.
            return Response.json({ error: 'Internal server error' }, { status: 500, headers: SECURITY_HEADERS });
        }
    }
};

// ============================================================================
// DATABASE INIT
// ============================================================================
async function initializeDatabase(db) {
    const schema = `
        CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, first_name TEXT, role TEXT DEFAULT 'user', is_premium BOOLEAN DEFAULT 0, last_active DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS commands (command TEXT PRIMARY KEY, parent TEXT, response_type TEXT DEFAULT 'text', content TEXT, media_url TEXT, buttons_json TEXT, is_admin_only BOOLEAN DEFAULT 0, enabled BOOLEAN DEFAULT 1, show_reply_keyboard BOOLEAN DEFAULT 0, reply_keyboard_json TEXT, order_idx INTEGER DEFAULT 0);
        CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER UNIQUE, command TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, action TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE IF NOT EXISTS ai_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, role TEXT, content TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
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
    const existing = await env.DB.prepare("SELECT value FROM settings WHERE key = 'admin_password'").first();
    if (existing && !envPass) {
        return Response.json({ error: 'Admin password already set. Please login.' }, { status: 400 });
    }

    const body = await request.json();
    const { botToken, adminPassword } = body;
    if (!adminPassword || adminPassword.length < 6) {
        return Response.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(adminPassword);
    await env.DB.prepare(`
        INSERT INTO settings (key, value) VALUES ('admin_password', ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `).bind(hashedPassword).run();

    if (botToken) {
        const check = await validateBotToken(botToken);
        if (!check.ok) {
            return Response.json({ error: `Invalid bot token${check.error ? ` (${check.error})` : ''}` }, { status: 400 });
        }
        const webhookUrl = `${new URL(request.url).origin}/webhook`;

        // Register the webhook with Telegram FIRST, then persist the secret —
        // if registration fails we never store a secret that would 401 real
        // Telegram deliveries.
        const secret = crypto.randomUUID();
        await registerWebhook(botToken, webhookUrl, secret);

        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('bot_token', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(botToken).run();

        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('webhook_url', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(webhookUrl).run();

        // Protect the webhook with a secret token so only Telegram can deliver updates.
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('webhook_secret', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(secret).run();
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

    const stored = await env.DB.prepare("SELECT value FROM settings WHERE key = 'admin_password'").first();
    const passwordOk = stored && await verifyPassword(stored.value, password);
    if (!passwordOk) {
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

async function getVersionInfo(env) {
    const current = VERSION;
    let latest = null,
        released = null,
        notes = null,
        workerUrl = null;
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
    return Response.json({ current, latest, released, notes, worker_url: workerUrl });
}

// ============================================================================
// COMMANDS API
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
// MENU COMMANDS
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
// USERS API
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
// AI API HANDLERS & ENGINE
// ============================================================================
async function getAiSettings(env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        await initializeDatabase(env.DB);
        const settings = await getAiSettingsFromDb(env);
        return Response.json({ success: true, settings });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function getAiSettingsFromDb(env) {
    const keys = [
        'ai_enabled', 'ai_provider', 'ai_api_key', 'ai_base_url', 'ai_model',
        'ai_system_prompt', 'ai_trigger', 'ai_memory', 'ai_fallback',
        'ai_temperature', 'ai_max_tokens', 'ai_top_p',
        'ai_suggested_questions_enabled', 'ai_suggested_questions',
        'ai_alt_provider', 'ai_alt_api_key', 'ai_alt_model', 'ai_alt_base_url',
        'ai_custom_headers', 'ai_alt_custom_headers',
        'ai_display_name', 'ai_language', 'ai_style', 'ai_length',
        'ai_rate_limit', 'ai_response_delay', 'ai_ignore_prefixes',
        'ai_group_mention', 'ai_private_reply', 'ai_group_reply',
        'ai_ignore_bots', 'ai_ignore_forwarded', 'ai_typing_indicator',
        'ai_retry_on_failure', 'ai_custom_vars_text', 'ai_knowledge_bases',
        'ai_trigger_text', 'ai_group_memory'
    ];
    const settings = {};
    for (const k of keys) {
        const row = await env.DB.prepare("SELECT value FROM settings WHERE key = ?").bind(k).first();
        settings[k] = row ? row.value : '';
    }
    // Defaults
    if (!settings.ai_enabled) settings.ai_enabled = '0';
    if (!settings.ai_provider) settings.ai_provider = 'openai';
    if (!settings.ai_model) settings.ai_model = 'gpt-4o-mini';
    if (!settings.ai_trigger) settings.ai_trigger = 'no_command';
    if (!settings.ai_memory) settings.ai_memory = '0';
    if (!settings.ai_group_memory) settings.ai_group_memory = '0';
    if (!settings.ai_fallback) settings.ai_fallback = 'Sorry, I am currently unavailable. Please try again later.';
    if (!settings.ai_temperature) settings.ai_temperature = '0.7';
    if (!settings.ai_max_tokens) settings.ai_max_tokens = '1024';
    if (!settings.ai_top_p) settings.ai_top_p = '1.0';
    if (!settings.ai_suggested_questions_enabled) settings.ai_suggested_questions_enabled = '0';
    if (!settings.ai_rate_limit) settings.ai_rate_limit = '10';
    if (!settings.ai_ignore_prefixes) settings.ai_ignore_prefixes = '/, !, #';
    if (!settings.ai_group_mention) settings.ai_group_mention = '1';
    if (!settings.ai_private_reply) settings.ai_private_reply = '1';
    if (!settings.ai_group_reply) settings.ai_group_reply = '1';
    if (!settings.ai_ignore_bots) settings.ai_ignore_bots = '1';
    if (!settings.ai_ignore_forwarded) settings.ai_ignore_forwarded = '1';
    if (!settings.ai_typing_indicator) settings.ai_typing_indicator = '1';
    if (!settings.ai_retry_on_failure) settings.ai_retry_on_failure = '0';
    if (!settings.ai_knowledge_bases) settings.ai_knowledge_bases = '[]';
    if (!settings.ai_suggested_questions) settings.ai_suggested_questions = '[]';
    return settings;
}

async function saveAiSettings(request, env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const body = await request.json();
        const settings = body.settings || body;
        await initializeDatabase(env.DB);
        const keys = [
            'ai_enabled', 'ai_provider', 'ai_api_key', 'ai_base_url', 'ai_model',
            'ai_system_prompt', 'ai_trigger', 'ai_memory', 'ai_fallback',
            'ai_temperature', 'ai_max_tokens', 'ai_top_p',
            'ai_suggested_questions_enabled', 'ai_suggested_questions',
            'ai_alt_provider', 'ai_alt_api_key', 'ai_alt_model', 'ai_alt_base_url',
            'ai_custom_headers', 'ai_alt_custom_headers',
            'ai_display_name', 'ai_language', 'ai_style', 'ai_length',
            'ai_rate_limit', 'ai_response_delay', 'ai_ignore_prefixes',
            'ai_group_mention', 'ai_private_reply', 'ai_group_reply',
            'ai_ignore_bots', 'ai_ignore_forwarded', 'ai_typing_indicator',
            'ai_retry_on_failure', 'ai_custom_vars_text', 'ai_knowledge_bases',
            'ai_trigger_text', 'ai_group_memory'
        ];
        for (const k of keys) {
            if (settings[k] !== undefined) {
                await env.DB.prepare(`
                    INSERT INTO settings (key, value) VALUES (?, ?)
                    ON CONFLICT(key) DO UPDATE SET value = excluded.value
                `).bind(k, String(settings[k])).run();
            }
        }
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function getAiMemoryCount(env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const result = await env.DB.prepare("SELECT COUNT(*) as count FROM ai_messages").first();
        return Response.json({ success: true, count: result ? result.count : 0 });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

function getProviderDefaults(provider, customBaseUrl) {
    switch (provider) {
        case 'openai':
            return { baseUrl: 'https://api.openai.com/v1', defaultModel: 'gpt-4o-mini' };
        case 'gemini':
            return { baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/', defaultModel: 'gemini-1.5-flash' };
        case 'deepseek':
            return { baseUrl: 'https://api.deepseek.com', defaultModel: 'deepseek-chat' };
        case 'groq':
            return { baseUrl: 'https://api.groq.com/openai/v1', defaultModel: 'llama-3.3-70b-versatile' };
        case 'openrouter':
            return { baseUrl: 'https://openrouter.ai/api/v1', defaultModel: 'openai/gpt-4o-mini' };
        case 'ollama':
            return { baseUrl: customBaseUrl || 'http://localhost:11434/v1', defaultModel: 'llama3' };
        case 'custom':
        default:
            return { baseUrl: customBaseUrl || '', defaultModel: '' };
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
        for (const [k, v] of Object.entries(ctx.custom_vars)) {
            placeholders[k] = v;
        }
    }
    let result = text;
    for (const [key, value] of Object.entries(placeholders)) {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        result = result.replace(regex, value);
    }
    return result;
}

// Escape HTML special characters, but allow safe tags (b, i, u, s, a, code, pre)
function escapeTelegramHTML(text) {
    if (!text) return "";

    // Escape only plain text, preserve Telegram-supported tags.
    return text.replace(
        /<(?!\/?(?:b|strong|i|em|u|ins|s|strike|del|a|code|pre|blockquote|tg-spoiler)\b)([^>]*)>/gi,
        (m) => m.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    );
}

async function callAiCompletion(settings, chatHistory, userPrompt, context, providerType) {
    providerType = providerType || 'main';
    const isMain = providerType === 'main';
    const provider = isMain ? settings.ai_provider : settings.ai_alt_provider;
    if (!provider || provider === 'none') throw new Error('Provider not selected');

    const apiKey = isMain ? settings.ai_api_key : settings.ai_alt_api_key;
    const model = isMain ? settings.ai_model : settings.ai_alt_model;
    const customHeaders = isMain ? settings.ai_custom_headers : settings.ai_alt_custom_headers;
    const baseUrl = isMain ? settings.ai_base_url : settings.ai_alt_base_url;

    const defaults = getProviderDefaults(provider, baseUrl);
    const finalBaseUrl = (provider === 'custom' ? baseUrl : defaults.baseUrl) || defaults.baseUrl;
    const finalModel = model || defaults.defaultModel;

    if (!apiKey) throw new Error('API key is required for ' + provider);
    if (!finalBaseUrl) throw new Error('Base URL is required for custom provider');

    const temperature = parseFloat(settings.ai_temperature) || 0.7;
    const maxTokens = parseInt(settings.ai_max_tokens) || 1024;
    const topP = parseFloat(settings.ai_top_p) || 1.0;

    let systemContent = settings.ai_system_prompt || '';

    // Add knowledge bases
    try {
        const knowledgeBases = JSON.parse(settings.ai_knowledge_bases || '[]');
        const enabledKbs = knowledgeBases.filter(kb => kb.enabled !== false && kb.content && kb.content.trim());
        if (enabledKbs.length > 0) {
            const kbText = enabledKbs.map((kb, idx) => `Knowledge Base ${idx+1}:\n${kb.content.trim()}`).join('\n\n');
            systemContent += (systemContent ? '\n\n' : '') + kbText;
        }
    } catch(e) {}

    // Add available commands if placeholder used
    if (context && context.available_commands) {
        systemContent = replacePlaceholders(systemContent, context);
    }

    const messages = [];
    if (systemContent.trim()) {
        messages.push({ role: 'system', content: systemContent.trim() });
    }

    if (Array.isArray(chatHistory)) {
        for (const msg of chatHistory) {
            messages.push({ role: msg.role, content: msg.content });
        }
    }

    messages.push({ role: 'user', content: userPrompt });

    const endpoint = finalBaseUrl.replace(/\/+$/, '') + '/chat/completions';
    const headers = { 'Content-Type': 'application/json' };
    if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
    }
    if (customHeaders) {
        try {
            const custom = JSON.parse(customHeaders);
            Object.assign(headers, custom);
        } catch (e) {}
    }

    const payload = {
        model: finalModel,
        messages: messages,
        temperature: temperature,
        max_tokens: maxTokens,
        top_p: topP
    };

    const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`AI API error (${res.status}): ${errText}`);
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
            return Response.json({ success: false, error: 'Provider not configured' });
        }

        const ctx = {
            bot_name: settings.ai_display_name || 'Nyxx AI',
            user_first_name: 'Test User',
            user_username: 'testuser',
            chat_id: 'test',
            custom_vars: {}
        };
        // Add available commands if any
        // We'll fetch commands from DB? Not available here, we can skip.

        const response = await callAiCompletion(settings, [], "Hello! Please confirm connection.", ctx, providerType);
        return Response.json({ success: true, message: response });
    } catch (err) {
        return Response.json({ success: false, error: err.message }, { status: 400 });
    }
}

async function handleAiPlayground(request, env) {
    try {
        const body = await request.json();
        const settings = body.settings || {};
        const history = body.history || [];
        const message = body.message || '';
        if (!message) return Response.json({ error: "Message required" }, { status: 400 });

        // Build context with available commands if needed
        let availableCommands = '';
        if (env.DB) {
            await initializeDatabase(env.DB);
            const commands = await env.DB.prepare("SELECT command FROM commands WHERE enabled = 1").all();
            availableCommands = commands.results.map(r => r.command).join(', ');
        }

        const ctx = {
            bot_name: settings.ai_display_name || 'Nyxx AI',
            user_first_name: 'User',
            user_username: 'testuser',
            chat_id: 'playground',
            available_commands: availableCommands,
            custom_vars: {}
        };
        // Parse custom vars from text
        if (settings.ai_custom_vars_text) {
            const lines = settings.ai_custom_vars_text.split('\n');
            for (const line of lines) {
                const [key, ...val] = line.split('=');
                if (key && val.length) {
                    ctx.custom_vars[key.trim()] = val.join('=').trim();
                }
            }
        }

        const reply = await callAiCompletion(settings, history, message, ctx, 'main');
        return Response.json({ success: true, response: reply });
    } catch (err) {
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}

async function resetAiSettings(env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        await initializeDatabase(env.DB);
        const keys = [
            'ai_enabled', 'ai_provider', 'ai_api_key', 'ai_base_url', 'ai_model',
            'ai_system_prompt', 'ai_trigger', 'ai_memory', 'ai_fallback',
            'ai_temperature', 'ai_max_tokens', 'ai_top_p',
            'ai_suggested_questions_enabled', 'ai_suggested_questions',
            'ai_alt_provider', 'ai_alt_api_key', 'ai_alt_model', 'ai_alt_base_url',
            'ai_custom_headers', 'ai_alt_custom_headers',
            'ai_display_name', 'ai_language', 'ai_style', 'ai_length',
            'ai_rate_limit', 'ai_response_delay', 'ai_ignore_prefixes',
            'ai_group_mention', 'ai_private_reply', 'ai_group_reply',
            'ai_ignore_bots', 'ai_ignore_forwarded', 'ai_typing_indicator',
            'ai_retry_on_failure', 'ai_custom_vars_text', 'ai_knowledge_bases',
            'ai_trigger_text', 'ai_group_memory'
        ];
        for (const k of keys) {
            await env.DB.prepare("DELETE FROM settings WHERE key = ?").bind(k).run();
        }
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

async function clearAiMemory(env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        await env.DB.prepare("DELETE FROM ai_messages").run();
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// ============================================================================
// SETTINGS API
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
// transient failures (e.g. 429 rate limits) instead of failing on the first
// hiccup. Returns { ok, error } with Telegram's own description when it fails.
async function validateBotToken(botToken) {
    let lastError = 'unknown error';
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const data = await tgFetchJson(`https://api.telegram.org/bot${botToken}/getMe`);
            if (data.ok) return { ok: true };
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
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        const body = await request.json();
        const { botToken } = body;
        if (!botToken) return Response.json({ error: "Bot token required" }, { status: 400 });

        await initializeDatabase(env.DB);

        // Re-entering the same token must always succeed: it is already known
        // to be valid, so skip the (rate-limitable) getMe round-trip entirely.
        const stored = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
        const unchanged = !!(stored && stored.value && stored.value === botToken);
        if (!unchanged) {
            const check = await validateBotToken(botToken);
            if (!check.ok) {
                return Response.json({ error: `Invalid bot token${check.error ? ` (${check.error})` : ''}` }, { status: 400 });
            }
        }

        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('bot_token', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(botToken).run();
        const webhookUrl = `${originUrl}/webhook`;
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('webhook_url', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(webhookUrl).run();

        const secret = crypto.randomUUID();
        await env.DB.prepare(`
            INSERT INTO settings (key, value) VALUES ('webhook_secret', ?)
            ON CONFLICT(key) DO UPDATE SET value = excluded.value
        `).bind(secret).run();

        // Drop stale queued updates only when switching to a different bot;
        // re-registering the same bot keeps its queue intact.
        try {
            await registerWebhook(botToken, webhookUrl, secret, { dropPending: !unchanged });
        } catch (hookErr) {
            return Response.json({ error: `Webhook update failed (${hookErr.message})` }, { status: 500 });
        }
        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// Diagnostic test for the Settings > Test Webhook button. Reports what
// Telegram actually sees via getWebhookInfo, so the test no longer needs to
// hit the protected /webhook endpoint (which rightly rejects non-Telegram
// callers with 401).
async function handleWebhookTest(env) {
    if (!env.DB) return Response.json({ error: "DB not available" }, { status: 500 });
    try {
        await initializeDatabase(env.DB);
        const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
        const webhookRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'webhook_url'").first();
        if (!tokenRecord || !tokenRecord.value) {
            return Response.json({ error: "Bot token not set — configure a token first" }, { status: 400 });
        }
        const data = await tgFetchJson(`https://api.telegram.org/bot${tokenRecord.value}/getWebhookInfo`);
        if (!data.ok) {
            const msg = data.description || (data.error_code ? `error_code ${data.error_code}` : 'unknown error');
            return Response.json({ error: `Telegram API error: ${msg}` }, { status: 502 });
        }
        const info = data.result || {};
        const expectedUrl = (webhookRecord && webhookRecord.value) || '';
        return Response.json({
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
    const hashedPassword = await hashPassword(newPassword);
    await env.DB.prepare(`
        INSERT INTO settings (key, value) VALUES ('admin_password', ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `).bind(hashedPassword).run();
    return Response.json({ success: true });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// ============================================================================
// BOT INFO API
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
// FACTORY RESET
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
        const verifyRes = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || !verifyData.success) {
            return Response.json({ valid: false, error: 'Invalid or expired token' }, { status: 401 });
        }

        const accountsRes = await fetch('https://api.cloudflare.com/client/v4/accounts', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const accountsData = await accountsRes.json();
        if (!accountsData.success || !Array.isArray(accountsData.result) || accountsData.result.length === 0) {
            return Response.json({ valid: false, error: 'No accounts found' }, { status: 403 });
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

        const verifyRes = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || !verifyData.success) {
            return Response.json({ success: false, error: 'Invalid token' }, { status: 401 });
        }

        const settingsRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/${scriptName}/settings`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const settingsData = await settingsRes.json();
        let bindings = [];
        if (settingsData.success && settingsData.result && settingsData.result.bindings) {
            bindings = settingsData.result.bindings;
        }

        let scriptUrl = workerUrl || 'https://raw.githubusercontent.com/Mahan07dev/Nyxx/main/worker.js';
        const scriptRes = await fetch(scriptUrl);
        if (!scriptRes.ok) {
            return Response.json({ success: false, error: 'Failed to download script from ' + scriptUrl }, { status: 500 });
        }
        const scriptText = await scriptRes.text();

        let newVersion = null;
        const match = scriptText.match(/const\s+VERSION\s*=\s*['"]([^'"]+)['"]/);
        if (match) newVersion = match[1];

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

        if (newVersion) {
            await env.DB.prepare(`
                INSERT INTO settings (key, value) VALUES ('last_update_version', ?)
                ON CONFLICT(key) DO UPDATE SET value = excluded.value
            `).bind(newVersion).run();
        }

        // After an in-place update, rotate the webhook secret so installs upgraded
        // from older versions also get the new webhook protection.
        try {
            const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
            const webhookRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'webhook_url'").first();
            if (tokenRecord && tokenRecord.value && webhookRecord && webhookRecord.value) {
                // Register the new secret with Telegram FIRST so a failed
                // setWebhook never leaves the panel rejecting real updates.
                const secret = crypto.randomUUID();
                await registerWebhook(tokenRecord.value, webhookRecord.value, secret);
                await env.DB.prepare(`
                    INSERT INTO settings (key, value) VALUES ('webhook_secret', ?)
                    ON CONFLICT(key) DO UPDATE SET value = excluded.value
                `).bind(secret).run();
            }
        } catch (e) {
            console.error('Webhook secret rotation failed:', e);
        }

        return Response.json({ success: true, version: newVersion || 'unknown' });
    } catch (e) {
        return Response.json({ success: false, error: e.message }, { status: 500 });
    }
}

// ============================================================================
// TELEGRAM BOT ENGINE
// ============================================================================
async function handleTelegramWebhook(request, env) {
    if (!env.DB) return new Response('DB not available', { status: 500 });

    // If a webhook secret is configured, only Telegram (which echoes it back in
    // the X-Telegram-Bot-Api-Secret-Token header) may deliver updates.
    try {
        const secretRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'webhook_secret'").first();
        if (secretRecord && secretRecord.value) {
            const header = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
            if (!header || header !== secretRecord.value) {
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

    const tokenRecord = await env.DB.prepare("SELECT value FROM settings WHERE key = 'bot_token'").first();
    if (!tokenRecord || !tokenRecord.value) {
        console.error('Bot token not set');
        return new Response('Token not set', { status: 500 });
    }
    const BOT_TOKEN = tokenRecord.value;

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

            let targetCommand = null;

            if (text === "Back") {
                const session = await env.DB.prepare("SELECT command FROM sessions WHERE user_id = ?").bind(userId).first();
                if (session && session.command) {
                    const parentCmd = await env.DB.prepare("SELECT parent FROM commands WHERE command = ?").bind(session.command).first();
                    if (parentCmd && parentCmd.parent) {
                        targetCommand = parentCmd.parent;
                    }
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

                if (!targetCommand && text.startsWith('/')) {
                    const cmdRecord = await env.DB.prepare("SELECT command FROM commands WHERE command = ? AND enabled = 1").bind(text).first();
                    if (cmdRecord) targetCommand = cmdRecord.command;
                }
            }

            const aiSettings = await getAiSettingsFromDb(env);

            if (targetCommand) {
                const cmdRecord = await env.DB.prepare("SELECT * FROM commands WHERE command = ? AND enabled = 1").bind(targetCommand).first();
                if (cmdRecord) {
                    await executeCommand(chatId, userId, cmdRecord, BOT_TOKEN, env);
                    if (aiSettings.ai_enabled === '1' && aiSettings.ai_trigger === 'all_messages') {
                        await processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN);
                    }
                    return new Response('OK', { status: 200 });
                }
            }

            if (text === '/start') {
                await sendDefaultStart(chatId, env, BOT_TOKEN);
                if (aiSettings.ai_enabled === '1' && aiSettings.ai_trigger === 'all_messages') {
                    await processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN);
                }
                return new Response('OK', { status: 200 });
            }

            if (aiSettings.ai_enabled === '1') {
                let shouldReply = true;
                const trigger = aiSettings.ai_trigger || 'no_command';

                if (trigger === 'no_command') {
                    // no command matched, so we can reply if it's not a command
                    // but we already checked commands, so it's safe.
                } else if (trigger === 'all_messages') {
                    // always reply
                } else if (trigger === 'contains_text') {
                    const triggerText = aiSettings.ai_trigger_text || '';
                    if (triggerText && !text.toLowerCase().includes(triggerText.toLowerCase())) {
                        shouldReply = false;
                    }
                } else {
                    shouldReply = false;
                }

                // Chat type filters
                if (shouldReply) {
                    const isPrivate = msg.chat.type === 'private';
                    const isGroup = msg.chat.type === 'group' || msg.chat.type === 'supergroup';
                    if (isPrivate && aiSettings.ai_private_reply === '0') shouldReply = false;
                    if (isGroup && aiSettings.ai_group_reply === '0') shouldReply = false;
                }

                // Group mention
                if (shouldReply && (msg.chat.type === 'group' || msg.chat.type === 'supergroup')) {
                    if (aiSettings.ai_group_mention === '1') {
                        const botInfo = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`).then(r => r.json());
                        const botUsername = botInfo.ok ? botInfo.result.username : '';
                        if (!text.includes('@' + botUsername)) shouldReply = false;
                    }
                }

                // Ignore bots
                if (shouldReply && aiSettings.ai_ignore_bots === '1' && msg.from.is_bot) shouldReply = false;
                // Ignore forwarded
                if (shouldReply && aiSettings.ai_ignore_forwarded === '1' && msg.forward_date) shouldReply = false;
                // Ignore prefixes
                if (shouldReply && aiSettings.ai_ignore_prefixes) {
                    const prefixes = aiSettings.ai_ignore_prefixes.split(',').map(s => s.trim());
                    for (const p of prefixes) {
                        if (text.startsWith(p)) { shouldReply = false; break; }
                    }
                }

                if (shouldReply) {
                    await processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN);
                }
            } else {
                await sendMessage(chatId, "Command not found. Use /start to see available options.", BOT_TOKEN, 'HTML');
            }
            return new Response('OK', { status: 200 });
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
                if (data) {
                    const chatId = cb.message.chat.id;
                    const userId = cb.from.id;
                    const aiSettings = await getAiSettingsFromDb(env);
                    await processAiReply(chatId, userId, data, aiSettings, env, BOT_TOKEN);
                }
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callback_query_id: cb.id })
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
            await sendMessage(chatId, "⚠️ Unauthorized.", BOT_TOKEN, 'HTML');
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

async function sendMessage(chatId, text, BOT_TOKEN, parseMode) {
    // Ensure text is safe for HTML if parseMode is set
    let finalText = text;
    if (parseMode === 'HTML') {
        finalText = escapeTelegramHTML(text);
    }
    const payload = {
        chat_id: chatId,
        text: finalText
    };
    if (parseMode) payload.parse_mode = parseMode;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
}

async function getAiHistory(db, chatId, limit) {
    if (!limit || limit <= 0) return [];
    const result = await db.prepare("SELECT role, content FROM ai_messages WHERE chat_id = ? ORDER BY id DESC LIMIT ?").bind(chatId, limit).all();
    const rows = result.results || [];
    return rows.reverse();
}

async function saveAiMessage(db, chatId, role, content) {
    await db.prepare("INSERT INTO ai_messages (chat_id, role, content) VALUES (?, ?, ?)").bind(chatId, role, content).run();
}

async function processAiReply(chatId, userId, text, aiSettings, env, BOT_TOKEN) {
    try {
        const userRow = await env.DB.prepare("SELECT first_name, username FROM users WHERE id = ?").bind(userId).first();
        const commands = await env.DB.prepare("SELECT command FROM commands WHERE enabled = 1").all();
        const availableCommands = commands.results.map(r => r.command).join(', ');

        const ctx = {
            bot_name: aiSettings.ai_display_name || 'Nyxx Bot',
            user_first_name: userRow ? userRow.first_name : 'User',
            user_username: userRow ? userRow.username : '',
            chat_id: String(chatId),
            available_commands: availableCommands,
            custom_vars: {}
        };
        if (aiSettings.ai_custom_vars_text) {
            const lines = aiSettings.ai_custom_vars_text.split('\n');
            for (const line of lines) {
                const [key, ...val] = line.split('=');
                if (key && val.length) {
                    ctx.custom_vars[key.trim()] = val.join('=').trim();
                }
            }
        }

        // Determine memory limit based on chat type (we don't know here, use private memory for simplicity)
        // Actually we have separate memory settings; we can use the private one for now.
        const memoryLimit = parseInt(aiSettings.ai_memory || '0');
        let history = [];
        if (memoryLimit > 0) {
            history = await getAiHistory(env.DB, chatId, memoryLimit);
        }

        let reply = null;
        let mainError = null;
        try {
            reply = await callAiCompletion(aiSettings, history, text, ctx, 'main');
        } catch (err) {
            mainError = err.message;
            if (aiSettings.ai_alt_provider && aiSettings.ai_alt_provider !== 'none') {
                try {
                    reply = await callAiCompletion(aiSettings, history, text, ctx, 'alt');
                } catch (altErr) {
                    throw new Error(`Main: ${mainError}, Alt: ${altErr.message}`);
                }
            } else {
                throw err;
            }
        }

        if (memoryLimit > 0) {
            await saveAiMessage(env.DB, chatId, 'user', text);
            await saveAiMessage(env.DB, chatId, 'assistant', reply);
        }

        // Send with HTML formatting
        await sendMessage(chatId, reply, BOT_TOKEN, 'HTML');

        // Suggested questions
        if (aiSettings.ai_suggested_questions_enabled === '1') {
            try {
                const questions = JSON.parse(aiSettings.ai_suggested_questions || '[]');
                if (Array.isArray(questions) && questions.length > 0) {
                    const keyboard = {
                        inline_keyboard: questions.map(q => [{ text: q.label, callback_data: q.value }])
                    };
                    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: "💡 You can ask:",
                            reply_markup: keyboard,
                            parse_mode: 'HTML'
                        })
                    });
                }
            } catch(e) {}
        }
    } catch (err) {
        console.error("AI reply error:", err);
        const fallback = aiSettings.ai_fallback || "Sorry, I am currently unavailable. Please try again later.";
        await sendMessage(chatId, fallback, BOT_TOKEN, 'HTML');
    }
}