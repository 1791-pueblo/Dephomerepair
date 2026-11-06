'use client';

import { drywallTextures } from '../lib/textures';

/** Distinct gallery section for drywall texture samples. Video-first; more named textures can be added over time. */
export function DrywallTextures() {
  if (drywallTextures.length === 0) return null;

  return (
    <section id="drywall-textures" className="py-16 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">Drywall Textures</h2>
        <p className="text-center text-[#424242] mb-10 sm:mb-12 max-w-2xl mx-auto">
          Examples of textures applied on real jobs. Matching the existing wall is part of every drywall repair.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {drywallTextures.map((texture) => (
            <article
              key={texture.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="relative aspect-[20/9] bg-slate-100">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster={texture.posterSrc}
                  aria-label={`${texture.name} drywall texture sample`}
                >
                  <source src={texture.videoSrc} type="video/mp4" />
                </video>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-[#1A1A1A]">{texture.name}</h3>
                  <span className="text-xs font-semibold bg-[#0056B3]/10 text-[#0056B3] px-3 py-1 rounded-full">
                    {texture.style}
                  </span>
                </div>
                <p className="text-sm text-[#424242] leading-relaxed">{texture.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
