import type { ReactNode } from "react";
import { Container } from "./Container";

export type SectionSpace = "default" | "tight";

/**
 * Vertical rhythm, controlled per edge.
 *
 * Every section used to be `default` on both sides, so every boundary was the
 * same doubled ~192px band whether or not the two sections were related — far
 * more dead space than a gap needs, and it carried no information.
 *
 * The distinction that matters is what the padding is *for*:
 *  - On a section that shares the page's surface, the padding is only a gap
 *    between neighbours. Two of them meet at every boundary, so each takes
 *    `tight` and the gap lands near 128px instead of 192px.
 *  - On a section that introduces its own surface (the Pine rail), the padding
 *    is internal breathing room inside a visible band, so it keeps the full
 *    measure — a dark block needs the room, and its edges are already legible.
 */
const SPACE: Record<SectionSpace, { top: string; bottom: string }> = {
  default: {
    top: "pt-16 sm:pt-20 tablet:pt-24",
    bottom: "pb-16 sm:pb-20 tablet:pb-24",
  },
  tight: {
    top: "pt-12 sm:pt-14 tablet:pt-16",
    bottom: "pb-12 sm:pb-14 tablet:pb-16",
  },
};

export function Section({
  children,
  className = "",
  containerClassName = "",
  as: Tag = "section",
  bleed = false,
  spaceTop = "default",
  spaceBottom = "default",
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div";
  /** Skip the inner Container — use when children manage their own width (e.g. a full-bleed carousel). */
  bleed?: boolean;
  spaceTop?: SectionSpace;
  spaceBottom?: SectionSpace;
}) {
  const space = `${SPACE[spaceTop].top} ${SPACE[spaceBottom].bottom}`;

  if (bleed) {
    return <Tag className={`${space} ${className}`}>{children}</Tag>;
  }

  return (
    <Tag className={`${space} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
