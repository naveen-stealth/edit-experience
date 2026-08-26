/**
 * Centralized, CMS-ready site content. Nothing here is business logic —
 * it's copy and structural nav/footer/store data that a future CMS would
 * own. Keep it out of components so editorial changes never require
 * touching presentation code.
 *
 * Store address/hours below are placeholders pending sign-off — flagged
 * inline. Do not treat as final legal/operational copy.
 */

export const SITE_NAME = "Edit Experience";
export const SITE_TAGLINE = "Authenticated luxury, selected by Edit.";
export const SITE_DESCRIPTION =
  "A curated selection of authenticated pre-owned luxury — bags, watches, jewellery and more — from a single store in Hyderabad, with concierge support for sourcing and enquiries.";

export interface NavColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface NavItem {
  label: string;
  href: string;
  megaMenu?: NavColumn[];
}

export const NAV_PRIMARY: NavItem[] = [
  { label: "New In", href: "/new-in" },
  {
    label: "Women",
    href: "/women",
    megaMenu: [
      {
        heading: "Shop",
        links: [
          { label: "Bags", href: "/categories/bags?gender=women" },
          { label: "Shoes", href: "/categories/shoes?gender=women" },
          { label: "Jewellery", href: "/categories/jewellery?gender=women" },
          { label: "Clothing", href: "/categories/clothing?gender=women" },
        ],
      },
    ],
  },
  {
    label: "Men",
    href: "/men",
    megaMenu: [
      {
        heading: "Shop",
        links: [
          { label: "Bags", href: "/categories/bags?gender=men" },
          { label: "Shoes", href: "/categories/shoes?gender=men" },
          { label: "Watches", href: "/categories/watches?gender=men" },
          { label: "Clothing", href: "/categories/clothing?gender=men" },
        ],
      },
    ],
  },
  { label: "Bags", href: "/categories/bags" },
  { label: "Footwear", href: "/categories/shoes" },
  { label: "Accessories", href: "/categories/accessories" },
  { label: "Designers", href: "/designers" },
  { label: "Collections", href: "/collections/new-arrivals" },
  { label: "The Edit", href: "/journal" },
  { label: "Concierge", href: "/concierge" },
  { label: "About", href: "/about" },
  { label: "Visit Store", href: "/visit-store" },
];

export const FOOTER_COLUMNS: NavColumn[] = [
  {
    heading: "Shop",
    links: [
      { label: "New In", href: "/new-in" },
      { label: "Women", href: "/women" },
      { label: "Men", href: "/men" },
      { label: "Bags", href: "/categories/bags" },
      { label: "Shoes", href: "/categories/shoes" },
      { label: "Accessories", href: "/categories/accessories" },
      { label: "Designers", href: "/designers" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Concierge", href: "/concierge" },
      { label: "Private Sourcing", href: "/private-sourcing" },
      { label: "Authentication", href: "/authenticity" },
      { label: "Visit Store", href: "/visit-store" },
    ],
  },
  {
    heading: "Customer Care",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns & Exchange", href: "/returns" },
      { label: "Contact", href: "/concierge" },
      { label: "FAQ", href: "/authenticity#faq" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "The Edit", href: "/journal" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export interface StoreHours {
  days: string;
  hours: string;
}

export const STORE_INFO = {
  name: "Edit Experience",
  addressLines: ["385, Road No. 82, Phase III", "Jubilee Hills, Hyderabad, Telangana 500033"],
  city: "Hyderabad",
  phoneDisplay: "+91 72075 03237",
  hours: [{ days: "Every day", hours: "11:00 AM – 8:00 PM" }] as StoreHours[],
  mapQuery: "Road No. 82, Phase III, Jubilee Hills, Hyderabad",
  coordinates: { lat: 17.4326, lng: 78.4071 }, // approximate — confirm exact pin placement
};

export type TrustPointIcon = "authenticated" | "invoice" | "store" | "concierge";

export const TRUST_POINTS: { title: string; description: string; icon: TrustPointIcon }[] = [
  {
    title: "Every piece authenticated",
    description:
      "Each item is inspected in-house before it is listed. Higher-value bags and watches also carry Entrupy certification where applicable.",
    icon: "authenticated",
  },
  {
    title: "A proper invoice",
    description: "Every purchase — online or in-store — is accompanied by a GST invoice.",
    icon: "invoice",
  },
  {
    title: "A physical store",
    description: "We operate from a single store in Hyderabad. You are welcome to visit before you buy.",
    icon: "store",
  },
  {
    title: "Concierge, not chatbots",
    description: "Questions about a piece, sourcing, or an order are answered by a person, on WhatsApp or in store.",
    icon: "concierge",
  },
];

export const CONCIERGE_SERVICES = [
  {
    title: "Product recommendations",
    description: "Tell us what you're looking for and we'll point you to what's already in the store.",
  },
  {
    title: "Private sourcing",
    description: "Looking for a specific piece we don't currently have? We source on request.",
  },
  {
    title: "Rare and archive pieces",
    description: "For discontinued styles and collector pieces, concierge is often the fastest route.",
  },
  {
    title: "Styling support",
    description: "Advice on sizing, pairing and care, from people who handle these pieces daily.",
  },
  {
    title: "Gifting",
    description: "Help choosing a piece for someone else, including gift-ready presentation.",
  },
  {
    title: "After-sales support",
    description: "Questions about an order, a return, or the condition of a piece after delivery.",
  },
] as const;
