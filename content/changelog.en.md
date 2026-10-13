# Changelog

## v0.0.1
- date: 2026-10-10
- tags: Packaged
- links: Release | https://github.com/tans/miao/releases/tag/v0.0.1 | Commit | https://github.com/tans/miao/commit/aca7ce5

- **First packaged release.** Download the binary archive from GitHub Releases; no Go toolchain or npm dependency download is required at runtime. Verify the SHA-256 using the matching `.sha256` attachment.
- The API test suite moved to the miao-test repository.
- Fixed stale LLM configuration resets and restored controlled LLM decision proposals.
- Made the workspace sidebar more compact and added assistant visibility controls.
- Business configuration views are now read-only.

## 2026-10-09
- date: Build 3388d67
- tags: Source record
- pending: yes
- links: Commit | https://github.com/tans/miao/commit/3388d67

- **Application icons and version switching.** Added an application icon selector and runtime version switching.
- Self-hosted DaisyUI and Tailwind browser resources.
- Publishing conversational UI drafts no longer needs a second confirmation; removed the draft and version history blocks from the app runtime.
- Fixed form deduplication, runtime settings, workspace selector bounds, assistant loading and model errors.
- Disabled the legacy LLM Agent flow; Jev evaluations now use Typesafe.

## 2026-10-08
- tags: Source record
- pending: yes

- **Publishing and SSE updates.** Publish application changes, switch versions, and receive assistant/runtime updates through SSE.
- Agent runs now use background tasks; platform titles are configurable.
- Fixed data retention on app deletion, session restoration, legacy schema convergence and runtime package metadata archival.

## 2026-10-07
- tags: Major day | Source record
- pending: yes

- **Workspace foundation completed.** Docked the assistant as a third-column terminal-style panel and simplified workspace switching.
- **Full UI localization.** Assistant, imports, settings, collection results, usage notices, administration and the English workspace are localized.
- Added conversational UI publishing/editing, staged assistant traces, and invitation links that expire after 24 hours.
- Completed collection workflows: external HTTP source reads, Typesafe Jev endpoints and independent notification retries.
- Overview cards show app usage statistics; added the production release switching script.

## 2026-10-03 – 10-06

- **Controlled json-render runtime.** The backend harness and json-render rendering runtime are live; drafts are composed and validated through the harness.
- **Business actions and workflows.** General transactional business actions, input declaration validation, workflow state machines and restricted external connectors.
- Background tasks moved to the shared Runtime; published read-only public app pages; Jev decisions use a fixed-version evaluator.
- Fixed a batch of stability issues: attachment and outbound migration, automation retries, in-transaction AI quota reservation and transactional account deletion.

## 2026-09-28 – 10-02
- tags: Architecture | Source record
- pending: yes

- **Go + PocketBase.** Replaced the Mongo/DSH stack with embedded PocketBase and a single Go binary.
- **Agent-first workspace.** Added versioned application runs, draft history, historical recovery and persistent private conversations.
- Added durable background tasks, member invitations and the enterprise gateway.

## 2026-08-21 – 09-03
- tags: Starting point | Source record
- pending: yes

- **Project started.** Core API, MongoDB runtime, workspace UI and ontology design kernel.
- Added DeepSeek Harness Agent, MCP sessions, permission tracking and tenant file assets.
- Added backup/restore scripts, Docker deployment and nginx reverse proxy support.
