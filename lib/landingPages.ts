import { DOOR_PRICES, DOOR_FLAT_PRICE_NOTE, SEASONAL_PACKAGES, SEASONAL_PACKAGES_NOTE } from './moreHomeFixes';
import { shareImage } from './seo';

/**
 * Content for the door, seasonal, and stucco service pages and the service-area pages.
 * Prices come from lib/moreHomeFixes.ts so the menu and these pages never disagree.
 * Wording rules: keep "Not a licensed contractor." (footer + page), never write licensed / ROC / to code / insured,
 * no painting, no grab bars, every job under $1,000 total.
 */

export type PriceLine = { label: string; price: string; note?: string };
export type LandingSection = { heading: string; body?: string[]; bullets?: string[]; prices?: PriceLine[]; priceNote?: string };
export type LandingPhoto = { src: string; caption: string; width: number; height: number };
export type LandingLink = { href: string; label: string };

export type LandingPage = {
  path: string;
  metaTitle: string;
  metaDescription: string;
  shareTitle: string;
  shareImage: ReturnType<typeof shareImage>;
  serviceName?: string;
  eyebrow: string;
  h1: string;
  intro: string;
  priceBox?: { label: string; price: string; note: string };
  sections: LandingSection[];
  photosHeading?: string;
  photosIntro?: string;
  photos?: LandingPhoto[];
  faqs?: { q: string; a: string }[];
  related: LandingLink[];
};

const premonsoon = SEASONAL_PACKAGES.find((p) => p.name === 'Pre-Monsoon Prep');
if (!premonsoon?.price) throw new Error('Pre-Monsoon Prep package price missing in lib/moreHomeFixes.ts');
export const PRE_MONSOON = premonsoon as { name: string; items: string[]; price: string; priceNote?: string };

const UNDER_1000 = 'Every job stays under $1,000 total, labor and materials together, with no permits. Not a licensed contractor.';

