---
updated: 2026-10-13
status: passed
owner: codex
---
# Selected cream editorial style — design QA

## Visual truth and evidence

- Latest user-selected attachment: `/var/folders/vx/b12zbl8s31s6mc1t8_mmm1q00000gn/T/codex-clipboard-f1550233-1aed-4ba2-8e18-9b277518df4f.png` (1124×1250).
- Evidence directory: `/Users/test/Documents/Codex/tea-approved-style-20261013/`.
- Desktop implementation: `desktop-final.png` (1109×3407); viewport 1124×1250 CSS px, DPR 1, 15px scrollbar. Normalized comparison pads the content to the viewport width without stretching it.
- Same starting state: home, at the top, no articles. `comparison.png` pairs the full source and first 1250px of the implementation. `desktop-preview.png` is the corresponding implementation crop.
- Full implementation: `desktop-final.png`, `mobile-final.png` (375×4757, viewport 390×844 CSS px, DPR 1).
- Supporting routes: `mobile-blog.png`, `mobile-story.png`, `mobile-about.png`; the source and these actual renders were opened and inspected.
- Article fixture: `article-mobile-final.png` (375×2727). Synthetic articles exist only in an isolated output outside the production repository.
- Live embedded form: `contact-mobile-form.png` (375×812). Scrolling into the lazy iframe showed the required controls. A full-page capture before lazy loading was blank and is not validation evidence.
- Full-view comparisons cover the page structure. The paired image provides readable hero/story region comparisons; the mobile route sheet and article/form captures cover supporting surfaces.

## Fidelity surfaces

- Typography: system Mincho headings, restrained weight, green text, generous tracking. Desktop hero 48.332px and story 38.216px match the reference hierarchy. Body 18px/1.8; author introduction also 18px. Mobile hero 3 lines; longer labels wrap without truncation.
- Spacing: joined rectangular photo/copy bands, photo left/copy right hero, reversed story band and photo left/copy right maker band. Cream and sage replace the previous dark teal areas. Header centers the brand between navigation groups; mobile uses a 2×2 menu with 48px touch targets. Main buttons are at least 52px high.
- Colors: paper #f8f7f1, sage #eceee5, green text #243c34, green buttons #29473e, muted #59655a, subtle gold #80642a. No gradients or invented illustration assets.
- Photography: approved real pouring photo, the user's cup photo, and the actual maker portrait. Images are sharp, optimized and cropped around the visible subject. The reference's generated drinking man is not presented as the maker.
- Copy: `紅茶の読みもの` replaces the former menu label across navigation, page titles, SEO, breadcrumbs, article templates and footer. Approved story paragraphs remain identical. The title's self-chosen nature remains explicit.

## Intentional adaptations

- The request is to extend this taste to all pages, while retaining the earlier real-photo and functional specifications. The mockup's generated photos, cup ornament, gold leaf and presentation-frame corners are not copied.
- The three topic entrances/recommendations remain conditional on actual articles. The readings area, contact area and footer remain required additions to the three-band source image.
- Body type is larger than the concept's small text to preserve readability for the agreed persona. Header labels are longer because their meaning is clearer.
- The Google-hosted form retains its existing white fields and green button; only the site wrapper was restyled. Sending logic and deployed GAS v3 were not changed.

## Comparison history

- P1: earlier dark teal concept was not the user's newly selected cream concept. Replaced dark panels, reversed hero columns and introduced connected editorial photo/copy bands.
- P2: first implementation had a smaller display heading and excessive story-teaser density (`desktop-first.png`). Increased hero/story heading sizes and shortened only the teaser; kept the full approved story unchanged.
- Post-fix evidence: `comparison.png`, `desktop-final.png`, `mobile-final.png`. No remaining actionable P0/P1/P2 findings within this visual scope.

## Interaction and verification

- Main menu opens the readings index; article author link opens the story.
- Hero CTA scrolls to the readings area (mobile final guide top 24.234px, viewport height 844px).
- Six main routes checked at 320/390/1124px: document width equals client width, body 18px. Evidence: `responsive-checks.json`. Isolated article checked at 390px, no overflow.
- Browser console: no captured errors in the checked site/article tabs. Embedded GAS controls rendered after scrolling; no new mail was sent during this style revision.
- Existing eight tests, Astro check, build, public-output validation, JSON-LD checks and the three-article isolated build passed. Reserved slugs, empty themes and article metadata behavior are preserved.
- iPhone/Safari hardware, OS text enlargement and new Lighthouse scores remain unverified. Cloudflare setup and final owner approval still block release readiness; this QA is not publication approval.

## Follow-up polish

- P3: a real photo of the maker preparing tea would match the concept's everyday atmosphere more closely than the existing formal portrait.

## Implementation checklist

- [x] Cream/sage editorial style across all existing routes and article templates.
- [x] Clear readings menu name and consistent metadata/links.
- [x] Real photography, approved story and working navigation preserved.
- [x] Browser evidence captured, inspected and compared with the exact attachment.
- [x] Publication and automatic posting remain stopped; local preview remains available.

final result: passed
