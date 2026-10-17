// Postbuild: copy static site assets/legacy pages into dist/, and
// arrange the Vite-built pages into the site URL layout.
import { cp, mkdir, readFile, rename, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const dist = resolve(root, "dist");
const sitePages = JSON.parse(await readFile(resolve(root, "web/site-pages.json"), "utf8"));

// Regenerate examples/changelog HTML from their Markdown sources first,
// so the copied static pages always match content/*.md (build-content.py).
execFileSync("python3", [resolve(root, "scripts/build-content.py")], { stdio: "inherit" });

// guide/index.html is generated from docs/DECISION_GUIDE.{md,en.md} —
// it is not tracked in git (build products live only in dist).
execFileSync("python3", [resolve(root, "scripts/build-decision-guide.py")], { stdio: "inherit" });

// Product mockup pages are generated too (pure python, no weasyprint);
// the PNG previews under docs/prototypes/images/ stay tracked because
// re-rendering them needs WeasyPrint + a Chinese font.
execFileSync("python3", [resolve(root, "scripts/build-prototypes.py")], { stdio: "inherit" });

// Static site content copied verbatim (assets are referenced by every
// page; docs/guide/examples/changelog are static pages built as single
// bilingual files by scripts/build-*.py — no /en/ mirror anymore).
for (const item of ["assets", "docs", "guide", "examples.html", "changelog.html"]) {
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
for (const { entry, output } of sitePages) {
  await mkdir(dirname(resolve(dist, output)), { recursive: true });
  await rename(resolve(dist, entry), resolve(dist, output));
  console.log(`moved ${entry} → ${output}`);
}
await rm(resolve(dist, "src"), { recursive: true, force: true });

// Old zh/ mirror leftovers were a parallel-language tree; the merged
// pages now serve both languages on the same URL.
await rm(resolve(dist, "zh"), { recursive: true, force: true });

// Fill the static zh SEO tags (title / meta description) into each built
// page shell from copy/zh.toml — single source of truth, see inject-seo.py.
execFileSync("python3", [resolve(root, "scripts/inject-seo.py")], { stdio: "inherit" });

// llms.txt is generated from the final page titles/descriptions — must run
// after inject-seo.py so the React shells carry their static SEO tags.
execFileSync("python3", [resolve(root, "scripts/gen-llms.py")], { stdio: "inherit" });
await cp(resolve(root, "llms.txt"), resolve(dist, "llms.txt"));
console.log("copied llms.txt → dist/llms.txt");

console.log("postbuild done.");
