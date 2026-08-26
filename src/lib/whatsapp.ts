import type { Product } from "@/lib/commerce/types";
import { getAbsoluteUrl } from "@/lib/utils/url";

/**
 * Single source of truth for the WhatsApp concierge number and message
 * templates. Nothing outside this file should read
 * NEXT_PUBLIC_WHATSAPP_NUMBER or hand-build a wa.me URL.
 */
function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
}

export function isWhatsAppConfigured(): boolean {
  return getWhatsAppNumber().length > 0;
}

function buildWhatsAppUrl(message: string): string {
  const number = getWhatsAppNumber();
  const params = new URLSearchParams({ text: message });
  return number ? `https://wa.me/${number}?${params.toString()}` : "#";
}

export function productEnquiryWhatsAppUrl(product: Product): string {
  const url = getAbsoluteUrl(`/products/${product.handle}`);
  const message = `Hi Edit Experience, I'm interested in ${product.title} by ${product.brand}.\n${url}`;
  return buildWhatsAppUrl(message);
}

export function privateSourcingWhatsAppUrl(): string {
  return buildWhatsAppUrl("Hi Edit Experience, I'd like help sourcing a product.");
}

export function conciergeWhatsAppUrl(): string {
  return buildWhatsAppUrl("Hi Edit Experience, I'd like to speak with the concierge.");
}

export function storeVisitWhatsAppUrl(): string {
  return buildWhatsAppUrl("Hi Edit Experience, I'd like to plan a visit to the store.");
}
