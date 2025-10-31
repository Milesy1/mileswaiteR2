'use client';

import { useEffect } from 'react';
import { trackWebVitals } from '@/lib/web-vitals';

/**
 * Web Vitals tracking component
 * Automatically tracks Core Web Vitals metrics
 */
export default function WebVitals() {
  useEffect(() => {
    trackWebVitals();
  }, []);

  return null;
}

