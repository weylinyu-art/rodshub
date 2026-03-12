"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getStoredLang, setStoredLang, type LangCode } from "@/lib/i18n";

const LanguageContext = createContext<{
  lang: LangCode;
  setLang: (code: LangCode) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLangState(getStoredLang());
    setMounted(true);
  }, []);

  const setLang = (code: LangCode) => {
    setStoredLang(code);
    setLangState(code);
    if (typeof document !== "undefined") {
      document.documentElement.lang = code === "zh" ? "zh-CN" : code;
    }
  };

  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    }
  }, [lang, mounted]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) return { lang: "en" as LangCode, setLang: () => {} };
  return ctx;
}
