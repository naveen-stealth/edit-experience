import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The banner at the top of a listing page. With an image it's a split — photo on
 * one side, copy on the other, both full-bleed like the reference. Without one it
 * degrades to a centred text block rather than reserving empty space.
 */
export function ListingHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: { url: string; alt: string };
}) {
  if (!image) {
    return (
      <div className="border-b border-pine-12 px-5 py-12 text-center tablet:py-16">
        {eyebrow && (
          <Eyebrow as="p" className="mb-3 block">
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="font-serif text-[32px] leading-tight text-pine tablet:text-[44px]">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-[52ch] text-[14.5px] leading-relaxed font-light text-pine-70">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 border-b border-pine-12 tablet:grid-cols-2">
      <div className="relative min-h-[260px] tablet:min-h-[420px]">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes="(min-width: 980px) 50vw, 100vw"
          priority
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center px-5 py-12 text-center tablet:px-16 tablet:py-16">
        {eyebrow && (
          <Eyebrow as="p" className="mb-3 block">
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="font-serif text-[32px] leading-tight text-pine tablet:text-[44px]">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-[46ch] text-[14.5px] leading-relaxed font-light text-pine-70">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
