"use client";

import { useState } from "react";
import Link from "next/link";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-black">RodsHub</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setOpenNav("categories")}
              onMouseLeave={() => setOpenNav(null)}
            >
              <button
                type="button"
                onClick={() => setOpenNav((v) => (v === "categories" ? null : "categories"))}
                className="px-4 py-2 text-gray-700 hover:text-black font-medium transition"
              >
                Categories
              </button>
              {openNav === "categories" && (
                <div className="absolute top-full left-0 pt-1">
                  <div className="w-48 bg-white border border-gray-200 shadow-lg py-2">
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/category/${c.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                      >
                        {c.name} Rods
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setOpenNav("scenarios")}
              onMouseLeave={() => setOpenNav(null)}
            >
              <button
                type="button"
                onClick={() => setOpenNav((v) => (v === "scenarios" ? null : "scenarios"))}
                className="px-4 py-2 text-gray-700 hover:text-black font-medium transition"
              >
                Scenarios
              </button>
              {openNav === "scenarios" && (
                <div className="absolute top-full left-0 pt-1">
                  <div className="w-40 bg-white border border-gray-200 shadow-lg py-2">
                    {SCENARIOS.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/scenario/${s.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/trending" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              Trending
            </Link>
            <Link href="/wholesale" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              Wholesale
            </Link>
            <Link href="/insights" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              Insights
            </Link>
            <Link href="/inquiry" className="px-4 py-2 text-gray-700 hover:text-black font-medium transition">
              Inquiry
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/inquiry"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-black text-black text-sm font-medium hover:bg-gray-50 transition"
            >
              Send Inquiry
            </Link>
            <Link
              href="/trending"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Browse Rods
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-gray-700 hover:text-black"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-1">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Categories</p>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black"
                >
                  {c.name} Rods
                </Link>
              ))}
              <p className="px-4 py-2 mt-2 text-xs font-semibold text-gray-500 uppercase">Sections</p>
              <Link href="/trending" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black">
                Trending
              </Link>
              <Link href="/wholesale" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black">
                Wholesale
              </Link>
              <Link href="/insights" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black">
                Insights
              </Link>
              <Link href="/inquiry" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black">
                Inquiry
              </Link>
              <p className="px-4 py-2 mt-2 text-xs font-semibold text-gray-500 uppercase">Scenarios</p>
              {SCENARIOS.map((s) => (
                <Link
                  key={s.slug}
                  href={`/scenario/${s.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-black"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
