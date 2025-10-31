/**
 * Core Web Vitals tracking for performance monitoring
 * Integrates with Vercel Analytics and can be extended for custom analytics
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
    };
  }
}

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
}

export function reportWebVitals(metric: WebVitalsMetric) {
  // Send to Vercel Analytics (automatically handled by @vercel/analytics)
  // Additional custom analytics can be added here
  
  // Log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    });
  }

  // Optional: Send to custom analytics endpoint
  // Example: Send to PostHog, Google Analytics, or custom endpoint
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Optional: Send to PostHog if available
  if (typeof window !== 'undefined' && (window as any).posthog) {
    (window as any).posthog.capture('web_vital', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
    });
  }
}

// Web Vitals component for Next.js App Router
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Import web-vitals dynamically
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
    onINP(reportWebVitals);
  }).catch(() => {
    // web-vitals might not be installed, silently fail
  });
}

