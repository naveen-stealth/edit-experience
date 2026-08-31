"use client";

import Link from "next/link";
import { NAV_PRIMARY, NAV_UTILITY_LEFT, NAV_UTILITY_RIGHT } from "@/lib/content/site";
import { OverlayPortal } from "@/components/ui/OverlayPortal";
import { useOverlay } from "@/lib/utils/use-overlay";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";

/**
 * The utility pages live in the header's top row on desktop, which doesn't
 * exist on mobile — so the menu is their only route in. Primary (shop) links
 * first, then the utility set, or half the site is unreachable on a phone.
 */
const SECONDARY = [...NAV_UTILITY_LEFT, { label: "Account", href: "/account" }, ...NAV_UTILITY_RIGHT];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useOverlay<HTMLDivElement>(open, onClose);

  if (!open) return null;

  return (
    <OverlayPortal>
      <div
        ref={overlayRef}
        className="overlay-enter fixed inset-0 z-50 flex flex-col bg-ivory tablet:hidden"
        role="dialog"
        aria-modal
        aria-label="Menu"
      >
        {/*
          h-[68px] matches the header row exactly (py-5 + the 28px logo), so
          "Menu" here sits on the same baseline as the MENU trigger underneath —
          without it the title jumped ~7px when the overlay opened.
        */}
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-pine-12 px-5">
          <span className="text-micro uppercase tracking-caps-tight text-pine">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-m-2 p-2 text-micro uppercase tracking-caps-tight text-pine-45 transition-colors duration-150 ease-luxury active:text-pine"
          >
            Close
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul>
            {NAV_PRIMARY.map((item) => (
              <li key={item.href} className="border-b border-pine-12">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-4 text-body-sm uppercase tracking-caps text-pine transition-opacity duration-150 ease-luxury active:opacity-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6">
            {SECONDARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2.5 text-body-sm text-pine-70 transition-opacity duration-150 ease-luxury active:opacity-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-pine-12 px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <Link
            href={conciergeWhatsAppUrl()}
            onClick={onClose}
            className="block border border-pine px-6 py-3.5 text-center text-micro uppercase tracking-caps text-pine transition duration-150 ease-luxury active:scale-[0.98] motion-reduce:active:scale-100"
          >
            WhatsApp Concierge
          </Link>
        </div>
      </div>
    </OverlayPortal>
  );
}
