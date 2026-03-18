export interface Product {
  id?: string;
  name: string;
  price: string;
  moq?: string;
  /** Primary image - used when images array not provided */
  image: string;
  /** 1-3 images of the same product (different angles/crops) */
  images?: string[];
  badge?: string;
  length?: string;
  material?: string;
  power?: string;
  /** For category filtering - Spinning, Casting, etc. */
  fishingStyle?: string;
  /** Min price as number for filter - parsed from price string */
  priceMin?: number;
}

/** 根据主图去重产品：同一张主图仅保留第一条，用于过滤程序生成的重复卡片；忽略尺寸参数等 query */
export function dedupeProductsByImage<T extends { image: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item.image) return true;
    const base = item.image.split("?")[0];
    if (seen.has(base)) return false;
    seen.add(base);
    return true;
  });
}

/** 已验证的渔竿/渔具图片池（Unsplash + Pexels）- 均为真实渔竿内容 */
const FISHING_ROD_IMAGES = [
  "https://images.unsplash.com/photo-1529230117010-b6c436154f25", // person holding black fishing rod
  "https://images.unsplash.com/photo-1624218656926-da680b8127c9", // black and gray fishing rod
  "https://images.unsplash.com/photo-1537872384762-e785271d14f8", // fishing reel by water
  "https://images.unsplash.com/photo-1689618601755-ef7ce1230bea", // fishing rod on beach
  "https://images.unsplash.com/photo-1525134055640-f42ef8a7032d", // five fishing rods
  "https://images.pexels.com/photos/14339529/pexels-photo-14339529.jpeg", // man holding rod
  "https://images.pexels.com/photos/18040479/pexels-photo-18040479.jpeg", // man fishing
  "https://images.unsplash.com/photo-1570353825353-5daea21cdc4d", // fishing rod/lure
  "https://images.pexels.com/photos/14339529/pexels-photo-14339529.jpeg", // man holding rod (dup for pool)
];

/** 同一产品 1-3 张图：400px 宽满足列表/卡片，减少传输 */
export function getProductImages(baseIndex: number, count: 1 | 2 | 3 = 3): string[] {
  const base = FISHING_ROD_IMAGES[baseIndex % FISHING_ROD_IMAGES.length];
  const variants = [
    `${base}?w=400&h=400&fit=crop`,
    `${base}?w=400&h=360&fit=crop`,
    `${base}?w=360&h=400&fit=crop`,
  ];
  return variants.slice(0, count);
}

function product(
  baseIndex: number,
  props: Omit<Product, "image" | "images"> & { imagesCount?: 1 | 2 | 3 }
): Product {
  const count = props.imagesCount ?? (2 as 1 | 2 | 3);
  const images = getProductImages(baseIndex, count);
  return {
    ...props,
    image: images[0],
    images,
  };
}

function tr(baseIndex: number, badge: string | undefined, props: Omit<Product, "image" | "images">): Product {
  return product(baseIndex, { badge, ...props });
}

function withIds<T extends Product>(items: T[], startId: number): (T & { id: string })[] {
  return items.map((p, i) => ({ ...p, id: String(startId + i) }));
}

import { getRandomDisplayPriceForId } from "./priceDisplay";

export const trendingRods: (Product & { id: string })[] = withIds([
  tr(0, "Hot", { name: "Carbon Fiber Spinning Rod", price: "$5.00 - $10.00", moq: "100 pcs", length: "2.1m", material: "Carbon", power: "Medium", fishingStyle: "Spinning" }),
  tr(1, undefined, { name: "Heavy Duty Casting Rod", price: "$5.00 - $10.00", moq: "50 pcs", length: "2.4m", material: "Graphite", power: "Heavy", fishingStyle: "Casting" }),
  tr(2, "Best Seller", { name: "Portable Telescopic Rod Set", price: "$4.00 - $10.00", moq: "200 pcs", length: "1.8-2.7m", material: "Fiberglass", power: "Light", fishingStyle: "Telescopic" }),
  tr(3, undefined, { name: "Saltwater Surf Rod", price: "$5.00 - $10.00", moq: "30 pcs", length: "3.6m", material: "Carbon", power: "Heavy", fishingStyle: "Surf" }),
  tr(4, undefined, { name: "Ultralight Freshwater Rod", price: "$4.00 - $10.00", moq: "100 pcs", length: "1.8m", material: "Carbon", power: "Ultralight", fishingStyle: "Spinning" }),
  tr(5, undefined, { name: "Ice Fishing Combo Rod", price: "$4.00 - $10.00", moq: "80 pcs", length: "0.7m", material: "Graphite", power: "Light", fishingStyle: "Ice" }),
  tr(6, undefined, { name: "Boat Fishing Graphite Rod", price: "$5.00 - $10.00", moq: "40 pcs", length: "2.1m", material: "Graphite", power: "Medium-Heavy", fishingStyle: "Casting" }),
  tr(7, "New", { name: "Travel 4-Piece Spinning Rod", price: "$5.00 - $10.00", moq: "150 pcs", length: "2.1m", material: "Carbon", power: "Medium", fishingStyle: "Travel" }),
], 1).map((p) => {
  const { text, min } = getRandomDisplayPriceForId(p.id);
  return { ...p, price: text, priceMin: min };
});

export const newArrivals: (Product & { id: string })[] = withIds([
  product(8, { name: "Premium IM8 Carbon Rod", price: "$9.80", moq: "20 pcs", badge: "New" }),
  product(9, { name: "Compact Travel 5-Piece Set", price: "$9.50", moq: "120 pcs", badge: "New" }),
  product(10, { name: "Pro Surf Casting Rod 4.2m", price: "$9.00", moq: "25 pcs", badge: "New" }),
  product(11, { name: "Budget Spinning Rod 2.1m", price: "$8.20", moq: "500 pcs", badge: "New" }),
  product(12, { name: "Multi-Tip Casting Rod Combo", price: "$9.50", moq: "60 pcs", badge: "New" }),
  product(13, { name: "Ultra-Compact 6-Piece Travel", price: "$9.90", moq: "100 pcs", badge: "New" }),
  product(14, { name: "Pro Ice Fishing Rod", price: "$9.00", moq: "80 pcs", badge: "New" }),
  product(15, { name: "Telescopic Surf Rod 3.9m", price: "$9.50", moq: "40 pcs", badge: "New" }),
], 9).map((p) => {
  const { text, min } = getRandomDisplayPriceForId(p.id);
  return { ...p, price: text, priceMin: min };
});

export const wholesalePicks: (Product & { id: string })[] = withIds([
  product(16, { name: "Spinning Rod Bulk Pack", price: "$8.50/pc", moq: "50 pcs" }),
  product(17, { name: "Telescopic Rod Wholesale Set", price: "$8.00/pc", moq: "200 pcs" }),
  product(18, { name: "Surf Rod Bulk Order", price: "$9.50/pc", moq: "30 pcs" }),
  product(19, { name: "Casting Rod 100-Pack", price: "$10.00/pc", moq: "100 pcs" }),
  product(20, { name: "Travel Rod Bulk Deal", price: "$8.90/pc", moq: "300 pcs" }),
  product(21, { name: "Ice Rod Wholesale Lot", price: "$9.50/pc", moq: "80 pcs" }),
], 17).map((p) => {
  const { text, min } = getRandomDisplayPriceForId(p.id);
  return { ...p, price: text, priceMin: min };
});
