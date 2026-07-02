import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            DEP Home Repair
          </h1>
          <p className="text-2xl text-gray-600">Drywall • Electrical • Plumbing</p>
          <p className="text-xl text-gray-500 mt-2">Chandler, Arizona</p>
          
          {/* Hero CTA */}
          <a 
            href="#quote" 
            className="mt-8 inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 transition"
          >
            Get Instant Quote Now
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold mb-4">Drywall Repair</h3>
            <p className="text-gray-600 mb-6">Professional drywall installation, repair, and finishing services.</p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
              Get Quote
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold mb-4">Electrical Services</h3>
            <p className="text-gray-600 mb-6">Licensed electrical repairs, installations, and upgrades.</p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
              Get Quote
            </button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold mb-4">Plumbing Services</h3>
            <p className="text-gray-600 mb-6">Expert plumbing repair and installation services.</p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
