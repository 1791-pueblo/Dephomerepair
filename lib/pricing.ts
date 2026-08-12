/**
 * DEP Home Repair — master pricing (labor)
 * Locked Aug 2026. Single source of truth for Instant Quote + service menu.
 * Texture is included in drywall repair prices.
 * Service call waived when any repair/install is booked same visit.
 * Bundles apply to labor only.
 */

export const SERVICE_CALL = 95;

/** Default markup when DEP supplies the device (smart home, etc.) */
export const DEVICE_MARKUP = 0.25;

export type PriceKind = 'flat' | 'volume' | 'range';

export interface FlatPrice {
  id: string;
  name: string;
  kind: 'flat';
  price: number;
  category: 'drywall' | 'electrical' | 'plumbing' | 'other';
  subcategory: string;
  notes?: string;
  /** Typical device cost to DEP (before markup). When set, UI can offer supply option. */
  deviceCost?: number;
}

export interface VolumePrice {
  id: string;
  name: string;
  kind: 'volume';
  first: number;
  additional: number;
  category: 'drywall' | 'electrical' | 'plumbing' | 'other';
  subcategory: string;
  notes?: string;
  deviceCost?: number;
}

export interface RangePrice {
  id: string;
  name: string;
  kind: 'range';
  low: number;
  high: number;
  /** Midpoint used for Instant Quote estimates */
  estimate: number;
  category: 'drywall' | 'electrical' | 'plumbing' | 'other';
  subcategory: string;
  notes?: string;
  deviceCost?: number;
}

export type ServicePrice = FlatPrice | VolumePrice | RangePrice;

export function deviceSellPrice(deviceCost: number): number {
  return Math.round(deviceCost * (1 + DEVICE_MARKUP));
}

