---
updated: 2026-10-13
status: passed
owner: codex
---
# Complete tea homepage — implementation QA

## Revised visual brief

- Owner feedback: the narrowed three-band implementation had excessive side margins and did not have the depth of a complete tea website. The previous compact composition assessment is superseded.
- Keep the selected cream/sage/green, Mincho and real-photography taste; use KUSMI TEA's complete-page editorial rhythm as a reference for depth, not its catalog, product claims, prices or customer reviews.
- Source taste image: `/var/folders/vx/b12zbl8s31s6mc1t8_mmm1q00000gn/T/codex-clipboard-f1550233-1aed-4ba2-8e18-9b277518df4f.png` (1124×1250).
- Owner rejection evidence: `/var/folders/vx/b12zbl8s31s6mc1t8_mmm1q00000gn/T/codex-clipboard-c02db6c0-b199-426d-a15a-208cede05779.png`. Its browser chrome contains private information; it is not copied into the repository or uploaded.
- Reference URL: https://www.kusmitea.jp/ . Desktop source capture at 1440px: `kusmi-full.png` (8888px high), `kusmi-sections.png` in the evidence directory. Lazy offscreen imagery is not treated as source-asset evidence.

## Rendered evidence

- Directory: `/Users/test/Documents/Codex/tea-full-home-20261013/`.
- Actual final desktop: `desktop-final.png`, viewport/content width 1440 CSS px, DPR 1; final page height 6882px. No density scaling in the capture.
- Native Chrome actual viewport: `chrome-first-screen.png`, 2520×1686, reported DPR 1.3333. Hero width 2520px, photograph width 1260px, no overflow. Browser zoom settings were not changed.
- Mobile: `mobile-home.png`, 390px viewport. `responsive-home.json` records home widths 320/390/840/1440/2432; `responsive-pages.json` records the other five main routes at 320/1440.
- Full page and focused region captures were opened and inspected. `homepage-overview.png` splits the actual page into sequential strips; `taste-comparison.png` compares the selected visual language with the expanded hero. This is an adapted complete website, not a pixel clone of either source.

## Findings and changes

- P1: fixed 1200px photo bands floated inside a much wider canvas. Replaced them with full-width 50/50 hero and editorial bands, with a common 1440px content grid for cards, header and footer.
- P1: treating the source's first three bands as the complete homepage removed too much content. Built eight substantive sections: hero, project introduction, story, three values, work in progress, readings, maker and contact.
- P1: oversized formal portrait dominated the tea imagery. Returned it to an authentic 160×200px biography portrait; the large image regions now show tea and preparation.
- P2: a long value heading stranded its last characters. Expanded the heading measure and balanced heading wrapping. Final value heading is one line at 1440px.
- P2: mobile explanatory prose pushed the primary CTA below the first screen. Reordered the mobile CTA directly after the display heading. Button bottoms: 728px at 320px width and 794px at 390px width, within the 844px test viewport.
- No remaining actionable P0/P1/P2 findings in the revised implementation scope. Owner visual approval is still pending.

## Fidelity surfaces

- Typography: Mincho display headings and hero prose, comfortable sans-serif body text, restrained weight and tracking. Mobile primary prose 18px; main controls at least 52px high. Headings have deliberate/balanced wrapping.
- Layout: intentional full-width half/half photographs, alternating editorial sections, centered introduction, three equal value cards, aligned reading/contact columns, proportionate maker biography and grouped footer navigation.
- Color: warm paper #f8f7f1, sage #eceee5, dark green #243c34/#29473e, muted #59655a, gold #80642a. No gradients or invented decorative drawings.
- Images: seven rendered image slots from four real photographs. All seven were loaded during actual scrolling. New preparation photo is an Unsplash-licensed image by ORIENTO and is labeled as illustrative in the work section; it is not presented as the maker or a proven decaf product. Credits: docs/photo-credits.md.
- Copy: expanded explanation of WHO/WHAT, the mother story and intended checking process. No fabricated articles, results, products, prices, testimonials, health guarantees or events. Full approved story remains unchanged.

## Verification and limits

- Existing eight tests, Astro check, build, public-output validation and JSON-LD checks passed. Three approved synthetic articles passed the isolated build; none are in the production source.
- No horizontal overflow at the recorded widths, including actual native Chrome at 2520px. Main menu/readings/story navigation and the hero anchor were checked. No captured browser errors in the inspected tabs.
- Article-free topics remain absent from home navigation and sitemap, with noindex pages; featured recommendations remain conditional on approved real articles. The values are project beliefs, not fake topic/article entrances.
- GAS sending logic, private recipient, anti-spam controls and publication gates are unchanged. No contact email was sent during this revision.
- iPhone/Safari hardware, OS text enlargement, new Lighthouse measurements and Cloudflare setup remain outstanding. No main merge, remote push, public deployment or automatic posting was performed.

## Checklist

- [x] Complete homepage rather than a compact poster.
- [x] Width/alignment correction in the owner's wide-display conditions.
- [x] Actual imagery, working controls, honest empty-article state and readable mobile CTA.
- [x] Full-page and region comparison, recorded tests and local preview.
- [x] Preserve release approval requirement and stopped publication.

final result: passed
