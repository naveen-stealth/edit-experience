import Link from "next/link";
import { STORE_INFO } from "@/lib/content/site";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";

/** Full-bleed, matching the nav below it — chrome runs to the window edge. */
export function UtilityBar() {
  return (
    <div className="hidden bg-black px-5 py-2 text-[10.5px] tracking-[0.04em] text-ivory-92 tablet:flex tablet:items-center tablet:justify-between tablet:px-10">
      <div className="flex items-center gap-4">
        <span>{STORE_INFO.city}, India</span>
        <Dot />
        <span>Concierge · {STORE_INFO.hours[0].hours} daily</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href={conciergeWhatsAppUrl()} className="opacity-85 transition-opacity duration-150 ease-luxury hover:opacity-100">
          WhatsApp Concierge
        </Link>
        <Dot />
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-85 transition-opacity duration-150 ease-luxury hover:opacity-100"
        >
          Instagram
        </a>
      </div>
    </div>
  );
}

function Dot() {
  return <span aria-hidden className="inline-block h-[3px] w-[3px] rounded-full bg-ivory-45" />;
}
