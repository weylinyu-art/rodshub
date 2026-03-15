/**
 * 图片 URL 工具：按 base URL（去掉 query）去重
 * 同一张图的多种裁剪（如 ?w=500&h=500 与 ?w=500&h=450）视为重复，不展示轮播
 */

function getImageBaseUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.origin + u.pathname;
  } catch {
    return url;
  }
}

/** 按 base URL 去重，仅保留每张不同图的首个 URL（避免同一图的裁剪变体被当作多图） */
export function dedupeImagesByBase(urls: string[]): string[] {
  const seen = new Set<string>();
  return urls.filter((url) => {
    const base = getImageBaseUrl(url);
    if (seen.has(base)) return false;
    seen.add(base);
    return true;
  });
}
