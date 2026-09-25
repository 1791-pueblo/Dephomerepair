'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ProjectPhotoSlider } from './ProjectPhotoSlider';
import { SiteFrame } from './SiteFrame';
import { SERVICE_PAGES, projectsForService, type ServiceKey } from '../lib/servicePages';

export function ServicePageView({ serviceKey }: { serviceKey: ServiceKey }) {
  const page = SERVICE_PAGES[serviceKey];
  const projects = projectsForService(serviceKey);
  const others = (['drywall', 'electrical', 'plumbing'] as ServiceKey[]).filter((key) => key !== serviceKey);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  return (
    <SiteFrame>
      <section className="bg-gradient-to-br from-[#0056B3] via-[#00448F] to-[#1A1A1A] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm uppercase tracking-wide opacity-80 mb-3">DEP Home Repair • Chandler & East Valley</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">{page.h1}</h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto mb-8">{page.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/?trade=${page.slug}#quote`} className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-8 py-4 rounded-full text-lg font-bold transition shadow-lg">Get pricing →</Link>
            <a href="tel:6025981988" className="inline-block border-2 border-white/40 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold transition">Call 602-598-1988</a>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">{page.startingLabel}</div>
            <div className="text-3xl font-bold text-[#1A1A1A] mt-1">{page.startingPrice}</div>
            <div className="text-sm text-[#424242] mt-2">$95 service call waives at $250 labor on the same visit</div>
          </div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-3xl font-black" style={{ color: page.letterColor }}>{page.letter}</span>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{page.title}</h2>
          </div>
          <ul className="space-y-4 text-[#424242]">
            {page.items.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span style={{ color: page.letterColor }}>●</span>
                <span>
                  <span className="font-semibold text-[#1A1A1A]">{item.title}</span>
                  <span className="block mt-0.5">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link href={`/?trade=${page.slug}#quote`} className="mt-8 inline-block font-semibold" style={{ color: page.letterColor }}>
            Open Instant Quote for {page.title} →
          </Link>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">Recent {page.title.toLowerCase()} work</h2>
          <p className="text-[#424242] mb-8">Real jobs from Chandler and East Valley homes.</p>
          {projects.map((project) => project && (
            <div key={project.id} className="mb-12 last:mb-0">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{project.title}</h3>
              <p className="text-sm text-[#424242] mb-4">{project.description}</p>
              <ProjectPhotoSlider photos={project.photos} projectType={project.type} onOpen={setLightbox} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Need more than one trade?</h2>
          <p className="text-[#424242] mb-6">Power Pair is 10% off labor for two trades. Triple Play is 15% off when drywall, electrical, and plumbing are booked together.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {others.map((key) => (
              <Link key={key} href={`/${SERVICE_PAGES[key].slug}`} className="px-5 py-2.5 rounded-full bg-slate-100 font-semibold text-[#1A1A1A] hover:bg-slate-200">
                {SERVICE_PAGES[key].title}
              </Link>
            ))}
            <Link href={`/?trade=${page.slug}#quote`} className="px-5 py-2.5 rounded-full bg-[#FFAB00] font-semibold text-black">Get a bundled quote</Link>
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setLightbox(null)} className="absolute -top-10 right-0 text-white text-3xl font-bold">×</button>
            <div className="relative w-full aspect-[4/3]">
              <Image src={lightbox.src} alt={lightbox.caption} fill sizes="(max-width: 768px) 100vw, 48rem" className="object-contain rounded-2xl" priority />
            </div>
            <p className="mt-3 text-center text-white text-sm opacity-80">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </SiteFrame>
  );
}
