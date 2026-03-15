import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import TrendingPageContent from "@/components/TrendingPageContent";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL } from "@/lib/seo";
import { trendingRods } from "@/lib/products";
import { REAL_PRODUCTS, realProductToDisplayProduct } from "@/lib/realProducts";

export const metadata: Metadata = {
  title: "Trending Fishing Rods | RodsHub",
  description: "Top trending fishing rods. Best sellers and hot deals. B2B wholesale from RodsHub.",
  keywords: ["trending fishing rods", "best selling rods", "wholesale fishing rods", "B2B rods", "rod deals"],
  openGraph: buildOpenGraph("Trending Fishing Rods | RodsHub", "Best sellers and hot deals for wholesalers. B2B wholesale fishing rods from RodsHub.", "/trending"),
  twitter: buildTwitter("Trending Fishing Rods | RodsHub", "Best sellers and hot deals for wholesalers."),
  alternates: { canonical: absoluteUrl("/trending") },
};

export default function TrendingPage() {
  const realDisplay = REAL_PRODUCTS.map(realProductToDisplayProduct);
  const trendingProducts = [...realDisplay, ...trendingRods];

  const listItems = trendingProducts.filter((p): p is typeof p & { id: string } => !!p.id);
  const itemListSchema = {
    "@context": "https://schema.org" as const,
    "@type": "ItemList" as const,
    name: "Trending Fishing Rods",
    description: "Best selling and trending fishing rods for B2B wholesale.",
    numberOfItems: listItems.length,
    itemListElement: listItems.map((p, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: p.name,
      url: absoluteUrl(`/product/${p.id}`),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: "Trending Rods", item: absoluteUrl("/trending") },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={[itemListSchema, breadcrumbSchema]} />
      <TrendingPageContent />
    </main>
  );
}
