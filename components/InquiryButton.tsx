"use client";

import Link from "next/link";
import { gtagEvent } from "@/lib/gtag";

interface InquiryButtonProps {
  source: string;
  label?: string;
  className?: string;
}

/** 带 GA4 inquiry_click 追踪的询盘按钮，可在 Server Component 中直接使用 */
export default function InquiryButton({
  source,
  label = "Send Inquiry",
  className = "inline-flex items-center justify-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition",
}: InquiryButtonProps) {
  return (
    <Link
      href="/inquiry"
      onClick={() => gtagEvent("inquiry_click", { source })}
      className={className}
    >
      {label}
    </Link>
  );
}
