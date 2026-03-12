"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom > 0) {
        const parallax = rect.top * 0.12;
        bgRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[75vh] lg:min-h-[85vh] overflow-hidden bg-gray-900"
    >
      {/* Large marketplace image + shelf overlay */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop"
            alt="Fishing rods"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>
        {/* Market shelf - rod display */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 sm:gap-6 px-4 pb-6 sm:pb-12 lg:pb-16">
          {[
            "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&h=400&fit=crop",
            "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=200&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559827260-dc66d43bef33?w=200&h=400&fit=crop",
            "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=200&h=400&fit=crop",
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=400&fit=crop",
            "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=400&fit=crop",
          ].map((src, i) => (
            <div
              key={i}
              className="w-12 sm:w-20 lg:w-28 h-36 sm:h-48 lg:h-64 rounded overflow-hidden border border-white/30 bg-white/5"
              style={{ opacity: 0.9 - i * 0.06 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover object-top" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-[75vh] lg:min-h-[85vh] px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          One Hub. Endless Rods.
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-gray-300 max-w-xl mx-auto">
          The global marketplace for fishing rod sourcing
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="#trending"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-base font-semibold hover:bg-gray-100 transition"
          >
            Browse Rods
          </a>
          <a
            href="#inquiry"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white text-base font-semibold hover:bg-white hover:text-black transition"
          >
            Send Inquiry
          </a>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            Bulk Orders
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            OEM Customization
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            Global Shipping
          </span>
        </div>
      </div>
    </section>
  );
}
