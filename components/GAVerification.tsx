'use client';

import { useEffect, useState } from 'react';
import { isGALoaded } from '@/lib/analytics';

export function GAVerification() {
  const [gaStatus, setGaStatus] = useState<'checking' | 'loaded' | 'not-loaded'>('checking');

  useEffect(() => {
    // Check GA status after a short delay to allow script to load
    const checkGA = () => {
      if (isGALoaded()) {
        setGaStatus('loaded');
      } else {
        setGaStatus('not-loaded');
      }
    };

    // Check immediately
    checkGA();

    // Check again after 2 seconds (in case script is still loading)
    const timer = setTimeout(checkGA, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 px-3 py-2 rounded-lg shadow-lg text-xs font-mono">
      {gaStatus === 'checking' && (
        <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
          GA: Checking...
        </div>
      )}
      {gaStatus === 'loaded' && (
        <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
          GA: ✅ Loaded
        </div>
      )}
      {gaStatus === 'not-loaded' && (
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
          GA: ❌ Not Loaded
        </div>
      )}
    </div>
  );
}

