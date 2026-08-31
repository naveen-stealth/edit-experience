"use client";

import { useRouter } from "next/navigation";
import { SORT_OPTIONS, readSort } from "@/lib/commerce/plp-query";
import { useFacetHref } from "./use-facet-href";

/**
 * A native `<select>` on purpose: it gets the platform's own picker — a wheel on
 * iOS, a keyboard-navigable list everywhere — which beats a custom menu for a
 * control this simple, and it stays usable at any text size.
 */
export function SortSelect() {
  const router = useRouter();
  const { raw, setHref } = useFacetHref();
  const current = readSort(raw);

  /*
   * `min-w-0` + `w-full` on the select: a native select sizes itself to its
   * widest option and refuses to shrink below that, so "Price: Low to High" made
   * the control 194px and pushed the toolbar past a 320px viewport. Letting it
   * shrink is what keeps the row inside the page.
   */
  return (
    <label className="flex min-w-0 flex-1 items-center gap-2 tablet:flex-none">
      <span className="sr-only">Sort products by</span>
      <div className="relative w-full min-w-0">
        <select
          value={current}
          onChange={(e) => router.push(setHref({ sort: e.target.value }), { scroll: false })}
          className="w-full min-w-0 appearance-none border border-pine-22 bg-transparent py-2.5 pr-9 pl-4 text-micro font-medium uppercase tracking-caps text-pine transition-colors duration-150 ease-luxury hover:border-pine focus:border-pine focus:outline-none"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-pine-45"
        >
          <path d="M2 4.5L6 8.5L10 4.5" />
        </svg>
      </div>
    </label>
  );
}
