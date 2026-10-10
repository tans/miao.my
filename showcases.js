(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) document.documentElement.classList.add('reduced-motion');
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reduced ? 0 : ms));
  const steps = [...document.querySelectorAll('.journey-step')];
  const panels = [...document.querySelectorAll('[data-scene-panel]')];
  const shell = document.querySelector('.workbench-shell');
  const activeStep = document.getElementById('active-step');
  const progressFill = document.querySelector('.progress-fill');
  const sceneName = document.getElementById('scene-name');
  const assistantCopy = document.getElementById('assistant-copy');
  const assistantSuggestion = document.getElementById('assistant-suggestion');
  const labels = {
    workbench: ['总览', '同一份工作散落在表格、群聊和流程里，谁都没看全。', '从下面问一句话开始'],
    factory: ['一个具体的问题', '只说你想要什么，我会先读工作台的上下文，再生成变更预览。', '点击下方提问试试'],
    sales: ['客户成交', '报价后面多出了一个审批节点，云杉制造正在等审批。', '查看这个变化'],
    projects: ['项目管理', '审批节点同步成了跟办任务，和发布项目连在一起。', '查看这个变化'],
    orders: ['订单售后', '服务工单自动建好，这条链路走完整了。', '查看这个变化'],
    ai: ['AI 协同', '三步链路完成。可以查看变更，也可以随时回退。', '查看版本记录'],
    launch: ['版本记录', '这次变更已写入 v1.4，影响范围和回退路径都记着。', '查看变更详情'],
    network: ['工作台', '三个应用共享同一套数据，这次的改变是下次的地基。', '继续搭建'],
  };
  let current = null;
  let demoLock = false;

  function setScene(scene, shouldFocus = false) {
    if (!labels[scene] || scene === current && !shouldFocus) return;
    current = scene;
    const index = steps.findIndex((step) => step.dataset.scene === scene);
    steps.forEach((step) => {
      const active = step.dataset.scene === scene;
      step.classList.toggle('is-active', active);
      step.querySelector('button').setAttribute('aria-current', active ? 'step' : 'false');
    });
    panels.forEach((panel) => {
      const visible = panel.dataset.scenePanel === scene;
      panel.classList.toggle('is-visible', visible);
      panel.setAttribute('aria-hidden', String(!visible));
      panel.inert = !visible;
    });
    shell.dataset.scene = scene;
    activeStep.textContent = String(index + 1).padStart(2, '0');
    progressFill.style.transform = `scaleX(${(index + 1) / steps.length})`;
    sceneName.textContent = labels[scene][0];
    assistantCopy.textContent = labels[scene][1];
    assistantSuggestion.textContent = labels[scene][2];
  }

  setScene('workbench');

  const observer = new IntersectionObserver((entries) => {
    if (demoLock) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) setScene(entry.target.dataset.scene);
    });
  }, { rootMargin: '-44% 0px -44% 0px', threshold: 0 });
  steps.forEach((step) => observer.observe(step));

  steps.forEach((step) => step.querySelector('button').addEventListener('click', () => {
    if (demoLock) return;
    step.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    setScene(step.dataset.scene, true);
  }));

  document.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(event.key)) return;
    if (demoLock || event.target.closest('input, textarea, a, button:not(.journey-step button)')) return;
    event.preventDefault();
    const currentIndex = steps.findIndex((step) => step.dataset.scene === current);
    const direction = event.key === 'ArrowUp' || event.key === 'PageUp' ? -1 : 1;
    const beforeJourney = document.querySelector('.showcase-journey').getBoundingClientRect().top > innerHeight / 2;
    const nextIndex = beforeJourney && direction > 0 ? 0 : currentIndex + direction;
    const next = steps[Math.min(steps.length - 1, Math.max(0, nextIndex))];
    next?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  });

  /* 可交互演示：提问 → AI 预览 → 确认 → 三个应用依次变化 → 完成（可查看/回退） */
  const thread = document.getElementById('assistant-thread');
  const assistantBody = document.getElementById('assistant-body');
  const chip = document.getElementById('demo-chip');
  const changes = {
    sales: document.querySelector('.demo-change-sales'),
    projects: document.querySelector('.demo-change-projects'),
    orders: document.querySelector('.demo-change-orders'),
  };
  const TOUR = [['sales', '客户成交'], ['projects', '项目管理'], ['orders', '订单售后']];
  let state = 'idle';
  let confirmBtn = null;
  let statusText = null;

  function addMsg(kind, html) {
    const div = document.createElement('div');
    div.className = 'thread-msg ' + kind;
    div.innerHTML = html;
    thread.appendChild(div);
    thread.scrollTop = thread.scrollHeight;
    return div;
  }
  const hideChanges = () => Object.values(changes).forEach((el) => { el.hidden = true; });
  const flash = (el) => { el.classList.remove('is-flash'); void el.offsetWidth; el.classList.add('is-flash'); };

  async function runTour(hold) {
    demoLock = true;
    for (const [scene, name] of TOUR) {
      if (statusText) statusText.textContent = '正在执行 · ' + name;
      setScene(scene);
      changes[scene].hidden = false;
      flash(changes[scene]);
      await wait(hold);
    }
    demoLock = false;
  }

  async function startPreview() {
    state = 'preview';
    chip.disabled = true;
    thread.hidden = false;
    assistantBody.classList.add('is-demo-on');
    addMsg('user', '把客户报价变成可审批的步骤。');
    await wait(650);
    addMsg('ai', '<b>我读了客户成交的当前流程，准备这样改：</b><div class="thread-impact"><span>客户成交<small>+ 报价审批节点</small></span><span>项目管理<small>+ 跟办任务</small></span><span>订单售后<small>+ 服务工单</small></span></div><p>权限保持不变，随时可以回退。</p><button type="button" class="btn btn-neutral btn-xs thread-confirm">确认执行</button>');
    confirmBtn = thread.querySelector('.thread-confirm');
  }

  async function runDemo() {
    if (state !== 'preview') return;
    state = 'running';
    confirmBtn.disabled = true;
    confirmBtn.textContent = '执行中…';
    const status = addMsg('status', '<div class="thread-status"><i></i><b>正在执行 · 客户成交</b></div>');
    statusText = status.querySelector('b');
    await wait(450);
    await runTour(950);
    status.remove();
    statusText = null;
    addMsg('ai', '<b>完成。报价现在是可审批的步骤。</b><p>3 个应用已同步，变更已记入版本记录。</p><div class="thread-actions"><button type="button" class="btn btn-neutral btn-xs thread-review">查看变更</button><button type="button" class="btn btn-ghost btn-xs thread-rollback">回退</button></div>');
    state = 'done';
    chip.disabled = false;
  }

  chip.addEventListener('click', () => {
    if (state === 'preview' || state === 'running') return;
    if (state === 'done') {
      thread.innerHTML = '';
      thread.hidden = true;
      assistantBody.classList.remove('is-demo-on');
      hideChanges();
      confirmBtn = null;
      state = 'idle';
    }
    startPreview();
  });

  thread.addEventListener('click', (event) => {
    if (event.target.closest('.thread-confirm')) runDemo();
    else if (event.target.closest('.thread-review')) runTour(500);
    else if (event.target.closest('.thread-rollback')) {
      hideChanges();
      confirmBtn.disabled = false;
      confirmBtn.textContent = '确认执行';
      state = 'preview';
      chip.disabled = true;
      addMsg('ai', '<b>已回退到变更前的状态。</b><p>随时可以重新确认执行。</p>');
    }
  });
})();
