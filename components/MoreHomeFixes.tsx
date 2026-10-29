import Link from 'next/link';
import { MORE_HOME_FIXES, MORE_HOME_FIXES_INTRO, NOT_OFFERED, SEASONAL_PACKAGES, SEASONAL_PACKAGES_NOTE } from '../lib/moreHomeFixes';

type Props = {
  /** Compact homepage teaser vs. full /more-home-fixes page content */
  variant?: 'section' | 'page';
};

function QuoteCtas({ quoteHref }: { quoteHref: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a href="sms:6025981988" className="inline-block bg-[#005683] hover:bg-[#00448F] text-white px-6 py-3 rounded-full font-semibold transition text-center">Text for a quote</a>
      <a href="tel:6025981988" className="inline-block border border-[#005683]/40 hover:border-[#005683] text-[#005683] px-6 py-3 rounded-full font-semibold transition text-center">Call 602-598-1988</a>
      <Link href={quoteHref} className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-6 py-3 rounded-full font-semibold transition text-center">Get Quote</Link>
    </div>
  );
}

export function MoreHomeFixes({ variant = 'section' }: Props) {
  const isPage = variant === 'page';
  const HeadingTag = isPage ? 'h1' : 'h2';
  const SubTag = isPage ? 'h2' : 'h3';
  const quoteHref = '/#quote';

  return (
    <section id="more-home-fixes" aria-labelledby="more-home-fixes-heading" className={isPage ? 'py-14 sm:py-16 bg-white' : 'py-12 sm:py-14 bg-[#F8FAFC] border-t border-slate-100'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <HeadingTag id="more-home-fixes-heading" className={`${isPage ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} font-bold text-center mb-3 text-[#1A1A1A]`}>
          More Home Fixes
        </HeadingTag>
        <p className="text-center text-[#424242] mb-8 max-w-2xl mx-auto">{MORE_HOME_FIXES_INTRO}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MORE_HOME_FIXES.map((g) => (
            <div key={g.group} className="bg-white border border-slate-200 rounded-2xl p-5">
              <SubTag className={`text-sm font-semibold uppercase tracking-wide text-[#005683] ${g.note ? 'mb-1' : 'mb-3'}`}>{g.group}</SubTag>
              {g.note && <p className="text-xs font-semibold text-[#1A1A1A] mb-3">{g.note}</p>}
              <ul className="space-y-1.5 text-sm text-[#424242] list-disc pl-5">
                {g.jobs.map((job) =>
                  typeof job === 'string' ? (
                    <li key={job}>{job}</li>
                  ) : (
                    <li key={job.label}>
                      {job.label} <span className="font-semibold text-[#005683] whitespace-nowrap">{job.price}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm text-center text-[#424242]">
          <span className="font-semibold text-[#1A1A1A]">Not offered:</span> {NOT_OFFERED}.
        </p>

        <div className="mt-10">
          <SubTag className={`${isPage ? 'text-2xl' : 'text-xl'} font-bold text-center text-[#1A1A1A] mb-4`}>Seasonal Packages</SubTag>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SEASONAL_PACKAGES.map((pkg) => (
              <div key={pkg.name} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
                <div className="font-bold text-[#1A1A1A] mb-2">{pkg.name}</div>
                <ul className="space-y-1 text-sm text-[#424242] list-disc pl-5 flex-1">
                  {pkg.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {pkg.price ? (
                  <div className="mt-4">
                    <div className="text-lg font-bold text-[#005683]">{pkg.price}</div>
                    {pkg.priceNote && <div className="text-xs text-slate-500 mt-1">{pkg.priceNote}</div>}
                  </div>
                ) : (
                  <div className="mt-4 text-sm font-semibold text-[#005683]">Ask for package price</div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-center text-slate-500">{SEASONAL_PACKAGES_NOTE}</p>
        </div>

        <div className="mt-10 text-center">
          <p className="font-semibold text-[#1A1A1A] mb-4">Text or call for a quote</p>
          <QuoteCtas quoteHref={quoteHref} />
          {!isPage && (
            <Link href="/more-home-fixes" className="mt-5 inline-block text-sm font-semibold text-[#005683] underline underline-offset-2 hover:text-[#00448F]">
              See all home fixes and seasonal packages →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
