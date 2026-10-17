// Dev layout mirror: in development mode, serve the site at the same
// URLs as production (dist/ layout set by postbuild.mjs), instead of
// Vite's default /src/pages/*.html paths.
//
//   /                    -> src/pages/home.html
//   /get-started/        -> src/pages/get-started.html
//   /assets/*            -> repo root assets/*
//   /docs/* /guide/* ... -> repo root static pages, served verbatim
//
// Only used by `vite` dev server; build output is unaffected.
import { readFileSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "../..");
const sitePages = JSON.parse(readFileSync(resolve(repoRoot, "web/site-pages.json"), "utf8"));
const prodUrlToEntry = Object.fromEntries(sitePages.map(({ url, entry }) => [url.replace(/^\//, ""), entry]));

// Custom URLs that resolve to a file under repoRoot (served verbatim).
const staticUrls = new Set([
  "llms.txt",
  "examples.html",
  "changelog.html",
]);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".pdf": "application/pdf",
};

// Vite's dev HTML pipeline needs a file on disk to transform, so rewrite
// a production URL to its real entry file inside the Vite dev server.
const devLayoutFetch = (req, res, next) => {
  const urlPath = (req.url || "/").split("?")[0];
  const clean = urlPath.replace(/^\/+/, "");
  const segments = clean.split("/").filter(Boolean);

  // 1. Vite-managed module assets (/@vite/client, /@fs/...) — let Vite handle.
  if (urlPath.startsWith("/@") || urlPath.includes("@fs/")) return next();

  // 2. Static files under repo root, served verbatim (with MIME).
  const serveFile = async (rel) => {
    const full = resolve(repoRoot, rel);
    try {
      const s = await stat(full);
      if (!s.isFile()) return next();
      res.setHeader("Content-Type", mime[extname(full)] || "application/octet-stream");
      res.end(await readFile(full));
    } catch {
      next();
    }
  };

  // 2a. /assets/* — from repo root, so dev and prod URLs match exactly.
  if (segments[0] === "assets") return serveFile(segments.join("/"));

  // 2b. Static pages: docs/, guide/, examples.html, changelog.html, llms.txt
  if (segments[0] === "docs" || segments[0] === "guide") {
    // Preserve the trailing slash so /docs/ resolves to docs/index.html.
    return serveFile(clean.endsWith("/") ? clean + "index.html" : clean);
  }
  if (staticUrls.has(clean)) return serveFile(clean);

  // 3. Production-style URL -> HTML entry: rewrite req.url so Vite's
  //    normal HTML pipeline (transformIndexHtml etc.) serves the entry.
  if (prodUrlToEntry[clean]) {
    req.url = "/" + prodUrlToEntry[clean];
    return next();
  }
  next();
};

export default function devLayout() {
  return {
    name: "miao-dev-layout",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(devLayoutFetch);
    },
  };
}
