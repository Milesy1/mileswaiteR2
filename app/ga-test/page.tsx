'use client';

import { useEffect, useState } from 'react';
import { isGALoaded, event } from '@/lib/analytics';
import Link from 'next/link';

export default function GATestPage() {
  const [gaLoaded, setGALoaded] = useState(false);
  const [dataLayer, setDataLayer] = useState<any[]>([]);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const checkGA = () => {
      setGALoaded(isGALoaded());
      
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        setDataLayer((window as any).dataLayer);
      }
    };

    checkGA();
    const interval = setInterval(checkGA, 1000);
    return () => clearInterval(interval);
  }, []);

  const testEvent = () => {
    event({
      action: 'test_click',
      category: 'Test',
      label: 'Test Button Clicked',
    });
    setEvents([...events, `Test event sent at ${new Date().toLocaleTimeString()}`]);
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-primary-600 dark:text-primary-400 hover:underline">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8">Google Analytics Test Page</h1>

      <div className="space-y-8">
        {/* Status */}
        <section className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Status</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Google Analytics:</span>
              {gaLoaded ? (
                <span className="text-green-600 dark:text-green-400">✅ Loaded</span>
              ) : (
                <span className="text-red-600 dark:text-red-400">❌ Not Loaded</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Measurement ID:</span>
              <code className="bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded">
                {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'Not set'}
              </code>
            </div>
          </div>
        </section>

        {/* Test Buttons */}
        <section className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Test Events</h2>
          <div className="space-y-4">
            <button
              onClick={testEvent}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Send Test Event
            </button>
            {events.length > 0 && (
              <div className="mt-4 space-y-1">
                <p className="font-medium">Events Sent:</p>
                {events.map((event, i) => (
                  <div key={i} className="text-sm text-neutral-600 dark:text-neutral-400">
                    {event}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* DataLayer */}
        <section className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">DataLayer Contents</h2>
          <pre className="bg-neutral-900 dark:bg-neutral-950 text-green-400 p-4 rounded overflow-auto text-xs">
            {JSON.stringify(dataLayer, null, 2)}
          </pre>
        </section>

        {/* Instructions */}
        <section className="p-6 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">How to Verify</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open Chrome DevTools (F12)</li>
            <li>Go to Network tab</li>
            <li>Filter by "google-analytics.com" or "collect"</li>
            <li>Navigate pages or click test buttons</li>
            <li>You should see requests to Google Analytics</li>
            <li>Check Google Analytics Realtime dashboard for live data</li>
          </ol>
        </section>
      </div>
    </div>
  );
}

