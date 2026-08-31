import Image from "next/image";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { Product } from "@/lib/commerce/types";

/**
 * Renders a product's real photo once one exists (thumbnail.url is a real
 * asset path), falling back to the gradient placeholder otherwise — the one
 * place that decision is made, so ProductCard/CartDrawer/etc never branch on it.
 *
 * Product shots are transparent cutouts, so no fill is painted on light
 * surfaces — the page's ivory shows through. On the pine rail (`onDark`) the
 * dark bags would sink into the background, so the frame gets an ivory-tint
 * fill that reads as a slightly lighter green over pine.
 */
export function ProductMedia({
  product,
  className = "",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 46vw, 70vw",
  onDark = false,
}: {
  product: Product;
  className?: string;
  sizes?: string;
  onDark?: boolean;
}) {
  const { url, alt } = product.thumbnail;

  if (url.startsWith("/")) {
    return (
      <div
        className={`relative w-full overflow-hidden ${onDark ? "bg-ivory-10" : ""} ${className}`}
        style={{ aspectRatio: "4/5" }}
      >
        <Image src={url} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return <MediaPlaceholder seed={product.id} alt={alt} className={className} />;
}
