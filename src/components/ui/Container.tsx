import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-(--container-page) px-(--page-gutter) ${className}`}>
      {children}
    </div>
  );
}
