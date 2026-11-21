import type { Metadata } from 'next';
import { ServicePageView } from '../../components/ServicePageView';
import { SERVICE_PAGES } from '../../lib/servicePages';
import { pageMetadata } from '../../lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/electrical',
  title: SERVICE_PAGES.electrical.metaTitle,
  description: SERVICE_PAGES.electrical.metaDescription,
  shareTitle: SERVICE_PAGES.electrical.shareTitle,
  image: SERVICE_PAGES.electrical.shareImage,
});

export default function ElectricalPage() {
  return <ServicePageView serviceKey="electrical" />;
}
