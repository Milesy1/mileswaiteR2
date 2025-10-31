'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonLoader } from './SkeletonLoader';

interface ContentLoaderProps {
  children: ReactNode;
  isLoading: boolean;
  skeleton?: ReactNode;
  delay?: number; // Minimum time to show skeleton (prevents flash)
}

export function ContentLoader({
  children,
  isLoading,
  skeleton,
  delay = 300,
}: ContentLoaderProps) {
  const [showContent, setShowContent] = useState(!isLoading);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowContent(false);
      setMinTimeElapsed(false);
      const timer = setTimeout(() => setMinTimeElapsed(true), delay);
      return () => clearTimeout(timer);
    } else if (minTimeElapsed) {
      setShowContent(true);
    }
  }, [isLoading, delay, minTimeElapsed]);

  useEffect(() => {
    if (!isLoading && minTimeElapsed) {
      setShowContent(true);
    }
  }, [isLoading, minTimeElapsed]);

  return (
    <AnimatePresence mode="wait">
      {isLoading || !showContent ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {skeleton || <SkeletonLoader variant="card" />}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


