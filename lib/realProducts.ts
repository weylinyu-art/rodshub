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

/** R2 图片根域名，可通过 NEXT_PUBLIC_R2_IMAGE_BASE 覆盖 */
const R2_BASE = process.env.NEXT_PUBLIC_R2_IMAGE_BASE ?? "https://images.rodshub.com";

function buildImageUrls(folder: string, files: string[]): string[] {
  return files.map((f) => `${R2_BASE}/products/${folder}/${f}`);
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

/** 推断产品类型：TSG→Travel, SSG→Surf, DGL/DJG→Casting, 其余→Spinning */
function inferFishingStyle(sku: string): string {
  if (sku.startsWith("TSG")) return "Travel";
  if (sku.startsWith("SSG")) return "Surf";
  if (sku.startsWith("DGL") || sku.startsWith("DJG")) return "Casting";
  return "Spinning";
}

/** 根据 SKU 生成默认图片列表，与 R2 路径一致：products/{SKU}/{SKU}-1.jpg */
function defaultImageFiles(sku: string, count = 6): string[] {
  return Array.from({ length: count }, (_, i) => `${sku}-${i + 1}.jpg`);
}

import { buildProductsFromSkuRows } from "./skuData";

/** 首页 Featured 首行展示价：$X.XX/pc 格式，与第二行 wholesale 样式一致 */
export const HOME_FEATURED_PRICES: Record<string, string> = {
  TSG01: "$14.50/pc",
  TSG02: "$13.99/pc",
  TSG03: "$15.00/pc",
  TSG04: "$14.00/pc",
  TSG05: "$11.50/pc",
  TSG06: "$12.99/pc",
  TSG07: "$9.80/pc",
  TSG08: "$10.50/pc",
};

/** 首页图片筛选：首图含文字时改用备用图（索引），避免展示带文字的图 */
export const HOME_IMAGE_INDEX_OVERRIDE: Record<string, number> = {
  TSG02: 1, // 首图为参数图含 L/UL 文字，用第二张
};

/** 从 skuData 构建 RealProduct，标题替换为 CSV 标题，有子 SKU 时以伸展长作为 variant 维度 */
export const REAL_PRODUCTS: RealProduct[] = buildProductsFromSkuRows().map(({ parentSku, title, rows }) => {
  const style = inferFishingStyle(parentSku);
  const variants: ProductVariant[] = rows.map((r) => ({
    sku: r.subSku === "无" ? parentSku : r.subSku,
    dimensions: `${r.lengthInch}"`,
    weight: `${r.weightG}g`,
    type: r.type,
    detailDimensions: r.collapsedDimensions,
    price: "Inquiry",
    priceMin: 0,
    remarks: "Please contact for specifications.",
  }));
  return {
    id: parentSku,
    name: title,
    imageFolder: parentSku,
    imageFiles: defaultImageFiles(parentSku),
    fishingStyle: style,
    variants,
  };
});
