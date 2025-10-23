'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', href: '/' }
    ];

    segments.forEach((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ name, href });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-24 left-4 z-40"
      aria-label="Breadcrumb"
    >
      <div className="flex items-center space-x-1 text-xs text-neutral-500 dark:text-neutral-400 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-neutral-200 dark:border-neutral-700">
        {breadcrumbs.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-3 h-3 mx-1 text-neutral-400 dark:text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-neutral-700 dark:text-neutral-200">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </motion.nav>
  );
}
