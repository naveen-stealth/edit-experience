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
      className={`text-micro font-medium uppercase tracking-eyebrow ${
        onDark ? "text-ivory-70" : "text-pine-45"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
