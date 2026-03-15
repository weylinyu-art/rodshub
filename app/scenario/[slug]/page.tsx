import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryFilters from "@/components/CategoryFilters";
import JsonLd from "@/components/JsonLd";
import { SCENARIOS, getProductsByScenario } from "@/lib/scenarios";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const scenario = SCENARIOS.find((s) => s.slug === slug);
  if (!scenario) return { title: "Scenario Not Found" };

  const title = `${scenario.name} Fishing Rods | RodsHub`;
  const desc = `Best ${scenario.name.toLowerCase()} fishing rods for wholesalers. RodsHub B2B marketplace - spinning, casting, surf & more.`;
  const path = `/scenario/${slug}`;

  return {
    title,
    description: desc,
    keywords: [scenario.name, "fishing rods", "wholesale", "B2B", slug],
    openGraph: buildOpenGraph(title, desc, path),
    twitter: buildTwitter(title, desc),
    alternates: { canonical: absoluteUrl(path) },
  };
}

export default async function ScenarioPage({ params }: PageProps) {
  const { slug } = await params;
  const scenario = SCENARIOS.find((s) => s.slug === slug);
  if (!scenario) notFound();

  const products = getProductsByScenario(slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: `${scenario.name} Rods`, item: absoluteUrl(`/scenario/${slug}`) },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org" as const,
    "@type": "ItemList" as const,
    name: `${scenario.name} Fishing Rods - RodsHub`,
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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{scenario.name}</span>
          </nav>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            {scenario.name} Rods
          </h1>
          <p className="mt-1 text-gray-600">
            Rods suited for {scenario.name.toLowerCase()} fishing
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilters products={products} categoryName={`${scenario.name} Rods`} sortMode="scenario" />
      </div>
    </main>
  );
}
