/**
 * Central SEO config - update SITE_URL when deploying to production
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rodshub.com";

export const SITE_NAME = "RodsHub";
export const SITE_DESCRIPTION =
  "B2B fishing rod marketplace. Source spinning, casting, telescopic, surf, ice & travel rods. Wholesale prices, OEM customization, 24h reply.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/hero-banner.png`;

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/** Build OpenGraph metadata */
export function buildOpenGraph(
  title: string,
  description: string,
  path: string,
  image?: string
) {
  const url = absoluteUrl(path);
  return {
    type: "website" as const,
    url,
    title,
    description,
    siteName: SITE_NAME,
    images: [{ url: image || DEFAULT_OG_IMAGE }],
    locale: "en_US",
  };
}

/** Build Twitter card metadata */
export function buildTwitter(
  title: string,
  description: string,
  image?: string
) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: image ? [image] : undefined,
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
  contactPoint: {
    "@type": "ContactPoint" as const,
    contactType: "customer service",
    email: "hello@rodshub.com",
    availableLanguage: ["English", "Chinese", "Spanish", "French", "Arabic", "Russian"],
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
  potentialAction: {
    "@type": "SearchAction" as const,
    target: { "@type": "EntryPoint" as const, url: `${SITE_URL}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};
