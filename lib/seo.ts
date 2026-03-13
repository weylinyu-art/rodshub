/**
 * Central SEO config - update SITE_URL when deploying to production
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rodshub.com";

export const SITE_NAME = "RodsHub";
export const SITE_DESCRIPTION =
  "B2B fishing rod marketplace. Source spinning, casting, telescopic, surf, ice & travel rods. Wholesale prices, OEM customization, 24h reply.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/hero-banner.jpeg`;

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/** OG image dimensions - 1200x630 recommended for social sharing */
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

/** Build OpenGraph metadata */
export function buildOpenGraph(
  title: string,
  description: string,
  path: string,
  image?: string
) {
  const url = absoluteUrl(path);
  const img = image || DEFAULT_OG_IMAGE;
  return {
    type: "website" as const,
    url,
    title,
    description,
    siteName: SITE_NAME,
    images: [{ url: img, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: SITE_NAME }],
    locale: "en_US",
  };
}

/** Build Twitter card metadata */
export function buildTwitter(
  title: string,
  description: string,
  image?: string
) {
  const img = image || DEFAULT_OG_IMAGE;
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [img],
  };
}

// ─── Default metadata (layout) ─────────────────────────────────────────────
export const defaultTitle =
  "RodsHub | The Global Marketplace for Fishing Rod Sourcing";
export const defaultDescription = SITE_DESCRIPTION;
export const defaultKeywords = [
  "fishing rod wholesale",
  "B2B fishing rods",
  "spinning rod supplier",
  "casting rod manufacturer",
  "telescopic fishing rod",
  "surf rod OEM",
  "ice fishing rod bulk",
  "travel fishing rod",
  "carbon fiber rod",
  "fishing rod sourcing",
  "rod wholesale China",
  "OEM fishing rod manufacturer",
  "rodshub",
];

export const openGraph = buildOpenGraph(
  defaultTitle,
  defaultDescription,
  "/"
);

export const twitterCard = buildTwitter(
  defaultTitle,
  defaultDescription,
  DEFAULT_OG_IMAGE
);

/** Organization schema - for knowledge panel & brand identity */
export const organizationSchema = {
  "@context": "https://schema.org" as const,
  "@type": "Organization" as const,
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: SITE_DESCRIPTION,
  foundingDate: "2024" as const,
  contactPoint: {
    "@type": "ContactPoint" as const,
    contactType: "customer service",
    email: "hello@rodshub.com",
    url: `${SITE_URL}/contact`,
    areaServed: "Worldwide",
    availableLanguage: ["English", "Spanish", "French", "German", "Arabic", "Russian", "Japanese", "Korean", "Portuguese"],
    hoursAvailable: { "@type": "HoursSpecification" as const, dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  },
};

/** WebSite schema - site search, sitelinks */
export const websiteSchema = {
  "@context": "https://schema.org" as const,
  "@type": "WebSite" as const,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction" as const,
    target: { "@type": "EntryPoint" as const, url: `${SITE_URL}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

/** HowTo schema for AEO - ordering process */
export const howToOrderSchema = {
  "@context": "https://schema.org" as const,
  "@type": "HowTo" as const,
  name: "How to Order Fishing Rods from RodsHub",
  description: "Step-by-step guide to sourcing fishing rods wholesale from RodsHub B2B marketplace.",
  step: [
    { "@type": "HowToStep" as const, name: "Browse catalog", text: "Explore spinning, casting, telescopic, surf, ice and travel rods." },
    { "@type": "HowToStep" as const, name: "Submit inquiry", text: "Use the inquiry form with product details, MOQ and shipping destination." },
    { "@type": "HowToStep" as const, name: "Receive quote", text: "Get a quotation within 24 hours with pricing and lead times." },
    { "@type": "HowToStep" as const, name: "Confirm order", text: "Review and confirm. OEM customization available." },
  ],
};
