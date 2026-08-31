import type { Metadata } from "next";
import { ContentPage, PlaceholderNote } from "@/components/ui/ContentPage";
import { DEFAULT_RETURN_POLICY } from "@/lib/commerce/config";

export const metadata: Metadata = { title: "Returns & Exchange" };

export default function ReturnsExchangePage() {
  return (
    <ContentPage
      eyebrow="Client Care"
      title="Returns & Exchange"
      lede={`Returns and exchanges can be initiated within ${DEFAULT_RETURN_POLICY.initiationWindowDays} days of delivery.`}
    >
      <p>{DEFAULT_RETURN_POLICY.notes}</p>
      <PlaceholderNote />
    </ContentPage>
  );
}
