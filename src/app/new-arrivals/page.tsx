import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ListingHero } from "@/components/plp/ListingHero";
import { ProductListing } from "@/components/plp/ProductListing";
import { computeFacets } from "@/lib/commerce/facets";
import {
  clearFiltersQueryString,
  countActiveFilters,
  parseFilters,
  readSort,
  type RawSearchParams,
} from "@/lib/commerce/plp-query";
import { filterProducts, getAllProducts } from "@/lib/commerce/products";

export const metadata: Metadata = {
  title: "New Arrivals",
  description:
    "The latest authenticated pre-owned pieces to reach the store — inspected in-house and listed as they arrive.",
};

export default async function NewArrivalsPage(props: PageProps<"/new-arrivals">) {
  const searchParams = (await props.searchParams) as RawSearchParams;

  /*
   * Scope is the newArrival flag rather than a category, so this listing cuts
   * across categories. filterProducts works on the whole catalogue, so its
   * results are intersected with the scope afterwards.
   */
  const scope = getAllProducts().filter((p) => p.newArrival);
  const scopeIds = new Set(scope.map((p) => p.id));

  const filters = parseFilters(searchParams);
  const products = filterProducts(filters, readSort(searchParams)).filter((p) => scopeIds.has(p.id));
  const facets = computeFacets(scope, filters);

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "New Arrivals" }]} />
      <ListingHero
        title="New Arrivals"
        description="The latest pieces to reach the store, listed as they clear inspection. One of each — when a piece sells, it's gone."
      />
      <ProductListing
        products={products}
        facets={facets}
        activeCount={countActiveFilters(searchParams)}
        clearHref={`/new-arrivals${clearFiltersQueryString(searchParams)}`}
      />
    </>
  );
}
