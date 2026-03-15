"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getAllProducts } from "@/lib/productRegistry";
import { applyListImageOverride } from "@/lib/realProducts";

function getQueryFromUrl(): string {
  if (typeof window === "undefined") return "";
  return (new URLSearchParams(window.location.search).get("q") ?? "").trim();
}

export default function SearchPage() {
  const { lang } = useLanguage();
  const [q, setQ] = useState(getQueryFromUrl);
  const [results, setResults] = useState<ReturnType<typeof getAllProducts>>([]);

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const query = (params.get("q") ?? "").trim();
    setQ(query);
    if (query) {
      const term = query.toLowerCase();
      const all = getAllProducts();
      const filtered = all.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          (p.material ?? "").toLowerCase().includes(term) ||
          (p.fishingStyle ?? "").toLowerCase().includes(term) ||
          (p.power ?? "").toLowerCase().includes(term)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const query = (params.get("q") ?? "").trim();
      setQ(query);
      if (query) {
        const term = query.toLowerCase();
        const all = getAllProducts();
        setResults(all.filter((p) => p.name.toLowerCase().includes(term) || (p.material ?? "").toLowerCase().includes(term) || (p.fishingStyle ?? "").toLowerCase().includes(term) || (p.power ?? "").toLowerCase().includes(term)));
      } else setResults([]);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">{t("home", lang)}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{t("search", lang)}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {q ? `${t("search", lang)}: "${q}"` : t("searchRods", lang)}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索框 - 移动端直接可输入，无需去 header */}
        <form action="/search" method="get" className="mb-8">
          <div className="flex gap-2 max-w-xl">
            <input
              type="search"
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("searchPlaceholder", lang)}
              className="flex-1 min-w-0 px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              autoFocus={!q}
            />
            <button type="submit" className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 whitespace-nowrap">
              {t("search", lang)}
            </button>
          </div>
        </form>

        {!q ? null : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {results.map((rod) => (
              <ProductCard key={rod.id} {...applyListImageOverride(rod)} variant="trending" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t("noProductsMatch", lang)}</p>
        )}
      </div>
    </main>
  );
}
