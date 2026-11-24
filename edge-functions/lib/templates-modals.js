import { dayjs } from "./vendor.js";
import { SUPPORTED_LANG, escapeHtml } from "./constants.js";

export const THEME_INIT_SCRIPT = `<script>(function(){try{var m=localStorage.getItem("scn_theme")||"auto";var d=m==="dark"||(m!=="light"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.themeMode=m;document.documentElement.dataset.theme=d?"dark":"light";}catch(e){}})();<\/script>`;

export const SWITCHER = (text, open, className = "") => `
<span class="opt-desc">${text}</span>
<label class="opt-switcher ${className}">
  <input type="checkbox" ${open ? "checked" : ""}>
  <span class="slider round"></span>
</label>
`;
export const FOOTER = ({ lang, isEdit, updateAt, pw, mode, share, isPrivateMode, path, locked }) => `
    <div class="footer">
        ${isEdit ? `
            <div class="opt">
                ${!isPrivateMode ? `<button class="opt-button opt-pw">${pw ? SUPPORTED_LANG[lang].changePW : SUPPORTED_LANG[lang].setPW}</button>` : ""}
                <button id="opt-mode-btn" type="button" class="opt-button ${mode === 'md' ? 'opt-mode-active' : 'opt-mode-inactive'}" title="${mode === 'md' ? 'Markdown 模式已开启 (点击切换纯文本)' : '纯文本模式 (点击开启 Markdown)'}">Markdown</button>
                <button class="opt-button opt-share-trigger">${SUPPORTED_LANG[lang].share}</button>
                ${isPrivateMode ? `
                <button id="opt-img-btn" class="opt-button" title="${SUPPORTED_LANG[lang].imgMgrTitle} (200MB)">${SUPPORTED_LANG[lang].imgMgr}</button>
                <button id="opt-hist-btn" class="opt-button" title="${SUPPORTED_LANG[lang].historyTitle}">${SUPPORTED_LANG[lang].history}</button>
                <input type="file" id="img-upload-input" accept="image/*" multiple style="display:none;" />
                ` : ""}
                <a id="opt-raw-link" href="${path ? ('/raw/' + encodeURI(path)) : '#'}" target="_blank" class="opt-button" style="text-decoration:none; display:inline-flex; align-items:center;" title="${SUPPORTED_LANG[lang].rawDirectLink || 'Raw'}">${SUPPORTED_LANG[lang].rawDirectLink || 'Raw'}</a>
            </div>
            ` : ""}
        <div class="status-row">
            <span id="status-word-count" style="font-size:12px; color:var(--text-secondary); white-space:nowrap; user-select:none;">${SUPPORTED_LANG[lang].wordsCount}: 0 · ${SUPPORTED_LANG[lang].charsCount}: 0 · 0 ${SUPPORTED_LANG[lang].linesCount}</span>
            <div style="display:flex; align-items:center; gap:8px; margin-left:auto;">
                <div class="footer-icon-group" style="display:inline-flex; align-items:center; gap:4px;">
                    ${isEdit ? `<button id="opt-lock-btn" type="button" class="theme-toggle-btn ${locked ? 'opt-locked' : ''}" title="${locked ? (lang === 'zh' ? '笔记已锁定（点击解锁）' : 'Locked (click to unlock)') : (lang === 'zh' ? '锁定笔记（防误触分享）' : 'Lock note')}" aria-label="Toggle lock">${locked ? '<svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor"><path d="M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 6V4a2.5 2.5 0 1 0-5 0v2Z"></path></svg>' : '<svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor"><path d="M5.5 4a2.5 2.5 0 0 1 4.607-1.346.75.75 0 1 0 1.264-.808A4 4 0 0 0 4 4v2h-.25C2.784 6 2 6.784 2 7.75v5.5C2 14.216 2.784 15 3.75 15h8.5a1.75 1.75 0 0 0 1.75-1.75v-5.5A1.75 1.75 0 0 0 12.25 6H5.5Zm6.75 3.5a.25.25 0 0 1 .25.25v5.5a.25.25 0 0 1-.25.25h-8.5a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 1 .25-.25Z"></path></svg>'}</button>` : ""}
                    <button id="theme-toggle-btn" type="button" class="theme-toggle-btn" title="${SUPPORTED_LANG[lang].themeAuto || 'Theme: Auto'}" aria-label="Toggle theme">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
                    </button>
                    <a class="github-link" title="Github" target="_blank" href="https://github.com/kafuneri/edgeone-cloud-notepad" rel="noreferrer">
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="github" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>
                    </a>
                </div>
                ${updateAt ? `<span class="last-modified" style="font-size:12px; color:var(--text-secondary); white-space:nowrap;">${SUPPORTED_LANG[lang].lastModified} ${dayjs.unix(updateAt).fromNow()}</span>` : ""}
            </div>
        </div>
    </div>
`;

