
export const blogPosts = [
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
