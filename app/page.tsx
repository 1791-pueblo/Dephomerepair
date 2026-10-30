import type { Metadata } from 'next';
import HomePage from '../components/HomePage';
import { pageMetadata } from '../lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'DEP Home Repair | Drywall, Electrical & Plumbing Repairs in Chandler AZ',
  description:
    'Drywall, electrical and plumbing repairs in Chandler, Gilbert, southwest Mesa, south Scottsdale & nearby East Valley. Flat prices posted up front, one person on the job. Call Jason at 602-598-1988.',
  shareTitle: 'DEP Home Repair | Chandler & East Valley',
  shareDescription: "Keeping your home's lifelines flowing. Drywall, electrical and plumbing repairs, with flat prices posted up front.",
});

export default function Page() {
  return <HomePage />;
}
