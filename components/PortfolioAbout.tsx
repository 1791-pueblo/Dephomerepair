'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { ProjectPhotoSlider } from './ProjectPhotoSlider';
import { portfolioProjects } from '../lib/portfolio';

const TESTIMONIALS = [
  { name: 'Sarah M.', location: 'Chandler', text: 'Jason fixed a large drywall patch in my living room and matched the texture perfectly. Showed up on time, clean work, fair price. Highly recommend.', rating: 5 },
  { name: 'Mike R.', location: 'Gilbert', text: 'Needed several electrical updates and a new ceiling fan. Professional, knowledgeable, and explained everything clearly. Will use again.', rating: 5 },
  { name: 'Lisa T.', location: 'Mesa', text: 'Quick response on a plumbing issue. Honest pricing and quality work. Exactly what you want from a local tradesperson.', rating: 5 },
];

type Photo = { src: string; caption: string };

export function PortfolioAbout({
  lightbox,
  setLightbox,
}: {
  lightbox: Photo | null;
  setLightbox: Dispatch<SetStateAction<Photo | null>>;
}) {
  return (
    <>
      <section id="portfolio" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">Our Work</h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">Real projects from local homes — before, during & after. This is the kind of careful, clean work you can expect.</p>
          {portfolioProjects.map((project) => (
            <div key={project.id} className="mb-14 last:mb-0">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">{project.title}</h3>
                <span className="text-xs font-semibold bg-[#0056B3]/10 text-[#0056B3] px-3 py-1 rounded-full">{project.tag}</span>
              </div>
              <p className="text-[#424242] text-sm mb-6 max-w-2xl">{project.description}</p>
              <ProjectPhotoSlider photos={project.photos} projectType={project.type} onOpen={setLightbox} />
              {project.supportPhotos && project.supportPhotos.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Supporting details</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {project.supportPhotos.map((photo) => (
                      <button key={photo.src} type="button" onClick={() => setLightbox(photo)} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition" aria-label={`View photo: ${photo.caption}`}>
                        <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="mt-10 text-center">
            <a href="#quote" className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-black px-8 py-3.5 rounded-full font-semibold transition shadow-sm">Start a bundled quote →</a>
          </div>
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
            <p>Home-smart repairs for Chandler and the East Valley: drywall, electrical, and plumbing handled by one licensed tradesperson.</p>
            <p>The goal is simple. The patch matches. The outlet is safe. The leak is gone. You should not see the repair when it is done.</p>
            <p>You deal directly with the person doing the work, so the schedule stays clear, the communication stays simple, and bundled repairs get finished in one visit instead of three callbacks.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#0056B3]/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]"><span className="text-[#0056B3]">D</span>rywall</h3>
              <p className="text-sm text-[#424242]">Seamless repairs to expert installations — a finish that matches your home's interior.</p>
            </div>
            <div className="bg-white border border-[#FFAB00]/25 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]"><span className="text-[#FFAB00]">E</span>lectrical</h3>
              <p className="text-sm text-[#424242]">Safe, efficient power — lighting upgrades, smart-home work, wiring, and troubleshooting. The electrified E means your home stays connected and current.</p>
            </div>
            <div className="bg-white border border-[#424242]/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]"><span className="text-[#424242]">P</span>lumbing</h3>
              <p className="text-sm text-[#424242]">Reliable water flow for your home's vital systems — from minor leaks to fixture installations.</p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center text-[#424242] mt-8 space-y-4">
            <p>When a job needs more than one trade, DEP can handle the leak, the outlet, and the drywall patch in the same stop. That is what Power Pair and Triple Play are built for.</p>
            <p className="font-semibold text-[#1A1A1A]">Fair pricing. Clean work. Done right the first time.</p>
            <p>Call <a href="tel:6025981988" className="font-semibold text-[#0056B3] hover:underline">602-598-1988</a> and email <a href="mailto:info@dephomerepair.com" className="font-semibold text-[#0056B3] hover:underline">info@dephomerepair.com</a></p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:6025981988" className="inline-block bg-[#0056B3] hover:bg-[#00448F] text-white px-6 py-3 rounded-full font-semibold transition">Call 602-598-1988</a>
              <a href="mailto:info@dephomerepair.com" className="inline-block border border-[#0056B3]/30 hover:border-[#0056B3] text-[#0056B3] px-6 py-3 rounded-full font-semibold transition">Email info@dephomerepair.com</a>
            </div>
            <div className="text-sm text-[#1A1A1A] font-medium">Licensed • Bonded • Insured</div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">What Clients Say</h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">Real feedback from Chandler & East Valley homeowners who worked directly with Jason.</p>
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
    </>
  );
}
