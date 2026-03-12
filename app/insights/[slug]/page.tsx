import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ArticleProductRecommendation from "@/components/ArticleProductRecommendation";
import InsightContentRenderer from "@/components/InsightContentRenderer";
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <Link href="/insights" className="hover:text-black transition">Fishing Insights</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[180px] sm:max-w-xs">{block.title}</span>
        </nav>

        <article className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{block.title}</h1>

          <InsightContentRenderer content={block.content} />

          {/* Product Recommendation - in article */}
          <section className="mt-10 pt-8 border-t border-gray-200">
            <ArticleProductRecommendation products={recommendedProducts} />
          </section>
        </article>

        {/* CTA - end of article */}
        <div className="mt-8 p-6 sm:p-8 bg-white rounded-xl border border-gray-200 text-center">
          <p className="text-gray-900 font-semibold mb-2">Looking for fishing rods in bulk?</p>
          <p className="text-gray-600 mb-4">Contact RodsHub for wholesale pricing.</p>
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Send Inquiry
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/insights" className="text-sm font-medium text-gray-600 hover:text-black transition">
            ← Back to Fishing Insights
          </Link>
        </div>
      </div>
    </main>
  );
}
