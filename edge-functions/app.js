  let SALT, SECRET, LIST_SECRET, KV, ADMIN_PASSWORD;
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
  // 新增：用于记录错误次数的内存黑名单
  const ipFailMap = new Map(); 
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS({
    "node_modules/dayjs/dayjs.min.js"(exports, module) {
      !function(t, e2) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e2() : "function" == typeof define && define.amd ? define(e2) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e2();
      }(exports, function() {
        "use strict";
        var t = 1e3, e2 = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", $ = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, m = function(t2, e3, n2) {
          var r2 = String(t2);
          return !r2 || r2.length >= e3 ? t2 : "" + Array(e3 + 1 - r2.length).join(n2) + t2;
        }, g = { s: m, z: function(t2) {
          var e3 = -t2.utcOffset(), n2 = Math.abs(e3), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
          return (e3 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
        }, m: function t2(e3, n2) {
          if (e3.date() < n2.date())
            return -t2(n2, e3);
          var r2 = 12 * (n2.year() - e3.year()) + (n2.month() - e3.month()), i2 = e3.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e3.clone().add(r2 + (s2 ? -1 : 1), f);
          return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
        }, a: function(t2) {
          return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
        }, p: function(t2) {
          return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t2) {
          return void 0 === t2;
        } }, v = "en", D = {};
        D[v] = M;
        var p = function(t2) {
          return t2 instanceof _;
        }, S = function t2(e3, n2, r2) {
          var i2;
          if (!e3)
            return v;
          if ("string" == typeof e3) {
            var s2 = e3.toLowerCase();
            D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
            var u2 = e3.split("-");
            if (!i2 && u2.length > 1)
              return t2(u2[0]);
          } else {
            var a2 = e3.name;
            D[a2] = e3, i2 = a2;
          }
          return !r2 && i2 && (v = i2), i2 || !r2 && v;
        }, w = function(t2, e3) {
          if (p(t2))
            return t2.clone();
          var n2 = "object" == typeof e3 ? e3 : {};
          return n2.date = t2, n2.args = arguments, new _(n2);
        }, O = g;
        O.l = S, O.i = p, O.w = function(t2, e3) {
          return w(t2, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
        };
        var _ = function() {
          function M2(t2) {
            this.$L = S(t2.locale, null, true), this.parse(t2);
          }
          var m2 = M2.prototype;
          return m2.parse = function(t2) {
            this.$d = function(t3) {
              var e3 = t3.date, n2 = t3.utc;
              if (null === e3)
                return /* @__PURE__ */ new Date(NaN);
              if (O.u(e3))
                return /* @__PURE__ */ new Date();
              if (e3 instanceof Date)
                return new Date(e3);
              if ("string" == typeof e3 && !/Z$/i.test(e3)) {
                var r2 = e3.match(l);
                if (r2) {
                  var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                  return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                }
              }
              return new Date(e3);
            }(t2), this.$x = t2.x || {}, this.init();
          }, m2.init = function() {
            var t2 = this.$d;
            this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
          }, m2.$utils = function() {
            return O;
          }, m2.isValid = function() {
            return !(this.$d.toString() === $);
          }, m2.isSame = function(t2, e3) {
            var n2 = w(t2);
            return this.startOf(e3) <= n2 && n2 <= this.endOf(e3);
          }, m2.isAfter = function(t2, e3) {
            return w(t2) < this.startOf(e3);
          }, m2.isBefore = function(t2, e3) {
            return this.endOf(e3) < w(t2);
          }, m2.$g = function(t2, e3, n2) {
            return O.u(t2) ? this[e3] : this.set(n2, t2);
          }, m2.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m2.valueOf = function() {
            return this.$d.getTime();
          }, m2.startOf = function(t2, e3) {
            var n2 = this, r2 = !!O.u(e3) || e3, h2 = O.p(t2), $2 = function(t3, e4) {
              var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e4, t3) : new Date(n2.$y, e4, t3), n2);
              return r2 ? i2 : i2.endOf(a);
            }, l2 = function(t3, e4) {
              return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n2);
            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, g2 = "set" + (this.$u ? "UTC" : "");
            switch (h2) {
              case c:
                return r2 ? $2(1, 0) : $2(31, 11);
              case f:
                return r2 ? $2(1, M3) : $2(0, M3 + 1);
              case o:
                var v2 = this.$locale().weekStart || 0, D2 = (y2 < v2 ? y2 + 7 : y2) - v2;
                return $2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
              case a:
              case d:
                return l2(g2 + "Hours", 0);
              case u:
                return l2(g2 + "Minutes", 1);
              case s:
                return l2(g2 + "Seconds", 2);
              case i:
                return l2(g2 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m2.endOf = function(t2) {
            return this.startOf(t2, false);
          }, m2.$set = function(t2, e3) {
            var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), $2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], l2 = o2 === a ? this.$D + (e3 - this.$W) : e3;
            if (o2 === f || o2 === c) {
              var y2 = this.clone().set(d, 1);
              y2.$d[$2](l2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
            } else
              $2 && this.$d[$2](l2);
            return this.init(), this;
          }, m2.set = function(t2, e3) {
            return this.clone().$set(t2, e3);
          }, m2.get = function(t2) {
            return this[O.p(t2)]();
          }, m2.add = function(r2, h2) {
            var d2, $2 = this;
            r2 = Number(r2);
            var l2 = O.p(h2), y2 = function(t2) {
              var e3 = w($2);
              return O.w(e3.date(e3.date() + Math.round(t2 * r2)), $2);
            };
            if (l2 === f)
              return this.set(f, this.$M + r2);
            if (l2 === c)
              return this.set(c, this.$y + r2);
            if (l2 === a)
              return y2(1);
            if (l2 === o)
              return y2(7);
            var M3 = (d2 = {}, d2[s] = e2, d2[u] = n, d2[i] = t, d2)[l2] || 1, m3 = this.$d.getTime() + r2 * M3;
            return O.w(m3, this);
          }, m2.subtract = function(t2, e3) {
            return this.add(-1 * t2, e3);
          }, m2.format = function(t2) {
            var e3 = this, n2 = this.$locale();
            if (!this.isValid())
              return n2.invalidDate || $;
            var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
              return t3 && (t3[n3] || t3(e3, r2)) || i3[n3].slice(0, s3);
            }, c2 = function(t3) {
              return O.s(s2 % 12 || 12, t3, "0");
            }, d2 = n2.meridiem || function(t3, e4, n3) {
              var r3 = t3 < 12 ? "AM" : "PM";
              return n3 ? r3.toLowerCase() : r3;
            }, l2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
            return r2.replace(y, function(t3, e4) {
              return e4 || l2[t3] || i2.replace(":", "");
            });
          }, m2.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m2.diff = function(r2, d2, $2) {
            var l2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e2, g2 = this - M3, v2 = O.m(this, M3);
            return v2 = (l2 = {}, l2[c] = v2 / 12, l2[f] = v2, l2[h] = v2 / 3, l2[o] = (g2 - m3) / 6048e5, l2[a] = (g2 - m3) / 864e5, l2[u] = g2 / n, l2[s] = g2 / e2, l2[i] = g2 / t, l2)[y2] || g2, $2 ? v2 : O.a(v2);
          }, m2.daysInMonth = function() {
            return this.endOf(f).$D;
          }, m2.$locale = function() {
            return D[this.$L];
          }, m2.locale = function(t2, e3) {
            if (!t2)
              return this.$L;
            var n2 = this.clone(), r2 = S(t2, e3, true);
            return r2 && (n2.$L = r2), n2;
          }, m2.clone = function() {
            return O.w(this.$d, this);
          }, m2.toDate = function() {
            return new Date(this.valueOf());
          }, m2.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m2.toISOString = function() {
            return this.$d.toISOString();
          }, m2.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        }(), T = _.prototype;
        return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
          T[t2[1]] = function(e3) {
            return this.$g(e3, t2[0], t2[1]);
          };
        }), w.extend = function(t2, e3) {
          return t2.$i || (t2(e3, _, w), t2.$i = true), w;
        }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
          return w(1e3 * t2);
        }, w.en = D[v], w.Ls = D, w.p = {}, w;
      });
    }
  });

  // node_modules/cookie/index.js
  var require_cookie = __commonJS({
    "node_modules/cookie/index.js"(exports) {
      "use strict";
      exports.parse = parse;
      exports.serialize = serialize;
      var __toString = Object.prototype.toString;
      var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
      function parse(str, options) {
        if (typeof str !== "string") {
          throw new TypeError("argument str must be a string");
        }
        var obj = {};
        var opt = options || {};
        var dec = opt.decode || decode;
        var index = 0;
        while (index < str.length) {
          var eqIdx = str.indexOf("=", index);
          if (eqIdx === -1) {
            break;
          }
          var endIdx = str.indexOf(";", index);
          if (endIdx === -1) {
            endIdx = str.length;
          } else if (endIdx < eqIdx) {
            index = str.lastIndexOf(";", eqIdx - 1) + 1;
            continue;
          }
          var key = str.slice(index, eqIdx).trim();
          if (void 0 === obj[key]) {
            var val = str.slice(eqIdx + 1, endIdx).trim();
            if (val.charCodeAt(0) === 34) {
              val = val.slice(1, -1);
            }
            obj[key] = tryDecode(val, dec);
          }
          index = endIdx + 1;
        }
        return obj;
      }
      function serialize(name, val, options) {
        var opt = options || {};
        var enc = opt.encode || encode;
        if (typeof enc !== "function") {
          throw new TypeError("option encode is invalid");
        }
        if (!fieldContentRegExp.test(name)) {
          throw new TypeError("argument name is invalid");
        }
        var value = enc(val);
        if (value && !fieldContentRegExp.test(value)) {
          throw new TypeError("argument val is invalid");
        }
        var str = name + "=" + value;
        if (null != opt.maxAge) {
          var maxAge = opt.maxAge - 0;
          if (isNaN(maxAge) || !isFinite(maxAge)) {
            throw new TypeError("option maxAge is invalid");
          }
          str += "; Max-Age=" + Math.floor(maxAge);
        }
        if (opt.domain) {
          if (!fieldContentRegExp.test(opt.domain)) {
            throw new TypeError("option domain is invalid");
          }
          str += "; Domain=" + opt.domain;
        }
        if (opt.path) {
          if (!fieldContentRegExp.test(opt.path)) {
            throw new TypeError("option path is invalid");
          }
          str += "; Path=" + opt.path;
        }
        if (opt.expires) {
          var expires = opt.expires;
          if (!isDate(expires) || isNaN(expires.valueOf())) {
            throw new TypeError("option expires is invalid");
          }
          str += "; Expires=" + expires.toUTCString();
        }
        if (opt.httpOnly) {
          str += "; HttpOnly";
        }
        if (opt.secure) {
          str += "; Secure";
        }
        if (opt.priority) {
          var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
          switch (priority) {
            case "low":
              str += "; Priority=Low";
              break;
            case "medium":
              str += "; Priority=Medium";
              break;
            case "high":
              str += "; Priority=High";
              break;
            default:
              throw new TypeError("option priority is invalid");
          }
        }
        if (opt.sameSite) {
          var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
          switch (sameSite) {
            case true:
              str += "; SameSite=Strict";
              break;
            case "lax":
              str += "; SameSite=Lax";
              break;
            case "strict":
              str += "; SameSite=Strict";
              break;
            case "none":
              str += "; SameSite=None";
              break;
            default:
              throw new TypeError("option sameSite is invalid");
          }
        }
        return str;
      }
      function decode(str) {
        return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
      }
      function encode(val) {
        return encodeURIComponent(val);
      }
      function isDate(val) {
        return __toString.call(val) === "[object Date]" || val instanceof Date;
      }
      function tryDecode(str, decode2) {
        try {
          return decode2(str);
        } catch (e2) {
          return str;
        }
      }
    }
  });

  // node_modules/@tsndr/cloudflare-worker-jwt/index.js
  var require_cloudflare_worker_jwt = __commonJS({
    "node_modules/@tsndr/cloudflare-worker-jwt/index.js"(exports, module) {
      var Base64URL = class {
        static parse(s) {
          return new Uint8Array(Array.prototype.map.call(atob(s.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), (c) => c.charCodeAt(0)));
        }
        static stringify(a) {
          return btoa(String.fromCharCode.apply(0, a)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
        }
      };
      var JWT = class {
        constructor() {
          if (typeof crypto === "undefined" || !crypto.subtle)
            throw new Error("Crypto not supported!");
          this.algorithms = {
            ES256: { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } },
            ES384: { name: "ECDSA", namedCurve: "P-384", hash: { name: "SHA-384" } },
            ES512: { name: "ECDSA", namedCurve: "P-512", hash: { name: "SHA-512" } },
            HS256: { name: "HMAC", hash: "SHA-256" },
            HS384: { name: "HMAC", hash: { name: "SHA-384" } },
            HS512: { name: "HMAC", hash: { name: "SHA-512" } },
            RS256: { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } },
            RS384: { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-384" } },
            RS512: { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-512" } }
          };
        }
        _utf8ToUint8Array(str) {
          return Base64URL.parse(btoa(unescape(encodeURIComponent(str))));
        }
        _str2ab(str) {
          const buf = new ArrayBuffer(str.length);
          const bufView = new Uint8Array(buf);
          for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
          }
          return buf;
        }
        _decodePayload(raw) {
          switch (raw.length % 4) {
            case 0:
              break;
            case 2:
              raw += "==";
              break;
            case 3:
              raw += "=";
              break;
            default:
              throw new Error("Illegal base64url string!");
          }
          try {
            return JSON.parse(decodeURIComponent(escape(atob(raw))));
          } catch {
            return null;
          }
        }
        async sign(payload, secret, options = { algorithm: "HS256" }) {
          if (typeof options === "string")
            options = { algorithm: options };
          if (payload === null || typeof payload !== "object")
            throw new Error("payload must be an object");
          if (typeof secret !== "string")
            throw new Error("secret must be a string");
          if (typeof options.algorithm !== "string")
            throw new Error("options.algorithm must be a string");
          const importAlgorithm = this.algorithms[options.algorithm];
          if (!importAlgorithm)
            throw new Error("algorithm not found");
          payload.iat = Math.floor(Date.now() / 1e3);
          const payloadAsJSON = JSON.stringify(payload);
          const partialToken = `${Base64URL.stringify(this._utf8ToUint8Array(JSON.stringify({ alg: options.algorithm, kid: options.keyid })))}.${Base64URL.stringify(this._utf8ToUint8Array(payloadAsJSON))}`;
          let keyFormat = "raw";
          let keyData;
          if (secret.startsWith("-----BEGIN")) {
            keyFormat = "pkcs8";
            keyData = this._str2ab(atob(secret.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "")));
          } else
            keyData = this._utf8ToUint8Array(secret);
          const key = await crypto.subtle.importKey(keyFormat, keyData, importAlgorithm, false, ["sign"]);
          const signature = await crypto.subtle.sign(importAlgorithm, key, this._utf8ToUint8Array(partialToken));
          return `${partialToken}.${Base64URL.stringify(new Uint8Array(signature))}`;
        }
        async verify(token, secret, options = { algorithm: "HS256" }) {
          if (typeof options === "string")
            options = { algorithm: options };
          if (typeof token !== "string")
            throw new Error("token must be a string");
          if (typeof secret !== "string")
            throw new Error("secret must be a string");
          if (typeof options.algorithm !== "string")
            throw new Error("options.algorithm must be a string");
          const tokenParts = token.split(".");
          if (tokenParts.length !== 3)
            throw new Error("token must consist of 3 parts");
          const importAlgorithm = this.algorithms[options.algorithm];
          if (!importAlgorithm)
            throw new Error("algorithm not found");
          const payload = this.decode(token);
          if (payload.nbf && payload.nbf > Math.floor(Date.now() / 1e3))
            return false;
          if (payload.exp && payload.exp <= Math.floor(Date.now() / 1e3))
            return false;
          let keyFormat = "raw";
          let keyData;
          if (secret.startsWith("-----BEGIN")) {
            keyFormat = "pkcs8";
            keyData = this._str2ab(atob(secret.replace(/-----BEGIN.*?-----/g, "").replace(/-----END.*?-----/g, "").replace(/\s/g, "")));
          } else
            keyData = this._utf8ToUint8Array(secret);
          const key = await crypto.subtle.importKey(keyFormat, keyData, importAlgorithm, false, ["sign"]);
          const res = await crypto.subtle.sign(importAlgorithm, key, this._utf8ToUint8Array(tokenParts.slice(0, 2).join(".")));
          return Base64URL.stringify(new Uint8Array(res)) === tokenParts[2];
        }
        decode(token) {
          return this._decodePayload(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"));
        }
      };
      module.exports = new JWT();
    }
  });

  // node_modules/dayjs/plugin/relativeTime.js
  var require_relativeTime = __commonJS({
    "node_modules/dayjs/plugin/relativeTime.js"(exports, module) {
      !function(r, e2) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e2() : "function" == typeof define && define.amd ? define(e2) : (r = "undefined" != typeof globalThis ? globalThis : r || self).dayjs_plugin_relativeTime = e2();
      }(exports, function() {
        "use strict";
        return function(r, e2, t) {
          r = r || {};
          var n = e2.prototype, o = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
          function i(r2, e3, t2, o2) {
            return n.fromToBase(r2, e3, t2, o2);
          }
          t.en.relativeTime = o, n.fromToBase = function(e3, n2, i2, d2, u) {
            for (var f, a, s, l = i2.$locale().relativeTime || o, h = r.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], m = h.length, c = 0; c < m; c += 1) {
              var y = h[c];
              y.d && (f = d2 ? t(e3).diff(i2, y.d, true) : i2.diff(e3, y.d, true));
              var p = (r.rounding || Math.round)(Math.abs(f));
              if (s = f > 0, p <= y.r || !y.r) {
                p <= 1 && c > 0 && (y = h[c - 1]);
                var v = l[y.l];
                u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n2, y.l, s);
                break;
              }
            }
            if (n2)
              return a;
            var M = s ? l.future : l.past;
            return "function" == typeof M ? M(a) : M.replace("%s", a);
          }, n.to = function(r2, e3) {
            return i(r2, e3, this, true);
          }, n.from = function(r2, e3) {
            return i(r2, e3, this);
          };
          var d = function(r2) {
            return r2.$u ? t.utc() : t();
          };
          n.toNow = function(r2) {
            return this.to(d(this), r2);
          }, n.fromNow = function(r2) {
            return this.from(d(this), r2);
          };
        };
      });
    }
  });

  // src/index.js
  var import_dayjs2 = __toESM(require_dayjs_min());

  // node_modules/itty-router/dist/itty-router.min.mjs
  function e({ base: t = "", routes: n = [] } = {}) {
    return { __proto__: new Proxy({}, { get: (e2, a, o) => (e3, ...r) => n.push([a.toUpperCase(), RegExp(`^${(t + e3).replace(/(\/?)\*/g, "($1.*)?").replace(/\/$/, "").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.").replace(/\)\.\?\(([^\\[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`), r]) && o }), routes: n, async handle(e2, ...r) {
      let a, o, t2 = new URL(e2.url);
      e2.query = {}; if (t2.searchParams && t2.searchParams.forEach) { t2.searchParams.forEach((v, k) => { e2.query[k] = v; }); }
      for (var [p, s, u] of n)
        if ((p === e2.method || "ALL" === p) && (o = t2.pathname.match(s))) {
          e2.params = o.groups;
          for (var c of u)
            if (void 0 !== (a = await c(e2.proxy || e2, ...r)))
              return a;
        }
    } };
  }
  // src/index.js
  var import_cookie = __toESM(require_cookie());
  var import_cloudflare_worker_jwt2 = __toESM(require_cloudflare_worker_jwt());

  // src/helper.js
  var import_cloudflare_worker_jwt = __toESM(require_cloudflare_worker_jwt());

  // src/template.js
  var template_exports = {};
  __export(template_exports, {
    Edit: () => Edit,
    NeedPasswd: () => NeedPasswd,
    Page404: () => Page404,
    Share: () => Share,
    AdminLogin: () => AdminLogin,
    NeedSharePasswd: () => NeedSharePasswd
  });
  var import_dayjs = __toESM(require_dayjs_min());
  var import_relativeTime = __toESM(require_relativeTime());
  try {
    if (import_dayjs?.default?.extend && import_relativeTime?.default) {
      import_dayjs.default.extend(import_relativeTime.default);
    }
  } catch (e) {
    console.error("dayjs extend error:", e);
  }

  // src/constant.js
  var CDN_PREFIX = "//gcore.jsdelivr.net/gh/s0urcelab/serverless-cloud-notepad@master/static";
  var SUPPORTED_LANG = {
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
      lastModified: "Last Modified",
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
      linesCount: "lines"
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
      lastModified: "上次保存",
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
      sharePwLabel: "访问提取码 (可选)",
      sharePwPh: "留空即公开只读，填写即需要密码",
      saveShare: "保存并生成链接",
      disableShare: "关闭分享",
      shareUrlLabel: "分享链接",
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
      linesCount: "行"
    }
  };

  var SWITCHER = (text, open, className = "") => `
<span class="opt-desc">${text}</span>
<label class="opt-switcher ${className}">
  <input type="checkbox" ${open ? "checked" : ""}>
  <span class="slider round"></span>
</label>
`;
  var FOOTER = ({ lang, isEdit, updateAt, pw, mode, share, isPrivateMode, path }) => `
    <div class="footer">
        ${isEdit ? `
            <div class="opt">
                ${!isPrivateMode ? `<button class="opt-button opt-pw">${pw ? SUPPORTED_LANG[lang].changePW : SUPPORTED_LANG[lang].setPW}</button>` : ""}
                ${SWITCHER("Markdown", mode === "md", "opt-mode")}
                <button class="opt-button opt-share-trigger" style="margin-left:6px;">${SUPPORTED_LANG[lang].share}</button>
                <button id="opt-img-btn" class="opt-button" style="margin-left:6px;" title="${SUPPORTED_LANG[lang].imgMgrTitle} (200MB)">${SUPPORTED_LANG[lang].imgMgr}</button>
                <button id="opt-hist-btn" class="opt-button" style="margin-left:6px;" title="${SUPPORTED_LANG[lang].historyTitle}">${SUPPORTED_LANG[lang].history}</button>
                <input type="file" id="img-upload-input" accept="image/*" multiple style="display:none;" />
            </div>
            ` : ""}
        <div style="display:flex; align-items:center; gap:12px; margin-left:auto;">
            <span id="status-word-count" style="font-size:12px; color:#57606a; white-space:nowrap; user-select:none;">${SUPPORTED_LANG[lang].wordsCount}: 0 · ${SUPPORTED_LANG[lang].charsCount}: 0 · 0 ${SUPPORTED_LANG[lang].linesCount}</span>
            <a class="github-link" title="Github" target="_blank" href="https://github.com/kafuneri/edgeone-cloud-notepad" rel="noreferrer">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="github" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>
            </a>
            ${updateAt ? `<span class="last-modified">${SUPPORTED_LANG[lang].lastModified} ${import_dayjs.default.unix(updateAt).fromNow()}</span>` : ""}
        </div>
    </div>
`;
var MODAL = (lang, ext = {}) => `
<div class="modal share-modal">
    <div class="modal-mask"></div>
    <div class="modal-content" style="max-width: 440px; padding: 24px; box-sizing: border-box; border-radius: 8px;">
        <span class="close-btn">✕</span>
        <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #1f2328; font-weight: 600;">${SUPPORTED_LANG[lang].shareTitle}</h3>
        
        <div style="margin-bottom: 14px; text-align: left;">
          <label style="display: block; font-size: 12px; color: #57606a; margin-bottom: 5px; font-weight: 500;">${SUPPORTED_LANG[lang].shareSlugLabel}</label>
          <div style="display: flex; align-items: center;">
            <span style="font-size: 13px; color: #6e7781; background: #f6f8fa; padding: 7px 10px; border: 1px solid #d0d7de; border-right: none; border-radius: 6px 0 0 6px;">/share/</span>
            <input type="text" id="share-custom-slug" value="${ext.shareSlug || ""}" placeholder="自定义短链后缀" style="flex: 1; padding: 7px 10px; border: 1px solid #d0d7de; border-radius: 0 6px 6px 0; font-size: 13px; outline: none;" />
          </div>
        </div>

        <div style="margin-bottom: 16px; text-align: left;">
          <label style="display: block; font-size: 12px; color: #57606a; margin-bottom: 5px; font-weight: 500;">${SUPPORTED_LANG[lang].sharePwLabel}</label>
          <input type="password" id="share-custom-pw" placeholder="${SUPPORTED_LANG[lang].sharePwPh}" style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid #d0d7de; border-radius: 6px; font-size: 13px; outline: none;" />
        </div>

        <div style="display: flex; gap: 8px; margin-bottom: 14px;">
          <button id="save-share-btn" class="opt-button" style="flex: 1; background: #2da44e; color: #fff; border-color: #2da44e; padding: 7px 14px; font-weight: 600;">${SUPPORTED_LANG[lang].saveShare}</button>
          <button id="disable-share-btn" class="opt-button" style="color: #cf222e; border-color: #d0d7de; padding: 7px 12px;">${SUPPORTED_LANG[lang].disableShare}</button>
        </div>

        <div id="share-link-box" style="display: ${ext.share ? "block" : "none"}; padding-top: 12px; border-top: 1px solid #eaecef; text-align: left;">
          <label style="display: block; font-size: 12px; color: #57606a; margin-bottom: 5px; font-weight: 500;">${SUPPORTED_LANG[lang].shareUrlLabel}</label>
          <div style="display: flex; gap: 6px;">
            <input type="text" id="share-final-url" readonly value="" style="flex: 1; padding: 6px 10px; font-size: 12px; background: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; outline: none;" />
            <button class="opt-button" id="copy-share-btn" style="white-space: nowrap;">${SUPPORTED_LANG[lang].copy}</button>
          </div>
        </div>
    </div>
</div>
`;
var IMAGE_MODAL = (lang) => `
<div class="modal image-modal" id="image-mgr-modal" style="display:none; position:fixed; inset:0; z-index:1000; align-items:center; justify-content:center;">
    <div class="modal-mask" id="image-mgr-mask" style="position:fixed; inset:0; background:rgba(0,0,0,0.5); backdrop-filter:blur(2px);"></div>
    <div class="modal-content" style="position:relative; z-index:1001; max-width:680px; width:92vw; max-height:85vh; padding:20px 24px; box-sizing:border-box; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; background:#fff; box-shadow:0 8px 32px rgba(0,0,0,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e1e4e8; padding-bottom:12px; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="margin:0; font-size:16px; color:#1f2328; font-weight:600;">${SUPPORTED_LANG[lang].imgMgrTitle || "图片管理"}</h3>
                <span id="img-mgr-quota-badge" style="font-size:11px; padding:2px 8px; border-radius:10px; background:#f0f6fc; color:#0969da; border:1px solid #d0d7de;">0.00MB / 200MB</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
                <button id="img-mgr-upload-btn" class="opt-button" style="background:#2da44e; color:#fff; border-color:#2da44e; padding:4px 12px; font-size:12px; font-weight:500; cursor:pointer;">${SUPPORTED_LANG[lang].uploadNewImg || "+ 上传图片"}</button>
                <span class="close-btn" id="image-mgr-close" style="cursor:pointer; font-size:18px; color:#57606a; padding:2px 6px;">✕</span>
            </div>
        </div>
        <div id="img-mgr-progress-wrap" style="height:3px; background:#eaecef; border-radius:2px; margin-bottom:10px; overflow:hidden; display:none;">
            <div id="img-mgr-progress-bar" style="height:100%; width:0%; background:#2da44e; transition:width 0.3s ease;"></div>
        </div>
        <div id="img-mgr-grid" style="flex:1; overflow-y:auto; display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr)); gap:12px; padding:4px 2px; min-height:180px; max-height:55vh;">
            <!-- Rendered by JS -->
        </div>
        <div id="img-mgr-empty" style="display:none; flex-direction:column; align-items:center; justify-content:center; padding:50px 0; color:#8c959f; font-size:13px;">
            <div style="font-size:14px; margin-bottom:8px; color:#8c959f;">(暂无图片)</div>
            <div>${SUPPORTED_LANG[lang].noImages || "暂无上传的图片"}</div>
            <div style="font-size:12px; color:#afb8c1; margin-top:4px;">可在编辑区直接粘贴截屏 (Ctrl+V) 或点击右上角上传</div>
        </div>
    </div>
</div>
`;
var HISTORY_MODAL = (lang) => `
<div class="modal history-modal" id="history-mgr-modal" style="display:none; position:fixed; inset:0; z-index:1000; align-items:center; justify-content:center;">
    <div class="modal-mask" id="history-mgr-mask" style="position:fixed; inset:0; background:rgba(0,0,0,0.5); backdrop-filter:blur(2px);"></div>
    <div class="modal-content" style="position:relative; z-index:1001; max-width:720px; width:92vw; max-height:85vh; padding:20px 24px; box-sizing:border-box; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; background:#fff; box-shadow:0 8px 32px rgba(0,0,0,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e1e4e8; padding-bottom:12px; margin-bottom:12px;">
            <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="margin:0; font-size:16px; color:#1f2328; font-weight:600;">${SUPPORTED_LANG[lang].historyTitle || "历史版本快照"}</h3>
                <span id="history-mgr-badge" style="font-size:11px; padding:2px 8px; border-radius:10px; background:#f0f6fc; color:#0969da; border:1px solid #d0d7de;">${SUPPORTED_LANG[lang].historyLimit || "滚动保留 5 个版本"}</span>
            </div>
            <span class="close-btn" id="history-mgr-close" style="cursor:pointer; font-size:18px; color:#57606a; padding:2px 6px;">✕</span>
        </div>
        <div id="history-mgr-body" style="flex:1; display:flex; gap:14px; min-height:260px; max-height:55vh; overflow:hidden;">
            <div id="history-items-list" style="width:230px; border-right:1px solid #eaecef; padding-right:10px; overflow-y:auto; display:flex; flex-direction:column; gap:6px;">
            </div>
            <div id="history-preview-panel" style="flex:1; display:flex; flex-direction:column; overflow:hidden;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span id="history-preview-title" style="font-size:12px; color:#57606a; font-weight:500;">选择版本查看内容</span>
                    <button id="history-apply-btn" class="opt-button" style="display:none; background:#2da44e; color:#fff; border-color:#2da44e; padding:3px 12px; font-size:12px; font-weight:500; cursor:pointer;">${SUPPORTED_LANG[lang].restoreToThis || "恢复到此版本"}</button>
                </div>
                <textarea id="history-preview-box" readonly style="flex:1; width:100%; box-sizing:border-box; border:1px solid #d0d7de; border-radius:6px; padding:10px; font-family:monospace; font-size:12px; background:#f6f8fa; resize:none; outline:none; white-space:pre-wrap; color:#24292f;"></textarea>
            </div>
        </div>
        <div id="history-mgr-empty" style="display:none; flex-direction:column; align-items:center; justify-content:center; padding:45px 0; color:#8c959f; font-size:13px;">
            <div style="font-size:14px; margin-bottom:6px; color:#57606a;">${SUPPORTED_LANG[lang].historyEmpty || "当前笔记暂无历史快照"}</div>
            <div style="font-size:12px; color:#afb8c1;">保存内容变动后将自动记录（间隔至少 1 分钟）</div>
        </div>
    </div>
</div>
`;
var LIGHTBOX = () => `
<div id="img-lightbox" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:99999; align-items:center; justify-content:center; cursor:zoom-out; backdrop-filter:blur(4px); transition:opacity 0.2s ease;">
    <img id="lightbox-img" src="" style="max-width:92vw; max-height:92vh; object-fit:contain; border-radius:6px; box-shadow:0 8px 32px rgba(0,0,0,0.6);" />
    <span style="position:fixed; top:20px; right:25px; color:#fff; font-size:26px; cursor:pointer; opacity:0.8; user-select:none;">✕</span>
</div>
`;
var HTML = ({ lang, title, content, ext = {}, tips, isEdit, showPwPrompt, isPrivateMode }) => {
    const isMdMode = ext.mode === "md";
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} — Cloud Notepad</title>
    <link href="${CDN_PREFIX}/favicon.ico" rel="shortcut icon" type="image/ico" />
    <link href="${CDN_PREFIX}/css/app.min.css" rel="stylesheet" media="screen" />
    ${isEdit && isMdMode ? `<link href="//gcore.jsdelivr.net/npm/vditor@3.10.8/dist/index.css" rel="stylesheet" />` : ""}
    <style>
      /* Markdown view styling */
      #preview-md {
        line-height: 1.7;
        color: #24292f;
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
        color: #1f2328;
      }
      #preview-md h1 { font-size: 1.85em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
      #preview-md h2 { font-size: 1.45em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
      #preview-md h3 { font-size: 1.2em; }
      #preview-md p { margin: 0 0 14px 0; }
      #preview-md blockquote {
        margin: 0 0 16px;
        padding: 4px 14px;
        color: #57606a;
        border-left: 4px solid #0969da;
        background: #f6f8fa;
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
        background-color: rgba(175, 184, 193, 0.2);
        border-radius: 6px;
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
      }
      #preview-md pre {
        padding: 14px;
        overflow-x: auto;
        font-size: 88%;
        line-height: 1.45;
        background-color: #f6f8fa;
        border: 1px solid #d0d7de;
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
        border: 1px solid #d0d7de;
      }
      #preview-md table th {
        background-color: #f6f8fa;
        font-weight: 600;
      }
      #preview-md table tr:nth-child(2n) {
        background-color: #fcfdfe;
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
        background-color: #d0d7de;
        border: 0;
      }
      #preview-md a {
        color: #0969da;
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
        padding: 0 10px !important;
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: 15px !important;
        line-height: 1.7 !important;
        color: #3a3b3c !important;
        background: transparent !important;
      }

      /* Sidebar toggle button (top-left minimalist trigger) */
      .sidebar-toggle-btn {
        position: fixed;
        top: 14px;
        left: 14px;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #d0d7de;
        color: #57606a;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 100;
        transition: all 0.2s ease;
        box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        font-size: 16px;
      }
      .sidebar-toggle-btn:hover {
        background: #ffffff;
        color: #1f2328;
        border-color: #8c959f;
        box-shadow: 0 2px 6px rgba(0,0,0,0.12);
      }

      /* Sidebar overlay */
      .sidebar-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.35);
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
        background: #ffffff;
        border-right: 1px solid #e1e4e8;
        z-index: 999;
        transform: translateX(-100%);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);
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
        border-bottom: 1px solid #eaecef;
      }
      .sidebar-brand {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        font-size: 15px;
        color: #24292f;
      }
      .sidebar-close-btn {
        background: none;
        border: none;
        color: #6a737d;
        cursor: pointer;
        font-size: 16px;
        padding: 4px 8px;
        border-radius: 4px;
      }
      .sidebar-close-btn:hover { background: #eaecef; color: #24292f; }

      /* Sidebar search and actions */
      .sidebar-actions {
        padding: 12px 14px;
        display: flex;
        gap: 8px;
        border-bottom: 1px solid #f0f2f5;
      }
      .sidebar-search-input {
        flex: 1;
        padding: 6px 10px;
        font-size: 13px;
        border: 1px solid #d1d5da;
        border-radius: 5px;
        outline: none;
        background: #fbfcfd;
      }
      .sidebar-search-input:focus {
        border-color: #0969da;
        background: #fff;
      }
      .sidebar-new-btn {
        padding: 6px 12px;
        background: #2da44e;
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
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
        color: #444d56;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
      }
      .tree-folder-title:hover {
        background: #f1f3f5;
      }
      .tree-folder-arrow {
        display: inline-block;
        width: 14px;
        font-size: 10px;
        transition: transform 0.15s ease;
        color: #8c959f;
      }
      .tree-folder.collapsed .tree-folder-arrow {
        transform: rotate(-90deg);
      }
      .tree-folder.collapsed .tree-folder-content {
        display: none;
      }
      .tree-folder-content {
        padding-left: 14px;
        border-left: 1px solid #e1e4e8;
        margin-left: 8px;
      }
      .tree-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
        font-size: 13px;
        color: #24292f;
        border-radius: 4px;
        cursor: pointer;
        text-decoration: none;
        position: relative;
      }
      .tree-item:hover {
        background: #eef1f4;
      }
      .tree-item.active {
        background: #e1e7ed;
        font-weight: 600;
        color: #0969da;
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
      .tree-item-del-btn {
        background: none;
        border: none;
        color: #cf222e;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 12px;
      }
      .tree-item-del-btn:hover {
        background: #ffebe9;
      }

      /* Sidebar footer */
      .sidebar-footer {
        padding: 12px 16px;
        border-top: 1px solid #eaecef;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        color: #57606a;
        background: #fafbfc;
      }
      .sidebar-logout-btn {
        background: none;
        border: none;
        color: #cf222e;
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
        display: block !important;
        padding: 24px 28px !important;
        box-sizing: border-box !important;
        background: #ffffff !important;
        border-radius: 12px !important;
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22) !important;
        z-index: 1000 !important;
      }
      .image-modal .modal-content, .history-modal .modal-content {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        bottom: auto !important;
        right: auto !important;
        transform: translate(-50%, -50%) !important;
        margin: 0 !important;
        width: 90% !important;
        max-width: 720px !important;
        height: auto !important;
        min-height: 320px !important;
        max-height: 85vh !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: flex-start !important;
        align-items: stretch !important;
        padding: 20px 24px !important;
        box-sizing: border-box !important;
        background: #ffffff !important;
        border-radius: 12px !important;
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22) !important;
        z-index: 1002 !important;
        overflow: hidden !important;
      }
      .footer {
        flex-wrap: wrap !important;
        height: auto !important;
        min-height: 28px !important;
        gap: 6px !important;
      }
      .footer .opt {
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        gap: 6px !important;
      }
    </style>
