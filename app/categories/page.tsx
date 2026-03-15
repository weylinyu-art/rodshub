import type { Metadata } from "next";
import Link from "next/link";
import { categories, getProductsByCategory } from "@/lib/categoryProducts";
import { CATEGORY_IMAGE_URLS } from "@/lib/categoryImages";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Categories | Fishing Rods | RodsHub",
  description: "Browse spinning, casting, telescopic, surf, ice fishing, travel rods. 2000+ SKUs. Wholesale prices.",
  openGraph: buildOpenGraph("All Categories | RodsHub", "Spinning, casting, telescopic, surf, ice, travel rods.", "/categories"),
  alternates: { canonical: absoluteUrl("/categories") },
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Categories</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">All Categories</h1>
          <p className="mt-1 text-gray-600">
            Browse all rod types
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const products = getProductsByCategory(cat.slug);
            const count = products.length;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group block bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-200"
              >
                <div className="aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CATEGORY_IMAGE_URLS[cat.slug] ?? CATEGORY_IMAGE_URLS.spinning}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center">
                  <h2 className="font-semibold text-gray-900 text-sm group-hover:text-black transition">
                    {cat.name}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
