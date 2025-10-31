'use client';

import { useState, useEffect, ReactNode, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeavyContentLoaderProps {
  children: ReactNode;
  threshold?: number; // ms to wait before showing progress
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
}

export function HeavyContentLoader({
  children,
  threshold = 500,
  onLoadStart,
  onLoadComplete,
}: HeavyContentLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const startTime = Date.now();
    startTimeRef.current = startTime;
    setIsLoading(true);
    setProgress(0);
    onLoadStart?.();

    // Simulate progress
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / 2000) * 100, 90); // Max 90% until loaded
      setProgress(newProgress);
    }, 50);

    // Simulate completion
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        onLoadComplete?.();
      }, 300);
    }, threshold + 200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [threshold, onLoadStart, onLoadComplete]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center space-y-4">
              <div className="w-64 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Loading content...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && children}
    </>
  );
}




