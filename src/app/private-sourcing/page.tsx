import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/ContentPage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/LinkButton";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PRIVATE_SOURCING_TERMS } from "@/lib/commerce/config";
import { privateSourcingWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Private Sourcing" };

const STEPS = [
  {
    title: "Tell us the piece",
    description:
      "Send the style, colourway and any reference photos on WhatsApp. The more specific the brief, the faster the search.",
  },
  {
    title: "We confirm and quote",
    description: `Once we've verified the piece can be found, you'll get a quote. Sourcing begins with a ${PRIVATE_SOURCING_TERMS.advancePercent}% advance.`,
  },
  {
    title: "We source and inspect",
    description: `Typically around ${PRIVATE_SOURCING_TERMS.typicalTurnaroundWeeks} weeks, depending on rarity. Every sourced piece passes the same in-house inspection as our own stock.`,
  },
  {
    title: "Collect or receive it",
    description:
      "Pick the piece up in store or have it delivered — tagged, invoiced and gift-ready if you'd like.",
  },
];

export default function PrivateSourcingPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Private Sourcing" }]} />

      {/* Portrait source (2:3, subject centred) beside the header — the split
          mirrors ImageTextSection but promotes the text cell to the page h1. */}
      <Section spaceTop="tight" spaceBottom="tight">
        <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
          <div>
            <Eyebrow as="p" className="mb-3 block">
              Concierge
            </Eyebrow>
            <h1 className="text-display-sm text-pine tablet:text-display">Private Sourcing</h1>
            <div className="mt-5 max-w-[62ch] space-y-5 text-body font-light text-pine-70">
              <p>
                Looking for a specific piece we don&rsquo;t currently hold? We source on request —
                discontinued styles, rare colourways and collector pieces included.
              </p>
              <p>
                The search runs through the same network we buy our own stock from, so a sourced
                piece is held to the same standard as anything on our shelves.
              </p>
            </div>
            <div className="mt-7">
              <LinkButton href={privateSourcingWhatsAppUrl()} variant="on-light">
                Start a Sourcing Request
              </LinkButton>
            </div>
          </div>
          <div
            className="relative min-h-[320px] w-full overflow-hidden tablet:min-h-[460px]"
            style={{ aspectRatio: "4/5" }}
          >
            <Image
              src="/private-sourcing-hero.png"
              alt="Gloved hands presenting a tagged Goyard top-handle bag against a plain studio backdrop"
              fill
              sizes="(min-width: 980px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section spaceTop="tight" spaceBottom="tight">
        <SectionHeader
          align="left"
          eyebrow="How It Works"
          title="Four steps, one point of contact"
          description="The same person handles your request from brief to hand-over."
        />
        <ol className="grid grid-cols-1 gap-x-(--grid-gutter) gap-y-10 tablet:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="border-t border-pine-12 pt-5">
              <p className="text-micro tracking-caps text-pine-45">0{i + 1}</p>
              <h3 className="mt-2 text-body-sm font-medium text-pine">{step.title}</h3>
              <p className="mt-2 text-body-sm font-light text-pine-70">{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 max-w-[62ch]">
          <PlaceholderNote />
        </div>
      </Section>

      <div className="bg-pine py-14 tablet:py-20">
        <Container>
          <div className="max-w-[62ch]">
            <Eyebrow onDark className="mb-3 block">
              Begin the Search
            </Eyebrow>
            <h2 className="text-title text-ivory tablet:text-display-sm">
              The rarer the piece, the sooner we should start.
            </h2>
            <p className="mt-4 max-w-md text-body font-light text-ivory-70">
              A short WhatsApp message with the style and colourway is enough to begin — no advance
              until the piece is confirmed findable.
            </p>
            <LinkButton href={privateSourcingWhatsAppUrl()} variant="on-dark" className="mt-7">
              Start on WhatsApp
            </LinkButton>
          </div>
        </Container>
      </div>
    </>
  );
}