export const SERVICE_LANDING_PAGES: Record<'security' | 'doors' | 'monsoon' | 'stucco', LandingPage> = {
  security: {
    path: '/security-door-repair',
    metaTitle: 'Security Door Repair & Replacement in Chandler AZ | DEP Home Repair',
    metaDescription:
      'Security door repair in Chandler, Gilbert, southwest Mesa, and south Scottsdale: closers, hinges, latches, locks, and alignment from $150, visit included. Standard-size replacement $275 install, door extra.',
    shareTitle: 'Security Door Repair & Replacement | DEP Home Repair',
    shareImage: shareImage('security-door-repair', 'Security door hung over a new entry door, installed by DEP Home Repair'),
    serviceName: 'Security door repair and replacement',
    eyebrow: 'Security doors • Flat price, visit included',
    h1: 'Security Door Repair & Replacement in Chandler and the East Valley',
    intro:
      "A security door that slams, drags, or won't latch is easy to live with until the lock stops catching. I adjust it, repair it, or swap it for a new one in one visit, at a flat price with the trip included.",
    priceBox: { label: 'Security door repair', price: DOOR_PRICES.securityRepair, note: DOOR_FLAT_PRICE_NOTE },
    sections: [
      {
        heading: 'Prices',
        prices: [
          { label: 'Repair: hinges, closer, latch, lock, or alignment', price: DOOR_PRICES.securityRepair },
          { label: 'Replacement, standard size', price: DOOR_PRICES.securityReplace },
          { label: 'Custom-size doors', price: 'Quoted separately' },
        ],
        priceNote: DOOR_FLAT_PRICE_NOTE,
      },
      {
        heading: 'What usually goes wrong',
        body: [
          'Desert sun, dust, and a door that gets opened dozens of times a day are hard on the moving parts. Most calls come down to a handful of things, and most of them are fixable without a new door.',
        ],
        bullets: [
          'The closer gives out, so the door slams or hangs open.',
          'Hinge screws loosen and the door sags until it scrapes the threshold.',
          'The latch or deadbolt no longer lines up with the strike, so it has to be lifted or shoved to lock.',
          'The lock cylinder gets stiff or the handle works loose.',
        ],
      },
      {
        heading: 'Repair or replace?',
        body: [
          'If the frame is straight and the mounting is solid, a repair is almost always the better value. If the frame is bent, rusted through at the hinges, or the door never fit the opening, a new door is cleaner.',
          "I'll tell you which one it is before any work starts, and the price is set before I pick up a tool.",
        ],
      },
      {
        heading: 'How a replacement works',
        bullets: [
          'You choose a standard-size door, or tell me what you want and I can pick it up. The door itself is extra.',
          'The old door comes off, the new one goes up square, and the closer, latch, and lock are adjusted to close soft and lock on the first try.',
          'I check that the security door lock and the entry deadbolt work together without rubbing.',
        ],
      },
      {
        heading: 'Not included',
        bullets: ['Sliding patio screens and screen doors', 'Welding or custom fabrication', 'Custom-size doors (quoted separately)'],
        body: [UNDER_1000],
      },
    ],
    photosHeading: 'A recent entry, start to finish',
    photosIntro:
      'On this private home, rot and pests had eaten the entry door jamb. The frame was rebuilt, the door rehung, and the security door went back up over it.',
    photos: [
      { src: '/gallery/entrydoor-01-rotted-jamb.jpg', caption: 'Before: rot and pests had eaten the entry door jamb down to the block wall.', width: 1559, height: 1600 },
      { src: '/gallery/entrydoor-02-new-frame.jpg', caption: 'After: new frame set square, door rehung with a new knob and deadbolt.', width: 600, height: 1600 },
      { src: '/gallery/entrydoor-03-security-door.jpg', caption: 'Finished: security door hung over the new entry door, latching clean.', width: 645, height: 1600 },
    ],
    faqs: [
      {
        q: 'Do I have to buy the new door?',
        a: 'You can buy it yourself, or tell me which one you want and I can pick it up. Either way, the door cost is separate from the $275 install.',
      },
      {
        q: 'Can you fix the entry door at the same visit?',
        a: 'Yes. Hinge, sag, and hardware fixes on the entry door have their own flat prices on the door adjustment page, and they can be done on the same trip.',
      },
      {
        q: 'My HOA has rules about security doors. Does that matter?',
        a: 'It can. Some HOAs set the style or color. Check with yours before buying a replacement door.',
      },
    ],
    related: [
      { href: '/door-adjustment-repair', label: 'Door adjustment & repair' },
      { href: '/pre-monsoon-prep', label: 'Pre-Monsoon Prep' },
      { href: '/more-home-fixes', label: 'More home fixes' },
    ],
  },

  doors: {
    path: '/door-adjustment-repair',
    metaTitle: 'Door Adjustment & Repair in Chandler AZ | Sticking, Sagging, Closet Doors | DEP',
    metaDescription:
      'Sticking, sagging, or won’t-latch doors fixed in Chandler, Gilbert, southwest Mesa, and south Scottsdale. Hinge and sag fixes $150–$195 per door, closet doors $150–$225, visit included.',
    shareTitle: 'Door Adjustment & Repair | DEP Home Repair',
    shareImage: shareImage('door-adjustment-repair', 'Interior sliding doors rolling clean on a new track, by DEP Home Repair'),
    serviceName: 'Door adjustment and repair',
    eyebrow: 'Doors • Flat price, visit included',
    h1: 'Door Adjustment & Repair in Chandler and the East Valley',
    intro:
      "Doors that stick, sag, swing open on their own, or won't latch are usually a hinge, a strike plate, or a track, not a new door. Each fix has a flat price per door with the visit included, so you know the number before I arrive.",
    priceBox: { label: 'Hinge adjustments & sag fixes', price: DOOR_PRICES.hingeSag, note: DOOR_FLAT_PRICE_NOTE },
    sections: [
      {
        heading: 'Prices',
        prices: [
          { label: 'Hinge adjustments & sag fixes', price: DOOR_PRICES.hingeSag },
          { label: 'Hardware replacement (knobs, levers, locks, hinges)', price: DOOR_PRICES.hardware },
          { label: 'Closet door adjustments (bypass or bifold)', price: DOOR_PRICES.closet },
          { label: 'Get your interior doors rolled on right', price: DOOR_PRICES.interiorSliding, note: 'Interior sliding doors on a track: rollers, guides, and track alignment.' },
          { label: 'Interior door replacement or rehanging', price: 'Quoted on request' },
        ],
        priceNote: DOOR_FLAT_PRICE_NOTE,
      },
      {
        heading: 'Signs a door needs attention',
        bullets: [
          'It rubs at the top corner or scrapes the floor.',
          'The gap along the top is wider on one side than the other.',
          'You have to lift or push it to get the latch to catch.',
          'It drifts open or closed on its own.',
          'A bifold jumps its track, or bypass closet doors drag and fall off the floor guide.',
          'An interior sliding door grinds, wobbles, or stops short.',
        ],
      },
      {
        heading: 'What the fix usually involves',
        body: [
          'Most sagging doors are pulled back into line by setting longer screws through the hinge into the framing, then fine-tuning the hinge and the strike plate so the latch catches without a shove. Closet and sliding doors get their tracks, rollers, and guides cleaned, aligned, and adjusted.',
          "If a part is worn out, like a roller or a guide, I'll show you and quote it before replacing it.",
        ],
      },
      {
        heading: 'Several doors? One visit.',
        body: [
          'Doors tend to go out of adjustment together. List every door that bugs you when you text, and they all get done on the same trip. The Fall / Holiday Ready package also covers up to two door adjustments along with lighting and smart-device setup.',
        ],
      },
      {
        heading: 'Not included',
        bullets: ['Sliding patio door rollers', 'Screen doors', 'Exterior frame or jamb rebuilds (quoted separately after a look)', 'Painting'],
        body: [UNDER_1000],
      },
    ],
    photosHeading: 'Sliding doors, rolling right',
    photos: [
      { src: '/gallery/closet-05-barn-doors-final.jpg', caption: 'After: two sliding doors on a top track, rolling clean across a rebuilt closet opening.', width: 768, height: 1024 },
      { src: '/gallery/entrydoor-02-new-frame.jpg', caption: 'After: entry door rehung square in a new frame with a new knob and deadbolt.', width: 600, height: 1600 },
    ],
    faqs: [
      {
        q: 'Is there a separate service call for door work?',
        a: 'No. Door prices are flat and include the visit.',
      },
      {
        q: 'Do you supply the hardware?',
        a: 'You can buy the knobs, levers, or hinges you like, or I can pick them up. Hardware cost is separate from the $150 per-door labor.',
      },
    ],
    related: [
      { href: '/security-door-repair', label: 'Security door repair' },
      { href: '/drywall', label: 'Drywall repair' },
      { href: '/more-home-fixes', label: 'More home fixes' },
    ],
  },

  monsoon: {
    path: '/pre-monsoon-prep',
    metaTitle: 'Pre-Monsoon Home Prep in Chandler AZ | Gutters, Weatherstrip, Stucco Cracks | DEP',
    metaDescription: `Pre-Monsoon Prep in Chandler, Gilbert, southwest Mesa, and south Scottsdale: gutter clean, weatherstripping and door sweeps, stucco hairline crack sealing, and exterior re-caulk in one visit. ${PRE_MONSOON.price} labor.`,
    shareTitle: 'Pre-Monsoon Prep, one visit | DEP Home Repair',
    shareImage: shareImage('pre-monsoon-prep', 'Pre-Monsoon home prep package from DEP Home Repair'),
    serviceName: 'Pre-Monsoon home prep',
    eyebrow: 'Seasonal package • Single-story homes',
    h1: 'Pre-Monsoon Home Prep in Chandler and the East Valley',
    intro:
      'Monsoon storms bring wind-driven dust and short, heavy rain. The small gaps around doors, windows, and stucco are where it gets in. This package closes them up in one visit, before the season starts.',
    priceBox: { label: 'Pre-Monsoon Prep package', price: PRE_MONSOON.price, note: PRE_MONSOON.priceNote ?? '' },
    sections: [
      {
        heading: "What's in the visit",
        bullets: PRE_MONSOON.items,
        body: [SEASONAL_PACKAGES_NOTE],
      },
      {
        heading: 'When to book',
        body: [
          "Arizona's monsoon season officially runs June 15 through September 30. Book in April, May, or early June, while mornings are still workable outside and before the first storm finds the weak spots.",
        ],
      },
      {
        heading: 'Why these four jobs',
        bullets: [
          'Clean gutters carry storm water away from the walls instead of spilling it at the foundation.',
          'New weatherstripping and door sweeps keep out the dust that rides in ahead of a storm.',
          'Sealed hairline stucco cracks stop water from working in behind the finish.',
          'Fresh exterior caulk around windows and doors closes the gaps that old, cracked caulk leaves.',
        ],
      },
      {
        heading: 'Not included',
        bullets: ['Roofing or roof repair', 'Two-story gutters', 'Painting', 'Irrigation', 'Larger stucco cracks or re-stuccoing'],
        body: ['Anything extra found on the visit is quoted as its own job. ' + UNDER_1000],
      },
    ],
    faqs: [
      {
        q: 'Can I add a security door or door adjustment to the same visit?',
        a: 'Yes. Door work keeps its own flat price with the visit included, and it can ride along on the same trip.',
      },
      {
        q: 'Do you do two-story homes?',
        a: 'The package is priced for single-story homes. Interior work and door fixes are fine on any home.',
      },
    ],
    related: [
      { href: '/stucco-crack-repair', label: 'Stucco crack sealing' },
      { href: '/security-door-repair', label: 'Security doors' },
      { href: '/more-home-fixes', label: 'All seasonal packages' },
    ],
  },

  stucco: {
    path: '/stucco-crack-repair',
    metaTitle: 'Stucco Hairline Crack Sealing in Chandler AZ | DEP Home Repair',
    metaDescription:
      'Hairline stucco cracks sealed in Chandler, Gilbert, southwest Mesa, and south Scottsdale. Cosmetic cracks under 1/8", cleaned out and sealed. Included in Pre-Monsoon Prep or quoted on its own.',
    shareTitle: 'Stucco Hairline Crack Sealing | DEP Home Repair',
    shareImage: shareImage('stucco-crack-repair', 'Stucco hairline crack sealing from DEP Home Repair'),
    serviceName: 'Stucco hairline crack sealing',
    eyebrow: 'Outdoor • Cosmetic cracks',
    h1: 'Stucco Hairline Crack Sealing in Chandler and the East Valley',
    intro:
      'Fine cracks in stucco are common here. The finish expands and shrinks with big swings in temperature, and thin cracks follow. Most are cosmetic, but sealing them keeps dust and storm water from working in.',
    priceBox: {
      label: 'Included in Pre-Monsoon Prep',
      price: PRE_MONSOON.price,
      note: 'Or quoted on its own. Text a photo of the cracks for a price.',
    },
    sections: [
      {
        heading: 'What I seal',
        bullets: [
          'Hairline cracks under 1/8" wide in exterior stucco',
          'Fine cracks at window and door corners',
          'Small chips and patches (quoted on site)',
        ],
      },
      {
        heading: 'How it goes',
        bullets: [
          'We walk the walls together and mark every crack you want done.',
          'Loose material is brushed out so the sealant bonds to sound stucco.',
          'Each crack is filled with a flexible exterior sealant and tooled smooth.',
          'The sealant can be painted later. Painting is not part of the job.',
        ],
      },
      {
        heading: 'When a crack is more than cosmetic',
        body: ["Some cracks are a sign of something bigger, and sealing them would only hide it. If I see any of these, I'll say so plainly and point you to a stucco or foundation specialist instead of taking the job."],
        bullets: [
          'Wider than 1/8", or one side sits higher than the other',
          'Stair-step cracks in block walls',
          'Cracks that keep growing back after they are sealed',
          'Damp, stained, or soft stucco around the crack',
          'Cracks showing up along with doors or windows that suddenly stick',
        ],
      },
      {
        heading: 'Not included',
        bullets: ['Re-stuccoing or color coats', 'Painting', 'Structural or foundation repair', 'Roof parapet repairs'],
        body: [UNDER_1000],
      },
    ],
    faqs: [
      {
        q: 'Will the sealed crack disappear?',
        a: 'It will be closed and much less noticeable, but sealant does not exactly match textured stucco. If you want it to vanish, the wall needs paint, which I do not offer.',
      },
    ],
    related: [
      { href: '/pre-monsoon-prep', label: 'Pre-Monsoon Prep' },
      { href: '/drywall', label: 'Interior drywall cracks' },
      { href: '/more-home-fixes', label: 'More home fixes' },
    ],
  },
};

