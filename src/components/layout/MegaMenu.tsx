import Link from "next/link";
import type { NavColumn } from "@/lib/content/site";

/**
 * Dropdown content only — no background, blur or border of its own. The
 * material is the header's single curtain (see HeaderNav), which stretches to
 * cover this panel; painting a second surface here is what used to create the
 * divided look, because a nested backdrop-filter can't sample the page through
 * its ancestor's backdrop root.
 *
 * Timing is asymmetric, apple.com-style: entering content waits a beat for the
 * curtain to lead and settles slightly downward into place; exiting content
 * gets out fast so the curtain can retract over empty glass.
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
      className={`transition-[opacity,transform] ease-luxury ${
        open
          ? "visible translate-y-0 opacity-100 delay-100 duration-200"
          : "invisible -translate-y-1 opacity-0 delay-0 duration-150 motion-reduce:translate-y-0"
      }`}
      aria-hidden={!open}
      onKeyDown={(e) => e.key === "Escape" && onDismiss()}
    >
      <div className="mx-auto grid max-w-(--container-page) gap-10 px-10 py-10 tablet:grid-cols-4">
        {columns.map((column) => (
          <div key={column.heading}>
            <p className="mb-4 text-micro font-medium uppercase tracking-caps text-pine-45">
              {column.heading}
            </p>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    tabIndex={open ? undefined : -1}
                    className="block py-0.5 text-body-sm text-pine transition-opacity duration-150 ease-luxury hover:opacity-60 active:opacity-50"
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
