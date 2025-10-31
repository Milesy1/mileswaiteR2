'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface OptimisticButtonProps {
  onClick: () => Promise<void> | void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  optimisticText?: string;
  successText?: string;
  duration?: number;
}

export function OptimisticButton({
  onClick,
  children,
  className = '',
  disabled = false,
  optimisticText,
  successText,
  duration = 2000,
}: OptimisticButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleClick = async () => {
    if (disabled || status !== 'idle') return;

    setStatus('loading');
    
    // Show optimistic update immediately
    if (optimisticText) {
      setTimeout(() => {
        setStatus('success');
        setTimeout(() => setStatus('idle'), duration);
      }, 100);
    }

    try {
      await onClick();
      setStatus('success');
      setTimeout(() => setStatus('idle'), duration);
    } catch (error) {
      setStatus('idle');
      console.error('Action failed:', error);
    }
  };

  const displayText = 
    status === 'loading' && optimisticText ? optimisticText :
    status === 'success' && successText ? successText :
    children;

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || status !== 'idle'}
      className={className}
      whileHover={status === 'idle' ? { scale: 1.02 } : {}}
      whileTap={status === 'idle' ? { scale: 0.98 } : {}}
      animate={{
        opacity: status === 'loading' ? 0.7 : 1,
      }}
    >
      {displayText}
    </motion.button>
  );
}




