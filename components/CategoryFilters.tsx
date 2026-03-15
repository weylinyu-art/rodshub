"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";
import { applyListImageOverride } from "@/lib/realProducts";
import {
  sortProductsByCategory,
  sortProductsByPriceAsc,
  sortProductsByPriceDesc,
} from "@/lib/categoryProducts";
import { sortProductsByScenario } from "@/lib/scenarios";

const PAGE_SIZE = 30;

type SortOption = "default" | "price-asc" | "price-desc";

export default function CategoryFilters({
  products,
  categoryName,
  sortMode = "category",
}: {
  products: Product[];
  categoryName: string;
  sortMode?: "category" | "scenario";
}) {
  const [sort, setSort] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  const sortedProducts = useMemo(() => {
    let list = [...products];
    if (sort === "default") {
      list = sortMode === "category"
        ? sortProductsByCategory(list)
        : sortProductsByScenario(list);
    } else if (sort === "price-asc") {
      list = sortProductsByPriceAsc(list);
    } else {
      list = sortProductsByPriceDesc(list);
    }
    return list;
  }, [products, sort, sortMode]);

  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-end mb-4">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {paginatedProducts.map((p, i) => (
          <div key={p.id ?? i} className="min-w-0">
            <ProductCard {...applyListImageOverride(p as Product & { id: string })} variant="default" />
          </div>
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <p className="text-center py-12 text-gray-500">No products in this category.</p>
      )}

      {sortedProducts.length > 0 && totalPages > 1 && (
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
  );
}
