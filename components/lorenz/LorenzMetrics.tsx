'use client';

import { motion } from 'framer-motion';
import { ChaosMetric } from '@/lib/types/complex-systems';
import { CacheStatusIndicator } from '@/components/lorenz/CacheStatusIndicator';

interface LorenzMetricsProps {
  metrics: ChaosMetric[];
  fromCache: boolean;
}

export function LorenzMetrics({ metrics, fromCache }: LorenzMetricsProps) {
  // Find specific metrics
  const lyapunovExponents = metrics.filter(m => 
    m.metric_name.toLowerCase().includes('lyapunov') || 
    m.metric_name.toLowerCase().includes('λ')
  );
  
  const correlationDimension = metrics.find(m => 
    m.metric_name.toLowerCase().includes('correlation') && 
    m.metric_name.toLowerCase().includes('dimension')
  );
  
  const kaplanYorkeDimension = metrics.find(m => 
    m.metric_name.toLowerCase().includes('kaplan') || 
    m.metric_name.toLowerCase().includes('yorke')
  );
  
  const entropy = metrics.find(m => 
    m.metric_name.toLowerCase().includes('entropy') || 
    m.metric_name.toLowerCase().includes('kolmogorov')
  );

  const formatValue = (value: number, precision: number = 6) => {
    return value.toFixed(precision);
  };

  const getMetricColor = (value: number, metricType: string) => {
    if (metricType.includes('lyapunov') || metricType.includes('λ')) {
      return value > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
    }
    if (metricType.includes('dimension')) {
      return 'text-blue-600 dark:text-blue-400';
    }
    if (metricType.includes('entropy')) {
      return 'text-purple-600 dark:text-purple-400';
    }
    return 'text-neutral-600 dark:text-neutral-400';
  };

  const getMetricIcon = (metricType: string) => {
    if (metricType.includes('lyapunov') || metricType.includes('λ')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    }
    if (metricType.includes('dimension')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    }
    if (metricType.includes('entropy')) {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Chaos Metrics
        </h2>
        <CacheStatusIndicator fromCache={fromCache} />
      </div>

      {/* Lyapunov Exponents */}
      {lyapunovExponents.length > 0 && (
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
            Lyapunov Exponents
          </h3>
          
          <div className="space-y-3">
            {lyapunovExponents.map((metric, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                <div className="flex items-center">
                  {getMetricIcon(metric.metric_name)}
                  <div className="ml-3">
                    <div className="font-medium text-neutral-900 dark:text-neutral-100">
                      {metric.metric_name}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      {metric.computation_method || 'Computed metric'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-mono font-bold ${getMetricColor(metric.value, metric.metric_name)}`}>
                    {formatValue(metric.value)}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {metric.value > 0 ? 'Chaotic' : 'Stable'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* Correlation Dimension */}
        {correlationDimension && (
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="flex items-center">
              {getMetricIcon(correlationDimension.metric_name)}
              <div className="ml-3">
                <div className="font-medium text-neutral-900 dark:text-neutral-100">
                  Correlation Dimension
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Fractal dimension measure
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-xl font-mono font-bold ${getMetricColor(correlationDimension.value, correlationDimension.metric_name)}`}>
                {formatValue(correlationDimension.value)}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {correlationDimension.computation_method || 'Grassberger-Procaccia'}
              </div>
            </div>
          </div>
        )}

        {/* Kaplan-Yorke Dimension */}
        {kaplanYorkeDimension && (
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center">
              {getMetricIcon(kaplanYorkeDimension.metric_name)}
              <div className="ml-3">
                <div className="font-medium text-neutral-900 dark:text-neutral-100">
                  Kaplan-Yorke Dimension
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Information dimension
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-xl font-mono font-bold ${getMetricColor(kaplanYorkeDimension.value, kaplanYorkeDimension.metric_name)}`}>
                {formatValue(kaplanYorkeDimension.value)}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {kaplanYorkeDimension.computation_method || 'Lyapunov-based'}
              </div>
            </div>
          </div>
        )}

        {/* Entropy */}
        {entropy && (
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-center">
              {getMetricIcon(entropy.metric_name)}
              <div className="ml-3">
                <div className="font-medium text-neutral-900 dark:text-neutral-100">
                  Kolmogorov Entropy
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Information production rate
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-xl font-mono font-bold ${getMetricColor(entropy.value, entropy.metric_name)}`}>
                {formatValue(entropy.value)}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {entropy.computation_method || 'Lyapunov sum'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Metrics */}
      {metrics.length > 0 && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-600">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
            Additional Metrics
          </h3>
          <div className="space-y-2">
            {metrics
              .filter(m => 
                !m.metric_name.toLowerCase().includes('lyapunov') && 
                !m.metric_name.toLowerCase().includes('λ') &&
                !(m.metric_name.toLowerCase().includes('correlation') && m.metric_name.toLowerCase().includes('dimension')) &&
                !m.metric_name.toLowerCase().includes('kaplan') &&
                !m.metric_name.toLowerCase().includes('yorke') &&
                !m.metric_name.toLowerCase().includes('entropy') &&
                !m.metric_name.toLowerCase().includes('kolmogorov')
              )
              .map((metric, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                  <div className="flex items-center">
                    {getMetricIcon(metric.metric_name)}
                    <span className="ml-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {metric.metric_name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-mono font-bold ${getMetricColor(metric.value, metric.metric_name)}`}>
                      {formatValue(metric.value)}
                    </span>
                    {metric.computation_method && (
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {metric.computation_method}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* No Metrics Message */}
      {metrics.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 mx-auto text-neutral-400 dark:text-neutral-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-neutral-500 dark:text-neutral-400">
            No chaos metrics available for this study.
          </p>
        </div>
      )}
    </motion.div>
  );
}


