'use client';

import { motion } from 'framer-motion';
import { SystemParameter, InitialCondition } from '@/lib/types/complex-systems';
import { CacheStatusIndicator } from '@/components/lorenz/CacheStatusIndicator';

interface LorenzParametersProps {
  parameters: SystemParameter[];
  initialConditions: InitialCondition[];
  fromCache: boolean;
}

export function LorenzParameters({ parameters, initialConditions, fromCache }: LorenzParametersProps) {
  // Find specific Lorenz parameters
  const sigma = parameters.find(p => p.parameter_name.toLowerCase() === 'sigma' || p.parameter_name.toLowerCase() === 'σ');
  const rho = parameters.find(p => p.parameter_name.toLowerCase() === 'rho' || p.parameter_name.toLowerCase() === 'ρ');
  const beta = parameters.find(p => p.parameter_name.toLowerCase() === 'beta' || p.parameter_name.toLowerCase() === 'β');

  // Find initial conditions
  const x0 = initialConditions.find(c => c.variable_name.toLowerCase() === 'x0' || c.variable_name.toLowerCase() === 'x');
  const y0 = initialConditions.find(c => c.variable_name.toLowerCase() === 'y0' || c.variable_name.toLowerCase() === 'y');
  const z0 = initialConditions.find(c => c.variable_name.toLowerCase() === 'z0' || c.variable_name.toLowerCase() === 'z');

  const formatValue = (value: number, units?: string) => {
    const formatted = value.toFixed(6);
    return units ? `${formatted} ${units}` : formatted;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          System Parameters
        </h2>
        <CacheStatusIndicator fromCache={fromCache} />
      </div>

      {/* Lorenz Parameters */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          Lorenz System Parameters
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Sigma (σ) */}
          <div className="flex justify-between items-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400 mr-3">σ</span>
              <div>
                <div className="font-medium text-neutral-900 dark:text-neutral-100">Sigma</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Prandtl number</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-mono text-neutral-900 dark:text-neutral-100">
                {sigma ? formatValue(sigma.value, sigma.units) : 'N/A'}
              </div>
              {sigma && (
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {sigma.parameter_name}
                </div>
              )}
            </div>
          </div>

          {/* Rho (ρ) */}
          <div className="flex justify-between items-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-accent-600 dark:text-accent-400 mr-3">ρ</span>
              <div>
                <div className="font-medium text-neutral-900 dark:text-neutral-100">Rho</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Rayleigh number</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-mono text-neutral-900 dark:text-neutral-100">
                {rho ? formatValue(rho.value, rho.units) : 'N/A'}
              </div>
              {rho && (
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {rho.parameter_name}
                </div>
              )}
            </div>
          </div>

          {/* Beta (β) */}
          <div className="flex justify-between items-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400 mr-3">β</span>
              <div>
                <div className="font-medium text-neutral-900 dark:text-neutral-100">Beta</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Geometric factor</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-mono text-neutral-900 dark:text-neutral-100">
                {beta ? formatValue(beta.value, beta.units) : 'N/A'}
              </div>
              {beta && (
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {beta.parameter_name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Initial Conditions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          Initial Conditions
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {/* X₀ */}
          <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg font-bold text-neutral-600 dark:text-neutral-400 mr-3">x₀</span>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Initial x position</div>
            </div>
            <div className="text-lg font-mono text-neutral-900 dark:text-neutral-100">
              {x0 ? formatValue(x0.value) : 'N/A'}
            </div>
          </div>

          {/* Y₀ */}
          <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg font-bold text-neutral-600 dark:text-neutral-400 mr-3">y₀</span>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Initial y position</div>
            </div>
            <div className="text-lg font-mono text-neutral-900 dark:text-neutral-100">
              {y0 ? formatValue(y0.value) : 'N/A'}
            </div>
          </div>

          {/* Z₀ */}
          <div className="flex justify-between items-center p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg font-bold text-neutral-600 dark:text-neutral-400 mr-3">z₀</span>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Initial z position</div>
            </div>
            <div className="text-lg font-mono text-neutral-900 dark:text-neutral-100">
              {z0 ? formatValue(z0.value) : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Parameters */}
      {parameters.length > 3 && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-600">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
            Additional Parameters
          </h3>
          <div className="space-y-2">
            {parameters
              .filter(p => !['sigma', 'σ', 'rho', 'ρ', 'beta', 'β'].includes(p.parameter_name.toLowerCase()))
              .map((param, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-neutral-50 dark:bg-neutral-700 rounded">
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {param.parameter_name}
                  </span>
                  <span className="text-sm font-mono text-neutral-900 dark:text-neutral-100">
                    {formatValue(param.value, param.units)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}


