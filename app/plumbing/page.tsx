import type { Metadata } from 'next';
import { ServicePageView } from '../../components/ServicePageView';
import { SERVICE_PAGES } from '../../lib/servicePages';

export const metadata: Metadata = {
  title: SERVICE_PAGES.plumbing.metaTitle,
  description: SERVICE_PAGES.plumbing.metaDescription,
};

export default function PlumbingPage() {
  return <ServicePageView serviceKey="plumbing" />;
}
