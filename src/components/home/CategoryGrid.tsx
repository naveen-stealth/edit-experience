import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Category } from "@/lib/commerce/types";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 gap-(--grid-gutter) tablet:grid-cols-3">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.handle}`} className="group block transition-transform duration-150 ease-luxury active:scale-[0.99] motion-reduce:active:scale-100">
          <div className="relative w-full min-h-[380px] overflow-hidden" style={{ aspectRatio: "3/4" }}>
            {category.image ? (
              <Image
                src={category.image.url}
                alt={category.image.alt}
                fill
                sizes="(min-width: 980px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <MediaPlaceholder
                seed={category.handle}
                alt={category.name}
                aspect="3/4"
                className="min-h-[380px] transition-transform duration-500 group-hover:scale-[1.04]"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,10,8,0.78)_0%,rgba(2,10,8,0.08)_45%)]" />
            <div className="absolute bottom-6 left-6 text-ivory">
              <Eyebrow onDark className="mb-1.5 block">
                Shop
              </Eyebrow>
              <h3 className="text-title">{category.name}</h3>
            </div>
            <span className="absolute bottom-6 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-ivory-45 text-ivory">
              <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
