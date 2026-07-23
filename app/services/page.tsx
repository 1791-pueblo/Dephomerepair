import Image from 'next/image';
import Link from 'next/link';

export default function ServicesPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#0056B3] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Image
            src="/logo.png" //  Ensure this file is in the project's /public folder
            alt="DEP Home Repair logo"
            width={300}
            height={120}
            className="mx-auto mb-6"
            priority
          />
          <h1 className="text-5xl font-bold mb-4">Professional Home Repair Services</h1>
          <p className="text-xl max-w-2xl mx-auto">Drywall 																																	• Electrical • Plumbing • Home-Smart Solutions</p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="tel:6025981988"
              aria-label="Call DEP Home Repair at (602) 598-1988"
              className="bg-[#FFAB00] hover:bg-orange-500 text-black font-semibold px-8 py-4 rounded-xl text-lg transition"
            >
              Call (602) 598-1988
            </a>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Drywall */}
          <Link href="/services/drywall" className="group block bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition" aria-label="View Drywall services">
            <div className="h-64 bg-gray-200 relative" aria-hidden="true">
              {/* Add your drywall photos here later (e.g., <Image ... />) */}
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-[#0056B3] mb-3">Drywall</h2>
              <p className="text-gray-600">Patching, texture matching, full installs, ceiling repairs, and access doors.</p>
              <div className="mt-6 text-[#FFAB00] group-hover:underline">View Drywall Services →</div>
            </div>
          </Link>

          {/* Electrical */}
          <Link href="/services/electrical" className="group block bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition" aria-label="View Electrical services">
            <div className="h-64 bg-gray-200 relative" aria-hidden="true">
              {/* Add electrical photos here */}
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-[#0056B3] mb-3">Electrical</h2>
              <p className="text-gray-600">Outlets, switches, lighting, ceiling fans, panel work &amp; troubleshooting.</p>
              <div className="mt-6 text-[#FFAB00] group-hover:underline">View Electrical Services →</div>
            </div>
          </Link>

          {/* Plumbing */}
          <Link href="/services/plumbing" className="group block bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition" aria-label="View Plumbing services">
            <div className="h-64 bg-gray-200 relative" aria-hidden="true">
              {/* Add plumbing photos here */}
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-[#0056B3] mb-3">Plumbing</h2>
              <p className="text-gray-600">Leaks, water heaters, fixtures, drains &amp; full installations.</p>
              <div className="mt-6 text-[#FFAB00] group-hover:underline">View Plumbing Services →</div>
            </div>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#424242] text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">Ready to Get Your Project Done Right?</h2>
          <p className="text-xl mb-8">Call, text, or email for a fast quote.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="tel:6025981988" aria-label="Call (602) 598-1988" className="bg-white text-black px-10 py-4 rounded-2xl font-semibold text-lg">📞 (602) 598-1988</a>
            <a href="mailto:info@dephomerepair.com" aria-label="Email info at dephomerepair dot com" className="bg-[#FFAB00] text-black px-10 py-4 rounded-2xl font-semibold text-lg">✉️ info@dephomerepair.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
