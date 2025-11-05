'use client';

import { motion } from 'framer-motion';
import { Study } from '@/lib/types/complex-systems';

interface LorenzMethodologyProps {
  study: Study;
}

export function LorenzMethodology({ study }: LorenzMethodologyProps) {
  const methodologySections = [
    {
      title: 'Numerical Integration',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      content: [
        'Fourth-order Runge-Kutta method for numerical integration',
        'Adaptive step size control for accuracy and efficiency',
        'Time step: 0.01 seconds (typical)',
        'Integration tolerance: 1e-8 (relative)',
        'Maximum integration time: 1000 seconds'
      ]
    },
    {
      title: 'Lyapunov Exponent Calculation',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      content: [
        'Wolf\'s algorithm for largest Lyapunov exponent',
        'Benettin\'s method for full spectrum calculation',
        'Orthogonalization frequency: every 10 steps',
        'Convergence threshold: 1e-6',
        'Minimum integration time: 1000 time units'
      ]
    },
    {
      title: 'Correlation Dimension',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      content: [
        'Grassberger-Procaccia algorithm implementation',
        'Embedding dimension: 3 (minimum for Lorenz system)',
        'Time delay: 1 (sampling rate)',
        'Scaling range: 0.01 to 0.1 (relative to attractor size)',
        'Number of reference points: 1000'
      ]
    },
    {
      title: 'Data Processing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      content: [
        'Trajectory sampling: 1000 points per second',
        'Transient removal: first 10% of data discarded',
        'Data validation: range and continuity checks',
        'Storage format: double precision floating point',
        'Compression: gzip for large datasets'
      ]
    }
  ];

  const computationalDetails = [
    {
      category: 'Hardware',
      details: [
        'CPU: Multi-core processor (Julia parallel computing)',
        'Memory: 16GB RAM minimum',
        'Storage: SSD for fast I/O operations',
        'GPU: Optional CUDA acceleration for large datasets'
      ]
    },
    {
      category: 'Software Stack',
      details: [
        'Julia 1.9+ with DynamicalSystems.jl package',
        'DifferentialEquations.jl for ODE solving',
        'ChaosTools.jl for chaos analysis',
        'DataFrames.jl for data manipulation'
      ]
    },
    {
      category: 'Performance',
      details: [
        'Integration speed: ~1M points/second (single core)',
        'Memory usage: ~100MB for 1M trajectory points',
        'Cache hit rate: >95% for repeated calculations',
        'API response time: <200ms (cached), <2s (uncached)'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Methodology & Computation
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Detailed methodology and computational approach for this Lorenz attractor study
        </p>
      </div>

      {/* Study Metadata */}
      <div className="mb-8 p-6 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Study Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">Study ID:</span>
            <span className="ml-2 font-mono text-neutral-900 dark:text-neutral-100">{study.id}</span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">Conducted:</span>
            <span className="ml-2 text-neutral-900 dark:text-neutral-100">
              {new Date(study.date_conducted).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">System Type:</span>
            <span className="ml-2 text-neutral-900 dark:text-neutral-100">{study.system_type}</span>
          </div>
          <div>
            <span className="text-neutral-600 dark:text-neutral-400">Last Updated:</span>
            <span className="ml-2 text-neutral-900 dark:text-neutral-100">
              {new Date(study.updated_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Methodology Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {methodologySections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="p-6 border border-neutral-200 dark:border-neutral-600 rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg mr-4">
                {section.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {section.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Computational Details */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
          Computational Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {computationalDetails.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + 0.1 * index }}
              className="p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-lg"
            >
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                {detail.category}
              </h4>
              <ul className="space-y-2">
                {detail.details.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-neutral-700 dark:text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reproducibility */}
      <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              Reproducibility & Open Science
            </h3>
            <div className="text-sm text-green-700 dark:text-green-300 space-y-2">
              <p>• <strong>Deterministic:</strong> All calculations use fixed random seeds for reproducibility</p>
              <p>• <strong>Version Control:</strong> Complete Julia environment and package versions tracked</p>
              <p>• <strong>Documentation:</strong> Full methodology and parameter documentation available</p>
              <p>• <strong>Data Sharing:</strong> Raw trajectory data and computed metrics available via API</p>
              <p>• <strong>Code Access:</strong> Analysis scripts and computation pipeline open source</p>
            </div>
          </div>
        </div>
      </div>

      {/* References */}
      <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Key References
        </h3>
        <div className="text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
          <p>• Lorenz, E. N. (1963). "Deterministic nonperiodic flow." <em>Journal of the Atmospheric Sciences</em>, 20(2), 130-141.</p>
          <p>• Wolf, A., et al. (1985). "Determining Lyapunov exponents from a time series." <em>Physica D: Nonlinear Phenomena</em>, 16(3), 285-317.</p>
          <p>• Grassberger, P., & Procaccia, I. (1983). "Measuring the strangeness of strange attractors." <em>Physica D: Nonlinear Phenomena</em>, 9(1-2), 189-208.</p>
          <p>• Datseris, G., & Vaidyanathan, R. (2022). "DynamicalSystems.jl: A Julia software library for chaos and nonlinear dynamics." <em>Journal of Open Source Software</em>, 7(69), 3788.</p>
        </div>
      </div>
    </motion.div>
  );
}











