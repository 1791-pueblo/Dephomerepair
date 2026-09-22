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
