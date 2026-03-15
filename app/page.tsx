import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ValueCards from "@/components/ValueCards";
import ShopByCategory from "@/components/ShopByCategory";
import ShopByFishingStyle from "@/components/ShopByFishingStyle";
import HomeFeaturedSection from "@/components/HomeFeaturedSection";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, buildOpenGraph, buildTwitter, howToOrderSchema } from "@/lib/seo";

const CompanyIntro = dynamic(() => import("@/components/CompanyIntro"), { ssr: true });
const OEMCustomization = dynamic(() => import("@/components/OEMCustomization"), { ssr: true });
const WhyRodsHub = dynamic(() => import("@/components/WhyRodsHub"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const HomeInsightsSection = dynamic(() => import("@/components/HomeInsightsSection"), { ssr: true });
const HomeCTA = dynamic(() => import("@/components/HomeCTA"), { ssr: true });

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
      <JsonLd data={howToOrderSchema} />
      <Hero />
      {/* 4 价值卡片 */}
      <ValueCards />
      {/* 分类目录 */}
      <ShopByCategory />
      {/* 场景导航 */}
      <ShopByFishingStyle />
      {/* 精选入口 - 4 个 Trending + 4 个 Wholesale 预览 */}
      <HomeFeaturedSection />
      {/* 新品预览 + Insights 入口（前置以增加内容感） */}
      <HomeInsightsSection />
      {/* 公司介绍 + 数据卡片 */}
      <CompanyIntro />
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
