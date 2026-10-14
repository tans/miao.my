/* Shared language switcher for static (non-React) pages.
 *
 * Same storage key ("miao-locale") and semantics as web/src/lib/locale.tsx,
 * so static docs/guide/examples/changelog pages and React pages switch
 * language together.
 *
 * Usage (in a static page <head>):
 *   <script src="/assets/js/site-switch.js"></script>
 *
 * Required page structure:
 *   <div data-lang-zh>…</div> and <div data-lang-en hidden>…</div>
 *   <title data-en="…">…</title>, <meta name="description" data-zh data-en>
 *   Toggle controls: any element with class "lang-switch" and data-lang="en|zh"
 */
(function () {
  function currentLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "zh" || q === "en") return q;
    try {
      var saved = localStorage.getItem("miao-locale");
      if (saved === "zh" || saved === "en") return saved;
    } catch (e) {}
    return navigator.language.toLowerCase().startsWith("en") ? "en" : "zh";
  }

  function apply() {
    var lang = currentLang();
    document.documentElement.lang = lang;
    var zh = document.querySelectorAll("[data-lang-zh]");
    var en = document.querySelectorAll("[data-lang-en]");
    for (var i = 0; i < zh.length; i++) zh[i].hidden = lang !== "zh";
    for (var j = 0; j < en.length; j++) en[j].hidden = lang !== "en";
    var meta = document.querySelector('meta[name="description"]');
    if (meta && meta.getAttribute("data-" + lang)) {
      meta.setAttribute("content", meta.getAttribute("data-" + lang));
    }
    var title = document.querySelector("title");
    if (title && title.getAttribute("data-" + lang)) {
      title.textContent = title.getAttribute("data-" + lang);
    }
  }

  function init() {
    apply();
    document.addEventListener("click", function (ev) {
      var t = ev.target;
      while (t && !(t.classList && t.classList.contains("lang-switch"))) t = t.parentNode;
      if (!t) return;
      var next = t.getAttribute("data-lang");
      if (next !== "zh" && next !== "en") return;
      try { localStorage.setItem("miao-locale", next); } catch (e) {}
      apply();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();