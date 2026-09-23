'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ProjectPhotoSlider } from '../components/ProjectPhotoSlider';
import { portfolioProjects, tradeCardProjects } from '../lib/portfolio';
import {
  allServices,
  applyBundleDiscount,
  amountToWaiveCall,
  CALL_WAIVER_MIN,
  deviceSellPrice,
  drywall,
  electrical,
  lineTotal,
  plumbing,
  SERVICE_CALL,
  serviceCallAmount,
  type ServicePrice,
} from '../lib/pricing';

type CartItem = { id: string; qty: number; supplyDevice: boolean };
type QuickIntake = { service: string; city: string; urgency: string };

const QUICK_SERVICE_OPTIONS = ['Drywall', 'Electrical', 'Plumbing', 'Multiple Services', 'Not sure yet'];
const QUICK_URGENCY_OPTIONS = ['Today', 'This week', '1–2 weeks', 'Flexible'];

const CATEGORY_META = [
  {
    key: 'drywall' as const,
    label: 'D — Drywall Repair & Finishing',
    short: 'Drywall Repair & Finishing',
    tab: 'Drywall',
    letter: 'D',
    letterColor: '#0056B3',
    cardBg: 'bg-[#E8F1FB]',
    borderClass: 'border-[#0056B3]/20 hover:border-[#0056B3]/50',
    highlights: [
      { title: 'Patching', detail: 'Seamless repair for holes, cracks, and water damage.' },
      { title: 'Matching', detail: 'Expert matching for Santa Fe skip trowel, orange peel, knockdown, or smooth finishes.' },
      { title: 'Corner Bead & Trim Repair', detail: 'Fixing those high-traffic dings and dents.' },
      { title: 'Full Surface Refresh', detail: 'Skim coating and smoothing for a modern look.' },
    ],
  },
  {
    key: 'electrical' as const,
    label: 'E — Electrical & Smart Home',
    short: 'Electrical & Smart Home',
    tab: 'Electrical',
    letter: 'E',
    letterColor: '#FFAB00',
    cardBg: 'bg-[#FFF8E7]',
    borderClass: 'border-[#FFAB00]/25 hover:border-[#FFAB00]/60',
    highlights: [
      { title: 'Modern Fixture Install', detail: 'Ceiling fans, chandeliers, and recessed lighting.' },
      { title: 'Smart Home Upgrades', detail: 'Ring/Nest doorbells, smart thermostats, and USB outlets.' },
      { title: 'Device Refresh', detail: 'Swapping outdated “almond” switches for clean, modern white.' },
      { title: 'Safety Upgrades', detail: 'GFCI installation and smoke/CO detector testing.' },
    ],
  },
  {
    key: 'plumbing' as const,
    label: 'P — Plumbing & Fixtures',
    short: 'Plumbing & Fixtures',
    tab: 'Plumbing',
    letter: 'P',
    letterColor: '#424242',
    cardBg: 'bg-[#F3F3F3]',
    borderClass: 'border-[#424242]/20 hover:border-[#424242]/50',
    highlights: [
      { title: 'Kitchen & Bath Updates', detail: 'Faucet, showerhead, and vanity hardware installs.' },
      { title: 'Toilet Repair & Install', detail: 'Rebuilding tanks or installing new, high-efficiency models.' },
      { title: 'Appliance Hookups', detail: 'Dishwashers, ice makers, and garbage disposals.' },
      { title: 'Drain & Leak Care', detail: 'Addressing under-sink drips and slow-moving drains.' },
    ],
  },
];
