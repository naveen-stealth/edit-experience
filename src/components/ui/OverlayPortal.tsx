"use client";

import { createPortal } from "react-dom";
import type { ReactNode } from "react";

/**
 * Renders overlay content into <body>, escaping wherever it was mounted.
 *
 * `position: fixed` is only viewport-relative while no ancestor has established
 * a containing block for it — and several common properties do: `transform`,
 * `filter`, `backdrop-filter`, `perspective`, `will-change` and `contain`.
 *
 * The translucent sticky header uses `backdrop-filter`, so the menu and search
 * overlays rendered inside it were being sized against the header's own 68px box
 * rather than the screen: present in the DOM, visible, correctly z-indexed, and
 * clipped to a strip. Portalling to <body> makes an overlay independent of its
 * mount point, which is the property anything covering the page needs.
 *
 * The `document` guard keeps this safe during SSR; in practice these overlays
 * start closed and render nothing on the server anyway.
 */
export function OverlayPortal({ children }: { children: ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}
