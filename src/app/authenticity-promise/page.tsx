import type { Metadata } from "next";
import { ContentPage, PlaceholderNote } from "@/components/ui/ContentPage";
import { TRUST_POINTS } from "@/lib/content/site";

export const metadata: Metadata = { title: "Authenticity Promise" };

export default function AuthenticityPromisePage() {
  return (
    <ContentPage
      eyebrow="Edit Experience"
      title="Authenticity Promise"
      lede="Trust is the product. Every piece is inspected in-house before it's listed; higher-value bags and watches also carry Entrupy certification where applicable."
    >
      <dl>
        {TRUST_POINTS.map((t) => (
          <div key={t.title} className="border-b border-pine-12 py-4 first:pt-0">
            <dt className="text-body-sm font-medium text-pine">{t.title}</dt>
            <dd className="mt-1">{t.description}</dd>
          </div>
        ))}
      </dl>
      <PlaceholderNote />
    </ContentPage>
  );
}
