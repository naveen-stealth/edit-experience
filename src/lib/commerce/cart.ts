import { getProductById } from "./products";
import { getPurchaseDecision } from "./purchase";
import type { CartLineItem, Money, Product } from "./types";
import { DEFAULT_CURRENCY } from "./config";

export const CART_STORAGE_KEY = "edit-experience:cart";

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: Money;
  /** True when the line can no longer be purchased (sold/reserved since it was added). */
  unavailable: boolean;
}

/** Luxury resale inventory is quantity = 1 in almost every case; never allow more than is in stock. */
export function addToCart(items: CartLineItem[], product: Product, quantity = 1): CartLineItem[] {
  const decision = getPurchaseDecision(product);
  if (!decision.canAddToBag) return items;

  const existing = items.find((i) => i.productId === product.id);
  const nextQuantity = Math.min((existing?.quantity ?? 0) + quantity, product.quantity);

  if (existing) {
    return items.map((i) => (i.productId === product.id ? { ...i, quantity: nextQuantity } : i));
  }
  return [...items, { productId: product.id, quantity: nextQuantity }];
}

export function removeFromCart(items: CartLineItem[], productId: string): CartLineItem[] {
  return items.filter((i) => i.productId !== productId);
}

export function updateCartQuantity(items: CartLineItem[], productId: string, quantity: number): CartLineItem[] {
  const product = getProductById(productId);
  const max = product?.quantity ?? 1;
  const clamped = Math.max(1, Math.min(quantity, max));
  return items.map((i) => (i.productId === productId ? { ...i, quantity: clamped } : i));
}

/** Resolves stored line items against live product data, flagging anything sold since it was added. */
export function resolveCartLines(items: CartLineItem[]): CartLine[] {
  return items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      const decision = getPurchaseDecision(product);
      return {
        product,
        quantity: item.quantity,
        lineTotal: { amount: product.price.amount * item.quantity, currency: product.price.currency },
        unavailable: !decision.canAddToBag,
      };
    })
    .filter((line): line is CartLine => line !== null);
}

export function getCartSubtotal(lines: CartLine[]): Money {
  const amount = lines
    .filter((l) => !l.unavailable)
    .reduce((sum, l) => sum + l.lineTotal.amount, 0);
  return { amount, currency: DEFAULT_CURRENCY };
}

export function getCartItemCount(items: CartLineItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
