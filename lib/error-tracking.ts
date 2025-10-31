/**
 * Error tracking setup
 * Supports Sentry, LogRocket, or custom error tracking
 */

interface ErrorTrackingConfig {
  sentry?: {
    dsn: string;
    environment: string;
    tracesSampleRate: number;
  };
  logrocket?: {
    appId: string;
  };
}

/**
 * Initialize error tracking
 */
export function initErrorTracking(config?: ErrorTrackingConfig) {
  if (typeof window === 'undefined') return;

  // Initialize Sentry if DSN is provided
  if (config?.sentry?.dsn && process.env.NEXT_PUBLIC_SENTRY_DSN) {
    try {
      // Dynamic import to avoid bundling Sentry in client if not used
      import('@sentry/nextjs').then((Sentry) => {
        Sentry.init({
          dsn: config.sentry.dsn || process.env.NEXT_PUBLIC_SENTRY_DSN,
          environment: config.sentry.environment || process.env.NODE_ENV || 'production',
          tracesSampleRate: config.sentry.tracesSampleRate || 0.1,
          beforeSend(event, hint) {
            // Filter out sensitive data
            if (event.request) {
              delete event.request.cookies;
            }
            return event;
          },
        });
      }).catch(() => {
        // Sentry not installed, silently fail
      });
    } catch (error) {
      console.warn('Failed to initialize Sentry:', error);
    }
  }

  // Initialize LogRocket if app ID is provided
  if (config?.logrocket?.appId && process.env.NEXT_PUBLIC_LOGROCKET_APP_ID) {
    try {
      import('logrocket').then((LogRocket) => {
        LogRocket.default.init(config.logrocket.appId || process.env.NEXT_PUBLIC_LOGROCKET_APP_ID!);
      }).catch(() => {
        // LogRocket not installed, silently fail
      });
    } catch (error) {
      console.warn('Failed to initialize LogRocket:', error);
    }
  }

  // Global error handler
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Error tracking would happen here
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Error tracking would happen here
  });
}

/**
 * Report error to tracking service
 */
export function reportError(error: Error, context?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Tracking]', error, context);
  }

  // Report to Sentry if available
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, { extra: context });
  }

  // Report to LogRocket if available
  if (typeof window !== 'undefined' && (window as any).LogRocket) {
    (window as any).LogRocket.captureException(error, { extra: context });
  }
}

