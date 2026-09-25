import Image from 'next/image';
import Link from 'next/link';

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="DEP Home Repair" width={140} height={56} className="h-12 sm:h-14 w-auto" priority />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1A1A1A]">
            <Link href="/drywall" className="hover:text-[#0056B3] transition">Drywall</Link>
            <Link href="/electrical" className="hover:text-[#0056B3] transition">Electrical</Link>
            <Link href="/plumbing" className="hover:text-[#0056B3] transition">Plumbing</Link>
            <Link href="/#quote" className="hover:text-[#0056B3] transition">Instant Quote</Link>
            <Link href="/#quote" className="bg-[#FFAB00] hover:bg-amber-500 text-black px-5 py-2.5 rounded-full font-semibold text-sm transition shadow-sm">Get Quote</Link>
          </nav>
          <Link href="/#quote" className="md:hidden text-sm font-semibold text-[#0056B3]">Quote</Link>
        </div>
      </header>
      <main className="pb-16 md:pb-0">{children}</main>
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_18px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-3 gap-2 p-2">
          <a href="tel:6025981988" className="text-center bg-[#0056B3] text-white rounded-xl py-2.5 text-xs font-semibold">Call</a>
          <a href="sms:6025981988" className="text-center bg-slate-100 text-[#1A1A1A] rounded-xl py-2.5 text-xs font-semibold">Text Jason</a>
          <Link href="/#quote" className="text-center bg-[#FFAB00] text-black rounded-xl py-2.5 text-xs font-semibold">Get Quote</Link>
        </div>
      </div>
      <footer id="contact" className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <p className="font-bold text-lg mb-2">DEP Home Repair</p>
            <p className="text-sm opacity-80">Drywall • Electrical • Plumbing<br />Chandler, AZ & East Valley<br />Licensed • Bonded • Insured</p>
          </div>
          <div className="text-sm space-y-2">
            <div><Link href="/drywall" className="hover:text-[#FFAB00]">Drywall</Link></div>
            <div><Link href="/electrical" className="hover:text-[#FFAB00]">Electrical</Link></div>
            <div><Link href="/plumbing" className="hover:text-[#FFAB00]">Plumbing</Link></div>
            <div><Link href="/#quote" className="hover:text-[#FFAB00]">Instant Quote</Link></div>
          </div>
          <div className="text-sm space-y-2">
            <div><a href="tel:6025981988" className="hover:text-[#FFAB00]">602-598-1988</a></div>
            <div><a href="mailto:info@dephomerepair.com" className="hover:text-[#FFAB00]">info@dephomerepair.com</a></div>
          </div>
        </div>
      </footer>
    </>
  );
}
