# AGENTS.md — DEP Home Repair

Instructions for any human or coding agent working on [1791-pueblo/Dephomerepair](https://github.com/1791-pueblo/Dephomerepair).
Live site: https://www.dephomerepair.com · Preview: https://dephomerepair.vercel.app
Owner: Jason Palmer · Chandler / East Valley, AZ · 602-598-1988 · info@dephomerepair.com

## Mission

Sell the convenience of one licensed tradesperson who can finish drywall, electrical, and plumbing in a single visit. Photos should prove process and quality. Captions should tell a short job story in DEP voice and naturally point to bundling (Power Pair 10% / Triple Play 15% labor off, service call waived when work is booked, one 5-minute "While We're There" task free).

Do not turn the site into a generic handyman gallery. Every project card should answer: what was wrong, what DEP did, which trades were combined, why that is easier than hiring three people.

## Brand voice

Tone: calm, direct, competent. First-person-company, not corporate and not folksy.

Use:
- Fair pricing. Clean work. Done right the first time.
- You deal directly with the person who does the work.
- Clear communication, reliable scheduling, no runaround.
- Seamless, smart repairs & upgrades.
- Home-Smart Solutions for the East Valley.

Avoid:
- Hype ("best in the valley", "unbeatable", "luxury transformation").
- Scare tactics or shame.
- Jargon without a payoff ("12/2 NM-B" is fine only when the next clause explains why it matters: code, warranty, or durability).
- Selling carpentry, painting, or general contracting as core categories. Those can appear as supporting work on a DEP job, not as a fourth trade.
- Fake urgency.

Caption pattern (1–2 sentences):
1. What the photo shows (before / during / after).
2. Why it matters to the homeowner (leak stopped, texture matched, warranty kept, one visit).
3. Optional soft close on the last frame only: "Same visit we can handle the drywall patch and the outlet. Power Pair is 10% off labor."

Do not put a hard sell on every slide.

## Bundling rules (must stay consistent with `lib/pricing.ts`)

- Power Pair: any two of Drywall / Electrical / Plumbing → 10% off labor.
- Triple Play: all three → 15% off labor.
- Service call waived when any repair or install is booked.
- While We're There: one small ~5-minute task free with any booked service.
- Device markup (~25%) is never discounted by the bundle. Only labor is.

When a project used two or three trades, the project `tag` and story must say so. Bathroom work that includes plumbing rough-in, electrical rough-in, and moisture-resistant drywall is a Triple Play proof point — label it that way.

## Photo pipeline

Canonical location: `public/gallery/` only. Next.js serves that folder at `/gallery/...`.

Never:
- Leave job photos at the repo root (they are not publicly served).
- Hotlink `https://github.com/user-attachments/assets/...`. Those URLs can expire and require `next.config.ts` remotePatterns. Download the file, name it, put it in `public/gallery/`.
- Commit the same JPEG twice (root + public).
- Publish house numbers, mail, faces, or documents. Crop first.
- Invent a finished photo if we only have a rough-in. Mark the sequence honestly.

Naming:
```
{job}-{nn}-{stage}.jpg
```
Examples already in use: `closet-01-demolition.jpg`, `hosebib-02-after.jpg`, `rangehood-01-rough-opening.jpg`.

Prefer 1600px on the long edge, JPEG quality ~75–85, or WebP. Keep each file under ~300KB when possible.

Update `gallery-photo-list.txt` whenever photos are added so captions stay reviewable without opening `page.tsx`.

## Code structure (do this before adding more stories)

`app/page.tsx` is a 40k+ client component that owns quote state, Tally booking, testimonials, AND `portfolioProjects`. That mix is the main maintenance risk.

When implementing the photo-story plan:
1. Extract `portfolioProjects` to `lib/portfolio.ts` (data only).
2. Keep `ProjectPhotoSlider` as the visual control. Extend it; do not fork a second slider.
3. Support fields on each project:
   - `title`, `description`
   - `trades: Array<'drywall' | 'electrical' | 'plumbing'>` (source of truth for tags and filters)
   - `bundle: 'single' | 'power-pair' | 'triple-play'`
   - `type: 'sequence' | 'before-after' | 'single'`
   - `photos: { src: string; caption: string }[]`
   - optional `supportPhotos` for detail shots under the main slider
   - optional `quoteHint` — short line that maps the job to services in Instant Quote
4. Do not change pricing math in the same PR as copy/photo work unless Jason asked for a price change.
5. Do not add a public `/lead-qualifier` link in the main nav unless that page is intentionally customer-facing.
6. Brand colors already in use: Atlantic `#005683`, amber `#FFAB00`, plumbing `#0077B6`, ink `#1A1A1A`.

Known defects to fix first (see assessment):
- `/gallery/bathroom-pony-wall-vanity-finished.jpg` is referenced but the file lives at repo root → 404 on the last bathroom slide.
- Bathroom process frames 1–4 are GitHub attachment URLs, not files in `public/gallery/`.
- Duplicate JPEGs at repo root waste history and confuse agents.
- `public/dep-logo.png` is a 96-byte stub. Use `/logo.png`.
- Nav lists Reviews before Portfolio; on-page order is Portfolio then Reviews. Match them.

## Implementation checklist for a photo-story PR

- [ ] Move or add every used photo under `public/gallery/` and point `src` at `/gallery/...`.
- [ ] Delete unused root-level job JPEGs after they exist in `public/gallery/`.
- [ ] Rewrite captions in DEP voice; last frame may mention bundle / one-visit convenience.
- [ ] Bathroom card: trades include drywall + plumbing + electrical when the photos support it. Show Triple Play badge.
- [ ] Closet card: primary trade Drywall. Do not market "Carpentry" as a sold category.
- [ ] Rangehood / hose bib / LED: keep honest trade tags; add a "While we're there" line where a second trade is a natural add-on (drywall patch after plumbing access, outlet with lighting, etc.).
- [ ] Project section CTA: "Start a bundled quote →" scrolls to `#quote` and, if easy, pre-selects the relevant category.
- [ ] Alt text equals the caption (accessibility).
- [ ] Lightbox already exists on the page; keep it working.
- [ ] Do not block the Instant Quote flow. Portfolio is proof, quote is the conversion.

## What not to build unless asked

- A separate CMS or cloud image host.
- Auto-pull from Google Drive (photos are not currently organized there).
- Stock photos.
- Before/after sliders that invent an "after" from AI.
- New marketing claims (license numbers, "same-day guaranteed", review counts) without Jason confirming the fact.

## How to ship

1. Branch from `main`.
2. Small PRs: assets+paths first, then copy, then layout/bundle badges.
3. Preview on Vercel before merging.
4. Jason reviews captions for accuracy (product names, materials, what actually happened on site).
