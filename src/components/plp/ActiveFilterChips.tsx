"use client";

import Link from "next/link";
import type { Facets } from "@/lib/commerce/facets";
import { LIST_KEYS, readList, type ListKey } from "@/lib/commerce/plp-query";
import { formatMoney } from "@/lib/utils/format";
import { useFacetHref } from "./use-facet-href";

/**
 * What's currently applied, each removable in one tap.
 *
 * Without this the only record of an active filter is a checkbox inside a
 * collapsed group (or, on mobile, behind a drawer) — so a shopper can end up
 * staring at four results with no visible reason why.
 */
export function ActiveFilterChips({ facets }: { facets: Facets }) {
  const { raw, toggleHref, setHref, clearHref } = useFacetHref();

  const labelFor = (key: ListKey, value: string) => {
    const group = facets[key as keyof Facets];
    if (Array.isArray(group)) {
      const match = group.find((o) => o.value === value);
      if (match) return match.label;
    }
    return value;
  };

  const chips = LIST_KEYS.flatMap((key) =>
    readList(raw, key).map((value) => ({
      label: labelFor(key, value),
      href: toggleHref(key, value),
    }))
  );

  const min = typeof raw.priceMin === "string" ? Number(raw.priceMin) : undefined;
  const max = typeof raw.priceMax === "string" ? Number(raw.priceMax) : undefined;
  if (min !== undefined || max !== undefined) {
    const money = (n: number) => formatMoney({ amount: n, currency: "INR" });
    const label =
      min !== undefined && max !== undefined
        ? `${money(min)} – ${money(max)}`
        : min !== undefined
          ? `From ${money(min)}`
          : `Up to ${money(max!)}`;
    chips.push({ label, href: setHref({ priceMin: null, priceMax: null }) });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Link
          key={chip.label}
          href={chip.href}
          scroll={false}
          className="group/chip flex items-center gap-2 border border-pine-22 py-1.5 pr-2.5 pl-3 text-caption text-pine transition duration-150 ease-luxury hover:border-pine active:scale-[0.98] motion-reduce:active:scale-100"
        >
          {chip.label}
          <span aria-hidden className="text-pine-45 transition-colors duration-150 group-hover/chip:text-pine">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
            </svg>
          </span>
          <span className="sr-only">Remove filter</span>
        </Link>
      ))}
      {chips.length > 1 && (
        <Link
          href={clearHref}
          scroll={false}
          className="px-2 text-micro font-medium uppercase tracking-caps text-pine-45 underline-offset-4 transition-colors duration-150 ease-luxury hover:text-pine hover:underline active:text-pine"
        >
          Clear all
        </Link>
      )}
    </div>
  );
}
