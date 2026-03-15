/**
 * 点击追踪：记录用户点击，用于列表页按点击量排序（全用户聚合）
 * 支持：产品 ID、分类 tab (cat:spinning)、场景 tab (scen:freshwater)
 * 使用 Cloudflare Worker + KV 存储全站点击数据
 */

const STORAGE_KEY = "rodshub_click_counts";

function getTrackerUrl(): string {
  return process.env.NEXT_PUBLIC_CLICK_TRACKER_URL ?? "";
}

function safeGet(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function safeSet(data: Record<string, number>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

/** 记录一次点击（上报到 Worker，同时更新本地缓存以便离线时排序仍生效） */
export function recordClick(key: string): void {
  if (!key) return;
  const data = safeGet();
  data[key] = (data[key] ?? 0) + 1;
  safeSet(data);

  const url = getTrackerUrl();
  if (!url) return;
  try {
    const payload = JSON.stringify({ key });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${url}/track`, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(`${url}/track`, {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* ignore */
  }
}

/** 记录产品点击（便捷封装） */
export function recordProductClick(productId: string): void {
  if (productId) recordClick(productId);
}

/** 获取单个 key 的点击次数 */
export function getClickCount(key: string): number {
  return safeGet()[key] ?? 0;
}

/** 获取所有点击数据（用于排序）- 仅 localStorage 模式；用 Worker 时由 useClickCounts 提供 */
export function getAllClickCounts(): Record<string, number> {
  return safeGet();
}

/** 生成分类 tab 的追踪 key */
export function catTabKey(slug: string): string {
  return slug === "all" ? "" : `cat:${slug}`;
}

/** 生成场景 tab 的追踪 key */
export function scenTabKey(slug: string): string {
  return slug === "all" ? "" : `scen:${slug}`;
}

/** 按点击量降序排序（点击多的靠前），点击量相同时保持原顺序 */
export function sortByClickCount<T>(
  items: T[],
  getKey: (item: T) => string,
  counts: Record<string, number>
): T[] {
  return [...items].sort((a, b) => {
    const ca = counts[getKey(a)] ?? 0;
    const cb = counts[getKey(b)] ?? 0;
    if (cb !== ca) return cb - ca;
    return 0;
  });
}
