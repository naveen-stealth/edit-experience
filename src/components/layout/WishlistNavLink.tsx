"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";

export function WishlistNavLink() {
  const { productIds } = useWishlist();

  return (
    <Link href="/account/wishlist" className="text-[12px] uppercase tracking-[0.08em] text-pine hover:opacity-70">
      Wishlist{productIds.length > 0 && <span className="ml-1 text-pine-45">({productIds.length})</span>}
    </Link>
  );
}
