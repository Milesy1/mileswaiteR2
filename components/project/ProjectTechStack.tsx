'use client';

import { motion } from 'framer-motion';

interface ProjectTechStackProps {
  techStack: string[];
}

const techIcons: Record<string, string> = {
  'React': '⚛️',
  'Next.js': '▲',
  'TypeScript': '🔷',
  'Node.js': '🟢',
  'JavaScript': '🟨',
  'Python': '🐍',
  'PostgreSQL': '🐘',
  'MongoDB': '🍃',
  'Redis': '🔴',
  'Docker': '🐳',
  'Kubernetes': '☸️',
  'Tailwind CSS': '🎨',
  'Framer Motion': '🎭',
  'Three.js': '🎲',
  'D3.js': '📊',
  'Firebase': '🔥',
  'Vercel': '▲',
  'Stripe': '💳',
  'JWT': '🔐',
  'Express': '🚀',
  'FastAPI': '⚡',
  'Ableton Live': '🎵',
  'Logic Pro': '🎼',
  'Max MSP': '🎛️',
  'Jest': '🧪',
  'Storybook': '📚',
  'Styled Components': '💅',
  'Redux': '🔄',
  'Expo': '📱',
  'React Native': '📱'
};

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  return (
    <section className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 dark:text-neutral-100 mb-6">
              Technology Stack
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100 dark:border-neutral-800 group-hover:border-primary-200 dark:group-hover:border-primary-500 text-center">
                  <div className="text-3xl mb-3">
                    {techIcons[tech] || '⚙️'}
                  </div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {tech}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

