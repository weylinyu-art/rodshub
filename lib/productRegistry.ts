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

/** 根据同分类/同场景推荐关联产品，排除当前产品 */
export function getRelatedProducts(currentId: string, limit = 8): (Product & { id: string })[] {
  const current = getProductById(currentId);
  if (!current) return [];
  const style = (current.fishingStyle ?? "").toLowerCase();
  const sameStyle = allProducts.filter(
    (p) => p.id !== currentId && p.id && (p.fishingStyle ?? "").toLowerCase() === style
  );
  const others = allProducts.filter(
    (p) => p.id !== currentId && p.id && !sameStyle.some((s) => s.id === p.id)
  );
  const related = [...sameStyle, ...others].slice(0, limit);
  return related as (Product & { id: string })[];
}
