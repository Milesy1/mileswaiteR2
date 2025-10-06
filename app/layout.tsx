import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Miles Portfolio',
    template: '%s | Miles Portfolio',
  },
  description: 'Modern portfolio showcasing music, code, and creative projects. Built with Next.js 14+ App Router and Tailwind CSS.',
  keywords: ['portfolio', 'developer', 'music', 'code', 'projects', 'nextjs', 'tailwind'],
  authors: [{ name: 'Miles' }],
  creator: 'Miles',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://miles-portfolio.vercel.app',
    title: 'Miles Portfolio',
    description: 'Modern portfolio showcasing music, code, and creative projects.',
    siteName: 'Miles Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miles Portfolio',
    description: 'Modern portfolio showcasing music, code, and creative projects.',
    creator: '@miles',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
