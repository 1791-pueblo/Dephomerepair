'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { QUOTE_SERVICE_OPTIONS, type LeadOutcome } from '../lib/leadScoring';

const URGENCY = [
  { value: 'emergency', label: 'Today, it’s urgent' },
  { value: 'urgent', label: 'In the next few days' },
  { value: 'normal', label: 'Within 1–2 weeks' },
  { value: 'flexible', label: 'No rush' },
];
const CONTACT = ['Text', 'Call', 'Email'];
const SERVICE_PREFILL: Record<string, string> = {
  drywall: 'Drywall & Finishing',
  electrical: 'Electrical & Smart Home',
  plumbing: 'Plumbing & Fixtures',
  multiple: 'Multiple Services',
  other: 'Other Small Job',
};
const MAX_PHOTOS = 3;
const MAX_EDGE = 1280;
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || '';

const inputCls =
  'w-full border border-gray-300 rounded-xl p-3 text-base focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent';
const errCls = ' border-red-400 bg-red-50/40';

/** Shrink a photo in the browser to a small JPEG data URL before upload. */
async function resizePhoto(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new window.Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Could not read that photo.'));
      el.src = url;
    });
    const scale = Math.min(1, MAX_EDGE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
    let quality = 0.72;
    let data = canvas.toDataURL('image/jpeg', quality);
    while (data.length > 1_000_000 && quality > 0.4) {
      quality -= 0.12;
      data = canvas.toDataURL('image/jpeg', quality);
    }
    return data;
  } finally {
    URL.revokeObjectURL(url);
  }
}

type Fields = {
  name: string;
  phone: string;
  email: string;
  service: string;
  description: string;
  location: string;
  urgency: string;
  contactMethod: string;
  website: string; // honeypot
};

