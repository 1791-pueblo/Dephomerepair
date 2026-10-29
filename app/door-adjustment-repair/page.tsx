import type { Metadata } from 'next';
import { LandingPageView } from '../../components/LandingPageView';
import { SERVICE_LANDING_PAGES } from '../../lib/landingPages';
import { pageMetadata } from '../../lib/seo';

const page = SERVICE_LANDING_PAGES.doors;

export const metadata: Metadata = pageMetadata({
  path: page.path,
  title: page.metaTitle,
  description: page.metaDescription,
  shareTitle: page.shareTitle,
  image: page.shareImage,
});

export default function Page() {
  return <LandingPageView page={page} />;
}
