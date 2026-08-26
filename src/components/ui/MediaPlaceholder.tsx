import type { ReactNode } from "react";

/**
 * Stand-in for product/editorial photography until real images (Shopify
 * CDN or shoot assets) are available. Renders the same deep-pine gradient
 * treatment already used for category tiles in the approved design, so a
 * page reads as finished rather than "under construction". Swap for
 * next/image once a product.images[].url stops being "placeholder".
 */
const GRADIENTS = [
  "linear-gradient(160deg,#123a32,#062822 60%,#02100d)",
  "linear-gradient(160deg,#0e332b,#04211c 60%,#020e0b)",
  "linear-gradient(160deg,#164337,#073028 60%,#01110d)",
  "linear-gradient(150deg,#0b3a31,#062822 55%,#03110e)",
  "linear-gradient(145deg,#0f3a30,#052a23 55%,#02120e)",
];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function MediaPlaceholder({
  seed,
  alt,
  aspect = "4/5",
  className = "",
  children,
}: {
  seed: string;
  alt: string;
  aspect?: string;
  className?: string;
  children?: ReactNode;
}) {
  const gradient = GRADIENTS[hash(seed) % GRADIENTS.length];
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: aspect, backgroundImage: gradient }}
    >
      {children}
    </div>
  );
}
