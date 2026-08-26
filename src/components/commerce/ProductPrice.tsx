import { getPurchaseDecision } from "@/lib/commerce/purchase";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/utils/format";

export function ProductPrice({
  product,
  className = "",
  onDark = false,
  muted = false,
}: {
  product: Product;
  className?: string;
  onDark?: boolean;
  /** Card context: the title owns the line, the price supports it. The PDP keeps full-strength price. */
  muted?: boolean;
}) {
  const decision = getPurchaseDecision(product);

  if (!decision.showPrice) {
    return (
      <span className={`text-[13px] ${onDark ? "text-ivory-45" : "text-pine-45"} ${className}`}>
        Price on request
      </span>
    );
  }

  return (
    <span
      className={`text-[13px] ${
        muted ? (onDark ? "text-ivory-70" : "text-pine-70") : onDark ? "text-ivory" : "text-pine"
      } ${className}`}
    >
      {formatMoney(product.price)}
      {product.compareAtPrice && (
        <span className={`ml-2 line-through ${onDark ? "text-ivory-45" : "text-pine-45"}`}>
          {formatMoney(product.compareAtPrice)}
        </span>
      )}
    </span>
  );
}
