import { returnJSON } from "./constants.js";

import { getStore } from "@edgeone/pages-blob";
let _storeInstance = null;
function getNotepadStore() {
  if (!_storeInstance) {
    _storeInstance = getStore("notepad");
  }
  return _storeInstance;
}
const store = new Proxy({}, {
  get(target, prop) {
    const s = getNotepadStore();
    const val = s[prop];
    return typeof val === "function" ? val.bind(s) : val;
  }
});

export { store };

export async function MD5(str) {
    const msgUint8 = new TextEncoder().encode(str);
    // 将 MD5 替换为标准的 SHA-256 加密
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

export async function saltPw(password, salt = "") {
  const hashPw = await MD5(password);
  return await MD5(`${hashPw}+${salt}`);
}

export async function queryNote(key) {
    try {
      const data = await store.get(`notes/${key}`, { type: "json", consistency: "strong" });
      if (data && typeof data === "object") {
        return {
          value: data.value || "",
          metadata: data.metadata || {}
        };
      }
    } catch (e) {
      console.error("queryNote error:", e);
    }
    return {
      value: "",
      metadata: {}
    };
  }

  // KV helpers with fallback to Blob

  export async function kvGet(cfg, key, type = "text") {
    const KV = cfg?.kv;
    if (KV) {
      try {
        const res = await KV.get(key, type);
        if (res !== null && res !== undefined) {
          if (type === "json" && typeof res === "string") {
            try { return JSON.parse(res); } catch (e) { return res; }
          }
          return res;
        }
      } catch (e) {
        console.warn("KV.get failed, falling back to Blob:", e.message);
      }
    }
    try {
      return await store.get(key, { type, consistency: "strong" });
    } catch (e) {
      return null;
    }
  }

  export async function kvPut(cfg, key, value, options = {}) {
    const KV = cfg?.kv;
    if (KV) {
      try {
        const valStr = typeof value === "object" ? JSON.stringify(value) : String(value);
        const kvOpts = {};
        if (options && options.expirationTtl && typeof options.expirationTtl === "number" && options.expirationTtl >= 60) {
          kvOpts.expirationTtl = options.expirationTtl;
        }
        return await KV.put(key, valStr, kvOpts);
      } catch (e) {
        console.warn("KV.put failed, falling back to Blob:", e.message);
      }
    }
    if (typeof value === "object") {
      return await store.setJSON(key, value);
    }
    return await store.set(key, value);
  }

  export async function kvDelete(cfg, key) {
    const KV = cfg?.kv;
    if (KV) {
      try {
        await KV.delete(key);
      } catch (e) {
        console.warn("KV.delete failed:", e.message);
      }
    }
    try {
      await store.delete(key);
    } catch (e) {}
  }


export function formatNoteIndexItem(path, metadata) {
    return {
      path,
      updateAt: metadata?.updateAt || 0,
      mode: metadata?.mode || "plain",
      share: !!metadata?.share,
      shareSlug: metadata?.shareSlug || "",
      hasSharePw: !!metadata?.hasSharePw,
      sharePwText: metadata?.sharePwText || "",
      shareTtl: metadata?.shareTtl || 0,
      shareExpireAt: metadata?.shareExpireAt || 0,
      shareBurn: !!metadata?.shareBurn,
      rawPublic: !!metadata?.rawPublic,
      locked: !!metadata?.locked
    };
  }

  export async function rebuildNotesIndex() {
    const { blobs } = await store.list({ prefix: "notes/", consistency: "strong" });
    const notes = await Promise.all((blobs || []).map(async (blob) => {
      const notePath = blob.key.slice("notes/".length);
      let metadata = {};
      try {
        const data = await store.get(blob.key, { type: "json", consistency: "strong" });
        if (data && data.metadata) metadata = data.metadata;
      } catch (err) {}
      return formatNoteIndexItem(notePath, metadata);
    }));
    notes.sort((a, b) => (b.updateAt || 0) - (a.updateAt || 0));
    await store.setJSON("stat/notes_index", notes);
    return notes;
  }

  export async function getNotesIndex(forceRefresh = false) {
    if (!forceRefresh) {
      try {
        const cached = await store.get("stat/notes_index", { type: "json", consistency: "strong" });
        if (Array.isArray(cached)) return cached;
      } catch (e) {
        console.warn("getNotesIndex read failed, rebuilding:", e.message);
      }
    }
    return await rebuildNotesIndex();
  }

  export async function upsertNoteIndex(path, metadata) {
    try {
      const list = await store.get("stat/notes_index", { type: "json", consistency: "strong" });
      if (!Array.isArray(list)) {
        await rebuildNotesIndex();
        return;
      }
      const next = list.filter((item) => item && item.path !== path);
      next.unshift(formatNoteIndexItem(path, metadata));
      next.sort((a, b) => (b.updateAt || 0) - (a.updateAt || 0));
      await store.setJSON("stat/notes_index", next);
    } catch (e) {
      console.warn("upsertNoteIndex error:", e);
    }
  }

  export async function removeNoteIndex(path) {
    try {
      const list = await store.get("stat/notes_index", { type: "json", consistency: "strong" });
      if (!Array.isArray(list)) return;
      const next = list.filter((item) => item && item.path !== path);
      await store.setJSON("stat/notes_index", next);
    } catch (e) {
      console.warn("removeNoteIndex error:", e);
    }
  }

  const SEARCH_INDEX_KEY = "stat/search_index";

  function normalizeSearchText(value) {
    return String(value || "")
      .replace(/\r\n?/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
      .slice(0, 30000);
  }

  export async function rebuildSearchIndex() {
    const { blobs } = await store.list({ prefix: "notes/", consistency: "strong" });
    const entries = await Promise.all((blobs || []).map(async (blob) => {
      const notePath = blob.key.slice("notes/".length);
      let text = "";
      let updateAt = 0;
      try {
        const data = await store.get(blob.key, { type: "json", consistency: "strong" });
        if (data && typeof data === "object") {
          text = normalizeSearchText(data.value || "");
          updateAt = data.metadata?.updateAt || 0;
        }
      } catch (err) {}
      return { path: notePath, text, updateAt };
    }));
    entries.sort((a, b) => (b.updateAt || 0) - (a.updateAt || 0));
    await store.setJSON(SEARCH_INDEX_KEY, entries);
    return entries;
  }

  export async function getSearchIndex(forceRefresh = false) {
    if (!forceRefresh) {
      try {
        const cached = await store.get(SEARCH_INDEX_KEY, { type: "json", consistency: "strong" });
        if (Array.isArray(cached)) return cached;
      } catch (e) {
        console.warn("getSearchIndex read failed, rebuilding:", e.message);
      }
    }
    return await rebuildSearchIndex();
  }

  export async function upsertSearchIndex(path, value, updateAt = 0) {
    try {
      const list = await store.get(SEARCH_INDEX_KEY, { type: "json", consistency: "strong" });
      if (!Array.isArray(list)) {
        await rebuildSearchIndex();
        return;
      }
      const nextText = normalizeSearchText(value);
      const existing = list.find((item) => item && item.path === path);
      if (existing && existing.text === nextText && (!updateAt || existing.updateAt === updateAt)) {
        return;
      }
      const next = list.filter((item) => item && item.path !== path);
      next.unshift({
        path,
        text: nextText,
        updateAt: updateAt || existing?.updateAt || 0
      });
      next.sort((a, b) => (b.updateAt || 0) - (a.updateAt || 0));
      await store.setJSON(SEARCH_INDEX_KEY, next);
    } catch (e) {
      console.warn("upsertSearchIndex error:", e);
    }
  }

  export async function removeSearchIndex(path) {
    try {
      const list = await store.get(SEARCH_INDEX_KEY, { type: "json", consistency: "strong" });
      if (!Array.isArray(list)) return;
      const next = list.filter((item) => item && item.path !== path);
      if (next.length !== list.length) {
        await store.setJSON(SEARCH_INDEX_KEY, next);
      }
    } catch (e) {
      console.warn("removeSearchIndex error:", e);
    }
  }

  export async function renameSearchIndex(oldPath, newPath, fallbackValue = "", fallbackUpdateAt = 0) {
    try {
      const list = await store.get(SEARCH_INDEX_KEY, { type: "json", consistency: "strong" });
      if (!Array.isArray(list)) {
        await rebuildSearchIndex();
        return;
      }
      const existing = list.find((item) => item && item.path === oldPath);
      const next = list.filter((item) => item && item.path !== oldPath && item.path !== newPath);
      next.unshift({
        path: newPath,
        text: existing ? existing.text : normalizeSearchText(fallbackValue),
        updateAt: existing ? existing.updateAt : fallbackUpdateAt
      });
      next.sort((a, b) => (b.updateAt || 0) - (a.updateAt || 0));
      await store.setJSON(SEARCH_INDEX_KEY, next);
    } catch (e) {
      console.warn("renameSearchIndex error:", e);
    }
  }


  export async function deleteShareKeys(cfg, slug, path, storedSlug) {
    const keys = new Set();
    if (slug) keys.add(slug);
    if (storedSlug) keys.add(storedSlug);
    if (path) {
      const md5 = await MD5(path);
      if (md5) keys.add(md5);
    }
    for (const k of keys) {
      await kvDelete(cfg, `share/${k}`);
    }
  }

  export async function checkAuthRateLimit(cfg, failsKey, lang) {
    const now = Date.now();
    let failRecord = null;
    try {
      failRecord = await kvGet(cfg, failsKey, "json");
    } catch (e) {}

    let fails = 0;
    let unlockAt = 0;
    if (failRecord && failRecord.expireAt && now < failRecord.expireAt) {
      fails = parseInt(failRecord.count || "0", 10) || 0;
      unlockAt = parseInt(failRecord.unlockAt || "0", 10) || 0;
    }

    if (unlockAt > now) {
      const waitSeconds = Math.ceil((unlockAt - now) / 1000);
      const msg = lang === "zh" ? `密码错误次数过多，请等待 ${waitSeconds} 秒后再试` : `Too many failed attempts. Please wait ${waitSeconds}s before retrying.`;
      return {
        blocked: true,
        fails,
        response: new Response(JSON.stringify({ err: 429, msg, retryAfter: waitSeconds }), {
          status: 429,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
      };
    }
    return { blocked: false, fails };
  }

  export async function recordAuthFailure(cfg, failsKey, currentFails, lang, errCode, errMsg, putOptions = {}) {
    const now = Date.now();
    const fails = currentFails + 1;
    let cooldown = 0;
    if (fails === 4) cooldown = 5;
    else if (fails === 5) cooldown = 30;
    else if (fails === 6) cooldown = 120;
    else if (fails >= 7) cooldown = 900;

    const newUnlockAt = cooldown > 0 ? now + (cooldown * 1000) : 0;
    try {
      await kvPut(cfg, failsKey, {
        count: fails,
        unlockAt: newUnlockAt,
        expireAt: now + 1800 * 1000
      }, putOptions);
    } catch (e) {}

    if (cooldown > 0) {
      const msg = lang === "zh" ? `密码错误！已连续输错 ${fails} 次，请等待 ${cooldown} 秒后再试` : `Password auth failed! Too many attempts (${fails}), please wait ${cooldown}s before retrying.`;
      return new Response(JSON.stringify({ err: 429, msg, retryAfter: cooldown }), {
        status: 429,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      });
    }

    return returnJSON(errCode, errMsg);
  }


export async function putNote(key, value, metadata) {
    await store.setJSON(`notes/${key}`, {
      value: value || "",
      metadata: metadata || {}
    });
    await upsertNoteIndex(key, metadata);
  }

  export async function cleanupExpiredShareNote(cfg, slug, path, storedSlug) {
    await deleteShareKeys(cfg, slug, path, storedSlug);
    if (!path) return;
    try {
      const { value: expVal, metadata: expMeta } = await queryNote(path);
      if (expMeta && expMeta.share && (!expMeta.shareSlug || expMeta.shareSlug === (storedSlug || slug))) {
        await putNote(path, expVal, {
          ...expMeta,
          share: false,
          shareSlug: null,
          hasSharePw: false,
          sharePw: "",
          sharePwText: "",
          shareTtl: 0,
          shareExpireAt: 0,
          shareBurn: false
        });
      }
    } catch (e) {}
  }


