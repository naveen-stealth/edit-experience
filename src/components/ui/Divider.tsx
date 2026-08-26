export function Divider({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  return <hr className={`border-t ${onDark ? "border-ivory-10" : "border-pine-12"} ${className}`} />;
}
