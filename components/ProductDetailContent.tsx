"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getProductName } from "@/lib/products-i18n";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductDetailRecommend from "@/components/ProductDetailRecommend";
import type { Product } from "@/lib/products";
import type { ProductDetail } from "@/lib/productDetail";

const SPEC_LABEL_KEYS: Record<string, string> = {
  Length: "length",
  Material: "material",
  Power: "power",
  Action: "action",
  "Line Weight": "lineWeight",
  "Lure Weight": "lureWeight",
  Sections: "rodSections",
  Handle: "handle",
};

interface ProductDetailContentProps {
  product: Product & { id: string };
  detail: ProductDetail;
  imgList: string[];
  related: (Product & { id: string })[];
}

export default function ProductDetailContent({
  product,
  detail,
  imgList,
  related,
}: ProductDetailContentProps) {
  const { lang } = useLanguage();
  const displayName = getProductName(product, lang);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black transition">{t("home", lang)}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{displayName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductImageGallery images={imgList} alt={displayName} />

        <div className="space-y-6">
          {product.badge && (
            <span className="inline-block px-2 py-1 bg-emerald-600 text-white text-xs font-medium rounded">
              {product.badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{displayName}</h1>
          <p className="text-xl font-bold text-gray-900">{product.price}</p>

          <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {product.length && (
              <div>
                <dt className="text-gray-500">{t("length", lang)}</dt>
                <dd className="font-medium text-gray-900">{product.length}</dd>
              </div>
            )}
            {product.material && (
              <div>
                <dt className="text-gray-500">{t("material", lang)}</dt>
                <dd className="font-medium text-gray-900">{product.material}</dd>
              </div>
            )}
            {product.power && (
              <div>
                <dt className="text-gray-500">{t("power", lang)}</dt>
                <dd className="font-medium text-gray-900">{product.power}</dd>
              </div>
            )}
          </dl>

          <Link
            href="/inquiry"
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
          <p className="text-gray-600 leading-relaxed">{detail.description}</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {product.material && (
              <div className="flex gap-2">
                <span className="text-gray-500">{t("material", lang)}:</span>
                <span className="font-medium">{product.material}</span>
              </div>
            )}
            {product.length && (
              <div className="flex gap-2">
                <span className="text-gray-500">{t("length", lang)}:</span>
                <span className="font-medium">{product.length}</span>
              </div>
            )}
            {product.power && (
              <div className="flex gap-2">
                <span className="text-gray-500">{t("power", lang)}:</span>
                <span className="font-medium">{product.power}</span>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t("specifications", lang)}</h2>
          <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-sm min-w-[280px]">
            <tbody>
              {detail.specifications.map(({ label, value }) => {
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
            {detail.features.map((f, i) => (
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
                Standard export carton packaging; OEM branding available
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                Air freight: 6–9 business days; Sea freight: 20–35 days
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600">✓</span>
                FOB/CIF available; documentation included
              </li>
            </ul>
          </div>
        </section>

        {related.length > 0 && <ProductDetailRecommend products={related} />}
      </div>
    </div>
  );
}
