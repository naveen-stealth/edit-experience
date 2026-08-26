"use client";

import { useCallback, useState } from "react";
import type { Facets } from "@/lib/commerce/facets";
import { useOverlay } from "@/lib/utils/use-overlay";
import { FilterPanel } from "./FilterPanel";

/**
 * Mobile filtering. The trigger reports the active count so the shopper knows
 * filters are on without opening it.
 *
 * The panel stays mounted while facets are toggled: each toggle is a soft
 * navigation, and because this component doesn't unmount, the drawer keeps its
 * open state and scroll position across them. That lets several filters be
 * applied in one pass, with the result count updating live in the footer.
 */
export function FilterDrawer({
  facets,
  activeCount,
  resultCount,
  showDesigner = true,
}: {
  facets: Facets;
  activeCount: number;
  resultCount: number;
  showDesigner?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const overlayRef = useOverlay<HTMLDivElement>(open, close);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 border border-pine-22 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-pine transition duration-150 ease-luxury hover:border-pine active:scale-[0.98] motion-reduce:active:scale-100"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path d="M2 4.5h12M4.5 8h7M6.5 11.5h3" />
        </svg>
        Filter
        {activeCount > 0 && <span className="text-pine-45">({activeCount})</span>}
      </button>

      {open && (
        <div ref={overlayRef} className="fixed inset-0 z-50 flex" role="dialog" aria-modal aria-label="Filter products">
          <button aria-label="Close filters" onClick={close} className="absolute inset-0 bg-pine/30" />
          <div className="relative flex h-full w-full max-w-sm flex-col bg-ivory">
            <div className="flex items-center justify-between border-b border-pine-12 px-5 py-5">
              <h2 className="font-serif text-2xl text-pine">Filter</h2>
              <button
                type="button"
                onClick={close}
                aria-label="Close filters"
                className="-m-2 p-2 text-[11px] uppercase tracking-[0.14em] text-pine-45 transition-colors duration-150 ease-luxury hover:text-pine active:text-pine"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-6">
              <FilterPanel facets={facets} activeCount={activeCount} showDesigner={showDesigner} />
            </div>

            <div className="border-t border-pine-12 px-5 py-5">
              <button
                type="button"
                onClick={close}
                className="w-full border border-pine bg-pine px-7 py-[15px] text-[11.5px] font-medium uppercase tracking-[0.14em] text-ivory transition duration-150 ease-luxury active:scale-[0.98] motion-reduce:active:scale-100"
              >
                Show {resultCount} {resultCount === 1 ? "piece" : "pieces"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
