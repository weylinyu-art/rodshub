/**
 * Central SEO config - update SITE_URL when deploying to production
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rodshub.com";

export const SITE_NAME = "RodsHub";
export const SITE_DESCRIPTION =
  "B2B fishing rod marketplace. Source spinning, casting, telescopic, surf, ice & travel rods. Wholesale prices, OEM customization, 24h reply.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/hero-banner.jpeg`;

/** 分享时的推荐文案（具吸引力、引发点击欲） */
export const SHARE_RECOMMENDED_COPIES: Record<string, string> = {
  en: "I found a professional B2B fishing rod marketplace – 200+ SKUs, wholesale $8-18, 24h reply, OEM available. Tackle businesses, don't miss this! 👉",
  zh: "我发现了一个非常专业且有趣的网站，能一站式采购200+款渔竿，批发价$8-18起，24小时极速回复，还支持OEM定制。做渔具批发生意的朋友千万别错过！👉",
};

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

/** Organization schema - for knowledge panel & brand identity, AEO */
export const organizationSchema = {
  "@context": "https://schema.org" as const,
  "@type": "Organization" as const,
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject" as const, url: `${SITE_URL}/favicon.svg` },
  image: DEFAULT_OG_IMAGE,
  description: SITE_DESCRIPTION,
  foundingDate: "2024" as const,
  slogan: "The Global Marketplace for Fishing Rod Sourcing",
  knowsAbout: ["fishing rods", "B2B wholesale", "OEM manufacturing", "spinning rods", "casting rods", "telescopic rods", "surf rods", "ice fishing rods", "travel rods"],
  contactPoint: {
    "@type": "ContactPoint" as const,
    contactType: "customer service",
    email: "hello@rodshub.com",
    url: `${SITE_URL}/contact`,
    areaServed: "Worldwide",
    availableLanguage: ["English", "Spanish", "French", "German", "Arabic", "Russian", "Japanese", "Korean", "Portuguese"],
    hoursAvailable: { "@type": "HoursSpecification" as const, dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    contactOption: "TollFree",
    responseTime: "PT24H",
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
  description: "Step-by-step guide to sourcing fishing rods wholesale from RodsHub B2B marketplace. MOQ from 30 pcs, 24h reply.",
  totalTime: "P1D",
  estimatedCost: { "@type": "MonetaryAmount" as const, currency: "USD", value: "8-18" },
  step: [
    { "@type": "HowToStep" as const, position: 1, name: "Browse catalog", text: "Explore spinning, casting, telescopic, surf, ice and travel rods by category or fishing scenario." },
    { "@type": "HowToStep" as const, position: 2, name: "Submit inquiry", text: "Use the inquiry form with product details, MOQ and shipping destination." },
    { "@type": "HowToStep" as const, position: 3, name: "Receive quote", text: "Get a quotation within 24 hours with pricing and lead times." },
    { "@type": "HowToStep" as const, position: 4, name: "Confirm order", text: "Review and confirm. OEM customization available for custom branding." },
  ],
};

/** HowTo schema for AEO - OEM customization */
export const howToOEMSchema = {
  "@context": "https://schema.org" as const,
  "@type": "HowTo" as const,
  name: "How to Get OEM Fishing Rod Customization at RodsHub",
  description: "4-step process to create your own fishing rod brand: submit brief, design & sample, production, shipping.",
  step: [
    { "@type": "HowToStep" as const, position: 1, name: "Submit your brief", text: "Share your specs, target market and quantity via the OEM inquiry form." },
    { "@type": "HowToStep" as const, position: 2, name: "Design & sample", text: "We create prototypes for your approval. Samples typically ready in 7–14 days." },
    { "@type": "HowToStep" as const, position: 3, name: "Production", text: "Bulk manufacturing with quality control at each stage." },
    { "@type": "HowToStep" as const, position: 4, name: "Shipping", text: "Global logistics with branded packaging." },
  ],
};
