import { getPurchaseDecision } from "@/lib/commerce/purchase";
import type { Product } from "@/lib/commerce/types";

/** One badge, at most — luxury cards don't stack marketplace-style labels. */
export function ProductBadge({ product }: { product: Product }) {
  const decision = getPurchaseDecision(product);

  if (decision.state === "sold") {
    return <Badge tone="muted">Sold</Badge>;
  }
  if (decision.state === "reserved") {
    return <Badge tone="muted">Reserved</Badge>;
  }
  if (product.availability === "low_stock") {
    return <Badge tone="accent">Only 1 left</Badge>;
  }
  if (product.newArrival) {
    return <Badge tone="default">New Arrival</Badge>;
  }
  return null;
}

function Badge({ tone, children }: { tone: "default" | "muted" | "accent"; children: React.ReactNode }) {
  const toneClasses = {
    default: "bg-ivory text-pine border-pine-22",
    muted: "bg-ivory text-pine-45 border-pine-12",
    accent: "bg-ivory text-rust border-rust-12",
  }[tone];

  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] ${toneClasses}`}
    >
      {children}
    </span>
  );
}
