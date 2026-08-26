"use client";

import Link from "next/link";
import { useState } from "react";
import type { FacetOption } from "@/lib/commerce/facets";
import type { ListKey } from "@/lib/commerce/plp-query";
import { useFacetHref } from "./use-facet-href";

const COLLAPSED_COUNT = 8;

/**
 * One facet group. Options past `COLLAPSED_COUNT` are hidden behind "Show more"
 * so a long designer list doesn't bury the groups below it — the reference does
 * the same at ten.
 *
 * Each option is a link that carries the whole next URL, with a checkbox drawn
 * on top for affordance; the real input is `aria-hidden` and non-interactive so
 * there's exactly one thing to activate.
 */
export function FilterGroup({
  heading,
  facetKey,
  options,
}: {
  heading: string;
  facetKey: ListKey;
  options: FacetOption[];
}) {
  const [expanded, setExpanded] = useState(false);
  const { toggleHref, isChecked } = useFacetHref();

  if (options.length === 0) return null;

  const visible = expanded ? options : options.slice(0, COLLAPSED_COUNT);

  return (
    <div className="border-b border-pine-12 py-5">
      <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-pine">{heading}</h3>
      <ul className="space-y-1">
        {visible.map((option) => {
          const checked = isChecked(facetKey, option.value);
          return (
            <li key={option.value}>
              <Link
                href={toggleHref(facetKey, option.value)}
                scroll={false}
                aria-pressed={checked}
                className="group/opt flex items-center gap-2.5 py-1.5 text-[13px] transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-60"
              >
                <span
                  aria-hidden
                  className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors duration-150 ease-luxury ${
                    checked ? "border-pine bg-pine text-ivory" : "border-pine-22 group-hover/opt:border-pine-45"
                  }`}
                >
                  {checked && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M2.5 6.5l2.5 2.5 4.5-5.5" />
                    </svg>
                  )}
                </span>
                <span className={checked ? "text-pine" : "text-pine-70"}>{option.label}</span>
                <span className="text-pine-45">({option.count})</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {options.length > COLLAPSED_COUNT && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-pine-45 underline-offset-4 transition-colors duration-150 ease-luxury hover:text-pine hover:underline active:text-pine"
        >
          {expanded ? "Show less" : `Show all ${options.length}`}
        </button>
      )}
    </div>
  );
}
