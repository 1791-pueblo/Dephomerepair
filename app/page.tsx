'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [quote, setQuote] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = {
    drywall: [
      { name: 'Small Patch (up to hand-sized)', price: 200 },
      { name: 'Medium Patch', price: 350 },
      { name: 'Large Patch / Section Repair', price: 675 },
    ],
    electrical: [
      { name: 'Outlet Replacement', price: 135 },
      { name: 'Switch Replacement', price: 135 },
      { name: 'GFCI Replacement', price: 175 },
      { name: 'Dimmer Install', price: 175 },
      { name: 'Light Fixture Replacement', price: 225 },
      { name: 'Ceiling Fan Installation', price: 325 },
    ],
    plumbing: [
      { name: 'Faucet Replacement', price: 262 },
      { name: 'Toilet Repair', price: 187 },
      { name: 'Toilet Replacement', price: 375 },
      { name: 'Supply Line Replacement', price: 175 },
      { name: 'Shutoff Valve Replacement', price: 262 },
      { name: 'Garbage Disposal Replacement', price: 337 },
      { name: 'Drain Clearing / Snaking', price: 187 },
      { name: 'Dead Outlet / Switch Troubleshooting', price: 175 },
    ],
  };

  const allServices = [
    ...services.drywall,
    ...services.electrical,
    ...services.plumbing,
  ];

  const calculateQuote = () => {
    let base = 100; // Service call/diagnostic midpoint
    let breakdown: string[] = ['Service Call / Diagnostic: $100'];

    selectedServices.forEach((serviceName) => {
      const service = allServices.find((s) => s.name === serviceName);
      if (service) {
        base += service.price;
        breakdown.push(`${service.name}: $${service.price}`);
      }
    });

    // Bundle discounts
    const hasDrywall = selectedServices.some((s) =>
      services.drywall.map((d) => d.name).includes(s)
    );
    const hasElectrical = selectedServices.some((s) =>
      services.electrical.map((e) => e.name).includes(s)
    );
    const hasPlumbing = selectedServices.some((s) =>
      services.plumbing.map((p) => p.name).includes(s)
    );

    if (hasDrywall && hasElectrical && hasPlumbing) {
      // Triple Play: waive service call fee
      base -= 100;
      breakdown.push('🎉 Triple Play — Service Call waived!');
    } else if (
      (hasDrywall && hasElectrical) ||
      (hasDrywall && hasPlumbing) ||
      (hasElectrical && hasPlumbing)
    ) {
      // Power Pair: 10% OFF
      base = Math.round(base * 0.9);
      breakdown.push('⚡ Power Pair — 10% OFF applied');
    }

    setQuote({
      total: base,
      breakdown,
      message: description
        ? `Based on: "${description}"`
        : 'Instant estimate ready!',
    });
  };

  const handleTallySubmit = () => {
    // Prepare quote data for Tally
    const quoteData = {
      services: selectedServices.join(', '),
      description: description,
      estimatedPrice: quote?.total || 0,
    };

    // Open Tally form in new window
    const tallyUrl = new URL('https://tally.so/r/QKYRWA');
    tallyUrl.searchParams.append('services', quoteData.services);
    tallyUrl.searchParams.append('description', quoteData.description);
    tallyUrl.searchParams.append('estimatedPrice', quoteData.estimatedPrice);

    window.open(tallyUrl.toString(), '_blank');
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="DEP Home Repair" 
              className="h-16 w-auto"
            />
          </div>
          <a
            href="#quote"
            className="bg-[#FFAB00] hover:bg-amber-500 text-black px-6 py-3 rounded-full font-semibold text-sm"
          >
            Instant Quote
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#005683] to-[#1A1A1A] text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8 flex justify-center">
            <img 
              src="/logo.png" 
              alt="DEP Home Repair" 
              className="h-32 w-auto"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Home.
            <br />
            Fixed Right. Fast.
          </h1>
          <p className="text-xl mb-10">
            Solo Chandler expert in drywall, electrical & plumbing.
            <br />
            Instant quotes • Same-day booking • Guaranteed work.
          </p>
          <a
            href="#quote"
            className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-10 py-4 rounded-full text-xl font-bold"
          >
            Get Your Instant Quote Now →
          </a>
          <div className="mt-8 text-sm opacity-75">
            602-598-1988 • info@dephomerepair.com
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A]">
            DEP Service Menu
          </h2>
          <p className="text-center text-[#424242] mb-12">
            Professional • Reliable • Chandler & East Valley
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Drywall */}
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="text-2xl font-bold text-[#005683] mb-6">
                D — Drywall & Finishing
              </div>
              <ul className="space-y-4 text-[#424242]">
                {services.drywall.map((s) => (
                  <li key={s.name}>
                    ✓ {s.name} <span className="text-sm text-gray-500">${s.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Electrical */}
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="text-2xl font-bold text-[#FFAB00] mb-6">
                E — Electrical & Smart Home
              </div>
              <ul className="space-y-4 text-[#424242]">
                {services.electrical.map((s) => (
                  <li key={s.name}>
                    ✓ {s.name} <span className="text-sm text-gray-500">${s.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Plumbing */}
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="text-2xl font-bold text-[#424242] mb-6">
                P — Plumbing & Fixtures
              </div>
              <ul className="space-y-4 text-[#424242]">
                {services.plumbing.map((s) => (
                  <li key={s.name}>
                    ✓ {s.name} <span className="text-sm text-gray-500">${s.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bundles */}
          <div className="mt-16 bg-gradient-to-r from-[#005683] to-[#FFAB00] text-white p-10 rounded-3xl text-center">
            <h3 className="text-3xl font-bold mb-6">DEP Bundle Incentives</h3>
            <div className="max-w-md mx-auto space-y-4 text-left">
              <div>
                🔥 Triple Play — Book all three categories → Service Call Waived!
              </div>
              <div>
                ⚡ Power Pair — Any two services → 10% OFF total
              </div>
              <div>
                🔥 While We're There — One small 5-minute task FREE with any
                booked service
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Quote */}
      <section id="quote" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-3">
            Instant Quote in Seconds
          </h2>
          <p className="text-center text-[#424242] mb-12">
            Tell us what you need — get a fair price instantly
          </p>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <textarea
              className="w-full h-32 border border-gray-300 rounded-2xl p-6 text-lg"
              placeholder="Example: 4x6 drywall patch in bedroom ceiling + replace 3 outlets"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="mt-8">
              <p className="font-medium mb-4 text-[#1A1A1A]">
                Or pick services:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.drywall.map((s) => (
                  <label
                    key={s.name}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(s.name)}
                      onChange={() => {
                        if (selectedServices.includes(s.name)) {
                          setSelectedServices(
                            selectedServices.filter((x) => x !== s.name)
                          );
                        } else {
                          setSelectedServices([
                            ...selectedServices,
                            s.name,
                          ]);
                        }
                      }}
                      className="w-5 h-5 accent-[#FFAB00]"
                    />
                    {s.name}
                  </label>
                ))}
                {services.electrical.map((s) => (
                  <label
                    key={s.name}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(s.name)}
                      onChange={() => {
                        if (selectedServices.includes(s.name)) {
                          setSelectedServices(
                            selectedServices.filter((x) => x !== s.name)
                          );
                        } else {
                          setSelectedServices([
                            ...selectedServices,
                            s.name,
                          ]);
                        }
                      }}
                      className="w-5 h-5 accent-[#FFAB00]"
                    />
                    {s.name}
                  </label>
                ))}
                {services.plumbing.map((s) => (
                  <label
                    key={s.name}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(s.name)}
                      onChange={() => {
                        if (selectedServices.includes(s.name)) {
                          setSelectedServices(
                            selectedServices.filter((x) => x !== s.name)
                          );
                        } else {
                          setSelectedServices([
                            ...selectedServices,
                            s.name,
                          ]);
                        }
                      }}
                      className="w-5 h-5 accent-[#FFAB00]"
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={calculateQuote}
              className="mt-10 w-full bg-[#005683] hover:bg-blue-900 text-white py-5 rounded-2xl font-bold text-xl transition"
            >
              Get My Instant Quote →
            </button>

            {quote && (
              <div className="mt-10 p-8 bg-[#F8FAFC] rounded-2xl border border-[#FFAB00]">
                <div className="text-5xl font-bold text-[#1A1A1A]">
                  ${quote.total}
                </div>
                <div className="text-[#FFAB00] font-medium mt-1">
                  Estimated total • Chandler area
                </div>
                <div className="mt-6 space-y-2 text-sm">
                  {quote.breakdown.map((line: string, i: number) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t text-xs text-[#424242]">
                  {quote.message}
                </div>
                <button
                  onClick={handleTallySubmit}
                  className="mt-6 w-full bg-[#FFAB00] hover:bg-amber-600 py-4 rounded-2xl font-bold transition"
                >
                  Book This Job Now
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-4 flex justify-center">
            <img 
              src="/logo.png" 
              alt="DEP Home Repair" 
              className="h-20 w-auto"
            />
          </div>
          <div>
            Home-Smart Solutions • Drywall • Electric • Plumbing
          </div>
          <div className="mt-8 text-sm opacity-75">
            602-598-1988 • info@dephomerepair.com
            <br />
            Licensed • Bonded • Insured • Chandler, AZ
          </div>
        </div>
      </footer>
    </>
  );
}
