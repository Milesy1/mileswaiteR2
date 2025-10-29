
export const blogPosts = [
  {
    slug: "emergent-geometry-midi-sop-reactivity",
    title: "Emergent Geometry: MIDI-Triggered, Event-Based SOP Audio Reactivity",
    excerpt: "Exploring how simple MIDI inputs create complex, unpredictable visual behaviors through event-based SOP systems in TouchDesigner.",
    date: "January 15, 2025",
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

      <p>The system is designed as a <strong>modular, event-driven architecture</strong> combining CHOP Execute callbacks, table-driven mappings, and a centralized SOP pool.</p>

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
      • Centralized callback logic with improved modularity.<br>
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
      6. Explore generative behaviors — spawning and destroying SOPs dynamically via note sequences.</p>

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
