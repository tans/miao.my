// Postbuild: copy static site assets/legacy pages into dist/, and
// arrange the Vite-built pages into the site URL layout.
import { cp, mkdir, rename, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const dist = resolve(root, "dist");

// Regenerate examples/changelog HTML from their Markdown sources first,
// so the copied static pages always match content/*.md (build-content.py).
execFileSync("python3", [resolve(root, "scripts/build-content.py")], { stdio: "inherit" });

// Static site content copied verbatim (assets are referenced by every
// page; docs/guide/examples/changelog are static pages built as single
// bilingual files by scripts/build-*.py — no /en/ mirror anymore).
for (const item of ["assets", "docs", "guide", "examples.html", "changelog.html", "llms.txt"]) {
  await cp(resolve(root, item), resolve(dist, item), { recursive: true });
  console.log(`copied ${item} → dist/${item}`);
}

// The en/ mirror was removed when the static pages merged into single
// bilingual files (scripts/bilingual.py); the React pages' /en/* redirect
// is dropped too — see vercel.json.
// /assets/js/site-switch.js is used by the bilingual static pages.
await cp(resolve(root, "assets", "js", "site-switch.js"), resolve(dist, "assets", "js", "site-switch.js"));

// Vite 7 emits every HTML entry as <root>/src/pages/<file>.html and
// ignores the rollup input keys. Move each page into its site URL.
const pages = {
  "src/pages/home.html": "index.html",
  "src/pages/get-started.html": "get-started/index.html",
  "src/pages/community.html": "community/index.html",
  "src/pages/self-hosting.html": "self-hosting/index.html",
  "src/pages/self-hosting-costs.html": "self-hosting/costs/index.html",
  "src/pages/integrations.html": "integrations/index.html",
  "src/pages/product-agents.html": "product/agents/index.html",
  "src/pages/showcases.html": "showcases.html",
};
for (const [from, to] of Object.entries(pages)) {
  await mkdir(dirname(resolve(dist, to)), { recursive: true });
  await rename(resolve(dist, from), resolve(dist, to));
  console.log(`moved ${from} → ${to}`);
}
await rm(resolve(dist, "src"), { recursive: true, force: true });

// Old zh/ mirror leftovers were a parallel-language tree; the merged
// pages now serve both languages on the same URL.
await rm(resolve(dist, "zh"), { recursive: true, force: true });

// Fill the static zh SEO tags (title / meta description) into each built
// page shell from copy/zh.toml — single source of truth, see inject-seo.py.
execFileSync("python3", [resolve(root, "scripts/inject-seo.py")], { stdio: "inherit" });

console.log("postbuild done.");