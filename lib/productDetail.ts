import type { Product } from "./products";
import type { ProductVariant, RealProduct } from "./realProducts";
import { inferMaterialFromTitle, inferPowerFromTitle } from "./realProducts";

/** 从标题中提炼 Key Features（按 " - " 或 ", " 分段，过滤短句与通用词） */
export function extractKeyFeaturesFromTitle(title: string): string[] {
  if (!title?.trim()) return [];
  const raw = title.split(/\s*-\s*|\s*,\s*/).map((s) => s.trim()).filter(Boolean);
  const skip = new Set(["1pc", "1pc.", "fishing rod", "rod", "and", "the", "with"]);
  return raw.filter((s) => {
    if (s.length < 3) return false;
    const lower = s.toLowerCase();
    if (skip.has(lower)) return false;
    if (/^\d+[cm]*$/.test(lower)) return false;
    if (/^[a-z]{1,2}$/i.test(s)) return false;
    return true;
  });
}

/** 合并标题提炼卖点 + 规格卖点 + B2B 通用卖点，使 Key Features 更充实 */
export function getKeyFeaturesForProduct(opts: {
  originalTitle?: string;
  displayName?: string;
  variant?: import("./realProducts").ProductVariant;
  detailFeatures?: string[];
}): string[] {
  const { originalTitle, displayName, variant, detailFeatures = [] } = opts;
  const fromTitle = extractKeyFeaturesFromTitle(originalTitle || displayName || "");
  const seen = new Set<string>();
  const result: string[] = [];
  for (const f of fromTitle) {
    if (!seen.has(f)) {
      seen.add(f);
      result.push(f);
    }
  }
  if (variant) {
    const typeFeature = `${variant.type} type for versatile casting & retrieval`;
    if (!seen.has(typeFeature)) {
      seen.add(typeFeature);
      result.push(typeFeature);
    }
    const weightFeature = `Lightweight at ${variant.weight} for comfortable handling`;
    if (!seen.has(weightFeature)) {
      seen.add(weightFeature);
      result.push(weightFeature);
    }
  }
  const b2bFeatures = ["Ceramic/Fuji guides for smooth line flow", "OEM/custom branding available", "Export-ready packaging"];
  for (const f of b2bFeatures) {
    if (!seen.has(f)) {
      seen.add(f);
      result.push(f);
    }
  }
  for (const f of detailFeatures) {
    if (f && !seen.has(f)) {
      seen.add(f);
      result.push(f);
    }
  }
  return result;
}

export interface ProductDetail {
  description: string;
  specifications: { label: string; value: string }[];
  features: string[];
}

/** 全站统一的规格映射与默认值 */
const POWER_ACTION_MAP: Record<string, string> = {
  Ultralight: "Ultra Light", Light: "Light / Moderate", Medium: "Medium",
  "Medium-Heavy": "Medium Fast", Heavy: "Fast", "Extra Heavy": "Extra Fast",
};
const POWER_LINE_MAP: Record<string, string> = {
  Ultralight: "2-6 lb (1-3 kg)", Light: "4-10 lb (2-5 kg)", Medium: "6-14 lb (3-6 kg)",
  "Medium-Heavy": "10-20 lb (5-9 kg)", Heavy: "15-30 lb (7-14 kg)", "Extra Heavy": "20-50 lb (9-23 kg)",
};
const POWER_LURE_MAP: Record<string, string> = {
  Ultralight: "1/32 - 1/8 oz (1-4 g)", Light: "1/16 - 1/4 oz (2-7 g)", Medium: "1/8 - 5/8 oz (4-18 g)",
  "Medium-Heavy": "1/4 - 1 oz (7-28 g)", Heavy: "3/8 - 2 oz (10-56 g)", "Extra Heavy": "1 - 4 oz (28-113 g)",
};

