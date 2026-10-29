export const MORE_HOME_FIXES_INTRO =
  "Beyond drywall, electrical and plumbing, I take on everyday fixes around the house. Ask, and if it's a fit, I'll quote it.";

/** A job line. Priced lines show a flat range; unpriced lines are quote-only. */
export type HomeFixJob = string | { label: string; price: string };

/** Shown under door groups: flat prices include the trip, so no separate service call. */
export const DOOR_FLAT_PRICE_NOTE = 'Flat price, visit included. No separate service call.';

/** Flat door prices (visit included). Single source for the menu and the door / security-door pages. */
export const DOOR_PRICES = {
  hingeSag: '$150–$195 per door',
  hardware: '$150 per door, hardware extra',
  closet: '$150–$225 per opening',
  interiorSliding: '$175–$225 per door',
  securityRepair: '$150–$300',
  securityReplace: '$275 install, door extra',
} as const;

export const MORE_HOME_FIXES: { group: string; note?: string; jobs: HomeFixJob[]; link?: { href: string; label: string } }[] = [
  {
    group: 'Doors & hardware',
    note: DOOR_FLAT_PRICE_NOTE,
    link: { href: '/door-adjustment-repair', label: 'Door adjustment & repair details' },
    jobs: [
      'Interior door replacement, adjustment, rehanging & repair',
      { label: 'Hinge adjustments & sag fixes', price: DOOR_PRICES.hingeSag },
      { label: 'Hardware replacement (knobs, levers, locks, hinges)', price: DOOR_PRICES.hardware },
      { label: 'Closet door adjustments (bypass or bifold)', price: DOOR_PRICES.closet },
      { label: 'Get your interior doors rolled on right', price: DOOR_PRICES.interiorSliding },
      'Weatherstripping & door sweeps',
    ],
  },
  {
    group: 'Security doors',
    note: DOOR_FLAT_PRICE_NOTE,
    link: { href: '/security-door-repair', label: 'Security door details' },
    jobs: [
      { label: 'Security door repair (hinges, closer, latch, lock, alignment)', price: DOOR_PRICES.securityRepair },
      { label: 'Security door replacement, standard size', price: DOOR_PRICES.securityReplace },
      'Custom-size doors quoted separately',
    ],
  },
  {
    group: 'Mounting',
    jobs: ['Shelves & mirrors', 'Curtain rods'],
  },
  {
    group: 'Outdoor',
    link: { href: '/stucco-crack-repair', label: 'Stucco crack sealing details' },
    jobs: [
      'Small stucco patches',
      'Gate & small fence repair',
      'Outdoor & motion light swaps',
      'Plug-in patio lighting',
    ],
  },
  {
    group: 'Appliances & tech',
    jobs: [
      'Appliance hookups (existing connections)',
      'Over-the-range microwave install',
      'Range hood swap (flat rate, existing power & duct; new power or venting quoted separately)',
      'Washer hose replacement & dryer vent cleaning',
      'Wi-Fi & smart-device setup',
    ],
  },
];

export const NOT_OFFERED = 'Painting (beyond drywall patch touch-up), irrigation, carpet installation';

export const SEASONAL_PACKAGES: { name: string; items: string[]; price?: string; priceNote?: string; href?: string }[] = [
  {
    name: 'Spring Curb Appeal',
    items: [
      'Driveway & front walk wash (no high pressure on stucco)',
      'Gutter clean (single-story)',
      'Outdoor light check: bulbs & photocells tested, bulbs you supply swapped',
      'Gate / fence tune-up (one gate: adjust, re-shim, latch)',
    ],
    price: '$499',
    priceNote: 'Labor only; parts extra.',
  },
  {
    name: 'Pre-Monsoon Prep',
    href: '/pre-monsoon-prep',
    items: [
      'Gutter clean (single-story)',
      'Weatherstripping & door sweeps (up to 2 exterior doors)',
      'Stucco hairline crack sealing (cosmetic cracks under 1/8")',
      'Exterior caulk check & re-caulk (up to 4 windows or doors)',
    ],
    price: '$679',
    priceNote: 'Labor only; caulk, sealant and weatherstrip extra.',
  },
  {
    name: 'Fall / Holiday Ready',
    items: [
      'Plug-in under-cabinet or patio lighting (one run)',
      'Door adjustments (up to 2 doors)',
      'Smart-device setup (up to 2 devices)',
      'Dryer vent cleaning (vent only; gas lines not touched)',
    ],
    price: '$529',
    priceNote: 'Labor only; parts and lights extra. Longer lighting runs quoted on site.',
  },
];

export const SEASONAL_PACKAGES_NOTE =
  'One visit, one price, single-story homes. Anything extra found on the visit is quoted as its own job.';
