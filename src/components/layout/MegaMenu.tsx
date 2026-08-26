import Link from "next/link";
import type { NavColumn } from "@/lib/content/site";

/**
 * Controlled rather than CSS-only. `hidden`/`block` cannot be transitioned, so
 * the menu used to appear and vanish instantly — and with no hover intent it
 * flashed open for every item the pointer crossed on its way somewhere else.
 * Opening is now delayed and closing lingers (see HeaderNav), and the surface
 * fades and settles into place instead of snapping.
 *
 * `invisible` rather than `hidden` keeps the element transitionable while still
 * removing it from the tab order and from pointer events when closed.
 */
export function MegaMenu({ columns, open }: { columns: NavColumn[]; open: boolean }) {
  return (
    <div
      className={`absolute top-full left-1/2 w-64 -translate-x-1/2 border border-pine-12 bg-ivory py-6 shadow-[0_18px_40px_rgba(4,30,26,0.10)] transition duration-200 ease-luxury ${
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-1 opacity-0 motion-reduce:translate-y-0"
      }`}
      aria-hidden={!open}
    >
      {columns.map((column) => (
        <div key={column.heading} className="px-6">
          <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-pine-45">{column.heading}</p>
          <ul className="space-y-2.5">
            {column.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  tabIndex={open ? undefined : -1}
                  className="block py-0.5 text-[13px] text-pine transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
