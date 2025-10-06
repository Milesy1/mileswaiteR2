'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="text-8xl sm:text-9xl font-light text-primary-600 mb-4">
            404
          </div>
          <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
        </div>

        {/* Content */}
        <h1 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-neutral-600 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary px-6 py-3"
          >
            Go Home
          </Link>
          <Link
            href="/about"
            className="btn-secondary px-6 py-3"
          >
            About Me
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/projects"
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              Projects
            </Link>
            <Link
              href="/music"
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              Music
            </Link>
            <Link
              href="/code"
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              Code
            </Link>
            <Link
              href="/about"
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              About
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
