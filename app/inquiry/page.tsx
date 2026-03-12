import type { Metadata } from "next";
import { Suspense } from "react";
import QuickInquiryForm from "@/components/QuickInquiryForm";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Send Inquiry | RodsHub",
  description: "Submit your fishing rod sourcing inquiry. 24h reply. Product specs, MOQ, pricing.",
  openGraph: buildOpenGraph("Send Inquiry | RodsHub", "24h reply on fishing rod sourcing.", "/inquiry"),
  alternates: { canonical: absoluteUrl("/inquiry") },
};

export default function InquiryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="min-h-[400px] animate-pulse" />}>
        <QuickInquiryForm />
      </Suspense>
    </main>
  );
}
