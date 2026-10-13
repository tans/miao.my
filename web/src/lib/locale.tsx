import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useCopy, type Locale } from "./i18n";

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue | null>(null);

function initialLocale(): Locale {
  if (typeof window === "undefined") return "zh";
  const query = new URLSearchParams(window.location.search).get("lang");
  if (query === "en" || query === "zh") return query;
  const saved = window.localStorage.getItem("miao-locale");
  if (saved === "en" || saved === "zh") return saved;
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "zh";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setState] = useState<Locale>(initialLocale);
  const setLocale = (next: Locale) => {
    setState(next);
    window.localStorage.setItem("miao-locale", next);
  };
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);
  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}

export function usePageMeta(titleKey: string, descriptionKeys: string[] = []) {
  const { locale } = useLocale();
  const { t } = useCopy(locale);
  useEffect(() => {
    document.title = t(titleKey);
    const description = document.querySelector('meta[name="description"]');
    if (description && descriptionKeys.length) description.setAttribute("content", descriptionKeys.map(t).join(""));
  }, [locale, titleKey, descriptionKeys.join("|")]);
}
