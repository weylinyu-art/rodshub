"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { trendingRods, wholesalePicks } from "@/lib/products";

export default function HomeFeaturedSection() {
  const { lang } = useLanguage();
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("featuredRods", lang)}</h2>
            <p className="text-gray-500 mt-1">{t("topPicksWholesale", lang)}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/trending" className="text-sm font-semibold text-gray-900 hover:underline">
              {t("viewTrending", lang)}
            </Link>
            <Link href="/wholesale" className="text-sm font-semibold text-gray-900 hover:underline">
              {t("viewWholesale", lang)}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trendingRods.slice(0, 4).map((rod) => (
            <ProductCard key={rod.id} {...rod} variant="trending" />
          ))}
          {wholesalePicks.slice(0, 4).map((rod) => (
            <ProductCard key={rod.id} {...rod} />
          ))}
        </div>
      </div>
    </section>
  );
}
