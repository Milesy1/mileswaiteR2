import { Metadata } from 'next';
import AboutPage from './about';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Miles - a developer and music creator passionate about combining interactive design, 3D visuals, and code to craft immersive experiences.',
  openGraph: {
    title: 'About Me | Miles Portfolio',
    description: 'Learn more about Miles - a developer and music creator passionate about combining interactive design, 3D visuals, and code to craft immersive experiences.',
  },
};

export default function About() {
  return <AboutPage />;
}
