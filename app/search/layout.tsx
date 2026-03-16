import type { Metadata } from "next";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search Fishing Rods | RodsHub B2B Wholesale",
  description:
    "Search 2000+ wholesale fishing rods on RodsHub. Find spinning, casting, telescopic, surf, ice and travel rods by type, material or power. B2B pricing, OEM available.",
  keywords: [
    "search fishing rods",
    "wholesale fishing rod search",
    "find fishing rod supplier",
    "B2B fishing rod catalog",
    "spinning rod search",
    "casting rod search",
  ],
  openGraph: buildOpenGraph(
    "Search Fishing Rods | RodsHub B2B Wholesale",
    "Search 2000+ wholesale fishing rods. B2B pricing, OEM available.",
    "/search"
  ),
  twitter: buildTwitter(
    "Search Fishing Rods | RodsHub B2B Wholesale",
    "Search 2000+ wholesale fishing rods. B2B pricing, OEM available."
  ),
  alternates: { canonical: absoluteUrl("/search") },
  robots: { index: true, follow: true },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
