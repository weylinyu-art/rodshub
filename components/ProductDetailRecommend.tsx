"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, type LangCode } from "@/lib/i18n";
import { getProductName } from "@/lib/products-i18n";
import type { Product } from "@/lib/products";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1529230117010-b6c436154f25?w=500&h=500&fit=crop";
const DISPLAY_COUNT = 8;

interface Props {
  products: (Product & { id: string })[];
}

function RecommendCard({
  p,
  lang,
  onImageFail,
  slotIndex,
}: {
  p: Product & { id: string };
  lang: LangCode;
  onImageFail?: (index: number) => void;
  slotIndex: number;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const displayName = getProductName(p, lang);
  const imgSrc = p.images?.[0] ?? p.image ?? "";
  const effectiveSrc = imgFailed || !imgSrc ? FALLBACK_IMAGE : imgSrc;
  const showPrice = p.price && !/^(Inquiry|詢價|询价)$/i.test(String(p.price).trim());

  const handleError = () => {
    setImgFailed(true);
    onImageFail?.(slotIndex);
  };

  return (
    <Link
      href={`/product/${p.id}`}
      className="group block rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition min-w-0"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={effectiveSrc}
          alt={displayName}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={handleError}
        />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-black">{displayName}</h3>
        {showPrice && <p className="mt-1 font-bold text-gray-900 text-sm">{p.price}</p>}
      </div>
    </Link>
  );
}

export default function ProductDetailRecommend({ products }: Props) {
  const { lang } = useLanguage();
  const [displayedProducts, setDisplayedProducts] = useState<(Product & { id: string })[]>(() =>
    products.slice(0, DISPLAY_COUNT)
  );
  const [reservePool, setReservePool] = useState<(Product & { id: string })[]>(() =>
    products.slice(DISPLAY_COUNT)
  );

  const handleImageFail = (slotIndex: number) => {
    if (reservePool.length === 0) return;
    const replacement = reservePool[0];
    setReservePool((prev) => prev.slice(1));
    setDisplayedProducts((prev) => {
      const next = [...prev];
      next[slotIndex] = replacement;
      return next;
    });
  };

  if (displayedProducts.length === 0) return null;

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
      <h2 className="text-lg font-bold text-gray-900 mb-6">{t("youMayAlsoLike", lang)}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {displayedProducts.map((p, i) => (
          <RecommendCard
            key={p.id}
            p={p}
            lang={lang}
            slotIndex={i}
            onImageFail={reservePool.length > 0 ? handleImageFail : undefined}
          />
        ))}
      </div>
    </section>
  );
}
