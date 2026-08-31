# Design Standard — Edit Experience

Binding rules for every component, button and page in this repo. Derived from the
Obys educational projects on grids (grids.obys.agency) and typography
(typographyprinciples.obys.agency), chosen and tuned to fit the Edit Experience
brand book (Ivory/Pine/Black at 50/30/10, Scheherazade New regular + Inter
light/regular/medium/semibold). Where this document and the brand book differ,
the brand book wins.

The enforcement lives in `src/app/globals.css` as tokens. This file explains the
system those tokens encode; the tokens are the API.

## 1 · Type ladder — the only font sizes

Nine rungs. Each carries its own line-height and letter-spacing, so using a rung
is using the whole setting. **Never write `text-[NNpx]`, `text-sm`, `text-2xl`
or a raw `tracking-[…]`/`leading-[…]` alongside a rung.** If a design seems to
need a tenth size, it takes the nearest rung — that pressure keeping the ladder
short is the system working, not a limitation to code around.

| Token | Size | LH | Tracking | Face | Use |
|---|---|---|---|---|---|
| `text-display` | 56 | 1.02 | −0.01em | Serif | Page hero |
| `text-display-sm` | 38 | 1.06 | −0.01em | Serif | Hero mobile; section & listing headings desktop |
| `text-title` | 30 | 1.12 | −0.005em | Serif | Section headings mobile; product title |
| `text-title-sm` | 22 | 1.3 | — | Serif | Pull quotes, overlay/drawer titles, designer strip |
| `text-body-lg` | 17 | 1.45 | — | Sans | PDP price, emphasized figures |
| `text-body` | 15 | 1.6 | — | Sans | Editorial paragraphs, card titles, inputs |
| `text-body-sm` | 13 | 1.5 | — | Sans | UI text, card prices, filter options |
| `text-caption` | 12 | 1.45 | — | Sans | Supporting notes, footer links |
| `text-micro` | 11 | 1.4 | — | Sans | Uppercase labels — always with a tracking token |

Why these pairings (from the typography principles): display type wants
90–110% line-height and slight negative tracking — large glyphs read too far
apart at natural spacing; text sizes want 140–160% and no tracking. Hierarchy
comes from **big steps between few sizes** — small differences (13 vs 13.5 vs 14)
read as accidents, and this repo shipped 26 distinct sizes before the ladder.

Serif rungs are Scheherazade New at weight 400 only; sans rungs are Inter at
300/400/500/600 only (brand book: all other weights are forbidden).

## 2 · Tracking — three values

| Token | Value | Use |
|---|---|---|
| `tracking-caps` | 0.14em | Standard uppercase: buttons, nav, labels, column headings |
| `tracking-caps-tight` | 0.1em | Dense caps rows: utility bar, header top row |
| `tracking-eyebrow` | 0.22em | Eyebrows only — the widest voice on the page |

Uppercase micro-type is always tracked (untracked caps read as a solid block).
Mixed-case text is never manually tracked — the ladder handles display sizes.

## 3 · Grid

The site uses the **columns model: margins first, then one gutter.**

- **Margins** — `--page-gutter` (20 → 32 → 40px by breakpoint). Every contained
  block sits inside `Container`; full-bleed panels reach the same line with
  `SplitPanel` or the `page-spine-pl` utility. One left edge per page — the
  spine. Never invent a second margin value.
- **Gutter** — `--grid-gutter` (16 → 24px). Every product/content grid uses
  `gap-(--grid-gutter)` (or `gap-x-…`). Never a per-grid literal gap.
- **Columns** — the page measure is `--container-page` (1360px). Product grids
  split it 2 → 3 → 4; splits are fine (the grids principle: split existing
  columns rather than inventing a new grid), but they divide the same measure
  and share the one gutter.
- Chrome (nav, footer, utility bar) is full-bleed with padded edges; content
  sits on the spine. That distinction is deliberate — don't blur it.

## 4 · Vertical rhythm

The baseline unit is **24px** — the line-height of `text-body` (15/1.6), per the
grids site's horizontal-grid rule: pick the body size, set its line-height, and
derive the vertical system from it.

- Micro-spacing (inside components): 4/8/12/16px — Tailwind steps 1–4.
- Block spacing (between text blocks, inside sections): 24/32/48px.
- Section spacing: the `Section` component only (`default` and `tight`) — never
  hand-rolled `py-*` on a section-level element.

## 5 · Alignment

- **Left is the default** for everything readable (the typography site: ~80% of
  text, clearer baseline, more readable).
- **Centre is for headings only, sparingly** — a standalone `SectionHeader`, a
  pull quote, an empty state. Never centre paragraphs longer than ~2 lines,
  never centre UI text.
- **Right** only as a compositional counterweight (e.g. a price opposite a
  label). Never justified text.

## 6 · Faces & pairing

Serif display + sans text is the site's font pair, per the pairing rules
(contrast of type class, similar proportions). The typography principles map
**jewellery/luxury → serif** — Scheherazade New is that choice; don't dilute it
by setting UI chrome in serif or display headings in Inter. 1–2 faces per
project: these two are the whole budget. Numerals in prices stay sans.

## 7 · Measure

Body text runs 45–75 characters. Cap editorial paragraphs (`max-w-md/lg` or
`max-w-[NNch]`); a centred pull quote caps around 34–46ch. A line that spans the
full 1360px measure is always a bug.

## 8 · What would Obys say no to

Quick review checklist for new work:

- A new `text-[…px]` anywhere → use a rung.
- A fourth tracking value, or tracking on mixed-case text → no.
- A new gap literal on a grid → `--grid-gutter`.
- A second left edge on a page → the spine is the spine.
- Centred body copy → left-align it.
- A heading one notch larger than its neighbour (30 vs 32) → same rung or two
  rungs apart; hierarchy needs contrast, not increments.
- More than ~4 sizes visible on one screen → consolidate.

And the licence, from the same source: *"Don't be afraid to break the rules (if
it's worth that)"* — a deliberate, argued exception is allowed; a drive-by
arbitrary value is not. If you break the ladder, say why in a comment.
