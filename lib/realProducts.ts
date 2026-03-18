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
  /** 手柄样式：如 Straight / Trigger */
  handleStyle?: string;
  /** 左右手：Left / Right / Ambidextrous */
  handOrientation?: string;
  /** 伸展长度（cm） */
  extendedLengthCm?: number;
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

/** 列表页无价格时按 fishingStyle 使用 $1-10 区间（B2B 参考价） */
const DEFAULT_LIST_PRICE_BY_STYLE: Record<string, string> = {
  Travel: "$1.00 - $10.00",
  Surf: "$1.00 - $10.00",
  Casting: "$1.00 - $10.00",
  Spinning: "$1.00 - $10.00",
  Telescopic: "$1.00 - $10.00",
  Ice: "$1.00 - $10.00",
};

/** 从价格区间解析最小数值用于筛选 */
function parsePriceMinFromRange(s: string): number {
  const m = s.match(/\$?([\d.]+)/);
  return m ? parseFloat(m[1]) : 1;
}

/** 全站统一价格源：产品 ID → 展示价。CSV 中 displayPrice 列会合并进来，支持批量上新 */
const PRODUCT_DISPLAY_PRICES: Record<string, string> = (() => {
  const fallback: Record<string, string> = {
    TSG01: "$9.50/pc", TSG02: "$9.20/pc", TSG03: "$9.80/pc", TSG04: "$9.00/pc",
    TSG05: "$9.50/pc", TSG06: "$9.90/pc", TSG07: "$7.80/pc", TSG08: "$9.50/pc",
  };
  try {
    const { loadProductsCsv } = require("./loadProductsCsv");
    const csv = loadProductsCsv();
    return { ...fallback, ...(csv?.displayPrices ?? {}) };
  } catch {
    return fallback;
  }
})();

/** 详情页/列表页展示用价格：有有效价格则用，否则按 productId→fishingStyle 使用 1–10 美元随机区间 */
export function getDisplayPrice(
  price: string | undefined,
  fishingStyle?: string,
  productId?: string
): string {
  if (price && !/^(Inquiry|詢價|询价)$/i.test(String(price).trim())) return price;
  if (productId && PRODUCT_DISPLAY_PRICES[productId]) return PRODUCT_DISPLAY_PRICES[productId];
  const id = productId || fishingStyle || "default";
  return getRandomDisplayPriceForId(id).text;
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
    priceStr = PRODUCT_DISPLAY_PRICES[p.id] ?? DEFAULT_LIST_PRICE_BY_STYLE[p.fishingStyle] ?? "$1.00 - $10.00";
  }

  const priceMinForFilter = minPrice > 0 ? minPrice : parsePriceMinFromRange(priceStr);

  // 使用统一的 1–10 美元随机区间展示价格，对同一产品保持一致（显式指定价格优先）
  const randomPrice = getRandomDisplayPriceForId(p.id);
  const override = PRODUCT_DISPLAY_PRICES[p.id];
  const finalPriceStr = override ?? randomPrice.text;
  const finalPriceMin = override ? parsePriceMinFromRange(override) : randomPrice.min;

  return {
    id: p.id,
    name: p.name,
    price: finalPriceStr,
    priceMin: finalPriceMin,
    moq: p.moq,
    image: imgs[0] ?? "",
    images: imgs,
    fishingStyle: p.fishingStyle,
    length: p.variants[0]?.dimensions,
    material: inferMaterialFromTitle(p.name),
    power: inferPowerFromTitle(p.name),
  };
}

/**
 * 从标题推断材质。上新标题规范：Carbon Fiber、Fiberglass、Composite、Bamboo、Graphite
 * 例：1.8M-Silvery Carbon Fiber Lure Fishing Rod-...
 */
export function inferMaterialFromTitle(title: string): string {
  const t = (title ?? "").toLowerCase();
  if (/\b(carbon\s*fib(er|re)|碳素|碳纤维|碳纤)\b/i.test(t)) return "Carbon Fiber";
  if (/\b(fiberglass|fibreglass|玻纤|玻璃纤维|玻璃钢)\b/i.test(t)) return "Fiberglass";
  if (/\b(graphite|石墨)\b/i.test(t)) return "Graphite";
  if (/\b(composite|混合|复合)\b/i.test(t)) return "Composite";
  if (/\b(bamboo|竹)\b/i.test(t)) return "Bamboo";
  if (/\b(im[6789]|im\s*[6789])\b/i.test(t)) return "Carbon Fiber";
  return "Carbon Fiber"; // 渔竿默认碳素
}

