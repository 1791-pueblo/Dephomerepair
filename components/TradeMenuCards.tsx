'use client';

import { SERVICE_MENU_TITLE, TRADE_CARDS } from '../lib/tradeCardCopy';
import { CALL_WAIVER_MIN, SERVICE_CALL } from '../lib/pricing';
import { tradeCardProjects } from '../lib/portfolio';
import { ProjectPhotoSlider } from './ProjectPhotoSlider';

const CARD_STYLE = {
  drywall: { color: '#0056B3', bg: 'bg-[#E8F1FB]', border: 'border-[#0056B3]/20 hover:border-[#0056B3]/50' },
  electrical: { color: '#FFAB00', bg: 'bg-[#FFF8E7]', border: 'border-[#FFAB00]/25 hover:border-[#FFAB00]/60' },
  plumbing: { color: '#424242', bg: 'bg-[#F3F3F3]', border: 'border-[#424242]/20 hover:border-[#424242]/50' },
} as const;

type TradeKey = 'drywall' | 'electrical' | 'plumbing';

export function TradeMenuCards({
  onSelect,
  onOpenPhoto,
}: {
  onSelect: (key: TradeKey) => void;
  onOpenPhoto: (photo: { src: string; caption: string }) => void;
}) {
  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">{SERVICE_MENU_TITLE}</h2>
        <p className="text-center text-[#424242] mb-10">
          {`$${SERVICE_CALL} service call waived at $${CALL_WAIVER_MIN}+ labor • Texture included on drywall repairs`}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {TRADE_CARDS.map((card) => {
            const style = CARD_STYLE[card.key];
            const project = tradeCardProjects[card.key];
            return (
              <div key={card.key} className={`text-left ${style.bg} p-6 sm:p-8 rounded-2xl border ${style.border} h-full hover:shadow-md transition`}>
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-3xl font-black" style={{ color: style.color }}>{card.letter}</span>
                  <span className="text-xl font-bold text-[#1A1A1A]">{card.title}</span>
                </div>
                <div className="mb-5">
                  <ProjectPhotoSlider photos={project.photos} projectType={project.type} onOpen={onOpenPhoto} />
                </div>
                <ul className="space-y-3 text-[#424242] text-sm">
                  {card.items.map((item) => (
                    <li key={item.title} className="flex gap-2">
                      <span style={{ color: style.color }}>●</span>
                      <span>
                        <span className="font-semibold text-[#1A1A1A]">{item.title}:</span> {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onSelect(card.key)}
                  className="mt-5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFAB00] rounded"
                  style={{ color: style.color }}
                >
                  Get pricing →
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-12 bg-gradient-to-r from-[#0056B3] to-[#FFAB00] text-white p-8 sm:p-10 rounded-3xl text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-5">DEP Bundle Incentives</h3>
          <div className="max-w-md mx-auto space-y-3 text-left text-sm sm:text-base">
            <div>🎉 <strong>Triple Play</strong> — All three categories → 15% off labor</div>
            <div>⚡ <strong>Power Pair</strong> — Any two categories → 10% off labor</div>
            <div>✓ <strong>Service call waived</strong> when labor reaches ${CALL_WAIVER_MIN}</div>
            <div>🔥 <strong>While We&apos;re There</strong> — One small 5-minute task FREE with any booked service</div>
          </div>
        </div>
      </div>
    </section>
  );
}
