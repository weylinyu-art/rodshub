"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import {
  getInsightSections,
  getInsightByLang,
  ARTICLES,
  getArticleTitle,
} from "@/lib/insights-i18n";
import { getFirstParagraphText } from "@/lib/insights";

const ARTICLES_PER_SECTION = 4;

const sectionMeta: Record<string, { accent: string; bg: string; icon: string }> = {
  "rod-guides": { accent: "slate", bg: "bg-slate-50", icon: "🎣" },
  techniques: { accent: "emerald", bg: "bg-emerald-50", icon: "⚡" },
  "product-knowledge": { accent: "amber", bg: "bg-amber-50", icon: "🔧" },
  "community-favorites": { accent: "violet", bg: "bg-violet-50", icon: "⭐" },
  "sourcing-industry": { accent: "indigo", bg: "bg-indigo-50", icon: "📦" },
};

const accentBorder: Record<string, string> = {
  slate: "border-l-slate-500",
  emerald: "border-l-emerald-500",
  amber: "border-l-amber-500",
  violet: "border-l-violet-500",
  indigo: "border-l-indigo-500",
};

export default function InsightsPageContent() {
  const { lang } = useLanguage();
  const sections = getInsightSections(lang);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <>
      {/* Hero - 不展示文章篇数 */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTItNCAyLTQgMiAyIDQgMiA0IDQgNCA0IDIgMiA0IDIgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition">{t("home", lang)}</Link>
            <span>/</span>
            <span className="text-gray-300 font-medium">{t("insights", lang)}</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{t("insights", lang)}</h1>
              <p className="mt-3 text-gray-300 text-lg max-w-2xl">
                Practical guides and sourcing insights for fishing rod buyers and tackle businesses.
              </p>
            </div>
          </div>
          {/* Section jump nav */}
          <div className="mt-8 flex flex-wrap gap-2">
            {sections.map((s) => {
              const meta = sectionMeta[s.id] ?? { accent: "slate", bg: "bg-slate-50", icon: "📄" };
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white text-sm font-medium transition backdrop-blur"
                >
                  <span>{meta.icon}</span>
                  {s.title}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular reads */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>⭐</span> {t("popularReads", lang)}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARTICLES.slice(0, 4).map((a) => {
            const block = getInsightByLang(a.slug, lang);
            const excerpt = block ? getFirstParagraphText(block.content) : "";
            const title = getArticleTitle(a.slug, lang);
            return (
              <Link
                key={a.slug}
                href={`/insights/${a.slug}`}
                className="group flex flex-col p-5 rounded-xl bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 border-l-4 border-l-indigo-500"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-black line-clamp-2">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-1">{excerpt}</p>
                <span className="mt-3 text-sm font-medium text-indigo-600 group-hover:text-indigo-700">{t("readArticle", lang)} →</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {sections.map((section) => {
          const meta = sectionMeta[section.id] ?? { accent: "slate", bg: "bg-slate-50", icon: "📄" };
          const borderCls = accentBorder[meta.accent] ?? "border-l-slate-500";

          const isExpanded = expandedSection === section.id;
          const displayedBlocks = isExpanded ? section.blocks : section.blocks.slice(0, ARTICLES_PER_SECTION);
          const hasMore = section.blocks.length > ARTICLES_PER_SECTION;

          return (
            <section key={section.id} id={section.id} className={`scroll-mt-8 rounded-2xl p-6 sm:p-8 ${meta.bg}`}>
              <div className="mb-6">
                <h2 className="inline-flex items-center gap-2 text-xl font-bold text-gray-900">
                  <span>{meta.icon}</span>
                  {section.title}
                </h2>
                <p className="mt-1 text-gray-600">{section.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {displayedBlocks.map((block) => {
                  const blockData = getInsightByLang(block.id, lang);
                  const excerpt = blockData ? getFirstParagraphText(blockData.content) : "";
                  return (
                    <article
                      key={block.id}
                      id={block.id}
                      className={`group bg-white rounded-xl border border-gray-200 border-l-4 ${borderCls} p-5 sm:p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200`}
                    >
                      <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-black">
                        <Link href={`/insights/${block.id}`} className="hover:underline underline-offset-2">
                          {blockData?.title ?? block.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {excerpt}
                      </p>
                      <Link
                        href={`/insights/${block.id}`}
                        className="inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-black"
                      >
                        {t("readArticle", lang)}
                        <span className="ml-1 opacity-0 group-hover:opacity-100 transition">→</span>
                      </Link>
                    </article>
                  );
                })}
              </div>
              {hasMore && !isExpanded && (
                <button
                  type="button"
                  onClick={() => setExpandedSection(section.id)}
                  className="mt-4 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1"
                >
                  {t("viewMore", lang)}
                  <span>→</span>
                </button>
              )}
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="rounded-2xl bg-gray-900 text-white p-8 sm:p-10 text-center">
          <p className="text-lg font-semibold mb-2">{t("readyToSource", lang)}</p>
          <p className="text-gray-400 mb-6">{t("sendInquiryPrompt", lang)}</p>
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            {t("sendInquiry", lang)}
          </Link>
        </div>
      </div>
    </>
  );
}
