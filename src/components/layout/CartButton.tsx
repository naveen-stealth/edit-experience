"use client";

import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open bag, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      className="relative text-[12px] uppercase tracking-[0.08em] text-pine transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-50"
    >
      Bag{itemCount > 0 && <span className="ml-1 text-pine-45">({itemCount})</span>}
    </button>
  );
}
