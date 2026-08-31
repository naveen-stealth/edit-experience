"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import {
  NAV_PRIMARY,
  NAV_UTILITY_LEFT,
  NAV_UTILITY_RIGHT,
  SITE_NAME,
} from "@/lib/content/site";
import { CartButton } from "./CartButton";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

/**
 * Asymmetric on purpose: opening waits long enough that a pointer travelling
 * across the nav doesn't trigger panels it's only passing over, while closing
 * lingers so the move down into the panel doesn't dismiss it.
 */
const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 260;

const UTILITY_LINK =
  "transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-50";

/** Icon hit targets get padding beyond the glyph so they stay tappable. */
const ICON_BUTTON = `-m-2 p-2 ${UTILITY_LINK}`;

export function HeaderNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const scheduleOpen = useCallback((href: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenPanel(href), OPEN_DELAY_MS);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenPanel(null), CLOSE_DELAY_MS);
  }, []);

  const closeNow = useCallback(() => {
    clearTimeout(timer.current);
    setOpenPanel(null);
  }, []);

  const activeItem = NAV_PRIMARY.find((item) => item.href === openPanel && item.panel);
  const panelOpen = Boolean(activeItem);

  return (
    /*
     * Full-bleed rather than Container-width. The nav is chrome, not content —
     * it reads as the edge of the window, so it spans the viewport and only its
     * padding steps in. Content below still sits on the shared page spine.
     *
     * The bottom border yields to the dropdown: while the panel is open the
     * hairline moves to the panel's bottom edge, so nav and panel read as one
     * sheet of the same material instead of two surfaces with a seam between.
     */
    <div
      className={`relative border-b bg-ivory-92 backdrop-blur-md backdrop-saturate-150 transition-colors duration-200 ease-luxury supports-[not(backdrop-filter:blur(0px))]:bg-ivory ${
        panelOpen ? "border-transparent" : "border-pine-12"
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-5 tablet:px-10">
        <div className="flex items-center gap-6 text-micro uppercase tracking-caps-tight">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={`uppercase ${UTILITY_LINK} tablet:hidden`}
          >
            Menu
          </button>
          {NAV_UTILITY_LEFT.map((link) => (
            <Link key={link.href} href={link.href} className={`hidden ${UTILITY_LINK} tablet:inline`}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/" aria-label={SITE_NAME} className="justify-self-center">
          <Logo variant="dark" className="h-7 w-auto tablet:h-9" />
        </Link>

        <div className="flex items-center justify-end gap-5 tablet:gap-6">
          {NAV_UTILITY_RIGHT.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hidden text-micro uppercase tracking-caps-tight ${UTILITY_LINK} tablet:inline`}
            >
              {link.label}
            </Link>
          ))}

          <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search" className={ICON_BUTTON}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>

          <Link href="/account" aria-label="Account" className={`hidden tablet:block ${ICON_BUTTON}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" />
            </svg>
          </Link>

          <CartButton />
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="hidden flex-wrap justify-center gap-9 border-t border-pine-12 px-10 py-3.5 tablet:flex"
      >
        {NAV_PRIMARY.map((item) => {
          const isOpen = openPanel === item.href;
          return (
            <div
              key={item.href}
              onMouseEnter={() => (item.panel ? scheduleOpen(item.href) : scheduleClose())}
              onFocus={() => item.panel && setOpenPanel(item.href)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeNow();
              }}
            >
              <Link
                href={item.href}
                aria-expanded={item.panel ? isOpen : undefined}
                onKeyDown={(e) => e.key === "Escape" && closeNow()}
                className={`relative block pb-0.5 text-micro uppercase tracking-caps transition-colors duration-150 ease-luxury after:absolute after:bottom-0 after:left-0 after:h-px after:bg-pine after:transition-all after:duration-200 hover:text-pine active:opacity-60 ${
                  isOpen ? "text-pine after:w-full" : "text-pine/85 after:w-0 hover:after:w-full"
                }`}
              >
                {item.label}
              </Link>
            </div>
          );
        })}
      </nav>

      {/*
        One panel for the whole nav rather than one per item. A full-width
        dropdown has to span the header, so it can't be a child of a single nav
        item — anchoring it here lets it stretch edge to edge while the item
        above only drives which columns it shows.
      */}
      <MegaMenu columns={activeItem?.panel ?? []} open={panelOpen} onDismiss={closeNow} />

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