export const MODAL = (lang, ext = {}) => `
<div class="modal share-modal" style="display:none; position:fixed; inset:0; z-index:1000;">
    <div class="modal-mask"></div>
    <div class="modal-content" style="max-width: 440px; padding: 24px; box-sizing: border-box; border-radius: 8px;">
        <span class="close-btn">✕</span>
        <h3 style="margin: 0 0 16px 0; font-size: 16px; color: var(--text-primary); font-weight: 600;">${SUPPORTED_LANG[lang].shareTitle}</h3>
        
        <div style="margin-bottom: 14px; text-align: left;">
          <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 5px; font-weight: 500;">${SUPPORTED_LANG[lang].shareSlugLabel}</label>
          <div style="display: flex; gap: 6px; align-items: center;">
            <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
              <span style="font-size: 13px; color: var(--text-muted); background: var(--bg-subtle); padding: 7px 10px; border: 1px solid var(--border-default); border-right: none; border-radius: 6px 0 0 6px; white-space: nowrap;">/share/</span>
              <input type="text" id="share-custom-slug" value="${escapeHtml(ext.shareSlug || "")}" placeholder="自定义短链后缀" style="flex: 1; min-width: 0; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border-default); border-radius: 0 6px 6px 0; font-size: 13px; outline: none; background: var(--bg-surface); color: var(--text-body);" />
            </div>
            <button type="button" id="random-share-slug-btn" style="padding: 7px 10px; border: 1px solid var(--border-default); border-radius: 6px; background: var(--bg-subtle); color: var(--text-body); font-size: 12px; cursor: pointer; flex-shrink: 0;">${lang === "zh" ? "随机" : "Random"}</button>
          </div>
        </div>

        <div style="margin-bottom: 14px; text-align: left;">
          <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 5px; font-weight: 500;">${SUPPORTED_LANG[lang].sharePwLabel}</label>
          <div style="display: flex; gap: 6px; align-items: center;">
            <input type="password" id="share-custom-pw" value="${escapeHtml(ext.sharePwText || "")}" placeholder="${SUPPORTED_LANG[lang].sharePwPh}" style="flex: 1; min-width: 0; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border-default); border-radius: 6px; font-size: 13px; outline: none; background: var(--bg-surface); color: var(--text-body);" />
            <button type="button" id="toggle-share-pw-vis" style="padding: 7px 10px; border: 1px solid var(--border-default); border-radius: 6px; background: var(--bg-subtle); color: var(--text-body); font-size: 12px; cursor: pointer; flex-shrink: 0;">${lang === "zh" ? "显示" : "Show"}</button>
          </div>
          <label style="display: flex; align-items: center; gap: 6px; margin-top: 6px; font-size: 12px; color: var(--text-secondary); cursor: pointer; user-select: none;">
            <input type="checkbox" id="share-no-pw" ${ext.share && !ext.hasSharePw ? "checked" : ""} style="width: 14px; height: 14px; cursor: pointer;" />
            <span>${lang === "zh" ? "无提取码" : "No access code"}</span>
          </label>
        </div>

        <div style="margin-bottom: 14px; text-align: left;">
          <label style="display: block; font-size: 12px; color: var(--text-secondary); margin-bottom: 5px; font-weight: 500;">${SUPPORTED_LANG[lang].shareTtlLabel}</label>
          <select id="share-custom-ttl" style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid var(--border-default); border-radius: 6px; font-size: 13px; background: var(--bg-surface); color: var(--text-body); outline: none; cursor: pointer;">
            <option value="0" ${!ext.shareTtl ? "selected" : ""}>${SUPPORTED_LANG[lang].shareTtlNever}</option>
            <option value="600" ${ext.shareTtl === 600 ? "selected" : ""}>${SUPPORTED_LANG[lang].shareTtl10m}</option>
            <option value="3600" ${ext.shareTtl === 3600 ? "selected" : ""}>${SUPPORTED_LANG[lang].shareTtl1h}</option>
            <option value="86400" ${ext.shareTtl === 86400 ? "selected" : ""}>${SUPPORTED_LANG[lang].shareTtl1d}</option>
            <option value="604800" ${ext.shareTtl === 604800 ? "selected" : ""}>${SUPPORTED_LANG[lang].shareTtl7d}</option>
          </select>
        </div>

        <div style="margin-bottom: 16px; text-align: left;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-primary); cursor: pointer; user-select: none;">
            <input type="checkbox" id="share-burn-after-reading" ${ext.shareBurn ? "checked" : ""} style="width: 15px; height: 15px; cursor: pointer;" />
            <span>${SUPPORTED_LANG[lang].shareBurnLabel}</span>
          </label>
        </div>

        <div id="share-error-msg" style="display: none; margin-bottom: 10px; padding: 7px 10px; font-size: 12px; color: var(--danger-fg); background: var(--danger-bg); border: 1px solid var(--danger-border); border-radius: 6px; text-align: left;"></div>

        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
          <button id="save-share-btn" class="opt-button" style="flex: 1; background: #2da44e; color: #fff; border-color: #2da44e; padding: 7px 14px; font-weight: 600;">${SUPPORTED_LANG[lang].saveShare}</button>
          <button id="disable-share-btn" class="opt-button" style="color: var(--danger-fg); border-color: var(--border-default); padding: 7px 12px;">${SUPPORTED_LANG[lang].disableShare}</button>
        </div>

        <div id="share-link-box" style="display: ${ext.share ? "block" : "none"}; padding-top: 12px; border-top: 1px solid var(--border-muted); text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <label style="font-size: 12px; color: var(--text-secondary); font-weight: 500;">${SUPPORTED_LANG[lang].shareUrlLabel}</label>
            <div id="share-badges-wrap" style="display: flex; gap: 4px;"></div>
          </div>
          <div style="display: flex; gap: 6px;">
            <input type="text" id="share-final-url" readonly value="" style="flex: 1; padding: 6px 10px; font-size: 12px; background: var(--bg-subtle); color: var(--text-body); border: 1px solid var(--border-default); border-radius: 6px; outline: none;" />
            <button class="opt-button" id="copy-share-btn" style="white-space: nowrap;">${SUPPORTED_LANG[lang].copy}</button>
          </div>
        </div>

        <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-muted); text-align: left;">
          <label style="display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 13px; color: var(--text-primary); cursor: pointer; user-select: none;">
            <span>${lang === "zh" ? "允许 Raw 无密码公开只读 (/raw/...)" : "Public Read-Only Raw Access (/raw/...)"}</span>
            <input type="checkbox" id="share-raw-public" ${ext.rawPublic ? "checked" : ""} style="width: 15px; height: 15px; cursor: pointer;" />
          </label>
          <div id="share-raw-link-box" style="display: ${ext.rawPublic ? "block" : "none"}; margin-top: 8px;">
            <div style="display: flex; gap: 6px;">
              <input type="text" id="share-raw-final-url" readonly value="" style="flex: 1; padding: 6px 10px; font-size: 12px; background: var(--bg-subtle); color: var(--text-body); border: 1px solid var(--border-default); border-radius: 6px; outline: none;" />
              <button class="opt-button" id="copy-raw-btn" style="white-space: nowrap;">${SUPPORTED_LANG[lang].copy}</button>
            </div>
          </div>
        </div>
    </div>
</div>
`;
export const IMAGE_MODAL = (lang) => `
<div class="modal image-modal" id="image-mgr-modal" style="display:none; position:fixed; inset:0; z-index:1000; align-items:center; justify-content:center;">
    <div class="modal-mask" id="image-mgr-mask" style="position:fixed; inset:0; background:var(--mask-bg); backdrop-filter:blur(2px);"></div>
    <div class="modal-content" style="position:relative; z-index:1001; max-width:680px; width:92vw; max-height:85vh; padding:20px 24px; box-sizing:border-box; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; background:var(--bg-surface); color:var(--text-body); border:1px solid var(--border-default); box-shadow:var(--shadow-card);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-muted); padding-bottom:12px; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="margin:0; font-size:16px; color:var(--text-primary); font-weight:600;">${SUPPORTED_LANG[lang].imgMgrTitle || "图片管理"}</h3>
                <span id="img-mgr-quota-badge" style="font-size:11px; padding:2px 8px; border-radius:10px; background:var(--accent-bg); color:var(--accent-fg); border:1px solid var(--border-default);">0.00MB / 200MB</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
                <button id="img-mgr-upload-btn" class="opt-button" style="background:#2da44e; color:#fff; border-color:#2da44e; padding:4px 12px; font-size:12px; font-weight:500; cursor:pointer;">${SUPPORTED_LANG[lang].uploadNewImg || "+ 上传图片"}</button>
                <span class="close-btn" id="image-mgr-close" style="cursor:pointer; font-size:18px; color:var(--text-secondary); padding:2px 6px;">✕</span>
            </div>
        </div>
        <div id="img-mgr-progress-wrap" style="height:3px; background:var(--border-muted); border-radius:2px; margin-bottom:10px; overflow:hidden; display:none;">
            <div id="img-mgr-progress-bar" style="height:100%; width:0%; background:#2da44e; transition:width 0.3s ease;"></div>
        </div>
        <div id="img-mgr-grid" style="flex:1; overflow-y:auto; display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr)); gap:12px; padding:4px 2px; min-height:180px; max-height:55vh;">
            <!-- Rendered by JS -->
        </div>
        <div id="img-mgr-empty" style="display:none; flex-direction:column; align-items:center; justify-content:center; padding:50px 0; color:var(--text-muted); font-size:13px;">
            <div style="font-size:14px; margin-bottom:8px; color:var(--text-muted);">(暂无图片)</div>
            <div>${SUPPORTED_LANG[lang].noImages || "暂无上传的图片"}</div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">可在编辑区直接粘贴截屏 (Ctrl+V) 或点击右上角上传</div>
        </div>
    </div>
</div>
`;
export const HISTORY_MODAL = (lang) => `
<div class="modal history-modal" id="history-mgr-modal" style="display:none; position:fixed; inset:0; z-index:1000; align-items:center; justify-content:center;">
    <div class="modal-mask" id="history-mgr-mask" style="position:fixed; inset:0; background:var(--mask-bg); backdrop-filter:blur(2px);"></div>
    <div class="modal-content" style="position:relative; z-index:1001; max-width:720px; width:92vw; max-height:85vh; padding:20px 24px; box-sizing:border-box; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; background:var(--bg-surface); color:var(--text-body); border:1px solid var(--border-default); box-shadow:var(--shadow-card);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-muted); padding-bottom:12px; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="margin:0; font-size:16px; color:var(--text-primary); font-weight:600;">${SUPPORTED_LANG[lang].historyTitle || "历史版本快照"}</h3>
                <span id="history-mgr-badge" style="font-size:11px; padding:2px 8px; border-radius:10px; background:var(--accent-bg); color:var(--accent-fg); border:1px solid var(--border-default);">${SUPPORTED_LANG[lang].historyLimit || "滚动保留 5 个版本"}</span>
            </div>
            <span class="close-btn" id="history-mgr-close" style="cursor:pointer; font-size:18px; color:var(--text-secondary); padding:2px 6px;">✕</span>
        </div>
        <div id="history-mgr-body" style="flex:1; display:flex; gap:14px; min-height:260px; max-height:55vh; overflow:hidden;">
            <div id="history-items-list" style="width:230px; border-right:1px solid var(--border-muted); padding-right:10px; overflow-y:auto; display:flex; flex-direction:column; gap:6px;">
            </div>
            <div id="history-preview-panel" style="flex:1; display:flex; flex-direction:column; overflow:hidden;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span id="history-preview-title" style="font-size:12px; color:var(--text-secondary); font-weight:500;">选择版本查看内容</span>
                    <button id="history-apply-btn" class="opt-button" style="display:none; background:#2da44e; color:#fff; border-color:#2da44e; padding:3px 12px; font-size:12px; font-weight:500; cursor:pointer;">${SUPPORTED_LANG[lang].restoreToThis || "恢复到此版本"}</button>
                </div>
                <textarea id="history-preview-box" readonly style="flex:1; width:100%; box-sizing:border-box; border:1px solid var(--border-default); border-radius:6px; padding:10px; font-family:monospace; font-size:12px; background:var(--bg-subtle); resize:none; outline:none; white-space:pre-wrap; color:var(--text-body);"></textarea>
            </div>
        </div>
        <div id="history-mgr-empty" style="display:none; flex-direction:column; align-items:center; justify-content:center; padding:45px 0; color:var(--text-muted); font-size:13px;">
            <div style="font-size:14px; margin-bottom:6px; color:var(--text-secondary);">${SUPPORTED_LANG[lang].historyEmpty || "当前笔记暂无历史快照"}</div>
            <div style="font-size:12px; color:var(--text-muted);">保存内容变动后将自动记录（间隔至少 1 分钟）</div>
        </div>
    </div>
</div>
`;
export const SHARE_MGR_MODAL = (lang) => `
<div class="modal share-mgr-modal" id="share-mgr-modal" style="display:none; position:fixed; inset:0; z-index:1000; align-items:center; justify-content:center;">
    <div class="modal-mask" id="share-mgr-mask" style="position:fixed; inset:0; background:var(--mask-bg); backdrop-filter:blur(2px);"></div>
    <div class="modal-content" style="position:relative; z-index:1001; max-width:760px; width:92vw; max-height:85vh; padding:20px 24px; box-sizing:border-box; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; background:var(--bg-surface); color:var(--text-body); border:1px solid var(--border-default); box-shadow:var(--shadow-card);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-muted); padding-bottom:12px; margin-bottom:12px; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px; min-width:0;">
                <h3 style="margin:0; font-size:16px; color:var(--text-primary); font-weight:600; white-space:nowrap;">${lang === "zh" ? "分享与Raw管理" : "Share & Raw Manager"}</h3>
                <span id="share-mgr-count-badge" style="font-size:11px; padding:2px 8px; border-radius:10px; background:var(--accent-bg); color:var(--accent-fg); border:1px solid var(--border-default); white-space:nowrap;">0</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
                <button id="share-mgr-refresh-btn" type="button" class="opt-button sm-btn" style="padding:4px 10px; font-size:12px; cursor:pointer;">${lang === "zh" ? "刷新状态" : "Refresh"}</button>
                <span class="close-btn" id="share-mgr-close" style="position:static; width:auto; height:auto; line-height:1; cursor:pointer; font-size:18px; color:var(--text-secondary); padding:2px 6px;">✕</span>
            </div>
        </div>
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px; margin-bottom:12px;">
            <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
                <button id="share-mgr-tab-shared" type="button" class="opt-button sm-tab active" style="padding:4px 10px; font-size:12px; cursor:pointer;">${lang === "zh" ? "已分享" : "Shared"}</button>
                <button id="share-mgr-tab-raw" type="button" class="opt-button sm-tab" style="padding:4px 10px; font-size:12px; cursor:pointer;">${lang === "zh" ? "Raw公开" : "Raw Public"}</button>
                <button id="share-mgr-tab-all" type="button" class="opt-button sm-tab" style="padding:4px 10px; font-size:12px; cursor:pointer;">${lang === "zh" ? "全部笔记" : "All Notes"}</button>
                <button id="share-mgr-clean-expired" type="button" class="opt-button sm-clean-btn" style="display:none; padding:4px 10px; font-size:12px; cursor:pointer;">${lang === "zh" ? "清理全部过期 (0)" : "Clean Expired (0)"}</button>
            </div>
            <input type="text" id="share-mgr-search" placeholder="${lang === "zh" ? "搜索笔记路径或短链..." : "Search note path or slug..."}" style="flex:1; min-width:160px; max-width:240px; padding:5px 10px; font-size:12px; border:1px solid var(--border-default); background:var(--bg-surface); color:var(--text-body); border-radius:6px; outline:none; box-sizing:border-box;" />
        </div>
        <div id="share-mgr-list" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:8px; min-height:200px; max-height:58vh; padding-right:2px;">
        </div>
    </div>
</div>
`;
export const QUICK_SWITCH_MODAL = (lang) => `
<div class="modal quick-switch-modal" id="quick-switch-modal" style="display:none; position:fixed; inset:0; z-index:1010; align-items:flex-start; justify-content:center; padding-top:10vh;">
    <div class="modal-mask" id="quick-switch-mask" style="position:fixed; inset:0; background:var(--mask-bg); backdrop-filter:blur(2px);"></div>
    <div class="modal-content quick-switch-content">
        <div class="qs-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; color:var(--text-muted);">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="qs-input" class="qs-input" autocomplete="off" spellcheck="false" placeholder="${SUPPORTED_LANG[lang].quickSwitchPh}" aria-label="${SUPPORTED_LANG[lang].quickSwitchTitle}" />
            <div class="qs-tabs">
                <button type="button" id="qs-mode-title" class="qs-mode-btn active">${SUPPORTED_LANG[lang].searchTitleOnly}</button>
                <button type="button" id="qs-mode-fulltext" class="qs-mode-btn">${SUPPORTED_LANG[lang].searchFullText}</button>
            </div>
            <button type="button" id="qs-refresh-btn" class="qs-icon-btn" style="display:none;" title="${SUPPORTED_LANG[lang].searchRefresh}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            </button>
            <span id="qs-close-btn" class="close-btn qs-close-btn">✕</span>
        </div>
        <div id="qs-status" class="qs-status"></div>
        <div id="qs-results" class="qs-results"></div>
        <div class="qs-footer">
            <span>↑↓ ${lang === "zh" ? "选择" : "Select"}</span>
            <span>Enter ${lang === "zh" ? "打开" : "Open"}</span>
            <span>Tab ${lang === "zh" ? "切换路径/全文" : "Toggle Path/Full-Text"}</span>
            <span>Esc ${lang === "zh" ? "关闭" : "Close"}</span>
        </div>
    </div>
</div>
`;
export const LIGHTBOX = () => `
<div id="img-lightbox" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:99999; align-items:center; justify-content:center; cursor:zoom-out; backdrop-filter:blur(4px); transition:opacity 0.2s ease;">
    <img id="lightbox-img" src="" style="max-width:92vw; max-height:92vh; object-fit:contain; border-radius:6px; box-shadow:0 8px 32px rgba(0,0,0,0.6);" />
    <span style="position:fixed; top:20px; right:25px; color:#fff; font-size:26px; cursor:pointer; opacity:0.8; user-select:none;">✕</span>
</div>
`;
export const TOC_PANEL = (lang) => `
<!-- Floating TOC Toggle Button -->
<button id="toc-toggle-btn" class="toc-toggle-btn" style="display:none;" title="${SUPPORTED_LANG[lang].tocTitle || '大纲目录'}">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
    <span>${SUPPORTED_LANG[lang].tocButton || '大纲'}</span>
    <span id="toc-badge" class="toc-badge">0</span>
</button>

<!-- Floating TOC Panel -->
<div id="toc-panel" class="toc-panel" style="display:none;">
    <div class="toc-header">
        <div style="display:flex; align-items:center; gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span style="font-weight:600; font-size:13px; color:var(--text-primary);">${SUPPORTED_LANG[lang].tocTitle || '大纲目录'}</span>
        </div>
        <span id="toc-close-btn" class="close-btn" style="cursor:pointer; font-size:16px; color:var(--text-secondary); padding:2px 4px; line-height:1;">✕</span>
    </div>
    <div id="toc-list" class="toc-list">
    </div>
</div>
`;

