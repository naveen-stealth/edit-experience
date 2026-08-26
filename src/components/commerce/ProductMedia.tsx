import Image from "next/image";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Product } from "@/lib/commerce/types";

/**
 * Renders a product's real photo once one exists (thumbnail.url is a real
 * asset path), falling back to the gradient placeholder otherwise — the one
 * place that decision is made, so ProductCard/CartDrawer/etc never branch on it.
 */
export function ProductMedia({
  product,
  className = "",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 46vw, 70vw",
}: {
  product: Product;
  className?: string;
  sizes?: string;
}) {
  const { url, alt } = product.thumbnail;

  if (url.startsWith("/")) {
    return (
      <div className={`relative w-full overflow-hidden bg-ivory ${className}`} style={{ aspectRatio: "4/5" }}>
        <Image src={url} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return <MediaPlaceholder seed={product.id} alt={alt} className={className} />;
}
