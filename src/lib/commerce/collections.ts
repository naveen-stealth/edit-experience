import type { Category, Collection, Designer } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-bags",
    handle: "bags",
    name: "Bags",
    image: { url: "/category-bag.png", alt: "A Goyard tote styled on a velvet armchair" },
  },
  { id: "cat-shoes", handle: "shoes", name: "Shoes" },
  { id: "cat-watches", handle: "watches", name: "Watches" },
  { id: "cat-jewellery", handle: "jewellery", name: "Jewellery" },
  { id: "cat-accessories", handle: "accessories", name: "Accessories" },
  { id: "cat-clothing", handle: "clothing", name: "Clothing" },
  {
    id: "cat-bracelets",
    handle: "bracelets",
    name: "Bracelets",
    parentHandle: "jewellery",
    image: { url: "/category-bracelet.png", alt: "An enamel H bracelet worn on the wrist" },
  },
  {
    id: "cat-wallets",
    handle: "wallets",
    name: "Wallets",
    parentHandle: "accessories",
    image: { url: "/category-wallets.png", alt: "A Goyard wallet resting on a flannel throw" },
  },
];

export const DESIGNERS: Designer[] = [
  {
    id: "des-chanel",
    handle: "chanel",
    name: "Chanel",
    description: "French maison founded 1910. Quilted leather, tweed, the double-C.",
  },
  {
    id: "des-hermes",
    handle: "hermes",
    name: "Hermès",
    description: "Parisian leather house founded 1837, known for the Birkin and Kelly.",
  },
  {
    id: "des-louis-vuitton",
    handle: "louis-vuitton",
    name: "Louis Vuitton",
    description: "French trunk maker turned leather goods house, founded 1854.",
  },
  {
    id: "des-dior",
    handle: "dior",
    name: "Dior",
    description: "Parisian couture house founded 1946 by Christian Dior.",
  },
  {
    id: "des-gucci",
    handle: "gucci",
    name: "Gucci",
    description: "Florentine house founded 1921, known for the double-G and horsebit.",
  },
  {
    id: "des-cartier",
    handle: "cartier",
    name: "Cartier",
    description: "French jeweller and watchmaker founded 1847.",
  },
  {
    id: "des-rolex",
    handle: "rolex",
    name: "Rolex",
    description: "Swiss watch manufacturer founded 1905.",
  },
  {
    id: "des-bottega-veneta",
    handle: "bottega-veneta",
    name: "Bottega Veneta",
    description: "Italian leather house founded 1966, known for intrecciato weave.",
  },
  {
    id: "des-saint-laurent",
    handle: "saint-laurent",
    name: "Saint Laurent",
    description: "Parisian house founded 1961 by Yves Saint Laurent.",
  },
  {
    id: "des-prada",
    handle: "prada",
    name: "Prada",
    description: "Milanese house founded 1913, known for nylon and understated tailoring.",
  },
  {
    id: "des-goyard",
    handle: "goyard",
    name: "Goyard",
    description: "Parisian trunk maker founded 1853, known for the hand-painted chevron canvas.",
  },
  {
    id: "des-alexander-mcqueen",
    handle: "alexander-mcqueen",
    name: "Alexander McQueen",
    description: "London house founded 1992, known for sharp tailoring and the skull motif.",
  },
  {
    id: "des-valentino",
    handle: "valentino",
    name: "Valentino",
    description: "Roman couture house founded 1960 by Valentino Garavani.",
  },
  {
    id: "des-polene",
    handle: "polene",
    name: "Polène",
    description: "Paris-based leather house founded 2016, known for sculptural, hardware-free bags.",
  },
  {
    id: "des-loewe",
    handle: "loewe",
    name: "Loewe",
    description: "Spanish leather house founded 1846, known for the Puzzle bag and Anagram motif.",
  },
  {
    id: "des-moynat",
    handle: "moynat",
    name: "Moynat",
    description: "Parisian trunk maker founded 1849, revived in 2010, known for the Gaby bag.",
  },
  {
    id: "des-valentino-garavani",
    handle: "valentino-garavani",
    name: "Valentino Garavani",
    description: "The accessories signature line named for the house's founder.",
  },
];

/**
 * Editorial collections. productIds are filled in from products.ts to avoid
 * a circular import — see attachProductsToCollections().
 */
export const COLLECTIONS: Collection[] = [
  {
    id: "col-new-arrivals",
    handle: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Just in",
    productIds: [],
  },
  {
    id: "col-evening-edit",
    handle: "the-evening-edit",
    title: "The Evening Edit",
    subtitle: "For the pieces that hold a room",
    description:
      "Minaudières, statement jewellery and eveningwear selected for the way they move under low light.",
    productIds: [],
  },
  {
    id: "col-icons-revisited",
    handle: "icons-revisited",
    title: "Icons Revisited",
    subtitle: "The pieces that defined an era, back in circulation",
    description:
      "Archive silhouettes from the houses that invented them — carried once, considered twice.",
    productIds: [],
  },
  {
    id: "col-investment-pieces",
    handle: "investment-pieces",
    title: "Investment Pieces",
    subtitle: "Value that holds",
    description:
      "Pieces with a track record of holding — or growing — their value over time.",
    productIds: [],
  },
  {
    id: "col-bags-worth-collecting",
    handle: "bags-worth-collecting",
    title: "Bags Worth Collecting",
    subtitle: "Beyond the everyday carry",
    productIds: [],
  },
];

export function getCategoryByHandle(handle: string): Category | undefined {
  return CATEGORIES.find((c) => c.handle === handle);
}

export function getDesignerByHandle(handle: string): Designer | undefined {
  return DESIGNERS.find((d) => d.handle === handle);
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.handle === handle);
}