/**
 * 从标题推断力度 Power。上新标题规范：UL/L/ML/M/MH/H/XH，无则默认 Medium。
 * 注意：M Tuning、Medium-Fast 等为 Action(调性)，非 Power，不得误匹配。
 */
export function inferPowerFromTitle(title: string): string {
  const t = (title ?? "").toLowerCase();
  if (/\b(ultralight|ultra[\s-]?light|ul\b|超轻)\b/i.test(t)) return "Ultralight";
  if (/\b(medium[- ]?light|ml\b|中轻)\b/i.test(t)) return "Medium-Light";
  if (/\b(medium[- ]?heavy|mh\b|中硬|中重)\b/i.test(t)) return "Medium-Heavy";
  if (/\b(extra[\s-]?heavy|xh\b|超硬)\b/i.test(t)) return "Extra Heavy";
  if (/\b(heavy|h\b)(?!\s*[-]?duty)/i.test(t) && !/medium[- ]?heavy|mh\b/i.test(t)) return "Heavy";
  if (/\b(light|l\b)(?!\s*ultra)/i.test(t) && !/\bultralight\b/i.test(t)) return "Light";
  // M/Medium 仅当非 Action 术语时匹配：M Tuning、Medium-Fast 等为调性
  if (/\bmedium(?!\s*[-]?(?:fast|moderate|slow))/i.test(t)) return "Medium";
  if (/\bm(?!\s*tun(?:ing|ed))/i.test(t) && !/medium/i.test(t)) return "Medium";
  return "Medium"; // 标题中无 Power 时默认
}

/** 推断产品类型：TSG→Travel, SSG→Surf, DGL/DJG→Casting, 其余→Spinning */
function inferFishingStyle(sku: string): string {
  if (sku.startsWith("TSG")) return "Travel";
  if (sku.startsWith("SSG")) return "Surf";
  if (sku.startsWith("DGL") || sku.startsWith("DJG")) return "Casting";
  return "Spinning";
}

/** 根据 SKU 生成默认图片列表。
 * 兼容两种常见命名：
 * 1) products/{SKU}/1.jpg
 * 2) products/{SKU}/{SKU}-1.jpg
 */
function defaultImageFiles(sku: string, count = 6): string[] {
  // 你上传的 R2 图片常见格式为 {SKU}/{SKU}-2.jpg（先 SKU- 前缀），因此优先尝试该模式
  const withSku = Array.from({ length: count }, (_, i) => `${sku}-${i + 1}.jpg`);
  const numeric = Array.from({ length: Math.min(3, count) }, (_, i) => `${i + 1}.jpg`);
  return [...withSku, ...numeric];
}

import { buildProductsFromSkuRows } from "./skuData";
import { getRandomDisplayPriceForId } from "./priceDisplay";

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
    handleStyle: r.handleStyle || undefined,
    handOrientation: r.handOrientation || undefined,
    extendedLengthCm: r.extendedLengthCm || undefined,
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

// 首页用的真实产品展示列表（已转成通用 Product 结构）
const REAL_DISPLAY_FOR_HOME = REAL_PRODUCTS.map(realProductToDisplayProduct);

// 简单调试日志：用于线上确认真实产品数量及首页分配情况（仅在 Node 环境下输出一次）
if (typeof console !== "undefined") {
  // eslint-disable-next-line no-console
  console.log(
    "[RodsHub realProducts] counts",
    JSON.stringify(
      {
        REAL_PRODUCTS: REAL_PRODUCTS.length,
        REAL_DISPLAY_FOR_HOME: REAL_DISPLAY_FOR_HOME.length,
      },
      null,
      2
    )
  );
}

/** 首页 New Arrivals 优先使用真实产品：取前 4 条，不足时由调用方用模拟数据补足 */
export const HOME_REAL_NEW_ARRIVALS = REAL_DISPLAY_FOR_HOME.slice(0, 4);

/** 首页 Featured Rods 优先使用真实产品：使用第 5–8 条，不足时由调用方用生成产品补足 */
export const HOME_REAL_FEATURED = REAL_DISPLAY_FOR_HOME.slice(4, 8);