export function QuoteRequestForm() {
  const params = useSearchParams();
  const [f, setF] = useState<Fields>({
    name: '', phone: '', email: '', service: '', description: '', location: '', urgency: '', contactMethod: 'Text', website: '',
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoMsg, setPhotoMsg] = useState('');
  const [bad, setBad] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ outcome: LeadOutcome; firstName: string } | null>(null);
  const startedAt = useRef(0);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const pre = SERVICE_PREFILL[params.get('service') || ''];
    if (pre) setF((prev) => ({ ...prev, service: pre }));
  }, [params]);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }));
    setBad((prev) => prev.filter((b) => b !== k));
  };

  const addPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) => file.type.startsWith('image/'));
    e.target.value = '';
    const room = MAX_PHOTOS - photos.length;
    if (!files.length || room <= 0) return;
    setPhotoMsg(files.length > room ? `Up to ${MAX_PHOTOS} photos. We kept the first ${room}.` : '');
    try {
      const resized = await Promise.all(files.slice(0, room).map(resizePhoto));
      setPhotos((prev) => [...prev, ...resized].slice(0, MAX_PHOTOS));
    } catch {
      setPhotoMsg('One of those photos could not be read. Try a different one, or text it to us.');
    }
  };

  const validate = () => {
    const b: string[] = [];
    if (f.name.trim().length < 2) b.push('name');
    if (f.phone.replace(/\D/g, '').length < 10) b.push('phone');
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) b.push('email');
    if (f.contactMethod === 'Email' && !f.email) b.push('email');
    if (!f.service) b.push('service');
    if (f.description.trim().length < 10) b.push('description');
    if (f.location.trim().length < 2) b.push('location');
    if (!f.urgency) b.push('urgency');
    return b;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const b = validate();
    setBad(b);
    if (b.length) {
      setError('Please fill in the highlighted fields.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, photos, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (Array.isArray(data.fields)) setBad(data.fields);
        setError(data.error || 'Something went wrong. Please call or text 602-598-1988.');
        return;
      }
      setDone({ outcome: data.outcome, firstName: data.firstName || f.name.trim().split(' ')[0] });
      setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch {
      setError('We could not send that. Please check your connection, or call or text 602-598-1988.');
    } finally {
      setSending(false);
    }
  };

  if (done) {
    const name = done.firstName ? `, ${done.firstName}` : '';
    return (
      <div ref={topRef} className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 text-3xl flex items-center justify-center mx-auto mb-4">✓</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">Thanks{name}. We got your request.</h2>
        {done.outcome === 'book' && (
          <>
            <p className="text-[#424242] mb-6">This looks like a job we can help with.</p>
            {BOOKING_URL ? (
              <>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-8 py-4 rounded-full text-lg font-bold transition shadow-lg">
                  Pick a time for your estimate →
                </a>
                <p className="text-sm text-gray-500 mt-4">Don’t see a time that works? We’ll text you to find one.</p>
              </>
            ) : (
              <p className="text-lg font-semibold text-[#1A1A1A]">We’ll text you within one business day to schedule.</p>
            )}
          </>
        )}
        {done.outcome === 'confirm' && (
          <p className="text-[#424242] text-lg">We’ll reach out to confirm a few details, usually within one business day.</p>
        )}
        {done.outcome === 'decline' && (
          <p className="text-[#424242] text-lg">
            From what you described, this may be outside the work we do or the area we cover right now. We’ll take a look and let you know either way.
          </p>
        )}
        <p className="text-sm text-[#424242] mt-8">
          Need us sooner? <a href="tel:6025981988" className="text-[#0056B3] font-semibold">Call</a> or{' '}
          <a href="sms:6025981988" className="text-[#0056B3] font-semibold">text</a> 602-598-1988.
        </p>
      </div>
    );
  }

  const cls = (k: string) => inputCls + (bad.includes(k) ? errCls : '');

  return (
    <div ref={topRef}>
    <form onSubmit={submit} noValidate className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100 space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="q-name" className="block text-sm font-medium text-[#424242] mb-1.5">Your name</label>
          <input id="q-name" autoComplete="name" value={f.name} onChange={set('name')} className={cls('name')} maxLength={80} />
        </div>
        <div>
          <label htmlFor="q-phone" className="block text-sm font-medium text-[#424242] mb-1.5">Phone</label>
          <input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} placeholder="480-555-0100" className={cls('phone')} maxLength={30} />
        </div>
      </div>
      <div>
        <label htmlFor="q-email" className="block text-sm font-medium text-[#424242] mb-1.5">
          Email <span className="font-normal text-gray-400">{f.contactMethod === 'Email' ? '' : '(optional)'}</span>
        </label>
        <input id="q-email" type="email" inputMode="email" autoComplete="email" value={f.email} onChange={set('email')} className={cls('email')} maxLength={120} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="q-service" className="block text-sm font-medium text-[#424242] mb-1.5">What do you need?</label>
          <select id="q-service" value={f.service} onChange={set('service')} className={cls('service')}>
            <option value="">Choose one…</option>
            {QUOTE_SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="q-location" className="block text-sm font-medium text-[#424242] mb-1.5">ZIP code or city</label>
          <input id="q-location" autoComplete="postal-code" value={f.location} onChange={set('location')} placeholder="85224 or Chandler" className={cls('location')} maxLength={80} />
        </div>
      </div>
      <div>
        <label htmlFor="q-desc" className="block text-sm font-medium text-[#424242] mb-1.5">Describe the job</label>
        <textarea id="q-desc" rows={4} value={f.description} onChange={set('description')} maxLength={1500} placeholder="e.g. Fist-size hole in the hallway wall from a door handle. Orange peel texture." className={cls('description') + ' resize-none'} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="q-urgency" className="block text-sm font-medium text-[#424242] mb-1.5">How soon?</label>
          <select id="q-urgency" value={f.urgency} onChange={set('urgency')} className={cls('urgency')}>
            <option value="">Choose one…</option>
            {URGENCY.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <fieldset>
          <legend className="block text-sm font-medium text-[#424242] mb-1.5">Best way to reach you</legend>
          <div className="grid grid-cols-3 gap-2">
            {CONTACT.map((c) => (
              <label key={c} className={`text-center rounded-xl border py-3 text-sm font-semibold cursor-pointer ${f.contactMethod === c ? 'bg-[#0056B3] border-[#0056B3] text-white' : 'border-gray-300 text-[#424242]'}`}>
                <input type="radio" name="contactMethod" value={c} checked={f.contactMethod === c} onChange={set('contactMethod')} className="sr-only" />
                {c}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <span className="block text-sm font-medium text-[#424242] mb-1.5">
          Photos <span className="font-normal text-gray-400">(optional, up to {MAX_PHOTOS})</span>
        </span>
        <div className="flex flex-wrap gap-3 items-center">
          {photos.map((src, i) => (
            <div key={i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Photo ${i + 1}`} className="w-20 h-20 object-cover rounded-xl border" />
              <button type="button" onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))} aria-label={`Remove photo ${i + 1}`} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#1A1A1A] text-white text-xs">×</button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-xs text-gray-500 cursor-pointer hover:border-[#FFAB00]">
              <span className="text-2xl leading-none">+</span>Add
              <input type="file" accept="image/*" multiple onChange={addPhotos} className="sr-only" />
            </label>
          )}
        </div>
        {photoMsg && <p className="text-xs text-amber-800 mt-2">{photoMsg}</p>}
      </div>

      {/* Honeypot: hidden from people, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="q-website">Website</label>
        <input id="q-website" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} />
      </div>

      {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>}

      <button type="submit" disabled={sending} className="w-full bg-[#0056B3] hover:bg-blue-900 disabled:opacity-60 text-white py-4 rounded-2xl font-bold text-lg transition shadow-md">
        {sending ? 'Sending…' : 'Send My Request →'}
      </button>
      <p className="text-xs text-gray-500 text-center leading-relaxed">
        We only use your info to reply about this job. Not a licensed contractor. We take on small repair jobs only, with no permit work.
      </p>
    </form>
    </div>
  );
}
