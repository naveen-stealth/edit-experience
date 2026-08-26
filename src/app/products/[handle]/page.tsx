import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { ProductBuyPanel } from "@/components/pdp/ProductBuyPanel";
import { ProductRail } from "@/components/home/ProductRail";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { DetailPanels } from "@/components/ui/DetailPanels";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { getCategoryByHandle } from "@/lib/commerce/collections";
import { getPurchaseDecision } from "@/lib/commerce/purchase";
import { getAllProducts, getProductByHandle, getRelatedProducts } from "@/lib/commerce/products";
import { CONDITION_LABEL } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/utils/format";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ handle: product.handle }));
}

export async function generateMetadata(props: PageProps<"/products/[handle]">): Promise<Metadata> {
  const { handle } = await props.params;
  const product = getProductByHandle(handle);
  if (!product) return {};

  const decision = getPurchaseDecision(product);

  return {
    title: `${product.brand} ${product.title}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.brand} — ${product.title}`,
      description: decision.showPrice
        ? `${formatMoney(product.price)} · ${CONDITION_LABEL[product.condition]} condition`
        : `Available by enquiry · ${CONDITION_LABEL[product.condition]} condition`,
      images: product.thumbnail.url.startsWith("/") ? [product.thumbnail.url] : undefined,
    },
  };
}

/** A labelled row in the specification list. Omitted entirely when empty. */
function Spec({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === "") return null;
  return (
    <div className="flex justify-between gap-6 border-b border-pine-12 py-3 text-[13.5px]">
      <dt className="text-pine-45">{label}</dt>
      <dd className="text-right text-pine">{value}</dd>
    </div>
  );
}

export default async function ProductPage(props: PageProps<"/products/[handle]">) {
  const { handle } = await props.params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const decision = getPurchaseDecision(product);
  const category = getCategoryByHandle(product.category);
  const related = getRelatedProducts(product, 7);
  const images = product.images.length > 0 ? product.images : [product.thumbnail];

  const { authentication: auth, shipping, returnPolicy: returns } = product;

  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Home", href: "/" },
          ...(category ? [{ label: category.name, href: `/categories/${category.handle}` }] : []),
          { label: product.title },
        ]}
      />

      <Container className="py-8 tablet:py-12">
        <div className="tablet:grid tablet:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] tablet:gap-14">
          <ProductGallery images={images} brand={product.brand} seed={product.id} />

          {/* Sticky on desktop so the buy action stays in reach past a tall gallery. */}
          <div className="mt-8 tablet:mt-0">
            <div className="tablet:sticky tablet:top-[150px]">
              <Eyebrow as="p" className="mb-2.5 block">
                <a
                  href={`/designers/${product.designerHandle}`}
                  className="transition-opacity duration-150 ease-luxury hover:opacity-70"
                >
                  {product.brand}
                </a>
              </Eyebrow>

              <h1 className="font-serif text-[26px] leading-tight text-pine tablet:text-[32px]">{product.title}</h1>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {decision.showPrice ? (
                  <>
                    <p className="text-[19px] text-pine">{formatMoney(product.price)}</p>
                    {product.compareAtPrice && (
                      <p className="text-[14px] text-pine-45 line-through">{formatMoney(product.compareAtPrice)}</p>
                    )}
                  </>
                ) : (
                  <p className="text-[17px] text-pine">Price on request</p>
                )}
              </div>

              <p className="mt-1.5 text-[12.5px] text-pine-45">
                {CONDITION_LABEL[product.condition]} condition · Inspected in-house
              </p>

              <div className="mt-7">
                <ProductBuyPanel product={product} />
              </div>

              <div className="mt-9">
                <DetailPanels
                  panels={[
                    {
                      id: "description",
                      label: "The Piece",
                      content: (
                        <div className="space-y-3.5">
                          <p>{product.description}</p>
                          {product.conditionNotes && (
                            <p className="text-pine">
                              <span className="text-pine-45">Condition notes: </span>
                              {product.conditionNotes}
                            </p>
                          )}
                        </div>
                      ),
                    },
                    {
                      id: "details",
                      label: "Details",
                      content: (
                        <dl className="mt-1">
                          <Spec label="Condition" value={CONDITION_LABEL[product.condition]} />
                          <Spec label="Colour" value={product.colour} />
                          <Spec label="Material" value={product.material} />
                          <Spec label="Size" value={product.size} />
                          <Spec label="Dimensions" value={product.dimensions} />
                          <Spec label="Year" value={product.year} />
                          <Spec label="Reference" value={product.sku} />
                        </dl>
                      ),
                    },
                    {
                      id: "authenticity",
                      label: "Authenticity",
                      content: (
                        <ul className="space-y-2.5">
                          {auth.checkedInStore && <li>Inspected in-house before listing.</li>}
                          {auth.provider && <li>Verified with {auth.provider}.</li>}
                          {auth.certificateAvailable && <li>Certificate of authentication supplied.</li>}
                          {auth.invoiceAvailable && <li>GST invoice supplied with every purchase.</li>}
                        </ul>
                      ),
                    },
                    {
                      id: "delivery",
                      label: "Delivery & Returns",
                      content: (
                        <ul className="space-y-2.5">
                          <li>
                            Delivered in {shipping.tier1Days}–{shipping.tier2Days} working days.
                          </li>
                          {shipping.note && <li className="text-pine-45">{shipping.note}</li>}
                          <li>
                            {returns.eligibleForReturn
                              ? `Returns within ${returns.initiationWindowDays} days of delivery, as ${
                                  returns.remedy === "store_credit" ? "store credit" : returns.remedy
                                }.`
                              : "This piece is final sale."}
                          </li>
                          {returns.notes && <li className="text-pine-45">{returns.notes}</li>}
                        </ul>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <Section bleed spaceTop="tight" spaceBottom="tight">
          <ProductRail
            eyebrow="You May Also Like"
            title="More to consider"
            products={related}
            viewAllHref={category ? `/categories/${category.handle}` : "/new-in"}
            layout="carousel"
          />
        </Section>
      )}
    </>
  );
}
