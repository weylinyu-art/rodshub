"use client";

import { useState } from "react";

/** 固定尺寸图片区域，支持缩略图切换主图 */
export default function ProductImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {/* 主图 - 固定尺寸 480x480 */}
      <div
        className="w-[480px] max-w-full h-[480px] bg-white border border-gray-200 rounded-lg overflow-hidden shrink-0"
        style={{ minHeight: 420 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[activeIndex]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-16 h-16 rounded border overflow-hidden bg-white transition ${
                i === activeIndex ? "border-black ring-1 ring-black" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
