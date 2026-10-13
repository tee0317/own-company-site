---
updated: 2026-10-13
status: passed
owner: codex
---
# Layout correction after owner feedback

## Source and comparison evidence

- Exact selected image: `/var/folders/vx/b12zbl8s31s6mc1t8_mmm1q00000gn/T/codex-clipboard-f1550233-1aed-4ba2-8e18-9b277518df4f.png` (1124×1250px).
- Evidence: `/Users/test/Documents/Codex/tea-layout-correction-20261013/`.
- Latest browser render: `desktop-current.png` (1109px content width), viewport 1124×1320 CSS px, DPR 1, 15px scrollbar. `mobile-final.png`: 375×4171px, viewport 390×844 CSS px, DPR 1.
- Same state: homepage at the top, no articles. `comparison-final.png` pairs the full source with the first 1290px of the implementation, padding the content to the viewport width without stretching it. Source-frame corners/black margin are presentation chrome.
- `desktop-top-current.png` is the actual preview crop; `comparison-current.png` is the latest paired comparison. Both the source and latest comparison were opened and inspected.
- Full implementation and focused three-band comparison cover typography, proportions and asset crops. Mobile render was also opened and inspected.

## Findings and correction history

- P1, previous 614ec66: first QA accepted palette and generic photo/copy bands while overlooking the source's compact composition. The owner correctly identified this mismatch. That assessment is superseded.
- P1: the readings area interrupted the three connected image/copy bands. Moved it below the maker, following the owner's latest source/layout direction. Hero CTA still jumps directly to the readings area.
- P1: maker portrait floated inside a tall panel. Removed the frame/padding, expanded the actual portrait to the full image column, and retained the real maker name in a caption.
- P2: story/maker copy was too long for the source density. Kept a short introduction and link on the homepage; full story and activity explanations remain on their existing pages.
- P2: hero prose wrapped awkwardly and headings had excessive line spacing. Added intentional desktop line breaks, tightened heading rhythm, and used Mincho for marketing copy.
- First correction evidence: `desktop-v1.png`, `comparison-v1.png`. Maker band was 360px and hero prose still needed the source's three-line wrapping.
- Final correction: deliberate hero line breaks, smaller maker heading and less vertical padding. Final evidence: `desktop-final.png`, `comparison-final.png`, `mobile-final.png`.
- Wide-screen correction: cap home bands and page introductions at 1200px and hero heading at 52px. This prevents oversized photographs/portrait crops on 1680px screens. Source-width proportions remain unchanged.

## Fidelity surfaces

- Layout: desktop hero 490.156px high, story 340px, maker 340px. Column splits 53.6/46.4%, 45/55%, 49.2/50.8%. The source's approximate bands are 486/340/311px; the extra maker height accommodates the actual identity/title explanation.
- Typography: system Mincho for display and marketing copy, 48.332px hero with 1.28 line-height, restrained 2-line section headings. Desktop marketing paragraphs 16px; mobile paragraphs remain 18px/1.8. Long-form article readability is unchanged.
- Spacing: continuous rectangular images, reversed story columns, no large gap before maker. Short copy aligns within corresponding cream/sage panels.
- Color: warm paper, sage and deep green remain consistent with the source. No gradients or invented illustration assets.
- Assets: approved real pouring/cup/maker photographs are used. Their subjects, lighting and the actual maker's formal portrait differ from the generated concept; image identity/lighting is not an exact match. No generated man is represented as the actual maker.
- Copy: current readings menu retained; approved full story unchanged. Homepage copy is shorter, without invented testimonials, health promises or event/product claims. Self-chosen title remains explained.

## Verification and limits

- `npm run verify`: eight tests, Astro check, build, public-content and JSON-LD checks passed. Three-article isolated build passed; no fixture is in production.
- Homepage widths 320/390/760/1124px: no horizontal overflow. Evidence: `responsive.json` and desktop measurement. Mobile descriptions 18px.
- Hero CTA reaches #guide at top 24.375px. Browser captured no errors. Previous menu/form behavior is unchanged.
- Actual Codex preview is about 454px wide and correctly uses the mobile stack. Chrome at 1680px shows two-column desktop bands. All three photos loaded; actual viewport evidence is `chrome-viewport-final.png`. Chrome full-page captures had image-compositing gaps and are excluded from visual evidence.
- iPhone/Safari hardware, OS text enlargement, new Lighthouse scores and Cloudflare configuration remain outstanding. No publication or automatic posting was enabled.
- Residual P3: genuine tea-preparation maker photography and warmer authentic tea photographs would bring image content/lighting closer to the concept. Existing real-photo constraints are retained.

## Implementation checklist

- [x] Corrected source composition and photo/copy proportions.
- [x] Removed the floating maker-photo frame and condensed homepage copy.
- [x] Compared actual preview with the exact source, not another mockup.
- [x] Checked responsive behavior and kept working navigation.
- [x] Local preview retained; release remains stopped.

final result: passed
