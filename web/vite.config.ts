import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import devLayout from "./scripts/dev-layout.mjs";

// Multi-entry, NOT a SPA. Each page is its own HTML entry that Vite
// bundles into a separate static HTML file. React renders the page
// component; there is no client-side router.
//
// Output keys keep the current site URL layout:
//   "index"               → dist/index.html            (/)
//   "get-started/index"   → dist/get-started/index.html (/get-started/)
//   ...
// Legacy static pages (docs/, guide/, examples.html, changelog.html)
// are NOT built by Vite — the postbuild script copies them into dist
// unchanged (see scripts/postbuild.mjs).
export default defineConfig({
  // devLayout makes `npm run dev` serve the site at the same URLs as
  // production (/, /get-started/, /assets/* ...) instead of /src/pages/*.html.
  // Only the dev server; build output is unaffected.
  plugins: [react(), tailwindcss(), devLayout()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src/pages/home.html"),
        "get-started/index": path.resolve(__dirname, "src/pages/get-started.html"),
        "community/index": path.resolve(__dirname, "src/pages/community.html"),
        "self-hosting/index": path.resolve(__dirname, "src/pages/self-hosting.html"),
        "self-hosting/costs/index": path.resolve(__dirname, "src/pages/self-hosting-costs.html"),
        "integrations/index": path.resolve(__dirname, "src/pages/integrations.html"),
        "product/agents/index": path.resolve(__dirname, "src/pages/product-agents.html"),
        showcases: path.resolve(__dirname, "src/pages/showcases.html"),
      },
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
