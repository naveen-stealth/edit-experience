import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_COLUMNS, SITE_NAME } from "@/lib/content/site";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";
import { NewsletterForm } from "./NewsletterForm";

/*
 * Instagram keeps the site's stroke-icon style; WhatsApp's mark is inherently a
 * filled glyph, so it renders as fill — both read as their brand logos rather
 * than the text initials they replaced.
 */
const InstagramIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const SOCIALS = [
  { icon: InstagramIcon, title: "Instagram", href: "https://instagram.com", external: true },
  { icon: WhatsAppIcon, title: "WhatsApp Concierge", href: conciergeWhatsAppUrl(), external: false },
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
              <h4 className="mb-5 text-micro font-medium uppercase tracking-caps text-ivory">
                {column.heading}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-caption text-ivory-45 transition-colors duration-150 ease-luxury hover:text-ivory active:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory-10 pt-6 text-micro text-ivory-45">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}. All Rights Reserved.
          </span>
          <div className="flex items-center gap-2.5">
            {SOCIALS.map((social) =>
              social.external ? (
                <a
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.title}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory-18 text-ivory-70 transition duration-150 ease-luxury hover:border-ivory-45 hover:text-ivory active:scale-95 motion-reduce:active:scale-100"
                >
                  {social.icon}
                </a>
              ) : (
                <Link
                  key={social.title}
                  href={social.href}
                  aria-label={social.title}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ivory-18 text-ivory-70 transition duration-150 ease-luxury hover:border-ivory-45 hover:text-ivory active:scale-95 motion-reduce:active:scale-100"
                >
                  {social.icon}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
