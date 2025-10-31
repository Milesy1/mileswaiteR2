// app/blog/complex-systems-platform/page.tsx

export const metadata = {
  title: 'Building a Complex Systems Research Platform',
  description: 'A web platform for sharing dynamical systems research data with public API access and interactive visualizations.',
  openGraph: {
    title: 'Building a Complex Systems Research Platform',
    description: 'Lorenz attractors, logistic maps, and chaos metrics with REST API',
  }
};

export default function ComplexSystemsPlatformPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Building a Complex Systems Research Platform
        </h1>
        <p className="text-xl text-gray-400">
          A web platform for sharing dynamical systems research data—Lorenz attractors, 
          logistic maps, chaos metrics—with public API access and interactive visualizations.
        </p>
        <time className="block mt-6 text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        
        {/* Architecture Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Architecture</h2>
          <p className="text-gray-300 leading-relaxed">
            PostgreSQL database stores study metadata, trajectory data, bifurcation points, 
            and computed chaos metrics. REST API endpoints expose the data. Next.js serves 
            the frontend with Three.js for 3D visualizations and Canvas for high-performance 
            2D plots.
          </p>
        </section>

        {/* Database Schema Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Database Schema</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The schema includes tables for studies, system parameters, initial conditions, 
            trajectories, chaos metrics, bifurcation data, and universal constants. Migrations 
            handle schema changes and initial data seeding.
          </p>
          <div className="bg-black/30 border border-white/10 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-blue-400 font-mono mb-2">studies</div>
                <div className="text-blue-400 font-mono mb-2">system_parameters</div>
                <div className="text-blue-400 font-mono mb-2">initial_conditions</div>
                <div className="text-blue-400 font-mono mb-2">trajectories</div>
              </div>
              <div>
                <div className="text-blue-400 font-mono mb-2">chaos_metrics</div>
                <div className="text-blue-400 font-mono mb-2">bifurcation_data</div>
                <div className="text-blue-400 font-mono mb-2">universal_constants</div>
                <div className="text-blue-400 font-mono mb-2">sensitivity_data</div>
              </div>
            </div>
          </div>
        </section>

        {/* API Design Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">API Design</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Endpoints follow REST conventions:
          </p>
          <div className="space-y-3 mb-4">
            <div className="bg-black/30 border border-white/10 rounded p-4">
              <code className="text-green-400">GET /api/studies/chaos</code>
              <span className="text-gray-400 ml-4">— List studies with filtering</span>
            </div>
            <div className="bg-black/30 border border-white/10 rounded p-4">
              <code className="text-green-400">GET /api/studies/lorenz/[id]/trajectory</code>
              <span className="text-gray-400 ml-4">— Retrieve trajectory data</span>
            </div>
            <div className="bg-black/30 border border-white/10 rounded p-4">
              <code className="text-green-400">GET /api/studies/logistic/[id]/bifurcation</code>
              <span className="text-gray-400 ml-4">— Get bifurcation points</span>
            </div>
            <div className="bg-black/30 border border-white/10 rounded p-4">
              <code className="text-green-400">GET /api/studies/logistic/[id]/metrics</code>
              <span className="text-gray-400 ml-4">— Fetch computed metrics</span>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">
            All endpoints return JSON with proper error handling and caching headers.
          </p>
        </section>

        {/* Visualizations Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Visualizations</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                3D Lorenz Attractor
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Interactive Three.js rendering with orbit controls, auto-rotation, and gradient 
                coloring based on trajectory position.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                Bifurcation Diagram
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Canvas-based plot supporting zoom, pan, and hover tooltips. Handles 10,000+ 
                data points efficiently using optimized rendering paths.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                Lyapunov Exponent Chart
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Time series visualization of chaos metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Challenges Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Technical Challenges</h2>
          
          <div className="space-y-6">
            <div className="border-l-2 border-blue-500/50 pl-6">
              <h3 className="text-lg font-semibold mb-2">Database Connection</h3>
              <p className="text-gray-300 leading-relaxed">
                Runtime environment variables required careful configuration. <code className="text-blue-400 bg-black/30 px-2 py-1 rounded">DATABASE_URL</code> needed 
                to be set for production deployments without quotes in the connection string.
              </p>
            </div>

            <div className="border-l-2 border-blue-500/50 pl-6">
              <h3 className="text-lg font-semibold mb-2">UUID Handling</h3>
              <p className="text-gray-300 leading-relaxed">
                PostgreSQL's strict typing required explicit <code className="text-blue-400 bg-black/30 px-2 py-1 rounded">::uuid</code> casts 
                in all queries involving study identifiers.
              </p>
            </div>

            <div className="border-l-2 border-blue-500/50 pl-6">
              <h3 className="text-lg font-semibold mb-2">Dynamic Routing</h3>
              <p className="text-gray-300 leading-relaxed">
                Pages using server-side <code className="text-blue-400 bg-black/30 px-2 py-1 rounded">headers()</code> required{' '}
                <code className="text-blue-400 bg-black/30 px-2 py-1 rounded">export const dynamic = 'force-dynamic'</code> to 
                prevent static generation errors.
              </p>
            </div>

            <div className="border-l-2 border-blue-500/50 pl-6">
              <h3 className="text-lg font-semibold mb-2">Migration Strategy</h3>
              <p className="text-gray-300 leading-relaxed">
                Database migrations run manually against production rather than during build, 
                since environment variables are only available at runtime.
              </p>
            </div>
          </div>
        </section>

        {/* Deployment Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Deployment</h2>
          <p className="text-gray-300 leading-relaxed">
            Vercel handles deployments with automatic builds on git push. Environment variables 
            configured through the dashboard. Database hosted on Neon PostgreSQL with connection 
            pooling.
          </p>
        </section>

        {/* Result Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Result</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            A functional research data platform. Studies are accessible via API, visualizations 
            render correctly, and the system scales to handle additional studies and data types.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The platform demonstrates how to structure research data for public access while 
            maintaining performance and usability.
          </p>
        </section>

        {/* Links Section */}
        <section className="mt-16 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-lg">
          <h3 className="text-2xl font-bold mb-6">Explore the Platform</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="/complex-systems/lorenz/123e4567-e89b-12d3-a456-426614174000"
              className="block p-4 bg-black/30 hover:bg-black/50 border border-white/10 rounded transition-all hover:border-blue-500/50"
            >
              <div className="text-blue-400 font-semibold mb-1">Lorenz Attractor</div>
              <div className="text-sm text-gray-400">3D visualization of chaotic dynamics</div>
            </a>
            <a 
              href="/complex-systems/logistic/223e4567-e89b-12d3-a456-426614174111"
              className="block p-4 bg-black/30 hover:bg-black/50 border border-white/10 rounded transition-all hover:border-blue-500/50"
            >
              <div className="text-blue-400 font-semibold mb-1">Logistic Map</div>
              <div className="text-sm text-gray-400">Bifurcation diagram and period-doubling</div>
            </a>
            <a 
              href="/complex-systems/api"
              className="block p-4 bg-black/30 hover:bg-black/50 border border-white/10 rounded transition-all hover:border-blue-500/50"
            >
              <div className="text-blue-400 font-semibold mb-1">API Documentation</div>
              <div className="text-sm text-gray-400">REST endpoints and usage examples</div>
            </a>
            <a 
              href="/complex-systems"
              className="block p-4 bg-black/30 hover:bg-black/50 border border-white/10 rounded transition-all hover:border-blue-500/50"
            >
              <div className="text-blue-400 font-semibold mb-1">Research Overview</div>
              <div className="text-sm text-gray-400">Platform introduction and features</div>
            </a>
          </div>
        </section>

      </div>
    </article>
  );
}





