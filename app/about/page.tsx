import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About RodsHub | B2B Fishing Rod Wholesale Marketplace",
  description:
    "RodsHub is a global B2B marketplace for fishing rod sourcing. We connect wholesalers and retailers with quality manufacturers in China. 2000+ SKUs, MOQ 30 pcs, OEM customization, 24h reply.",
  keywords: [
    "about RodsHub",
    "fishing rod wholesale marketplace",
    "B2B fishing rod supplier",
    "China fishing rod manufacturer",
    "fishing rod OEM company",
    "wholesale fishing rod sourcing platform",
    "fishing tackle B2B",
  ],
  openGraph: buildOpenGraph(
    "About RodsHub | B2B Fishing Rod Wholesale Marketplace",
    "Global B2B marketplace for fishing rod sourcing. 2000+ SKUs, MOQ 30 pcs, OEM, 24h reply.",
    "/about"
  ),
  twitter: buildTwitter(
    "About RodsHub | B2B Fishing Rod Wholesale Marketplace",
    "Global B2B marketplace for fishing rod sourcing. 2000+ SKUs, MOQ 30 pcs, OEM, 24h reply."
  ),
  alternates: { canonical: absoluteUrl("/about") },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: "About RodsHub",
  description:
    "RodsHub is a global B2B marketplace connecting fishing rod wholesalers and retailers with quality manufacturers.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  },
};

const expandedOrgSchema = {
  ...organizationSchema,
  sameAs: [
    "https://www.facebook.com/rodshub",
    "https://twitter.com/rodshub",
    "https://www.linkedin.com/company/rodshub",
  ],
  numberOfEmployees: { "@type": "QuantitativeValue", value: "10-50" },
  areaServed: "Worldwide",
  serviceType: ["B2B Wholesale", "OEM Manufacturing", "Fishing Rod Sourcing", "Private Label"],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={expandedOrgSchema} />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-gray-900 font-medium">About Us</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">About RodsHub</h1>
          <p className="mt-2 text-gray-600">Global B2B Marketplace for Fishing Rod Wholesale &amp; OEM</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Who we are */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            RodsHub is a global B2B marketplace that connects fishing rod wholesalers, retailers, and brand owners
            with quality manufacturers. Founded in 2024, we bring together a curated catalog of over 2,000 SKUs—
            spanning spinning, casting, telescopic, surf, ice fishing, and travel rods—all sourced from verified
            factories in China.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our platform is purpose-built for businesses: importers, distributors, fishing tackle brands, and
            sporting goods retailers who need reliable supply at competitive wholesale prices.
          </p>
        </section>

        {/* What we offer */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Wholesale Supply", desc: "2,000+ SKUs from $1–$10/pc. MOQ from 30 pieces. Bulk pricing available for larger orders." },
              { title: "OEM Customization", desc: "Private label, custom rod blanks, branding, and export-ready packaging. 7–14 day sample turnaround." },
              { title: "Rod Categories", desc: "Spinning, casting, telescopic, surf, ice fishing, and travel rods in carbon fiber, fiberglass, and composite materials." },
              { title: "Fast Response", desc: "24-hour reply to all inquiries. Dedicated sourcing team available Monday–Friday, 09:00–18:00 UTC+8." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why RodsHub */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Why Source Through RodsHub</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-black shrink-0" /><span><strong>Verified manufacturers</strong> – every factory in our network undergoes quality and compliance screening.</span></li>
            <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-black shrink-0" /><span><strong>Transparent pricing</strong> – wholesale price lists available on request, no hidden fees.</span></li>
            <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-black shrink-0" /><span><strong>Export-ready logistics</strong> – we handle packaging, labeling, and freight coordination for global shipping.</span></li>
            <li className="flex items-start gap-2"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-black shrink-0" /><span><strong>Multi-language support</strong> – our team communicates in English, Chinese, and major European languages.</span></li>
          </ul>
        </section>

        {/* CTA + internal links */}
        <section className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Ready to Start Sourcing?</h2>
          <p className="text-gray-600 mb-4">
            Explore our catalog or get in touch with our sourcing team. We reply within 24 hours.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/rods/category" className="px-5 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition text-sm">
              Browse All Rods
            </Link>
            <Link href="/inquiry" className="px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-500 hover:text-black transition text-sm">
              Send Inquiry
            </Link>
            <Link href="/oem" className="px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-500 hover:text-black transition text-sm">
              OEM Customization
            </Link>
            <Link href="/contact" className="px-5 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-500 hover:text-black transition text-sm">
              Contact Us
            </Link>
          </div>
        </section>

        {/* Quick facts for GEO / AI snippets */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h2>
          <dl className="grid sm:grid-cols-2 gap-3">
            {[
              { dt: "Founded", dd: "2024" },
              { dt: "Catalog Size", dd: "2,000+ SKUs" },
              { dt: "MOQ", dd: "From 30 pieces" },
              { dt: "Wholesale Price Range", dd: "$1–$10 per piece" },
              { dt: "OEM Sample Time", dd: "7–14 business days" },
              { dt: "Response Time", dd: "Within 24 hours" },
              { dt: "Markets Served", dd: "Worldwide" },
              { dt: "Contact", dd: "hello@rodshub.com" },
            ].map(({ dt, dd }) => (
              <div key={dt} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                <dt className="font-medium text-gray-700">{dt}</dt>
                <dd className="text-gray-600">{dd}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
