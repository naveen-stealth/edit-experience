import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { ProductCarousel } from "@/components/commerce/ProductCarousel";
import type { Product } from "@/lib/commerce/types";

export function ProductRail({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  layout = "grid",
  onDark = false,
  loop = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref: string;
  layout?: "grid" | "carousel";
  onDark?: boolean;
  /** Carousel only: wrap around instead of stopping at the last piece. */
  loop?: boolean;
}) {
  const header = (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <Eyebrow onDark={onDark} className="mb-2 block">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className={`text-title tablet:text-display-sm ${onDark ? "text-ivory" : "text-pine"}`}>{title}</h2>
        {description && (
          <p
            className={`mt-2 max-w-md text-body font-light ${
              onDark ? "text-ivory-70" : "text-pine-45"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      <ArrowLink
        href={viewAllHref}
        className={`text-micro uppercase tracking-caps transition-opacity duration-150 ease-luxury hover:opacity-70 active:opacity-60 ${
          onDark ? "text-ivory" : "text-pine"
        }`}
      >
        View All
      </ArrowLink>
    </div>
  );

  if (layout === "carousel") {
    return (
      <div>
        <Container>{header}</Container>
        <ProductCarousel products={products} onDark={onDark} loop={loop} />
      </div>
    );
  }

  return (
    <div>
      <Container>
        {header}
        <ProductGrid products={products} />
      </Container>
    </div>
  );
}
