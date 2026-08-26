/**
 * Normalized commerce types. Presentation components depend only on these —
 * never on raw Shopify Storefront API shapes. When Shopify credentials land,
 * only lib/commerce/*.ts needs to change; nothing under components/ or app/.
 */

export type Currency = "INR";

export interface Money {
  amount: number;
  currency: Currency;
}

/** Controls whether a product can be bought online or only enquired about. */
export type PurchaseMode = "direct" | "enquiry";

export type ProductAvailability =
  | "in_stock"
  | "low_stock"
  | "sold"
  | "reserved"
  | "enquire";

export type ProductCondition = "unworn" | "excellent" | "very_good" | "good";

export const CONDITION_LABEL: Record<ProductCondition, string> = {
  unworn: "Unworn",
  excellent: "Excellent",
  very_good: "Very Good",
  good: "Good",
};

export type ProductGender = "women" | "men" | "unisex";

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Designer {
  id: string;
  handle: string;
  name: string;
  description?: string;
}

export interface Category {
  id: string;
  handle: string;
  name: string;
  parentHandle?: string;
  /** Real photo path. Falls back to the gradient placeholder when omitted. */
  image?: { url: string; alt: string };
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: ProductImage;
  productIds: string[];
}

/**
 * Selected third-party authentication (e.g. Entrupy). Only present on
 * products that have actually been certified — never inferred.
 */
export interface Authentication {
  checkedInStore: boolean;
  provider?: string;
  certificateAvailable: boolean;
  invoiceAvailable: boolean;
}

export interface ShippingEstimate {
  tier1Days: number;
  tier2Days: number;
  note?: string;
}

export interface ReturnPolicy {
  eligibleForReturn: boolean;
  initiationWindowDays: number;
  remedy: "store_credit" | "refund" | "exchange";
  notes?: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  brand: string;
  designerHandle: string;
  category: string;
  subcategory?: string;
  description: string;

  price: Money;
  compareAtPrice?: Money;
  /** Above the configured enquiry threshold, PDP/PLP should not surface price even if purchaseMode is "direct". */
  purchaseMode: PurchaseMode;

  condition: ProductCondition;
  conditionNotes?: string;

  images: ProductImage[];
  thumbnail: ProductImage;
  video?: string;

  size?: string;
  colour?: string;
  material?: string;
  dimensions?: string;
  year?: number;
  gender: ProductGender;

  availability: ProductAvailability;
  quantity: number;
  sku: string;

  authentication: Authentication;
  shipping: ShippingEstimate;
  returnPolicy: ReturnPolicy;

  tags: string[];
  collectionIds: string[];

  featured: boolean;
  newArrival: boolean;
  rarePiece: boolean;
  editorPick: boolean;

  createdAt: string;
}

export interface ProductFilters {
  category?: string;
  /** Route scope — a single designer's own page. Narrows before `designerHandles`. */
  designerHandle?: string;
  /** Multi-select designer facet on a listing page. */
  designerHandles?: string[];
  collectionHandle?: string;
  gender?: ProductGender;
  condition?: ProductCondition[];
  priceMin?: number;
  priceMax?: number;
  colour?: string[];
  size?: string[];
  availability?: ProductAvailability[];
  query?: string;
}

export type ProductSort =
  | "newest"
  | "price_asc"
  | "price_desc"
  | "relevance";

export interface CartLineItem {
  productId: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  addresses: Address[];
}

export interface Order {
  id: string;
  confirmationNumber: string;
  lineItems: CartLineItem[];
  subtotal: Money;
  total: Money;
  placedAt: string;
  customer: Pick<Customer, "fullName" | "email" | "phone">;
  shippingAddress: Address;
}
