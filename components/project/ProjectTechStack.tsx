'use client';

import { motion } from 'framer-motion';

interface ProjectTechStackProps {
  techStack: string[];
}

const techColors: Record<string, string> = {
  'React': '#61dafb',
  'Next.js': '#000000',
  'TypeScript': '#3178c6',
  'Power Laws': '#339933',
  'JavaScript': '#f7df1e',
  'Python': '#3776ab',
  'PostgreSQL': '#336791',
  'MongoDB': '#47a248',
  'Redis': '#dc382d',
  'Docker': '#2496ed',
  'Kubernetes': '#326ce5',
  'Tailwind CSS': '#06b6d4',
  'Framer Motion': '#0055ff',
  'Three.js': '#000000',
  'D3.js': '#f9a03c',
  'Firebase': '#ffca28',
  'Vercel': '#000000',
  'Stripe': '#635bff',
  'JWT': '#000000',
  'SOC': '#000000',
  'FastAPI': '#009688',
  'Ableton Live': '#ff6b35',
  'Logic Pro': '#ff0000',
  'Max MSP': '#0066cc',
  'Jest': '#c21325',
  'Storybook': '#ff4785',
  'Styled Components': '#db7093',
  'Redux': '#764abc',
  'Expo': '#000020',
  'React Native': '#61dafb',
  'TouchDesigner': '#ff6b35',
  'Emergent Behaviour': '#8b5cf6',
  'Synthesizers': '#f59e0b',
  'Jazz Theory': '#7c3aed',
  'Serum': '#3b82f6',
  'Drum Programming': '#ef4444',
  'Guitar': '#10b981',
  'Audio Engineering': '#8b5cf6',
  'TensorFlow': '#ff6f00',
  'scikit-learn': '#f7931e',
  'Pandas': '#150458',
  'Groq': '#00ff88',
  'Axiom': '#ff6b35',
  'PostHog': '#f54e00',
  'Emergent': '#8b5cf6',
  'Murmuration': '#6366f1',
  'GLSL': '#ff6b35',
  'OSC': '#ff6b35',
  'MIDI Protocol': '#ff6b35',
  'Modular Synthesis': '#ff6b35',
  'Max/MSP': '#ff6b35'
};

const techLinks: Record<string, string> = {
  'React': 'https://en.wikipedia.org/wiki/React_(JavaScript_library)',
  'Next.js': 'https://en.wikipedia.org/wiki/Next.js',
  'TypeScript': 'https://en.wikipedia.org/wiki/TypeScript',
  'Power Laws': 'https://en.wikipedia.org/wiki/Abelian_sandpile_model',
  'JavaScript': 'https://en.wikipedia.org/wiki/JavaScript',
  'Python': 'https://en.wikipedia.org/wiki/Python_(programming_language)',
  'PostgreSQL': 'https://en.wikipedia.org/wiki/PostgreSQL',
  'MongoDB': 'https://en.wikipedia.org/wiki/MongoDB',
  'Redis': 'https://en.wikipedia.org/wiki/Redis',
  'Docker': 'https://en.wikipedia.org/wiki/Docker_(software)',
  'Kubernetes': 'https://en.wikipedia.org/wiki/Kubernetes',
  'Tailwind CSS': 'https://en.wikipedia.org/wiki/Tailwind_CSS',
  'Framer Motion': 'https://www.framer.com/motion/',
  'Three.js': 'https://en.wikipedia.org/wiki/Three.js',
  'D3.js': 'https://en.wikipedia.org/wiki/D3.js',
  'Firebase': 'https://en.wikipedia.org/wiki/Firebase',
  'Vercel': 'https://en.wikipedia.org/wiki/Vercel',
  'Stripe': 'https://en.wikipedia.org/wiki/Stripe',
  'JWT': 'https://en.wikipedia.org/wiki/JSON_Web_Token',
  'SOC': 'https://en.wikipedia.org/wiki/Self-organized_criticality',
  'FastAPI': 'https://en.wikipedia.org/wiki/FastAPI',
  'Ableton Live': 'https://www.ableton.com/en/',
  'Logic Pro': 'https://en.wikipedia.org/wiki/Logic_Pro',
  'Max MSP': 'https://en.wikipedia.org/wiki/Max_(software)',
  'Jest': 'https://en.wikipedia.org/wiki/Jest_(JavaScript_framework)',
  'Storybook': 'https://en.wikipedia.org/wiki/Storybook_(software)',
  'Styled Components': 'https://styled-components.com/',
  'Redux': 'https://en.wikipedia.org/wiki/Redux_(JavaScript_library)',
  'Expo': 'https://expo.dev/',
  'React Native': 'https://en.wikipedia.org/wiki/React_Native',
  'TouchDesigner': 'https://derivative.ca/',
  'Emergent Behaviour': 'https://en.wikipedia.org/wiki/Per_Bak',
  'Complex Systems Theory': 'https://www.santafe.edu/what-is-complex-systems-science',
  'Nonlinear Dynamics': 'https://www.stevenstrogatz.com/books/nonlinear-dynamics-and-chaos-with-applications-to-physics-biology-chemistry-and-engineering',
  'Statistical Mechanics': 'https://www.fooledbyrandomness.com/CV.htm',
  'Synthesizers': 'https://www.richarddevine.com/',
  'Jazz Theory': 'https://en.wikipedia.org/wiki/Entropy',
  'Serum': 'https://www.xferrecords.com/products/serum-2',
  'Drum Programming': 'https://www.soundonsound.com/techniques/classic-tracks-dj-shadow-midnight-perfect-world',
  'Guitar': 'https://www.youtube.com/watch?v=NcPIEEs_y8c',
  'Audio Engineering': 'https://www.youtube.com/watch?v=RqHKX4BDJ1Q',
  'Groq': 'https://groq.com/',
  'Axiom': 'https://axiom.co/',
  'PostHog': 'https://posthog.com/',
  'Emergent': 'https://www.youtube.com/watch?v=ydt99BXi3YU',
  'Murmuration': 'https://www.irishtimes.com/news/science/emergence-complex-behaviour-arising-from-simple-roots-1.4031230',
  'GLSL': 'https://github.com/KhronosGroup/GLSL',
  'OSC': 'https://www.ableton.com/en/packs/connection-kit/',
  'MIDI Protocol': 'https://www.ccarh.org/courses/253/handout/midiprotocol/',
  'Modular Synthesis': 'https://pittsburghmodular.com/lifeforms-sv-1',
  'Max/MSP': 'https://cycling74.com/'
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

          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <a
                  href={techLinks[tech] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200 group ${
                    techLinks[tech] 
                      ? 'hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer' 
                      : 'cursor-default'
                  }`}
                >
                  <span 
                    className={`w-2 h-2 rounded-full transition-transform duration-200 ${
                      techLinks[tech] ? 'group-hover:scale-110' : ''
                    }`}
                    style={{ backgroundColor: techColors[tech] || '#6b7280' }}
                  />
                  {tech}
                  {techLinks[tech] && (
                    <svg 
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                  )}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

