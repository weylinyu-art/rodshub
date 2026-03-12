"use client";

import { useState } from "react";

const CATEGORIES = [
  { name: "Spinning", slug: "spinning" },
  { name: "Casting", slug: "casting" },
  { name: "Telescopic", slug: "telescopic" },
  { name: "Surf", slug: "surf" },
  { name: "Ice Fishing", slug: "ice" },
  { name: "Travel", slug: "travel" },
];

const SCENARIOS = [
  { name: "Freshwater", slug: "freshwater" },
  { name: "Saltwater", slug: "saltwater" },
  { name: "Surf", slug: "surf" },
  { name: "Boat", slug: "boat" },
  { name: "Ice", slug: "ice" },
];

export default function Header() {
  const [openNav, setOpenNav] = useState<"categories" | "scenarios" | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black">RodsHub</span>
          </a>

          {/* Hybrid nav: Categories + Scenarios */}
          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setOpenNav("categories")}
              onMouseLeave={() => setOpenNav(null)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
                Categories
              </button>
              {openNav === "categories" && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-gray-200 shadow-lg py-2">
                  {CATEGORIES.map((c) => (
                    <a
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                    >
                      {c.name} Rods
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setOpenNav("scenarios")}
              onMouseLeave={() => setOpenNav(null)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
                Scenarios
              </button>
              {openNav === "scenarios" && (
                <div className="absolute top-full left-0 mt-0 w-40 bg-white border border-gray-200 shadow-lg py-2">
                  {SCENARIOS.map((s) => (
                    <a
                      key={s.slug}
                      href={`#${s.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="#trending" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              Trending
            </a>
            <a href="#wholesale" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              Wholesale
            </a>
            <a href="#insights" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              Insights
            </a>
            <a href="#inquiry" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              Inquiry
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#inquiry"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-black text-black text-sm font-medium hover:bg-gray-50 transition"
            >
              Send Inquiry
            </a>
            <a
              href="#trending"
              className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Browse Rods
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
