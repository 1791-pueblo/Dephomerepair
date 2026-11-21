import type { Metadata } from 'next';

export const SITE_URL = 'https://www.dephomerepair.com';
export const SITE_NAME = 'DEP Home Repair';

/** One service-area line used across the site, schema, and page descriptions. */
export const SERVICE_AREA_LINE = 'Chandler, Gilbert, southwest Mesa, south Scottsdale & nearby East Valley';
export const SERVICE_AREA_SHORT = 'Chandler, Gilbert, southwest Mesa & south Scottsdale';

export const DEFAULT_SHARE_IMAGE = {
  url: '/og/dep-home-repair.jpg',
  width: 1200,
  height: 630,
  alt: 'DEP Home Repair, Chandler AZ. Fix it and finish it in one call.',
};

type PageMetaInput = {
  /** Path starting with "/", e.g. "/drywall". Use "/" for the home page. */
  path: string;
  title: string;
  description: string;
  /** Short title for link previews; falls back to title. */
  shareTitle?: string;
  shareDescription?: string;
  image?: { url: string; width?: number; height?: number; alt: string };
};

/** Canonical URL + page-specific Open Graph / Twitter preview for one page. */
export function pageMetadata({ path, title, description, shareTitle, shareDescription, image }: PageMetaInput): Metadata {
  const img = image ?? DEFAULT_SHARE_IMAGE;
  const ogTitle = shareTitle ?? title;
  const ogDescription = shareDescription ?? description;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: path,
      title: ogTitle,
      description: ogDescription,
      images: [img],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [img.url],
    },
  };
}

/** Page-specific 1200x630 share card in public/og/. */
export function shareImage(slug: string, alt: string) {
  return { url: `/og/${slug}.jpg`, width: 1200, height: 630, alt };
}
