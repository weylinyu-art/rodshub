"use client";

import Link from "next/link";
import { useMemo } from "react";
import { recordClick, catTabKey, scenTabKey, sortByClickCount } from "@/lib/clickTracking";
import { useClickCounts } from "@/contexts/ClickCountsContext";

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
  const counts = useClickCounts();
  const getKey = (t: TabItem) => (mode === "category" ? catTabKey(t.slug) : scenTabKey(t.slug));
  const sortedTabs = useMemo(() => {
    const allTab = tabs.find((t) => t.slug === "all");
    const rest = tabs.filter((t) => t.slug !== "all");
    const sortedRest = sortByClickCount(rest, getKey, counts);
    return allTab ? [allTab, ...sortedRest] : sortedRest;
  }, [tabs, mode, counts]);

  const handleTabClick = (t: TabItem) => {
    const key = getKey(t);
    if (key) recordClick(key);
  };

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {sortedTabs.map((t) => {
        const isActive = t.slug === activeSlug;
        return (
          <Link
            key={t.slug}
            href={href(mode, t.slug)}
            onClick={() => handleTabClick(t)}
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
