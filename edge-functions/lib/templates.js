import { CDN_PREFIX, SUPPORTED_LANG, escapeHtml } from "./constants.js";
import { THEME_INIT_SCRIPT, FOOTER, MODAL, IMAGE_MODAL, HISTORY_MODAL, SHARE_MGR_MODAL, QUICK_SWITCH_MODAL, LIGHTBOX, TOC_PANEL, AdminLogin, NeedSharePasswd } from "./templates-modals.js";

var HTML = ({ lang, title, content, ext = {}, tips, isEdit, showPwPrompt, isPrivateMode = false }) => {
    const isMdMode = ext.mode === "md";
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} — Cloud Notepad</title>
    ${THEME_INIT_SCRIPT}
    <link href="${CDN_PREFIX}/favicon.ico" rel="shortcut icon" type="image/ico" />
    <link href="${CDN_PREFIX}/css/app.min.css" rel="stylesheet" media="screen" />
    ${isEdit && isMdMode ? `<link href="//gcore.jsdelivr.net/npm/vditor@3.10.8/dist/index.css" rel="stylesheet" />` : ""}
    <style>
      :root {
        color-scheme: light;
        --bg-canvas: #ebeef2;
        --bg-surface: #ffffff;
        --bg-subtle: #f6f8fa;
        --bg-muted: #fafbfc;
        --bg-hover: #eef1f4;
        --bg-active: #e1e7ed;
        --bg-float: rgba(255, 255, 255, 0.94);
        --bg-footer: rgba(255, 255, 255, 0.72);
        --mask-bg: rgba(0, 0, 0, 0.45);
        --text-primary: #1f2328;
        --text-body: #24292f;
        --text-editor: #3a3b3c;
        --text-secondary: #57606a;
        --text-muted: #6e7781;
        --border-default: #d0d7de;
        --border-muted: #e1e4e8;
        --border-soft: #eaecef;
        --accent-fg: #0969da;
        --accent-bg: #f0f6fc;
        --accent-bg-strong: #ddf4ff;
        --accent-border: #b6e3ff;
        --danger-fg: #cf222e;
        --danger-bg: #ffebe9;
        --danger-border: #ffc1c0;
        --warn-fg: #9a6700;
        --warn-bg: #fff8c5;
        --warn-border: #d4a72c;
        --success-fg: #1a7f37;
        --success-bg: #dafbe1;
        --success-border: #aceebb;
        --code-bg: rgba(175, 184, 193, 0.2);
        --checker-a: #f0f0f0;
        --checker-b: #ffffff;
        --shadow-card: 0 12px 36px rgba(0, 0, 0, 0.2);
        --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
        --toast-bg: #1f2328;
        --toast-fg: #ffffff;
      }
      html[data-theme="dark"] {
        color-scheme: dark;
        --bg-canvas: #0d1117;
        --bg-surface: #161b22;
        --bg-subtle: #1c2128;
        --bg-muted: #21262d;
        --bg-hover: #262c36;
        --bg-active: #1f2f46;
        --bg-float: rgba(22, 27, 34, 0.94);
        --bg-footer: rgba(22, 27, 34, 0.78);
        --mask-bg: rgba(0, 0, 0, 0.68);
        --text-primary: #f0f6fc;
        --text-body: #e6edf3;
        --text-editor: #e6edf3;
        --text-secondary: #8b949e;
        --text-muted: #7d8590;
        --border-default: #30363d;
        --border-muted: #21262d;
        --border-soft: #262c36;
        --accent-fg: #58a6ff;
        --accent-bg: rgba(56, 139, 253, 0.14);
        --accent-bg-strong: rgba(56, 139, 253, 0.2);
        --accent-border: rgba(56, 139, 253, 0.4);
        --danger-fg: #f85149;
        --danger-bg: rgba(248, 81, 73, 0.14);
        --danger-border: rgba(248, 81, 73, 0.4);
        --warn-fg: #e3b341;
        --warn-bg: rgba(187, 128, 9, 0.18);
        --warn-border: rgba(210, 153, 34, 0.45);
        --success-fg: #3fb950;
        --success-bg: rgba(46, 160, 67, 0.16);
        --success-border: rgba(63, 185, 80, 0.4);
        --code-bg: rgba(110, 118, 129, 0.28);
        --checker-a: #21262d;
        --checker-b: #161b22;
        --shadow-card: 0 14px 40px rgba(0, 0, 0, 0.6);
        --shadow-sm: 0 1px 4px rgba(0, 0, 0, 0.45);
        --toast-bg: #21262d;
        --toast-fg: #f0f6fc;
      }

      /* Dark mode overrides for external app.min.css paper & base chrome */
      html[data-theme="dark"],
      html[data-theme="dark"] body {
        background: var(--bg-canvas) !important;
        color: var(--text-body) !important;
      }
      html[data-theme="dark"] .stack,
      html[data-theme="dark"] .stack .layer_1,
      html[data-theme="dark"] .stack .layer_1 .layer_2,
      html[data-theme="dark"] .stack .layer_1 .layer_2 .layer_3 {
        background: var(--bg-surface) !important;
        border-color: var(--border-default) !important;
        box-shadow: 0 2px 14px rgba(0, 0, 0, 0.45) !important;
      }
      html[data-theme="dark"] textarea#contents,
      html[data-theme="dark"] #preview-plain {
        background: transparent !important;
        color: var(--text-editor) !important;
        caret-color: var(--accent-fg) !important;
      }
      html[data-theme="dark"] textarea#contents::placeholder {
        color: var(--text-muted) !important;
      }
      html[data-theme="dark"] .opt-button {
        background: var(--bg-muted);
        color: var(--text-body);
        border: 1px solid var(--border-default);
      }
      html[data-theme="dark"] .opt-button:hover {
        background: var(--bg-hover);
        border-color: var(--text-muted);
      }
      html[data-theme="dark"] .modal .modal-content {
        background: var(--bg-surface) !important;
        color: var(--text-body) !important;
        border: 1px solid var(--border-default) !important;
      }
      html[data-theme="dark"] .close-btn {
        color: var(--text-secondary) !important;
      }
      html[data-theme="dark"] .close-btn:hover {
        color: var(--text-primary) !important;
      }

      /* Markdown view styling */
      #preview-md {
        line-height: 1.7;
        color: var(--text-body);
        word-wrap: break-word;
        white-space: normal;
        padding: 4px 10px;
        box-sizing: border-box;
      }
      #preview-md h1, #preview-md h2, #preview-md h3, #preview-md h4 {
        margin-top: 20px;
        margin-bottom: 12px;
        font-weight: 600;
        line-height: 1.3;
        color: var(--text-primary);
      }
      #preview-md h1 { font-size: 1.85em; border-bottom: 1px solid var(--border-default); padding-bottom: 0.3em; }
      #preview-md h2 { font-size: 1.45em; border-bottom: 1px solid var(--border-default); padding-bottom: 0.3em; }
      #preview-md h3 { font-size: 1.2em; }
      #preview-md p { margin: 0 0 14px 0; }
      #preview-md blockquote {
        margin: 0 0 16px;
        padding: 4px 14px;
        color: var(--text-secondary);
        border-left: 4px solid var(--accent-fg);
        background: var(--bg-subtle);
        border-radius: 2px;
      }
      #preview-md ul, #preview-md ol {
        padding-left: 24px;
        margin: 0 0 14px;
      }
      #preview-md li { margin-bottom: 4px; }
      #preview-md code {
        padding: 0.2em 0.4em;
        margin: 0;
        font-size: 88%;
        background-color: var(--code-bg);
        border-radius: 6px;
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
      }
      #preview-md pre {
        padding: 14px;
        overflow-x: auto;
        font-size: 88%;
        line-height: 1.45;
        background-color: var(--bg-subtle);
        border: 1px solid var(--border-default);
        border-radius: 6px;
        margin-bottom: 16px;
      }
      #preview-md pre code {
        padding: 0;
        background-color: transparent;
      }
      #preview-md table {
        border-spacing: 0;
        border-collapse: collapse;
        margin: 16px 0;
        width: 100%;
        overflow-x: auto;
        display: block;
      }
      #preview-md table th, #preview-md table td {
        padding: 8px 14px;
        border: 1px solid var(--border-default);
      }
      #preview-md table th {
        background-color: var(--bg-subtle);
        font-weight: 600;
      }
      #preview-md table tr:nth-child(2n) {
        background-color: var(--bg-muted);
      }
      /* Automatic image width & height constraints to prevent screen overflow */
      .vditor-reset img,
      .vditor-ir img,
      .vditor-wysiwyg img,
      .vditor-sv img,
      .vditor-preview img,
      #preview-md img,
      .vditor img,
      .contents img {
        max-width: min(100%, 680px) !important;
        max-height: 520px !important;
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08) !important;
        margin: 16px auto !important;
        display: block !important;
        cursor: zoom-in;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .vditor-reset img:hover,
      .vditor-ir img:hover,
      .vditor-wysiwyg img:hover,
      .vditor-preview img:hover,
      #preview-md img:hover,
      .contents img:hover {
        transform: scale(1.008);
        box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12) !important;
      }
      .img-card {
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .img-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      #preview-md hr {
        height: 2px;
        padding: 0;
        margin: 20px 0;
        background-color: var(--border-default);
        border: 0;
      }
      #preview-md a {
        color: var(--accent-fg);
        text-decoration: none;
      }
      #preview-md a:hover {
        text-decoration: underline;
      }
      .stack .layer_1 .layer_2 .layer_3 .contents.full-width {
        width: 100% !important;
      }
      .stack .layer_1 .layer_2 .layer_3 .contents.hide {
        display: none !important;
      }

      /* Vditor instant rendering overrides */
      #vditor {
        border: none !important;
        background: transparent !important;
        width: 100% !important;
        min-height: calc(100vh - 120px) !important;
      }
      .vditor {
        border: none !important;
        background: transparent !important;
      }
      .vditor-toolbar {
        display: none !important;
      }
      .vditor-ir {
        background: transparent !important;
      }
      .vditor-ir pre.vditor-reset {
        padding: 0 10px 80px 10px !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: 15px !important;
        line-height: 1.7 !important;
        color: var(--text-editor) !important;
        background: transparent !important;
      }
      html[data-theme="dark"] .vditor--dark {
        --panel-background-color: var(--bg-surface);
        --textarea-background-color: transparent;
        --border-color: var(--border-default);
        --second-color: var(--text-secondary);
        --hover-background-color: var(--bg-hover);
      }
      html[data-theme="dark"] .vditor-reset {
        color: var(--text-editor) !important;
      }
      html[data-theme="dark"] .vditor-reset h1,
      html[data-theme="dark"] .vditor-reset h2,
      html[data-theme="dark"] .vditor-reset h3,
      html[data-theme="dark"] .vditor-reset h4 {
        color: var(--text-primary) !important;
        border-color: var(--border-default) !important;
      }
      html[data-theme="dark"] .vditor-reset blockquote {
        color: var(--text-secondary) !important;
        border-left-color: var(--accent-fg) !important;
        background: var(--bg-subtle) !important;
      }
      html[data-theme="dark"] .vditor-reset code:not(.hljs) {
        background-color: var(--code-bg) !important;
        color: var(--text-body) !important;
      }
      html[data-theme="dark"] .vditor-reset pre,
      html[data-theme="dark"] .vditor-ir__marker--pre {
        background-color: var(--bg-subtle) !important;
      }
      html[data-theme="dark"] .vditor-reset table th,
      html[data-theme="dark"] .vditor-reset table td {
        border-color: var(--border-default) !important;
        background-color: transparent !important;
      }
      html[data-theme="dark"] .vditor-reset table th {
        background-color: var(--bg-subtle) !important;
      }
      html[data-theme="dark"] .vditor-reset a {
        color: var(--accent-fg) !important;
      }

      /* Sidebar toggle button (top-left minimalist trigger) */
      .sidebar-toggle-btn {
        position: fixed;
        top: 14px;
        left: 14px;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        background: var(--bg-float);
        border: 1px solid var(--border-default);
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 100;
        transition: all 0.2s ease;
        box-shadow: var(--shadow-sm);
        font-size: 16px;
        opacity: 0.8;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
      }
      .sidebar-toggle-btn:hover {
        opacity: 1;
        background: var(--bg-surface);
        color: var(--text-primary);
        border-color: var(--text-muted);
        box-shadow: var(--shadow-sm);
      }

      /* Sidebar overlay */
      .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--mask-bg);
        backdrop-filter: blur(2px);
        z-index: 998;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.25s ease, visibility 0.25s ease;
      }
      .sidebar-overlay.active {
        opacity: 1;
        visibility: visible;
      }

      /* Sidebar container */
      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 290px;
        height: 100%;
        background: var(--bg-surface);
        color: var(--text-body);
        border-right: 1px solid var(--border-muted);
        z-index: 999;
        transform: translateX(-100%);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        box-shadow: var(--shadow-card);
        box-sizing: border-box;
      }
      .sidebar.active {
        transform: translateX(0);
      }

      /* Sidebar header */
      .sidebar-header {
        padding: 16px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-soft);
      }
      .sidebar-brand {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        font-size: 15px;
        color: var(--text-body);
      }
      .sidebar-close-btn {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 16px;
        padding: 4px 8px;
        border-radius: 4px;
      }
      .sidebar-close-btn:hover { background: var(--bg-hover); color: var(--text-body); }

      /* Sidebar search and actions */
      .sidebar-actions {
        padding: 12px 14px;
        display: flex;
        gap: 6px;
        border-bottom: 1px solid var(--border-muted);
      }
      .sidebar-search-input {
        flex: 1;
        min-width: 0;
        padding: 6px 10px;
        font-size: 13px;
        border: 1px solid var(--border-default);
        border-radius: 5px;
        outline: none;
        background: var(--bg-subtle);
        color: var(--text-body);
      }
      .sidebar-search-input:focus {
        border-color: var(--accent-fg);
        background: var(--bg-surface);
      }
      .sidebar-qs-btn {
        padding: 0 8px;
        background: var(--bg-subtle);
        color: var(--text-secondary);
        border: 1px solid var(--border-default);
        border-radius: 5px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 0.15s ease;
      }
      .sidebar-qs-btn:hover {
        background: var(--accent-bg);
        color: var(--accent-fg);
        border-color: var(--accent-fg);
      }
      .sidebar-new-btn {
        padding: 6px 10px;
        background: #2da44e;
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .sidebar-new-btn:hover { background: #2c974b; }

      /* Tree view */
      .sidebar-tree {
        flex: 1;
        overflow-y: auto;
        padding: 10px 8px;
      }
      .tree-node {
        margin-bottom: 2px;
      }
      .tree-folder-title {
        display: flex;
        align-items: center;
        padding: 6px 8px;
        font-size: 13px;
        font-weight: 600;
        color: var(--text-body);
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
      }
      .tree-folder-title:hover {
        background: var(--bg-hover);
      }
      .tree-folder-arrow {
        display: inline-block;
        width: 14px;
        font-size: 10px;
        transition: transform 0.15s ease;
        color: var(--text-muted);
      }
      .tree-folder.collapsed .tree-folder-arrow {
        transform: rotate(-90deg);
      }
      .tree-folder.collapsed .tree-folder-content {
        display: none;
      }
      .tree-folder-content {
        padding-left: 14px;
        border-left: 1px solid var(--border-muted);
        margin-left: 8px;
      }
      .tree-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
        font-size: 13px;
        color: var(--text-body);
        border-radius: 4px;
        cursor: pointer;
        text-decoration: none;
        position: relative;
      }
      .tree-item:hover {
        background: var(--bg-hover);
      }
      .tree-item.active {
        background: var(--bg-active);
        font-weight: 600;
        color: var(--accent-fg);
      }
      .tree-item-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
        text-decoration: none;
        color: inherit;
      }
      .tree-item-actions {
        display: none;
        align-items: center;
        gap: 4px;
      }
      .tree-item:hover .tree-item-actions {
        display: flex;
      }
      .tree-item-rename-btn {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 2px 5px;
        border-radius: 3px;
        font-size: 12px;
        display: inline-flex;
        align-items: center;
      }
      .tree-item-rename-btn:hover {
        background: var(--bg-hover);
        color: var(--accent-fg);
      }
      .tree-item-del-btn {
        background: none;
        border: none;
        color: var(--danger-fg);
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 12px;
      }
      .tree-item-del-btn:hover {
        background: var(--danger-bg);
      }

      /* Sidebar backup & footer */
      .sidebar-backup-box {
        padding: 10px 14px;
        border-top: 1px solid var(--border-muted);
        background: var(--bg-surface);
      }
      .sidebar-export-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 7px 12px;
        background: var(--bg-subtle);
        border: 1px solid var(--border-default);
        border-radius: 6px;
        font-size: 12px;
        color: var(--text-body);
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s;
      }
      .sidebar-footer {
        padding: 12px 16px;
        border-top: 1px solid var(--border-soft);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        color: var(--text-secondary);
        background: var(--bg-muted);
      }
      .sidebar-logout-btn {
        background: none;
        border: none;
        color: var(--danger-fg);
        cursor: pointer;
        font-size: 12px;
        padding: 4px 6px;
      }
      .sidebar-logout-btn:hover {
        text-decoration: underline;
      }
      /* Share modal content override */
      .share-modal .modal-content {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        bottom: auto !important;
        right: auto !important;
        transform: translate(-50%, -50%) !important;
        margin: 0 !important;
        width: 90% !important;
        max-width: 440px !important;
        height: auto !important;
        max-height: 90vh !important;
        overflow-y: auto !important;
        display: block !important;
        padding: 24px 28px !important;
        box-sizing: border-box !important;
        background: var(--bg-surface) !important;
        color: var(--text-body) !important;
        border: 1px solid var(--border-default) !important;
        border-radius: 12px !important;
        box-shadow: var(--shadow-card) !important;
        z-index: 1000 !important;
      }
      .image-modal .modal-content, .history-modal .modal-content, .share-mgr-modal .modal-content {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        bottom: auto !important;
        right: auto !important;
        transform: translate(-50%, -50%) !important;
        margin: 0 !important;
        width: 90% !important;
        max-width: 760px !important;
        height: auto !important;
        min-height: 320px !important;
        max-height: 85vh !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: flex-start !important;
        align-items: stretch !important;
        padding: 20px 24px !important;
        box-sizing: border-box !important;
        background: var(--bg-surface) !important;
        color: var(--text-body) !important;
        border: 1px solid var(--border-default) !important;
        border-radius: 12px !important;
        box-shadow: var(--shadow-card) !important;
        z-index: 1002 !important;
        overflow: hidden !important;
      }
      /* Quick Switch & Full-Text Search Palette */
      .quick-switch-modal .quick-switch-content {
        position: relative !important;
        inset: auto !important;
        transform: none !important;
        margin: 0 12px !important;
        z-index: 1011 !important;
        width: 100% !important;
        max-width: 660px !important;
        height: auto !important;
        max-height: 76vh !important;
        background: var(--bg-surface) !important;
        color: var(--text-body) !important;
        border: 1px solid var(--border-default) !important;
        border-radius: 12px !important;
        box-shadow: var(--shadow-card) !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        padding: 0 !important;
        box-sizing: border-box !important;
        text-align: left !important;
      }
      .qs-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 14px;
        border-bottom: 1px solid var(--border-muted);
        background: var(--bg-surface);
      }
      .qs-input {
        flex: 1;
        min-width: 0;
        border: none;
        outline: none;
        background: transparent;
        color: var(--text-primary);
        font-size: 14px;
        line-height: 1.4;
      }
      .qs-input::placeholder { color: var(--text-muted); }
      .qs-tabs {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
      }
      .qs-mode-btn {
        padding: 3px 9px;
        font-size: 12px;
        border-radius: 5px;
        border: 1px solid var(--border-default);
        background: var(--bg-subtle);
        color: var(--text-secondary);
        cursor: pointer;
        white-space: nowrap;
      }
      .qs-mode-btn.active {
        background: var(--accent-fg);
        color: #fff;
        border-color: var(--accent-fg);
        font-weight: 500;
      }
      .qs-icon-btn {
        padding: 4px 6px;
        border-radius: 5px;
        border: 1px solid var(--border-default);
        background: var(--bg-subtle);
        color: var(--text-secondary);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .qs-icon-btn:hover {
        background: var(--bg-hover);
        color: var(--accent-fg);
      }
      .qs-close-btn {
        position: static !important;
        width: auto !important;
        height: auto !important;
        line-height: 1 !important;
        padding: 2px 6px;
        font-size: 16px;
        cursor: pointer;
        color: var(--text-secondary);
        flex-shrink: 0;
      }
      .qs-status {
        padding: 6px 14px;
        font-size: 11px;
        color: var(--text-muted);
        background: var(--bg-subtle);
        border-bottom: 1px solid var(--border-muted);
      }
      .qs-results {
        flex: 1;
        overflow-y: auto;
        padding: 6px;
        min-height: 140px;
        max-height: 52vh;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .qs-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px 10px;
        border-radius: 7px;
        border: 1px solid transparent;
        cursor: pointer;
        text-decoration: none;
        color: var(--text-body);
        transition: background 0.12s ease;
      }
      .qs-item:hover,
      .qs-item.active {
        background: var(--accent-bg);
        border-color: var(--accent-border);
      }
      .qs-item-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .qs-item-path {
        font-size: 13px;
        font-weight: 600;
        color: var(--text-primary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .qs-item.active .qs-item-path {
        color: var(--accent-fg);
      }
      .qs-item-badge {
        font-size: 11px;
        color: var(--text-muted);
        flex-shrink: 0;
      }
      .qs-snippet {
        font-size: 12px;
        line-height: 1.45;
        color: var(--text-secondary);
        word-break: break-word;
      }
      .qs-hl {
        background: var(--warn-bg);
        color: var(--warn-fg);
        border-radius: 3px;
        padding: 0 2px;
        font-weight: 600;
      }
      .qs-empty {
        padding: 36px 16px;
        text-align: center;
        color: var(--text-muted);
        font-size: 13px;
      }
      .qs-footer {
        padding: 8px 14px;
        border-top: 1px solid var(--border-muted);
        background: var(--bg-subtle);
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        font-size: 11px;
        color: var(--text-muted);
      }

      /* Shared theme-aware helper classes for dynamic modals */
      .history-snap-item {
        padding: 8px 10px;
        border: 1px solid var(--border-default);
        border-radius: 6px;
        cursor: pointer;
        background: var(--bg-surface);
        color: var(--text-body);
        transition: all 0.15s ease;
        text-align: left;
      }
      .history-snap-item:hover {
        background: var(--bg-subtle);
      }
      .history-snap-item.selected {
        border-color: var(--accent-fg);
        background: var(--accent-bg);
      }
      .img-preview-box {
        width: 100%;
        height: 110px;
        background-image: repeating-conic-gradient(var(--checker-a) 0% 25%, var(--checker-b) 0% 50%) 50% / 16px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
      }
      .sm-tab {
        background: var(--bg-subtle) !important;
        color: var(--text-secondary) !important;
        border: 1px solid var(--border-default) !important;
      }
      .sm-tab.active {
        background: var(--accent-fg) !important;
        color: #fff !important;
        border-color: var(--accent-fg) !important;
      }
      .sm-btn {
        background: var(--bg-surface) !important;
        color: var(--text-body) !important;
        border: 1px solid var(--border-default) !important;
      }
      .sm-clean-btn {
        background: var(--warn-bg) !important;
        color: var(--warn-fg) !important;
        border: 1px solid var(--warn-border) !important;
      }
      .sm-card {
        border: 1px solid var(--border-default);
        border-radius: 8px;
        padding: 10px 12px;
        background: var(--bg-surface);
      }
      .sm-folder-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
        background: var(--bg-subtle);
        border: 1px solid var(--border-default);
        border-radius: 6px;
        cursor: pointer;
        user-select: none;
      }
      #action-toast {
        position: fixed;
        bottom: 60px;
        right: 24px;
        background: var(--toast-bg);
        color: var(--toast-fg);
        border: 1px solid var(--border-default);
        padding: 7px 14px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        z-index: 99999;
        box-shadow: var(--shadow-card);
        opacity: 1;
        transition: opacity 0.2s ease;
        pointer-events: none;
      }
      #action-toast.error {
        background: var(--danger-fg);
        color: #fff;
        border-color: var(--danger-fg);
      }

      /* Markdown button active / inactive states */
      .opt-mode-active {
        background: #3a86ff !important;
        color: #ffffff !important;
        border: 1px solid #3a86ff !important;
        font-weight: 500 !important;
      }
      .opt-mode-active:hover {
        background: #2a75ef !important;
        border-color: #2a75ef !important;
      }
      .opt-mode-inactive {
        background: var(--bg-subtle) !important;
        color: var(--text-secondary) !important;
        border: 1px solid var(--border-default) !important;
        font-weight: normal !important;
      }
      .opt-mode-inactive:hover {
        background: var(--bg-hover) !important;
        color: var(--text-body) !important;
        border-color: var(--text-muted) !important;
      }

      /* Note Container & Content clearance from bottom footer */
      .note-container {
        padding-bottom: 85px !important;
        box-sizing: border-box !important;
      }
      .stack .layer_1 .layer_2 .layer_3 .contents:not(#vditor) {
        padding-bottom: 70px !important;
        box-sizing: border-box !important;
      }
      .stack .layer_1 .layer_2 .layer_3 #vditor.contents {
        padding: 0 !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
      }
      #preview-md, #preview-plain {
        padding-bottom: 80px !important;
        box-sizing: border-box !important;
      }
      .vditor-reset {
        padding-bottom: 80px !important;
        box-sizing: border-box !important;
      }

      /* Base Footer (Desktop default) */
      .footer {
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        height: auto !important;
        min-height: 42px !important;
        background: var(--bg-footer) !important;
        backdrop-filter: blur(14px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(14px) saturate(180%) !important;
        border-top: 1px solid var(--border-default) !important;
        box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.04) !important;
        padding: 6px 24px !important;
        box-sizing: border-box !important;
        z-index: 950 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 12px !important;
      }
      .footer .opt {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        flex-shrink: 0 !important;
      }
      .footer .opt .opt-button {
        padding: 4px 10px !important;
        font-size: 13px !important;
        border-radius: 4px !important;
        white-space: nowrap !important;
        cursor: pointer !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        line-height: 1.4 !important;
        text-decoration: none !important;
        transition: all 0.15s ease !important;
      }
      .footer .status-row {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
        margin-left: auto !important;
      }
      .footer .footer-icon-group {
        display: inline-flex !important;
        align-items: center !important;
        gap: 2px !important;
      }
      .footer .theme-toggle-btn,
      .footer .github-link {
        width: 20px !important;
        height: 20px !important;
        padding: 0 !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        flex-shrink: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 5px !important;
        border: 1px solid transparent !important;
        background: transparent !important;
        color: var(--text-secondary) !important;
        text-decoration: none !important;
        cursor: pointer !important;
        transition: all 0.15s ease !important;
      }
      .footer .theme-toggle-btn:hover,
      .footer .github-link:hover {
        color: var(--text-primary) !important;
        background: var(--bg-hover) !important;
        border-color: var(--border-default) !important;
      }
      .footer .theme-toggle-btn.opt-locked {
        background: transparent !important;
        border-color: transparent !important;
        color: var(--warn-fg) !important;
      }
      .footer .theme-toggle-btn.opt-locked:hover {
        background: var(--bg-hover) !important;
        border-color: var(--border-default) !important;
        color: var(--warn-fg) !important;
      }
      .footer .theme-toggle-btn svg,
      .footer .github-link svg {
        width: 12px !important;
        height: 12px !important;
        display: block !important;
        flex-shrink: 0 !important;
      }

      /* Mobile Responsive (<= 768px) */
      @media (max-width: 768px) {
        .note-container {
          padding: 16px 10px 0 10px !important;
        }
        .stack .layer_1 .layer_2 .layer_3 {
          min-height: calc(100vh - 37px) !important;
          padding: 26px 14px 0 14px !important;
          box-sizing: border-box !important;
        }
        .stack .layer_1 .layer_2 .layer_3 .contents:not(#vditor) {
          height: calc(100vh - 65px) !important;
          padding-bottom: 95px !important;
          box-sizing: border-box !important;
        }
        .stack .layer_1 .layer_2 .layer_3 #vditor.contents {
          height: calc(100vh - 65px) !important;
          padding: 0 !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
        }
        .vditor-ir pre.vditor-reset {
          padding-bottom: 95px !important;
        }
        #preview-md, #preview-plain {
          min-height: calc(100vh - 65px) !important;
          padding-bottom: 105px !important;
          box-sizing: border-box !important;
        }
        .footer {
          padding: 6px 12px 8px 12px !important;
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 6px !important;
          background: var(--bg-footer) !important;
          backdrop-filter: blur(16px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
          border-top: 1px solid var(--border-default) !important;
          box-shadow: 0 -2px 14px rgba(0, 0, 0, 0.04) !important;
        }
        .footer .opt {
          width: 100% !important;
          display: flex !important;
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch !important;
          gap: 6px !important;
          padding-bottom: 2px !important;
          scrollbar-width: none !important;
        }
        .footer .opt::-webkit-scrollbar {
          display: none !important;
        }
        .footer .opt .opt-button {
          font-size: 12px !important;
          padding: 4px 9px !important;
          flex-shrink: 0 !important;
        }
        .footer .status-row {
          width: 100% !important;
          margin-left: 0 !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          font-size: 11px !important;
          gap: 6px !important;
        }
        #status-word-count, .footer .last-modified {
          font-size: 11px !important;
        }
      }
      /* TOC Floating Button & Panel */
      .toc-toggle-btn {
        position: fixed;
        top: 14px;
        right: 14px;
        height: 32px;
        padding: 0 10px;
        border-radius: 6px;
        background: var(--bg-float);
        border: 1px solid var(--border-default);
        color: var(--text-secondary);
        display: none;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        z-index: 990;
        box-shadow: var(--shadow-sm);
        transition: all 0.2s ease;
        font-size: 13px;
        font-weight: 500;
        user-select: none;
        opacity: 0.8;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
      }
      .toc-toggle-btn:hover {
        opacity: 1;
        background: var(--bg-surface);
        color: var(--accent-fg);
        border-color: var(--text-muted);
      }
      .toc-badge {
        font-size: 11px;
        font-weight: 600;
        padding: 1px 6px;
        border-radius: 10px;
        background: var(--accent-bg);
        color: var(--accent-fg);
        border: 1px solid var(--border-default);
        line-height: 1.2;
      }
      .toc-panel {
        position: fixed;
        top: 52px;
        right: 14px;
        width: 250px;
        max-height: calc(85vh - 60px);
        background: var(--bg-surface);
        color: var(--text-body);
        border: 1px solid var(--border-default);
        border-radius: 8px;
        box-shadow: var(--shadow-card);
        display: none;
        flex-direction: column;
        z-index: 995;
        overflow: hidden;
        animation: tocSlideDown 0.15s ease-out;
      }
      @keyframes tocSlideDown {
        from { opacity: 0; transform: translateY(-6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .toc-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        border-bottom: 1px solid var(--border-muted);
        background: var(--bg-subtle);
        user-select: none;
      }
      .toc-list {
        padding: 8px 6px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 2px;
        max-height: calc(85vh - 110px);
      }
      .toc-item {
        display: block;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        line-height: 1.4;
        color: var(--text-secondary);
        text-decoration: none;
        cursor: pointer;
        transition: background 0.15s ease, color 0.15s ease;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .toc-item:hover {
        background: var(--accent-bg);
        color: var(--accent-fg);
      }
      .toc-item.active {
        background: var(--accent-bg-strong);
        color: var(--accent-fg);
        font-weight: 600;
      }
      .toc-item.h1 { font-weight: 600; color: var(--text-primary); padding-left: 8px; }
      .toc-item.h2 { font-weight: 500; color: var(--text-body); padding-left: 18px; }
      .toc-item.h3 { color: var(--text-secondary); padding-left: 28px; }
      .toc-item.h4 { color: var(--text-muted); padding-left: 36px; font-size: 11px; }
      .toc-item.h5 { color: var(--text-muted); padding-left: 44px; font-size: 11px; }
      .toc-item.h6 { color: var(--text-muted); padding-left: 52px; font-size: 11px; }

      /* Sidebar full vault export button */
      .sidebar-export-btn:hover {
        background: var(--bg-hover) !important;
        border-color: var(--text-muted) !important;
        color: var(--accent-fg) !important;
      }
      .sidebar-export-btn:active {
        background: var(--bg-active) !important;
      }

      /* Lightweight Collapsible Edit Toolbar */
      .edit-toolbar-wrap {
        position: fixed;
        top: 14px;
        left: 54px;
        right: 92px;
        z-index: 98;
        display: flex;
        align-items: flex-start;
        gap: 6px;
        pointer-events: none;
      }
      .edit-toolbar-wrap.no-sidebar {
        left: 14px;
      }
      .edit-toolbar-toggle {
        pointer-events: auto;
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        border-radius: 6px;
        background: var(--bg-float);
        border: 1px solid var(--border-default);
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: var(--shadow-sm);
        padding: 0;
        opacity: 0.8;
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
      }
      .edit-toolbar-toggle:hover {
        opacity: 1;
        background: var(--bg-surface);
        color: var(--text-primary);
        border-color: var(--text-muted);
      }
      .edit-toolbar-toggle.active {
        opacity: 1;
        background: var(--accent-bg);
        color: var(--accent-fg);
        border-color: var(--accent-fg);
      }
      .edit-toolbar-bar {
        pointer-events: auto;
        display: none;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;
        padding: 3px 5px;
        background: var(--bg-float);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid var(--border-default);
        border-radius: 8px;
        box-shadow: var(--shadow-card);
        max-width: 100%;
        box-sizing: border-box;
      }
      .edit-toolbar-bar.open {
        display: flex;
        animation: tocSlideDown 0.15s ease-out;
      }
      .etb-btn {
        height: 26px;
        min-width: 26px;
        padding: 0 7px;
        border: 1px solid var(--border-default);
        border-radius: 5px;
        background: var(--bg-surface);
        color: var(--text-body);
        font-size: 12px;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        cursor: pointer;
        user-select: none;
        transition: all 0.15s ease;
        flex-shrink: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      .etb-btn:hover {
        background: var(--bg-hover);
        border-color: var(--text-muted);
        color: var(--accent-fg);
      }
      .etb-btn:active {
        background: var(--bg-active);
      }
      @media screen and (max-width: 768px) {
        .edit-toolbar-wrap {
          right: auto;
        }
        .edit-toolbar-bar {
          position: fixed;
          top: 52px;
          left: 14px;
          right: 14px;
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 5px 6px;
          z-index: 992;
        }
        .edit-toolbar-bar::-webkit-scrollbar {
          display: none;
        }
      }
    </style>
</head>
<body>
    ${isEdit && isPrivateMode ? `
    <!-- Top-left Sidebar Toggle Button -->
    <button id="sidebar-toggle-btn" class="sidebar-toggle-btn" title="菜单"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:auto;"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
    <div id="sidebar-overlay" class="sidebar-overlay"></div>
    <div id="sidebar" class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <span>Cloud Notepad</span>
        </div>
        <button id="sidebar-close-btn" class="sidebar-close-btn" title="关闭">✕</button>
      </div>
      <div class="sidebar-actions">
        <input type="text" id="sidebar-search" class="sidebar-search-input" placeholder="${SUPPORTED_LANG[lang].searchNotes}" />
        <button type="button" id="sidebar-quick-search-btn" class="sidebar-qs-btn" title="${lang === 'zh' ? '快速切换 / 全文搜索 (Ctrl+K)' : 'Quick Switch / Full-Text Search (Ctrl+K)'}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <button id="sidebar-new-btn" class="sidebar-new-btn">+ ${SUPPORTED_LANG[lang].newNote}</button>
      </div>
      <div class="sidebar-tree" id="sidebar-tree">
        <div style="padding:16px;color:var(--text-muted);text-align:center;">${SUPPORTED_LANG[lang].searchNotes}</div>
      </div>
      <div class="sidebar-backup-box">
        <button id="sidebar-export-zip-btn" class="sidebar-export-btn" type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span id="sidebar-export-text">${SUPPORTED_LANG[lang].exportZip || "导出全库备份 (.zip)"}</span>
        </button>
      </div>
      <div class="sidebar-footer">
        <div style="display:flex; flex-direction:column; gap:3px; text-align:left;">
          <span>${isPrivateMode ? SUPPORTED_LANG[lang].privateVault : SUPPORTED_LANG[lang].publicVault}</span>
          <div style="display:grid; grid-template-columns:auto auto auto; align-items:baseline; column-gap:4px; row-gap:3px; width:fit-content;">
            <span style="font-size:11px; color:var(--text-muted); white-space:nowrap;">${lang === "zh" ? "图片:" : "Images:"}</span>
            <span id="sidebar-img-quota" style="font-size:11px; color:var(--text-muted); text-align:center; white-space:nowrap;">0.00MB / 200MB</span>
            <a href="javascript:void(0)" id="sidebar-open-img-mgr" style="font-size:11px; color:var(--accent-fg); text-decoration:none; cursor:pointer; white-space:nowrap; text-align:right; margin-left:4px;">[${lang === "zh" ? "管理" : "Manage"}]</a>
            <span style="font-size:11px; color:var(--text-muted); white-space:nowrap;">${lang === "zh" ? "分享:" : "Shares:"}</span>
            <span id="sidebar-share-stats" style="font-size:11px; color:var(--text-muted); text-align:center; white-space:nowrap;">0/0 · RAW: 0/0</span>
            <a href="javascript:void(0)" id="sidebar-open-share-mgr" style="font-size:11px; color:var(--accent-fg); text-decoration:none; cursor:pointer; white-space:nowrap; text-align:right; margin-left:4px;">[${lang === "zh" ? "管理" : "Manage"}]</a>
          </div>
        </div>
        ${isPrivateMode ? `<button id="sidebar-logout-btn" class="sidebar-logout-btn">${SUPPORTED_LANG[lang].logout}</button>` : ""}
      </div>
    </div>
    ` : ""}

    ${isEdit ? `
    <!-- Lightweight Collapsible Edit Toolbar (collapsed by default) -->
    <div id="edit-toolbar-wrap" class="edit-toolbar-wrap ${isPrivateMode ? "" : "no-sidebar"}">
      <button id="edit-toolbar-toggle" type="button" class="edit-toolbar-toggle" title="${lang === "zh" ? "编辑格式工具栏" : "Format Toolbar"}" aria-expanded="false">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </button>
      <div id="edit-toolbar-bar" class="edit-toolbar-bar" role="toolbar" aria-label="${lang === "zh" ? "编辑菜单栏" : "Edit Toolbar"}">
        <button type="button" class="etb-btn" data-md="bold" title="${lang === "zh" ? "加粗" : "Bold"}"><strong style="font-weight:700;">B</strong></button>
        <button type="button" class="etb-btn" data-md="italic" title="${lang === "zh" ? "斜体" : "Italic"}"><em style="font-style:italic;font-family:Georgia,serif;">I</em></button>
        <button type="button" class="etb-btn" data-md="h3" title="${lang === "zh" ? "三级标题" : "Heading 3"}"><span style="font-weight:600;">H3</span></button>
        <button type="button" class="etb-btn" data-md="quote" title="${lang === "zh" ? "引用" : "Quote"}"><span style="font-weight:700;font-family:Georgia,serif;font-size:14px;">&rdquo;</span></button>
        <button type="button" class="etb-btn" data-md="code" title="${lang === "zh" ? "行内代码" : "Inline Code"}"><span style="font-family:monospace;font-weight:600;font-size:11px;">&lt;/&gt;</span></button>
        <button type="button" class="etb-btn" data-md="codeblock" title="${lang === "zh" ? "代码块" : "Code Block"}"><span style="font-family:monospace;font-weight:600;font-size:11px;">{}</span></button>
        <button type="button" class="etb-btn" data-md="ul" title="${lang === "zh" ? "无序列表" : "Bullet List"}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="20" y2="6"></line><line x1="9" y1="12" x2="20" y2="12"></line><line x1="9" y1="18" x2="20" y2="18"></line><circle cx="4" cy="6" r="1.2" fill="currentColor"></circle><circle cx="4" cy="12" r="1.2" fill="currentColor"></circle><circle cx="4" cy="18" r="1.2" fill="currentColor"></circle></svg>
          <span>${lang === "zh" ? "列表" : "List"}</span>
        </button>
        <button type="button" class="etb-btn" data-md="task" title="${lang === "zh" ? "任务列表" : "Task List"}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
          <span>${lang === "zh" ? "任务" : "Task"}</span>
        </button>
        <button type="button" class="etb-btn" data-md="link" title="${lang === "zh" ? "插入链接" : "Link"}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          <span>${lang === "zh" ? "链接" : "Link"}</span>
        </button>
        <button type="button" class="etb-btn" data-md="image" title="${lang === "zh" ? "插入图片" : "Image"}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          <span>${lang === "zh" ? "图片" : "Image"}</span>
        </button>
        <button type="button" class="etb-btn" data-md="table" title="${lang === "zh" ? "插入表格" : "Table"}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
          <span>${lang === "zh" ? "表格" : "Table"}</span>
        </button>
      </div>
    </div>
    ` : ""}

    <div class="note-container">
        <div id="draft-alert" style="display:none; width:100%; max-width:960px; margin:0 auto 12px auto; padding:8px 16px; background:var(--warn-bg); border:1px solid var(--warn-border); border-radius:6px; font-size:13px; color:var(--warn-fg); align-items:center; justify-content:space-between; box-shadow:0 1px 4px rgba(0,0,0,0.06); box-sizing:border-box;">
            <span id="draft-alert-msg">${SUPPORTED_LANG[lang].draftDetected || "检测到本地未保存草稿"}</span>
            <div style="display:flex; gap:8px;">
                <button id="draft-restore-btn" type="button" class="opt-button" style="background:#2da44e; color:#fff; border-color:#2da44e; padding:3px 12px; font-size:12px; font-weight:500; cursor:pointer;">${SUPPORTED_LANG[lang].restoreDraft || "恢复草稿"}</button>
                <button id="draft-discard-btn" type="button" class="opt-button" style="padding:3px 10px; font-size:12px; cursor:pointer;">${SUPPORTED_LANG[lang].discardDraft || "放弃"}</button>
            </div>
        </div>
        ${tips ? `<div class="tips-box" style="width:100%; max-width:960px; margin:0 auto 12px auto; box-sizing:border-box;">${tips.startsWith("<") ? tips : `<div style="background:var(--warn-bg); border:1px solid var(--warn-border); color:var(--warn-fg); padding:10px 16px; border-radius:6px; font-size:13px; line-height:1.5;">${tips}</div>`}</div>` : ""}
        <div class="stack">
            <div class="layer_1">
                <div class="layer_2">
                    <div class="layer_3">
                        <textarea id="contents" class="contents full-width ${isEdit && !isMdMode ? "" : "hide"}" spellcheck="true" placeholder="${SUPPORTED_LANG[lang].emptyPH}">${escapeHtml(content || "")}</textarea>
                        ${isEdit && isMdMode ? `<div id="vditor" class="contents full-width"></div>` : ""}
                        ${!isEdit && isMdMode ? `<div id="preview-md" class="contents full-width"></div>` : ""}
                        ${!isEdit && !isMdMode ? `<div id="preview-plain" class="contents full-width"></div>` : ""}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="loading"></div>
    ${isEdit ? MODAL(lang, ext) : ""}
    ${isEdit && isPrivateMode ? IMAGE_MODAL(lang) : ""}
    ${isEdit && isPrivateMode ? HISTORY_MODAL(lang) : ""}
    ${isEdit && isPrivateMode ? SHARE_MGR_MODAL(lang) : ""}
    ${isEdit && isPrivateMode ? QUICK_SWITCH_MODAL(lang) : ""}
    ${LIGHTBOX()}
    ${TOC_PANEL(lang)}
    ${FOOTER({ ...ext, isEdit, lang, isPrivateMode, path: title })}
    ${isEdit && isMdMode ? `<script src="//gcore.jsdelivr.net/npm/vditor@3.10.8/dist/index.min.js"><\/script>` : ""}
    ${!isEdit && isMdMode || ext.share ? `<script src="${CDN_PREFIX}/js/purify.min.js"><\/script>` : ""}
    ${!isEdit && isMdMode ? `<script src="${CDN_PREFIX}/js/marked.min.js"><\/script>` : ""}
    <script src="${CDN_PREFIX}/js/clip.min.js"><\/script>
    <script src="${CDN_PREFIX}/js/app.min.js"><\/script>
    ${showPwPrompt ? "<script>passwdPrompt()<\/script>" : ""}

    ${isEdit ? `
    <!-- Sidebar, Delete & Share Scripts -->
    <script>
      (function() {
        // --- 1. Sidebar Logic ---
        const toggleBtn = document.getElementById("sidebar-toggle-btn");
        const closeBtn = document.getElementById("sidebar-close-btn");
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("sidebar-overlay");
        const searchInput = document.getElementById("sidebar-search");
        const newBtn = document.getElementById("sidebar-new-btn");
        const treeContainer = document.getElementById("sidebar-tree");
        const logoutBtn = document.getElementById("sidebar-logout-btn");
        let allNotes = [];

        function escText(str) {
          return String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
        }

        function encodePathSegments(p) {
          return String(p || "").split("/").map(function(seg) { return encodeURIComponent(seg); }).join("/");
        }

        function openSidebar() {
          if (sidebar) sidebar.classList.add("active");
          if (overlay) overlay.classList.add("active");
          loadNotes();
        }

        function closeSidebar() {
          if (sidebar) sidebar.classList.remove("active");
          if (overlay) overlay.classList.remove("active");
        }

        if (toggleBtn) toggleBtn.onclick = openSidebar;
        if (closeBtn) closeBtn.onclick = closeSidebar;
        if (overlay) overlay.onclick = closeSidebar;
        const sidebarQsBtn = document.getElementById("sidebar-quick-search-btn");
        if (sidebarQsBtn) {
          sidebarQsBtn.onclick = function() {
            closeSidebar();
            if (typeof window.openQuickSwitch === "function") {
              window.openQuickSwitch("fulltext");
            }
          };
        }

        if (logoutBtn) {
          logoutBtn.onclick = async function() {
            if (confirm("${SUPPORTED_LANG[lang].logout}?")) {
              await fetch("/api/logout", { method: "POST" });
              window.location.reload();
            }
          };
        }

        if (newBtn) {
          newBtn.onclick = function() {
            const name = prompt("${lang === 'zh' ? '输入新笔记名称 (支持用 / 分类，如 工作/周报):' : 'Enter note name (supports / for folders):'}");
            if (name && name.trim()) {
              let clean = name.trim().replace(new RegExp('^/+|/+$', 'g'), '').replace(new RegExp('\\\\.md$', 'i'), '');
              if (!clean) return;
              if (new RegExp('/(delete|setting|auth|pw)$', 'i').test("/" + clean)) {
                alert("${lang === 'zh' ? '笔记路径不能以 /delete、/setting、/auth、/pw 结尾' : 'Invalid note path suffix'}");
                return;
              }
              window.location.href = "/" + encodePathSegments(clean);
            }
          };
        }

        function updateSidebarShareStats(notes) {
          const statsEl = document.getElementById("sidebar-share-stats");
          if (!statsEl || !Array.isArray(notes)) return;
          const total = notes.length;
          const shareCount = notes.filter(function(n) { return n && n.share; }).length;
          const rawCount = notes.filter(function(n) { return n && n.rawPublic; }).length;
          statsEl.textContent = shareCount + "/" + total + " · RAW: " + rawCount + "/" + total;
        }

        async function loadNotes() {
          if (!treeContainer) return;
          try {
            fetch("/api/quota").then(r => r.json()).then(q => {
              if (q.err === 0 && q.data) {
                const qEl = document.getElementById("sidebar-img-quota");
                if (qEl) qEl.textContent = q.data.usedMB + "MB / 200MB";
              }
            }).catch(() => {});

            const res = await fetch("/api/notes");
            const data = await res.json();
            if (data.err === 0 && Array.isArray(data.data)) {
              allNotes = data.data;
              window._allNotesCache = allNotes;
              updateSidebarShareStats(allNotes);
              renderTree(allNotes);
            } else {
              treeContainer.innerHTML = '<div style="color:var(--danger-fg);padding:16px;text-align:center;">' + (data.msg || "加载失败") + '</div>';
            }
          } catch (e) {
            treeContainer.innerHTML = '<div style="color:var(--danger-fg);padding:16px;text-align:center;">网络错误</div>';
          }
        }

        if (searchInput) {
          searchInput.oninput = function() {
            const q = searchInput.value.toLowerCase().trim();
            if (!q) {
              renderTree(allNotes);
            } else {
              const filtered = allNotes.filter(n => n.path.toLowerCase().includes(q));
              renderTree(filtered, true);
            }
          };
        }

        function renderTree(notes, forceExpand) {
          if (!treeContainer) return;
          if (notes.length === 0) {
            treeContainer.innerHTML = '<div style="color:var(--text-muted);padding:16px;text-align:center;">${SUPPORTED_LANG[lang].noNotes}</div>';
            return;
          }

          const root = { children: {}, notes: [] };
          for (const note of notes) {
            const parts = note.path.split("/");
            let curr = root;
            for (let i = 0; i < parts.length - 1; i++) {
              const p = parts[i];
              if (!curr.children[p]) curr.children[p] = { name: p, children: {}, notes: [] };
              curr = curr.children[p];
            }
            curr.notes.push(note);
          }

          const currentPath = decodeURIComponent(window.location.pathname.replace(new RegExp('^/+', 'g'), ''));

          function renderNode(node) {
            let html = "";
            for (const folderName in node.children) {
              const folder = node.children[folderName];
              html += '<div class="tree-folder' + (forceExpand ? '' : '') + '">';
              html += '  <div class="tree-folder-title">';
              html += '    <span class="tree-folder-arrow">▼</span>';
              html += '    <svg class="tree-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"></path></svg>';
              html += '    <span>' + escText(folder.name) + '</span>';
              html += '  </div>';
              html += '  <div class="tree-folder-content">';
              html += renderNode(folder);
              html += '  </div>';
              html += '</div>';
            }
            for (const note of node.notes) {
              const isActive = note.path === currentPath;
              const displayName = note.path.split("/").pop();
              html += '<div class="tree-item ' + (isActive ? 'active' : '') + '">';
              html += '  <a class="tree-item-text" href="/' + encodePathSegments(note.path) + '" title="' + escText(note.path) + '">';
              if (note.share) {
                html += '    <svg class="tree-icon" viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>';
              } else {
                html += '    <svg class="tree-icon" viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm7.75 3.25V2.06l2.44 2.44Z"></path></svg>';
              }
              html += escText(displayName);
              if (note.locked) {
                html += '    <svg viewBox="0 0 16 16" width="12" height="12" fill="var(--warn-fg)" style="margin-left:auto; flex-shrink:0;" title="${lang === "zh" ? "已锁定" : "Locked"}"><path d="M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 6V4a2.5 2.5 0 1 0-5 0v2Z"></path></svg>';
              }
              html += '  </a>';
              html += '  <div class="tree-item-actions">';
              html += '    <button class="tree-item-rename-btn" data-path="' + encodeURIComponent(note.path) + '" title="${lang === "zh" ? "重命名 / 移动路径" : "Rename / Move"}"><svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"></path></svg></button>';
              html += '    <button class="tree-item-del-btn" data-path="' + encodeURIComponent(note.path) + '" title="${SUPPORTED_LANG[lang].delete}">✕</button>';
              html += '  </div>';
              html += '</div>';
            }
            return html;
          }

          treeContainer.innerHTML = renderNode(root);
        }

        // Tree click event delegation (folder collapse & note deletion)
        if (treeContainer) {
          treeContainer.onclick = function(e) {
            const renameBtn = e.target.closest(".tree-item-rename-btn");
            if (renameBtn) {
              e.preventDefault();
              e.stopPropagation();
              window.renameNote(renameBtn.dataset.path, e);
              return;
            }
            const delBtn = e.target.closest(".tree-item-del-btn");
            if (delBtn) {
              e.preventDefault();
              e.stopPropagation();
              window.deleteNote(delBtn.dataset.path, e);
              return;
            }
            const folderTitle = e.target.closest(".tree-folder-title");
            if (folderTitle) {
              e.preventDefault();
              e.stopPropagation();
              folderTitle.parentElement.classList.toggle("collapsed");
              return;
            }
          };
        }

        window.renameNote = async function(encodedPath, e) {
          if (e) e.stopPropagation();
          const oldPath = decodeURIComponent(encodedPath);
          const curPath = decodeURIComponent(window.location.pathname.replace(new RegExp('^/+', 'g'), ''));
          const targetNote = allNotes.find(function(n) { return n.path === oldPath; });
          if ((targetNote && targetNote.locked) || (oldPath === curPath && typeof isNoteLocked !== "undefined" && isNoteLocked)) {
            alert("${lang === 'zh' ? '笔记已锁定，请先解锁后再重命名或移动' : 'Note is locked. Please unlock it first.'}");
            return;
          }
          const nextInput = prompt("${lang === 'zh' ? '请输入新的笔记路径（使用 / 可移动文件夹，如：学习笔记/新名称）：' : 'Enter new note path (use / for folders):'}", oldPath);
          if (nextInput === null) return;
          const newPath = nextInput.trim().replace(new RegExp('^/+|/+$', 'g'), '');
          if (!newPath || newPath === oldPath) return;

          try {
            const res = await fetch("/api/notes/rename", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ oldPath: oldPath, newPath: newPath })
            });
            const data = await res.json();
            if (data.err === 0) {
              if (curPath === oldPath) {
                window.location.href = "/" + encodePathSegments(data.data.newPath);
              } else {
                loadNotes();
                if (typeof loadShareManagerList === "function") loadShareManagerList(false);
              }
            } else {
              alert(data.msg || "${lang === 'zh' ? '重命名失败' : 'Rename failed'}");
            }
          } catch (err) {
            alert("${lang === 'zh' ? '重命名异常: ' : 'Rename error: '}" + err.message);
          }
        };

        window.deleteNote = async function(encodedPath, e) {
          if (e) e.stopPropagation();
          const path = decodeURIComponent(encodedPath);
          const curPath = decodeURIComponent(window.location.pathname.replace(new RegExp('^/+', 'g'), ''));
          const targetNote = allNotes.find(function(n) { return n.path === path; });
          if ((targetNote && targetNote.locked) || (path === curPath && typeof isNoteLocked !== "undefined" && isNoteLocked)) {
            alert("${lang === 'zh' ? '笔记已锁定，请先解锁后再删除' : 'Note is locked. Please unlock it before deleting.'}");
            return;
          }
          const confirmMsg = "${lang === 'zh' ? '确定要永久删除笔记【' : 'Permanently delete note: '}" + path + "${lang === 'zh' ? '】吗？此操作无法撤销！' : '?' }";
          if (!confirm(confirmMsg)) return;

          try {
            const res = await fetch("/" + encodePathSegments(path) + "/delete", { method: "POST" });
            const data = await res.json();
            if (data.err === 0) {
              const currentPath = decodeURIComponent(window.location.pathname.replace(new RegExp('^/+', 'g'), ''));
              if (currentPath === path) {
                window.location.href = "/";
              } else {
                loadNotes();
              }
            } else {
              alert(data.msg || "删除失败");
            }
          } catch (err) {
            alert("删除异常: " + err.message);
          }
        };

        // Footer delete button
        const delBtn = document.querySelector("#opt-del-btn");
        if (delBtn) {
          delBtn.onclick = function() {
            const currentPath = decodeURIComponent(window.location.pathname.replace(new RegExp('^/+', 'g'), ''));
            if (currentPath) {
              window.deleteNote(encodeURIComponent(currentPath));
            }
          };
        }

        // --- 1.1 Full Vault Backup ZIP Export Logic ---
        const exportZipBtn = document.getElementById("sidebar-export-zip-btn");
        const exportZipText = document.getElementById("sidebar-export-text");
        if (exportZipBtn) {
          exportZipBtn.onclick = async function() {
            if (exportZipBtn.dataset.busy === "1") return;
            exportZipBtn.dataset.busy = "1";
            exportZipBtn.style.opacity = "0.7";
            const originalText = "${SUPPORTED_LANG[lang].exportZip || '导出全库备份 (.zip)'}";

            try {
              if (exportZipText) exportZipText.textContent = "${SUPPORTED_LANG[lang].exportingList || '正在获取笔记列表...'}";
              const res = await fetch("/api/notes");
              const data = await res.json();
              if (data.err !== 0 || !Array.isArray(data.data) || data.data.length === 0) {
                alert(data.msg || "${SUPPORTED_LANG[lang].noNotesToExport || '当前库中暂无笔记可供导出'}");
                return;
              }

              const notes = data.data;
              if (exportZipText) exportZipText.textContent = "${SUPPORTED_LANG[lang].loadingZipLib || '正在加载压缩组件...'}";
              let JSZipLib = window.JSZip;
              if (!JSZipLib) {
                await new Promise((resolve, reject) => {
                  const s = document.createElement("script");
                  s.src = "//gcore.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js";
                  s.onload = () => resolve();
                  s.onerror = () => reject(new Error("Failed to load JSZip"));
                  document.head.appendChild(s);
                });
                JSZipLib = window.JSZip;
              }

              const zip = new JSZipLib();
              for (let i = 0; i < notes.length; i++) {
                const n = notes[i];
                if (exportZipText) exportZipText.textContent = "${SUPPORTED_LANG[lang].exportingProgress || '打包中'} (" + (i + 1) + "/" + notes.length + ")...";
                try {
                  const cleanPath = n.path.replace(new RegExp('^/+', 'g'), '');
                  const rawResp = await fetch("/raw/" + encodePathSegments(cleanPath));
                  if (rawResp.ok) {
                    const rawText = await rawResp.text();
                    let filePath = cleanPath;
                    const baseName = filePath.split("/").pop() || "";
                    if (baseName.indexOf(".") === -1) {
                      filePath += ".md";
                    }
                    zip.file(filePath, rawText);
                  }
                } catch (e) {
                  console.warn("Export note error:", n.path, e);
                }
              }

              if (exportZipText) exportZipText.textContent = "${SUPPORTED_LANG[lang].generatingZip || '正在生成压缩包...'}";
              const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
              const dateStr = new Date().toISOString().slice(0, 10);
              const filename = "notepad-backup-" + dateStr + ".zip";
              const downloadUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = downloadUrl;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(downloadUrl);
              }, 2000);

              if (exportZipText) exportZipText.textContent = "${SUPPORTED_LANG[lang].exportSuccess || '导出成功！'}";
              setTimeout(() => {
                if (exportZipText) exportZipText.textContent = originalText;
              }, 3000);
            } catch (err) {
              alert(("${SUPPORTED_LANG[lang].exportFail || '导出失败'}: ") + err.message);
              if (exportZipText) exportZipText.textContent = originalText;
            } finally {
              exportZipBtn.dataset.busy = "0";
              exportZipBtn.style.opacity = "1";
            }
          };
        }

        // --- 1.2 Markdown Mode Button Click Handler ---
        const cleanNotePathname = window.location.pathname.replace(new RegExp('/+$', 'g'), '');
        const modeBtn = document.getElementById("opt-mode-btn");
        if (modeBtn) {
          modeBtn.onclick = async function() {
            if (modeBtn.dataset.busy === "1") return;
            modeBtn.dataset.busy = "1";
            const isMd = modeBtn.classList.contains("opt-mode-active");
            const targetMode = isMd ? "plain" : "md";
            try {
              const res = await fetch(cleanNotePathname + "/setting", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode: targetMode })
              });
              const data = await res.json();
              if (data.err === 0) {
                window.location.reload();
              } else {
                alert(data.msg || "切换模式失败");
                modeBtn.dataset.busy = "0";
              }
            } catch (err) {
              alert("切换模式异常: " + err.message);
              modeBtn.dataset.busy = "0";
            }
          };
        }

        // --- 2. Share Modal Logic ---
        const shareModal = document.querySelector(".share-modal");
        const shareTriggerBtn = document.querySelector(".opt-share-trigger");
        const shareCloseBtn = document.querySelector(".share-modal .close-btn");
        const saveShareBtn = document.querySelector("#save-share-btn");
        const disableShareBtn = document.querySelector("#disable-share-btn");
        const copyShareBtn = document.querySelector("#copy-share-btn");
        const shareCustomSlug = document.querySelector("#share-custom-slug");
        const shareCustomPw = document.querySelector("#share-custom-pw");
        const shareCustomTtl = document.querySelector("#share-custom-ttl");
        const shareBurnCheckbox = document.querySelector("#share-burn-after-reading");
        const shareFinalUrl = document.querySelector("#share-final-url");
        const shareLinkBox = document.querySelector("#share-link-box");
        const shareBadgesWrap = document.querySelector("#share-badges-wrap");
        const shareRawCheckbox = document.querySelector("#share-raw-public");
        const shareRawLinkBox = document.querySelector("#share-raw-link-box");
        const shareRawFinalUrl = document.querySelector("#share-raw-final-url");
        const copyRawBtn = document.querySelector("#copy-raw-btn");

        function updateShareBadges(ttl, isBurn) {
          if (!shareBadgesWrap) return;
          const currentTtl = typeof ttl === "number" ? ttl : Number(shareCustomTtl ? shareCustomTtl.value : "${ext.shareTtl || 0}");
          const currentBurn = typeof isBurn === "boolean" ? isBurn : (shareBurnCheckbox ? shareBurnCheckbox.checked : ${ext.shareBurn ? "true" : "false"});
          let html = "";
          if (currentBurn) {
            html += '<span style="font-size:11px; padding:1px 6px; border-radius:10px; background:var(--danger-bg); color:var(--danger-fg); border:1px solid var(--danger-border); font-weight:500;">${SUPPORTED_LANG[lang].burnBadge}</span>';
          }
          if (currentTtl > 0) {
            const ttlMap = { 600: "${SUPPORTED_LANG[lang].shareTtl10m}", 3600: "${SUPPORTED_LANG[lang].shareTtl1h}", 86400: "${SUPPORTED_LANG[lang].shareTtl1d}", 604800: "${SUPPORTED_LANG[lang].shareTtl7d}" };
            const ttlText = ttlMap[currentTtl] || (currentTtl + "s");
            html += '<span style="font-size:11px; padding:1px 6px; border-radius:10px; background:var(--accent-bg-strong); color:var(--accent-fg); border:1px solid var(--accent-border); font-weight:500;">' + ttlText + '</span>';
          }
          shareBadgesWrap.innerHTML = html;
        }

        function syncRawBoxUI(isRawPub) {
          if (shareRawCheckbox) shareRawCheckbox.checked = !!isRawPub;
          if (shareRawLinkBox && shareRawFinalUrl) {
            if (isRawPub) {
              shareRawFinalUrl.value = window.location.origin + "/raw" + cleanNotePathname;
              shareRawLinkBox.style.display = "block";
            } else {
              shareRawLinkBox.style.display = "none";
            }
          }
        }

        function buildShareUrlWithPw(slug, pw) {
          let u = window.location.origin + "/share/" + encodeURIComponent(slug);
          if (pw) u += "?pw=" + encodeURIComponent(pw);
          return u;
        }

        let isNoteLocked = ${JSON.stringify(!!ext.locked)};
        let isNoteShared = ${JSON.stringify(!!ext.share)};
        let isNoteRawPublic = ${JSON.stringify(!!ext.rawPublic)};
        const LOCK_SVG_CLOSED = '<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 6V4a2.5 2.5 0 1 0-5 0v2Z"></path></svg>';
        const LOCK_SVG_OPEN = '<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M5.5 4a2.5 2.5 0 0 1 4.607-1.346.75.75 0 1 0 1.264-.808A4 4 0 0 0 4 4v2h-.25C2.784 6 2 6.784 2 7.75v5.5C2 14.216 2.784 15 3.75 15h8.5a1.75 1.75 0 0 0 1.75-1.75v-5.5A1.75 1.75 0 0 0 12.25 6H5.5Zm6.75 3.5a.25.25 0 0 1 .25.25v5.5a.25.25 0 0 1-.25.25h-8.5a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 1 .25-.25Z"></path></svg>';

        function genRandomAlnum(len) {
          const chars = "23456789abcdefghjkmnpqrstuvwxyz";
          let out = "";
          for (let i = 0; i < len; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
          return out;
        }

        function genRandomCode4() {
          return genRandomAlnum(4);
        }

        function syncSharePwMode() {
          const noPwCb = document.getElementById("share-no-pw");
          if (!shareCustomPw || !noPwCb) return;
          if (noPwCb.checked) {
            shareCustomPw.disabled = true;
            shareCustomPw.style.background = "var(--bg-subtle)";
          } else {
            shareCustomPw.disabled = false;
            shareCustomPw.style.background = "var(--bg-surface)";
            if (!shareCustomPw.value.trim()) {
              shareCustomPw.value = genRandomCode4();
            }
          }
        }

        function syncLockBtnUI() {
          const lockBtn = document.getElementById("opt-lock-btn");
          if (!lockBtn) return;
          lockBtn.innerHTML = isNoteLocked ? LOCK_SVG_CLOSED : LOCK_SVG_OPEN;
          lockBtn.title = isNoteLocked
            ? "${lang === 'zh' ? '笔记已锁定（点击解锁）' : 'Locked (click to unlock)'}"
            : "${lang === 'zh' ? '锁定笔记（防误触分享）' : 'Lock note'}";
          lockBtn.classList.toggle("opt-locked", isNoteLocked);
        }

        function openShareModal() {
          if (isNoteLocked) {
            alert("${lang === 'zh' ? '笔记已锁定，请先解锁后再分享' : 'Note is locked. Please unlock it first.'}");
            return;
          }
          if (shareModal) {
            shareModal.style.display = "block";
            const errBox = document.getElementById("share-error-msg");
            if (errBox) { errBox.style.display = "none"; errBox.textContent = ""; }
            if (shareCustomSlug) {
              shareCustomSlug.style.borderColor = "var(--border-default)";
              if (!shareCustomSlug.value.trim()) {
                shareCustomSlug.value = genRandomAlnum(6);
              }
            }
            syncSharePwMode();
            const currentSlug = shareCustomSlug.value.trim() || ${JSON.stringify(ext.shareSlug || "")};
            if (currentSlug) {
              const noPwCb = document.getElementById("share-no-pw");
              const currentPw = (noPwCb && noPwCb.checked) ? "" : ((shareCustomPw && shareCustomPw.value.trim()) || ${JSON.stringify(ext.sharePwText || "")});
              shareFinalUrl.value = buildShareUrlWithPw(currentSlug, currentPw);
              shareLinkBox.style.display = "block";
              updateShareBadges();
            }
            if (shareRawCheckbox) {
              syncRawBoxUI(shareRawCheckbox.checked);
            }
          }
        }

        function closeShareModal() {
          if (shareModal) shareModal.style.display = "none";
        }

        function bindShareModalEvents() {
          if (shareTriggerBtn) shareTriggerBtn.onclick = openShareModal;
          if (shareCloseBtn) shareCloseBtn.onclick = closeShareModal;
          if (shareModal) {
            const mask = shareModal.querySelector(".modal-mask");
            if (mask) mask.onclick = closeShareModal;
          }
          const togglePwBtn = document.getElementById("toggle-share-pw-vis");
          if (togglePwBtn && shareCustomPw) {
            togglePwBtn.onclick = function() {
              const isHidden = shareCustomPw.type === "password";
              shareCustomPw.type = isHidden ? "text" : "password";
              togglePwBtn.innerText = isHidden ? "${lang === 'zh' ? '隐藏' : 'Hide'}" : "${lang === 'zh' ? '显示' : 'Show'}";
            };
          }

          if (shareCustomSlug) {
            shareCustomSlug.oninput = function() {
              shareCustomSlug.style.borderColor = "var(--border-default)";
              const errBox = document.getElementById("share-error-msg");
              if (errBox) errBox.style.display = "none";
            };
          }
          const randomSlugBtn = document.getElementById("random-share-slug-btn");
          if (randomSlugBtn && shareCustomSlug) {
            randomSlugBtn.onclick = function() {
              shareCustomSlug.value = genRandomAlnum(6);
              shareCustomSlug.style.borderColor = "var(--border-default)";
              const errBox = document.getElementById("share-error-msg");
              if (errBox) errBox.style.display = "none";
            };
          }
          const noPwCb = document.getElementById("share-no-pw");
          if (noPwCb) {
            noPwCb.onchange = syncSharePwMode;
          }
          const rawLinkEl = document.getElementById("opt-raw-link");
          if (rawLinkEl) {
            rawLinkEl.onclick = function(e) {
              if (isNoteLocked) {
                if (e && e.preventDefault) e.preventDefault();
                alert("${lang === 'zh' ? '笔记已锁定，请先解锁后再打开 Raw' : 'Note is locked. Please unlock it first.'}");
              }
            };
          }
          const lockBtn = document.getElementById("opt-lock-btn");
          if (lockBtn) {
            lockBtn.onclick = async function() {
              const nextLocked = !isNoteLocked;
              if (nextLocked && (isNoteShared || isNoteRawPublic)) {
                alert("${lang === 'zh' ? '该笔记当前正在对外分享/Raw公开，请先关闭分享后再锁定' : 'This note is currently shared or Raw public. Please disable sharing first.'}");
                return;
              }
              lockBtn.disabled = true;
              try {
                const res = await fetch(cleanNotePathname + "/setting", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ locked: nextLocked })
                });
                const data = await res.json();
                if (data.err === 0) {
                  isNoteLocked = nextLocked;
                  syncLockBtnUI();
                  if (typeof loadNotes === "function") loadNotes();
                  if (typeof loadShareManagerList === "function") loadShareManagerList(false);
                } else {
                  alert(data.msg || "操作失败");
                }
              } catch (err) {
                alert("请求异常: " + err.message);
              } finally {
                lockBtn.disabled = false;
              }
            };
          }

          if (saveShareBtn) {
            saveShareBtn.onclick = async function(e) {
              if (e && e.preventDefault) e.preventDefault();
              if (e && e.stopPropagation) e.stopPropagation();
              if (isNoteLocked) {
                alert("${lang === 'zh' ? '笔记已锁定，请先解锁后再分享' : 'Note is locked. Please unlock it first.'}");
                return;
              }
              let slug = shareCustomSlug.value.trim();
              if (!slug) {
                slug = genRandomAlnum(6);
                shareCustomSlug.value = slug;
              }
              const noPw = noPwCb ? noPwCb.checked : false;
              let pw = noPw ? "" : shareCustomPw.value.trim();
              if (!noPw && !pw) {
                pw = genRandomCode4();
                shareCustomPw.value = pw;
              }
              const ttl = Number(shareCustomTtl ? shareCustomTtl.value : 0) || 0;
              const burn = shareBurnCheckbox ? shareBurnCheckbox.checked : false;
              const rawPub = shareRawCheckbox ? shareRawCheckbox.checked : undefined;
              const errBox = document.getElementById("share-error-msg");
              if (errBox) { errBox.style.display = "none"; errBox.textContent = ""; }
              if (shareCustomSlug) shareCustomSlug.style.borderColor = "var(--border-default)";

              saveShareBtn.innerText = "保存中...";
              try {
                const res = await fetch(cleanNotePathname + "/setting", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    share: true,
                    shareSlug: slug,
                    sharePw: pw,
                    ttl: ttl,
                    burnAfterReading: burn,
                    rawPublic: rawPub
                  })
                });
                const data = await res.json();
                saveShareBtn.innerText = "${SUPPORTED_LANG[lang].saveShare}";
                if (data.err === 0) {
                  const finalSlug = (data.data && data.data.slug) || slug;
                  isNoteShared = true;
                  if (typeof rawPub === "boolean") isNoteRawPublic = rawPub;
                  shareCustomSlug.value = finalSlug;
                  shareFinalUrl.value = buildShareUrlWithPw(finalSlug, pw);
                  shareLinkBox.style.display = "block";
                  updateShareBadges(ttl, burn);
                  if (typeof loadNotes === "function") loadNotes();
                  if (typeof loadShareManagerList === "function") loadShareManagerList(false);
                  saveShareBtn.innerText = "${lang === 'zh' ? '已生成' : 'Saved'}";
                  setTimeout(function() {
                    if (saveShareBtn) saveShareBtn.innerText = "${SUPPORTED_LANG[lang].saveShare}";
                  }, 1500);
                } else {
                  const msg = data.msg || "分享失败";
                  if (errBox) {
                    errBox.textContent = msg;
                    errBox.style.display = "block";
                  } else {
                    alert(msg);
                  }
                  if (data.err === 409 && shareCustomSlug) {
                    shareCustomSlug.style.borderColor = "var(--danger-fg)";
                    shareCustomSlug.focus();
                  }
                }
              } catch (err) {
                saveShareBtn.innerText = "${SUPPORTED_LANG[lang].saveShare}";
                if (errBox) {
                  errBox.textContent = "请求异常: " + err.message;
                  errBox.style.display = "block";
                } else {
                  alert("请求异常: " + err.message);
                }
              }
            };
          }

          if (disableShareBtn) {
            disableShareBtn.onclick = async function() {
              if (!confirm("${lang === 'zh' ? '确定要关闭此笔记的对外分享吗？' : 'Disable share for this note?'}")) return;
              try {
                const res = await fetch(cleanNotePathname + "/setting", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ share: false })
                });
                const data = await res.json();
                if (data.err === 0) {
                  isNoteShared = false;
                  shareLinkBox.style.display = "none";
                  shareCustomSlug.value = "";
                  shareCustomPw.value = "";
                  if (noPwCb) noPwCb.checked = false;
                  if (shareCustomTtl) shareCustomTtl.value = "0";
                  if (shareBurnCheckbox) shareBurnCheckbox.checked = false;
                  if (shareBadgesWrap) shareBadgesWrap.innerHTML = "";
                  if (typeof loadNotes === "function") loadNotes();
                  if (typeof loadShareManagerList === "function") loadShareManagerList(false);
                  alert("${lang === 'zh' ? '已关闭对外分享' : 'Sharing disabled'}");
                  closeShareModal();
                } else {
                  alert(data.msg || "操作失败");
                }
              } catch (err) {
                alert("请求异常: " + err.message);
              }
            };
          }
        }

        bindShareModalEvents();
        window.addEventListener("DOMContentLoaded", bindShareModalEvents);

        if (shareRawCheckbox) {
          shareRawCheckbox.onchange = async function() {
            const nextVal = !!shareRawCheckbox.checked;
            shareRawCheckbox.disabled = true;
            try {
              const res = await fetch(cleanNotePathname + "/setting", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rawPublic: nextVal })
              });
              const data = await res.json();
              if (data.err === 0) {
                isNoteRawPublic = nextVal;
                syncRawBoxUI(nextVal);
                if (typeof loadNotes === "function") loadNotes();
                if (typeof loadShareManagerList === "function") loadShareManagerList(false);
              } else {
                syncRawBoxUI(!nextVal);
                alert(data.msg || "更新 Raw 公开状态失败");
              }
            } catch (err) {
              syncRawBoxUI(!nextVal);
              alert("请求异常: " + err.message);
            } finally {
              shareRawCheckbox.disabled = false;
            }
          };
        }

        function flashCopiedBtn(btnEl) {
          if (!btnEl) return;
          if (!btnEl.dataset.origText) btnEl.dataset.origText = btnEl.innerText;
          btnEl.innerText = "${lang === 'zh' ? '已复制' : 'Copied'}";
          clearTimeout(btnEl._copyTimer);
          btnEl._copyTimer = setTimeout(function() {
            if (btnEl && btnEl.dataset.origText) btnEl.innerText = btnEl.dataset.origText;
          }, 1500);
        }

        function fallbackCopyText(val, inputEl, btnEl) {
          let ok = false;
          if (inputEl) {
            try {
              inputEl.focus();
              inputEl.select();
              if (typeof inputEl.setSelectionRange === "function") {
                inputEl.setSelectionRange(0, val.length);
              }
              ok = document.execCommand("copy");
            } catch (e) {}
          }
          if (!ok) {
            const ta = document.createElement("textarea");
            ta.value = val;
            ta.setAttribute("readonly", "");
            ta.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0;";
            document.body.appendChild(ta);
            try {
              ta.focus();
              ta.select();
              if (typeof ta.setSelectionRange === "function") {
                ta.setSelectionRange(0, val.length);
              }
              ok = document.execCommand("copy");
            } catch (e) {}
            document.body.removeChild(ta);
          }
          if (ok) {
            flashCopiedBtn(btnEl);
          } else {
            prompt("${lang === 'zh' ? '当前环境不支持自动复制，请手动复制链接：' : 'Copy link manually:'}", val);
          }
        }

        function copyInputOrText(inputEl, text, btnEl) {
          const val = inputEl ? inputEl.value : text;
          if (!val) return;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(val).then(function() {
              flashCopiedBtn(btnEl);
            }).catch(function() {
              fallbackCopyText(val, inputEl, btnEl);
            });
          } else {
            fallbackCopyText(val, inputEl, btnEl);
          }
        }

        if (copyShareBtn) {
          copyShareBtn.onclick = function() {
            copyInputOrText(shareFinalUrl, null, copyShareBtn);
          };
        }
        if (copyRawBtn) {
          copyRawBtn.onclick = function() {
            copyInputOrText(shareRawFinalUrl, null, copyRawBtn);
          };
        }

        // --- 3. Global Share & Raw Manager Modal ---
        const shareMgrModal = document.getElementById("share-mgr-modal");
        const shareMgrMask = document.getElementById("share-mgr-mask");
        const shareMgrClose = document.getElementById("share-mgr-close");
        const shareMgrRefresh = document.getElementById("share-mgr-refresh-btn");
        const shareMgrListEl = document.getElementById("share-mgr-list");
        const shareMgrCountBadge = document.getElementById("share-mgr-count-badge");
        const shareMgrSearch = document.getElementById("share-mgr-search");
        const shareMgrTabShared = document.getElementById("share-mgr-tab-shared");
        const shareMgrTabRaw = document.getElementById("share-mgr-tab-raw");
        const shareMgrTabAll = document.getElementById("share-mgr-tab-all");
        const sidebarOpenShareMgr = document.getElementById("sidebar-open-share-mgr");

        let shareMgrItems = [];
        let shareMgrTab = "shared";
        const shareMgrCollapsed = new Set();

        function updateShareMgrTabsUI() {
          const tabs = [
            { el: shareMgrTabShared, key: "shared" },
            { el: shareMgrTabRaw, key: "raw" },
            { el: shareMgrTabAll, key: "all" }
          ];
          for (let i = 0; i < tabs.length; i++) {
            const t = tabs[i];
            if (!t.el) continue;
            t.el.classList.toggle("active", shareMgrTab === t.key);
          }
        }

        function renderShareMgrCard(item, displayLabel, now) {
          const safeDisplay = escText(displayLabel);
          const encodedPath = encodePathSegments(item.path);
          const encAttrPath = escText(item.path);
          const isExpired = !!(item.share && item.shareExpireAt && now > item.shareExpireAt);
          const shareUrl = item.shareSlug ? buildShareUrlWithPw(item.shareSlug, item.sharePwText || "") : "";
          const rawUrl = window.location.origin + "/raw/" + encodedPath;

          const showSharePart = (shareMgrTab === "shared" || shareMgrTab === "all");
          const showRawPart = (shareMgrTab === "raw" || shareMgrTab === "all");

          let badges = "";
          if (showSharePart && item.share) {
            if (isExpired) {
              badges += '<span style="font-size:11px;padding:1px 6px;border-radius:10px;background:var(--warn-bg);color:var(--warn-fg);border:1px solid var(--warn-border);">${lang === "zh" ? "分享已过期" : "Expired"}</span>';
            } else {
              badges += '<span style="font-size:11px;padding:1px 6px;border-radius:10px;background:var(--success-bg);color:var(--success-fg);border:1px solid var(--success-border);">${lang === "zh" ? "网页分享" : "Shared"}</span>';
            }
            if (item.hasSharePw) {
              badges += '<span style="font-size:11px;padding:1px 6px;border-radius:10px;background:var(--bg-subtle);color:var(--text-secondary);border:1px solid var(--border-default);">${lang === "zh" ? "提取码" : "Protected"}</span>';
            }
            if (item.shareBurn) {
              badges += '<span style="font-size:11px;padding:1px 6px;border-radius:10px;background:var(--danger-bg);color:var(--danger-fg);border:1px solid var(--danger-border);">${lang === "zh" ? "阅后即焚" : "Burn"}</span>';
            }
          }
          if (showRawPart && item.rawPublic) {
            badges += '<span style="font-size:11px;padding:1px 6px;border-radius:10px;background:var(--accent-bg-strong);color:var(--accent-fg);border:1px solid var(--accent-border);">${lang === "zh" ? "Raw 公开" : "Raw Public"}</span>';
          }

          let shareRow = "";
          if (showSharePart && item.share) {
            const pwInfoHtml = item.hasSharePw
              ? (item.sharePwText
                ? ' · ${lang === "zh" ? "提取码" : "Code"}: <code style="background:var(--bg-subtle);border:1px solid var(--border-default);border-radius:4px;padding:0 5px;color:var(--text-body);font-size:11px;">' + escText(item.sharePwText) + '</code>'
                : ' · <span style="color:var(--text-muted);">${lang === "zh" ? "旧版未存明文，重设可见" : "Legacy pw"}</span>')
              : '';
            const copyPwBtnHtml = (item.hasSharePw && item.sharePwText)
              ? '<button type="button" class="opt-button sm-btn" data-sm-action="copy-url" data-url="' + escText(item.sharePwText) + '" style="padding:2px 8px;font-size:11px;">${lang === "zh" ? "复制提取码" : "Copy Code"}</button>'
              : '';
            shareRow = '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding-top:6px;border-top:1px dashed var(--border-soft);margin-top:6px;">' +
              '<div style="font-size:12px;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:420px;" title="' + escText(shareUrl) + '">/share/' + escText(item.shareSlug) + pwInfoHtml + '</div>' +
              '<div style="display:flex;gap:6px;flex-shrink:0;flex-wrap:wrap;">' +
                '<button type="button" class="opt-button sm-btn" data-sm-action="copy-url" data-url="' + escText(shareUrl) + '" style="padding:2px 8px;font-size:11px;">${lang === "zh" ? "复制分享" : "Copy Share"}</button>' +
                copyPwBtnHtml +
                '<button type="button" class="opt-button sm-btn" data-sm-action="disable-share" data-path="' + encAttrPath + '" style="padding:2px 8px;font-size:11px;color:var(--danger-fg);">' + (isExpired ? "${lang === 'zh' ? '清理过期' : 'Clean'}" : "${lang === 'zh' ? '关闭分享' : 'Disable Share'}") + '</button>' +
              '</div>' +
            '</div>';
          }

          let rawRow = "";
          if (showRawPart) {
            const rawBtnText = item.rawPublic ? "${lang === 'zh' ? '关闭 Raw' : 'Disable Raw'}" : "${lang === 'zh' ? '开启 Raw 公开' : 'Enable Raw'}";
            const rawBtnStyle = item.rawPublic ? "padding:2px 8px;font-size:11px;color:var(--danger-fg);" : "padding:2px 8px;font-size:11px;color:var(--accent-fg);";
            rawRow = '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding-top:6px;border-top:1px dashed var(--border-soft);margin-top:6px;">' +
              '<div style="font-size:12px;color:var(--text-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:420px;" title="' + escText(rawUrl) + '">' + (item.rawPublic ? ("/raw/" + escText(item.path)) : "${lang === 'zh' ? 'Raw 直读：私有（需鉴权）' : 'Raw: Private'}") + '</div>' +
              '<div style="display:flex;gap:6px;flex-shrink:0;">' +
                (item.rawPublic ? '<button type="button" class="opt-button sm-btn" data-sm-action="copy-url" data-url="' + escText(rawUrl) + '" style="padding:2px 8px;font-size:11px;">${lang === "zh" ? "复制 Raw" : "Copy Raw"}</button>' : '') +
                '<button type="button" class="opt-button sm-btn" data-sm-action="toggle-raw" data-path="' + encAttrPath + '" data-next="' + (item.rawPublic ? '0' : '1') + '" style="' + rawBtnStyle + '">' + rawBtnText + '</button>' +
              '</div>' +
            '</div>';
          }

          const lockIconHtml = item.locked
            ? '<svg viewBox="0 0 16 16" width="12" height="12" fill="var(--warn-fg)" style="flex-shrink:0;" title="${lang === "zh" ? "已锁定" : "Locked"}"><path d="M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 6V4a2.5 2.5 0 1 0-5 0v2Z"></path></svg>'
            : '';

          return '<div class="sm-card">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">' +
              '<a href="/' + encodedPath + '" title="' + escText(item.path) + '" style="display:inline-flex;align-items:center;gap:5px;font-size:13px;font-weight:600;color:var(--accent-fg);text-decoration:none;word-break:break-all;">' + safeDisplay + lockIconHtml + '</a>' +
              '<div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">' + badges + '</div>' +
            '</div>' +
            shareRow +
            rawRow +
          '</div>';
        }

        function countFolderStats(node) {
          let total = node.notes.length;
          let active = 0;
          for (let i = 0; i < node.notes.length; i++) {
            if (node.notes[i].share || node.notes[i].rawPublic) active++;
          }
          for (const k in node.children) {
            const sub = countFolderStats(node.children[k]);
            total += sub.total;
            active += sub.active;
          }
          return { total: total, active: active };
        }

        function renderShareMgrList() {
          if (!shareMgrListEl) return;
          const kw = (shareMgrSearch ? shareMgrSearch.value : "").trim().toLowerCase();
          const now = Date.now();
          const sharedItems = shareMgrItems.filter(function(item) { return !!item.share; });
          const rawItems = shareMgrItems.filter(function(item) { return !!item.rawPublic; });
          const expiredItems = shareMgrItems.filter(function(item) { return !!(item.share && item.shareExpireAt && now > item.shareExpireAt); });
          const cleanExpBtn = document.getElementById("share-mgr-clean-expired");
          if (cleanExpBtn) {
            if (expiredItems.length > 0) {
              cleanExpBtn.style.display = "inline-block";
              cleanExpBtn.textContent = "${lang === 'zh' ? '清理全部过期' : 'Clean Expired'} (" + expiredItems.length + ")";
            } else {
              cleanExpBtn.style.display = "none";
            }
          }
          if (shareMgrCountBadge) {
            if (shareMgrTab === "shared") shareMgrCountBadge.textContent = String(sharedItems.length) + " / " + String(shareMgrItems.length);
            else if (shareMgrTab === "raw") shareMgrCountBadge.textContent = String(rawItems.length) + " / " + String(shareMgrItems.length);
            else shareMgrCountBadge.textContent = String(shareMgrItems.length);
          }

          let list = shareMgrTab === "shared" ? sharedItems : (shareMgrTab === "raw" ? rawItems : shareMgrItems);
          if (kw) {
            list = list.filter(function(item) {
              return (item.path && item.path.toLowerCase().indexOf(kw) !== -1) ||
                     (item.shareSlug && item.shareSlug.toLowerCase().indexOf(kw) !== -1);
            });
          }

          if (list.length === 0) {
            let emptyText = "${lang === 'zh' ? '没有匹配的笔记' : 'No matching notes'}";
            if (!kw) {
              if (shareMgrTab === "shared") emptyText = "${lang === 'zh' ? '暂无开启网页分享的笔记' : 'No shared notes'}";
              else if (shareMgrTab === "raw") emptyText = "${lang === 'zh' ? '暂无开启 Raw 公开的笔记' : 'No public raw notes'}";
            }
            shareMgrListEl.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:40px 12px;font-size:13px;">' + emptyText + '</div>';
            return;
          }

          const root = { children: {}, notes: [] };
          for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const parts = String(item.path || "").split("/");
            let curr = root;
            for (let j = 0; j < parts.length - 1; j++) {
              const p = parts[j];
              if (!curr.children[p]) curr.children[p] = { name: p, children: {}, notes: [] };
              curr = curr.children[p];
            }
            curr.notes.push(item);
          }

          function renderTreeNode(node, prefixPath) {
            let html = "";
            const folderKeys = Object.keys(node.children);
            for (let i = 0; i < folderKeys.length; i++) {
              const folder = node.children[folderKeys[i]];
              const fullFolderPath = prefixPath ? (prefixPath + "/" + folder.name) : folder.name;
              const isCollapsed = !kw && shareMgrCollapsed.has(fullFolderPath);
              const stats = countFolderStats(folder);
              const arrowTransform = isCollapsed ? "transform:rotate(-90deg);" : "";
              const contentDisplay = isCollapsed ? "display:none;" : "display:flex;";

              html += '<div class="sm-folder" style="display:flex;flex-direction:column;gap:6px;">';
              html += '  <div class="sm-folder-header" data-sm-folder="' + escText(fullFolderPath) + '">';
              html += '    <div style="display:flex;align-items:center;gap:6px;min-width:0;">';
              html += '      <span style="font-size:10px;color:var(--text-secondary);display:inline-block;transition:transform 0.15s;' + arrowTransform + '">▼</span>';
              html += '      <svg viewBox="0 0 16 16" width="14" height="14" fill="var(--accent-fg)" style="flex-shrink:0;"><path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"></path></svg>';
              html += '      <span style="font-size:13px;font-weight:600;color:var(--text-body);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escText(folder.name) + '</span>';
              html += '    </div>';
              html += '    <span style="font-size:11px;color:var(--text-secondary);background:var(--bg-surface);border:1px solid var(--border-default);border-radius:10px;padding:1px 7px;flex-shrink:0;">' + (shareMgrTab === "all" && stats.active > 0 ? (stats.active + " / " + stats.total) : String(stats.total)) + '</span>';
              html += '  </div>';
              html += '  <div style="' + contentDisplay + 'flex-direction:column;gap:8px;padding-left:12px;margin-left:8px;border-left:2px solid var(--border-muted);">';
              html += renderTreeNode(folder, fullFolderPath);
              html += '  </div>';
              html += '</div>';
            }

            for (let i = 0; i < node.notes.length; i++) {
              const item = node.notes[i];
              const displayName = String(item.path || "").split("/").pop();
              html += renderShareMgrCard(item, displayName, now);
            }
            return html;
          }

          shareMgrListEl.innerHTML = renderTreeNode(root, "");
        }

        async function loadShareManagerList(forceRefresh) {
          if (!shareMgrListEl) return;
          shareMgrListEl.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:30px;font-size:13px;">${lang === "zh" ? "正在加载状态..." : "Loading..."}</div>';
          try {
            const resp = await fetch("/api/shares" + (forceRefresh ? "?refresh=1" : ""));
            const res = await resp.json();
            if (res.err === 0 && Array.isArray(res.data)) {
              shareMgrItems = res.data;
              updateSidebarShareStats(shareMgrItems);
              renderShareMgrList();
            } else {
              shareMgrListEl.innerHTML = '<div style="text-align:center;color:var(--danger-fg);padding:30px;font-size:13px;">' + escText(res.msg || "加载失败") + '</div>';
            }
          } catch (err) {
            shareMgrListEl.innerHTML = '<div style="text-align:center;color:var(--danger-fg);padding:30px;font-size:13px;">' + escText(err.message) + '</div>';
          }
        }

        window.openShareManager = function() {
          if (!shareMgrModal) return;
          closeSidebar();
          shareMgrModal.style.display = "flex";
          updateShareMgrTabsUI();
          loadShareManagerList(false);
        };

        window.closeShareManager = function() {
          if (shareMgrModal) shareMgrModal.style.display = "none";
        };

        if (sidebarOpenShareMgr) {
          sidebarOpenShareMgr.onclick = function() { window.openShareManager(); };
        }
        if (shareMgrClose) {
          shareMgrClose.onclick = function() { window.closeShareManager(); };
        }
        if (shareMgrMask) {
          shareMgrMask.onclick = function() { window.closeShareManager(); };
        }
        if (shareMgrRefresh) {
          shareMgrRefresh.onclick = function() { loadShareManagerList(true); };
        }
        if (shareMgrTabShared) {
          shareMgrTabShared.onclick = function() {
            shareMgrTab = "shared";
            updateShareMgrTabsUI();
            renderShareMgrList();
          };
        }
        if (shareMgrTabRaw) {
          shareMgrTabRaw.onclick = function() {
            shareMgrTab = "raw";
            updateShareMgrTabsUI();
            renderShareMgrList();
          };
        }
        if (shareMgrTabAll) {
          shareMgrTabAll.onclick = function() {
            shareMgrTab = "all";
            updateShareMgrTabsUI();
            renderShareMgrList();
          };
        }
        const shareMgrCleanExpiredBtn = document.getElementById("share-mgr-clean-expired");
        if (shareMgrCleanExpiredBtn) {
          shareMgrCleanExpiredBtn.onclick = async function() {
            const now = Date.now();
            const expiredItems = shareMgrItems.filter(function(item) { return !!(item.share && item.shareExpireAt && now > item.shareExpireAt); });
            if (expiredItems.length === 0) return;
            if (!confirm("${lang === 'zh' ? '确定要一键关闭并清理全部 ' : 'Disable and clean all '}" + expiredItems.length + "${lang === 'zh' ? ' 个过期分享吗？' : ' expired shares?'}")) return;
            shareMgrCleanExpiredBtn.disabled = true;
            shareMgrCleanExpiredBtn.textContent = "${lang === 'zh' ? '清理中...' : 'Cleaning...'}";
            try {
              const curPath = decodeURIComponent(window.location.pathname.replace(new RegExp("^/+|/+$", "g"), ""));
              for (let i = 0; i < expiredItems.length; i++) {
                const it = expiredItems[i];
                const resp = await fetch("/" + encodePathSegments(it.path) + "/setting", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ share: false })
                });
                const rJson = await resp.json();
                if (rJson.err === 0 && curPath === it.path) {
                  isNoteShared = false;
                  if (shareLinkBox) shareLinkBox.style.display = "none";
                  if (shareCustomSlug) shareCustomSlug.value = "";
                  if (shareCustomPw) shareCustomPw.value = "";
                  const noPwEl = document.getElementById("share-no-pw");
                  if (noPwEl) noPwEl.checked = false;
                  if (shareBadgesWrap) shareBadgesWrap.innerHTML = "";
                }
              }
              await loadShareManagerList(true);
              if (typeof loadNotes === "function") loadNotes();
            } catch (err) {
              alert("${lang === 'zh' ? '清理异常: ' : 'Clean error: '}" + err.message);
            } finally {
              shareMgrCleanExpiredBtn.disabled = false;
            }
          };
        }
        if (shareMgrSearch) {
          shareMgrSearch.oninput = function() { renderShareMgrList(); };
        }
        if (shareMgrListEl) {
          shareMgrListEl.addEventListener("click", async function(e) {
            const folderHdr = e.target && e.target.closest("[data-sm-folder]");
            if (folderHdr) {
              const fPath = folderHdr.getAttribute("data-sm-folder");
              if (fPath) {
                if (shareMgrCollapsed.has(fPath)) shareMgrCollapsed.delete(fPath);
                else shareMgrCollapsed.add(fPath);
                renderShareMgrList();
              }
              return;
            }
            const btn = e.target && e.target.closest("[data-sm-action]");
            if (!btn) return;
            const act = btn.getAttribute("data-sm-action");
            if (act === "copy-url") {
              copyInputOrText(null, btn.getAttribute("data-url"), btn);
              return;
            }
            const targetPath = btn.getAttribute("data-path");
            if (!targetPath) return;
            const encodedPath = encodePathSegments(targetPath);
            const curPath = decodeURIComponent(window.location.pathname.replace(new RegExp("^/+|/+$", "g"), ""));

            if (act === "disable-share") {
              if (!confirm("${lang === 'zh' ? '确定要关闭此笔记的网页分享吗？' : 'Disable share for this note?'}")) return;
              btn.disabled = true;
              try {
                const resp = await fetch("/" + encodedPath + "/setting", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ share: false })
                });
                const res = await resp.json();
                if (res.err === 0) {
                  if (curPath === targetPath) {
                    isNoteShared = false;
                    if (shareLinkBox) shareLinkBox.style.display = "none";
                    if (shareCustomSlug) shareCustomSlug.value = "";
                    if (shareCustomPw) shareCustomPw.value = "";
                    const noPwEl = document.getElementById("share-no-pw");
                    if (noPwEl) noPwEl.checked = false;
                    if (shareBadgesWrap) shareBadgesWrap.innerHTML = "";
                  }
                  await loadShareManagerList(false);
                  if (typeof loadNotes === "function") loadNotes();
                } else {
                  alert(res.msg || "操作失败");
                  btn.disabled = false;
                }
              } catch (err) {
                alert("请求异常: " + err.message);
                btn.disabled = false;
              }
            } else if (act === "toggle-raw") {
              const nextRaw = btn.getAttribute("data-next") === "1";
              const targetItem = shareMgrItems.find(function(it) { return it.path === targetPath; });
              if (nextRaw && targetItem && targetItem.locked) {
                alert("${lang === 'zh' ? '笔记已锁定，请先解锁后再开启 Raw 公开' : 'Note is locked. Unlock it first.'}");
                return;
              }
              btn.disabled = true;
              try {
                const resp = await fetch("/" + encodedPath + "/setting", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ rawPublic: nextRaw })
                });
                const res = await resp.json();
                if (res.err === 0) {
                  if (curPath === targetPath) {
                    isNoteRawPublic = nextRaw;
                    syncRawBoxUI(nextRaw);
                  }
                  await loadShareManagerList(false);
                  if (typeof loadNotes === "function") loadNotes();
                } else {
                  alert(res.msg || "操作失败");
                  btn.disabled = false;
                }
              } catch (err) {
                alert("请求异常: " + err.message);
                btn.disabled = false;
              }
            }
          });
        }
      })();
    </script>
    ` : ""}

    <!-- Lightbox for image clicks in note -->
    <script>
      (function() {
        document.addEventListener("click", function(e) {
          if (e.target && e.target.tagName === "IMG") {
            if (e.target.closest(".vditor-reset") || e.target.closest("#preview-md") || e.target.closest("#vditor") || e.target.closest(".contents")) {
              const lb = document.getElementById("img-lightbox");
              const lbImg = document.getElementById("lightbox-img");
              if (lb && lbImg) {
                lbImg.src = e.target.src;
                lb.style.display = "flex";
              }
            }
          }
        });
        const lb = document.getElementById("img-lightbox");
        if (lb) {
          lb.onclick = function() { lb.style.display = "none"; };
        }
      })();
    </script>

    ${isEdit && isPrivateMode ? `
    <script>
      (function() {
        const contents = document.querySelector("#contents");
        const imgBtn = document.querySelector("#opt-img-btn");
        const fileInput = document.querySelector("#img-upload-input");

        function showUploadToast(text) {
          let toast = document.getElementById("upload-toast");
          if (!toast) {
            toast = document.createElement("div");
            toast.id = "upload-toast";
            toast.style.cssText = "position:fixed;bottom:65px;right:24px;background:var(--toast-bg);color:var(--toast-fg);border:1px solid var(--border-default);padding:8px 16px;border-radius:6px;font-size:12px;z-index:99999;box-shadow:var(--shadow-card);transition:all 0.2s;";
            document.body.appendChild(toast);
          }
          toast.textContent = text;
          toast.style.background = "var(--toast-bg)";
          toast.style.opacity = "1";
          return {
            update: function(msg) { toast.textContent = msg; },
            done: function(msg, isErr) {
              toast.textContent = msg;
              if (isErr) toast.style.background = "var(--danger-fg)";
              setTimeout(function() {
                toast.style.opacity = "0";
                setTimeout(function() { if (toast.parentNode) toast.remove(); }, 300);
              }, 2000);
            }
          };
        }

        function insertImageMarkdown(url) {
          const mdImg = "\\n![](" + url + ")\\n";
          if (window.vditorInstance) {
            window.vditorInstance.insertValue(mdImg);
          } else if (contents) {
            const start = contents.selectionStart || 0;
            const end = contents.selectionEnd || 0;
            const text = contents.value || "";
            contents.value = text.substring(0, start) + mdImg + text.substring(end);
            contents.selectionStart = contents.selectionEnd = start + mdImg.length;
            contents.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }

        function compressImageToWebP(file, maxDimension, maxSizeBytes) {
          maxDimension = maxDimension || 1920;
          maxSizeBytes = maxSizeBytes || 1000 * 1024;
          return new Promise(function(resolve, reject) {
            if (file.type === "image/webp" && file.size <= maxSizeBytes) {
              return resolve(file);
            }
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function(e) {
              const img = new Image();
              img.onerror = reject;
              img.onload = function() {
                let width = img.width;
                let height = img.height;
                if (width > maxDimension || height > maxDimension) {
                  if (width > height) {
                    height = Math.round((height * maxDimension) / width);
                    width = maxDimension;
                  } else {
                    width = Math.round((width * maxDimension) / height);
                    height = maxDimension;
                  }
                }
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(function(blob) {
                  if (!blob) return resolve(file);
                  if (blob.size > maxSizeBytes) {
                    canvas.toBlob(function(smallerBlob) {
                      resolve(smallerBlob || blob);
                    }, "image/webp", 0.65);
                  } else {
                    resolve(blob);
                  }
                }, "image/webp", 0.82);
              };
              img.src = e.target.result;
            };
            reader.readAsDataURL(file);
          });
        }

        async function processAndUpload(file) {
          if (!file || !file.type.startsWith("image/")) {
            alert("请选择图片文件");
            return;
          }
          const toast = showUploadToast("${SUPPORTED_LANG[lang].uploading}");
          try {
            const webpBlob = await compressImageToWebP(file);
            toast.update("正在上传到 EdgeOne Blob (配额 200MB)...");

            const formData = new FormData();
            formData.append("file", webpBlob, "image.webp");

            const path = decodeURIComponent(window.location.pathname.replace(new RegExp('^/+', 'g'), ''));
            const resp = await fetch("/api/upload", {
              method: "POST",
              headers: {
                "x-note-path": encodeURIComponent(path)
              },
              body: formData
            });
            const result = await resp.json();
            if (result.err === 0 && result.data && result.data.url) {
              insertImageMarkdown(result.data.url);
              toast.done("${SUPPORTED_LANG[lang].uploadSuccess} (" + (result.data.size / 1024).toFixed(0) + " KB)");
              if (imgModal && imgModal.style.display !== "none") {
                loadImageManagerList();
              }
            } else {
              toast.done(result.msg || "${SUPPORTED_LANG[lang].uploadFail}", true);
            }
          } catch (err) {
            console.error("Upload error:", err);
            toast.done("${SUPPORTED_LANG[lang].uploadFail}: " + err.message, true);
          }
        }

        window.processAndUploadImage = processAndUpload;

        // --- Image Manager Logic ---
        const imgModal = document.getElementById("image-mgr-modal");
        const imgCloseBtn = document.getElementById("image-mgr-close");
        const imgMask = document.getElementById("image-mgr-mask");
        const imgUploadBtn = document.getElementById("img-mgr-upload-btn");
        const sidebarOpenImgMgr = document.getElementById("sidebar-open-img-mgr");

        async function loadImageManagerList() {
          const grid = document.getElementById("img-mgr-grid");
          const empty = document.getElementById("img-mgr-empty");
          const badge = document.getElementById("img-mgr-quota-badge");
          if (!grid) return;
          grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:30px;color:var(--text-muted);">加载中...</div>';
          if (empty) empty.style.display = "none";
          try {
            const resp = await fetch("/api/images");
            const res = await resp.json();
            if (res.err === 0 && res.data) {
              const list = res.data.images || [];
              const quota = res.data.quota || {};
              if (badge) {
                badge.textContent = (quota.usedMB || "0.00") + "MB / 200MB (" + (quota.percent || "0%") + ")";
              }
              const sidebarQuota = document.getElementById("sidebar-img-quota");
              if (sidebarQuota && quota.usedMB) {
                sidebarQuota.textContent = quota.usedMB + "MB / 200MB";
              }
              if (list.length === 0) {
                grid.innerHTML = "";
                if (empty) empty.style.display = "flex";
                return;
              }
              if (empty) empty.style.display = "none";
              grid.innerHTML = list.map(function(item) {
                const safeName = item.filename.replace(/[^a-zA-Z0-9]/g, '_');
                const sizeStr = item.size ? (item.size / 1024).toFixed(0) + " KB" : "";
                return [
                  '<div class="img-card" id="img-card-' + safeName + '" style="border: 1px solid var(--border-muted); border-radius: 8px; overflow: hidden; background: var(--bg-subtle); display: flex; flex-direction: column;">',
                    '<div class="img-preview-box" data-url="' + item.url + '" title="点击插入到笔记">',
                      '<img src="' + item.url + '" style="max-width: 100%; max-height: 100%; object-fit: contain; pointer-events: none;" loading="lazy" />',
                    '</div>',
                    '<div style="padding: 6px 8px; background: var(--bg-surface); border-top: 1px solid var(--border-muted); display: flex; flex-direction: column; gap: 4px;">',
                      '<div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-secondary);">',
                        '<span style="font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70px;" title="' + item.filename + '">' + item.filename + '</span>',
                        '<span>' + sizeStr + '</span>',
                      '</div>',
                      '<div style="display: flex; gap: 4px; margin-top: 2px;">',
                        '<button class="opt-button" data-action="insert" data-url="' + item.url + '" style="flex: 1; min-width: 0; padding: 2px 2px; font-size: 11px; text-align: center; justify-content: center; box-sizing: border-box;">${SUPPORTED_LANG[lang].insertImg || "插入"}</button>',
                        '<button class="opt-button" data-action="copy" data-url="' + item.url + '" style="flex: 1; min-width: 0; padding: 2px 2px; font-size: 11px; text-align: center; justify-content: center; box-sizing: border-box;" title="复制 Markdown">${SUPPORTED_LANG[lang].copy || "复制"}</button>',
                        '<button class="opt-button" data-action="delete" data-filename="' + item.filename + '" style="flex: 1; min-width: 0; padding: 2px 2px; font-size: 11px; color: var(--danger-fg); text-align: center; justify-content: center; box-sizing: border-box;" title="删除图片">${SUPPORTED_LANG[lang].delete || "删除"}</button>',
                      '</div>',
                    '</div>',
                  '</div>'
                ].join("");
              }).join("");

              if (!grid._hasListener) {
                grid._hasListener = true;
                grid.addEventListener("click", function(e) {
                  const insBtn = e.target.closest("[data-action='insert']");
                  if (insBtn) {
                    window.insertImageToNote(insBtn.getAttribute("data-url"));
                    return;
                  }
                  const cpBtn = e.target.closest("[data-action='copy']");
                  if (cpBtn) {
                    window.copyImageMd(cpBtn.getAttribute("data-url"));
                    return;
                  }
                  const delBtn = e.target.closest("[data-action='delete']");
                  if (delBtn) {
                    window.deleteManagedImage(delBtn.getAttribute("data-filename"));
                    return;
                  }
                  const prevBox = e.target.closest(".img-preview-box");
                  if (prevBox) {
                    window.insertImageToNote(prevBox.getAttribute("data-url"));
                    return;
                  }
                });
              }
            } else {
              grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--danger-fg);padding:20px;">加载失败: ' + (res.msg || "未知错误") + '</div>';
            }
          } catch (e) {
            grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--danger-fg);padding:20px;">网络异常: ' + e.message + '</div>';
          }
        }

        window.openImageManager = function() {
          if (imgModal) {
            imgModal.style.display = "block";
            loadImageManagerList();
          }
        };

        window.closeImageManager = function() {
          if (imgModal) {
            imgModal.style.display = "none";
          }
        };

        window.insertImageToNote = function(url) {
          insertImageMarkdown(url);
          window.closeImageManager();
          const toast = showUploadToast("${SUPPORTED_LANG[lang].insertedImg || '已插入图片到笔记！'}");
          toast.done("${SUPPORTED_LANG[lang].insertedImg || '已插入图片到笔记！'}");
        };

        window.copyImageMd = function(url) {
          const md = "![](" + url + ")";
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(md).then(function() {
              const toast = showUploadToast("${SUPPORTED_LANG[lang].copiedImgMd || '已复制 Markdown 链接！'}");
              toast.done("${SUPPORTED_LANG[lang].copiedImgMd || '已复制 Markdown 链接！'}");
            });
          } else {
            prompt("复制下方 Markdown 图片链接：", md);
          }
        };

        window.deleteManagedImage = async function(filename) {
          if (!confirm("${SUPPORTED_LANG[lang].deleteImgConfirm || '确定永久删除此图片？将立即释放存储配额。'}")) return;
          try {
            const resp = await fetch("/api/images/" + filename + "/delete", { method: "POST" });
            const res = await resp.json();
            if (res.err === 0) {
              const toast = showUploadToast("图片已删除");
              toast.done("图片已删除");
              loadImageManagerList();
            } else {
              alert("删除失败: " + (res.msg || "未知错误"));
            }
          } catch (e) {
            alert("删除异常: " + e.message);
          }
        };

        if (imgBtn) {
          imgBtn.onclick = function() { window.openImageManager(); };
        }
        if (sidebarOpenImgMgr) {
          sidebarOpenImgMgr.onclick = function() { window.openImageManager(); };
        }
        if (imgCloseBtn) {
          imgCloseBtn.onclick = function() { window.closeImageManager(); };
        }
        if (imgMask) {
          imgMask.onclick = function() { window.closeImageManager(); };
        }
        if (imgUploadBtn && fileInput) {
          imgUploadBtn.onclick = function() { fileInput.click(); };
        }
        if (fileInput) {
          fileInput.onchange = async function() {
            if (this.files && this.files.length) {
              for (let i = 0; i < this.files.length; i++) {
                await processAndUpload(this.files[i]);
              }
              this.value = "";
              if (imgModal && imgModal.style.display !== "none") {
                loadImageManagerList();
              }
            }
          };
        }

        // Paste event on textarea (Plain Text mode)
        if (contents) {
          contents.addEventListener("paste", function(e) {
            const items = e.clipboardData && e.clipboardData.items;
            if (!items) return;
            for (let i = 0; i < items.length; i++) {
              if (items[i].type.indexOf("image") !== -1) {
                const file = items[i].getAsFile();
                if (file) {
                  e.preventDefault();
                  processAndUpload(file);
                  break;
                }
              }
            }
          });
        }

        // Drag & drop support
        window.addEventListener("dragover", function(e) { e.preventDefault(); });
        window.addEventListener("drop", function(e) {
          const files = e.dataTransfer && e.dataTransfer.files;
          if (files && files.length && files[0].type.startsWith("image/")) {
            e.preventDefault();
            processAndUpload(files[0]);
          }
        });
      })();
    <\/script>
    ` : ""}

    ${isEdit && isMdMode ? `
    <script>
      (function() {
        const contents = document.querySelector("#contents");
        const vditorEl = document.querySelector("#vditor");
        if (!contents || !vditorEl) return;

        function initVditor() {
          const isDarkInit = document.documentElement && document.documentElement.dataset.theme === "dark";
          window.vditorInstance = new Vditor("vditor", {
            mode: "ir",
            theme: isDarkInit ? "dark" : "classic",
            preview: { theme: { current: isDarkInit ? "dark" : "light" } },
            cdn: "//gcore.jsdelivr.net/npm/vditor@3.10.8",
            height: "calc(100vh - 120px)",
            placeholder: contents.getAttribute("placeholder") || "",
            toolbarConfig: { hide: true },
            toolbar: [],
            cache: { enable: false },
            ${isPrivateMode ? `
            upload: {
              accept: "image/*",
              multiple: false,
              handler: function(files) {
                if (files && files.length && window.processAndUploadImage) {
                  window.processAndUploadImage(files[0]);
                }
              }
            },
            ` : ""}
            value: contents.value || "",
            after() {
              if (typeof window.updateToc === "function") {
                window.updateToc(contents.value);
              }
            },
            input(val) {
              contents.value = val;
              if (typeof window.updateWordCount === "function") {
                window.updateWordCount(val);
              }
              if (typeof window.triggerDraftSave === "function") {
                window.triggerDraftSave(val);
              }
              if (typeof window.updateToc === "function") {
                window.updateToc(val);
              }
              if (typeof contents.oninput === "function") {
                contents.oninput();
              } else {
                contents.dispatchEvent(new Event("input", { bubbles: true }));
              }
            }
          });
        }

        if (typeof Vditor !== "undefined") {
          initVditor();
        } else {
          window.addEventListener("load", initVditor);
        }
      })();
    <\/script>
    ` : ""}

    <!-- Word Count, Auto-Draft Box & History Scripts -->
    <script>
      (function() {
        // --- 1. Real-time Word & Character Count ---
        const contents = document.querySelector("#contents");
        const previewMd = document.querySelector("#preview-md");
        const previewPlain = document.querySelector("#preview-plain");
        const countEl = document.getElementById("status-word-count");

        window.updateWordCount = function(text) {
          if (!countEl) return;
          if (typeof text !== "string") {
            if (contents && contents.value !== undefined) text = contents.value;
            else if (previewMd) text = previewMd.innerText || previewMd.textContent || "";
            else if (previewPlain) text = previewPlain.innerText || previewPlain.textContent || "";
            else text = "";
          }
          const cnMatches = text.match(/[\u4e00-\u9fa5]/g);
          const cnCount = cnMatches ? cnMatches.length : 0;
          const enText = text.replace(/[\u4e00-\u9fa5]/g, " ");
          const enMatches = enText.match(/[a-zA-Z0-9_-]+/g);
          const enCount = enMatches ? enMatches.length : 0;
          const words = cnCount + enCount;
          const chars = text.length;
          const lines = text ? text.split(String.fromCharCode(10)).length : 0;
          countEl.textContent = "${SUPPORTED_LANG[lang].wordsCount || '字数'}: " + words + " · ${SUPPORTED_LANG[lang].charsCount || '字符'}: " + chars + " · " + lines + " ${SUPPORTED_LANG[lang].linesCount || '行'}";
        };

        window.updateWordCount();
        window.addEventListener("load", function() { window.updateWordCount(); });

        if (contents) {
          contents.addEventListener("input", function() {
            window.updateWordCount(contents.value);
            if (typeof window.triggerDraftSave === "function") {
              window.triggerDraftSave(contents.value);
            }
            if (typeof window.updateToc === "function") {
              window.updateToc(contents.value);
            }
          });
        }

        // --- 2. LocalStorage Auto-Draft Box ---
        const draftAlert = document.getElementById("draft-alert");
        const draftMsg = document.getElementById("draft-alert-msg");
        const restoreBtn = document.getElementById("draft-restore-btn");
        const discardBtn = document.getElementById("draft-discard-btn");
        const currentPath = decodeURIComponent(window.location.pathname.replace(new RegExp('^/+|/+$', 'g'), ''));
        const isEditPage = ${Boolean(isEdit)};

        if (isEditPage && contents && draftAlert && currentPath && !currentPath.startsWith("api") && !currentPath.startsWith("share")) {
          const draftKey = "scn_draft_" + encodeURIComponent(currentPath);
          window._cloudContent = contents.value || "";

          function formatDraftTime(ts) {
            const diff = Math.floor((Date.now() - ts) / 1000);
            if (diff < 60) return "刚刚";
            if (diff < 3600) return Math.floor(diff / 60) + " 分钟前";
            if (diff < 86400) return Math.floor(diff / 3600) + " 小时前";
            return Math.floor(diff / 86400) + " 天前";
          }

          try {
            const raw = localStorage.getItem(draftKey);
            if (raw) {
              const data = JSON.parse(raw);
              if (data && data.content && data.content !== window._cloudContent && data.content.trim().length > 0) {
                if (data.time && (Date.now() - data.time < 7 * 24 * 3600 * 1000)) {
                  draftMsg.textContent = "${SUPPORTED_LANG[lang].draftDetected || '检测到本地未保存草稿'} (" + formatDraftTime(data.time) + " 保存)";
                  draftAlert.style.display = "flex";
                } else {
                  localStorage.removeItem(draftKey);
                }
              } else if (data && data.content === window._cloudContent) {
                localStorage.removeItem(draftKey);
              }
            }
          } catch(e) {}

          if (restoreBtn) {
            restoreBtn.onclick = function() {
              try {
                const raw = localStorage.getItem(draftKey);
                if (raw) {
                  const data = JSON.parse(raw);
                  if (data && data.content) {
                    contents.value = data.content;
                    if (window.vditorInstance) {
                      window.vditorInstance.setValue(data.content);
                    }
                    window.updateWordCount(data.content);
                    if (typeof window.updateToc === "function") {
                      window.updateToc(data.content);
                    }
                    if (typeof contents.oninput === "function") {
                      contents.oninput();
                    } else {
                      contents.dispatchEvent(new Event("input", { bubbles: true }));
                    }
                  }
                }
              } catch(e) {}
              draftAlert.style.display = "none";
              localStorage.removeItem(draftKey);
            };
          }

          if (discardBtn) {
            discardBtn.onclick = function() {
              localStorage.removeItem(draftKey);
              draftAlert.style.display = "none";
            };
          }

          let draftDebounceTimer = null;
          window.triggerDraftSave = function(val) {
            clearTimeout(draftDebounceTimer);
            draftDebounceTimer = setTimeout(function() {
              try {
                if (val !== window._cloudContent && val.trim().length > 0) {
                  localStorage.setItem(draftKey, JSON.stringify({
                    content: val,
                    time: Date.now()
                  }));
                } else if (val === window._cloudContent) {
                  localStorage.removeItem(draftKey);
                  if (draftAlert) draftAlert.style.display = "none";
                }
              } catch(e) {}
            }, 600);
          };

          const nativeFetch = window.fetch;
          window.fetch = async function(...args) {
            const resp = await nativeFetch.apply(this, args);
            try {
              const url = args[0];
              const opts = args[1] || {};
              if (opts.method === "POST" && (!url || url === "" || url === window.location.pathname)) {
                resp.clone().json().then(res => {
                  if (res && res.err === 0) {
                    window._cloudContent = contents.value;
                    localStorage.removeItem(draftKey);
                    if (draftAlert) draftAlert.style.display = "none";
                  }
                }).catch(() => {});
              }
            } catch(e) {}
            return resp;
          };
        }

        // --- 3. History Snapshots Manager ---
        const histBtn = document.getElementById("opt-hist-btn");
        const histModal = document.getElementById("history-mgr-modal");
        const histMask = document.getElementById("history-mgr-mask");
        const histClose = document.getElementById("history-mgr-close");
        const itemsList = document.getElementById("history-items-list");
        const previewBox = document.getElementById("history-preview-box");
        const previewTitle = document.getElementById("history-preview-title");
        const applyBtn = document.getElementById("history-apply-btn");
        const emptyBox = document.getElementById("history-mgr-empty");
        const bodyBox = document.getElementById("history-mgr-body");

        let currentSnapshots = [];
        let selectedSnapshot = null;

        window.openHistoryManager = async function() {
          if (!histModal) return;
          histModal.style.display = "flex";
          if (previewBox) previewBox.value = "";
          if (applyBtn) applyBtn.style.display = "none";
          if (previewTitle) previewTitle.textContent = "选择版本查看内容";
          selectedSnapshot = null;
          await loadHistorySnapshots();
        };

        window.closeHistoryManager = function() {
          if (histModal) histModal.style.display = "none";
        };

        if (histBtn) histBtn.onclick = window.openHistoryManager;
        if (histClose) histClose.onclick = window.closeHistoryManager;
        if (histMask) histMask.onclick = window.closeHistoryManager;

        async function loadHistorySnapshots() {
          if (!itemsList) return;
          itemsList.innerHTML = '<div style="padding:16px; color:var(--text-muted); font-size:12px; text-align:center;">正在加载快照...</div>';
          try {
            const resp = await fetch("/api/history?path=" + encodeURIComponent(currentPath));
            const res = await resp.json();
            if (res.err !== 0) {
              itemsList.innerHTML = '<div style="padding:16px; color:var(--danger-fg); font-size:12px; text-align:center;">加载失败: ' + (res.msg || "未知错误") + '</div>';
              return;
            }
            currentSnapshots = res.data || [];
            if (!currentSnapshots.length) {
              if (bodyBox) bodyBox.style.display = "none";
              if (emptyBox) emptyBox.style.display = "flex";
              return;
            }
            if (bodyBox) bodyBox.style.display = "flex";
            if (emptyBox) emptyBox.style.display = "none";

            itemsList.innerHTML = "";
            function escHistText(s) {
              return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            }
            currentSnapshots.forEach((snap, idx) => {
              const item = document.createElement("div");
              item.className = "history-snap-item";
              const sizeKb = (snap.size / 1024).toFixed(1);
              item.innerHTML = [
                '<div style="font-size:12px; font-weight:600; color:var(--text-primary); margin-bottom:2px;">' + escHistText(snap.dateStr || ("历史版本 " + (idx + 1))) + '</div>',
                '<div style="font-size:11px; color:var(--text-secondary); margin-bottom:4px;">大小: ' + snap.size + ' 字符 (' + sizeKb + ' KB)</div>',
                '<div style="font-size:11px; color:var(--text-muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">' + escHistText(snap.preview || "(无预览)") + '</div>'
              ].join("");

              item.onclick = function() {
                Array.from(itemsList.children).forEach(el => {
                  el.classList.remove("selected");
                });
                item.classList.add("selected");
                selectSnapshot(snap);
              };
              itemsList.appendChild(item);
            });

            if (itemsList.firstChild) {
              itemsList.firstChild.click();
            }
          } catch(err) {
            itemsList.innerHTML = '<div style="padding:16px; color:var(--danger-fg); font-size:12px; text-align:center;">网络异常: ' + err.message + '</div>';
          }
        }

        async function selectSnapshot(snap) {
          selectedSnapshot = snap;
          if (previewTitle) previewTitle.textContent = "快照时间: " + snap.dateStr;
          if (previewBox) previewBox.value = "正在读取快照正文...";
          if (applyBtn) applyBtn.style.display = "none";

          try {
            const resp = await fetch("/api/history/view?path=" + encodeURIComponent(currentPath) + "&id=" + snap.id);
            const res = await resp.json();
            if (res.err === 0 && res.data) {
              const snapContent = res.data.content || "";
              if (previewBox) previewBox.value = snapContent;
              if (applyBtn) {
                applyBtn.style.display = "inline-block";
                applyBtn.onclick = async function() {
                  if (!confirm("${SUPPORTED_LANG[lang].restoreConfirm || '确定要将笔记恢复到此历史版本吗？当前编辑区内容将被替换。'}")) return;
                  applyBtn.disabled = true;
                  try {
                    const saveResp = await fetch(window.location.pathname, {
                      method: "POST",
                      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
                      body: "t=" + encodeURIComponent(snapContent)
                    });
                    const saveRes = await saveResp.json();
                    if (saveRes.err !== 0) {
                      alert("${lang === 'zh' ? '恢复保存失败: ' : 'Restore save failed: '}" + (saveRes.msg || "unknown"));
                      return;
                    }
                    window._cloudContent = snapContent;
                    if (contents) contents.value = snapContent;
                    if (window.vditorInstance) {
                      window.vditorInstance.setValue(snapContent);
                    }
                    window.updateWordCount(snapContent);
                    if (typeof window.updateToc === "function") {
                      window.updateToc(snapContent);
                    }
                    if (typeof contents.oninput === "function") {
                      contents.oninput();
                    } else if (contents) {
                      contents.dispatchEvent(new Event("input", { bubbles: true }));
                    }
                    window.closeHistoryManager();
                    alert("${SUPPORTED_LANG[lang].restoredMsg || '已恢复到所选历史版本并保存！'}");
                  } catch (saveErr) {
                    alert("${lang === 'zh' ? '恢复保存异常: ' : 'Restore error: '}" + saveErr.message);
                  } finally {
                    applyBtn.disabled = false;
                  }
                };
              }
            } else {
              if (previewBox) previewBox.value = "读取快照失败: " + (res.msg || "未知错误");
            }
          } catch(err) {
            if (previewBox) previewBox.value = "读取快照异常: " + err.message;
          }
        }

        // --- 4. Markdown Floating Table of Contents (TOC) ---
        const tocToggleBtn = document.getElementById("toc-toggle-btn");
        const tocBadge = document.getElementById("toc-badge");
        const tocPanel = document.getElementById("toc-panel");
        const tocCloseBtn = document.getElementById("toc-close-btn");
        const tocList = document.getElementById("toc-list");

        function getRawMarkdown(overrideText) {
          if (typeof overrideText === "string") return overrideText;
          if (window.vditorInstance && typeof window.vditorInstance.getValue === "function") {
            return window.vditorInstance.getValue();
          }
          if (contents && contents.value !== undefined) return contents.value;
          return "";
        }

        window.updateToc = function(overrideText) {
          if (!tocList || !tocToggleBtn || !tocBadge) return;

          let items = [];

          // 1. If in preview mode with rendered DOM headers
          if (previewMd && previewMd.children.length > 0) {
            const domHeadings = previewMd.querySelectorAll("h1, h2, h3, h4, h5, h6");
            if (domHeadings.length > 0) {
              domHeadings.forEach((h, idx) => {
                const level = parseInt(h.tagName.substring(1), 10) || 1;
                const text = (h.innerText || h.textContent || "").trim();
                if (text) {
                  items.push({
                    level,
                    text,
                    element: h,
                    index: idx
                  });
                }
              });
            }
          }

          // 2. If no DOM headings (or in edit mode), parse from markdown text
          if (items.length === 0) {
            const raw = getRawMarkdown(overrideText);
            if (raw) {
              const lines = raw.split(String.fromCharCode(10));
              let inCode = false;
              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.trim().startsWith(String.fromCharCode(96, 96, 96))) {
                  inCode = !inCode;
                  continue;
                }
                if (inCode) continue;
                const match = line.match(/^(#{1,6}) +(.+)$/);
                if (match) {
                  const cleanText = match[2].trim().replace(/[*_~]/g, "").replace(new RegExp(String.fromCharCode(96), "g"), "");
                  items.push({
                    level: match[1].length,
                    text: cleanText,
                    lineIndex: i,
                    raw: line,
                    index: items.length
                  });
                }
              }
            }
          }

          // Update badge and toggle button visibility
          if (items.length === 0) {
            tocToggleBtn.style.display = "none";
            if (tocPanel) tocPanel.style.display = "none";
            tocList.innerHTML = "";
            return;
          }

          tocToggleBtn.style.display = "flex";
          tocBadge.textContent = items.length;

          // Render items into tocList
          let html = "";
          items.forEach((item, idx) => {
            const safeText = item.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            html += '<a class="toc-item h' + item.level + '" data-toc-idx="' + idx + '" title="' + safeText + '">' + safeText + '</a>';
          });
          tocList.innerHTML = html;

          // Click handler for jumping
          const links = tocList.querySelectorAll(".toc-item");
          links.forEach((link) => {
            link.onclick = function(e) {
              e.preventDefault();
              links.forEach(l => l.classList.remove("active"));
              link.classList.add("active");
              const idx = parseInt(link.getAttribute("data-toc-idx"), 10);
              const item = items[idx];
              if (!item) return;

              // Jump in preview mode
              if (item.element) {
                item.element.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
              }

              // Jump in Vditor DOM if headings are present
              const vditorHeadings = document.querySelectorAll(".vditor-reset h1, .vditor-reset h2, .vditor-reset h3, .vditor-reset h4, .vditor-reset h5, .vditor-reset h6");
              if (vditorHeadings.length > idx) {
                vditorHeadings[idx].scrollIntoView({ behavior: "smooth", block: "center" });
                return;
              }

              // Jump in textarea
              if (contents && item.lineIndex !== undefined) {
                const lines = contents.value.split(String.fromCharCode(10));
                let offset = 0;
                for (let j = 0; j < item.lineIndex; j++) {
                  offset += lines[j].length + 1;
                }
                contents.focus();
                contents.setSelectionRange(offset, offset + item.raw.length);
                const approxLineHeight = 22;
                contents.scrollTop = Math.max(0, item.lineIndex * approxLineHeight - 100);
              }
            };
          });
        };

        if (tocToggleBtn) {
          tocToggleBtn.onclick = function(e) {
            e.stopPropagation();
            if (!tocPanel) return;
            const isVisible = tocPanel.style.display === "flex";
            tocPanel.style.display = isVisible ? "none" : "flex";
          };
        }
        if (tocCloseBtn) {
          tocCloseBtn.onclick = function(e) {
            e.stopPropagation();
            if (tocPanel) tocPanel.style.display = "none";
          };
        }
        document.addEventListener("click", function(e) {
          if (tocPanel && tocPanel.style.display === "flex") {
            if (!tocPanel.contains(e.target) && !tocToggleBtn.contains(e.target)) {
              tocPanel.style.display = "none";
            }
          }
        });

        // Trigger TOC initialization
        setTimeout(function() {
          window.updateToc();
        }, 300);
        window.addEventListener("load", function() {
          setTimeout(function() { window.updateToc(); }, 300);
        });

        // Preview mode observer to update TOC when markdown renders
        if (previewMd) {
          try {
            const previewObserver = new MutationObserver(function() {
              window.updateToc();
            });
            previewObserver.observe(previewMd, { childList: true, subtree: true });
          } catch(e) {}
        }

        // --- 5. Lightweight Collapsible Edit Toolbar ---
        const etbToggle = document.getElementById("edit-toolbar-toggle");
        const etbBar = document.getElementById("edit-toolbar-bar");
        if (etbToggle && etbBar) {
          function setToolbarOpen(open) {
            if (open) {
              etbBar.classList.add("open");
              etbToggle.classList.add("active");
              etbToggle.setAttribute("aria-expanded", "true");
            } else {
              etbBar.classList.remove("open");
              etbToggle.classList.remove("active");
              etbToggle.setAttribute("aria-expanded", "false");
            }
          }

          // Prevent stealing editor focus/selection when clicking toolbar buttons
          etbToggle.addEventListener("mousedown", function(e) { e.preventDefault(); });
          etbBar.addEventListener("mousedown", function(e) {
            if (e.target && e.target.closest(".etb-btn")) {
              e.preventDefault();
            }
          });

          etbToggle.addEventListener("click", function(e) {
            e.stopPropagation();
            setToolbarOpen(!etbBar.classList.contains("open"));
          });

          document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && etbBar.classList.contains("open")) {
              setToolbarOpen(false);
            }
          });

          function syncEditorAfterInsert(newVal) {
            if (!contents) return;
            contents.value = newVal;
            if (typeof window.updateWordCount === "function") window.updateWordCount(newVal);
            if (typeof window.triggerDraftSave === "function") window.triggerDraftSave(newVal);
            if (typeof window.updateToc === "function") window.updateToc(newVal);
            if (typeof contents.oninput === "function") {
              contents.oninput();
            } else {
              contents.dispatchEvent(new Event("input", { bubbles: true }));
            }
          }

          function applyToolbarAction(action) {
            const NL = String.fromCharCode(10);
            const BT = String.fromCharCode(96);
            const FENCE = BT + BT + BT;
            const isZh = ${lang === "zh"};
            const isPriv = ${Boolean(isPrivateMode)};

            if (action === "image" && isPriv && typeof window.openImageManager === "function") {
              window.openImageManager();
              return;
            }

            const vd = window.vditorInstance;
            if (vd && typeof vd.insertValue === "function") {
              const selObj = window.getSelection ? window.getSelection() : null;
              const irEl = vd.vditor && vd.vditor.ir && vd.vditor.ir.element;
              const inEditor = !!(selObj && selObj.rangeCount > 0 && irEl && irEl.contains(selObj.anchorNode));
              const sel = inEditor ? selObj.toString() : "";
              let md = "";
              if (action === "bold") {
                if (sel && sel.startsWith("**") && sel.endsWith("**") && sel.length > 4) {
                  md = sel.slice(2, -2);
                } else {
                  md = "**" + (sel || (isZh ? "粗体文本" : "bold")) + "**";
                }
              } else if (action === "italic") {
                if (sel && sel.startsWith("*") && sel.endsWith("*") && sel.length > 2 && !sel.startsWith("**")) {
                  md = sel.slice(1, -1);
                } else {
                  md = "*" + (sel || (isZh ? "斜体文本" : "italic")) + "*";
                }
              } else if (action === "h3") md = "### " + (sel || (isZh ? "三级标题" : "Heading 3"));
              else if (action === "quote") md = "> " + (sel || (isZh ? "引用内容" : "Quote"));
              else if (action === "code") {
                if (sel && sel.startsWith(BT) && sel.endsWith(BT) && sel.length > 2) {
                  md = sel.slice(1, -1);
                } else {
                  md = BT + (sel || (isZh ? "行内代码" : "code")) + BT;
                }
              }
              else if (action === "codeblock") md = NL + FENCE + NL + (sel || (isZh ? "代码内容" : "code")) + NL + FENCE + NL;
              else if (action === "ul") md = "- " + (sel || (isZh ? "列表项" : "List item"));
              else if (action === "task") md = "- [ ] " + (sel || (isZh ? "待办事项" : "Task item"));
              else if (action === "link") md = "[" + (sel || (isZh ? "链接文字" : "link text")) + "](https://)";
              else if (action === "image") md = "![" + (sel || (isZh ? "图片描述" : "alt")) + "](https://)";
              else if (action === "table") {
                md = NL + (isZh ? "| 列1 | 列2 | 列3 |" : "| Col 1 | Col 2 | Col 3 |") + NL + "| :--- | :---: | ---: |" + NL + (isZh ? "| 内容1 | 内容2 | 内容3 |" : "| Cell 1 | Cell 2 | Cell 3 |") + NL;
              }
              if (md) {
                if (!inEditor && typeof vd.focus === "function") {
                  vd.focus();
                } else if (inEditor && selObj && !selObj.isCollapsed) {
                  if (typeof vd.deleteValue === "function") {
                    vd.deleteValue();
                  } else {
                    document.execCommand("delete", false);
                  }
                }
                const safeMd = md.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                vd.insertValue(safeMd, true);
                setTimeout(function() {
                  const val = typeof vd.getValue === "function" ? vd.getValue() : contents.value;
                  syncEditorAfterInsert(val);
                }, 20);
              }
              return;
            }

            if (!contents) return;
            const val = contents.value || "";
            const start = typeof contents.selectionStart === "number" ? contents.selectionStart : val.length;
            const end = typeof contents.selectionEnd === "number" ? contents.selectionEnd : val.length;
            const sel = val.slice(start, end);

            if (action === "h3" || action === "quote" || action === "ul" || action === "task") {
              const prefix = action === "h3" ? "### " : (action === "quote" ? "> " : (action === "ul" ? "- " : "- [ ] "));
              const lineStart = val.lastIndexOf(NL, Math.max(0, start - 1)) + 1;
              const nextVal = val.slice(0, lineStart) + prefix + val.slice(lineStart);
              contents.value = nextVal;
              contents.focus();
              contents.setSelectionRange(start + prefix.length, end + prefix.length);
              syncEditorAfterInsert(nextVal);
              return;
            }

            let insertText = "";
            let selStartOffset = 0;
            let selEndOffset = 0;

            if (action === "bold" || action === "italic" || action === "code") {
              const mark = action === "bold" ? "**" : (action === "italic" ? "*" : BT);
              const inner = sel || (action === "bold" ? (isZh ? "粗体文本" : "bold") : (action === "italic" ? (isZh ? "斜体文本" : "italic") : (isZh ? "代码" : "code")));
              insertText = mark + inner + mark;
              selStartOffset = mark.length;
              selEndOffset = mark.length + inner.length;
            } else if (action === "link") {
              const text = sel || (isZh ? "链接文字" : "link text");
              insertText = "[" + text + "](https://)";
              selStartOffset = text.length + 3;
              selEndOffset = insertText.length - 1;
            } else if (action === "image") {
              const alt = sel || (isZh ? "图片描述" : "alt");
              insertText = "![" + alt + "](https://)";
              selStartOffset = alt.length + 4;
              selEndOffset = insertText.length - 1;
            } else if (action === "codeblock") {
              const inner = sel || (isZh ? "代码内容" : "code");
              const needLead = start > 0 && val.charAt(start - 1) !== NL ? NL : "";
              insertText = needLead + FENCE + NL + inner + NL + FENCE + NL;
              selStartOffset = needLead.length + FENCE.length + 1;
              selEndOffset = selStartOffset + inner.length;
            } else if (action === "table") {
              const needLead = start > 0 && val.charAt(start - 1) !== NL ? NL : "";
              const tbl = (isZh ? "| 列1 | 列2 | 列3 |" : "| Col 1 | Col 2 | Col 3 |") + NL + "| :--- | :---: | ---: |" + NL + (isZh ? "| 内容1 | 内容2 | 内容3 |" : "| Cell 1 | Cell 2 | Cell 3 |") + NL;
              insertText = needLead + tbl;
              selStartOffset = insertText.length;
              selEndOffset = insertText.length;
            }

            const nextVal = val.slice(0, start) + insertText + val.slice(end);
            contents.value = nextVal;
            contents.focus();
            contents.setSelectionRange(start + selStartOffset, start + selEndOffset);
            syncEditorAfterInsert(nextVal);
          }

          etbBar.addEventListener("click", function(e) {
            const btn = e.target && e.target.closest(".etb-btn");
            if (!btn) return;
            const action = btn.getAttribute("data-md");
            if (action) applyToolbarAction(action);
          });
        }
      })();
    <\/script>
    ${isEdit ? SAVE_SHORTCUT_SCRIPT(lang) : ""}
    ${isEdit && isPrivateMode ? QUICK_SWITCH_SCRIPT(lang) : ""}
    ${THEME_CONTROLLER_SCRIPT(lang)}
</body>
</html>
`;
  };

const SAVE_SHORTCUT_SCRIPT = (lang) => `
    <script>
      (function() {
        const contents = document.querySelector("#contents");
        const draftAlert = document.getElementById("draft-alert");
        const currentPath = decodeURIComponent(window.location.pathname.replace(new RegExp("^/+|/+$", "g"), ""));
        if (!contents || !currentPath || currentPath.startsWith("api") || currentPath.startsWith("share")) return;

        window.showActionToast = function(msg, isError) {
          let toastEl = document.getElementById("action-toast");
          if (!toastEl) {
            toastEl = document.createElement("div");
            toastEl.id = "action-toast";
            document.body.appendChild(toastEl);
          }
          toastEl.className = isError ? "error" : "";
          toastEl.textContent = msg || "";
          toastEl.style.opacity = "1";
          clearTimeout(toastEl._hideTimer);
          toastEl._hideTimer = setTimeout(function() {
            if (toastEl) toastEl.style.opacity = "0";
          }, 1800);
        };

        let isSavingNow = false;
        window.saveNoteNow = async function() {
          if (isSavingNow) return;
          isSavingNow = true;
          try {
            let val = contents.value || "";
            if (window.vditorInstance && typeof window.vditorInstance.getValue === "function") {
              val = window.vditorInstance.getValue();
              contents.value = val;
            }
            window.showActionToast("${SUPPORTED_LANG[lang].savingNow}");
            const resp = await fetch(window.location.pathname, {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
              body: "t=" + encodeURIComponent(val)
            });
            const res = await resp.json();
            if (res && res.err === 0) {
              window._cloudContent = val;
              try { localStorage.removeItem("scn_draft_" + encodeURIComponent(currentPath)); } catch (e) {}
              if (draftAlert) draftAlert.style.display = "none";
              const lmEl = document.querySelector(".footer .last-modified");
              if (lmEl) lmEl.textContent = "${SUPPORTED_LANG[lang].lastModified}: ${SUPPORTED_LANG[lang].savedNow}";
              if (Array.isArray(window._searchIndexCache)) {
                const nowSec = Math.floor(Date.now() / 1000);
                const normVal = String(val || "").replace(/\\r\\n?/g, "\\n").replace(/[ \\t]+/g, " ").trim().slice(0, 30000);
                window._searchIndexCache = window._searchIndexCache.filter(function(it) { return it && it.path !== currentPath; });
                window._searchIndexCache.unshift({ path: currentPath, text: normVal, updateAt: nowSec });
              }
              window.showActionToast("${SUPPORTED_LANG[lang].savedNow}");
            } else {
              window.showActionToast((res && res.msg) || "${SUPPORTED_LANG[lang].saveFailed}", true);
            }
          } catch (err) {
            window.showActionToast("${SUPPORTED_LANG[lang].saveFailed}: " + (err && err.message ? err.message : ""), true);
          } finally {
            isSavingNow = false;
          }
        };

        document.addEventListener("keydown", function(e) {
          if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === "s" || e.key === "S")) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof window.saveNoteNow === "function") {
              window.saveNoteNow();
            }
          }
        }, true);
      })();
    <\/script>
