import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Designer } from "@/lib/commerce/types";

export function DesignerStrip({ designers }: { designers: Designer[] }) {
  return (
    <div className="border-y border-pine-12 py-10 tablet:py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {designers.map((designer) => (
            <Link
              key={designer.id}
              href={`/designers/${designer.handle}`}
              className="font-serif text-[22px] text-pine-70 transition-colors duration-150 ease-luxury hover:text-pine active:text-pine"
            >
              {designer.name}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
