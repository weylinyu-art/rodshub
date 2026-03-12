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
import { ARTICLES } from "@/lib/insights";

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
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Rods</h2>
              <p className="text-gray-500 mt-1">Top picks & wholesale deals</p>
            </div>
            <div className="flex gap-3">
              <Link href="/trending" className="text-sm font-semibold text-gray-900 hover:underline">
                View Trending →
              </Link>
              <Link href="/wholesale" className="text-sm font-semibold text-gray-900 hover:underline">
                View Wholesale →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trendingRods.slice(0, 4).map((rod) => (
              <ProductCard key={rod.id} {...rod} variant="trending" />
            ))}
            {wholesalePicks.slice(0, 4).map((rod) => (
              <ProductCard key={rod.id} {...rod} />
            ))}
          </div>
        </div>
      </section>
      {/* 公司介绍 + 数据卡片 */}
      <CompanyIntro />
      {/* 精选系列 */}
      <RodCollections />
      {/* 新品预览 + Insights 入口 */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
                <Link href="/category/spinning" className="text-sm font-semibold text-gray-600 hover:text-black">
                  Browse all →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {newArrivals.slice(0, 4).map((rod) => (
                  <ProductCard key={rod.id} {...rod} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Fishing Insights</h2>
              <p className="text-gray-600 mb-4">Industry knowledge for smarter sourcing</p>
              <div className="space-y-2">
                {ARTICLES.slice(0, 4).map((a) => (
                  <Link key={a.slug} href={`/insights#${a.slug}`} className="block text-gray-700 hover:text-black">
                    {a.title}
                  </Link>
                ))}
              </div>
              <Link href="/insights" className="mt-4 inline-block text-sm font-semibold text-gray-900 hover:underline">
                Read all articles →
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* OEM */}
      <OEMCustomization />
      {/* Why RodsHub */}
      <WhyRodsHub />
      {/* 买家评价 */}
      <Testimonials />
      {/* 询价 CTA */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to source?</h2>
          <p className="text-gray-600 mb-6">Send us your requirements. We reply within 24 hours.</p>
          <Link
            href="/inquiry"
            className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Send Inquiry
          </Link>
        </div>
      </section>
    </main>
  );
}
