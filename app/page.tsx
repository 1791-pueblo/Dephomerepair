'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ProjectPhotoSlider } from '../components/ProjectPhotoSlider';
import {
  allServices,
  applyBundleDiscount,
  deviceSellPrice,
  drywall,
  electrical,
  lineTotal,
  plumbing,
  SERVICE_CALL,
  serviceCallAmount,
  type ServicePrice,
} from '../lib/pricing';

// TEMP: full page will be restored in next commit — branch currently has component ready
export default function Home() {
  return <div className="p-8">Portfolio slider component is ready. Restoring full page next.</div>;
}
