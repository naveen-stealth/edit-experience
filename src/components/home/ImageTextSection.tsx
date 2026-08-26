import Image from "next/image";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export function ImageTextSection({
  eyebrow,
  title,
  children,
  imageSeed,
  imageAlt,
  imageSrc,
  imagePosition = "center",
  reverse = false,
  footer,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  imageSeed: string;
  imageAlt: string;
  /** Real photo path (e.g. "/storefront.png"). Falls back to the gradient placeholder when omitted. */
  imageSrc?: string;
  imagePosition?: string;
  reverse?: boolean;
  footer?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-2 tablet:gap-16">
      <div className={reverse ? "tablet:order-2" : ""}>
        {imageSrc ? (
          <div className="relative w-full min-h-[320px] overflow-hidden tablet:min-h-[460px]" style={{ aspectRatio: "4/5" }}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 980px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </div>
        ) : (
          <MediaPlaceholder seed={imageSeed} alt={imageAlt} aspect="4/5" className="min-h-[320px] tablet:min-h-[460px]" />
        )}
      </div>
      <div className={reverse ? "tablet:order-1" : ""}>
        {eyebrow && (
          <Eyebrow className="mb-3.5 block">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className="text-[30px] leading-[1.15] text-pine tablet:text-[38px]">{title}</h2>
        <div className="mt-5 space-y-3.5 text-[15px] leading-relaxed font-light text-pine-70">
          {children}
        </div>
        {footer && <div className="mt-6 border-t border-pine-12 pt-5">{footer}</div>}
      </div>
    </div>
  );
}
