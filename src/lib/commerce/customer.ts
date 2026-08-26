import type { CartLine } from "./cart";
import { DEFAULT_CURRENCY } from "./config";
import type { Address, Customer, Order } from "./types";

/**
 * Account infrastructure is intentionally mocked for Phase 1 — no auth
 * provider is wired up. This gives account pages (orders, wishlist,
 * addresses) a real shape to render against before that decision is made.
 */
export function getMockCustomer(): Customer {
  return {
    id: "cust-mock-0001",
    fullName: "Guest Customer",
    email: "",
    addresses: [],
  };
}

let orderSequence = 1000;

export function buildConfirmationNumber(): string {
  orderSequence += 1;
  return `EE-${orderSequence}`;
}

export function buildOrder(
  lines: CartLine[],
  customer: Pick<Customer, "fullName" | "email" | "phone">,
  shippingAddress: Address,
  placedAt: string
): Order {
  const subtotalAmount = lines.reduce((sum, l) => sum + l.lineTotal.amount, 0);
  const confirmationNumber = buildConfirmationNumber();
  return {
    id: `order-${confirmationNumber.toLowerCase()}`,
    confirmationNumber,
    lineItems: lines.map((l) => ({ productId: l.product.id, quantity: l.quantity })),
    subtotal: { amount: subtotalAmount, currency: DEFAULT_CURRENCY },
    total: { amount: subtotalAmount, currency: DEFAULT_CURRENCY },
    placedAt,
    customer,
    shippingAddress,
  };
}
