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
    const stored = getStoredLang();
    setLangState(stored);
    setStoredLang(stored);
    setMounted(true);
  }, []);

  const setLang = (code: LangCode) => {
    setStoredLang(code);
    setLangState(code);
    if (typeof document !== "undefined") {
      document.documentElement.lang = code;
      document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    }
  };

  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
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
