/**
 * SKU 数据源：从 CSV 解析的产品信息
 * 字段：父SKU, 子SKU(无/按伸展长), 子SKU(实际), 类型, 伸展长inch, 收缩尺寸, 重量g, 标题
 */

export interface SkuRow {
  parentSku: string;
  subSku: string;
  type: string;
  lengthInch: number;
  collapsedDimensions: string;
  weightG: number;
  title: string;
}

/** 标题最大长度（详情页展示） */
const TITLE_MAX_LEN = 50;

/** 产品短标题：精简提炼，保证完全可见（≤35 字符） */
const SHORT_TITLES: Record<string, string> = {
  TSG01: "Silvery Carbon Travel Rod",
  TSG02: "Travel Carbon Spinning Rod",
  TSG03: "Carbon Casting Rod",
  TSG04: "Carbon Lure Rod Wood Handle",
  TSG05: "White Fiberglass Casting Rod",
  TSG06: "Travel Lure Rod",
  TSG07: "Fiberglass Spinning Rod",
  TSG08: "Fiberglass Casting Rod",
  TSG09: "Green Carbon Casting Rod",
  TSG10: "Black & Gold Carbon Rod",
  TSG11: "Carbon Rod & Reel Set",
  TSG12: "Durable Spinning Rod",
  TSG13: "Telescopic Fiberglass Rod",
  TSG14: "Carbon Fiber Lure Rod",
  TSG15: "Travel Carbon Spinning Rod",
  TSG16: "Colored Carbon Fiber Rod",
  TSG17: "High-Carbon Lure Rod",
  TSG18: "Red ML Tone Lure Rod",
  TSG19: "UL Tone Carbon Casting Rod",
  TSG20: "Camo Casting Rod",
  TSG21: "Camo Casting Rod",
  TSG22: "Green Carbon Fiber Rod",
  TSG23: "Black M-Tone Casting Rod",
  TSG24: "White Carbon Rod C&S",
  TSG25: "M Tone Carbon Lure Rod",
  TSG26: "Long Casting Carbon Rod",
  TSG27: "Silver-Black Carbon Rod",
  TSG28: "Ultra-Light Carbon Lure Rod",
  TSG29: "Blue/Orange Carbon Lure Rod",
  SSG01: "Telescopic Surf Rod",
  DJG01: "4-Section Mini Lure Rod",
  DGL: "Sea Rod & Reel Set",
  YGT01: "55-Pc Telescopic Lure Set",
};

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

function getProductTitle(rows: SkuRow[], parentSku: string): string {
  const short = SHORT_TITLES[parentSku];
  if (short) return short;
  const firstWithTitle = rows.find((r) => r.parentSku === parentSku && r.title);
  return firstWithTitle ? truncateTitle(firstWithTitle.title) : `${parentSku} Rod`;
}

