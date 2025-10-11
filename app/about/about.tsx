'use client';

import { motion } from 'framer-motion';
import { CubeScene } from '../../components/CubeScene';
import { ChatBot } from '../../components/ChatBot';

export default function AboutPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 mb-6">
                  About
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-800 mb-6">
                  Miles Waite{' '}
                  <span className="text-sm font-normal text-[#888] ml-2">
                    <motion.span
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
                      className="inline-block"
                    >
                      Robust.
                    </motion.span>
                    {' '}
                    <motion.span
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                      className="inline-block"
                    >
                      Antifragile.
                    </motion.span>
                    {' '}
                    <motion.span
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                      className="inline-block"
                    >
                      Emergent.
                    </motion.span>
                  </span>
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"></div>
              </div>

              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  Certified by the Santa Fe Institute of Complex Science, with expertise in complex, adaptive systems.
                </p>
                <p>
                  20+ years experience in designing, implementing & testing large-scale real-time complex systems, & automating company-wide processes.
                </p>
                <p>
                  Proven experience of combining TouchDesigner and Python to create immersive, interactive, and reliable experiences.
                </p>
                <p>
                  Specialise in systems-thinking applied to creative tech, ensuring projects are visually compelling and technically robust.
                </p>
                <p>
                  Experienced in hybrid roles bridging technical problem solving and experimental creative work.
                </p>
                <p className="text-xl font-medium text-neutral-800 pt-4">
                  Emergent. Robust. Antifragile
                </p>
              </div>

              {/* Skills */}
              <div className="pt-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Technologies & Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 
                    'Framer Motion', 'Three.js', 'Node.js', 'Python',
                    'Music Production', '3D Graphics', 'Web Design'
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-700 hover:border-primary-200 hover:text-primary-600 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 3D Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-96 lg:h-[500px]">
                <CubeScene />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-50/50 to-transparent pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ChatBot Section */}
      <section id="chatbot" className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-base font-light text-[#666] lowercase tracking-[0.1em] mb-4">
              mileswaite.net
            </h2>
            <div className="text-lg text-neutral-600 max-w-2xl mx-auto">
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
                className="inline-block"
              >
                Robust.
              </motion.span>
              {' '}
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="inline-block"
              >
                Antifragile.
              </motion.span>
              {' '}
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                className="inline-block"
              >
                Emergent.
              </motion.span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ChatBot />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