/** 根据产品基础信息生成完整钓鱼竿详情（规格、描述、卖点） */
export function getProductDetail(product: Product): ProductDetail {
  const power = product.power ?? "Medium";
  const material = product.material ?? "Carbon Fiber";
  const length = product.length ?? "2.1m";
  const name = product.name?.toLowerCase() ?? "";
  const typeVal = product.fishingStyle ?? "Spinning";

  const action = POWER_ACTION_MAP[power] ?? "Medium";
  const lineWeight = POWER_LINE_MAP[power] ?? "6-14 lb (3-6 kg)";
  const lureWeight = POWER_LURE_MAP[power] ?? "1/8 - 5/8 oz (4-18 g)";
  const sections = name.includes("travel") || name.includes("piece") ? "4 or 5" : "1";
  const handleType = name.includes("spinning") ? "Cork" : name.includes("casting") ? "EVA" : "Cork/EVA";

  const specifications = [
    { label: "Length", value: length },
    { label: "Material", value: material },
    { label: "Power", value: power },
    { label: "Type", value: typeVal },
    { label: "Action", value: action },
    { label: "Line Weight", value: lineWeight },
    { label: "Lure Weight", value: lureWeight },
    { label: "Sections", value: sections },
    { label: "Handle", value: handleType },
  ];

  const typeDesc = name.includes("spinning")
    ? "spinning"
    : name.includes("casting")
      ? "casting"
      : name.includes("telescopic")
        ? "telescopic"
        : name.includes("surf")
          ? "surf"
          : name.includes("ice")
            ? "ice fishing"
            : name.includes("travel")
              ? "travel"
              : "fishing";

  const description = `This ${material.toLowerCase()} ${typeDesc} rod is engineered for performance and durability. With a ${power} power rating and ${action.toLowerCase()} action, it delivers optimal sensitivity and backbone for a wide range of applications. The ${length} length provides excellent casting distance and control. Ideal for both freshwater and light saltwater use, this rod is a popular choice among retailers and wholesalers seeking reliable, tournament-grade equipment at competitive B2B pricing.`;

  const features = [
    `${material} blank for lightweight sensitivity`,
    `${action} action for balanced feel`,
    `Designed for ${lineWeight} line`,
    `Suitable for lures ${lureWeight}`,
    "Fuji guides or equivalent quality",
    "OEM/custom branding available",
    "Export-ready packaging",
  ];

  return { description, specifications, features };
}

/** 根据 ProductVariant 生成详情，规格与 getProductDetail 统一（信息缺失时填默认值） */
export function getProductDetailForVariant(
  variant: ProductVariant,
  product?: Product | null,
  realProduct?: RealProduct | null
): ProductDetail {
  const material = product?.material ?? (realProduct ? inferMaterialFromTitle(realProduct.name) : undefined) ?? "Carbon Fiber";
  const power = product?.power ?? (realProduct ? inferPowerFromTitle(realProduct.name) : undefined) ?? "Medium";
  const name = (product?.name ?? realProduct?.name ?? "").toLowerCase();

  const action = POWER_ACTION_MAP[power] ?? "Medium";
  const lineWeight = POWER_LINE_MAP[power] ?? "6-14 lb (3-6 kg)";
  const lureWeight = POWER_LURE_MAP[power] ?? "1/8 - 5/8 oz (4-18 g)";
  const sections = name.includes("travel") || name.includes("piece") ? "4 or 5" : "1";
  const handleType = name.includes("spinning") ? "Cork" : name.includes("casting") ? "EVA" : "Cork/EVA";

  const specifications: { label: string; value: string }[] = [
    { label: "Length", value: variant.dimensions },
    { label: "Material", value: material },
    { label: "Power", value: power },
    { label: "Type", value: variant.type },
    { label: "Action", value: action },
    { label: "Line Weight", value: lineWeight },
    { label: "Lure Weight", value: lureWeight },
    { label: "Sections", value: sections },
    { label: "Handle", value: handleType },
    { label: "Weight", value: variant.weight },
  ];
  if (variant.handleStyle) {
    specifications.push({ label: "Handle Style", value: variant.handleStyle });
  }
  if (variant.handOrientation) {
    specifications.push({ label: "Hand Orientation", value: variant.handOrientation });
  }
  if (variant.extendedLengthCm) {
    specifications.push({ label: "Extended Length", value: `${variant.extendedLengthCm} cm` });
  }
  if (variant.detailDimensions) {
    specifications.push({ label: "Detail Dimensions", value: variant.detailDimensions });
  }
  if (variant.packageDimensions) {
    specifications.push({ label: "Package Dimensions", value: variant.packageDimensions });
  }

  const typeDesc = variant.type.toLowerCase();
  const description =
    variant.remarks && variant.remarks !== "Please contact for specifications."
      ? variant.remarks
      : `This ${material.toLowerCase()} ${typeDesc} rod is engineered for performance and durability. With a ${power} power rating and ${action.toLowerCase()} action, it delivers optimal sensitivity. The ${variant.dimensions} length provides excellent casting distance. Suitable for B2B wholesale and OEM customization.`;

  const features =
    variant.remarks && variant.remarks !== "Please contact for specifications."
      ? variant.remarks.split(/[.;]/).filter((s) => s.trim().length > 0)
      : [
          `${material} blank for lightweight sensitivity`,
          `${variant.type} type for versatile casting & retrieval`,
          `${action} action for balanced feel`,
          `Designed for ${lineWeight} line`,
          `Lightweight at ${variant.weight} for comfortable handling`,
          "Ceramic/Fuji guides for smooth line flow",
          "OEM/custom branding available",
          "Export-ready packaging",
        ];

  return { description, specifications, features };
}
