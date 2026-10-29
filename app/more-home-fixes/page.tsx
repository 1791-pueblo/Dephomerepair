import type { Metadata } from 'next';
import { MoreHomeFixes } from '../../components/MoreHomeFixes';
import { SiteFrame } from '../../components/SiteFrame';

export const metadata: Metadata = {
  title: 'More Home Fixes in Chandler & Gilbert AZ | Doors, Mounting, Outdoor | DEP',
  description:
    'Everyday home fixes in Chandler, Gilbert, southwest Mesa, south Scottsdale and the East Valley: doors, hinges, security doors, shelves, outdoor lighting, appliance hookups, and seasonal packages from DEP Home Repair.',
};

export default function MoreHomeFixesPage() {
  return (
    <SiteFrame>
      <MoreHomeFixes variant="page" />
    </SiteFrame>
  );
}
