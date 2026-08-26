import type { ProductAvailability, ProductCondition, ProductFilters, ProductSort } from "./types";

/**
 * The listing page keeps all of its state in the URL rather than in component
 * state, so a filtered view is shareable, survives a reload, and the back button
 * steps through filter changes. This module is the single translator between
 * search params and `ProductFilters` — nothing else parses or serialises them.
 */

export type RawSearchParams = Record<string, string | string[] | undefined>;

export const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "newest", label: "Newest In" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const SORT_VALUES = new Set<string>(SORT_OPTIONS.map((o) => o.value));

/** Multi-select facets travel as comma-joined lists — `?colour=black,tan`. */
export const LIST_KEYS = ["designer", "colour", "condition", "availability"] as const;
export type ListKey = (typeof LIST_KEYS)[number];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function readList(params: RawSearchParams, key: ListKey): string[] {
  const raw = first(params[key]);
  if (!raw) return [];
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function readNumber(params: RawSearchParams, key: string): number | undefined {
  const raw = first(params[key]);
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export function readSort(params: RawSearchParams): ProductSort {
  const raw = first(params.sort);
  return raw && SORT_VALUES.has(raw) ? (raw as ProductSort) : "newest";
}

/**
 * `scope` is the filter the route itself implies — the category on a category
 * page, the designer on a designer page. It always wins over search params, so
 * a stray `?category=` can't leak a shopper out of the page they're on.
 */
export function parseFilters(params: RawSearchParams, scope: ProductFilters = {}): ProductFilters {
  const condition = readList(params, "condition") as ProductCondition[];
  const availability = readList(params, "availability") as ProductAvailability[];
  const designer = readList(params, "designer");
  const colour = readList(params, "colour");

  return {
    ...scope,
    /*
     * A designer page fixes `designerHandle` as scope; on any other listing the
     * designer is a multi-select facet and goes to `designerHandles`. Writing a
     * multi-select into the single-value field would drop every selection past
     * the first — or, worse, silently drop all of them.
     */
    designerHandles: scope.designerHandle || designer.length === 0 ? undefined : designer,
    condition: condition.length ? condition : undefined,
    availability: availability.length ? availability : undefined,
    colour: colour.length ? colour : undefined,
    priceMin: readNumber(params, "priceMin"),
    priceMax: readNumber(params, "priceMax"),
    query: first(params.q) || undefined,
  };
}

/** Facets the shopper controls, i.e. everything except the route's own scope. */
export function countActiveFilters(params: RawSearchParams): number {
  const lists = LIST_KEYS.reduce((n, key) => n + readList(params, key).length, 0);
  const price = (first(params.priceMin) ? 1 : 0) + (first(params.priceMax) ? 1 : 0);
  return lists + price;
}

export function hasActiveFilters(params: RawSearchParams): boolean {
  return countActiveFilters(params) > 0;
}

/**
 * Serialises a mutation back to a query string. Empty values are removed rather
 * than written as blanks, so URLs stay short and two routes to the same view
 * produce the same string.
 */
export function buildQueryString(
  params: RawSearchParams,
  mutation: Record<string, string | string[] | null>
): string {
  const next = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    const v = first(value);
    if (v) next.set(key, v);
  }

  for (const [key, value] of Object.entries(mutation)) {
    if (value === null || value.length === 0) {
      next.delete(key);
      continue;
    }
    next.set(key, Array.isArray(value) ? value.join(",") : value);
  }

  const s = next.toString();
  return s ? `?${s}` : "";
}

/** Adds or removes one value from a list facet. */
export function toggleListValue(current: string[], value: string): string[] {
  return current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
}

export function clearFiltersQueryString(params: RawSearchParams): string {
  const sort = first(params.sort);
  return sort ? `?sort=${sort}` : "";
}
