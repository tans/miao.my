import { useEffect, useMemo, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCopy } from "@/lib/i18n";
import { useLocale, usePageMeta } from "@/lib/locale";

const SCENES = ["workbench", "factory", "sales", "projects", "orders", "ai", "launch", "network"] as const;
type Scene = (typeof SCENES)[number];

/** scene name → copy.toml panel section (runs take the section of that stage). */
const SCENE_SECTION: Record<Scene, string> = {
  workbench: "background",
  factory: "build",
  sales: "deals",
  projects: "projects",
  orders: "service",
  ai: "ship",
  launch: "release",
  network: "network",
};

function Symbols() {
  return (
    <svg className="showcase-symbols" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <symbol id="icon-spark" viewBox="0 0 24 24"><path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4Z" /></symbol>
        <symbol id="icon-home" viewBox="0 0 24 24"><path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7" /></symbol>
        <symbol id="icon-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></symbol>
        <symbol id="icon-circle" viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-8-8" /><path d="M16 4h4v4" /></symbol>
        <symbol id="icon-shield" viewBox="0 0 24 24"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" /><path d="m8 12 3 3 5-6" /></symbol>
        <symbol id="icon-settings" viewBox="0 0 24 24"><path d="m9 3-1 3-3 1-2 3 2 2-1 4 3 2 3-1 2 4 3-2 1-3 4-1 1-4-3-2V5l-4-1-2 2Z" /><circle cx="12" cy="12" r="3" /></symbol>
      </defs>
    </svg>
  );
}

function MockSidebar() {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  return (
    <aside className="mock-sidebar" aria-label={t("showcases.workspace.aria")}>
      <div className="mock-brand"><img src="/assets/mascots/cat-logo-head.png" alt="" /><strong>{t("showcases.workspace.brand")}</strong><span>{t("showcases.workspace.brand_kbd")}</span></div>
      <div className="mock-space"><span className="space-mark">{t("showcases.workspace.space_mark")}</span><span>{t("showcases.workspace.space_name")}</span><b>{t("showcases.workspace.space_chevron")}</b></div>
      <div className="mock-label">{t("showcases.workspace.nav_label_main")}</div>
      <nav className="mock-nav app-nav" aria-label={t("showcases.workspace.nav_label_main")}>
        <div className="mock-nav active"><span className="nav-icon"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-home" /></svg></span>{t("showcases.workspace.nav_home")}</div>
        <div className="mock-nav"><span className="nav-icon"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-grid" /></svg></span>{t("showcases.workspace.nav_apps")}</div>
        <div className="mock-nav"><span className="nav-icon"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-spark" /></svg></span>{t("showcases.workspace.nav_assistant")}</div>
      </nav>
      <div className="mock-label">{t("showcases.workspace.nav_label_mine")}</div>
      <nav className="mock-nav" aria-label={t("showcases.workspace.nav_label_mine")}>
        <div className="mock-nav"><span className="nav-icon"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-settings" /></svg></span>{t("showcases.workspace.app_deals")}</div>
        <div className="mock-nav"><span className="nav-icon"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-grid" /></svg></span>{t("showcases.workspace.app_projects")}</div>
        <div className="mock-nav"><span className="nav-icon"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-circle" /></svg></span>{t("showcases.workspace.app_service")}</div>
      </nav>
      <div className="mock-sidebar-foot"><span className="btn btn-ghost btn-xs">{t("showcases.workspace.topbar_new")}</span></div>
    </aside>
  );
}

