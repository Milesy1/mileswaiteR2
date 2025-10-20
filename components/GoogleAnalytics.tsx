'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Extend window type for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId) return;
    
    // Send pageview event
    if (window.gtag) {
      window.gtag('config', measurementId, {
        page_path: pathname,
      });
    }
  }, [pathname, measurementId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        onLoad={() => {
          // Initialize gtag after script loads
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag() {
            window.dataLayer.push(arguments);
          };
          window.gtag('js', new Date());
          window.gtag('config', measurementId, {
            send_page_view: true,
          });
        }}
      />
    </>
  );
}

