import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

/**
 * Shell for editorial/content routes (our story, policies, concierge…).
 * Left-aligned narrow measure per DESIGN.md — centre is for standalone
 * headings, not paragraphs. Body copy lives in `children` as prose.
 */
export function ContentPage({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: title }]} />
      <Container className="py-12 tablet:py-20">
        <div className="max-w-[62ch]">
          {eyebrow && (
            <Eyebrow as="p" className="mb-3 block">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="font-serif text-title text-pine tablet:text-display-sm">{title}</h1>
          {lede && <p className="mt-5 text-body font-light text-pine-70">{lede}</p>}
          {children && <div className="mt-8 space-y-5 text-body font-light text-pine-70">{children}</div>}
        </div>
      </Container>
    </>
  );
}

/** Marks unwritten copy so a placeholder can't quietly ship as final. */
export function PlaceholderNote() {
  return (
    <p className="border-l-2 border-pine-22 pl-4 text-caption text-pine-45">
      Placeholder copy — final content to follow.
    </p>
  );
}
