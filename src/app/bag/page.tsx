import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { BagView } from "./BagView";

export const metadata: Metadata = { title: "Your Bag" };

/**
 * The bag page hosts both the bag and the wishlist, as tabs — the header's bag
 * icon is the one entry point for both. The active tab travels in the URL
 * (?tab=wishlist) so it's linkable and survives reload, per the house rule
 * that view state lives in the URL.
 */
export default async function BagPage(props: PageProps<"/bag">) {
  const params = await props.searchParams;
  const tab = params.tab === "wishlist" ? "wishlist" : "bag";

  return (
    <>
      <Breadcrumb trail={[{ label: "Home", href: "/" }, { label: tab === "wishlist" ? "Wishlist" : "Your Bag" }]} />
      <Container className="py-10 tablet:py-14">
        <BagView tab={tab} />
      </Container>
    </>
  );
}
