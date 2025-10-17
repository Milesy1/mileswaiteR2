import { Metadata } from 'next';
import AboutPage from './about';

export const metadata: Metadata = {
  title: 'About',
  description: 'Miles Waite - Certified by the Santa Fe Institute of Complex Science, with expertise in complex, adaptive systems and 20+ years experience in large-scale real-time systems.',
  openGraph: {
    title: 'About | Miles Portfolio',
    description: 'Miles Waite - Certified by the Santa Fe Institute of Complex Science, with expertise in complex, adaptive systems and 20+ years experience in large-scale real-time systems.',
  },
};

export default function About() {
  return <AboutPage />;
}
