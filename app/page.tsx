'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  allServices,
  applyBundleDiscount,
  amountToWaiveCall,
  CALL_WAIVER_MIN,
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
type QuickIntake = { service: string; city: string; urgency: string };

const QUICK_SERVICE_OPTIONS = ['Drywall', 'Electrical', 'Plumbing', 'Multiple Services', 'Not sure yet'];
const QUICK_URGENCY_OPTIONS = ['Today', 'This week', '1–2 weeks', 'Flexible'];

const CATEGORY_META = [
  { key: 'drywall' as const, short: 'Drywall', letter: 'D', letterColor: '#0056B3', cardBg: 'bg-[#E8F1FB]', borderClass: 'border-[#0056B3]/20' },
  { key: 'electrical' as const, short: 'Electrical', letter: 'E', letterColor: '#FFAB00', cardBg: 'bg-[#FFF8E7]', borderClass: 'border-[#FFAB00]/25' },
  { key: 'plumbing' as const, short: 'Plumbing', letter: 'P', letterColor: '#424242', cardBg: 'bg-[#F3F3F3]', borderClass: 'border-[#424242]/20' },
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

function startingAtPrice(svc: ServicePrice): number {
  if (svc.kind === 'flat') return svc.price;
  if (svc.kind === 'volume') return svc.first;
  return svc.low;
}

export default function Home() {
  const [description, setDescription] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quoteStarted, setQuoteStarted] = useState(false);
  const [quickIntake, setQuickIntake] = useState<QuickIntake>({ service: '', city: '', urgency: '' });
  const [activeCategory, setActiveCategory] = useState<'drywall' | 'electrical' | 'plumbing'>('electrical');
  const [showQuote, setShowQuote] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingEmbedUrl, setBookingEmbedUrl] = useState('');

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
      if (svc.category === 'drywall' || svc.category === 'electrical' || svc.category === 'plumbing') categories.add(svc.category);
      const laborLine = itemLabor(svc, qty);
      const deviceLine = itemDevice(svc, qty, supplyDevice);
      labor += laborLine;
      devices += deviceLine;
      if (svc.kind === 'volume' && qty > 1) breakdown.push(`${svc.name} × ${qty}: $${laborLine}`);
      else if (svc.kind === 'range') breakdown.push(`${svc.name}: ~$${laborLine} (est. $${svc.low}–$${svc.high})`);
      else breakdown.push(`${svc.name}${qty > 1 ? ` × ${qty}` : ''}: $${laborLine}`);
      if (deviceLine > 0) breakdown.push(`  + Device (DEP supply): $${deviceLine}`);
    });
    const hasWork = cart.length > 0;
    const call = serviceCallAmount(labor);
    const toWaive = amountToWaiveCall(labor);
    if (call === 0 && labor >= CALL_WAIVER_MIN) breakdown.unshift(`Service call: waived ($${CALL_WAIVER_MIN} labor minimum met)`);
    else if (hasWork) breakdown.unshift(`Service call / diagnostic: $${SERVICE_CALL} — add $${toWaive} labor to waive`);
    else breakdown.unshift(`Service call / diagnostic: $${SERVICE_CALL}`);
    const bundled = applyBundleDiscount(labor, categories);
    if (bundled.label) breakdown.push(`${bundled.label}: −$${bundled.discount}`);
    return { total: bundled.total + devices + call, call, toWaive, breakdown, categories, hasWork };
  }, [cart]);

  const countsByCategory = useMemo(() => {
    const c = { drywall: 0, electrical: 0, plumbing: 0 };
    cart.forEach(({ id }) => {
      const svc = allServices.find((s) => s.id === id);
      if (svc && (svc.category === 'drywall' || svc.category === 'electrical' || svc.category === 'plumbing')) c[svc.category] += 1;
    });
    return c;
  }, [cart]);

  const toggleService = (id: string) => {
    setShowQuote(false);
    setCart((prev) => (prev.find((c) => c.id === id) ? prev.filter((c) => c.id !== id) : [...prev, { id, qty: 1, supplyDevice: false }]));
  };
  const setQty = (id: string, qty: number) => {
    setShowQuote(false);
    const q = Math.max(1, Math.min(99, Math.floor(qty) || 1));
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: q } : c)));
  };
  const setSupply = (id: string, supplyDevice: boolean) => {
    setShowQuote(false);
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, supplyDevice } : c)));
  };

  const servicesSummary = useMemo(
    () =>
      cart
        .map(({ id, qty, supplyDevice }) => {
          const svc = allServices.find((s) => s.id === id);
          if (!svc) return '';
          const labor = itemLabor(svc, qty);
          const device = itemDevice(svc, qty, supplyDevice);
          return `${svc.name}${qty > 1 ? ` ×${qty}` : ''}: $${labor}${device ? ` + device $${device}` : ''}`;
        })
        .filter(Boolean)
        .join(', '),
    [cart]
  );

  const handleQuoteStart = () => {
    setQuoteStarted(true);
    setTimeout(() => document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const handleOpenBooking = () => {
    const tallyUrl = new URL('https://tally.so/r/QKYRWA');
    tallyUrl.searchParams.append('services', servicesSummary);
    tallyUrl.searchParams.append('description', description);
    tallyUrl.searchParams.append('estimatedPrice', String(liveQuote.total));
    tallyUrl.searchParams.append('quickService', quickIntake.service);
    tallyUrl.searchParams.append('quickCity', quickIntake.city);
    tallyUrl.searchParams.append('quickUrgency', quickIntake.urgency);
    setBookingEmbedUrl(tallyUrl.toString());
    setBookingModalOpen(true);
  };

  useEffect(() => {
    if (!bookingModalOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setBookingModalOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [bookingModalOpen]);

  const menuCategories = CATEGORY_META.map((cat) => ({ ...cat, groups: groupBySubcategory(servicesForCategory(cat.key)) }));
  const activeGroups = groupBySubcategory(servicesForCategory(activeCategory));

  return (
    <>
      <header className="bg-white/95 sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image src="/logo.png" alt="DEP Home Repair" width={140} height={56} className="h-12 sm:h-14 w-auto" priority />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services">Services</a>
            <a href="#quote">Instant Quote</a>
            <a href="#contact">Contact</a>
            <a href="#quote" className="bg-[#FFAB00] text-black px-5 py-2.5 rounded-full font-semibold">Get Quote</a>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-br from-[#0056B3] via-[#00448F] to-[#1A1A1A] text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">Seamless, Smart<br />Repairs & Upgrades</h1>
          <p className="text-lg mb-8 opacity-95">Solo Chandler expert in drywall, electrical & plumbing.<br />Fair pricing • Clean work • Done right the first time.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quote" className="bg-[#FFAB00] text-[#1A1A1A] px-8 py-4 rounded-full text-lg font-bold">Get a Clear Quote →</a>
            <a href="tel:6025981988" className="border-2 border-white/40 px-8 py-3.5 rounded-full font-semibold">Call 602-598-1988</a>
          </div>
          <div className="mt-6 text-sm opacity-70">Serving Chandler, Gilbert, Mesa & East Valley</div>
        </div>
      </section>

      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-3">DEP Service Menu</h2>
          <p className="text-center text-[#424242] mb-10">${SERVICE_CALL} service call waived at ${CALL_WAIVER_MIN}+ labor • Texture included on drywall repairs</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {menuCategories.map((cat) => (
              <div key={cat.key} className={`${cat.cardBg} p-6 sm:p-8 rounded-2xl border ${cat.borderClass}`}>
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-3xl font-black" style={{ color: cat.letterColor }}>{cat.letter}</span>
                  <span className="text-xl font-bold">{cat.short}</span>
                </div>
                <ul className="space-y-4 text-sm text-[#424242]">
                  {cat.groups.map(([sub, items]) => (
                    <li key={sub}>
                      <div className="mb-1 font-semibold text-[#1A1A1A]">{sub}</div>
                      <ul className="space-y-1">
                        {items.slice(0, 4).map((item) => (
                          <li key={item.id} className="flex gap-2 items-baseline">
                            <span style={{ color: cat.letterColor }}>✓</span>
                            <span className="flex-1">{item.name}</span>
                            <span className="text-xs font-semibold tabular-nums">{item.kind === 'range' ? `from $${item.low}` : `$${startingAtPrice(item)}`}</span>
                          </li>
                        ))}
                        {items.length > 4 && <li className="text-xs text-gray-500 pl-5">+ {items.length - 4} more in quote tool</li>}
                      </ul>
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => { setActiveCategory(cat.key); document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-5 text-sm font-semibold" style={{ color: cat.letterColor }}>Get pricing →</button>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-gradient-to-r from-[#0056B3] to-[#FFAB00] text-white p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-5 text-center">DEP Bundle Incentives</h3>
            <div className="max-w-md mx-auto space-y-3 text-sm">
              <div>🎉 <strong>Triple Play</strong> — All three categories → 15% off labor</div>
              <div>⚡ <strong>Power Pair</strong> — Any two categories → 10% off labor</div>
              <div>✓ <strong>Service call waived</strong> when labor reaches ${CALL_WAIVER_MIN}</div>
              <div>🔥 <strong>While We're There</strong> — One small 5-minute task FREE with any booked service</div>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-3">Get a Clear Quote</h2>
          <p className="text-center text-[#424242] mb-8">Step 1: a few quick details • Step 2: exact services and fair pricing.</p>
          {!quoteStarted && (
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select value={quickIntake.service} onChange={(e) => setQuickIntake((p) => ({ ...p, service: e.target.value }))} className="border rounded-xl p-3 text-sm">
                  <option value="">Choose service…</option>
                  {QUICK_SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <input value={quickIntake.city} onChange={(e) => setQuickIntake((p) => ({ ...p, city: e.target.value }))} placeholder="Chandler, Mesa…" className="border rounded-xl p-3 text-sm" />
                <select value={quickIntake.urgency} onChange={(e) => setQuickIntake((p) => ({ ...p, urgency: e.target.value }))} className="border rounded-xl p-3 text-sm">
                  <option value="">When works best…</option>
                  {QUICK_URGENCY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <button type="button" onClick={handleQuoteStart} className="mt-6 w-full bg-[#0056B3] text-white py-4 rounded-2xl font-bold">Continue to Exact Quote →</button>
            </div>
          )}
          {quoteStarted && (
            <div id="quote-builder" className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border">
              <textarea className="w-full h-24 border rounded-2xl p-4" placeholder="Optional notes" value={description} onChange={(e) => setDescription(e.target.value)} />
              <div className="mt-6 flex flex-wrap gap-2">
                {CATEGORY_META.map((cat) => (
                  <button key={cat.key} type="button" onClick={() => setActiveCategory(cat.key)} className={`px-4 py-2 rounded-full text-sm font-semibold ${activeCategory === cat.key ? 'bg-[#0056B3] text-white' : 'bg-slate-100'}`}>
                    {cat.short}{countsByCategory[cat.key] > 0 ? ` (${countsByCategory[cat.key]})` : ''}
                  </button>
                ))}
              </div>
              <div className="mt-6 space-y-6 max-h-[28rem] overflow-y-auto">
                {activeGroups.map(([sub, items]) => (
                  <div key={sub}>
                    <div className="text-sm font-semibold text-[#0056B3] mb-2">{sub}</div>
                    <div className="space-y-2">
                      {items.map((svc) => {
                        const item = cartMap.get(svc.id);
                        const selected = !!item;
                        const qty = item?.qty || 1;
                        const supply = item?.supplyDevice || false;
                        const labor = selected ? itemLabor(svc, qty) : 0;
                        const device = selected ? itemDevice(svc, qty, supply) : 0;
                        return (
                          <div key={svc.id} className={`border rounded-xl p-3 ${selected ? 'border-[#FFAB00] bg-amber-50/40' : 'border-gray-200'}`}>
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input type="checkbox" checked={selected} onChange={() => toggleService(svc.id)} className="mt-1 w-5 h-5 accent-[#FFAB00]" />
                              <span className="flex-1">
                                <span className="font-medium">{svc.name}</span>
                                {selected && <span className="block text-sm text-[#0056B3] font-semibold">Labor ${labor}{device > 0 ? ` + device $${device}` : ''}</span>}
                              </span>
                            </label>
                            {selected && svc.kind === 'volume' && (
                              <div className="mt-2 ml-8 flex items-center gap-2 text-sm">
                                <button type="button" onClick={() => setQty(svc.id, qty - 1)} className="w-8 h-8 border rounded-lg">−</button>
                                <span>{qty}</span>
                                <button type="button" onClick={() => setQty(svc.id, qty + 1)} className="w-8 h-8 border rounded-lg">+</button>
                              </div>
                            )}
                            {selected && svc.deviceCost != null && (
                              <label className="mt-2 ml-8 flex items-center gap-2 text-xs">
                                <input type="checkbox" checked={supply} onChange={(e) => setSupply(svc.id, e.target.checked)} />
                                DEP supplies device (+~${deviceSellPrice(svc.deviceCost)})
                              </label>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border">
                <div className="text-xs text-gray-500 uppercase">Live estimate</div>
                <div className="text-2xl font-bold">${liveQuote.total}</div>
                {liveQuote.hasWork && liveQuote.call === 0 && <div className="text-xs text-green-700">Service call waived — ${CALL_WAIVER_MIN} labor minimum met</div>}
                {liveQuote.hasWork && liveQuote.call > 0 && <div className="text-xs text-amber-800">${SERVICE_CALL} service call applies · add ${liveQuote.toWaive} labor to waive</div>}
              </div>
              <button onClick={() => setShowQuote(true)} className="mt-6 w-full bg-[#0056B3] text-white py-4 rounded-2xl font-bold">Review Full Quote →</button>
              {showQuote && (
                <div className="mt-8 p-6 bg-[#F8FAFC] rounded-2xl border-2 border-[#FFAB00]">
                  <div className="text-4xl font-bold">${liveQuote.total}</div>
                  <div className="mt-5 rounded-xl border bg-white overflow-hidden">
                    <div className="px-4 py-2 text-xs uppercase text-gray-500 bg-slate-50 border-b">Quote breakdown</div>
                    {liveQuote.breakdown.map((line, i) => {
                      const waived = line.startsWith('Service call: waived');
                      const fee = line.startsWith('Service call / diagnostic');
                      return (
                        <div key={i} className={`px-4 py-2.5 text-sm border-t ${waived ? 'text-green-800 bg-green-50/60' : fee ? 'text-amber-900 bg-amber-50/70' : ''}`}>{line}</div>
                      );
                    })}
                  </div>
                  <button onClick={handleOpenBooking} disabled={!liveQuote.hasWork} className={`mt-6 w-full py-4 rounded-2xl font-bold ${liveQuote.hasWork ? 'bg-[#FFAB00] text-black' : 'bg-slate-200 text-slate-500'}`}>
                    {liveQuote.hasWork ? 'Book This Job →' : 'Select a Service to Book'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 p-3 flex items-center justify-center" onClick={() => setBookingModalOpen(false)}>
          <div className="w-full max-w-4xl bg-white rounded-3xl p-5 max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Complete Your Booking</h3>
              <button type="button" onClick={() => setBookingModalOpen(false)} className="text-2xl">×</button>
            </div>
            {bookingEmbedUrl && <iframe title="DEP Booking Form" src={bookingEmbedUrl} sandbox="allow-scripts allow-forms allow-same-origin allow-popups" className="w-full h-[72vh] rounded-2xl border" />}
          </div>
        </div>
      )}

      <footer id="contact" className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <p className="font-bold text-lg mb-2">DEP Home Repair</p>
            <p className="text-sm opacity-80">Drywall • Electrical • Plumbing<br />Chandler, AZ & East Valley<br />Licensed • Bonded • Insured • ROC 277978</p>
          </div>
          <div className="text-sm">
            <div><a href="tel:6025981988" className="hover:text-[#FFAB00]">602-598-1988</a></div>
            <div><a href="mailto:info@dephomerepair.com" className="hover:text-[#FFAB00]">info@dephomerepair.com</a></div>
          </div>
        </div>
      </footer>
    </>
  );
}
