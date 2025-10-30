import { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic'; // This page uses headers() and fetches dynamic data

export const metadata: Metadata = {
  title: 'Logistic Map Studies | Complex Systems',
  description: 'Explore logistic map studies showing period-doubling cascades, bifurcations, and route to chaos.',
};

async function getLogisticStudies() {
  try {
    const headersList = await headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host') || 'localhost:3000';
    const proto = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${proto}://${host}`;
    
    const response = await fetch(`${baseUrl}/api/studies/chaos?system_type=logistic&limit=36&refresh=1`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      let errorData: any = {};
      try {
        const text = await response.text();
        console.error('Raw error response:', text);
        errorData = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse error response as JSON');
        errorData = { raw: 'Failed to parse error response' };
      }
      console.error('Failed to fetch studies:', response.statusText);
      console.error('Error details:', errorData);
      console.error('Response status:', response.status);
      return { studies: [], total: 0 };
    }
    
    const data = await response.json();
    return {
      studies: Array.isArray(data.studies) ? data.studies : [],
      total: data.total || data.studies?.length || 0
    };
  } catch (error) {
    console.error('Error fetching logistic studies:', error);
    return { studies: [], total: 0 };
  }
}

export default async function LogisticIndexPage() {
  const { studies, total } = await getLogisticStudies();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] min-h-[300px] sm:min-h-[400px] overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6">
                Logistic Map Studies
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto px-4">
                Explore the period-doubling route to chaos through interactive bifurcation diagrams and universal constants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studies Grid */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Available Studies
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Select a study to view bifurcation diagrams, universality, Lyapunov exponents, and more.
            </p>
          </div>

          {studies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {studies.map((study: any, index: number) => {
                const rMin = study.parameters?.find((p: any) => p.parameter_name === 'r_min')?.value;
                const rMax = study.parameters?.find((p: any) => p.parameter_name === 'r_max')?.value;
                
                return (
                  <div
                    key={study.id}
                    className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                      <div className="w-32 h-32 border-2 border-blue-500/30 rounded-lg flex items-center justify-center">
                        <div className="text-4xl font-bold text-blue-500/50">xₙ₊₁</div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                        {study.name}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                        {study.description || 'Logistic map study exploring period-doubling cascades and chaos.'}
                      </p>
                      
                      {(rMin || rMax) && (
                        <div className="space-y-2 mb-6">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-neutral-500 dark:text-neutral-400">r Min:</span>
                              <span className="ml-2 font-mono text-blue-600 dark:text-blue-400">{rMin ?? 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-neutral-500 dark:text-neutral-400">r Max:</span>
                              <span className="ml-2 font-mono text-blue-600 dark:text-blue-400">{rMax ?? 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <Link
                        href={`/complex-systems/logistic/${study.id}`}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                      >
                        <span>Explore Study</span>
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600 dark:text-neutral-400 text-lg">No studies found.</p>
            </div>
          )}

          {/* API Access Section */}
          <div className="mt-16 text-center">
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                API Access
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Access study data programmatically via our RESTful API
              </p>
              <div className="bg-neutral-900 dark:bg-neutral-950 rounded-lg p-4 text-left max-w-2xl mx-auto">
                <code className="text-green-400 text-sm">
                  GET /api/studies/logistic/[study-id]
                </code>
              </div>
              <Link
                href="/complex-systems/api"
                className="inline-flex items-center mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
              >
                <span>View API Documentation</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

