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

/** 列表页无价格时按 fishingStyle 使用 $8-18 区间（B2B 参考价） */
const DEFAULT_LIST_PRICE_BY_STYLE: Record<string, string> = {
  Travel: "$10.00 - $15.00",
  Surf: "$12.00 - $18.00",
  Casting: "$9.00 - $14.00",
  Spinning: "$8.00 - $14.00",
  Telescopic: "$9.00 - $14.00",
  Ice: "$8.00 - $12.00",
};

/** 从价格区间解析最小数值用于筛选 */
function parsePriceMinFromRange(s: string): number {
  const m = s.match(/\$?([\d.]+)/);
  return m ? parseFloat(m[1]) : 8;
}

/** 全站统一价格源：产品 ID → 展示价，与 DEFAULT_LIST_PRICE_BY_STYLE 一起保证同一产品在各处展示一致 */
const PRODUCT_DISPLAY_PRICES: Record<string, string> = {
  TSG01: "$14.50/pc",
  TSG02: "$13.99/pc",
  TSG03: "$15.00/pc",
  TSG04: "$14.00/pc",
  TSG05: "$11.50/pc",
  TSG06: "$12.99/pc",
  TSG07: "$9.80/pc",
  TSG08: "$10.50/pc",
};

/** 详情页/列表页展示用价格：有有效价格则用，否则按 productId→fishingStyle 顺序取统一价 */
export function getDisplayPrice(
  price: string | undefined,
  fishingStyle?: string,
  productId?: string
): string {
  if (price && !/^(Inquiry|詢價|询价)$/i.test(String(price).trim())) return price;
  if (productId && PRODUCT_DISPLAY_PRICES[productId]) return PRODUCT_DISPLAY_PRICES[productId];
  return DEFAULT_LIST_PRICE_BY_STYLE[fishingStyle ?? ""] ?? "$8.00 - $18.00";
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
  let priceStr =
    minPrice && maxPrice && minPrice !== maxPrice
      ? `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
      : p.variants[0]?.price ?? `$${minPrice.toFixed(2)}`;

  if (!priceStr || /^(Inquiry|詢價|询价)$/i.test(String(priceStr).trim())) {
    priceStr = PRODUCT_DISPLAY_PRICES[p.id] ?? DEFAULT_LIST_PRICE_BY_STYLE[p.fishingStyle] ?? "$8.00 - $18.00";
  }

  const priceMinForFilter = minPrice > 0 ? minPrice : parsePriceMinFromRange(priceStr);

  return {
    id: p.id,
    name: p.name,
    price: priceStr,
    priceMin: priceMinForFilter,
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

/** @deprecated 已合并入 PRODUCT_DISPLAY_PRICES，保留以兼容旧引用 */
export const HOME_FEATURED_PRICES = PRODUCT_DISPLAY_PRICES;

/** 首页/列表页图片筛选：首图为参数图（无产品图、以文字为主）时改用备用图索引，避免轮播到首页 */
export const HOME_IMAGE_INDEX_OVERRIDE: Record<string, number> = {
  TSG02: 1, // 首图为参数图含 L/UL 文字，用第二张
};

/** 对产品应用首图覆盖：列表/首页展示时优先使用非参数图 */
export function applyListImageOverride<T extends { id: string; image?: string; images?: string[] }>(
  rod: T
): T {
  const imgIdx = HOME_IMAGE_INDEX_OVERRIDE[rod.id];
  if (imgIdx == null || !rod.images?.length || rod.images.length <= imgIdx) return rod;
  const preferred = rod.images[imgIdx];
  return {
    ...rod,
    image: preferred,
    images: [preferred, ...rod.images.filter((_, i) => i !== imgIdx)],
  };
}

/** 详情页排除图片索引（0-based）：含尺寸/参数文字的图及重复图不展示 */
export const DETAIL_PAGE_EXCLUDED_IMAGE_INDICES: Record<string, number[]> = {
  TSG01: [0, 4, 5], // 首图及第 5、6 张含 180cm/70.86inch、M Tonality 等尺寸信息
  TSG14: [0, 4, 5], // 首图及第 5、6 张含 Contraction/Stretched Length 等尺寸信息
};

/** 详情页仅展示首图：R2 内多张图实为同一张（占位/重复）时只显示 1 张，不展示轮播 */
export const DETAIL_ONLY_FIRST_IMAGE: Record<string, boolean> = {
  TSG08: true, // R2 内 6 张图内容相同
};

/** 过滤详情页图片：排除含尺寸信息的图、重复图；当仅首图有效时只保留 1 张 */
export function filterDetailPageImages(productId: string, images: string[]): string[] {
  if (!images?.length) return images ?? [];
  if (DETAIL_ONLY_FIRST_IMAGE[productId]) {
    return [images[0]];
  }
  const excluded = DETAIL_PAGE_EXCLUDED_IMAGE_INDICES[productId];
  const filtered = excluded?.length
    ? images.filter((_, i) => !excluded.includes(i))
    : images;
  const deduped = Array.from(new Set(filtered));
  return deduped.length > 0 ? deduped : [images[0]];
}

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
