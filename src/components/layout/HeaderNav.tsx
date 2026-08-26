"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NAV_PRIMARY, SITE_NAME } from "@/lib/content/site";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";
import { CartButton } from "./CartButton";
import { WishlistNavLink } from "./WishlistNavLink";

/**
 * Asymmetric on purpose: opening waits long enough that a pointer travelling
 * across the nav doesn't trigger menus it's only passing over, while closing
 * lingers so the diagonal move down into the panel doesn't dismiss it.
 */
const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 260;

export function HeaderNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const scheduleOpen = useCallback((href: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenMenu(href), OPEN_DELAY_MS);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenMenu(null), CLOSE_DELAY_MS);
  }, []);

  /** Keyboard and Escape shouldn't wait on hover timing. */
  const closeNow = useCallback(() => {
    clearTimeout(timer.current);
    setOpenMenu(null);
  }, []);

  /*
   * Translucent so page content passes under the bar rather than hitting an
   * opaque strip, falling back to solid Ivory where backdrop-filter is missing.
   * The `sticky` itself lives on <header>: a sticky child only travels within
   * its containing block, and this wrapper's is no taller than the header.
   */
  return (
    <div className="border-b border-pine-12 bg-ivory-92 backdrop-blur-md backdrop-saturate-150 supports-[not(backdrop-filter:blur(0px))]:bg-ivory">
      <Container>
        {/*
          `auto` for the logo column, not a third of the row: fixed thirds are
          narrower than the wordmark at 375px, and because the logo sets height
          and leaves width automatic, the column was squashing it to 3.16:1
          against its true 4.18:1. The side columns flex around it instead.
        */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-5">
          <div className="flex items-center gap-6 text-[12px] uppercase tracking-[0.08em]">
            <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu" className="uppercase transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-50 tablet:hidden">
              Menu
            </button>
            <button type="button" onClick={() => setSearchOpen(true)} className="hidden uppercase transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-50 tablet:inline">
              Search
            </button>
            <Link href="/about" className="hidden transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-50 tablet:inline">
              Our Story
            </Link>
            <Link href="/visit-store" className="hidden transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-50 tablet:inline">
              Stores
            </Link>
          </div>

          <Link href="/" aria-label={SITE_NAME} className="justify-self-center">
            <Logo variant="dark" className="h-7 w-auto tablet:h-8" />
          </Link>

          <div className="flex items-center justify-end gap-6 text-[12px] uppercase tracking-[0.08em]">
            {/* Icon rather than the word on mobile: "Search" + "Bag" as text
                overflows the side column at 375px and crowds the wordmark. */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="-m-2 p-2 transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-50 tablet:hidden"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <span className="hidden tablet:inline">
              <WishlistNavLink />
            </span>
            <CartButton />
          </div>
        </div>

        <nav
          aria-label="Primary"
          className="hidden flex-wrap justify-center gap-8 border-t border-pine-12 py-3.5 tablet:flex"
          onMouseLeave={scheduleClose}
        >
          {NAV_PRIMARY.map((item) => {
            const isOpen = openMenu === item.href;
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => (item.megaMenu ? scheduleOpen(item.href) : scheduleClose())}
                onFocus={() => item.megaMenu && setOpenMenu(item.href)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeNow();
                }}
              >
                <Link
                  href={item.href}
                  aria-expanded={item.megaMenu ? isOpen : undefined}
                  onKeyDown={(e) => e.key === "Escape" && closeNow()}
                  className={`relative pb-0.5 text-[11.5px] uppercase tracking-[0.12em] transition-colors duration-150 ease-luxury after:absolute after:bottom-0 after:left-0 after:h-px after:bg-pine after:transition-all after:duration-200 hover:text-pine active:opacity-60 ${
                    isOpen ? "text-pine after:w-full" : "text-pine/90 after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </Link>
                {item.megaMenu && <MegaMenu columns={item.megaMenu} open={isOpen} />}
              </div>
            );
          })}
        </nav>
      </Container>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
