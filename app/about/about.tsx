'use client';

import { motion } from 'framer-motion';
import { CubeScene } from '../../components/CubeScene';

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
                  About Me
                </h1>
                <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"></div>
              </div>

              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                <p>
                  Hi, I'm Miles, a developer and music enthusiast passionate about creating 
                  immersive digital experiences. I specialize in building modern web applications, 
                  interactive projects, and love experimenting with 3D graphics and animations on the web.
                </p>
                <p>
                  This portfolio showcases my work across multiple disciplines - from music production 
                  and creative coding to full-stack web development. Each project represents a unique 
                  blend of technical expertise and creative vision.
                </p>
                <p>
                  I believe in the power of technology to create meaningful connections and experiences. 
                  Whether it's through music, code, or interactive design, I'm always exploring new ways 
                  to push the boundaries of what's possible.
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

      {/* Philosophy Section */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900">
              My Philosophy
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              I believe that the best digital experiences are those that seamlessly blend form and function. 
              Every project is an opportunity to learn, grow, and create something that resonates with people. 
              Whether it's a piece of music, a web application, or an interactive installation, 
              I strive to make technology feel human and accessible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900">
              Let's Create Something Amazing
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              I'm always interested in new opportunities and collaborations. 
              Whether you have a project in mind or just want to chat about technology and creativity, 
              I'd love to hear from you.
            </p>
            <div className="pt-8">
              <a
                href="mailto:miles@example.com"
                className="btn-primary text-base px-8 py-4"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