function ScenePanel({ scene, shown, visible, flashSeq }: { scene: Scene; shown: Set<string>; visible: boolean; flashSeq: number }) {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  const s = (k: string) => t(`showcases.scene_${SCENE_SECTION[scene]}.${k}`);
  switch (scene) {
    case "workbench":
      return (
        <section className={"scene-panel scene-" + scene + (visible ? " is-visible" : "")} data-scene-panel={scene} aria-hidden={!visible} inert={!visible}>
          <div className="scene-heading"><span>{t("showcases.scene_background.kicker")}</span><h2>{t("showcases.scene_background.h2")}</h2><p>{t("showcases.scene_background.lede")}</p></div>
          <div className="overview-grid">
            <div className="overview-card primary-card"><span className="card-icon"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-spark" /></svg></span><b>{t("showcases.scene_background.summary_title")}</b><p>{t("showcases.scene_background.summary_body")}</p><span className="card-link">{t("showcases.scene_background.summary_link")}</span></div>
            <div className="overview-card"><span className="card-metric">{t("showcases.scene_background.tasks_metric")}</span><span>{t("showcases.scene_background.tasks_label")}</span><small>{t("showcases.scene_background.tasks_note")}</small></div>
            <div className="overview-card"><span className="card-metric">{t("showcases.scene_background.apps_metric")}</span><span>{t("showcases.scene_background.apps_label")}</span><small>{t("showcases.scene_background.apps_note")}</small></div>
          </div>
          <div className="scene-table">
            <div className="table-head"><b>{t("showcases.scene_background.table_title")}</b><span>{t("showcases.scene_background.table_link")}</span></div>
            {[1, 2, 3].map((n) => (
              <div className="table-row" key={n}><i className={"app-dot dot-" + ["green", "blue", "orange"][n - 1]}></i><span>{t(`showcases.scene_background.row${n}_name`)}</span><small>{t(`showcases.scene_background.row${n}_time`)}</small><b>{t(`showcases.scene_background.row${n}_status`)}</b></div>
            ))}
          </div>
        </section>
      );
    case "factory":
      return (
        <section className={"scene-panel scene-" + scene + (visible ? " is-visible" : "")} data-scene-panel={scene} aria-hidden={!visible} inert={!visible}>
          <div className="scene-heading"><span>{t("showcases.scene_build.kicker")}</span><h2>{t("showcases.scene_build.h2")}</h2><p>{t("showcases.scene_build.lede")}</p></div>
          <div className="prompt-card"><div className="prompt-avatar"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-spark" /></svg></div><div><b>{t("showcases.scene_build.prompt")}</b><p>{t("showcases.scene_build.prompt_note")}</p></div><span className="btn btn-neutral btn-xs" aria-hidden="true">{t("showcases.scene_build.prompt_btn")}</span></div>
          <div className="factory-results">
            {[1, 2, 3].map((n) => (
              <div className={"factory-result" + (n === 1 ? " is-building" : "")} key={n}><span className="result-icon"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-circle" /></svg></span><div><b>{t(`showcases.scene_build.result${n}_app`)}</b><small>{t(`showcases.scene_build.result${n}_change`)}</small></div><em>{t(`showcases.scene_build.result${n}_tag`)}</em></div>
            ))}
          </div>
          <p className="concept-note">{t("showcases.scene_build.note")}</p>
        </section>
      );
    case "sales":
      return (
        <section className={"scene-panel scene-" + scene + (visible ? " is-visible" : "")} data-scene-panel={scene} aria-hidden={!visible} inert={!visible}>
          <div className="scene-heading"><span>{s("kicker")}</span><h2>{s("h2")}</h2></div>
          <div className="pipeline">
            <div className="pipeline-col"><span>{s("col1_label")}<b>{s("col1_count")}</b></span>
              <div className="deal deal-blue"><b>{s("deal1_name")}</b><small>{s("deal1_meta")}</small></div>
              <div className="deal"><b>{s("deal2_name")}</b><small>{s("deal2_meta")}</small></div>
            </div>
            <div className="pipeline-col"><span>{s("col2_label")}<b>{s("col2_count")}</b></span>
              <div className="deal deal-yellow"><b>{s("deal3_name")}</b><small>{s("deal3_meta")}</small><strong className="demo-change demo-change-sales" key={flashSeq} hidden={!shown.has("sales")}>{s("deal3_change")}</strong></div>
              <div className="deal"><b>{s("deal4_name")}</b><small>{s("deal4_meta")}</small></div>
            </div>
            <div className="pipeline-col"><span>{s("col3_label")}<b>{s("col3_count")}</b></span>
              <div className="deal deal-green"><b>{s("deal5_name")}</b><small>{s("deal5_meta")}</small><strong>{s("deal5_status")}</strong></div>
            </div>
          </div>
          <div className="scene-footline"><span>{s("foot1_label")}<b>{s("foot1_value")}</b></span><span>{s("foot2_label")}<b>{s("foot2_value")}</b></span></div>
        </section>
      );
    case "projects":
      return (
        <section className={"scene-panel scene-" + scene + (visible ? " is-visible" : "")} data-scene-panel={scene} aria-hidden={!visible} inert={!visible}>
          <div className="scene-heading"><span>{s("kicker")}</span><h2>{s("h2")}</h2></div>
          <div className="project-progress"><div><span>{s("progress_label")}</span><b>{s("progress_value")}</b></div><progress className="progress progress-success" value="68" max="100"></progress><small>{s("progress_note")}</small></div>
          <div className="project-timeline">
            <div className="timeline-item done"><span></span><div><b>{s("task1_title")}</b><small>{s("task1_note")}</small></div><time>{s("task1_date")}</time></div>
            <div className="timeline-item active"><span></span><div><b>{s("task2_title")}</b><small>{s("task2_note")}</small></div><time>{s("task2_date")}</time></div>
            <div className="timeline-item"><span></span><div><b>{s("task3_title")}</b><small>{s("task3_note")}</small></div><time>{s("task3_date")}</time></div>
            <div className={"timeline-item demo-change demo-change-projects"} key={flashSeq} hidden={!shown.has("projects")}><span></span><div><b>{s("change_title")}</b><small>{s("change_note")}</small></div><time>{s("change_tag")}</time></div>
          </div>
        </section>
      );
    case "orders":
      return (
        <section className={"scene-panel scene-" + scene + (visible ? " is-visible" : "")} data-scene-panel={scene} aria-hidden={!visible} inert={!visible}>
          <div className="scene-heading"><span>{s("kicker")}</span><h2>{s("h2")}</h2></div>
          <div className="service-summary">
            {[1, 2, 3].map((n) => (
              <div key={n}><span>{s(`sum${n}_label`)}</span><b>{s(`sum${n}_value`)}</b><small>{s(`sum${n}_note`)}</small></div>
            ))}
          </div>
          <div className="service-list">
            {[1, 2, 3].map((n) => (
              <div key={n}><i className={n === 1 ? "status-dot urgent" : "status-dot"}></i><div><b>{s(`ticket${n}_title`)}</b><small>{s(`ticket${n}_meta`)}</small></div><span className={"status-tag" + (n === 2 ? " done" : "")}>{s(`ticket${n}_status`)}</span></div>
            ))}
            <div className="demo-change demo-change-orders" key={flashSeq} hidden={!shown.has("orders")}><i className="status-dot urgent"></i><div><b>{s("change_title")}</b><small>{s("change_meta")}</small></div><span className="status-tag">{s("change_status")}</span></div>
          </div>
        </section>
      );
    case "ai":
      return (
        <section className={"scene-panel scene-" + scene + (visible ? " is-visible" : "")} data-scene-panel={scene} aria-hidden={!visible} inert={!visible}>
          <div className="scene-heading"><span>{t("showcases.scene_ship.kicker")}</span><h2>{t("showcases.scene_ship.h2")}</h2></div>
          <div className="ai-builder">
            <div className="builder-message user-message"><span>{t("showcases.scene_ship.user_msg1")}<br />{t("showcases.scene_ship.user_msg2")}</span></div>
            <div className="builder-message ai-message"><span className="ai-mini-mark"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-spark" /></svg></span><div><b>{t("showcases.scene_ship.ai_lead")}</b><p>{t("showcases.scene_ship.ai_body1")}<br />{t("showcases.scene_ship.ai_body2")}</p><div className="change-preview"><span>{t("showcases.scene_ship.change_nodes")}</span><span>{t("showcases.scene_ship.change_apps")}</span><span>{t("showcases.scene_ship.change_rollback")}</span></div></div></div>
            <div className="builder-actions" aria-hidden="true"><span className="btn btn-neutral btn-xs">{t("showcases.scene_ship.btn_review")}</span><span className="btn btn-ghost btn-xs">{t("showcases.scene_ship.btn_rollback")}</span></div>
            <div className="builder-cursor"><i></i><span>{t("showcases.scene_ship.cursor")}</span></div>
          </div>
        </section>
      );
    case "launch":
      return (
        <section className={"scene-panel scene-" + scene + (visible ? " is-visible" : "")} data-scene-panel={scene} aria-hidden={!visible} inert={!visible}>
          <div className="scene-heading"><span>{t("showcases.scene_release.kicker")}</span><h2>{t("showcases.scene_release.h2")}</h2></div>
          <div className="release-card">
            <div className="release-top"><span className="release-version">{t("showcases.scene_release.version")}</span><span className="release-status"><i></i>{t("showcases.scene_release.status")}</span><time>{t("showcases.scene_release.time")}</time></div>
            <div className="release-change"><span className="release-plus">{t("showcases.scene_release.plus")}</span><div><b>{t("showcases.scene_release.change_title")}</b><small>{t("showcases.scene_release.change_scope")}</small></div><span className="btn btn-ghost btn-xs" aria-hidden="true">{t("showcases.scene_release.review_btn")}</span></div>
            <div className="release-meta"><span>{t("showcases.scene_release.publisher_label")}<b>{t("showcases.scene_release.publisher")}</b></span><span>{t("showcases.scene_release.impact_label")}<b>{t("showcases.scene_release.impact")}</b></span><span>{t("showcases.scene_release.rollback")}</span></div>
          </div>
          <div className="governance-row"><span><i className="mini-icon"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-shield" /></svg></i>{t("showcases.scene_release.gov1_label")}</span><b>{t("showcases.scene_release.gov1_value")}</b><span><i className="mini-icon"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-circle" /></svg></i>{t("showcases.scene_release.gov2_label")}</span><b>{t("showcases.scene_release.gov2_value")}</b></div>
        </section>
      );
    case "network":
      return (
        <section className={"scene-panel scene-" + scene + (visible ? " is-visible" : "")} data-scene-panel={scene} aria-hidden={!visible} inert={!visible}>
          <div className="scene-heading"><span>{s("kicker")}</span><h2>{s("h2")}</h2><p>{s("lede")}</p></div>
          <div className="network-map">
            <div className="network-node node-center"><span>{s("center_label")}</span><small>{s("center_sub")}</small></div>
            <div className="network-node node-one"><span>{s("node1_label")}</span><small>{s("node1_sub")}</small></div>
            <div className="network-node node-two"><span>{s("node2_label")}</span><small>{s("node2_sub")}</small></div>
            <div className="network-node node-three"><span>{s("node3_label")}</span><small>{s("node3_sub")}</small></div>
            <i className="network-line line-one"></i><i className="network-line line-two"></i><i className="network-line line-three"></i>
          </div>
          <p className="concept-note">{s("note")}</p>
        </section>
      );
  }
}

