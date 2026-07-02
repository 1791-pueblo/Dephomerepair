import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DEP Home Repair | Chandler AZ',
  description: 'Expert drywall, electrical & plumbing repairs. Instant quotes • Same-day service • Chandler & East Valley',
  openGraph: {
    images: [{ url: '/logo.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://tally.so/widgets/embed.js"></script>
      </head>
      <body className="antialiased">
        {children}

        {/* Quote & Booking Form Section */}
        <section id="quote" className="py-20 bg-[#F8FAFC]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">Get Your Quote or Book a Job</h2>
            <p className="text-[#424242] mb-12 max-w-2xl mx-auto">
              Fill out the form below with job details, photos, and preferred time. Jason will review it quickly and get back to you with a fair quote and available slot.
            </p>

            <button
              data-tally-open="QKYRWA"
              data-tally-emoji-text="🔨"
              data-tally-emoji-animation="wave"
              className="bg-[#0056B3] hover:bg-blue-700 text-white px-12 py-6 rounded-2xl font-bold text-xl inline-flex items-center gap-3 transition-all"
              onClick={() => {
                console.log("Quote form opened - Lead captured");
                // Future: Add GA / tracking event here
              }}
            >
              Open Quote & Booking Form →
            </button>

            <p className="text-sm text-[#424242] mt-8">
              Or call/text directly: <strong>602-598-1988</strong>
            </p>
          </div>
        </section>
      </body>
    </html>
  );
}
