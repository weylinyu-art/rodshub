import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

interface ArticleProductRecommendationProps {
  products: (Product & { id: string })[];
}

export default function ArticleProductRecommendation({
  products,
}: ArticleProductRecommendationProps) {
  if (products.length === 0) return null;

  return (
    <aside className="my-10 rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Product Recommendation
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Explore these rods from our catalog. Contact us for wholesale pricing.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} variant="trending" />
        ))}
      </div>
      <Link
        href="/trending"
        className="mt-4 inline-block text-sm font-medium text-gray-700 hover:text-black"
      >
        Browse all rods →
      </Link>
    </aside>
  );
}
