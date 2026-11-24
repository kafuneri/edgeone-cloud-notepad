import { cookie, jwt } from "./vendor.js";
import { saltPw } from "./storage.js";

  export async function checkAuth(cfg, cookieObj, path) {
    if (cookieObj.auth) {
      const valid = await jwt.verify(cookieObj.auth, cfg.secret);
      if (valid) {
        const payload = jwt.decode(cookieObj.auth);
        if (payload.path === path) {
          return true;
        }
      }
    }
    return false;
  }

  export async function checkAdminAuth(cfg, request) {
    if (!cfg.adminPassword) return true;

    // 1. Query parameter
    const url = new URL(request.url);
    const queryPw = url.searchParams.get("pw");
    if (queryPw && queryPw === cfg.adminPassword) return true;

    // 2. Custom header
    const headerPw = request.headers.get("x-note-pw") || request.headers.get("x-admin-password");
    if (headerPw && headerPw === cfg.adminPassword) return true;

    // 3. HTTP Basic Auth
    const authHeader = request.headers.get("authorization") || request.headers.get("Authorization") || "";
    if (authHeader.toLowerCase().startsWith("basic ")) {
      try {
        const decoded = atob(authHeader.slice(6).trim());
        const colonIdx = decoded.indexOf(":");
        const pass = colonIdx >= 0 ? decoded.slice(colonIdx + 1) : decoded;
        if (pass === cfg.adminPassword) return true;
      } catch (e) {}
    }

    // 4. Bearer Token or Header Token
    let token = url.searchParams.get("token") || request.headers.get("x-admin-token");
    if (!token && authHeader.toLowerCase().startsWith("bearer ")) {
      token = authHeader.slice(7).trim();
    }
    if (!token) {
      const cookieObj = cookie.parse(request.headers.get("Cookie") || "");
      token = cookieObj.admin_token;
    }

    if (token) {
      try {
        const valid = await jwt.verify(token, cfg.secret);
        if (valid) {
          const payload = jwt.decode(token);
          if (payload && payload.role === "admin") return true;
        }
      } catch (e) {}
    }

    return false;
  }

  export async function checkNoteAuth(cfg, request, path, metadata) {
    if (!metadata || !metadata.pw) return true;

    const url = new URL(request.url);
    const queryPw = url.searchParams.get("pw");
    if (queryPw) {
      const hashed = await saltPw(queryPw, cfg.salt);
      if (hashed === metadata.pw) return true;
    }

    const headerPw = request.headers.get("x-note-pw");
    if (headerPw) {
      const hashed = await saltPw(headerPw, cfg.salt);
      if (hashed === metadata.pw) return true;
    }

    const authHeader = request.headers.get("authorization") || request.headers.get("Authorization") || "";
    if (authHeader.toLowerCase().startsWith("basic ")) {
      try {
        const decoded = atob(authHeader.slice(6).trim());
        const colonIdx = decoded.indexOf(":");
        const pass = colonIdx >= 0 ? decoded.slice(colonIdx + 1) : decoded;
        const hashed = await saltPw(pass, cfg.salt);
        if (hashed === metadata.pw) return true;
      } catch (e) {}
    }

    const cookieObj = cookie.parse(request.headers.get("Cookie") || "");
    return await checkAuth(cfg, cookieObj, path);
  }

  export async function verifyNoteAccess(cfg, request, path, metadata) {
    if (cfg.adminPassword) {
      return await checkAdminAuth(cfg, request);
    }
    return await checkNoteAuth(cfg, request, path, metadata);
  }

  // 1. Root route

  export async function checkNoteAuthOrAdmin(cfg, request, path) {
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) return false;
      return true;
    }
    return false;
  }

