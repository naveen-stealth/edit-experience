export type ButtonVariant = "on-dark" | "on-light" | "solid";

export function buttonClasses(variant: ButtonVariant, className = ""): string {
  /*
   * 150ms, not 300ms: hover and press feedback sit directly on the input path,
   * where 300ms reads as lag. The longer easing is kept for surfaces that
   * actually travel. `active:` gives the press its own response on pointer-down
   * rather than making the user wait for release.
   */
  const base =
    "inline-flex items-center gap-2.5 border px-7 py-[15px] text-[11.5px] font-medium uppercase tracking-[0.14em] transition duration-150 ease-luxury active:scale-[0.98] motion-reduce:active:scale-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100";

  const variants: Record<ButtonVariant, string> = {
    "on-dark": "border-ivory text-ivory hover:bg-ivory hover:text-pine",
    "on-light": "border-pine text-pine hover:bg-pine hover:text-ivory",
    solid: "border-pine bg-pine text-ivory hover:bg-[#0a3129]",
  };

  return `${base} ${variants[variant]} ${className}`;
}
