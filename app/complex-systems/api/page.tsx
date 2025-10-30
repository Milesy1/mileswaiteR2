"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const BASE_URL = typeof window === 'undefined'
  ? process.env.NEXT_PUBLIC_BASE_URL || 'https://mileswaite.net'
  : window.location.origin;

const ENDPOINTS = [
  {
    category: 'General',
    endpoints: [
      {
        method: 'GET',
        path: '/api/studies/chaos',
        desc: 'List all studies (optionally filter by system type)',
        params: [{ name: 'system_type', example: 'lorenz', desc: 'Filter by system type (lorenz, logistic, etc.)' }, { name: 'limit', example: '12', desc: 'Max results' }],
        example: `curl "${BASE_URL}/api/studies/chaos?system_type=logistic&limit=2"`,
        fetch: `fetch("/api/studies/chaos?system_type=logistic&limit=2").then(r=>r.json())` ,
        response: `{ "studies": [ { "id": "...", "name": "...", "system_type": "logistic" } ], "total": 1 }`
      }
    ]
  },
  {
    category: 'Lorenz',
    endpoints: [
      {
        method: 'GET',
        path: '/api/studies/lorenz/[id]',
        desc: 'Get a specific Lorenz study by UUID',
        params: [{ name: 'id', example: 'uuid', desc: 'Unique Study ID (in path)' }],
        example: `curl "${BASE_URL}/api/studies/lorenz/00000000-0000-0000-0000-000000000001"`,
        fetch: `fetch("/api/studies/lorenz/00000000-0000-0000-0000-000000000001").then(r=>r.json())` ,
        response: '{ "study": { ... }, ... }'
      }
      // (Add more Lorenz endpoints as needed)
    ]
  },
  {
    category: 'Logistic Map',
    endpoints: [
      {
        method: 'GET',
        path: '/api/studies/logistic/[id]',
        desc: 'Get a specific logistic map study by UUID',
        params: [{ name: 'id', example: 'uuid', desc: 'Unique Study ID (in path)' }],
        example: `curl "${BASE_URL}/api/studies/logistic/00000000-0000-0000-0000-000000000002"`,
        fetch: `fetch("/api/studies/logistic/00000000-0000-0000-0000-000000000002").then(r=>r.json())` ,
        response: '{ "study": { ... }, ... }'
      },
      {
        method: 'GET',
        path: '/api/studies/logistic/[id]/bifurcation',
        desc: 'Retrieve bifurcation data for a logistic study',
        params: [{ name: 'r_min', example: '3.0', desc: 'Lower limit of r (optional, query)' }, { name: 'r_max', example: '4.0', desc: 'Upper limit of r (optional, query)' }],
        example: `curl "${BASE_URL}/api/studies/logistic/00000000-0000-0000-0000-000000000002/bifurcation?r_min=3.5&r_max=4.0"`,
        fetch: `fetch("/api/studies/logistic/00000000-0000-0000-0000-000000000002/bifurcation?r_min=3.5&r_max=4.0").then(r=>r.json())`,
        response: '{ "points": [ ... ], ... }'
      }
      // (Add more Logistic endpoints as needed)
    ]
  }
];

const sampleLanguages = [
  {
    name: 'JavaScript (fetch)',
    code: `fetch('/api/studies/chaos?system_type=logistic&limit=2')\n  .then(r => r.json())\n  .then(console.log);`
  },
  {
    name: 'Python (requests)',
    code: `import requests\nr = requests.get('https://mileswaite.net/api/studies/chaos?system_type=logistic&limit=2')\nprint(r.json())`
  },
  {
    name: 'cURL',
    code: `curl "https://mileswaite.net/api/studies/chaos?system_type=logistic&limit=2"`
  }
];

function CodeBlock({ code, lang = 'bash' }: { code: string, lang?: string }) {
  return (
    <pre className="bg-neutral-950 text-white rounded-lg p-3 sm:p-4 my-2 overflow-x-auto text-xs sm:text-sm"><code className="break-words whitespace-pre-wrap">{code}</code></pre>
  );
}

