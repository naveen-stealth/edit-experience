import type { ReactNode } from "react";

/**
 * One half of a full-bleed 50/50 split whose text still has to land on the page
 * spine — the same left edge as every Container-wrapped heading above it.
 *
 * The panel keeps its full-bleed background; this inner box is pinned to the
 * side nearest the viewport edge and capped at half the page measure. Capped at
 * `--container-page / 2` and padded by one `--page-gutter`, its content edge
 * resolves to `(100% - 1360px) / 2 + gutter` — identical to Container — at any
 * viewport, because below the cap the box simply goes full width and the
 * padding alone supplies the gutter.
 *
 * `side` is the viewport edge the panel touches, not the side the text sits on.
 */
export function SplitPanel({
  side,
  children,
  className = "",
}: {
  side: "left" | "right";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full max-w-[calc(var(--container-page)/2)] px-(--page-gutter) ${
        side === "left" ? "ml-auto" : "mr-auto"
      } ${className}`}
    >
      {children}
    </div>
  );
}
