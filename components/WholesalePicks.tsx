import ProductCard from "./ProductCard";
import { wholesalePicks } from "@/lib/products";

export default function WholesalePicks() {
  return (
    <section id="wholesale" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-3 py-1 bg-gray-900 text-white text-sm font-semibold rounded mb-3">Bulk Savings</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Wholesale Picks</h2>
            <p className="text-gray-600">Best-value rods for bulk orders & competitive pricing</p>
          </div>
          <a
            href="#trending"
            className="text-gray-900 font-semibold hover:underline transition flex items-center gap-1"
          >
            View all <span>→</span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wholesalePicks.map((rod, i) => (
            <ProductCard key={i} {...rod} />
          ))}
        </div>
      </div>
    </section>
  );
}