/** 解析自 SKU内容.csv，标题已去除 1PC/180cm 等尺寸描述，优化为 B2B 专业文案 */
export const SKU_ROWS: SkuRow[] = [
  { parentSku: "TSG01", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Silvery Carbon Fiber Travel Lure Rod - M Tuning, Medium-Fast Action, Fresh & Saltwater" },
  { parentSku: "TSG02", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Travel Carbon Spinning Lure Rod - M-Type Quick Action, 5-30g Casting, Ultralight Trout" },
  { parentSku: "TSG03", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Carbon Fiber Casting Rod - EVA Grip, Ceramic Guides, Ultralight, Fresh & Saltwater" },
  { parentSku: "TSG04", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Carbon Lure Rod with Wooden Handle - M-Tuned Two-Section, All Waters" },
  { parentSku: "TSG05", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "White Fiberglass Casting Rod - Durable Build, Comfortable Grip" },
  { parentSku: "TSG06", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 100, title: "Travel Lure Rod - M Action Two-Section, Long Distance Casting" },
  { parentSku: "TSG07", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Six-Layer Fiberglass Spinning Rod - Two-Section Portable, Fresh & Saltwater" },
  { parentSku: "TSG08", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Six-Layer Fiberglass Casting Rod - Two-Section Portable, Fresh & Saltwater" },
  { parentSku: "TSG09", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Green Carbon Casting Rod - EVA Grip, Anti-Tangle Ceramic Guides, All Waters" },
  { parentSku: "TSG10", subSku: "无", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Black & Gold Carbon Fiber Rod - Medium-Fast, EVA Grip, Travel & Freshwater" },
  { parentSku: "TSG11", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Black Carbon Rod & Reel Set - Wood Handle, Aluminum Reel, Fresh & Saltwater" },
  { parentSku: "TSG12", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Durable Spinning Rod - Medium Power, Moderate Action, Sensitive, All Waters" },
  { parentSku: "TSG13", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Extra-Long Telescopic Rod - Medium Action, Rigid Fiberglass, Fresh & Saltwater" },
  { parentSku: "TSG14", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Carbon Fiber Lure Rod - Versatile, All Water Conditions" },
  { parentSku: "TSG15", subSku: "无", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Travel Carbon Spinning Lure Rod - M-Type Quick Action, 5-30g, Ultralight Trout" },
  { parentSku: "TSG16", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Colored Carbon Fiber Rod - Multi-Angle Shimmer, EVA Grip, Medium-Fast, All Waters" },
  { parentSku: "TSG17", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "High-Carbon Lure Rod - Two-Section Plug-in, EVA Grip, Compact Storage" },
  { parentSku: "TSG18", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "ML Tone Premium Red Lure Rod - Ceramic Guides, Lure Hooker, Bass & Blackfish" },
  { parentSku: "TSG19", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "UL Tone Carbon Casting Rod - Super Soft, Wood Grip, Premium Colorway" },
  { parentSku: "TSG20", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 100, title: "Camo Casting Rod - Ceramic Guides, Lightweight, Quick Response, Entry-Level" },
  { parentSku: "TSG21", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 100, title: "Camo Casting Rod - Ceramic Guides, Lightweight, Quick Response, Entry-Level" },
  { parentSku: "TSG22", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Green Carbon Fiber Rod - Lightweight, Strong, Medium-Fast, Segmented Grip, All Waters" },
  { parentSku: "TSG23", subSku: "TSG23A", type: "Casting", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Black Carbon M-Tone Casting Rod - Large Guide, Sensitive Tip, Fresh & Saltwater" },
  { parentSku: "TSG23", subSku: "TSG23B", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG23", subSku: "TSG23C", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG23", subSku: "TSG23D", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG23", subSku: "TSG23E", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG23", subSku: "TSG23F", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG24", subSku: "TSG24A", type: "Casting", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "White Carbon Fiber Rod - High Power - Casting & Spinning - EVA Grip" },
  { parentSku: "TSG24", subSku: "TSG24B", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG24", subSku: "TSG24C", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG24", subSku: "TSG24D", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG24", subSku: "TSG24E", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG24", subSku: "TSG24F", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG25", subSku: "TSG25A", type: "Casting", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "M Tone Carbon Fiber Lure Rod - Casting/Spinning - Ceramic Guides - Medium-Light" },
  { parentSku: "TSG25", subSku: "TSG25B", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG25", subSku: "TSG25C", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG25", subSku: "TSG25D", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG25", subSku: "TSG25E", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG25", subSku: "TSG25F", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG26", subSku: "TSG26A", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.52*1.97*1.97", weightG: 200, title: "Carbon Fiber Long Casting Rod - Oversized Guides, Rubber Grip - Multi-Size" },
  { parentSku: "TSG26", subSku: "TSG26B", type: "Casting", lengthInch: 89.76, collapsedDimensions: "46.46*1.97*1.97", weightG: 200, title: "" },
  { parentSku: "TSG26", subSku: "TSG26C", type: "Casting", lengthInch: 94.49, collapsedDimensions: "49.21*1.97*1.97", weightG: 200, title: "" },
  { parentSku: "TSG26", subSku: "TSG26D", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.52*1.97*1.97", weightG: 200, title: "" },
  { parentSku: "TSG26", subSku: "TSG26E", type: "Spinning", lengthInch: 89.76, collapsedDimensions: "46.46*1.97*1.97", weightG: 200, title: "" },
  { parentSku: "TSG26", subSku: "TSG26F", type: "Spinning", lengthInch: 94.49, collapsedDimensions: "49.21*1.97*1.97", weightG: 200, title: "" },
  { parentSku: "TSG27", subSku: "TSG27A", type: "Casting", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Silver-Black Carbon Fiber Rod - Casting/Spinning - Ceramic Guides, Integrated Grip" },
  { parentSku: "TSG27", subSku: "TSG27B", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG27", subSku: "TSG27C", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG27", subSku: "TSG27D", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG27", subSku: "TSG27E", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG27", subSku: "TSG27F", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG28", subSku: "TSG28A", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Ultra-Light Carbon Fiber Lure Rod - Two-Section, Wood Handle - Bass & Pike" },
  { parentSku: "TSG28", subSku: "TSG28B", type: "Casting", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG28", subSku: "TSG28C", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG28", subSku: "TSG28D", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG28", subSku: "TSG28E", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG28", subSku: "TSG28F", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG29", subSku: "TSG29A", type: "Casting", lengthInch: 70.86, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Carbon Fiber Lure Rod - Blue/Orange - Anti-Tangle Guides, EVA Grip - Bass & Sturgeon" },
  { parentSku: "TSG29", subSku: "TSG29B", type: "Casting", lengthInch: 82.68, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG29C", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG29D", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG30", type: "Casting", lengthInch: 70.86, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG30B", type: "Casting", lengthInch: 82.68, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG30C", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG30D", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "SSG01", subSku: "无", type: "Spinning", lengthInch: 94.49, collapsedDimensions: "49.21*1.97*1.97", weightG: 150, title: "Telescopic Surf Rod - Fiberglass - Long Throw - Seawater & Freshwater" },
  { parentSku: "DJG01", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "20.08*1.18*1.18", weightG: 150, title: "M-Tuned Four-Section Mini Lure Rod - Compact, Long-Distance Casting" },
  { parentSku: "DGL", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "20.08*1.18*1.18", weightG: 150, title: "Sea Fishing Rod Spinning Reel Set - Beginner to Pro" },
  { parentSku: "YGT01", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "20.08*1.18*1.18", weightG: 150, title: "55-Piece Telescopic Lure Portable Set - Soft Bait Carp Combo" },
];

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
    title: getProductTitle(SKU_ROWS, parentSku),
    rows,
  }));
}
