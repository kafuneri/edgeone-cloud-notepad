# ☁️ EdgeOne Cloud Notepad (云笔记 EdgeOne 版)

基于 **Tencent Cloud EdgeOne Makers (Pages)** 全栈无服务器架构与 **EdgeOne Blob 存储** 打造的极速无服务器云笔记。

项目源自对 [s0urcelab/serverless-cloud-notepad](https://github.com/s0urcelab/serverless-cloud-notepad) 的修改与重构，专为腾讯云 EdgeOne 边缘函数与分布式存储体系深度适配。

---

## ✨ 核心特性

* ✏️ **即开即写**：无需繁琐的账号注册或登录流程，打开任意路径即可直接开始记录。
* 💾 **实时保存**：自动持久化存储，无需手动点击保存，防数据意外丢失。
* ⚡ **全球极速**：依托腾讯云 EdgeOne 全球 3200+ 边缘加速节点，超低延迟响应。
* 🔒 **强一致持久化**：采用 EdgeOne Blob 分布式对象存储，支持强一致性读写，避免边缘缓存延迟。
* 🌏 **原生中文路径**：全面支持任意中文 URL 路径解析（如 `https://你的域名/工作备忘`）。
* 🔐 **密码保护与鉴权**：支持为单个笔记设定独立访问密码，基于 Web Crypto 与 JWT 安全校验，支持防暴力破解。
* 🔗 **只读安全分享**：支持生成专属哈希加密的只读分享链接。
* 📋 **后台笔记总览**：支持 `/list` 统一查阅所有云端笔记链接与最后修改时间，受 HTTP Basic Auth 严密鉴权保护。

---

## 🛠️ 技术架构

* **运行环境**：Tencent Cloud EdgeOne Makers (Edge Functions / V8 边缘运行时)
* **存储后端**：EdgeOne Blob 存储（`@edgeone/pages-blob`）
* **加密与认证**：Web Crypto API (`crypto.subtle` SHA-256 / HMAC-SHA256) + JWT Cookie 认证
* **配置管理**：`edgeone.json` 覆盖构建规范 + 平台环境变量注入

---

## 🚀 部署指南

### 1. 关联仓库并部署

1. Fork 或推送本仓库至你的 GitHub 账号。
2. 登录 [EdgeOne 控制台](https://console.cloud.tencent.com/edgeone/pages)，进入 **Makers**。
3. 创建新项目，关联本 GitHub 仓库。
4. 构建配置将由仓库根目录的 `edgeone.json` 自动接管，无需手动修改。

### 2. 注入环境变量

在 EdgeOne Makers 项目的 **设置 -> 环境变量** 中，为生产环境（Production）与预览环境（Preview）添加以下 3 个变量：

| 变量名 | 描述 | 示例值 |
| :--- | :--- | :--- |
| `SCN_SALT` | 数据加密与密码加盐密钥 | 32位随机十六进制字符串 |
| `SCN_SECRET` | JWT 鉴权签名密钥 | 64位随机十六进制字符串 |
| `LIST_SECRET` | `/list` 页面 HTTP Basic Auth 管理密码 | 任意高强度自定义密码 |

> 也可通过 EdgeOne CLI 直接设置：
> ```bash
> edgeone makers env set SCN_SALT "<your_salt>" -e production
> edgeone makers env set SCN_SECRET "<your_secret>" -e production
> edgeone makers env set LIST_SECRET "<your_password>" -e production
> ```

---

## 📖 使用说明

* **随机笔记**：访问根路径 `/`，系统将自动 302 重定向至由随机字符生成的专属空白笔记。
* **自定义笔记**：在浏览器地址栏手动输入 `/<任何名称>`（例如 `https://你的域名/日常灵感`），即可直接新建或查看该笔记。
* **管理总览**：访问 `/list`，在浏览器弹出的登录框中输入任意用户名，密码输入你设定的 `LIST_SECRET`，即可查看所有笔记。

---

## 📄 开源许可

本项目遵循 [MIT License](LICENSE) 许可协议。
