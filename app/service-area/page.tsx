import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFrame } from '../../components/SiteFrame';
import { CITY_ORDER, CITY_PAGES } from '../../lib/landingPages';
import { CALL_WAIVER_MIN, SERVICE_CALL } from '../../lib/pricing';
import { SERVICE_AREA_LINE, pageMetadata, shareImage } from '../../lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/service-area',
  title: 'Service Area | Chandler, Gilbert, Southwest Mesa & South Scottsdale | DEP Home Repair',
  description:
    'DEP Home Repair serves Chandler, Gilbert, southwest Mesa, south Scottsdale and nearby East Valley from a Chandler base. See what fits homes in each area.',
  shareTitle: 'Where DEP Home Repair works',
  image: shareImage('service-area', 'DEP Home Repair service area: Chandler, Gilbert, southwest Mesa, south Scottsdale'),
});

export default function ServiceAreaPage() {
  return (
    <SiteFrame>
      <section className="bg-gradient-to-br from-[#0056B3] via-[#00448F] to-[#1A1A1A] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm uppercase tracking-wide opacity-80 mb-3">Service area</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-5 leading-tight">Where I Work in the East Valley</h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">
            DEP Home Repair is based in Chandler and serves {SERVICE_AREA_LINE}. Not sure if you are in range? Text your cross streets.
          </p>
        </div>
      </section>
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 gap-5">
          {CITY_ORDER.map((key) => {
            const c = CITY_PAGES[key];
            return (
              <Link key={key} href={c.path} className="block bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-[#005683] transition">
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">{c.city}</h2>
                <p className="text-[#424242] text-sm mb-3">{c.blurb}</p>
                <span className="text-sm font-semibold text-[#005683]">Repairs in {c.city} →</span>
              </Link>
            );
          })}
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-10 text-center text-[#424242]">
          <p className="mb-6">
            Flat prices are the same in every area. Door work includes the visit; drywall, electrical, and plumbing have a ${SERVICE_CALL} service call that waives at ${CALL_WAIVER_MIN} labor.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="sms:6025981988" className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-7 py-3.5 rounded-full font-bold transition">Text for a quote</a>
            <a href="tel:6025981988" className="inline-block border border-[#005683]/40 hover:border-[#005683] text-[#005683] px-7 py-3 rounded-full font-semibold transition">Call 602-598-1988</a>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
