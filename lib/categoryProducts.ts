import type { Product } from "@/lib/products";
import { getProductImages } from "@/lib/products";
import { REAL_PRODUCTS, realProductToDisplayProduct } from "@/lib/realProducts";
import { dailyRotateScore } from "@/lib/clickSortUtils";

export const CATEGORIES = [
  { name: "Spinning Rods", slug: "spinning" },
  { name: "Casting Rods", slug: "casting" },
  { name: "Telescopic Rods", slug: "telescopic" },
  { name: "Surf Rods", slug: "surf" },
  { name: "Ice Fishing Rods", slug: "ice" },
  { name: "Travel Rods", slug: "travel" },
] as const;

export const categories = CATEGORIES;

type CategorySlug = (typeof CATEGORIES)[number]["slug"];

const LENGTHS = ["1.5m", "1.8m", "2.0m", "2.1m", "2.4m", "2.7m", "3.0m", "3.6m", "0.7m", "1.2m", "2.5m"];
const MATERIALS = ["Carbon", "Graphite", "Fiberglass", "Composite", "IM6", "IM8"];
const POWERS = ["Ultralight", "Light", "Medium", "Medium-Heavy", "Heavy", "Extra Heavy"];
const PRICE_RANGES: { price: string; min: number }[] = [
  { price: "$8.00 - $12.00", min: 8 }, { price: "$8.50 - $15.00", min: 8.5 }, { price: "$9.00 - $14.00", min: 9 },
  { price: "$10.00 - $15.00", min: 10 }, { price: "$11.00 - $16.00", min: 11 }, { price: "$12.00 - $18.00", min: 12 },
  { price: "$8.00 - $14.00", min: 8 }, { price: "$9.50 - $15.00", min: 9.5 }, { price: "$10.00 - $18.00", min: 10 },
];
const MOQS = ["30 pcs", "50 pcs", "80 pcs", "100 pcs", "150 pcs", "200 pcs", "300 pcs", "500 pcs"];
const FISHING_STYLES: Record<CategorySlug, string> = {
  spinning: "Spinning", casting: "Casting", telescopic: "Telescopic",
  surf: "Surf", ice: "Ice", travel: "Travel",
};

/** Global index for category products - 22+ to avoid overlap with homepage products (0-21) */
let globalImageIndex = 22;

function generateProducts(
  category: CategorySlug,
  prefix: string,
  count: number,
  lengthPool: string[]
): Product[] {
  const products: Product[] = [];
  const bases = [
    "Carbon Fiber", "Heavy Duty", "Portable", "Pro", "Ultralight", "Budget",
    "Premium", "Compact", "Standard", "Entry-Level", "Tournament", "Beginner",
    "Advanced", "Saltwater", "Freshwater", "All-Purpose", "Specialty", "Economy",
  ];

  const fishingStyle = FISHING_STYLES[category];
  const catOffset = CATEGORIES.findIndex((c) => c.slug === category);
  const idBase = 100 + (catOffset >= 0 ? catOffset * 32 : 0);

  for (let i = 0; i < count; i++) {
    const idx = globalImageIndex++;
    const images = getProductImages(idx, 3);
    const base = bases[i % bases.length];
    const len = lengthPool[i % lengthPool.length];
    const pr = PRICE_RANGES[i % PRICE_RANGES.length];
    products.push({
      id: String(idBase + i),
      name: `${base} ${prefix} ${len}`,
      price: pr.price,
      priceMin: pr.min,
      moq: MOQS[i % MOQS.length],
      length: len,
      material: MATERIALS[i % MATERIALS.length],
      power: POWERS[i % POWERS.length],
      fishingStyle,
      image: images[0],
      images,
    });
  }
  return products;
}

