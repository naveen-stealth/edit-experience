import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/LinkButton";

export function Hero() {
  return (
    <section className="relative flex min-h-[560px] items-end overflow-hidden bg-pine tablet:min-h-[660px]">
      <Image
        src="/hero-fold.png"
        alt="A Goyard tote, tagged with an Edit Experience authentication card, styled on a velvet armchair"
        fill
        preload
        sizes="100vw"
        /*
          Tuned for the 2026-08 hero shot (1659x948, bag handles from y~12%).
          Desktop viewports are wider than the source, so the crop is vertical —
          y 30% keeps the handles clear of the top edge even at 1728px, spending
          the crop on the rug instead. Mobile crops horizontally (x 62% holds
          the bag in frame); y is irrelevant there.
        */
        className="object-cover object-[62%_38%] tablet:object-[70%_30%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,30,26,0.92)_0%,rgba(4,30,26,0.72)_32%,rgba(4,30,26,0.28)_58%,rgba(4,30,26,0.05)_78%),linear-gradient(180deg,rgba(4,30,26,0.05)_0%,rgba(4,30,26,0.3)_55%,rgba(4,30,26,0.88)_100%)]" />
      <Container className="relative z-10 py-14 tablet:py-16">
        <div className="max-w-lg">
          <Eyebrow onDark className="mb-3.5 block">
            This Week&rsquo;s Selection
          </Eyebrow>
          <h1 className="text-display-sm text-ivory tablet:text-display">
            Pieces Worth
            <br />
            the Wait
          </h1>
          <div className="mt-9">
            <LinkButton href="/new-arrivals" variant="on-dark">
              Explore the Collection
              <ArrowRightIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
