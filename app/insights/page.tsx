import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { INSIGHT_BLOCKS } from "@/lib/insights";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fishing Insights | RodsHub",
  description:
    "Fishing rod types: spinning vs casting vs surf. Carbon fiber materials, rod power & action explained. How to choose a supplier, manufacturing process, line & lure weight guide.",
  keywords: [
    "fishing rod types",
    "spinning vs casting rod",
    "carbon fiber rod",
    "rod power action",
    "fishing rod supplier",
    "rod manufacturing",
    "line weight lure weight",
  ],
  openGraph: buildOpenGraph(
    "Fishing Insights - Rod Types, Materials & Sourcing Guide | RodsHub",
    "Learn about fishing rod types, carbon fiber materials, power & action. How to choose a B2B supplier & manufacturing process.",
    "/insights"
  ),
  twitter: buildTwitter(
    "Fishing Insights | RodsHub",
    "Fishing rod types, materials, power & action, supplier selection, manufacturing."
  ),
  alternates: { canonical: absoluteUrl("/insights") },
};

export default function InsightsPage() {
  const articleSchemas = INSIGHT_BLOCKS.map((block) => ({
    "@context": "https://schema.org" as const,
    "@type": "Article" as const,
    headline: block.title,
    articleBody: block.content.join(" "),
    url: `${SITE_URL}/insights#${block.id}`,
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
        url: `${SITE_URL}/insights#supplier-selection`,
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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Fishing Insights</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fishing Insights</h1>
          <p className="mt-1 text-gray-600">
            Industry knowledge for smarter rod sourcing — rod types, materials, power & action, supplier selection, manufacturing, and more.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {INSIGHT_BLOCKS.map((block) => (
          <article
            key={block.id}
            id={block.id}
            className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">{block.title}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              {block.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

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
