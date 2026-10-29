import Link from 'next/link';
import { SERVICE_AREA_LINE } from '../lib/seo';

const SERVICES: [string, string][] = [
  ['/drywall', 'Drywall'],
  ['/electrical', 'Electrical'],
  ['/plumbing', 'Plumbing'],
  ['/door-adjustment-repair', 'Door Adjustment & Repair'],
  ['/security-door-repair', 'Security Doors'],
  ['/pre-monsoon-prep', 'Pre-Monsoon Prep'],
  ['/stucco-crack-repair', 'Stucco Crack Sealing'],
  ['/more-home-fixes', 'More Home Fixes'],
];

const AREAS: [string, string][] = [
  ['/service-area/chandler', 'Chandler'],
  ['/service-area/gilbert', 'Gilbert'],
  ['/service-area/southwest-mesa', 'Southwest Mesa'],
  ['/service-area/south-scottsdale', 'South Scottsdale'],
];

/** Shared footer for the home page and every inner page. Keeps the required "Not a licensed contractor." line. */
export function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#1A1A1A] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        <div>
          <p className="font-bold text-lg mb-2">DEP Home Repair</p>
          <p className="text-sm opacity-80">
            Drywall • Electrical • Plumbing
            <br />
            {SERVICE_AREA_LINE}
            <br />
            Not a licensed contractor.
          </p>
        </div>
        <div className="text-sm space-y-2">
          <p className="font-semibold opacity-90 mb-1">Services</p>
          {SERVICES.map(([href, label]) => (
            <div key={href}><Link href={href} className="hover:text-[#FFAB00]">{label}</Link></div>
          ))}
        </div>
        <div className="text-sm space-y-2">
          <p className="font-semibold opacity-90 mb-1"><Link href="/service-area" className="hover:text-[#FFAB00]">Service area</Link></p>
          {AREAS.map(([href, label]) => (
            <div key={href}><Link href={href} className="hover:text-[#FFAB00]">{label}</Link></div>
          ))}
        </div>
        <div className="text-sm space-y-2">
          <p className="font-semibold opacity-90 mb-1">Contact</p>
          <div><a href="tel:6025981988" className="hover:text-[#FFAB00]">602-598-1988</a></div>
          <div><a href="sms:6025981988" className="hover:text-[#FFAB00]">Text Jason</a></div>
          <div><a href="mailto:info@dephomerepair.com" className="hover:text-[#FFAB00]">info@dephomerepair.com</a></div>
          <div><Link href="/#quote" className="hover:text-[#FFAB00]">Instant Quote</Link></div>
        </div>
      </div>
      <p className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 text-xs opacity-60 text-center md:text-left">
        Jobs are kept under $1,000 total, labor and materials, with no permits.
      </p>
    </footer>
  );
}
