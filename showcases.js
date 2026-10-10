(() => {
  const steps = [...document.querySelectorAll('.journey-step')];
  const panels = [...document.querySelectorAll('[data-scene-panel]')];
  const shell = document.querySelector('.workbench-shell');
  const activeStep = document.getElementById('active-step');
  const progressFill = document.querySelector('.progress-fill');
  const sceneName = document.getElementById('scene-name');
  const assistantCopy = document.getElementById('assistant-copy');
  const assistantSuggestion = document.getElementById('assistant-suggestion');
  const labels = {
    workbench: ['总览', '我看了一下你的工作台，今天有 3 个地方可以先从这里开始。', '先处理需要回复的客户'],
    factory: ['应用工厂', '我把你的需求拆成了 3 个可以复用的应用模块。', '预览刚刚生成的应用'],
    sales: ['客户成交', '有 2 个客户停在下一步之前，我把它们标了出来。', '查看今天的跟进'],
    projects: ['项目管理', 'Q4 发布进度 68%，有 3 个风险需要团队一起确认。', '打开风险清单'],
    orders: ['订单售后', '今天有 2 个服务请求需要回复，我已经按优先级排好。', '处理待回复工单'],
    ai: ['AI 协同', '我理解了这次变更，会先生成预览，再等你确认。', '查看变更预览'],
    launch: ['发布记录', 'v1.4 已经发布，影响范围和回退路径都记录好了。', '查看版本变更'],
    network: ['工作台', '这些应用正在共享同一套数据和工作方法。', '继续搭建下一条流程'],
  };
  let current = null;

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
    entries.forEach((entry) => {
      if (entry.isIntersecting) setScene(entry.target.dataset.scene);
    });
  }, { rootMargin: '-44% 0px -44% 0px', threshold: 0 });
  steps.forEach((step) => observer.observe(step));

  steps.forEach((step) => step.querySelector('button').addEventListener('click', () => {
    step.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    setScene(step.dataset.scene, true);
  }));

  document.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(event.key)) return;
    if (event.target.closest('input, textarea, a, button:not(.journey-step button)')) return;
    event.preventDefault();
    const currentIndex = steps.findIndex((step) => step.dataset.scene === current);
    const direction = event.key === 'ArrowUp' || event.key === 'PageUp' ? -1 : 1;
    const beforeJourney = document.querySelector('.showcase-journey').getBoundingClientRect().top > innerHeight / 2;
    const nextIndex = beforeJourney && direction > 0 ? 0 : currentIndex + direction;
    const next = steps[Math.min(steps.length - 1, Math.max(0, nextIndex))];
    next?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('reduced-motion');
})();
