export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
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
    title: 'Modular TouchDesigner System with Event-Based MIDI Brain',
    description: 'This comprehensive real-time visual system revolutionizes creative workflows through modular, reusable components orchestrated by an intelligent Python-based MIDI event dispatcher.',
    longDescription: 'Built with TouchDesigner\'s node-based architecture and event-driven control logic, it transforms MIDI controllers into expressive instruments for live visual performance, installations, and interactive experiences. The system enables rapid prototyping, expressive live performance control, and scalable complexity through component-based architecture with intelligent event-driven orchestration.',
    image: '/images/td.png',
    gallery: [
      '/images/td1.png',
      '/images/td2.png',
      '/images/td3.png',
      '/images/td4.png'
    ],
    techStack: ['TouchDesigner', 'Python', 'GLSL', 'MIDI Protocol', 'OSC', 'DMX', 'WebSocket'],
    liveUrl: 'https://youtu.be/wk0JtWD0Pbs',
    githubUrl: 'https://github.com/example/interactive-web-app',
    featured: true,
    category: 'Projects',
    problem: 'Creative technologists and performers needed a flexible, modular system for building complex real-time visuals without starting from scratch for each project. Traditional TouchDesigner MIDI implementations used fragile direct node connections, creating timing conflicts, unpredictable behavior, and catastrophic failures during live performances.',
    solution: 'Designed and built a modular TouchDesigner framework with three integrated layers: Modular Visual Components (reusable TOX containers), Python MIDI Event Brain (centralized event dispatcher), and Event-Driven Architecture (MIDI triggers orchestrate visual states through clean event handling patterns).',
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
    description: 'Cross-platform mobile dashboard with intuitive UI design and seamless data synchronization across devices.',
    longDescription: 'A comprehensive mobile dashboard solution that provides users with instant access to critical business metrics, customizable widgets, and offline functionality. Designed with a mobile-first approach for optimal performance on all devices.',
    image: '/images/string-field-theories.png',
    gallery: [
      '/images/sft1.png',
      '/images/sft2.png',
      '/images/sft3.png'
    ],
    techStack: ['React Native', 'Expo', 'Firebase', 'Redux', 'TypeScript'],
    liveUrl: 'https://www.youtube.com/watch?v=frX36FzDP_s',
    githubUrl: 'https://github.com/example/mobile-dashboard',
    featured: true,
    category: 'Projects',
    problem: 'Business users needed instant access to key metrics while on the go, with offline capabilities.',
    solution: 'Developed a cross-platform mobile app with real-time sync, offline mode, and customizable dashboard widgets.',
    challenges: ['Offline data synchronization', 'Cross-platform consistency', 'Performance on older devices'],
    results: ['50% increase in mobile engagement', '80% of users utilize offline features', '4.8/5 app store rating']
  },
  {
    slug: 'ableton-live',
    title: 'Ableton Live',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and customer analytics.',
    longDescription: 'A complete e-commerce platform designed for scalability and performance. Features include advanced inventory management, multi-payment gateway integration, customer analytics, and a comprehensive admin dashboard.',
    image: '/images/ableton1.png',
    gallery: [
      '/images/ableton1.png',
      '/images/ableton2.png',
      '/images/ableton3.png',
      '/images/ableton4.png'
    ],
    techStack: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://shop.example.com',
    githubUrl: 'https://github.com/example/ecommerce-platform',
    featured: true,
    category: 'Projects',
    problem: 'Small businesses needed an affordable, scalable e-commerce solution with advanced features.',
    solution: 'Built a comprehensive platform with modern tech stack, payment processing, and analytics dashboard.',
    challenges: ['Payment security', 'Inventory synchronization', 'SEO optimization'],
    results: ['300% increase in online sales', '99.9% uptime', '50% reduction in cart abandonment']
  },
  {
    slug: 'complex-systems',
    title: 'Complex Systems',
    description: 'Interactive data visualization platform with custom charts, filters, and export capabilities.',
    longDescription: 'An advanced data visualization platform that transforms complex datasets into interactive, beautiful charts and graphs. Features include real-time updates, custom chart types, collaborative filtering, and multiple export formats.',
    image: '/images/lorenz6.png',
    gallery: [
      '/images/complexsystems2.png',
      '/images/complexsystems1.png',
      '/images/complexsystems3.png'
    ],
    techStack: ['D3.js', 'React', 'Python', 'FastAPI', 'PostgreSQL'],
    liveUrl: 'https://viz.example.com',
    githubUrl: 'https://github.com/example/data-viz-tool',
    featured: false,
    category: 'Projects',
    problem: 'Data analysts needed a tool to create interactive visualizations without coding expertise.',
    solution: 'Developed a drag-and-drop interface with pre-built chart templates and real-time collaboration.',
    challenges: ['Large dataset performance', 'Custom chart flexibility', 'Export functionality'],
    results: ['70% faster visualization creation', '90% user adoption rate', 'Support for 10+ chart types']
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
    image: '/images/ncd.png',
    gallery: [
      '/images/ncd6.png',
      '/images/new-city-dream.png',
      '/images/ncd2.png'
    ],
    techStack: ['FL Studio', 'Serum', 'Kontakt', 'Drum Programming'],
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
    gallery: [
      'https://picsum.photos/800/600?random=91',
      'https://picsum.photos/800/600?random=92',
      'https://picsum.photos/800/600?random=93'
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
    image: '/images/julia.png',
    gallery: [
      'https://picsum.photos/800/600?random=101',
      'https://picsum.photos/800/600?random=102'
    ],
    techStack: ['Node.js', 'Express', 'JWT', 'Redis', 'Docker', 'Kubernetes'],
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
    techStack: ['Python', 'TensorFlow', 'scikit-learn', 'Pandas', 'Docker', 'Kubernetes'],
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
    image: '/images/emergence.png',
    gallery: [
      '/images/emergence1.png',
      '/images/emergence2.png',
      '/images/emergence3.png'
    ],
    techStack: ['Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitLab CI'],
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