/** 32 products per category - meets 30+ SKU requirement */
export const PRODUCTS_BY_CATEGORY: Record<CategorySlug, Product[]> = {
  spinning: generateProducts("spinning", "Spinning Rod", 32, LENGTHS),
  casting: generateProducts("casting", "Casting Rod", 32, LENGTHS),
  telescopic: generateProducts("telescopic", "Telescopic Rod", 32, ["1.2m", "1.8m", "2.1m", "2.4m", "2.7m", "1.5-2.7m"]),
  surf: generateProducts("surf", "Surf Rod", 32, ["3.0m", "3.6m", "3.9m", "4.2m", "3.3m", "4.0m"]),
  ice: generateProducts("ice", "Ice Fishing Rod", 32, ["0.6m", "0.7m", "0.8m", "1.0m", "1.2m"]),
  travel: generateProducts("travel", "Travel Rod", 32, ["1.8m", "2.1m", "2.4m", "2.0m", "4-piece", "5-piece"]),
};

/** 分类 slug 与 fishingStyle 映射 */
const SLUG_TO_STYLE: Record<string, string> = {
  spinning: "Spinning",
  casting: "Casting",
  telescopic: "Telescopic",
  surf: "Surf",
  ice: "Ice",
  travel: "Travel",
};

/** Categories 页默认排序：按 rod type 顺序 Spinning → Casting → Telescopic → Surf → Ice → Travel */
const CATEGORY_ORDER: CategorySlug[] = ["spinning", "casting", "telescopic", "surf", "ice", "travel"];

function getCategoryIndex(p: Product): number {
  const fs = (p.fishingStyle ?? "").toLowerCase();
  const idx = CATEGORY_ORDER.findIndex((s) => s === fs || fs.startsWith(s));
  return idx >= 0 ? idx : CATEGORY_ORDER.length;
}

/** 按分类顺序排序产品 */
export function sortProductsByCategory<T extends Product>(products: T[]): T[] {
  return [...products].sort((a, b) => getCategoryIndex(a) - getCategoryIndex(b));
}

function extractPriceMin(p: Product): number {
  if (p.priceMin != null) return p.priceMin;
  const m = (p.price ?? "").match(/\$?([\d.]+)/);
  return m ? parseFloat(m[1]) : 0;
}

/** 按价格从低到高 */
export function sortProductsByPriceAsc<T extends Product>(products: T[]): T[] {
  return [...products].sort((a, b) => extractPriceMin(a) - extractPriceMin(b));
}

/** 按价格从高到低 */
export function sortProductsByPriceDesc<T extends Product>(products: T[]): T[] {
  return [...products].sort((a, b) => extractPriceMin(b) - extractPriceMin(a));
}

/** Trending 页：主序=点击量降序，次序=价格升序，0 点击产品按日级轮换 */
export function sortProductsByClicksThenPrice<T extends Product>(
  products: T[],
  counts: Record<string, number>
): T[] {
  return [...products].sort((a, b) => {
    const ca = counts[(a as Product & { id?: string }).id ?? ""] ?? 0;
    const cb = counts[(b as Product & { id?: string }).id ?? ""] ?? 0;
    if (ca !== cb) return cb - ca;
    if (ca === 0) return dailyRotateScore((a as Product & { id?: string }).id ?? "") - dailyRotateScore((b as Product & { id?: string }).id ?? "");
    return extractPriceMin(a) - extractPriceMin(b);
  });
}

export { extractPriceMin };

/** 获取分类下的产品：真实产品排在前面，按 fishingStyle 归拢 */
export function getProductsByCategory(slug: string): (Product & { id: string })[] {
  const style = SLUG_TO_STYLE[slug];
  const generated = (PRODUCTS_BY_CATEGORY as Record<string, Product[]>)[slug] ?? [];
  const realForCategory = REAL_PRODUCTS.filter(
    (p) => p.fishingStyle.toLowerCase() === (style?.toLowerCase() ?? "")
  ).map(realProductToDisplayProduct);
  return [...realForCategory, ...generated] as (Product & { id: string })[];
}
