import Image from 'next/image';

export default function DrywallPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-[#0056B3] text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Drywall Services</h1>
          <p className="text-2xl max-w-3xl mx-auto">
            Professional patching, texture matching, full installs, and repairs — clean and seamless every time.
          </p>
          <a
            href="tel:6025981988"
            aria-label="Get a quote by calling (602) 598-1988"
            className="mt-10 inline-block bg-[#FFAB00] text-black font-semibold px-10 py-4 rounded-2xl text-xl"
          >
            Get a Quote – (602) 598-1988
          </a>
        </div>
      </div>

      {/* Key Services */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-semibold mb-2">Patching &amp; Small Repairs</h3>
            <p className="text-gray-600">Fast, neat repairs for holes, dents, and damaged corners.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-semibold mb-2">Texture Matching</h3>
            <p className="text-gray-600">We match existing textures for invisible repairs.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-semibold mb-2">Corner Bead &amp; Finishing</h3>
            <p className="text-gray-600">Clean corner installs and professional finishing for long-lasting results.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow">
            <h3 className="text-xl font-semibold mb-2">Ceiling Repairs &amp; Access Holes</h3>
            <p className="text-gray-600">Ceiling patching, access doors, and matching textures for overhead work.</p>
          </div>
        </div>
      </div>

      {/* Gallery – Add your photos here */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">Recent Drywall Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Replace with your actual image paths under /public/projects/ */}
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden relative">
              <Image
                src="/projects/bathroom-drywall.jpg"
                alt="Bathroom drywall repair"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden relative">
              <Image
                src="/projects/patio-conversion.jpg"
                alt="Patio drywall work"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden relative">
              <Image
                src="/projects/ceiling-access.jpg"
                alt="Ceiling access repair"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bundles */}
      <div className="bg-[#424242] text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-4">Bundle &amp; Save</h2>
          <p className="text-xl">Triple Play (Drywall + Electric + Plumbing) – 15% discount</p>
          <p className="text-lg mt-2">"While We're There" add-ons are often free</p>
        </div>
      </div>
    </div>
  );
}
