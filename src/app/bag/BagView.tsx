"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { LinkButton } from "@/components/ui/LinkButton";
import { formatMoney } from "@/lib/utils/format";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";

const TABS = [
  { key: "bag", label: "Bag", href: "/bag" },
  { key: "wishlist", label: "Wishlist", href: "/bag?tab=wishlist" },
] as const;

export function BagView({ tab }: { tab: "bag" | "wishlist" }) {
  const { lines, subtotal, removeItem, updateQuantity } = useCart();
  const { products: wishlist } = useWishlist();

  return (
    <div className="mx-auto max-w-3xl">
      <div role="tablist" aria-label="Bag and wishlist" className="flex border-b border-pine-12">
        {TABS.map((t) => {
          const selected = t.key === tab;
          const count = t.key === "bag" ? lines.length : wishlist.length;
          return (
            <Link
              key={t.key}
              href={t.href}
              role="tab"
              aria-selected={selected}
              className={`-mb-px border-b px-5 py-3 text-micro font-medium uppercase tracking-caps transition-colors duration-150 ease-luxury ${
                selected ? "border-pine text-pine" : "border-transparent text-pine-45 hover:text-pine active:text-pine"
              }`}
            >
              {t.label}
              {count > 0 && <span className="ml-1.5 text-pine-45">({count})</span>}
            </Link>
          );
        })}
      </div>

      <div className="pt-8">{tab === "bag" ? <BagTab /> : <WishlistTab />}</div>
    </div>
  );

  function BagTab() {
    if (lines.length === 0) {
      return (
        <Empty
          message="Your bag is empty."
          detail="Every piece is one-of-one — when something catches your eye, it won't wait."
        />
      );
    }

    return (
      <>
        <ul>
          {lines.map((line) => (
            <li key={line.product.id} className="flex gap-5 border-b border-pine-12 py-6 first:pt-0">
              <Link href={`/products/${line.product.handle}`} className="w-24 shrink-0">
                <ProductMedia product={line.product} />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-micro uppercase tracking-caps-tight text-pine-45">{line.product.brand}</p>
                <Link
                  href={`/products/${line.product.handle}`}
                  className="mt-0.5 font-serif text-body text-pine transition-opacity duration-150 ease-luxury hover:opacity-70"
                >
                  {line.product.title}
                </Link>
                {line.unavailable ? (
                  <p className="mt-1 text-caption text-rust">No longer available</p>
                ) : (
                  <p className="mt-1 text-body-sm text-pine-70">{formatMoney(line.lineTotal)}</p>
                )}
                <div className="mt-3 flex items-center gap-4 text-caption">
                  {!line.unavailable && line.product.quantity > 1 && (
                    <label className="flex items-center gap-2 text-pine-45">
                      Qty
                      <select
                        value={line.quantity}
                        onChange={(e) => updateQuantity(line.product.id, Number(e.target.value))}
                        className="border border-pine-22 bg-ivory px-1.5 py-0.5"
                      >
                        {Array.from({ length: line.product.quantity }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  <button
                    type="button"
                    onClick={() => removeItem(line.product.id)}
                    className="text-pine-45 underline-offset-4 transition-colors duration-150 ease-luxury hover:text-pine hover:underline active:text-pine"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-baseline justify-between">
          <span className="text-body-sm text-pine-45">Subtotal</span>
          <span className="text-body-lg text-pine">{formatMoney(subtotal)}</span>
        </div>
        <p className="mt-2 text-caption text-pine-45">
          Shipping and any applicable duties are confirmed with the concierge before payment.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <LinkButton href={conciergeWhatsAppUrl()} variant="solid" className="justify-center">
            Complete Purchase via Concierge
          </LinkButton>
        </div>
      </>
    );
  }

  function WishlistTab() {
    if (wishlist.length === 0) {
      return (
        <Empty
          message="Nothing saved yet."
          detail="Tap the heart on any piece to keep it here while you decide."
        />
      );
    }
    return <ProductGrid products={wishlist} />;
  }
}

function Empty({ message, detail }: { message: string; detail: string }) {
  return (
    <div className="border border-pine-12 px-6 py-16 text-center">
      <p className="font-serif text-title-sm text-pine">{message}</p>
      <p className="mx-auto mt-2.5 max-w-[42ch] text-body font-light text-pine-70">{detail}</p>
      <div className="mt-6">
        <LinkButton href="/new-arrivals" variant="on-light">
          Shop New Arrivals
        </LinkButton>
      </div>
    </div>
  );
}
