"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getProductName } from "@/lib/products-i18n";
import { getDisplayPrice } from "@/lib/realProducts";
import type { Product } from "@/lib/products";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1529230117010-b6c436154f25?w=400&h=400&fit=crop";

interface ArticleProductRecommendationProps {
  products: (Product & { id: string })[];
}

/** 文章内商品推荐：图片、名称、价格、Inquiry 按钮 */
function ArticleProductCard({ product }: { product: Product & { id: string } }) {
  const { lang } = useLanguage();
  const displayName = getProductName({ id: product.id, name: product.name }, lang);
  const img = (product.images?.[0] ?? product.image) || FALLBACK_IMAGE;
  const href = product.id ? `/product/${product.id}` : "/#inquiry";
  const displayPrice = getDisplayPrice(product.price, product.fishingStyle, product.id);

  return (
    <div className="group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition-all">
      <Link href={href} className="block flex-shrink-0">
        <div className="aspect-square overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={displayName}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-3 flex-1 flex flex-col">
        <Link href={href} className="shrink-0">
          <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-black">{displayName}</h4>
        </Link>
        <p className="mt-1 font-bold text-gray-900 text-sm">{displayPrice}</p>
        <Link
          href="/inquiry"
          className="mt-2 inline-flex justify-center items-center w-full py-2 px-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          {t("inquiry", lang)}
        </Link>
      </div>
    </div>
  );
}

export default function ArticleProductRecommendation({
  products,
}: ArticleProductRecommendationProps) {
  if (products.length === 0) return null;

  return (
    <aside className="my-10 rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h3 className="text-base font-bold text-gray-900 mb-2">Product Recommendation</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map((p) => (
          <ArticleProductCard key={p.id} product={p} />
        ))}
      </div>
      <Link
        href="/trending"
        className="mt-4 inline-block text-sm font-medium text-gray-600 hover:text-black"
      >
        Browse all rods →
      </Link>
    </aside>
  );
}
