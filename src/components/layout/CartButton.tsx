"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

/**
 * The header's bag entry point — an icon linking to the /bag page (where the
 * wishlist also lives, as a tab), with a count over the icon's corner.
 *
 * The count is a dot-style badge rather than text beside the icon so the three
 * header icons (search / account / bag) keep an even visual rhythm.
 */
export function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/bag"
      aria-label={`Bag, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      className="relative -m-2 p-2 transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-50"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.4h-7A1.5 1.5 0 0 1 7 20.5L6 8Z" />
        <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
      </svg>
      {itemCount > 0 && (
        /* text-[9px]: deliberate ladder exception — a numeral inside a 16px
           count dot; the smallest rung (11px) overflows the dot. Not prose. */
        <span
          aria-hidden
          className="absolute top-0.5 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-pine px-1 text-[9px] leading-none font-medium text-ivory"
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
}
