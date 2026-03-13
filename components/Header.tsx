"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGUAGES, t } from "@/lib/i18n";

const CATEGORIES = [
  { key: "catSpinning" as const, slug: "spinning" },
  { key: "catCasting" as const, slug: "casting" },
  { key: "catTelescopic" as const, slug: "telescopic" },
  { key: "catSurf" as const, slug: "surf" },
  { key: "catIceFishing" as const, slug: "ice" },
  { key: "catTravel" as const, slug: "travel" },
];

const WHATSAPP_LINK = "https://wa.me/8619957106387";

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SCENARIOS = [
  { key: "scenFreshwater" as const, slug: "freshwater" },
  { key: "scenSaltwater" as const, slug: "saltwater" },
  { key: "scenSurf" as const, slug: "surf" },
  { key: "scenBoat" as const, slug: "boat" },
  { key: "scenIce" as const, slug: "ice" },
];

export default function Header() {
  const [openNav, setOpenNav] = useState<"categories" | "scenarios" | "lang" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();

  return (
    <>
      {/* Mobile: full-screen menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden bg-white"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
              <span className="text-lg font-bold text-black">RodsHub</span>
              <button type="button" onClick={() => setMobileOpen(false)} className="p-2 -m-2" aria-label="Close">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {/* Search - prominent on mobile */}
            <form action="/search" method="get" className="px-4 py-4 border-b border-gray-100">
              <div className="flex gap-2">
                <input type="search" name="q" placeholder={t("searchPlaceholder", lang)} className="flex-1 px-4 py-3 text-base border border-gray-200 rounded-lg" />
                <button type="submit" className="px-5 py-3 bg-black text-white font-medium rounded-lg">{t("search", lang)}</button>
              </div>
            </form>
            {/* Category cards - 2-col grid, large tap targets */}
            <div className="px-4 py-4 flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">{t("categories", lang)}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {CATEGORIES.map((c) => (
                  <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setMobileOpen(false)} className="block p-4 bg-gray-50 rounded-xl border border-gray-100 active:bg-gray-100 font-medium text-gray-900">
                    {t(c.key, lang)} {t("rods", lang)}
                  </Link>
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">{t("scenarios", lang)}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {SCENARIOS.map((s) => (
                  <Link key={s.slug} href={`/scenario/${s.slug}`} onClick={() => setMobileOpen(false)} className="block p-4 bg-gray-50 rounded-xl border border-gray-100 active:bg-gray-100 font-medium text-gray-900">
                    {t(s.key, lang)}
                  </Link>
                ))}
              </div>
              <div className="space-y-1 pt-2 border-t border-gray-100">
                <Link href="/trending" onClick={() => setMobileOpen(false)} className="block py-3 font-medium text-gray-900">{t("trending", lang)}</Link>
                <Link href="/wholesale" onClick={() => setMobileOpen(false)} className="block py-3 font-medium text-gray-900">{t("wholesale", lang)}</Link>
                <Link href="/insights" onClick={() => setMobileOpen(false)} className="block py-3 font-medium text-gray-900">{t("insights", lang)}</Link>
              </div>
            </div>
            {/* Language + Inquiry at bottom */}
            <div className="mt-auto px-4 py-4 border-t border-gray-200 space-y-3" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenNav((v) => (v === "lang" ? null : "lang"))}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-700"
                    aria-label={`${t("language", lang)}: ${LANGUAGES.find((l) => l.code === lang)?.name ?? lang}`}
                  >
                    {(LANGUAGES.find((l) => l.code === lang)?.code ?? lang).toUpperCase()}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {openNav === "lang" && (
                    <div className="absolute left-0 top-full mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-lg py-2 max-h-56 overflow-y-auto">
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => { setLang(l.code); setOpenNav(null); }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${lang === l.code ? "font-medium text-black bg-gray-50" : "text-gray-700"}`}
                        >
                          {l.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BD5A] transition">
                <WhatsAppIcon />
                WhatsApp
              </a>
              <Link href="/inquiry" onClick={() => setMobileOpen(false)} className="block w-full py-3.5 bg-black text-white text-center font-semibold rounded-xl">
                {t("sendInquiry", lang)}
              </Link>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Row 1: Logo + Search + Language + CTA - 增加行间距 */}
          <div className="flex items-center justify-between gap-4 py-4 sm:py-5">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-2xl font-bold text-black">RodsHub</span>
            </Link>

            {/* Search - 与 logo 齐平，desktop 显示 */}
            <form action="/search" method="get" className="hidden sm:flex flex-1 max-w-md mx-4 lg:mx-6">
              <input
                type="search"
                name="q"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder={t("searchPlaceholder", lang)}
                className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                aria-label="Search"
              />
              <button type="submit" className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-r-lg hover:bg-gray-800 shrink-0">
                {t("search", lang)}
              </button>
            </form>

            <div className="hidden sm:flex items-center gap-4 shrink-0">
              <div
                className="relative"
                onMouseEnter={() => setOpenNav((v) => (v === "lang" ? v : "lang"))}
                onMouseLeave={() => setOpenNav((v) => (v === "lang" ? null : v))}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-2.5 py-2 text-sm text-gray-600 hover:text-black rounded-lg border border-gray-200 hover:border-gray-300 bg-gray-50/50"
                  aria-label={`${t("language", lang)}: ${LANGUAGES.find((l) => l.code === lang)?.name ?? lang}`}
                >
                  <span>{(LANGUAGES.find((l) => l.code === lang)?.code ?? lang).toUpperCase()}</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {openNav === "lang" && (
                  <div className="absolute right-0 top-full pt-1">
                    <div className="w-36 bg-white border border-gray-200 shadow-lg rounded-lg py-2">
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => { setLang(l.code); setOpenNav(null); }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${lang === l.code ? "font-medium text-black bg-gray-50" : "text-gray-700"}`}
                        >
                          {l.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className="h-5 w-px bg-gray-200" aria-hidden />
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg text-white hover:opacity-90 transition"
                style={{ backgroundColor: "#25D366" }}
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <Link
                href="/inquiry"
                className="inline-flex items-center px-4 py-2 border border-black text-black text-sm font-medium hover:bg-gray-50 rounded-lg transition"
              >
                {t("sendInquiry", lang)}
              </Link>
              <Link
                href="/trending"
                className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition"
              >
                {t("browseRods", lang)}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 -m-2 text-gray-700 hover:text-black"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Row 2: Tab 导航 - 与 LOGO 左对齐 */}
          <nav className="hidden lg:flex items-center gap-1 border-t border-gray-100 py-3 -mb-px">
            <Link href="/" className={`pl-0 pr-4 py-2 font-medium transition ${pathname === "/" ? "text-black" : "text-gray-700 hover:text-black"}`}>
              {t("home", lang)}
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setOpenNav("categories")}
              onMouseLeave={() => setOpenNav(null)}
            >
              <Link
                href="/rods/category"
                className="px-4 py-2 text-gray-700 hover:text-black font-medium transition inline-block"
              >
                {t("categories", lang)}
              </Link>
              {openNav === "categories" && (
                <div className="absolute top-full left-0 pt-1">
                  <div className="w-48 bg-white border border-gray-200 shadow-lg py-2">
                    <Link
                      href="/rods/category"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black font-medium"
                    >
                      {t("all", lang)}
                    </Link>
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/category/${c.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                      >
                        {t(c.key, lang)} {t("rods", lang)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setOpenNav("scenarios")}
              onMouseLeave={() => setOpenNav(null)}
            >
              <Link
                href="/rods/scenario"
                className="px-4 py-2 text-gray-700 hover:text-black font-medium transition inline-block"
              >
                {t("scenarios", lang)}
              </Link>
              {openNav === "scenarios" && (
                <div className="absolute top-full left-0 pt-1">
                  <div className="w-40 bg-white border border-gray-200 shadow-lg py-2">
                    <Link
                      href="/rods/scenario"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black font-medium"
                    >
                      {t("all", lang)}
                    </Link>
                    {SCENARIOS.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/scenario/${s.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                      >
                        {t(s.key, lang)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/trending" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              {t("trending", lang)}
            </Link>
            <Link href="/wholesale" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              {t("wholesale", lang)}
            </Link>
            <Link href="/insights" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              {t("insights", lang)}
            </Link>
            <Link href="/inquiry" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              {t("inquiry", lang)}
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-gray-700 hover:text-black font-medium transition"
            >
              {t("contact", lang)}
              <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
