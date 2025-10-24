'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ============================================================================
// BLOG POST DATA - Same as main blog page
// ============================================================================
const blogPosts = [
  {
    slug: "voice-activated-ai-assistant",
    title: "Building a Voice-Activated AI Assistant for My Portfolio",
    excerpt: "How I built a page-aware, voice-controlled AI assistant that works seamlessly across desktop and mobile devices.",
    date: "October 24, 2025",
    readTime: "15 min read",
    tags: ["AI", "Web Development", "Voice Recognition", "Next.js"],
    content: `
      <p><em>How I built a page-aware, voice-controlled AI assistant that works seamlessly across desktop and mobile devices</em></p>

      <h2>The Vision: Why Build This?</h2>
      <p>As a developer working on complex systems and experimental music projects, I wanted my portfolio to reflect the cutting-edge nature of my work. The idea of a voice-activated AI assistant that could understand context and provide intelligent responses about my projects felt like the perfect showcase of modern web technologies.</p>

      <p>But here's the thing - I didn't want just another chatbot. I wanted something that would:</p>
      <ul>
        <li><strong>Understand where you are</strong> on my site (project pages, about page, etc.)</li>
        <li><strong>Work on mobile devices</strong> (where most people browse portfolios)</li>
        <li><strong>Feel natural and intuitive</strong> (like talking to a knowledgeable colleague)</li>
        <li><strong>Maintain conversation context</strong> (remember what we discussed)</li>
      </ul>

      <h2>The Technical Challenge</h2>
      <p>Building this wasn't straightforward. Here are the key challenges I faced:</p>

      <h3>1. Mobile Voice Recognition</h3>
      <p>The Web Speech API works differently across browsers and devices. Mobile Safari has different behavior than Chrome, and iOS requires user interaction to enable microphone access.</p>

      <h3>2. Page-Aware Context</h3>
      <p>The AI needed to understand not just what page you're on, but what specific project you're viewing, what technologies are involved, and what context would be most helpful.</p>

      <h3>3. Seamless Fallback</h3>
      <p>When voice recognition fails (which it often does), users need a smooth path to text input without losing the conversational flow.</p>

      <h2>The Architecture</h2>
      <p>Here's how I structured the system:</p>

      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace; font-size: 14px;">
        <div>┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐</div>
        <div>│   Voice Input   │───▶│  Page Context    │───▶│   RAG System    │</div>
        <div>│ (Web Speech API)│    │   Extraction     │    │  (GROQ + KB)    │</div>
        <div>└─────────────────┘    └──────────────────┘    └─────────────────┘</div>
        <div>         │                       │                       │</div>
        <div>         ▼                       ▼                       ▼</div>
        <div>┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐</div>
        <div>│  Fallback UI    │    │  Context Prompt  │    │  AI Response    │</div>
        <div>│ (Text Input)    │    │   Generation     │    │   Processing    │</div>
        <div>└─────────────────┘    └──────────────────┘    └─────────────────┘</div>
        <div>         │                       │                       │</div>
        <div>         └───────────────────────┼───────────────────────┘</div>
        <div>                                 ▼</div>
        <div>                    ┌─────────────────┐</div>
        <div>                    │ Chat Widget UI  │</div>
        <div>                    │ (Messenger-style)│</div>
        <div>                    └─────────────────┘</div>
      </div>

      <h2>Implementation Journey</h2>

      <h3>Phase 1: Basic Voice Recognition</h3>
      <p>I started with a simple voice recognition component:</p>

      <pre style="background: #f8f9fa; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0;"><code>const recognitionRef = useRef&lt;any&gt;(null);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
    }
  }
}, []);</code></pre>

      <p><strong>First Challenge:</strong> The Web Speech API behaves differently across browsers. Chrome uses <code>SpeechRecognition</code>, while Safari uses <code>webkitSpeechRecognition</code>.</p>

      <h3>Phase 2: Page Context Extraction</h3>
      <p>The AI needed to understand where users are and what they're looking at:</p>

      <pre style="background: #f8f9fa; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0;"><code>const getPageType = (pathname: string) => {
  if (pathname.startsWith('/projects/')) return 'project';
  if (pathname === '/about') return 'about';
  if (pathname === '/now') return 'now';
  return 'general';
};

const getPageContent = (pathname: string) => {
  const pageType = getPageType(pathname);
  if (pageType === 'project') {
    const projectSlug = pathname.split('/').pop();
    return \`Project page: \${projectSlug}\`;
  }
  return \`\${pageType} page\`;
};</code></pre>

      <p><strong>Key Insight:</strong> Context is everything. The AI's responses are dramatically better when it knows exactly what project you're viewing.</p>

      <h3>Phase 3: RAG Integration</h3>
      <p>I integrated with GROQ's API and built a knowledge base system:</p>

      <pre style="background: #f8f9fa; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0;"><code>// Enhanced system prompt with page context
const systemPrompt = \`
You are Miles' AI assistant. You have access to his portfolio, projects, and expertise.

CURRENT PAGE CONTEXT:
- Page: \${pageContext.pathname}
- Type: \${pageContext.pageType}
- Content: \${pageContext.pageContent}

Provide helpful, contextual responses based on the current page and user's question.
\`;</code></pre>

      <p><strong>The Magic:</strong> By injecting page context into the system prompt, the AI becomes genuinely helpful rather than generic.</p>

      <h3>Phase 4: Mobile Optimization</h3>
      <p>Mobile was the biggest challenge. Here's what I learned:</p>

      <pre style="background: #f8f9fa; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0;"><code>// Mobile-specific settings
recognitionRef.current.maxAlternatives = 1;
recognitionRef.current.continuous = false;

// Handle mobile-specific errors
recognitionRef.current.onerror = (event: any) => {
  if (event.error === 'network') {
    // Common on mobile - show text input fallback
    setShowChatWidget(true);
  }
};</code></pre>

      <p><strong>Mobile Gotchas:</strong></p>
      <ul>
        <li>iOS requires user gesture to enable microphone</li>
        <li>Network errors are common on mobile</li>
        <li>Different browsers have different permission flows</li>
      </ul>

      <h3>Phase 5: Chat Widget UI</h3>
      <p>I wanted the conversation to feel natural, so I built a Facebook Messenger-style chat widget:</p>

      <pre style="background: #f8f9fa; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0;"><code>// Theme-aware styling
const chatWidgetClasses = \`
  fixed bottom-4 right-4 w-80 max-w-[calc(100vw-1rem)]
  bg-white dark:bg-neutral-900
  rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700
  transition-all duration-300 transform
  \${isClosing ? 'animate-fadeOutDown' : 'animate-fadeInUp'}
\`;</code></pre>

      <p><strong>Design Philosophy:</strong> The chat should feel like a natural extension of the site, not a separate application.</p>

      <h2>Key Features That Make It Special</h2>

      <h3>1. Smart Fallback System</h3>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace; font-size: 14px;">
        <div>Voice Recognition → Text Input → Redirect to About Page</div>
        <div>     ↓                    ↓              ↓</div>
        <div>  Success!           Manual Input    Full Chat UI</div>
      </div>

      <h3>2. Page-Aware Intelligence</h3>
      <ul>
        <li>On project pages: "Tell me about this project's technical challenges"</li>
        <li>On Now page: "What are you currently working on?"</li>
        <li>On About page: "What's your background in complex systems?"</li>
      </ul>

      <h3>3. Persistent Conversation</h3>
      <p>The chat widget maintains conversation history, so you can ask follow-up questions naturally.</p>

      <h3>4. Mobile-First Design</h3>
      <p>Optimized for touch interactions and mobile browser quirks.</p>

      <h2>The Mobile Admin System</h2>
      <p>As a bonus, I built a mobile-optimized admin system for updating my "Now" page:</p>

      <pre style="background: #f8f9fa; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0;"><code>// Smart persistence - only update what changed
const handleSubmit = async (formData: any) => {
  const latestData = await fetch('/api/now/latest').then(r => r.json());
  const updatedData = { ...latestData, ...formData };
  // Only changed fields are updated
};</code></pre>

      <p><strong>Smart Features:</strong></p>
      <ul>
        <li>Pre-fills form with latest data</li>
        <li>Only updates changed fields</li>
        <li>Auto-saves drafts to localStorage</li>
        <li>Password-protected access</li>
      </ul>

      <h2>Lessons Learned</h2>

      <h3>1. Voice Recognition is Unreliable</h3>
      <p>Plan for failure. The Web Speech API will fail, especially on mobile. Build robust fallbacks.</p>

      <h3>2. Context is King</h3>
      <p>An AI without context is just a fancy search engine. Page-aware responses are dramatically more useful.</p>

      <h3>3. Mobile is Different</h3>
      <p>Mobile browsers have different behaviors, permissions, and limitations. Test early and often.</p>

      <h3>4. User Experience Matters</h3>
      <p>The technical implementation is only half the battle. The UI/UX makes or breaks the feature.</p>

      <h2>Technical Stack</h2>
      <ul>
        <li><strong>Frontend:</strong> Next.js 14, TypeScript, Tailwind CSS</li>
        <li><strong>Voice:</strong> Web Speech API</li>
        <li><strong>AI:</strong> GROQ API with custom RAG system</li>
        <li><strong>Styling:</strong> Framer Motion for animations</li>
        <li><strong>Storage:</strong> File-based JSON for persistence</li>
        <li><strong>Deployment:</strong> Vercel with GitHub integration</li>
      </ul>

      <h2>Performance Metrics</h2>
      <ul>
        <li><strong>Build Time:</strong> ~3 hours of focused development</li>
        <li><strong>Bundle Size:</strong> Minimal impact (~50KB additional)</li>
        <li><strong>Mobile Compatibility:</strong> ✅ Works on iOS Safari, Chrome, Firefox</li>
        <li><strong>Voice Recognition Success Rate:</strong> ~70% (with fallbacks for 100% functionality)</li>
      </ul>

      <h2>Future Possibilities</h2>
      <p>This foundation opens up exciting possibilities:</p>
      <ol>
        <li><strong>Multi-language Support</strong> - Voice recognition in different languages</li>
        <li><strong>Voice Commands</strong> - "Show me your TouchDesigner projects"</li>
        <li><strong>Audio Responses</strong> - Text-to-speech for hands-free interaction</li>
        <li><strong>Integration with Other Tools</strong> - Connect to GitHub, music streaming, etc.</li>
        <li><strong>Analytics</strong> - Track what questions people ask most</li>
      </ol>

      <h2>The Code</h2>
      <p>The complete implementation is available on GitHub: <a href="https://github.com/Milesy1/mileswaiteR2" target="_blank" rel="noopener noreferrer">mileswaiteR2</a></p>

      <p><strong>Key files:</strong></p>
      <ul>
        <li><code>components/project/VoiceAskMilesButton.tsx</code> - Main voice assistant component</li>
        <li><code>app/api/chat/route.ts</code> - RAG API endpoint</li>
        <li><code>data/knowledge-base.ts</code> - AI knowledge base</li>
        <li><code>app/admin/now/page.tsx</code> - Mobile admin system</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Building a voice-activated AI assistant taught me that the future of web interfaces isn't just about visual design—it's about creating natural, contextual interactions that feel like talking to a knowledgeable colleague.</p>

      <p>The technical challenges were significant, but the result is something that genuinely enhances the user experience. It's not just a gimmick; it's a practical tool that helps visitors understand my work better.</p>

      <p><strong>The most rewarding part?</strong> Seeing it work flawlessly on mobile devices, where most people actually browse portfolios. That moment when the voice recognition captures your question and the AI responds with contextual, helpful information—that's when you know you've built something special.</p>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;" />

      <p><em>What would you build if you could add voice interaction to your portfolio? The possibilities are endless.</em></p>

      <h2>Try It Yourself</h2>
      <p>Visit <a href="https://mileswaite.net" target="_blank" rel="noopener noreferrer">mileswaite.net</a> and click "Ask Miles" on any project page. Ask questions like:</p>
      <ul>
        <li>"What technologies did you use for this project?"</li>
        <li>"What challenges did you face?"</li>
        <li>"Tell me about your approach to complex systems"</li>
      </ul>
      <p>The AI will respond with context-aware information about the specific project you're viewing.</p>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;" />

      <p><em>This post was written by Miles Waite, a developer specializing in complex systems, experimental music, and cutting-edge web technologies. You can find more of his work at <a href="https://mileswaite.net" target="_blank" rel="noopener noreferrer">mileswaite.net</a>.</em></p>
    `
  },
  {
    slug: "emergent-geometry-touchdesigner",
    title: "Emergent Geometry in TouchDesigner",
    excerpt: "Exploring how procedural systems can generate complex, organic forms that emerge from simple rules and interactions.",
    date: "October 15, 2025",
    readTime: "8 min read",
    tags: ["TouchDesigner", "Generative Art", "Geometry"],
    content: "Coming soon - this is where the full blog post content would go..."
  },
  {
    slug: "complex-systems-thinking",
    title: "Complex Systems and Creative Practice",
    excerpt: "How understanding complex adaptive systems can inform and enhance creative work across disciplines.",
    date: "October 8, 2025",
    readTime: "12 min read",
    tags: ["Complex Systems", "Philosophy", "Creative Practice"],
    content: "Coming soon - this is where the full blog post content would go..."
  },
  {
    slug: "python-automation-workflow",
    title: "Python Automation for Creative Workflows",
    excerpt: "Building efficient pipelines that connect different creative tools and automate repetitive tasks.",
    date: "October 1, 2025",
    readTime: "6 min read",
    tags: ["Python", "Automation", "Workflow"],
    content: "Coming soon - this is where the full blog post content would go..."
  },
  {
    slug: "sound-design-philosophy",
    title: "The Philosophy of Sound Design",
    excerpt: "Thoughts on how sound shapes perception and creates emotional landscapes in digital environments.",
    date: "September 24, 2025",
    readTime: "10 min read",
    tags: ["Sound Design", "Philosophy", "Perception"],
    content: "Coming soon - this is where the full blog post content would go..."
  },
  {
    slug: "nextjs-portfolio-architecture",
    title: "Building a Minimal Portfolio with Next.js",
    excerpt: "Architectural decisions and design patterns for creating clean, performant portfolio sites.",
    date: "September 17, 2025",
    readTime: "7 min read",
    tags: ["Next.js", "Web Development", "Portfolio"],
    content: "Coming soon - this is where the full blog post content would go..."
  }
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState<any>(null);
  
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);

  useEffect(() => {
    setIsLoaded(true);
    const foundPost = blogPosts.find(p => p.slug === resolvedParams.slug);
    setPost(foundPost);
  }, [resolvedParams.slug]);

  if (!post) {
    notFound();
  }

  return (
    <motion.div 
      className="pt-16 lg:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Back to Blog */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Link 
                href="/blog"
                className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200 font-mono"
              >
                ← Back to Blog
              </Link>
            </motion.div>

            {/* Post Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 dark:text-neutral-100 leading-tight">
              {post.title}
            </h1>
            
            {/* Post Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="font-mono">{post.date}</span>
              <span className="text-neutral-300 dark:text-neutral-600">·</span>
              <span>{post.readTime}</span>
              {post.tags.length > 0 && (
                <>
                  <span className="text-neutral-300 dark:text-neutral-600">·</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-neutral dark:prose-invert max-w-none"
          >
            <div 
              className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.article>
        </div>
      </section>
    </motion.div>
  );
}
