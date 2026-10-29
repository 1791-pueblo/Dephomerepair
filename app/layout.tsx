import type { Metadata } from 'next';
import './globals.css';
import { DEFAULT_SHARE_IMAGE, SITE_NAME, SITE_URL } from '../lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DEP Home Repair | Chandler AZ Drywall, Electrical & Plumbing',
    template: '%s',
  },
  description:
    'Expert drywall, electrical & plumbing repairs in Chandler and the East Valley. Instant online quotes. Fair pricing. Call Jason at 602-598-1988.',
  // Pages set their own canonical URL and share preview via pageMetadata() in lib/seo.ts.
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    title: 'DEP Home Repair | Chandler AZ',
    description: 'Drywall, door, and home repairs in Chandler and the East Valley. Fix it and finish it in one call.',
    images: [DEFAULT_SHARE_IMAGE],
  },
  twitter: { card: 'summary_large_image', images: [DEFAULT_SHARE_IMAGE.url] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'DEP Home Repair',
  url: 'https://www.dephomerepair.com',
  telephone: '602-598-1988',
  email: 'info@dephomerepair.com',
  areaServed: ['Chandler AZ', 'Gilbert AZ', 'Southwest Mesa AZ', 'East Valley'],
  description:
    'Drywall, electrical, and plumbing repairs in Chandler and the East Valley. One tradesperson on the job.',
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
