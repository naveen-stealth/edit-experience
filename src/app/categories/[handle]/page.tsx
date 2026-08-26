import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ListingHero } from "@/components/plp/ListingHero";
import { ProductListing } from "@/components/plp/ProductListing";
import { computeFacets } from "@/lib/commerce/facets";
import { CATEGORIES, getCategoryByHandle } from "@/lib/commerce/collections";
import {
  clearFiltersQueryString,
  countActiveFilters,
  parseFilters,
  readSort,
  type RawSearchParams,
} from "@/lib/commerce/plp-query";
import { filterProducts, getProductsByCategory } from "@/lib/commerce/products";
import type { ProductGender } from "@/lib/commerce/types";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ handle: category.handle }));
}

export async function generateMetadata(props: PageProps<"/categories/[handle]">): Promise<Metadata> {
  const { handle } = await props.params;
  const category = getCategoryByHandle(handle);
  if (!category) return {};

  return {
    title: category.name,
    description: `Authenticated pre-owned ${category.name.toLowerCase()} at Edit Experience — inspected in-house, available online and in our Hyderabad store.`,
  };
}

export default async function CategoryPage(props: PageProps<"/categories/[handle]">) {
  const { handle } = await props.params;
  const searchParams = (await props.searchParams) as RawSearchParams;

  const category = getCategoryByHandle(handle);
  if (!category) notFound();

  /*
   * `gender` comes from the URL because the nav links into categories with it
   * (`/categories/bags?gender=women`), but it's scope rather than a facet — it
   * describes which listing you're on, so it isn't offered as a filter or shown
   * as a removable chip.
   */
  const genderParam = searchParams.gender;
  const gender =
    typeof genderParam === "string" && ["women", "men", "unisex"].includes(genderParam)
      ? (genderParam as ProductGender)
      : undefined;

  const scopeFilters = { category: category.handle, gender };
  const scope = getProductsByCategory(category.handle).filter(
    (p) => !gender || p.gender === gender || p.gender === "unisex"
  );

  const filters = parseFilters(searchParams, scopeFilters);
  const products = filterProducts(filters, readSort(searchParams));
  const facets = computeFacets(scope, filters);

  const genderLabel = gender ? `${gender[0].toUpperCase()}${gender.slice(1)}` : undefined;

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          ...(genderLabel ? [{ label: genderLabel }] : []),
          { label: category.name },
        ]}
      />
      <ListingHero
        eyebrow={genderLabel ? `${genderLabel} · Category` : "Category"}
        title={category.name}
        description={`Every piece is inspected in-house before it's listed, priced to condition and rarity, and available to view online or in our store.`}
        image={category.image}
      />
      <ProductListing
        products={products}
        facets={facets}
        activeCount={countActiveFilters(searchParams)}
        clearHref={`/categories/${category.handle}${clearFiltersQueryString(searchParams)}`}
      />
    </>
  );
}
