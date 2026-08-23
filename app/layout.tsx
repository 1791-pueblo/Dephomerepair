import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DEP Home Repair | Chandler AZ Drywall, Electrical & Plumbing',
  description:
    'Expert drywall, electrical & plumbing repairs in Chandler and the East Valley. Instant online quotes • Same-day service • Fair pricing. Call Jason at 602-598-1988.',
  openGraph: {
    title: 'DEP Home Repair | Chandler AZ',
    description:
      'Solo tradesperson specializing in drywall, electrical & plumbing. Instant quotes and reliable service.',
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
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
