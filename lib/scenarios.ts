import type { Product } from "@/lib/products";
import { getAllProducts, getRealProduct } from "@/lib/productRegistry";

export const SCENARIOS = [
  { name: "Freshwater", slug: "freshwater" },
  { name: "Saltwater", slug: "saltwater" },
  { name: "Surf", slug: "surf" },
  { name: "Boat", slug: "boat" },
  { name: "Ice", slug: "ice" },
] as const;

type ScenarioSlug = (typeof SCENARIOS)[number]["slug"];

/** Scenario -> category/fishingStyle filter rules */
const SCENARIO_FILTER: Record<ScenarioSlug, (p: Product) => boolean> = {
  freshwater: (p) => {
    const n = (p.name ?? "").toLowerCase();
    const fs = (p.fishingStyle ?? "").toLowerCase();
    return (
      fs === "spinning" ||
      fs === "casting" ||
      fs === "telescopic" ||
      fs === "travel" ||
      n.includes("freshwater") ||
      n.includes("ultralight") ||
      n.includes("light")
    );
  },
  saltwater: (p) => {
    const n = (p.name ?? "").toLowerCase();
    const fs = (p.fishingStyle ?? "").toLowerCase();
    return fs === "surf" || n.includes("saltwater") || (fs === "casting" && (p.power === "Heavy" || p.power === "Medium-Heavy"));
  },
  surf: (p) => {
    const fs = (p.fishingStyle ?? "").toLowerCase();
    const n = (p.name ?? "").toLowerCase();
    return fs === "surf" || n.includes("surf");
  },
  boat: (p) => {
    const n = (p.name ?? "").toLowerCase();
    const fs = (p.fishingStyle ?? "").toLowerCase();
    return n.includes("boat") || (fs === "casting" && p.power !== "Ultralight") || (fs === "spinning" && p.power === "Medium");
  },
  ice: (p) => {
    const fs = (p.fishingStyle ?? "").toLowerCase();
    const n = (p.name ?? "").toLowerCase();
    return fs === "ice" || n.includes("ice");
  },
};

export function getProductsByScenario(slug: string): (Product & { id: string })[] {
  const filter = SCENARIO_FILTER[slug as ScenarioSlug];
  if (!filter) return [];
  const filtered = getAllProducts().filter((p) => p.id && filter(p)) as (Product & { id: string })[];
  // 真实商品优先，其它生成/模拟商品排后；并按 id 去重（registry 聚合时可能出现重复来源）
  const real: (Product & { id: string })[] = [];
  const generated: (Product & { id: string })[] = [];
  const seen = new Set<string>();
  for (const p of filtered) {
    if (!p.id || seen.has(p.id)) continue;
    seen.add(p.id);
    (getRealProduct(p.id) ? real : generated).push(p);
  }
  return [...real, ...generated];
}

/** 获取产品所属主场景（首个匹配），用于排序 */
function getPrimaryScenarioIndex(p: Product): number {
  for (let i = 0; i < SCENARIOS.length; i++) {
    if (SCENARIO_FILTER[SCENARIOS[i].slug](p)) return i;
  }
  return SCENARIOS.length; // 未匹配的放最后
}

/** 按场景顺序排序产品：Freshwater → Saltwater → Surf → Boat → Ice */
export function sortProductsByScenario<T extends Product>(products: T[]): T[] {
  return [...products].sort((a, b) => getPrimaryScenarioIndex(a) - getPrimaryScenarioIndex(b));
}