`;

const QUICK_SWITCH_SCRIPT = (lang) => `
    <script>
      (function() {
        const qsModal = document.getElementById("quick-switch-modal");
        if (!qsModal) return;
        const qsMask = document.getElementById("quick-switch-mask");
        const qsInput = document.getElementById("qs-input");
        const qsModeTitle = document.getElementById("qs-mode-title");
        const qsModeFull = document.getElementById("qs-mode-fulltext");
        const qsRefreshBtn = document.getElementById("qs-refresh-btn");
        const qsCloseBtn = document.getElementById("qs-close-btn");
        const qsStatus = document.getElementById("qs-status");
        const qsResults = document.getElementById("qs-results");

        let qsMode = "title";
        let qsList = [];
        let qsActiveIdx = 0;
        let qsSearchTimer = null;

        function escQs(s) {
          return String(s || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
        }

        function encodeQsPath(p) {
          return String(p || "").split("/").map(function(seg) { return encodeURIComponent(seg); }).join("/");
        }

        function splitTokens(q) {
          return String(q || "")
            .toLowerCase()
            .trim()
            .split(new RegExp("[" + String.fromCharCode(32, 9, 10, 13) + "]+"))
            .filter(Boolean);
        }

        function highlightSafe(src, tokens) {
          const text = String(src || "");
          if (!tokens || !tokens.length) return escQs(text);
          const lower = text.toLowerCase();
          const ranges = [];
          for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            if (!tok) continue;
            let from = 0;
            while (true) {
              const idx = lower.indexOf(tok, from);
              if (idx === -1) break;
              ranges.push([idx, idx + tok.length]);
              from = idx + tok.length;
              if (ranges.length > 60) break;
            }
          }
          if (!ranges.length) return escQs(text);
          ranges.sort(function(a, b) { return a[0] - b[0] || b[1] - a[1]; });
          const merged = [];
          for (let i = 0; i < ranges.length; i++) {
            const r = ranges[i];
            if (!merged.length || r[0] > merged[merged.length - 1][1]) {
              merged.push([r[0], r[1]]);
            } else if (r[1] > merged[merged.length - 1][1]) {
              merged[merged.length - 1][1] = r[1];
            }
          }
          let out = "";
          let cursor = 0;
          for (let i = 0; i < merged.length; i++) {
            const m = merged[i];
            if (m[0] > cursor) out += escQs(text.slice(cursor, m[0]));
            out += '<mark class="qs-hl">' + escQs(text.slice(m[0], m[1])) + '</mark>';
            cursor = m[1];
          }
          if (cursor < text.length) out += escQs(text.slice(cursor));
          return out;
        }

        function makeSnippet(bodyText, tokens) {
          const clean = String(bodyText || "").replace(new RegExp("[" + String.fromCharCode(10, 13) + "]+", "g"), " ");
          if (!clean) return "";
          if (!tokens || !tokens.length) return clean.slice(0, 110);
          const lower = clean.toLowerCase();
          let firstIdx = -1;
          for (let i = 0; i < tokens.length; i++) {
            const pos = lower.indexOf(tokens[i]);
            if (pos !== -1 && (firstIdx === -1 || pos < firstIdx)) firstIdx = pos;
          }
          if (firstIdx === -1) return clean.slice(0, 110);
          const start = Math.max(0, firstIdx - 32);
          const end = Math.min(clean.length, start + 130);
          return (start > 0 ? "..." : "") + clean.slice(start, end) + (end < clean.length ? "..." : "");
        }

        async function loadTitleNotes() {
          if (Array.isArray(window._allNotesCache) && window._allNotesCache.length > 0) {
            return window._allNotesCache;
          }
          const resp = await fetch("/api/notes");
          const res = await resp.json();
          if (res.err === 0 && Array.isArray(res.data)) {
            window._allNotesCache = res.data;
            return res.data;
          }
          return [];
        }

        async function loadFullTextIndex(forceRefresh) {
          if (!forceRefresh && Array.isArray(window._searchIndexCache)) {
            return window._searchIndexCache;
          }
          if (qsStatus) qsStatus.textContent = "${SUPPORTED_LANG[lang].searchIndexing}";
          const resp = await fetch("/api/search-index" + (forceRefresh ? "?refresh=1" : ""));
          const res = await resp.json();
          if (res.err === 0 && Array.isArray(res.data)) {
            window._searchIndexCache = res.data;
            return res.data;
          }
          throw new Error(res.msg || "Load failed");
        }

        function syncQsModeUI() {
          if (qsModeTitle) qsModeTitle.classList.toggle("active", qsMode === "title");
          if (qsModeFull) qsModeFull.classList.toggle("active", qsMode === "fulltext");
          if (qsRefreshBtn) qsRefreshBtn.style.display = qsMode === "fulltext" ? "inline-flex" : "none";
          if (qsInput) {
            qsInput.placeholder = qsMode === "fulltext"
              ? "${SUPPORTED_LANG[lang].quickSwitchFullPh}"
              : "${SUPPORTED_LANG[lang].quickSwitchPh}";
          }
        }

        function renderQsItems(tokens) {
          if (!qsResults) return;
          if (!qsList.length) {
            qsResults.innerHTML = '<div class="qs-empty">${SUPPORTED_LANG[lang].searchNoMatch}</div>';
            return;
          }
          if (qsActiveIdx >= qsList.length) qsActiveIdx = 0;
          if (qsActiveIdx < 0) qsActiveIdx = qsList.length - 1;

          let html = "";
          const curPath = decodeURIComponent(window.location.pathname.replace(new RegExp("^/+|/+$", "g"), ""));
          for (let i = 0; i < qsList.length; i++) {
            const item = qsList[i];
            const isAct = i === qsActiveIdx;
            const isCur = item.path === curPath;
            const badge = isCur ? "${lang === 'zh' ? '当前' : 'Current'}" : (item.matchScope === "body" ? "${lang === 'zh' ? '正文命中' : 'Body'}" : "");
            html += '<a class="qs-item' + (isAct ? ' active' : '') + '" data-qs-idx="' + i + '" href="/' + encodeQsPath(item.path) + '">';
            html += '  <div class="qs-item-head">';
            html += '    <span class="qs-item-path">' + highlightSafe(item.path, tokens) + '</span>';
            if (badge) html += '    <span class="qs-item-badge">' + escQs(badge) + '</span>';
            html += '  </div>';
            if (qsMode === "fulltext" && item.snippet) {
              html += '  <div class="qs-snippet">' + highlightSafe(item.snippet, tokens) + '</div>';
            }
            html += '</a>';
          }
          qsResults.innerHTML = html;

          const activeEl = qsResults.querySelector(".qs-item.active");
          if (activeEl && typeof activeEl.scrollIntoView === "function") {
            activeEl.scrollIntoView({ block: "nearest" });
          }
        }

        async function runQsSearch(forceRefreshIndex) {
          const rawQ = qsInput ? qsInput.value : "";
          const tokens = splitTokens(rawQ);
          try {
            if (qsMode === "title") {
              const notes = await loadTitleNotes();
              const matched = tokens.length === 0
                ? notes.slice(0, 60)
                : notes.filter(function(n) {
                    const p = String(n.path || "").toLowerCase();
                    return tokens.every(function(tok) { return p.indexOf(tok) !== -1; });
                  }).slice(0, 60);
              qsList = matched.map(function(n) { return { path: n.path, matchScope: "path" }; });
              qsActiveIdx = 0;
              if (qsStatus) {
                qsStatus.textContent = "${lang === 'zh' ? '路径匹配：' : 'Path matches: '}" + qsList.length + " / " + notes.length;
              }
              renderQsItems(tokens);
            } else {
              const idxItems = await loadFullTextIndex(!!forceRefreshIndex);
              const matched = [];
              for (let i = 0; i < idxItems.length; i++) {
                const it = idxItems[i];
                if (!it || !it.path) continue;
                const pLow = it.path.toLowerCase();
                const bLow = String(it.text || "").toLowerCase();
                if (tokens.length === 0) {
                  matched.push({ path: it.path, snippet: makeSnippet(it.text, []), matchScope: "path", score: 0 });
                  continue;
                }
                const pathAllHit = tokens.every(function(tok) { return pLow.indexOf(tok) !== -1; });
                const bothHit = pathAllHit || tokens.every(function(tok) { return pLow.indexOf(tok) !== -1 || bLow.indexOf(tok) !== -1; });
                if (bothHit) {
                  const snippet = makeSnippet(it.text, tokens);
                  matched.push({
                    path: it.path,
                    snippet: snippet,
                    matchScope: pathAllHit ? "path" : "body",
                    score: pathAllHit ? 2 : 1
                  });
                }
              }
              matched.sort(function(a, b) { return b.score - a.score; });
              qsList = matched.slice(0, 60);
              qsActiveIdx = 0;
              if (qsStatus) {
                qsStatus.textContent = "${lang === 'zh' ? '全文索引匹配：' : 'Full-text matches: '}" + qsList.length + " / " + idxItems.length;
              }
              renderQsItems(tokens);
            }
          } catch (err) {
            if (qsStatus) qsStatus.textContent = "${lang === 'zh' ? '加载失败: ' : 'Load failed: '}" + (err && err.message ? err.message : "");
            if (qsResults) qsResults.innerHTML = '<div class="qs-empty" style="color:var(--danger-fg);">' + escQs(err && err.message ? err.message : "Error") + '</div>';
          }
        }

        window.openQuickSwitch = function(initialMode) {
          if (initialMode === "title" || initialMode === "fulltext") {
            qsMode = initialMode;
          }
          syncQsModeUI();
          qsModal.style.display = "flex";
          if (qsInput) {
            qsInput.focus();
            qsInput.select();
          }
          runQsSearch(false);
        };

        window.closeQuickSwitch = function() {
          qsModal.style.display = "none";
        };

        if (qsMask) qsMask.onclick = window.closeQuickSwitch;
        if (qsCloseBtn) qsCloseBtn.onclick = window.closeQuickSwitch;
        if (qsModeTitle) {
          qsModeTitle.onclick = function() {
            qsMode = "title";
            syncQsModeUI();
            if (qsInput) qsInput.focus();
            runQsSearch(false);
          };
        }
        if (qsModeFull) {
          qsModeFull.onclick = function() {
            qsMode = "fulltext";
            syncQsModeUI();
            if (qsInput) qsInput.focus();
            runQsSearch(false);
          };
        }
        if (qsRefreshBtn) {
          qsRefreshBtn.onclick = function() {
            if (qsInput) qsInput.focus();
            runQsSearch(true);
          };
        }
        if (qsInput) {
          qsInput.oninput = function() {
            clearTimeout(qsSearchTimer);
            const delay = qsMode === "fulltext" ? 120 : 0;
            qsSearchTimer = setTimeout(function() { runQsSearch(false); }, delay);
          };
        }

        document.addEventListener("keydown", function(e) {
          if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === "k" || e.key === "K")) {
            e.preventDefault();
            e.stopPropagation();
            if (qsModal.style.display === "flex") {
              window.closeQuickSwitch();
            } else {
              window.openQuickSwitch();
            }
            return;
          }
          if (qsModal.style.display !== "flex") return;

          if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            window.closeQuickSwitch();
          } else if (e.key === "Tab") {
            e.preventDefault();
            e.stopPropagation();
            qsMode = qsMode === "title" ? "fulltext" : "title";
            syncQsModeUI();
            runQsSearch(false);
          } else if (e.key === "ArrowDown") {
            if (!qsList.length) return;
            e.preventDefault();
            e.stopPropagation();
            qsActiveIdx = (qsActiveIdx + 1) % qsList.length;
            renderQsItems(splitTokens(qsInput ? qsInput.value : ""));
          } else if (e.key === "ArrowUp") {
            if (!qsList.length) return;
            e.preventDefault();
            e.stopPropagation();
            qsActiveIdx = (qsActiveIdx - 1 + qsList.length) % qsList.length;
            renderQsItems(splitTokens(qsInput ? qsInput.value : ""));
          } else if (e.key === "Enter") {
            if (!qsList.length) return;
            const chosen = qsList[qsActiveIdx] || qsList[0];
            if (chosen && chosen.path) {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = "/" + encodeQsPath(chosen.path);
            }
          }
        }, true);
      })();
    <\/script>
