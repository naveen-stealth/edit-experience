"use client";

import Link from "next/link";
import type { Facets } from "@/lib/commerce/facets";
import { FilterGroup } from "./FilterGroup";
import { PriceFilter } from "./PriceFilter";
import { useFacetHref } from "./use-facet-href";

/**
 * The facet stack, shared by the desktop rail and the mobile drawer so there is
 * one definition of what can be filtered and in what order.
 *
 * `showDesigner` is off on a designer's own page, where the designer is the
 * route's scope rather than something to choose.
 */
export function FilterPanel({
  facets,
  activeCount,
  showDesigner = true,
}: {
  facets: Facets;
  activeCount: number;
  showDesigner?: boolean;
}) {
  const { clearHref } = useFacetHref();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b border-pine-12 pb-3">
        <h2 className="text-body-sm text-pine">Filter by</h2>
        {activeCount > 0 && (
          <Link
            href={clearHref}
            scroll={false}
            className="text-micro font-medium uppercase tracking-caps text-pine-45 underline-offset-4 transition-colors duration-150 ease-luxury hover:text-pine hover:underline active:text-pine"
          >
            Clear all
          </Link>
        )}
      </div>

      <FilterGroup heading="Category" facetKey="subcategory" options={facets.subcategory} />
      {showDesigner && <FilterGroup heading="Designer" facetKey="designer" options={facets.designer} />}
      <FilterGroup heading="Colour" facetKey="colour" options={facets.colour} />
      <FilterGroup heading="Availability" facetKey="availability" options={facets.availability} />
      <PriceFilter bounds={facets.priceBounds} />
    </div>
  );
}
