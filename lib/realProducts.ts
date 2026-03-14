/**
 * 真实产品数据：支持多型号（SKU 如 DA01-1、DA01-2 代表不同型号）
 * 图片来自 R2: https://images.rodshub.com
 */

export interface ProductVariant {
  /** SKU，如 DA01-1 */
  sku: string;
  /** 尺寸，如 16.00m */
  dimensions: string;
  /** 重量，如 0.5kg */
  weight: string;
  /** 类型：Spinning / Casting */
  type: string;
  /** 详细尺寸，如 37.00*19.00*9.00 in */
  detailDimensions?: string;
  /** 包装尺寸 */
  packageDimensions?: string;
  /** 价格，如 $2.00 */
  price: string;
  /** 型号描述/备注 */
  remarks: string;
  /** 用于排序和筛选的数值 */
  priceMin?: number;
}

export interface RealProduct {
  /** 产品族 ID，如 DA01（与 R2 文件夹对应 rod-001） */
  id: string;
  /** 产品标题（共用） */
  name: string;
  /** R2 图片目录，如 products/rod-001，对应 images.rodshub.com/products/rod-001/ */
  imageFolder: string;
  /** 图片文件名列表，如 ["rod-001-1.jpg", "rod-001-2.jpg"] */
  imageFiles: string[];
  /** 分类：Spinning / Casting / Telescopic / Surf / Ice / Travel */
  fishingStyle: string;
  /** MOQ */
  moq?: string;
  /** 多个型号 */
  variants: ProductVariant[];
}

const R2_BASE = "https://images.rodshub.com";

function buildImageUrls(folder: string, files: string[]): string[] {
  return files.map((f) => `${R2_BASE}/${folder}/${f}`);
}

/** 将 RealProduct 转成列表展示用的 Product（取第一个型号的价格区间） */
export function realProductToDisplayProduct(p: RealProduct): import("./products").Product & { id: string } {
  const imgs = buildImageUrls(p.imageFolder, p.imageFiles);
  const prices = p.variants.map((v) => {
    const num = v.priceMin != null ? v.priceMin : parseFloat(v.price.replace(/[^0-9.]/g, "")) || 0;
    return num;
  }).filter((n) => n > 0);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const priceStr =
    minPrice && maxPrice && minPrice !== maxPrice
      ? `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
      : p.variants[0]?.price ?? `$${minPrice.toFixed(2)}`;

  return {
    id: p.id,
    name: p.name,
    price: priceStr,
    priceMin: minPrice || undefined,
    moq: p.moq,
    image: imgs[0] ?? "",
    images: imgs,
    fishingStyle: p.fishingStyle,
    length: p.variants[0]?.dimensions,
    material: p.variants[0]?.type,
    power: p.variants[0]?.type,
  };
}

/** 真实产品数据 - 请按表格补充 */
export const REAL_PRODUCTS: RealProduct[] = [
  {
    id: "DA01",
    name: "Carbon Fiber Spinning Rod",
    imageFolder: "products/rod-001",
    imageFiles: [
      "rod-001-1.jpg",
      "rod-001-2.jpg",
      "rod-001-3.jpg",
      "rod-001-4.jpg",
      "rod-001-5.jpg",
      "rod-001-6.jpg",
      "rod-001-7.jpg",
      "rod-001-8.jpg",
    ],
    fishingStyle: "Spinning",
    moq: "100 pcs",
    variants: [
      {
        sku: "DA01-1",
        dimensions: "16.00m",
        weight: "0.5kg",
        type: "Spinning",
        detailDimensions: "37.00*19.00*9.00 in",
        packageDimensions: "37.00*19.00*9.00 in",
        price: "$2.00",
        priceMin: 2,
        remarks:
          "Lightweight carbon fiber blank, Fuji guides, cork handle. Ideal for freshwater and light saltwater. OEM branding available.",
      },
      {
        sku: "DA01-2",
        dimensions: "25.00m",
        weight: "0.9kg",
        type: "Spinning",
        price: "$5.00",
        priceMin: 5,
        remarks:
          "Medium power, fast action. Suitable for bass and trout. Quality components, competitive wholesale price.",
      },
      {
        sku: "DA01-3",
        dimensions: "54.00m",
        weight: "1.4kg",
        type: "Spinning",
        price: "$7.00",
        priceMin: 7,
        remarks:
          "Heavy duty build for larger fish. Graphite composite, EVA grip. Export carton packaging.",
      },
    ],
  },
  {
    id: "DA02",
    name: "Heavy Duty Casting Rod",
    imageFolder: "products/rod-002",
    imageFiles: ["rod-002-1.jpg", "rod-002-2.jpg", "rod-002-3.jpg", "rod-002-4.jpg", "rod-002-5.jpg", "rod-002-6.jpg"],
    fishingStyle: "Casting",
    moq: "50 pcs",
    variants: [
      {
        sku: "DA02-1",
        dimensions: "2.1m",
        weight: "0.65kg",
        type: "Casting",
        detailDimensions: "42.00*20.00*10.00 in",
        packageDimensions: "42.00*20.00*10.00 in",
        price: "$18.00",
        priceMin: 18,
        remarks: "EVA handle, fast action. Designed for bass and pike. Fuji guides, graphite blank. OEM available.",
      },
      {
        sku: "DA02-2",
        dimensions: "2.4m",
        weight: "0.85kg",
        type: "Casting",
        price: "$24.00",
        priceMin: 24,
        remarks: "Medium-heavy power. Saltwater capable. Quality components at wholesale price.",
      },
    ],
  },
  {
    id: "DA03",
    name: "Telescopic Travel Rod Set",
    imageFolder: "products/rod-003",
    imageFiles: ["rod-003-1.jpg", "rod-003-2.jpg", "rod-003-3.jpg", "rod-003-4.jpg", "rod-003-5.jpg"],
    fishingStyle: "Travel",
    moq: "200 pcs",
    variants: [
      {
        sku: "DA03-1",
        dimensions: "1.8-2.7m",
        weight: "0.4kg",
        type: "Telescopic",
        price: "$8.50",
        priceMin: 8.5,
        remarks: "Compact 5-piece design. Lightweight carbon. Ideal for travel and backpack fishing.",
      },
      {
        sku: "DA03-2",
        dimensions: "2.1-3.0m",
        weight: "0.55kg",
        type: "Telescopic",
        price: "$12.00",
        priceMin: 12,
        remarks: "6-piece travel rod. Spinning compatible. Bag included. High volume wholesale.",
      },
    ],
  },
];
