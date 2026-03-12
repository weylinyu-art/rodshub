import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { INSIGHT_SECTIONS } from "@/lib/insights";
import InsightSectionListContent from "@/components/InsightSectionListContent";
import { absoluteUrl, buildOpenGraph, buildTwitter, SITE_URL } from "@/lib/seo";

const VALID_SECTION_IDS = INSIGHT_SECTIONS.map((s) => s.id);

interface PageProps {
  params: Promise<{ sectionId: string }>;
}

export function generateStaticParams() {
  return VALID_SECTION_IDS.map((sectionId) => ({ sectionId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sectionId } = await params;
  if (!VALID_SECTION_IDS.includes(sectionId)) return { title: "Not Found" };

  const section = INSIGHT_SECTIONS.find((s) => s.id === sectionId)!;
  const title = `${section.title} | RodsHub Insights`;
  const desc = section.description;

  return {
    title,
    description: desc,
    openGraph: buildOpenGraph(title, desc, `/insights/section/${sectionId}`),
    twitter: buildTwitter(title, desc),
    alternates: { canonical: absoluteUrl(`/insights/section/${sectionId}`) },
  };
}

export default async function InsightSectionPage({ params }: PageProps) {
  const { sectionId } = await params;
  if (!VALID_SECTION_IDS.includes(sectionId)) notFound();

  const section = INSIGHT_SECTIONS.find((s) => s.id === sectionId)!;
  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: "Fishing Insights", item: absoluteUrl("/insights") },
      { "@type": "ListItem" as const, position: 3, name: section.title, item: absoluteUrl(`/insights/section/${sectionId}`) },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={[breadcrumbSchema]} />
      <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
        <InsightSectionListContent sectionId={sectionId} />
      </Suspense>
    </main>
  );
}
