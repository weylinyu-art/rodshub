import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import { SCENARIOS, getProductsByScenario } from "@/lib/scenarios";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SCENARIOS.map((s) => ({ slug: s.slug }));
}

export default async function ScenarioPage({ params }: PageProps) {
  const { slug } = await params;
  const scenario = SCENARIOS.find((s) => s.slug === slug);
  if (!scenario) notFound();

  const products = getProductsByScenario(slug);

  return (
    <main className="min-h-screen bg-gray-50">
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
            {products.length} SKUs · Rods suited for {scenario.name.toLowerCase()} fishing
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilters products={products} categoryName={`${scenario.name} Rods`} />
      </div>
    </main>
  );
}
