"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getArticleTitle, ARTICLES } from "@/lib/insights-i18n";
import { newArrivals } from "@/lib/products";

export default function HomeInsightsSection() {
  const { lang } = useLanguage();
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("newArrivals", lang)}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {newArrivals.slice(0, 4).map((rod) => (
                <ProductCard key={rod.id} {...rod} />
              ))}
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{t("fishingInsightsTitle", lang)}</h2>
            </div>
            <p className="text-gray-600 mb-4">{t("industryKnowledge", lang)}</p>
            <div className="space-y-2 flex-1">
              {ARTICLES.slice(0, 4).map((a) => (
                <Link key={a.slug} href={`/insights/${a.slug}`} className="block text-gray-700 hover:text-black">
                  {getArticleTitle(a.slug, lang)}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/insights" className="text-sm font-semibold text-gray-600 hover:text-black shrink-0">
                {t("viewAll", lang)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
