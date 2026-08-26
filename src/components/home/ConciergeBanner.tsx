import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/LinkButton";
import { SplitPanel } from "@/components/ui/SplitPanel";
import { STORE_INFO } from "@/lib/content/site";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";

export function ConciergeBanner() {
  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2">
      <div className="relative flex flex-col justify-center bg-pine py-14 text-ivory tablet:py-20">
        <SplitPanel side="left" className="relative z-10 tablet:pr-14">
          <Eyebrow onDark className="mb-3 block">
            Concierge
          </Eyebrow>
          <h2 className="text-[30px] leading-tight tablet:text-[36px]">
            Looking for something specific?
            <br />
            Our concierge can help source it.
          </h2>
          <p className="mt-4 max-w-md text-[14.5px] leading-relaxed font-light text-ivory-70">
            Recommendations, private sourcing, rare pieces, gifting and after-sales support — handled by a
            person, not a form.
          </p>
          <p className="mt-4 text-[12px] tracking-[0.02em] text-ivory-45">
            Concierge available {STORE_INFO.hours[0].hours}, {STORE_INFO.hours[0].days.toLowerCase()}.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <LinkButton href="/concierge" variant="on-dark">
              Speak to Concierge
            </LinkButton>
            <LinkButton href={conciergeWhatsAppUrl()} variant="on-dark" className="border-ivory-45">
              WhatsApp
            </LinkButton>
          </div>
        </SplitPanel>
      </div>
      {/*
        `w-full` is load-bearing. With only `aspect-ratio` and `min-height`, the
        height is the definite dimension and the width gets *derived* from it —
        1/1 against a 360px min-height produced a 360px-wide box that broke out
        of its own 320px grid column and gave the whole page a horizontal
        scrollbar. Making the width definite flips it, so the height derives.
      */}
      <div
        className="relative w-full overflow-hidden min-h-[360px] tablet:min-h-[480px]"
        style={{ aspectRatio: "1/1" }}
      >
        <Image
          src="/concierge.png"
          alt="A concierge handing over an Edit Experience card"
          fill
          sizes="(min-width: 980px) 50vw, 100vw"
          className="object-cover object-[center_18%]"
        />
      </div>
    </div>
  );
}
