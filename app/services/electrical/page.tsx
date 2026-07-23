import Image from 'next/image';
import Link from 'next/link';

export default function ElectricalPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#0056B3] text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Electrical Services</h1>
          <p className="text-2xl max-w-3xl mx-auto">Safe, code-compliant electrical work for your home — from simple repairs to full upgrades.</p>
          <div className="mt-10 flex justify-center gap-6">
            <a
              href="tel:6025981988"
              aria-label="Call DEP Home Repair at (602) 598-1988"
              className="bg-[#FFAB00] hover:bg-orange-500 px-10 py-4 rounded-2xl text-xl font-semibold text-black transition"
            >
              Call (602) 598-1988
            </a>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-2xl font-semibold text-[#0056B3] mb-4">Outlets &amp; Switches</h3>
            <p className="text-gray-600">GFCI protection, smart outlets, dimmers, and full rewiring.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-2xl font-semibold text-[#0056B3] mb-4">Lighting &amp; Ceiling Fans</h3>
            <p className="text-gray-600">Recessed lights, fixtures, fan installs, and smart lighting.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-2xl font-semibold text-[#0056B3] mb-4">Panel Upgrades &amp; Breakers</h3>
            <p className="text-gray-600">Safety inspections, panel work, and circuit additions.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-2xl font-semibold text-[#0056B3] mb-4">Troubleshooting &amp; Repairs</h3>
            <p className="text-gray-600">No-power issues, flickering lights, and emergency fixes.</p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-10">Recent Electrical Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Replace these images with real files under /public/projects/ */}
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden relative">
              <Image
                src="/projects/electrical-panel.jpg"
                alt="Electrical panel work"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden relative">
              <Image
                src="/projects/ceiling-fan.jpg"
                alt="Ceiling fan installation"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden relative">
              <Image
                src="/projects/outlet-repair.jpg"
                alt="Outlet and wiring repair"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bundles & Pricing Teaser */}
      <div className="bg-[#424242] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Service Bundles Save You Money</h2>
          <p className="text-xl mb-8">Triple Play (Drywall + Electric + Plumbing) – 15% off</p>
          <a
            href="tel:6025981988"
            aria-label="Get your quote today by calling 602-598-1988"
            className="inline-block bg-[#FFAB00] text-black font-semibold px-10 py-4 rounded-2xl text-lg"
          >
            Get Your Quote Today
          </a>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-12 bg-white">
        <p className="text-2xl font-medium">Licensed • Insured • Arizona Local</p>
        <div className="mt-8 flex justify-center gap-8 text-sm">
          <a href="tel:6025981988" aria-label="Call 602-598-1988">📞 602-598-1988</a>
          <a href="mailto:info@dephomerepair.com" aria-label="Email info at dephomerepair dot com">✉️ info@dephomerepair.com</a>
        </div>
      </div>
    </div>
  );
}
