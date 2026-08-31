import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { VisitStoreSplit } from "@/components/home/VisitStoreSplit";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { STORE_INFO } from "@/lib/content/site";

export const metadata: Metadata = { title: "Store Locations" };

export default function StoresPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: "Stores" }]} />
      <Container className="py-12 tablet:py-16">
        <div className="max-w-[62ch]">
          <Eyebrow as="p" className="mb-3 block">
            Visit Us
          </Eyebrow>
          <h1 className="font-serif text-title text-pine tablet:text-display-sm">One store, on purpose.</h1>
          <p className="mt-5 text-body font-light text-pine-70">
            We operate from a single store in {STORE_INFO.city} — every piece on the site is on its
            shelves, and you are welcome to see anything in person before you buy.
          </p>
        </div>
      </Container>
      <VisitStoreSplit />
    </>
  );
}
