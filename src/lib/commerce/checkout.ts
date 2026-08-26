import type { CartLine } from "./cart";

export interface CheckoutValidation {
  valid: boolean;
  errors: string[];
}

/** Cart + inventory validation, run before handing off to checkout. */
export function validateCheckout(lines: CartLine[]): CheckoutValidation {
  const errors: string[] = [];

  if (lines.length === 0) {
    errors.push("Your bag is empty.");
  }

  const unavailable = lines.filter((l) => l.unavailable);
  if (unavailable.length > 0) {
    errors.push(
      unavailable.length === 1
        ? `${unavailable[0].product.title} is no longer available and has been removed from your bag.`
        : `${unavailable.length} items in your bag are no longer available.`
    );
  }

  const overStock = lines.filter((l) => !l.unavailable && l.quantity > l.product.quantity);
  if (overStock.length > 0) {
    errors.push("One or more items exceed available stock. Please review the quantities in your bag.");
  }

  return { valid: errors.length === 0, errors };
}

export function isShopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

export type CheckoutSessionResult =
  | { ok: true; url: string; mock: false }
  | { ok: true; url: string; mock: true }
  | { ok: false; error: string };

/**
 * Hands off to Shopify Checkout once Storefront API credentials exist.
 * Until then, returns a local mock session so the cart → checkout →
 * confirmation flow is fully clickable in development, clearly flagged
 * as `mock: true` so the UI can say so rather than pretending to charge a card.
 */
export async function createCheckoutSession(lines: CartLine[]): Promise<CheckoutSessionResult> {
  const validation = validateCheckout(lines);
  if (!validation.valid) {
    return { ok: false, error: validation.errors[0] };
  }

  if (isShopifyConfigured()) {
    // TODO(shopify): create a Storefront API cart via `cartCreate`, add lines
    // with `cartLinesAdd`, and return `cart.checkoutUrl`. Left unimplemented
    // until SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN are set —
    // see .env.example.
    return { ok: false, error: "Shopify checkout is configured but not yet wired up." };
  }

  return { ok: true, url: "/checkout/mock-session", mock: true };
}
