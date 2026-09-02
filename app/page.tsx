
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  allServices,
  applyBundleDiscount,
  deviceSellPrice,
  drywall,
  electrical,
  lineTotal,
  plumbing,
  SERVICE_CALL,
  serviceCallAmount,
  type ServicePrice,
} from '../lib/pricing';

type CartItem = { id: string; qty: number; supplyDevice: boolean };

const CATEGORY_META = [
  { 
    key: 'drywall' as const, 
    label: 'D — Drywall', 
    short: 'Drywall',
    letter: 'D',
    letterColor: '#005683', // Atlantic blue
    cardBg: 'bg-[#E8F1F6]',
    borderClass: 'border-[#005683]/20 hover:border-[#005683]/50',
  },
  { 
    key: 'electrical' as const, 
    label: 'E — Electrical', 
    short: 'Electrical',
    letter: 'E',
    letterColor: '#FFAB00', // Brand amber
    cardBg: 'bg-[#FFF8E7]',
    borderClass: 'border-[#FFAB00]/25 hover:border-[#FFAB00]/60',
  },
  { 
    key: 'plumbing' as const, 
    label: 'P — Plumbing', 
    short: 'Plumbing',
    letter: 'P',
    letterColor: '#0077B6', // Plumbing blue
    cardBg: 'bg-[#E6F4FA]',
    borderClass: 'border-[#0077B6]/20 hover:border-[#0077B6]/50',
  },
];

function groupBySubcategory(list: ServicePrice[]) {
  const map = new Map<string, ServicePrice[]>();
  list.forEach((s) => {
    const arr = map.get(s.subcategory) || [];
    arr.push(s);
    map.set(s.subcategory, arr);
  });
  return Array.from(map.entries());
}

function servicesForCategory(key: 'drywall' | 'electrical' | 'plumbing') {
  if (key === 'drywall') return drywall;
  if (key === 'electrical') return electrical;
  return plumbing;
}

function itemLabor(svc: ServicePrice, qty: number) {
  return lineTotal(svc, qty);
}

function itemDevice(svc: ServicePrice, qty: number, supply: boolean) {
  if (!supply || !svc.deviceCost) return 0;
  return deviceSellPrice(svc.deviceCost) * Math.max(1, qty);
}

