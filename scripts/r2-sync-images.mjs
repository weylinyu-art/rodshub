/**
 * 构建时执行：从 Cloudflare R2（S3 兼容 API）拉取真实 objects 清单，
 * 生成 data/r2-images.generated.ts，供真实商品展示使用（不再猜文件名）。
 *
 * 环境变量（建议在 CI/部署环境配置）：
 * - R2_ACCOUNT_ID
 * - R2_ACCESS_KEY_ID
 * - R2_SECRET_ACCESS_KEY
 * - R2_BUCKET
 * 可选：
 * - R2_ENDPOINT（默认：https://{accountId}.r2.cloudflarestorage.com）
 * - R2_PREFIX（默认：products/）
 *
 * 运行：
 *   node scripts/r2-sync-images.mjs
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "data", "r2-images.generated.ts");

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET;
const prefix = (process.env.R2_PREFIX ?? "products/").replace(/^\/+/, "");

function writeOutput({ bySku, meta }) {
  const output = `/** 由 scripts/r2-sync-images.mjs 从 R2 拉取生成，请勿手动编辑 */
/* eslint-disable */
export const R2_IMAGES_META = ${JSON.stringify(meta, null, 2)};
export const R2_IMAGE_FILES_BY_SKU: Record<string, string[]> = ${JSON.stringify(bySku, null, 2)};
`;
  writeFileSync(outPath, output);
}

function isImageKey(key) {
  const lower = String(key ?? "").toLowerCase();
  return /\.(png|jpe?g|webp|gif)$/i.test(lower);
}

function fileNameFromKey(key) {
  const parts = String(key).split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

function skuFromKey(key) {
  const parts = String(key).split("/").filter(Boolean);
  // 期望：products/{SKU}/{file}
  if (parts.length < 3) return null;
  if (parts[0] !== prefix.replace(/\/$/, "")) return null;
  return parts[1] || null;
}

function sortFilesForSku(sku, files) {
  const re = new RegExp(`^${sku.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-([0-9]+)\\.(png|jpe?g|webp|gif)$`, "i");
  return [...files].sort((a, b) => {
    const ma = a.match(re);
    const mb = b.match(re);
    if (ma && mb) {
      const na = parseInt(ma[1], 10);
      const nb = parseInt(mb[1], 10);
      if (na !== nb) return na - nb;
      return ma[2].toLowerCase().localeCompare(mb[2].toLowerCase());
    }
    if (ma) return -1;
    if (mb) return 1;
    return a.localeCompare(b);
  });
}

async function main() {
  const startedAt = new Date().toISOString();

  // 没有凭证时：生成空文件，构建继续走“猜测文件名”的 fallback
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    writeOutput({
      bySku: {},
      meta: {
        ok: false,
        reason: "missing_env",
        required: ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET"],
        startedAt,
      },
    });
    console.log(`[r2-sync-images] skipped (missing env). Wrote empty ${outPath}`);
    return;
  }

  const endpoint = process.env.R2_ENDPOINT ?? `https://${accountId}.r2.cloudflarestorage.com`;
  const client = new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });

  const bySku = {};
  let continuationToken = undefined;
  let keysScanned = 0;
  let imagesFound = 0;

  while (true) {
    const res = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })
    );
    const contents = res.Contents ?? [];
    keysScanned += contents.length;
    for (const obj of contents) {
      const key = obj.Key;
      if (!key || key.endsWith("/")) continue;
      if (!isImageKey(key)) continue;
      const sku = skuFromKey(key);
      if (!sku) continue;
      const file = fileNameFromKey(key);
      if (!file) continue;
      (bySku[sku] ??= []).push(file);
      imagesFound++;
    }
    if (!res.IsTruncated) break;
    continuationToken = res.NextContinuationToken;
    if (!continuationToken) break;
  }

  // 去重 + 排序
  for (const [sku, files] of Object.entries(bySku)) {
    const uniq = Array.from(new Set(files));
    bySku[sku] = sortFilesForSku(sku, uniq);
  }

  writeOutput({
    bySku,
    meta: {
      ok: true,
      startedAt,
      finishedAt: new Date().toISOString(),
      bucket,
      endpoint,
      prefix,
      keysScanned,
      imagesFound,
      skuCount: Object.keys(bySku).length,
    },
  });

  console.log(`[r2-sync-images] wrote ${outPath} (sku=${Object.keys(bySku).length}, images=${imagesFound})`);
}

main().catch((err) => {
  writeOutput({
    bySku: {},
    meta: {
      ok: false,
      reason: "error",
      error: String(err?.message ?? err),
      startedAt: new Date().toISOString(),
    },
  });
  console.error("[r2-sync-images] failed:", err);
  process.exitCode = 1;
});

