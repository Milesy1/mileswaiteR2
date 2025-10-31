import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | mileswaite.net',
  description: 'Articles about complex systems, TouchDesigner, generative art, and creative technology. Exploring emergent behavior, MIDI systems, and computational creativity.',
  keywords: ['blog', 'complex systems', 'TouchDesigner', 'generative art', 'MIDI', 'creative technology', 'emergence'],
  openGraph: {
    title: 'Blog | mileswaite.net',
    description: 'Articles about complex systems, TouchDesigner, generative art, and creative technology.',
    type: 'website',
    images: [
      {
        url: '/op-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog - mileswaite.net',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | mileswaite.net',
    description: 'Articles about complex systems, TouchDesigner, generative art, and creative technology.',
    images: ['/op-image.jpg'],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

