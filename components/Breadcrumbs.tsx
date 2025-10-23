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

    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert segment to readable name
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Don't add current page as breadcrumb (it's the page title)
      if (index < segments.length - 1) {
        breadcrumbs.push({
          name,
          href: currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Show breadcrumbs if we have more than just "Home" or if we're not on the homepage
  if (breadcrumbs.length <= 1 && pathname !== '/') {
    // For single segment pages like /about, we still want to show Home > About
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 1) {
      const name = segments[0]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ name, href: pathname });
    }
  }

  if (breadcrumbs.length <= 1) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8"
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <svg
              className="w-4 h-4 mx-2 text-neutral-400 dark:text-neutral-500"
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
            <span className="text-neutral-700 dark:text-neutral-300 font-medium">
              {item.name}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </motion.nav>
  );
}
