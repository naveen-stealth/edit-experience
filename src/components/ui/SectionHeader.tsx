import { Eyebrow } from "./Eyebrow";

export function SectionHeader({
  eyebrow,
  title,
  description,
  onDark = false,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  onDark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-12 sm:mb-14 ${align === "center" ? "mx-auto max-w-xl text-center" : "max-w-xl"}`}>
      {eyebrow && (
        <Eyebrow onDark={onDark} className="mb-2.5 block">
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className={`text-[32px] leading-tight sm:text-[40px] ${onDark ? "text-ivory" : "text-pine"}`}>{title}</h2>
      {description && (
        <p className={`mt-3.5 text-sm leading-relaxed font-light ${onDark ? "text-ivory-70" : "text-pine-45"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
