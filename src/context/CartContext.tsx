"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { addToCart, CART_STORAGE_KEY, getCartItemCount, getCartSubtotal, removeFromCart, resolveCartLines, updateCartQuantity, type CartLine } from "@/lib/commerce/cart";
import type { CartLineItem, Product } from "@/lib/commerce/types";
import { createLocalStore } from "@/lib/utils/local-storage";
import { trackEvent } from "@/lib/analytics";

const cartStore = createLocalStore<CartLineItem[]>(CART_STORAGE_KEY, []);

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: ReturnType<typeof getCartSubtotal>;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, quantity = 1) => {
    cartStore.set(addToCart(cartStore.getSnapshot(), product, quantity));
    trackEvent({ name: "add_to_cart", productId: product.id, quantity });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    cartStore.set(removeFromCart(cartStore.getSnapshot(), productId));
    trackEvent({ name: "remove_from_cart", productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    cartStore.set(updateCartQuantity(cartStore.getSnapshot(), productId, quantity));
  }, []);

  const lines = useMemo(() => resolveCartLines(items), [items]);
  const subtotal = useMemo(() => getCartSubtotal(lines), [lines]);
  const itemCount = useMemo(() => getCartItemCount(items), [items]);

  const value: CartContextValue = {
    lines,
    itemCount,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
