import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Now | Miles Waite',
  description: 'What I\'m currently building, exploring, reading, and thinking about. A live snapshot of my current projects and interests.',
  openGraph: {
    title: 'Now | Miles Waite',
    description: 'What I\'m currently building, exploring, reading, and thinking about.',
    type: 'website',
  },
}

export default function NowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