export default function APIDocsPage() {
  // Playground State
  const [playEndpoint, setPlayEndpoint] = useState(ENDPOINTS[0].endpoints[0]);
  const [playParam, setPlayParam] = useState('');
  const [playResp, setPlayResp] = useState('');
  const [playLoading, setPlayLoading] = useState(false);

  // Playground send request
  async function tryIt() {
    if (!playEndpoint) return;
    setPlayLoading(true);
    let url = playEndpoint.path.replace('[id]', playParam);
    if (playEndpoint.params && playEndpoint.params.some(p => !p.desc.includes('in path') && playParam)) {
      url += `?${playEndpoint.params
        .filter(p => !p.desc.includes('in path'))
        .map(p => `${p.name}=${encodeURIComponent(playParam)}`)
        .join('&')}`;
    }
    try {
      const resp = await fetch(url);
      const text = await resp.text();
      setPlayResp(text);
    } catch (e) {
      setPlayResp(e instanceof Error ? e.message : String(e));
    }
    setPlayLoading(false);
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Overview */}
        <section className="mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Complex Systems Public API Documentation</h1>
          <p className="text-neutral-700 dark:text-neutral-300 mb-2">
            Welcome! This API allows you to query live computational experiment data on complex systems including the Lorenz attractor and the logistic map.
            All endpoints return fully typed JSON. No authentication required.
          </p>
        </section>

        {/* 2. Authentication & Rate Limits */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Authentication & Rate Limits</h2>
          <p>No authentication required.</p>
          <ul className="list-disc ml-6 my-2 text-neutral-700 dark:text-neutral-300">
            <li>Rate limits: <span className="font-mono">100 requests/hour</span> per IP for most endpoints.</li>
            <li><strong>Heavy data endpoints</strong>: <span className="font-mono">50 req/hour</span></li>
            <li>All limits visible in <span className="font-mono">X-RateLimit-*</span> headers.</li>
          </ul>
        </section>

        {/* 3. Base URL */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Base URL</h2>
          <CodeBlock lang="bash" code={BASE_URL + '/api'} />
        </section>

        {/* 4. Endpoints by Category */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Endpoints by Category</h2>
          {ENDPOINTS.map(cat => (
            <div key={cat.category} className="mb-8">
              <h3 className="text-xl font-bold mb-2">{cat.category}</h3>
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4">
                {cat.endpoints.map(ep => (
                  <div key={ep.path} className="mb-6">
                    <div className="flex flex-wrap gap-2 sm:gap-3 items-center mb-1">
                      <span className={`inline-block text-xs sm:text-sm px-2 sm:px-3 py-1 rounded font-mono font-bold ${ep.method === 'GET' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>{ep.method}</span>
                      <span className="font-mono text-xs sm:text-sm bg-neutral-200 dark:bg-neutral-700 px-2 py-1 rounded break-all">{ep.path}</span>
                    </div>
                    <p className="mb-1 text-neutral-700 dark:text-neutral-300">{ep.desc}</p>
                    <ul className="text-neutral-600 dark:text-neutral-400 text-sm mb-1">
                      {ep.params?.map((p, i) => (
                        <li key={i}><b>{p.name}</b>: <span className="font-mono">{p.example}</span> – {p.desc}</li>
                      ))}
                    </ul>
                    {/* Examples */}
                    <div className="mb-2">
                      <span className="text-xs font-bold">Example Request:</span>
                      <CodeBlock lang="bash" code={ep.example} />
                      <span className="text-xs font-bold">JavaScript fetch:</span>
                      <CodeBlock lang="js" code={ep.fetch} />
                    </div>
                    <span className="text-xs font-bold">Example Response:</span>
                    <CodeBlock lang="json" code={ep.response} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 6. Interactive Playground */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Interactive Playground</h2>
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6 flex flex-col gap-4">
            <label className="mb-1 font-medium">Endpoint:</label>
            <select
              className="px-3 py-2 mb-3 rounded border dark:bg-neutral-900"
              value={playEndpoint.path}
              onChange={e => {
                const found = ENDPOINTS.flatMap(cat => cat.endpoints).find(x => x.path === e.target.value);
                setPlayEndpoint(found!);
              }}
            >
              {ENDPOINTS.flatMap(cat => cat.endpoints).map(ep => (
                <option key={ep.path} value={ep.path}>{ep.method} {ep.path}</option>
              ))}
            </select>
            {playEndpoint?.params?.map((param, idx) => (
              <input
                key={idx}
                className="px-3 py-2 mb-2 rounded border dark:bg-neutral-900"
                type="text"
                placeholder={param.desc + (param.example ? ` [ex: ${param.example}]` : '')}
                value={playParam}
                onChange={e => setPlayParam(e.target.value)}
              />
            ))}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              onClick={tryIt}
              disabled={playLoading}
            >{playLoading ? 'Loading...' : 'Try It'}</button>
            <div className="bg-black text-green-300 font-mono rounded p-4 min-h-[80px] max-h-40 overflow-auto mt-3">
              {playResp || 'Response will appear here.'}
            </div>
          </div>
        </section>

        {/* 7. Rate Limits */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Rate Limits & Usage Guidelines</h2>
          <ul className="list-disc ml-6 text-neutral-700 dark:text-neutral-300">
            <li>Each IP is allowed up to <b>100 requests/hour</b> for most endpoints.</li>
            <li>Large data exports: limit <b>50 req/hour</b>.</li>
            <li>Respect robots.txt for scraping.</li>
            <li>Clearly cite API data if used in publications or projects.</li>
          </ul>
        </section>

        {/* 8. Data Export Formats */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">Data Export Formats</h2>
          <ul className="list-disc ml-6 text-neutral-700 dark:text-neutral-300">
            <li>JSON (default for all endpoints)</li>
            <li>CSV (where available, e.g. bifurcation data): add <span className="font-mono">?format=csv</span></li>
          </ul>
        </section>

        {/* 9. Code examples in multiple languages */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-4">Code Examples in Multiple Languages</h2>
          <div className="space-y-3">
            {sampleLanguages.map(lang => (
              <div key={lang.name}>
                <div className="font-bold mb-1">{lang.name}</div>
                <CodeBlock code={lang.code} lang={lang.name.toLowerCase().includes('python') ? 'python' : lang.name.toLowerCase().includes('javascript') ? 'js' : 'bash'} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
