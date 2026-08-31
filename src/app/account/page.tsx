import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage, PlaceholderNote } from "@/components/ui/ContentPage";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <ContentPage
      eyebrow="Account"
      title="Your account"
      lede="Accounts — order history, saved details and enquiry tracking — are on their way. Until then, the concierge handles everything an account would."
    >
      <p>
        <Link href="/concierge" className="text-pine underline underline-offset-4 transition-opacity duration-150 ease-luxury hover:opacity-70">
          Speak to the concierge
        </Link>{" "}
        about an existing order or enquiry.
      </p>
      <PlaceholderNote />
    </ContentPage>
  );
}
