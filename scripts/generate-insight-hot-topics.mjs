#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import path from "node:path";

const SECTION_IDS = [
  "rod-guides",
  "techniques",
  "product-knowledge",
  "community-favorites",
  "sourcing-industry",
];

const FEEDS = [
  "https://www.reddit.com/r/Fishing/hot/.rss",
  "https://www.reddit.com/r/bassfishing/hot/.rss",
  "https://www.reddit.com/r/Fishing_Gear/hot/.rss",
  "https://www.reddit.com/r/surf_fishing/hot/.rss",
  "https://trends.google.com/trending/rss?geo=US",
  "https://news.google.com/rss/search?q=fishing+rod+setup&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=bass+fishing+rod+guide&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=surf+fishing+rod+tips&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=fishing+tackle+wholesale&hl=en-US&gl=US&ceid=US:en",
];

const FALLBACK_TOPICS = [
  "spinning rod setup",
  "casting rod action",
  "bass finesse rig",
  "crankbait rod",
  "travel rod choice",
  "surf rod weight",
  "guide insert durability",
  "oem rod branding",
  "moq negotiation",
  "supplier quality control",
  "inventory planning",
  "wholesale pricing",
  "line and lure matching",
  "winter rod demand",
  "topwater setup",
  "drop shot tuning",
  "warranty claim handling",
  "sample evaluation",
  "category mix strategy",
  "regional assortment",
];

const STOPWORDS = new Set([
  "the", "and", "for", "with", "that", "from", "this", "what", "your", "you", "are",
  "how", "why", "when", "where", "into", "about", "best", "new", "can", "will", "just",
  "its", "our", "out", "too", "not", "all", "any", "more", "than", "over", "under",
  "after", "before", "they", "them", "their", "have", "has", "had", "was", "were", "but",
  "reddit", "today", "thread", "post", "video", "official", "news",
]);

function sanitizeTopic(raw) {
  return raw
    .replace(/\s+/g, " ")
    .replace(/^\s+|\s+$/g, "")
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\([^)]*nsfw[^)]*\)/gi, "")
    .replace(/\s*\|\s*.*$/g, "")
    .replace(/\s*[-–—]\s*(reddit|r\/[a-z0-9_]+).*$/gi, "")
    .trim();
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function extractTitles(xml) {
  const titles = [];
  const regex = /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/gi;
  let match;
  while ((match = regex.exec(xml))) {
    const title = sanitizeTopic(decodeEntities(match[1] || ""));
    if (!title) continue;
    if (title.length < 8 || title.length > 120) continue;
    if (/^r\/[a-z0-9_]+$/i.test(title)) continue;
    if (/^reddit/i.test(title)) continue;
    titles.push(title);
  }
  return titles;
}

