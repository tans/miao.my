# MIAO website copy review

This inventory separates product facts from marketing language. English is the source wording; the Chinese copy follows the same meaning without translating sentence structure mechanically.

## Keep

- **Positioning:** an Agent workspace for internal team operations.
- **Core loop:** describe work → shape a controlled draft → preview and publish → use real records → operate authorized background jobs.
- **Concrete scope:** customers, orders, requests, projects, service work and other repeatable internal workflows.
- **Trust boundaries:** server-side permissions, review before writes or publishing, controlled UI schemas, read-only public pages, and run receipts.
- **Deployment:** open source and self-hostable as one Go process with embedded PocketBase. The operator owns HTTPS, backups, recovery, mail and model configuration.
- **Proof style:** prototypes are illustrative; scenario pages are examples, not customer claims.

## Remove or avoid

- “Build any app” and other unlimited low-code promises.
- “AI-ready”, “AI-powered” and similar adjectives when they do not explain a user action.
- Claims about customers, adoption, pricing, SLA, compliance, OCR, unlimited imports or general SaaS integrations.
- Budibase feature names or copy that implies MIAO has features it does not have.
- Vague automation language. Say what triggers a job, what it can read or write, and where the receipt is kept.
- Treating screenshots, templates or candidate scenarios as shipped customer solutions.

## Replace with

| Surface | English | 中文 |
| --- | --- | --- |
| Homepage title | **An Agent workspace for internal team operations** | **团队内部工作的 Agent 工作台** |
| Homepage lead | For teams managing customers, orders and daily operations: describe work in natural language, let a server-side Agent shape a controlled draft, collaborate on records, then run authorized background jobs. | 面向管理客户、订单和日常运营的团队：用自然语言描述需求，由服务端 Agent 生成受控草稿，协作处理记录，再运行授权的后台任务。 |
| Primary CTA | **Get started** | **开始使用** |
| Evaluation CTA | **Decision guide** | **产品指南** |
| Open-source CTA | **Source / self-host ↗** | **开源源码 / 自托管 ↗** |
| Story heading | **From a request to an internal app that keeps running** | **从一个需求，到持续运行的内部应用** |
| Describe step | **Describe the work and its boundaries** | **描述工作，也描述边界** |
| Shape step | **Shape controlled structures and review the draft** | **生成受控结构，检查界面草稿** |
| Use step | **Handle everyday work in the workspace** | **在工作区里处理真实工作** |
| Operate step | **Keep authorized work running** | **让授权的工作持续运行** |

## Page-by-page decision

| Page | Keep | Remove | New emphasis |
| --- | --- | --- | --- |
| Homepage | Four-step workflow and concrete limits | Generic AI slogans and broad builder claims | One clear promise, then evidence and boundaries |
| Product decision guide | Capability and boundary matrices | Competitor comparison implied by Budibase reference | “Fits / evaluate / not supported” decisions |
| User guide | Actual entry points, roles, permissions and confirmation flow | Marketing language inside operational instructions | Explain what a user can do now and what is checked |
| Examples | Scenario diagrams as possibilities | Any wording that reads like a customer case study | Label every item as a scenario or candidate template |
| Self-hosting | One-process architecture and operator responsibilities | Implied hosted service or SLA | Make deployment responsibility explicit |
| Integrations | HTTP(S) read, collection, internal data and controlled actions | Logos or unverified SaaS connectors | Separate available, controlled and planned capabilities |

## Editorial rules

1. Lead with the work, not the model.
2. Use “Agent” when the server-side Agent is the actual product mechanism; use “assistant” only for the user-facing entry point.
3. Pair each capability claim with its boundary when a reader could otherwise overread it.
4. Prefer verbs: describe, review, publish, search, edit, confirm, inspect and operate.
5. Keep English natural and direct. Keep Chinese concise and idiomatic; do not preserve English word order.
6. Do not add a capability to make the page sound complete. If it is not in MIAO, omit it.

## Current implementation scope

The homepage, bilingual decision guide, user guide, examples, self-hosting page and integrations page are the copy surfaces covered by this review. Product behavior, API details and operational procedures remain in the MIAO application repository; this website should link to those sources instead of duplicating them.
