"use client";

import { useId, useState, type ReactNode } from "react";

export interface DetailPanel {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * The same content as tabs on desktop and as an accordion on mobile — the
 * pattern the reference PDP uses, and the right call in both places: a tab strip
 * needs horizontal room to stay readable, while stacked disclosures let a narrow
 * screen show the whole list of what's available without scrolling past it.
 *
 * Both renderings share one `open` state, so switching viewports mid-session
 * keeps whichever section the shopper was reading.
 */
export function DetailPanels({ panels }: { panels: DetailPanel[] }) {
  // Undefined is a real state on mobile — every accordion section collapsed.
  const [openId, setOpenId] = useState<string | undefined>(panels[0]?.id);
  const base = useId();

  if (panels.length === 0) return null;

  return (
    <div>
      {/* Desktop: tabs */}
      <div className="hidden tablet:block">
        <div role="tablist" aria-label="Product details" className="flex flex-wrap border-b border-pine-12">
          {panels.map((panel) => {
            const selected = panel.id === openId;
            return (
              <button
                key={panel.id}
                type="button"
                role="tab"
                id={`${base}-tab-${panel.id}`}
                aria-selected={selected}
                aria-controls={`${base}-panel-${panel.id}`}
                onClick={() => setOpenId(panel.id)}
                className={`-mb-px border-b px-4 py-3 text-micro font-medium uppercase tracking-caps transition-colors duration-150 ease-luxury ${
                  selected
                    ? "border-pine text-pine"
                    : "border-transparent text-pine-45 hover:text-pine active:text-pine"
                }`}
              >
                {panel.label}
              </button>
            );
          })}
        </div>
        {panels.map((panel) => (
          <div
            key={panel.id}
            role="tabpanel"
            id={`${base}-panel-${panel.id}`}
            aria-labelledby={`${base}-tab-${panel.id}`}
            hidden={panel.id !== openId}
            className="pt-5 text-body font-light text-pine-70"
          >
            {panel.content}
          </div>
        ))}
      </div>

      {/* Mobile: accordion */}
      <div className="tablet:hidden">
        {panels.map((panel) => {
          const open = panel.id === openId;
          return (
            <div key={panel.id} className="border-b border-pine-12">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${base}-acc-${panel.id}`}
                onClick={() => setOpenId(open ? undefined : panel.id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-micro font-medium uppercase tracking-caps text-pine transition-opacity duration-150 ease-luxury active:opacity-60"
              >
                {panel.label}
                <span aria-hidden className="relative h-3 w-3 shrink-0">
                  <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-pine" />
                  <span
                    className={`absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-pine transition-transform duration-200 ease-luxury ${
                      open ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
              <div
                id={`${base}-acc-${panel.id}`}
                hidden={!open}
                className="pb-5 text-body font-light text-pine-70"
              >
                {panel.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
