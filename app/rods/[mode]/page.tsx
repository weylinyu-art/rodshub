import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts } from "@/lib/productRegistry";
import { categories, sortProductsByCategory } from "@/lib/categoryProducts";
import { SCENARIOS, sortProductsByScenario } from "@/lib/scenarios";
import CategoryFilters from "@/components/CategoryFilters";

type Mode = "category" | "scenario";

interface PageProps {
  params: Promise<{ mode: string }>;
}

export function generateStaticParams() {
  return [{ mode: "category" }, { mode: "scenario" }];
}

export default async function RodsModePage({ params }: PageProps) {
  const { mode } = await params;
  if (mode !== "category" && mode !== "scenario") notFound();

  const all = getAllProducts();
  const products = mode === "category" ? sortProductsByCategory(all) : sortProductsByScenario(all);
  const title = mode === "category" ? "All Rods by Category" : "All Rods by Scenario";
  const subTitle =
    mode === "category"
      ? "Browse our full catalog · Filter by rod type"
      : "Browse our full catalog · Filter by fishing scenario";

  const categoryTabs = [
    { slug: "all", name: "All" },
    ...categories.map((c) => ({ slug: c.slug, name: c.name.replace(" Rods", "") })),
  ];
  const scenarioTabs = [
    { slug: "all", name: "All" },
    ...SCENARIOS.map((s) => ({ slug: s.slug, name: s.name })),
  ];
  const tabs = mode === "category" ? categoryTabs : scenarioTabs;

  const href = (slug: string) =>
    slug === "all" ? `/rods/${mode}` : `/rods/${mode}/${slug}`;

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

          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((t) => {
              const isActive = t.slug === "all";
              return (
                <Link
                  key={t.slug}
                  href={href(t.slug)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  {t.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilters products={products} categoryName="All Rods" />
      </div>
    </main>
  );
}
