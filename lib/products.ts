export interface Product {
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
}

const IMAGE_BASE_COUNT = 120;
function getBaseSeed(index: number) {
  return `rodshub-${String(index).padStart(3, "0")}`;
}
/** Generate 1-3 images of same product (different crops of same base image) */
export function getProductImages(baseIndex: number, count: 1 | 2 | 3 = 3): string[] {
  const seed = getBaseSeed(baseIndex % IMAGE_BASE_COUNT);
  const variants = [
    `https://picsum.photos/seed/${seed}/500/500`,
    `https://picsum.photos/seed/${seed}/500/450`,
    `https://picsum.photos/seed/${seed}/450/500`,
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

export const trendingRods: Product[] = [
  tr(0, "Hot", { name: "Carbon Fiber Spinning Rod", price: "$12.80 - $18.50", moq: "100 pcs", length: "2.1m", material: "Carbon", power: "Medium" }),
  tr(1, undefined, { name: "Heavy Duty Casting Rod", price: "$22.00 - $35.00", moq: "50 pcs", length: "2.4m", material: "Graphite", power: "Heavy" }),
  tr(2, "Best Seller", { name: "Portable Telescopic Rod Set", price: "$8.50 - $15.00", moq: "200 pcs", length: "1.8-2.7m", material: "Fiberglass", power: "Light" }),
  tr(3, undefined, { name: "Saltwater Surf Rod", price: "$45.00 - $68.00", moq: "30 pcs", length: "3.6m", material: "Carbon", power: "Heavy" }),
  tr(4, undefined, { name: "Ultralight Freshwater Rod", price: "$15.20 - $28.00", moq: "100 pcs", length: "1.8m", material: "Carbon", power: "Ultralight" }),
  tr(5, undefined, { name: "Ice Fishing Combo Rod", price: "$18.00 - $25.00", moq: "80 pcs", length: "0.7m", material: "Graphite", power: "Light" }),
  tr(6, undefined, { name: "Boat Fishing Graphite Rod", price: "$35.00 - $55.00", moq: "40 pcs", length: "2.1m", material: "Graphite", power: "Medium-Heavy" }),
  tr(7, "New", { name: "Travel 4-Piece Spinning Rod", price: "$9.90 - $16.00", moq: "150 pcs", length: "2.1m", material: "Carbon", power: "Medium" }),
];

export const newArrivals: Product[] = [
  product(8, { name: "Premium IM8 Carbon Rod", price: "$58.00", moq: "20 pcs", badge: "New" }),
  product(9, { name: "Compact Travel 5-Piece Set", price: "$14.50", moq: "120 pcs", badge: "New" }),
  product(10, { name: "Pro Surf Casting Rod 4.2m", price: "$72.00", moq: "25 pcs", badge: "New" }),
  product(11, { name: "Budget Spinning Rod 2.1m", price: "$6.80", moq: "500 pcs", badge: "New" }),
  product(12, { name: "Multi-Tip Casting Rod Combo", price: "$32.00", moq: "60 pcs", badge: "New" }),
  product(13, { name: "Ultra-Compact 6-Piece Travel", price: "$19.90", moq: "100 pcs", badge: "New" }),
  product(14, { name: "Pro Ice Fishing Rod", price: "$24.50", moq: "80 pcs", badge: "New" }),
  product(15, { name: "Telescopic Surf Rod 3.9m", price: "$42.00", moq: "40 pcs", badge: "New" }),
];

export const wholesalePicks: Product[] = [
  product(16, { name: "Spinning Rod Bulk Pack", price: "$8.20/pc", moq: "50 pcs" }),
  product(17, { name: "Telescopic Rod Wholesale Set", price: "$6.50/pc", moq: "200 pcs" }),
  product(18, { name: "Surf Rod Bulk Order", price: "$38.00/pc", moq: "30 pcs" }),
  product(19, { name: "Casting Rod 100-Pack", price: "$11.00/pc", moq: "100 pcs" }),
  product(20, { name: "Travel Rod Bulk Deal", price: "$5.90/pc", moq: "300 pcs" }),
  product(21, { name: "Ice Rod Wholesale Lot", price: "$14.00/pc", moq: "80 pcs" }),
];