export const electrical: ServicePrice[] = [
  // Troubleshooting
  { id: 'e-dead-outlet', name: 'Dead outlet diagnosis', kind: 'flat', price: 190, category: 'electrical', subcategory: 'Troubleshooting' },
  { id: 'e-breaker', name: 'Tripped breaker troubleshooting', kind: 'flat', price: 225, category: 'electrical', subcategory: 'Troubleshooting' },
  { id: 'e-nonworking-light', name: 'Non-working light diagnosis', kind: 'flat', price: 200, category: 'electrical', subcategory: 'Troubleshooting' },
  { id: 'e-flickering', name: 'Flickering light troubleshooting', kind: 'flat', price: 240, category: 'electrical', subcategory: 'Troubleshooting' },
  { id: 'e-gfci-diag', name: 'GFCI reset / failure diagnosis', kind: 'flat', price: 190, category: 'electrical', subcategory: 'Troubleshooting' },
  { id: 'e-switch-circuit', name: 'Switch circuit troubleshooting', kind: 'flat', price: 215, category: 'electrical', subcategory: 'Troubleshooting' },
  { id: 'e-intermittent', name: 'Loose connection / intermittent power', kind: 'flat', price: 275, category: 'electrical', subcategory: 'Troubleshooting' },

  // Basic swaps (volume)
  { id: 'e-outlet', name: 'Standard outlet', kind: 'volume', first: 150, additional: 70, category: 'electrical', subcategory: 'Outlets & Switches' },
  { id: 'e-switch', name: 'Standard switch', kind: 'volume', first: 150, additional: 70, category: 'electrical', subcategory: 'Outlets & Switches' },
  { id: 'e-gfci', name: 'GFCI outlet', kind: 'volume', first: 150, additional: 80, category: 'electrical', subcategory: 'Outlets & Switches' },
  { id: 'e-dimmer', name: 'Dimmer switch', kind: 'volume', first: 175, additional: 90, category: 'electrical', subcategory: 'Outlets & Switches' },
  { id: 'e-usb-outlet', name: 'USB / USB-C outlet', kind: 'volume', first: 150, additional: 80, category: 'electrical', subcategory: 'Outlets & Switches', deviceCost: 25 },
  { id: 'e-smoke-co', name: 'Smoke / CO detector', kind: 'flat', price: 150, category: 'electrical', subcategory: 'Outlets & Switches', deviceCost: 40 },

  // Fixtures & lighting
  { id: 'e-fan', name: 'Ceiling fan (existing fan-rated box)', kind: 'flat', price: 200, category: 'electrical', subcategory: 'Fixtures & Lighting' },
  { id: 'e-fan-box', name: 'Ceiling fan + box upgrade', kind: 'flat', price: 275, category: 'electrical', subcategory: 'Fixtures & Lighting' },
  { id: 'e-fixture', name: 'Light fixture replacement', kind: 'flat', price: 175, category: 'electrical', subcategory: 'Fixtures & Lighting' },
  { id: 'e-recessed-replace', name: 'Recessed LED replace (existing)', kind: 'volume', first: 150, additional: 95, category: 'electrical', subcategory: 'Fixtures & Lighting' },
  { id: 'e-recessed-attic', name: 'Recessed LED new (attic access)', kind: 'volume', first: 175, additional: 110, category: 'electrical', subcategory: 'Fixtures & Lighting' },
  { id: 'e-recessed-fish', name: 'Recessed LED new (no attic / fish)', kind: 'volume', first: 250, additional: 150, category: 'electrical', subcategory: 'Fixtures & Lighting' },
  { id: 'e-undercabinet', name: 'Under-cabinet lighting', kind: 'flat', price: 225, category: 'electrical', subcategory: 'Fixtures & Lighting', notes: 'Base; scale by run length' },

  // Smart home
  { id: 'e-thermostat', name: 'Smart thermostat (existing C-wire)', kind: 'flat', price: 175, category: 'electrical', subcategory: 'Smart Home', deviceCost: 230 },
  { id: 'e-thermostat-c', name: 'Smart thermostat + C-wire / PEK', kind: 'flat', price: 225, category: 'electrical', subcategory: 'Smart Home', deviceCost: 230 },
  { id: 'e-doorbell', name: 'Video doorbell (existing wiring)', kind: 'flat', price: 150, category: 'electrical', subcategory: 'Smart Home', deviceCost: 100 },
  { id: 'e-doorbell-new', name: 'Video doorbell (new wire / transformer)', kind: 'flat', price: 275, category: 'electrical', subcategory: 'Smart Home', deviceCost: 100 },
  { id: 'e-smart-switch', name: 'Smart switch', kind: 'volume', first: 175, additional: 90, category: 'electrical', subcategory: 'Smart Home', deviceCost: 35 },
  { id: 'e-smart-dimmer', name: 'Smart dimmer', kind: 'volume', first: 185, additional: 95, category: 'electrical', subcategory: 'Smart Home', deviceCost: 40 },
  { id: 'e-smart-plug', name: 'Smart plug / module setup', kind: 'volume', first: 75, additional: 40, category: 'electrical', subcategory: 'Smart Home', deviceCost: 20 },

  // TV
  { id: 'e-tv-std', name: 'TV mount (standard, up to ~65–70")', kind: 'flat', price: 175, category: 'electrical', subcategory: 'TV Mounting' },
  { id: 'e-tv-large', name: 'TV mount (large / full-motion)', kind: 'flat', price: 225, category: 'electrical', subcategory: 'TV Mounting' },
  { id: 'e-tv-conceal', name: 'In-wall cable concealment', kind: 'flat', price: 95, category: 'electrical', subcategory: 'TV Mounting' },
  { id: 'e-tv-masonry', name: 'Masonry / brick wall add-on', kind: 'flat', price: 95, category: 'electrical', subcategory: 'TV Mounting' },
];

