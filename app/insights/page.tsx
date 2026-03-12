import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import {
  INSIGHT_SECTIONS,
  INSIGHT_BLOCKS,
  ARTICLES,
  getFirstParagraphText,
  getArticleBodyText,
} from "@/lib/insights";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fishing Insights | RodsHub",
  description:
    "Practical guides and sourcing insights for fishing rod buyers and tackle businesses. Rod guides, techniques, product knowledge, and B2B sourcing.",
  keywords: [
    "fishing rod types",
    "fishing techniques",
    "rod power action",
    "carbon fiber rod",
    "fishing rod supplier",
    "private label fishing rod",
    "MOQ wholesale",
    "rod manufacturing",
  ],
  openGraph: buildOpenGraph(
    "Fishing Insights - Practical Guides for Buyers & Tackle Businesses | RodsHub",
    "Rod guides, fishing techniques, product knowledge, and B2B sourcing insights.",
    "/insights"
  ),
  twitter: buildTwitter(
    "Fishing Insights | RodsHub",
    "Practical guides and sourcing insights for fishing rod buyers and tackle businesses."
  ),
  alternates: { canonical: absoluteUrl("/insights") },
};

export default function InsightsPage() {
  const articleSchemas = INSIGHT_BLOCKS.map((block) => ({
    "@context": "https://schema.org" as const,
    "@type": "Article" as const,
    headline: block.title,
    articleBody: getArticleBodyText(block.content),
    url: `${SITE_URL}/insights/${block.id}`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  }));

  const supplierBlock = INSIGHT_BLOCKS.find((b) => b.id === "supplier-selection");
  const supplierBody = supplierBlock ? getArticleBodyText(supplierBlock.content) : "";
  const howToSchema = supplierBlock
    ? {
        "@context": "https://schema.org" as const,
        "@type": "HowTo" as const,
        name: supplierBlock.title,
        description: supplierBody.slice(0, 500),
        step: [{ "@type": "HowToStep" as const, position: 1, text: supplierBody }],
        url: `${SITE_URL}/insights/supplier-selection`,
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: "Fishing Insights", item: absoluteUrl("/insights") },
    ],
  };

  const totalArticles = INSIGHT_BLOCKS.length;

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

  const accentBadge: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    violet: "bg-violet-100 text-violet-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd
        data={
          howToSchema
            ? [...articleSchemas, howToSchema, breadcrumbSchema]
            : [...articleSchemas, breadcrumbSchema]
        }
      />
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTItNCAyLTQgMiAyIDQgMiA0IDQgNCA0IDIgMiA0IDIgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-gray-300 font-medium">Fishing Insights</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Fishing Insights</h1>
              <p className="mt-3 text-gray-300 text-lg max-w-2xl">
                Practical guides and sourcing insights for fishing rod buyers and tackle businesses.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-sm">
                <span className="font-semibold text-white">{totalArticles}</span>
                <span className="text-gray-400">articles</span>
              </div>
            </div>
          </div>
          {/* Section jump nav */}
          <div className="mt-8 flex flex-wrap gap-2">
            {INSIGHT_SECTIONS.map((s) => {
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
          <span>⭐</span> Popular reads
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ARTICLES.slice(0, 4).map((a) => {
            const block = INSIGHT_BLOCKS.find((b) => b.id === a.slug);
            const excerpt = block ? getFirstParagraphText(block.content) : "";
            return (
              <Link
                key={a.slug}
                href={`/insights/${a.slug}`}
                className="group flex flex-col p-5 rounded-xl bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 border-l-4 border-l-indigo-500"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-black line-clamp-2">{a.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-1">{excerpt}</p>
                <span className="mt-3 text-sm font-medium text-indigo-600 group-hover:text-indigo-700">Read article →</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {INSIGHT_SECTIONS.map((section) => {
          const meta = sectionMeta[section.id] ?? { accent: "slate", bg: "bg-slate-50", icon: "📄" };
          const borderCls = accentBorder[meta.accent] ?? "border-l-slate-500";
          const badgeCls = accentBadge[meta.accent] ?? "bg-slate-100 text-slate-700";

          return (
            <section key={section.id} id={section.id} className={`scroll-mt-8 rounded-2xl p-6 sm:p-8 ${meta.bg}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="inline-flex items-center gap-2 text-xl font-bold text-gray-900">
                    <span>{meta.icon}</span>
                    {section.title}
                  </h2>
                  <p className="mt-1 text-gray-600">{section.description}</p>
                </div>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${badgeCls}`}>
                  {section.blocks.length} articles
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {section.blocks.map((block) => (
                  <article
                    key={block.id}
                    id={block.id}
                    className={`group bg-white rounded-xl border border-gray-200 border-l-4 ${borderCls} p-5 sm:p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200`}
                  >
                    <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-black">
                      <Link href={`/insights/${block.id}`} className="hover:underline underline-offset-2">
                        {block.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {getFirstParagraphText(block.content)}
                    </p>
                    <Link
                      href={`/insights/${block.id}`}
                      className="inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-black"
                    >
                      Read article
                      <span className="ml-1 opacity-0 group-hover:opacity-100 transition">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="rounded-2xl bg-gray-900 text-white p-8 sm:p-10 text-center">
          <p className="text-lg font-semibold mb-2">Looking for fishing rods in bulk?</p>
          <p className="text-gray-400 mb-6">Contact RodsHub for wholesale pricing. We reply within 24 hours.</p>
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Send Inquiry
          </Link>
        </div>
      </div>
    </main>
  );
}
