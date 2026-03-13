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
      {/* How it works - left-right flowchart */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">How to order</h2>
          {/* Desktop: horizontal flowchart with arrows */}
          <div className="hidden md:block">
            <div className="flex items-stretch gap-2 lg:gap-4">
              {HOW_TO_STEPS.map((step, i) => (
                <div key={i} className="flex flex-1 items-center min-w-0">
                  {/* Step card */}
                  <div className="inquiry-speakable flex-1 flex flex-col items-center p-3 sm:p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-400 transition-all text-center">
                    <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs sm:text-sm font-bold shrink-0">{i + 1}</span>
                    <h3 className="mt-2 font-semibold text-gray-900 text-sm">{step.title}</h3>
                    <p className="mt-1 text-xs text-gray-600 leading-relaxed">{step.text}</p>
                  </div>
                  {/* Arrow between steps */}
                  {i < HOW_TO_STEPS.length - 1 && (
                    <div className="flex-shrink-0 w-6 lg:w-10 flex items-center justify-center text-gray-300">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Mobile: vertical stack with arrows */}
          <div className="md:hidden space-y-3">
            {HOW_TO_STEPS.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="inquiry-speakable w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  {i < HOW_TO_STEPS.length - 1 && (
                    <div className="flex-1 w-px min-h-[24px] bg-gray-200 my-1" aria-hidden />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-0.5 text-sm text-gray-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="min-h-[400px] animate-pulse" />}>
        <QuickInquiryForm />
      </Suspense>
    </main>
  );
}
