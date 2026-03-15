"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";
import { trendingRods } from "@/lib/products";
import { REAL_PRODUCTS, realProductToDisplayProduct, applyListImageOverride } from "@/lib/realProducts";

const realDisplay = REAL_PRODUCTS.map(realProductToDisplayProduct);
const trendingProducts = [...realDisplay, ...trendingRods];

export default function TrendingPageContent() {
  const { lang } = useLanguage();
  return (
    <>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">{t("home", lang)}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{t("trendingRodsNav", lang)}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("trendingRodsNav", lang)}</h1>
          <p className="mt-1 text-gray-600">{t("trendingRodsDesc", lang)}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {trendingProducts.map((rod) => (
            <ProductCard key={rod.id} {...applyListImageOverride(rod)} variant="trending" />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/rods/category"
            className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            {t("browseAll", lang)}
          </Link>
        </div>
      </div>
    </>
  );
}
