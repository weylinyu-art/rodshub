"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { trendingRods, wholesalePicks, dedupeProductsByImage } from "@/lib/products";
import { HOME_REAL_FEATURED, HOME_REAL_WHOLESALE, HOME_IMAGE_INDEX_OVERRIDE } from "@/lib/realProducts";

/** 首页精选：真实产品排前，再补足 trending；wholesale 单独展示；价格与列表/详情页统一，不再单独覆盖 */
function prepareFeaturedForHome(rod: (typeof HOME_REAL_FEATURED)[0]) {
  let image = rod.image;
  let images = rod.images;
  const imgIdx = HOME_IMAGE_INDEX_OVERRIDE[rod.id];
  if (imgIdx != null && rod.images?.length && rod.images.length > imgIdx) {
    const preferred = rod.images[imgIdx];
    image = preferred;
    images = [preferred, ...rod.images.filter((_, i) => i !== imgIdx)];
  }
  return { ...rod, image, images };
}

export default function HomeFeaturedSection() {
  const { lang } = useLanguage();
  function buildRow(
    real: (typeof HOME_REAL_FEATURED),
    fallback: typeof trendingRods
  ) {
    const combined = [...real, ...fallback];
    const picked = dedupeProductsByImage(combined).slice(0, 4);
    return picked.map((rod) =>
      real.some((r) => r.id === rod.id) ? prepareFeaturedForHome(rod as (typeof HOME_REAL_FEATURED)[number]) : rod
    );
  }

  // 上下排使用同一套逻辑：真实产品排前，不足再用生成产品补足，并按图片去重
  const featured = buildRow(HOME_REAL_FEATURED, trendingRods);
  const wholesale = buildRow(HOME_REAL_WHOLESALE, wholesalePicks);
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t("featuredRods", lang)}</h2>
          <p className="text-gray-500 mt-1">{t("topPicksWholesale", lang)}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((rod) => (
            <ProductCard key={rod.id} {...rod} variant="default" priority />
          ))}
          {wholesale.map((rod) => (
            <ProductCard key={rod.id} {...rod} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
}
