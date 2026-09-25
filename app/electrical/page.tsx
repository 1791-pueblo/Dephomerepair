import type { Metadata } from 'next';
import { ServicePageView } from '../../components/ServicePageView';
import { SERVICE_PAGES } from '../../lib/servicePages';

export const metadata: Metadata = {
  title: SERVICE_PAGES.electrical.metaTitle,
  description: SERVICE_PAGES.electrical.metaDescription,
};

export default function ElectricalPage() {
  return <ServicePageView serviceKey="electrical" />;
}
