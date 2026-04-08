'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [quote, setQuote] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    'Professional Patching', 'Texture Matching', 'Corner Bead & Trim Repair', 'Full Surface Refresh',
    'Modern Fixture Install', 'Smart Home Upgrades', 'GFCI Outlet Install', 'Device Refresh',
    'Kitchen & Bath Updates', 'Toilet Repair & Install', 'Drain & Leak Care', 'Appliance Hookups'
  ];

  const calculateQuote = () => {
    let base = 95;
    let breakdown: string[] = ['Service Call: $95'];

    if (selectedServices.includes('Professional Patching')) { base += 250; breakdown.push('Drywall Patch: $250'); }
    if (selectedServices.includes('Texture Matching')) { base += 150; breakdown.push('Texture Matching: $150'); }
    if (selectedServices.includes('Full Surface Refresh')) { base += 450; breakdown.push('Full Surface Refresh: $450'); }
    if (selectedServices.includes('Modern Fixture Install')) { base += 175; breakdown.push('Fixture Install: $175'); }
    if (selectedServices.includes('GFCI Outlet Install')) { base += 125; breakdown.push('GFCI Outlet: $125'); }
    if (selectedServices.includes('Toilet Repair & Install')) { base += 225; breakdown.push('Toilet Repair: $225'); }
    if (selectedServices.includes('Drain & Leak Care')) { base += 195; breakdown.push('Drain/Leak: $195'); }

    const hasDrywall = selectedServices.some(s => ['Professional Patching','Texture Matching','Full Surface Refresh'].includes(s));
    const hasElectric = selectedServices.some(s => ['Modern Fixture Install','GFCI Outlet Install','Device Refresh'].includes(s));
    const hasPlumbing = selectedServices.some(s => ['Kitchen & Bath Updates','Toilet Repair & Install','Drain & Leak Care'].includes(s));

    if (hasDrywall && hasElectric && hasPlumbing) {
      base = Math.round(base * 0.85);
      breakdown.push('🎉 Triple Play 15% OFF applied');
    } else if ((hasDrywall && hasElectric) || (hasDrywall && hasPlumbing) || (hasElectric && hasPlumbing)) {
      base -= 95;
      breakdown.push('Power Pair — Service Call waived');
    }

    setQuote({
      total: base,
      breakdown,
      message: description ? `Based on: "${description}"` : 'Instant estimate ready!'
    });
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
      <Image
  src="/logo.png"
  alt="DEP Home Repair Logo"
  width={60}
  height={60}
  className="rounded-lg"
/>
            <div>
              <div className="font-bold text-xl">Home Repair</div>
              <div className="text-xs text-[#424242]">Home-Smart Solutions</div>
            </div>
          </div>
          <a href="#quote" className="bg-[#FFAB00] hover:bg-amber-500 text-black px-6 py-3 rounded-full font-semibold text-sm">
            Instant Quote
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0056B3] to-[#1A1A1A] text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xl mb-10">Solo Chandler expert in drywall, electrical & plumbing.<br />Instant quotes • Same-day booking • Guaranteed work.</p>
          <a href="#quote" className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-10 py-4 rounded-full text-xl font-bold">
            Get Your Instant Quote Now →
          </a>
          <div className="mt-8 text-sm opacity-75">602-598-1988 • info@dephomerepair.com</div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#1A1A1A]">DEP Service Menu</h2>
          <p className="text-center text-[#424242] mb-12">Professional • Reliable • Chandler & East Valley</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="text-2xl font-bold text-[#0056B3] mb-6">D — Drywall & Finishing</div>
              <ul className="space-y-4 text-[#424242]">
                <li>✓ Professional Patching</li>
                <li>✓ Texture Matching</li>
                <li>✓ Corner Bead & Trim Repair</li>
                <li>✓ Full Surface Refresh</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="text-2xl font-bold text-[#FFAB00] mb-6">E — Electrical & Smart Home</div>
              <ul className="space-y-4 text-[#424242]">
                <li>✓ Modern Fixture Install</li>
                <li>✓ Smart Home Upgrades</li>
                <li>✓ GFCI / Safety Upgrades</li>
                <li>✓ Device Refresh</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="text-2xl font-bold text-[#424242] mb-6">P — Plumbing & Fixtures</div>
              <ul className="space-y-4 text-[#424242]">
                <li>✓ Kitchen & Bath Updates</li>
                <li>✓ Toilet Repair & Install</li>
                <li>✓ Drain & Leak Care</li>
                <li>✓ Appliance Hookups</li>
              </ul>
            </div>
          </div>

          {/* Bundles */}
          <div className="mt-16 bg-gradient-to-r from-[#0056B3] to-[#FFAB00] text-white p-10 rounded-3xl text-center">
            <h3 className="text-3xl font-bold mb-6">DEP Bundle Incentives</h3>
            <div className="max-w-md mx-auto space-y-4 text-left">
              <div>🔥 Triple Play — Book all three categories → 15% OFF total labor</div>
              <div>🔥 Power Pair — Any two services → Service Call waived</div>
              <div>🔥 While We’re There — One small 5-minute task FREE with any booked service</div>
            </div>
          </div>
        </div>
      </section>{/* Google Calendar Availability */}
<section className="py-16 bg-white border-b">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-[#1A1A1A] mb-8">
      Check My Availability
    </h2>
    <div className="bg-gray-50 rounded-3xl p-4 shadow-sm">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=c_a8375dca9ebd4f5f83dbcefb7c23198879868d6811e2eecd0f5ed8696dd88c5b%40group.calendar.google.com&ctz=America/Phoenix"
        style={{ border: 0, width: "100%", height: "600px" }}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
    <p className="text-center text-sm text-[#424242] mt-6">
      Green = Available • Click a time slot to request it in the form below
    </p>
  </div>
</section>
{/* Quote Form + Calendar */}
<section id="quote" className="py-20 bg-[#F8FAFC]">
  <div className="max-w-4xl mx-auto px-6">
    
    {/* Tally Form Button */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">Get Your Quote or Book a Job</h2>
      <p className="text-[#424242] mb-10 max-w-2xl mx-auto">
        Fill out the form with job details and photos. Jason will review it quickly and get back to you with a fair quote and available time.
      </p>

      <button
        data-tally-open="QKYRWA"
        data-tally-emoji-text="🔨"
        data-tally-emoji-animation="wave"
        className="bg-[#0056B3] hover:bg-blue-700 text-white px-12 py-6 rounded-2xl font-bold text-xl inline-flex items-center gap-3 transition-all"
      >
        Open Quote & Booking Form →
      </button>

      <p className="text-sm text-[#424242] mt-8">
        Or call/text directly: <strong>602-598-1988</strong>
      </p>
    </div>

    {/* Google Calendar - Below the form */}
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-center text-[#1A1A1A] mb-8">
        Check My Availability
      </h3>
      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=c_a8375dca9ebd4f5f83dbcefb7c23198879868d6811e2eecd0f5ed8696dd88c5b%40group.calendar.google.com&ctz=America/Phoenix"
          style={{ border: 0, width: "100%", height: "620px" }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
      <p className="text-center text-sm text-[#424242] mt-6">
        Green blocks = Available • Click any open slot and then use the form above to request it
      </p>
    </div>

  </div>
</section>
{/* Quote & Booking Form with Tally Popup */}
<section id="quote" className="py-20 bg-[#F8FAFC]">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">Get Your Quote or Book a Job</h2>
    <p className="text-[#424242] mb-12 max-w-2xl mx-auto">
      Fill out the form below with job details and photos. Jason will review it quickly and get back to you with a fair quote and available time.
    </p>

    <button
      data-tally-open="QKYRWA"
      data-tally-emoji-text="🔨"
      data-tally-emoji-animation="wave"
      className="bg-[#0056B3] hover:bg-blue-700 text-white px-12 py-6 rounded-2xl font-bold text-xl inline-flex items-center gap-3 transition-all"
    >
      Open Quote & Booking Form →
    </button>

    <p className="text-sm text-[#424242] mt-8">
      Or call/text directly: <strong>602-598-1988</strong>
    </p>
  </div>
</section>

           
          
        
  

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-2">DEP Home Repair</div>
          <div>Home-Smart Solutions • Drywall • Electric • Plumbing</div>
          <div className="mt-8 text-sm opacity-75">
            602-598-1988 • info@dephomerepair.com<br />
            Licensed • Bonded • Insured • Chandler, AZ
          </div>
        </div>
      </footer>
    </>
  );
}
