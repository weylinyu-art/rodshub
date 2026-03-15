/**
 * 构建时执行：将 data/products.csv 转为 data/products.generated.ts
 * 运行：node scripts/csv-to-products.mjs
 * package.json: "prebuild": "node scripts/csv-to-products.mjs"
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const csvPath = join(root, "data", "products.csv");
const outPath = join(root, "data", "products.generated.ts");

const raw = readFileSync(csvPath, "utf-8");
const records = parse(raw, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  relax_column_count: true,
});

const rows = [];
const shortTitles = {};
const displayPrices = {};

for (const r of records) {
  const parentSku = String(r.parentSku ?? "").trim();
  const subSku = String(r.subSku ?? "").trim();
  const type = String(r.type ?? "").trim();
  const lengthInch = parseFloat(r.lengthInch ?? "0") || 0;
  const collapsedDimensions = String(r.collapsedDimensions ?? "").trim();
  const weightG = parseInt(r.weightG ?? "0", 10) || 0;
  const title = String(r.title ?? "").trim();

  if (!parentSku) continue;

  rows.push({ parentSku, subSku: subSku || "无", type: type || "Spinning", lengthInch, collapsedDimensions, weightG, title });
  const shortTitle = String(r.shortTitle ?? "").trim();
  if (shortTitle && !shortTitles[parentSku]) shortTitles[parentSku] = shortTitle;
  const displayPrice = String(r.displayPrice ?? "").trim();
  if (displayPrice && !displayPrices[parentSku]) displayPrices[parentSku] = displayPrice;
}

const output = `/** 由 scripts/csv-to-products.mjs 从 data/products.csv 生成，请勿手动编辑 */
/* eslint-disable */
export const ROWS = ${JSON.stringify(rows)};
export const SHORT_TITLES: Record<string, string> = ${JSON.stringify(shortTitles)};
export const DISPLAY_PRICES: Record<string, string> = ${JSON.stringify(displayPrices)};
`;

writeFileSync(outPath, output);
console.log(`Generated ${outPath} with ${rows.length} rows`);