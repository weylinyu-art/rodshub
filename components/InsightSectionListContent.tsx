"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getInsightSections, getInsightByLang } from "@/lib/insights-i18n";
import { getFirstParagraphText } from "@/lib/insights";

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

interface InsightSectionListContentProps {
  sectionId: string;
}

export default function InsightSectionListContent({ sectionId }: InsightSectionListContentProps) {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const sections = getInsightSections(lang);
  const section = sections.find((s) => s.id === sectionId);

  if (!section) return null;

  const meta = sectionMeta[section.id] ?? { accent: "slate", bg: "bg-slate-50", icon: "📄" };
  const borderCls = accentBorder[meta.accent] ?? "border-l-slate-500";

  const pageParam = searchParams.get("page");
  const totalPages = Math.max(1, Math.ceil(section.blocks.length / 10));
  let currentPage = pageParam ? parseInt(pageParam, 10) || 1 : 1;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIndex = (currentPage - 1) * 10;
  const currentBlocks = section.blocks.slice(startIndex, startIndex + 10);

  return (
    <>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTItNCAyLTQgMiAyIDQgMiA0IDQgNCA0IDIgMiA0IDIgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition">{t("home", lang)}</Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-white transition">{t("insights", lang)}</Link>
            <span>/</span>
            <span className="text-gray-300 font-medium">{section.title}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
            <span>{meta.icon}</span>
            {section.title}
          </h1>
          <p className="mt-3 text-gray-300 text-lg max-w-2xl">{section.description}</p>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className={`rounded-2xl p-6 sm:p-8 ${meta.bg}`}>
          <ul className="space-y-4">
            {currentBlocks.map((block) => {
              const blockData = getInsightByLang(block.id, lang);
              const excerpt = blockData ? getFirstParagraphText(blockData.content) : "";
              const title = blockData?.title ?? block.title;
              return (
                <li key={block.id}>
                  <Link
                    href={`/insights/${block.id}`}
                    className={`group block bg-white rounded-xl border border-gray-200 border-l-4 ${borderCls} p-5 sm:p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200`}
                  >
                    <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-black">{title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{excerpt}</p>
                    <div className="mt-3 flex items-center justify-end">
                      <span className="sr-only">{t("readArticle", lang)}</span>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs text-gray-500 group-hover:bg-gray-900 group-hover:text-white transition">
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 text-sm text-gray-600">
              <div>
                {t("page", lang)} {currentPage} / {totalPages}
              </div>
              <div className="flex items-center gap-2">
                {currentPage > 1 ? (
                  <Link
                    href={`/insights/section/${sectionId}?page=${currentPage - 1}`}
                    className="px-3 py-1 rounded-full border border-gray-200 bg-white hover:bg-gray-100"
                  >
                    ← {t("previous", lang)}
                  </Link>
                ) : (
                  <span className="px-3 py-1 rounded-full border border-gray-100 text-gray-300 cursor-default">
                    ← {t("previous", lang)}
                  </span>
                )}
                {currentPage < totalPages ? (
                  <Link
                    href={`/insights/section/${sectionId}?page=${currentPage + 1}`}
                    className="px-3 py-1 rounded-full border border-gray-200 bg-white hover:bg-gray-100"
                  >
                    {t("next", lang)} →
                  </Link>
                ) : (
                  <span className="px-3 py-1 rounded-full border border-gray-100 text-gray-300 cursor-default">
                    {t("next", lang)} →
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
