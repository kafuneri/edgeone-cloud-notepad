export const CDN_PREFIX = "//gcore.jsdelivr.net/gh/s0urcelab/serverless-cloud-notepad@master/static";
export const SUPPORTED_LANG = {
    "en": {
      setPW: "Set Password",
      changePW: "Change Password",
      share: "Share",
      uploadImg: "Image",
      imgMgr: "Images",
      imgMgrTitle: "Image Manager",
      uploadNewImg: "+ Upload Image",
      insertImg: "Insert",
      deleteImgConfirm: "Permanently delete image? This will reclaim storage quota.",
      copiedImgMd: "Copied Markdown link!",
      insertedImg: "Image inserted into note!",
      noImages: "No images uploaded yet",
      uploading: "Compressing and uploading image...",
      uploadSuccess: "Image uploaded successfully!",
      uploadFail: "Image upload failed",
      imgQuota: "Images: 200MB max",
      lastModified: "Saved",
      copy: "Copy",
      emptyPH: "There are many like it, but this one is mine...",
      tipEncrypt: "This Note has been encrypted, please enter password!",
      tip404: "404, Nothing here",
      edit: "Edit",
      preview: "Preview",
      delete: "Delete",
      confirmDel: "Permanently delete this note? This action cannot be undone!",
      newNote: "New",
      searchNotes: "Search notes...",
      shareTitle: "Share Note",
      shareSlugLabel: "Custom Share Slug",
      sharePwLabel: "Access Code (Optional)",
      sharePwPh: "Leave empty for public read-only",
      saveShare: "Save & Generate Link",
      disableShare: "Disable Share",
      shareUrlLabel: "Share Link",
      privateVault: "Private Vault",
      publicVault: "Public Mode",
      logout: "Logout",
      noNotes: "No notes yet",
      history: "History",
      historyTitle: "History Snapshots",
      historyLimit: "Max 5 snapshots retained",
      historyEmpty: "No snapshots yet. Changes will be recorded automatically.",
      restoreToThis: "Restore to this version",
      restoreConfirm: "Restore note to this snapshot? Current editor content will be overwritten.",
      restoredMsg: "Restored to selected version and saved!",
      draftDetected: "Unsaved local draft detected",
      restoreDraft: "Restore",
      discardDraft: "Discard",
      wordsCount: "Words",
      charsCount: "Chars",
      linesCount: "lines",
      shareTtlLabel: "Expiration Time",
      shareTtlNever: "Permanent",
      shareTtl10m: "10 Minutes",
      shareTtl1h: "1 Hour",
      shareTtl1d: "1 Day",
      shareTtl7d: "7 Days",
      shareBurnLabel: "Burn After Reading (Destroyed after 1st view)",
      burnAlertTip: "Notice: This note was shared with burn-after-reading. It has been destroyed on the server and cannot be viewed again once you close or refresh this page.",
      burnBadge: "Burn After Reading",
      rawDirectLink: "Raw",
      tocTitle: "Table of Contents",
      tocButton: "TOC",
      exportZip: "Export Vault (.zip)",
      exportingList: "Fetching notes...",
      loadingZipLib: "Loading ZIP engine...",
      exportingProgress: "Packaging",
      generatingZip: "Compressing archive...",
      exportSuccess: "Backup downloaded!",
      exportFail: "Export failed",
      noNotesToExport: "No notes found in vault to export",
      savedNow: "Saved",
      savingNow: "Saving...",
      saveFailed: "Save failed",
      quickSwitchTitle: "Quick Switch & Search",
      quickSwitchPh: "Search note path (Ctrl+K)...",
      quickSwitchFullPh: "Full-text search note titles and content...",
      searchTitleOnly: "Path",
      searchFullText: "Full Text",
      searchIndexing: "Loading search index...",
      searchNoMatch: "No matching notes found",
      searchRefresh: "Rebuild Index",
      themeLight: "Theme: Light (click for Auto)",
      themeDark: "Theme: Dark (click for Light)",
      themeAuto: "Theme: System (click for Dark)"
    },
    "zh": {
      setPW: "设置密码",
      changePW: "修改密码",
      share: "分享",
      uploadImg: "图片",
      imgMgr: "图片",
      imgMgrTitle: "图片管理",
      uploadNewImg: "+ 上传图片",
      insertImg: "插入",
      deleteImgConfirm: "确定永久删除此图片？将立即释放存储配额。",
      copiedImgMd: "已复制 Markdown 链接！",
      insertedImg: "已插入图片到笔记！",
      noImages: "暂无图片，可在编辑区粘贴截图或点击右上角上传",
      uploading: "正在压缩并上传图片...",
      uploadSuccess: "图片上传成功！",
      uploadFail: "图片上传失败",
      imgQuota: "图片配额: 200MB",
      lastModified: "Saved",
      copy: "复制",
      emptyPH: "看来你是第一个到这儿的人，写点什么吧...",
      tipEncrypt: "这是一篇加密笔记，你必须先输入密码！",
      tip404: "404，你要找的东西并不存在",
      edit: "编辑",
      preview: "预览",
      delete: "删除",
      confirmDel: "确定要永久删除此笔记吗？此操作无法撤销！",
      newNote: "新建",
      searchNotes: "搜索笔记...",
      shareTitle: "分享笔记",
      shareSlugLabel: "自定义短链后缀",
      sharePwLabel: "访问提取码",
      sharePwPh: "留空即公开只读，填写即需要密码",
      saveShare: "保存并生成链接",
      disableShare: "关闭分享",
      shareUrlLabel: "分享链接",
      shareTtlLabel: "有效时长",
      shareTtlNever: "永久有效",
      shareTtl10m: "10 分钟",
      shareTtl1h: "1 小时",
      shareTtl1d: "1 天",
      shareTtl7d: "7 天",
      shareBurnLabel: "阅后即焚 (首位访客读取后立即永久销毁)",
      burnAlertTip: "注意：此笔记为阅后即焚分享，已在服务器端永久销毁，刷新或关闭此页面后将无法再次访问。",
      burnBadge: "阅后即焚",
      rawDirectLink: "Raw",
      tocTitle: "大纲目录",
      tocButton: "大纲",
      exportZip: "导出全库备份 (.zip)",
      exportingList: "正在获取笔记列表...",
      loadingZipLib: "正在加载压缩组件...",
      exportingProgress: "打包中",
      generatingZip: "正在生成压缩包...",
      exportSuccess: "导出成功！",
      exportFail: "导出失败",
      noNotesToExport: "当前库中暂无笔记可供导出",
      privateVault: "私有笔记库",
      publicVault: "公共便签",
      logout: "退出登录",
      noNotes: "暂无笔记",
      history: "历史版本",
      historyTitle: "历史版本快照",
      historyLimit: "滚动保留 5 个版本",
      historyEmpty: "当前笔记暂无历史快照，每次变动自动记录",
      restoreToThis: "恢复到此版本",
      restoreConfirm: "确定要将笔记恢复到此历史版本吗？当前编辑区内容将被替换。",
      restoredMsg: "已恢复到所选历史版本并保存！",
      draftDetected: "检测到本地未保存草稿",
      restoreDraft: "恢复草稿",
      discardDraft: "放弃",
      wordsCount: "字数",
      charsCount: "字符",
      linesCount: "行",
      savedNow: "已保存",
      savingNow: "正在保存...",
      saveFailed: "保存失败",
      quickSwitchTitle: "快速切换与全文搜索",
      quickSwitchPh: "输入笔记名称/路径快速跳转 (Ctrl+K)...",
      quickSwitchFullPh: "输入关键词搜索笔记标题与正文内容...",
      searchTitleOnly: "仅路径",
      searchFullText: "全文搜索",
      searchIndexing: "正在加载正文索引...",
      searchNoMatch: "未找到匹配的笔记",
      searchRefresh: "重建索引",
      themeLight: "主题：浅色（点击切为跟随系统）",
      themeDark: "主题：深色（点击切为浅色）",
      themeAuto: "主题：跟随系统（点击切为深色）"
    }
  };
