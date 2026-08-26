/**
 * Central business rules for the commerce layer. UI components must never
 * hardcode these — they read resolved values off the product, or call the
 * helpers below when seeding/normalizing data.
 */

export const DEFAULT_CURRENCY = "INR" as const;

/** Products priced above this move to the enquiry flow by default. */
export const ENQUIRY_PRICE_THRESHOLD = 500_000;

export const DEFAULT_SHIPPING_ESTIMATE = {
  tier1Days: 2,
  tier2Days: 3,
  note: "Tier 1 cities: Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad.",
};

export const DEFAULT_RETURN_POLICY = {
  eligibleForReturn: true,
  initiationWindowDays: 3,
  remedy: "store_credit" as const,
  notes:
    "Return or exchange must be initiated within 3 days of delivery. Approved returns are issued as store credit. Final-sale and made-to-measure pieces are not eligible — see the product page for exceptions.",
};

export const PRIVATE_SOURCING_TERMS = {
  advancePercent: 30,
  typicalTurnaroundWeeks: 4,
};

/** Default purchase mode for a given price, before any per-product override. */
export function resolvePurchaseMode(priceAmount: number): "direct" | "enquiry" {
  return priceAmount > ENQUIRY_PRICE_THRESHOLD ? "enquiry" : "direct";
}
