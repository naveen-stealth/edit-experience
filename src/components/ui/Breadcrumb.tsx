import Link from "next/link";
import { Container } from "./Container";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Wayfinding for listing and product pages: where am I, and how do I get back
 * out. The last crumb is the current page and never a link.
 */
export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-pine-12">
      <Container>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3.5 text-micro">
          {trail.map((crumb, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="text-pine-45 transition-colors duration-150 ease-luxury hover:text-pine active:text-pine"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-pine" : "text-pine-45"} aria-current={isLast ? "page" : undefined}>
                    {crumb.label}
                  </span>
                )}
                {!isLast && (
                  <span aria-hidden className="text-pine-22">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