export const plumbing: ServicePrice[] = [
  { id: 'p-faucet', name: 'Faucet replacement', kind: 'flat', price: 215, category: 'plumbing', subcategory: 'Fixtures' },
  { id: 'p-toilet-replace', name: 'Toilet replacement', kind: 'flat', price: 290, category: 'plumbing', subcategory: 'Fixtures' },
  { id: 'p-toilet-repair', name: 'Toilet repair (fill valve / flapper / handle)', kind: 'flat', price: 150, category: 'plumbing', subcategory: 'Fixtures' },
  { id: 'p-sink-drain', name: 'Sink drain / P-trap repair', kind: 'flat', price: 150, category: 'plumbing', subcategory: 'Drains & Leaks' },
  { id: 'p-disposal', name: 'Garbage disposal replacement', kind: 'flat', price: 175, category: 'plumbing', subcategory: 'Appliances' },
  { id: 'p-shower-head', name: 'Shower head replacement', kind: 'flat', price: 95, category: 'plumbing', subcategory: 'Fixtures' },
  { id: 'p-shutoff', name: 'Shutoff valve replacement', kind: 'flat', price: 150, category: 'plumbing', subcategory: 'Valves & Lines' },
  { id: 'p-under-sink-leak', name: 'Minor under-sink leak repair', kind: 'flat', price: 215, category: 'plumbing', subcategory: 'Drains & Leaks' },
  { id: 'p-snake-branch', name: 'Drain snaking (branch / clog)', kind: 'flat', price: 150, category: 'plumbing', subcategory: 'Drains & Leaks' },
  { id: 'p-snake-main', name: 'Main line drain', kind: 'flat', price: 250, category: 'plumbing', subcategory: 'Drains & Leaks' },
  { id: 'p-dishwasher', name: 'Dishwasher hookup', kind: 'flat', price: 175, category: 'plumbing', subcategory: 'Appliances' },
  { id: 'p-fridge-water', name: 'Ice maker / fridge water line', kind: 'flat', price: 175, category: 'plumbing', subcategory: 'Appliances' },
  { id: 'p-fridge-water-long', name: 'Fridge water line (longer / new valve)', kind: 'flat', price: 225, category: 'plumbing', subcategory: 'Appliances' },
];

export const drywall: ServicePrice[] = [
  { id: 'd-nail-pop', name: 'Nail / screw pop', kind: 'flat', price: 175, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included' },
  { id: 'd-small-hole', name: 'Small hole / hand-size / anchor', kind: 'flat', price: 200, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included' },
  { id: 'd-dent', name: 'Dent / minor impact', kind: 'flat', price: 200, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included' },
  { id: 'd-crack', name: 'Stress / settling crack', kind: 'flat', price: 225, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included' },
  { id: 'd-corner', name: 'Corner bead (standard)', kind: 'flat', price: 250, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included' },
  { id: 'd-medium-hole', name: 'Medium hole (door-knob / fist)', kind: 'flat', price: 275, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included' },
  { id: 'd-cutout', name: 'Electrical / plumbing cut-out patch', kind: 'flat', price: 275, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included' },
  { id: 'd-large-hole', name: 'Large hole / door impact', kind: 'range', low: 300, high: 450, estimate: 375, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included; size-dependent' },
  { id: 'd-water-stain', name: 'Water-stained ceiling patch', kind: 'range', low: 350, high: 650, estimate: 500, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included' },
  { id: 'd-seam', name: 'Seam / tape separation', kind: 'range', low: 250, high: 450, estimate: 350, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included' },
  { id: 'd-water-cutout', name: 'Water-damage cut-out + patch', kind: 'range', low: 400, high: 900, estimate: 650, category: 'drywall', subcategory: 'Repairs', notes: 'Texture included' },
  { id: 'd-water-remediation', name: 'Full water remediation', kind: 'range', low: 650, high: 3000, estimate: 1200, category: 'drywall', subcategory: 'Repairs', notes: 'Call for scope; starts at $650' },
];

export const allServices: ServicePrice[] = [...electrical, ...plumbing, ...drywall];

export function volumeTotal(first: number, additional: number, qty: number): number {
  if (qty <= 0) return 0;
  if (qty === 1) return first;
  return first + additional * (qty - 1);
}

export function lineTotal(service: ServicePrice, qty = 1): number {
  if (service.kind === 'flat') return service.price * Math.max(1, qty);
  if (service.kind === 'volume') return volumeTotal(service.first, service.additional, qty);
  return service.estimate;
}

export function serviceCallAmount(hasBookedWork: boolean): number {
  return hasBookedWork ? 0 : SERVICE_CALL;
}

export function applyBundleDiscount(
  laborSubtotal: number,
  categoriesPresent: Set<'drywall' | 'electrical' | 'plumbing'>
): { total: number; label: string | null; discount: number } {
  const n = categoriesPresent.size;
  if (n >= 3) {
    const discount = Math.round(laborSubtotal * 0.15);
    return { total: laborSubtotal - discount, label: 'Triple Play — 15% off labor', discount };
  }
  if (n === 2) {
    const discount = Math.round(laborSubtotal * 0.1);
    return { total: laborSubtotal - discount, label: 'Power Pair — 10% off labor', discount };
  }
  return { total: laborSubtotal, label: null, discount: 0 };
}
