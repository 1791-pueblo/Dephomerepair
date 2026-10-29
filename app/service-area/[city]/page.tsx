import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LandingPageView } from '../../../components/LandingPageView';
import { CITY_ORDER, CITY_PAGES, type CityKey } from '../../../lib/landingPages';
import { pageMetadata } from '../../../lib/seo';

type Params = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CITY_ORDER.map((city) => ({ city }));
}

function getCity(city: string) {
  return (CITY_ORDER as string[]).includes(city) ? CITY_PAGES[city as CityKey] : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = getCity((await params).city);
  if (!page) return {};
  return pageMetadata({
    path: page.path,
    title: page.metaTitle,
    description: page.metaDescription,
    shareTitle: page.shareTitle,
    image: page.shareImage,
  });
}

export default async function CityPage({ params }: Params) {
  const key = (await params).city;
  const page = getCity(key);
  if (!page) notFound();
  const others = CITY_ORDER.filter((c) => c !== key).map((c) => ({ href: CITY_PAGES[c].path, label: CITY_PAGES[c].city }));
  return (
    <LandingPageView
      page={page}
      areaNote={page.areaNote}
      moreLinks={{ heading: 'Other areas I serve', links: [...others, { href: '/service-area', label: 'Full service area' }] }}
    />
  );
}
