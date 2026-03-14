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

/** 标题最大长度 */
const TITLE_MAX_LEN = 90;

function truncateTitle(s: string): string {
  const t = s.trim();
  if (t.length <= TITLE_MAX_LEN) return t;
  return t.slice(0, TITLE_MAX_LEN).trimEnd() + "…";
}

/** 解析自 SKU内容.csv */
export const SKU_ROWS: SkuRow[] = [
  { parentSku: "TSG01", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "1.8M-Silvery Carbon Fiber Lure Fishing Rod-M Tuning, Medium-Fast Speed-Used for Freshwater and Saltwater" },
  { parentSku: "TSG02", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "1.8 Spinning Lure Rod, Travel Carbon Fiber Fishing Rod, Casting Weight 5-30g, M-type Quick-Act Ultralight Lure Trout Rod" },
  { parentSku: "TSG03", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "180cm Carbon Fiber Fishing Rod - EVA Grip, Ceramic Guide Ring - Ultralight Comfortable and Durable - Freshwater and Marine Dual Use - Suitable for Bait and Casting Techniques (Without Reel)" },
  { parentSku: "TSG04", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Carbon Lure Rod with Wooden Handle - 180cm/70.86inch - Lightweight M-tuned Two-section Rod - Universal for All Waters" },
  { parentSku: "TSG05", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "1PCS-180cm/70.86inch White Fishing Rod (Single Fishing Rod)-Durable Fiberglass, Comfortable To Touch-A Must-have for Anglers" },
  { parentSku: "TSG06", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 100, title: "1-PCS - 180cm/70.86-inch - Lure Rod - Long Distance Casting M Adjustment Two-Section Rod - Single Rod" },
  { parentSku: "TSG07", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "1PCS-180cm/70.86inch Fishing Rod-six-layer Fiberglass Durable-two-section Portable-common for Seawater and Freshwater-suitable for Fishing Enthusiasts and Hunting" },
  { parentSku: "TSG08", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "1PCS-180cm/70.86inch Fishing Rod-six-layer Fiberglass Durable-two-section Portable-common for Seawater and Freshwater-suitable for Fishing Enthusiasts and Hunting" },
  { parentSku: "TSG09", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "180cm/70.86inch Green Casting Rod - Durable Carbon Fiber Material - Suitable for Multiple Water Areas - Comfortable EVA Grip - Anti-Tangle Ceramic Guides - A Perfect Gift for Outdoor Fishing Beginners" },
  { parentSku: "TSG10", subSku: "无", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Black and Gold Carbon Fiber Fishing Rod - Medium-fast Speed, Medium-light Feel, Castable - Comes with EVA Comfort Grip and ABS Durable Reel Seat - Suitable for Travel and Freshwater Fishing, Especially for Black Bass and Carp." },
  { parentSku: "TSG11", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "180cm/70.86inch - Black Fishing Rod Set - Rod and Reel - High-Quality Carbon Fiber - Comfortable Imitation Wood Handle - Aluminum Alloy Reel - Long Casting - Suitable for Freshwater and Saltwater Use - A Great Choice for Fishing Enthusiasts" },
  { parentSku: "TSG12", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "1PCS-180cm/70.86inch-Durable Spinning Fishing Rod-Medium Power, Moderate Action-Comfortable Feel, Sensitive Response-Suitable for Freshwater and Saltwater Fishing" },
  { parentSku: "TSG13", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Extra-long 180cm/70.86-inch lightweight fishing rod - Medium-speed two-stage telescopic design, portable rigid fiberglass construction, suitable for both saltwater and freshwater" },
  { parentSku: "TSG14", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "1 rod - 180cm/70.86inch - Carbon fiber lure rod - Carbon fiber shaft - Versatile for various water conditions - Suitable for outdoor fishing" },
  { parentSku: "TSG15", subSku: "无", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "1.65 Spinning Lure Rod, Travel Carbon Fiber Fishing Rod, Casting Weight 5-30g, M-type Quick-Act Ultralight Lure Trout Rod" },
  { parentSku: "TSG16", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "Colored Carbon Fiber Fishing Rod-180cm/70.86inch-different Colors At Different Angles-six-layer Carbon Cloth Wrap-EVA Comfortable Grip-medium-fast Speed-for Both Fresh and Salt Water" },
  { parentSku: "TSG17", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "High-content Carbon Fiber Lure Rod-180cm/70.86inch-castable-two-stage Plug-in Design for Easy Storage-comfortable EVA Grip-outdoor Fishing Rod" },
  { parentSku: "TSG18", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "ML Tone Lure Rod - 180cm/70.86inch - Premium Red - Competition Reel - Ceramic Guide Ring - Equipped with Lure Hooker - Wear-resistant and Scratch-resistant - for Catching Blackfish and Bass" },
  { parentSku: "TSG19", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "UL Tone Carbon Fiber Fishing Rod - Solid Tube, Super Soft Casting Rod - Comfortable Imitation Wood Grip - High-end Color Matching - White Stripe and Cockroach - Excellent Choice for Fishing Enthusiasts" },
  { parentSku: "TSG20", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 100, title: "180cm/70.86inch-Beginner fishing rod-Modern camouflage design-Ceramic guide ring, smooth line-Lightweight feel, quick response, easy fishing experience-Great gift for novice fishermen" },
  { parentSku: "TSG21", subSku: "无", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 100, title: "180cm/70.86inch-Beginner fishing rod-Modern camouflage design-Ceramic guide ring, smooth line-Lightweight feel, quick response, easy fishing experience-Great gift for novice fishermen" },
  { parentSku: "TSG22", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "180cm/70.86inch-Green Carbon Fiber Fishing Rod-Lightweight Design, Strong Pulling Force-Medium-fast Speed-Segmented Comfortable Grip-Useful in Multiple Waters-Suitable for Outdoor Fishing Enthusiasts" },
  { parentSku: "TSG23", subSku: "TSG23A", type: "Casting", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Black Carbon Fiber Fishing Rod - M Tone Long Casting Rod - Comfortable Grip, Smooth Large Guide, Sensitive Tip, Modern Stripe Design - for Fresh and Salt Water - Bass and Trout - Perfect Gift for Fishing Lovers" },
  { parentSku: "TSG23", subSku: "TSG23B", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG23", subSku: "TSG23C", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG23", subSku: "TSG23D", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG23", subSku: "TSG23E", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG23", subSku: "TSG23F", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG24", subSku: "TSG24A", type: "Casting", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Carbon Fiber White Fishing Rod - High Power -, Multiple Sizes, Casting and Spinning Options - Comfortable EVA Grip, Sensitive Rod Tip, Fast Fish Retrieval - Suitable for Outdoor Fishing" },
  { parentSku: "TSG24", subSku: "TSG24B", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG24", subSku: "TSG24C", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG24", subSku: "TSG24D", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG24", subSku: "TSG24E", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG24", subSku: "TSG24F", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG25", subSku: "TSG25A", type: "Casting", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "M Tone Carbon Fiber Lure Rod - Casting/Spinning - Sensitive Tip - Ceramic Guides - One-Piece Comfort Grip - Medium-Lightweight - Suitable for All Waters - Perfect Holiday Gift for Fishing Enthusiasts" },
  { parentSku: "TSG25", subSku: "TSG25B", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG25", subSku: "TSG25C", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG25", subSku: "TSG25D", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG25", subSku: "TSG25E", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG25", subSku: "TSG25F", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG26", subSku: "TSG26A", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.52*1.97*1.97", weightG: 200, title: "Carbon Fiber Long Casting Rod - Casting/Spinning - 82.67 Inches/89.76 Inches/94.48 Inches - Oversized Guide Ring, Rubber Grip, Stylish Paint - Suitable for Freshwater and Saltwater Use - The Perfect Gift for Outdoor Fishing Enthusiasts" },
  { parentSku: "TSG26", subSku: "TSG26B", type: "Casting", lengthInch: 89.76, collapsedDimensions: "46.46*1.97*1.97", weightG: 200, title: "" },
  { parentSku: "TSG26", subSku: "TSG26C", type: "Casting", lengthInch: 94.49, collapsedDimensions: "49.21*1.97*1.97", weightG: 200, title: "" },
  { parentSku: "TSG26", subSku: "TSG26D", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.52*1.97*1.97", weightG: 200, title: "" },
  { parentSku: "TSG26", subSku: "TSG26E", type: "Spinning", lengthInch: 89.76, collapsedDimensions: "46.46*1.97*1.97", weightG: 200, title: "" },
  { parentSku: "TSG26", subSku: "TSG26F", type: "Spinning", lengthInch: 94.49, collapsedDimensions: "49.21*1.97*1.97", weightG: 200, title: "" },
  { parentSku: "TSG27", subSku: "TSG27A", type: "Casting", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Silver-black Carbon Fiber Fishing Rod - 33.46/37.40/43.31 Inches - Casting/Spinning - Ceramic Guide Rings for Smooth Line Routing - Integrated Grip for A Comfortable Feel - Suitable for All-water Fishing - Suitable for Outdoor Fishing" },
  { parentSku: "TSG27", subSku: "TSG27B", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG27", subSku: "TSG27C", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG27", subSku: "TSG27D", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG27", subSku: "TSG27E", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG27", subSku: "TSG27F", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG28", subSku: "TSG28A", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Ultra-light, high-quality carbon fiber lure rod, two-section design bait casting rod, wooden handle comfortable grip, black and gold contrasting design, ergonomic, suitable for bass and pike, universal in various waters" },
  { parentSku: "TSG28", subSku: "TSG28B", type: "Casting", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG28", subSku: "TSG28C", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG28", subSku: "TSG28D", type: "Casting", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG28", subSku: "TSG28E", type: "Spinning", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG28", subSku: "TSG28F", type: "Casting", lengthInch: 82.68, collapsedDimensions: "42.13*1.18*1.18", weightG: 200, title: "" },
  { parentSku: "TSG29", subSku: "TSG29A", type: "Casting", lengthInch: 70.86, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "Carbon Fiber Lure Rod - Blue/orange - Cast/spun - Stylish Paint Finish - Anti-tangle Guides - Comfortable EVA Grip - Two-section Design - Suitable for All Waters - Good for Catching Bass and Sturgeon - A Perfect Gift for Outdoor Fishing Enthusiasts." },
  { parentSku: "TSG29", subSku: "TSG29B", type: "Casting", lengthInch: 82.68, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG29C", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG29D", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG30", type: "Casting", lengthInch: 70.86, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG30B", type: "Casting", lengthInch: 82.68, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG30C", type: "Spinning", lengthInch: 34.65, collapsedDimensions: "34.65*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "TSG29", subSku: "TSG30D", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "37.40*1.18*1.18", weightG: 150, title: "" },
  { parentSku: "SSG01", subSku: "无", type: "Spinning", lengthInch: 94.49, collapsedDimensions: "49.21*1.97*1.97", weightG: 150, title: "1PC 2.4-meter Telescopic Fishing Rod - Sea Pole Long Throw Rod Throwing Rod - Fiberglass Material Durable, Suitable for Both Seawater and Freshwater Fishing" },
  { parentSku: "DJG01", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "20.08*1.18*1.18", weightG: 150, title: "180cm/70.86inch-High Quality M-tuned Lure Rod-Four-section Mini Design, Easy To Carry, Suitable for Long-distance Casting, and Can Be Used in Many Waters" },
  { parentSku: "DGL", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "20.08*1.18*1.18", weightG: 150, title: "Lure Rod 1.8 Meters Sea Fishing Rod Spinning Reel Set Essential for Beginners and Professionals" },
  { parentSku: "YGT01", subSku: "无", type: "Spinning", lengthInch: 70.86, collapsedDimensions: "20.08*1.18*1.18", weightG: 150, title: "Sea Rod Set 55 Pieces Set Telescopic Lure Portable Set Novice Combination Soft Bait Carp Fishing" },
];

function getProductTitle(rows: SkuRow[], parentSku: string): string {
  const firstWithTitle = rows.find((r) => r.parentSku === parentSku && r.title);
  return firstWithTitle ? truncateTitle(firstWithTitle.title) : `${parentSku} Rod`;
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
