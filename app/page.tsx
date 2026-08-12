'use client';

import { useMemo, useState } from 'react';
import {
  allServices,
  applyBundleDiscount,
  drywall,
  electrical,
  lineTotal,
  plumbing,
  SERVICE_CALL,
  serviceCallAmount,
  type ServicePrice,
} from '../lib/pricing';

type CartItem = { id: string; qty: number };

const CATEGORY_META = [
  { key: 'drywall' as const, label: 'D — Drywall', short: 'Drywall' },
  { key: 'electrical' as const, label: 'E — Electrical', short: 'Electrical' },
  { key: 'plumbing' as const, label: 'P — Plumbing', short: 'Plumbing' },
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

export default function Home() {
  const [quote, setQuote] = useState<{
    total: number;
    breakdown: string[];
    message: string;
  } | null>(null);
  const [description, setDescription] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<
    'drywall' | 'electrical' | 'plumbing'
  >('electrical');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(
    null
  );

  const cartMap = useMemo(() => {
    const m = new Map<string, number>();
    cart.forEach((c) => m.set(c.id, c.qty));
    return m;
  }, [cart]);

  const toggleService = (id: string) => {
    setQuote(null);
    setCart((prev) => {
      const exists = prev.find((c) => c.id === id);
      if (exists) return prev.filter((c) => c.id !== id);
      return [...prev, { id, qty: 1 }];
    });
  };

  const setQty = (id: string, qty: number) => {
    setQuote(null);
    const q = Math.max(1, Math.min(99, Math.floor(qty) || 1));
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, qty: q } : c))
    );
  };

  const calculateQuote = () => {
    const breakdown: string[] = [];
    const categories = new Set<'drywall' | 'electrical' | 'plumbing'>();
    let labor = 0;

    cart.forEach(({ id, qty }) => {
      const svc = allServices.find((s) => s.id === id);
      if (!svc) return;
      if (svc.category === 'drywall' || svc.category === 'electrical' || svc.category === 'plumbing') {
        categories.add(svc.category);
      }
      const total = lineTotal(svc, qty);
      labor += total;

      if (svc.kind === 'volume' && qty > 1) {
        breakdown.push(
          `${svc.name} × ${qty}: $${total} (1st $${svc.first} + ${qty - 1} × $${svc.additional})`
        );
      } else if (svc.kind === 'range') {
        breakdown.push(
          `${svc.name}: ~$${total} (est. $${svc.low}–$${svc.high})`
        );
      } else {
        breakdown.push(`${svc.name}${qty > 1 ? ` × ${qty}` : ''}: $${total}`);
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

    const total = bundled.total + call;

    setQuote({
      total,
      breakdown,
      message: description
        ? `Notes: "${description}"`
        : hasWork
          ? 'Estimate only • Final price confirmed on-site'
          : 'Select services above or describe the job — or call 602-598-1988',
    });
  };

  const handleTallySubmit = () => {
    const servicesStr = cart
      .map(({ id, qty }) => {
        const svc = allServices.find((s) => s.id === id);
        if (!svc) return '';
        return `${svc.name}${qty > 1 ? ` ×${qty}` : ''}: $${lineTotal(svc, qty)}`;
      })
      .filter(Boolean)
      .join(', ');

    const tallyUrl = new URL('https://tally.so/r/QKYRWA');
    tallyUrl.searchParams.append('services', servicesStr);
    tallyUrl.searchParams.append('description', description);
    tallyUrl.searchParams.append('estimatedPrice', String(quote?.total || 0));
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
      title: 'Bathroom Renovation',
      tag: 'Drywall + Plumbing',
      photos: [
        {
          src: 'https://github.com/user-attachments/assets/450a22cd-9193-4af4-a8a5-e056e4459848',
          caption: 'Framing, R-TECH insulation & plumbing rough-in',
        },
        {
          src: 'https://github.com/user-attachments/assets/6f7576a1-174e-47f0-a4d3-316da4ffc6c5',
          caption: 'R-TECH foam + Henry waterproofing membrane',
        },
        {
          src: 'https://github.com/user-attachments/assets/43a17179-21fa-4ec0-9ea5-8697ac113b95',
          caption: 'Shower wall insulation & moisture barrier close-up',
        },
        {
          src: 'https://github.com/user-attachments/assets/0253e8ac-69d8-44c3-8375-0c791fc83dd1',
          caption: 'Greenboard drywall installed, tub set in place',
        },
        {
          src: 'https://github.com/user-attachments/assets/0150125d-6151-4e68-b44f-6e2401144d86',
          caption: 'Completed — double vanity, quartz countertops & travertine tile',
        },
      ],
      description:
        'Full bathroom renovation including drywall, moisture-resistant framing, R-TECH rigid foam insulation, Henry waterproofing membrane, plumbing rough-in, and electrical rough-in.',
    },
  ];

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="DEP Home Repair"
              className="h-12 sm:h-14 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1A1A1A]">
            <a href="#services" className="hover:text-[#005683] transition">
              Services
            </a>
            <a href="#quote" className="hover:text-[#005683] transition">
              Instant Quote
            </a>
            <a href="#testimonials" className="hover:text-[#005683] transition">
              Reviews
            </a>
            <a href="#portfolio" className="hover:text-[#005683] transition">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-[#005683] transition">
              Contact
            </a>
            <a href="/lead-qualifier" className="hover:text-[#005683] transition">
              Lead Qualifier
            </a>
            <a
              href="#quote"
              className="bg-[#FFAB00] hover:bg-amber-500 text-black px-5 py-2.5 rounded-full font-semibold text-sm transition shadow-sm"
            >
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
              <a
                key={href}
                href={href}
                className="block py-2 font-medium capitalize"
                onClick={() => setMobileMenuOpen(false)}
              >
                {href.slice(1)}
              </a>
            ))}
            <a
              href="#quote"
              className="block mt-2 bg-[#FFAB00] text-center text-black px-5 py-3 rounded-full font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </a>
          </div>
        )}
      </header>

      <section className="bg-gradient-to-br from-[#005683] via-[#004a70] to-[#1A1A1A] text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="bg-white/95 rounded-2xl px-5 py-3 sm:px-6 sm:py-4 shadow-lg">
              <img
                src="/logo.png"
                alt="DEP Home Repair"
                className="h-20 sm:h-28 w-auto"
              />
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
            <a
              href="#quote"
              className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-8 sm:px-10 py-4 rounded-full text-lg sm:text-xl font-bold transition shadow-lg"
            >
              Get Your Instant Quote →
            </a>
            <a
              href="tel:6025981988"
              className="inline-block border-2 border-white/40 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold transition"
            >
              Call 602-598-1988
            </a>
          </div>
          <div className="mt-6 text-sm opacity-70">
            Serving Chandler, Gilbert, Mesa & East Valley
          </div>
        </div>
      </section>

      {/* Service menu — categories only, no prices */}
      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">
            DEP Service Menu
          </h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">
            Select services in Instant Quote for pricing • Texture included on drywall repairs
          </p>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {menuCategories.map((cat) => (
              <div
                key={cat.key}
                className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100"
              >
                <div className="text-xl sm:text-2xl font-bold text-[#005683] mb-5">
                  {cat.label}
                </div>
                <ul className="space-y-4 text-[#424242] text-sm">
                  {cat.groups.map(([sub, items]) => (
                    <li key={sub}>
                      <div className="font-semibold text-[#1A1A1A] mb-1">{sub}</div>
                      <ul className="space-y-1 pl-1">
                        {items.map((item) => (
                          <li key={item.id} className="flex gap-2">
                            <span className="text-[#005683]">✓</span>
                            <span>{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#005683] to-[#FFAB00] text-white p-8 sm:p-10 rounded-3xl text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-5">DEP Bundle Incentives</h3>
            <div className="max-w-md mx-auto space-y-3 text-left text-sm sm:text-base">
              <div>
                🎉 <strong>Triple Play</strong> — All three categories → 15% off labor
              </div>
              <div>
                ⚡ <strong>Power Pair</strong> — Any two categories → 10% off labor
              </div>
              <div>
                ✓ <strong>Service call waived</strong> when any repair or install is booked
              </div>
              <div>
                🔥 <strong>While We&apos;re There</strong> — One small 5-minute task FREE with any booked service
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Quote — wired to pricing maps */}
      <section id="quote" className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">
            Instant Quote in Seconds
          </h2>
          <p className="text-center text-[#424242] mb-8 sm:mb-12">
            Pick services below — prices appear after you select. Service call waived with booked work.
          </p>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 md:p-12 border border-gray-100">
            <textarea
              className="w-full h-24 sm:h-28 border border-gray-300 rounded-2xl p-4 sm:p-5 text-base focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent"
              placeholder="Optional notes: e.g. 4 outlets in garage + small drywall patch in hallway"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="mt-6 flex flex-wrap gap-2">
              {CATEGORY_META.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    activeCategory === cat.key
                      ? 'bg-[#005683] text-white'
                      : 'bg-slate-100 text-[#424242] hover:bg-slate-200'
                  }`}
                >
                  {cat.short}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-6 max-h-[28rem] overflow-y-auto pr-1">
              {activeGroups.map(([sub, items]) => (
                <div key={sub}>
                  <div className="text-sm font-semibold text-[#005683] mb-2">{sub}</div>
                  <div className="space-y-2">
                    {items.map((svc) => {
                      const selected = cartMap.has(svc.id);
                      const qty = cartMap.get(svc.id) || 1;
                      return (
                        <div
                          key={svc.id}
                          className={`border rounded-xl p-3 transition ${
                            selected
                              ? 'border-[#FFAB00] bg-amber-50/40'
                              : 'border-gray-200 hover:border-[#FFAB00]/40'
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
                                  {svc.kind === 'volume'
                                    ? `$${lineTotal(svc, qty)}${qty > 1 ? ` (${qty} units)` : ''}`
                                    : svc.kind === 'range'
                                      ? `~$${svc.estimate} ($${svc.low}–$${svc.high})`
                                      : `$${svc.price}`}
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
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <p className="mt-4 text-sm text-[#424242]">
                {cart.length} service{cart.length === 1 ? '' : 's'} selected
              </p>
            )}

            <button
              onClick={calculateQuote}
              className="mt-6 sm:mt-8 w-full bg-[#005683] hover:bg-blue-900 text-white py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition shadow-md"
            >
              Get My Instant Quote →
            </button>

            {quote && (
              <div className="mt-8 p-6 sm:p-8 bg-[#F8FAFC] rounded-2xl border-2 border-[#FFAB00]">
                <div className="text-4xl sm:text-5xl font-bold text-[#1A1A1A]">${quote.total}</div>
                <div className="text-[#FFAB00] font-medium mt-1">
                  Estimated total • Chandler / East Valley
                </div>
                <div className="mt-5 space-y-2 text-sm text-[#424242]">
                  {quote.breakdown.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t text-xs text-[#424242]">{quote.message}</div>
                <button
                  onClick={handleTallySubmit}
                  className="mt-6 w-full bg-[#FFAB00] hover:bg-amber-500 text-black py-4 rounded-2xl font-bold transition shadow-sm"
                >
                  Book This Job Now →
                </button>
                <p className="mt-3 text-center text-xs text-gray-500">
                  Opens booking form with your quote details
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">
            Our Work
          </h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">
            Real projects — before, during &amp; after
          </p>

          {portfolioProjects.map((project, pi) => (
            <div key={pi} className="mb-14 last:mb-0">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">{project.title}</h3>
                <span className="text-xs font-semibold bg-[#005683]/10 text-[#005683] px-3 py-1 rounded-full">
                  {project.tag}
                </span>
              </div>
              <p className="text-[#424242] text-sm mb-6 max-w-2xl">{project.description}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {project.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightbox(photo)}
                    className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#FFAB00]"
                    aria-label={`View photo: ${photo.caption}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl flex items-end">
                      <span className="w-full px-2 py-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl line-clamp-2">
                        {photo.caption}
                      </span>
                    </div>
                    {idx === project.photos.length - 1 && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                        ✓ Completed
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-10 text-center">
            <a
              href="#quote"
              className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-black px-8 py-3.5 rounded-full font-semibold transition shadow-sm"
            >
              Start Your Project →
            </a>
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">
            What Clients Say
          </h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">
            Real feedback from Chandler & East Valley homeowners
          </p>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100">
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
          <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
            <div>
              <img
                src="/logo.png"
                alt="DEP Home Repair"
                className="h-16 w-auto mx-auto md:mx-0 mb-4"
              />
              <p className="text-sm opacity-80">
                Drywall • Electrical • Plumbing
                <br />
                Home-Smart Solutions for the East Valley
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <div className="space-y-2 text-sm opacity-90">
                <div>
                  <a href="tel:6025981988" className="hover:text-[#FFAB00] transition">
                    📞 602-598-1988
                  </a>
                </div>
                <div>
                  <a href="mailto:info@dephomerepair.com" className="hover:text-[#FFAB00] transition">
                    ✉️ info@dephomerepair.com
                  </a>
                </div>
                <div className="pt-2">
                  Chandler, AZ & East Valley
                  <br />
                  Licensed • Bonded • Insured
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <a href="#services" className="hover:text-[#FFAB00] transition">
                    Services
                  </a>
                </div>
                <div>
                  <a href="#quote" className="hover:text-[#FFAB00] transition">
                    Instant Quote
                  </a>
                </div>
                <div>
                  <a href="#testimonials" className="hover:text-[#FFAB00] transition">
                    Reviews
                  </a>
                </div>
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
