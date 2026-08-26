import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_COLUMNS, SITE_NAME } from "@/lib/content/site";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";
import { NewsletterForm } from "./NewsletterForm";

const SOCIALS = [
  { label: "IG", title: "Instagram", href: "https://instagram.com", external: true },
  { label: "WA", title: "WhatsApp Concierge", href: conciergeWhatsAppUrl(), external: false },
  { label: "FB", title: "Facebook", href: "https://facebook.com", external: true },
];

/**
 * Full-bleed to match the header chrome, with the four link columns from the
 * approved footer design. Column order is the sitemap's own hierarchy: what you
 * can shop, who we are, how you're looked after, then the legal small print.
 */
export function Footer() {
  return (
    <footer className="bg-pine text-ivory-70">
      <div className="px-5 py-12 tablet:px-10 tablet:py-14">
        <div className="flex flex-wrap items-center justify-between gap-8 border-b border-ivory-10 pb-10">
          <Link href="/" aria-label={SITE_NAME}>
            <Logo variant="light" className="h-9 w-auto" />
          </Link>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 tablet:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4 className="mb-5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-ivory">
                {column.heading}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[12.5px] text-ivory-45 transition-colors duration-150 ease-luxury hover:text-ivory active:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory-10 pt-6 text-[11px] text-ivory-45">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}. All Rights Reserved.
          </span>
          <div className="flex items-center gap-2.5">
            {SOCIALS.map((social) =>
              social.external ? (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.title}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory-18 text-[10px] tracking-[0.06em] text-ivory-70 transition duration-150 ease-luxury hover:border-ivory-45 hover:text-ivory active:scale-95 motion-reduce:active:scale-100"
                >
                  {social.label}
                </a>
              ) : (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.title}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory-18 text-[10px] tracking-[0.06em] text-ivory-70 transition duration-150 ease-luxury hover:border-ivory-45 hover:text-ivory active:scale-95 motion-reduce:active:scale-100"
                >
                  {social.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
