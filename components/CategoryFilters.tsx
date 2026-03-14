"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

const PAGE_SIZE = 30;

type SortOption = "default" | "price-asc" | "price-desc";

function uniq<T>(arr: (T | undefined | null)[]): T[] {
  return Array.from(new Set(arr.filter(Boolean))) as T[];
}

function extractPriceMin(p: Product): number {
  if (p.priceMin != null) return p.priceMin;
  const m = p.price.match(/\$?([\d.]+)/);
  return m ? parseFloat(m[1]) : 0;
}

export default function CategoryFilters({
  products,
  categoryName,
}: {
  products: Product[];
  categoryName: string;
}) {
  const [material, setMaterial] = useState<Set<string>>(new Set());
  const [power, setPower] = useState<Set<string>>(new Set());
  const [length, setLength] = useState<Set<string>>(new Set());
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [fishingStyle, setFishingStyle] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 移动端默认收起筛选

  useEffect(() => {
    setCurrentPage(1);
  }, [material, power, length, fishingStyle, priceMin, priceMax, sort]);

  const materials = useMemo(() => uniq(products.map((p) => p.material)), [products]);
  const powers = useMemo(() => uniq(products.map((p) => p.power)), [products]);
  const lengths = useMemo(() => uniq(products.map((p) => p.length)), [products]);
  const fishingStyles = useMemo(() => uniq(products.map((p) => p.fishingStyle)), [products]);
  const priceMins = useMemo(
    () => uniq(products.map((p) => extractPriceMin(p))).filter((n) => n > 0).sort((a, b) => a - b),
    [products]
  );

  const toggle = <T,>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    setter(next);
  };

  const reset = () => {
    setMaterial(new Set());
    setPower(new Set());
    setLength(new Set());
    setPriceMin(null);
    setPriceMax(null);
    setFishingStyle(new Set());
    setSort("default");
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (material.size && (!p.material || !material.has(p.material))) return false;
      if (power.size && (!p.power || !power.has(p.power))) return false;
      if (length.size && (!p.length || !length.has(p.length))) return false;
      if (fishingStyle.size && (!p.fishingStyle || !fishingStyle.has(p.fishingStyle))) return false;
      const pm = extractPriceMin(p);
      if (priceMin != null && pm < priceMin) return false;
      if (priceMax != null && pm > priceMax) return false;
      return true;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => extractPriceMin(a) - extractPriceMin(b));
    if (sort === "price-desc") list = [...list].sort((a, b) => extractPriceMin(b) - extractPriceMin(a));

    return list;
  }, [products, material, power, length, fishingStyle, priceMin, priceMax, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginatedProducts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      {/* Filters - on mobile: above content; on desktop: left sidebar */}
      <aside
        className={`flex-shrink-0 transition-all duration-200 ${
          sidebarOpen ? "w-full md:w-56" : "w-full md:w-0 md:overflow-hidden"
        }`}
      >
        <div className="space-y-4 p-4 md:p-0 bg-white md:bg-transparent rounded-xl md:rounded-none border md:border-0 border-gray-200">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Material</h3>
              <div className="space-y-1.5">
                {materials.map((m) => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={material.has(m)}
                      onChange={() => toggle(material, m, setMaterial)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Power</h3>
              <div className="space-y-1.5">
                {powers.map((p) => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={power.has(p)}
                      onChange={() => toggle(power, p, setPower)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{p}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Length</h3>
              <div className={`space-y-1.5 ${lengths.length > 10 ? "max-h-32 overflow-y-auto" : ""}`}>
                {lengths.map((l) => (
                  <label key={l} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={length.has(l)}
                      onChange={() => toggle(length, l, setLength)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{l}</span>
                  </label>
                ))}
              </div>
            </div>

            {fishingStyles.length > 1 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Fishing Style</h3>
                <div className="space-y-1.5">
                  {fishingStyles.map((f) => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fishingStyle.has(f)}
                        onChange={() => toggle(fishingStyle, f, setFishingStyle)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Price Range</h3>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min $"
                  value={priceMin ?? ""}
                  onChange={(e) => setPriceMin(e.target.value ? Number(e.target.value) : null)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max $"
                  value={priceMax ?? ""}
                  onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : null)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={reset}
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                RESET
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="hidden md:flex flex-1 px-3 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800"
              >
                DONE
              </button>
            </div>
          </div>
      </aside>

      {/* Main - products + sort */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {sidebarOpen ? "Hide filters" : "Filters"}
            </button>
            <p className="text-gray-600 text-sm">{filtered.length} products</p>
          </div>
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <span className="hidden" />
            )}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="default">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {paginatedProducts.map((p, i) => (
            <div key={p.id ?? i} className="min-w-0">
              <ProductCard {...p} variant="default" />
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-12 text-gray-500">No products match your filters. Try adjusting.</p>
        )}
        {filtered.length > 0 && totalPages > 1 && (
          <nav className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 enabled:hover:border-gray-400"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 enabled:hover:border-gray-400"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
