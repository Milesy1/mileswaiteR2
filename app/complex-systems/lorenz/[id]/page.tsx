import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LorenzStudyHeader } from '@/components/lorenz/LorenzStudyHeader';
import { LorenzParameters } from '@/components/lorenz/LorenzParameters';
import { LorenzMetrics } from '@/components/lorenz/LorenzMetrics';
import LorenzVisualization from '@/components/lorenz/LorenzVisualization';
import { LorenzDataExport } from '@/components/lorenz/LorenzDataExport';
import { LorenzAPIEndpoints } from '@/components/lorenz/LorenzAPIEndpoints';
import { LorenzMethodology } from '@/components/lorenz/LorenzMethodology';
import { ComplexSystemsData } from '@/lib/complex-systems-data';

interface LorenzStudyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: LorenzStudyPageProps): Promise<Metadata> {
  const { id } = await params;
  
  // Return static metadata to avoid database connection issues during build
  return {
    title: 'Lorenz Study | Complex Systems',
    description: 'Detailed analysis of Lorenz attractor dynamics and chaos metrics.',
    openGraph: {
      title: 'Lorenz Study | Complex Systems',
      description: 'Detailed analysis of Lorenz attractor dynamics and chaos metrics.',
      url: `https://mileswaite.net/complex-systems/lorenz/${id}`,
      type: 'article',
    },
  };
}

export default async function LorenzStudyPage({ params }: LorenzStudyPageProps) {
  const { id } = await params;

  // Validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    // Show loading state for invalid IDs
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Preparing data</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Lorenz Attractor Study
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-6">
                Detailed analysis of Lorenz attractor dynamics and chaos metrics.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cached
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  Study ID: {id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Placeholder Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                System Parameters
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">σ</span>
                  <span className="text-xl font-mono">10.000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                  <span className="text-2xl font-bold text-accent-600 dark:text-accent-400">ρ</span>
                  <span className="text-xl font-mono">28.000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">β</span>
                  <span className="text-xl font-mono">2.667</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Chaos Metrics
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg border border-red-200 dark:border-red-700">
                  <span className="font-medium">Lyapunov Exponent</span>
                  <span className="text-xl font-mono font-bold text-red-600 dark:text-red-400">0.9056</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <span className="font-medium">Correlation Dimension</span>
                  <span className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">2.05</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                3D Visualization
              </h2>
              <div className="h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
                <LorenzVisualization studyId={id} />
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 text-center">
                Interactive 3D Lorenz attractor trajectory. Drag to rotate, scroll to zoom.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Data Export
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CSV
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download JSON
                </button>
              </div>
            </div>
          </div>
        </div>

          {/* API Endpoints Section */}
          <div className="mt-8 sm:mt-12">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6">
                API Endpoints
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 w-fit">
                      GET
                    </span>
                    <code className="text-sm sm:text-base lg:text-lg font-mono text-neutral-900 dark:text-neutral-100 break-all">
                      /api/studies/lorenz/{id}
                    </code>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    Get complete study details including parameters, initial conditions, and metrics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
