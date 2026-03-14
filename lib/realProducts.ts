/**
 * 真实产品数据：与 R2 对象一一对应
 * 图片来自 R2: https://images.rodshub.com
 */

export interface ProductVariant {
  /** SKU */
  sku: string;
  /** 尺寸 */
  dimensions: string;
  /** 重量 */
  weight: string;
  /** 类型：Spinning / Casting / Telescopic */
  type: string;
  /** 详细尺寸 */
  detailDimensions?: string;
  /** 包装尺寸 */
  packageDimensions?: string;
  /** 价格 */
  price: string;
  /** 型号描述/备注 */
  remarks: string;
  /** 用于排序和筛选的数值 */
  priceMin?: number;
}

export interface RealProduct {
  /** 产品族 ID，与 R2 文件夹名一致 */
  id: string;
  /** 产品标题 */
  name: string;
  /** R2 图片目录，与 R2 对象路径一致 */
  imageFolder: string;
  /** 图片文件名列表，需与 R2 文件夹内文件名一致 */
  imageFiles: string[];
  /** 分类：Spinning / Casting / Telescopic / Surf / Ice / Travel */
  fishingStyle: string;
  moq?: string;
  variants: ProductVariant[];
}

const R2_BASE = "https://images.rodshub.com";

function buildImageUrls(folder: string, files: string[]): string[] {
  return files.map((f) => `${R2_BASE}/${folder}/${f}`);
}

/** 将 RealProduct 转成列表展示用的 Product */
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

/** 生成占位 variant（单型号产品） */
function singleVariant(sku: string, style: string): ProductVariant[] {
  return [
    {
      sku,
      dimensions: "—",
      weight: "—",
      type: style,
      price: "Inquiry",
      priceMin: 0,
      remarks: "Please contact for specifications.",
    },
  ];
}

/** 推断产品类型：TSG→Travel, SSG→Surf, 其余→Spinning */
function inferFishingStyle(sku: string): string {
  if (sku.startsWith("TSG")) return "Travel";
  if (sku.startsWith("SSG")) return "Surf";
  if (sku.startsWith("DGL") || sku.startsWith("DJG")) return "Casting";
  return "Spinning";
}

/** 根据 SKU 生成默认图片列表。R2 常见命名：1.jpg,2.jpg 或 SKU-1.jpg，请按实际文件名调整 */
function defaultImageFiles(sku: string, count = 6): string[] {
  return Array.from({ length: count }, (_, i) => `${i + 1}.jpg`);
}

/** 真实产品 - 与 R2 对象一一对应，imageFolder 对应 R2 文件夹名 */
const SKU_LIST = [
  "BDG01",
  "BDG09",
  "DGL01",
  "DJG01",
  "SSG01",
  "TSG01",
  "TSG02",
  "TSG03",
  "TSG04",
  "TSG05",
  "TSG06",
  "TSG07",
  "TSG09",
  "TSG10",
  "TSG11",
  "TSG12",
  "TSG13",
  "TSG14",
  "TSG16",
  "TSG17",
  "TSG18",
  "TSG19",
  "TSG20",
  "TSG22",
];

export const REAL_PRODUCTS: RealProduct[] = SKU_LIST.map((sku) => {
  const style = inferFishingStyle(sku);
  return {
    id: sku,
    name: `${sku} Rod`,
    imageFolder: sku,
    imageFiles: defaultImageFiles(sku),
    fishingStyle: style,
    variants: singleVariant(sku, style),
  };
});
