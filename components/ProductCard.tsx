"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getProductName, getListDisplayName } from "@/lib/products-i18n";
import { dedupeImagesByBase } from "@/lib/imageUtils";
import { recordProductClick } from "@/lib/clickTracking";
import { gtagEvent } from "@/lib/gtag";
import type { Product } from "@/lib/products";

interface ProductCardProps extends Product {
  variant?: "default" | "trending" | "wholesale";
  /** 首屏可见时设为 true，优先加载图片（loading=eager, fetchPriority=high） */
  priority?: boolean;
}

const inquiryHref = "/#inquiry";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1529230117010-b6c436154f25?w=400&h=400&fit=crop";

export default function ProductCard({
  id,
  name,
  price,
  moq,
  image,
  images,
  badge,
  length,
  material,
  power,
  fishingStyle,
  variant = "default",
  priority = false,
}: ProductCardProps) {
  const { lang } = useLanguage();
  const listDisplayName = getListDisplayName({ id, name }, lang);
  const fullName = getProductName({ id, name }, lang);
  /** 按 base URL 去重：同一张图的不同裁剪视为重复，不展示轮播 */
  const rawList = (images && images.length > 0 ? images : [image]) as string[];
  const imgList = dedupeImagesByBase(rawList);
  const hasMultipleImages = imgList.length > 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());
  const href = id ? `/product/${id}` : inquiryHref;
  const handleProductClick = () => id && recordProductClick(id);

  return (
    <div className="group flex flex-col min-w-0 bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 hover:shadow-lg transition-all duration-200">
      <Link href={href} className="block flex-shrink-0" onClick={handleProductClick}>
        <div
          className="relative aspect-square overflow-hidden bg-gray-100"
          onMouseEnter={() => hasMultipleImages && setActiveIndex((i) => (i + 1) % imgList.length)}
        >
          {imgList.map((src, i) => {
            const effectiveSrc = failedUrls.has(src) ? FALLBACK_IMAGE : src;
            const isFirst = i === 0;
            return (
              <img
                key={i}
                src={effectiveSrc}
                alt={`${fullName} - ${i + 1}`}
                loading={priority && isFirst ? "eager" : "lazy"}
                {...(priority && isFirst && { fetchPriority: "high" as const })}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:scale-105 ${
                  i === activeIndex ? "opacity-100 z-0" : "opacity-0"
                }`}
                onError={() => setFailedUrls((prev) => new Set(prev).add(src))}
              />
            );
          })}
          {badge && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white text-xs font-medium z-10">
              {badge}
            </span>
          )}
          {hasMultipleImages && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
              {imgList.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${i === activeIndex ? "bg-black" : "bg-white/80"}`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
      <div className="p-3 flex-1 flex flex-col min-h-0">
        <Link href={href} className="shrink-0 block min-h-[2.5rem]" onClick={handleProductClick}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-black transition text-sm">
            {listDisplayName}
          </h3>
        </Link>
        <Link
          href="/inquiry"
          onClick={() => gtagEvent("inquiry_click", { source: "product_card" })}
          className="mt-2 inline-flex justify-center items-center w-full py-2 px-4 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          {t("inquiry", lang)}
        </Link>
      </div>
    </div>
  );
}
