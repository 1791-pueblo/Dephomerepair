'use client';

import { useState } from 'react';

interface ServiceOption {
  name: string;
  price: number;
  category?: string;
  subcategories?: {
    [key: string]: ServiceSubOption[];
  };
}

interface ServiceSubOption {
  name: string;
  price: number;
  addons?: {
    [key: string]: number;
  };
}

export default function Home() {
  const [quote, setQuote] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [selectedServices, setSelectedServices] = useState<
    { service: string; selections: Record<string, string>; price: number }[]
  >([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  const services: ServiceOption[] = [
    {
      name: 'Modern Fixture Install',
      price: 0,
      subcategories: {
        'Ceiling Fan': [
          { name: 'New Installation', price: 400 },
          { name: 'Replacement', price: 275 },
          { name: 'New with Wall Switch Control', price: 550 },
        ],
        'Recessed LED Lights': [
          {
            name: 'New Installation (1 light)',
            price: 250,
            addons: { 'Additional Light': 85 },
          },
        ],
        'Low Voltage Lighting': [
          { name: 'New Installation', price: 400 },
        ],
      },
    },
    {
      name: 'Smart Doorbell',
      price: 350,
    },
    {
      name: 'Drywall & Finishing',
      price: 0,
      subcategories: {
        'Repair': [
          { name: 'Small Patch', price: 200 },
          { name: 'Medium Patch', price: 350 },
          { name: 'Large Patch', price: 675 },
        ],
        'New Installation': [
          {
            name: 'Small',
            price: 200,
            addons: {
              'Skip Trowel': 25,
              'Knockdown': 25,
              'Orange Peel': 25,
            },
          },
          {
            name: 'Medium',
            price: 350,
            addons: {
              'Skip Trowel': 50,
              'Knockdown': 50,
              'Orange Peel': 50,
            },
          },
          {
            name: 'Large',
            price: 675,
            addons: {
              'Skip Trowel': 100,
              'Knockdown': 75,
              'Orange Peel': 75,
            },
          },
        ],
      },
    },
  ];

  const drywall = {
    'Professional Patching': 200,
    'Texture Matching': 150,
    'Corner Bead & Trim Repair': 175,
    'Full Surface Refresh': 400,
  };

  const electrical = {
    'Modern Fixture Install': 225,
    'Smart Home Upgrades': 300,
    'GFCI / Safety Upgrades': 175,
    'Device Refresh': 125,
  };

  const plumbing = {
    'Kitchen & Bath Updates': 275,
    'Toilet Repair & Install': 187,
    'Drain & Leak Care': 187,
    'Appliance Hookups': 225,
  };

  const displayServices = [
    {
      title: 'D — Drywall & Finishing',
      items: Object.entries(drywall).map(([name, price]) => ({
        name,
        price,
      })),
    },
    {
      title: 'E — Electrical & Smart Home',
      items: Object.entries(electrical).map(([name, price]) => ({
        name,
        price,
      })),
    },
    {
      title: 'P — Plumbing & Fixtures',
      items: Object.entries(plumbing).map(([name, price]) => ({
        name,
        price,
      })),
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Chandler',
      text: 'Jason fixed a large drywall patch in my living room and matched the texture perfectly. Showed up on time, clean work, fair price. Highly recommend.',
      rating: 5,
    },
    {
      name: 'Mike R.',
      location: 'Gilbert',
      text: 'Needed several electrical updates and a new ceiling fan. Professional, knowledgeable, and explained everything clearly. Will use again.',
      rating: 5,
    },
    {
      name: 'Lisa T.',
      location: 'Mesa',
      text: 'Quick response on a plumbing issue. Honest pricing and quality work. Exactly what you want from a local tradesperson.',
      rating: 5,
    },
  ];

  const portfolioProjects = [
    {
      title: 'Bathroom Renovation',
      tag: 'Drywall + Plumbing',
      photos: [
        {
          src: 'https://github.com/user-attachments/assets/450a22cd-9193-4af4-a8a5-e056e4459848',
          caption: 'Framing, R-TECH insulation & plumbing rough-in',
        },
        {
          src: 'https://github.com/user-attachments/assets/6f7576a1-174e-47f0-a4d3-316da4ffc6c5',
          caption: 'R-TECH foam + Henry waterproofing membrane',
        },
        {
          src: 'https://github.com/user-attachments/assets/43a17179-21fa-4ec0-9ea5-8697ac113b95',
          caption: 'Shower wall insulation & moisture barrier close-up',
        },
        {
          src: 'https://github.com/user-attachments/assets/0253e8ac-69d8-44c3-8375-0c791fc83dd1',
          caption: 'Greenboard drywall installed, tub set in place',
        },
        {
          src: 'https://github.com/user-attachments/assets/0150125d-6151-4e68-b44f-6e2401144d86',
          caption: 'Completed — double vanity, quartz countertops & travertine tile',
        },
      ],
      description:
        'Full bathroom renovation including drywall, moisture-resistant framing, R-TECH rigid foam insulation, Henry waterproofing membrane, plumbing rough-in, and electrical rough-in.',
    },
  ];

  const handleServiceSelect = (serviceName: string) => {
    const service = services.find((s) => s.name === serviceName);
    if (!service) return;

    const existingIndex = selectedServices.findIndex(
      (s) => s.service === serviceName
    );

    if (existingIndex > -1) {
      const newServices = selectedServices.filter((_, i) => i !== existingIndex);
      setSelectedServices(newServices);
    } else {
      const newService = {
        service: serviceName,
        selections: {} as Record<string, string>,
        price: service.price,
      };
      setSelectedServices([...selectedServices, newService]);
    }
  };

  const handleSubcategorySelect = (
    serviceName: string,
    subcategoryKey: string,
    subcategoryValue: string
  ) => {
    const updatedServices = selectedServices.map((s) => {
      if (s.service === serviceName) {
        return {
          ...s,
          selections: {
            ...s.selections,
            [subcategoryKey]: subcategoryValue,
          },
        };
      }
      return s;
    });
    setSelectedServices(updatedServices);
  };

  const handleAddonSelect = (
    serviceName: string,
    addonKey: string,
    addonValue: string
  ) => {
    const updatedServices = selectedServices.map((s) => {
      if (s.service === serviceName) {
        return {
          ...s,
          selections: {
            ...s.selections,
            [addonKey]: addonValue,
          },
        };
      }
      return s;
    });
    setSelectedServices(updatedServices);
  };

  const calculateServicePrice = (
    serviceName: string,
    selections: Record<string, string>
  ): number => {
    const service = services.find((s) => s.name === serviceName);
    if (!service) return 0;

    if (!service.subcategories) {
      return service.price;
    }

    let totalPrice = 0;
    const firstKey = Object.keys(service.subcategories)[0];
    const subcategory = selections[firstKey];

    if (subcategory && service.subcategories[firstKey]) {
      const option = service.subcategories[firstKey].find(
        (o) => o.name === subcategory
      );
      if (option) {
        totalPrice = option.price;

        if (option.addons) {
          Object.entries(option.addons).forEach(([addonKey, addonPrice]) => {
            if (selections[addonKey]) {
              totalPrice += addonPrice * parseInt(selections[addonKey] || '0');
            }
          });
        }
      }
    }

    return totalPrice;
  };

  const calculateQuote = () => {
    let base = 95;
    let breakdown: string[] = ['Service Call / Diagnostic: $95'];

    selectedServices.forEach((s) => {
      const servicePrice = calculateServicePrice(s.service, s.selections);
      if (servicePrice > 0) {
        base += servicePrice;
        let serviceDesc = s.service;
        const selections = Object.entries(s.selections)
          .map(([_, val]) => `${val}`)
          .join(' - ');
        if (selections) {
          serviceDesc += ` (${selections})`;
        }
        breakdown.push(`${serviceDesc}: $${servicePrice}`);
      }
    });

    const hasDrywall = selectedServices.some((s) =>
      s.service.includes('Drywall')
    );
    const hasElectrical = selectedServices.some(
      (s) =>
        s.service.includes('Electrical') ||
        s.service.includes('Modern Fixture') ||
        s.service.includes('Smart Doorbell')
    );
    const hasPlumbing = selectedServices.some((s) =>
      s.service.includes('Plumbing')
    );

    if (hasDrywall && hasElectrical && hasPlumbing) {
      base -= 95;
      breakdown.push('🎉 Triple Play — Service Call waived!');
    } else if (
      (hasDrywall && hasElectrical) ||
      (hasDrywall && hasPlumbing) ||
      (hasElectrical && hasPlumbing)
    ) {
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
    const quoteData = {
      services: selectedServices
        .map(
          (s) =>
            `${s.service}: $${calculateServicePrice(s.service, s.selections)}`
        )
        .join(', '),
      description: description,
      estimatedPrice: quote?.total || 0,
    };

    const tallyUrl = new URL('https://tally.so/r/QKYRWA');
    tallyUrl.searchParams.append('services', quoteData.services);
    tallyUrl.searchParams.append('description', quoteData.description);
    tallyUrl.searchParams.append(
      'estimatedPrice',
      String(quoteData.estimatedPrice)
    );

    window.open(tallyUrl.toString(), '_blank');
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="DEP Home Repair"
              className="h-12 sm:h-14 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1A1A1A]">
            <a href="#services" className="hover:text-[#005683] transition">
              Services
            </a>
            <a href="#quote" className="hover:text-[#005683] transition">
              Instant Quote
            </a>
            <a href="#testimonials" className="hover:text-[#005683] transition">
              Reviews
            </a>
            <a href="#portfolio" className="hover:text-[#005683] transition">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-[#005683] transition">
              Contact
            </a>
            <a
              href="/lead-qualifier"
              className="hover:text-[#005683] transition"
            >
              Lead Qualifier
            </a>
            <a
              href="#quote"
              className="bg-[#FFAB00] hover:bg-amber-500 text-black px-5 py-2.5 rounded-full font-semibold text-sm transition shadow-sm"
            >
              Get Quote
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-[#1A1A1A]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <a
              href="#services"
              className="block py-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#quote"
              className="block py-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Instant Quote
            </a>
            <a
              href="#testimonials"
              className="block py-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reviews
            </a>
            <a
              href="#portfolio"
              className="block py-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="block py-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#quote"
              className="block mt-2 bg-[#FFAB00] text-center text-black px-5 py-3 rounded-full font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#005683] via-[#004a70] to-[#1A1A1A] text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <img
              src="/logo.png"
              alt="DEP Home Repair"
              className="h-20 sm:h-28 w-auto drop-shadow-lg"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
            Your Home.
            <br />
            Fixed Right. Fast.
          </h1>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 opacity-95 max-w-2xl mx-auto">
            Solo Chandler expert in drywall, electrical & plumbing.
            <br className="hidden sm:block" />
            Instant quotes • Same-day booking • Guaranteed work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#quote"
              className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-[#1A1A1A] px-8 sm:px-10 py-4 rounded-full text-lg sm:text-xl font-bold transition shadow-lg"
            >
              Get Your Instant Quote →
            </a>
            <a
              href="tel:6025981988"
              className="inline-block border-2 border-white/40 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold transition"
            >
              Call 602-598-1988
            </a>
          </div>
          <div className="mt-6 text-sm opacity-70">
            Serving Chandler, Gilbert, Mesa & East Valley
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">
            DEP Service Menu
          </h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">
            Professional • Reliable • Chandler & East Valley
          </p>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {displayServices.map((category) => (
              <div
                key={category.title}
                className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100"
              >
                <div className="text-xl sm:text-2xl font-bold text-[#005683] mb-5">
                  {category.title}
                </div>
                <ul className="space-y-3 text-[#424242]">
                  {category.items.map((item) => (
                    <li key={item.name} className="flex justify-between gap-2">
                      <span>✓ {item.name}</span>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        from ${item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bundles */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#005683] to-[#FFAB00] text-white p-8 sm:p-10 rounded-3xl text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-5">
              DEP Bundle Incentives
            </h3>
            <div className="max-w-md mx-auto space-y-3 text-left text-sm sm:text-base">
              <div>
                🎉 <strong>Triple Play</strong> — Book all three categories →
                Service Call Waived!
              </div>
              <div>
                ⚡ <strong>Power Pair</strong> — Any two services → 10% OFF total
              </div>
              <div>
                🔥 <strong>While We&apos;re There</strong> — One small 5-minute
                task FREE with any booked service
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Quote */}
      <section id="quote" className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">
            Instant Quote in Seconds
          </h2>
          <p className="text-center text-[#424242] mb-8 sm:mb-12">
            Tell us what you need — get a fair price instantly
          </p>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 md:p-12 border border-gray-100">
            <textarea
              className="w-full h-28 sm:h-32 border border-gray-300 rounded-2xl p-4 sm:p-6 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#FFAB00] focus:border-transparent"
              placeholder="Example: 4x6 drywall patch in bedroom ceiling + replace 3 outlets"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="mt-6 sm:mt-8">
              <p className="font-medium mb-4 text-[#1A1A1A]">
                Or pick services:
              </p>
              <div className="space-y-4 sm:space-y-6">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="border border-gray-200 rounded-xl p-4 hover:border-[#FFAB00]/40 transition"
                  >
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedServices.some(
                          (s) => s.service === service.name
                        )}
                        onChange={() => handleServiceSelect(service.name)}
                        className="w-5 h-5 accent-[#FFAB00]"
                      />
                      <span className="font-semibold text-[#1A1A1A]">
                        {service.name}
                      </span>
                    </label>

                    {service.subcategories &&
                      selectedServices.some(
                        (s) => s.service === service.name
                      ) && (
                        <div className="mt-4 ml-4 sm:ml-8 space-y-4">
                          {Object.entries(service.subcategories).map(
                            ([subcatKey, subcatOptions]) => (
                              <div key={subcatKey}>
                                <label className="block text-sm font-medium text-[#424242] mb-2">
                                  {subcatKey}
                                </label>
                                <select
                                  value={
                                    selectedServices.find(
                                      (s) => s.service === service.name
                                    )?.selections[subcatKey] || ''
                                  }
                                  onChange={(e) =>
                                    handleSubcategorySelect(
                                      service.name,
                                      subcatKey,
                                      e.target.value
                                    )
                                  }
                                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFAB00]"
                                >
                                  <option value="">Select {subcatKey}</option>
                                  {subcatOptions.map((option) => (
                                    <option
                                      key={option.name}
                                      value={option.name}
                                    >
                                      {option.name} - ${option.price}
                                    </option>
                                  ))}
                                </select>

                                {selectedServices
                                  .find((s) => s.service === service.name)
                                  ?.selections[subcatKey] &&
                                  subcatOptions.find(
                                    (o) =>
                                      o.name ===
                                      selectedServices.find(
                                        (s) => s.service === service.name
                                      )?.selections[subcatKey]
                                  )?.addons && (
                                    <div className="mt-3 space-y-2">
                                      {Object.entries(
                                        subcatOptions.find(
                                          (o) =>
                                            o.name ===
                                            selectedServices.find(
                                              (s) =>
                                                s.service === service.name
                                            )?.selections[subcatKey]
                                        )?.addons || {}
                                      ).map(([addonKey, addonPrice]) => (
                                        <div key={addonKey}>
                                          <label className="text-xs text-[#424242]">
                                            {addonKey} (${addonPrice} each)
                                          </label>
                                          <input
                                            type="number"
                                            min="0"
                                            value={
                                              selectedServices.find(
                                                (s) =>
                                                  s.service === service.name
                                              )?.selections[addonKey] || ''
                                            }
                                            onChange={(e) =>
                                              handleAddonSelect(
                                                service.name,
                                                addonKey,
                                                e.target.value
                                              )
                                            }
                                            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                            placeholder="0"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={calculateQuote}
              className="mt-8 sm:mt-10 w-full bg-[#005683] hover:bg-blue-900 text-white py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition shadow-md"
            >
              Get My Instant Quote →
            </button>

            {quote && (
              <div className="mt-8 sm:mt-10 p-6 sm:p-8 bg-[#F8FAFC] rounded-2xl border-2 border-[#FFAB00]">
                <div className="text-4xl sm:text-5xl font-bold text-[#1A1A1A]">
                  ${quote.total}
                </div>
                <div className="text-[#FFAB00] font-medium mt-1">
                  Estimated total • Chandler area
                </div>
                <div className="mt-5 space-y-2 text-sm">
                  {quote.breakdown.map((line: string, i: number) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t text-xs text-[#424242]">
                  {quote.message}
                </div>
                <button
                  onClick={handleTallySubmit}
                  className="mt-6 w-full bg-[#FFAB00] hover:bg-amber-500 text-black py-4 rounded-2xl font-bold transition shadow-sm"
                >
                  Book This Job Now →
                </button>
                <p className="mt-3 text-center text-xs text-gray-500">
                  Opens booking form with your quote details
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">
            Our Work
          </h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">
            Real projects — before, during &amp; after
          </p>

          {portfolioProjects.map((project, pi) => (
            <div key={pi} className="mb-14 last:mb-0">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  {project.title}
                </h3>
                <span className="text-xs font-semibold bg-[#005683]/10 text-[#005683] px-3 py-1 rounded-full">
                  {project.tag}
                </span>
              </div>
              <p className="text-[#424242] text-sm mb-6 max-w-2xl">
                {project.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {project.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightbox(photo)}
                    className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#FFAB00]"
                    aria-label={`View photo: ${photo.caption}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl flex items-end">
                      <span className="w-full px-2 py-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl line-clamp-2">
                        {photo.caption}
                      </span>
                    </div>
                    {idx === project.photos.length - 1 && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                        ✓ Completed
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 mb-4">
              More project photos coming soon — ask Jason to see additional work samples!
            </p>
            <a
              href="#quote"
              className="inline-block bg-[#FFAB00] hover:bg-amber-500 text-black px-8 py-3.5 rounded-full font-semibold transition shadow-sm"
            >
              Start Your Project →
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-[#FFAB00] transition"
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="w-full rounded-2xl shadow-2xl"
            />
            <p className="mt-3 text-center text-white text-sm opacity-80">
              {lightbox.caption}
            </p>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section id="testimonials" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-[#1A1A1A]">
            What Clients Say
          </h2>
          <p className="text-center text-[#424242] mb-10 sm:mb-12">
            Real feedback from Chandler & East Valley homeowners
          </p>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100"
              >
                <div className="flex gap-1 mb-4 text-[#FFAB00]">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="text-[#424242] mb-5 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="font-semibold text-[#1A1A1A]">{t.name}</div>
                <div className="text-sm text-gray-500">{t.location}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            More real reviews coming soon — send me yours if you&apos;ve worked
            with me!
          </p>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-[#1A1A1A] text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
            {/* Brand */}
            <div>
              <img
                src="/logo.png"
                alt="DEP Home Repair"
                className="h-16 w-auto mx-auto md:mx-0 mb-4"
              />
              <p className="text-sm opacity-80">
                Drywall • Electrical • Plumbing
                <br />
                Home-Smart Solutions for the East Valley
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <div className="space-y-2 text-sm opacity-90">
                <div>
                  <a
                    href="tel:6025981988"
                    className="hover:text-[#FFAB00] transition"
                  >
                    📞 602-598-1988
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:info@dephomerepair.com"
                    className="hover:text-[#FFAB00] transition"
                  >
                    ✉️ info@dephomerepair.com
                  </a>
                </div>
                <div className="pt-2">
                  Chandler, AZ & East Valley
                  <br />
                  Licensed • Bonded • Insured
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <a href="#services" className="hover:text-[#FFAB00] transition">
                    Services
                  </a>
                </div>
                <div>
                  <a href="#quote" className="hover:text-[#FFAB00] transition">
                    Instant Quote
                  </a>
                </div>
                <div>
                  <a
                    href="#testimonials"
                    className="hover:text-[#FFAB00] transition"
                  >
                    Reviews
                  </a>
                </div>
                <div className="pt-3">
                  <a
                    href="#"
                    className="inline-block border border-white/30 hover:border-[#FFAB00] hover:text-[#FFAB00] px-4 py-2 rounded-full text-xs transition"
                  >
                    Google Business Profile →
                  </a>
                  <p className="text-xs opacity-60 mt-2">
                    (Link will be added once your GBP is ready)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs opacity-60">
            © {new Date().getFullYear()} DEP Home Repair • Chandler, Arizona
            <br />
            Drywall • Electrical • Plumbing
          </div>
        </div>
      </footer>
    </>
  );
}
