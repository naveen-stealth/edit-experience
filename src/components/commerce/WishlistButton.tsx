"use client";

import { useWishlist } from "@/context/WishlistContext";
import { IconButton } from "@/components/ui/IconButton";
import type { Product } from "@/lib/commerce/types";

export function WishlistButton({ product, className = "" }: { product: Product; className?: string }) {
  const { has, toggle } = useWishlist();
  const active = has(product.id);

  return (
    <IconButton
      aria-label={active ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
      aria-pressed={active}
      className={className}
      surfaceClassName="bg-ivory-92 backdrop-blur-sm"
      onClick={(e) => {
        e.preventDefault();
        toggle(product.id);
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 21s-7.5-4.6-10.2-9.1C.3 9.1 1.3 5.6 4.6 4.4c2-.7 4.1 0 5.4 1.7l2 2.6 2-2.6c1.3-1.7 3.4-2.4 5.4-1.7 3.3 1.2 4.3 4.7 2.8 7.5C19.5 16.4 12 21 12 21z" />
      </svg>
    </IconButton>
  );
}
