import ProductCard from "./ProductCard";
import { newArrivals, dedupeProductsByImage } from "@/lib/products";
import { HOME_REAL_NEW_ARRIVALS } from "@/lib/realProducts";

export default function NewArrivalRods() {
  const baseArrivals = HOME_REAL_NEW_ARRIVALS.length ? HOME_REAL_NEW_ARRIVALS : newArrivals;
  const arrivals = dedupeProductsByImage(baseArrivals);
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-amber-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-400/30 text-amber-800 text-sm font-semibold rounded-full mb-3">✨ New</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrival Rods</h2>
            <p className="text-gray-600">Latest additions to our catalog</p>
          </div>
          <a
            href="#trending"
            className="text-coral-600 font-semibold hover:text-coral-500 transition flex items-center gap-1"
          >
            View all <span>→</span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {arrivals.map((rod, i) => (
            <ProductCard key={i} {...rod} />
          ))}
        </div>
      </div>
    </section>
  );
}
