/**
 * SKU 数据源：从 data/products.csv 解析（支持批量上新），CSV 不可用时回退硬编码
 * 字段：parentSku, subSku, type, lengthInch, collapsedDimensions, weightG, title, shortTitle, displayPrice
 */

import { loadProductsCsv } from "./loadProductsCsv";
import { FALLBACK_SKU_ROWS, FALLBACK_SHORT_TITLES } from "./skuDataFallback";

export interface SkuRow {
  parentSku: string;
  subSku: string;
  type: string;
  lengthInch: number;
  collapsedDimensions: string;
  weightG: number;
  title: string;
  handleStyle?: string;
  handOrientation?: string;
  extendedLengthCm?: number;
}

/** 标题最大长度（详情页展示） */
const TITLE_MAX_LEN = 50;

/** 去掉 1PC/180cm/70.86inch 等尺寸描述，提升 B2B 文案质感 */
function sanitizeTitle(s: string): string {
  return s
    .replace(/\b1PCS?-?\s*/gi, "")
    .replace(/\b1-PCS\s*-?\s*/gi, "")
    .replace(/\b1PC\s*/gi, "")
    .replace(/\b1\s*rod\s*-?\s*/gi, "")
    .replace(/\d+\.?\d*\s*(m|M|meter|metre)s?\s*-?/gi, "")
    .replace(/\d+\.?\d*\s*(cm|inch|inches?)(\/\d+\.?\d*(cm|inch|es?))?\s*-?/gi, "")
    .replace(/\d+\.?\d*\s*-\s*/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s*-\s*$/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s*[-–—,.]+\s*/g, "")
    .trim();
}

function truncateTitle(s: string): string {
  const t = sanitizeTitle(s);
  if (t.length <= TITLE_MAX_LEN) return t;
  return t.slice(0, TITLE_MAX_LEN).trimEnd() + "…";
}

function getProductTitle(
  rows: SkuRow[],
  parentSku: string,
  shortTitles: Record<string, string>
): string {
  const short = shortTitles[parentSku];
  if (short) return short;
  const firstWithTitle = rows.find((r) => r.parentSku === parentSku && r.title);
  return firstWithTitle ? truncateTitle(firstWithTitle.title) : `${parentSku} Rod`;
}

/** 从 CSV 或回退数据加载 SKU 行 */
function getSkuRows(): {
  rows: SkuRow[];
  shortTitles: Record<string, string>;
  displayPrices: Record<string, string>;
} {
  const csv = loadProductsCsv();
  if (csv?.rows?.length) {
    return {
      rows: csv.rows as SkuRow[],
      shortTitles: csv.shortTitles,
      displayPrices: csv.displayPrices,
    };
  }
  return {
    rows: FALLBACK_SKU_ROWS as SkuRow[],
    shortTitles: FALLBACK_SHORT_TITLES,
    displayPrices: {},
  };
}

const { rows: SKU_ROWS, shortTitles: CSV_SHORT_TITLES, displayPrices: CSV_DISPLAY_PRICES } = getSkuRows();

/** 供 realProducts 使用的展示价映射（CSV 优先） */
export function getDisplayPricesFromCsv(): Record<string, string> {
  return CSV_DISPLAY_PRICES;
}

/** 返回产品的原始完整标题（用于提取 Key Features） */
export function getOriginalProductTitle(parentSku: string): string {
  const row = SKU_ROWS.find((r) => r.parentSku === parentSku && r.title?.trim());
  return row?.title?.trim() ?? "";
}

export function buildProductsFromSkuRows(): Array<{ parentSku: string; title: string; rows: SkuRow[] }> {
  const byParent = new Map<string, SkuRow[]>();
  for (const r of SKU_ROWS) {
    const list = byParent.get(r.parentSku) ?? [];
    list.push(r);
    byParent.set(r.parentSku, list);
  }
  return Array.from(byParent.entries()).map(([parentSku, rows]) => ({
    parentSku,
    title: getProductTitle(SKU_ROWS, parentSku, CSV_SHORT_TITLES),
    rows,
  }));
}
