"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { dedupeImagesByBase } from "@/lib/imageUtils";

const FALLBACK_IMAGE = "/product-placeholder.svg";

/**
 * 商品详情页左侧多图轮播
 *
 * 核心策略：
 * - activeIndex  = 用户选中的索引（点击即刻更新，驱动指示点/缩略图高亮）
 * - displayedIndex = 实际渲染的索引（只在目标图片真正加载完后才更新）
 * 两者分离，确保旧图一直可见直到新图就绪，彻底消除空白帧。
 */
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
  const uniqueImages = dedupeImagesByBase(images);
  const total = uniqueImages.length;
  const hasMultiple = total > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const [thumbOverflow, setThumbOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const findNextUsableIndex = useCallback(
    (from: number, failed: Set<string>) => {
      if (total <= 0) return 0;
      for (let step = 1; step <= total; step++) {
        const idx = (from + step) % total;
        const src = uniqueImages[idx];
        if (src && !failed.has(src)) return idx;
      }
      return from;
    },
    [total, uniqueImages]
  );

  const findPrevUsableIndex = useCallback(
    (from: number, failed: Set<string>) => {
      if (total <= 0) return 0;
      for (let step = 1; step <= total; step++) {
        const idx = (from - step + total) % total;
        const src = uniqueImages[idx];
        if (src && !failed.has(src)) return idx;
      }
      return from;
    },
    [total, uniqueImages]
  );

  const getSrc = useCallback(
    (src: string) => (failedUrls.has(src) ? fallbackImage : src),
    [failedUrls, fallbackImage]
  );

  /**
   * 挂载时预加载所有图片（非首张），尽早塞进浏览器缓存。
   * 即使服务器缓存头不理想，至少让图片在会话内可用。
   */
  useEffect(() => {
    uniqueImages.slice(1).forEach((src) => {
      const img = new Image();
      img.onerror = () => setFailedUrls((prev) => new Set(prev).add(src));
      img.src = src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 当当前展示图已被标记失败时，自动跳转到可用图集合中的第一张
  useEffect(() => {
    const src = uniqueImages[displayedIndex];
    if (!src || !failedUrls.has(src)) return;
    const firstUsable = uniqueImages.findIndex((s) => s && !failedUrls.has(s));
    if (firstUsable >= 0 && firstUsable !== activeIndex) setActiveIndex(firstUsable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [failedUrls]);

  /**
   * 每次 activeIndex 变化时，通过 Image 对象加载目标图片。
   * 加载成功后才把 displayedIndex 切换过去，加载前旧图一直显示。
   */
  useEffect(() => {
    const src = uniqueImages[activeIndex];
    if (!src) return;

    // 已知失败的图片直接用 fallback，无需等待
    if (failedUrls.has(src)) {
      setDisplayedIndex(activeIndex);
      return;
    }

    let alive = true;
    const img = new Image();

    img.onload = () => {
      if (alive) setDisplayedIndex(activeIndex);
    };
    img.onerror = () => {
      if (alive) {
        setFailedUrls((prev) => {
          const next = new Set(prev).add(src);
          const nextIdx = findNextUsableIndex(activeIndex, next);
          // 如果还有可用图，自动跳到下一张，避免大图/缩略图变成一排兜底图
          if (nextIdx !== activeIndex) setActiveIndex(nextIdx);
          return next;
        });
        setDisplayedIndex(activeIndex);
      }
    };
    img.src = getSrc(src);

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const goTo = useCallback(
    (index: number) => setActiveIndex(((index % total) + total) % total),
    [total]
  );

  const goPrev = useCallback(() => {
    setActiveIndex((cur) => findPrevUsableIndex(cur, failedUrls));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoPlayInterval);
  }, [autoPlayInterval, failedUrls, findPrevUsableIndex]);

  const goNext = useCallback(() => {
    setActiveIndex((cur) => findNextUsableIndex(cur, failedUrls));
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoPlayInterval);
  }, [autoPlayInterval, failedUrls, findNextUsableIndex]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  }, [goNext, goPrev]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current =
      e.changedTouches[0]?.clientX ?? e.touches[0]?.clientX ?? touchEndX.current;
  }, []);

  useEffect(() => {
    if (!autoPlay || !hasMultiple || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => goNext(), autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, hasMultiple, isPaused, autoPlayInterval, goNext]);

  const displayedSrc = getSrc(uniqueImages[displayedIndex] ?? "");
  const visibleThumbs = uniqueImages.filter((src) => !failedUrls.has(src));
  const visibleDotIndices = uniqueImages
    .map((src, i) => ({ src, i }))
    .filter(({ src }) => !!src && !failedUrls.has(src));
  const showFallbackThumbs = visibleThumbs.length === 0;

  const updateThumbScrollState = useCallback(() => {
    const el = thumbsRef.current;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 2;
    setThumbOverflow(overflow);
    setCanScrollLeft(overflow && el.scrollLeft > 2);
    setCanScrollRight(overflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateThumbScrollState();
    const el = thumbsRef.current;
    if (!el) return;
    const onScroll = () => updateThumbScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateThumbScrollState);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateThumbScrollState);
    };
  }, [updateThumbScrollState]);

  // activeIndex 变化时，把对应缩略图滚到可视区域（居中），不需要额外翻页操作
  useEffect(() => {
    const el = thumbsRef.current;
    if (!el) return;
    const target = el.querySelector<HTMLButtonElement>(`button[data-thumb-idx="${activeIndex}"]`);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  return (
    <div className="w-full min-w-0 group/carousel">
      <div
        className="relative w-full max-w-[480px] aspect-square bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shrink-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 始终显示 displayedIndex 对应的图片（旧图），直到新图加载完才换 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayedSrc}
          alt={alt}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover"
          onError={() =>
            setFailedUrls((prev) => {
              const src = uniqueImages[displayedIndex] ?? "";
              const next = new Set(prev);
              if (src) next.add(src);
              const nextIdx = findNextUsableIndex(displayedIndex, next);
              if (nextIdx !== displayedIndex) setActiveIndex(nextIdx);
              return next;
            })
          }
        />

        {/* 加载指示：目标图片尚未就绪时，叠加一个小转圈提示用户切换已受理 */}
        {activeIndex !== displayedIndex && (
          <div className="absolute inset-0 flex items-end justify-end p-3 pointer-events-none z-10">
            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* 左右箭头 */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goPrev();
                }
              }}
              style={{ touchAction: "manipulation" }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 md:bg-white/90 md:hover:bg-white shadow-md flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 text-white md:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goNext();
                }
              }}
              style={{ touchAction: "manipulation" }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 md:bg-white/90 md:hover:bg-white shadow-md flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 text-white md:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* 指示点（跟随 activeIndex，立即反映用户选择） */}
        {hasMultiple && visibleDotIndices.length > 1 && visibleDotIndices.length <= 12 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {visibleDotIndices.map(({ i }) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(i);
                  }
                }}
                style={{ touchAction: "manipulation" }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeIndex ? "bg-white shadow" : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>

      {/* 缩略图条（跟随 activeIndex 高亮） */}
      {hasMultiple && (
        <div className="mt-3 w-full max-w-[480px]">
          <div className="relative">
            {/* 左右滚动按钮：仅滚动缩略图容器，不影响页面横向滚动 */}
            {thumbOverflow && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    const el = thumbsRef.current;
                    if (!el) return;
                    el.scrollBy({ left: -Math.max(240, el.clientWidth * 0.8), behavior: "smooth" });
                  }}
                  className={`absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow border border-gray-200 flex items-center justify-center transition-opacity ${
                    canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  aria-label="Scroll thumbnails left"
                >
                  <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = thumbsRef.current;
                    if (!el) return;
                    el.scrollBy({ left: Math.max(240, el.clientWidth * 0.8), behavior: "smooth" });
                  }}
                  className={`absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow border border-gray-200 flex items-center justify-center transition-opacity ${
                    canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  aria-label="Scroll thumbnails right"
                >
                  <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div
              ref={thumbsRef}
              className="flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden pr-1 pb-1 -mb-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
            {showFallbackThumbs ? (
              <div className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden bg-white border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fallbackImage}
                  alt={`${alt} - fallback`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-center pointer-events-none"
                />
              </div>
            ) : (
              visibleThumbs.map((src, i) => (
                <button
                  key={src}
                    data-thumb-idx={uniqueImages.indexOf(src)}
                  type="button"
                  onClick={() => {
                    const idx = uniqueImages.indexOf(src);
                    if (idx >= 0) setActiveIndex(idx);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      const idx = uniqueImages.indexOf(src);
                      if (idx >= 0) setActiveIndex(idx);
                    }
                  }}
                  style={{ touchAction: "manipulation" }}
                  className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden bg-white transition ring-0 focus:ring-0 focus:outline-none ${
                    uniqueImages.indexOf(src) === activeIndex
                      ? "ring-1 ring-gray-400 ring-inset"
                      : "border border-transparent hover:border-gray-300"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${alt} - view ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full min-w-full min-h-full object-cover object-center pointer-events-none"
                    onError={() => setFailedUrls((prev) => new Set(prev).add(src))}
                  />
                </button>
              ))
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
