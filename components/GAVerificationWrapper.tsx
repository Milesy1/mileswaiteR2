'use client';

import React, { useEffect, useState } from 'react';

export default function GAVerificationWrapper() {
  const [isClient, setIsClient] = useState(false);
  const [GAVerification, setGAVerification] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Only load in development
    if (process.env.NODE_ENV === 'development') {
      import('@/components/GAVerification')
        .then(mod => setGAVerification(() => mod.default))
        .catch(() => {
          // Silently fail if component can't be loaded
          setGAVerification(null);
        });
    }
  }, []);

  // Only render in development and on client side with component loaded
  if (process.env.NODE_ENV !== 'development' || !isClient || !GAVerification) {
    return null;
  }

  return <GAVerification />;
}

