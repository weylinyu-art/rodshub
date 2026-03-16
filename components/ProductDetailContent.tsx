"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getProductName, getDetailDisplayName } from "@/lib/products-i18n";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductDetailRecommend from "@/components/ProductDetailRecommend";
import ShareButtons from "@/components/ShareButtons";
import { absoluteUrl } from "@/lib/seo";
import { getProductDetailForVariant, getKeyFeaturesForProduct } from "@/lib/productDetail";
import { getDisplayPrice, inferMaterialFromTitle, inferPowerFromTitle } from "@/lib/realProducts";
import { getOriginalProductTitle } from "@/lib/skuData";
import { gtagEvent } from "@/lib/gtag";
import type { Product } from "@/lib/products";
import type { ProductDetail } from "@/lib/productDetail";
import type { RealProduct, ProductVariant } from "@/lib/realProducts";

const SPEC_LABEL_KEYS: Record<string, string> = {
  Length: "length",
  Material: "material",
  Power: "power",
  Action: "action",
  "Line Weight": "lineWeight",
  "Lure Weight": "lureWeight",
  Sections: "rodSections",
  Handle: "handle",
  SKU: "sku",
  Dimensions: "dimensions",
  Weight: "weight",
  Type: "type",
  "Detail Dimensions": "detailDimensions",
  "Package Dimensions": "packageDimensions",
};

