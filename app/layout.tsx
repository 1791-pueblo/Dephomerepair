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
      <body className="antialiased">{children}</body>
    </html>
  );
}
