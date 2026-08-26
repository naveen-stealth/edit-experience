import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_COLUMNS, SITE_NAME } from "@/lib/content/site";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-pine text-ivory-70">
      <Container className="py-14 tablet:py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-ivory-10 pb-10">
          <Logo variant="light" className="h-8 w-auto" />
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-10 py-10 tablet:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4 className="mb-4 text-[11px] uppercase tracking-[0.14em] text-ivory">{column.heading}</h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[13px] text-ivory-45 hover:text-ivory">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory-10 pt-6 text-[11.5px] text-ivory-45">
          <span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-ivory">Terms</Link>
            <Link href="/privacy" className="hover:text-ivory">Privacy</Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-7 w-7 items-center justify-center rounded-full border border-ivory-18 text-ivory-70 hover:text-ivory" aria-label="Instagram">
              IG
            </a>
            <Link href={conciergeWhatsAppUrl()} className="flex h-7 w-7 items-center justify-center rounded-full border border-ivory-18 text-ivory-70 hover:text-ivory" aria-label="WhatsApp Concierge">
              WA
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
