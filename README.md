# MIAO 官网与文档

MIAO 是开源企业内部工作台。本仓库提供中英双语官网、用户手册和英文产品示意图，作为 Vercel 项目部署。完整应用单独自托管，源码见 [`tans/miao`](https://github.com/tans/miao)。

官网由 React MPA（多页面应用）构建，与遗留静态页（文档、指南、示例）共存，两者共用一份样式（`assets/css/app.css`）。

## 本地预览

```sh
cd web
npm ci
npm run dev
```

打开 `http://localhost:5173`。dev server 通过 `web/scripts/dev-layout.mjs` 以生产 URL 布局服务各页面（`/`、`/get-started/`、`/docs/` 等）。

生产构建与预览：

```sh
cd web
npm run build       # 输出到 ../dist，含静态页拷贝与 URL 布局整理
npm run preview     # 预览 http://localhost:5173
```

## 部署到 Vercel

项目根即为 Vercel 项目根，`vercel.json` 配置了构建与服务规则：

- Build Command：`cd web && npm ci && npm run build`
- Output Directory：`dist`
- `/en/(.*)` 永久重定向到 `/$1?lang=en`（兼容旧链接：英文版已并入同一 URL，语言由 `?lang=` / localStorage 切换，无独立英文文件）

## 架构

### React MPA（`web/`，主力页面）
- `web/src/pages/*.html` + `*.tsx`：9 个页面入口（home、get-started、community、self-hosting、self-hosting-costs、integrations、product-agents、showcases）
- `web/src/components/`：React 组件（`site/` 站点骨架，`ui/` 基础组件）
- `web/src/lib/`：i18n（`i18n.ts`、`locale.tsx`）与 copy 生成（`copy.gen.ts`）
- `web/vite.config.ts`：Vite 多入口构建（每页独立 HTML）
- `web/scripts/postbuild.mjs`：构建后把产物排到站点 URL 布局，并拷贝遗留静态页到 `dist/`
- `web/scripts/gen-copy.py`：从 `copy/*.toml` 生成 `copy.gen.ts`（React 的 i18n 数据）
- `web/src/index.css`：Tailwind 主题配置（仅 React 组件路径使用）

### 遗留静态页（`docs/`、`guide/`、`examples.html`、`changelog.html`）
尚未迁移到 React 的内容页，由 postbuild 原样拷贝进 `dist/`。每页均为**单文件双语**（zh/en 两个区块，客户端切换，默认中文）：

- `docs/`：用户手册（zh 与 en 的 .md 正文 + 生成的静态页 + 12 张原型界面）、产品选择指南正文
- `guide/`：双语产品选择指南静态页（由 `scripts/build-decision-guide.py` 生成，无 Pandoc 依赖）
- `docs/index.html`：由 `python3 scripts/build-docs.py` 生成（需要 Pandoc）
- `examples.html`：行业示例，内容源为 `content/examples.{zh,en}.md`，由 `scripts/build-content.py` 生成
- `changelog.html`：更新日志，内容源为 `content/changelog.{zh,en}.md`，由 `scripts/build-content.py` 生成
- `scripts/bilingual.py`：合并 zh/en 两版为单文件双语页，注入 `assets/js/site-switch.js` 切换
- `content/`：以上内容页的 Markdown 单一来源（英文版为 `*.en.md`）+ `layouts/` 页面骨架；改内容后运行 `python3 scripts/build-content.py` 重新生成 HTML

### 样式（单一产物）
- `assets/css/app.css`：唯一的站点样式表，Tailwind CSS 4 + daisyUI 5 编译产物
- `styles.css`、`showcases.css`、`examples.css`、`integrations/integrations.css`：样式构建输入，由 `scripts/build-css.sh` 编译进 `app.css`，不再被页面直接引用
- `assets/mascots/`、`assets/scenes/`、`assets/fonts/`：素材与自托管字体

### 其他
- `copy/{zh,en}.toml`：i18n 文案单一来源（React 与静态页渲染共用）
- `scripts/`：文档/样式/llms 生成脚本
- `llms.txt`：AI 友好站点索引，由 `scripts/gen-llms.py` 生成

此工程只包含官网和文档，不含原应用的 Fastify API、PocketBase 或登录/工作区功能。完整应用后端需单独部署。

场景图由内置 ImageGen 生成，提示词：

> Candid editorial photograph of a small Chinese business team using a lightweight internal workbench to coordinate daily operations; a modest bright office connected to a tidy stockroom, two colleagues reviewing a tablet and paper inventory list, another preparing a shipment; natural morning light, off-white, sage green and soft wood; no legible text, logos or watermark.

官网的工作台界面与三组客户场景均为原型演示内容；虚构案例不代表真实客户或已验证成果。