'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ProjectPhotoSlider } from '../components/ProjectPhotoSlider';
import { portfolioProjects, tradeCardProjects } from '../lib/portfolio';
import {
  allServices,
  applyBundleDiscount,
  deviceSellPrice,
  drywall,
  electrical,
  lineTotal,
  plumbing,
  amountToWaiveCall,
  CALL_WAIVER_MIN,
  SERVICE_CALL,
  serviceCallAmount,
  type ServicePrice,
} from '../lib/pricing';

type CartItem = { id: string; qty: number; supplyDevice: boolean };
type QuickIntake = { service: string; city: string; urgency: string };

const QUICK_SERVICE_OPTIONS = ['Drywall', 'Electrical', 'Plumbing', 'Multiple Services', 'Not sure yet'];
const QUICK_URGENCY_OPTIONS = ['Today', 'This week', '1–2 weeks', 'Flexible'];

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold">DEP Home Repair</h1>
        <p>Site update in progress. Call 602-598-1988 or email info@dephomerepair.com.</p>
        <p className="text-sm text-gray-500">Instant Quote will be back shortly.</p>
      </div>
    </main>
  );
}
