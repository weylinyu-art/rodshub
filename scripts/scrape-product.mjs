#!/usr/bin/env node
/**
 * 外部热门产品采集工具
 * 输入：1688 / Amazon / 同行站点商品详情链接
 * 输出：符合 data/products.csv 模板的 CSV 行
 *
 * 用法：
 *   node scripts/scrape-product.mjs "https://detail.1688.com/offer/xxx.html"
 *   node scripts/scrape-product.mjs "URL" --sku TSG31    # 指定 parentSku
 *   node scripts/scrape-product.mjs "URL" --append       # 追加到 products.csv
 *   node scripts/scrape-product.mjs "URL" --translate    # 标题/属性中文→英文
 *   node scripts/scrape-product.mjs "URL" --download-images  # 下载轮播图到 output/products/{sku}/
 *   node scripts/scrape-product.mjs "URL" --cny-rate 7.2    # 人民币→美元汇率（默认 7.2）
 *   node scripts/scrape-product.mjs "URL" --price-multiplier 3  # 1688 价格×倍数后转美元（默认 3）
 *
 * 依赖：npm install puppeteer
 */

import { readFileSync, appendFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = join(__dirname, "..", "data", "products.csv");

// 从标题推断渔竿类型
function inferType(title) {
  const t = (title || "").toLowerCase();
  if (/\b(casting|枪柄| baitcasting)\b/i.test(t)) return "Casting";
  if (/\b(telescopic|收缩|便携|travel)\b/i.test(t)) return "Spinning"; // 收缩杆多纺车
  if (/\b(surf|海钓|滩钓)\b/i.test(t)) return "Spinning";
  if (/\b(ice|冰钓)\b/i.test(t)) return "Spinning";
  if (/\b(spinning|纺车|直柄)\b/i.test(t)) return "Spinning";
  return "Spinning"; // 默认
}

// 从页面文本提取长度（cm/inch）
function parseLength(text) {
  const m = text.match(/(\d+\.?\d*)\s*(?:cm|CM)/);
  if (m) return parseFloat(m[1]) / 2.54; // cm -> inch
  const mi = text.match(/(\d+\.?\d*)\s*(?:inch|inches?|")/i);
  if (mi) return parseFloat(mi[1]);
  return 70.86; // 默认
}

// 从页面文本提取重量（g）
function parseWeight(text) {
  const m = text.match(/(\d+\.?\d*)\s*g\b/i);
  if (m) return parseInt(m[1], 10);
  const m2 = text.match(/\b(\d+)\s*克\b/);
  if (m2) return parseInt(m2[1], 10);
  return 150; // 默认
}

// 清洗标题（去杂质、截断）
function sanitizeTitle(s, maxLen = 80) {
  if (!s || typeof s !== "string") return "";
  let t = s
    .replace(/\s+/g, " ")
    .replace(/["\n\r]/g, " ")
    .trim();
  if (t.length > maxLen) t = t.slice(0, maxLen).trimEnd() + "…";
  return t;
}

// 生成短标题（≤35 字符）
function shortTitle(title, maxLen = 35) {
  const t = sanitizeTitle(title, maxLen);
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen - 1).trimEnd() + "…";
}

// CSV 转义
function csvEscape(s) {
  if (s == null) return "";
  const str = String(s);
  if (/[,"\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

/** MyMemory API 免费翻译（zh→en），单次约 500 字符 */
async function translateText(text, langPair = "zh|en") {
  if (!text || !/[\u4e00-\u9fa5]/.test(text)) return text;
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 450))}&langpair=${langPair}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.responseStatus === 200 && json.responseData?.translatedText) {
      return json.responseData.translatedText.trim();
    }
  } catch (e) {
    process.stderr.write(`  翻译失败: ${e.message}\n`);
  }
  return text;
}

/** 从 1688 页面提取人民币价格，返回最低价（元） */
function parse1688Price(body) {
  const m = body.match(/¥\s*(\d+\.?\d*)/g);
  if (!m) return null;
  const nums = m.map((s) => parseFloat(s.replace(/¥\s*/g, ""))).filter((n) => n > 0);
  return nums.length ? Math.min(...nums) : null;
}

/** CNY 转 USD，rate 默认 7.2。展示价 = 1688 价 × 倍率 ÷ 汇率 */
const PRICE_MULTIPLIER = 3;

function cnyToUsd(cny, rate = 7.2) {
  return (cny * PRICE_MULTIPLIER) / rate;
}

/** 常用渔具属性中→英映射 */
const ATTR_ZH_TO_EN = {
  木纹: "Wood grain", 线条: "Line", 黑色: "Black", 白色: "White", 红色: "Red",
  蓝色: "Blue", 绿色: "Green", 碳素: "Carbon", 包碳: "Carbon-wrapped",
  伸缩: "Telescopic", 升缩: "Telescopic", 冰钓: "Ice fishing", 冬钓: "Ice fishing",
};

function translateAttr(zh) {
  return ATTR_ZH_TO_EN[zh?.trim()] || zh;
}

/** 下载轮播图到 output/products/{sku}/{sku}-1.jpg 等 */
async function downloadImages(imgUrls, parentSku) {
  if (!imgUrls?.length) return 0;
  const outDir = join(__dirname, "..", "output", "products", parentSku);
  const { mkdirSync, writeFileSync } = await import("fs");
  if (!existsSync(join(__dirname, "..", "output"))) mkdirSync(join(__dirname, "..", "output"), { recursive: true });
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  let saved = 0;
  for (let i = 0; i < imgUrls.length && i < 6; i++) {
    try {
      const res = await fetch(imgUrls[i], {
        headers: { Referer: "https://detail.1688.com/" },
      });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      const ext = (imgUrls[i].match(/\.(jpg|jpeg|png|webp)/i)?.[1] || "jpg").toLowerCase().replace("jpeg", "jpg");
      const fname = `${parentSku}-${i + 1}.${ext}`;
      writeFileSync(join(outDir, fname), buf);
      saved++;
    } catch (e) {
      process.stderr.write(`  图片 ${i + 1} 下载失败: ${e.message}\n`);
    }
  }
  return saved;
}

async function scrape1688(url, page) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2000));
  // 滚动触发懒加载图片
  await page.evaluate(() => {
    window.scrollTo(0, 400);
    if (document.querySelector("[class*='Gallery']")) document.querySelector("[class*='Gallery']")?.scrollIntoView?.({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1500));

  const data = await page.evaluate(() => {
    const getText = (sel) => {
      const el = document.querySelector(sel);
      return el ? el.innerText?.trim() || "" : "";
    };

    // 商品标题：排除公司名（Co., Ltd、有限公司等），优先取含产品关键词的文本
    const isCompanyName = (s) =>
      !s || s.length < 5 || /Co\.,?\s*Ltd|有限公司|股份有限公司|Inc\.?$/i.test(s) || /^[A-Za-z\s,\.]+$/.test(s);
    const hasProductKeyword = (s) => /鱼竿|竿|钓|渔|杆|rod/i.test(s);
    const docTitle = document.title?.replace(/\s*[-|_]\s*1688.*$/i, "").trim() || "";
    const candidates = [
      docTitle,
      getText('[class*="productTitle"]'),
      getText('[class*="ProductTitle"]'),
      getText('[data-spm*="title"]'),
      getText(".detail-title"),
      getText(".detail-desc-decorate__title"),
      getText("h1"),
    ].filter(Boolean);
    let title = "";
    for (const t of candidates) {
      if (!isCompanyName(t) && t.length > 3) {
        title = t;
        if (hasProductKeyword(t)) break;
      }
    }
    if (!title) title = candidates.find((t) => !isCompanyName(t)) || "";

    const body = document.body?.innerText || "";

    // 轮播主图：优先从主图区域取，排除 logo/头像，要求尺寸够大
    const gallerySelectors = [
      '[class*="Gallery"]', '[class*="gallery"]', '[class*="mainPic"]', '[class*="MainPic"]',
      '.detail-gallery', '[class*="pic-list"]', '[class*="PicList"]', '.detail-main',
    ];
    let imgParents = [];
    for (const sel of gallerySelectors) {
      const els = document.querySelectorAll(sel);
      for (const el of els) {
        // 主图区通常在左侧，宽度较大
        const rect = el.getBoundingClientRect();
        if (rect.width > 200) imgParents.push(el);
      }
      if (imgParents.length > 0) break;
    }
    const searchRoot = imgParents.length > 0 ? imgParents[0] : document.body;
    const allImgs = [...searchRoot.querySelectorAll('img[src*="alicdn"], img[src*="cbu01"], img[data-src*="alicdn"], img[data-src*="cbu01"]')];
    const imgUrls = [];
    const seen = new Set();
    for (const img of allImgs) {
      let src = img.src || img.dataset?.src || img.getAttribute("data-src");
      if (!src || src.includes("avatar") || src.includes("icon") || src.includes("logo") || src.includes("default")) continue;
      src = src.replace(/_\d+x\d+\./, ".").replace(/_\d+\.(jpg|png|webp)/i, ".$1").split("?")[0];
      if (seen.has(src)) continue;
      seen.add(src);
      const w = img.naturalWidth || img.width || img.clientWidth || 0;
      if (w > 0 && w < 150) continue; // 跳过小图
      imgUrls.push(src);
    }
    let carouselUrls = imgUrls.slice(0, 8);
    // 若 DOM 未取到图，尝试从页面 __INITIAL_STATE__ 等 JSON 提取
    if (carouselUrls.length === 0) {
      const scripts = document.querySelectorAll("script");
      for (const script of scripts) {
        const text = script.textContent || "";
        const m = text.match(/"picUrl"\s*:\s*"([^"]+)"/) || text.match(/"pic_url"\s*:\s*"([^"]+)"/) || text.match(/picUrl["\s:]+(https?:\/\/[^"'\s]+)/);
        if (m) {
          let u = m[1].replace(/\\u002F/g, "/").replace(/\\\//g, "/");
          if (u.includes("alicdn") || u.includes("cbu01")) carouselUrls.push(u);
        }
        const arr = text.match(/"picUrl"\s*:\s*\[([^\]]+)\]/);
        if (arr) {
          const urls = arr[1].match(/https?:\/\/[^"'\s]+/g);
          if (urls) carouselUrls = urls.filter((u) => u.includes("alicdn") || u.includes("cbu01")).slice(0, 8);
        }
      }
    }

    return { title, body, imgCount: carouselUrls.length, imgUrls: carouselUrls };
  });

  const offerId = url.match(/offer\/(\d+)/)?.[1] || "NEW";
  let rawTitle = sanitizeTitle(data.title);
  const type = inferType(rawTitle);
  let lengthInch = parseLength(data.body);
  const weightG = parseWeight(data.body);

  // 从页面属性解析长度（如 "0.6米包碳可伸缩"）
  const lenM = data.body.match(/长度[：:]\s*(\d+\.?\d*)\s*米/);
  if (lenM) lengthInch = parseFloat(lenM[1]) * 39.37;
  const lenCm = data.body.match(/(\d+\.?\d*)\s*厘米/);
  if (lenCm) lengthInch = parseFloat(lenCm[1]) / 2.54;

  const collapsed = `${(lengthInch / 2).toFixed(2)}*1.18*1.18`;
  const displayPrice = ""; // 由后续 --translate 时根据价格填充

  return {
    parentSku: offerId,
    subSku: "无",
    type,
    lengthInch,
    collapsedDimensions: collapsed,
    weightG,
    title: rawTitle,
    shortTitle: shortTitle(rawTitle),
    displayPrice,
    _imgUrls: data.imgUrls || [],
    _priceCny: parse1688Price(data.body),
    _attrs: {},
  };
}

async function scrapeGeneric(url, page) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1500));

  const data = await page.evaluate(() => {
    const title = document.querySelector("h1")?.innerText?.trim()
      || document.querySelector("title")?.innerText?.split(/[|\-–]/)[0]?.trim()
      || "";
    const body = document.body?.innerText || "";
    const imgs = [...document.querySelectorAll("img[src]")].map((i) => i.src).slice(0, 6);
    return { title, body, imgCount: imgs.length };
  });

  const type = inferType(data.title);
  const lengthInch = parseLength(data.body);
  const weightG = parseWeight(data.body);
  const collapsed = `${(lengthInch / 2).toFixed(2)}*1.18*1.18`;
  const skuFromHost = new URL(url).hostname.replace(/\W/g, "").slice(0, 6).toUpperCase();

  return {
    parentSku: skuFromHost || "NEW",
    subSku: "无",
    type,
    lengthInch,
    collapsedDimensions: collapsed,
    weightG,
    title: sanitizeTitle(data.title),
    shortTitle: shortTitle(data.title),
    displayPrice: "",
  };
}

function toCsvRow(row) {
  return [
    csvEscape(row.parentSku),
    csvEscape(row.subSku),
    csvEscape(row.type),
    String(row.lengthInch),
    csvEscape(row.collapsedDimensions),
    String(row.weightG),
    csvEscape(row.title),
    csvEscape(row.shortTitle),
    csvEscape(row.displayPrice),
  ].join(",");
}

function collectUrls(args) {
  const batchIdx = args.indexOf("--batch");
  if (batchIdx !== -1) {
    const file = args[batchIdx + 1];
    if (!file || !existsSync(file)) {
      console.error("--batch 需要有效的文件路径");
      process.exit(1);
    }
    const text = readFileSync(file, "utf-8");
    return text.split(/\r?\n/).map((s) => s.trim()).filter((s) => s.startsWith("http"));
  }
  return args.filter((a) => a.startsWith("http")).map((u) => u.replace(/^["']|["']$/g, ""));
}


async function main() {
  const args = process.argv.slice(2);
  const urls = collectUrls(args);
  const skuOverrides = [];
  let idx = args.indexOf("--sku");
  while (idx !== -1 && args[idx + 1]) {
    skuOverrides.push(args[idx + 1]);
    idx = args.indexOf("--sku", idx + 2);
  }
  const append = args.includes("--append");
  const visible = args.includes("--visible");
  const doTranslate = args.includes("--translate");
  const doDownload = args.includes("--download-images");
  const cnyRateIdx = args.indexOf("--cny-rate");
  const cnyRate = (cnyRateIdx >= 0 && args[cnyRateIdx + 1] ? parseFloat(args[cnyRateIdx + 1]) : 7.2) || 7.2;

  if (urls.length === 0) {
    console.log(`
用法:
  node scripts/scrape-product.mjs "商品详情页链接"
  node scripts/scrape-product.mjs "链接" --sku TSG31    # 指定 parentSku
  node scripts/scrape-product.mjs "链接" --append       # 追加到 data/products.csv
  node scripts/scrape-product.mjs url1 url2 url3 --append   # 批量采集
  node scripts/scrape-product.mjs --batch urls.txt --append # 从文件读取 URL 列表
  node scripts/scrape-product.mjs "URL" --translate --download-images --cny-rate 7.2  # 翻译+下载图+价格转换

示例:
  node scripts/scrape-product.mjs "https://detail.1688.com/offer/610947572360.html"
  node scripts/scrape-product.mjs "https://..." "https://..." --append
  node scripts/scrape-product.mjs --batch urls.txt --append

依赖:
  npm install puppeteer
`);
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = await import("puppeteer");
  } catch {
    console.error("请先安装: npm install puppeteer");
    process.exit(1);
  }

  let browser;
  try {
    browser = await puppeteer.default.launch({
      headless: !visible,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } catch (e) {
    const sysChrome = process.platform === "win32"
      ? ["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"]
      : process.platform === "darwin"
        ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
        : ["/usr/bin/google-chrome", "/usr/bin/chromium"];
    const path = await import("path");
    const exe = sysChrome.find((p) => existsSync(p));
    if (!exe) {
      console.error("Chrome 未找到。请安装 Chrome 或运行: npx puppeteer browsers install chrome");
      process.exit(1);
    }
    browser = await puppeteer.default.launch({
      executablePath: exe,
      headless: !visible,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  const results = [];
  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setViewport({ width: 1280, height: 800 });

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const skuOverride = skuOverrides[i] ?? null;
      process.stderr.write(`[${i + 1}/${urls.length}] ${url.slice(0, 60)}…\n`);
      try {
        let row;
        if (url.includes("1688.com")) {
          row = await scrape1688(url, page);
        } else {
          row = await scrapeGeneric(url, page);
        }
        if (skuOverride) row.parentSku = skuOverride;
        if (row._priceCny != null && cnyRate > 0) {
          const priceUsd = cnyToUsd(row._priceCny * 3, cnyRate); // 1688 价 * 3 后转美元
          row.displayPrice = `$${priceUsd.toFixed(2)}/pc`;
        }
        if (doTranslate && row.title && /[\u4e00-\u9fa5]/.test(row.title)) {
          process.stderr.write("  翻译标题…\n");
          row.title = (await translateText(row.title)) || row.title;
          row.shortTitle = shortTitle(row.title);
        }
        if (doDownload && row._imgUrls?.length) {
          process.stderr.write(`  下载 ${row._imgUrls.length} 张图…\n`);
          await downloadImages(row._imgUrls, row.parentSku);
        }
        delete row._imgUrls;
        delete row._priceCny;
        delete row._attrs;
        results.push(row);
      } catch (e) {
        console.error(`  采集失败: ${e.message}`);
      }
    }

    if (results.length === 0) {
      console.log("\n无成功采集结果");
      return;
    }

    const lines = results.map((r) => toCsvRow(r));
    console.log("\n采集结果：\n");
    lines.forEach((l) => console.log(l));

    if (append && lines.length > 0) {
      appendFileSync(CSV_PATH, "\n" + lines.join("\n"), "utf-8");
      console.log(`\n已追加 ${lines.length} 行到 data/products.csv`);
    }

    console.log("\n提示：");
    console.log("- parentSku 需与 R2 图片目录名一致");
    console.log("- 新货需在 R2 上传 products/{parentSku}/ 下的图片");
    console.log("- 使用 --sku XXX 可按顺序覆盖 parentSku");
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error("\n采集失败:", e.message || e);
  if (e.message?.includes("CONNECTION") || e.message?.includes("ERR_")) {
    console.log("\n建议：");
    console.log("  1. 使用 --visible 弹出可见浏览器: node scripts/scrape-product.mjs \"URL\" --visible");
    console.log("  2. 检查网络/代理，1688 可能限制自动化访问");
    console.log("  3. 手动采集：打开链接，复制标题和规格，按 CSV 模板填入 data/products.csv");
  }
  process.exit(1);
});
