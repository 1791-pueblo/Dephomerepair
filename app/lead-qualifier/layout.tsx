import type { Metadata } from 'next';

// Internal tool: keep it working, but out of search results and link previews.
export const metadata: Metadata = {
  title: 'Lead Qualification Assistant (internal) | DEP Home Repair',
  description: 'Internal DEP Home Repair tool. Not a customer page.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  openGraph: null,
};

export default function LeadQualifierLayout({ children }: { children: React.ReactNode }) {
  return children;
}
