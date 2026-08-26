/**
 * Product subcategories are stored as display strings ("Shoulder Bags") while
 * URLs carry slugs ("shoulder-bags"). One helper so the nav links, the filter
 * and the facet counts all agree on how the two map.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    // Strip the combining diacritics that NFD just separated out.
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
