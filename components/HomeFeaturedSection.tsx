"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { trendingRods, wholesalePicks } from "@/lib/products";
import { REAL_PRODUCTS, realProductToDisplayProduct } from "@/lib/realProducts";

/** 首页精选：真实产品排前，再补足 trending；wholesale 单独展示 */
const realDisplay = REAL_PRODUCTS.map(realProductToDisplayProduct);

export default function HomeFeaturedSection() {
  const { lang } = useLanguage();
  const featured = [...realDisplay, ...trendingRods].slice(0, 4);
  const wholesale = wholesalePicks.slice(0, 4);
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("featuredRods", lang)}</h2>
          <p className="text-gray-500 mt-1">{t("topPicksWholesale", lang)}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((rod) => (
            <ProductCard key={rod.id} {...rod} variant="default" />
          ))}
          {wholesale.map((rod) => (
            <ProductCard key={rod.id} {...rod} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
}
