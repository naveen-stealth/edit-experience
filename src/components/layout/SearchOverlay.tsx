"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { searchProducts } from "@/lib/commerce/products";
import { CATEGORIES } from "@/lib/commerce/collections";
import { ProductPrice } from "@/components/commerce/ProductPrice";
import { trackEvent } from "@/lib/analytics";
import { useOverlay } from "@/lib/utils/use-overlay";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query, 6), [query]);

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  const overlayRef = useOverlay<HTMLDivElement>(open, handleClose);

  useEffect(() => {
    if (query.trim().length > 1) trackEvent({ name: "search", query });
  }, [query]);

  if (!open) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex flex-col bg-ivory" role="dialog" aria-modal aria-label="Search">
      <div className="border-b border-pine-12 px-5 py-5 tablet:px-10">
        <div className="mx-auto flex max-w-(--container-page) items-center gap-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="shrink-0 text-pine-45">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand, product or category"
            className="flex-1 bg-transparent font-serif text-2xl text-pine placeholder:text-pine-22 focus:outline-none"
          />
          <button type="button" onClick={handleClose} aria-label="Close search" className="-m-2 p-2 text-[11px] uppercase tracking-[0.14em] text-pine-45 transition-colors duration-150 ease-luxury hover:text-pine active:text-pine">
            Close
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-(--container-page) flex-1 overflow-y-auto px-5 py-10 tablet:px-10">
        {query.trim().length === 0 ? (
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.14em] text-pine-45">Shop by category</p>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.handle}`}
                  onClick={handleClose}
                  className="border border-pine-22 px-4 py-2.5 text-[13px] text-pine transition duration-150 ease-luxury hover:border-pine active:scale-[0.98] motion-reduce:active:scale-100"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="text-sm text-pine-45">
            Nothing matched &ldquo;{query}&rdquo;. Our concierge can help source it — see the Concierge page.
          </p>
        ) : (
          <ul className="space-y-6">
            {results.map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.handle}`} onClick={handleClose} className="flex items-center justify-between gap-6 border-b border-pine-12 pb-4">
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.1em] text-pine-45">{product.brand}</span>
                    <span className="block text-[15px] text-pine">{product.title}</span>
                  </span>
                  <ProductPrice product={product} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
