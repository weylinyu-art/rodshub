"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t, type LangCode } from "@/lib/i18n";
import { getProductName, getListDisplayName } from "@/lib/products-i18n";
import { gtagEvent } from "@/lib/gtag";
import type { Product } from "@/lib/products";

const FALLBACK_IMAGE = "/product-placeholder.svg";
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
  const fullName = getProductName(p, lang);
  const listDisplayName = getListDisplayName(p, lang);
  const imgSrc = p.images?.[0] ?? p.image ?? "";
  const effectiveSrc = imgFailed || !imgSrc ? FALLBACK_IMAGE : imgSrc;

  const handleError = () => {
    setImgFailed(true);
    onImageFail?.(slotIndex);
  };

  return (
    <div className="group flex flex-col rounded-lg border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition min-w-0">
      <Link href={`/product/${p.id}`} className="block flex-shrink-0">
        <div className="aspect-square overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={effectiveSrc}
            alt={fullName}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onError={handleError}
          />
        </div>
      </Link>
      <div className="p-3 flex-1 flex flex-col">
        <Link href={`/product/${p.id}`} className="shrink-0">
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-black">{listDisplayName}</h3>
        </Link>
        <Link
          href="/inquiry"
          onClick={() => gtagEvent("inquiry_click", { source: "product_recommend" })}
          className="mt-2 inline-flex justify-center items-center w-full py-2 px-3 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          {t("inquiry", lang)}
        </Link>
      </div>
    </div>
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
