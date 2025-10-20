// Google Analytics event tracking utilities

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Helper function to check if GA is loaded
export const isGALoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag !== 'undefined';
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: buttonName,
  });
};

// Track navigation
export const trackNavigation = (destination: string) => {
  event({
    action: 'navigate',
    category: 'Navigation',
    label: destination,
  });
};

