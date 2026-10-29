export const MORE_HOME_FIXES_INTRO =
  "Beyond drywall, electrical and plumbing, I take on everyday fixes around the house. Ask, and if it's a fit, I'll quote it.";

/** A job line. Priced lines show a flat range; unpriced lines are quote-only. */
export type HomeFixJob = string | { label: string; price: string };

export const MORE_HOME_FIXES: { group: string; jobs: HomeFixJob[] }[] = [
  {
    group: 'Doors & hardware',
    jobs: [
      'Interior door replacement, adjustment, rehanging & repair',
      { label: 'Hinge adjustments & sag fixes', price: '$95–$150 per door' },
      { label: 'Hardware replacement (knobs, levers, locks, hinges)', price: '$75–$125 per door, hardware extra' },
      { label: 'Closet door adjustments (bypass or bifold)', price: '$95–$175 per opening' },
      { label: 'Get your interior doors rolled on right', price: '$125–$225 per door' },
      'Weatherstripping & door sweeps',
    ],
  },
  {
    group: 'Security doors',
    jobs: [
      { label: 'Security door repair (hinges, closer, latch, lock, alignment)', price: '$150–$300' },
      { label: 'Security door replacement, standard size', price: '$275 install, door extra' },
      'Custom-size doors quoted separately',
    ],
  },
  {
    group: 'Mounting',
    jobs: ['Shelves & mirrors', 'Curtain rods'],
  },
  {
    group: 'Outdoor',
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

export const SEASONAL_PACKAGES: { name: string; items: string[]; price?: string; priceNote?: string }[] = [
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
