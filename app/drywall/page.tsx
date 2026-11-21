import type { Metadata } from 'next';
import { ServicePageView } from '../../components/ServicePageView';
import { SERVICE_PAGES } from '../../lib/servicePages';
import { pageMetadata } from '../../lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/drywall',
  title: SERVICE_PAGES.drywall.metaTitle,
  description: SERVICE_PAGES.drywall.metaDescription,
  shareTitle: SERVICE_PAGES.drywall.shareTitle,
  image: SERVICE_PAGES.drywall.shareImage,
});

export default function DrywallPage() {
  return <ServicePageView serviceKey="drywall" />;
}
