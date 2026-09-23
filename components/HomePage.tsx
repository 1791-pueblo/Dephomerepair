'use client';

import { useEffect, useMemo, useState } from 'react';
import { HomeView } from './HomeView';
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
  { key: 'drywall' as const, label: 'D — Drywall Repair & Finishing', short: 'Drywall Repair & Finishing', tab: 'Drywall', letter: 'D', letterColor: '#0056B3', cardBg: 'bg-[#E8F1FB]', borderClass: 'border-[#0056B3]/20 hover:border-[#0056B3]/50' },
  { key: 'electrical' as const, label: 'E — Electrical & Smart Home', short: 'Electrical & Smart Home', tab: 'Electrical', letter: 'E', letterColor: '#FFAB00', cardBg: 'bg-[#FFF8E7]', borderClass: 'border-[#FFAB00]/25 hover:border-[#FFAB00]/60' },
  { key: 'plumbing' as const, label: 'P — Plumbing & Fixtures', short: 'Plumbing & Fixtures', tab: 'Plumbing', letter: 'P', letterColor: '#424242', cardBg: 'bg-[#F3F3F3]', borderClass: 'border-[#424242]/20 hover:border-[#424242]/50' },
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

function trackEvent(name: string, data: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  const win = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  (win.dataLayer = win.dataLayer || []).push({ event: name, ...data });
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      if (svc.kind === 'volume' && qty > 1) breakdown.push(`${svc.name} × ${qty}: $${laborLine} (1st $${svc.first} + ${qty - 1} × $${svc.additional})`);
      else if (svc.kind === 'range') breakdown.push(`${svc.name}: ~$${laborLine} (est. $${svc.low}–$${svc.high})`);
      else breakdown.push(`${svc.name}${qty > 1 ? ` × ${qty}` : ''}: $${laborLine}`);
      if (deviceLine > 0) breakdown.push(`  + Device (DEP supply, ~25% markup): $${deviceLine}`);
    });
    const hasWork = cart.length > 0;
    const call = serviceCallAmount(labor);
    const toWaive = amountToWaiveCall(labor);
    if (call === 0 && labor >= CALL_WAIVER_MIN) breakdown.unshift(`Service call: waived ($${CALL_WAIVER_MIN} labor minimum met`);
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
    trackEvent('quote_started', { service: quickIntake.service || 'unspecified', city: quickIntake.city || 'unspecified', urgency: quickIntake.urgency || 'unspecified' });
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

  const activeGroups = groupBySubcategory(servicesForCategory(activeCategory));

  return (
    <HomeView
      description={description}
      setDescription={setDescription}
      quoteStarted={quoteStarted}
      setQuoteStarted={setQuoteStarted}
      quickIntake={quickIntake}
      setQuickIntake={setQuickIntake}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      showQuote={showQuote}
      setShowQuote={setShowQuote}
      bookingModalOpen={bookingModalOpen}
      setBookingModalOpen={setBookingModalOpen}
      bookingEmbedUrl={bookingEmbedUrl}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      cartMap={cartMap}
      liveQuote={liveQuote}
      countsByCategory={countsByCategory}
      toggleService={toggleService}
      setQty={setQty}
      setSupply={setSupply}
      handleQuoteStart={handleQuoteStart}
      handleOpenBooking={handleOpenBooking}
      CATEGORY_META={CATEGORY_META}
      QUICK_SERVICE_OPTIONS={QUICK_SERVICE_OPTIONS}
      QUICK_URGENCY_OPTIONS={QUICK_URGENCY_OPTIONS}
      activeGroups={activeGroups}
      itemLabor={itemLabor}
      itemDevice={itemDevice}
    />
  );
}
