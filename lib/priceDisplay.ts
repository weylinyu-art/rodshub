/**
 * 统一的展示价格逻辑：
 * - 所有商品在 1–10 美元区间内展示
 * - 同一个商品在全站展示的价格保持一致
 * - 基于 id 的伪随机算法生成价格区间，保证可复现
 */

export interface DisplayPrice {
  text: string;
  min: number;
  max: number;
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * 根据产品 ID 生成稳定的价格区间，范围始终在 1–10 美元之间。
 * 例如：2–5、1–3、4–8 等。
 */
export function getRandomDisplayPriceForId(id: string): DisplayPrice {
  const seed = hashString(id || "default");
  // 最低价 1–7 之间
  const baseMin = 1 + (seed % 7); // 1..7
  // 区间跨度 1–4 美元
  const span = 1 + ((seed >> 3) % 4); // 1..4

  let min = baseMin;
  let max = baseMin + span;
  if (max > 10) {
    max = 10;
    if (min >= max) {
      min = max - 1;
    }
  }

  const minFixed = min.toFixed(2);
  const maxFixed = max.toFixed(2);
  const text = min === max ? `$${minFixed}` : `$${minFixed} - $${maxFixed}`;

  return { text, min, max };
}

