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

  const handleServiceSelect = (serviceName: string) => {
    const service = services.find((s) => s.name === serviceName);

    if (!service) return;

    // Check if this service is already selected
    const existingIndex = selectedServices.findIndex(
      (s) => s.service === serviceName
    );

    if (existingIndex > -1) {
      // Remove if already selected
      const newServices = selectedServices.filter((_, i) => i !== existingIndex);
      setSelectedServices(newServices);
    } else {
      // Add new service
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

    let basePrice = 0;
    let totalPrice = 0;

    // Navigate through subcategories
    const firstKey = Object.keys(service.subcategories)[0];
    const subcategory = selections[firstKey];

    if (subcategory && service.subcategories[firstKey]) {
      const option = service.subcategories[firstKey].find(
        (o) => o.name === subcategory
      );
      if (option) {
        basePrice = option.price;
        totalPrice = option.price;

        // Check for addons
        if (option.addons) {
          Object.entries(option.addons).forEach(([addonKey, addonPrice]) => {
            if (selections[addonKey]) {
              totalPrice += addonPrice * parseInt(selections[addonKey]);
            }
          });
        }
      }
    }

    return totalPrice;
  };

  const calculateQuote = () => {
    let base = 95; // New service call fee
    let breakdown: string[] = ['Service Call / Diagnostic: $95'];

    selectedServices.forEach((s) => {
      const servicePrice = calculateServicePrice(s.service, s.selections);
      if (servicePrice > 0) {
        base += servicePrice;
        let serviceDesc = s.service;
        const selections = Object.entries(s.selections)
          .map(([key, val]) => `${val}`)
          .join(' - ');
        if (selections) {
          serviceDesc += ` (${selections})`;
        }
        breakdown.push(`${serviceDesc}: $${servicePrice}`);
      }
    });

    // Bundle discounts
    const hasDrywall = selectedServices.some((s) =>
      s.service.includes('Drywall')
    );
    const hasElectrical = selectedServices.some(
      (s) => s.service.includes('Electrical') || s.service.includes('Modern Fixture') || s.service.includes('Smart Doorbell')
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
        .map((s) => `${s.service}: $${calculateServicePrice(s.service, s.selections)}`)
        .join(', '),
      description: description,
      estimatedPrice: quote?.total || 0,
    };

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
              src="/dep-logo.png"
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
              src="/dep-logo.png"
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
            {displayServices.map((category) => (
              <div key={category.title} className="bg-slate-50 p-8 rounded-2xl">
                <div className="text-2xl font-bold text-[#005683] mb-6">
                  {category.title}
                </div>
                <ul className="space-y-4 text-[#424242]">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      ✓ {item.name}{' '}
                      <span className="text-sm text-gray-500">
                        ${item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bundles */}
          <div className="mt-16 bg-gradient-to-r from-[#005683] to-[#FFAB00] text-white p-10 rounded-3xl text-center">
            <h3 className="text-3xl font-bold mb-6">DEP Bundle Incentives</h3>
            <div className="max-w-md mx-auto space-y-4 text-left">
              <div>
                🎉 Triple Play — Book all three categories → Service Call Waived!
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
              <div className="space-y-6">
                {services.map((service) => (
                  <div key={service.name} className="border rounded-lg p-4">
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

                    {/* Subcategories */}
                    {service.subcategories &&
                      selectedServices.some((s) => s.service === service.name) && (
                        <div className="mt-4 ml-8 space-y-4">
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
                                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                >
                                  <option value="">Select {subcatKey}</option>
                                  {subcatOptions.map((option) => (
                                    <option key={option.name} value={option.name}>
                                      {option.name} - ${option.price}
                                    </option>
                                  ))}
                                </select>

                                {/* Addons */}
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
                                              (s) => s.service === service.name
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
                                                (s) => s.service === service.name
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
              src="/dep-logo.png"
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
