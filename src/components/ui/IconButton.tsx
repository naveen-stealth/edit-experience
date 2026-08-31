import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onDark?: boolean;
  size?: number;
  /** Classes for the visible circle — backgrounds and blur belong here, not on `className`, which sizes the (larger, transparent) hit area. */
  surfaceClassName?: string;
  "aria-label": string;
}

/**
 * The `size` prop is the visible circle, not the hit area. A 34px circle is the
 * right weight on a product card but under the 44px touch minimum, so the button
 * itself is always at least 44px and the border is drawn on an inner ring —
 * the target grows without the dot getting heavier.
 */
export function IconButton({
  onDark = false,
  size = 34,
  className = "",
  surfaceClassName = "",
  children,
  ...props
}: IconButtonProps) {
  const hit = Math.max(size, 44);

  return (
    <button
      type="button"
      style={{ width: hit, height: hit }}
      className={`group/icon flex items-center justify-center bg-transparent ${className}`}
      {...props}
    >
      <span
        style={{ width: size, height: size }}
        className={`flex items-center justify-center rounded-full border text-body-sm transition duration-150 ease-luxury group-active/icon:scale-90 motion-reduce:group-active/icon:scale-100 ${
          onDark
            ? "border-ivory-45 text-ivory group-hover/icon:border-ivory"
            : "border-pine-22 text-pine group-hover/icon:border-pine"
        } ${surfaceClassName}`}
      >
        {children}
      </span>
    </button>
  );
}