export const AdminLogin = ({ lang = "zh", title = "私有云笔记" }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — 登录</title>
  ${THEME_INIT_SCRIPT}
  <style>
    :root {
      color-scheme: light;
      --login-bg: #f4f6f8;
      --login-card: #ffffff;
      --login-title: #1f2328;
      --login-desc: #656d76;
      --login-border: #d0d7de;
      --login-input-bg: #ffffff;
      --login-input-fg: #24292f;
      --login-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      --login-error: #cf222e;
    }
    html[data-theme="dark"] {
      color-scheme: dark;
      --login-bg: #0d1117;
      --login-card: #161b22;
      --login-title: #e6edf3;
      --login-desc: #8b949e;
      --login-border: #30363d;
      --login-input-bg: #0d1117;
      --login-input-fg: #e6edf3;
      --login-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
      --login-error: #f85149;
    }
    body {
      background: var(--login-bg);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .login-card {
      background: var(--login-card);
      border: 1px solid var(--login-border);
      padding: 36px 32px;
      border-radius: 12px;
      box-shadow: var(--login-shadow);
      width: 100%;
      max-width: 360px;
      text-align: center;
      box-sizing: border-box;
    }
    .brand-icon { font-size: 38px; margin-bottom: 12px; }
    h2 { margin: 0 0 8px 0; font-size: 20px; color: var(--login-title); font-weight: 600; }
    p.desc { margin: 0 0 24px 0; color: var(--login-desc); font-size: 13px; }
    input[type="password"] {
      width: 100%;
      box-sizing: border-box;
      padding: 11px 14px;
      border: 1px solid var(--login-border);
      background: var(--login-input-bg);
      color: var(--login-input-fg);
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      margin-bottom: 16px;
      transition: border-color 0.2s;
    }
    input[type="password"]:focus { border-color: #2f81f7; box-shadow: 0 0 0 3px rgba(47, 129, 247, 0.18); }
    button.submit-btn {
      width: 100%;
      padding: 11px;
      background: #1f883d;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    button.submit-btn:hover { background: #1a7f37; }
    .error-msg { color: var(--login-error); font-size: 13px; margin-top: 12px; display: none; }
  </style>
</head>
<body>
  <div class="login-card">
    <div class="brand-icon" style="display:flex; justify-content:center; align-items:center; margin-bottom:12px;">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1f883d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
    </div>
    <h2>私有云笔记</h2>
    <p class="desc">请输入管理员密码进入工作台</p>
    <form id="login-form">
      <input type="password" id="passwd" placeholder="管理员密码" autofocus required />
      <button type="submit" class="submit-btn" id="btn-text">解锁进入</button>
      <div id="error" class="error-msg"></div>
    </form>
  </div>
  <script>
    document.getElementById("login-form").onsubmit = async function(e) {
      e.preventDefault();
      const pw = document.getElementById("passwd").value;
      const errEl = document.getElementById("error");
      const btn = document.getElementById("btn-text");
      errEl.style.display = "none";
      btn.innerText = "校验中...";
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: pw })
        });
        const data = await res.json();
        if (data.err === 0) {
          window.location.reload();
        } else {
          errEl.innerText = data.msg || "密码错误";
          errEl.style.display = "block";
          btn.innerText = "解锁进入";
        }
      } catch (err) {
        errEl.innerText = "网络异常，请重试";
        errEl.style.display = "block";
        btn.innerText = "解锁进入";
      }
    };
  <\/script>
