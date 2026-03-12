import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { trendingRods } from "@/lib/products";

export default function TrendingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Trending Rods</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Trending Rods</h1>
          <p className="mt-1 text-gray-600">
            Top picks from our B2B marketplace · Best sellers & hot deals
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {trendingRods.map((rod) => (
            <ProductCard key={rod.id} {...rod} variant="trending" />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/wholesale"
            className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            View Wholesale Picks →
          </Link>
        </div>
      </div>
    </main>
  );
}
