export function FlankRow({
  left,
  right,
  onDark = false,
  className = "",
}: {
  left: string;
  right: string;
  onDark?: boolean;
  className?: string;
}) {
  const textColor = onDark ? "text-ivory-45" : "text-pine-45";
  const ruleColor = onDark ? "bg-ivory-18" : "bg-pine-12";

  return (
    <div
      className={`hidden items-center justify-between text-[11px] uppercase tracking-[0.22em] tablet:flex ${textColor} ${className}`}
    >
      <span>{left}</span>
      <span className={`mx-6 h-px flex-1 ${ruleColor}`} aria-hidden />
      <span>{right}</span>
    </div>
  );
}
