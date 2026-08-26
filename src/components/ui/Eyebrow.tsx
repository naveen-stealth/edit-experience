export function Eyebrow({
  children,
  onDark = false,
  className = "",
  as: Tag = "span",
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
  as?: "span" | "p" | "div";
}) {
  return (
    <Tag
      className={`text-[11px] font-medium uppercase tracking-[0.22em] ${
        onDark ? "text-ivory-70" : "text-pine-45"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
