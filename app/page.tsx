import Hero from "@/components/Hero";
import ShopByCategory from "@/components/ShopByCategory";
import ProductCard from "@/components/ProductCard";
import ShopByFishingStyle from "@/components/ShopByFishingStyle";
import RodCollections from "@/components/RodCollections";
import WholesalePicks from "@/components/WholesalePicks";
import OEMCustomization from "@/components/OEMCustomization";
import QuickInquiryForm from "@/components/QuickInquiryForm";
import FishingInsights from "@/components/FishingInsights";
import { trendingRods, newArrivals } from "@/lib/products";

/** 卖场布局：大图 + 分类目录 + 货架展示 */
export default function Home() {
  return (
    <main className="bg-gray-50">
      <Hero />
      {/* 分类目录 - 市场入口 */}
      <ShopByCategory />
      {/* 货架区 1：畅销品 */}
      <section id="trending" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Trending Rods</h2>
          <p className="text-gray-500 mb-8">Top picks from our B2B marketplace</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trendingRods.map((rod, i) => (
              <ProductCard key={i} {...rod} variant="trending" />
            ))}
          </div>
        </div>
      </section>
      {/* 场景导航区 */}
      <ShopByFishingStyle />
      {/* 货架区 2：新品上架 */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">New Arrivals</h2>
          <p className="text-gray-500 mb-8">Just added to our catalog</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((rod, i) => (
              <ProductCard key={i} {...rod} />
            ))}
          </div>
        </div>
      </section>
      {/* 精选系列 */}
      <RodCollections />
      {/* 批发精选 */}
      <WholesalePicks />
      {/* 内容运营：Fishing Insights */}
      <FishingInsights />
      {/* OEM */}
      <OEMCustomization />
      {/* 询价表单 */}
      <QuickInquiryForm />
    </main>
  );
}
