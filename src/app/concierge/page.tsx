import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ui/ContentPage";
import { CONCIERGE_SERVICES, STORE_INFO } from "@/lib/content/site";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Concierge" };

export default function ConciergePage() {
  return (
    <ContentPage
      eyebrow="Client Care"
      title="Concierge"
      lede={`Questions, sourcing, sizing, after-sales — answered by a person, not a chatbot. Available ${STORE_INFO.hours[0].hours}, every day.`}
    >
      <dl>
        {CONCIERGE_SERVICES.map((s) => (
          <div key={s.title} className="border-b border-pine-12 py-4 first:pt-0">
            <dt className="text-body-sm font-medium text-pine">{s.title}</dt>
            <dd className="mt-1">{s.description}</dd>
          </div>
        ))}
      </dl>
      <p>
        <Link href={conciergeWhatsAppUrl()} className="text-pine underline underline-offset-4 transition-opacity duration-150 ease-luxury hover:opacity-70">
          WhatsApp the concierge
        </Link>{" "}
        or call {STORE_INFO.phoneDisplay}.
      </p>
    </ContentPage>
  );
}
