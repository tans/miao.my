export type Locale = "zh" | "en";

// Copy comes from copy/{zh,en}.toml and is generated during the build.
import { COPY } from "./copy.gen";

export function useCopy(locale: Locale) {
  const copy = COPY[locale];
  const t = (key: string) => copy[key] ?? "";
  return {
    t,
    h: (key: string) => (t(key) || "/").replace(/^\/en(?=\/|$)/, "/"),
  };
}
