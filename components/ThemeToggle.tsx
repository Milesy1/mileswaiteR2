'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="w-12 h-5" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
      aria-label="Toggle theme"
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'light' ? 'D' : 'L'}
      </motion.span>
    </button>
  );
}
