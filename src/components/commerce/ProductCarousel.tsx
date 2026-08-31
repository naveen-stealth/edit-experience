"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "./ProductCard";

const COPIES = 3;

/**
 * Sets `scrollLeft` without animating, whatever the CSS says.
 *
 * The scroller carries `scroll-smooth`, so a plain `scrollLeft = x` assignment
 * animates — which turned every loop wrap into a visible slide back across a
 * whole copy, the exact "rewind" the loop exists to hide. Forcing
 * `scroll-behavior: auto` inline for the assignment makes the wrap a hard cut.
 */
function jumpTo(el: HTMLElement, left: number) {
  const previous = el.style.scrollBehavior;
  el.style.scrollBehavior = "auto";
  el.scrollLeft = left;
  el.style.scrollBehavior = previous;
}

/**
 * A product rail. Finite by default; `loop` opts into wrapping.
 *
 * Finite is the default deliberately. Stock here is one-of-one, so a rail has a
 * real end and reaching it is information — an endless rail hides how much there
 * is and quietly repeats pieces the shopper has already rejected. The arrows
 * disable at each end rather than going dead, so the boundary reads as "nothing
 * further" instead of "broken".
 *
 * With `loop`, the list is rendered three times and `scrollLeft` is silently cut
 * back into the middle copy whenever an edge copy comes into view. The copies are
 * identical, so scrolling past the last item continues straight into the first.
 *
 * Looping is skipped automatically when a single copy doesn't overflow the
 * scrollport — with too few products there is nothing to wrap around, and the
 * measurements the cut depends on collapse.
 *
 * The rail bleeds to the viewport edge, but its first card is indented to the
 * page spine (`page-spine-pl`) so the leading card's image and title align with
 * the section heading above it.
 */
