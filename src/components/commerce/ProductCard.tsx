import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { ProductBadge } from "./ProductBadge";
import { ProductMedia } from "./ProductMedia";
import { ProductPrice } from "./ProductPrice";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({
  product,
  showBadge = true,
  showWishlist = true,
  showBrand = true,
  hoverEffect = true,
  onDark = false,
  tabIndex,
}: {
  product: Product;
  showBadge?: boolean;
  showWishlist?: boolean;
  showBrand?: boolean;
  hoverEffect?: boolean;
  onDark?: boolean;
  /** Pass -1 for cards duplicated by a looping carousel, so Tab visits each product once. */
  tabIndex?: number;
}) {
  const sold = product.availability === "sold";

  return (
    <Link href={`/products/${product.handle}`} tabIndex={tabIndex} className="group block">
      {/* Scale the photo inside a fixed frame rather than lifting its brightness:
          on pre-owned resale the photo is evidence of condition, so hover must
          not alter the colour the buyer is judging. */}
      <div className="relative overflow-hidden">
        <ProductMedia
          product={product}
          className={`${
            hoverEffect
              ? "transition-transform duration-500 ease-luxury group-hover:scale-[1.03] group-active:scale-[1.01] motion-reduce:group-hover:scale-100"
              : ""
          } ${sold ? "grayscale" : ""}`}
        />
        {showBadge && (
          <div className="absolute top-3 left-3">
            <ProductBadge product={product} />
          </div>
        )}
        {/* 7px, not 12px: the hit area is 44px around a 34px circle, so the
            circle sits 5px in — this lands it on the badge's 12px optical edge. */}
        {showWishlist && <WishlistButton product={product} className="absolute top-[7px] right-[7px]" />}
      </div>
      <div className="mt-4">
        {showBrand && (
          <p
            className={`mb-1.5 text-[11px] uppercase tracking-[0.1em] ${
              onDark ? "text-ivory-45" : "text-pine-45"
            }`}
          >
            {product.brand}
          </p>
        )}
        <h3 className={`text-[15px] leading-snug ${onDark ? "text-ivory" : "text-pine"}`}>
          {product.title}
        </h3>
        <ProductPrice product={product} onDark={onDark} className="mt-1.5 block" />
      </div>
    </Link>
  );
}
