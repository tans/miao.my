// Shared MPA entry. Each page HTML declares <body data-page="..."> and
// loads this module; we mount the matching page component under a
// LocaleProvider (the single source of the locale for the whole site).
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { LocaleProvider } from "@/lib/locale";
import Home from "./home";
import GetStarted from "./get-started";
import Community from "./community";
import SelfHosting from "./self-hosting";
import SelfHostingCosts from "./self-hosting-costs";

const PAGES: Record<string, () => React.ReactElement> = {
  home: Home,
  "get-started": GetStarted,
  community: Community,
  "self-hosting": SelfHosting,
  "self-hosting-costs": SelfHostingCosts,
};

const page = document.body.dataset.page ?? "home";
const Component = PAGES[page] ?? Home;
const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <LocaleProvider>
        <Component />
      </LocaleProvider>
    </StrictMode>
  );
}