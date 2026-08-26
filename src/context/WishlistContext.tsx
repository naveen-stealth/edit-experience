"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { getProductById } from "@/lib/commerce/products";
import type { Product } from "@/lib/commerce/types";
import { createLocalStore } from "@/lib/utils/local-storage";
import { trackEvent } from "@/lib/analytics";

const WISHLIST_STORAGE_KEY = "edit-experience:wishlist";
const wishlistStore = createLocalStore<string[]>(WISHLIST_STORAGE_KEY, []);

interface WishlistContextValue {
  productIds: string[];
  products: Product[];
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const productIds = useSyncExternalStore(wishlistStore.subscribe, wishlistStore.getSnapshot, wishlistStore.getServerSnapshot);

  const has = useCallback((productId: string) => productIds.includes(productId), [productIds]);

  const toggle = useCallback((productId: string) => {
    const current = wishlistStore.getSnapshot();
    const exists = current.includes(productId);
    if (!exists) trackEvent({ name: "wishlist_add", productId });
    wishlistStore.set(exists ? current.filter((id) => id !== productId) : [...current, productId]);
  }, []);

  const products = useMemo(
    () => productIds.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p)),
    [productIds]
  );

  return (
    <WishlistContext.Provider value={{ productIds, products, has, toggle }}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
