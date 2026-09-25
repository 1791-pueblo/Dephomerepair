import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'DEP Home Repair | Chandler AZ Drywall, Electrical & Plumbing',
    template: '%s',
  },
  description:
    'Expert drywall, electrical & plumbing repairs in Chandler and the East Valley. Instant online quotes. Fair pricing. Call Jason at 602-598-1988.',
  openGraph: {
    title: 'DEP Home Repair | Chandler AZ',
    description:
      'Solo tradesperson specializing in drywall, electrical & plumbing. Instant quotes and reliable service.',
    images: [{ url: '/logo.png' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'DEP Home Repair',
  url: 'https://www.dephomerepair.com',
  telephone: '602-598-1988',
  email: 'info@dephomerepair.com',
  areaServed: ['Chandler AZ', 'Gilbert AZ', 'Mesa AZ', 'East Valley'],
  description:
    'Drywall, electrical, and plumbing repairs in Chandler and the East Valley. One licensed tradesperson on the job.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'DEP Service Menu',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Drywall repair', url: 'https://www.dephomerepair.com/drywall' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electrical repair', url: 'https://www.dephomerepair.com/electrical' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plumbing repair', url: 'https://www.dephomerepair.com/plumbing' } },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