export type CityKey = 'chandler' | 'gilbert' | 'southwest-mesa' | 'south-scottsdale';

export type CityPage = LandingPage & { city: string; schemaCity: string; areaNote: string; blurb: string };

const DOOR_HIGHLIGHTS: PriceLine[] = [
  { label: 'Hinge adjustments & sag fixes', price: DOOR_PRICES.hingeSag },
  { label: 'Closet door adjustments', price: DOOR_PRICES.closet },
  { label: 'Security door repair', price: DOOR_PRICES.securityRepair },
];

export const CITY_PAGES: Record<CityKey, CityPage> = {
  chandler: {
    path: '/service-area/chandler',
    city: 'Chandler',
    schemaCity: 'Chandler',
    metaTitle: 'Handyman Repairs in Chandler AZ | Drywall, Doors, Fixtures | DEP Home Repair',
    metaDescription:
      'DEP Home Repair is based in Chandler. Drywall patches with texture match, door fixes at flat prices, fixture swaps, and leak repairs from downtown Chandler to Ocotillo.',
    shareTitle: 'Home repairs in Chandler | DEP Home Repair',
    shareImage: shareImage('service-area-chandler', 'DEP Home Repair serving Chandler, AZ'),
    eyebrow: 'Service area • Home base',
    h1: 'Home Repairs in Chandler, AZ',
    blurb: 'Home base. From the older blocks around downtown to Ocotillo and the south end of town.',
    areaNote: 'All of Chandler, from downtown to Ocotillo and the south end of town.',
    intro:
      "Chandler is home base for DEP, so it's the easiest place for me to get to and the place I know best. Whether your house is one of the older ones near downtown or a newer build in Ocotillo, the fixes are the same: done right, cleaned up, and finished in one call.",
    sections: [
      {
        heading: 'Homes here',
        body: [
          'Chandler grew fast from the 1980s on, so many homes are block-and-stucco tract houses with knockdown or orange peel walls. That matters for drywall: a patch only disappears when the texture matches, and matching those textures is a big part of what I do.',
          'Newer neighborhoods in the south part of town tend to have builder-grade door hardware and closet doors that start to sag or jump their tracks after a few years of use.',
        ],
      },
      {
        heading: 'Jobs that fit Chandler homes',
        bullets: [
          'Drywall patches after a plumbing leak, with the texture matched',
          'Ceiling fan and light fixture swaps',
          'Sticking interior doors and bifold or bypass closet doors',
          'Faucet, toilet, and garbage disposal repairs',
          'Security door closers and latches worn out by the sun',
        ],
      },
      { heading: 'Flat door prices, visit included', prices: DOOR_HIGHLIGHTS, priceNote: DOOR_FLAT_PRICE_NOTE },
      {
        heading: 'Good to know',
        body: [
          "Many Chandler neighborhoods have an HOA. Interior repairs don't need approval, but if you're replacing a security door, check whether your HOA sets the style or color before you buy one.",
        ],
      },
    ],
    related: [
      { href: '/drywall', label: 'Drywall repair' },
      { href: '/door-adjustment-repair', label: 'Door adjustment' },
      { href: '/electrical', label: 'Fixtures & outlets' },
    ],
  },

  gilbert: {
    path: '/service-area/gilbert',
    city: 'Gilbert',
    schemaCity: 'Gilbert',
    metaTitle: 'Handyman Repairs in Gilbert AZ | Doors, Drywall, Smart Home | DEP Home Repair',
    metaDescription:
      'Home repairs in Gilbert from DEP Home Repair, next door in Chandler. Door and closet door fixes at flat prices, drywall texture match, smart thermostats and doorbells, and Pre-Monsoon Prep.',
    shareTitle: 'Home repairs in Gilbert | DEP Home Repair',
    shareImage: shareImage('service-area-gilbert', 'DEP Home Repair serving Gilbert, AZ'),
    eyebrow: 'Service area • Next door to Chandler',
    h1: 'Home Repairs in Gilbert, AZ',
    blurb: 'Next door to Chandler. The Heritage District, Val Vista Lakes, Agritopia, Power Ranch, and Morrison Ranch.',
    areaNote: 'All of Gilbert, from the Heritage District out to Power Ranch and Morrison Ranch.',
    intro:
      'Gilbert sits right next to my Chandler base, so getting to you is easy. A lot of Gilbert homes are newer, and newer homes have their own list: builder-grade parts that wear out early, closet doors that drift off track, and walls that need a clean patch after a TV or shelf comes down.',
    sections: [
      {
        heading: 'Homes here',
        body: [
          'Much of Gilbert was built from the 1990s on, in master-planned neighborhoods like Val Vista Lakes, Agritopia, Power Ranch, and Morrison Ranch. Two-story homes are common, and so are big open walls where a sloppy patch shows from across the room.',
        ],
      },
      {
        heading: 'Jobs that fit Gilbert homes',
        bullets: [
          'Bypass and bifold closet doors that drag or come off the floor guide',
          'The door from the garage that no longer latches on its own',
          'Patching anchor holes and wall damage after moving TVs, shelves, or mirrors',
          'Smart thermostat, video doorbell, and USB outlet installs',
          'Replacing worn builder-grade knobs, levers, and hinges',
        ],
      },
      { heading: 'Flat door prices, visit included', prices: DOOR_HIGHLIGHTS, priceNote: DOOR_FLAT_PRICE_NOTE },
      {
        heading: 'Good to know',
        body: [
          'The seasonal packages, including Pre-Monsoon Prep, are priced for single-story homes because they include gutter work. On a two-story home, interior repairs and door fixes are no problem; just mention the house is two stories when you text.',
        ],
      },
    ],
    related: [
      { href: '/door-adjustment-repair', label: 'Door adjustment' },
      { href: '/electrical', label: 'Smart home & fixtures' },
      { href: '/drywall', label: 'Drywall patches' },
    ],
  },

  'southwest-mesa': {
    path: '/service-area/southwest-mesa',
    city: 'Southwest Mesa',
    schemaCity: 'Mesa',
    metaTitle: 'Handyman Repairs in Southwest Mesa AZ | Dobson Ranch, 85202, 85210 | DEP',
    metaDescription:
      'Home repairs in southwest Mesa, including Dobson Ranch (85202 and 85210): sagging doors, worn hardware, drywall texture match, and security door repair. Flat door prices, visit included.',
    shareTitle: 'Home repairs in southwest Mesa | DEP Home Repair',
    shareImage: shareImage('service-area-southwest-mesa', 'DEP Home Repair serving southwest Mesa, AZ'),
    eyebrow: 'Service area • Dobson Ranch & nearby',
    h1: 'Home Repairs in Southwest Mesa',
    blurb: 'Dobson Ranch and the neighborhoods around it, roughly the 85202 and 85210 ZIP codes.',
    areaNote:
      'Southwest Mesa has no official boundary. I mean roughly the 85202 and 85210 ZIP codes, including Dobson Ranch. If you are close to that, text your cross streets and ask.',
    intro:
      "Southwest Mesa is the corner of Mesa closest to Chandler and Tempe, and the part of Mesa I cover. Many homes here are older than in the rest of my area, which means original doors, hinges, and walls that have had forty-some years to settle. That's the kind of work I like: fix what's there instead of replacing it.",
    sections: [
      {
        heading: 'Homes here',
        body: [
          'A lot of southwest Mesa, including much of Dobson Ranch, was built in the late 1970s and early 1980s. Doors that have hung on the same hinges since then sag, latches stop lining up, and older wall textures need a careful hand to match.',
        ],
      },
      {
        heading: 'Jobs that fit southwest Mesa homes',
        bullets: [
          'Sagging or sticking original doors brought back into line',
          'Swapping worn-out knobs, locks, and hinges',
          'Drywall patches matched to older, heavier textures',
          'Security door repairs and standard-size replacements',
          'Faucet, toilet, and under-sink leak repairs',
        ],
      },
      { heading: 'Flat door prices, visit included', prices: DOOR_HIGHLIGHTS, priceNote: DOOR_FLAT_PRICE_NOTE },
      {
        heading: 'Good to know',
        body: [
          "In older homes, the shutoff valves under sinks and toilets are often stiff or seized. If one won't close, I'll tell you before forcing it, because a snapped valve turns a small repair into a bigger one.",
        ],
      },
    ],
    related: [
      { href: '/door-adjustment-repair', label: 'Door adjustment' },
      { href: '/security-door-repair', label: 'Security doors' },
      { href: '/drywall', label: 'Drywall repair' },
    ],
  },

  'south-scottsdale': {
    path: '/service-area/south-scottsdale',
    city: 'South Scottsdale',
    schemaCity: 'Scottsdale',
    metaTitle: 'Handyman Repairs in South Scottsdale AZ | Doors, Drywall, Fixtures | DEP',
    metaDescription:
      'Home repairs in south Scottsdale from DEP Home Repair: door and hardware fixes on older homes, drywall texture match after remodels, fixture swaps, and leak repairs. Flat door prices, visit included.',
    shareTitle: 'Home repairs in south Scottsdale | DEP Home Repair',
    shareImage: shareImage('service-area-south-scottsdale', 'DEP Home Repair serving south Scottsdale, AZ'),
    eyebrow: 'Service area • Older neighborhoods',
    h1: 'Home Repairs in South Scottsdale',
    blurb: 'The older neighborhoods south of Indian Bend Road, around Old Town and Papago Park.',
    areaNote: 'South Scottsdale, roughly south of Indian Bend Road. North Scottsdale is outside my area.',
    intro:
      "South Scottsdale has some of the oldest houses I work on: 1950s and '60s ranch homes, many of them remodeled more than once. Each remodel leaves its own mix of doors, hardware, and wall textures, and that's where a careful repair makes the difference.",
    sections: [
      {
        heading: 'Homes here',
        body: [
          'Many homes around Old Town and Papago Park are mid-century block ranches. After decades of updates, it is common to find several door styles in one hallway and smooth new drywall meeting older textured walls. Repairs here are about blending the old and the new so the patch does not stand out.',
        ],
      },
      {
        heading: 'Jobs that fit south Scottsdale homes',
        bullets: [
          'Older interior doors that stick or will not latch',
          'Matching mismatched knobs and hinges through the house',
          'Drywall patches that blend between old and new textures',
          'Light fixture and ceiling fan swaps on existing wiring',
          'Faucet and toilet repairs',
        ],
      },
      { heading: 'Flat door prices, visit included', prices: DOOR_HIGHLIGHTS, priceNote: DOOR_FLAT_PRICE_NOTE },
      {
        heading: 'Good to know',
        body: [
          'South Scottsdale is the longest drive from my Chandler base, so list everything you want done when you text. I will plan one visit around the whole list instead of coming back for each item.',
        ],
      },
    ],
    related: [
      { href: '/drywall', label: 'Drywall texture match' },
      { href: '/door-adjustment-repair', label: 'Door adjustment' },
      { href: '/electrical', label: 'Fixtures & fans' },
    ],
  },
};

export const CITY_ORDER: CityKey[] = ['chandler', 'gilbert', 'southwest-mesa', 'south-scottsdale'];
