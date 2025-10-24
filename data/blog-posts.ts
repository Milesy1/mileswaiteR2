
export const blogPosts = [
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
        <li>• Mobile-optimized touch interactions</li>
        <li>• Graceful fallback to text input when voice fails</li>
      </ul>

      <br>

      <h2><strong>Implementation Challenges</strong></h2>

      <br>
      
      <p><strong>Cross-browser voice recognition</strong> was the first hurdle. iOS Safari and Chrome handle the Web Speech API differently. Safari requires explicit user gestures and doesn't support continuous listening. The solution: detect browser capabilities and adjust behavior accordingly.</p>

      <br>
      
      <p><strong>Mobile performance</strong> required careful optimization. Voice processing, context extraction, and API calls need to complete quickly to feel responsive. The system prioritizes essential context extraction and efficient API communication to maintain good performance across devices.</p>

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
