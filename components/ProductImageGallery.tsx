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
    <div className="w-full min-w-0">
      {/* 主图 - 响应式：移动端全宽，桌面端最大 480px */}
      <div
        className="w-full max-w-[480px] aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden shrink-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[activeIndex]}
          alt={alt}
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 -mb-1 snap-x snap-mandatory">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded border overflow-hidden bg-white transition snap-center ${
                i === activeIndex ? "border-black ring-1 ring-black" : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt} - view ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
