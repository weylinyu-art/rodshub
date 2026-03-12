"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";

interface ProductCardProps extends Product {
  variant?: "default" | "trending" | "wholesale";
}

const inquiryHref = "/#inquiry";

export default function ProductCard({
  name,
  price,
  moq,
  image,
  images,
  badge,
  length,
  material,
  power,
  variant = "default",
}: ProductCardProps) {
  const showSpecs = variant === "trending" && (length || material || power);
  const showInquiryButton = variant === "trending";
  const imgList = (images && images.length > 0 ? images : [image]) as string[];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Link
      href={inquiryHref}
      className="group flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 hover:shadow-lg transition-all duration-200"
    >
      <div
        className="relative aspect-square overflow-hidden bg-gray-100"
        onMouseEnter={() => imgList.length > 1 && setActiveIndex((i) => (i + 1) % imgList.length)}
      >
        {imgList.map((src, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={i}
            src={src}
            alt={`${name} - ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:scale-105 ${
              i === activeIndex ? "opacity-100 z-0" : "opacity-0"
            }`}
          />
        ))}
        {badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white text-xs font-medium z-10">
            {badge}
          </span>
        )}
        {imgList.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {imgList.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i === activeIndex ? "bg-black" : "bg-white/80"}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-black transition text-sm">
          {name}
        </h3>
        {showSpecs && (
          <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-gray-500">
            {length && <span>{length}</span>}
            {material && <span>• {material}</span>}
            {power && <span>• {power}</span>}
          </div>
        )}
        <p className="mt-1 font-bold text-gray-900">{price}</p>
        {moq && <p className="mt-0.5 text-xs text-gray-500">MOQ: {moq}</p>}
        {showInquiryButton ? (
          <span className="mt-2 inline-flex justify-center px-3 py-1.5 bg-black text-white text-xs font-medium rounded hover:bg-gray-800 transition w-full pointer-events-none">
            Send Inquiry
          </span>
        ) : (
          <span className="mt-1.5 text-xs text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition">
            Inquiry →
          </span>
        )}
      </div>
    </Link>
  );
}
