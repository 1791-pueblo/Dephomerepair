'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

type Photo = { src: string; caption: string };

export function ProjectPhotoSlider({
  photos,
  projectType,
  onOpen,
}: {
  photos: Photo[];
  projectType: 'sequence' | 'before-after' | 'single';
  onOpen: (photo: Photo) => void;
}) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const swiped = useRef(false);
  const total = photos.length;

  if (total === 0) return null;

  if (total === 1) {
    const photo = photos[0];
    return (
      <button
        type="button"
        onClick={() => onOpen(photo)}
        className="group relative aspect-[4/3] max-w-md overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#FFAB00]"
        aria-label={`View photo: ${photo.caption}`}
      >
        <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 640px) 100vw, 28rem" className="object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">✓ Completed</span>
      </button>
    );
  }

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + total) % total);
  const photo = photos[index];

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    swiped.current = false;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const delta = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) < 40) return;
    swiped.current = true;
    go(delta < 0 ? 1 : -1);
  };

  return (
    <div className="relative max-w-3xl">
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-100 shadow-sm bg-slate-50"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          onClick={() => {
            if (swiped.current) return;
            onOpen(photo);
          }}
          className="absolute inset-0 z-0 focus:outline-none focus:ring-2 focus:ring-[#FFAB00] rounded-2xl"
          aria-label={`View photo: ${photo.caption}`}
        >
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            sizes="(max-width: 768px) 100vw, 48rem"
            className="object-cover"
            loading="lazy"
          />
        </button>

        {projectType === 'before-after' && index === 0 && (
          <span className="absolute top-3 left-3 z-10 bg-slate-700/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">Before</span>
        )}
        {projectType === 'before-after' && index === 1 && (
          <span className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">After</span>
        )}
        {projectType === 'sequence' && index === 0 && (
          <span className="absolute top-3 left-3 z-10 bg-slate-700/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">Start</span>
        )}
        {projectType === 'sequence' && index === total - 1 && (
          <span className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">✓ Completed</span>
        )}

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center text-[#1A1A1A] transition text-xl"
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center text-[#1A1A1A] transition text-xl"
          aria-label="Next photo"
        >
          ›
        </button>
      </div>

      <p className="mt-3 text-sm text-[#424242] text-center min-h-[1.25rem]">{photo.caption}</p>
      <p className="text-center text-xs text-gray-400 mt-1">{index + 1} / {total}</p>

      <div className="mt-3 flex justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${i === index ? 'bg-[#005683]' : 'bg-slate-300 hover:bg-slate-400'}`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
