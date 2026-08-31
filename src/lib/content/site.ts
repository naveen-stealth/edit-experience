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
  /** Renders a full-width dropdown panel beneath the nav row. */
  panel?: NavColumn[];
}

/**
 * The sitemap, taken from the approved nav/footer designs. This list is the
 * source of truth: a route exists because it appears here, not the other way
 * round. Every href below resolves to a real page.
 */

const CONDITION_LINKS = (category: string): NavColumn => ({
  heading: "Condition",
  links: [
    { label: "Unworn", href: `${category}?condition=unworn` },
    { label: "Excellent", href: `${category}?condition=excellent` },
    { label: "Very Good", href: `${category}?condition=very_good` },
    { label: "Good", href: `${category}?condition=good` },
  ],
});

/** Designer links are drawn from designers that actually hold stock in that category. */
const designerColumn = (category: string, designers: { label: string; handle: string }[]): NavColumn => ({
  heading: "Designer",
  links: designers.map((d) => ({ label: d.label, href: `${category}?designer=${d.handle}` })),
});

export const NAV_PRIMARY: NavItem[] = [
  { label: "New Arrivals", href: "/new-arrivals" },
  {
    label: "Bags",
    href: "/categories/bags",
    panel: [
      {
        heading: "Shop",
        links: [
          { label: "All Bags", href: "/categories/bags" },
          { label: "Shoulder Bags", href: "/categories/bags?subcategory=shoulder-bags" },
          { label: "Top Handle", href: "/categories/bags?subcategory=top-handle" },
          { label: "Bucket Bags", href: "/categories/bags?subcategory=bucket-bags" },
          { label: "Pouches", href: "/categories/bags?subcategory=pouches" },
          { label: "Tote", href: "/categories/bags?subcategory=tote" },
        ],
      },
      designerColumn("/categories/bags", [
        { label: "Chanel", handle: "chanel" },
        { label: "Herm\u00e8s", handle: "hermes" },
        { label: "Louis Vuitton", handle: "louis-vuitton" },
        { label: "Dior", handle: "dior" },
        { label: "Gucci", handle: "gucci" },
        { label: "Bottega Veneta", handle: "bottega-veneta" },
        { label: "Saint Laurent", handle: "saint-laurent" },
        { label: "Goyard", handle: "goyard" },
      ]),
      CONDITION_LINKS("/categories/bags"),
    ],
  },
  {
    label: "Clothing",
    href: "/categories/clothing",
    panel: [
      {
        heading: "Shop",
        links: [{ label: "All Clothing", href: "/categories/clothing" }],
      },
      designerColumn("/categories/clothing", [
        { label: "Dior", handle: "dior" },
        { label: "Saint Laurent", handle: "saint-laurent" },
        { label: "Gucci", handle: "gucci" },
      ]),
      CONDITION_LINKS("/categories/clothing"),
    ],
  },
  {
    label: "Accessories",
    href: "/categories/accessories",
    panel: [
      {
        heading: "Shop",
        links: [{ label: "All Accessories", href: "/categories/accessories" }],
      },
      designerColumn("/categories/accessories", [
        { label: "Herm\u00e8s", handle: "hermes" },
        { label: "Gucci", handle: "gucci" },
        { label: "Louis Vuitton", handle: "louis-vuitton" },
      ]),
      CONDITION_LINKS("/categories/accessories"),
    ],
  },
  {
    label: "Fine Jewellery",
    href: "/categories/jewellery",
    panel: [
      {
        heading: "Shop",
        links: [{ label: "All Fine Jewellery", href: "/categories/jewellery" }],
      },
      designerColumn("/categories/jewellery", [
        { label: "Cartier", handle: "cartier" },
        { label: "Chanel", handle: "chanel" },
      ]),
      CONDITION_LINKS("/categories/jewellery"),
    ],
  },
  { label: "Private Sourcing", href: "/private-sourcing" },
];

/** Header utility row, left of the logo. */
export const NAV_UTILITY_LEFT = [
  { label: "Our Story", href: "/our-story" },
  { label: "Stores", href: "/stores" },
];

/**
 * Header utility row, right of the logo — words only. Search, account and bag
 * render as icons in HeaderNav (they're chrome, not content), and the bag link
 * replaced wishlist: the wishlist lives as a tab on the /bag page.
 */
export const NAV_UTILITY_RIGHT = [{ label: "Concierge", href: "/concierge" }];

/**
 * The only category listings the site exposes, taken from the nav design.
 * `/categories/[handle]` 404s for anything outside this list, so a category
 * can't be reached by URL-guessing when it isn't in the navigation.
 */
export const SHOPPABLE_CATEGORIES = ["bags", "clothing", "accessories", "jewellery"] as const;

export const FOOTER_COLUMNS: NavColumn[] = [
  {
    heading: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Bags", href: "/categories/bags" },
      { label: "Clothing", href: "/categories/clothing" },
      { label: "Fine Jewellery", href: "/categories/jewellery" },
    ],
  },
  {
    heading: "Edit Experience",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Authenticity Promise", href: "/authenticity-promise" },
      { label: "Private Sourcing", href: "/private-sourcing" },
      { label: "Store Locations", href: "/stores" },
    ],
  },
  {
    heading: "Client Care",
    links: [
      { label: "Concierge", href: "/concierge" },
      { label: "Shipping & Delivery", href: "/shipping-delivery" },
      { label: "Returns & Exchange", href: "/returns-exchange" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Second-Billed Product Notice", href: "/second-billed-product-notice" },
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
