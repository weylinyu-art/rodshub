"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  return (
    <div className="flex gap-8">
      {/* Sidebar - filters */}
      <aside
        className={`${sidebarOpen ? "w-56 flex-shrink-0" : "w-0 overflow-hidden"} transition-all duration-200`}
      >
        {sidebarOpen && (
          <div className="space-y-6">
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
              <div className="space-y-1.5">
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
                className="flex-1 px-3 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800"
              >
                DONE
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main - products + sort */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">{filtered.length} products</p>
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-sm text-gray-600 hover:text-black"
              >
                Show filters
              </button>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id ?? i} {...p} variant="trending" />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-12 text-gray-500">No products match your filters. Try adjusting.</p>
        )}
      </div>
    </div>
  );
}
