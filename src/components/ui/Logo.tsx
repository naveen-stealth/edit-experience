import { SITE_NAME } from "@/lib/content/site";

/**
 * Wordmark SVGs are pre-colored (dark = Pine fill for light backgrounds,
 * light = Ivory fill for dark backgrounds). "mark" is the framed monogram
 * (Pine on transparent) the header carries in place of the wordmark.
 */
export function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light" | "mark";
  className?: string;
}) {
  const src =
    variant === "mark" ? "/edit-logo-mark.png" : variant === "dark" ? "/edit-logo-dark.svg" : "/edit-logo-light.svg";
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-colored brand asset, not a content photo
    <img src={src} alt={SITE_NAME} className={className} />
  );
}
