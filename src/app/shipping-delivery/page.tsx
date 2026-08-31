import type { Metadata } from "next";
import { ContentPage, PlaceholderNote } from "@/components/ui/ContentPage";
import { DEFAULT_SHIPPING_ESTIMATE } from "@/lib/commerce/config";

export const metadata: Metadata = { title: "Shipping & Delivery" };

export default function ShippingDeliveryPage() {
  return (
    <ContentPage
      eyebrow="Client Care"
      title="Shipping & Delivery"
      lede={`Fully insured delivery in ${DEFAULT_SHIPPING_ESTIMATE.tier1Days}–${DEFAULT_SHIPPING_ESTIMATE.tier2Days} working days, with signature on receipt.`}
    >
      <p>{DEFAULT_SHIPPING_ESTIMATE.note}</p>
      <p>Every order ships discreetly packaged, with its GST invoice and any certification enclosed.</p>
      <PlaceholderNote />
    </ContentPage>
  );
}
