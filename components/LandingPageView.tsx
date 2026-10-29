import Image from 'next/image';
import Link from 'next/link';
import { SiteFrame } from './SiteFrame';
import { SITE_URL } from '../lib/seo';
import type { LandingPage, LandingLink } from '../lib/landingPages';

type Props = {
  page: LandingPage;
  /** Shown as a highlighted note under the intro (service-area pages). */
  areaNote?: string;
  /** Extra link row, e.g. the other service-area pages. */
  moreLinks?: { heading: string; links: LandingLink[] };
};

function Ctas() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a href="sms:6025981988" className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-7 py-3.5 rounded-full font-bold transition text-center shadow-lg">Text for a quote</a>
      <a href="tel:6025981988" className="inline-block border-2 border-white/40 hover:border-white text-white px-7 py-3 rounded-full font-semibold transition text-center">Call 602-598-1988</a>
    </div>
  );
}

export function LandingPageView({ page, areaNote, moreLinks }: Props) {
  const serviceLd = page.serviceName
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.serviceName,
        url: `${SITE_URL}${page.path}`,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: ['Chandler', 'Gilbert', 'Mesa', 'Scottsdale'].map((name) => ({ '@type': 'City', name })),
      }
    : null;

  return (
    <SiteFrame>
      {serviceLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />}

      <section className="bg-gradient-to-br from-[#0056B3] via-[#00448F] to-[#1A1A1A] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm uppercase tracking-wide opacity-80 mb-3">{page.eyebrow}</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-5 leading-tight">{page.h1}</h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto mb-8">{page.intro}</p>
          <Ctas />
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {page.priceBox && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-10 text-center">
              <div className="text-xs uppercase tracking-wide text-slate-600">{page.priceBox.label}</div>
              <div className="text-3xl font-bold text-[#1A1A1A] mt-1">{page.priceBox.price}</div>
              {page.priceBox.note && <div className="text-sm text-[#424242] mt-2">{page.priceBox.note}</div>}
            </div>
          )}
          {areaNote && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 text-[#1A1A1A] text-sm">
              <span className="font-semibold">Where I work: </span>
              {areaNote}
            </div>
          )}

          <div className="space-y-10">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">{section.heading}</h2>
                {section.prices && (
                  <ul className="divide-y divide-slate-200 border border-slate-200 rounded-2xl mb-3">
                    {section.prices.map((line) => (
                      <li key={line.label} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 p-4">
                        <span className="text-[#1A1A1A]">
                          {line.label}
                          {line.note && <span className="block text-sm text-[#424242] mt-0.5">{line.note}</span>}
                        </span>
                        <span className="font-semibold text-[#005683] sm:whitespace-nowrap">{line.price}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.priceNote && <p className="text-sm font-semibold text-[#1A1A1A] mb-3">{section.priceNote}</p>}
                {section.bullets && (
                  <ul className="space-y-2 text-[#424242] list-disc pl-5 mb-3">
                    {section.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
                {section.body?.map((p) => <p key={p} className="text-[#424242] leading-relaxed mb-3">{p}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.photos && page.photos.length > 0 && (
        <section className="py-14 sm:py-16 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {page.photosHeading && <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3 text-center">{page.photosHeading}</h2>}
            {page.photosIntro && <p className="text-[#424242] mb-8 text-center max-w-2xl mx-auto">{page.photosIntro}</p>}
            <div className={`grid gap-5 ${page.photos.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {page.photos.map((photo) => (
                <figure key={photo.src} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="relative w-full aspect-[3/4] bg-slate-100">
                    <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <figcaption className="p-4 text-sm text-[#424242]">{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.faqs && page.faqs.length > 0 && (
        <section className="py-14 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Questions</h2>
            <dl className="space-y-5">
              {page.faqs.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-[#1A1A1A]">{f.q}</dt>
                  <dd className="text-[#424242] mt-1">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="py-12 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Related</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {page.related.map((l) => (
              <Link key={l.href} href={l.href} className="px-5 py-2.5 rounded-full bg-white border border-slate-200 font-semibold text-[#1A1A1A] hover:bg-slate-100">{l.label}</Link>
            ))}
          </div>
          {moreLinks && (
            <>
              <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-4">{moreLinks.heading}</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {moreLinks.links.map((l) => (
                  <Link key={l.href} href={l.href} className="px-5 py-2.5 rounded-full bg-white border border-slate-200 font-semibold text-[#1A1A1A] hover:bg-slate-100">{l.label}</Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-14 bg-[#1A1A1A] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-3">One call, one flat price</h2>
          <p className="opacity-80 mb-6">Text a photo and a short description. You deal directly with the person who does the work.</p>
          <Ctas />
        </div>
      </section>
    </SiteFrame>
  );
}
