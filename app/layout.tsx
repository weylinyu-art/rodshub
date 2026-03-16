import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ClickCountsProvider } from "@/contexts/ClickCountsContext";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
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
    // google: "xxx",
    yandex: "d80b68c89ddd057e",
    other: {
      "msvalidate.01": "FF5C640EDE929FBE5184E1BA4B64140D",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 预连接图片源，减少首屏图片加载延迟 */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.rodshub.com" />
        <link rel="preconnect" href="https://categories.rodshub.com" />
        <link rel="preload" href="/hero-banner.jpeg" as="image" />
      </head>
      <body className="antialiased overflow-x-hidden">
        <GoogleAnalytics />
        <ScrollDepthTracker />
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <LanguageProvider>
          <ClickCountsProvider>
            <Header />
          <div className="pb-20 md:pb-0">
            {children}
          </div>
          <Footer />
          <MobileBottomNav />
          </ClickCountsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
