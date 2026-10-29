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

const city = (name: string) => ({
  '@type': 'City',
  name,
  containedInPlace: { '@type': 'State', name: 'Arizona' },
});

const service = (name: string, path: string) => ({
  '@type': 'Offer',
  itemOffered: { '@type': 'Service', name, url: `${SITE_URL}${path}` },
});

// Business info for search engines. Service-area business: no street address is published.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: [`${SITE_URL}/og/dep-home-repair.jpg`, `${SITE_URL}/gallery/entrydoor-03-security-door.jpg`],
  telephone: '+1-602-598-1988',
  email: 'info@dephomerepair.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Chandler', addressRegion: 'AZ', addressCountry: 'US' },
  areaServed: [city('Chandler'), city('Gilbert'), city('Mesa'), city('Scottsdale')],
  description:
    'Drywall, door, and home repairs for Chandler, Gilbert, southwest Mesa, south Scottsdale and nearby East Valley. One person on the job, flat prices posted up front, jobs under $1,000 total. Not a licensed contractor.',
  // Add the Google Business Profile URL here once it is verified and live.
  sameAs: ['https://www.taskrabbit.com/profile/jason-p--132'],
  // TODO(Jason): business hours not set yet. Add openingHoursSpecification once hours are confirmed. Do not guess.
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'DEP Service Menu',
    itemListElement: [
      service('Drywall repair and texture match', '/drywall'),
      service('Minor electrical repair', '/electrical'),
      service('Minor plumbing repair', '/plumbing'),
      service('Door adjustment and repair', '/door-adjustment-repair'),
      service('Security door repair and replacement', '/security-door-repair'),
      service('Pre-Monsoon home prep', '/pre-monsoon-prep'),
      service('Stucco hairline crack sealing', '/stucco-crack-repair'),
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
