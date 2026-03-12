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

/** Unsplash 渔竿图片池：白底/户外/产品特写 - 120+ 张循环使用 */
const FISHING_ROD_IMAGES = [
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5", // fishing rod
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
  "https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
  "https://images.unsplash.com/photo-1559827260-dc66d43bef33",
  "https://images.unsplash.com/photo-1524704654690-b56c05c78a00",
  "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
  "https://images.unsplash.com/photo-1473968512647-3e447244af8f",
  "https://images.unsplash.com/photo-1597910030638-dcb6ce63d6c8", // person holding rod
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  "https://images.unsplash.com/photo-1464207687429-7505649dae38", // outdoor
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  "https://images.unsplash.com/photo-1580480058343-4d04d051acd7", // fishing
  "https://images.unsplash.com/photo-1592198084033-aade902d1aae",
  "https://images.unsplash.com/photo-1530053969600-caed2596d242",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
  "https://images.unsplash.com/photo-1567894340315-735d7c361db0",
  "https://images.unsplash.com/photo-1525253086316-d0c936c814f8",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
  "https://images.unsplash.com/photo-1615751072497-5f5169febe17",
  "https://images.unsplash.com/photo-1605649487212-47bdab064df7",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1418985227304-f32df7d84f7d",
  "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86",
];

/** 同一产品 1-3 张图：相同基图不同裁剪（白底/户外/特写风格） */
export function getProductImages(baseIndex: number, count: 1 | 2 | 3 = 3): string[] {
  const base = FISHING_ROD_IMAGES[baseIndex % FISHING_ROD_IMAGES.length];
  const variants = [
    `${base}?w=500&h=500&fit=crop`,
    `${base}?w=500&h=450&fit=crop`,
    `${base}?w=450&h=500&fit=crop`,
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

export const trendingRods: (Product & { id: string })[] = withIds([
  tr(0, "Hot", { name: "Carbon Fiber Spinning Rod", price: "$12.80 - $18.50", moq: "100 pcs", length: "2.1m", material: "Carbon", power: "Medium" }),
  tr(1, undefined, { name: "Heavy Duty Casting Rod", price: "$22.00 - $35.00", moq: "50 pcs", length: "2.4m", material: "Graphite", power: "Heavy" }),
  tr(2, "Best Seller", { name: "Portable Telescopic Rod Set", price: "$8.50 - $15.00", moq: "200 pcs", length: "1.8-2.7m", material: "Fiberglass", power: "Light" }),
  tr(3, undefined, { name: "Saltwater Surf Rod", price: "$45.00 - $68.00", moq: "30 pcs", length: "3.6m", material: "Carbon", power: "Heavy" }),
  tr(4, undefined, { name: "Ultralight Freshwater Rod", price: "$15.20 - $28.00", moq: "100 pcs", length: "1.8m", material: "Carbon", power: "Ultralight" }),
  tr(5, undefined, { name: "Ice Fishing Combo Rod", price: "$18.00 - $25.00", moq: "80 pcs", length: "0.7m", material: "Graphite", power: "Light" }),
  tr(6, undefined, { name: "Boat Fishing Graphite Rod", price: "$35.00 - $55.00", moq: "40 pcs", length: "2.1m", material: "Graphite", power: "Medium-Heavy" }),
  tr(7, "New", { name: "Travel 4-Piece Spinning Rod", price: "$9.90 - $16.00", moq: "150 pcs", length: "2.1m", material: "Carbon", power: "Medium" }),
], 1);

export const newArrivals: (Product & { id: string })[] = withIds([
  product(8, { name: "Premium IM8 Carbon Rod", price: "$58.00", moq: "20 pcs", badge: "New" }),
  product(9, { name: "Compact Travel 5-Piece Set", price: "$14.50", moq: "120 pcs", badge: "New" }),
  product(10, { name: "Pro Surf Casting Rod 4.2m", price: "$72.00", moq: "25 pcs", badge: "New" }),
  product(11, { name: "Budget Spinning Rod 2.1m", price: "$6.80", moq: "500 pcs", badge: "New" }),
  product(12, { name: "Multi-Tip Casting Rod Combo", price: "$32.00", moq: "60 pcs", badge: "New" }),
  product(13, { name: "Ultra-Compact 6-Piece Travel", price: "$19.90", moq: "100 pcs", badge: "New" }),
  product(14, { name: "Pro Ice Fishing Rod", price: "$24.50", moq: "80 pcs", badge: "New" }),
  product(15, { name: "Telescopic Surf Rod 3.9m", price: "$42.00", moq: "40 pcs", badge: "New" }),
], 9);

export const wholesalePicks: (Product & { id: string })[] = withIds([
  product(16, { name: "Spinning Rod Bulk Pack", price: "$8.20/pc", moq: "50 pcs" }),
  product(17, { name: "Telescopic Rod Wholesale Set", price: "$6.50/pc", moq: "200 pcs" }),
  product(18, { name: "Surf Rod Bulk Order", price: "$38.00/pc", moq: "30 pcs" }),
  product(19, { name: "Casting Rod 100-Pack", price: "$11.00/pc", moq: "100 pcs" }),
  product(20, { name: "Travel Rod Bulk Deal", price: "$5.90/pc", moq: "300 pcs" }),
  product(21, { name: "Ice Rod Wholesale Lot", price: "$14.00/pc", moq: "80 pcs" }),
], 17);
