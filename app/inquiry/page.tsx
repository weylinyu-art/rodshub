import type { Metadata } from "next";
import { Suspense } from "react";
import QuickInquiryForm from "@/components/QuickInquiryForm";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL, howToOrderSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Send Inquiry | RodsHub",
  description: "Submit your fishing rod sourcing inquiry. 24h reply. Product specs, MOQ, pricing.",
  keywords: ["fishing rod inquiry", "wholesale quote", "B2B sourcing", "rod supplier contact"],
  openGraph: buildOpenGraph("Send Inquiry | RodsHub", "24h reply on fishing rod sourcing.", "/inquiry"),
  alternates: { canonical: absoluteUrl("/inquiry") },
};

const breadcrumbSchema = {
  "@context": "https://schema.org" as const,
  "@type": "BreadcrumbList" as const,
  itemListElement: [
    { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem" as const, position: 2, name: "Send Inquiry", item: `${SITE_URL}/inquiry` },
  ],
};

export default function InquiryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={[howToOrderSchema, breadcrumbSchema]} />
      <Suspense fallback={<div className="min-h-[400px] animate-pulse" />}>
        <QuickInquiryForm />
      </Suspense>
    </main>
  );
}
