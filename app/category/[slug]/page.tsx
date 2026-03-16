import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryFilters from "@/components/CategoryFilters";
import CategoryPageHeader from "@/components/CategoryPageHeader";
import JsonLd from "@/components/JsonLd";
import InquiryButton from "@/components/InquiryButton";
import {
  categories,
  getProductsByCategory,
} from "@/lib/categoryProducts";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };

  const title = `${category.name} Wholesale | RodsHub`;
  const desc = `${category.name} wholesale: quality rods at $8-18. MOQ from 30 pcs, 24h quote. RodsHub B2B.`;
  const path = `/category/${slug}`;

  return {
    title,
    description: desc,
    keywords: [category.name, "wholesale", "B2B", "fishing rod", slug],
    openGraph: buildOpenGraph(title, desc, path),
    twitter: buildTwitter(title, desc),
    alternates: { canonical: absoluteUrl(path) },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: category.name, item: absoluteUrl(`/category/${slug}`) },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org" as const,
    "@type": "ItemList" as const,
    name: `${category.name} - RodsHub Wholesale`,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 20).map((p, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      url: absoluteUrl(`/product/${p.id}`),
      name: p.name,
    })),
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={[breadcrumbSchema, itemListSchema]} />
      <CategoryPageHeader slug={slug} productCount={products.length} />

      {/* Filters + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilters products={products} categoryName={category.name} sortMode="category" />
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-600 mb-4">Can&apos;t find what you need?</p>
          <InquiryButton source="category_page" label="Send Inquiry" />
        </div>
      </div>
    </main>
  );
}
