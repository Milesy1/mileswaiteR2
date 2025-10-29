'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export default function ClientFooter() {
  const pathname = usePathname();
  const showAdmin = pathname === '/now';
  
  return <Footer showAdmin={showAdmin} />;
}




