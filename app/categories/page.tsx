import Link from "next/link";
import { categories } from "@/lib/categoryProducts";
import { getProductsByCategory } from "@/lib/categoryProducts";

const CATEGORY_IMAGES: Record<string, string> = {
  spinning: "https://images.unsplash.com/photo-1529230117010-b6c436154f25?w=400&h=300&fit=crop",
  casting: "https://images.unsplash.com/photo-1624218656926-da680b8127c9?w=400&h=300&fit=crop",
  telescopic: "https://images.unsplash.com/photo-1525134055640-f42ef8a7032d?w=400&h=300&fit=crop",
  surf: "https://images.unsplash.com/photo-1689618601755-ef7ce1230bea?w=400&h=300&fit=crop",
  ice: "https://images.unsplash.com/photo-1537872384762-e785271d14f8?w=400&h=300&fit=crop",
  travel: "https://images.pexels.com/photos/14339529/pexels-photo-14339529.jpeg?auto=compress&w=400&h=300&fit=crop",
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
            Browse all rod types · Click into any category for secondary filters (Material, Power, Length, Price)
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
                    src={CATEGORY_IMAGES[cat.slug] ?? CATEGORY_IMAGES.spinning}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center">
                  <h2 className="font-semibold text-gray-900 text-sm group-hover:text-black transition">
                    {cat.name}
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-500">{count}+ SKUs</p>
                  <p className="mt-1 text-xs text-gray-400">Material · Power · Length filters</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
