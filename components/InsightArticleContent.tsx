"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getInsightByLang } from "@/lib/insights-i18n";
import InsightContentRenderer from "@/components/InsightContentRenderer";
import ArticleProductRecommendation from "@/components/ArticleProductRecommendation";
import type { Product } from "@/lib/products";

interface Props {
  slug: string;
  recommendedProducts: (Product & { id: string })[];
}

export default function InsightArticleContent({ slug, recommendedProducts }: Props) {
  const { lang } = useLanguage();
  const block = getInsightByLang(slug, lang);

  if (!block) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black transition">{t("home", lang)}</Link>
        <span>/</span>
        <Link href="/insights" className="hover:text-black transition">{t("insights", lang)}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[180px] sm:max-w-xs">{block.title}</span>
      </nav>

      <article className="insight-speakable bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{block.title}</h1>

        <InsightContentRenderer content={block.content} />

        {/* Product Recommendation - in article */}
        <section className="mt-10 pt-8 border-t border-gray-200">
          <ArticleProductRecommendation products={recommendedProducts} />
        </section>
      </article>

      {/* CTA - end of article */}
      <div className="mt-8 p-6 sm:p-8 bg-white rounded-xl border border-gray-200 text-center">
        <p className="text-gray-900 font-semibold mb-2">{t("readyToSource", lang)}</p>
        <p className="text-gray-600 mb-4">{t("sendInquiryPrompt", lang)}</p>
        <Link
          href="/inquiry"
          className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          {t("sendInquiry", lang)}
        </Link>
      </div>

      <div className="mt-8 text-center">
        <Link href="/insights" className="text-sm font-medium text-gray-600 hover:text-black transition">
          ← {t("insights", lang)}
        </Link>
      </div>
    </div>
  );
}
