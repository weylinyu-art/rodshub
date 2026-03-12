import type { Metadata } from "next";
import { absoluteUrl, buildOpenGraph } from "@/lib/seo";
import WholesalePageContent from "@/components/WholesalePageContent";

export const metadata: Metadata = {
  title: "Wholesale Fishing Rods | Bulk Pricing | RodsHub",
  description: "Wholesale fishing rods with bulk savings. MOQ from 30 pcs. Spinning, casting, telescopic, surf. RodsHub B2B marketplace.",
  openGraph: buildOpenGraph("Wholesale Fishing Rods | RodsHub", "Bulk pricing, MOQ 30+. Best-value rods.", "/wholesale"),
  alternates: { canonical: absoluteUrl("/wholesale") },
};

export default function WholesalePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <WholesalePageContent />
    </main>
  );
}
