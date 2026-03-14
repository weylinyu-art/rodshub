import type { Product } from "./products";
import type { ProductVariant } from "./realProducts";

export interface ProductDetail {
  description: string;
  specifications: { label: string; value: string }[];
  features: string[];
}

/** 根据产品基础信息生成完整钓鱼竿详情（规格、描述、卖点） */
export function getProductDetail(product: Product): ProductDetail {
  const power = product.power ?? "Medium";
  const material = product.material ?? "Carbon";
  const length = product.length ?? "2.1m";
  const name = product.name?.toLowerCase() ?? "";

  const actionMap: Record<string, string> = {
    Ultralight: "Ultra Light",
    Light: "Light / Moderate",
    Medium: "Medium",
    "Medium-Heavy": "Medium Fast",
    Heavy: "Fast",
    "Extra Heavy": "Extra Fast",
  };
  const action = actionMap[power] ?? "Medium";

  const lineMap: Record<string, string> = {
    Ultralight: "2-6 lb (1-3 kg)",
    Light: "4-10 lb (2-5 kg)",
    Medium: "6-14 lb (3-6 kg)",
    "Medium-Heavy": "10-20 lb (5-9 kg)",
    Heavy: "15-30 lb (7-14 kg)",
    "Extra Heavy": "20-50 lb (9-23 kg)",
  };
  const lineWeight = lineMap[power] ?? "6-14 lb (3-6 kg)";

  const lureMap: Record<string, string> = {
    Ultralight: "1/32 - 1/8 oz (1-4 g)",
    Light: "1/16 - 1/4 oz (2-7 g)",
    Medium: "1/8 - 5/8 oz (4-18 g)",
    "Medium-Heavy": "1/4 - 1 oz (7-28 g)",
    Heavy: "3/8 - 2 oz (10-56 g)",
    "Extra Heavy": "1 - 4 oz (28-113 g)",
  };
  const lureWeight = lureMap[power] ?? "1/8 - 5/8 oz (4-18 g)";

  const sections = name.includes("travel") || name.includes("piece") ? "4 or 5" : "1";
  const handleType = name.includes("spinning") ? "Cork" : name.includes("casting") ? "EVA" : "Cork/EVA";

  const specifications = [
    { label: "Length", value: length },
    { label: "Material", value: material },
    { label: "Power", value: power },
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

/** 根据 ProductVariant 生成详情（多型号产品的规格、描述、卖点） */
export function getProductDetailForVariant(variant: ProductVariant): ProductDetail {
  const specs: { label: string; value: string }[] = [
    { label: "SKU", value: variant.sku },
    { label: "Dimensions", value: variant.dimensions },
    { label: "Weight", value: variant.weight },
    { label: "Type", value: variant.type },
  ];
  if (variant.detailDimensions) {
    specs.push({ label: "Detail Dimensions", value: variant.detailDimensions });
  }
  if (variant.packageDimensions) {
    specs.push({ label: "Package Dimensions", value: variant.packageDimensions });
  }

  const description =
    variant.remarks ||
    `This ${variant.type.toLowerCase()} rod (${variant.sku}) measures ${variant.dimensions} with a weight of ${variant.weight}. Suitable for B2B wholesale and OEM customization.`;

  const features = variant.remarks
    ? variant.remarks.split(/[.;]/).filter((s) => s.trim().length > 0)
    : [
        `${variant.type} type, ${variant.dimensions} length`,
        `Weight: ${variant.weight}`,
        "OEM/custom branding available",
        "Export-ready packaging",
      ];

  return { description, specifications: specs, features };
}