/** 有子 SKU 时以伸展长（dimensions）为主切换项，先选长度再选类型 */
function VariantSwitcher({
  variants,
  selectedVariant,
  onSelect,
  useLengthAsPrimary,
}: {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelect: (v: ProductVariant) => void;
  useLengthAsPrimary: boolean;
}) {
  if (!useLengthAsPrimary) {
    return (
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.sku}
            type="button"
            onClick={() => onSelect(v)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
              selectedVariant?.sku === v.sku ? "border-black bg-black text-white" : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            {v.sku} · {v.dimensions} · {v.price}
          </button>
        ))}
      </div>
    );
  }
  const byLength = new Map<string, ProductVariant[]>();
  for (const v of variants) {
    const list = byLength.get(v.dimensions) ?? [];
    list.push(v);
    byLength.set(v.dimensions, list);
  }
  const lengths = Array.from(byLength.keys()).sort((a, b) => parseFloat(a) - parseFloat(b));
  return (
    <div className="space-y-3">
      {lengths.map((len) => {
        const list = byLength.get(len)!;
        const isSingle = list.length === 1;
        const isSelected = list.some((v) => v.sku === selectedVariant?.sku);
        return (
          <div key={len} className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600 w-14 flex-shrink-0">{len}</span>
            <div className="flex flex-wrap gap-2">
              {list.map((v) => (
                <button
                  key={v.sku}
                  type="button"
                  onClick={() => onSelect(v)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition ${
                    selectedVariant?.sku === v.sku ? "border-black bg-black text-white" : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {v.type}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface ProductDetailContentProps {
  product: Product & { id: string };
  detail: ProductDetail;
  imgList: string[];
  related: (Product & { id: string })[];
  realProduct?: RealProduct;
  initialVariantSku?: string;
}

export default function ProductDetailContent({
  product,
  detail,
  imgList,
  related,
  realProduct,
  initialVariantSku,
}: ProductDetailContentProps) {
  const { lang } = useLanguage();
  const displayName = getProductName(product, lang);

  useEffect(() => {
    gtagEvent("product_view", {
      product_id: product.id,
      product_name: displayName,
      category: product.fishingStyle ?? "unknown",
      price: product.price ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  useEffect(() => {
    gtagEvent("product_view", {
      product_id: product.id,
      product_name: displayName,
      category: product.fishingStyle ?? "unknown",
      price: product.price ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);
  const detailTitle = getDetailDisplayName(product, lang, realProduct ? getOriginalProductTitle(realProduct.id) : undefined);
  const displayNameShort = displayName.length > 52 ? displayName.slice(0, 49).trimEnd() + "…" : displayName;

  const variants = realProduct?.variants ?? [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(() => {
    if (!initialVariantSku || !variants.length) return variants[0] ?? null;
    return variants.find((v) => v.sku === initialVariantSku) ?? variants[0] ?? null;
  });

  const effectiveVariant = selectedVariant ?? variants[0];
  const effectiveDetail = effectiveVariant
    ? getProductDetailForVariant(effectiveVariant, product, realProduct)
    : detail;
  const keyFeatures = getKeyFeaturesForProduct({
    originalTitle: realProduct ? getOriginalProductTitle(realProduct.id) : undefined,
    displayName,
    variant: effectiveVariant ?? undefined,
    detailFeatures: effectiveVariant ? [] : detail.features,
  });
  const displayPrice = effectiveVariant?.price ?? product.price;
  const materialVal = product.material ?? (realProduct ? inferMaterialFromTitle(realProduct.name) : undefined) ?? "Carbon Fiber";
  const powerVal = product.power ?? (realProduct ? inferPowerFromTitle(realProduct.name) : undefined) ?? "Medium";
  const displaySpecs = effectiveVariant
    ? {
        length: effectiveVariant.dimensions ?? product.length ?? "—",
        material: materialVal,
        power: powerVal,
        type: effectiveVariant.type ?? product.fishingStyle ?? "—",
      }
    : {
        length: product.length ?? "2.1m",
        material: materialVal,
        power: powerVal,
        type: product.fishingStyle ?? "—",
      };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-black transition">{t("home", lang)}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate" title={displayName}>{displayNameShort}</span>
        </div>
        <ShareButtons
          url={absoluteUrl(`/product/${product.id}`)}
          title={`${displayName} | RodsHub B2B`}
          description={`${product.price} · ${product.fishingStyle || ""} · Wholesale fishing rods`}
          socialShareMessage={t("shareRecommendedCopy", lang)}
          variant="compact"
          className="shrink-0"
        />
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductImageGallery images={imgList} alt={displayName} />

        <div className="space-y-6">
          {product.badge && (
            <span className="inline-block px-2 py-1 bg-emerald-600 text-white text-xs font-medium rounded">
              {product.badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight line-clamp-2 whitespace-pre-line" title={displayName}>{detailTitle}</h1>

          {variants.length > 1 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">{t("selectModel", lang)}</p>
              {(() => {
                const hasSubSkus = variants.some((v) => v.sku !== realProduct?.id);
                const btn = (v: ProductVariant, active: boolean) => (
                  <button
                    key={v.sku}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                      active ? "border-black bg-black text-white" : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {hasSubSkus ? `${v.dimensions} · ${v.type}` : `${v.sku} · ${v.dimensions} · ${v.price}`}
                  </button>
                );
                if (hasSubSkus) {
                  const byLength = variants.reduce<Record<string, ProductVariant[]>>((acc, v) => {
                    const d = v.dimensions;
                    if (!acc[d]) acc[d] = [];
                    acc[d].push(v);
                    return acc;
                  }, {});
                  const lengths = Object.keys(byLength).sort((a, b) => parseFloat(a) - parseFloat(b));
                  return (
                    <div className="space-y-3">
                      {lengths.map((len) => {
                        const group = byLength[len];
                        return (
                          <div key={len}>
                            <span className="text-xs text-gray-500 mr-2">{len} extended</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {group.map((v) => btn(v, selectedVariant?.sku === v.sku))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                return <div className="flex flex-wrap gap-2">{variants.map((v) => btn(v, selectedVariant?.sku === v.sku))}</div>;
              })()}
            </div>
          )}

          <p className="text-xl font-bold text-gray-900">
            {getDisplayPrice(displayPrice, product.fishingStyle, product.id)}
          </p>

          <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {displaySpecs.length && (
              <div>
                <dt className="text-gray-500">{t("length", lang)}</dt>
                <dd className="font-medium text-gray-900">{displaySpecs.length}</dd>
              </div>
            )}
            {displaySpecs.material && (
              <div>
                <dt className="text-gray-500">{t("material", lang)}</dt>
                <dd className="font-medium text-gray-900">{displaySpecs.material}</dd>
              </div>
            )}
            {displaySpecs.power && (
              <div>
                <dt className="text-gray-500">{t("power", lang)}</dt>
                <dd className="font-medium text-gray-900">{displaySpecs.power}</dd>
              </div>
            )}
            {displaySpecs.type && (
              <div>
                <dt className="text-gray-500">{t("type", lang)}</dt>
                <dd className="font-medium text-gray-900">{displaySpecs.type}</dd>
              </div>
            )}
          </dl>

          <Link
            href="/inquiry"
            onClick={() =>
              gtagEvent("inquiry_click", {
                source: "product_detail",
                product_id: product.id,
                product_name: displayName,
                category: product.fishingStyle ?? "unknown",
              })
            }
            className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-3.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
          >
            {t("inquiryNow", lang)}
          </Link>

          <div className="pt-6 border-t border-gray-200 space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{t("logistics", lang)}</h3>
                <p className="text-sm text-gray-600">{t("logisticsDesc", lang)}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{t("service24h", lang)}</h3>
                <p className="text-sm text-gray-600">{t("service24hDesc", lang)}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-700">{t("qualityGuaranteed", lang)}</h3>
                <p className="text-sm text-gray-600">{t("qualityGuaranteedDesc", lang)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-16 space-y-8">
        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t("description", lang)}</h2>
          <p className="text-gray-600 leading-relaxed">{effectiveDetail.description}</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {displaySpecs.material && (
              <div className="flex gap-2">
                <span className="text-gray-500">{t("material", lang)}:</span>
                <span className="font-medium">{displaySpecs.material}</span>
              </div>
            )}
            {displaySpecs.length && (
              <div className="flex gap-2">
                <span className="text-gray-500">{t("length", lang)}:</span>
                <span className="font-medium">{displaySpecs.length}</span>
              </div>
            )}
            {displaySpecs.power && (
              <div className="flex gap-2">
                <span className="text-gray-500">{t("power", lang)}:</span>
                <span className="font-medium">{displaySpecs.power}</span>
              </div>
            )}
            {displaySpecs.type && (
              <div className="flex gap-2">
                <span className="text-gray-500">{t("type", lang)}:</span>
                <span className="font-medium">{displaySpecs.type}</span>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t("specifications", lang)}</h2>
          <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[280px]">
            <tbody>
              {effectiveDetail.specifications.map(({ label, value }) => {
                const key = SPEC_LABEL_KEYS[label];
                const translatedLabel = key ? t(key as "length", lang) : label;
                return (
                  <tr key={label} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 pr-4 text-gray-500">{translatedLabel}</td>
                    <td className="py-3 font-medium text-gray-900">{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t("keyFeatures", lang)}</h2>
          <ul className="space-y-2">
            {keyFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600">
                <span className="text-emerald-600 mt-1">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t("packagingDelivery", lang)}</h2>
          <div className="space-y-4 text-gray-600">
            <p className="leading-relaxed">{t("packagingDesc", lang)}</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                {t("packagingItem1", lang)}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                {t("packagingItem2", lang)}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                {t("packagingItem3", lang)}
              </li>
            </ul>
          </div>
        </section>

        {related.length > 0 && <ProductDetailRecommend key={product.id} products={related} />}
      </div>
    </div>
  );
}
