import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SiteFrame } from '../../components/SiteFrame';
import { QuoteRequestForm } from '../../components/QuoteRequestForm';
import { SERVICE_AREA_LINE, pageMetadata } from '../../lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/quote',
  title: 'Request an Estimate | DEP Home Repair | Chandler & East Valley',
  description:
    'Tell us about your drywall, electrical, or plumbing repair and add a few photos. We review every request and get back to you. Serving Chandler, Gilbert, southwest Mesa and south Scottsdale.',
  shareTitle: 'Request an estimate | DEP Home Repair',
});

export default function QuotePage() {
  return (
    <SiteFrame>
      <section className="bg-gradient-to-br from-[#0056B3] via-[#00448F] to-[#1A1A1A] text-white py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm uppercase tracking-wide opacity-80 mb-3">Request an estimate</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">Tell Us About the Job</h1>
          <p className="text-lg opacity-95 max-w-2xl mx-auto">
            A few details and a photo or two help us quote it right. Serving {SERVICE_AREA_LINE}.
          </p>
          <p className="text-sm opacity-80 mt-4">
            Rather talk? <a href="tel:6025981988" className="underline underline-offset-2">Call</a> or{' '}
            <a href="sms:6025981988" className="underline underline-offset-2">text</a> 602-598-1988.
          </p>
        </div>
      </section>
      <section className="py-10 sm:py-14 bg-[#F8FAFC]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Suspense fallback={null}>
            <QuoteRequestForm />
          </Suspense>
        </div>
      </section>
    </SiteFrame>
  );
}
