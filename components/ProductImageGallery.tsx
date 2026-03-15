"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { dedupeImagesByBase } from "@/lib/imageUtils";

/** 图片加载失败时的占位图（渔竿图） */
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1529230117010-b6c436154f25?w=500&h=500&fit=crop";

/** 商品详情页左侧多图轮播：支持左右箭头、缩略图、指示点、触摸滑动 */
export default function ProductImageGallery({
  images,
  alt,
  fallbackImage = FALLBACK_IMAGE,
  autoPlay = false,
  autoPlayInterval = 5000,
}: {
  images: string[];
  alt: string;
  fallbackImage?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /** 按 base URL 去重：同一张图的不同裁剪视为重复，仅当有超过 1 张不同图时才显示轮播控件 */
  const uniqueImages = dedupeImagesByBase(images);
  const total = uniqueImages.length;
  const hasMultiple = total > 1;

  const handleImageError = useCallback((src: string) => {
    setFailedUrls((prev) => new Set(prev).add(src));
  }, []);

  const getEffectiveSrc = useCallback(
    (src: string) => (failedUrls.has(src) ? fallbackImage : src),
    [failedUrls, fallbackImage]
  );

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      setActiveIndex(next);
    },
    [total]
  );

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => ((prev - 1) % total + total) % total);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoPlayInterval);
  }, [total, autoPlayInterval]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoPlayInterval);
  }, [total, autoPlayInterval]);

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

  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  /** 原生 touchend + passive:false，确保触屏首次点击即响应（React 合成 touch 事件 passive 时 preventDefault 无效） */
  useEffect(() => {
    if (!hasMultiple) return;
    const prev = prevBtnRef.current;
    const next = nextBtnRef.current;
    if (!prev || !next) return;
    const onPrev = (e: TouchEvent) => {
      e.preventDefault();
      goPrev();
    };
    const onNext = (e: TouchEvent) => {
      e.preventDefault();
      goNext();
    };
    prev.addEventListener("touchend", onPrev, { passive: false });
    next.addEventListener("touchend", onNext, { passive: false });
    return () => {
      prev.removeEventListener("touchend", onPrev);
      next.removeEventListener("touchend", onNext);
    };
  }, [hasMultiple, goPrev, goNext]);

  return (
    <div className="w-full min-w-0 group/carousel touch-manipulation">
      {/* 主图轮播区域 */}
      <div
        className="relative w-full max-w-[480px] aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden shrink-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {uniqueImages.map((src, i) => {
          const effectiveSrc = failedUrls.has(src) ? fallbackImage : src;
          return (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-300 ${
                i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={effectiveSrc}
                alt={i === activeIndex ? alt : `${alt} - view ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover"
                onError={() => setFailedUrls((prev) => new Set(prev).add(src))}
              />
            </div>
          );
        })}

        {/* 左右箭头 - 多图时显示；桌面端悬停可见 */}
        {hasMultiple && (
          <>
            <button
              ref={prevBtnRef}
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 md:opacity-0 md:group-hover/carousel:opacity-100 md:bg-white/90 md:hover:bg-white shadow-md flex items-center justify-center transition-opacity touch-manipulation"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 text-white md:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              ref={nextBtnRef}
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 md:opacity-0 md:group-hover/carousel:opacity-100 md:bg-white/90 md:hover:bg-white shadow-md flex items-center justify-center transition-opacity touch-manipulation"
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
            {uniqueImages.map((_, i) => (
              <ThumbOrDotButton
                key={i}
                onClick={() => setActiveIndex(i)}
                ariaLabel={`Go to image ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors touch-manipulation ${
                  i === activeIndex ? "bg-white shadow" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 缩略图条 - 支持横向滚动，多图时显示 */}
      {hasMultiple && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 -mb-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent touch-manipulation">
          {uniqueImages.map((src, i) => {
            const effectiveSrc = failedUrls.has(src) ? fallbackImage : src;
            return (
              <ThumbOrDotButton
                key={i}
                onClick={() => setActiveIndex(i)}
                ariaLabel={`${alt} - view ${i + 1}`}
                className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden bg-white transition snap-center ring-0 focus:ring-0 focus:outline-none touch-manipulation ${
                  i === activeIndex ? "ring-1 ring-gray-400 ring-inset" : "border border-transparent hover:border-gray-300"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={effectiveSrc}
                  alt={`${alt} - view ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full min-w-full min-h-full object-cover object-center"
                  onError={() => setFailedUrls((prev) => new Set(prev).add(src))}
                />
              </ThumbOrDotButton>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** 带原生 touchend(passive:false) 的按钮，解决触屏需点击两次问题 */
function ThumbOrDotButton({
  onClick,
  ariaLabel,
  className,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  className: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const fnRef = useRef(onClick);
  fnRef.current = onClick;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = (e: TouchEvent) => {
      e.preventDefault();
      fnRef.current();
    };
    el.addEventListener("touchend", fn, { passive: false });
    return () => el.removeEventListener("touchend", fn);
  }, []);
  return (
    <button ref={ref} type="button" onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
