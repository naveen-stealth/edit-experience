import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ui/ContentPage";
import { STORE_INFO } from "@/lib/content/site";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <ContentPage eyebrow="Client Care" title="Contact Us">
      <dl>
        <div className="border-b border-pine-12 py-4 first:pt-0">
          <dt className="text-body-sm font-medium text-pine">Store</dt>
          <dd className="mt-1">
            {STORE_INFO.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </dd>
        </div>
        <div className="border-b border-pine-12 py-4">
          <dt className="text-body-sm font-medium text-pine">Hours</dt>
          <dd className="mt-1">
            {STORE_INFO.hours[0].days}, {STORE_INFO.hours[0].hours}
          </dd>
        </div>
        <div className="border-b border-pine-12 py-4">
          <dt className="text-body-sm font-medium text-pine">Phone</dt>
          <dd className="mt-1">{STORE_INFO.phoneDisplay}</dd>
        </div>
      </dl>
      <p>
        <Link href={conciergeWhatsAppUrl()} className="text-pine underline underline-offset-4 transition-opacity duration-150 ease-luxury hover:opacity-70">
          WhatsApp the concierge
        </Link>{" "}
        for the fastest reply.
      </p>
    </ContentPage>
  );
}
