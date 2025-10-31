'use client';

import { motion } from 'framer-motion';
import { Study } from '@/lib/types/complex-systems';
import { CacheStatusIndicator } from '@/components/lorenz/CacheStatusIndicator';

interface LorenzStudyHeaderProps {
  study: Study;
  fromCache: boolean;
}

export function LorenzStudyHeader({ study, fromCache }: LorenzStudyHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8"
    >
      {/* Cache Status */}
      <div className="flex justify-between items-start mb-6">
        <CacheStatusIndicator fromCache={fromCache} />
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          Study ID: <span className="font-mono text-xs">{study.id}</span>
        </div>
      </div>

      {/* Study Title */}
      <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
        {study.name}
      </h1>

      {/* Study Date */}
      <div className="flex items-center text-neutral-600 dark:text-neutral-400 mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-lg">
          Conducted on {formatDate(study.date_conducted)}
        </span>
      </div>

      {/* Study Description */}
      <div className="prose prose-lg max-w-none text-neutral-700 dark:text-neutral-300">
        <p className="text-xl leading-relaxed">
          {study.description}
        </p>
      </div>

      {/* System Type Badge */}
      <div className="mt-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          Lorenz Attractor System
        </span>
      </div>

      {/* Metadata */}
      {study.metadata && Object.keys(study.metadata).length > 0 && (
        <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
          <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
            Additional Metadata
          </h3>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">
            <pre className="whitespace-pre-wrap font-mono">
              {JSON.stringify(study.metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </motion.div>
  );
}




