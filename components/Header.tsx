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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Search + Language */}
        <div className="hidden sm:flex items-center justify-end gap-3 py-2 border-b border-gray-100">
          <form action="/search" method="get" className="flex">
            <input
              type="search"
              name="q"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder={t("searchPlaceholder", lang)}
              className="w-40 lg:w-52 px-3 py-1.5 text-sm border border-gray-200 rounded-l focus:outline-none focus:border-gray-400"
              aria-label="Search"
            />
            <button type="submit" className="px-3 py-1.5 bg-gray-900 text-white text-sm rounded-r hover:bg-gray-800">
              {t("search", lang)}
            </button>
          </form>
          <div
            className="relative"
            onMouseEnter={() => setOpenNav((v) => (v === "lang" ? v : "lang"))}
            onMouseLeave={() => setOpenNav((v) => (v === "lang" ? null : v))}
          >
            <button
              type="button"
              className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-black"
              aria-label="Language"
            >
              <span>{LANGUAGES.find((l) => l.code === lang)?.name ?? lang}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {openNav === "lang" && (
              <div className="absolute right-0 top-full pt-1">
                <div className="w-36 bg-white border border-gray-200 shadow-lg py-2">
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
        </div>

        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black">RodsHub</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className={`px-4 py-2 font-medium transition ${pathname === "/" ? "text-black" : "text-gray-700 hover:text-black"}`}>
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
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/inquiry"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-black text-black text-sm font-medium hover:bg-gray-50 transition"
            >
              {t("sendInquiry", lang)}
            </Link>
            <Link
              href="/trending"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              {t("browseRods", lang)}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-gray-700 hover:text-black"
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
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-1">
              <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black font-medium">
                {t("home", lang)}
              </Link>
              <form action="/search" method="get" className="px-4 py-2">
                <input
                  type="search"
                  name="q"
                  placeholder={t("searchPlaceholder", lang)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded"
                />
              </form>
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t("categories", lang)}</p>
              <Link href="/rods/category" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black font-medium">
                {t("all", lang)}
              </Link>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black"
                >
                  {t(c.key, lang)} {t("rods", lang)}
                </Link>
              ))}
              <p className="px-4 py-2 mt-2 text-xs font-semibold text-gray-500 uppercase">{t("sections", lang)}</p>
              <Link href="/trending" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black">
                {t("trending", lang)}
              </Link>
              <Link href="/wholesale" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black">
                {t("wholesale", lang)}
              </Link>
              <Link href="/insights" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black">
                {t("insights", lang)}
              </Link>
              <Link href="/inquiry" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black">
                {t("inquiry", lang)}
              </Link>
              <p className="px-4 py-2 mt-2 text-xs font-semibold text-gray-500 uppercase">{t("scenarios", lang)}</p>
              <Link href="/rods/scenario" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black font-medium">
                {t("all", lang)}
              </Link>
              {SCENARIOS.map((s) => (
                <Link
                  key={s.slug}
                  href={`/scenario/${s.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black"
                >
                  {t(s.key, lang)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
