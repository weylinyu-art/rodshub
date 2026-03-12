import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About RodsHub | B2B Fishing Rod Marketplace",
  description:
    "RodsHub connects fishing rod wholesalers and retailers with quality manufacturers. Spinning, casting, telescopic, surf, ice & travel rods. Wholesale, OEM, export-ready.",
  openGraph: buildOpenGraph(
    "About RodsHub | B2B Fishing Rod Marketplace",
    "Global B2B marketplace for fishing rod sourcing. Wholesale, OEM, export.",
    "/about"
  ),
  twitter: buildTwitter("About RodsHub | B2B Fishing Rod Marketplace", "Global B2B marketplace for fishing rod sourcing."),
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">About Us</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">About RodsHub</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-6">
            RodsHub is the global B2B marketplace connecting fishing rod wholesalers and retailers with quality manufacturers.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            We offer a wide range of fishing rods across categories—spinning, casting, telescopic, surf, ice fishing, and travel rods—with competitive wholesale pricing and OEM customization options.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our mission is to simplify sourcing for businesses worldwide. Whether you need bulk orders, custom branding, or export-ready packaging, RodsHub is your one-stop hub for fishing rod procurement.
          </p>
          <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
