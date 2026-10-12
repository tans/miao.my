import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Multi-entry, NOT a SPA. Each page is its own HTML entry that Vite
// bundles into a separate static HTML file. React renders the page
// component; there is no client-side router.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // One input = one output HTML. No SPA, no router.
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, "src/pages/home.html"),
        docs: path.resolve(__dirname, "src/pages/docs.html"),
        guide: path.resolve(__dirname, "src/pages/guide.html"),
        examples: path.resolve(__dirname, "src/pages/examples.html"),
        getStarted: path.resolve(__dirname, "src/pages/get-started.html"),
        changelog: path.resolve(__dirname, "src/pages/changelog.html"),
        community: path.resolve(__dirname, "src/pages/community.html"),
        selfHosting: path.resolve(__dirname, "src/pages/self-hosting.html"),
        integrations: path.resolve(__dirname, "src/pages/integrations.html"),
        product: path.resolve(__dirname, "src/pages/product.html"),
        showcases: path.resolve(__dirname, "src/pages/showcases.html"),
      },
    },
    outDir: path.resolve(__dirname, "../dist"),
    emptyOutDir: true,
    // Keep the existing /assets/... public paths (fonts, logos) working.
  },
  publicDir: path.resolve(__dirname, "public"),
});
