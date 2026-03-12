import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { INSIGHT_BLOCKS, getArticleBodyText } from "@/lib/insights";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL } from "@/lib/seo";
import InsightsPageContent from "@/components/InsightsPageContent";

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

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd
        data={
          howToSchema
            ? [...articleSchemas, howToSchema, breadcrumbSchema]
            : [...articleSchemas, breadcrumbSchema]
        }
      />
      <InsightsPageContent />
    </main>
  );
}