export const escapeHtml = (str) => String(str ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");
export const genRandomStr = (n) => {
    const charset = "2345679abcdefghjkmnpqrstwxyz";
    return Array(n).join().split(",").map(() => charset.charAt(Math.floor(Math.random() * charset.length))).join("");
  };
export function returnJSON(code, data, headers = {}) {
    const successTempl = {
      err: 0,
      msg: "ok",
      ...data && { data }
    };
    const errTempl = {
      err: code,
      msg: typeof data === "string" ? data : JSON.stringify(data)
    };
    const ret = code ? errTempl : successTempl;
    return new Response(JSON.stringify(ret), {
      status: (code >= 400 && code < 600) ? code : 200,
      headers: {
        "content-type": "application/json;charset=UTF-8",
        ...headers
      }
    });
  }
export function isHttpsRequest(request) {
    try {
      const origin = (request.headers.get("origin") || "").toLowerCase();
      if (origin.startsWith("http://")) return false;
      const host = (request.headers.get("host") || "").toLowerCase();
      if (host === "localhost" || host.startsWith("localhost:") || host === "127.0.0.1" || host.startsWith("127.0.0.1:")) {
        return false;
      }
      const proto = request.headers.get("x-forwarded-proto") || "";
      if (proto.split(",")[0].trim().toLowerCase() === "https") return true;
      return new URL(request.url).protocol === "https:";
    } catch (e) {
      return false;
    }
  }

export function getClientIp(request) {
  return request.headers.get("eo-client-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown_ip";
}

export function getI18n(request) {
    const DEFAULT_LANG = "en";
    const al = request.headers.get("Accept-Language") || DEFAULT_LANG;
    const acceptList = al.split(",").map((lang) => lang.split(";")[0].trim());
    return acceptList.find((lang) => Object.keys(SUPPORTED_LANG).includes(lang)) || DEFAULT_LANG;
  }

export function safeDecode(s) {
    try {
      return decodeURIComponent(s).replace(/^\/+|\/+$/g, "");
    } catch (e) {
      const err = new Error("Bad Request");
      err.status = 400;
      throw err;
    }
  }

