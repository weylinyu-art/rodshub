#!/usr/bin/env node
/**
 * 合并外部 CSV 到 data/products.csv，用于批量上新/更新。
 *
 * 规则：
 * 1. 以 parentSku + subSku 作为唯一键。
 * 2. 如果外部 CSV 中存在与现有行相同的键，则“更新”该行：
 *    - 以现有行为基础，外部 CSV 中非空字段覆盖同名列。
 * 3. 如果外部 CSV 中存在新的键（原 CSV 中没有），则“新增”行：
 *    - 使用现有 CSV 的列集合作为表头；未提供的列置为空字符串。
 * 4. 外部 CSV 中未出现的 SKU 行保持不变，不会被删除。
 *
 * 用法示例：
 *   # 直接用桌面文件合并，然后重新生成 products.generated.ts
 *   node scripts/merge-products.mjs "C:\\Users\\hetu\\Desktop\\products.csv" --generate
 *
 *   # 只合并，不生成（下次 build 时再自动生成）
 *   node scripts/merge-products.mjs "C:\\Users\\hetu\\Desktop\\products.csv"
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { parse as parseCsv } from "csv-parse/sync";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CSV_PATH = join(ROOT, "data", "products.csv");

function normaliseSku(value) {
  if (value == null) return "";
  // 处理类似 2.02504E+11 这种科学计数法，统一转为字符串
  return String(value).trim();
}

function loadExistingCsv() {
  if (!existsSync(CSV_PATH)) {
    throw new Error(`未找到现有 CSV：${CSV_PATH}`);
  }
  const raw = readFileSync(CSV_PATH, "utf-8");
  const records = parseCsv(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  });
  return records;
}

function loadIncomingCsv(inputPath) {
  if (!existsSync(inputPath)) {
    throw new Error(`外部 CSV 文件不存在：${inputPath}`);
  }
  const raw = readFileSync(inputPath, "utf-8");
  const records = parseCsv(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  });
  return records;
}

function buildKey(rec) {
  const parentSku = normaliseSku(rec.parentSku);
  // subSku 允许为空，空则统一视为 "无"，与现有 CSV 逻辑保持一致
  const subSkuRaw = rec.subSku == null || String(rec.subSku).trim() === "" ? "无" : rec.subSku;
  const subSku = normaliseSku(subSkuRaw);
  if (!parentSku) return "";
  return `${parentSku}::${subSku}`;
}

function mergeRecords(existing, incoming) {
  if (!existing.length && !incoming.length) return [];

  // 以现有 CSV 的列为主，保持列顺序
  const headerSet = new Set();
  if (existing.length) {
    Object.keys(existing[0]).forEach((k) => headerSet.add(k));
  }
  // 补充外部 CSV 中可能新增的列（向后追加）
  if (incoming.length) {
    Object.keys(incoming[0]).forEach((k) => {
      if (!headerSet.has(k)) headerSet.add(k);
    });
  }
  const headers = Array.from(headerSet);

  // 构建现有记录键集合
  const existingByKey = new Map();
  const existingKeys = new Set();
  for (const rec of existing) {
    const key = buildKey(rec);
    if (!key) continue;
    existingByKey.set(key, rec);
    existingKeys.add(key);
  }

  // 外部记录按 key 映射
  const incomingByKey = new Map();
  for (const rec of incoming) {
    const key = buildKey(rec);
    if (!key) continue;
    incomingByKey.set(key, rec);
  }

  const result = [];
  const seenKeys = new Set();

  // 先按原有顺序遍历现有记录，有更新的则合并，否则原样保留
  for (const rec of existing) {
    const key = buildKey(rec);
    if (!key) {
      result.push(rec);
      continue;
    }
    const incomingRec = incomingByKey.get(key);
    if (incomingRec) {
      const merged = { ...rec };
      for (const col of headers) {
        if (Object.prototype.hasOwnProperty.call(incomingRec, col)) {
          const val = incomingRec[col];
          if (val !== undefined && val !== null && String(val).trim() !== "") {
            merged[col] = String(val).trim();
          }
        }
      }
      result.push(merged);
    } else {
      result.push(rec);
    }
    seenKeys.add(key);
  }

  // 再追加纯新增的 key（原 CSV 中不存在）
  for (const [key, incomingRec] of incomingByKey.entries()) {
    if (seenKeys.has(key)) continue;
    const row = {};
    for (const col of headers) {
      if (Object.prototype.hasOwnProperty.call(incomingRec, col) && incomingRec[col] != null) {
        row[col] = String(incomingRec[col]).trim();
      } else {
        row[col] = "";
      }
    }
    result.push(row);
    seenKeys.add(key);
  }

  return { headers, rows: result };
}

function toCsv(headers, rows) {
  const lines = [];
  lines.push(headers.join(","));
  for (const row of rows) {
    const values = headers.map((h) => {
      let v = row[h] ?? "";
      v = String(v);
      // 简单处理逗号和引号
      if (/[",\r\n]/.test(v)) {
        v = `"${v.replace(/"/g, '""')}"`;
      }
      return v;
    });
    lines.push(values.join(","));
  }
  return lines.join("\n");
}

async function main() {
  const args = process.argv.slice(2);
  const input = args[0];
  const doGenerate = args.includes("--generate");

  if (!input) {
    console.log(`
用法:
  node scripts/merge-products.mjs <外部CSV路径> [--generate]

示例:
  node scripts/merge-products.mjs "C:\\\\Users\\\\hetu\\\\Desktop\\\\products.csv" --generate
`);
    process.exit(1);
  }

  const existing = loadExistingCsv();
  const incoming = loadIncomingCsv(input);
  if (!incoming.length) {
    console.log("外部 CSV 中没有有效数据行，已跳过。");
    process.exit(0);
  }

  const { headers, rows } = mergeRecords(existing, incoming);
  const csvText = toCsv(headers, rows);
  writeFileSync(CSV_PATH, csvText, "utf-8");
  console.log(`已合并 ${incoming.length} 行到 ${CSV_PATH}（按 parentSku+subSku 更新/新增）`);

  if (doGenerate) {
    const scriptPath = join(__dirname, "csv-to-products.mjs");
    const child = spawn("node", [scriptPath], {
      stdio: "inherit",
      cwd: ROOT,
    });
    child.on("close", (code) => process.exit(code ?? 0));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

