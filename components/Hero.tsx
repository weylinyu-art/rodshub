"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function Hero() {
  const { lang } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom > 0) {
        const parallax = rect.top * 0.12;
        bgRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[75vh] lg:min-h-[85vh] overflow-hidden bg-gray-900"
    >
      {/* Hero banner background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-banner.png"
            alt="Fishing rods and gear"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-[75vh] lg:min-h-[85vh] px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          {t("heroTitle", lang)}
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-gray-300 max-w-xl mx-auto">
          {t("heroSubtitle", lang)}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="/trending"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-base font-semibold hover:bg-gray-100 transition"
          >
            {t("browseRods", lang)}
          </a>
          <a
            href="/inquiry"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white text-base font-semibold hover:bg-white hover:text-black transition"
          >
            {t("sendInquiry", lang)}
          </a>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            {t("bulkOrders", lang)}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            {t("oemCustomization", lang)}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            {t("globalShipping", lang)}
          </span>
        </div>
      </div>
    </section>
  );
}
