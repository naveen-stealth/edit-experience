"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { ProductImage } from "@/lib/commerce/types";

/**
 * Products awaiting a shoot carry `url: "placeholder"`, which is not a loadable
 * `next/image` src. Same rule as ProductMedia: a leading slash means a real
 * asset, anything else falls back to the gradient.
 */
function isRealAsset(url: string): boolean {
  return url.startsWith("/");
}

/**
 * One scroll track for both breakpoints, rather than a swipeable gallery on
 * mobile and a separate click-to-swap one on desktop.
 *
 * Scroll position is the single source of truth: swiping and clicking a
 * thumbnail both move the same track, and the active index is derived from where
 * it landed. That keeps thumbnails, dots and the visible image from ever
 * disagreeing, and desktop gets drag support for free.
 *
 * Thumbnail clicks jump instantly rather than animating — the conventional
 * behaviour for a luxury PDP, where the point is to inspect a specific angle
 * rather than to watch a transition.
 */
export function ProductGallery({
  images,
  brand,
  seed,
}: {
  images: ProductImage[];
  brand: string;
  /** Varies the placeholder gradient per product/slide. */
  seed: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    setActive(Math.max(0, Math.min(images.length - 1, Math.round(el.scrollLeft / el.clientWidth))));
  }, [images.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Debounced rather than per-event: this only drives the indicator, so it
    // doesn't need to run on every frame of a drag.
    let idle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(idle);
      idle = setTimeout(syncActive, 80);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(idle);
    };
  }, [syncActive]);

  const show = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const previous = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = index * el.clientWidth;
    el.style.scrollBehavior = previous;
    setActive(index);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="tablet:flex tablet:gap-4">
      {/* Desktop thumbnail rail */}
      {images.length > 1 && (
        <div className="hidden shrink-0 flex-col gap-3 tablet:flex">
          {images.map((image, i) => (
            <button
              key={i}
              type="button"
              onClick={() => show(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={`relative h-[92px] w-[74px] overflow-hidden border transition-colors duration-150 ease-luxury ${
                i === active ? "border-pine" : "border-transparent hover:border-pine-22"
              }`}
            >
              {isRealAsset(image.url) ? (
                <Image src={image.url} alt="" fill sizes="74px" className="object-cover" />
              ) : (
                <MediaPlaceholder seed={`${seed}-${i}`} alt="" className="h-full w-full" aspect="74/92" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="relative min-w-0 flex-1">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => (
            <div key={i} className="relative w-full shrink-0 snap-start" style={{ aspectRatio: "4/5" }}>
              {isRealAsset(image.url) ? (
                <Image
                  src={image.url}
                  alt={image.alt || `${brand} product image ${i + 1}`}
                  fill
                  // The first image is the LCP element on this route.
                  priority={i === 0}
                  sizes="(min-width: 980px) 46vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <MediaPlaceholder
                  seed={`${seed}-${i}`}
                  alt={image.alt || `${brand} product image ${i + 1}`}
                  className="absolute inset-0 h-full w-full"
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile position indicator */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 py-4 tablet:hidden">
            {images.map((image, i) => (
              <button
                key={i}
                type="button"
                onClick={() => show(i)}
                aria-label={`Go to image ${i + 1} of ${images.length}`}
                aria-current={i === active}
                className="p-1.5"
              >
                <span
                  className={`block h-1.5 w-1.5 rounded-full transition-colors duration-150 ease-luxury ${
                    i === active ? "bg-pine" : "bg-pine-22"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
