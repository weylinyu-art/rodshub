import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { wholesalePicks } from "@/lib/products";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Wholesale Fishing Rods | Bulk Pricing | RodsHub",
  description: "Wholesale fishing rods with bulk savings. MOQ from 30 pcs. Spinning, casting, telescopic, surf. RodsHub B2B marketplace.",
  openGraph: buildOpenGraph("Wholesale Fishing Rods | RodsHub", "Bulk pricing, MOQ 30+. Best-value rods.", "/wholesale"),
  alternates: { canonical: absoluteUrl("/wholesale") },
};

export default function WholesalePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Wholesale</span>
          </nav>
          <span className="inline-block px-3 py-1 bg-gray-900 text-white text-sm font-semibold rounded mb-3">Bulk Savings</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Wholesale Picks</h1>
          <p className="mt-1 text-gray-600">
            Best-value rods for bulk orders & competitive pricing · MOQ from 30 pcs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {wholesalePicks.map((rod) => (
            <ProductCard key={rod.id} {...rod} variant="trending" />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-600 mb-4">Need custom MOQ or branding? We support OEM.</p>
          <Link
            href="/inquiry"
            className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Send Inquiry
          </Link>
        </div>
      </div>
    </main>
  );
}
