'use client';

import { useEffect } from 'react';
import { initErrorTracking } from '@/lib/error-tracking';

/**
 * Error tracking component
 * Initializes error tracking services (Sentry, LogRocket, etc.)
 */
export default function ErrorTracking() {
  useEffect(() => {
    initErrorTracking({
      sentry: {
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        environment: process.env.NODE_ENV || 'production',
        tracesSampleRate: 0.1,
      },
      logrocket: {
        appId: process.env.NEXT_PUBLIC_LOGROCKET_APP_ID,
      },
    });
  }, []);

  return null;
}

