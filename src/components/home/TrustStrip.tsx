import { TRUST_POINTS, type TrustPointIcon } from "@/lib/content/site";

/*
 * Icon artwork exported from the approved strip design (Figma node 2111:3593),
 * committed under public/. Each entry's size/offset is that asset's geometry in
 * the design, as a fraction of its 83px ring frame, so the artwork scales with
 * the responsive frame instead of drifting at the mobile size.
 */
const ART: Record<TrustPointIcon, { src: string; className: string; rounded?: boolean }> = {
  authenticated: { src: "/trust-authenticated.svg", className: "w-[56%]" },
  invoice: { src: "/trust-invoice.svg", className: "h-[65%]" },
  store: { src: "/trust-store.svg", className: "h-full w-full" },
  concierge: { src: "/trust-concierge.png", className: "h-[71%] w-[73%]", rounded: true },
};

/*
 * The band under the hero, from the approved strip design: each point is a row
 * of framed icon + tracked label on black, four across on desktop and 2×2 on
 * mobile. The double rounded-rect ring around the icon and the inset hairline
 * around the strip repeat the monogram logo's framing language.
 */
export function TrustStrip() {
  return (
    <div className="relative bg-black text-ivory-70">
      <div aria-hidden className="pointer-events-none absolute inset-2 border border-ivory-18" />
      <div className="grid grid-cols-2 gap-x-(--grid-gutter) gap-y-6 px-(--page-gutter) py-6 tablet:grid-cols-4 tablet:py-7">
        {TRUST_POINTS.map((point) => {
          const art = ART[point.icon];
          return (
            <div key={point.title} className="flex items-center justify-center gap-4 tablet:gap-8">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-ivory-70 tablet:h-14 tablet:w-14 tablet:rounded-[18px]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-1 rounded-[12px] border border-ivory-45 tablet:rounded-[14px]"
                />
                {art.rounded ? (
                  /* The concierge artwork is a raster crop: the design scales it
                     ~127% inside a rounded rect, so it clips rather than fits. */
                  <span className={`relative block overflow-hidden rounded-[11px] tablet:rounded-[13px] ${art.className}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- pre-colored design asset, not a content photo */}
                    <img
                      src={art.src}
                      alt=""
                      aria-hidden
                      className="absolute left-[-13.5%] top-[-15%] h-[130%] w-[127%] max-w-none"
                    />
                  </span>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element -- pre-colored design asset, not a content photo
                  <img src={art.src} alt="" aria-hidden className={art.className} />
                )}
              </span>
              {/* Deliberately below the ladder's micro rung (11px): these caps
                  labels read as ornament next to the framed icons, and at 11px
                  they competed with them (size signed off 2026-09-03). The 1.25
                  leading breaks micro's 1.4 for the same reason — all-caps
                  two-liners with no descenders set at ~1.1 in the approved strip.
                  text-balance + 13ch keeps the design's even two-line blocks;
                  antialiased stops light-on-black caps blooming. */}
              <span className="max-w-[13ch] text-balance text-[10px] font-medium uppercase leading-[1.25] tracking-caps-tight antialiased">
                {point.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
