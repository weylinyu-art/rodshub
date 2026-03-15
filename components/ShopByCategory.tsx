"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { shopByCategory, categoryNames } from "@/lib/content";
import { CATEGORY_IMAGE_URLS } from "@/lib/categoryImages";

/** 首页类目：图片统一从 rodshub-categories R2 桶拉取 */
const CATEGORIES = [
  { slug: "spinning" as const, count: "1,240+" },
  { slug: "casting" as const, count: "890+" },
  { slug: "telescopic" as const, count: "620+" },
  { slug: "surf" as const, count: "380+" },
  { slug: "ice" as const, count: "210+" },
  { slug: "travel" as const, count: "540+" },
] as const;

export default function ShopByCategory() {
  const { lang } = useLanguage();
  const c = shopByCategory[lang] ?? shopByCategory.en;
  return (
    <section id="categories" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{c.title}</h2>
        <p className="text-gray-500 mb-8">{c.subtitle}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const name = categoryNames[cat.slug]?.[lang] ?? categoryNames[cat.slug]?.en ?? cat.slug;
            const aboveFold = idx < 4;
            return (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group block bg-gray-50 rounded-lg overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CATEGORY_IMAGE_URLS[cat.slug] ?? ""}
                    alt={name}
                    loading={aboveFold ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-black transition">
                    {name}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">{cat.count} {c.products}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
