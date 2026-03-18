/**
 * 将 data/products_YYYYMMDD.csv 合并进 data/products.csv（按 parentSku+subSku 去重）
 *
 * 目标：
 * - 上新 CSV 只包含基础字段也能合并（shortTitle/displayPrice 等留空）
 * - 保持 data/products.csv 的列结构（兼容 scripts/csv-to-products.mjs 生成 products.generated.ts）
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "csv-parse/sync";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const srcPath = join(root, "data", "products_20260318.csv");
const dstPath = join(root, "data", "products.csv");

function readCsv(path) {
  const raw = readFileSync(path, "utf-8");
  const records = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  });
  return records;
}

const existingRaw = readCsv(dstPath);
const incomingRaw = readCsv(srcPath);

// 现有 CSV 可能带 BOM/隐藏列名，统一识别 parentSku 字段
function getParentSku(r) {
  return String(r.parentSku ?? r["﻿parentSku"] ?? "").trim();
}

// 以 parentSku+subSku 作为唯一键：同一父 SKU 多行 variant 允许存在，但子 SKU 不同
function keyOf(r) {
  const parentSku = getParentSku(r);
  const subSku = String(r.subSku ?? "").trim() || "无";
  return `${parentSku}__${subSku}`;
}

const byKey = new Map();
for (const r of existingRaw) {
  const k = keyOf(r);
  if (!k.startsWith("__")) byKey.set(k, r);
}

for (const r of incomingRaw) {
  const parentSku = getParentSku(r);
  if (!parentSku) continue;
  const merged = {
    // 保持目标 CSV 的列：这里写默认值，后续会按 dst header 输出
    parentSku,
    subSku: String(r.subSku ?? "").trim() || "无",
    type: String(r.type ?? "").trim() || "Spinning",
    lengthInch: String(r.lengthInch ?? "").trim(),
    collapsedDimensions: String(r.collapsedDimensions ?? "").trim(),
    weightG: String(r.weightG ?? "").trim(),
    title: String(r.title ?? "").trim(),
    shortTitle: "",
    displayPrice: "",
    handleStyle: "",
    handOrientation: "",
    extendedLengthCm: "",
  };
  byKey.set(keyOf(merged), merged);
}

// 以原文件列顺序为准输出；确保包含新字段（若原文件缺失则补齐）
const existingHeaders = Object.keys(existingRaw[0] ?? {});
const desiredHeaders = [
  "parentSku",
  "subSku",
  "type",
  "lengthInch",
  "collapsedDimensions",
  "weightG",
  "title",
  "shortTitle",
  "displayPrice",
  "handleStyle",
  "handOrientation",
  "extendedLengthCm",
];

const headers = desiredHeaders.filter((h) => existingHeaders.includes(h)).concat(
  desiredHeaders.filter((h) => !existingHeaders.includes(h))
);

const mergedRecords = Array.from(byKey.values()).map((r) => {
  const parentSku = getParentSku(r) || "";
  const normalized = { ...r, parentSku };
  const out = {};
  for (const h of headers) out[h] = normalized[h] ?? "";
  return out;
});

// 按 parentSku 排序，便于审查与冲突处理
mergedRecords.sort((a, b) => String(a.parentSku).localeCompare(String(b.parentSku)));

function csvEscape(v) {
  const s = String(v ?? "");
  if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

const outLines = [];
outLines.push(headers.join(","));
for (const r of mergedRecords) {
  outLines.push(headers.map((h) => csvEscape(r[h])).join(","));
}
const outCsv = outLines.join("\n") + "\n";
writeFileSync(dstPath, outCsv);
console.log(`Merged ${incomingRaw.length} rows into ${dstPath}. Total: ${mergedRecords.length}`);

