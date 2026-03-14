"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import ProductCard from "@/components/ProductCard";
import { wholesalePicks } from "@/lib/products";
import { REAL_PRODUCTS, realProductToDisplayProduct } from "@/lib/realProducts";

const realDisplay = REAL_PRODUCTS.map(realProductToDisplayProduct);
const wholesaleProducts = [...realDisplay, ...wholesalePicks];

export default function WholesalePageContent() {
  const { lang } = useLanguage();
  return (
    <>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">{t("home", lang)}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{t("wholesale", lang)}</span>
          </nav>
          <span className="inline-block px-3 py-1 bg-gray-900 text-white text-sm font-semibold rounded mb-3">{t("bulkSavings", lang)}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("wholesalePicksTitle", lang)}</h1>
          <p className="mt-1 text-gray-600">{t("wholesalePicksDesc", lang)}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {wholesaleProducts.map((rod) => (
            <ProductCard key={rod.id} {...rod} variant="trending" />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-600 mb-4">{t("needCustomBranding", lang)}</p>
          <Link
            href="/inquiry"
            className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            {t("sendInquiry", lang)}
          </Link>
        </div>
      </div>
    </>
  );
}
