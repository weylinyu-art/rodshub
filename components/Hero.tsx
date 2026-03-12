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
        const parallax = rect.top * 0.15;
        bgRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] overflow-hidden bg-black"
    >
      {/* Vibrant gradient overlay - SHEIN-inspired */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E31B6B]/95 via-[#FF6B6B]/90 to-[#FF8C42]/95 z-10" />
        <div className="absolute inset-0 flex items-end justify-center gap-4 sm:gap-8 px-4 pb-8 sm:pb-16 opacity-90">
          {[
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=400&fit=crop",
            "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&h=400&fit=crop",
            "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=200&h=400&fit=crop",
            "https://images.unsplash.com/photo-1559827260-dc66d43bef33?w=200&h=400&fit=crop",
            "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=200&h=400&fit=crop",
          ].map((src, i) => (
            <div
              key={i}
              className="w-16 sm:w-24 lg:w-32 h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden border-2 border-white/20 shadow-xl"
              style={{ opacity: 0.85 - i * 0.08 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-xl">
          One Hub.{" "}
          <span className="text-yellow-300">Endless Rods.</span>
        </h1>
        <p className="mt-6 text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto font-medium">
          The global marketplace for fishing rod sourcing
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#trending"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#E31B6B] text-lg font-bold rounded-full hover:bg-yellow-300 hover:text-black transition-all shadow-xl hover:scale-105"
          >
            Browse Rods
          </a>
          <a
            href="#inquiry"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-[#E31B6B] transition-all backdrop-blur-sm"
          >
            Send Inquiry
          </a>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/90 font-medium">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Bulk Orders
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            OEM Customization
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Global Shipping
          </span>
        </div>
      </div>
    </section>
  );
}
