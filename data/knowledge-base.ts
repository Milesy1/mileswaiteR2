export const milesKnowledge = {
  bio: "Miles Waite is certified by the Santa Fe Institute of Complex Science, with expertise in complex, adaptive systems. He has 20+ years of experience designing, implementing, and testing large-scale real-time complex systems, and automating company-wide processes. His work focuses on building robust, antifragile, and emergent systems.",
  
  techStack: {
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js"],
    backend: ["Node.js", "API Development"],
    deployment: ["Vercel"],
    specialties: ["Real-time systems", "3D visualization", "Complex systems modeling"]
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
      title: "Emergent Geometry System (TouchDesigner)",
      description: "A modular TouchDesigner system for audio-reactive visuals with emergent geometry generation. Working foundation with one sphere responding to MIDI drum hits where each hit generates random geometry parameters - no two hits look the same.",
      technologies: ["TouchDesigner 2023.12480+", "Python", "MIDI", "TDAbleton", "Ableton Live"],
      challenge: "To create dynamic, non-repeating visual outputs directly influenced by live audio input, demonstrating emergent behavior from simple rules. Building toward a self-organizing visual system where 20-30 diverse geometries exist in a pool with random selection and cooldown systems.",
      solution: "Utilized TDAbleton for routing MIDI signals from Ableton Live into TouchDesigner. Implemented Python scripts for state management and dynamic parameter generation. Mapped specific MIDI notes (kick drum note 36 for sphere rows 2-20, snare note 37 for sphere cols 2-40) to control geometry parameters randomly within defined ranges. Architecture: TDAbleton → midi_ctrl → chopexec1 → midi_listener_DAT → parameter_mod_DAT → geometry.",
      keywords: ["touchdesigner", "audio-reactive", "visuals", "midi", "python", "emergent geometry", "generative art", "real-time", "live performance", "complex systems", "tdableton", "ableton live", "modular", "self-organizing", "pattern learning"],
      currentState: "Working foundation with one sphere responding to MIDI drum hits. Each hit generates random geometry parameters - no two hits look the same. Only triggers on note ON events (onOffToOn callback). Note OFF events are logged but don't trigger geometry changes. Velocity values are 0-1 (normalized by TDAbleton).",
      parameterMapping: "Defined in parameter_mod_DAT as dictionary: MIDI_TARGETS = {'note_36': {'geo': '/path/to/sop', 'param': 'rows', 'min': 2, 'max': 20}, 'note_37': {'geo': '/path/to/sop', 'param': 'cols', 'min': 2, 'max': 40}}",
      nextSteps: "Add more MIDI note mappings (38, 39, 40...), build geometry pool with diverse SOPs, implement random SOP selection, add cooldown tracking for recently-used geometries, develop pattern learning over time.",
      developmentTimeline: "Built in approximately one week. Foundation is working, most features still to come.",
      requirements: "TouchDesigner 2023.12480+, Ableton Live with TDAbleton plugin, MIDI controller or virtual MIDI routing",
      installation: "Clone repository, open TouchDesigner project file, configure TDAbleton MIDI output to point to /project1/midi_ctrl/select1, set chopexec1 CHOPs parameter to /project1/midi_ctrl/select1, trigger notes 36 and 37 in Ableton"
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
  }
}
