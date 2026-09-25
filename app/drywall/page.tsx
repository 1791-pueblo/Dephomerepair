import type { Metadata } from 'next';
import { ServicePageView } from '../../components/ServicePageView';
import { SERVICE_PAGES } from '../../lib/servicePages';

export const metadata: Metadata = {
  title: SERVICE_PAGES.drywall.metaTitle,
  description: SERVICE_PAGES.drywall.metaDescription,
};

export default function DrywallPage() {
  return <ServicePageView serviceKey="drywall" />;
}
