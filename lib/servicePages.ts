import { portfolioProjects } from './portfolio';

export type ServiceKey = 'drywall' | 'electrical' | 'plumbing';

export const SERVICE_PAGES: Record<
  ServiceKey,
  {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
    letter: string;
    letterColor: string;
    startingPrice: string;
    startingLabel: string;
    intro: string;
    items: { title: string; detail: string }[];
    projectIds: string[];
  }
> = {
  drywall: {
    slug: 'drywall',
    title: 'Drywall',
    metaTitle: 'Drywall Repair in Chandler AZ | Texture Match & Patch | DEP',
    metaDescription:
      'Drywall repair in Chandler, Gilbert, and Mesa. Patching, texture match, corner bead, and full surface refresh. Texture included. Instant quote from DEP Home Repair.',
    h1: 'Drywall Repair in Chandler',
    letter: 'D',
    letterColor: '#0056B3',
    startingPrice: '$200',
    startingLabel: 'Typical starting price — small hole / hand-size / anchor',
    intro:
      'Drywall repair in Chandler and the East Valley should disappear into the room. DEP matches the texture already on your walls — Santa Fe skip trowel, orange peel, knockdown, or smooth — and includes texture on the repair.',
    items: [
      { title: 'Patching', detail: 'Seamless repair for holes, cracks, and water damage.' },
      { title: 'Matching', detail: 'Expert matching for Santa Fe skip trowel, orange peel, knockdown, or smooth finishes.' },
      { title: 'Corner Bead & Trim Repair', detail: 'Fixing those high-traffic dings and dents.' },
      { title: 'Full Surface Refresh', detail: 'Skim coating and smoothing for a modern look.' },
    ],
    projectIds: ['tub-wall-corner-close-in', 'closet-conversion-barn-doors', 'drywall-remediation'],
  },
  electrical: {
    slug: 'electrical',
    title: 'Electrical',
    metaTitle: 'Electrical Repair in Chandler AZ | Outlets, Lighting, Smart Home | DEP',
    metaDescription:
      'Electrical repair in Chandler, Gilbert, and Mesa. Fixture installs, smart-home upgrades, device refresh, and safety work. Instant quote from DEP Home Repair.',
    h1: 'Electrical Repair in Chandler',
    letter: 'E',
    letterColor: '#FFAB00',
    startingPrice: '$150',
    startingLabel: 'Typical starting price — standard outlet',
    intro:
      'Electrical work in Chandler homes should be safe, clean, and current. DEP handles fixture installs, smart-home devices, switch and outlet refresh, and GFCI or detector upgrades — and can close the wall in the same visit when drywall is part of the job.',
    items: [
      { title: 'Modern Fixture Install', detail: 'Ceiling fans, chandeliers, and recessed lighting.' },
      { title: 'Smart Home Upgrades', detail: 'Ring/Nest doorbells, smart thermostats, and USB outlets.' },
      { title: 'Device Refresh', detail: 'Swapping outdated almond switches for clean, modern white.' },
      { title: 'Safety Upgrades', detail: 'GFCI installation and smoke/CO detector testing.' },
    ],
    projectIds: ['rangehood-protected-power', 'under-cabinet-led-lighting', 'kitchen-lighting-rewire-outlet'],
  },
  plumbing: {
    slug: 'plumbing',
    title: 'Plumbing',
    metaTitle: 'Plumbing Repair in Chandler AZ | Toilets, Faucets, Leaks | DEP',
    metaDescription:
      'Plumbing repair in Chandler, Gilbert, and Mesa. Kitchen and bath updates, toilets, appliance hookups, and leak care. Instant quote from DEP Home Repair.',
    h1: 'Plumbing Repair in Chandler',
    letter: 'P',
    letterColor: '#424242',
    startingPrice: '$95',
    startingLabel: 'Typical starting price — shower head replacement',
    intro:
      'Plumbing repairs in Chandler should stop the leak and leave the finish clean. DEP handles fixtures, toilets, appliance hookups, and drain or leak work — and can patch the wall when access is part of the repair.',
    items: [
      { title: 'Kitchen & Bath Updates', detail: 'Faucet, showerhead, and vanity hardware installs.' },
      { title: 'Toilet Repair & Install', detail: 'Rebuilding tanks or installing new, high-efficiency models.' },
      { title: 'Appliance Hookups', detail: 'Dishwashers, ice makers, and garbage disposals.' },
      { title: 'Drain & Leak Care', detail: 'Addressing under-sink drips and slow-moving drains.' },
    ],
    projectIds: ['hose-bib-leak-repair', 'bathroom-pony-wall-vanity'],
  },
};

export function projectsForService(key: ServiceKey) {
  const ids = SERVICE_PAGES[key].projectIds;
  return ids
    .map((id) => portfolioProjects.find((project) => project.id === id))
    .filter(Boolean);
}
