import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import devLayout from "./scripts/dev-layout.mjs";
import sitePages from "./site-pages.json";

// Multi-entry, NOT a SPA. Each page is its own HTML entry that Vite
// bundles into a separate static HTML file. React renders the page
// component; there is no client-side router.
//
// Source entries and their production URL layout are listed in site-pages.json.
// Legacy static pages (docs/, guide/, examples.html, changelog.html)
// are NOT built by Vite — the postbuild script copies them into dist
// unchanged (see scripts/postbuild.mjs).
export default defineConfig({
  // devLayout makes `npm run dev` serve the site at the same URLs as
  // production (/, /get-started/, /assets/* ...) instead of /src/pages/*.html.
  // Only the dev server; build output is unaffected.
  plugins: [react(), devLayout()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(sitePages.map(({ id, entry }) => [id, path.resolve(__dirname, entry)])),
    },
    outDir: path.resolve(__dirname, "../dist"),
    emptyOutDir: true,
  },
  publicDir: path.resolve(__dirname, "public"),
  server: {
    // Allow the repo root (site root) for reading legacy static pages and
    // /assets/* via the dev-layout middleware.
    fs: { allow: [path.resolve(__dirname, "..")] },
  },
});
