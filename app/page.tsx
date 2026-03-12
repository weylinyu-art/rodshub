import Hero from "@/components/Hero";
import ShopByCategory from "@/components/ShopByCategory";
import ProductCard from "@/components/ProductCard";
import ShopByFishingStyle from "@/components/ShopByFishingStyle";
import RodCollections from "@/components/RodCollections";
import WholesalePicks from "@/components/WholesalePicks";
import OEMCustomization from "@/components/OEMCustomization";
import QuickInquiryForm from "@/components/QuickInquiryForm";
import { trendingRods, newArrivals } from "@/lib/products";

export default function Home() {
  return (
    <main>
      <Hero />
      <ShopByCategory />
      <section id="trending" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Fishing Rods</h2>
          <p className="text-gray-600 mb-12">Top picks from our B2B marketplace</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingRods.map((rod, i) => (
              <ProductCard key={i} {...rod} />
            ))}
          </div>
        </div>
      </section>
      <ShopByFishingStyle />
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrival Rods</h2>
          <p className="text-gray-600 mb-12">Just added to our catalog</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map((rod, i) => (
              <ProductCard key={i} {...rod} />
            ))}
          </div>
        </div>
      </section>
      <RodCollections />
      <WholesalePicks />
      <OEMCustomization />
      <QuickInquiryForm />
    </main>
  );
}
