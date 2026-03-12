import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryFilters from "@/components/CategoryFilters";
import {
  categories,
  getProductsByCategory,
} from "@/lib/categoryProducts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            {category.name}
          </h1>
          <p className="mt-1 text-gray-600">
            {products.length}+ SKUs · Wholesale prices · MOQ from 30 pcs
          </p>
        </div>
      </div>

      {/* Filters + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilters products={products} categoryName={category.name} />
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-600 mb-4">Can&apos;t find what you need?</p>
          <Link
            href="/#inquiry"
            className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Send Inquiry
          </Link>
        </div>
      </div>
    </main>
  );
}
