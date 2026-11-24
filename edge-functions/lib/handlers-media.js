import { store, kvGet, kvPut } from "./storage.js";
import { checkAdminAuth, checkNoteAuthOrAdmin } from "./auth.js";
import { returnJSON } from "./constants.js";

  function isImageBuffer(buffer) {
    if (!buffer || buffer.byteLength < 12) return false;
    const v = new Uint8Array(buffer);
    // WebP: RIFF ... WEBP
    if (v[0] === 0x52 && v[1] === 0x49 && v[2] === 0x46 && v[3] === 0x46 &&
        v[8] === 0x57 && v[9] === 0x45 && v[10] === 0x42 && v[11] === 0x50) {
      return "webp";
    }
    // PNG
    if (v[0] === 0x89 && v[1] === 0x50 && v[2] === 0x4E && v[3] === 0x47) {
      return "png";
    }
    // JPEG
    if (v[0] === 0xFF && v[1] === 0xD8 && v[2] === 0xFF) {
      return "jpeg";
    }
    // GIF
    if (v[0] === 0x47 && v[1] === 0x49 && v[2] === 0x46) {
      return "gif";
    }
    return false;
  }

  export async function handleUpload(cfg, request) {
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized: Admin login required for uploads");
      }
    } else {
      return returnJSON(403, "Image upload is restricted to private admin mode.");
    }

    try {
      const ctype = request.headers.get("content-type") || "";
      let fileBuffer = null;

      if (ctype.includes("multipart/form-data")) {
        const formData = await request.formData();
        const file = formData.get("file") || formData.get("image");
        if (!file) {
          return returnJSON(400, "No file provided in form-data");
        }
        fileBuffer = await file.arrayBuffer();
      } else {
        fileBuffer = await request.arrayBuffer();
      }

      if (!fileBuffer || fileBuffer.byteLength === 0) {
        return returnJSON(400, "Empty upload");
      }

      const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
      if (fileBuffer.byteLength > MAX_FILE_SIZE) {
        return returnJSON(413, `File exceeds 1MB limit (${(fileBuffer.byteLength / 1024).toFixed(0)} KB)`);
      }

      const imgType = isImageBuffer(fileBuffer);
      if (!imgType) {
        return returnJSON(400, "Invalid image format. Allowed: WebP, PNG, JPEG, GIF");
      }

      // Compute SHA-256 content hash (first 16 hex chars)
      const hashBuffer = await crypto.subtle.digest("SHA-256", fileBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
      const filename = `${hashHex}.${imgType}`;

      const MAX_QUOTA = 200 * 1024 * 1024; // 200 MB
      const usageStr = await kvGet(cfg, "stat/images_usage_bytes");
      let currentUsage = parseInt(usageStr || "0", 10);
      if (isNaN(currentUsage) || currentUsage < 0) currentUsage = 0;

      // Check if image already exists (deduplication)
      const existing = await store.getMetadata(`images/${filename}`, { consistency: "strong" });
      if (!existing) {
        if (currentUsage + fileBuffer.byteLength > MAX_QUOTA) {
          const usedMB = (currentUsage / (1024 * 1024)).toFixed(1);
          return returnJSON(413, `图片配额已满（当前已用 ${usedMB}MB / 上限 200MB）`);
        }
        await store.set(`images/${filename}`, fileBuffer, {
          cacheControl: "public, max-age=31536000, immutable"
        });
        currentUsage += fileBuffer.byteLength;
        await kvPut(cfg, "stat/images_usage_bytes", String(currentUsage));
      }

      // Maintain stat/images_list in KV
      try {
        let list = [];
        const listStr = await kvGet(cfg, "stat/images_list");
        if (listStr) list = JSON.parse(listStr);
        list = list.filter(item => item.filename !== filename);
        list.unshift({
          filename,
          url: `/api/images/${filename}`,
          size: fileBuffer.byteLength,
          uploadedAt: Date.now()
        });
        await kvPut(cfg, "stat/images_list", JSON.stringify(list));
      } catch (e) {
        console.error("Failed to update stat/images_list:", e);
      }

      return returnJSON(0, {
        url: `/api/images/${filename}`,
        filename,
        size: fileBuffer.byteLength,
        usedMB: (currentUsage / (1024 * 1024)).toFixed(2),
        quotaMB: 200
      });
    } catch (err) {
      console.error("handleUpload error:", err);
      return returnJSON(500, "Upload error: " + err.message);
    }
  }

  export async function handleImageGet(cfg, request, filename) {
    if (!/^[a-zA-Z0-9_-]+\.(webp|png|jpe?g|gif)$/i.test(filename)) {
      return new Response("Invalid image name", { status: 400 });
    }

    const ext = filename.split(".").pop().toLowerCase();
    const mimeTypes = {
      webp: "image/webp",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif"
    };
    const ctype = mimeTypes[ext] || "image/webp";

    try {
      let buf = null;
      try {
        buf = await store.get(`images/${filename}`, { type: "arrayBuffer" });
      } catch (eventualErr) {
        console.warn("handleImageGet eventual read failed, falling back to strong:", eventualErr?.message || eventualErr);
      }
      if (!buf) {
        buf = await store.get(`images/${filename}`, { type: "arrayBuffer", consistency: "strong" });
      }
      if (!buf) {
        return new Response("Image Not Found", { status: 404 });
      }
      return new Response(buf, {
        status: 200,
        headers: {
          "Content-Type": ctype,
          "Cache-Control": "public, max-age=31536000, immutable"
        }
      });
    } catch (err) {
      console.error("handleImageGet error:", err?.message || err);
      return new Response("Failed to fetch image", { status: 500 });
    }
  }

  export async function handleImageList(cfg, request) {
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    } else {
      return returnJSON(403, "Image management is restricted to private admin mode.");
    }
    try {
      let list = [];
      const listStr = await kvGet(cfg, "stat/images_list");
      if (listStr) {
        try {
          list = JSON.parse(listStr);
        } catch (e) {}
      }

      // Query blobs to ensure complete synchronization with blob storage
      const { blobs } = await store.list({ prefix: "images/", consistency: "strong" });
      const blobMap = new Map();
      (blobs || []).forEach(b => {
        const fname = b.key.slice("images/".length);
        if (fname) blobMap.set(fname, b);
      });

      // Filter out deleted blobs from list
      list = list.filter(item => blobMap.has(item.filename));

      // Add any blob present in store but missing in list
      const existingFnames = new Set(list.map(i => i.filename));
      for (const [fname, b] of blobMap.entries()) {
        if (!existingFnames.has(fname)) {
          let size = 0;
          try {
            const meta = await store.getMetadata(b.key, { consistency: "strong" });
            if (meta && meta.headers && meta.headers["content-length"]) {
              size = parseInt(meta.headers["content-length"], 10) || 0;
            }
          } catch(e) {}
          list.push({
            filename: fname,
            url: `/api/images/${fname}`,
            size,
            uploadedAt: Date.now()
          });
        }
      }

      list.sort((a, b) => (b.uploadedAt || 0) - (a.uploadedAt || 0));
      await kvPut(cfg, "stat/images_list", JSON.stringify(list));

      const MAX_QUOTA = 200 * 1024 * 1024;
      const usageStr = await kvGet(cfg, "stat/images_usage_bytes");
      let currentUsage = parseInt(usageStr || "0", 10);
      if (isNaN(currentUsage) || currentUsage < 0) currentUsage = 0;
      const sumBytes = list.reduce((acc, item) => acc + (Number(item && item.size) || 0), 0);
      if ((list.length === 0 || list.every((item) => item && Number(item.size) > 0)) && sumBytes !== currentUsage) {
        currentUsage = sumBytes;
        await kvPut(cfg, "stat/images_usage_bytes", String(currentUsage));
      }

      return returnJSON(0, {
        images: list,
        quota: {
          usedBytes: currentUsage,
          maxBytes: MAX_QUOTA,
          usedMB: (currentUsage / (1024 * 1024)).toFixed(2),
          maxMB: 200,
          percent: ((currentUsage / MAX_QUOTA) * 100).toFixed(1) + "%"
        }
      });
    } catch (err) {
      console.error("handleImageList error:", err);
      return returnJSON(500, "Failed to list images: " + err.message);
    }
  }

  export async function handleQuota(cfg, request) {
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    } else {
      return returnJSON(403, "Quota view is restricted to private admin mode.");
    }
    const MAX_QUOTA = 200 * 1024 * 1024;
    const usageStr = await kvGet(cfg, "stat/images_usage_bytes");
    let currentUsage = parseInt(usageStr || "0", 10);
    if (isNaN(currentUsage) || currentUsage < 0) currentUsage = 0;

    return returnJSON(0, {
      usedBytes: currentUsage,
      maxBytes: MAX_QUOTA,
      usedMB: (currentUsage / (1024 * 1024)).toFixed(2),
      maxMB: 200,
      percent: ((currentUsage / MAX_QUOTA) * 100).toFixed(1) + "%"
    });
  }

  export async function handleImageDelete(cfg, request, filename) {
    if (cfg.adminPassword) {
      const isAdmin = await checkAdminAuth(cfg, request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    } else {
      return returnJSON(403, "Image deletion is restricted to private admin mode.");
    }
    if (!/^[a-zA-Z0-9_-]+\.(webp|png|jpe?g|gif)$/i.test(filename)) {
      return returnJSON(400, "Invalid image name");
    }
    try {
      let list = [];
      let matchedItem = null;
      try {
        const listStr = await kvGet(cfg, "stat/images_list");
        if (listStr) {
          list = JSON.parse(listStr);
          if (Array.isArray(list)) {
            matchedItem = list.find(item => item && item.filename === filename) || null;
          } else {
            list = [];
          }
        }
      } catch (e) {}

      const meta = await store.getMetadata(`images/${filename}`, { consistency: "strong" });
      if (meta || matchedItem) {
        let size = parseInt(meta?.headers?.["content-length"] || "0", 10) || 0;
        if (!size && matchedItem && matchedItem.size) {
          size = Number(matchedItem.size) || 0;
        }
        if (meta) {
          await store.delete(`images/${filename}`);
        }

        const nextList = list.filter(item => item && item.filename !== filename);
        try {
          await kvPut(cfg, "stat/images_list", JSON.stringify(nextList));
        } catch (e) {}

        const usageStr = await kvGet(cfg, "stat/images_usage_bytes");
        let currentUsage = Math.max(0, (parseInt(usageStr || "0", 10) || 0) - size);
        if (nextList.length === 0) currentUsage = 0;
        await kvPut(cfg, "stat/images_usage_bytes", String(currentUsage));

        return returnJSON(0, { freedBytes: size, remainingMB: (currentUsage / (1024 * 1024)).toFixed(2) });
      }
      return returnJSON(404, "Image not found");
    } catch (err) {
      return returnJSON(500, err.message);
    }
  }

  // 15. History Snapshots Management (Rolling 5 Snapshots)

  export async function handleHistoryList(cfg, request) {
    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "";
    if (!path) {
      return returnJSON(400, "Missing path parameter");
    }
    const authed = await checkNoteAuthOrAdmin(cfg, request, path);
    if (!authed) {
      return returnJSON(401, "Unauthorized");
    }
    try {
      const histKey = `hist/${encodeURIComponent(path)}`;
      let list = await kvGet(cfg, histKey, "json");
      if (!Array.isArray(list)) list = [];
      return returnJSON(0, list);
    } catch (err) {
      return returnJSON(500, "Failed to get history: " + err.message);
    }
  }

  export async function handleHistoryView(cfg, request) {
    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "";
    const id = url.searchParams.get("id") || "";
    if (!path || !id) {
      return returnJSON(400, "Missing path or id parameter");
    }
    const authed = await checkNoteAuthOrAdmin(cfg, request, path);
    if (!authed) {
      return returnJSON(401, "Unauthorized");
    }
    try {
      const blobKey = `history/${encodeURIComponent(path)}/${id}`;
      const snap = await store.get(blobKey, { type: "json", consistency: "strong" });
      if (!snap) {
        return returnJSON(404, "Snapshot not found");
      }
      return returnJSON(0, snap);
    } catch (err) {
      return returnJSON(500, "Failed to view snapshot: " + err.message);
    }
  }

  export async function handleHistoryRestore(cfg, request) {
    if (request.method !== "POST") {
      return returnJSON(405, "Method not allowed");
    }
    let body = {};
    try {
      body = await request.json();
    } catch(e) {}
    const { path, id } = body;
    if (!path || !id) {
      return returnJSON(400, "Missing path or id parameter");
    }
    const authed = await checkNoteAuthOrAdmin(cfg, request, path);
    if (!authed) {
      return returnJSON(401, "Unauthorized");
    }
    try {
      const blobKey = `history/${encodeURIComponent(path)}/${id}`;
      const snap = await store.get(blobKey, { type: "json", consistency: "strong" });
      if (!snap) {
        return returnJSON(404, "Snapshot not found");
      }
      return returnJSON(0, { content: snap.content });
    } catch (err) {
      return returnJSON(500, "Failed to restore snapshot: " + err.message);
    }
  }

  // 16. Note Rename / Move Folder (POST /api/notes/rename)
