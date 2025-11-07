'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useKeyboardShortcutsContext } from './KeyboardShortcutsProvider';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Music', href: '/music' },
  { name: 'Code', href: '/code' },
  { name: 'About', href: '/about' },
  { name: 'Now', href: '/now' },
  { name: '?', href: '/assistant', srLabel: 'Portfolio assistant', mobileLabel: 'Assistant' },
];

export function Navigation() {
  const pathnameRaw = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentPathname, setCurrentPathname] = useState('');
  const { openSearch } = useKeyboardShortcutsContext();

  // Ensure component is mounted before using pathname-dependent rendering
  useEffect(() => {
    setMounted(true);
    setCurrentPathname(pathnameRaw || '');
  }, [pathnameRaw]);

  // Use stable pathname value - only update after mount
  const pathname = mounted ? currentPathname : '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathnameRaw]);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={false}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-soft border-b border-neutral-200 dark:border-neutral-800'
          : 'bg-transparent'
      }`}
      suppressHydrationWarning
    >
      <nav className="w-full" suppressHydrationWarning>
        <div className="flex justify-between items-center h-16 lg:h-20 px-[10%] sm:px-[8%] lg:px-[5%]" suppressHydrationWarning>
          {/* Logo */}
          <Link
            href="/"
            className="text-sm lg:text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            mileswaite.net
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" suppressHydrationWarning>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-label={item.srLabel ?? item.name}
                className="relative text-sm lg:text-base font-medium transition-colors duration-200 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400"
                data-active={pathname === item.href ? 'true' : 'false'}
              >
                <span aria-hidden={item.srLabel ? 'true' : undefined}>{item.name}</span>
                {item.srLabel && <span className="sr-only">{item.srLabel}</span>}
                {mounted && pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Search Button */}
            <button
              onClick={openSearch}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 group"
              aria-label="Search projects"
            >
              <svg className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs font-mono bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded border border-neutral-300 dark:border-neutral-600">
                ⌘K
              </kbd>
            </button>
            
            <ThemeToggle />
          </div>

          {/* Mobile menu button & theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={openSearch}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              aria-label="Search projects"
            >
              <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 0 : -4,
                  }}
                  className="w-5 h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded-full"
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="w-5 h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded-full mt-1"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? 0 : 4,
                  }}
                  className="w-5 h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded-full mt-1"
                />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md relative z-50"
              >
              <div className="px-4 py-4 space-y-2">
                {/* Search in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 }}
                >
                  <button
                    onClick={() => {
                      openSearch()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search Projects</span>
                  </button>
                </motion.div>
                
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label={item.srLabel ?? item.name}
                      className="block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 data-[active=true]:text-primary-600 dark:data-[active=true]:text-primary-400 data-[active=true]:bg-primary-50 dark:data-[active=true]:bg-primary-900/30"
                      data-active={pathname === item.href ? 'true' : 'false'}
                    >
                      {item.mobileLabel ?? item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
