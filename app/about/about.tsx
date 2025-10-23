'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import RotatingCylinderLinesR3F from '../../components/RotatingCylinderLinesR3F';
import { ChatBot } from '../../components/ChatBot';
import { BackToProjectLink } from '../../components/BackToProjectLink';
import StatsTicker from '../../components/StatsTicker';

export default function AboutPage() {
  useEffect(() => {
    // Handle chatbot hash navigation
    if (window.location.hash === '#chatbot') {
      setTimeout(() => {
        const chatbotElement = document.getElementById('chatbot');
        if (chatbotElement) {
          // Get the input field within the chatbot
          const inputElement = chatbotElement.querySelector('input');
          
          if (inputElement) {
            // Scroll to the input field, accounting for mobile keyboard
            inputElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center',
              inline: 'nearest'
            });
            
            // Additional mobile adjustments
            setTimeout(() => {
              const viewportHeight = window.innerHeight;
              const isMobile = viewportHeight < 768;
              
              if (isMobile) {
                // Scroll up more on mobile to account for keyboard
                window.scrollBy(0, -150);
              }
            }, 300);
          } else {
            // Fallback to scrolling to the chatbot section
            chatbotElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }
      }, 100); // Small delay to ensure page is loaded
    }
  }, []);
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
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 dark:text-neutral-100 mb-6">
                  About
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-800 dark:text-neutral-200 mb-6">
                  Miles Waite{' '}
                  <span className="text-sm font-normal text-[#888] dark:text-neutral-400 ml-2">
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

              <div className="space-y-6 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
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
                <p className="text-xl font-medium text-neutral-800 dark:text-neutral-200 pt-4">
                  Emergent. Robust. Antifragile
                </p>
              </div>

              {/* Skills */}
              <div className="pt-8">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Technologies & Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 
                    'Framer Motion', 'Three.js', 'Node.js', 'Python',
                    'Music Production', '3D Graphics', 'Web Design'
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm text-neutral-700 dark:text-neutral-300 hover:border-primary-200 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors duration-200"
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
              <div className="w-full h-[600px] lg:h-[700px]">
                <RotatingCylinderLinesR3F />
              </div>
            </motion.div>
          </div>
          
          {/* CV Download - Between cylinder and chatbot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center pt-16"
          >
            <a
              href="/cv/Miles-Waite-CV.pdf"
              download
              className="inline-block px-6 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-base text-neutral-700 dark:text-neutral-300 hover:border-primary-200 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              Download CV / Resume
            </a>
          </motion.div>
        </div>
      </section>

      {/* ChatBot Section */}
      <section id="chatbot" className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-base font-light text-[#666] dark:text-neutral-400 lowercase tracking-[0.1em] mb-4">
              mileswaite.net
            </h2>
            <div className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
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

          {/* Stats Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StatsTicker />
          </motion.div>

          {/* Back to Project Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <BackToProjectLink />
          </motion.div>

          {/* Back to Home Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-4"
          >
            <a 
              href="/" 
              className="inline-flex items-center text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
