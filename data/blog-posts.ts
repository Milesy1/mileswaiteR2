
export const blogPosts = [
  {
    slug: "conveying-information-in-two-dimensions",
    title: "String Field Theories: Conveying Information in 2 Dimensions",
    excerpt: "Exploring how emergent writing systems encode meaning spatially rather than sequentially—inspired by the computational linguistics of Arrival and Wolfram's analysis of alien logograms.",
    date: "December 2025",
    readTime: "16 min read",
    tags: ["Generative Design", "Cellular Automata", "Wolfram", "Visual Semiotics", "Emergence"],
    content: `
      <h1>String Field Theories: Conveying Information in 2 Dimensions</h1>

      <br>

      <img src="/images/arrival-logogram.png" alt="Heptapod logogram from Arrival - a circular ink-like symbol divided into 12 segments, demonstrating non-linear 2D information encoding" style="max-width: 100%; height: auto; margin: 2rem auto; display: block;" />

      <br>

      <p><em>On spatial encoding, alien semiotics, and the computational universe of possible writing systems.</em></p>

      <br>

      <hr>

      <br>

      <h2><strong>The Limitation of Linear Text</strong></h2>

      <br>

      <p>Human writing systems are fundamentally one-dimensional. Whether read left-to-right, right-to-left, or top-to-bottom, text unfolds as a sequence—a stream of symbols parsed in order. This linearity mirrors speech: phonemes arranged temporally, decoded one after another.</p>

      <br>

      <p>But screens are not pages. The web is an inherently two-dimensional medium. Yet digital interfaces largely replicate the sequential logic of print—paragraphs, bullet points, scrolling text. The spatial dimension of the screen remains underutilised for information encoding.</p>

      <br>

      <p>What would it mean to convey information in two dimensions? Not text arranged spatially, but symbols where <strong>spatial relationships constitute meaning</strong>—where position, proximity, and form encode semantics simultaneously rather than sequentially.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Wolfram and the Logograms of Arrival</strong></h2>

      <br>

      <p>The 2016 film <em>Arrival</em>, directed by Denis Villeneuve, presented this exact problem. The alien heptapods communicate through circular logograms—complete thoughts rendered as ink-like symbols, perceived holistically rather than read linearly.</p>

      <br>

      <p>Director Villeneuve approached Stephen Wolfram to consult on the linguistic and computational aspects of the alien language. Wolfram, creator of Mathematica, Wolfram|Alpha, and author of <em>A New Kind of Science</em>, brought a unique perspective: the idea that the universe of possible computational systems is vast, and human mathematics represents only a small, historically contingent sample of it.</p>

      <br>

      <p>In a 2016 interview with Space.com, Wolfram articulated this directly:</p>

      <br>

      <blockquote>"The things we've been interested in in math are just samplings of the set of all possible mathematical facts... The particular ones that one has sampled are very dependent on the detailed history of a civilization."</blockquote>

      <br>

      <p>This insight applies equally to writing systems. Human scripts evolved to represent speech—a fundamentally sequential medium. An alien species with different perceptual apparatus, or one that evolved visual communication before auditory, might develop writing that encodes information spatially from the outset.</p>

      <br>

      <h3>Christopher Wolfram's Computational Analysis</h3>

      <br>

      <p>Stephen Wolfram's son, Christopher Wolfram, was commissioned to build the actual code that appears on screen in <em>Arrival</em>. His task: create computational tools to analyse the fictional logogram language and generate visualisations for the film's scientists to interact with.</p>

      <br>

      <p>Christopher's approach, documented in a Wolfram U course titled <em>"The Code Behind Arrival"</em>, treated the logograms as computational objects. Using Wolfram Language, he built tools to:</p>

      <br>

      <ul>
        <li>Decompose logograms into constituent visual elements</li>
        <li>Analyse symmetry, density, and structural relationships</li>
        <li>Generate variations and interpolations between symbols</li>
        <li>Visualise the "grammar" of spatial arrangements</li>
      </ul>

      <br>

      <p>The code demonstrated that even fictional writing systems become tractable when treated computationally—as rule-governed generative systems rather than arbitrary drawings.</p>

      <br>

      <pre><code>// Wolfram Language pseudocode (conceptual)
// Analysing logogram structure

logograms = Import["logograms/*.png"];
contours = ImageContour /@ logograms;
symmetryScores = RotationalSymmetry /@ contours;
densityMaps = ImageData[GaussianFilter[#, 5]] & /@ logograms;

// Cluster by structural similarity
clusters = FindClusters[logograms, 
  DistanceFunction -> ImageDistance,
  Method -> "KMeans"
];</code></pre>

      <br>

      <hr>

      <br>

      <h2><strong>The Computational Universe of Writing Systems</strong></h2>

      <br>

      <p>Wolfram's broader research programme—exploring the computational universe through cellular automata, Turing machines, and simple programs—provides a framework for thinking about emergent writing systems.</p>

      <br>

      <p>In <em>A New Kind of Science</em>, Wolfram demonstrated that extremely simple rules can generate extraordinary complexity. Rule 30, a one-dimensional cellular automaton with only three inputs and two states, produces patterns indistinguishable from randomness yet entirely deterministic. Rule 110 is proven to be Turing-complete—capable, in principle, of universal computation.</p>

      <br>

      <p>If simple rules can generate such complexity, they can also generate writing. Not writing that humans designed, but writing that <strong>emerges</strong>—symbols with internal structure, consistency, and the capacity to encode information, even if that encoding is alien to human parsing.</p>

      <br>

      <pre><code>// Elementary Cellular Automaton (Rule 30)
// Generates complex, pseudorandom patterns from simple rules

function rule30(left, center, right) {
  const neighborhood = (left << 2) | (center << 1) | right;
  const rule = 30; // Binary: 00011110
  return (rule >> neighborhood) & 1;
}

function generateCA(width, height, seed) {
  let grid = Array(height).fill(null).map(() => Array(width).fill(0));
  
  // Seed initial row
  grid[0] = seedToRow(seed, width);
  
  // Evolve
  for (let y = 1; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const left = grid[y-1][(x - 1 + width) % width];
      const center = grid[y-1][x];
      const right = grid[y-1][(x + 1) % width];
      grid[y][x] = rule30(left, center, right);
    }
  }
  
  return grid;
}</code></pre>

      <br>

      <p>When bounded within a glyph-sized container, cellular automata produce forms that read as symbols—structured, non-random, yet unfamiliar. Different rules produce different visual families. Different seeds produce different instances within a family.</p>

      <br>

      <hr>

      <br>

      <h2><strong>2D Encoding: From Sequence to Simultaneity</strong></h2>

      <br>

      <p>The fundamental shift in two-dimensional information encoding is from <strong>sequential parsing</strong> to <strong>simultaneous perception</strong>.</p>

      <br>

      <table>
        <tr><th>Property</th><th>1D (Linear Text)</th><th>2D (Spatial Glyphs)</th></tr>
        <tr><td>Processing</td><td>Sequential, left-to-right</td><td>Holistic, gestalt perception</td></tr>
        <tr><td>Time</td><td>Unfolds over reading duration</td><td>Entire meaning available instantly</td></tr>
        <tr><td>Relationships</td><td>Adjacency (before/after)</td><td>Proximity, symmetry, containment</td></tr>
        <tr><td>Density</td><td>Limited by line length</td><td>Potentially higher per symbol</td></tr>
        <tr><td>Ambiguity</td><td>Resolved by context (later words)</td><td>Resolved by spatial relationships</td></tr>
      </table>

      <br>

      <p>Human vision processes images holistically before analytically. The gestalt principles—proximity, similarity, continuity, closure—describe how the visual system groups elements into perceived wholes. A 2D writing system leverages this: meaning emerges from pattern recognition rather than sequential decoding.</p>

      <br>

      <p>The Arrival logograms exemplify this. A heptapod symbol is not "read" from any starting point. It is perceived as a complete thought, with modifying elements positioned spatially relative to a core meaning.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Generative Approaches to Emergent Glyphs</strong></h2>

      <br>

      <p>Several algorithmic families can generate forms suitable for a 2D writing system. Each produces distinct visual qualities.</p>

      <br>

      <h3>1. Cellular Automata</h3>

      <br>

      <p>As demonstrated above, elementary CA generate complex patterns deterministically. The visual aesthetic is digital, crystalline—grids and edges. Wolfram's research catalogued 256 elementary rules; each produces a distinct visual signature.</p>

      <br>

      <pre><code>// Generate glyph from CA with semantic seeding
function caGlyph(seed, rule = 30, size = 32) {
  const grid = generateCA(size, size, seed);
  
  // Convert to SVG path
  let path = '';
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x] === 1) {
        path += \`M\${x} \${y} h1 v1 h-1 Z \`;
      }
    }
  }
  
  return \`<path d="\${path}" fill="currentColor"/>\`;
}</code></pre>

      <br>

      <h3>2. L-Systems (Lindenmayer Systems)</h3>

      <br>

      <p>L-systems encode recursive growth—rules that rewrite strings, interpreted as drawing instructions. Originally modelling plant morphology, they produce organic, branching forms with fractal self-similarity.</p>

      <br>

      <pre><code>// L-System with turtle graphics interpretation
const lsystemRules = {
  'F': 'FF+[+F-F-F]-[-F+F+F]',  // Tree-like branching
};

function evolve(axiom, rules, iterations) {
  let result = axiom;
  for (let i = 0; i < iterations; i++) {
    result = result.split('').map(c => rules[c] || c).join('');
  }
  return result;
}

function interpret(instructions, angle = 25) {
  const stack = [];
  let x = 0, y = 0, theta = -90;
  let path = \`M \${x} \${y}\`;
  
  for (const char of instructions) {
    switch (char) {
      case 'F':
        x += Math.cos(theta * Math.PI / 180) * 5;
        y += Math.sin(theta * Math.PI / 180) * 5;
        path += \` L \${x} \${y}\`;
        break;
      case '+': theta += angle; break;
      case '-': theta -= angle; break;
      case '[': stack.push({ x, y, theta }); break;
      case ']':
        const state = stack.pop();
        x = state.x; y = state.y; theta = state.theta;
        path += \` M \${x} \${y}\`;
        break;
    }
  }
  
  return path;
}

// Generate: interpret(evolve('F', lsystemRules, 3), 25)</code></pre>

      <br>

      <p>L-systems offer precise control over complexity through iteration depth. Low iterations produce simple geometric forms; higher iterations yield intricate, glyph-like structures.</p>

      <br>

      <h3>3. Reaction-Diffusion</h3>

      <br>

      <p>Gray-Scott and Turing patterns simulate chemical diffusion, producing organic spots, stripes, and labyrinthine forms. The aesthetic is biological—coral, lichen, fingerprints.</p>

      <br>

      <pre><code>// Gray-Scott Reaction-Diffusion (simplified)
// Requires iterative simulation—expensive but distinctive

const config = {
  feed: 0.055,    // Feed rate
  kill: 0.062,    // Kill rate
  dA: 1.0,        // Diffusion rate A
  dB: 0.5,        // Diffusion rate B
};

function stepSimulation(gridA, gridB, config) {
  const { feed, kill, dA, dB } = config;
  const newA = [], newB = [];
  
  for (let y = 0; y < height; y++) {
    newA[y] = []; newB[y] = [];
    for (let x = 0; x < width; x++) {
      const a = gridA[y][x];
      const b = gridB[y][x];
      const lapA = laplacian(gridA, x, y);
      const lapB = laplacian(gridB, x, y);
      const reaction = a * b * b;
      
      newA[y][x] = a + (dA * lapA - reaction + feed * (1 - a));
      newB[y][x] = b + (dB * lapB + reaction - (kill + feed) * b);
    }
  }
  
  return [newA, newB];
}</code></pre>

      <br>

      <p>Reaction-diffusion is computationally expensive. For web deployment, pre-computed frames or WebGL shaders are necessary.</p>

      <br>

      <h3>4. Wolfram-Inspired Hybrid Systems</h3>

      <br>

      <p>Following Christopher Wolfram's approach to the Arrival logograms, a hybrid system combines multiple generative methods:</p>

      <br>

      <pre><code>// Hybrid glyph generator inspired by Wolfram's logogram analysis
function generateHybridGlyph(seed) {
  // 1. Core structure: L-system skeleton
  const skeleton = interpret(evolve('F', treeRules, 2), 60);
  
  // 2. Texture: CA-based fill pattern
  const texture = generateCA(16, 16, seed);
  
  // 3. Boundary: Circular containment (like Arrival logograms)
  const radius = 50;
  const boundary = \`M \${radius} 0 A \${radius} \${radius} 0 1 1 \${radius} 0.01 Z\`;
  
  // 4. Composite: Mask skeleton with texture, contain within boundary
  return {
    skeleton,
    texture: textureToPattern(texture),
    boundary,
    composite: clipPathComposite(skeleton, texture, boundary)
  };
}</code></pre>

      <br>

      <hr>

      <br>

      <h2><strong>Semantic Encoding in 2D Space</strong></h2>

      <br>

      <p>The question of meaning: can emergent glyphs encode actual information, or are they purely decorative?</p>

      <br>

      <p>Wolfram's observation about the "computational universe" suggests a middle path. Glyphs need not be human-readable to be information-bearing. If generation is deterministic—same seed produces same glyph—then the glyph <strong>is</strong> the information, encoded visually.</p>

      <br>

      <h3>Encoding Strategies</h3>

      <br>

      <ul>
        <li><strong>Route-based seeding:</strong> Each page's URL seeds generation. The /about page always produces the same glyph; /projects produces another. The glyph becomes the page's visual signature.</li>
      </ul>

      <br>

      <pre><code>// Deterministic route-to-glyph mapping
function glyphForRoute(pathname) {
  const hash = cyrb53(pathname);  // Fast, deterministic hash
  const seed = hash % 100000;
  const rule = 30 + (hash % 90);  // Rules 30-119
  
  return caGlyph(seed, rule, 32);
}

// cyrb53: fast string hash
function cyrb53(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h2 = Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}</code></pre>

      <br>

      <ul>
        <li><strong>Content hashing:</strong> Hash the page's title or primary content. Content changes produce glyph changes—a visual diff.</li>
        <li><strong>Temporal encoding:</strong> Incorporate publication timestamps. Blog posts from the same month share visual characteristics while remaining distinct.</li>
        <li><strong>Categorical encoding:</strong> Different generative rules for different content types. L-systems for organic/creative content; CA for technical/structured content.</li>
      </ul>

      <br>

      <p>The result: visitors cannot "read" the glyphs, but consistent rules ensure internal logic. Patterns emerge across pages. The writing system is alien but not arbitrary.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Application Across a Visual System</strong></h2>

      <br>

      <p>Where might emergent glyphs appear within a website's visual identity?</p>

      <br>

      <table>
        <tr><th>Location</th><th>Behaviour</th><th>Encoding</th></tr>
        <tr><td>Page headers</td><td>Static, route-seeded</td><td>Unique identity per page</td></tr>
        <tr><td>Section dividers</td><td>Interpolate between adjacent glyphs</td><td>Transitional meaning</td></tr>
        <tr><td>Loading states</td><td>Animate generation process</td><td>Meaning emerging in real-time</td></tr>
        <tr><td>Background</td><td>Tiled CA patterns, slowly evolving</td><td>Ambient complexity</td></tr>
        <tr><td>Navigation</td><td>Glyphs as route indicators</td><td>Functional wayfinding</td></tr>
        <tr><td>Error states</td><td>Fragmented or corrupted glyphs</td><td>Semantic breakdown</td></tr>
        <tr><td>Favicon</td><td>Simplified site glyph</td><td>Brand mark</td></tr>
      </table>

      <br>

      <hr>

      <br>

      <h2><strong>Performance and Implementation</strong></h2>

      <br>

      <p>Generative systems risk blocking the main thread. Mitigation strategies:</p>

      <br>

      <ul>
        <li><strong>Build-time generation:</strong> Pre-compute glyphs for known routes during static site generation. Store as SVG in a manifest.</li>
        <li><strong>Web Workers:</strong> Offload runtime generation to background threads.</li>
        <li><strong>WebGL:</strong> GPU-accelerate complex patterns (reaction-diffusion, high-iteration CA).</li>
        <li><strong>Memoization:</strong> Cache generated glyphs by seed. Same input = same output, no recomputation.</li>
        <li><strong>Progressive rendering:</strong> Display low-complexity glyph immediately; refine asynchronously.</li>
      </ul>

      <br>

      <pre><code>// Build-time glyph generation (Next.js example)
// scripts/generate-glyphs.ts

import { writeFileSync } from 'fs';
import { getAllRoutes } from '../lib/routes';
import { glyphForRoute } from '../lib/glyph-generator';

const routes = getAllRoutes();
const manifest = {};

for (const route of routes) {
  manifest[route] = glyphForRoute(route);
}

writeFileSync(
  './public/glyphs/manifest.json',
  JSON.stringify(manifest, null, 2)
);

// Runtime: import manifest, lookup by route
// No generation cost at runtime for known routes</code></pre>

      <br>

      <hr>

      <br>

      <h2><strong>The Tension: Mystery vs. Accessibility</strong></h2>

      <br>

      <p>Glyphs that "mean something" but cannot be read present design tensions:</p>

      <br>

      <ul>
        <li><strong>Screen readers:</strong> Glyphs should be aria-hidden unless replacing functional elements. Meaning exists visually, not semantically.</li>
        <li><strong>Cognitive load:</strong> Too many glyphs, or glyphs in critical paths, may confuse rather than intrigue.</li>
        <li><strong>Motion:</strong> Evolving glyphs must respect prefers-reduced-motion.</li>
      </ul>

      <br>

      <p>The goal is <strong>ambient mystery</strong>—glyphs exist in peripheral vision, reward attention, but do not gate navigation or comprehension.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Open Questions</strong></h2>

      <br>

      <p>Several design questions remain unresolved:</p>

      <br>

      <ul>
        <li><strong>Visual family:</strong> Should all glyphs share a generator (same algorithm, different seeds) or vary by context?</li>
        <li><strong>Temporal evolution:</strong> Should glyphs be immutable, or subtly shift across visits, seasons, or content updates?</li>
        <li><strong>User participation:</strong> Could visitors generate their own glyphs—input that produces a personal symbol?</li>
        <li><strong>Decipherability:</strong> Should dedicated visitors be able to decode the system? An easter egg key?</li>
        <li><strong>Cross-reference:</strong> If two pages share semantic content, should their glyphs share visual elements?</li>
      </ul>

      <br>

      <p>These questions echo Wolfram's observation about interestingness being context-dependent. What makes a glyph system compelling depends on the site's purpose and audience.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Conclusion: Writing Systems as Emergence</strong></h2>

      <br>

      <p>Human writing evolved to transcribe speech—a solution to a specific problem in a specific context. The computational universe contains countless alternative solutions: writing systems that encode meaning spatially, holistically, or through emergent structural relationships.</p>

      <br>

      <p>Wolfram's work—both Stephen's theoretical framework and Christopher's applied code for <em>Arrival</em>—demonstrates that alien writing is not mysticism but computation. Given rules, a generative system produces symbols with internal logic. Whether that logic is human-readable is a separate question from whether it is meaningful.</p>

      <br>

      <p>For a website built around emergence and complex systems, an emergent writing system is not decoration. It is demonstration: structure arising from simple rules, meaning encoded in two dimensions, the computational universe made visible.</p>

      <br>

      <hr>

      <br>

      <h3>Technical Stack (Proposed)</h3>

      <br>

      <ul>
        <li><strong>Generator:</strong> TypeScript library, framework-agnostic</li>
        <li><strong>Algorithms:</strong> Cellular automata (Wolfram rules), L-systems, hybrid approaches</li>
        <li><strong>Rendering:</strong> SVG for static glyphs, Canvas/WebGL for animation</li>
        <li><strong>Build-time:</strong> Pre-generate via build script, output manifest</li>
        <li><strong>Runtime:</strong> Web Worker + memoization for dynamic routes</li>
      </ul>

      <br>

      <h3>References</h3>

      <br>

      <ul>
        <li>Wolfram, S. (2016). <a href="https://www.space.com/34783-stephen-wolfram-arrival-interview.html" target="_blank" rel="noopener noreferrer">"Arrival, AI and Alien Math: Q&A with Stephen Wolfram"</a>. Space.com.</li>
        <li>Wolfram, C. (2016). <a href="https://www.wolfram.com/wolfram-u/courses/image-signal-processing/the-code-behind-arrival/" target="_blank" rel="noopener noreferrer">"The Code Behind Arrival"</a>. Wolfram U.</li>
        <li>Wolfram, S. (2002). <em>A New Kind of Science</em>. Wolfram Media.</li>
      </ul>
    `
  },
  {
    slug: "vector-database-financial-services-rag-challenges",
    title: "Building a Vector Database for Financial Services: RAG System Challenges",
    excerpt: "Implementing semantic search for enterprise financial platforms reveals domain-specific challenges in chunking, retrieval accuracy, and knowledge curation.",
    date: "December 2025",
    readTime: "12 min read",
    tags: ["RAG", "Vector Database", "Financial Services", "LangChain", "ChromaDB"],
    content: `
      <h1>Building a Vector Database for Financial Services: RAG System Challenges</h1>

      <br>

      <p><em>Lessons from implementing semantic search for an enterprise financial platform.</em></p>

      <br>

      <hr>

      <br>

      <h2><strong>The Problem Space</strong></h2>

      <br>

      <p>Enterprise financial platforms accumulate tribal knowledge at scale. Experienced practitioners hold critical understanding of platform constraints, query patterns, and troubleshooting approaches — knowledge that takes months to transfer through traditional onboarding. New contractors face 3-4 week ramp-up periods. Senior resources spend 40-50% of their time answering repetitive technical queries.</p>

      <br>

      <p>The hypothesis: a Retrieval-Augmented Generation system could capture institutional knowledge in a vector database, enabling semantic search and AI-synthesized responses. The implementation revealed several domain-specific challenges not apparent in standard RAG tutorials.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Technical Architecture</strong></h2>

      <br>

      <p>The system follows a standard RAG pattern with modifications for financial domain content:</p>

      <br>

      <ul>
        <li><strong>Embeddings:</strong> OpenAI text-embedding-3-small — cost-effective at $0.02/1M tokens</li>
        <li><strong>Vector Store:</strong> ChromaDB — zero infrastructure, local persistence</li>
        <li><strong>LLM:</strong> GPT-4o — best quality/latency balance for financial accuracy</li>
        <li><strong>Framework:</strong> LangChain for pipeline orchestration</li>
      </ul>

      <br>

      <p>Documents flow through ingestion (load → chunk → embed → store), then queries trigger retrieval (embed query → similarity search → context injection → LLM synthesis).</p>

      <br>

      <hr>

      <br>

      <h2><strong>Challenge 1: Chunking Strategy for Financial Documentation</strong></h2>

      <br>

      <p>Standard chunking approaches fragment financial content in problematic ways. A 500-token chunk mid-calculation loses context about what the calculation achieves. Code examples split across chunks become syntactically incomplete.</p>

      <br>

      <p><strong>The issue:</strong> Financial platform documentation contains interconnected concepts — FX rates reference currency pairs, consolidation logic references entity hierarchies, query patterns reference dimensional constraints. Naive chunking severs these relationships.</p>

      <br>

      <p><strong>Mitigation attempted:</strong></p>
      <ul>
        <li>Larger chunk sizes (800-1000 tokens) to preserve context</li>
        <li>Overlap increased to 100+ tokens for boundary recovery</li>
        <li>Semantic separators prioritising section headers over arbitrary splits</li>
        <li>Metadata enrichment to tag chunks with document-level context</li>
      </ul>

      <br>

      <p>Chunking remains an active challenge. The optimal strategy appears content-type dependent — different parameters for code patterns versus conceptual explanations versus troubleshooting guides.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Challenge 2: Domain Terminology and Retrieval Relevance</strong></h2>

      <br>

      <p>Financial platforms develop internal vocabulary. "Intersection" means something specific. "Slices" have platform-defined semantics. "Elimination entries" reference consolidation concepts not present in general embeddings.</p>

      <br>

      <p><strong>The issue:</strong> Embedding models trained on general corpora lack domain-specific semantic proximity. A query about "elimination entries" may not retrieve documents about "intercompany adjustments" despite functional equivalence.</p>

      <br>

      <p><strong>Observations:</strong></p>
      <ul>
        <li>Retrieval relevance targets (≥80%) proved optimistic for specialised terminology</li>
        <li>Synonym expansion in knowledge base content improved matching</li>
        <li>Explicit terminology sections per document aided retrieval</li>
        <li>Query reformulation by the LLM (before embedding) showed promise</li>
      </ul>

      <br>

      <p>Fine-tuned embeddings would address this systematically but require substantial training data and compute budget — outside POC scope.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Challenge 3: Proprietary Query Languages in Vector Space</strong></h2>

      <br>

      <p>Many enterprise platforms implement proprietary query languages. These share structural similarity with SQL but carry platform-specific semantics, constraints, and syntax requirements.</p>

      <br>

      <p><strong>The issue:</strong> Embedding a code block captures syntax but loses constraint knowledge. The system retrieves similar-looking queries without understanding platform-specific rules — no aliasing permitted, explicit column specification required, character limits enforced.</p>

      <br>

      <p><strong>Approaches tested:</strong></p>
      <ul>
        <li>Annotated code blocks with prose explanations preceding each example</li>
        <li>Constraint documentation embedded alongside patterns</li>
        <li>Separate retrieval paths for "explain this code" versus "generate code for X"</li>
      </ul>

      <br>

      <p>Code generation remains higher-risk than code explanation. The system performs better at interpreting existing queries than generating compliant new ones.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Challenge 4: Knowledge Base Curation</strong></h2>

      <br>

      <p>RAG system quality depends fundamentally on knowledge base quality. This dependency was intellectually understood but practically underestimated.</p>

      <br>

      <p><strong>The issue:</strong> Curating 10-15 seed documents required significantly more time than technical implementation. Historical issue resolutions existed in tickets, Slack threads, and undocumented team memory — not in embeddable markdown.</p>

      <br>

      <p><strong>Content gaps identified:</strong></p>
      <ul>
        <li>Common troubleshooting paths existed only as oral tradition</li>
        <li>Edge cases (missing FX rates, type mismatches) lacked documented solutions</li>
        <li>Platform constraints spread across multiple source documents</li>
        <li>Code patterns required extraction from production repositories</li>
      </ul>

      <br>

      <p>The POC validated retrieval mechanics but exposed that production deployment requires sustained content curation effort — a people problem, not a technology problem.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Challenge 5: Financial Accuracy Requirements</strong></h2>

      <br>

      <p>Financial services domains carry higher accuracy requirements than typical RAG applications. An incorrect consolidation explanation or flawed FX conversion pattern creates real business risk.</p>

      <br>

      <p><strong>The issue:</strong> LLM hallucination — even at low temperature settings — produces plausible-sounding but incorrect financial calculations. Users may trust AI-generated content that contains subtle errors.</p>

      <br>

      <p><strong>Mitigations implemented:</strong></p>
      <ul>
        <li>Source citations mandatory in every response</li>
        <li>System prompt explicitly constrains answers to retrieved context</li>
        <li>Graceful handling when context insufficient: "I don't have enough information in my knowledge base"</li>
        <li>Low temperature (0.1) to reduce creative variation</li>
      </ul>

      <br>

      <p>Complete hallucination prevention remains impossible. The system design assumes human review of AI-generated content before production use.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Enterprise Deployment Considerations</strong></h2>

      <br>

      <p>Production deployment introduces constraints absent in local POC development:</p>

      <br>

      <ul>
        <li><strong>Data residency:</strong> Financial content may require on-premises vector storage rather than cloud services</li>
        <li><strong>API governance:</strong> LLM API calls transmit query content externally — potentially problematic for sensitive financial data</li>
        <li><strong>Access control:</strong> Knowledge base content requires SSO integration and role-based permissions</li>
        <li><strong>Audit requirements:</strong> Financial services may require logging of all AI interactions</li>
      </ul>

      <br>

      <p>Production architecture likely requires self-hosted embeddings and potentially on-premises LLM deployment — significantly increasing infrastructure complexity.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Current State</strong></h2>

      <br>

      <p>The POC validated core RAG mechanics for financial domain content. Retrieval relevance reached approximately 75% on test queries — below the 80% target but demonstrating feasibility. Answer accuracy rated "helpful" on 70% of evaluated responses.</p>

      <br>

      <p><strong>Key learnings:</strong></p>
      <ul>
        <li>Chunking strategy requires domain-specific tuning</li>
        <li>Knowledge curation effort exceeds technical implementation effort</li>
        <li>Code generation carries higher risk than code explanation</li>
        <li>Financial accuracy requirements demand conservative system design</li>
        <li>Enterprise deployment introduces significant infrastructure complexity</li>
      </ul>

      <br>

      <hr>

      <br>

      <h2><strong>Recommendations</strong></h2>

      <br>

      <p>For teams considering RAG implementations in regulated industries:</p>

      <br>

      <ul>
        <li><strong>Start with knowledge curation.</strong> The vector database is only as good as the content it indexes. Budget more time for content than code.</li>
        <li><strong>Prioritise explanation over generation.</strong> Helping users understand existing systems carries less risk than generating new artifacts.</li>
        <li><strong>Build feedback loops early.</strong> Retrieval quality degrades invisibly without measurement infrastructure.</li>
        <li><strong>Plan for self-hosting.</strong> Regulated industries often cannot transmit sensitive queries to external APIs.</li>
        <li><strong>Assume human review.</strong> Design systems that augment expert judgement rather than replace it.</li>
      </ul>

      <br>

      <p>The technology works. The challenge is institutional: capturing knowledge that exists only in people's heads and maintaining it as systems evolve.</p>

      <br>

      <hr>

      <br>

      <p><strong>Technical Stack:</strong> Python, LangChain, ChromaDB, OpenAI GPT-4o, OpenAI text-embedding-3-small, Streamlit, FastAPI</p>

      <br>

      <p><strong>Domain:</strong> Enterprise financial platforms, consolidation systems, proprietary query languages</p>
    `
  },
  {
    slug: "procedural-geometry-controls-midi-driven-arc-systems",
    title: "Procedural Geometry Controls: MIDI-Driven Arc Systems",
    excerpt: "Lag-driven Carve SOP animation, velocity-scaled sweeps, concentric arc variants, and reusable SOP pool randomisation.",
    date: "November 2025",
    readTime: "11 min read",
    tags: ["TouchDesigner", "MIDI", "Procedural Geometry", "Generative Art"],
    content: `
      <h1>Procedural Geometry Controls: MIDI-Driven Arc Systems</h1>

      <br>

      <h2><strong>Arc Animation Architecture</strong></h2>
      <br>
      <p>The implementation centers on a dual-lag chain driving Carve SOP parameters. The first lag operator establishes the leading edge response, while a second lag trails behind with longer decay. Math CHOPs scale and offset the lag outputs before clamping to the 0-1 range required by Carve's domain parameters. The configuration produces a controlled three-quarter circle sweep&mdash;large enough for visual clarity while maintaining headroom for velocity modulation.</p>

      <br>

      <p>Draw speed derives from lag coefficient adjustment. Lower values yield faster response; higher values extend the sweep duration. Optional low-pass filtering smooths abrupt transitions when needed.</p>

      <br>

      <h2><strong>Velocity-Sensitive Variants</strong></h2>
      <br>
      <p>Velocity normalization feeds a multiplier stage that maps MIDI input intensity to arc length. Harder strikes expand the sweep range proportionally. The system maintains musical correlation: dynamic performance produces dynamic visuals.</p>

      <br>

      <p>Concentric ring variants duplicate the lag/math chain with staggered Carve offsets. Each ring maintains independent temporal behavior while sharing the same trigger source. The result: expanding waves of geometry radiating from origin on each note event.</p>

      <br>

      <h2><strong>SOP Pool Randomization</strong></h2>
      <br>
      <p>A reusable selection system routes a single MIDI impulse through:</p>
      <ul>
        <li>Math CHOP (random value generation)</li>
        <li>Quantize CHOP (discrete integer conversion)</li>
        <li>Limit CHOP (constraint to pool size)</li>
        <li>Switch SOP (indexed geometry selection)</li>
      </ul>

      <br>

      <p>The wiring enables non-deterministic selection from a pool of static and procedural geometries without manual intervention. Adding new variants requires only expanding the Switch SOP input count.</p>

      <br>

      <h2><strong>System Integration</strong></h2>
      <br>
      <p>The animated arc preset shares the established CHOP structure: <code>select &rarr; lag/filter &rarr; math &rarr; limit &rarr; export</code>. This pattern proved compatible with existing line-animation pathways, confirming the architecture's modularity. Each geometry type can implement the same signal flow with type-specific parameter mapping.</p>

      <br>

      <p>Reference networks, Carve configurations, and implementation details are documented in <code>ADDITIONAL_SUGGESTIONS.md</code> for rollout to additional primitive types.</p>

      <br>

      <h2><strong>Technical Notes</strong></h2>
      <br>
      <ul>
        <li>Carve SOP instances remain efficient at reasonable curve resolutions.</li>
        <li>Multiple concurrent lag chains scale linearly with geometry complexity.</li>
        <li>Switch SOP branching requires verification that unused inputs don't cook unnecessarily.</li>
        <li>Velocity normalization ranges may require per-instrument calibration.</li>
      </ul>

      <br>

      <p>The modular approach establishes a reusable framework: MIDI input, CHOP processing chain, SOP parameter driving. Future geometry types inherit the architecture with minimal rewiring.</p>

      <br>

      <p><a href="https://vimeo.com/1136427891?share=copy" target="_blank" rel="noopener noreferrer">Process demonstration</a></p>
    `,
  },
  {
    slug: "temporal-control-midi-visual-systems",
    title: "Temporal Control in MIDI-Driven Visual Systems",
    excerpt: "Extending event-driven parameter control with time-based behaviour to unlock automated motion and evolving visual responses.",
    date: "November 2025",
    readTime: "14 min read",
    tags: ["TouchDesigner", "MIDI", "Temporal Control", "Generative Art", "Python"],
    content: `
      <h1>Temporal Control in MIDI-Driven Visual Systems</h1>

      <br>

      <p><em>Extending event-driven parameter control with time-based behavior.</em></p>

      <br>

      <hr>

      <br>

      <h2><strong>The Limitation</strong></h2>

      <br>

      <p>Event-driven MIDI mapping systems provide immediate parameter control. A note triggers, a parameter changes. The relationship is instantaneous — binary states that flip on command. This directness serves many purposes but constrains expressive range. Complex visual sequences require either manual performance across multiple controllers or acceptance of abrupt transitions.</p>

      <br>

      <p>The system responds but does not evolve.</p>

      <br>

      <hr>

      <br>

      <h2><strong>The Concept</strong></h2>

      <br>

      <p>Temporal control introduces duration as a controllable dimension. Rather than setting parameters to fixed values, MIDI events initiate time-based transformations. A single trigger can generate smooth transitions, choreographed sequences, or continuous modulation — motion that unfolds automatically once initiated.</p>

      <br>

      <p>The distinction matters. Manual control via continuous controllers (CC messages) allows smooth parameter changes through real-time performance. The performer creates motion by physically moving faders and knobs. Temporal control automates this motion. The performer triggers behavior; the system executes the temporal dimension.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Implementation Architecture</strong></h2>

      <br>

      <p>The approach divides responsibility between decision logic and execution.</p>

      <br>

      <p><strong>Python layer:</strong> Routing and orchestration. MIDI events are evaluated, mapping tables consulted, target values calculated. When temporal behavior is specified, Python configures the animation system rather than setting parameters directly.</p>

      <br>

      <p><strong>CHOP layer:</strong> Time-based interpolation. Speed CHOPs generate smooth ramps between values. LFO CHOPs produce continuous oscillation. Filter CHOPs apply smoothing. These operators handle frame-accurate updates at native performance levels without Python overhead.</p>

      <br>

      <p>Parameters reference CHOP outputs through expressions. The system updates continuously without additional scripting.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Temporal Behaviors</strong></h2>

      <br>

      <h3><strong>Ramps and Transitions</strong></h3>

      <br>

      <p>Parameters transition smoothly over specified durations. A sphere's scale grows from 1.0 to 3.0 across two seconds. The interpolation curve can be linear, exponential, or custom — defining the character of motion. Hard triggers produce fast ramps; soft triggers extend duration, creating velocity-sensitive temporal expression.</p>

      <br>

      <h3><strong>Continuous Modulation</strong></h3>

      <br>

      <p>LFO oscillators layer periodic variation onto base values. A geometry breathes — scale pulsing rhythmically while rotation drifts. Multiple frequencies combine to produce complex organic motion. The modulation runs continuously until disabled, requiring no ongoing input.</p>

      <br>

      <h3><strong>Choreographed Sequences</strong></h3>

      <br>

      <p>Multi-step animations unfold from single triggers. Keyframe systems coordinate parameter changes across timelines. Object A scales up over one second, holds for two, then scales down — while simultaneously, Object B follows an offset sequence. The choreography maintains precise synchronization without manual coordination.</p>

      <br>

      <h3><strong>Musical Synchronization</strong></h3>

      <br>

      <p>Temporal durations map to musical time rather than clock time. Animation lengths measured in beats adapt to tempo changes. A four-beat sequence remains musically aligned whether the BPM shifts from 120 to 140. The system listens to MIDI clock or Ableton Link, maintaining rhythmic coherence.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Visual Implications</strong></h2>

      <br>

      <p>Temporal control enables effects impossible through instantaneous parameter changes alone.</p>

      <br>

      <p><strong>Organic motion:</strong> Geometries pulse and breathe. Smooth oscillation at sub-perceptual frequencies creates living quality. Objects appear to inhale and exhale rather than snap between states.</p>

      <br>

      <p><strong>Cinematic transitions:</strong> Camera movements dolly smoothly across seconds. Reveals unfold gradually — opacity fading in while scale grows and rotation accelerates. The composition directs attention through time rather than commanding it instantly.</p>

      <br>

      <p><strong>Impact dynamics:</strong> Sharp transients spike parameters, then decay naturally. A kick drum hit produces an instant scale surge followed by exponential decay, mimicking physical impact. The motion feels natural because the temporal curve matches expectation.</p>

      <br>

      <p><strong>Layered complexity:</strong> Multiple timescales operate simultaneously. Background elements evolve slowly over eight seconds while foreground hits respond instantly. Mid-layer elements pulse at medium frequency. The temporal stratification creates depth — visual parallax in time.</p>

      <br>

      <p><strong>Physics simulation:</strong> Spring systems overshoot targets and oscillate with damping. Objects bounce, recoil, settle. The motion obeys intuitive physical laws, lending credibility to abstract forms.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Complementary Control Paradigms</strong></h2>

      <br>

      <p>Temporal control supplements rather than replaces continuous controller input. The approaches serve distinct purposes.</p>

      <br>

      <p><strong>CC control:</strong> Real-time manual expression. The performer shapes parameters moment to moment, responding to musical energy or improvising variations. The human touch provides nuance and spontaneity.</p>

      <br>

      <p><strong>Temporal control:</strong> Automated complexity. Pre-choreographed sequences execute reliably. Complex multi-parameter animations run hands-free. The performer triggers sophisticated behavior while remaining available for other controls.</p>

      <br>

      <p>Combined, they multiply control bandwidth. One hand manipulates a fader for continuous camera movement while MIDI pads trigger temporal sequences on other parameters. The hybrid approach balances human expression with automated precision.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Technical Considerations</strong></h2>

      <br>

      <p><strong>Performance:</strong> CHOP-based interpolation runs at native frame rates without Python overhead. Multiple simultaneous ramps execute efficiently in parallel. The system maintains stability during dense visual sections.</p>

      <br>

      <p><strong>Flexibility:</strong> Mapping tables store temporal parameters alongside existing configuration. Ramp durations, LFO frequencies, and curve types are specified per-mapping. The system accommodates both instant and temporal behaviors within a unified architecture.</p>

      <br>

      <p><strong>State management:</strong> Active ramps track start times, target values, and progress. The system handles interruption gracefully — new triggers can restart or blend with ongoing motion. State persists correctly through parameter updates.</p>

      <br>

      <p><strong>Extensibility:</strong> The modular design allows progressive enhancement. Basic ramp systems implement quickly. LFO layers, sequence systems, and BPM synchronization extend capability without architectural revision.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Implementation Scope</strong></h2>

      <br>

      <p>A minimal temporal system requires 6-8 hours: CHOP network construction, Python routing modification, mapping table extension, parameter expression linking. The result provides smooth transitions and basic temporal behavior.</p>

      <br>

      <p>Full-featured systems with LFO modulation, animation sequences, and BPM synchronization require 15-20 hours. The investment scales with complexity requirements and desired feature depth.</p>

      <br>

      <hr>

      <br>

      <h2><strong>The Distinction</strong></h2>

      <br>

      <p>Temporal control transforms MIDI from trigger mechanism to timeline initiator. Events become verbs rather than states — <em>transition</em> rather than <em>set</em>, <em>grow</em> rather than <em>is</em>. The shift enables visual systems to compose in time, creating motion that develops, evolves, and breathes.</p>

      <br>

      <p>The geometry doesn't just respond to music. It emerges.</p>

      <br>

      <hr>

      <br>

      <p><strong>Technical Stack:</strong> TouchDesigner, CHOP-based animation, Python orchestration, MIDI protocol.</p>
    `
  },
  {
    slug: "modular-emergent-midi-mapping-updates",
    title: "Recent Updates: Modular Emergent MIDI Mapping System",
    excerpt: "Event-driven geometry control continues to evolve — new features expand expressive control and system flexibility.",
    date: "November 2025",
    readTime: "10 min read",
    tags: ["TouchDesigner", "MIDI", "Generative Art", "Audio Reactivity", "Python"],
    content: `
      <h1>Recent Updates: Modular Emergent MIDI Mapping System</h1>

      <br>

      <p><em>Event-driven geometry control continues to evolve — new features expand expressive control and system flexibility.</em></p>

      <br>

      <hr>

      <br>

      <h2><strong>Velocity Sensitivity</strong></h2>

      <br>

      <p>The system now supports velocity-sensitive parameter modulation. MIDI note velocity (0-127) scales parameter values between defined min/max ranges, enabling expressive control where harder hits produce larger effects and softer touches produce subtle changes.</p>

      <br>

      <p>Velocity sensitivity can be enabled per-mapping via a <code>use_velocity</code> column in mapping tables, maintaining backward compatibility with existing configurations.</p>

      <br>

      <hr>

      <br>

      <h2><strong>One-to-Many Geometry Mappings</strong></h2>

      <br>

      <p>Geometry mappings now support one-to-many relationships, allowing a single MIDI note to control multiple parameters simultaneously. This matches the existing CC mapping behaviour and enables complex, synchronised parameter changes from a single trigger.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Enhanced Parameter Support</strong></h2>

      <br>

      <p>The system now supports decimal parameter values (e.g., 0.1, 2.0) for precise control of continuous parameters. Random value generation automatically uses uniform distribution for float ranges and integer distribution for whole number ranges.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Multi-Mode MIDI Control</strong></h2>

      <br>

      <p>Three distinct MIDI note control modes are available:</p>

      <br>

      <p><strong>Mode 1 (Momentary):</strong> Parameter is ON while note is held, OFF on release.</p>

      <br>

      <p><strong>Mode 2 (Note-based Toggle):</strong> Pressing a note turns parameter ON; pressing a different note turns the previous parameter OFF and the new one ON.</p>

      <br>

      <p><strong>Mode 3 (Any Note Toggle):</strong> Any MIDI note press toggles the parameter state, with state persisting until another note press.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Performance Optimizations</strong></h2>

      <br>

      <p>The system includes caching for mapping tables, reducing table I/O operations. SOP cooking has been optimised to allow natural TouchDesigner cook cycles while maintaining immediate parameter updates.</p>

      <br>

      <hr>

      <br>

      <h2><strong>CC Control</strong></h2>

      <br>

      <p>Control Change (CC) messages are fully supported with one-to-many mapping capabilities, enabling continuous parameter control via MIDI faders, knobs, and automation.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Current State</strong></h2>

      <br>

      <p>The modular rewrite simplifies extending functionality — each layer operates independently, allowing flexible expansion of the control network. Runtime performance remains stable during live performance scenarios.</p>

      <br>

      <hr>

      <br>

      <p><strong>Technical Stack:</strong> TouchDesigner, Python (callbacks & parameter control), CHOP Execute, Table DAT, SOP modulation, modular render pipeline.</p>

      <br>

      <p><strong>Codebase:</strong> <a href="https://github.com/Milesy1/emergent-geometry" target="_blank" rel="noopener noreferrer">https://github.com/Milesy1/emergent-geometry</a></p>
    `
  },
  {
    slug: "complex-systems-platform",
    title: "Building a Complex Systems Research Platform",
    excerpt: "A web platform for sharing dynamical systems research data—Lorenz attractors, logistic maps, chaos metrics—with public API access and interactive visualizations.",
    date: "October 30, 2025",
    readTime: "8 min read",
    tags: ["Next.js", "PostgreSQL", "Three.js", "API Design", "Complex Systems"],
    content: `
      <p>This post is available as a standalone page with enhanced formatting and interactive elements.</p>
      <p><a href="/blog/complex-systems-platform">Read the full post →</a></p>
    `
  },
  {
    slug: "emergent-geometry-midi-sop-reactivity",
    title: "Emergent Geometry: MIDI-Triggered, Event-Based SOP Audio Reactivity",
    excerpt: "Exploring how simple MIDI inputs create complex, unpredictable visual behaviours through event-based SOP systems in TouchDesigner.",
    date: "October 27, 2025",
    readTime: "12 min read",
    tags: ["TouchDesigner", "Generative Art", "MIDI", "Emergence", "Audio Reactivity"],
    content: `
      <h1>Building a MIDI-Triggered SOP Engine for Modular Audio Reactivity</h1>

      <br>

      <p><em>Event-based control for real-time visual performance inside TouchDesigner.</em></p>

      <br>

      <hr>

      <br>

      <h2><strong>The Problem</strong></h2>

      <br>

      <p>Most audio-reactive systems rely on continuous sound analysis — volume, frequency bands, or envelopes driving SOP parameters directly. This project aims for something more musical: <strong>event-based geometry control</strong>, where individual MIDI notes trigger discrete SOP events, toggles, and modulations in sync with performance gestures.</p>

      <br>

      <hr>

      <br>

      <h2><strong>The Approach</strong></h2>

      <br>

      <p>The system is designed as a <strong>modular, event-driven architecture</strong> combining CHOP Execute callbacks, table-driven mappings, and a centralised SOP pool.</p>

      <br>

      <p>Every MIDI note routes to a parameter update or switch event without hard-wiring SOP paths. This enables rapid reconfiguration and scalable performance setups.</p>

      <br>

      <p><strong>Core layers:</strong></p>

      <br>

      <p><strong>MIDI Input Layer</strong><br>
      • Captures note-on/off events with velocity and channel data.<br>
      • Routes note information to the <code>midi_reactive_mappings</code> table.<br>
      • Executes callbacks to trigger parameter updates dynamically.</p>

      <br>

      <p><strong>Parameter Mapping Layer</strong><br>
      • Each note links to a specific SOP path and parameter.<br>
      • Table rows define toggle states and optional min/max ranges.<br>
      • Missing parameters or invalid paths log safely without breaking runtime.</p>

      <br>

      <p><strong>SOP Pool & Modular Rendering</strong><br>
      • A reusable SOP pool feeds the modular render network.<br>
      • SOPs are switched, toggled, or modulated via mapping data.<br>
      • Complex geometry systems remain decoupled from input logic.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Implementation Challenges</strong></h2>

      <br>

      <p><strong>Parameter Resolution</strong> – SOP parameters sometimes failed to resolve dynamically; null checks and attribute access validation fixed this.</p>

      <br>

      <p><strong>Mapping Integrity</strong> – Early tables missed <code>min</code>/<code>max</code> columns, causing modulation errors; default fallback values were added.</p>

      <br>

      <p><strong>Callback Synchronization</strong> – Parallel CHOP Exec nodes created duplicate triggers; logic consolidation in one callback improved consistency.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Example Mapping Table</strong></h2>

      <br>
      
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">note</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">sop_path</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">parameter</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">toggle</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">min</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">max</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">36</td>
            <td style="border: 1px solid #ddd; padding: 8px;">/project1/modular_render/geo1/switch1</td>
            <td style="border: 1px solid #ddd; padding: 8px;">input</td>
            <td style="border: 1px solid #ddd; padding: 8px;">1</td>
            <td style="border: 1px solid #ddd; padding: 8px;">0</td>
            <td style="border: 1px solid #ddd; padding: 8px;">1</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">37</td>
            <td style="border: 1px solid #ddd; padding: 8px;">/project1/modular_render/geo1/switch1</td>
            <td style="border: 1px solid #ddd; padding: 8px;">input</td>
            <td style="border: 1px solid #ddd; padding: 8px;">2</td>
            <td style="border: 1px solid #ddd; padding: 8px;">0</td>
            <td style="border: 1px solid #ddd; padding: 8px;">1</td>
          </tr>
        </tbody>
      </table>

      <br>

      <hr>

      <br>

      <h2><strong>Example Code</strong></h2>

      <br>
      
      <pre style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; overflow-x: auto; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.4;">
<code style="color: #d73a49;">def</code> <span style="color: #6f42c1;">apply_toggle_modulation</span>(<span style="color: #e36209;">note</span>, <span style="color: #e36209;">velocity</span>):
    <span style="color: #e36209;">table</span> = <span style="color: #6f42c1;">op</span>(<span style="color: #032f62;">'/simple_midi_mapper/midi_reactive_mappings'</span>)
    <span style="color: #d73a49;">for</span> <span style="color: #e36209;">i</span> <span style="color: #d73a49;">in</span> <span style="color: #6f42c1;">range</span>(<span style="color: #005cc5;">1</span>, <span style="color: #e36209;">table</span>.<span style="color: #e36209;">numRows</span>):  <span style="color: #6a737d;"># skip header</span>
        <span style="color: #d73a49;">if</span> <span style="color: #6f42c1;">int</span>(<span style="color: #e36209;">table</span>[<span style="color: #e36209;">i</span>, <span style="color: #005cc5;">0</span>].<span style="color: #e36209;">val</span>) == <span style="color: #e36209;">note</span>:
            <span style="color: #e36209;">sop</span> = <span style="color: #6f42c1;">op</span>(<span style="color: #e36209;">table</span>[<span style="color: #e36209;">i</span>, <span style="color: #005cc5;">1</span>].<span style="color: #e36209;">val</span>)
            <span style="color: #e36209;">param_name</span> = <span style="color: #e36209;">table</span>[<span style="color: #e36209;">i</span>, <span style="color: #005cc5;">2</span>].<span style="color: #e36209;">val</span>
            <span style="color: #e36209;">param</span> = <span style="color: #6f42c1;">getattr</span>(<span style="color: #e36209;">sop</span>.<span style="color: #e36209;">par</span>, <span style="color: #e36209;">param_name</span>, <span style="color: #d73a49;">None</span>)
            <span style="color: #d73a49;">if</span> <span style="color: #e36209;">param</span>:
                <span style="color: #e36209;">param</span>.<span style="color: #e36209;">val</span> = <span style="color: #e36209;">table</span>[<span style="color: #e36209;">i</span>, <span style="color: #005cc5;">3</span>].<span style="color: #e36209;">val</span>  <span style="color: #6a737d;"># toggle or set value</span>
                <span style="color: #6f42c1;">print</span>(<span style="color: #032f62;">f"[TOGGLE] Note {note} -> {sop.path}.{param_name} = {param.val}"</span>)
            <span style="color: #d73a49;">else</span>:
                <span style="color: #6f42c1;">print</span>(<span style="color: #032f62;">f"[ERROR] Missing parameter '{param_name}' in {sop.path}"</span>)</code>
      </pre>

      <br>
      
      <p>This function forms the backbone of MIDI-driven SOP modulation, translating note events into parameter updates as defined by the mapping table.</p>

      <br>

      <hr>

      <br>

      <h2><strong>Current State</strong></h2>

      <br>

      <p>The system now supports:</p>

      <br>

      <p>• Event-based SOP toggling and modulation via MIDI.<br>
      • Centralised callback logic with improved modularity.<br>
      • Table-driven configuration for rapid prototyping.<br>
      • Reliable runtime logging for live debugging and feedback.</p>

      <br>

      <p>The modular rewrite simplifies extending functionality — each layer operates independently, allowing flexible expansion of the control network.</p>

      <br>

      <hr>

      <br>

      <h2><strong>What's Next</strong></h2>

      <br>

      <p>1. Add velocity-based modulation for dynamic range control.<br>
      2. Introduce temporal smoothing for parameter fades.<br>
      3. Expand the SOP pool for multi-geometry performance control.<br>
      4. Create a visual GUI to monitor active mappings.<br>
      5. Implement preset management for mapping recall.<br>
      6. Explore generative behaviours — spawning and destroying SOPs dynamically via note sequences.</p>

      <br>

      <hr>

      <br>

      <p><strong>Technical Stack:</strong> TouchDesigner, Python (callbacks & parameter control), CHOP Execute, Table DAT, SOP switching, modular render pipeline.</p>

      <br>

      <p><strong>Codebase:</strong> <a href="https://github.com/Milesy1/emergent-geometry" target="_blank" rel="noopener noreferrer">https://github.com/Milesy1/emergent-geometry</a></p>
    `
  },
  {
    slug: "voice-activated-ai-assistant",
    title: "Building a Voice-Activated AI Assistant for My Portfolio",
    excerpt: "How I built a page-aware, voice-controlled AI assistant that works seamlessly across desktop and mobile devices.",
    date: "October 24, 2025",
    readTime: "15 min read",
    tags: ["AI", "Web Development", "Voice Recognition", "Next.js"],
    content: `
      <h1>Building a Voice-Activated, Page-Aware AI Assistant</h1>

      <br>

      <h2><strong>The Problem</strong></h2>
      <p>Portfolio sites are static. Visitors scan content, leave, and rarely engage deeply. I wanted something different: an interface that responds to context, understands intent, and works as naturally on mobile as it does on desktop.</p>

      <br>

      <h2><strong>The Approach</strong></h2>
      <p>The system combines three core technologies: Web Speech API for voice recognition, RAG (Retrieval Augmented Generation) for intelligent responses, and context injection to understand which page the user is viewing.</p>

      <br>
      
      <p> <strong>Page awareness</strong> means the assistant knows where you are. Ask "What's this about" on the projects page versus the now page, and you get different, contextually relevant answers. The system passes current page metadata, content structure, and user location to the AI model before generating responses.</p>

      <br>
      
      <p> <strong>Voice-first design</strong> solves mobile UX challenges. Typing on mobile is slow and error-prone. Speaking is significantly faster and requires less cognitive load. The interface degrades gracefully: if voice recognition fails or isn't supported, users can type instead.</p>

      <br>

      <h2><strong>Technical Architecture</strong></h2>

      <br>
      
      <h3><strong>Voice Input Layer</strong></h3>
      <ul>
        <li>• Web Speech API handles voice-to-text conversion</li>
        <li>• Real-time transcription displays as users speak</li>
        <li>• Automatic stop after 3 seconds of silence</li>
        <li>• Manual stop via double-click interaction</li>
      </ul>

      <br>

      <h3><strong>Context Layer</strong></h3>
      <ul>
        <li>• Extracts current page path, title, and main content</li>
        <li>• Builds structured context object with page metadata</li>
        <li>• Injects relevant information into prompt before API call</li>
        <li>• Processes page contexts efficiently for each query</li>
      </ul>

      <br>

      <h3><strong>RAG System</strong></h3>
      <ul>
        <li>• Static knowledge base with structured portfolio content</li>
        <li>• Text-based search retrieves relevant context</li>
        <li>• Claude API generates responses using retrieved information</li>
        <li>• Responses limited to verified, context-specific information</li>
      </ul>

      <br>

      <h3><strong>Interface Layer</strong></h3>
      <ul>
        <li>• Facebook Messenger-style chat widget</li>
        <li>• Persistent conversation history within session</li>
        <li>• Mobile-optimised touch interactions</li>
        <li>• Graceful fallback to text input when voice fails</li>
      </ul>

      <br>

      <h2><strong>Implementation Challenges</strong></h2>

      <br>
      
      <p><strong>Cross-browser voice recognition</strong> was the first hurdle. iOS Safari and Chrome handle the Web Speech API differently. Safari requires explicit user gestures and doesn't support continuous listening. The solution: detect browser capabilities and adjust behaviour accordingly.</p>

      <br>
      
      <p><strong>Mobile performance</strong> required careful optimisation. Voice processing, context extraction, and API calls need to complete quickly to feel responsive. The system prioritises essential context extraction and efficient API communication to maintain good performance across devices.</p>

      <br>
      
      <p><strong>Context relevance</strong> demanded experimentation. Early versions passed too much page data, creating noisy prompts. The system now extracts only essential information: page type, primary headings, and key content summaries. This keeps prompts focused and responses accurate.</p>

      <br>

      <h2><strong>Current State</strong></h2>
      
      <p>The assistant handles conversational queries about my work, projects, and background. Response times are generally fast and responsive across devices. Voice recognition works well in typical environments, though accuracy varies with ambient noise and microphone quality.</p>
      
      <p>It works across iOS Safari, Chrome (desktop and Android), and Edge. Firefox has limited Web Speech API support, so the system defaults to text input.</p>
      
      <br>
      
      <p>Users can ask questions like "What technologies do you work with" or "Tell me about the Lorenz visualization" and receive contextually appropriate responses based on their current page.</p>
      
      <p><strong>Example:</strong> On the projects page, asking "What's this project about?" returns details about the specific project being viewed. On the Now page, the same question provides context about current work and interests.</p>

      <br>

      <h2><strong>Trade-offs</strong></h2>
      
      <p>Voice interfaces aren't universally better. They require microphone permissions, work poorly in noisy environments, and some users simply prefer typing. The system accommodates both interaction modes rather than forcing voice-first.</p>
      
      <br>
      
      <p>Page awareness adds complexity. Every query requires context extraction and processing. For static content, this overhead might not justify the benefit. For a portfolio showcasing AI capabilities, it demonstrates technical depth.</p>

      <br>

      <h2><strong>Lessons Learned</strong></h2>
      
      <br>
      
      <ul>
        <li><strong>Start with text, add voice second.</strong> Building the chat interface first made voice integration cleaner. Voice became an input method rather than the entire feature.</li>
        <br>
        <li><strong>Context quality matters more than quantity.</strong> Sending less, more relevant information produces better responses than dumping entire page content into prompts.</li>
        <br>
        <li><strong>Mobile-first isn't optional.</strong> A significant portion of portfolio traffic comes from mobile devices. A feature that works poorly on mobile effectively doesn't work.</li>
        <br>
        <li><strong>Graceful degradation is critical.</strong> Voice recognition fails. APIs timeout. Browsers lack support. The system needs fallback paths at every layer.</li>
      </ul>

      <br>

      <h2><strong>Try It</strong></h2>
      
      <p>Visit any page and click the "Ask Miles" button. Ask about projects, technologies, or current work. The assistant understands context and provides relevant responses.</p>
      
      <br>
      
      <p>Or just type if you prefer. Both work.</p>

      <br>

      <hr>
      
      <br>
      
      <h2><strong>What's Next?</strong></h2>
      
      <p>The current implementation uses a static knowledge base. Queries match against pre-defined content structures. This works for straightforward questions about specific projects or skills.</p>
      
      <br>
      
      <p>Vector embeddings would enable semantic search across all content. Instead of keyword matching, the system could understand intent. A query like "show me projects involving real-time data" would surface relevant work even if those exact words don't appear in project descriptions.</p>
      
      <br>
      
      <p>The trade-off is complexity. Vector databases add infrastructure overhead, embedding generation adds latency, and semantic search introduces uncertainty in result relevance. For a portfolio with limited content, static context may be sufficient.</p>
      
      <br>
      
      <p>Currently evaluating whether the improved response quality justifies the added complexity.</p>
      
      <br>
      
      <p><strong>Technical Details:</strong> Next.js 15, TypeScript, Web Speech API, Anthropic Claude API, Static knowledge base (investigating vector embeddings for future enhancement)</p>
      
      <br>
      
      <p><strong>Code:</strong> <a href="https://github.com/Milesy1/mileswaiteR2" target="_blank" rel="noopener noreferrer">Link to relevant sections on GitHub</a></p>
    `
  }
];
