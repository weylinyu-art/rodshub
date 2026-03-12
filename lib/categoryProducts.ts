import type { Product } from "@/lib/products";
import { getProductImages } from "@/lib/products";

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
const PRICE_RANGES = [
  "$6.50 - $12.00", "$8.00 - $15.00", "$12.00 - $22.00", "$18.00 - $32.00",
  "$25.00 - $45.00", "$35.00 - $65.00", "$9.90 - $18.00", "$14.50 - $28.00",
];
const MOQS = ["30 pcs", "50 pcs", "80 pcs", "100 pcs", "150 pcs", "200 pcs", "300 pcs", "500 pcs"];

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

  for (let i = 0; i < count; i++) {
    const idx = globalImageIndex++;
    const images = getProductImages(idx, (i % 3) + 1 as 1 | 2 | 3); // 1-3 images per product
    const base = bases[i % bases.length];
    const len = lengthPool[i % lengthPool.length];
    products.push({
      name: `${base} ${prefix} ${len}`,
      price: PRICE_RANGES[i % PRICE_RANGES.length],
      moq: MOQS[i % MOQS.length],
      length: len,
      material: MATERIALS[i % MATERIALS.length],
      power: POWERS[i % POWERS.length],
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

export function getProductsByCategory(slug: string): Product[] {
  return (PRODUCTS_BY_CATEGORY as Record<string, Product[]>)[slug] ?? [];
}
