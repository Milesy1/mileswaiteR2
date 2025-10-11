export const milesKnowledge = {
  bio: "Miles Waite is a Business Analyst with 20+ years solving complex problems across energy trading, risk management, and AI/GenAI systems. He has a proven track record leading cross-functional teams, managing technical delivery, and driving operational excellence in mission-critical environments. Recently completed Santa Fe Institute courses in Complexity Science and Dynamical Systems (2025), applying these principles to AI architecture and knowledge management systems. Core expertise includes GenAI/RAG Architecture, Energy Trading & Risk Management Systems, and Team Leadership (managed teams up to 15 developers).",
  
  techStack: {
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js"],
    backend: ["Node.js", "API Development", "PHP", "MySQL", "Apache", "Linux"],
    deployment: ["Vercel", "Linux VM", "Multi-environment configuration"],
    ai: ["RAG Architecture", "LLM Integration (Groq/Llama)", "Prompt Engineering", "Knowledge Management Systems"],
    trading: ["OpenLink Endur", "Value at Risk (VaR)", "Monte Carlo Simulation", "Black-Scholes Modelling", "Scenario Analysis"],
    ecommerce: ["Magento", "E-commerce platforms", "Inventory management", "Order processing"],
    specialties: ["Real-time systems", "3D visualization", "Complex systems modeling", "Risk management", "Team leadership"]
  },
  
  projects: [
    {
      title: "Portfolio Website",
      description: "Modern portfolio built with Next.js 14 App Router, featuring 3D visualizations and AI-powered chatbot",
      technologies: ["Next.js", "Three.js", "Tailwind CSS", "Groq AI", "TypeScript"],
      challenge: "Create a cutting-edge portfolio that demonstrates technical expertise while maintaining elegant simplicity",
      solution: "Implemented server components, dynamic routing, and integrated AI chatbot with RAG capabilities. Added interactive 3D wireframe cube using Three.js.",
      keywords: ["portfolio", "next.js", "three.js", "ai", "chatbot", "3d", "visualization", "modern", "web development"]
    },
    {
      title: "TouchDesigner Modular MIDI-to-SOP System",
      description: "A comprehensive modular system for TouchDesigner that creates audio-reactive visuals with emergent geometry generation. Features a complete MIDI input handling system, persistent storage, parameter mapping, and SOP state management for live performance and generative art.",
      technologies: ["TouchDesigner 2023.12480+", "Python", "MIDI", "TDAbleton", "Ableton Live", "JSON", "Table DAT"],
      challenge: "Create a robust, modular system for live MIDI control of TouchDesigner SOPs with persistent state management, parameter mapping, and emergent behavior generation. The system must handle real-time MIDI input, maintain state across sessions, and provide intuitive UI controls for live performance.",
      solution: "Built a 9-module system with persistent storage, MIDI input normalization, parameter mapping editor, SOP state control, and integration scripts. Architecture includes: MIDI In DAT → midi_input_handler_DAT → midi_listener_DAT → parameter_mod_DAT → SOP pool. Features JSON-based configuration, backup systems, and comprehensive error handling.",
      keywords: ["touchdesigner", "midi", "python", "modular", "persistent storage", "parameter mapping", "sop control", "live performance", "generative art", "audio-reactive", "emergent behavior", "real-time", "json", "backup systems"],
      systemArchitecture: "9-module system: 1) MIDI Note Selector, 2) SOP Mapping Selector, 3) Parameter Mapping Editor, 4) SOP State Control UI, 5) Persistent Storage System, 6) System Overview Panel, 7) Integration Script, 8) MIDI Input Handler, 9) Preset Manager",
      dataFlow: "Raw MIDI → MIDI In DAT → midi_input_handler_DAT (normalization/filtering) → midi_listener_DAT → parameter_mod_DAT (mapping) → SOP pool (geometry generation)",
      storageSystem: "JSON-based configuration with backup system. Files: midi_note_mappings.json, sop_mappings.json, parameter_mappings.json, sop_states.dat, system_settings.json. Auto-save every 5 seconds with timestamped backups.",
      midiHandling: "Normalizes MIDI messages, filters by channel/type/velocity, routes by channel, handles CC-to-note translation, emergency throttling for MIDI storms, message buffering with pattern detection",
      parameterMapping: "Visual editor for MIDI/CC → SOP parameter control with min/max ranges, chaos variation, smoothing factors. Supports multiple mappings per note, validation, and real-time preview",
      sopStates: "Three states per SOP: ON (always visible + audio-reactive), OFF (MIDI-triggered only), MIDI-ONLY (no audio reactivity). Global controls for show all/hide all/reset all",
      currentState: "Foundation working with basic MIDI note → SOP mapping. System supports persistent storage, parameter mapping, and SOP state management. Ready for expansion to full 9-module system",
      nextSteps: "Implement remaining modules: System Overview Panel, Preset Manager, Testing & Validation Module. Add geometry pool with 20-30 diverse SOPs, random selection, cooldown systems, and pattern learning",
      developmentTimeline: "Phase 1 (Foundation): Storage, MIDI Handler, Integration - Complete. Phase 2 (Core Features): Note Selector, SOP Mapper, Parameter Editor, State Control - In Progress. Phase 3 (Monitoring): Overview Panel, Preset Manager - Planned",
      requirements: "TouchDesigner 2023.12480+, Python 3.x, MIDI controller or virtual MIDI routing, JSON file support, Table DAT operations",
      installation: "Deploy 9-module system in TouchDesigner project. Configure MIDI device, set up file paths (/project1/config/, /project1/sop_pool/, /project1/logs/), initialize integration script on project load"
    },
    {
      title: "Context-Aware RAG System with Dynamic Knowledge Management",
      description: "Architected context-aware RAG (Retrieval-Augmented Generation) system transforming static portfolios into intelligent, interactive knowledge platforms for multiple clients. Features dynamic REST API, multi-context architecture, and measurable engagement tracking.",
      technologies: ["TypeScript", "Next.js", "Groq (Llama 3.1 8B)", "RAG Architecture", "REST API Design", "Vercel", "Edge Functions"],
      challenge: "Transform static portfolios into intelligent, interactive knowledge platforms that can handle diverse visitor information needs across multiple portfolio sections while maintaining optimal performance and user experience.",
      solution: "Designed multi-context architecture with dynamic REST API enabling agile content management, deployed on Vercel with edge functions and incremental static regeneration. Implemented in-memory caching solution and scalable chat interface with expandable/popout modes.",
      keywords: ["rag", "ai", "knowledge management", "portfolio", "interactive", "context-aware", "dynamic api", "vercel", "edge functions", "chat interface"],
      businessImpact: "Reduced friction in technical communication through self-serve detailed project information, enabled iterative content strategy with quick project publishing, created measurable engagement opportunities through trackable AI interactions, demonstrated practical AI ROI through improved visitor experience",
      performanceMetrics: "Sub-second response times, reduced manual inquiry responses, improved visitor experience, trackable AI interactions"
    },
    {
      title: "E.ON Energy Trading Risk Modelling Platform",
      description: "Led cross-functional team of 15 developers and requirements analysis for enterprise risk modelling platform serving 120+ traders and risk managers across commodity markets. Transformed risk reporting from next-day to within-day delivery.",
      technologies: ["Value at Risk (VaR)", "Monte Carlo Simulation", "Black-Scholes Modelling", "Scenario Analysis", "Multi-environment configuration", "Risk management systems"],
      challenge: "Deliver enterprise-grade risk modelling platform for 120+ traders and risk managers across commodity markets, replacing 100+ business-critical spreadsheets with automated, auditable systems.",
      solution: "Led 15-developer team to build comprehensive risk platform with 25,000 Monte Carlo simulations, full model versioning, audit trails for compliance, and multi-environment deployment. Implemented automated workflows replacing manual spreadsheet processes.",
      keywords: ["risk management", "energy trading", "monte carlo", "var", "black-scholes", "team leadership", "enterprise systems", "commodity markets", "compliance", "audit trails"],
      businessImpact: "Transformed risk reporting from next-day to within-day delivery, decommissioned 100+ business-critical spreadsheets through automation, implemented full model versioning and audit trails for compliance, maximized cost efficiency through strategic technology reuse",
      teamLeadership: "Direct management of 15 developers, coordination with 120+ business users and senior stakeholders, managed development team delivery across multiple deployment environments"
    },
    {
      title: "Independent E-commerce Platform",
      description: "Established and managed independent e-commerce business, applying business analysis and technical project management expertise to transform legacy systems into modern online retail platform with 250,000 inventory items.",
      technologies: ["Magento", "PHP", "MySQL", "Apache", "Linux VM", "E-commerce platforms", "Inventory management", "Order processing"],
      challenge: "Replace all existing in-house systems (order, purchase order, and accounting modules) with modern e-commerce platform while maintaining business continuity and improving operational efficiency.",
      solution: "Delivered customized Magento implementation with bespoke database architecture, automated workflows, and modular design. Migrated 250,000 inventory items and consolidated legacy systems into unified platform.",
      keywords: ["e-commerce", "magento", "php", "mysql", "inventory management", "order processing", "legacy migration", "business analysis", "project management"],
      businessImpact: "Significantly increased revenue through 24/7 online stock accessibility, migrated 250,000 inventory items to bespoke database architecture, reduced operational costs through consolidation of legacy systems, improved order processing efficiency through automated workflows, considerable reduction in operational risk due to transparency of database design"
    }
  ],
  
  expertise: [
    {
      area: "Complex Adaptive Systems",
      description: "Expert in designing systems that exhibit emergent behavior, self-organization, and adaptation. Certified by Santa Fe Institute of Complex Science.",
      examples: ["Large-scale distributed systems", "Real-time monitoring", "Adaptive algorithms"],
      keywords: ["complex systems", "emergence", "adaptation", "self-organization", "santa fe institute"]
    },
    {
      area: "Antifragile System Design",
      description: "Specializes in building systems that improve and strengthen when exposed to stressors, volatility, and chaos - going beyond mere robustness.",
      examples: ["Fault-tolerant architectures", "Chaos engineering", "Resilient systems"],
      keywords: ["antifragile", "resilient", "robust", "fault-tolerant", "chaos engineering"]
    },
    {
      area: "Real-time Systems",
      description: "20+ years of experience designing and implementing large-scale real-time systems that process and respond to data instantly.",
      examples: ["Real-time monitoring dashboards", "Live data pipelines", "Event-driven architectures"],
      keywords: ["real-time", "live", "instant", "streaming", "monitoring", "dashboard"]
    },
    {
      area: "Process Automation",
      description: "Expert in automating company-wide processes to improve efficiency, reduce errors, and scale operations.",
      examples: ["Workflow automation", "CI/CD pipelines", "Integration systems"],
      keywords: ["automation", "workflow", "efficiency", "integration", "processes"]
    },
    {
      area: "TouchDesigner & Generative Art",
      description: "Specialized expertise in TouchDesigner for creating modular audio-reactive visual systems. Builds systems where simple interaction rules lead to complex emergent behaviors, with focus on MIDI integration, Python state management, and self-organizing visual systems.",
      examples: ["Emergent Geometry system", "MIDI-triggered visual systems", "Modular TouchDesigner architectures", "Audio-reactive installations", "Pattern learning systems"],
      keywords: ["touchdesigner", "generative art", "audio-reactive", "midi", "python", "modular", "emergent", "self-organizing", "pattern learning", "tdableton", "visual systems"]
    },
    {
      area: "Modular System Architecture",
      description: "Expert in designing and implementing modular, persistent systems with comprehensive state management, backup systems, and real-time data processing. Specializes in building robust systems that maintain state across sessions and handle complex data flows.",
      examples: ["9-module TouchDesigner system", "JSON-based configuration management", "MIDI input normalization and routing", "Parameter mapping with validation", "Persistent storage with backup systems"],
      keywords: ["modular architecture", "persistent storage", "state management", "backup systems", "data normalization", "parameter mapping", "real-time processing", "system integration", "error handling", "configuration management"]
    },
    {
      area: "Energy Trading & Risk Management",
      description: "20+ years of experience in energy trading systems, risk management platforms, and commodity derivatives. Expert in Value at Risk (VaR), Monte Carlo simulation, Black-Scholes modelling, and scenario analysis. Led enterprise-scale implementations serving 120+ traders and risk managers.",
      examples: ["E.ON Energy Trading risk platform", "OpenLink Endur implementation", "25,000 Monte Carlo simulations", "Weather derivatives and gas storage", "Structured commodity products", "Deal capture workflows"],
      keywords: ["energy trading", "risk management", "var", "monte carlo", "black-scholes", "commodity derivatives", "endur", "weather derivatives", "gas storage", "scenario analysis", "deal capture"]
    },
    {
      area: "Team Leadership & Project Management",
      description: "Proven track record leading cross-functional teams up to 15 developers, managing technical delivery across multiple environments, and coordinating with 120+ business users and senior stakeholders. Expert in requirements analysis, stakeholder management, and change management.",
      examples: ["Led 15-developer team at E.ON", "Coordinated 120+ business users", "Multi-environment delivery management", "Requirements analysis and stakeholder management", "Change management and process improvement"],
      keywords: ["team leadership", "project management", "requirements analysis", "stakeholder management", "change management", "cross-functional teams", "technical delivery", "multi-environment", "process improvement"]
    },
    {
      area: "Business Analysis & Systems Integration",
      description: "Expert in business analysis, requirements gathering, process modelling, and systems integration. Specializes in transforming legacy systems into modern platforms, managing complex stakeholder relationships, and delivering measurable business impact.",
      examples: ["Legacy system transformation", "Requirements catalogue management", "Process modelling and documentation", "Stakeholder coordination", "Business impact measurement", "Systems integration"],
      keywords: ["business analysis", "requirements gathering", "process modelling", "systems integration", "legacy transformation", "stakeholder management", "business impact", "documentation", "process improvement"]
    }
  ],
  
  philosophy: {
    approach: "Building systems that are robust (withstand stress), antifragile (improve under stress), and emergent (exhibit complex behaviors from simple rules).",
    principles: [
      "Embrace complexity rather than fighting it",
      "Design for emergence and adaptation",
      "Build systems that learn and improve",
      "Favor simplicity in components, complexity in interactions"
    ]
  },

  musicInspirations: [
    {
      name: "Brian Eno",
      description: "British musician, songwriter, record producer, visual artist, sound designer, and political activist. Pioneer of ambient music and generative music systems. Known for his work with Roxy Music and as a producer for U2, Talking Heads, and David Bowie.",
      genres: ["Ambient", "Electronic", "Minimalism", "Pop", "Rock"],
      instruments: ["Keyboards", "Synthesizers", "Vocals", "Bass", "Guitar"],
      keyWorks: ["Music for Airports", "Discreet Music", "Another Green World", "Before and After Science", "The Microsoft Sound"],
      influence: "Revolutionary approach to generative music and ambient soundscapes. Created systems that produce music through simple rules and processes, influencing the development of ambient music and generative art. His concept of 'music as environment' directly relates to complex systems thinking.",
      keywords: ["ambient music", "generative music", "electronic", "minimalism", "sound design", "producer", "roxy music", "music for airports", "discreet music", "microsoft sound", "systems thinking", "environmental music"],
      relevance: "Eno's generative music approach mirrors Miles's work in complex adaptive systems - creating emergent behaviors from simple rules. His ambient music philosophy of 'music as environment' aligns with Miles's expertise in designing systems that adapt and respond to their context."
    },
    {
      name: "Harold Budd",
      description: "American ambient/avant-garde composer and poet. Known for his minimalist piano works and collaborations with Brian Eno. His music emphasizes space, silence, and the beauty of simple harmonic progressions.",
      genres: ["Ambient", "Minimalism", "Contemporary Classical", "Avant-garde"],
      instruments: ["Piano", "Synthesizers", "Keyboards"],
      keyWorks: ["The Pavilion of Dreams", "The Pearl (with Eno)", "The Serpent (in Quicksilver)", "Lovely Thunder", "The White Arcades"],
      influence: "Master of space and silence in music. His approach to minimal piano works demonstrates how simple elements can create profound emotional experiences. Influenced the development of ambient music through his emphasis on texture, atmosphere, and subtle harmonic movement.",
      keywords: ["ambient", "minimalism", "piano", "silence", "space", "harmony", "texture", "atmosphere", "collaboration", "brian eno", "the pearl", "pavilion of dreams", "contemporary classical"],
      relevance: "Budd's mastery of space and silence in music reflects Miles's expertise in designing systems with elegant simplicity. His collaborative approach and emphasis on atmospheric elements connect to Miles's work in creating immersive, adaptive systems."
    },
    {
      name: "Richard Devine",
      description: "American electronic musician, sound designer, and software developer known for his experimental electronic music and sound design work. Pioneers the use of modular synthesizers and complex audio programming.",
      genres: ["Experimental Electronic", "IDM", "Glitch", "Ambient", "Industrial"],
      instruments: ["Modular Synthesizers", "Software", "Field Recordings", "Custom Audio Tools"],
      keyWorks: ["Lipswitch", "Aleamapper", "Risp", "Asect:Dsect", "Sort/Lapse"],
      influence: "Pioneer in experimental electronic music and modular synthesis. His work demonstrates how complex audio systems can be built from modular components, creating intricate soundscapes through systematic exploration of audio synthesis and processing.",
      keywords: ["experimental electronic", "modular synthesis", "sound design", "software development", "idm", "glitch", "ambient", "industrial", "audio programming", "complex systems", "synthesis"],
      relevance: "Devine's modular approach to electronic music directly parallels Miles's work with modular system architecture in TouchDesigner. His systematic exploration of audio synthesis and complex sound design relates to Miles's expertise in building complex systems from simple, modular components."
    },
    {
      name: "Nick McCabe",
      description: "English guitarist best known as the lead guitarist and co-founder of The Verve. Known for his innovative use of effects pedals, atmospheric guitar work, and ability to create vast sonic landscapes through layered guitar textures.",
      genres: ["Alternative Rock", "Shoegaze", "Psychedelic Rock", "Britpop"],
      instruments: ["Electric Guitar", "Effects Pedals", "Guitar Synthesizers"],
      keyWorks: ["The Verve - A Storm in Heaven", "The Verve - A Northern Soul", "The Verve - Urban Hymns", "The Verve - Forth"],
      influence: "Revolutionary guitarist who created immersive sonic landscapes through innovative use of effects and layered textures. His approach to guitar work demonstrates how multiple simple elements can combine to create complex, emotionally powerful music.",
      keywords: ["guitar", "effects pedals", "atmospheric", "texture", "layering", "the verve", "shoegaze", "alternative rock", "sonic landscapes", "innovation", "britpop"],
      relevance: "McCabe's innovative approach to creating complex sonic textures from simple guitar elements reflects Miles's expertise in emergent systems design. His mastery of layered, atmospheric sound creation connects to Miles's work in building systems that exhibit complex behaviors from simple interactions."
    }
  ]
}
