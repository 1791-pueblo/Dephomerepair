'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ProjectPhotoSlider } from '../components/ProjectPhotoSlider';
import { portfolioProjects } from '../lib/portfolio';
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
