import Link from "next/link";
import type { NavColumn } from "@/lib/content/site";

/**
 * A full-width dropdown, spanning the viewport beneath the nav row.
 *
 * `absolute` against the header rather than `fixed`: it should travel with the
 * sticky header and stay inside its stacking context. It also can't be `fixed`
 * here — the header's `backdrop-filter` establishes a containing block, so a
 * fixed child would be sized against the header instead of the screen.
 *
 * `invisible` rather than `hidden` keeps the panel transitionable while still
 * removing it from hit-testing and the tab order when closed.
 */
export function MegaMenu({
  columns,
  open,
  onDismiss,
}: {
  columns: NavColumn[];
  open: boolean;
  onDismiss: () => void;
}) {
  return (
    <div
      // Origin at the top edge so it reads as unfolding down out of the nav
      // rather than arriving from nowhere.
      className={`absolute inset-x-0 top-full origin-top border-b border-pine-12 bg-ivory shadow-[0_18px_40px_rgba(4,30,26,0.10)] transition duration-200 ease-luxury ${
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-1 opacity-0 motion-reduce:translate-y-0"
      }`}
      aria-hidden={!open}
      onKeyDown={(e) => e.key === "Escape" && onDismiss()}
    >
      <div className="mx-auto grid max-w-(--container-page) gap-10 px-10 py-10 tablet:grid-cols-4">
        {columns.map((column) => (
          <div key={column.heading}>
            <p className="mb-4 text-[10.5px] font-medium uppercase tracking-[0.16em] text-pine-45">
              {column.heading}
            </p>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    tabIndex={open ? undefined : -1}
                    className="block py-0.5 text-[13px] text-pine transition-opacity duration-150 ease-luxury hover:opacity-60 active:opacity-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
