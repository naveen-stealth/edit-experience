import { UtilityBar } from "./UtilityBar";
import { HeaderNav } from "./HeaderNav";

/**
 * The utility bar sits outside the sticky <header> deliberately, and outside the
 * banner landmark with it: it's supplementary (city, hours, social) and pinning
 * it would put ~155px of chrome on screen permanently. Letting it scroll away
 * leaves only the nav pinned.
 *
 * The fragment matters — <header> has to be a direct child of <body> so its
 * sticky containing block is the page rather than a short wrapper, otherwise it
 * would unpin as soon as that wrapper scrolled out of view.
 */
export function Header() {
  return (
    <>
      <UtilityBar />
      <header className="sticky top-0 z-40">
        <HeaderNav />
      </header>
    </>
  );
}
