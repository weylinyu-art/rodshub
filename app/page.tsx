import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import ValueCards from "@/components/ValueCards";
import ShopByCategory from "@/components/ShopByCategory";
import ProductCard from "@/components/ProductCard";
import ShopByFishingStyle from "@/components/ShopByFishingStyle";
import CompanyIntro from "@/components/CompanyIntro";
import RodCollections from "@/components/RodCollections";
import OEMCustomization from "@/components/OEMCustomization";
import WhyRodsHub from "@/components/WhyRodsHub";
import Testimonials from "@/components/Testimonials";
import { trendingRods, newArrivals, wholesalePicks } from "@/lib/products";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";
import HomeFeaturedSection from "@/components/HomeFeaturedSection";
import HomeInsightsSection from "@/components/HomeInsightsSection";
import HomeCTA from "@/components/HomeCTA";

export const metadata: Metadata = {
  title: "RodsHub | B2B Fishing Rod Wholesale & OEM Marketplace",
  description:
    "Source fishing rods at wholesale: spinning, casting, telescopic, surf, ice & travel. 200+ SKUs, MOQ from 30 pcs, 24h reply. OEM custom branding available.",
  keywords: [
    "fishing rod wholesale",
    "B2B fishing rods",
    "spinning rod supplier",
    "casting rod manufacturer",
    "OEM fishing rod",
    "rodshub",
  ],
  openGraph: buildOpenGraph(
    "RodsHub | B2B Fishing Rod Wholesale & OEM Marketplace",
    "Source fishing rods at wholesale. 200+ SKUs, MOQ from 30 pcs. OEM custom branding.",
    "/"
  ),
  twitter: buildTwitter(
    "RodsHub | B2B Fishing Rod Wholesale Marketplace",
    "Source fishing rods at wholesale. 200+ SKUs, OEM available."
  ),
  alternates: { canonical: absoluteUrl("/") },
};

/** 首页：入口导向，信任模块，各模块跳转独立页面 */
export default function Home() {
  return (
    <main className="bg-gray-50">
      <Hero />
      {/* 4 价值卡片 */}
      <ValueCards />
      {/* 分类目录 */}
      <ShopByCategory />
      {/* 场景导航 */}
      <ShopByFishingStyle />
      {/* 精选入口 - 4 个 Trending + 4 个 Wholesale 预览 */}
      <HomeFeaturedSection />
      {/* 公司介绍 + 数据卡片 */}
      <CompanyIntro />
      {/* 精选系列 */}
      <RodCollections />
      {/* 新品预览 + Insights 入口 */}
      <HomeInsightsSection />
      {/* OEM */}
      <OEMCustomization />
      {/* Why RodsHub */}
      <WhyRodsHub />
      {/* 买家评价 */}
      <Testimonials />
      {/* 询价 CTA */}
      <HomeCTA />
    </main>
  );
}
