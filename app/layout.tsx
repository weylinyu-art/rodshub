import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  defaultTitle,
  defaultDescription,
  defaultKeywords,
  openGraph,
  twitterCard,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: "%s | RodsHub",
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    ...openGraph,
    type: "website",
    locale: "en_US",
    siteName: "RodsHub",
  },
  twitter: {
    ...twitterCard,
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Add Google Search Console / Bing verification when available
    // google: "xxx",
    // yandex: "xxx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
