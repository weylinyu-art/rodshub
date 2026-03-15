/**
 * 排序辅助：用于 0 点击产品的日级轮换（冷启动）
 * 同一天内顺序稳定，不同日期顺序变化，让新品有机会获得曝光
 */

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h = h & h;
  }
  return h;
}

/** 按 id + 当天日期的哈希，用于 0 点击产品日级轮换排序 */
export function dailyRotateScore(id: string): number {
  if (typeof window === "undefined") return simpleHash(id);
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return simpleHash(id + today);
}
