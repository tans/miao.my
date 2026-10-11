# MIAO 产品选择指南

这是一份事实导向的选择指南，帮助团队判断 MIAO 是否适合当前工作。它不是竞品排名，也不暗示 MIAO 正在复制 Budibase 的产品线。结论只描述当前公开源码、文档和已记录的边界；计划中的能力不算当前能力。

## 快速开始

- [安装与自托管](https://github.com/tans/miao#self-hosting)：部署单个 Go binary，并由部署方负责数据目录、HTTPS、备份和恢复。
- [第一次创建应用](./USER_GUIDE.md#创建应用)：登录工作区后，让小助手生成受控草稿，再由有权成员预览和确认。
- [运维与恢复](https://github.com/tans/miao/blob/main/docs/OPERATIONS.md) · [生成 API 文档](https://github.com/tans/miao/tree/main/docs/generated)

## 能力矩阵

| 能力 | 当前可用 | 现场验收 | 计划中 |
| --- | --- | --- | --- |
| Agent 创建应用、受控 JSON UI、版本发布 | 已实现；源码与用户手册 | [#50 产品与现场验收](https://github.com/tans/miao/issues/50) | [#53 执行总表](https://github.com/tans/miao/issues/53) |
| 状态流、真实记录、权限与后台任务 | 已实现；运维文档 | [#63 三场景闭环](https://github.com/tans/miao/issues/63) | [#64 最终验证](https://github.com/tans/miao/issues/64) |
| 声明式采集、公开只读页、图片授权 | 已实现；运维文档 | [#63 三场景闭环](https://github.com/tans/miao/issues/63) | [#62 真实环境准备](https://github.com/tans/miao/issues/62) |
| 备份、恢复、HTTPS、邮件与 AI 服务配置 | 运维责任已记录 | [#62 真实环境准备](https://github.com/tans/miao/issues/62) | [#64 最终验证](https://github.com/tans/miao/issues/64) |
| OCR、多语言扩展、通用拖拽编辑器 | 不承诺 | 不适用 | 不作当前产品承诺 |

## 边界矩阵

| 场景 | 当前边界 | 状态 |
| --- | --- | --- |
| 模型离线 | 已发布应用、确定性 CRUD、历史运行回执和已有采集结果仍可用；Agent 新建/修改和依赖模型的操作不可用 | 当前可用，目标环境需现场验收 |
| 附件 | 单文件最多 5 MB；支持 PNG、JPEG、GIF、WebP、PDF 和纯文本 | 当前可用 |
| CSV/XLSX | 每次读取前 100 行；每批导入最多 100 行，需预览并确认 | 当前可用 |
| 公开页面 | 仅公开已发布版本明确授权的页面、记录字段和图片；只读，不开放附件、关系、业务动作或写入 | 当前可用，目标环境需现场验收 |
| 应用界面 | schema v3/json-render 受控组件，已发布界面最多 12 个验证页面；不执行用户源码、SQL 或任意代码 | 当前可用 |

- [MIAO 产品资料](https://github.com/tans/miao/blob/main/PRODUCT.md)
- [MIAO README：能力与边界](https://github.com/tans/miao/blob/main/README.md)
- [MIAO 运维文档](https://github.com/tans/miao/blob/main/docs/OPERATIONS.md)
- [Budibase 官网](https://budibase.com/)
- [Budibase 开源仓库](https://github.com/Budibase/budibase)

## 先看结论

| 如果团队需要 | 结论 |
| --- | --- |
| 用自然语言描述内部流程，再由 Agent 生成受控的业务应用 | **适合 MIAO** |
| 在单机或自托管环境中保留数据，接受自己负责备份、HTTPS 和升级 | **适合 MIAO** |
| 受控页面、真实业务记录、状态流、后台任务和可审计的发布确认 | **适合 MIAO** |
| 拖拽优先的通用画布、任意代码或 SQL、复杂门户和匿名写入 | **当前不支持** |
| 需要更广泛的页面编排、云托管选项或外部产品集成 | **需要评估** |

## 六个判断维度

### 1. 创建方式：Agent-led 还是拖拽/配置优先

**MIAO：适合 MIAO。** MIAO 的产品定位是 agent-first：用户先描述工作，服务端 Agent 通过受限能力生成页面、数据结构和动作候选，再由成员预览和确认。Agent 没有 shell 访问，也不执行用户提交的任意应用源码。

**需要评估。** 如果团队需要可视化画布、表单配置器或低代码组件目录作为主要创作方式，应把交互方式和迁移成本与通用低代码平台分别验证。Budibase 的公开资料可作为其产品定位的原始参考：[官网](https://budibase.com/) 和[仓库说明](https://github.com/Budibase/budibase)。本文不对两者的体验、性能或价格排名。

**当前不支持。** MIAO 不是任意源码、SQL 或 shell 的执行环境，也不是一个承诺覆盖所有通用页面类型的画布。

来源：[PRODUCT.md](https://github.com/tans/miao/blob/main/PRODUCT.md)、[README Product boundaries](https://github.com/tans/miao/blob/main/README.md#product-boundaries)。

### 2. 部署：PocketBase + 单 Go binary 还是多服务/云托管

**MIAO：适合 MIAO。** MIAO 将 PocketBase 嵌入一个 Go 进程，身份、应用数据和权限由 PocketBase 与 MIAO API 共同处理；官方 README 将单 Go binary 自托管列为能力。数据目录、备份、恢复、域名、HTTPS、邮件和 AI/Jev 密钥由部署方负责。

**需要评估。** 如果团队偏好供应商托管、托管数据库、水平扩展或多服务平台，应评估自身运维能力和部署手册中的恢复流程。Budibase 的部署形态和组件应以其[官方文档和仓库](https://github.com/Budibase/budibase)为准；本文不做架构优劣判断。

**当前不支持。** 本指南不承诺 MIAO 提供云托管、SLA、自动扩缩容或免运维服务。

来源：[README Self-hosting](https://github.com/tans/miao/blob/main/README.md#self-hosting)、[PRODUCT.md](https://github.com/tans/miao/blob/main/PRODUCT.md)。

### 3. 页面范围：受控 JSON UI 与最多 12 个验证页面

**MIAO：适合 MIAO。** UI schema v3 使用受控的 json-render 组件，页面数据源绑定到真实资源，动作需要声明并经过服务端校验；产品边界写明已发布界面最多支持 12 个验证页面和固定字段动作。

**需要评估。** 如果一个应用需要大量自由布局页面、复杂营销站、任意组件或超过 12 页，应先用真实流程验证页面上限、关系、附件和动作是否够用。低代码产品的通用画布能力应参考各自公开资料，不凭本文推断。

**当前不支持。** MIAO 不把用户提交的任意前端源码作为页面运行，也不把“通用页面画布”作为当前承诺。

来源：[README Product boundaries](https://github.com/tans/miao/blob/main/README.md#product-boundaries)、[PRODUCT.md](https://github.com/tans/miao/blob/main/PRODUCT.md)。

### 4. 发布方式：公开只读与字段授权，还是对外写入门户

**MIAO：适合 MIAO。** 发布版本可以选择页面、数据源和字段，并通过明确的表与字段读取授权提供匿名只读页面。匿名运行时只使用当前已发布版本，不开放写入、附件、关系或业务动作；工作区成员权限仍由服务端检查。

**需要评估。** 如果需求是公开目录、状态查询或精选数据展示，先确认页面、字段和图片授权。若需求包含访客提交、客户自助修改、文件上传或复杂门户流程，应单独评估认证、反滥用和写入闭环。

**当前不支持。** MIAO 当前的匿名公开不是对外写入门户；不能把公开链接当作工作区访问授权。

来源：[PRODUCT.md](https://github.com/tans/miao/blob/main/PRODUCT.md)、[README Why MIAO](https://github.com/tans/miao/blob/main/README.md#why-miao)。

### 5. 工作闭环：真实记录、状态流、后台任务与采集回执

**MIAO：适合 MIAO。** MIAO 将真实业务记录保存在 PocketBase，通过 API 检查工作区、应用和记录权限；用户定义的状态机可绑定任意应用表。后台任务可由时间、记录或已认证外部事件触发，并保留运行尝试、权限和幂等回执。Agent 和采集脚本的外部 HTTP(S) 读取受到预算和授权范围限制。

**需要评估。** 如果团队需要多系统编排、供应商连接器、复杂事件总线或大规模自动化，应以实际流程和运维目标验证，不以“支持后台任务”推断完整自动化平台能力。Budibase 的公开定位可从[官网](https://budibase.com/)与[仓库](https://github.com/Budibase/budibase)核对。

**当前不支持。** MIAO 不承诺任意网络写入、任意 SQL、无限量导入或没有授权边界的自动化。CSV/XLSX 导入和单批导入当前限制为 100 行。

来源：[PRODUCT.md](https://github.com/tans/miao/blob/main/PRODUCT.md)、[README Features](https://github.com/tans/miao/blob/main/README.md#features)。

### 6. 治理：许可、数据归属、密钥位置与验收证据

**MIAO：适合 MIAO。** MIAO 源码采用 Apache License 2.0；应用数据和身份以自托管部署的数据目录为中心，部署方负责备份与恢复。长期 AI 凭据保存在服务端，浏览器通过认证代理请求。发布、写入和后台运行保留确认或运行回执，适合把验收写成可重复的业务流程检查。

**需要评估。** 组织仍需核对 Apache 2.0、第三方依赖和 MIAO 商标限制，制定自己的数据保留、备份、恢复、密钥轮换和访问审计策略。Budibase 的许可和部署条款应直接以其[仓库](https://github.com/Budibase/budibase)及官方资料为准。

**当前不支持。** 本指南不声称任何特定客户、价格、SLA、合规认证或部署结果，也不把原型截图当作生产验收证据。MIAO 仓库明确说明客户证明、采用数据、价格和部署承诺没有验证资料。

来源：[README License](https://github.com/tans/miao/blob/main/README.md#license)、[PRODUCT.md Evidence on Hand](https://github.com/tans/miao/blob/main/PRODUCT.md#evidence-on-hand)、[Operations guide](https://github.com/tans/miao/blob/main/docs/OPERATIONS.md)。

## 建议的验收顺序

1. 用一个真实但边界清楚的内部流程验证“描述 → 草稿 → 预览 → 发布”。
2. 用真实角色验证记录读取、字段权限、状态流和冲突处理。
3. 在隔离环境验证备份、恢复、HTTPS、邮件、AI 密钥和日志策略。
4. 用一个只读公开页面验证页面、字段、图片和撤销发布边界。
5. 再决定是否需要更多页面、外部写入、云托管或更复杂的自动化。

本页的结论可能随公开源码和文档变化。实施前请以对应仓库的当前版本、运维文档和本组织的安全评审为准。
