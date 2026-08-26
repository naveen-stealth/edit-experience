"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  buildQueryString,
  clearFiltersQueryString,
  readList,
  toggleListValue,
  type ListKey,
  type RawSearchParams,
} from "@/lib/commerce/plp-query";

/**
 * Turns the current URL into the hrefs the facet controls link to.
 *
 * Facets are rendered as links rather than buttons calling `router.push`, so
 * they work before hydration, can be opened in a new tab, and let the browser
 * prefetch the filtered view on hover. This hook is the only place that knows
 * how a toggle maps to a URL.
 */
export function useFacetHref() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = useMemo<RawSearchParams>(() => {
    const out: RawSearchParams = {};
    searchParams.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }, [searchParams]);

  const toggleHref = useCallback(
    (key: ListKey, value: string) => {
      const next = toggleListValue(readList(raw, key), value);
      // Any filter change resets paging — page 1 of the new result set.
      return `${pathname}${buildQueryString(raw, { [key]: next.length ? next : null, page: null })}`;
    },
    [pathname, raw]
  );

  const setHref = useCallback(
    (mutation: Record<string, string | string[] | null>) =>
      `${pathname}${buildQueryString(raw, { ...mutation, page: null })}`,
    [pathname, raw]
  );

  const clearHref = useMemo(() => `${pathname}${clearFiltersQueryString(raw)}`, [pathname, raw]);

  const isChecked = useCallback((key: ListKey, value: string) => readList(raw, key).includes(value), [raw]);

  return { raw, toggleHref, setHref, clearHref, isChecked };
}
