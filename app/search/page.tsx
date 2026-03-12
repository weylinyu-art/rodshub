"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, tFormat } from "@/lib/i18n";
import { getAllProducts } from "@/lib/productRegistry";

export default function SearchPage() {
  const { lang } = useLanguage();
  const [q, setQ] = useState("");
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
          <p className="mt-1 text-gray-600">
            {q ? (results.length !== 1 ? tFormat("resultsFoundPlural", lang, { n: results.length }) : tFormat("resultsFound", lang, { n: results.length })) : t("searchHint", lang)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!q ? (
          <p className="text-gray-500">{t("searchHint", lang)}</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {results.map((rod) => (
              <ProductCard key={rod.id} {...rod} variant="trending" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t("noProductsMatch", lang)}</p>
        )}
      </div>
    </main>
  );
}
