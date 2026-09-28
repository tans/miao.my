# MIAO 官网与文档

MIAO 是开源企业内部工作台。本仓库目录提供独立静态官网和产品文档，可直接作为 Vercel 项目部署；完整应用支持单独自托管，详见产品文档。

## 本地预览

用任意静态 HTTP 服务器将本目录作为站点根目录，例如：

```sh
python3 -m http.server 4173
```

然后打开 `http://localhost:4173`。

## 部署到 Vercel

在 Vercel 导入此目录（或将此目录作为项目根目录），无需 Build Command，Output Directory 使用 `.`。站点为纯静态 HTML/CSS，无需安装依赖。

此工程只包含官网和文档，不含原应用的 Fastify API、PocketBase 或登录/工作区功能。完整应用后端需单独部署。

## 目录

- `index.html`：官网
- `docs/`：产品文档
- `assets/mascots/`：官网使用的 MIAO 猫咪素材
- `assets/scenes/`：AI 生成的工作场景示意图
- `styles.css`：站点样式
- `vercel.json`：静态路由与图片缓存设置

场景图由内置 ImageGen 生成，提示词：

> Candid editorial photograph of a small Chinese business team using a lightweight internal workbench to coordinate daily operations; a modest bright office connected to a tidy stockroom, two colleagues reviewing a tablet and paper inventory list, another preparing a shipment; natural morning light, off-white, sage green and soft wood; no legible text, logos or watermark.

官网的工作台界面与三组客户场景均为原型演示内容；虚构案例不代表真实客户或已验证成果。
