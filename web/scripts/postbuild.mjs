// Postbuild: copy static site assets/legacy pages into dist/, and
// arrange the Vite-built pages into the site URL layout.
import { cp, mkdir, rename, rm, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const dist = resolve(root, "dist");

// Regenerate examples/changelog HTML from their Markdown sources first,
// so the copied static pages always match content/*.md (build-content.py).
execFileSync("python3", [resolve(root, "scripts/build-content.py")], { stdio: "inherit" });

// Static site content copied verbatim (assets are referenced by every
// page; docs/guide/examples/changelog are legacy static pages served
// as-is until they migrate to React — progressive migration, issue #39).
for (const item of ["assets", "docs", "guide", "examples.html", "changelog.html", "llms.txt"]) {
  await cp(resolve(root, item), resolve(dist, item), { recursive: true });
  console.log(`copied ${item} → dist/${item}`);
}

// The en/ mirror keeps only its legacy static pages; the merged React
// pages' /en/* URLs are handled by a redirect in vercel.json.
for (const item of ["docs", "guide", "examples.html", "changelog.html"]) {
  const src = resolve(root, "en", item);
  try {
    await stat(src);
    await cp(src, resolve(dist, "en", item), { recursive: true });
    console.log(`copied en/${item} → dist/en/${item}`);
  } catch {
    // en twin does not exist yet for this item — skip.
  }
}

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

console.log("postbuild done.");