import type { Metadata } from 'next';
import { ServicePageView } from '../../components/ServicePageView';
import { SERVICE_PAGES } from '../../lib/servicePages';
import { pageMetadata } from '../../lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/plumbing',
  title: SERVICE_PAGES.plumbing.metaTitle,
  description: SERVICE_PAGES.plumbing.metaDescription,
  shareTitle: SERVICE_PAGES.plumbing.shareTitle,
  image: SERVICE_PAGES.plumbing.shareImage,
});

export default function PlumbingPage() {
  return <ServicePageView serviceKey="plumbing" />;
}
