import Link from "next/link";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Container } from "@/components/ui/Container";
import type { Facets } from "@/lib/commerce/facets";
import type { Product } from "@/lib/commerce/types";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { FilterDrawer } from "./FilterDrawer";
import { FilterPanel } from "./FilterPanel";
import { SortSelect } from "./SortSelect";

/**
 * The listing body, shared by every route that lists products (category,
 * designer, collection, new-in) so they can't drift apart.
 *
 * A server component: the products and facet counts are already resolved on the
 * server, and only the controls that mutate the URL are client components.
 */
export function ProductListing({
  products,
  facets,
  activeCount,
  showDesignerFacet = true,
  clearHref,
}: {
  products: Product[];
  facets: Facets;
  activeCount: number;
  showDesignerFacet?: boolean;
  /** Where "clear filters" points from the empty state. */
  clearHref: string;
}) {
  const count = products.length;

  return (
    <Container className="py-10 tablet:py-14">
      <div className="tablet:grid tablet:grid-cols-[240px_1fr] tablet:gap-12">
        {/* Desktop rail. Sticky so the facets stay reachable down a long grid. */}
        <aside className="hidden tablet:block">
          <div className="sticky top-[140px] max-h-[calc(100vh-160px)] overflow-y-auto pr-1 pb-4">
            <FilterPanel facets={facets} activeCount={activeCount} showDesigner={showDesignerFacet} />
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[12.5px] text-pine-45" aria-live="polite">
              {count === 0 ? "No pieces" : `${count} ${count === 1 ? "piece" : "pieces"}`}
            </p>
            {/* Full width on mobile so Filter and Sort split the row evenly;
                natural widths from tablet up. */}
            <div className="flex w-full min-w-0 items-center gap-2 tablet:w-auto">
              <span className="flex min-w-0 flex-1 tablet:hidden">
                <FilterDrawer
                  facets={facets}
                  activeCount={activeCount}
                  resultCount={count}
                  showDesigner={showDesignerFacet}
                />
              </span>
              <SortSelect />
            </div>
          </div>

          <ActiveFilterChips facets={facets} />

          {count === 0 ? (
            <div className="border border-pine-12 px-6 py-16 text-center">
              <p className="font-serif text-[22px] text-pine">Nothing matches these filters.</p>
              <p className="mx-auto mt-2.5 max-w-[42ch] text-[14px] leading-relaxed font-light text-pine-70">
                Our stock is one-of-one, so combinations sell out. Clear a filter, or let the concierge source the
                piece you had in mind.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                {activeCount > 0 && (
                  <Link
                    href={clearHref}
                    scroll={false}
                    className="inline-flex items-center border border-pine px-7 py-[15px] text-[11.5px] font-medium uppercase tracking-[0.14em] text-pine transition duration-150 ease-luxury hover:bg-pine hover:text-ivory active:scale-[0.98] motion-reduce:active:scale-100"
                  >
                    Clear filters
                  </Link>
                )}
                <Link
                  href="/concierge"
                  className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-pine-45 underline-offset-4 transition-colors duration-150 ease-luxury hover:text-pine hover:underline"
                >
                  Ask the concierge
                </Link>
              </div>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </Container>
  );
}
