import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ - Sourcing Fishing Rods | RodsHub",
  description:
    "Frequently asked questions about RodsHub: MOQ, OEM, lead times, shipping, payment. B2B fishing rod sourcing answered.",
  keywords: ["fishing rod FAQ", "MOQ", "OEM", "lead time", "shipping", "B2B", "wholesale fishing rods", "how to order"],
  openGraph: buildOpenGraph(
    "FAQ - Sourcing Fishing Rods | RodsHub",
    "Frequently asked questions about RodsHub: MOQ, OEM, lead times, shipping, payment.",
    "/faq"
  ),
  twitter: buildTwitter(
    "FAQ - Sourcing Fishing Rods | RodsHub",
    "Frequently asked questions about RodsHub: MOQ, OEM, lead times, shipping, payment."
  ),
  alternates: { canonical: absoluteUrl("/faq") },
};

const FAQ_ITEMS = [
  { q: "What is the minimum order quantity (MOQ)?", a: "MOQ varies by product, typically from 30 to 500 pcs depending on the rod type. Bulk and wholesale orders receive better pricing." },
  { q: "Do you support OEM / custom branding?", a: "Yes. We offer full OEM customization including logo printing, packaging design, and custom rod specifications. Visit our OEM page to submit an inquiry." },
  { q: "What are the lead times?", a: "Standard orders: 15–30 days. Custom OEM orders: 30–60 days depending on complexity. Rush orders may be available—contact us for details." },
  { q: "Which countries do you ship to?", a: "We ship globally. We have experience exporting to North America, Europe, Asia, and Oceania. Shipping costs and timelines depend on destination." },
  { q: "How do I place an order?", a: "Use our inquiry form to submit your requirements. Our team will respond within 24 hours with a quotation and next steps." },
  { q: "What payment methods are accepted?", a: "We accept T/T (bank transfer), L/C, and other B2B payment terms. Payment details are provided upon order confirmation." },
  { q: "What types of fishing rods does RodsHub offer?", a: "RodsHub offers spinning rods, casting rods, telescopic rods, surf rods, ice fishing rods, and travel rods. We have 200+ SKUs across 6 categories for B2B wholesale." },
  { q: "How do I source fishing rods for wholesale?", a: "Browse our catalog by category or scenario, select products, and submit an inquiry with your MOQ and destination. We reply within 24 hours with pricing and availability." },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question" as const,
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: "FAQ", item: absoluteUrl("/faq") },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={[faqSchema, breadcrumbSchema]} />
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">FAQ</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="mt-1 text-gray-600">Common questions about sourcing fishing rods from RodsHub.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-2">{item.q}</h2>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <Link href="/inquiry" className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
            Send Inquiry
          </Link>
        </div>
      </div>
    </main>
  );
}
