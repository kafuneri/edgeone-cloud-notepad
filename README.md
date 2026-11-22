# EdgeOne Cloud Notepad (云笔记 EdgeOne 版)

基于 **Tencent Cloud EdgeOne Makers (Pages)** 全栈无服务器架构、**EdgeOne Blob 存储** 与 **KV 存储** 打造的极速无服务器云笔记。

---

## ✨ 核心特性

* ✏️ **即开即写 & 实时保存**：支持纯文本与 Markdown（Vditor 即时渲染模式）双模式切换、本地草稿防丢提示与浮动大纲目录（TOC）。
* 📁 **文件夹目录树 & 重命名迁移**：支持使用 `/` 创建多级文件夹（如 `学习笔记/教程`），支持侧边栏搜索、重命名或跨文件夹移动笔记（自动同步分享短链与历史快照）。
* 🔒 **私有笔记库 & 防误触锁**：支持通过 `ADMIN_PASSWORD` 开启全站私有库模式（含登录防爆破限流）；支持单篇笔记一键加锁，锁定后禁止对外分享、开启 Raw 公开、重命名或删除，防止误触泄露或误删。
* 🔗 **分享与 Raw 公开管理**：
  * 支持自定义或随机 6 位短链、默认随机 4 位提取码（可选无提取码）、有效期（10 分钟 / 1 小时 / 1 天 / 7 天 / 永久）及**阅后即焚**。
  * 复制分享链接自动附带 `?pw=` 参数，访问链接即可免输入直达；内置 **分享与Raw管理** 弹窗，支持按“已分享 / Raw公开 / 全部笔记”分类管理、查看/复制提取码、一键清理全部过期分享。
  * 支持单篇笔记开启 **Raw 无密码公开只读**（`/raw/:path`），方便脚本或命令行直接读取。
* 🖼️ **图床管理（200MB 配额）**：支持粘贴/拖拽/选择上传图片并自动前端压缩为 WebP，支持图片列表查看、一键插入 Markdown 与删除释放配额。
* 🕒 **历史版本快照 & 全库备份**：私有模式下自动滚动保留最近 5 个历史快照，支持在线对比预览与一键恢复写回云端；支持一键打包导出全库笔记为 `.zip` 压缩包（保留脚本原有扩展名）。

---

##  技术架构

* **运行环境**：Tencent Cloud EdgeOne Makers (Edge Functions / V8 边缘运行时)
* **存储后端**：EdgeOne Blob 存储（`@edgeone/pages-blob`）+ EdgeOne KV（`notepad_kv`，自动降级兼容 Blob）
* **加密与认证**：Web Crypto API (`crypto.subtle` SHA-256) + JWT Cookie 认证 + IP 失败冷却限流
* **配置管理**：`edgeone.json` 覆盖构建规范 + 平台环境变量注入

---

## 🚀 部署指南

### 1. 关联仓库并部署

1. Fork 或推送本仓库至你的 GitHub 账号。
2. 登录 [EdgeOne 控制台](https://console.cloud.tencent.com/edgeone/pages)，进入 **Makers**。
3. 创建新项目，关联本 GitHub 仓库。
4. 构建配置将由仓库根目录的 `edgeone.json` 自动接管，无需手动修改。

### 2. 注入环境变量

在 EdgeOne Makers 项目的 **设置 -> 环境变量** 中，为生产环境（Production）与预览环境（Preview）添加以下变量：

| 变量名 | 必填 | 描述 | 示例值 |
| :--- | :--- | :--- | :--- |
| `SCN_SALT` | 是 | 密码加盐密钥 | 32 位随机十六进制字符串 |
| `SCN_SECRET` | 是 | JWT 会话签名密钥 | 64 位随机十六进制字符串 |
| `ADMIN_PASSWORD` | 推荐 | 私有笔记库全局管理员密码（留空则为公开模式） | 高强度自定义密码 |
| `LIST_SECRET` | 可选 | `/list` 页面 HTTP Basic Auth 管理密码 | 任意高强度自定义密码 |

> 也可通过 EdgeOne CLI 直接设置：
> ```bash
> edgeone makers env set SCN_SALT "<your_salt>" -e production
> edgeone makers env set SCN_SECRET "<your_secret>" -e production
> edgeone makers env set ADMIN_PASSWORD "<your_admin_password>" -e production
> edgeone makers env set LIST_SECRET "<your_list_password>" -e production
> ```

---

## 📖 使用说明

* **随机笔记**：访问根路径 `/`，系统将自动 302 重定向至随机生成的专属空白笔记（私有模式下需先通过管理员密码登录）。
* **新建 / 分类笔记**：点击侧边栏 `+ 新建`，或直接在地址栏输入 `/文件夹/笔记名`。
* **命令行直读 / 写入**：支持通过 `?pw=`、请求头 `-H "x-note-pw: <密码>"` 或 `curl -u :<密码>` 读写 Raw Markdown 内容。
* **管理总览**：访问 `/list`（需配置 `LIST_SECRET`）或在侧边栏底部进入 **图片 [管理]** 与 **分享 [管理]**。

---

##  开源许可

本项目遵循 [MIT License](LICENSE) 许可协议。

##  致谢

- 本项目源自对 [s0urcelab/serverless-cloud-notepad](https://github.com/s0urcelab/serverless-cloud-notepad) 的修改与重构
