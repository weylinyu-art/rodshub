/**
 * CSV 不可用时的硬编码回退数据（如 Edge 环境）
 * 独立定义类型，避免与 skuData 循环依赖
 */

export interface FallbackSkuRow {
  parentSku: string;
  subSku: string;
  type: string;
  lengthInch: number;
  collapsedDimensions: string;
  weightG: number;
  title: string;
}

export const FALLBACK_SKU_ROWS: FallbackSkuRow[] = [
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

/** 产品短标题回退表（CSV 不可用或 shortTitle 列为空时使用） */
export const FALLBACK_SHORT_TITLES: Record<string, string> = {
  TSG01: "Silvery Carbon Travel Rod", TSG02: "Travel Carbon Spinning Rod", TSG03: "Carbon Casting Rod",
  TSG04: "Carbon Lure Rod Wood Handle", TSG05: "White Fiberglass Casting Rod", TSG06: "Travel Lure Rod",
  TSG07: "Fiberglass Spinning Rod", TSG08: "Fiberglass Casting Rod", TSG09: "Green Carbon Casting Rod",
  TSG10: "Black & Gold Carbon Rod", TSG11: "Carbon Rod & Reel Set", TSG12: "Durable Spinning Rod",
  TSG13: "Telescopic Fiberglass Rod", TSG14: "Carbon Fiber Lure Rod", TSG15: "Travel Carbon Spinning Rod",
  TSG16: "Colored Carbon Fiber Rod", TSG17: "High-Carbon Lure Rod", TSG18: "Red ML Tone Lure Rod",
  TSG19: "UL Tone Carbon Casting Rod", TSG20: "Camo Casting Rod", TSG21: "Camo Casting Rod",
  TSG22: "Green Carbon Fiber Rod", TSG23: "Black M-Tone Casting Rod", TSG24: "White Carbon Rod C&S",
  TSG25: "M Tone Carbon Lure Rod", TSG26: "Long Casting Carbon Rod", TSG27: "Silver-Black Carbon Rod",
  TSG28: "Ultra-Light Carbon Lure Rod", TSG29: "Blue/Orange Carbon Lure Rod",
  SSG01: "Telescopic Surf Rod", DJG01: "4-Section Mini Lure Rod", DGL: "Sea Rod & Reel Set",
  YGT01: "55-Pc Telescopic Lure Set",
};
