'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { LazyStatsTicker } from '../../components/LazyStatsTicker';
import { BackToProjectLink } from '../../components/BackToProjectLink';

const ChatBot = dynamic(
  () => import('../../components/ChatBot').then((mod) => ({ default: mod.ChatBot })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 min-h-[420px] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-neutral-300 dark:border-neutral-600 border-t-primary-500 dark:border-t-primary-400 rounded-full mx-auto animate-spin"></div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading assistant…</p>
        </div>
      </div>
    ),
  }
);

export default function AssistantPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Intro */}
      <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <Link
              href="/about"
              className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              ← Back to About
            </Link>
          </div>
          <p className="text-sm font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
              className="inline-block"
            >
              Learning.
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className="inline-block"
            >
              Adapting.
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
              className="inline-block"
            >
              Questioning.
            </motion.span>
          </p>
        </div>
      </section>

      {/* Assistant */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ChatBot />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ErrorBoundary>
              <LazyStatsTicker />
            </ErrorBoundary>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <BackToProjectLink />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

