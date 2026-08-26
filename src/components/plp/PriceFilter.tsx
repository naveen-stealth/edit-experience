"use client";

import { useRouter } from "next/navigation";
import { useFacetHref } from "./use-facet-href";

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/**
 * Min/max price, committed on submit rather than per keystroke — a range needs
 * both ends before it means anything, and navigating on every character would
 * fire a request per digit.
 *
 * The inputs are uncontrolled and the form is keyed on the URL's current range,
 * so an external change (clear all, back button) remounts it with fresh
 * defaults. That avoids mirroring the URL into state and syncing it back in an
 * effect, which is a cascading render for no benefit.
 */
export function PriceFilter({ bounds }: { bounds: { min: number; max: number } | null }) {
  const router = useRouter();
  const { raw, setHref } = useFacetHref();

  if (!bounds || bounds.min === bounds.max) return null;

  const currentMin = typeof raw.priceMin === "string" ? raw.priceMin : "";
  const currentMax = typeof raw.priceMax === "string" ? raw.priceMax : "";

  const inputClass =
    "w-full border border-pine-22 bg-transparent px-3 py-2 text-[13px] text-pine transition-colors duration-150 ease-luxury placeholder:text-pine-45 hover:border-pine-45 focus:border-pine focus:outline-none";

  return (
    <form
      key={`${currentMin}-${currentMax}`}
      className="border-b border-pine-12 py-5"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const min = String(data.get("priceMin") ?? "").trim();
        const max = String(data.get("priceMax") ?? "").trim();
        router.push(setHref({ priceMin: min || null, priceMax: max || null }), { scroll: false });
      }}
    >
      <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-pine">Price</h3>
      <div className="flex items-center gap-2">
        <label className="flex-1">
          <span className="sr-only">Minimum price in rupees</span>
          <input
            type="number"
            name="priceMin"
            inputMode="numeric"
            min={0}
            defaultValue={currentMin}
            placeholder={inr.format(bounds.min)}
            className={inputClass}
          />
        </label>
        <span aria-hidden className="text-pine-45">
          &ndash;
        </span>
        <label className="flex-1">
          <span className="sr-only">Maximum price in rupees</span>
          <input
            type="number"
            name="priceMax"
            inputMode="numeric"
            min={0}
            defaultValue={currentMax}
            placeholder={inr.format(bounds.max)}
            className={inputClass}
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-pine-45 underline-offset-4 transition-colors duration-150 ease-luxury hover:text-pine hover:underline active:text-pine"
      >
        Apply price
      </button>
    </form>
  );
}
