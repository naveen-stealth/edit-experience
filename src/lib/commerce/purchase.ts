import type { Product } from "./types";

export type PurchaseState = "add_to_bag" | "enquire" | "sold" | "reserved";

export interface PurchaseDecision {
  state: PurchaseState;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  /** Whether the price should render on PLP/PDP at all. */
  showPrice: boolean;
  canAddToBag: boolean;
}

/**
 * Single source of truth for "what can a shopper do with this product".
 * Combines the commercial rule (purchaseMode, set from price at seed time)
 * with the live inventory state (availability). Components read this —
 * they never branch on price or availability themselves.
 */
export function getPurchaseDecision(product: Product): PurchaseDecision {
  if (product.availability === "sold") {
    return {
      state: "sold",
      primaryCtaLabel: "Sold",
      secondaryCtaLabel: "Find Something Similar",
      showPrice: false,
      canAddToBag: false,
    };
  }

  if (product.availability === "reserved") {
    return {
      state: "reserved",
      primaryCtaLabel: "Reserved",
      secondaryCtaLabel: "Enquire About This Piece",
      showPrice: product.purchaseMode === "direct",
      canAddToBag: false,
    };
  }

  if (product.purchaseMode === "enquiry" || product.availability === "enquire") {
    return {
      state: "enquire",
      primaryCtaLabel: "Enquire About This Piece",
      secondaryCtaLabel: "WhatsApp Concierge",
      showPrice: false,
      canAddToBag: false,
    };
  }

  return {
    state: "add_to_bag",
    primaryCtaLabel: "Add to Bag",
    secondaryCtaLabel: "Speak to Concierge",
    showPrice: true,
    canAddToBag: true,
  };
}
