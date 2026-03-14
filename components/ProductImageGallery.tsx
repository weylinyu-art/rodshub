"use client";

import { useState, useCallback, useRef, useEffect } from "react";

/** 商品详情页左侧多图轮播：支持左右箭头、缩略图、指示点、触摸滑动 */
export default function ProductImageGallery({
  images,
  alt,
  autoPlay = false,
  autoPlayInterval = 5000,
}: {
  images: string[];
  alt: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = images.length;
  const hasMultiple = total > 1;

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      setActiveIndex(next);
    },
    [total]
  );

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoPlayInterval);
  }, [activeIndex, goTo, autoPlayInterval]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoPlayInterval);
  }, [activeIndex, goTo, autoPlayInterval]);

  // 触摸滑动
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) goNext();
      else goPrev();
    }
  }, [goNext, goPrev]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0]?.clientX ?? e.touches[0]?.clientX ?? touchEndX.current;
  }, []);

  // 自动轮播
  useEffect(() => {
    if (!autoPlay || !hasMultiple || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, hasMultiple, isPaused, total, autoPlayInterval]);

  return (
    <div className="w-full min-w-0 group/carousel">
      {/* 主图轮播区域 */}
      <div
        className="relative w-full max-w-[480px] aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden shrink-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-300 ${
              i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={i === activeIndex ? alt : `${alt} - view ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* 左右箭头 - 多图时显示；桌面端悬停可见，移动端常显 */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 md:bg-white/90 md:hover:bg-white shadow-md flex items-center justify-center md:opacity-0 md:group-hover/carousel:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 text-white md:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 md:bg-white/90 md:hover:bg-white shadow-md flex items-center justify-center md:opacity-0 md:group-hover/carousel:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 text-white md:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* 指示点 - 多图时显示 */}
        {hasMultiple && total <= 12 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeIndex ? "bg-white shadow" : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 缩略图条 - 支持横向滚动，多图时显示 */}
      {hasMultiple && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 -mb-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded border overflow-hidden bg-white transition snap-center ${
                i === activeIndex ? "border-black ring-2 ring-black ring-offset-1" : "border-gray-200 hover:border-gray-400"
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
