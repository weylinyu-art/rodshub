"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getProductName } from "@/lib/products-i18n";
import type { Product } from "@/lib/products";

interface Props {
  products: (Product & { id: string })[];
}

export default function ProductDetailRecommend({ products }: Props) {
  const { lang } = useLanguage();
  if (products.length === 0) return null;

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
      <h2 className="text-lg font-bold text-gray-900 mb-6">{t("youMayAlsoLike", lang)}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => {
          const displayName = getProductName(p, lang);
          return (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="group block rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={(p.images?.[0] ?? p.image) + "?w=300&h=300&fit=crop"}
                  alt={displayName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-black">{displayName}</h3>
                <p className="mt-1 font-bold text-gray-900 text-sm">{p.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
