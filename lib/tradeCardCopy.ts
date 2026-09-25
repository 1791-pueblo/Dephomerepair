export const SERVICE_MENU_TITLE = 'DEP Service Menu';

export const TRADE_CARDS = [
  {
    key: 'drywall' as const,
    title: 'Drywall',
    letter: 'D',
    items: [
      { title: 'Patching', detail: 'Seamless repair for holes, cracks, and water damage.' },
      { title: 'Matching', detail: 'Expert matching for Santa Fe skip trowel, orange peel, knockdown, or smooth finishes.' },
      { title: 'Corner Bead & Trim Repair', detail: 'Fixing those high-traffic dings and dents.' },
      { title: 'Full Surface Refresh', detail: 'Skim coating and smoothing for a modern look.' },
    ],
  },
  {
    key: 'electrical' as const,
    title: 'Electrical',
    letter: 'E',
    items: [
      { title: 'Modern Fixture Install', detail: 'Ceiling fans, chandeliers, and recessed lighting.' },
      { title: 'Smart Home Upgrades', detail: 'Ring/Nest doorbells, smart thermostats, and USB outlets.' },
      { title: 'Device Refresh', detail: 'Swapping outdated almond switches for clean, modern white.' },
      { title: 'Safety Upgrades', detail: 'GFCI installation and smoke/CO detector testing.' },
    ],
  },
  {
    key: 'plumbing' as const,
    title: 'Plumbing',
    letter: 'P',
    items: [
      { title: 'Kitchen & Bath Updates', detail: 'Faucet, showerhead, and vanity hardware installs.' },
      { title: 'Toilet Repair & Install', detail: 'Rebuilding tanks or installing new, high-efficiency models.' },
      { title: 'Appliance Hookups', detail: 'Dishwashers, ice makers, and garbage disposals.' },
      { title: 'Drain & Leak Care', detail: 'Addressing under-sink drips and slow-moving drains.' },
    ],
  },
] as const;
