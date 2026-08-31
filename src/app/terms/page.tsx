import type { Metadata } from "next";
import { ContentPage, PlaceholderNote } from "@/components/ui/ContentPage";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function LegalPage() {
  return (
    <ContentPage eyebrow="Legal" title="Terms & Conditions">
      <p>
        This page will carry the finalised legal copy before launch. Until then, please direct any
        questions to the concierge.
      </p>
      <PlaceholderNote />
    </ContentPage>
  );
}
