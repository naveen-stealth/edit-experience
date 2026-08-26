import { CONDITION_LABEL, type Product, type ProductFilters } from "./types";
import { DESIGNERS } from "./collections";

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

export interface Facets {
  designer: FacetOption[];
  colour: FacetOption[];
  condition: FacetOption[];
  availability: FacetOption[];
  priceBounds: { min: number; max: number } | null;
}

type FacetKey = "designer" | "colour" | "condition" | "availability";

const AVAILABILITY_LABEL: Record<string, string> = {
  in_stock: "Available",
  low_stock: "Only 1 left",
  reserved: "Reserved",
  sold: "Sold",
  enquire: "By enquiry",
};

const DESIGNER_NAME = new Map(DESIGNERS.map((d) => [d.handle, d.name]));

/**
 * Applies every filter *except* the one being counted.
 *
 * Counting against the fully filtered set would make each option read as the
 * result of selecting it *in addition to itself*, so every unselected option in
 * an active group would show 0 and look unavailable. Excluding the group's own
 * selection is what makes the numbers mean "what you'd get if you picked this".
 */
function matchesExcept(product: Product, filters: ProductFilters, except: FacetKey): boolean {
  if (filters.category && product.category !== filters.category) return false;
  if (filters.designerHandle && product.designerHandle !== filters.designerHandle) return false;
  if (filters.collectionHandle && !product.collectionIds.includes(filters.collectionHandle)) return false;
  if (filters.gender && product.gender !== filters.gender && product.gender !== "unisex") return false;
  if (typeof filters.priceMin === "number" && product.price.amount < filters.priceMin) return false;
  if (typeof filters.priceMax === "number" && product.price.amount > filters.priceMax) return false;

  if (except !== "condition" && filters.condition?.length && !filters.condition.includes(product.condition)) {
    return false;
  }
  if (
    except !== "availability" &&
    filters.availability?.length &&
    !filters.availability.includes(product.availability)
  ) {
    return false;
  }
  if (except !== "colour" && filters.colour?.length) {
    if (!product.colour || !filters.colour.includes(product.colour)) return false;
  }
  if (
    except !== "designer" &&
    filters.designerHandles?.length &&
    !filters.designerHandles.includes(product.designerHandle)
  ) {
    return false;
  }

  if (filters.query) {
    const q = filters.query.trim().toLowerCase();
    if (![product.title, product.brand].join(" ").toLowerCase().includes(q)) return false;
  }

  return true;
}

function tally(
  scope: Product[],
  filters: ProductFilters,
  key: FacetKey,
  pick: (p: Product) => string | undefined,
  label: (value: string) => string
): FacetOption[] {
  const counts = new Map<string, number>();

  for (const product of scope) {
    if (!matchesExcept(product, filters, key)) continue;
    const value = pick(product);
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([value, count]) => ({ value, label: label(value), count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/**
 * Facet options and counts for a listing page.
 *
 * `scope` is the route's own product set (a category, a designer, everything) —
 * counts are always computed inside it, so a category page never offers a facet
 * that would return nothing.
 */
export function computeFacets(scope: Product[], filters: ProductFilters): Facets {
  const prices = scope.map((p) => p.price.amount);

  return {
    designer: tally(scope, filters, "designer", (p) => p.designerHandle, (v) => DESIGNER_NAME.get(v) ?? v),
    colour: tally(scope, filters, "colour", (p) => p.colour, (v) => v),
    condition: tally(
      scope,
      filters,
      "condition",
      (p) => p.condition,
      (v) => CONDITION_LABEL[v as keyof typeof CONDITION_LABEL] ?? v
    ),
    availability: tally(
      scope,
      filters,
      "availability",
      (p) => p.availability,
      (v) => AVAILABILITY_LABEL[v] ?? v
    ),
    priceBounds: prices.length ? { min: Math.min(...prices), max: Math.max(...prices) } : null,
  };
}
