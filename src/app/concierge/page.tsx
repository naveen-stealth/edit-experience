import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CONCIERGE_SERVICES, STORE_INFO } from "@/lib/content/site";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Concierge" };

const PHONE_HREF = `tel:${STORE_INFO.phoneDisplay.replace(/\s/g, "")}`;

export default function ConciergePage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Concierge" }]} />

      {/* Portrait source (2:3, card hand-off centred) beside the header — the
          same split-opener anatomy as Private Sourcing, its sibling page. */}
      <Section spaceTop="tight" spaceBottom="tight">
        <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
          <div>
            <Eyebrow as="p" className="mb-3 block">
              Client Care
            </Eyebrow>
            <h1 className="text-display-sm text-pine tablet:text-display">Concierge</h1>
            <p className="mt-5 max-w-[62ch] text-body font-light text-pine-70">
              Questions, sourcing, sizing, after-sales — answered by a person, not a chatbot.
            </p>
            <p className="mt-4 text-caption text-pine-45">
              Available {STORE_INFO.hours[0].hours}, {STORE_INFO.hours[0].days.toLowerCase()}.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <LinkButton href={conciergeWhatsAppUrl()} variant="on-light">
                WhatsApp the Concierge
              </LinkButton>
              <LinkButton href={PHONE_HREF} variant="on-light">
                Call {STORE_INFO.phoneDisplay}
              </LinkButton>
            </div>
          </div>
          <div
            className="relative min-h-[320px] w-full overflow-hidden tablet:min-h-[460px]"
            style={{ aspectRatio: "4/5" }}
          >
            <Image
              src="/concierge.png"
              alt="A concierge passing an Edit Experience card across the counter"
              fill
              preload
              sizes="(min-width: 980px) 50vw, 100vw"
              /* Card sits in the upper half of the source; bias the crop up. */
              className="object-cover object-[center_38%]"
            />
          </div>
        </div>
      </Section>

      <Section spaceTop="tight" spaceBottom="tight">
        <SectionHeader
          align="left"
          eyebrow="What We Handle"
          title="One person, six kinds of help"
          description="Every request below lands with the same small team that handles the pieces daily."
        />
        <dl className="grid grid-cols-1 gap-x-(--grid-gutter) gap-y-10 tablet:grid-cols-3">
          {CONCIERGE_SERVICES.map((s, i) => (
            <div key={s.title} className="border-t border-pine-12 pt-5">
              <dt className="flex items-baseline justify-between gap-4">
                <span className="text-body-sm font-medium text-pine">{s.title}</span>
                <span className="text-micro tracking-caps text-pine-45">0{i + 1}</span>
              </dt>
              <dd className="mt-2 text-body-sm font-light text-pine-70">{s.description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* The one deep-service hand-off: sourcing has its own page and process. */}
      <div className="bg-pine py-14 tablet:py-20">
        <Container>
          <div className="max-w-[62ch]">
            <Eyebrow onDark className="mb-3 block">
              Private Sourcing
            </Eyebrow>
            <h2 className="text-title text-ivory tablet:text-display-sm">
              Can&rsquo;t find it on the shelf?
            </h2>
            <p className="mt-4 max-w-md text-body font-light text-ivory-70">
              Discontinued styles, rare colourways and collector pieces, sourced on request — with the
              same in-house inspection as our own stock.
            </p>
            <LinkButton href="/private-sourcing" variant="on-dark" className="mt-7">
              How Sourcing Works
            </LinkButton>
          </div>
        </Container>
      </div>
    </>
  );
}
