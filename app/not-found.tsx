'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import FibonacciSphere to avoid SSR issues with p5.js
const FibonacciSphere = dynamic(
  () => import('@/components/FibonacciSphere'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-neutral-300 dark:border-neutral-600 border-t-primary-600 rounded-full animate-spin" />
      </div>
    )
  }
);

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-white dark:bg-neutral-900">
      {/* Background Fibonacci Sphere - subtle and atmospheric */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <FibonacciSphere width={800} height={800} className="w-full h-full" />
      </div>

      {/* Content Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl w-full text-center"
      >
        {/* Fibonacci Sphere Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="mb-8 flex justify-center"
        >
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 relative">
            <FibonacciSphere width={384} height={384} className="w-full h-full" />
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-light text-neutral-900 dark:text-neutral-100 mb-2">
            404
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-red-500 via-white to-green-500 mx-auto"></div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-sm sm:text-base font-light text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed max-w-md mx-auto"
        >
          The path you're seeking doesn't exist in this space.
          <br />
          Perhaps it lies within a different sphere.
        </motion.p>

        {/* Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-3 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
          >
            Return Home
          </Link>
        </motion.div>

        {/* Subtle Fibonacci Reference */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800"
        >
          <p className="text-xs text-neutral-500 dark:text-neutral-500 font-mono">
            φ = (√5 + 1) / 2 − 1
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