/**
 * The interactive assistant: chip → preview → confirm → tour (three
 * apps change in sequence) → complete, with rollback. Port of
 * showcases.js, state machine kept in React.
 */
function Assistant({
  onShowChanges,
  onHideChanges,
  onSetScene,
  onLock,
  onUnlock,
}: {
  onShowChanges: (kind: string) => void;
  onHideChanges: () => void;
  onSetScene: (s: Scene) => void;
  onLock: () => void;
  onUnlock: () => void;
}) {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  const label = (s: Scene) => t(`showcases.tour.scene_${s}_name`);
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

  type Msg = { kind: "user" | "ai" | "status"; html: string };
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [threadOn, setThreadOn] = useState(false);
  const [chipDisabled, setChipDisabled] = useState(false);
  const stateRef = useRef<"idle" | "preview" | "running" | "done">("idle");
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [msgs]);

  const addMsg = (msg: Msg) => setMsgs((m) => [...m, msg]);

  async function runTour(hold: number) {
    for (const kind of ["sales", "projects", "orders"] as const) {
      onSetScene(kind);
      onShowChanges(kind);
      await wait(hold);
    }
  }

  async function startPreview() {
    stateRef.current = "preview";
    setThreadOn(true);
    setChipDisabled(true);
    addMsg({ kind: "user", html: t("showcases.tour.prompt") });
    await wait(650);
    addMsg({ kind: "ai", html: t("showcases.tour.preview") });
  }

  async function runDemo() {
    if (stateRef.current !== "preview") return;
    stateRef.current = "running";
    setChipDisabled(true);
    addMsg({ kind: "status", html: `<div class="thread-status" role="status"><i></i><b>${t("showcases.tour.running")} · ${label("sales")}</b></div>` });
    await wait(450);
    onLock();
    await runTour(950);
    onUnlock();
    setMsgs((m) => m.filter((msg) => msg.kind !== "status"));
    addMsg({ kind: "ai", html: t("showcases.tour.complete") });
    stateRef.current = "done";
    setChipDisabled(false);
  }

  const handleChip = () => {
    if (stateRef.current === "preview" || stateRef.current === "running") return;
    if (stateRef.current === "done") {
      setMsgs([]);
      setThreadOn(false);
      onHideChanges();
      stateRef.current = "idle";
    }
    void startPreview();
  };

  const handleThreadClick = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.closest(".thread-confirm")) void runDemo();
    else if (el.closest(".thread-review")) void runTour(500);
    else if (el.closest(".thread-rollback")) {
      onHideChanges();
      stateRef.current = "preview";
      setChipDisabled(true);
      addMsg({ kind: "ai", html: t("showcases.tour.rolled_back") });
    }
  };

  return (
    <aside className="mock-assistant" aria-label={t("showcases.assistant.aria")}>
      <div className="assistant-head"><span><i></i>{t("showcases.assistant.title")}</span><span className="btn btn-ghost btn-xs" aria-hidden="true">{t("showcases.assistant.menu")}</span></div>
      <div className="assistant-body">
        <div className="assistant-greeting"><span className="assistant-spark"><svg className="showcase-icon" aria-hidden="true"><use href="#icon-spark" /></svg></span><p>{t("showcases.assistant.greeting")}</p></div>
        <div className="assistant-thread" ref={threadRef} hidden={!threadOn} aria-live="polite" onClick={handleThreadClick}>
          {msgs.map((m, i) => (
            <div key={i} className={"thread-msg " + m.kind} dangerouslySetInnerHTML={{ __html: m.html }} />
          ))}
        </div>
        <div className="assistant-suggestion"><span>{t("showcases.assistant.suggestion_label")}</span><b>{t("showcases.assistant.suggestion")}</b><span className="btn btn-ghost btn-xs" aria-hidden="true">{t("showcases.assistant.open_btn")}</span></div>
        <div className="assistant-line"><span></span><span></span><span></span></div>
      </div>
      <div className="assistant-input">
        <button type="button" className="assistant-chip" aria-controls="assistant-thread" aria-expanded={threadOn} disabled={chipDisabled} onClick={handleChip}>
          {t("showcases.assistant.chip")}
        </button>
        <span className="input-hint">{t("showcases.assistant.hint")}<i>{t("showcases.assistant.enter")}</i></span>
      </div>
    </aside>
  );
}

