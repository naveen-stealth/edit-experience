"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Shared behaviour for the three full-screen overlays (bag, search, mobile menu):
 * Escape closes, the page behind stops scrolling, focus is confined to the
 * overlay while it's open, and the trigger gets focus back on close.
 *
 * Attach the returned ref to the overlay's outermost element. Without the ref
 * the scroll lock and Escape still work; only the focus trap is skipped.
 */
export function useOverlay<T extends HTMLElement>(open: boolean, onClose: () => void): RefObject<T | null> {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    if (!open) return;

    // Remembered before focus moves, so it can be handed back on close.
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusable = () =>
      Array.from(containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !containerRef.current) return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // Wrap at both ends, and pull focus back in if it has escaped entirely.
      if (!containerRef.current.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);

    /*
     * Locked on the root element, not on `body`. This layout puts `h-full` on
     * <html>, which makes <html> the scrolling element — and the viewport takes
     * its overflow from the root, so `body { overflow: hidden }` alone leaves
     * the page scrolling behind the overlay.
     */
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    const scrollbar = window.innerWidth - root.clientWidth;

    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;

    // Only move focus if the overlay hasn't already claimed it (the search
    // field autofocuses itself, and stealing it back would drop a keystroke).
    if (containerRef.current && !containerRef.current.contains(document.activeElement)) {
      focusable()[0]?.focus();
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
      // Skip the handback if focus has since moved somewhere deliberate.
      if (previouslyFocused?.isConnected && document.activeElement === document.body) {
        previouslyFocused.focus();
      }
    };
  }, [open, onClose]);

  return containerRef;
}
