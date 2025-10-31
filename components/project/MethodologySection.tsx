'use client';

import { motion } from 'framer-motion';

export function MethodologySection() {
  const methodologies = [
    {
      title: 'High Performance',
      subtitle: 'Julia',
      description: 'Leveraging Julia\'s high-performance computing capabilities for real-time complex systems simulation and analysis.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: [
        'Sub-millisecond computation times',
        'Parallel processing capabilities',
        'Memory-efficient algorithms',
        'Real-time visualization'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Rigorous Methods',
      subtitle: 'DynamicalSystems.jl',
      description: 'Using state-of-the-art scientific computing libraries for accurate dynamical systems analysis and chaos detection.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        'Lyapunov exponent calculation',
        'Bifurcation analysis',
        'Poincaré sections',
        'Stability analysis'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Reproducible',
      subtitle: 'Open Source',
      description: 'All research code, data, and methodologies are open source, ensuring reproducibility and scientific transparency.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: [
        'Git-based version control',
        'Comprehensive documentation',
        'Docker containerization',
        'MIT license'
      ],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Header */}
          <div className="text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 dark:text-neutral-100">
              Methodology
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Rigorous scientific computing with modern tools and open-source principles
            </p>
          </div>

          {/* Methodology Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {methodologies.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${method.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                        {method.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-90">{method.subtitle}</div>
                        <div className="text-lg font-semibold">{method.title}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                      {method.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm uppercase tracking-wide">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {method.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${method.color} rounded-full mr-3 flex-shrink-0`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-xl p-8"
          >
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Open Source Research
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
              All code, data, and methodologies are publicly available. 
              Contribute to advancing the field of complex systems research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/mileswaite/complex-systems"
                className="inline-flex items-center px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
              <a
                href="/api/studies/chaos"
                className="inline-flex items-center px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 dark:hover:border-primary-500 rounded-lg transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Try the API
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}






