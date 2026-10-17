import { StrictMode, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { LocaleProvider } from "@/lib/locale";

export function mountPage(Page: ComponentType) {
  const root = document.getElementById("root");
  if (!root) return;

  createRoot(root).render(
    <StrictMode>
      <LocaleProvider>
        <Page />
      </LocaleProvider>
    </StrictMode>
  );
}
