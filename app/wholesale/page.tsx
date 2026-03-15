"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/** /wholesale 重定向到 /trending（方案 A：移除 Wholesale Tab） */
export default function WholesalePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/trending");
  }, [router]);
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-gray-600 mb-4">Redirecting to Trending...</p>
        <Link href="/trending" className="text-black font-medium underline hover:no-underline">
          Click here if not redirected
        </Link>
      </div>
    </main>
  );
}
