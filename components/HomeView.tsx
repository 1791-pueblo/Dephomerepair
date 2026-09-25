'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { TradeMenuCards } from './TradeMenuCards';
import { ProjectPhotoSlider } from './ProjectPhotoSlider';
import { portfolioProjects } from '../lib/portfolio';
import { CALL_WAIVER_MIN, SERVICE_CALL, deviceSellPrice, type ServicePrice } from '../lib/pricing';

type TradeKey = 'drywall' | 'electrical' | 'plumbing';
type CartItem = { id: string; qty: number; supplyDevice: boolean };
type QuickIntake = { service: string; city: string; urgency: string };
type CategoryMeta = { key: TradeKey; short: string; tab: string };
type LiveQuote = {
  total: number;
  call: number;
  toWaive: number;
  breakdown: string[];
  categories: Set<TradeKey>;
  hasWork: boolean;
};

const TESTIMONIALS = [
  { name: 'Sarah M.', location: 'Chandler', text: 'Jason fixed a large drywall patch in my living room and matched the texture perfectly. Showed up on time, clean work, fair price. Highly recommend.', rating: 5 },
  { name: 'Mike R.', location: 'Gilbert', text: 'Needed several electrical updates and a new ceiling fan. Professional, knowledgeable, and explained everything clearly. Will use again.', rating: 5 },
  { name: 'Lisa T.', location: 'Mesa', text: 'Quick response on a plumbing issue. Honest pricing and quality work. Exactly what you want from a local tradesperson.', rating: 5 },
];

export type HomeViewProps = {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  quoteStarted: boolean;
  setQuoteStarted: Dispatch<SetStateAction<boolean>>;
  quickIntake: QuickIntake;
  setQuickIntake: Dispatch<SetStateAction<QuickIntake>>;
  activeCategory: TradeKey;
  setActiveCategory: Dispatch<SetStateAction<TradeKey>>;
  showQuote: boolean;
  setShowQuote: Dispatch<SetStateAction<boolean>>;
  bookingModalOpen: boolean;
  setBookingModalOpen: Dispatch<SetStateAction<boolean>>;
  bookingEmbedUrl: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  lightbox: { src: string; caption: string } | null;
  setLightbox: Dispatch<SetStateAction<{ src: string; caption: string } | null>>;
  cartMap: Map<string, CartItem>;
  liveQuote: LiveQuote;
  countsByCategory: Record<TradeKey, number>;
  toggleService: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setSupply: (id: string, supplyDevice: boolean) => void;
  handleQuoteStart: () => void;
  handleOpenBooking: () => void;
  CATEGORY_META: CategoryMeta[];
  QUICK_SERVICE_OPTIONS: string[];
  QUICK_URGENCY_OPTIONS: string[];
  activeGroups: Array<[string, ServicePrice[]]>;
  itemLabor: (svc: ServicePrice, qty: number) => number;
  itemDevice: (svc: ServicePrice, qty: number, supply: boolean) => number;
};

