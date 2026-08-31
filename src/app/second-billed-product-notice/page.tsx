import type { Metadata } from "next";
import { ContentPage, PlaceholderNote } from "@/components/ui/ContentPage";

export const metadata: Metadata = { title: "Second-Billed Product Notice" };

export default function LegalPage() {
  return (
    <ContentPage eyebrow="Legal" title="Second-Billed Product Notice">
      <p>
        This page will carry the finalised legal copy before launch. Until then, please direct any
        questions to the concierge.
      </p>
      <PlaceholderNote />
    </ContentPage>
  );
}
