"use client";

import { usePathname } from "next/navigation";
import ShareButtons from "./ShareButtons";
import { SITE_URL } from "@/lib/seo";

const DEFAULT_TITLE = "RodsHub – B2B Fishing Rod Marketplace";
const DEFAULT_DESC = "200+ SKUs, wholesale $8-18, 24h reply. OEM available. Source spinning, casting, telescopic, surf, ice & travel rods.";

export default function ShareCurrentPage() {
  const pathname = usePathname();
  const url = pathname ? `${SITE_URL}${pathname}` : SITE_URL;

  return (
    <ShareButtons
      url={url}
      title={DEFAULT_TITLE}
      description={DEFAULT_DESC}
      variant="compact"
      className="[&_a]:bg-gray-700 [&_a]:text-gray-200 [&_a:hover]:bg-gray-600 [&_a:hover]:text-white [&_button]:bg-gray-700 [&_button]:text-gray-200 [&_button:hover]:bg-gray-600 [&_button:hover]:text-white"
    />
  );
}
