import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlaceholderNote } from "@/components/ui/ContentPage";
import { Section } from "@/components/ui/Section";
import { EditedBand } from "@/components/home/EditedBand";
import { VisitStoreSplit } from "@/components/home/VisitStoreSplit";
import { STORE_INFO } from "@/lib/content/site";

export const metadata: Metadata = { title: "Our Story" };

export default function OurStoryPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Our Story" }]} />

      {/* Opening: header and image share one Section so the picture reads as
          part of the introduction, not a separate chapter. */}
      <Section spaceTop="tight" spaceBottom="tight">
        <div className="max-w-[62ch]">
          <Eyebrow as="p" className="mb-3 block">
            Edit Experience
          </Eyebrow>
          <h1 className="text-display-sm text-pine tablet:text-display">Our Story</h1>
          <p className="mt-5 text-body font-light text-pine-70">
            Edit Experience is a curated luxury retailer — one physical store in{" "}
            {STORE_INFO.city}, and a website built to make browsing and buying from it effortless.
          </p>
        </div>
        <div
          className="relative mt-10 min-h-[320px] w-full overflow-hidden tablet:mt-14"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src="/our-story-hero.png"
            alt="A Goyard mini tote carrying an Edit Experience tag, resting on driftwood against a sunset sky"
            fill
            sizes="(min-width: 980px) 1280px, 100vw"
            /* Bag sits at ~72% x in the source; keep it in frame when mobile crops the sides. */
            className="object-cover object-[72%_45%]"
          />
        </div>
      </Section>

      <Section spaceTop="tight" spaceBottom="tight">
        <div className="grid grid-cols-1 gap-x-(--grid-gutter) gap-y-8 tablet:grid-cols-12">
          <div className="tablet:col-span-5">
            <Eyebrow as="p" className="mb-3 block">
              Why We Exist
            </Eyebrow>
            <h2 className="max-w-[16ch] text-title text-pine tablet:text-display-sm">
              Edited, not accumulated.
            </h2>
          </div>
          <div className="max-w-[62ch] space-y-5 text-body font-light text-pine-70 tablet:col-span-6 tablet:col-start-7">
            <p>
              We started with a simple conviction: luxury isn&rsquo;t defined by abundance, but by
              discernment. Every piece here is hand-selected, inspected in-house, and priced to its
              rarity and the current market — never marked down, only ever thoughtfully edited.
            </p>
            <p>
              That conviction lives in a single store in Jubilee Hills. Keeping to one floor is
              deliberate: every piece on the shelf has been handled, photographed and listed by the
              same small team, so what you see online is exactly what&rsquo;s in the store.
            </p>
            <p>
              Everything on our shelves is brand new — sourced directly, never carried, never a
              compromise. We buy a few of each piece, sometimes only one, so the edit stays sharp
              and nothing lingers.
            </p>
            <PlaceholderNote />
          </div>
        </div>
      </Section>

      <EditedBand
        statement="Luxury isn't defined by abundance, but by discernment."
        caption="Every piece hand-selected, inspected in-house, and priced to its rarity and the current market."
      />

      <VisitStoreSplit />
    </>
  );
}
