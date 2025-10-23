export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;  // Used for project cards on homepage
  heroImage?: string;  // Optional: Used for project detail page hero (defaults to image if not provided)
  video?: string;
  gallery: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'Projects' | 'Music' | 'Code';
  problem?: string;
  solution?: string;
  challenges?: string[];
  results?: string[];
}

export const projectsData: Project[] = [
  {
    slug: 'emergent-geometry',
    title: 'Emergent Geometry',
    description: 'This comprehensive real-time visual system revolutionizes creative workflows through modular, reusable components orchestrated by an intelligent Python-based MIDI event dispatcher.',
    longDescription: 'Built with TouchDesigner\'s node-based architecture and event-driven control logic, it transforms MIDI controllers into expressive instruments for live visual performance, installations, and interactive experiences. The system enables rapid prototyping, expressive live performance control, and scalable complexity through component-based architecture with intelligent event-driven orchestration.',
    image: '/images/td.png',
    heroImage: '/images/emergent_geometry-hero.png',
    gallery: [
      '/images/td1.png',
      '/images/td2.png',
      '/images/td3.png',
      '/images/td4.png'
    ],
    techStack: ['TouchDesigner', 'Python', 'GLSL', 'MIDI Protocol', 'OSC'],
    liveUrl: 'https://youtu.be/wk0JtWD0Pbs',
    githubUrl: 'https://github.com/example/interactive-web-app',
    featured: true,
    category: 'Projects',
    problem: 'Creative technologists and performers needed a flexible, modular system for building complex real-time visuals without starting from scratch for each project. Some live MIDI implementations use fragile direct node connections, creating timing conflicts & unpredictable behaviour, that could potentially lead to catastrophic failures.',
    solution: 'Designed and built a modular TouchDesigner framework with three integrated layers: Modular Visual Components (reusable TOX containers), Python MIDI Event Brain (centralised event dispatcher), and Event-Driven Architecture (MIDI triggers orchestrate visual states through clean event handling patterns).',
    challenges: [
      'Real-time performance optimization across complex node networks',
      'Creating truly reusable modules with flexible I/O',
      'Maintaining 60fps with multiple high-resolution outputs',
      'Implementing robust event-based MIDI handling for performance reliability',
      'Mapping MIDI events to complex visual state transitions without conflicts',
      'Managing multiple MIDI controllers with conflict-free event routing',
      'Achieving <5ms latency from MIDI input to visual response',
      'Balancing modularity with processing efficiency',
      'Standardizing data flow between disparate components',
      'Preventing timing issues and race conditions in event handling'
    ],
    results: [
      '70% faster project setup time through reusable modules',
      '100% performance reliability - zero MIDI-related failures through event-based control',
      '<5ms latency from MIDI input to visual response',
      'Consistent 60fps performance with complex multi-output visual chains',
      'Support for 4+ simultaneous MIDI controllers with conflict-free routing',
      'Play visuals like an instrument - immediate, expressive, predictable control',
      'Python brain enables sophisticated MIDI mapping and macro programming',
      'Event-driven architecture eliminates timing issues and race conditions'
    ]
  },
  {
    slug: 'string-field-theories',
    title: 'String Field Theories',
    description: 'A comprehensive independent record label and artist collective designed to champion experimental musicians pushing the boundaries of electronic music production.',
    longDescription: 'Built as a sustainable ecosystem that celebrates creative risk-taking, technical innovation, and unconventional approaches to sound design. Functions as both a distribution platform and creative community for artists who treat music production as a form of technological research.',
    image: '/images/string_field_theory2.png',
    heroImage: '/images/string_field_theory-hero.png',
    gallery: [
      '/images/sft1.png',
      '/images/sft2.png',
      '/images/sft3.png'
    ],
    techStack: ['Music Production', 'Modular Synthesis', 'Algorithmic Composition', 'Live Coding', 'AI-Assisted Composition', 'Experimental Sound Design'],
    liveUrl: 'https://www.youtube.com/watch?v=frX36FzDP_s',
    githubUrl: 'https://github.com/example/mobile-dashboard',
    featured: true,
    category: 'Projects',
    problem: 'Cutting-edge electronic music producers creating truly experimental work faced a hostile landscape: mainstream labels demanded commercial viability, traditional distribution favored safe, formulaic sounds, and artists working at the intersection of technology and music had no dedicated platform.',
    solution: 'Founded String Field Theories as an artist-first collective specifically for musicians operating at the bleeding edge of electronic music production. Created a sustainable ecosystem that celebrates technical experimentation, algorithmic composition, unconventional sound design, and genre-defying work.',
    challenges: [
      'Building sustainable economics around non-commercial, experimental music',
      'Curating a coherent identity while celebrating diverse sonic approaches',
      'Creating distribution channels for music that defies traditional categorization',
      'Supporting artists who prioritize innovation over commercial appeal',
      'Balancing artistic freedom with practical sustainability',
      'Establishing credibility in an oversaturated independent music landscape',
      'Fostering genuine artistic community rather than transactional relationships'
    ],
    results: [
      '20+ releases showcasing diverse experimental approaches',
      'Artists have complete creative freedom - zero commercial compromise',
      '5 artists have evolved their sound significantly through label support',
      'Established reputation as home for uncompromising sonic experimentation',
      'Created sustainable model proving experimental music can be economically viable',
      'Active artist collective with regular knowledge exchange',
      'Featured on experimental music platforms and blogs (Resident Advisor, XLR8R, Boomkat)'
    ]
  },
  {
    slug: 'ableton-live',
    title: 'Ableton Live',
    description: 'My production workflow is built around Ableton Live as a creative and technical hub.',
    longDescription: 'I combine live recordings, Max/MSP devices, and custom signal routing to shape unique, evolving soundscapes. Every session blends structured composition with real-time experimentation—using Max for Live patches to manipulate audio dynamically and automate complex effects chains. Mixing and mastering are handled in-house, focusing on clarity, depth, and cohesion across a range of genres, from ambient and experimental textures to beat-driven electronic work. The result is a balance of precision and spontaneity—music that feels alive in both tone and process.',
    image: '/images/ableton1.png',
    heroImage: '/images/live-hero.png',
    gallery: [
      '/images/ableton1.png',
      '/images/ableton2.png',
      '/images/ableton3.png',
      '/images/ableton4.png'
    ],
    techStack: ['Ableton Live', 'Max/MSP', 'Max for Live', 'Audio Processing', 'Signal Routing', 'Live Recording'],
    liveUrl: 'https://shop.example.com',
    githubUrl: 'https://github.com/example/ecommerce-platform',
    featured: true,
    category: 'Projects'
  },
  {
    slug: 'complex-systems',
    title: 'Complex Systems',
    description: 'My work in complex systems focuses on understanding how order, intelligence, and adaptability arise from seemingly chaotic interactions.',
    longDescription: 'I earned a Certificate in Complex Systems from the Santa Fe Institute, where I studied the foundations of emergent behavior, nonlinear dynamics, and network theory—learning how simple local rules can generate global patterns. This academic work is paired with hands-on application. At E.ON, I helped design antifragile systems within risk management—frameworks that respond to volatility by adapting and strengthening over time. That experience shaped my ongoing interest in how complex systems can be modeled, simulated, and optimized in real-world contexts. I\'m currently developing deeper technical and mathematical skills to expand this work, exploring tools from computational modeling, agent-based simulation, and statistical mechanics to data visualization and algorithmic design. My goal is to bridge theory and practice—building systems that don\'t just resist disruption but evolve through it.',
    image: '/images/lorenz6.png',
    heroImage: '/images/network.png',
    gallery: [
      '/images/complexsystems2.png',
      '/images/complexsystems4.png',
      '/images/complexsystems1.png'
    ],
    techStack: ['Complex Systems Theory', 'Emergent Behaviour', 'Nonlinear Dynamics', 'Network Theory', 'Agent-Based Simulation', 'Statistical Mechanics', 'Computational Modeling'],
    liveUrl: 'https://viz.example.com',
    githubUrl: 'https://github.com/example/data-viz-tool',
    featured: false,
    category: 'Projects'
  },
  {
    slug: 'modular',
    title: 'Modular',
    description: 'Experimental ambient composition blending electronic textures with organic instrumentation.',
    longDescription: 'An immersive ambient soundscape that explores the intersection of digital and organic sounds. This composition features layered synthesizers, field recordings, and live instrumentation to create a meditative listening experience.',
    image: '/images/modular.png',
    gallery: [
      '/images/modular1.png',
      '/images/modular2.png'
    ],
    techStack: ['Ableton Live', 'Max MSP', 'Field Recording', 'Synthesizers'],
    liveUrl: 'https://soundcloud.com/example/ambient-soundscape',
    featured: true,
    category: 'Music',
    problem: 'Creating a cohesive ambient piece that balances electronic and organic elements.',
    solution: 'Layered field recordings with synthesized textures and live instrumentation for depth and authenticity.',
    challenges: ['Sound design complexity', 'Mixing ambient textures', 'Creating emotional depth'],
    results: ['10,000+ plays on SoundCloud', 'Featured in ambient playlist', 'Used in meditation apps']
  },
  {
    slug: 'against-the-day',
    title: 'Against The Day',
    description: 'Modern jazz fusion piece featuring complex rhythms and harmonic progressions.',
    longDescription: 'A contemporary jazz fusion composition that blends traditional jazz harmony with modern production techniques. Features complex time signatures, extended chord progressions, and improvisational sections.',
    image: '/images/atd.png',
    gallery: [
      '/images/atd2.png',
      '/images/atd4.png',
      '/images/atd3.png'
    ],
    techStack: ['Logic Pro', 'Jazz Theory', 'Live Recording', 'MIDI'],
    liveUrl: 'https://spotify.com/example/jazz-fusion',
    featured: true,
    category: 'Music',
    problem: 'Creating a jazz fusion piece that appeals to both traditional and modern audiences.',
    solution: 'Balanced complex harmony with accessible melodies and modern production values.',
    challenges: ['Complex rhythm coordination', 'Harmonic sophistication', 'Production clarity'],
    results: ['Featured on jazz radio', '5,000+ streams', 'Positive critical reception']
  },
  {
    slug: 'new-city-dream',
    title: 'New City Dream',
    description: 'Up-tempo electronic track with layered synthesizers and dynamic percussion elements.',
    longDescription: 'An energetic electronic dance track designed for clubs and festivals. Features driving basslines, evolving synth pads, and crisp percussion. The arrangement builds tension and releases with powerful drops, creating an engaging sonic journey.',
    image: '/images/ncd1.png',
    gallery: [
      '/images/ncd6.png',
      '/images/new-city-dream.png',
      '/images/ncd2.png'
    ],
    techStack: ['Serum', 'Kontakt', 'Drum Programming'],
    liveUrl: 'https://www.youtube.com/watch?v=1e0LL0alEIo',
    featured: true,
    category: 'Music',
    problem: 'Creating an electronic track that works both in clubs and for casual listening.',
    solution: 'Balanced high-energy drops with melodic breakdowns and professional mixing.',
    challenges: ['Sound design variety', 'Arrangement flow', 'Mixing clarity'],
    results: ['15,000+ plays', 'Used in DJ sets', 'Featured in electronic playlists']
  },
  {
    slug: 'we-are-are-we',
    title: 'We Are Are We',
    description: 'Intimate acoustic composition with fingerpicked guitar and heartfelt vocal melodies.',
    longDescription: 'A tender acoustic ballad featuring intricate fingerpicked guitar arrangements and soulful vocal melodies. The song tells a story of reflection and hope, with a minimalist production style that highlights the raw emotion of the performance.',
    image: '/images/waw2.png',
    heroImage: '/images/waw5.png',
    gallery: [
      '/images/wt2.png',
      '/images/waw.png',
      '/images/waw1.png'
    ],
    techStack: ['Guitar', 'Vocals', 'Microphone Techniques', 'Audio Engineering'],
    liveUrl: 'https://youtube.com/example/acoustic-ballad',
    featured: true,
    category: 'Music',
    problem: 'Creating an intimate acoustic piece that connects emotionally with listeners.',
    solution: 'Focused on authentic performance and minimal production to highlight the song\'s emotional core.',
    challenges: ['Vocal performance', 'Guitar arrangement', 'Recording intimacy'],
    results: ['25,000+ views', 'Covered by other artists', 'Used in indie films']
  },
  {
    slug: 'td-python',
    title: 'TD Python',
    description: 'Reusable React components with TypeScript, Storybook documentation, and comprehensive testing.',
    longDescription: 'A comprehensive React component library designed for modern web applications. Features TypeScript support, Storybook documentation, comprehensive testing suite, and accessibility compliance.',
    image: '/images/python.png',
    heroImage: '/images/rag5.png',
    gallery: [
      '/images/python2.jpg',
      '/images/python3.png',
      '/images/python1.png'
    ],
    techStack: ['React', 'TypeScript', 'Storybook', 'Jest', 'Styled Components'],
    liveUrl: 'https://components.example.com',
    githubUrl: 'https://github.com/example/react-components',
    featured: true,
    category: 'Code',
    problem: 'Development teams needed consistent, reusable UI components with proper documentation.',
    solution: 'Created a comprehensive component library with TypeScript, testing, and documentation.',
    challenges: ['Component API design', 'Accessibility compliance', 'Documentation maintenance'],
    results: ['50+ reusable components', '95% test coverage', 'Used by 10+ teams']
  },
  {
    slug: 'julia-1-11-6',
    title: 'Julia 1.11.6',
    description: 'Scalable microservice architecture with authentication, rate limiting, and comprehensive logging.',
    longDescription: 'A production-ready microservice built with modern architecture patterns. Features include JWT authentication, rate limiting, comprehensive logging, health checks, and horizontal scaling capabilities.',
    image: '/images/julia1.png',
    heroImage: '/images/julia2.png',
    gallery: [
      '/images/rag3.png',
      '/images/rag8.png',
      '/images/rag9.png'
    ],
    techStack: ['Power Laws', 'SOC'],
    liveUrl: 'https://api.example.com/docs',
    githubUrl: 'https://github.com/example/api-microservice',
    featured: true,
    category: 'Code',
    problem: 'Need for a scalable, secure API service with proper authentication and monitoring.',
    solution: 'Built a microservice with modern security practices, monitoring, and scalability features.',
    challenges: ['Security implementation', 'Performance optimization', 'Monitoring setup'],
    results: ['99.9% uptime', 'Sub-100ms response times', 'Handles 10,000+ requests/minute']
  },
  {
    slug: 'retrieval-augmented-generation',
    title: 'Retrieval-Augmented Generation',
    description: 'End-to-end ML pipeline for data preprocessing, model training, and deployment automation.',
    longDescription: 'A comprehensive machine learning pipeline that automates the entire ML workflow from data ingestion to model deployment. Features include automated feature engineering, model selection, hyperparameter tuning, and A/B testing capabilities.',
    image: '/images/rag1.png',
    gallery: [
      '/images/rag4.png',
      '/images/rag2.png',
      '/images/rag6.png'
    ],
    techStack: ['Next.js', 'TypeScript', 'Groq', 'Axiom', 'PostHog', 'Vercel'],
    liveUrl: 'https://ml.example.com',
    githubUrl: 'https://github.com/example/ml-pipeline',
    featured: true,
    category: 'Code',
    problem: 'Data science teams needed an automated pipeline for consistent model development and deployment.',
    solution: 'Created an end-to-end ML pipeline with automated workflows and monitoring.',
    challenges: ['Model versioning', 'Data pipeline reliability', 'Deployment automation'],
    results: ['50% faster model development', '99% pipeline reliability', 'Automated A/B testing']
  },
  {
    slug: 'emergence',
    title: 'Emergence',
    description: 'CI/CD pipeline with Docker containerization, automated testing, and cloud deployment.',
    longDescription: 'A comprehensive DevOps automation solution that streamlines the entire software delivery process. Features include automated CI/CD pipelines, infrastructure as code, monitoring, and security scanning.',
    image: '/images/emergence3.png',
    heroImage: '/images/murmuration.png',
    gallery: [
      '/images/emergence1.png',
      '/images/emergence2.png',
      '/images/emergence3.png'
    ],
    techStack: ['Emergent', 'Murmuration'],
    liveUrl: 'https://devops.example.com',
    githubUrl: 'https://github.com/example/devops-automation',
    featured: true,
    category: 'Code',
    problem: 'Development teams needed automated deployment and infrastructure management.',
    solution: 'Implemented comprehensive DevOps automation with CI/CD, IaC, and monitoring.',
    challenges: ['Pipeline complexity', 'Infrastructure management', 'Security integration'],
    results: ['90% reduction in deployment time', 'Zero-downtime deployments', 'Automated rollbacks']
  }
];

// Helper function to get projects by category
export function getProjectsByCategory(category: 'Projects' | 'Music' | 'Code'): Project[] {
  return projectsData.filter(project => project.category === category);
}

// Helper function to get featured projects
export function getFeaturedProjects(): Project[] {
  return projectsData.filter(project => project.featured);
}

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find(project => project.slug === slug);
}

// Helper function to get all project slugs for static generation
export function getAllProjectSlugs(): string[] {
  return projectsData.map(project => project.slug);
}
