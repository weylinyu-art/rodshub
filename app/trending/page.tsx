import type { Metadata } from "next";
import { absoluteUrl, buildOpenGraph } from "@/lib/seo";
import TrendingPageContent from "@/components/TrendingPageContent";

export const metadata: Metadata = {
  title: "Trending Fishing Rods | RodsHub",
  description: "Top trending fishing rods. Best sellers and hot deals. B2B wholesale from RodsHub.",
  openGraph: buildOpenGraph("Trending Fishing Rods | RodsHub", "Best sellers and hot deals for wholesalers.", "/trending"),
  alternates: { canonical: absoluteUrl("/trending") },
};

export default function TrendingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <TrendingPageContent />
    </main>
  );
}
