"use client";

import Link from "next/link";

export type TabItem = { slug: string; name: string };

interface RodsTabBarProps {
  tabs: TabItem[];
  mode: "category" | "scenario";
  activeSlug: string;
}

function href(mode: "category" | "scenario", slug: string): string {
  return slug === "all" ? `/rods/${mode}` : `/rods/${mode}/${slug}`;
}

export default function RodsTabBar({ tabs, mode, activeSlug }: RodsTabBarProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {tabs.map((t) => {
        const isActive = t.slug === activeSlug;
        return (
          <Link
            key={t.slug}
            href={href(mode, t.slug)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              isActive ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"
            }`}
          >
            {t.name}
          </Link>
        );
      })}
    </div>
  );
}
