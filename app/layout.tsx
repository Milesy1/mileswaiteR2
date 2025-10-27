import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Navigation } from '@/components/Navigation';
import ClientFooter from '@/components/ClientFooter';
import { Analytics } from '@vercel/analytics/next';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CustomCursor from '@/components/CustomCursor';
import { ThemeProvider } from '@/contexts/ThemeContext';
import KeyboardShortcutsProvider from '@/components/KeyboardShortcutsProvider';
import { PersonSchema, OrganizationSchema, WebsiteSchema } from '@/components/JsonLdSchema';

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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.jpg', type: 'image/jpeg' }
    ],
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 antialiased transition-colors duration-300">
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        <ThemeProvider>
          <KeyboardShortcutsProvider>
            <CustomCursor />
            <div className="relative flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <ClientFooter />
            </div>
          </KeyboardShortcutsProvider>
        </ThemeProvider>
        <Analytics />
        
        {/* JSON-LD Schema for SEO */}
        <PersonSchema />
        <OrganizationSchema />
        <WebsiteSchema />
      </body>
    </html>
  );
}

