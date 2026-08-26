"use client";

import Link from "next/link";
import { NAV_PRIMARY } from "@/lib/content/site";
import { OverlayPortal } from "@/components/ui/OverlayPortal";
import { useOverlay } from "@/lib/utils/use-overlay";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";

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
        <div className="flex items-center justify-between border-b border-pine-12 px-5 py-5">
          <span className="text-[11.5px] uppercase tracking-[0.14em] text-pine">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-m-2 p-2 text-[11px] uppercase tracking-[0.14em] text-pine-45 transition-colors duration-150 ease-luxury active:text-pine"
          >
            Close
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul>
            {NAV_PRIMARY.map((item) => (
              <li key={item.href} className="border-b border-pine-12 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-4 text-[13px] uppercase tracking-[0.14em] text-pine transition-opacity duration-150 ease-luxury active:opacity-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-pine-12 px-5 py-6">
          <Link
            href={conciergeWhatsAppUrl()}
            onClick={onClose}
            className="block border border-pine px-6 py-3.5 text-center text-[11.5px] uppercase tracking-[0.14em] text-pine transition duration-150 ease-luxury active:scale-[0.98] motion-reduce:active:scale-100"
          >
            WhatsApp Concierge
          </Link>
        </div>
      </div>
    </OverlayPortal>
  );
}
