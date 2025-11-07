import { Metadata } from 'next';
import AssistantPage from './assistant';

export const metadata: Metadata = {
  title: 'Assistant',
  description: 'Chat with the retrieval-augmented assistant for mileswaite.net.',
  openGraph: {
    title: 'Assistant | mileswaite.net',
    description: 'Ask questions about projects, research, and technical decisions.',
  },
};

export default function Assistant() {
  return <AssistantPage />;
}

