/**
 * 首页 / categories 页的类目图片，统一从 R2 rodshub-categories 桶拉取
 * 需在 .env 中配置 NEXT_PUBLIC_R2_CATEGORIES_BASE（R2 桶 Public URL 或自定义域名）
 */
const R2_CATEGORIES_BASE =
  process.env.NEXT_PUBLIC_R2_CATEGORIES_BASE ?? "https://categories.rodshub.com";

/** slug -> R2 对象键（与 rodshub-categories 桶内文件名一致） */
const R2_KEYS: Record<string, string> = {
  spinning: "Spinning Rods.png",
  casting: "Casting Rods.png",
  telescopic: "Telescopic Rods.png",
  surf: "Surf Rods.png",
  ice: "Ice Fishing Rods.png",
  travel: "Travel Rods.png",
};

/** 获取类目图片 URL */
export function getCategoryImageUrl(slug: string): string {
  const key = R2_KEYS[slug];
  if (!key) return "";
  const base = R2_CATEGORIES_BASE.replace(/\/$/, "");
  return `${base}/${encodeURIComponent(key)}`;
}

/** 所有类目的图片 URL 映射（slug -> url），供组件直接引用 */
export const CATEGORY_IMAGE_URLS = Object.keys(R2_KEYS).reduce(
  (acc, slug) => {
    acc[slug] = getCategoryImageUrl(slug);
    return acc;
  },
  {} as Record<string, string>,
);