`;

const THEME_CONTROLLER_SCRIPT = (lang) => `
    <script>
      (function() {
        const themeBtn = document.getElementById("theme-toggle-btn");
        const mql = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
        const ICON_AUTO = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>';
        const ICON_DARK = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        const ICON_LIGHT = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        const TITLES = {
          auto: "${SUPPORTED_LANG[lang].themeAuto}",
          dark: "${SUPPORTED_LANG[lang].themeDark}",
          light: "${SUPPORTED_LANG[lang].themeLight}"
        };

        window.applyThemeMode = function(mode, persist) {
          const validMode = (mode === "dark" || mode === "light") ? mode : "auto";
          const isDark = validMode === "dark" || (validMode === "auto" && mql && mql.matches);
          const resolved = isDark ? "dark" : "light";
          document.documentElement.dataset.themeMode = validMode;
          document.documentElement.dataset.theme = resolved;
          if (persist !== false) {
            try { localStorage.setItem("scn_theme", validMode); } catch (e) {}
          }
          if (themeBtn) {
            themeBtn.innerHTML = validMode === "dark" ? ICON_DARK : (validMode === "light" ? ICON_LIGHT : ICON_AUTO);
            themeBtn.title = TITLES[validMode] || TITLES.auto;
          }
          if (window.vditorInstance && typeof window.vditorInstance.setTheme === "function") {
            try {
              window.vditorInstance.setTheme(isDark ? "dark" : "classic", isDark ? "dark" : "light");
            } catch (e) {}
          }
        };

        let initMode = "auto";
        try { initMode = localStorage.getItem("scn_theme") || "auto"; } catch (e) {}
        window.applyThemeMode(initMode, false);

        if (themeBtn) {
          themeBtn.onclick = function() {
            const cur = document.documentElement.dataset.themeMode || "auto";
            const next = cur === "auto" ? "dark" : (cur === "dark" ? "light" : "auto");
            window.applyThemeMode(next, true);
          };
        }

        if (mql) {
          const onSystemChange = function() {
            if ((document.documentElement.dataset.themeMode || "auto") === "auto") {
              window.applyThemeMode("auto", false);
            }
          };
          if (typeof mql.addEventListener === "function") mql.addEventListener("change", onSystemChange);
          else if (typeof mql.addListener === "function") mql.addListener(onSystemChange);
        }
      })();
    <\/script>
`;
const Edit = (data) => HTML({ isEdit: true, ...data });
const Share = (data) => HTML({ isEdit: false, ...data });
const NeedPasswd = (data) => HTML({ tips: SUPPORTED_LANG[data.lang].tipEncrypt, showPwPrompt: true, ...data });
const Page404 = (data) => HTML({ tips: SUPPORTED_LANG[data.lang].tip404, ...data });
const TEMPLATES = { Edit, Share, NeedPasswd, Page404, AdminLogin, NeedSharePasswd };
export function returnPage(type, data, status) {
  const defaultStatus = type === "Page404" ? 404 : 200;
  return new Response(TEMPLATES[type](data), {
    status: status !== undefined ? status : defaultStatus,
    headers: { "content-type": "text/html;charset=UTF-8" }
  });
}