</head>
<body>
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
        <button id="sidebar-new-btn" class="sidebar-new-btn">+ ${SUPPORTED_LANG[lang].newNote}</button>
      </div>
      <div class="sidebar-tree" id="sidebar-tree">
        <div style="padding:16px;color:#8c959f;text-align:center;">${SUPPORTED_LANG[lang].searchNotes}</div>
      </div>
      <div class="sidebar-footer">
        <div style="display:flex; flex-direction:column; gap:2px; text-align:left;">
          <span>${isPrivateMode ? SUPPORTED_LANG[lang].privateVault : SUPPORTED_LANG[lang].publicVault}</span>
          <div style="display:flex; align-items:center; gap:6px;">
            <span id="sidebar-img-quota" style="font-size:11px; color:#8c959f;">配额: 200MB</span>
            <a href="javascript:void(0)" id="sidebar-open-img-mgr" style="font-size:11px; color:#0969da; text-decoration:none; cursor:pointer;">[管理]</a>
          </div>
        </div>
        ${isPrivateMode ? `<button id="sidebar-logout-btn" class="sidebar-logout-btn">${SUPPORTED_LANG[lang].logout}</button>` : ""}
      </div>
    </div>

    <div class="note-container">
        <div class="stack">
            <div class="layer_1">
                <div class="layer_2">
                    <div class="layer_3">
                        ${tips ? `<div class="tips">${tips}</div>` : ""}
                        <div id="draft-alert" style="display:none; margin-bottom:12px; padding:8px 12px; background:#fff8c5; border:1px solid #d4a72c; border-radius:6px; font-size:12px; color:#573a08; align-items:center; justify-content:space-between; box-shadow:0 1px 3px rgba(0,0,0,0.05); z-index:10; position:relative;">
                            <span id="draft-alert-msg">${SUPPORTED_LANG[lang].draftDetected || "检测到本地未保存草稿"}</span>
                            <div style="display:flex; gap:8px;">
                                <button id="draft-restore-btn" type="button" class="opt-button" style="background:#2da44e; color:#fff; border-color:#2da44e; padding:2px 10px; font-size:12px; font-weight:500; cursor:pointer;">${SUPPORTED_LANG[lang].restoreDraft || "恢复草稿"}</button>
                                <button id="draft-discard-btn" type="button" class="opt-button" style="padding:2px 8px; font-size:12px; cursor:pointer;">${SUPPORTED_LANG[lang].discardDraft || "放弃"}</button>
                            </div>
                        </div>
                        <textarea id="contents" class="contents full-width ${isEdit && !isMdMode ? "" : "hide"}" spellcheck="true" placeholder="${SUPPORTED_LANG[lang].emptyPH}">${content}</textarea>
                        ${isEdit && isMdMode ? `<div id="vditor" class="contents full-width"></div>` : ""}
                        ${!isEdit && isMdMode ? `<div id="preview-md" class="contents full-width"></div>` : ""}
                        ${!isEdit && !isMdMode ? `<div id="preview-plain" class="contents full-width"></div>` : ""}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="loading"></div>
    ${MODAL(lang, ext)}
    ${IMAGE_MODAL(lang)}
    ${HISTORY_MODAL(lang)}
    ${LIGHTBOX()}
    ${FOOTER({ ...ext, isEdit, lang, isPrivateMode, path: title })}
    ${isEdit && isMdMode ? `<script src="//gcore.jsdelivr.net/npm/vditor@3.10.8/dist/index.min.js"><\/script>` : ""}
    ${!isEdit && isMdMode || ext.share ? `<script src="${CDN_PREFIX}/js/purify.min.js"><\/script>` : ""}
    ${!isEdit && isMdMode ? `<script src="${CDN_PREFIX}/js/marked.min.js"><\/script>` : ""}
    <script src="${CDN_PREFIX}/js/clip.min.js"><\/script>
    <script src="${CDN_PREFIX}/js/app.min.js"><\/script>
    ${showPwPrompt ? "<script>passwdPrompt()<\/script>" : ""}

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
              const clean = name.trim().replace(new RegExp('^/+', 'g'), '');
              window.location.href = "/" + clean;
            }
          };
        }

        async function loadNotes() {
          try {
            fetch("/api/quota").then(r => r.json()).then(q => {
              if (q.err === 0 && q.data) {
                const qEl = document.getElementById("sidebar-img-quota");
                if (qEl) qEl.textContent = "图片: " + q.data.usedMB + "MB / 200MB";
              }
            }).catch(() => {});

            const res = await fetch("/api/notes");
            const data = await res.json();
            if (data.err === 0 && Array.isArray(data.data)) {
              allNotes = data.data;
              renderTree(allNotes);
            } else {
              treeContainer.innerHTML = '<div style="color:#cf222e;padding:16px;text-align:center;">' + (data.msg || "加载失败") + '</div>';
            }
          } catch (e) {
            treeContainer.innerHTML = '<div style="color:#cf222e;padding:16px;text-align:center;">网络错误</div>';
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
            treeContainer.innerHTML = '<div style="color:#8c959f;padding:16px;text-align:center;">${SUPPORTED_LANG[lang].noNotes}</div>';
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
              html += '    <span>' + folder.name + '</span>';
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
              html += '  <a class="tree-item-text" href="/' + encodeURI(note.path) + '" title="' + note.path + '">';
              if (note.share) {
                html += '    <svg class="tree-icon" viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>';
              } else {
                html += '    <svg class="tree-icon" viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm7.75 3.25V2.06l2.44 2.44Z"></path></svg>';
              }
              html += displayName;
              html += '  </a>';
              html += '  <div class="tree-item-actions">';
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

        window.deleteNote = async function(encodedPath, e) {
          if (e) e.stopPropagation();
          const path = decodeURIComponent(encodedPath);
          const confirmMsg = "${lang === 'zh' ? '确定要永久删除笔记【' : 'Permanently delete note: '}" + path + "${lang === 'zh' ? '】吗？此操作无法撤销！' : '?' }";
          if (!confirm(confirmMsg)) return;

          try {
            const res = await fetch("/" + encodeURI(path) + "/delete", { method: "POST" });
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

        // --- 2. Share Modal Logic ---
        const shareModal = document.querySelector(".share-modal");
        const shareTriggerBtn = document.querySelector(".opt-share-trigger");
        const shareCloseBtn = document.querySelector(".share-modal .close-btn");
        const saveShareBtn = document.querySelector("#save-share-btn");
        const disableShareBtn = document.querySelector("#disable-share-btn");
        const copyShareBtn = document.querySelector("#copy-share-btn");
        const shareCustomSlug = document.querySelector("#share-custom-slug");
        const shareCustomPw = document.querySelector("#share-custom-pw");
        const shareFinalUrl = document.querySelector("#share-final-url");
        const shareLinkBox = document.querySelector("#share-link-box");

        function openShareModal() {
          if (shareModal) {
            shareModal.style.display = "block";
            const currentSlug = shareCustomSlug.value.trim() || "${ext.shareSlug || ""}";
            if (currentSlug) {
              shareFinalUrl.value = window.location.origin + "/share/" + currentSlug;
              shareLinkBox.style.display = "block";
            }
          }
        }

        function closeShareModal() {
          if (shareModal) shareModal.style.display = "none";
        }

        if (shareTriggerBtn) shareTriggerBtn.onclick = openShareModal;
        if (shareCloseBtn) shareCloseBtn.onclick = closeShareModal;
        if (shareModal) {
          const mask = shareModal.querySelector(".modal-mask");
          if (mask) mask.onclick = closeShareModal;
        }

        if (saveShareBtn) {
          saveShareBtn.onclick = async function() {
            const slug = shareCustomSlug.value.trim();
            const pw = shareCustomPw.value.trim();
            saveShareBtn.innerText = "保存中...";
            try {
              const res = await fetch(window.location.pathname + "/setting", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  share: true,
                  shareSlug: slug,
                  sharePw: pw
                })
              });
              const data = await res.json();
              saveShareBtn.innerText = "${SUPPORTED_LANG[lang].saveShare}";
              if (data.err === 0) {
                const finalSlug = (data.data && data.data.slug) || slug;
                shareCustomSlug.value = finalSlug;
                shareFinalUrl.value = window.location.origin + "/share/" + finalSlug;
                shareLinkBox.style.display = "block";
                alert("${lang === 'zh' ? '分享链接已生成！' : 'Share link generated!'}");
              } else {
                alert(data.msg || "分享失败");
              }
            } catch (err) {
              saveShareBtn.innerText = "${SUPPORTED_LANG[lang].saveShare}";
              alert("请求异常: " + err.message);
            }
          };
        }

        if (disableShareBtn) {
          disableShareBtn.onclick = async function() {
            if (!confirm("${lang === 'zh' ? '确定要关闭此笔记的对外分享吗？' : 'Disable share for this note?'}")) return;
            try {
              const res = await fetch(window.location.pathname + "/setting", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ share: false })
              });
              const data = await res.json();
              if (data.err === 0) {
                shareLinkBox.style.display = "none";
                shareCustomSlug.value = "";
                shareCustomPw.value = "";
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

        if (copyShareBtn) {
          copyShareBtn.onclick = function() {
            if (shareFinalUrl && shareFinalUrl.value) {
              navigator.clipboard.writeText(shareFinalUrl.value).then(() => {
                alert("${SUPPORTED_LANG[lang].copy}!");
              }).catch(() => {
                shareFinalUrl.select();
                document.execCommand("copy");
                alert("${SUPPORTED_LANG[lang].copy}!");
              });
            }
          };
        }
      })();
    </script>

    ${isEdit ? `
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
            toast.style.cssText = "position:fixed;bottom:65px;right:24px;background:#1f2328;color:#fff;padding:8px 16px;border-radius:6px;font-size:12px;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.18);transition:all 0.2s;";
            document.body.appendChild(toast);
          }
          toast.textContent = text;
          toast.style.background = "#1f2328";
          toast.style.opacity = "1";
          return {
            update: function(msg) { toast.textContent = msg; },
            done: function(msg, isErr) {
              toast.textContent = msg;
              if (isErr) toast.style.background = "#cf222e";
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
          grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:30px;color:#8c959f;">加载中...</div>';
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
                sidebarQuota.textContent = "图片: " + quota.usedMB + "MB / 200MB";
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
                  '<div class="img-card" id="img-card-' + safeName + '" style="border: 1px solid #e1e4e8; border-radius: 8px; overflow: hidden; background: #f6f8fa; display: flex; flex-direction: column;">',
                    '<div class="img-preview-box" data-url="' + item.url + '" style="width: 100%; height: 110px; background-image: repeating-conic-gradient(#f0f0f0 0% 25%, #fff 0% 50%) 50% / 16px 16px; display: flex; align-items: center; justify-content: center; cursor: pointer; overflow: hidden;" title="点击插入到笔记">',
                      '<img src="' + item.url + '" style="max-width: 100%; max-height: 100%; object-fit: contain; pointer-events: none;" loading="lazy" />',
                    '</div>',
                    '<div style="padding: 6px 8px; background: #fff; border-top: 1px solid #e1e4e8; display: flex; flex-direction: column; gap: 4px;">',
                      '<div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #57606a;">',
                        '<span style="font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 70px;" title="' + item.filename + '">' + item.filename + '</span>',
                        '<span>' + sizeStr + '</span>',
                      '</div>',
                      '<div style="display: flex; gap: 4px; margin-top: 2px;">',
                        '<button class="opt-button" data-action="insert" data-url="' + item.url + '" style="flex: 1; padding: 2px 4px; font-size: 11px;">${SUPPORTED_LANG[lang].insertImg || "插入"}</button>',
                        '<button class="opt-button" data-action="copy" data-url="' + item.url + '" style="padding: 2px 6px; font-size: 11px;" title="复制 Markdown">${SUPPORTED_LANG[lang].copy || "复制"}</button>',
                        '<button class="opt-button" data-action="delete" data-filename="' + item.filename + '" style="padding: 2px 6px; font-size: 11px; color: #cf222e;" title="删除图片">${SUPPORTED_LANG[lang].delete || "删除"}</button>',
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
              grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#cf222e;padding:20px;">加载失败: ' + (res.msg || "未知错误") + '</div>';
            }
          } catch (e) {
            grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#cf222e;padding:20px;">网络异常: ' + e.message + '</div>';
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

        // Lightbox for any image click in note
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
          window.vditorInstance = new Vditor("vditor", {
            mode: "ir",
            cdn: "//gcore.jsdelivr.net/npm/vditor@3.10.8",
            height: "calc(100vh - 120px)",
            placeholder: contents.getAttribute("placeholder") || "",
            toolbarConfig: { hide: true },
            toolbar: [],
            cache: { enable: false },
            upload: {
              accept: "image/*",
              multiple: false,
              handler: function(files) {
                if (files && files.length && window.processAndUploadImage) {
                  window.processAndUploadImage(files[0]);
                }
              }
            },
            value: contents.value || "",
            input(val) {
              contents.value = val;
              if (typeof window.updateWordCount === "function") {
                window.updateWordCount(val);
              }
              if (typeof window.triggerDraftSave === "function") {
                window.triggerDraftSave(val);
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
          itemsList.innerHTML = '<div style="padding:16px; color:#8c959f; font-size:12px; text-align:center;">正在加载快照...</div>';
          try {
            const resp = await fetch("/api/history?path=" + encodeURIComponent(currentPath));
            const res = await resp.json();
            if (res.err !== 0) {
              itemsList.innerHTML = '<div style="padding:16px; color:#cf222e; font-size:12px; text-align:center;">加载失败: ' + (res.msg || "未知错误") + '</div>';
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
            currentSnapshots.forEach((snap, idx) => {
              const item = document.createElement("div");
              item.style.cssText = "padding:8px 10px; border:1px solid #d0d7de; border-radius:6px; cursor:pointer; background:#fff; transition:all 0.15s ease; text-align:left;";
              const sizeKb = (snap.size / 1024).toFixed(1);
              item.innerHTML = [
                '<div style="font-size:12px; font-weight:600; color:#1f2328; margin-bottom:2px;">' + (snap.dateStr || "历史版本 " + (idx + 1)) + '</div>',
                '<div style="font-size:11px; color:#57606a; margin-bottom:4px;">大小: ' + snap.size + ' 字符 (' + sizeKb + ' KB)</div>',
                '<div style="font-size:11px; color:#8c959f; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">' + (snap.preview || "(无预览)") + '</div>'
              ].join("");

              item.onmouseenter = function() { if (selectedSnapshot !== snap) item.style.background = "#f6f8fa"; };
              item.onmouseleave = function() { if (selectedSnapshot !== snap) item.style.background = "#fff"; };
              item.onclick = function() {
                Array.from(itemsList.children).forEach(el => {
                  el.style.borderColor = "#d0d7de";
                  el.style.background = "#fff";
                });
                item.style.borderColor = "#0969da";
                item.style.background = "#f0f6fc";
                selectSnapshot(snap);
              };
              itemsList.appendChild(item);
            });

            if (itemsList.firstChild) {
              itemsList.firstChild.click();
            }
          } catch(err) {
            itemsList.innerHTML = '<div style="padding:16px; color:#cf222e; font-size:12px; text-align:center;">网络异常: ' + err.message + '</div>';
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
                applyBtn.onclick = function() {
                  if (!confirm("${SUPPORTED_LANG[lang].restoreConfirm || '确定要将笔记恢复到此历史版本吗？当前编辑区内容将被替换。'}")) return;
                  if (contents) contents.value = snapContent;
                  if (window.vditorInstance) {
                    window.vditorInstance.setValue(snapContent);
                  }
                  window.updateWordCount(snapContent);
                  if (typeof contents.oninput === "function") {
                    contents.oninput();
                  } else if (contents) {
                    contents.dispatchEvent(new Event("input", { bubbles: true }));
                  }
                  window.closeHistoryManager();
                  alert("${SUPPORTED_LANG[lang].restoredMsg || '已恢复到所选历史版本并保存！'}");
                };
              }
            } else {
              if (previewBox) previewBox.value = "读取快照失败: " + (res.msg || "未知错误");
            }
          } catch(err) {
            if (previewBox) previewBox.value = "读取快照异常: " + err.message;
          }
        }
      })();
    <\/script>
</body>
</html>
`;
  };
  var Edit = (data) => HTML({ isEdit: true, ...data });
  var Share = (data) => HTML({ isEdit: false, ...data });
  var NeedPasswd = (data) => HTML({ tips: SUPPORTED_LANG[data.lang].tipEncrypt, showPwPrompt: true, ...data });
  var Page404 = (data) => HTML({ tips: SUPPORTED_LANG[data.lang].tip404, ...data });

  var AdminLogin = ({ lang = "zh", title = "私有云笔记" }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — 登录</title>
  <style>
    body {
      background: #f4f6f8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .login-card {
      background: #ffffff;
      padding: 36px 32px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 360px;
      text-align: center;
      box-sizing: border-box;
    }
    .brand-icon { font-size: 38px; margin-bottom: 12px; }
    h2 { margin: 0 0 8px 0; font-size: 20px; color: #1f2328; font-weight: 600; }
    p.desc { margin: 0 0 24px 0; color: #656d76; font-size: 13px; }
    input[type="password"] {
      width: 100%;
      box-sizing: border-box;
      padding: 11px 14px;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      margin-bottom: 16px;
      transition: border-color 0.2s;
    }
    input[type="password"]:focus { border-color: #0969da; box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.15); }
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
    .error-msg { color: #cf222e; font-size: 13px; margin-top: 12px; display: none; }
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
  </script>
</body>
</html>
`;

  var NeedSharePasswd = ({ lang = "zh", title = "分享笔记", slug = "" }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — 访问密码</title>
  <style>
    body {
      background: #f4f6f8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .login-card {
      background: #ffffff;
      padding: 36px 32px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 360px;
      text-align: center;
      box-sizing: border-box;
    }
    .brand-icon { font-size: 38px; margin-bottom: 12px; }
    h2 { margin: 0 0 8px 0; font-size: 20px; color: #1f2328; font-weight: 600; }
    p.desc { margin: 0 0 24px 0; color: #656d76; font-size: 13px; }
    input[type="password"] {
      width: 100%;
      box-sizing: border-box;
      padding: 11px 14px;
      border: 1px solid #d0d7de;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
      margin-bottom: 16px;
      transition: border-color 0.2s;
    }
    input[type="password"]:focus { border-color: #0969da; box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.15); }
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
    .error-msg { color: #cf222e; font-size: 13px; margin-top: 12px; display: none; }
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
  </script>
</body>
</html>
`;


  // src/helper.js
  var genRandomStr = (n) => {
    const charset = "2345679abcdefghjkmnpqrstwxyz";
    return Array(n).join().split(",").map(() => charset.charAt(Math.floor(Math.random() * charset.length))).join("");
  };
  function returnPage(type, data) {
    return new Response(template_exports[type](data), {
      headers: {
        "content-type": "text/html;charset=UTF-8"
      }
    });
  }
  function returnJSON(code, data, headers = {}) {
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
  async function MD5(str) {
    const msgUint8 = new TextEncoder().encode(str);
    // 将 MD5 替换为标准的 SHA-256 加密
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  async function saltPw(password) {
    const hashPw = await MD5(password);
    return await MD5(`${hashPw}+${SALT}`);
  }
  async function checkAuth(cookie, path) {
    if (cookie.auth) {
      const valid = await import_cloudflare_worker_jwt.default.verify(cookie.auth, SECRET);
      if (valid) {
        const payload = import_cloudflare_worker_jwt.default.decode(cookie.auth);
        if (payload.path === path) {
          return true;
        }
      }
    }
    return false;
  }
  async function queryNote(key) {
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
  async function kvGet(key, type = "text") {
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

  async function kvPut(key, value) {
    if (KV) {
      try {
        const valStr = typeof value === "object" ? JSON.stringify(value) : String(value);
        return await KV.put(key, valStr);
      } catch (e) {
        console.warn("KV.put failed, falling back to Blob:", e.message);
      }
    }
    if (typeof value === "object") {
      return await store.setJSON(key, value);
    }
    return await store.set(key, value);
  }

  async function kvDelete(key) {
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

  async function putNote(key, value, metadata) {
    await store.setJSON(`notes/${key}`, {
      value: value || "",
      metadata: metadata || {}
    });
  }
  function getI18n(request) {
    const DEFAULT_LANG = "en";
    const al = request.headers.get("Accept-Language") || DEFAULT_LANG;
    const acceptList = al.split(",").map((lang) => lang.split(";")[0].trim());
    return acceptList.find((lang) => Object.keys(SUPPORTED_LANG).includes(lang)) || DEFAULT_LANG;
  }

  // src/index.js
  var router = e();

  async function checkAdminAuth(request) {
    if (!ADMIN_PASSWORD) return true;
    const cookie = import_cookie.default.parse(request.headers.get("Cookie") || "");
    if (!cookie.admin_token) return false;
    try {
      const valid = await import_cloudflare_worker_jwt.default.verify(cookie.admin_token, SECRET);
      if (valid) {
        const payload = import_cloudflare_worker_jwt.default.decode(cookie.admin_token);
        if (payload && payload.role === "admin") return true;
      }
    } catch (e) {}
    return false;
  }

  // 1. Root route
  async function handleRoot(request) {
    const lang = getI18n(request);
    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
      if (!isAdmin) {
        return returnPage("AdminLogin", { lang, title: "私有云笔记" });
      }
    }
    const newHash = genRandomStr(3);
    const u = new URL(request.url);
    return Response.redirect(`${u.origin}/${newHash}`, 302);
  }

  // 2. Admin Login
  async function handleLogin(request) {
    if (!ADMIN_PASSWORD) {
      return returnJSON(400, "Private mode is not active.");
    }
    try {
      const { password } = await request.json();
      if (password !== ADMIN_PASSWORD) {
        return returnJSON(401, "管理员密码错误");
      }
      const token = await import_cloudflare_worker_jwt.default.sign({
        role: "admin",
        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 3600)
      }, SECRET);

      return returnJSON(0, { ok: true }, {
        "Set-Cookie": import_cookie.default.serialize("admin_token", token, {
          path: "/",
          expires: (0, import_dayjs2.default)().add(30, "day").toDate(),
          httpOnly: true,
          sameSite: "lax"
        })
      });
    } catch (e) {
      return returnJSON(400, "Bad Request");
    }
  }

  // 3. Admin Logout
  async function handleLogout(request) {
    return returnJSON(0, { ok: true }, {
      "Set-Cookie": import_cookie.default.serialize("admin_token", "", {
        path: "/",
        expires: (0, import_dayjs2.default)().subtract(100, "day").toDate(),
        httpOnly: true,
        sameSite: "lax"
      })
    });
  }

  // 4. Notes list for Sidebar
  async function handleNotes(request) {
    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    }

    try {
      const { blobs } = await store.list({ prefix: "notes/", consistency: "strong" });
      const notes = await Promise.all((blobs || []).map(async (blob) => {
        const notePath = blob.key.slice("notes/".length);
        let metadata = {};
        try {
          const data = await store.get(blob.key, { type: "json", consistency: "strong" });
          if (data && data.metadata) metadata = data.metadata;
        } catch (err) {}
        return {
          path: notePath,
          updateAt: metadata?.updateAt || 0,
          mode: metadata?.mode || "plain",
          share: !!metadata?.share,
          shareSlug: metadata?.shareSlug || ""
        };
      }));

      notes.sort((a, b) => (b.updateAt || 0) - (a.updateAt || 0));
      return returnJSON(0, notes);
    } catch (err) {
      return returnJSON(500, err.message);
    }
  }

  // 5. Admin List View (/list)
  async function handleList(request) {
    if (!LIST_SECRET) {
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

      if (password !== LIST_SECRET) {
        return new Response("Unauthorized", {
          status: 401,
          headers: { "WWW-Authenticate": "Basic realm=\"Admin\"" }
        });
      }
    } catch (err) {
      return new Response("Bad Request", { status: 400 });
    }

    const { blobs } = await store.list({ prefix: "notes/", consistency: "strong" });
    const noteList = await Promise.all((blobs || []).map(async (blob) => {
      const notePath = blob.key.slice("notes/".length);
      let metadata = {};
      try {
        const data = await store.get(blob.key, { type: "json", consistency: "strong" });
        if (data && data.metadata) metadata = data.metadata;
      } catch (err) {}
      return { name: notePath, metadata };
    }));

    noteList.sort((a, b) => (b.metadata?.updateAt || 0) - (a.metadata?.updateAt || 0));

    const rows = noteList.map((item) => `
      <tr>
        <td><a href="/${encodeURI(item.name)}">${item.name}</a></td>
        <td>${item.metadata?.updateAt ? (0, import_dayjs.default)(item.metadata.updateAt * 1e3).format("YYYY-MM-DD HH:mm:ss") : "-"}</td>
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

  // 6. Share View (/share/:slug)
  async function handleShareView(request, slug) {
    const lang = getI18n(request);
    const rawShare = await kvGet(`share/${slug}`, "json");
    if (!rawShare) {
      return returnPage("Page404", { lang, title: "404 Share Not Found" });
    }

    const shareObj = typeof rawShare === "string" ? { path: rawShare, sharePw: "" } : rawShare;
    const { path, sharePw } = shareObj;

    if (sharePw) {
      const cookie = import_cookie.default.parse(request.headers.get("Cookie") || "");
      const cookieKey = `share_auth_${encodeURIComponent(slug)}`;
      let isShareValid = false;
      if (cookie[cookieKey]) {
        try {
          const valid = await import_cloudflare_worker_jwt.default.verify(cookie[cookieKey], SECRET);
          if (valid) {
            const payload = import_cloudflare_worker_jwt.default.decode(cookie[cookieKey]);
            if (payload && payload.slug === slug) isShareValid = true;
          }
        } catch (e) {}
      }

      if (!isShareValid) {
        return returnPage("NeedSharePasswd", {
          lang,
          title: slug,
          slug
        });
      }
    }

    const { value, metadata } = await queryNote(path);
    return returnPage("Share", {
      lang,
      title: slug,
      content: value,
      ext: metadata,
      isPrivateMode: !!ADMIN_PASSWORD
    });
  }

  // 7. Share Password Verification (/share/:slug/auth)
  async function handleShareAuth(request, slug) {
    const lang = getI18n(request);
    const ip = request.headers.get("eo-client-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown_ip";
    const failsKey = `fails/share_${encodeURIComponent(ip)}_${encodeURIComponent(slug)}`;
    const now = Date.now();

    const rawShare = await kvGet(`share/${slug}`, "json");
    if (!rawShare) {
      return returnJSON(404, "Share not found");
    }
    const shareObj = typeof rawShare === "string" ? { path: rawShare, sharePw: "" } : rawShare;
    const { sharePw } = shareObj;

    let failRecord = null;
    try {
      failRecord = await kvGet(failsKey, "json");
    } catch (e) {}

    let fails = 0;
    let unlockAt = 0;
    if (failRecord && failRecord.expireAt && now < failRecord.expireAt) {
      fails = parseInt(failRecord.count || "0");
      unlockAt = parseInt(failRecord.unlockAt || "0");
    }

    if (unlockAt > now) {
      const waitSeconds = Math.ceil((unlockAt - now) / 1000);
      const msg = lang === "zh" ? `密码错误次数过多，请等待 ${waitSeconds} 秒后再试` : `Too many failed attempts. Please wait ${waitSeconds}s before retrying.`;
      return new Response(JSON.stringify({ err: 429, msg, retryAfter: waitSeconds }), {
        status: 429,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      });
    }

    let isPasswordCorrect = false;
    try {
      const { passwd } = await request.json();
      if (sharePw) {
        const storePw = await saltPw(passwd);
        if (sharePw === storePw) {
          isPasswordCorrect = true;
        }
      }
    } catch (e) {}

    if (isPasswordCorrect) {
      try {
        await kvDelete(failsKey);
      } catch (e) {}
      const token = await import_cloudflare_worker_jwt.default.sign({ slug }, SECRET);
      const cookieKey = `share_auth_${encodeURIComponent(slug)}`;
      return returnJSON(0, { refresh: true }, {
        "Set-Cookie": import_cookie.default.serialize(cookieKey, token, {
          path: `/share/${encodeURI(slug)}`,
          expires: (0, import_dayjs2.default)().add(7, "day").toDate(),
          httpOnly: true
        })
      });
    }

    fails++;
    let cooldown = 0;
    if (fails === 4) cooldown = 5;
    else if (fails === 5) cooldown = 30;
    else if (fails === 6) cooldown = 120;
    else if (fails >= 7) cooldown = 900;

    const newUnlockAt = cooldown > 0 ? now + (cooldown * 1000) : 0;
    try {
      await kvPut(failsKey, {
        count: fails,
        unlockAt: newUnlockAt,
        expireAt: now + 1800 * 1000
      });
    } catch (e) {}

    if (cooldown > 0) {
      const msg = lang === "zh" ? `密码错误！已连续输错 ${fails} 次，请等待 ${cooldown} 秒后再试` : `Password auth failed! Too many attempts (${fails}), please wait ${cooldown}s before retrying.`;
      return new Response(JSON.stringify({ err: 429, msg, retryAfter: cooldown }), {
        status: 429,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      });
    }

    const errMsg = lang === "zh" ? "提取码错误！" : "Access code incorrect!";
    return returnJSON(10002, errMsg);
  }

  // 8. Note Delete
  async function handleNoteDelete(request, path) {
    const cookie = import_cookie.default.parse(request.headers.get("Cookie") || "");
    const { metadata } = await queryNote(path);

    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    } else {
      const valid = await checkAuth(cookie, path);
      if (metadata.pw && !valid) {
        return returnJSON(403, "Protected note: password required to delete.");
      }
    }

    try {
      await store.delete(`notes/${path}`);
      if (metadata.shareSlug) {
        await kvDelete(`share/${metadata.shareSlug}`);
      }
      const md5 = await MD5(path);
      await kvDelete(`share/${md5}`);

      const ip = request.headers.get("eo-client-ip") || "unknown_ip";
      await kvDelete(`fails/${encodeURIComponent(ip)}_${encodeURIComponent(path)}`);

      // Clean up history snapshots and index
      try {
        const histKey = `hist/${encodeURIComponent(path)}`;
        const histList = await kvGet(histKey, "json");
        if (Array.isArray(histList)) {
          for (const h of histList) {
            if (h && h.id) {
              await store.delete(`history/${encodeURIComponent(path)}/${h.id}`);
            }
          }
        }
        await kvDelete(histKey);
      } catch (e) {}

      return returnJSON(0, { deleted: path });
    } catch (err) {
      return returnJSON(500, "Delete failed: " + err.message);
    }
  }

  // 9. Note Auth (/:path/auth)
  async function handleNoteAuth(request, path) {
    const lang = getI18n(request);
    const ip = request.headers.get("eo-client-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown_ip";
    const failsKey = `fails/${encodeURIComponent(ip)}_${encodeURIComponent(path)}`;
    const now = Date.now();

    let failRecord = null;
    try {
      failRecord = await kvGet(failsKey, "json");
    } catch (e) {}

    let fails = 0;
    let unlockAt = 0;
    if (failRecord && failRecord.expireAt && now < failRecord.expireAt) {
      fails = parseInt(failRecord.count || "0");
      unlockAt = parseInt(failRecord.unlockAt || "0");
    }

    if (unlockAt > now) {
      const waitSeconds = Math.ceil((unlockAt - now) / 1000);
      const msg = lang === "zh" ? `密码错误次数过多，请等待 ${waitSeconds} 秒后再试` : `Too many failed attempts. Please wait ${waitSeconds}s before retrying.`;
      return new Response(JSON.stringify({ err: 429, msg, retryAfter: waitSeconds }), {
        status: 429,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      });
    }

    let isPasswordCorrect = false;
    const ctype = request.headers.get("content-type") || request.headers.get("Content-Type") || "";
    if (ctype.includes("application/json")) {
      const { passwd } = await request.json();
      const { metadata } = await queryNote(path);
      if (metadata.pw) {
        const storePw = await saltPw(passwd);
        if (metadata.pw === storePw) {
          isPasswordCorrect = true;
        }
      }
    }

    if (isPasswordCorrect) {
      try {
        await kvDelete(failsKey);
      } catch (e) {}
      const token = await import_cloudflare_worker_jwt.default.sign({ path }, SECRET);
      return returnJSON(0, { refresh: true }, {
        "Set-Cookie": import_cookie.default.serialize("auth", token, {
          path: `/${encodeURI(path)}`,
          expires: (0, import_dayjs2.default)().add(7, "day").toDate(),
          httpOnly: true
        })
      });
    }

    fails++;
    let cooldown = 0;
    if (fails === 4) cooldown = 5;
    else if (fails === 5) cooldown = 30;
    else if (fails === 6) cooldown = 120;
    else if (fails >= 7) cooldown = 900;

    const newUnlockAt = cooldown > 0 ? now + (cooldown * 1000) : 0;
    try {
      await kvPut(failsKey, {
        count: fails,
        unlockAt: newUnlockAt,
        expireAt: now + 1800 * 1000
      });
    } catch (e) {}

    if (cooldown > 0) {
      const msg = lang === "zh" ? `密码错误！已连续输错 ${fails} 次，请等待 ${cooldown} 秒后再试` : `Password auth failed! Too many attempts (${fails}), please wait ${cooldown}s before retrying.`;
      return new Response(JSON.stringify({ err: 429, msg, retryAfter: cooldown }), {
        status: 429,
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      });
    }

    const errMsg = lang === "zh" ? "密码错误！" : "Password auth failed!";
    return returnJSON(10002, errMsg);
  }

  // 10. Note Password Setting (/:path/pw)
  async function handleNotePw(request, path) {
    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
      if (!isAdmin) return returnJSON(401, "Unauthorized");
    }

    const ctype = request.headers.get("content-type") || request.headers.get("Content-Type") || "";
    if (ctype.includes("application/json")) {
      const cookie = import_cookie.default.parse(request.headers.get("Cookie") || "");
      const { passwd } = await request.json();
      const { value, metadata } = await queryNote(path);
      const valid = await checkAuth(cookie, path);
      if (ADMIN_PASSWORD || !metadata.pw || valid) {
        const pw = passwd ? await saltPw(passwd) : void 0;
        try {
          await putNote(path, value, {
            ...metadata,
            pw
          });
          return returnJSON(0, null, {
            "Set-Cookie": import_cookie.default.serialize("auth", "", {
              path: `/${encodeURI(path)}`,
              expires: (0, import_dayjs2.default)().subtract(100, "day").toDate(),
              httpOnly: true
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
  async function handleNoteSetting(request, path) {
    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
      if (!isAdmin) return returnJSON(401, "Unauthorized");
    }

    const ctype = request.headers.get("content-type") || request.headers.get("Content-Type") || "";
    if (ctype.includes("application/json")) {
      const cookie = import_cookie.default.parse(request.headers.get("Cookie") || "");
      const { mode, share, shareSlug, sharePw } = await request.json();
      const { value, metadata } = await queryNote(path);
      const valid = await checkAuth(cookie, path);
      if (ADMIN_PASSWORD || !metadata.pw || valid) {
        try {
          const md5 = await MD5(path);
          let slug = metadata.shareSlug || md5;

          if (share === true) {
            slug = (shareSlug || slug).trim();
            const shareData = {
              path,
              sharePw: sharePw ? await saltPw(sharePw) : (sharePw === "" ? "" : (metadata.sharePw || "")),
              slug,
              createdAt: Date.now()
            };
            await kvPut(`share/${slug}`, shareData);
            if (slug !== md5) {
              await kvPut(`share/${md5}`, shareData);
            }
            await putNote(path, value, {
              ...metadata,
              ...mode !== void 0 && { mode },
              share: true,
              shareSlug: slug,
              hasSharePw: !!shareData.sharePw,
              sharePw: shareData.sharePw
            });
            return returnJSON(0, { slug, hasSharePw: !!shareData.sharePw });
          } else if (share === false) {
            if (metadata.shareSlug) {
              await kvDelete(`share/${metadata.shareSlug}`);
            }
            await kvDelete(`share/${md5}`);
            await putNote(path, value, {
              ...metadata,
              ...mode !== void 0 && { mode },
              share: false,
              shareSlug: null,
              hasSharePw: false,
              sharePw: ""
            });
            return returnJSON(0);
          } else if (mode !== void 0) {
            await putNote(path, value, {
              ...metadata,
              mode
            });
            return returnJSON(0);
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
  async function handleNoteSave(request, path) {
    const { value, metadata } = await queryNote(path);

    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    } else {
      const cookie = import_cookie.default.parse(request.headers.get("Cookie") || "");
      const valid = await checkAuth(cookie, path);
      if (metadata.pw && !valid) {
        return returnJSON(10002, "Password auth failed! Try refreshing this page if you had just set a password.");
      }
    }

    const formData = await request.formData();
    const content = formData.get("t");

    // History snapshot tracking:
    // If note previously had content, and new content is different and non-empty
    if (value && value !== content && value.trim().length > 0) {
      try {
        const histKey = `hist/${encodeURIComponent(path)}`;
        let histList = [];
        try {
          const raw = await kvGet(histKey, "json");
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
          const dateStr = (0, import_dayjs2.default)(now).format("YYYY-MM-DD HH:mm:ss");

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
          await kvPut(histKey, histList);
        }
      } catch (err) {
        console.warn("History snapshot error:", err);
      }
    }

    try {
      await putNote(path, content, {
        ...metadata,
        updateAt: (0, import_dayjs2.default)().unix()
      });
      return returnJSON(0);
    } catch (error) {
      console.error(error);
    }
    return returnJSON(10001, "Blob insert fail!");
  }

  // 13. View / Edit Note (GET /:path)
  async function handleNoteView(request, path) {
    const lang = getI18n(request);
    const title = path;

    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
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
    const cookie = import_cookie.default.parse(request.headers.get("Cookie") || "");
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
    const valid = await checkAuth(cookie, path);
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

  // 14. Image Upload & Quota Management (200MB Limit)
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

  async function handleUpload(request) {
    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized: Admin login required for uploads");
      }
    } else {
      const notePath = request.headers.get("x-note-path") || "";
      if (notePath) {
        const { metadata } = await queryNote(decodeURIComponent(notePath));
        if (metadata.pw) {
          const cookie = import_cookie.default.parse(request.headers.get("Cookie") || "");
          const valid = await checkAuth(cookie, decodeURIComponent(notePath));
          if (!valid) {
            return returnJSON(403, "Password required to upload to this note");
          }
        }
      }
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
      const usageStr = await kvGet("stat/images_usage_bytes");
      let currentUsage = parseInt(usageStr || "0", 10);
      if (isNaN(currentUsage) || currentUsage < 0) currentUsage = 0;

      // Check if image already exists (deduplication)
      const existing = await store.get(`images/${filename}`, { type: "arrayBuffer", consistency: "strong" });
      if (!existing) {
        if (currentUsage + fileBuffer.byteLength > MAX_QUOTA) {
          const usedMB = (currentUsage / (1024 * 1024)).toFixed(1);
          return returnJSON(413, `图片配额已满（当前已用 ${usedMB}MB / 上限 200MB）`);
        }
        await store.set(`images/${filename}`, fileBuffer, {
          cacheControl: "public, max-age=31536000, immutable"
        });
        currentUsage += fileBuffer.byteLength;
        await kvPut("stat/images_usage_bytes", String(currentUsage));
      }

      // Maintain stat/images_list in KV
      try {
        let list = [];
        const listStr = await kvGet("stat/images_list");
        if (listStr) list = JSON.parse(listStr);
        list = list.filter(item => item.filename !== filename);
        list.unshift({
          filename,
          url: `/api/images/${filename}`,
          size: fileBuffer.byteLength,
          uploadedAt: Date.now()
        });
        await kvPut("stat/images_list", JSON.stringify(list));
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

  async function handleImageGet(request, filename) {
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
      const buf = await store.get(`images/${filename}`, { type: "arrayBuffer", consistency: "strong" });
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
      console.error("handleImageGet error:", err);
      return new Response("Failed to fetch image", { status: 500 });
    }
  }

  async function handleImageList(request) {
    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    }
    try {
      let list = [];
      const listStr = await kvGet("stat/images_list");
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
            const buf = await store.get(b.key, { type: "arrayBuffer", consistency: "strong" });
            if (buf) size = buf.byteLength;
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
      await kvPut("stat/images_list", JSON.stringify(list));

      const MAX_QUOTA = 200 * 1024 * 1024;
      const usageStr = await kvGet("stat/images_usage_bytes");
      let currentUsage = parseInt(usageStr || "0", 10);
      if (isNaN(currentUsage) || currentUsage < 0) currentUsage = 0;

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

  async function handleQuota(request) {
    const MAX_QUOTA = 200 * 1024 * 1024;
    const usageStr = await kvGet("stat/images_usage_bytes");
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

  async function handleImageDelete(request, filename) {
    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
      if (!isAdmin) {
        return returnJSON(401, "Unauthorized");
      }
    }
    if (!/^[a-zA-Z0-9_-]+\.(webp|png|jpe?g|gif)$/i.test(filename)) {
      return returnJSON(400, "Invalid image name");
    }
    try {
      const buf = await store.get(`images/${filename}`, { type: "arrayBuffer", consistency: "strong" });
      if (buf) {
        const size = buf.byteLength;
        await store.delete(`images/${filename}`);
        const usageStr = await kvGet("stat/images_usage_bytes");
        let currentUsage = Math.max(0, parseInt(usageStr || "0", 10) - size);
        await kvPut("stat/images_usage_bytes", String(currentUsage));

        // Remove from stat/images_list
        try {
          let list = [];
          const listStr = await kvGet("stat/images_list");
          if (listStr) {
            list = JSON.parse(listStr);
            list = list.filter(item => item.filename !== filename);
            await kvPut("stat/images_list", JSON.stringify(list));
          }
        } catch (e) {}

        return returnJSON(0, { freedBytes: size, remainingMB: (currentUsage / (1024 * 1024)).toFixed(2) });
      }
      return returnJSON(404, "Image not found");
    } catch (err) {
      return returnJSON(500, err.message);
    }
  }

  // 15. History Snapshots Management (Rolling 5 Snapshots)
  async function checkNoteAuthOrAdmin(request, path) {
    if (ADMIN_PASSWORD) {
      const isAdmin = await checkAdminAuth(request);
      if (!isAdmin) return false;
      return true;
    }
    const { metadata } = await queryNote(path);
    if (!metadata.pw) return true;
    const cookie = import_cookie.default.parse(request.headers.get("Cookie") || "");
    return await checkAuth(cookie, path);
  }

  async function handleHistoryList(request) {
    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "";
    if (!path) {
      return returnJSON(400, "Missing path parameter");
    }
    const authed = await checkNoteAuthOrAdmin(request, path);
    if (!authed) {
      return returnJSON(401, "Unauthorized");
    }
    try {
      const histKey = `hist/${encodeURIComponent(path)}`;
      let list = await kvGet(histKey, "json");
      if (!Array.isArray(list)) list = [];
      return returnJSON(0, list);
    } catch (err) {
      return returnJSON(500, "Failed to get history: " + err.message);
    }
  }

  async function handleHistoryView(request) {
    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "";
    const id = url.searchParams.get("id") || "";
    if (!path || !id) {
      return returnJSON(400, "Missing path or id parameter");
    }
    const authed = await checkNoteAuthOrAdmin(request, path);
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

  async function handleHistoryRestore(request) {
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
    const authed = await checkNoteAuthOrAdmin(request, path);
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

  // Main dispatcher - zero complex regexes, 100% EdgeOne compliant
  async function route(request) {
    const url = new URL(request.url);
    let pathname = url.pathname || "/";
    while (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
    const method = request.method || "GET";

    if (method === "GET" && pathname === "/") {
      return handleRoot(request);
    }
    if (method === "POST" && pathname === "/api/login") {
      return handleLogin(request);
    }
    if (method === "POST" && pathname === "/api/logout") {
      return handleLogout(request);
    }
    if (method === "GET" && pathname === "/api/notes") {
      return handleNotes(request);
    }
    if (method === "GET" && pathname === "/api/quota") {
      return handleQuota(request);
    }
    if (method === "POST" && pathname === "/api/upload") {
      return handleUpload(request);
    }
    if (method === "GET" && pathname === "/api/images") {
      return handleImageList(request);
    }
    if (pathname.startsWith("/api/images/")) {
      const rest = pathname.slice(12);
      if (method === "POST" && rest.endsWith("/delete")) {
        const filename = rest.slice(0, -7);
        return handleImageDelete(request, filename);
      }
      if (method === "GET") {
        return handleImageGet(request, rest);
      }
    }
    if (method === "GET" && pathname === "/api/history") {
      return handleHistoryList(request);
    }
    if (method === "GET" && pathname === "/api/history/view") {
      return handleHistoryView(request);
    }
    if (method === "POST" && pathname === "/api/history/restore") {
      return handleHistoryRestore(request);
    }
    if (method === "GET" && pathname === "/list") {
      return handleList(request);
    }

    if (pathname.startsWith("/api/")) {
      return returnJSON(404, "API endpoint not found");
    }

    if (pathname === "/share" || pathname.startsWith("/share/")) {
      if (pathname === "/share") {
        const lang = getI18n(request);
        return returnPage("Page404", { lang, title: "404" });
      }
      const rest = pathname.slice(7);
      if (method === "POST" && rest.endsWith("/auth")) {
        const slug = decodeURIComponent(rest.slice(0, -5));
        return handleShareAuth(request, slug);
      }
      if (method === "GET") {
        const slug = decodeURIComponent(rest);
        return handleShareView(request, slug);
      }
      const lang = getI18n(request);
      return returnPage("Page404", { lang, title: "404" });
    }

    if (pathname.length > 1) {
      if (method === "POST" && pathname.endsWith("/delete") && pathname.length > 8) {
        const path = decodeURIComponent(pathname.slice(1, -7));
        return handleNoteDelete(request, path);
      }
      if (method === "POST" && pathname.endsWith("/auth") && pathname.length > 6) {
        const path = decodeURIComponent(pathname.slice(1, -5));
        return handleNoteAuth(request, path);
      }
      if (method === "POST" && pathname.endsWith("/pw") && pathname.length > 4) {
        const path = decodeURIComponent(pathname.slice(1, -3));
        return handleNotePw(request, path);
      }
      if (method === "POST" && pathname.endsWith("/setting") && pathname.length > 9) {
        const path = decodeURIComponent(pathname.slice(1, -8));
        return handleNoteSetting(request, path);
      }
      if (method === "POST") {
        const path = decodeURIComponent(pathname.slice(1));
        return handleNoteSave(request, path);
      }
      if (method === "GET") {
        const path = decodeURIComponent(pathname.slice(1));
        return handleNoteView(request, path);
      }
    }

    const lang = getI18n(request);
    return returnPage("Page404", { lang, title: "404" });
  }

  export default async function onRequest(context) {
    try {
      const safeProcessEnv = typeof process !== "undefined" && process && process.env ? process.env : {};
      const env = context?.env || safeProcessEnv || {};
      const request = context?.request || (typeof Request !== "undefined" && context instanceof Request ? context : context);

      SALT = env?.SCN_SALT || safeProcessEnv?.SCN_SALT || "";
      SECRET = env?.SCN_SECRET || safeProcessEnv?.SCN_SECRET || "";
      LIST_SECRET = env?.LIST_SECRET || safeProcessEnv?.LIST_SECRET || "";
      ADMIN_PASSWORD = env?.ADMIN_PASSWORD || safeProcessEnv?.ADMIN_PASSWORD || "";
      KV = env?.notepad_kv || (typeof globalThis !== "undefined" ? globalThis?.notepad_kv : null) || null;

      const resp = await route(request);
      return resp || new Response("Not Found", { status: 404 });
    } catch (err) {
      console.error("onRequest error:", err);
      return new Response("Internal Edge Error: " + (err?.stack || err?.message || String(err)), {
        status: 500,
        headers: { "Content-Type": "text/plain;charset=UTF-8" }
      });
    }
  }
