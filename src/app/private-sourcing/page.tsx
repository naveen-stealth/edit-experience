import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, PlaceholderNote } from "@/components/ui/ContentPage";
import { PRIVATE_SOURCING_TERMS } from "@/lib/commerce/config";
import { privateSourcingWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Private Sourcing" };

export default function PrivateSourcingPage() {
  return (
    <ContentPage
      eyebrow="Concierge"
      title="Private Sourcing"
      lede="Looking for a specific piece we don't currently hold? We source on request — discontinued styles, rare colourways and collector pieces included."
    >
      <p>
        Sourcing begins with a {PRIVATE_SOURCING_TERMS.advancePercent}% advance and typically takes
        around {PRIVATE_SOURCING_TERMS.typicalTurnaroundWeeks} weeks, depending on the piece. Every
        sourced item passes the same in-house inspection as our own stock before it reaches you.
      </p>
      <p>
        <Link href={privateSourcingWhatsAppUrl()} className="text-pine underline underline-offset-4 transition-opacity duration-150 ease-luxury hover:opacity-70">
          Start a sourcing request on WhatsApp
        </Link>
      </p>
      <PlaceholderNote />
    </ContentPage>
  );
}