function pickTopics(rawTitles, count) {
  const unique = [];
  const seen = new Set();
  for (const title of rawTitles) {
    const normalized = title.toLowerCase();
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    unique.push(title);
  }

  const keywords = new Map();
  for (const t of unique) {
    const words = t.toLowerCase().match(/[a-z][a-z0-9'-]{2,}/g) || [];
    for (const w of words) {
      if (STOPWORDS.has(w)) continue;
      keywords.set(w, (keywords.get(w) || 0) + 1);
    }
  }

  const keywordPool = [...keywords.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([w]) => w)
    .slice(0, 80)
    .map((w) => `${w} strategy`);

  const merged = [...unique, ...keywordPool, ...FALLBACK_TOPICS];
  const topics = [];
  const used = new Set();
  for (const item of merged) {
    const clean = sanitizeTopic(item);
    if (!clean) continue;
    const key = clean.toLowerCase();
    if (used.has(key)) continue;
    used.add(key);
    topics.push(clean);
    if (topics.length >= count) break;
  }
  return topics;
}

function sectionTitle(sectionId, topic) {
  switch (sectionId) {
    case "rod-guides":
      return `${topic}: Rod Guide for Buyers`;
    case "techniques":
      return `${topic}: Technique Setup and Rod Pairing`;
    case "product-knowledge":
      return `${topic}: Product Quality and Spec Insight`;
    case "community-favorites":
      return `${topic}: What Anglers Are Discussing`;
    default:
      return `${topic}: B2B Sourcing Playbook`;
  }
}

function sectionChecklist(sectionId, topic) {
  switch (sectionId) {
    case "rod-guides":
      return [
        "map topic to rod length/power/action range",
        "define beginner and advanced SKU options",
        "connect guide to category and product pages",
        `use "${topic}" in FAQ-style comparison blocks`,
      ];
    case "techniques":
      return [
        "pair technique with line and lure ranges",
        "specify rod action for hook-up consistency",
        "add scenario-based setup examples",
        `build internal links around "${topic}" use cases`,
      ];
    case "product-knowledge":
      return [
        "translate specs to buyer-friendly language",
        "highlight QC checkpoints and return risks",
        "define component tiering by price band",
        `show how "${topic}" affects durability and conversion`,
      ];
    case "community-favorites":
      return [
        "summarize real discussion signals with buyer intent",
        "turn hot threads into practical recommendation cards",
        "attach seasonal and regional merchandising notes",
        `use "${topic}" for short-form social-to-SEO loops`,
      ];
    default:
      return [
        "align topic with MOQ, lead time, and cash-flow impact",
        "provide supplier and logistics decision checkpoints",
        "define launch and reorder timeline by demand season",
        `convert "${topic}" traffic into inquiry-focused pages`,
      ];
  }
}

function sectionPrefix(sectionId) {
  if (sectionId === "rod-guides") return "guide-hot";
  if (sectionId === "techniques") return "tech-hot";
  if (sectionId === "product-knowledge") return "pk-hot";
  if (sectionId === "community-favorites") return "cf-hot";
  return "si-hot";
}

function buildSeeds(sectionId, topics, perSection = 20) {
  const seeds = [];
  const prefix = sectionPrefix(sectionId);
  for (let i = 0; i < perSection; i += 1) {
    const topic = topics[i % topics.length];
    const index = String(i + 1).padStart(2, "0");
    const short = slugify(topic).split("-").slice(0, 4).join("-");
    seeds.push({
      id: `${prefix}-${index}-${short || "topic"}`,
      title: sectionTitle(sectionId, topic),
      angle: `reworked from live trend signals around "${topic}"`,
      buyerIntent: `buyers searching practical decisions based on "${topic}"`,
      checklist: sectionChecklist(sectionId, topic),
    });
  }
  return seeds;
}

async function fetchFeed(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "rodshub-hot-topic-bot/1.0 (+https://rodshub.com)",
      accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
    },
  });
  if (!response.ok) {
    throw new Error(`fetch failed ${response.status} for ${url}`);
  }
  return response.text();
}

async function main() {
  const feedTexts = await Promise.allSettled(FEEDS.map((url) => fetchFeed(url)));
  const allTitles = [];
  for (const result of feedTexts) {
    if (result.status !== "fulfilled") continue;
    allTitles.push(...extractTitles(result.value));
  }

  const topicPool = pickTopics(allTitles, 120);
  const generated = {};
  SECTION_IDS.forEach((sectionId, sectionIndex) => {
    const start = sectionIndex * 24;
    const slice = topicPool.slice(start, start + 24);
    const safeSlice = slice.length > 0 ? slice : FALLBACK_TOPICS;
    generated[sectionId] = buildSeeds(sectionId, safeSlice, 20);
  });

  const output = `/**
 * Auto-generated by scripts/generate-insight-hot-topics.mjs
 * Do not edit manually.
 */
export type GeneratedHotTopicSeed = {
  id: string;
  title: string;
  angle: string;
  buyerIntent: string;
  checklist: [string, string, string, string];
};

export const GENERATED_HOT_TOPIC_SEEDS: Record<string, GeneratedHotTopicSeed[]> = ${JSON.stringify(generated, null, 2)};\n`;

  const outputPath = path.resolve(process.cwd(), "data/insight-hot-topics.generated.ts");
  await writeFile(outputPath, output, "utf8");
  console.log(`Generated ${outputPath} with ${allTitles.length} raw hot titles`);
}

main().catch(async (error) => {
  console.warn(`[hot-topics] non-fatal generator fallback: ${error.message}`);
  // Keep build stable: write deterministic fallback seeds when all feeds fail.
  const generated = {};
  SECTION_IDS.forEach((sectionId) => {
    generated[sectionId] = buildSeeds(sectionId, FALLBACK_TOPICS, 20);
  });
  const output = `/**
 * Auto-generated fallback by scripts/generate-insight-hot-topics.mjs
 * Feed pull failed, fallback topics used.
 */
export type GeneratedHotTopicSeed = {
  id: string;
  title: string;
  angle: string;
  buyerIntent: string;
  checklist: [string, string, string, string];
};

export const GENERATED_HOT_TOPIC_SEEDS: Record<string, GeneratedHotTopicSeed[]> = ${JSON.stringify(generated, null, 2)};\n`;
  const outputPath = path.resolve(process.cwd(), "data/insight-hot-topics.generated.ts");
  await writeFile(outputPath, output, "utf8");
  console.log(`Generated fallback ${outputPath}`);
  process.exit(0);
});