export function ProductCarousel({
  products,
  onDark = false,
  loop = false,
}: {
  products: Product[];
  onDark?: boolean;
  loop?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  /** One copy's scroll distance. 0 means "not looping". */
  const copyAdvanceRef = useRef(0);
  const [looping, setLooping] = useState(false);
  /** Only meaningful when finite — a looping rail never reaches an edge. */
  const [edges, setEdges] = useState({ atStart: true, atEnd: false, scrollable: true });

  const items = looping ? Array.from({ length: COPIES }, () => products).flat() : products;

  /**
   * Cuts back into the middle copy when an edge copy scrolls into view.
   *
   * No re-entrancy guard on purpose. The cut fires its own scroll/scrollend,
   * which calls this again — but a cut moves a full copy's width, landing deep
   * inside the band, so the re-entrant call finds nothing to do and returns.
   * It's naturally idempotent. An earlier version held a flag released in
   * `requestAnimationFrame`, which deadlocked the loop whenever rAF was
   * throttled (hidden tab, backgrounded window) and the flag never cleared.
   */
  const recentre = useCallback(() => {
    const el = scrollerRef.current;
    const advance = copyAdvanceRef.current;
    if (!el || !advance) return;

    let next = el.scrollLeft;
    if (el.scrollLeft < advance * 0.5) next += advance;
    else if (el.scrollLeft > advance * 1.5) next -= advance;
    if (next === el.scrollLeft) return;

    jumpTo(el, next);
  }, []);

  /*
   * Decides whether looping is viable, then renders the extra copies. Runs on
   * `products` and on resize, since a narrower viewport changes card widths and
   * can flip the answer.
   */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || products.length === 0) return;

    const evaluate = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const second = el.children[1] as HTMLElement | undefined;
      if (!first || !second) return;

      const cardAdvance = second.offsetLeft - first.offsetLeft;
      const oneCopy = cardAdvance * products.length;
      setLooping(loop && oneCopy > el.clientWidth);
    };

    evaluate();
    const observer = new ResizeObserver(evaluate);
    observer.observe(el);
    return () => observer.disconnect();
  }, [products, loop]);

  /*
   * Once the copies are in the DOM, measure one copy's advance and park in the
   * middle one. Measured from a card and its twin rather than `scrollWidth / 3`:
   * the leading spine padding and the single missing inter-copy gap are both in
   * scrollWidth but not in a copy's advance, so dividing drifts on every wrap.
   */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    if (!looping) {
      copyAdvanceRef.current = 0;
      return;
    }

    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const twin = el.children[products.length] as HTMLElement | undefined;
      copyAdvanceRef.current = first && twin ? twin.offsetLeft - first.offsetLeft : 0;
      return copyAdvanceRef.current;
    };

    jumpTo(el, measure());

    const onResize = () => {
      const advance = measure();
      if (advance) jumpTo(el, advance);
    };
    window.addEventListener("resize", onResize);

    /*
     * `scrollend` is the right signal but Safari only shipped it in 26 — without
     * a fallback the rail silently stops looping on older versions. Feature
     * detect, and otherwise debounce plain `scroll`.
     */
    if ("onscrollend" in window) {
      el.addEventListener("scrollend", recentre);
      return () => {
        window.removeEventListener("resize", onResize);
        el.removeEventListener("scrollend", recentre);
      };
    }

    let idle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(idle);
      idle = setTimeout(recentre, 120);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      el.removeEventListener("scroll", onScroll);
      clearTimeout(idle);
    };
  }, [looping, products, recentre]);

  /*
   * Edge state for the arrows on a finite rail.
   *
   * Deliberately not called synchronously here: `ResizeObserver` fires once on
   * observe, which initialises the state off the effect body. Setting state
   * inline instead would cascade an extra render on every mount for no gain.
   */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || looping) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      // 2px tolerance: fractional card widths mean scrollLeft rarely lands on
      // max exactly, and a 1px shortfall must not read as "more to come".
      setEdges({
        atStart: el.scrollLeft <= 2,
        atEnd: el.scrollLeft >= max - 2,
        scrollable: max > 2,
      });
    };

    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [looping, products]);

  /**
   * Steps one card, addressed absolutely by the target card's own position.
   *
   * Card widths are fractional, so a relative `scrollBy(cardWidth + gap)`
   * accumulates rounding error across presses and drifts off the snap points.
   * Reading the target's measured `offsetLeft` lands exactly on a snap position
   * every time. `advance` only picks an integer index, where sub-pixel error is
   * harmless.
   */
  const step = useCallback(
    (direction: 1 | -1) => {
      const el = scrollerRef.current;
      const first = el?.children[0] as HTMLElement | undefined;
      const second = el?.children[1] as HTMLElement | undefined;
      if (!el || !first || !second) return;

      const cardAdvance = second.offsetLeft - first.offsetLeft;
      if (!cardAdvance) return;

      const index = Math.round(el.scrollLeft / cardAdvance);
      let target = el.children[index + direction] as HTMLElement | undefined;

      // Not looping and already at an end: nothing to do. Looping but the cut
      // hasn't landed yet: cut now, re-read the index, then step.
      if (!target) {
        if (!copyAdvanceRef.current) return;
        recentre();
        const cutIndex = Math.round(el.scrollLeft / cardAdvance);
        target = el.children[cutIndex + direction] as HTMLElement | undefined;
        if (!target) return;
      }

      el.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: "smooth" });
    },
    [recentre]
  );

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="page-spine-pl flex snap-x snap-mandatory gap-(--grid-gutter) overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((product, i) => {
          /*
           * Duplicates stay clickable — they're what the user is looking at for
           * most of the loop — but are hidden from assistive tech and skipped by
           * Tab, so the rail announces seven products rather than twenty-one.
           */
          const isDuplicate = i >= products.length;
          return (
            <div
              key={`${product.id}-${i}`}
              aria-hidden={isDuplicate || undefined}
              className="w-[74%] shrink-0 snap-start sm:w-[46%] tablet:w-[31.5%] lg:w-[23%]"
            >
              <ProductCard
                product={product}
                showBadge={false}
                showWishlist={false}
                showBrand={false}
                onDark={onDark}
                tabIndex={isDuplicate ? -1 : undefined}
              />
            </div>
          );
        })}
      </div>

      {/* A looping rail has no ends, so nothing to disable. */}
      {(looping || edges.scrollable) && (
        <>
          <RailButton direction={-1} onClick={step} disabled={!looping && edges.atStart} />
          <RailButton direction={1} onClick={step} disabled={!looping && edges.atEnd} />
        </>
      )}
    </div>
  );
}

/**
 * Centred on the card's photo rather than on the rail. The rail's height is the
 * 4:5 image plus a ~5rem text block, so `(100% - 5rem) / 2` tracks the image's
 * midpoint at every breakpoint — the old `top-[38%]` was a hand-tuned guess that
 * drifted whenever a product title wrapped to a second line.
 */
function RailButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 1 | -1;
  onClick: (d: 1 | -1) => void;
  disabled: boolean;
}) {
  const Icon = direction === -1 ? ArrowLeftIcon : ArrowRightIcon;
  return (
    <button
      type="button"
      onClick={() => onClick(direction)}
      disabled={disabled}
      aria-label={direction === -1 ? "Previous products" : "Next products"}
      className={`absolute top-[calc((100%-5rem)/2)] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-ivory text-pine shadow-[0_2px_10px_rgba(4,30,26,0.18)] transition duration-150 ease-luxury hover:shadow-[0_4px_16px_rgba(4,30,26,0.24)] active:scale-95 disabled:pointer-events-none disabled:opacity-0 motion-reduce:active:scale-100 ${
        direction === -1 ? "left-4" : "right-4"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );
}
