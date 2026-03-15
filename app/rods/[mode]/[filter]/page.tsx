import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/categoryProducts";
import { getProductsByScenario } from "@/lib/scenarios";
import { categories } from "@/lib/categoryProducts";
import { SCENARIOS } from "@/lib/scenarios";
import CategoryFilters from "@/components/CategoryFilters";
import RodsTabBar from "@/components/RodsTabBar";
import type { Product } from "@/lib/products";

type Mode = "category" | "scenario";
type CategorySlug = (typeof categories)[number]["slug"];
type ScenarioSlug = (typeof SCENARIOS)[number]["slug"];

function getProducts(mode: Mode, filter: string): Product[] {
  if (mode === "category") return getProductsByCategory(filter as CategorySlug);
  return getProductsByScenario(filter as ScenarioSlug);
}

interface PageProps {
  params: Promise<{ mode: string; filter: string }>;
}

export function generateStaticParams() {
  const params: { mode: string; filter: string }[] = [];
  for (const c of categories) {
    params.push({ mode: "category", filter: c.slug });
  }
  for (const s of SCENARIOS) {
    params.push({ mode: "scenario", filter: s.slug });
  }
  return params;
}

export default async function RodsFilterPage({ params }: PageProps) {
  const { mode, filter } = await params;
  if (mode !== "category" && mode !== "scenario") notFound();

  if (mode === "category" && !categories.find((c) => c.slug === filter)) notFound();
  if (mode === "scenario" && !SCENARIOS.find((s) => s.slug === filter)) notFound();

  const products = getProducts(mode as Mode, filter);
  const title = mode === "category" ? "All Rods by Category" : "All Rods by Scenario";
  const subTitle =
    mode === "category"
      ? "Browse our full catalog · Switch by rod type"
      : "Browse our full catalog · Switch by fishing scenario";

  const categoryTabs = [
    { slug: "all", name: "All" },
    ...categories.map((c) => ({ slug: c.slug, name: c.name.replace(" Rods", "") })),
  ];
  const scenarioTabs = [
    { slug: "all", name: "All" },
    ...SCENARIOS.map((s) => ({ slug: s.slug, name: s.name })),
  ];
  const tabs = mode === "category" ? categoryTabs : scenarioTabs;

  const filterName = tabs.find((t) => t.slug === filter)?.name ?? "Rods";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{title}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-gray-600">{subTitle}</p>

          <RodsTabBar tabs={tabs} mode={mode} activeSlug={filter} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilters products={products} categoryName={filterName} sortMode={mode} />
      </div>
    </main>
  );
}
