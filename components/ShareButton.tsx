'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { event } from '@/lib/analytics';

interface ShareButtonProps {
  url?: string;
  title: string;
  slug?: string;
  className?: string;
}

export function ShareButton({ url, title, slug, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Generate URL on client side
    if (url) {
      setShareUrl(url);
    } else if (slug && typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/projects/${slug}`);
    }
  }, [url, slug]);

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setShowToast(true);
      
      // Track share event
      event({
        action: 'share',
        category: 'Project',
        label: `Copy link: ${title}`,
      });

      // Hide toast after 2 seconds
      setTimeout(() => {
        setShowToast(false);
        setTimeout(() => setCopied(false), 300);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = async () => {
    // Check if Web Share API is available (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: shareUrl,
        });
        
        // Track share event
        event({
          action: 'share',
          category: 'Project',
          label: `Native share: ${title}`,
        });
      } catch (err) {
        // User cancelled or error occurred
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      // Fallback to copy link
      handleCopyLink();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={handleShare}
        className="group flex items-center space-x-2 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share project"
      >
        {copied ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        )}
        <span className="text-sm font-medium">
          {copied ? 'Copied!' : 'Share'}
        </span>
      </motion.button>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs rounded-lg shadow-lg whitespace-nowrap z-50"
          >
            Link copied to clipboard!
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="w-2 h-2 bg-neutral-900 dark:bg-neutral-100 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

