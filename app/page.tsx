'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { TRADE_CARDS, SERVICE_MENU_TITLE } from '../lib/tradeCardCopy';
import { ProjectPhotoSlider } from '../components/ProjectPhotoSlider';
import { portfolioProjects } from '../lib/portfolio';
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
  { key: 'drywall' as const, label: 'D — Drywall Repair & Finishing', short: 'Drywall Repair & Finishing', tab: 'Drywall', letter: 'D', letterColor: '#0056B3', cardBg: 'bg-[#E8F1FB]', borderClass: 'border-[#0056B3]/20 hover:border-[#0056B3]/50' },
  { key: 'electrical' as const, label: 'E — Electrical & Smart Home', short: 'Electrical & Smart Home', tab: 'Electrical', letter: 'E', letterColor: '#FFAB00', cardBg: 'bg-[#FFF8E7]', borderClass: 'border-[#FFAB00]/25 hover:border-[#FFAB00]/60' },
  { key: 'plumbing' as const, label: 'P — Plumbing & Fixtures', short: 'Plumbing & Fixtures', tab: 'Plumbing', letter: 'P', letterColor: '#424242', cardBg: 'bg-[#F3F3F3]', borderClass: 'border-[#424242]/20 hover:border-[#424242]/50' },
];
