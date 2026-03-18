/**
 * 从构建时生成的 data/r2-images.generated.ts 读取真实图片文件名清单
 * - 无生成文件/无凭证时返回空对象，调用方应 fallback 到默认猜测规则
 */

export type R2ImagesMeta =
  | { ok: true; [k: string]: unknown }
  | { ok: false; reason?: string; [k: string]: unknown }
  | undefined;

export function loadR2Images(): { bySku: Record<string, string[]>; meta?: R2ImagesMeta } {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const gen = require("../data/r2-images.generated") as {
      R2_IMAGE_FILES_BY_SKU?: Record<string, string[]>;
      R2_IMAGES_META?: R2ImagesMeta;
    };
    return { bySku: gen?.R2_IMAGE_FILES_BY_SKU ?? {}, meta: gen?.R2_IMAGES_META };
  } catch {
    return { bySku: {} };
  }
}

