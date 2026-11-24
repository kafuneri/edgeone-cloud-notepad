import { getI18n, returnJSON, safeDecode } from "./constants.js";
import { returnPage } from "./templates.js";
import {
  handleRoot, handleLogin, handleLogout, handleNotes, handleSearchIndex, handleShares, handleList,
  handleShareView, handleShareAuth, handleNoteDelete, handleNoteAuth, handleNotePw,
  handleNoteSetting, handleNoteSave, handleNoteView, handleNoteRaw, handleNoteRename
} from "./handlers-notes.js";
import {
  handleUpload, handleImageGet, handleImageList, handleQuota,
  handleImageDelete, handleHistoryList, handleHistoryView, handleHistoryRestore
} from "./handlers-media.js";

  export async function route(cfg, request) {
    const url = new URL(request.url);
    let pathname = url.pathname || "/";
    while (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
    const method = request.method || "GET";

    if (method === "GET" && pathname === "/") {
      return handleRoot(cfg, request);
    }
    if (method === "POST" && pathname === "/api/login") {
      return handleLogin(cfg, request);
    }
    if (method === "POST" && pathname === "/api/logout") {
      return handleLogout(cfg, request);
    }
    if (method === "GET" && pathname === "/api/notes") {
      return handleNotes(cfg, request);
    }
    if (method === "GET" && pathname === "/api/search-index") {
      return handleSearchIndex(cfg, request);
    }
    if (method === "POST" && pathname === "/api/notes/rename") {
      return handleNoteRename(cfg, request);
    }
    if (method === "GET" && pathname === "/api/shares") {
      return handleShares(cfg, request);
    }
    if (method === "GET" && pathname === "/api/quota") {
      return handleQuota(cfg, request);
    }
    if (method === "POST" && pathname === "/api/upload") {
      return handleUpload(cfg, request);
    }
    if (method === "GET" && pathname === "/api/images") {
      return handleImageList(cfg, request);
    }
    if (pathname.startsWith("/api/images/")) {
      const rest = pathname.slice(12);
      if (method === "POST" && rest.endsWith("/delete")) {
        const filename = rest.slice(0, -7);
        return handleImageDelete(cfg, request, filename);
      }
      if (method === "GET") {
        return handleImageGet(cfg, request, rest);
      }
    }
    if (method === "GET" && pathname === "/api/history") {
      return handleHistoryList(cfg, request);
    }
    if (method === "GET" && pathname === "/api/history/view") {
      return handleHistoryView(cfg, request);
    }
    if (method === "POST" && pathname === "/api/history/restore") {
      return handleHistoryRestore(cfg, request);
    }
    if (method === "GET" && pathname === "/list") {
      return handleList(cfg, request);
    }

    if (pathname.startsWith("/api/")) {
      return returnJSON(404, "API endpoint not found");
    }

    if (pathname === "/share" || pathname.startsWith("/share/")) {
      if (pathname === "/share") {
        const lang = getI18n(request);
        return returnPage("Page404", { lang, title: "404" });
      }
      let rest = pathname.slice(7);
      let isRawShare = false;
      if (rest.endsWith(".md") && rest.length > 3) {
        rest = rest.slice(0, -3);
        isRawShare = true;
      }
      if (method === "POST" && rest.endsWith("/auth")) {
        const slug = safeDecode(rest.slice(0, -5));
        return handleShareAuth(cfg, request, slug);
      }
      if (method === "GET") {
        const slug = safeDecode(rest);
        return handleShareView(cfg, request, slug, isRawShare);
      }
      const lang = getI18n(request);
      return returnPage("Page404", { lang, title: "404" });
    }

    if (pathname.length > 1) {
      if (pathname.startsWith("/raw/")) {
        const rest = pathname.slice(5);
        if (rest.startsWith("share/")) {
          const slug = safeDecode(rest.slice(6));
          return handleShareView(cfg, request, slug, true);
        }
        const path = safeDecode(rest);
        if (method === "POST") {
          return handleNoteSave(cfg, request, path);
        }
        return handleNoteRaw(cfg, request, path);
      }

      if (pathname.endsWith(".md") && pathname.length > 3) {
        const rest = pathname.slice(1, -3);
        if (rest.startsWith("share/")) {
          const slug = safeDecode(rest.slice(6));
          return handleShareView(cfg, request, slug, true);
        }
        const path = safeDecode(rest);
        if (method === "POST") {
          return handleNoteSave(cfg, request, path);
        }
        return handleNoteRaw(cfg, request, path);
      }

      if (method === "POST" && pathname.endsWith("/delete") && pathname.length > 8) {
        const path = safeDecode(pathname.slice(1, -7));
        return handleNoteDelete(cfg, request, path);
      }
      if (method === "POST" && pathname.endsWith("/auth") && pathname.length > 6) {
        const path = safeDecode(pathname.slice(1, -5));
        return handleNoteAuth(cfg, request, path);
      }
      if (method === "POST" && pathname.endsWith("/pw") && pathname.length > 4) {
        const path = safeDecode(pathname.slice(1, -3));
        return handleNotePw(cfg, request, path);
      }
      if (method === "POST" && pathname.endsWith("/setting") && pathname.length > 9) {
        const path = safeDecode(pathname.slice(1, -8));
        return handleNoteSetting(cfg, request, path);
      }
      if (method === "POST") {
        const path = safeDecode(pathname.slice(1));
        return handleNoteSave(cfg, request, path);
      }
      if (method === "GET") {
        const path = safeDecode(pathname.slice(1));
        return handleNoteView(cfg, request, path);
      }
    }

    const lang = getI18n(request);
    return returnPage("Page404", { lang, title: "404" });
  }

export async function handleEdgeRequest(context) {
  try {
    const safeProcessEnv = typeof process !== "undefined" && process && process.env ? process.env : {};
    const env = context?.env || safeProcessEnv || {};
    const request = context?.request || (typeof Request !== "undefined" && context instanceof Request ? context : context);
    const cfg = {
      salt: env?.SCN_SALT || safeProcessEnv?.SCN_SALT || "",
      secret: env?.SCN_SECRET || safeProcessEnv?.SCN_SECRET || "",
      listSecret: env?.LIST_SECRET || safeProcessEnv?.LIST_SECRET || "",
      adminPassword: env?.ADMIN_PASSWORD || safeProcessEnv?.ADMIN_PASSWORD || "",
      kv: env?.notepad_kv || (typeof globalThis !== "undefined" ? globalThis?.notepad_kv : null) || null
    };
    const resp = await route(cfg, request);
    return resp || new Response("Not Found", { status: 404 });
  } catch (err) {
    if (err && err.status === 400) {
      return new Response("Bad Request", {
        status: 400,
        headers: { "Content-Type": "text/plain;charset=UTF-8" }
      });
    }
    console.error("Edge request error:", err);
    return new Response("Internal Edge Error: " + (err?.message || "Unknown error"), {
      status: 500,
      headers: { "Content-Type": "text/plain;charset=UTF-8" }
    });
  }
}
