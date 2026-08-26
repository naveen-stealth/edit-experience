import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * A text link followed by an arrow glyph. Uses an SVG icon in a flex row
 * rather than a Unicode "→" character — Unicode arrows sit on the text
 * baseline and don't optically center against cap-height uppercase labels.
 */
export function ArrowLink({ className = "", children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link className={`inline-flex items-center gap-1.5 ${className}`} {...props}>
      <span>{children}</span>
      <ArrowRightIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
    </Link>
  );
}
