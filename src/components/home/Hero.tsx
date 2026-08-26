import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/LinkButton";
import { STORE_INFO } from "@/lib/content/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[560px] items-end overflow-hidden bg-pine tablet:min-h-[660px]">
      <Image
        src="/hero-fold.png"
        alt="A Goyard tote, tagged with an Edit Experience authentication card, styled on a velvet armchair"
        fill
        preload
        sizes="100vw"
        className="object-cover object-[62%_38%] tablet:object-[70%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,30,26,0.92)_0%,rgba(4,30,26,0.72)_32%,rgba(4,30,26,0.28)_58%,rgba(4,30,26,0.05)_78%),linear-gradient(180deg,rgba(4,30,26,0.05)_0%,rgba(4,30,26,0.3)_55%,rgba(4,30,26,0.88)_100%)]" />
      <Container className="relative z-10 py-14 tablet:py-16">
        <div className="max-w-lg">
          <Eyebrow onDark className="mb-3.5 block">
            The New Arrival
          </Eyebrow>
          <h1 className="text-[38px] leading-[1.08] text-ivory tablet:text-[58px]">
            A considered selection of exceptional pieces.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed font-light text-ivory-70">
            Authenticated pre-owned luxury, sourced and inspected in-house. Every piece is available to view
            online or in our {STORE_INFO.city} store.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <LinkButton href="/new-in" variant="on-dark">
              Shop New Arrivals
            </LinkButton>
            <LinkButton href="/journal" variant="on-dark" className="border-ivory-45">
              Discover The Edit
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
