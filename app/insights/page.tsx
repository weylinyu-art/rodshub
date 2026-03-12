import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { INSIGHT_SECTIONS, INSIGHT_BLOCKS } from "@/lib/insights";
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
    articleBody: block.content.join(" "),
    url: `${SITE_URL}/insights/${block.id}`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  }));

  const supplierBlock = INSIGHT_BLOCKS.find((b) => b.id === "supplier-selection");
  const howToSchema = supplierBlock
    ? {
        "@context": "https://schema.org" as const,
        "@type": "HowTo" as const,
        name: supplierBlock.title,
        description: supplierBlock.content.join(" ").slice(0, 500),
        step: supplierBlock.content.map((text, i) => ({
          "@type": "HowToStep" as const,
          position: i + 1,
          text,
        })),
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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Fishing Insights</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fishing Insights</h1>
          <p className="mt-2 text-gray-600 text-lg max-w-2xl">
            Practical guides and sourcing insights for fishing rod buyers and tackle businesses.
          </p>
          {/* Section jump nav */}
          <div className="mt-6 flex flex-wrap gap-2">
            {INSIGHT_SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Four sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {INSIGHT_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{section.title}</h2>
            <p className="text-gray-600 mb-6">{section.description}</p>
            <div className="space-y-6">
              {section.blocks.map((block) => (
                <article
                  key={block.id}
                  id={block.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    <Link href={`/insights/${block.id}`} className="hover:underline">
                      {block.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                    {block.content[0]}
                  </p>
                  <Link
                    href={`/insights/${block.id}`}
                    className="text-sm font-semibold text-gray-900 hover:underline"
                  >
                    Read full article →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <Link
          href="/inquiry"
          className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Ask us about sourcing
        </Link>
      </div>
    </main>
  );
}
