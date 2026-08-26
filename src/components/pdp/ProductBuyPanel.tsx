"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { WishlistButton } from "@/components/commerce/WishlistButton";
import { Button } from "@/components/ui/Button";
import { getPurchaseDecision } from "@/lib/commerce/purchase";
import type { Product } from "@/lib/commerce/types";
import { productEnquiryWhatsAppUrl } from "@/lib/whatsapp";

/**
 * The buy action. Which action exists at all is decided by `getPurchaseDecision`
 * — never by reading price or availability here — so a piece over the enquiry
 * threshold, a reserved piece and a sold piece each get the right control and the
 * same rule the listing card used.
 */
export function ProductBuyPanel({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const decision = getPurchaseDecision(product);

  const enquiryUrl = productEnquiryWhatsAppUrl(product);

  return (
    <div>
      {decision.state === "add_to_bag" && product.availability === "low_stock" && (
        <p className="mb-4 text-[12.5px] text-rust">Only one available — this is the last of this piece.</p>
      )}
      {decision.state === "sold" && (
        <p className="mb-4 text-[12.5px] text-pine-45">
          This piece has sold. The concierge can look for something comparable.
        </p>
      )}
      {decision.state === "reserved" && (
        <p className="mb-4 text-[12.5px] text-pine-45">
          Currently reserved for another client. Ask to be told if it becomes available.
        </p>
      )}
      {decision.state === "enquire" && (
        <p className="mb-4 text-[12.5px] text-pine-45">
          Available by enquiry, with concierge support through to delivery.
        </p>
      )}

      <div className="flex items-stretch gap-3">
        {decision.canAddToBag ? (
          <Button
            variant="solid"
            className="flex-1 justify-center"
            onClick={() => {
              addItem(product);
              setAdded(true);
              openCart();
            }}
          >
            {added ? "Added to Bag" : decision.primaryCtaLabel}
          </Button>
        ) : (
          <Link
            href={decision.state === "sold" ? "/concierge" : enquiryUrl}
            className="inline-flex flex-1 items-center justify-center gap-2.5 border border-pine bg-pine px-7 py-[15px] text-[11.5px] font-medium uppercase tracking-[0.14em] text-ivory transition duration-150 ease-luxury hover:bg-[#0a3129] active:scale-[0.98] motion-reduce:active:scale-100"
          >
            {decision.state === "sold" ? decision.secondaryCtaLabel : decision.primaryCtaLabel}
          </Link>
        )}

        <WishlistButton product={product} />
      </div>

      {decision.state !== "sold" && (
        <Link
          href={enquiryUrl}
          className="mt-3.5 inline-block text-[12px] text-pine-45 underline-offset-4 transition-colors duration-150 ease-luxury hover:text-pine hover:underline active:text-pine"
        >
          {decision.secondaryCtaLabel}
        </Link>
      )}
    </div>
  );
}
