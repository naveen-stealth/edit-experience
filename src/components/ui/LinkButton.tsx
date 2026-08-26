import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonClasses, type ButtonVariant } from "./button-styles";

interface LinkButtonProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
}

export function LinkButton({ variant = "on-light", className = "", ...props }: LinkButtonProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
