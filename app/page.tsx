import type { Metadata } from 'next';
import HomePage from '../components/HomePage';
import { pageMetadata } from '../lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'DEP Home Repair | Drywall, Door & Home Repairs in Chandler AZ',
  description:
    'Drywall, door, and home repairs in Chandler, Gilbert, southwest Mesa, and south Scottsdale. Flat prices posted up front, one person on the job. Call Jason at 602-598-1988.',
  shareTitle: 'DEP Home Repair | Chandler & East Valley',
  shareDescription: 'Fix it and finish it in one call. Drywall, doors, minor electrical and plumbing, with flat prices posted up front.',
});

export default function Page() {
  return <HomePage />;
}
