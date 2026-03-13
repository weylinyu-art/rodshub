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

const inquiryWebPageSchema = {
  "@context": "https://schema.org" as const,
  "@type": "WebPage" as const,
  url: absoluteUrl("/inquiry"),
  name: "Send Inquiry | RodsHub",
  description: "Submit your fishing rod sourcing inquiry. 24h reply. Product specs, MOQ, pricing.",
  speakable: {
    "@type": "SpeakableSpecification" as const,
    cssSelector: [".inquiry-speakable"],
  },
};

const HOW_TO_STEPS = [
  { title: "Browse catalog", text: "Explore spinning, casting, telescopic, surf, ice and travel rods." },
  { title: "Submit inquiry", text: "Use the inquiry form with product details, MOQ and shipping destination." },
  { title: "Receive quote", text: "Get a quotation within 24 hours with pricing and lead times." },
  { title: "Confirm order", text: "Review and confirm. OEM customization available." },
];

export default function InquiryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={[howToOrderSchema, breadcrumbSchema, inquiryWebPageSchema]} />
      {/* How it works - speakable for AEO / voice */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How to order</h2>
          <ol className="space-y-3">
            {HOW_TO_STEPS.map((step, i) => (
              <li key={i} className="inquiry-speakable flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-sm font-medium flex items-center justify-center">{i + 1}</span>
                <div>
                  <span className="font-medium text-gray-900">{step.title}</span>
                  <span className="text-gray-600"> — {step.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Suspense fallback={<div className="min-h-[400px] animate-pulse" />}>
        <QuickInquiryForm />
      </Suspense>
    </main>
  );
}
