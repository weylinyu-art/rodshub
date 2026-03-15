import type { Metadata } from "next";
import Link from "next/link";
import OEMInquiryForm from "@/components/OEMInquiryForm";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, buildOpenGraph, buildTwitter, howToOEMSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "OEM Fishing Rod Customization | RodsHub",
  description:
    "Create your own fishing rod brand. OEM customization: logo, packaging, custom specs. 4-step process, samples in 7–14 days.",
  keywords: ["OEM fishing rod", "custom rod branding", "fishing rod manufacturing", "private label rods"],
  openGraph: buildOpenGraph(
    "OEM Fishing Rod Customization | RodsHub",
    "Create your own fishing rod brand. Logo, packaging, custom specs. Samples in 7–14 days.",
    "/oem"
  ),
  twitter: buildTwitter("OEM Fishing Rod Customization | RodsHub", "Create your own fishing rod brand."),
  alternates: { canonical: absoluteUrl("/oem") },
};

const steps = [
  { title: "Submit Your Brief", desc: "Share your specs, target market & quantity" },
  { title: "Design & Sample", desc: "We create prototypes for your approval" },
  { title: "Production", desc: "Bulk manufacturing with QC at each stage" },
  { title: "Shipping", desc: "Global logistics with branded packaging" },
];

export default function OEMPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: "OEM Customization", item: absoluteUrl("/oem") },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={[howToOEMSchema, breadcrumbSchema]} />
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">OEM Customization</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">OEM Fishing Rod Customization</h1>
          <p className="mt-1 text-gray-600">Create your own fishing rod brand in 4 simple steps</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-xl bg-gray-900 text-white flex items-center justify-center text-xl font-bold mb-4">
                {i + 1}
              </div>
              <h2 className="font-semibold text-gray-900">{step.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>

        <OEMInquiryForm />
      </div>
    </main>
  );
}