export function HomeView(p: HomeViewProps) {
  const {
    description, setDescription, quoteStarted, setQuoteStarted, quickIntake, setQuickIntake,
    activeCategory, setActiveCategory, showQuote, setShowQuote, bookingModalOpen, setBookingModalOpen,
    bookingEmbedUrl, mobileMenuOpen, setMobileMenuOpen, lightbox, setLightbox, cartMap, liveQuote,
    countsByCategory, toggleService, setQty, setSupply, handleQuoteStart, handleOpenBooking,
    CATEGORY_META, QUICK_SERVICE_OPTIONS, QUICK_URGENCY_OPTIONS, activeGroups, itemLabor, itemDevice,
  } = p;

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image src="/logo.png" alt="DEP Home Repair" width={140} height={56} className="h-12 sm:h-14 w-auto" priority />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1A1A1A]">
            <a href="#services" className="hover:text-[#0056B3] transition">Services</a>
            <a href="#quote" className="hover:text-[#0056B3] transition">Instant Quote</a>
            <a href="#portfolio" className="hover:text-[#0056B3] transition">Portfolio</a>
            <a href="#about" className="hover:text-[#0056B3] transition">About</a>
            <a href="#testimonials" className="hover:text-[#0056B3] transition">Reviews</a>
            <a href="#contact" className="hover:text-[#0056B3] transition">Contact</a>
            <a href="#quote" className="bg-[#FFAB00] hover:bg-amber-500 text-black px-5 py-2.5 rounded-full font-semibold text-sm transition shadow-sm">Get Quote</a>
          </nav>
          <button className="md:hidden p-2 text-[#1A1A1A]" onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label="Toggle menu">
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
            {['#services', '#quote', '#portfolio', '#about', '#testimonials', '#contact'].map((href) => (
              <a key={href} href={href} className="block py-2 font-medium capitalize" onClick={() => setMobileMenuOpen(false)}>{href.slice(1)}</a>
            ))}
          </div>
        )}
      </header>

      <main className="pb-16 md:pb-0">
      <section className="bg-gradient-to-br from-[#0056B3] via-[#00448F] to-[#1A1A1A] text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="bg-white/95 rounded-2xl px-5 py-3 sm:px-6 sm:py-4 shadow-lg">
              <Image src="/logo.png" alt="DEP Home Repair" width={200} height={112} className="h-20 sm:h-28 w-auto" priority />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">Seamless, Smart<br />Repairs & Upgrades</h1>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-95 max-w-2xl mx-auto">Solo Chandler expert in drywall, electrical & plumbing.<br className="hidden sm:block" /> Fair pricing • Clean work • Done right the first time.</p>
          <p className="text-sm sm:text-base opacity-80 max-w-xl mx-auto mb-8">You deal directly with the person who does the work — clear communication, reliable scheduling, and no runaround.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#quote" className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-8 sm:px-10 py-4 rounded-full text-lg sm:text-xl font-bold transition shadow-lg">Get a Clear Quote →</a>
            <a href="tel:6025981988" className="inline-block border-2 border-white/40 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold transition">Call 602-598-1988</a>
          </div>
          <div className="mt-6 text-sm opacity-70">Serving Chandler, Gilbert, Mesa & East Valley</div>
        </div>
      </section>

      <TradeMenuCards
        onSelect={(key) => {
          setActiveCategory(key);
          document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onStartQuote={(key) => {
          setActiveCategory(key);
          setQuoteStarted(true);
          setTimeout(() => document.getElementById('quote-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        }}
        onOpenPhoto={setLightbox}
      />

      <section id="quote" className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">Get a Clear Quote</h2>
          <p className="text-center text-[#424242] mb-8">Step 1: a few quick details • Step 2: exact services and fair pricing.</p>

          {!quoteStarted && (
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100">
              <div className="text-sm font-semibold text-[#0056B3] mb-4">Step 1 of 2 · Quick details</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Service type</label>
                  <select value={quickIntake.service} onChange={(e) => setQuickIntake((prev) => ({ ...prev, service: e.target.value }))} className="w-full border border-gray-300 rounded-xl p-3 text-sm">
                    <option value="">Choose service…</option>
                    {QUICK_SERVICE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">City</label>
                  <input value={quickIntake.city} onChange={(e) => setQuickIntake((prev) => ({ ...prev, city: e.target.value }))} placeholder="Chandler, Mesa…" className="w-full border border-gray-300 rounded-xl p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Timing</label>
                  <select value={quickIntake.urgency} onChange={(e) => setQuickIntake((prev) => ({ ...prev, urgency: e.target.value }))} className="w-full border border-gray-300 rounded-xl p-3 text-sm">
                    <option value="">When works best…</option>
                    {QUICK_URGENCY_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
              </div>
              <button type="button" onClick={handleQuoteStart} className="mt-6 w-full bg-[#0056B3] hover:bg-blue-900 text-white py-4 rounded-2xl font-bold text-lg">Continue to Exact Quote →</button>
            </div>
          )}

          {quoteStarted && (
            <div id="quote-builder" className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100">
              <textarea className="w-full h-24 border border-gray-300 rounded-2xl p-4 text-base" placeholder="Optional notes" value={description} onChange={(e) => setDescription(e.target.value)} />
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {CATEGORY_META.map((cat) => (
                  <button key={cat.key} type="button" onClick={() => setActiveCategory(cat.key)} className={`px-4 py-2 rounded-full text-sm font-semibold ${activeCategory === cat.key ? 'bg-[#0056B3] text-white' : 'bg-slate-100 text-[#424242]'}`}>
                    {cat.tab || cat.short}{countsByCategory[cat.key] > 0 ? ` (${countsByCategory[cat.key]})` : ''}
                  </button>
                ))}
              </div>
              <div className="mt-6 space-y-6 max-h-[28rem] overflow-y-auto pr-1">
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
                                <span className="font-medium text-[#1A1A1A]">{svc.name}</span>
                                {selected && <span className="block text-sm text-[#0056B3] mt-1 font-semibold">Labor ${labor}{device > 0 ? ` + device $${device}` : ''}</span>}
                              </span>
                            </label>
                            {selected && svc.kind === 'volume' && (
                              <div className="mt-2 ml-8 flex items-center gap-2 text-sm">
                                <button type="button" onClick={() => setQty(svc.id, qty - 1)} className="w-8 h-8 border rounded-lg">-</button>
                                <span>{qty}</span>
                                <button type="button" onClick={() => setQty(svc.id, qty + 1)} className="w-8 h-8 border rounded-lg">+</button>
                              </div>
                            )}
                            {selected && svc.deviceCost != null && (
                              <label className="mt-2 ml-8 flex items-center gap-2 text-xs">
                                <input type="checkbox" checked={supply} onChange={(e) => setSupply(svc.id, e.target.checked)} className="accent-[#FFAB00]" />
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

              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Live estimate</div>
                <div className="text-2xl font-bold text-[#1A1A1A]">${liveQuote.total}</div>
                {liveQuote.hasWork && liveQuote.call === 0 && <div className="text-xs text-green-700 mt-0.5">Service call waived — ${CALL_WAIVER_MIN} labor minimum met</div>}
                {liveQuote.hasWork && liveQuote.call > 0 && <div className="text-xs text-amber-800 mt-0.5">${SERVICE_CALL} service call applies · add ${liveQuote.toWaive} labor to waive</div>}
              </div>

              <button onClick={() => setShowQuote(true)} className="mt-6 w-full bg-[#0056B3] hover:bg-blue-900 text-white py-4 rounded-2xl font-bold text-lg">Review Full Quote →</button>

              {showQuote && (
                <div className="mt-8 p-6 bg-[#F8FAFC] rounded-2xl border-2 border-[#FFAB00]">
                  <div className="text-4xl font-bold">${liveQuote.total}</div>
                  <div className="mt-5 rounded-xl border border-slate-200 bg-white overflow-hidden">
                    <div className="px-4 py-2 text-xs uppercase tracking-wide text-gray-500 bg-slate-50 border-b">Quote breakdown</div>
                    {liveQuote.breakdown.map((line, i) => {
                      const waived = line.startsWith('Service call: waived');
                      const fee = line.startsWith('Service call / diagnostic');
                      return (
                        <div key={i} className={`px-4 py-2.5 text-sm border-t border-slate-100 ${waived ? 'text-green-800 bg-green-50/60' : fee ? 'text-amber-900 bg-amber-50/70' : 'text-[#424242]'}`}>
                          {line}
                        </div>
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
          <div className="w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-8 max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Complete Your Booking</h3>
              <button type="button" onClick={() => setBookingModalOpen(false)} className="text-2xl">x</button>
            </div>
            {bookingEmbedUrl && <iframe title="DEP Booking Form" src={bookingEmbedUrl} sandbox="allow-scripts allow-forms allow-same-origin allow-popups" className="w-full h-[72vh] rounded-2xl border" />}
          </div>
        </div>
      )}

      <section id="portfolio" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">Our Work</h2>
          <p className="text-center text-[#424242] mb-10">Real projects from local homes — before, during & after.</p>
          {portfolioProjects.map((project) => (
            <div key={project.id} className="mb-14 last:mb-0">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{project.title}</h3>
              <p className="text-[#424242] text-sm mb-6 max-w-2xl">{project.description}</p>
              <ProjectPhotoSlider photos={project.photos} projectType={project.type} onOpen={setLightbox} />
            </div>
          ))}
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setLightbox(null)} className="absolute -top-10 right-0 text-white text-3xl font-bold">x</button>
            <div className="relative w-full aspect-[4/3]">
              <Image src={lightbox.src} alt={lightbox.caption} fill sizes="(max-width: 768px) 100vw, 48rem" className="object-contain rounded-2xl" priority />
            </div>
            <p className="mt-3 text-center text-white text-sm opacity-80">{lightbox.caption}</p>
          </div>
        </div>
      )}

      <section id="about" className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#1A1A1A]">
            <span className="text-[#0056B3]">D</span>
            <span className="text-[#FFAB00]">E</span>
            <span className="text-[#424242]">P</span>{' '}
            about us
          </h2>
          <div className="max-w-4xl mx-auto text-center text-[#424242] space-y-4">
            <p>DEP Home Repair handles drywall, electrical, and plumbing with one licensed tradesperson on the job.</p>
            <p>You deal directly with the person doing the work, so the schedule stays clear and bundled repairs get finished in one visit.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#0056B3]/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2"><span className="text-[#0056B3]">D</span>rywall</h3>
              <p className="text-sm text-[#424242]">Seamless repairs and a finish that matches your home's interior.</p>
            </div>
            <div className="bg-white border border-[#FFAB00]/25 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2"><span className="text-[#FFAB00]">E</span>lectrical</h3>
              <p className="text-sm text-[#424242]">Lighting upgrades, smart-home work, wiring, and troubleshooting.</p>
            </div>
            <div className="bg-white border border-[#424242]/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2"><span className="text-[#424242]">P</span>lumbing</h3>
              <p className="text-sm text-[#424242]">From minor leaks to fixture installs — reliable water flow.</p>
            </div>
          </div>
          <p className="mt-8 text-center font-semibold text-[#1A1A1A]">Licensed • Bonded • Insured • ROC 277978</p>
        </div>
      </section>

      <section id="testimonials" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">What Clients Say</h2>
          <p className="text-center text-[#424242] mb-10">Real feedback from Chandler & East Valley homeowners.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={`${t.name}-${t.location}`} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex gap-1 mb-4 text-[#FFAB00]">{Array.from({ length: t.rating }).map((_, j) => <span key={j}>★</span>)}</div>
                <p className="text-[#424242] mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="font-semibold text-[#1A1A1A]">{t.name}</div>
                <div className="text-sm text-gray-500">{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_18px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-3 gap-2 p-2">
          <a href="tel:6025981988" className="text-center bg-[#0056B3] text-white rounded-xl py-2.5 text-xs font-semibold">Call</a>
          <a href="sms:6025981988" className="text-center bg-slate-100 text-[#1A1A1A] rounded-xl py-2.5 text-xs font-semibold">Text Jason</a>
          <a href="#quote" className="text-center bg-[#FFAB00] text-black rounded-xl py-2.5 text-xs font-semibold">Get Quote</a>
        </div>
      </div>

      <footer id="contact" className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 text-center md:text-left">
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
      </main>
    </>
  );
}
