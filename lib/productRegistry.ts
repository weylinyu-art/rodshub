import type { Product } from "@/lib/products";
import { trendingRods, newArrivals, wholesalePicks } from "@/lib/products";
import { PRODUCTS_BY_CATEGORY } from "@/lib/categoryProducts";
import { REAL_PRODUCTS, realProductToDisplayProduct } from "@/lib/realProducts";

type ProductWithId = Product & { id: string };

const realDisplayProducts = REAL_PRODUCTS.map(realProductToDisplayProduct);

function hasImage(p: ProductWithId): boolean {
  return typeof p.image === "string" && p.image.trim().length > 0;
}

const allProducts: ProductWithId[] = [
  // 没有图片的真实商品不应进入任何列表/搜索
  ...realDisplayProducts.filter(hasImage),
  ...trendingRods,
  ...newArrivals,
  ...wholesalePicks,
  ...(Object.values(PRODUCTS_BY_CATEGORY).flat().filter((p): p is ProductWithId => !!p.id)),
];

const registry = new Map<string, Product & { id: string }>();
const variantToFamily = new Map<string, string>();

for (const p of allProducts) {
  if (p.id) registry.set(p.id, p as Product & { id: string });
}
for (const rp of REAL_PRODUCTS) {
  for (const v of rp.variants) variantToFamily.set(v.sku, rp.id);
}

export function getProductById(id: string): (Product & { id: string }) | undefined {
  const familyId = variantToFamily.get(id) ?? id;
  return registry.get(familyId);
}

export function getFamilyId(id: string): string {
  return variantToFamily.get(id) ?? id;
}

export function getRealProduct(id: string): import("./realProducts").RealProduct | undefined {
  const familyId = variantToFamily.get(id) ?? id;
  return REAL_PRODUCTS.find((p) => p.id === familyId);
}

export function isVariantSku(id: string): boolean {
  return variantToFamily.has(id);
}

/** 返回所有产品 ID（含父 SKU 与子 SKU），用于静态生成与 sitemap */
export function getAllProductIds(): string[] {
  const familyIds = new Set(registry.keys());
  // 仅返回主 SKU：变种 SKU（子 SKU）不单独生成页面
  return Array.from(familyIds);
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
