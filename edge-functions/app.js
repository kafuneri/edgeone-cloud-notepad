  let SALT, SECRET, LIST_SECRET, KV, ADMIN_PASSWORD;
import { getStore } from "@edgeone/pages-blob";
const store = getStore("notepad");
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
    return {
      __proto__: new Proxy({}, {
        get: (e2, a, o) => (e3, ...r) => n.push([
          a.toUpperCase(),
          e3 instanceof RegExp ? e3 : RegExp(`^${(t + e3).replace(/(\/?)\*/g, "($1.*)?").replace(/\/$/, "").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.").replace(/\)\.\?\(([^\\[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`),
          r
        ]) && o
      }),
      routes: n,
      async handle(e2, ...r) {
        let a, o, t2 = new URL(e2.url);
        e2.query = {};
        if (t2.searchParams && t2.searchParams.forEach) {
          t2.searchParams.forEach((v, k) => { e2.query[k] = v; });
        }
        for (var [p, s, u] of n) {
          if ((p === e2.method || "ALL" === p) && (o = t2.pathname.match(s))) {
            e2.params = o.groups || {};
            for (var c of u) {
              if (void 0 !== (a = await c(e2.proxy || e2, ...r)))
                return a;
            }
          }
        }
      }
    };
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
  import_dayjs.default.extend(import_relativeTime.default);

  // src/constant.js
  var CDN_PREFIX = "//gcore.jsdelivr.net/gh/s0urcelab/serverless-cloud-notepad@master/static";
  var SUPPORTED_LANG = {
    "en": {
      setPW: "Set Password",
      changePW: "Change Password",
      share: "Share",
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
      noNotes: "No notes yet"
    },
    "zh": {
      setPW: "设置密码",
      changePW: "修改密码",
      share: "分享",
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
      noNotes: "暂无笔记"
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
                <button id="opt-del-btn" class="opt-button" style="margin-left:6px;color:#cf222e;" title="${SUPPORTED_LANG[lang].delete}">${SUPPORTED_LANG[lang].delete}</button>
            </div>
            ` : ""}
        <a class="github-link" title="Github" target="_blank" href="https://github.com/kafuneri/edgeone-cloud-notepad" rel="noreferrer">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="github" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>
        </a>
        ${updateAt ? `<span class="last-modified">${SUPPORTED_LANG[lang].lastModified} ${import_dayjs.default.unix(updateAt).fromNow()}</span>` : ""}
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
      #preview-md img {
        max-width: 100%;
        border-radius: 4px;
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
    </style>
</head>
<body>
    <!-- Top-left Sidebar Toggle Button -->
    <button id="sidebar-toggle-btn" class="sidebar-toggle-btn" title="菜单">☰</button>
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
        <span>${isPrivateMode ? SUPPORTED_LANG[lang].privateVault : SUPPORTED_LANG[lang].publicVault}</span>
        ${isPrivateMode ? `<button id="sidebar-logout-btn" class="sidebar-logout-btn">${SUPPORTED_LANG[lang].logout}</button>` : ""}
      </div>
    </div>

    <div class="note-container">
        <div class="stack">
            <div class="layer_1">
                <div class="layer_2">
                    <div class="layer_3">
                        ${tips ? `<div class="tips">${tips}</div>` : ""}
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
            value: contents.value || "",
            input(val) {
              contents.value = val;
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
    <div class="brand-icon">🔒</div>
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
    <div class="brand-icon">🔑</div>
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
  router.get("/", async (request) => {
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
  });

  // 2. Admin Auth APIs
  router.post("/api/login", async (request) => {
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
  });

  router.post("/api/logout", async (request) => {
    return returnJSON(0, { ok: true }, {
      "Set-Cookie": import_cookie.default.serialize("admin_token", "", {
        path: "/",
        expires: (0, import_dayjs2.default)().subtract(100, "day").toDate(),
        httpOnly: true,
        sameSite: "lax"
      })
    });
  });

  // 3. Notes tree API for Sidebar
  router.get("/api/notes", async (request) => {
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
  });

  // 4. List View (/list)
  router.get("/list", async (request) => {
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
  });

  // 5. Share View (/share/:slug)
  router.get(/^\/share\/(?<slug>[^/]+)\/*$/, async (request) => {
    const lang = getI18n(request);
    const slug = decodeURIComponent(request.params.slug);
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
  });

  // 6. Share Password Verification (/share/:slug/auth)
  router.post(/^\/share\/(?<slug>[^/]+)\/auth\/*$/, async (request) => {
    const slug = decodeURIComponent(request.params.slug);
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
  });

  // 7. Note Delete Endpoint (supports multi-level path)
  router.post(/^\/(?<path>(?!api\/|share\/).+)\/delete\/*$/, async (request) => {
    const path = decodeURIComponent(request.params.path);
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

      return returnJSON(0, { deleted: path });
    } catch (err) {
      return returnJSON(500, "Delete failed: " + err.message);
    }
  });

  // 8. Note Password Verification (supports multi-level path)
  router.post(/^\/(?<path>(?!api\/|share\/).+)\/auth\/*$/, async (request) => {
    const path = decodeURIComponent(request.params.path);
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
  });

  // 9. Note Password Setting (supports multi-level path)
  router.post(/^\/(?<path>(?!api\/|share\/).+)\/pw\/*$/, async (request) => {
    const path = decodeURIComponent(request.params.path);
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
  });

  // 10. Note Setting Update (supports multi-level path)
  router.post(/^\/(?<path>(?!api\/|share\/).+)\/setting\/*$/, async (request) => {
    const path = decodeURIComponent(request.params.path);
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
  });

  // 11. Save Note Content (supports multi-level path)
  router.post(/^\/(?<path>(?!api\/|share\/)[^/].*)\/*$/, async (request) => {
    const path = decodeURIComponent(request.params.path);
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
  });

  // 12. View / Edit Note (supports multi-level path)
  router.get(/^\/(?<path>(?!api\/|share\/|list)[^/].*)\/*$/, async (request) => {
    const lang = getI18n(request);
    const path = decodeURIComponent(request.params.path);
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
  });

  router.all("*", (request) => {
    const lang = getI18n(request);
    return returnPage("Page404", { lang, title: "404" });
  });

  export default async function onRequest(context) {
    const { request, env } = context;
    SALT = env?.SCN_SALT || process.env?.SCN_SALT || "";
    SECRET = env?.SCN_SECRET || process.env?.SCN_SECRET || "";
    LIST_SECRET = env?.LIST_SECRET || process.env?.LIST_SECRET || "";
    ADMIN_PASSWORD = env?.ADMIN_PASSWORD || process.env?.ADMIN_PASSWORD || "";
    KV = env?.notepad_kv || globalThis?.notepad_kv || null;

    try {
      return await router.handle(request);
    } catch (err) {
      console.error(err);
      return returnJSON(500, "Internal Error: " + err.message);
    }
  }
