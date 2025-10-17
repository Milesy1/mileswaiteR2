import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mileswaite.net'),
  title: {
    default: 'mileswaite.net',
    template: '%s | mileswaite.net',
  },
  description: 'Modern portfolio showcasing music, code, and creative projects. Built with Next.js 14+ App Router and Tailwind CSS.',
  keywords: ['portfolio', 'developer', 'music', 'code', 'projects', 'nextjs', 'tailwind'],
  authors: [{ name: 'Miles' }],
  creator: 'Miles',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mileswaite.net',
    title: 'Miles Portfolio - Creative Technology & Complex Systems',
    description: 'Modern portfolio showcasing music, code, and creative projects. Built with Next.js 14+ App Router and Tailwind CSS.',
    siteName: 'mileswaite.net',
    images: [
      {
        url: '/op-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Miles Portfolio - Creative Technology & Complex Systems',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miles Portfolio - Creative Technology & Complex Systems',
    description: 'Modern portfolio showcasing music, code, and creative projects. Built with Next.js 14+ App Router and Tailwind CSS.',
    creator: '@miles',
    images: ['/op-image.jpg'],
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
        <Analytics />
      </body>
    </html>
  );
}
