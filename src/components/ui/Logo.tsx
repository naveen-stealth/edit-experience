import { SITE_NAME } from "@/lib/content/site";

/** Wordmark SVGs are pre-colored (dark = Pine fill for light backgrounds, light = Ivory fill for dark backgrounds). */
export function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-colored vector wordmark, not a content photo
    <img src={variant === "dark" ? "/edit-logo-dark.svg" : "/edit-logo-light.svg"} alt={SITE_NAME} className={className} />
  );
}
