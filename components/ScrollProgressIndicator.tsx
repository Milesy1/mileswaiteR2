'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Don't show if user prefers reduced motion or not mounted
    if (shouldReduceMotion || !mounted) {
      return;
    }

    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate scroll progress (0 to 1)
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
      
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    // Initial calculation
    calculateScrollProgress();

    // Throttle scroll events for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateScrollProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, [shouldReduceMotion, mounted]);

  // Don't render if user prefers reduced motion or not mounted
  if (shouldReduceMotion || !mounted) {
    return null;
  }

  return (
    <div className="hidden md:block fixed left-0 top-0 bottom-0 w-[2px] z-[60] pointer-events-none">
      {/* Background line - subtle track that's always visible */}
      <div 
        className="absolute inset-0 scroll-progress-track"
        aria-hidden="true"
      />
      
      {/* Progress line - fills as you scroll with subtle gradient */}
      <div 
        className="absolute top-0 left-0 w-full transition-all duration-500 ease-out"
        style={{
          height: `${scrollProgress * 100}%`,
        }}
        aria-hidden="true"
      >
        {/* Light mode - subtle gradient with soft glow */}
        <div 
          className="absolute inset-0 w-full h-full scroll-progress-fill-light dark:hidden"
        />
        {/* Dark mode - lighter, more ethereal */}
        <div 
          className="absolute inset-0 w-full h-full scroll-progress-fill-dark hidden dark:block"
        />
      </div>
    </div>
  );
}

