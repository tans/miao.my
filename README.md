# MIAO 官网与文档

本仓库提供 MIAO 的中英双语官网、产品文档和原型示意图，并部署到 Vercel。完整应用源码位于 [`tans/miao`](https://github.com/tans/miao)，不在本仓库中。

## 本地开发

```sh
cd web
npm ci
npm run dev
```

打开 `http://localhost:5173`。构建并预览生产产物：

```sh
cd web
npm run build
npm run preview
```

构建输出到仓库根目录的 `dist/`。

## 页面与内容

- 首页、开始使用、社区、自托管和自托管成本页由 `web/` 中的 React 多页应用构建；每页有独立 HTML，不使用客户端路由。
- 页面共用 `copy/zh.toml`、`copy/en.toml` 文案源和 `assets/css/app.css` 样式产物。
- 用户手册、选择指南、行业示例和更新日志仍由静态 HTML 提供，构建时与 React 页面一起复制到 `dist/`。

## 部署

Vercel 从仓库根目录运行 `vercel.json` 中的构建命令（`cd web && npm ci && npm run build`），发布 `dist/`。旧 `/en/*` 链接会重定向到对应页面并保留 `lang=en`。

官网中的工作台界面和客户场景是原型演示，不代表真实客户或已验证成果。
