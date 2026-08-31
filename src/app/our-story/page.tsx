import type { Metadata } from "next";
import { ContentPage, PlaceholderNote } from "@/components/ui/ContentPage";
import { STORE_INFO } from "@/lib/content/site";

export const metadata: Metadata = { title: "Our Story" };

export default function OurStoryPage() {
  return (
    <ContentPage
      eyebrow="Edit Experience"
      title="Our Story"
      lede={`Edit Experience is a curated pre-owned luxury retailer — one physical store in ${STORE_INFO.city}, and a website built to make browsing and buying from it effortless.`}
    >
      <p>
        We started with a simple conviction: luxury isn&rsquo;t defined by abundance, but by
        discernment. Every piece here is hand-selected, inspected in-house, and priced to its
        condition and rarity — never marked down, only ever thoughtfully edited.
      </p>
      <PlaceholderNote />
    </ContentPage>
  );
}
