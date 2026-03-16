#!/usr/bin/env node
/**
 * 批量追加产品到 data/products.csv
 * 支持从文件或 stdin 读取多行 CSV，一次性追加
 *
 * 用法：
 *   node scripts/append-products.mjs new-products.csv
 *   node scripts/append-products.mjs new-products.csv --generate   # 追加后自动生成 products.generated.ts
 *   type new.csv | node scripts/append-products.mjs -
 *
 * CSV 格式需与 data/products.csv 一致（含表头则自动跳过）
 */

import { readFileSync, appendFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = join(__dirname, "..", "data", "products.csv");
const HEADER = "parentSku,subSku,type,lengthInch,collapsedDimensions,weightG,title,shortTitle,displayPrice";

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => { data += chunk; });
    process.stdin.on("end", () => resolve(data));
  });
}

function parseLines(text) {
  const lines = text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  const rows = [];
  for (const line of lines) {
    if (line.toLowerCase().startsWith("parentsku")) continue; // 跳过表头
    if (line.split(",").length < 3) continue; // 至少需要几列
    rows.push(line);
  }
  return rows;
}

async function main() {
  const args = process.argv.slice(2);
  const input = args[0];
  const doGenerate = args.includes("--generate");

  if (!input) {
    console.log(`
用法:
  node scripts/append-products.mjs <文件路径>
  node scripts/append-products.mjs <文件路径> --generate   # 追加后自动生成 products.generated.ts
  type new.csv | node scripts/append-products.mjs -

示例:
  node scripts/append-products.mjs batch-new.csv --generate
`);
    process.exit(1);
  }

  let content;
  if (input === "-") {
    content = await readStdin();
  } else if (existsSync(input)) {
    content = readFileSync(input, "utf-8");
  } else {
    console.error(`文件不存在: ${input}`);
    process.exit(1);
  }

  const rows = parseLines(content);
  if (rows.length === 0) {
    console.log("未找到可追加的行");
    process.exit(0);
  }

  appendFileSync(CSV_PATH, "\n" + rows.join("\n"), "utf-8");
  console.log(`已追加 ${rows.length} 行到 data/products.csv`);

  if (doGenerate) {
    const scriptPath = join(__dirname, "csv-to-products.mjs");
    const child = spawn("node", [scriptPath], {
      stdio: "inherit",
      cwd: join(__dirname, ".."),
    });
    child.on("close", (code) => process.exit(code ?? 0));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
