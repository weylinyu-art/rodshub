import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts } from "@/lib/productRegistry";
import { categories, sortProductsByCategory } from "@/lib/categoryProducts";
import { SCENARIOS, sortProductsByScenario } from "@/lib/scenarios";
import CategoryFilters from "@/components/CategoryFilters";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";

type Mode = "category" | "scenario";

interface PageProps {
  params: Promise<{ mode: string }>;
}

export function generateStaticParams() {
  return [{ mode: "category" }, { mode: "scenario" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mode } = await params;
  if (mode === "category") {
    return {
      title: "All Fishing Rods by Category | RodsHub B2B Wholesale",
      description:
        "Browse all wholesale fishing rods by category: spinning, casting, telescopic, surf, ice fishing and travel rods. B2B pricing from $8/pc, MOQ 30 pcs, OEM available.",
      keywords: ["fishing rod categories", "wholesale spinning rods", "casting rod bulk", "telescopic rod supplier", "surf rod wholesale", "ice fishing rod", "travel rod OEM"],
      openGraph: buildOpenGraph("All Fishing Rods by Category | RodsHub", "Browse wholesale fishing rods by category. B2B, OEM, MOQ 30 pcs.", "/rods/category"),
      twitter: buildTwitter("All Fishing Rods by Category | RodsHub", "Browse wholesale fishing rods by category."),
      alternates: { canonical: absoluteUrl("/rods/category") },
    };
  }
  return {
    title: "Fishing Rods by Fishing Scenario | RodsHub B2B Wholesale",
    description:
      "Find wholesale fishing rods by fishing scenario: freshwater, saltwater, surf, boat and ice fishing. Source the right rod for every market. MOQ 30 pcs.",
    keywords: ["fishing rod by scenario", "freshwater rod wholesale", "saltwater rod supplier", "surf fishing rod bulk", "boat fishing rod", "ice fishing wholesale"],
    openGraph: buildOpenGraph("Fishing Rods by Scenario | RodsHub", "Find wholesale rods by fishing scenario. B2B, OEM, MOQ 30 pcs.", "/rods/scenario"),
    twitter: buildTwitter("Fishing Rods by Scenario | RodsHub", "Find wholesale rods by fishing scenario."),
    alternates: { canonical: absoluteUrl("/rods/scenario") },
  };
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilters products={products} categoryName="All Rods" sortMode={mode} />
      </div>
    </main>
  );
}
