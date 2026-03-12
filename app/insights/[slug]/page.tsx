import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import InsightArticleContent from "@/components/InsightArticleContent";
import { getAllProducts } from "@/lib/productRegistry";
import {
  getInsightBySlug,
  getAllInsightSlugs,
  getFirstParagraphText,
  getArticleBodyText,
} from "@/lib/insights";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const block = getInsightBySlug(slug);
  if (!block) return { title: "Article Not Found" };

  const title = `${block.title} | RodsHub Insights`;
  const desc = getFirstParagraphText(block.content).slice(0, 155) || block.title;

  return {
    title,
    description: desc,
    openGraph: buildOpenGraph(title, desc, `/insights/${slug}`),
    twitter: buildTwitter(title, desc),
    alternates: { canonical: absoluteUrl(`/insights/${slug}`) },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const block = getInsightBySlug(slug);
  if (!block) notFound();

  const allProducts = getAllProducts();
  const recommendedProducts = allProducts.slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org" as const,
    "@type": "Article" as const,
    headline: block.title,
    articleBody: getArticleBodyText(block.content),
    url: `${SITE_URL}/insights/${slug}`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: "Fishing Insights", item: absoluteUrl("/insights") },
      { "@type": "ListItem" as const, position: 3, name: block.title, item: absoluteUrl(`/insights/${slug}`) },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <InsightArticleContent slug={slug} recommendedProducts={recommendedProducts} />
    </main>
  );
}
