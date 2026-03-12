import type { Product } from "@/lib/products";
import { trendingRods, newArrivals, wholesalePicks } from "@/lib/products";
import { PRODUCTS_BY_CATEGORY } from "@/lib/categoryProducts";

type ProductWithId = Product & { id: string };

const allProducts: ProductWithId[] = [
  ...trendingRods,
  ...newArrivals,
  ...wholesalePicks,
  ...(Object.values(PRODUCTS_BY_CATEGORY).flat().filter((p): p is ProductWithId => !!p.id)),
];

const registry = new Map<string, Product & { id: string }>();
for (const p of allProducts) {
  if (p.id) registry.set(p.id, p as Product & { id: string });
}

export function getProductById(id: string): (Product & { id: string }) | undefined {
  return registry.get(id);
}

export function getAllProductIds(): string[] {
  return Array.from(registry.keys());
}

export function getAllProducts(): (Product & { id: string })[] {
  return allProducts;
}
