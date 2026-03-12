import ProductCard from "./ProductCard";
import { trendingRods } from "@/lib/products";

export default function TrendingRods() {
  return (
    <section id="trending" className="py-16 sm:py-24 bg-gradient-to-b from-rose-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-block px-3 py-1 bg-coral-500/10 text-coral-600 text-sm font-semibold rounded-full mb-3">🔥 Hot Deals</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Fishing Rods</h2>
        <p className="text-gray-600 mb-12">Popular picks from our suppliers</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingRods.map((rod, i) => (
            <ProductCard key={i} {...rod} variant="trending" />
          ))}
        </div>
      </div>
    </section>
  );
}
