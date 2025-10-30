import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import LogisticBifurcationDiagram from '@/components/logistic/LogisticBifurcationDiagram';
import LogisticLyapunovChart from '@/components/logistic/LogisticLyapunovChart';

const EXPLANATIONS = {
  header: `The Logistic Map is a classic example of how simple nonlinear systems can exhibit incredibly complex—and chaotic—behavior. Each study here corresponds to a specific analysis of the map: xₙ₊₁ = r·xₙ·(1−xₙ).`,
  feigenbaum: `The Feigenbaum constant δ ≈ 4.669 is a universal number characterizing how the period-doubling bifurcations accumulate in many nonlinear systems, including the logistic map. This constant describes the ratio of successive bifurcation intervals.`,
  bifurcation: `A bifurcation diagram visualizes the long-term behaviors of the logistic map as the parameter r changes, revealing fixed points, periodic orbits, and chaos.`,
  lyapunov: `The Lyapunov exponent measures sensitivity to initial conditions—positive values indicate chaos. The plot below shows how chaos emerges as r increases.`,
  periodDoubling: `The logistic map famously follows the period-doubling route to chaos, with regular periods doubling at predictable r values, culminating in unpredictable/chaotic outcomes.`,
};

async function getStudyData(id: string, baseUrl: string) {
  const studyRes = await fetch(`${baseUrl}/api/studies/logistic/${id}`);
  if (!studyRes.ok) return null;
  const studyJson = await studyRes.json();
  const study = studyJson?.study ?? studyJson;

  const bifRes = await fetch(`${baseUrl}/api/studies/logistic/${id}/bifurcation`);
  let bif = null;
  if (bifRes.ok) {
    try {
      const bifJson = await bifRes.json();
      bif = bifJson?.bifurcation || bifJson?.points || null;
    } catch (e) {
      console.error('Failed to parse bifurcation JSON:', e);
    }
  }

  const feigRes = await fetch(`${baseUrl}/api/studies/logistic/${id}/feigenbaum`);
  const feig = feigRes.ok ? await feigRes.json() : null;

  const metRes = await fetch(`${baseUrl}/api/studies/logistic/${id}/metrics?name=lyapunov_exponent`);
  const metrics = metRes.ok ? await metRes.json() : null;

  return { study, bif, feig, metrics };
}

interface PageProps { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Logistic Map Study | Complex Systems',
    description: 'Detailed info and visualizations related to the logistic map route to chaos, bifurcations, and universal constants.',
  };
}

export default async function LogisticStudyPage({ params }: PageProps) {
  const { id } = await params;
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

  const hdrs = await headers();
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || 'localhost:3000';
  const proto = hdrs.get('x-forwarded-proto') || 'http';
  const baseUrl = `${proto}://${host}`;

  const data = await getStudyData(id, baseUrl);
  if (!data?.study?.id && !data?.study?.name) return notFound();

  const { study, bif, feig, metrics } = data as any;
  const rMin = study?.parameters?.find((p: any) => p.parameter_name === 'r_min')?.value ?? 0;
  const rMax = study?.parameters?.find((p: any) => p.parameter_name === 'r_max')?.value ?? 4;
  const feigenbaum = feig?.constants?.find((c: any) => c.constant_name === 'feigenbaum_delta')?.value ?? null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 sm:mb-4">Logistic Map Study</h1>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg text-neutral-600 dark:text-neutral-300 break-all px-4">Study ID: <span className="font-mono text-accent-600 text-xs sm:text-sm">{id}</span></p>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto px-4">{EXPLANATIONS.header}</p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">System Parameters</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              <div className="bg-neutral-100 dark:bg-neutral-700 px-4 sm:px-6 py-3 rounded-lg text-base sm:text-lg text-center">
                r Min: <span className="font-bold text-accent-600">{rMin}</span>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-700 px-4 sm:px-6 py-3 rounded-lg text-base sm:text-lg text-center">
                r Max: <span className="font-bold text-accent-600">{rMax}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Key Findings & Universal Constants</h2>
            <div className="space-y-4">
              <div>
                <strong className="text-accent-600 text-base sm:text-lg block sm:inline">Feigenbaum δ:</strong>
                <span className="block sm:inline sm:ml-2 font-mono text-lg sm:text-xl mt-1 sm:mt-0">
                  {feigenbaum ? Number(feigenbaum).toFixed(4) : 'N/A'} 
                  <span className="block sm:inline sm:ml-2 text-sm sm:text-base text-neutral-500 mt-1 sm:mt-0">(Known value: <span className="underline">4.6692...</span>)</span>
                </span>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">{EXPLANATIONS.feigenbaum}</p>
              </div>
              {feig?.constants?.length > 1 && (
                <div>
                  <strong className="text-accent-600 text-lg">Other Constants:</strong>
                  <span className="ml-2 font-mono">
                    {feig.constants.map((c: any) => `${c.constant_name}: ${c.value}`).join(' | ')}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">The Period-Doubling Cascade</h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">{EXPLANATIONS.periodDoubling}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="font-bold text-lg sm:text-xl mb-4 text-center">Bifurcation Diagram</h3>
              <div className="w-full h-64 sm:h-80 bg-neutral-50 dark:bg-neutral-900 rounded-lg overflow-hidden">
                {Array.isArray(bif) && bif.length > 0 ? (
                  <LogisticBifurcationDiagram points={bif.map((p: any)=>({r: p.parameter_value ?? p.r, x: p.state_value ?? p.x}))} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-neutral-500 dark:text-neutral-400">[No bifurcation data available]</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-3">{EXPLANATIONS.bifurcation}</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
              <h3 className="font-bold text-lg sm:text-xl mb-4 text-center">Lyapunov Exponent Plot</h3>
              <div className="w-full h-64 sm:h-80 bg-neutral-50 dark:bg-neutral-900 rounded-lg overflow-hidden">
                {metrics?.metrics?.length ? (
                  <LogisticLyapunovChart points={metrics.metrics.map((m: any) => ({ value: Number(m.value), created_at: m.created_at }))} />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-neutral-500 dark:text-neutral-400">No Lyapunov data</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-3">{EXPLANATIONS.lyapunov}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Data Export</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href={`/api/studies/logistic/${id}/bifurcation?format=csv`} 
                className="px-6 py-3 text-center bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                Download CSV
              </a>
              <a 
                href={`/api/studies/logistic/${id}/bifurcation?format=json`} 
                className="px-6 py-3 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Download JSON
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 sm:p-6 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">API Endpoints for This Study</h2>
            <ul className="space-y-3">
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <code className="bg-neutral-100 dark:bg-neutral-700 px-3 py-1.5 rounded font-mono text-xs sm:text-sm break-all">GET /api/studies/logistic/{id}</code>
                <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Study details</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <code className="bg-neutral-100 dark:bg-neutral-700 px-3 py-1.5 rounded font-mono text-xs sm:text-sm break-all">GET /api/studies/logistic/{id}/bifurcation</code>
                <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Bifurcation data</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <code className="bg-neutral-100 dark:bg-neutral-700 px-3 py-1.5 rounded font-mono text-xs sm:text-sm break-all">GET /api/studies/logistic/{id}/feigenbaum</code>
                <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">Universal constants</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

