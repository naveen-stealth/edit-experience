import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ImageTextSection } from "@/components/home/ImageTextSection";
import { ProductRail } from "@/components/home/ProductRail";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { EditedBand } from "@/components/home/EditedBand";
import { DesignerStrip } from "@/components/home/DesignerStrip";
import { ConciergeBanner } from "@/components/home/ConciergeBanner";
import { VisitStoreSplit } from "@/components/home/VisitStoreSplit";
import { LinkButton } from "@/components/ui/LinkButton";
import { getNewArrivals } from "@/lib/commerce/products";
import { CATEGORIES, getCollectionByHandle, getDesignerByHandle } from "@/lib/commerce/collections";
import { STORE_INFO } from "@/lib/content/site";

const FEATURED_DESIGNER_HANDLES = [
  "goyard",
  "hermes",
  "loewe",
  "valentino-garavani",
  "polene",
  "alexander-mcqueen",
];

export default function HomePage() {
  const newArrivals = getNewArrivals(7);
  const eveningEdit = getCollectionByHandle("the-evening-edit");
  const featuredCategories = CATEGORIES.filter((c) => ["bags", "bracelets", "wallets"].includes(c.handle));
  const featuredDesigners = FEATURED_DESIGNER_HANDLES.map(getDesignerByHandle).filter(
    (d): d is NonNullable<typeof d> => Boolean(d)
  );

  return (
    <>
      <Hero />
      <TrustStrip />

      <Section spaceTop="tight" spaceBottom="tight">
        <ImageTextSection
          eyebrow="Who We Are"
          title="A single curated store, now online."
          imageSeed="about-teaser"
          imageSrc="/storefront.png"
          imageAlt="Inside the Edit Experience store — shelves of bags beneath an arched window"
          footer={
            <LinkButton href="/our-story" variant="on-light">
              Our Story
            </LinkButton>
          }
        >
          <p>
            Edit Experience is a curated pre-owned luxury retailer — one physical store in {STORE_INFO.city},
            and a website built to make it easy to browse, understand and buy from it without a WhatsApp
            thread for every question.
          </p>
          <p>Every piece is inspected before it&rsquo;s listed. What you see is what&rsquo;s in the store.</p>
        </ImageTextSection>
      </Section>

      <Section bleed spaceTop="tight" spaceBottom="tight">
        <ProductRail
          eyebrow="Just In"
          title="New Arrivals"
          products={newArrivals}
          viewAllHref="/new-arrivals"
          layout="carousel"
        />
      </Section>

      <Section spaceTop="tight" spaceBottom="tight">
        <SectionHeader eyebrow="Shop by Category" title="Find what you're looking for" />
        <CategoryGrid categories={featuredCategories} />
      </Section>

      {/*
        Pine, not white: white is not in the palette at all, and the brand book
        puts Pine at 30% of surface against Ivory's 50%. This editorial rail is
        the natural dark moment on the page.
      */}
      {eveningEdit && newArrivals.length > 0 && (
        <Section className="bg-pine" bleed>
          <ProductRail
            eyebrow="Curated Edit"
            title={eveningEdit.title}
            description={eveningEdit.description}
            products={newArrivals}
            viewAllHref="/categories/bags"
            layout="carousel"
            onDark
          />
        </Section>
      )}

      <EditedBand
        statement="Every price reflects condition, rarity and current resale market — considered, not negotiated."
        caption="Pieces above ₹5,00,000 are available by enquiry, with concierge support throughout."
      />

      <DesignerStrip designers={featuredDesigners} />

      <Section spaceTop="tight" spaceBottom="tight">
        <ImageTextSection
          eyebrow="Authenticity"
          title="Trust is the product."
          imageSeed="authenticity-teaser"
          imageSrc="/authenticity.png"
          imageAlt="A gloved hand inspecting a Goyard tote before it is listed"
          reverse
          footer={
            <LinkButton href="/authenticity-promise" variant="on-light">
              How We Authenticate
            </LinkButton>
          }
        >
          <p>
            Every piece is inspected in-house before it&rsquo;s listed. Higher-value bags and watches also
            carry Entrupy certification where applicable.
          </p>
          <p>Every purchase — online or in-store — comes with a GST invoice.</p>
        </ImageTextSection>
      </Section>

      <ConciergeBanner />
      <VisitStoreSplit />
    </>
  );
}
