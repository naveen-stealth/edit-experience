/**
 * Single dispatch point for product/commerce analytics events. No analytics
 * provider is wired up yet — this isolates that decision so presentation
 * components never import a vendor SDK directly. Swap the body of
 * trackEvent() for a real provider (GA4, Segment, etc.) when one is chosen.
 */

export type AnalyticsEvent =
  | { name: "view_product"; productId: string }
  | { name: "view_collection"; collectionHandle: string }
  | { name: "search"; query: string }
  | { name: "filter_products"; category?: string; filters: Record<string, unknown> }
  | { name: "add_to_cart"; productId: string; quantity: number }
  | { name: "remove_from_cart"; productId: string }
  | { name: "begin_checkout"; itemCount: number }
  | { name: "purchase"; orderId: string; total: number }
  | { name: "click_whatsapp"; context: string; productId?: string }
  | { name: "click_concierge"; context: string }
  | { name: "submit_enquiry"; productId: string }
  | { name: "submit_private_sourcing" }
  | { name: "view_store_location" }
  | { name: "wishlist_add"; productId: string };

export function trackEvent(event: AnalyticsEvent): void {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event.name, event);
  }
}
