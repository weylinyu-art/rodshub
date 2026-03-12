import ProductCard from "./ProductCard";
import { newArrivals } from "@/lib/products";

export default function NewArrivalRods() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrival Rods</h2>
            <p className="text-gray-600">Latest additions to our catalog</p>
          </div>
          <a
            href="#trending"
            className="text-blue-600 font-semibold hover:text-blue-700 transition flex items-center gap-1"
          >
            View all <span>→</span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((rod, i) => (
            <ProductCard key={i} {...rod} />
          ))}
        </div>
      </div>
    </section>
  );
}
