import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us | RodsHub",
  description:
    "Contact RodsHub: email, WhatsApp. 24-hour reply. B2B fishing rod sourcing, wholesale, OEM inquiries.",
  openGraph: buildOpenGraph(
    "Contact RodsHub | B2B Fishing Rod Sourcing",
    "Email, WhatsApp. 24-hour reply. B2B fishing rod sourcing.",
    "/contact"
  ),
  twitter: buildTwitter("Contact RodsHub", "24-hour reply. B2B fishing rod sourcing."),
  alternates: { canonical: absoluteUrl("/contact") },
};

const EMAIL = "hello@rodshub.com";
const WHATSAPP = "+86 19957106387";

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: "Contact Us", item: absoluteUrl("/contact") },
    ],
  };

  const contactPageSchema = {
    "@context": "https://schema.org" as const,
    "@type": "ContactPage" as const,
    name: "Contact RodsHub",
    description: "Reach RodsHub by email or WhatsApp. We reply within 24 hours.",
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "Organization" as const,
      name: "RodsHub",
      email: EMAIL,
      contactPoint: {
        "@type": "ContactPoint" as const,
        contactType: "customer service",
        email: EMAIL,
        telephone: WHATSAPP,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Spanish", "French", "German", "Arabic", "Russian", "Japanese", "Korean", "Portuguese"],
        hoursAvailable: { "@type": "HoursSpecification" as const, dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
      },
    },
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={[breadcrumbSchema, contactPageSchema]} />
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Contact Us</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-1 text-gray-600">Reach us by email or WhatsApp. We reply within 24 hours.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-2">Email</h2>
            <a href={`mailto:${EMAIL}`} className="text-gray-600 hover:text-black transition">
              {EMAIL}
            </a>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-2">WhatsApp</h2>
            <a href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition">
              {WHATSAPP}
            </a>
            <p className="mt-2 text-sm text-gray-500">Click to chat on WhatsApp. Business hours: Mon–Fri 9:00–18:00 (UTC+8)</p>
          </div>
          <Link href="/inquiry" className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
            Send Inquiry Form
          </Link>
        </div>
      </div>
    </main>
  );
}
