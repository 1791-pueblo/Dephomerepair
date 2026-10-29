import type { Metadata } from 'next';
import { MoreHomeFixes } from '../../components/MoreHomeFixes';
import { SiteFrame } from '../../components/SiteFrame';
import { pageMetadata, shareImage } from '../../lib/seo';

export const metadata: Metadata = pageMetadata({
  path: '/more-home-fixes',
  title: 'More Home Fixes in Chandler & Gilbert AZ | Doors, Mounting, Outdoor | DEP',
  description:
    'Everyday home fixes in Chandler, Gilbert, southwest Mesa, south Scottsdale and nearby East Valley: doors, hinges, security doors, shelves, outdoor lighting, appliance hookups, and seasonal packages from DEP Home Repair.',
  shareTitle: 'More Home Fixes & Seasonal Packages | DEP Home Repair',
  image: shareImage('more-home-fixes', 'Door, mounting, and outdoor fixes from DEP Home Repair'),
});

export default function MoreHomeFixesPage() {
  return (
    <SiteFrame>
      <MoreHomeFixes variant="page" />
    </SiteFrame>
  );
}