</body>
</html>
`;

export const NeedSharePasswd = ({ lang = "zh", title = "分享笔记", slug = "" }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} — 访问密码</title>
  ${THEME_INIT_SCRIPT}
  <style>
    :root {
      color-scheme: light;
      --login-bg: #f4f6f8;
      --login-card: #ffffff;
      --login-title: #1f2328;
      --login-desc: #656d76;
      --login-border: #d0d7de;
      --login-input-bg: #ffffff;
      --login-input-fg: #24292f;
      --login-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      --login-error: #cf222e;
    }
    html[data-theme="dark"] {
      color-scheme: dark;
      --login-bg: #0d1117;
      --login-card: #161b22;
      --login-title: #e6edf3;
      --login-desc: #8b949e;
      --login-border: #30363d;
      --login-input-bg: #0d1117;
      --login-input-fg: #e6edf3;
      --login-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
      --login-error: #f85149;
    }
    body {
      background: var(--login-bg);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .login-card {
      background: var(--login-card);
      border: 1px solid var(--login-border);
      padding: 36px 32px;
      border-radius: 12px;
      box-shadow: var(--login-shadow);
      width: 100%;
      max-width: 360px;
      text-align: center;
      box-sizing: border-box;
    }
    .brand-icon { font-size: 38px; margin-bottom: 12px; }
    h2 { margin: 0 0 8px 0; font-size: 20px; color: var(--login-title); font-weight: 600; }
    p.desc { margin: 0 0 24px 0; color: var(--login-desc); font-size: 13px; }
    input[type="password"] {
      width: 100%;
      box-sizing: border-box;
      padding: 11px 14px;
      border: 1px solid var(--login-border);
      background: var(--login-input-bg);
      color: var(--login-input-fg);
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      margin-bottom: 16px;
      transition: border-color 0.2s;
    }
    input[type="password"]:focus { border-color: #2f81f7; box-shadow: 0 0 0 3px rgba(47, 129, 247, 0.18); }
    button.submit-btn {
      width: 100%;
      padding: 11px;
      background: #0969da;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    button.submit-btn:hover { background: #0860ca; }
    .error-msg { color: var(--login-error); font-size: 13px; margin-top: 12px; display: none; }
  </style>
</head>
<body>
  <div class="login-card">
    <div class="brand-icon" style="display:flex; justify-content:center; align-items:center; margin-bottom:12px;">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0969da" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-2-2l2 2"></path><circle cx="7.5" cy="16.5" r="5.5"></circle><path d="m11.5 12.5 7.5-7.5M16 8l3 3M19 5l2 2"></path></svg>
    </div>
    <h2>受保护的分享笔记</h2>
    <p class="desc">请输入提取码访问此笔记</p>
    <form id="share-pw-form">
      <input type="password" id="passwd" placeholder="访问提取码" autofocus required />
      <button type="submit" class="submit-btn" id="btn-text">验证进入</button>
      <div id="error" class="error-msg"></div>
    </form>
  </div>
  <script>
    document.getElementById("share-pw-form").onsubmit = async function(e) {
      e.preventDefault();
      const pw = document.getElementById("passwd").value;
      const errEl = document.getElementById("error");
      const btn = document.getElementById("btn-text");
      errEl.style.display = "none";
      btn.innerText = "校验中...";
      try {
        const res = await fetch("/share/${encodeURIComponent(slug)}/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passwd: pw })
        });
        const data = await res.json();
        if (data.err === 0) {
          window.location.reload();
        } else {
          errEl.innerText = data.msg || "提取码错误";
          errEl.style.display = "block";
          btn.innerText = "验证进入";
        }
      } catch (err) {
        errEl.innerText = "网络异常，请重试";
        errEl.style.display = "block";
        btn.innerText = "验证进入";
      }
    };
  <\/script>
</body>
</html>
`;
