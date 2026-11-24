import { dayjs, cookie, jwt } from "./vendor.js";
import { SUPPORTED_LANG, escapeHtml, genRandomStr, getI18n, isHttpsRequest, getClientIp, returnJSON } from "./constants.js";
import { store, MD5, saltPw, kvGet, kvPut, kvDelete, queryNote, putNote, getNotesIndex, rebuildNotesIndex, removeNoteIndex, deleteShareKeys, cleanupExpiredShareNote, checkAuthRateLimit, recordAuthFailure } from "./storage.js";
import { checkAuth, checkAdminAuth, verifyNoteAccess } from "./auth.js";
import { returnPage } from "./templates.js";

  export async function handleRoot(cfg, request) {
    const lang = getI18n(request);
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) {
        return returnPage("AdminLogin", { lang, title: "私有云笔记" });
      }
    }
    const newHash = genRandomStr(3);
    return new Response(null, {
      status: 302,
      headers: { "Location": `/${newHash}` }
    });
  }

  // 2. Admin Login
  export async function handleLogin(cfg, request) {
    if (!cfg.adminPassword) {
      return returnJSON(400, "Private mode is not active.");
    }
    const lang = getI18n(request);
    const ip = getClientIp(request);
    const failsKey = `fails/admin_${encodeURIComponent(ip)}`;

    const rateCheck = await checkAuthRateLimit(cfg, failsKey, lang);
    if (rateCheck.blocked) {
      return rateCheck.response;
    }

    try {
      const { password } = await request.json();
      if (password !== cfg.adminPassword) {
        const errMsg = lang === "zh" ? "管理员密码错误" : "Invalid admin password";
        return await recordAuthFailure(cfg, failsKey, rateCheck.fails, lang, 401, errMsg, { expirationTtl: 1800 });
      }
      try {
        await kvDelete(cfg, failsKey);
      } catch (e) {}
      const token = await jwt.sign({
        role: "admin",
        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 3600)
      }, cfg.secret);

      return returnJSON(0, { ok: true }, {
        "Set-Cookie": cookie.serialize("admin_token", token, {
          path: "/",
          expires: (0, dayjs)().add(30, "day").toDate(),
          httpOnly: true,
          sameSite: "lax",
          secure: isHttpsRequest(request)
        })
      });
    } catch (e) {
      return returnJSON(400, "Bad Request");
    }
  }

  // 3. Admin Logout
  export async function handleLogout(cfg, request) {
    return returnJSON(0, { ok: true }, {
      "Set-Cookie": cookie.serialize("admin_token", "", {
        path: "/",
        expires: (0, dayjs)().subtract(100, "day").toDate(),
        httpOnly: true,
        sameSite: "lax",
        secure: isHttpsRequest(request)
      })
    });
  }

  // 4. Notes list for Sidebar
  export async function handleNotes(cfg, request) {
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    } else {
      return returnJSON(403, "Directory listing is restricted to private vault mode.");
    }

    try {
      const url = new URL(request.url);
      const forceRefresh = url.searchParams.get("refresh") === "1" || url.searchParams.get("sync") === "1";
      let notes = await getNotesIndex(forceRefresh);
      if (!forceRefresh && Array.isArray(notes) && notes.some((n) => n && typeof n.rawPublic !== "boolean")) {
        notes = await rebuildNotesIndex();
      }
      return returnJSON(0, notes);
    } catch (err) {
      return returnJSON(500, err.message);
    }
  }

  // 4b. Shares & Raw Public Status List (/api/shares)
  export async function handleShares(cfg, request) {
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    } else {
      return returnJSON(403, "Share management is restricted to private vault mode.");
    }

    try {
      const url = new URL(request.url);
      const forceRefresh = url.searchParams.get("refresh") === "1" || url.searchParams.get("sync") === "1";
      let notes = await getNotesIndex(forceRefresh);
      if (!forceRefresh && Array.isArray(notes) && notes.some((n) => n && typeof n.rawPublic !== "boolean")) {
        notes = await rebuildNotesIndex();
      }
      return returnJSON(0, notes);
    } catch (err) {
      return returnJSON(500, err.message);
    }
  }

  // 5. Admin List View (/list)
  export async function handleList(cfg, request) {
    if (!cfg.listSecret) {
      return new Response("List view is disabled by administrator.", { status: 403 });
    }

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new Response("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": "Basic realm=\"Admin\"" }
      });
    }

    try {
      const [scheme, encoded] = authHeader.split(" ");
      if (scheme !== "Basic" || !encoded) {
        throw new Error("Malformed auth");
      }
      const decoded = atob(encoded);
      const index = decoded.indexOf(":");
      const password = decoded.substring(index + 1);

      if (password !== cfg.listSecret) {
        return new Response("Unauthorized", {
          status: 401,
          headers: { "WWW-Authenticate": "Basic realm=\"Admin\"" }
        });
      }
    } catch (err) {
      return new Response("Bad Request", { status: 400 });
    }

    const url = new URL(request.url);
    const forceRefresh = url.searchParams.get("refresh") === "1" || url.searchParams.get("sync") === "1";
    const noteList = await getNotesIndex(forceRefresh);

    const rows = noteList.map((item) => `
      <tr>
        <td><a href="/${encodeURI(item.path)}">${escapeHtml(item.path)}</a></td>
        <td>${item.updateAt ? (0, dayjs)(item.updateAt * 1e3).format("YYYY-MM-DD HH:mm:ss") : "-"}</td>
      </tr>
    `).join("");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Note List</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #1f2328; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { padding: 10px 14px; border: 1px solid #d0d7de; text-align: left; }
            th { background-color: #f6f8fa; font-weight: 600; }
            tr:hover { background-color: #f6f8fa; }
            a { color: #0969da; text-decoration: none; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h2>Note List (${noteList.length})</h2>
          <table>
            <thead>
              <tr>
                <th>Note Link</th>
                <th>Modify Time</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
      </html>
    `;
    return new Response(html, {
      headers: { "Content-Type": "text/html;charset=UTF-8" }
    });
  }


  export async function handleShareView(cfg, request, slug, isRaw = false) {
    const lang = getI18n(request);
    const ua = (request.headers.get("user-agent") || "").toLowerCase();
    const accept = (request.headers.get("accept") || "").toLowerCase();
    const isCurl = ua.includes("curl") || ua.includes("httpie") || ua.includes("wget");
    const wantsRaw = isRaw || isCurl || accept === "text/plain" || accept === "text/markdown";

    const rawShare = await kvGet(cfg, `share/${slug}`, "json");
    if (!rawShare) {
      if (wantsRaw) {
        return new Response("404 Share Not Found or Expired\n", {
          status: 404,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }
      return returnPage("Page404", { lang, title: "404 Share Not Found" });
    }

    const shareObj = typeof rawShare === "string" ? { path: rawShare, sharePw: "" } : rawShare;
    const { path, sharePw, expireAt, burnAfterReading, slug: storedSlug } = shareObj;

    // Check expiration TTL
    const now = Date.now();
    if (expireAt && now > expireAt) {
      await cleanupExpiredShareNote(cfg, slug, path, storedSlug);
      if (wantsRaw) {
        return new Response("404 Share Expired\n", {
          status: 404,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }
      return returnPage("Page404", { lang, title: "404 Share Expired" });
    }

    if (sharePw) {
      const url = new URL(request.url);
      const queryPw = url.searchParams.get("pw");
      let pwMatched = false;
      if (queryPw) {
        const hashed = await saltPw(queryPw, cfg.salt);
        if (hashed === sharePw) pwMatched = true;
      }
      const headerPw = request.headers.get("x-note-pw");
      if (headerPw) {
        const hashed = await saltPw(headerPw, cfg.salt);
        if (hashed === sharePw) pwMatched = true;
      }
      const authHeader = request.headers.get("authorization") || request.headers.get("Authorization") || "";
      if (authHeader.toLowerCase().startsWith("basic ")) {
        try {
          const decoded = atob(authHeader.slice(6).trim());
          const colonIdx = decoded.indexOf(":");
          const pass = colonIdx >= 0 ? decoded.slice(colonIdx + 1) : decoded;
          const hashed = await saltPw(pass, cfg.salt);
          if (hashed === sharePw) pwMatched = true;
        } catch (e) {}
      }

      if (!pwMatched) {
        const cookieObj = cookie.parse(request.headers.get("Cookie") || "");
        const cookieKey = `share_auth_${encodeURIComponent(slug)}`;
        if (cookieObj[cookieKey]) {
          try {
            const valid = await jwt.verify(cookieObj[cookieKey], cfg.secret);
            if (valid) {
              const payload = jwt.decode(cookieObj[cookieKey]);
              if (payload && payload.slug === slug) pwMatched = true;
            }
          } catch (e) {}
        }
      }

      if (!pwMatched) {
        if (wantsRaw) {
          return new Response("Error: Password required for this share. Provide via ?pw=, -H \"x-note-pw: ...\", or -u :password\n", {
            status: 401,
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "WWW-Authenticate": 'Basic realm="Share"'
            }
          });
        }
        return returnPage("NeedSharePasswd", {
          lang,
          title: slug,
          slug
        });
      }
    }

    const { value, metadata } = await queryNote(path);

    // Burn After Reading: destroy immediately upon first authorized access!
    if (burnAfterReading) {
      await deleteShareKeys(cfg, slug, path, storedSlug);
      try {
        await putNote(path, value, {
          ...metadata,
          share: false,
          shareSlug: null,
          hasSharePw: false,
          sharePw: "",
          sharePwText: "",
          shareTtl: 0,
          shareExpireAt: 0,
          shareBurn: false
        });
      } catch (e) {
        console.warn("Failed to reset note metadata after burn:", e);
      }
    }

    if (wantsRaw) {
      return new Response(value || "", {
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        }
      });
    }

    const tips = burnAfterReading
      ? `<div style="background:#ffebe9; border:1px solid #ff8182; color:#cf222e; padding:10px 14px; border-radius:6px; font-weight:500; font-size:13px; margin-bottom:12px;">${SUPPORTED_LANG[lang].burnAlertTip || "注意：此笔记为阅后即焚分享，已在服务器端永久销毁，刷新或关闭此页面后将无法再次访问。"}</div>`
      : "";

    return returnPage("Share", {
      lang,
      title: slug,
      content: value,
      ext: metadata,
      tips,
      isPrivateMode: false
    });
  }

  // 7. Share Password Verification (/share/:slug/auth)
  export async function handleShareAuth(cfg, request, slug) {
    const lang = getI18n(request);
    const ip = getClientIp(request);
    const failsKey = `fails/share_${encodeURIComponent(ip)}_${encodeURIComponent(slug)}`;

    const rawShare = await kvGet(cfg, `share/${slug}`, "json");
    if (!rawShare) {
      return returnJSON(404, "Share not found");
    }
    const shareObj = typeof rawShare === "string" ? { path: rawShare, sharePw: "" } : rawShare;
    if (shareObj.expireAt && Date.now() > shareObj.expireAt) {
      await cleanupExpiredShareNote(cfg, slug, shareObj.path, shareObj.slug);
      return returnJSON(404, "Share expired");
    }
    const { sharePw } = shareObj;

    const rateCheck = await checkAuthRateLimit(cfg, failsKey, lang);
    if (rateCheck.blocked) {
      return rateCheck.response;
    }

    let isPasswordCorrect = false;
    try {
      const { passwd } = await request.json();
      if (sharePw) {
        const storePw = await saltPw(passwd, cfg.salt);
        if (sharePw === storePw) {
          isPasswordCorrect = true;
        }
      }
    } catch (e) {}

    if (isPasswordCorrect) {
      try {
        await kvDelete(cfg, failsKey);
      } catch (e) {}
      const token = await jwt.sign({ slug }, cfg.secret);
      const cookieKey = `share_auth_${encodeURIComponent(slug)}`;
      return returnJSON(0, { refresh: true }, {
        "Set-Cookie": cookie.serialize(cookieKey, token, {
          path: `/share/${encodeURI(slug)}`,
          expires: (0, dayjs)().add(7, "day").toDate(),
          httpOnly: true,
          sameSite: "lax",
          secure: isHttpsRequest(request)
        })
      });
    }

    const errMsg = lang === "zh" ? "提取码错误！" : "Access code incorrect!";
    return await recordAuthFailure(cfg, failsKey, rateCheck.fails, lang, 10002, errMsg, { expirationTtl: 1800 });
  }

  // 8. Note Delete
  export async function handleNoteDelete(cfg, request, path) {
    const cookieObj = cookie.parse(request.headers.get("Cookie") || "");
    const { metadata } = await queryNote(path);

    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    } else {
      const valid = await checkAuth(cfg, cookieObj, path);
      if (metadata.pw && !valid) {
        return returnJSON(403, "Protected note: password required to delete.");
      }
    }

    if (metadata && metadata.locked) {
      const lang = getI18n(request);
      return returnJSON(423, lang === "zh" ? "笔记已锁定，请先解锁后再删除" : "Note is locked. Please unlock it before deleting.");
    }

    try {
      await store.delete(`notes/${path}`);
      await removeNoteIndex(path);
      await deleteShareKeys(cfg, metadata.shareSlug, path, null);

      const ip = getClientIp(request);
      await kvDelete(cfg, `fails/${encodeURIComponent(ip)}_${encodeURIComponent(path)}`);

      // Clean up history snapshots and index
      try {
        const histKey = `hist/${encodeURIComponent(path)}`;
        const histList = await kvGet(cfg, histKey, "json");
        if (Array.isArray(histList)) {
          for (const h of histList) {
            if (h && h.id) {
              await store.delete(`history/${encodeURIComponent(path)}/${h.id}`);
            }
          }
        }
        await kvDelete(cfg, histKey);
      } catch (e) {}

      return returnJSON(0, { deleted: path });
    } catch (err) {
      return returnJSON(500, "Delete failed: " + err.message);
    }
  }

  // 9. Note Auth (/:path/auth)
  export async function handleNoteAuth(cfg, request, path) {
    const lang = getI18n(request);
    const ip = getClientIp(request);
    const failsKey = `fails/${encodeURIComponent(ip)}_${encodeURIComponent(path)}`;

    const rateCheck = await checkAuthRateLimit(cfg, failsKey, lang);
    if (rateCheck.blocked) {
      return rateCheck.response;
    }

    let isPasswordCorrect = false;
    const ctype = request.headers.get("content-type") || request.headers.get("Content-Type") || "";
    if (ctype.includes("application/json")) {
      const { passwd } = await request.json();
      const { metadata } = await queryNote(path);
      if (metadata.pw) {
        const storePw = await saltPw(passwd, cfg.salt);
        if (metadata.pw === storePw) {
          isPasswordCorrect = true;
        }
      }
    }

    if (isPasswordCorrect) {
      try {
        await kvDelete(cfg, failsKey);
      } catch (e) {}
      const token = await jwt.sign({ path }, cfg.secret);
      return returnJSON(0, { refresh: true }, {
        "Set-Cookie": cookie.serialize("auth", token, {
          path: `/${encodeURI(path)}`,
          expires: (0, dayjs)().add(7, "day").toDate(),
          httpOnly: true,
          sameSite: "lax",
          secure: isHttpsRequest(request)
        })
      });
    }

    const errMsg = lang === "zh" ? "密码错误！" : "Password auth failed!";
    return await recordAuthFailure(cfg, failsKey, rateCheck.fails, lang, 10002, errMsg, { expirationTtl: 1800 });
  }

  // 10. Note Password Setting (/:path/pw)
  export async function handleNotePw(cfg, request, path) {
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) return returnJSON(401, "Unauthorized");
    }

    const ctype = request.headers.get("content-type") || request.headers.get("Content-Type") || "";
    if (ctype.includes("application/json")) {
      const cookieObj = cookie.parse(request.headers.get("Cookie") || "");
      const { passwd } = await request.json();
      const { value, metadata } = await queryNote(path);
      const valid = await checkAuth(cfg, cookieObj, path);
      if (cfg.adminPassword || !metadata.pw || valid) {
        const pw = passwd ? await saltPw(passwd, cfg.salt) : void 0;
        try {
          await putNote(path, value, {
            ...metadata,
            pw
          });
          return returnJSON(0, null, {
            "Set-Cookie": cookie.serialize("auth", "", {
              path: `/${encodeURI(path)}`,
              expires: (0, dayjs)().subtract(100, "day").toDate(),
              httpOnly: true,
              sameSite: "lax",
              secure: isHttpsRequest(request)
            })
          });
        } catch (error) {
          console.error(error);
        }
      }
      return returnJSON(10003, "Password setting failed!");
    }
  }

  // 11. Note Setting Update (/:path/setting)
  export async function handleNoteSetting(cfg, request, path) {
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) return returnJSON(401, "Unauthorized");
    }

    const ctype = request.headers.get("content-type") || request.headers.get("Content-Type") || "";
    if (ctype.includes("application/json")) {
      const cookieObj = cookie.parse(request.headers.get("Cookie") || "");
      const { mode, share, shareSlug, sharePw, ttl, burnAfterReading, rawPublic, locked } = await request.json();
      const { value, metadata } = await queryNote(path);
      const valid = await checkAuth(cfg, cookieObj, path);
      if (cfg.adminPassword || !metadata.pw || valid) {
        try {
          const md5 = await MD5(path);
          let slug = metadata.shareSlug || "";
          const baseMeta = {
            ...metadata,
            ...mode !== void 0 && { mode },
            ...typeof rawPublic === "boolean" && { rawPublic },
            ...typeof locked === "boolean" && { locked }
          };

          if (locked === true && (baseMeta.share || baseMeta.rawPublic)) {
            const lang = getI18n(request);
            return returnJSON(409, lang === "zh" ? "该笔记当前正在对外分享/Raw公开，请先关闭分享后再锁定" : "Disable share and Raw public before locking this note.");
          }

          if ((share === true || rawPublic === true) && baseMeta.locked) {
            const lang = getI18n(request);
            return returnJSON(423, lang === "zh" ? "笔记已锁定，请先解锁后再操作" : "Note is locked. Please unlock it first.");
          }

          if (share === true) {
            const lang = getI18n(request);
            slug = (shareSlug || slug).trim().replace(/^\/+|\/+$/g, "");
            if (!slug) {
              const chars = "23456789abcdefghjkmnpqrstuvwxyz";
              for (let i = 0; i < 6; i++) slug += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            if (slug.includes("/")) {
              return returnJSON(400, lang === "zh" ? "分享路径不能包含 /" : "Share slug cannot contain '/'");
            }

            const existingShare = await kvGet(cfg, `share/${slug}`, "json");
            if (existingShare) {
              const existingObj = typeof existingShare === "string" ? { path: existingShare } : existingShare;
              const existingExpired = !!(existingObj.expireAt && Date.now() > existingObj.expireAt);
              if (!existingExpired && existingObj.path && existingObj.path !== path) {
                const otherNote = await queryNote(existingObj.path);
                if (otherNote && otherNote.metadata && otherNote.metadata.share && otherNote.metadata.shareSlug === slug) {
                  return returnJSON(
                    409,
                    lang === "zh"
                      ? `分享路径 "${slug}" 已被笔记 "${existingObj.path}" 占用，请更换其他路径`
                      : `Share slug "${slug}" is already used by "${existingObj.path}"`
                  );
                }
              }
            }

            const ttlSec = Number(ttl) || 0;
            const expireAt = ttlSec > 0 ? (Date.now() + ttlSec * 1000) : 0;
            const isBurn = !!burnAfterReading;
            const nextSharePwText = sharePw ? String(sharePw) : (sharePw === "" ? "" : (metadata.sharePwText || ""));

            const shareData = {
              path,
              sharePw: sharePw ? await saltPw(sharePw, cfg.salt) : (sharePw === "" ? "" : (metadata.sharePw || "")),
              slug,
              ttl: ttlSec,
              expireAt,
              burnAfterReading: isBurn,
              createdAt: Date.now()
            };

            if (metadata.shareSlug && metadata.shareSlug !== slug && metadata.shareSlug !== md5) {
              await kvDelete(cfg, `share/${metadata.shareSlug}`);
            }

            const putOpts = ttlSec > 0 ? { expirationTtl: ttlSec } : {};
            await kvPut(cfg, `share/${slug}`, shareData, putOpts);
            await putNote(path, value, {
              ...baseMeta,
              share: true,
              shareSlug: slug,
              hasSharePw: !!shareData.sharePw,
              sharePw: shareData.sharePw,
              sharePwText: nextSharePwText,
              shareTtl: ttlSec,
              shareExpireAt: expireAt,
              shareBurn: isBurn
            });
            return returnJSON(0, {
              slug,
              hasSharePw: !!shareData.sharePw,
              sharePwText: nextSharePwText,
              ttl: ttlSec,
              expireAt,
              burnAfterReading: isBurn,
              rawPublic: !!baseMeta.rawPublic
            });
          } else if (share === false) {
            await deleteShareKeys(cfg, metadata.shareSlug, path, null);
            await putNote(path, value, {
              ...baseMeta,
              share: false,
              shareSlug: null,
              hasSharePw: false,
              sharePw: "",
              sharePwText: "",
              shareTtl: 0,
              shareExpireAt: 0,
              shareBurn: false
            });
            return returnJSON(0, { rawPublic: !!baseMeta.rawPublic });
          } else if (mode !== void 0 || typeof rawPublic === "boolean" || typeof locked === "boolean") {
            await putNote(path, value, baseMeta);
            return returnJSON(0, { rawPublic: !!baseMeta.rawPublic, locked: !!baseMeta.locked });
          }
          return returnJSON(0);
        } catch (error) {
          console.error("Update setting error detail:", error);
          return returnJSON(10004, "Update Setting failed: " + (error?.message || String(error)));
        }
      }
      return returnJSON(10004, "Update Setting failed: unauthorized note access");
    }
    return returnJSON(400, "Expected JSON body");
  }

  // 12. Save Note Content (POST /:path)
  export async function handleNoteSave(cfg, request, path) {
    const { value, metadata } = await queryNote(path);
    const hasAccess = await verifyNoteAccess(cfg, request, path, metadata);

    const ua = (request.headers.get("user-agent") || "").toLowerCase();
    const accept = (request.headers.get("accept") || "").toLowerCase();
    const isCurl = ua.includes("curl") || ua.includes("httpie") || ua.includes("wget");
    const wantsRaw = isCurl || accept === "text/plain" || accept === "text/markdown";

    if (!hasAccess) {
      if (isCurl || wantsRaw) {
        return new Response("Error: Unauthorized. Please provide password via ?pw=, -H \"x-note-pw: ...\", or -u :password\n", {
          status: 401,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "WWW-Authenticate": 'Basic realm="Notepad"'
          }
        });
      }
      return returnJSON(401, "Unauthorized");
    }

    let content = "";
    const ctype = (request.headers.get("content-type") || "").toLowerCase();
    if (ctype.includes("multipart/form-data")) {
      try {
        const formData = await request.formData();
        content = formData.get("t") ?? "";
      } catch (e) {
        content = await request.text();
      }
    } else if (ctype.includes("application/x-www-form-urlencoded")) {
      const rawBody = await request.text();
      if (rawBody.startsWith("t=") || rawBody.includes("&t=")) {
        const decodePart = (s) => {
          const plusFixed = s.replace(/\+/g, " ");
          try {
            return decodeURIComponent(plusFixed);
          } catch (e) {
            return plusFixed;
          }
        };
        let parsedT = null;
        for (const pair of rawBody.split("&")) {
          const eqIdx = pair.indexOf("=");
          const k = decodePart(eqIdx >= 0 ? pair.slice(0, eqIdx) : pair);
          if (k === "t") {
            parsedT = decodePart(eqIdx >= 0 ? pair.slice(eqIdx + 1) : "");
            break;
          }
        }
        content = parsedT !== null ? parsedT : rawBody;
      } else {
        content = rawBody;
      }
    } else {
      content = await request.text();
    }

    // History snapshot tracking:
    // Only record snapshots in private mode to avoid consuming storage quota on public edits
    if (cfg.adminPassword && value && value !== content && value.trim().length > 0) {
      try {
        const histKey = `hist/${encodeURIComponent(path)}`;
        let histList = [];
        try {
          const raw = await kvGet(cfg, histKey, "json");
          if (Array.isArray(raw)) histList = raw;
        } catch(e) {}

        const now = Date.now();
        const lastSnap = histList[0];
        // Throttle snapshots: at least 60 seconds interval between snapshots
        if (!lastSnap || (now - lastSnap.timestamp) >= 60000) {
          const snapId = String(now);
          const snapBlobKey = `history/${encodeURIComponent(path)}/${snapId}`;
          await store.setJSON(snapBlobKey, {
            content: value,
            timestamp: now,
            size: value.length
          });

          const preview = value.slice(0, 80).replace(/[\r\n]+/g, " ");
          const dateStr = (0, dayjs)(now).format("YYYY-MM-DD HH:mm:ss");

          histList.unshift({
            id: snapId,
            timestamp: now,
            dateStr,
            size: value.length,
            preview
          });

          while (histList.length > 5) {
            const pruned = histList.pop();
            if (pruned && pruned.id) {
              try {
                await store.delete(`history/${encodeURIComponent(path)}/${pruned.id}`);
              } catch(e) {}
            }
          }
          await kvPut(cfg, histKey, histList);
        }
      } catch (err) {
        console.warn("History snapshot error:", err);
      }
    }

    try {
      await putNote(path, content, {
        ...metadata,
        updateAt: (0, dayjs)().unix()
      });
      if (isCurl || wantsRaw) {
        return new Response(`OK: Saved to /${path} (${(content || "").length} bytes)\n`, {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8" }
        });
      }
      return returnJSON(0);
    } catch (error) {
      console.error(error);
    }

    if (isCurl || wantsRaw) {
      return new Response("Error: Failed to save note\n", {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
    return returnJSON(10001, "Blob insert fail!");
  }

  // 13. View / Edit Note (GET /:path)
  export async function handleNoteView(cfg, request, path) {
    const lang = getI18n(request);
    const title = path;
    const ua = (request.headers.get("user-agent") || "").toLowerCase();
    const accept = (request.headers.get("accept") || "").toLowerCase();
    const isCurl = ua.includes("curl") || ua.includes("httpie") || ua.includes("wget");
    const wantsRaw = isCurl || accept === "text/plain" || accept === "text/markdown";

    if (wantsRaw) {
      return handleNoteRaw(cfg, request, path);
    }

    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) {
        return returnPage("AdminLogin", { lang, title: "私有云笔记" });
      }
      const { value, metadata } = await queryNote(path);
      return returnPage("Edit", {
        lang,
        title,
        content: value,
        ext: metadata,
        isPrivateMode: true
      });
    }

    // Public mode
    const cookieObj = cookie.parse(request.headers.get("Cookie") || "");
    const { value, metadata } = await queryNote(path);
    if (!metadata.pw) {
      return returnPage("Edit", {
        lang,
        title,
        content: value,
        ext: metadata,
        isPrivateMode: false
      });
    }
    const valid = await checkAuth(cfg, cookieObj, path);
    if (valid) {
      return returnPage("Edit", {
        lang,
        title,
        content: value,
        ext: metadata,
        isPrivateMode: false
      });
    }
    return returnPage("NeedPasswd", { lang, title, isPrivateMode: false });
  }

  // 14. Raw Markdown Output (/raw/:path and /:path.md)
  export async function handleNoteRaw(cfg, request, path) {
    const { value, metadata } = await queryNote(path);
    const hasAccess = metadata.rawPublic === true || await verifyNoteAccess(cfg, request, path, metadata);

    if (!hasAccess) {
      return new Response("Error: Unauthorized. Please provide password via ?pw=, -H \"x-note-pw: ...\", or -u :password\n", {
        status: 401,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "WWW-Authenticate": 'Basic realm="Notepad"'
        }
      });
    }

    if (!value && (!metadata || Object.keys(metadata).length === 0)) {
      return new Response("404 Not Found\n", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }

    return new Response(value || "", {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });
  }

  // 14. Image Upload & Quota Management (200MB Limit)

  export async function handleNoteRename(cfg, request) {
    const lang = getI18n(request);
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) return returnJSON(401, "Unauthorized");
    }

    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      return returnJSON(400, "Expected JSON body");
    }

    const oldPath = String(body.oldPath || "").trim().replace(/^\/+|\/+$/g, "");
    const newPath = String(body.newPath || "").trim().replace(/^\/+|\/+$/g, "");
    if (!oldPath || !newPath) {
      return returnJSON(400, lang === "zh" ? "原路径或新路径不能为空" : "Missing oldPath or newPath");
    }
    if (oldPath === newPath) {
      return returnJSON(400, lang === "zh" ? "新路径与原路径相同" : "New path is identical to old path");
    }
    const invalidSegs = newPath.split("/").some((s) => !s || s === "." || s === "..");
    const reservedPrefixes = ["api", "share", "raw", "list"];
    const firstSeg = newPath.split("/")[0];
    if (invalidSegs || newPath.includes("//") || reservedPrefixes.includes(firstSeg) || /\.md$/i.test(newPath) || /\/(delete|setting|auth|pw)$/i.test("/" + newPath)) {
      return returnJSON(400, lang === "zh" ? "目标路径格式不合法或使用了保留前缀/后缀 (.md、/delete、/setting、/auth、/pw)" : "Invalid or reserved target path");
    }

    try {
      const oldNote = await store.get(`notes/${oldPath}`, { type: "json", consistency: "strong" });
      if (!oldNote) {
        return returnJSON(404, lang === "zh" ? "原笔记不存在" : "Source note not found");
      }
      const oldMeta = oldNote.metadata || {};
      if (oldMeta.locked) {
        return returnJSON(423, lang === "zh" ? "笔记已锁定，请先解锁后再重命名或移动" : "Note is locked. Please unlock it first.");
      }

      const targetExisting = await store.get(`notes/${newPath}`, { type: "json", consistency: "strong" });
      if (targetExisting) {
        return returnJSON(409, lang === "zh" ? `目标路径 "${newPath}" 已存在笔记，请更换名称` : `Target path "${newPath}" already exists`);
      }

      await putNote(newPath, oldNote.value || "", oldMeta);
      await store.delete(`notes/${oldPath}`);
      await removeNoteIndex(oldPath);

      if (oldMeta.share && oldMeta.shareSlug) {
        try {
          const shareObj = await kvGet(cfg, `share/${oldMeta.shareSlug}`, "json");
          if (shareObj && typeof shareObj === "object") {
            const remTtl = shareObj.expireAt ? Math.max(1, Math.ceil((shareObj.expireAt - Date.now()) / 1000)) : 0;
            const putOpts = remTtl > 0 ? { expirationTtl: remTtl } : {};
            await kvPut(cfg, `share/${oldMeta.shareSlug}`, { ...shareObj, path: newPath }, putOpts);
          }
        } catch (e) {}
      }

      try {
        const oldHistKey = `hist/${encodeURIComponent(oldPath)}`;
        const newHistKey = `hist/${encodeURIComponent(newPath)}`;
        const histList = await kvGet(cfg, oldHistKey, "json");
        if (Array.isArray(histList) && histList.length > 0) {
          for (const h of histList) {
            if (h && h.id) {
              const oldSnapKey = `history/${encodeURIComponent(oldPath)}/${h.id}`;
              const newSnapKey = `history/${encodeURIComponent(newPath)}/${h.id}`;
              const snap = await store.get(oldSnapKey, { type: "json", consistency: "strong" });
              if (snap) {
                await store.setJSON(newSnapKey, snap);
                await store.delete(oldSnapKey);
              }
            }
          }
          await kvPut(cfg, newHistKey, histList);
          await kvDelete(cfg, oldHistKey);
        }
      } catch (e) {}

      return returnJSON(0, { oldPath, newPath });
    } catch (err) {
      return returnJSON(500, "Rename failed: " + (err?.message || String(err)));
    }
  }