export default function Home() {
  const [description, setDescription] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<
    'drywall' | 'electrical' | 'plumbing'
  >('electrical');
  const [showQuote, setShowQuote] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(
    null
  );
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const lightboxCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusedRef = useRef<HTMLElement | null>(null);

  const cartMap = useMemo(() => {
    const m = new Map<string, CartItem>();
    cart.forEach((c) => m.set(c.id, c));
    return m;
  }, [cart]);

  const liveQuote = useMemo(() => {
    const breakdown: string[] = [];
    const categories = new Set<'drywall' | 'electrical' | 'plumbing'>();
    let labor = 0;
    let devices = 0;

    cart.forEach(({ id, qty, supplyDevice }) => {
      const svc = allServices.find((s) => s.id === id);
      if (!svc) return;
      if (
        svc.category === 'drywall' ||
        svc.category === 'electrical' ||
        svc.category === 'plumbing'
      ) {
        categories.add(svc.category);
      }
      const laborLine = itemLabor(svc, qty);
      const deviceLine = itemDevice(svc, qty, supplyDevice);
      labor += laborLine;
      devices += deviceLine;

      if (svc.kind === 'volume' && qty > 1) {
        breakdown.push(
          `${svc.name} × ${qty}: $${laborLine} (1st $${svc.first} + ${qty - 1} × $${svc.additional})`
        );
      } else if (svc.kind === 'range') {
        breakdown.push(`${svc.name}: ~$${laborLine} (est. $${svc.low}–$${svc.high})`);
      } else {
        breakdown.push(`${svc.name}${qty > 1 ? ` × ${qty}` : ''}: $${laborLine}`);
      }
      if (deviceLine > 0) {
        breakdown.push(
          `  + Device (DEP supply, ~25% markup): $${deviceLine}`
        );
      }
    });

    const hasWork = cart.length > 0;
    const call = serviceCallAmount(hasWork);
    if (call > 0) {
      breakdown.unshift(`Service call / diagnostic: $${SERVICE_CALL}`);
    } else if (hasWork) {
      breakdown.unshift('Service call: waived (work booked)');
    }

    const bundled = applyBundleDiscount(labor, categories);
    if (bundled.label) {
      breakdown.push(`${bundled.label}: −$${bundled.discount}`);
    }

    const total = bundled.total + devices + call;

    return {
      total,
      labor: bundled.total,
      devices,
      call,
      breakdown,
      categories,
      hasWork,
    };
  }, [cart]);

  const countsByCategory = useMemo(() => {
    const c = { drywall: 0, electrical: 0, plumbing: 0 };
    cart.forEach(({ id }) => {
      const svc = allServices.find((s) => s.id === id);
      if (svc && (svc.category === 'drywall' || svc.category === 'electrical' || svc.category === 'plumbing')) {
        c[svc.category] += 1;
      }
    });
    return c;
  }, [cart]);

  useEffect(() => {
    if (!lightbox) return;
    previousFocusedRef.current = document.activeElement as HTMLElement | null;
    lightboxCloseButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setLightbox(null);
        return;
      }

      if (event.key !== 'Tab') return;
      const container = lightboxRef.current;
      if (!container) return;

      const focusableElements = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusedRef.current?.focus();
    };
  }, [lightbox]);

  const toggleService = (id: string) => {
    setShowQuote(false);
    setCart((prev) => {
      const exists = prev.find((c) => c.id === id);
      if (exists) return prev.filter((c) => c.id !== id);
      return [...prev, { id, qty: 1, supplyDevice: false }];
    });
  };

  const setQty = (id: string, qty: number) => {
    setShowQuote(false);
    const q = Math.max(1, Math.min(99, Math.floor(qty) || 1));
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: q } : c)));
  };

  const setSupply = (id: string, supplyDevice: boolean) => {
    setShowQuote(false);
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, supplyDevice } : c))
    );
  };

  const clearCart = () => {
    setCart([]);
    setShowQuote(false);
  };

  const handleTallySubmit = () => {
    const servicesStr = cart
      .map(({ id, qty, supplyDevice }) => {
        const svc = allServices.find((s) => s.id === id);
        if (!svc) return '';
        const labor = itemLabor(svc, qty);
        const device = itemDevice(svc, qty, supplyDevice);
        return `${svc.name}${qty > 1 ? ` ×${qty}` : ''}: $${labor}${device ? ` + device $${device}` : ''}`;
      })
      .filter(Boolean)
      .join(', ');

    const tallyUrl = new URL('https://tally.so/r/QKYRWA');
    tallyUrl.searchParams.append('services', servicesStr);
    tallyUrl.searchParams.append('description', description);
    tallyUrl.searchParams.append('estimatedPrice', String(liveQuote.total));
    window.open(tallyUrl.toString(), '_blank');
  };

  const menuCategories = CATEGORY_META.map((cat) => ({
    ...cat,
    groups: groupBySubcategory(servicesForCategory(cat.key)),
  }));

  const activeList = servicesForCategory(activeCategory);
  const activeGroups = groupBySubcategory(activeList);

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Chandler',
      text: 'Jason fixed a large drywall patch in my living room and matched the texture perfectly. Showed up on time, clean work, fair price. Highly recommend.',
      rating: 5,
    },
    {
      name: 'Mike R.',
      location: 'Gilbert',
      text: 'Needed several electrical updates and a new ceiling fan. Professional, knowledgeable, and explained everything clearly. Will use again.',
      rating: 5,
    },
    {
      name: 'Lisa T.',
      location: 'Mesa',
      text: 'Quick response on a plumbing issue. Honest pricing and quality work. Exactly what you want from a local tradesperson.',
      rating: 5,
    },
  ];

  const portfolioProjects = [
    {
      title: 'Bathroom Renovation — Pony Wall Vanity',
      tag: 'Drywall + Plumbing',
      type: 'sequence',
      photos: [
        {
          src: 'https://github.com/user-attachments/assets/450a22cd-9193-4af4-a8a5-e056e4459848',
          caption: 'Job site starts: framing, R-TECH insulation & plumbing rough-in',
        },
        {
          src: 'https://github.com/user-attachments/assets/6f7576a1-174e-47f0-a4d3-316da4ffc6c5',
          caption: 'R-TECH foam + Henry waterproofing membrane for long-term protection',
        },
        {
          src: 'https://github.com/user-attachments/assets/43a17179-21fa-4ec0-9ea5-8697ac113b95',
          caption: 'Shower wall insulation & moisture barrier detail',
        },
        {
          src: 'https://github.com/user-attachments/assets/0253e8ac-69d8-44c3-8375-0c791fc83dd1',
          caption: 'Greenboard drywall installed, tub set — ready for finish',
        },
        {
          src: '/gallery/bathroom-pony-wall-vanity-finished.jpg',
          caption: 'Completed: Custom double vanity with pony wall, quartz-look top & integrated storage. Ready for yours?',
        },
      ],
      description:
        'Full bathroom renovation including moisture-resistant framing, R-TECH rigid foam, Henry waterproofing, plumbing & electrical rough-in, and a custom pony-wall double vanity. Clean, modern, and built to last.',
    },
    {
      title: 'Closet Conversion with Barn Doors',
      tag: 'Drywall + Carpentry',
      type: 'sequence',
      photos: [
        {
          src: '/gallery/closet-01-demolition.jpg',
          caption: 'Before: Original closet demolished — clean slate for better storage',
        },
        {
          src: '/gallery/closet-02-framing.jpg',
          caption: 'Framing and wall build-out in progress',
        },
        {
          src: '/gallery/closet-03-progress.jpg',
          caption: 'Drywall and rough-in complete',
        },
        {
          src: '/gallery/closet-04-near-finished.jpg',
          caption: 'Finishing touches underway',
        },
        {
          src: '/gallery/closet-05-barn-doors-final.jpg',
          caption: 'Completed: Custom barn-door closet conversion. Want one like this? Get a quote.',
        },
      ],
      description:
        'Complete closet conversion from demolition through custom barn doors. Better storage, cleaner look, and zero wasted space.',
    },
    {
      title: 'Rangehood Install + Protected Power',
      tag: 'Electrical',
      type: 'before-after',
      photos: [
        {
          src: '/gallery/rangehood-01-rough-opening.jpg',
          caption: 'Before: Ceiling opened and rough opening prepared for new rangehood',
        },
        {
          src: '/gallery/rangehood-02-finished.jpg',
          caption: 'After: Professional Ancona rangehood + matching recessed lighting. Clean lines, quiet power.',
        },
      ],
      supportPhotos: [
        {
          src: '/gallery/electrical-romex-wall.jpg',
          caption: '12-gauge Romex run from exterior 20A GFCI load terminals — power protected and up to code',
        },
        {
          src: '/gallery/rangehood-soffit-wire.jpg',
          caption: 'Wire routed into the soffit. Receptacle left accessible through the LED cut-out so the rangehood stays plugged in (hardwiring voids the manufacturer warranty).',
        },
      ],
      description:
        'Kitchen rangehood replacement with new recessed lighting. Power was carefully run from a GFCI-protected circuit and left on a receptacle (accessible through the LED cut-out) so the unit stays under full manufacturer warranty. Hardwiring would have voided it.',
    },
    {
      title: 'Hose Bib Replacement & Leak Repair',
      tag: 'Plumbing',
      type: 'before-after',
      photos: [
        {
          src: '/gallery/hosebib-01-before.jpg',
          caption: 'Before: Heavily corroded, failing outdoor hose bib',
        },
        {
          src: '/gallery/hosebib-02-after.jpg',
          caption: 'After: New brass hose bib with green handle — clean, reliable, and ready for years of use',
        },
      ],
      supportPhotos: [
        {
          src: '/gallery/plumbing-ceiling-stain.jpg',
          caption: 'Indoor water staining on the ceiling above the toilet — related leak damage',
        },
        {
          src: '/gallery/plumbing-access-hole.jpg',
          caption: 'Access opening cut to locate and repair the source of the leak',
        },
      ],
      description:
        'Outdoor hose bib was heavily corroded and failing. Replaced with a new brass unit while also addressing the related indoor water damage and access needs. One clean plumbing solution.',
    },
    {
      title: 'Under-Cabinet LED Lighting',
      tag: 'Electrical',
      type: 'single',
      photos: [
        {
          src: '/gallery/led-under-cabinet-lighting.jpg',
          caption: 'Custom low-voltage LED under-cabinet lighting — soft, even light exactly where you need it. Easy upgrade, big difference.',
        },
      ],
      description:
        'Low-voltage LED strip install under cabinets for task lighting and ambiance. Simple electrical upgrade that transforms the kitchen.',
    },
  ];

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.png" alt="DEP Home Repair" className="h-12 sm:h-14 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1A1A1A]">
            <a href="#services" className="hover:text-[#005683] transition">Services</a>
            <a href="#quote" className="hover:text-[#005683] transition">Instant Quote</a>
            <a href="#testimonials" className="hover:text-[#005683] transition">Reviews</a>
            <a href="#portfolio" className="hover:text-[#005683] transition">Portfolio</a>
            <a href="#contact" className="hover:text-[#005683] transition">Contact</a>
            <a href="/lead-qualifier" className="hover:text-[#005683] transition">Lead Qualifier</a>
            <a href="#quote" className="bg-[#FFAB00] hover:bg-amber-500 text-black px-5 py-2.5 rounded-full font-semibold text-sm transition shadow-sm">
              Get Quote
            </a>
          </nav>
          <button
            className="md:hidden p-2 text-[#1A1A1A]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            {['#services', '#quote', '#testimonials', '#portfolio', '#contact'].map((href) => (
              <a key={href} href={href} className="block py-2 font-medium capitalize" onClick={() => setMobileMenuOpen(false)}>
                {href.slice(1)}
              </a>
            ))}
            <a href="#quote" className="block mt-2 bg-[#FFAB00] text-center text-black px-5 py-3 rounded-full font-semibold" onClick={() => setMobileMenuOpen(false)}>
              Get Quote
            </a>
          </div>
        )}
      </header>

      <section className="bg-gradient-to-br from-[#005683] via-[#004a70] to-[#1A1A1A] text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="bg-white/95 rounded-2xl px-5 py-3 sm:px-6 sm:py-4 shadow-lg">
              <img src="/logo.png" alt="DEP Home Repair" className="h-20 sm:h-28 w-auto" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
            Seamless, Smart
            <br />
            Repairs &amp; Upgrades
          </h1>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 opacity-95 max-w-2xl mx-auto">
            Solo Chandler expert in drywall, electrical & plumbing.
            <br className="hidden sm:block" />
            Instant quotes • Same-day booking • Guaranteed work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#quote" className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-8 sm:px-10 py-4 rounded-full text-lg sm:text-xl font-bold transition shadow-lg">
              Get Your Instant Quote →
            </a>
            <a href="tel:6025981988" className="inline-block border-2 border-white/40 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold transition">
              Call 602-598-1988
            </a>
          </div>
          <div className="mt-6 text-sm opacity-70">Serving Chandler, Gilbert, Mesa & East Valley</div>
        </div>
      </section>

      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">DEP Service Menu</h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">
            Prices unlock in Instant Quote after you select • Texture included on drywall repairs
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {menuCategories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.key);
                  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left ${cat.cardBg} p-6 sm:p-8 rounded-2xl border ${cat.borderClass} hover:shadow-md transition h-full w-full flex flex-col`}
              >
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-3xl sm:text-4xl font-black" style={{ color: cat.letterColor }}>{cat.letter}</span>
                  <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">{cat.short}</span>
                </div>
                <ul className="space-y-4 text-[#424242] text-sm">
                  {cat.groups.map(([sub, items]) => (
                    <li key={sub}>
                      <div className="font-semibold text-[#1A1A1A] mb-1">{sub}</div>
                      <ul className="space-y-1 pl-1">
                        {items.slice(0, 4).map((item) => (
                          <li key={item.id} className="flex gap-2">
                            <span style={{ color: cat.letterColor }}>✓</span>
                            <span>{item.name}</span>
                          </li>
                        ))}
                        {items.length > 4 && (
                          <li className="text-xs text-gray-500 pl-5">+ {items.length - 4} more in quote tool</li>
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5 text-sm font-semibold" style={{ color: cat.letterColor }}>Get pricing →</div>
              </button>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#005683] to-[#FFAB00] text-white p-8 sm:p-10 rounded-3xl text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-5">DEP Bundle Incentives</h3>
            <div className="max-w-md mx-auto space-y-3 text-left text-sm sm:text-base">
              <div>🎉 <strong>Triple Play</strong> — All three categories → 15% off labor</div>
              <div>⚡ <strong>Power Pair</strong> — Any two categories → 10% off labor</div>
              <div>✓ <strong>Service call waived</strong> when any repair or install is booked</div>
              <div>🔥 <strong>While We&apos;re There</strong> — One small 5-minute task FREE with any booked service</div>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">Instant Quote in Seconds</h2>
          <p className="text-center text-[#424242] mb-8 sm:mb-12">
            Select services — prices appear after selection. Live estimate updates as you go.
          </p>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 md:p-12 border border-gray-100">
            <textarea
              className="w-full h-24 sm:h-28 border border-gray-300 rounded-2xl p-4 sm:p-5 text-base focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent"
              placeholder="Optional notes: e.g. 4 outlets in garage + small drywall patch in hallway"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {CATEGORY_META.map((cat) => {
                const count = countsByCategory[cat.key];
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${
                      activeCategory === cat.key
                        ? 'bg-[#005683] text-white'
                        : 'bg-slate-100 text-[#424242] hover:bg-slate-200'
                    }`}
                  >
                    {cat.short}
                    {count > 0 && (
                      <span
                        className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                          activeCategory === cat.key ? 'bg-white/20' : 'bg-[#FFAB00] text-black'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="ml-auto text-xs text-gray-500 hover:text-red-600 underline"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="mt-6 space-y-6 max-h-[28rem] overflow-y-auto pr-1">
              {activeGroups.map(([sub, items]) => (
                <div key={sub}>
                  <div className="text-sm font-semibold text-[#005683] mb-2">{sub}</div>
                  <div className="space-y-2">
                    {items.map((svc) => {
                      const item = cartMap.get(svc.id);
                      const selected = !!item;
                      const qty = item?.qty || 1;
                      const supply = item?.supplyDevice || false;
                      const labor = selected ? itemLabor(svc, qty) : 0;
                      const device = selected ? itemDevice(svc, qty, supply) : 0;
                      return (
                        <div
                          key={svc.id}
                          className={`border rounded-xl p-3 transition ${
                            selected ? 'border-[#FFAB00] bg-amber-50/40' : 'border-gray-200 hover:border-[#FFAB00]/40'
                          }`}
                        >
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => toggleService(svc.id)}
                              className="mt-1 w-5 h-5 accent-[#FFAB00]"
                            />
                            <span className="flex-1">
                              <span className="font-medium text-[#1A1A1A]">{svc.name}</span>
                              {svc.notes && (
                                <span className="block text-xs text-gray-500 mt-0.5">{svc.notes}</span>
                              )}
                              {selected && (
                                <span className="block text-sm text-[#005683] mt-1 font-semibold">
                                  Labor ${labor}
                                  {device > 0 ? ` + device $${device}` : ''}
                                  {svc.kind === 'volume' && qty > 1 ? ` (${qty} units)` : ''}
                                  {svc.kind === 'range' ? ` (est. $${svc.low}–$${svc.high})` : ''}
                                </span>
                              )}
                            </span>
                          </label>
                          {selected && svc.kind === 'volume' && (
                            <div className="mt-2 ml-8 flex items-center gap-2">
                              <label className="text-xs text-[#424242]">Qty</label>
                              <input
                                type="number"
                                min={1}
                                max={99}
                                value={qty}
                                onChange={(e) => setQty(svc.id, parseInt(e.target.value, 10))}
                                className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-sm"
                              />
                            </div>
                          )}
                          {selected && svc.deviceCost != null && (
                            <div className="mt-2 ml-8">
                              <label className="flex items-center gap-2 text-xs text-[#424242] cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={supply}
                                  onChange={(e) => setSupply(svc.id, e.target.checked)}
                                  className="accent-[#FFAB00]"
                                />
                                DEP supplies device (+~${deviceSellPrice(svc.deviceCost)}
                                {svc.kind === 'volume' && qty > 1 ? ` × ${qty}` : ''}, 25% markup)
                              </label>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Live estimate</div>
                <div className="text-2xl font-bold text-[#1A1A1A]">
                  ${liveQuote.total}
                  {cart.length === 0 && (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      (service call only until you select work)
                    </span>
                  )}
                </div>
                {liveQuote.hasWork && liveQuote.call === 0 && (
                  <div className="text-xs text-green-700 mt-0.5">Service call waived</div>
                )}
              </div>
              <div className="text-xs text-gray-500 text-right">
                {cart.length} selected
                {liveQuote.categories.size >= 2 && (
                  <div className="text-[#005683] font-semibold">
                    {liveQuote.categories.size >= 3 ? 'Triple Play active' : 'Power Pair active'}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setShowQuote(true)}
              className="mt-6 w-full bg-[#005683] hover:bg-blue-900 text-white py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition shadow-md"
            >
              Review Full Quote →
            </button>

            {showQuote && (
              <div className="mt-8 p-6 sm:p-8 bg-[#F8FAFC] rounded-2xl border-2 border-[#FFAB00]">
                <div className="text-4xl sm:text-5xl font-bold text-[#1A1A1A]">${liveQuote.total}</div>
                <div className="text-[#FFAB00] font-medium mt-1">Estimated total • Chandler / East Valley</div>
                <div className="mt-5 space-y-2 text-sm text-[#424242]">
                  {liveQuote.breakdown.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t text-xs text-[#424242]">
                  {description
                    ? `Notes: "${description}"`
                    : liveQuote.hasWork
                      ? 'Estimate only • Final price confirmed on-site • Devices are approximate until model is confirmed'
                      : 'Select services above or call 602-598-1988'}
                </div>
                <button
                  onClick={handleTallySubmit}
                  className="mt-6 w-full bg-[#FFAB00] hover:bg-amber-500 text-black py-4 rounded-2xl font-bold transition shadow-sm"
                >
                  Book This Job Now →
                </button>
                <p className="mt-3 text-center text-xs text-gray-500">Opens booking form with your quote details</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">Our Work</h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">Real projects — before, during &amp; after</p>
          {portfolioProjects.map((project, pi) => (
            <div key={pi} className="mb-14 last:mb-0">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">{project.title}</h3>
                <span className="text-xs font-semibold bg-[#005683]/10 text-[#005683] px-3 py-1 rounded-full">{project.tag}</span>
              </div>
              <p className="text-[#424242] text-sm mb-6 max-w-2xl">{project.description}</p>
              <div className={`grid gap-3 sm:gap-4 ${
                project.type === 'before-after' ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl' :
                project.type === 'single' ? 'grid-cols-1 max-w-md' :
                'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
              }`}>
                {project.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightbox(photo)}
                    className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#FFAB00]"
                    aria-label={`View photo: ${photo.caption}`}
                  >
                    <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    {project.type === 'before-after' && idx === 0 && (
                      <span className="absolute top-2 left-2 bg-slate-700/90 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">Before</span>
                    )}
                    {project.type === 'before-after' && idx === 1 && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">After</span>
                    )}
                    {project.type !== 'before-after' && idx === project.photos.length - 1 && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">✓ Completed</span>
                    )}
                    {project.type === 'sequence' && idx === 0 && (
                      <span className="absolute top-2 left-2 bg-slate-700/90 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">Start</span>
                    )}
                  </button>
                ))}
              </div>
              {project.supportPhotos && project.supportPhotos.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Supporting details</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {project.supportPhotos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightbox(photo)}
                        className="group relative aspect-square overflow-hidden rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition"
                        aria-label={`View photo: ${photo.caption}`}
                      >
                        <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="mt-10 text-center">
            <a href="#quote" className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-black px-8 py-3.5 rounded-full font-semibold transition shadow-sm">
              Start Your Project →
            </a>
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.caption}
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={lightboxCloseButtonRef}
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-[#FFAB00] transition"
              aria-label="Close"
            >
              ×
            </button>
            <img src={lightbox.src} alt={lightbox.caption} className="w-full rounded-2xl shadow-2xl" />
            <p className="mt-3 text-center text-white text-sm opacity-80">{lightbox.caption}</p>
          </div>
        </div>
      )}

      <section id="testimonials" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">What Clients Say</h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">Real feedback from Chandler & East Valley homeowners</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 h-full">
                <div className="flex gap-1 mb-4 text-[#FFAB00]">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="text-[#424242] mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="font-semibold text-[#1A1A1A]">{t.name}</div>
                <div className="text-sm text-gray-500">{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#1A1A1A] text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            <div>
              <img src="/logo.png" alt="DEP Home Repair" className="h-16 w-auto mx-auto md:mx-0 mb-4" />
              <p className="text-sm opacity-80">
                Drywall • Electrical • Plumbing
                <br />
                Home-Smart Solutions for the East Valley
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <div className="space-y-2 text-sm opacity-90">
                <div><a href="tel:6025981988" className="hover:text-[#FFAB00] transition">📞 602-598-1988</a></div>
                <div><a href="mailto:info@dephomerepair.com" className="hover:text-[#FFAB00] transition">✉️ info@dephomerepair.com</a></div>
                <div className="pt-2">Chandler, AZ & East Valley<br />Licensed • Bonded • Insured</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <div><a href="#services" className="hover:text-[#FFAB00] transition">Services</a></div>
                <div><a href="#quote" className="hover:text-[#FFAB00] transition">Instant Quote</a></div>
                <div><a href="#testimonials" className="hover:text-[#FFAB00] transition">Reviews</a></div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs opacity-60">
            © {new Date().getFullYear()} DEP Home Repair • Chandler, Arizona
            <br />
            Drywall • Electrical • Plumbing
          </div>
        </div>
      </footer>
    </>
  );
}
