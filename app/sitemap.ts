import type { MetadataRoute } from 'next';
import { CITY_ORDER, CITY_PAGES, SERVICE_LANDING_PAGES } from '../lib/landingPages';
import { SITE_URL } from '../lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' = 'monthly') => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    entry('/', 1, 'weekly'),
    entry('/drywall', 0.9),
    entry('/electrical', 0.9),
    entry('/plumbing', 0.9),
    ...Object.values(SERVICE_LANDING_PAGES).map((p) => entry(p.path, 0.8)),
    entry('/more-home-fixes', 0.7),
    entry('/service-area', 0.7),
    ...CITY_ORDER.map((c) => entry(CITY_PAGES[c].path, 0.7)),
  ];
}
