'use client';

import { CALL_WAIVER_MIN, SERVICE_CALL, allServices, type ServicePrice } from '../lib/pricing';
import { SERVICE_MENU_TITLE, TRADE_CARDS } from '../lib/tradeCardCopy';
import { tradeCardProjects } from '../lib/portfolio';
import { ProjectPhotoSlider } from './ProjectPhotoSlider';

type TradeKey = 'drywall' | 'electrical' | 'plumbing';

const CARD_STYLE: Record<TradeKey, { color: string; bg: string; border: string }> = {
  drywall: { color: '#0056B3', bg: 'bg-[#E8F1FB]', border: 'border-[#0056B3]/20 hover:border-[#0056B3]/50' },
  electrical: { color: '#FFAB00', bg: 'bg-[#FFF8E7]', border: 'border-[#FFAB00]/25 hover:border-[#FFAB00]/60' },
  plumbing: { color: '#424242', bg: 'bg-[#F3F3F3]', border: 'border-[#424242]/20 hover:border-[#424242]/50' },
};

function startingAtPrice(svc: ServicePrice): number {
  if (svc.kind === 'flat') return svc.price;
  if (svc.kind === 'volume') return svc.first;
  return svc.low;
}

const STARTING_IDS = ['d-small-hole', 'e-outlet', 'p-shower-head'];

export function TradeMenuCards({
  onSelect,
  onStartQuote,
  onOpenPhoto,
}: {
  onSelect: (key: TradeKey) => void;
  onStartQuote: (key: TradeKey) => void;
  onOpenPhoto: (photo: { src: string; caption: string }) => void;
}) {
  const startingAnchors = STARTING_IDS
    .map((id) => allServices.find((s) => s.id === id))
    .filter(Boolean) as ServicePrice[];

  const openQuote = (key: TradeKey) => {
    onSelect(key);
    onStartQuote(key);
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">{SERVICE_MENU_TITLE}</h2>
        <p className="text-center text-[#424242] mb-10 sm:mb-12">
          {`Service call is $${SERVICE_CALL} and waives at $${CALL_WAIVER_MIN} labor on the same visit • Texture included on drywall repairs • Texture packages in Instant Quote`}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-10">
          {startingAnchors.map((svc) => (
            <button
              key={svc.id}
              type="button"
              onClick={() => {
                if (svc.category === 'drywall' || svc.category === 'electrical' || svc.category === 'plumbing') {
                  openQuote(svc.category);
                }
              }}
              className="text-left bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:border-[#FFAB00]/60 transition"
            >
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Typical starting price</div>
              <div className="text-2xl font-bold text-[#1A1A1A]">${startingAtPrice(svc)}</div>
              <div className="text-sm font-semibold text-[#0056B3] mt-1">{svc.name}</div>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {TRADE_CARDS.map((card) => {
            const project = tradeCardProjects[card.key];
            const style = CARD_STYLE[card.key];
            return (
              <div key={card.key} className={`text-left ${style.bg} p-6 sm:p-8 rounded-2xl border ${style.border} h-full hover:shadow-md transition`}>
                <button
                  type="button"
                  onClick={() => openQuote(card.key)}
                  className="flex items-baseline gap-2 mb-5 text-left focus:outline-none focus:ring-2 focus:ring-[#FFAB00] rounded"
                >
                  <span className="text-3xl sm:text-4xl font-black" style={{ color: style.color }}>{card.letter}</span>
                  <span className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">{card.title}</span>
                </button>
                <div className="mb-5">
                  <ProjectPhotoSlider photos={project.photos} projectType={project.type} onOpen={onOpenPhoto} />
                </div>
                <ul className="space-y-3 text-[#424242] text-sm">
                  {card.items.map((item) => (
                    <li key={item.title}>
                      <div className="font-semibold text-[#1A1A1A]">{item.title}</div>
                      <div className="pl-0 mt-0.5">{item.detail}</div>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openQuote(card.key)}
                  className="mt-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFAB00] rounded"
                  style={{ color: style.color }}
                >
                  Get pricing →
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#0056B3] to-[#FFAB00] text-white p-8 sm:p-10 rounded-3xl text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-5">DEP Bundle Incentives</h3>
          <div className="max-w-md mx-auto space-y-3 text-left text-sm sm:text-base">
            <div>🎉 <strong>Triple Play</strong> — All three categories → 15% off labor</div>
            <div>⚡ <strong>Power Pair</strong> — Any two categories → 10% off labor</div>
            <div>✓ <strong>Service call waived</strong> once the same-visit labor reaches ${CALL_WAIVER_MIN}</div>
            <div>🔥 <strong>While We're There</strong> — One small 5-minute task FREE with any booked service</div>
          </div>
        </div>
      </div>
    </section>
  );
}
