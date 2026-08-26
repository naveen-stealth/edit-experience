"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { LinkButton } from "@/components/ui/LinkButton";
import { formatMoney } from "@/lib/utils/format";
import { useOverlay } from "@/lib/utils/use-overlay";
import { conciergeWhatsAppUrl } from "@/lib/whatsapp";

export function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, removeItem, updateQuantity } = useCart();

  const overlayRef = useOverlay<HTMLDivElement>(isOpen, closeCart);

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal aria-label="Shopping bag">
      <button aria-label="Close bag" onClick={closeCart} className="absolute inset-0 bg-pine/30" />
      <div className="relative flex h-full w-full max-w-md flex-col bg-ivory">
        <div className="flex items-center justify-between border-b border-pine-12 px-6 py-5">
          <h2 className="font-serif text-2xl text-pine">Your Bag</h2>
          <button type="button" onClick={closeCart} aria-label="Close bag" className="-m-2 p-2 text-[11px] uppercase tracking-[0.14em] text-pine-45 transition-colors duration-150 ease-luxury hover:text-pine active:text-pine">
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-pine-45">Your bag is empty.</p>
            <LinkButton href="/new-in" variant="on-light" onClick={closeCart}>
              Shop New Arrivals
            </LinkButton>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-5">
              {lines.map((line) => (
                <li key={line.product.id} className="flex gap-4 border-b border-pine-12 py-5 first:pt-0">
                  <Link href={`/products/${line.product.handle}`} onClick={closeCart} className="w-20 shrink-0">
                    <ProductMedia product={line.product} />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-pine-45">{line.product.brand}</p>
                    <p className="text-[14px] text-pine">{line.product.title}</p>
                    {line.unavailable ? (
                      <p className="mt-1 text-[12px] text-rust">No longer available</p>
                    ) : (
                      <p className="mt-1 text-[13px] text-pine-70">{formatMoney(line.lineTotal)}</p>
                    )}
                    <div className="mt-2 flex items-center gap-3 text-[12px]">
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
                      <button type="button" onClick={() => removeItem(line.product.id)} className="text-pine-45 underline-offset-2 transition-colors duration-150 ease-luxury hover:text-pine hover:underline active:text-pine">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-pine-12 px-6 py-6">
              <div className="mb-4 flex items-center justify-between text-[13px] text-pine">
                <span className="text-pine-45">Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <p className="mb-4 text-[12px] text-pine-45">Shipping and any applicable duties are calculated at checkout.</p>
              <LinkButton href="/cart" variant="solid" className="w-full justify-center" onClick={closeCart}>
                Go to Bag
              </LinkButton>
              <Link
                href={conciergeWhatsAppUrl()}
                className="mt-3 block py-1 text-center text-[12px] text-pine-45 underline-offset-2 transition-colors duration-150 ease-luxury hover:text-pine hover:underline active:text-pine"
              >
                Speak to Concierge
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
