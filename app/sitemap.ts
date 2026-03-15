import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllProductIds } from "@/lib/productRegistry";
import { categories } from "@/lib/categoryProducts";
import { SCENARIOS } from "@/lib/scenarios";
import { getAllInsightSlugs } from "@/lib/insights";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/rods`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/trending`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/oem`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/inquiry`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productPages: MetadataRoute.Sitemap = getAllProductIds().map((id) => ({
    url: `${base}/product/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const scenarioPages: MetadataRoute.Sitemap = SCENARIOS.map((s) => ({
    url: `${base}/scenario/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const insightPages: MetadataRoute.Sitemap = getAllInsightSlugs().map((slug) => ({
    url: `${base}/insights/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...scenarioPages,
    ...insightPages,
  ];
}