export default function Showcases() {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  usePageMeta("showcases.title", ["showcases.meta"]);

  const [scene, setScene] = useState<Scene>("workbench");
  const sceneRef = useRef(scene);
  sceneRef.current = scene;
  /** demo: which app panels the AI tour has revealed (sales/projects/orders). */
  const [shown, setShown] = useState<Set<string>>(new Set());
  /** bump to re-trigger the change-flash animation. */
  const [flashSeq, setFlashSeq] = useState(0);
  const reduced = useMemo(() => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false), []);
  const demoLockRef = useRef(false);

  useEffect(() => {
    if (reduced) document.documentElement.classList.add("reduced-motion");
  }, [reduced]);

  // flash the revealed change chips when the tour advances.
  useEffect(() => {
    if (shown.size === 0) return;
    document.querySelectorAll(".demo-change:not([hidden])").forEach((el) => {
      const e = el as HTMLElement;
      e.classList.remove("is-flash");
      void e.offsetWidth;
      e.classList.add("is-flash");
    });
  }, [flashSeq, shown]);

  // scroll-spy: the journey step nearest the viewport centre drives the scene.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (demoLockRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setScene((entry.target as HTMLElement).dataset.scene as Scene);
        });
      },
      { rootMargin: "-44% 0px -44% 0px", threshold: 0 }
    );
    document.querySelectorAll(".journey-step").forEach((li) => observer.observe(li));
    return () => observer.disconnect();
  }, []);

  // keyboard paging: ↑↓ / PageUp / PageDown move through the journey.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(event.key)) return;
      if (demoLockRef.current || (event.target as HTMLElement).closest("input, textarea, a, button:not(.journey-step button)")) return;
      event.preventDefault();
      const currentIndex = SCENES.indexOf(sceneRef.current);
      const direction = event.key === "ArrowUp" || event.key === "PageUp" ? -1 : 1;
      const journeyTop = document.querySelector(".showcase-journey")?.getBoundingClientRect().top ?? 0;
      const beforeJourney = journeyTop > innerHeight / 2;
      const nextIndex = beforeJourney && direction > 0 ? 0 : currentIndex + direction;
      const next = SCENES[Math.min(SCENES.length - 1, Math.max(0, nextIndex))];
      document.querySelector(`[data-scene="${next}"]`)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [reduced]);

  const name = (s: Scene) => t(`showcases.tour.scene_${s}_name`);

  return (
    <SiteLayout active="showcases" bodyClass="showcase-page" mainClass="showcase-main" mainId="workbench-main" skipTarget="workbench">
      <Symbols />

      <section className="showcase-intro" aria-labelledby="showcase-title">
        <div className="intro-copy">
          <h1 id="showcase-title">{t("showcases.h1a")}<br /><em>{t("showcases.h1b")}</em></h1>
          <p className="intro-lead">{t("showcases.lede1")}{t("showcases.lede2")}</p>
          <aside className="showcase-evidence" aria-label={t("showcases.evidence_aria")}><strong>{t("showcases.evidence_tag")}</strong><p>{t("showcases.evidence_body1")}{t("showcases.evidence_body2")}<a href="/examples.html">{t("site.examples")}</a>{t("showcases.evidence_and")}<a href="/guide/">{t("showcases.evidence_guide")}</a>{t("showcases.evidence_tail")}</p></aside>
          <div className="intro-actions"><a className="btn btn-neutral" href="#workbench">{t("showcases.scroll_cta")}<span aria-hidden="true">{t("showcases.scroll_arrow")}</span></a><span className="intro-note">{t("showcases.scroll_note")}</span></div>
        </div>
        <div className="intro-signal" aria-hidden="true">
          <div className="signal-orbit signal-orbit-a"></div><div className="signal-orbit signal-orbit-b"></div>
          <div className="signal-core"><img src="/assets/mascots/cat-logo-head.png" alt="" /><span>{t("showcases.rotate_work")}<br />{t("showcases.rotate_together")}</span></div>
          <span className="signal-label signal-label-a">{t("showcases.rotate_apps")}</span><span className="signal-label signal-label-b">{t("showcases.rotate_data")}</span><span className="signal-label signal-label-c">{t("showcases.rotate_ai")}</span>
        </div>
      </section>

      <section className="showcase-journey" id="workbench" aria-label={t("showcases.journey_aria")}>
        <div className="journey-copy">
          <div className="journey-progress"><div className="progress-track"><span className="progress-fill" style={{ transform: `scaleX(${(SCENES.indexOf(scene) + 1) / SCENES.length})` }}></span></div><span className="progress-count"><b>{String(SCENES.indexOf(scene) + 1).padStart(2, "0")}</b><span>/</span><span>{t("showcases.progress_total")}</span></span></div>
          <ol className="journey-steps">
            {SCENES.map((s, i) => (
              <li className={"journey-step" + (s === scene ? " is-active" : "")} data-scene={s} key={s}>
                <button
                  type="button"
                  aria-current={s === scene ? "step" : undefined}
                  onClick={() => {
                    if (demoLockRef.current) return;
                    document.querySelector(`[data-scene="${s}"]`)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
                    setScene(s);
                  }}
                >
                  <span className="step-index">{t(`showcases.step${i + 1}_num`)}</span>
                  <span><strong>{t(`showcases.step${i + 1}_title`)}</strong><small>{t(`showcases.step${i + 1}_desc`)}</small></span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="journey-stage" aria-live="polite">
          <div className="stage-label"><span className="stage-live"><i></i>{t("showcases.stage_live")}</span><span>{t("showcases.stage_label")}</span></div>
          <div className="workbench-shell card card-border" data-scene={scene}>
            <MockSidebar />
            <div className="mock-canvas">
              <div className="mock-topbar"><span>{t("showcases.workspace.topbar_prefix")}<b>{name(scene)}</b></span><span className="mock-top-actions"><span className="btn btn-ghost btn-xs" aria-hidden="true">{t("showcases.workspace.topbar_search")}</span><span className="btn btn-neutral btn-xs" aria-hidden="true">{t("showcases.workspace.topbar_new")}</span></span></div>
              <div className="scene-panels">
                {SCENES.map((s) => (
                  <ScenePanel key={s} scene={s} shown={shown} visible={s === scene} flashSeq={flashSeq} />
                ))}
              </div>
            </div>
            <Assistant
              onShowChanges={(kind) => {
                setShown((prev) => {
                  const next = new Set(prev);
                  next.add(kind);
                  return next;
                });
                setFlashSeq((n) => n + 1);
              }}
              onHideChanges={() => setShown(new Set())}
              onSetScene={setScene}
              onLock={() => { demoLockRef.current = true; }}
              onUnlock={() => { demoLockRef.current = false; }}
            />
          </div>
          <p className="stage-caption">{t("showcases.stage_caption.note")}</p>
        </div>
      </section>

      <section className="showcase-outro" aria-labelledby="outro-title">
        <div className="outro-rule"></div>
        <div className="outro-grid">
          <div><h2 id="outro-title">{t("showcases.outro.h2a")}<br /><em>{t("showcases.outro.h2b")}</em></h2></div>
          <div className="outro-copy">
            <p>{t("showcases.outro.body1")}{t("showcases.outro.body2")}</p>
            <div className="outro-actions">
              <a className="btn btn-ghost" href="/examples.html">{t("showcases.outro.cta_examples")}</a>
              <a className="btn btn-neutral" href="/get-started/">{t("showcases.outro.cta_open")}</a>
              <a className="btn btn-ghost" href="/docs/">{t("showcases.outro.cta_docs")}</a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}