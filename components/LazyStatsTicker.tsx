'use client';

import { useEffect, useState, useRef } from 'react';
import StatsTicker from './StatsTicker';

export function LazyStatsTicker() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect(); // Only load once
        }
      },
      { 
        rootMargin: '100px', // Start loading 100px before it's visible
        threshold: 0.1 
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {shouldLoad ? (
        <StatsTicker />
      ) : (
        <div className="w-full max-w-4xl mx-auto border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 py-3 px-4">
          <div className="flex items-center gap-6 overflow-hidden">
            {/* Loading skeleton */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-baseline gap-1.5 flex-shrink-0">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-16 animate-pulse"></div>
                <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-20 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                {i < 5 && <span className="text-neutral-300 dark:text-neutral-600">•</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

