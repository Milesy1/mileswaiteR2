export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
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
    slug: 'interactive-web-app',
    title: 'Interactive Web App',
    description: 'A modern web application built with React and Node.js, featuring real-time data visualization and user authentication.',
    longDescription: 'This comprehensive web application revolutionizes how users interact with complex datasets. Built with cutting-edge technologies, it provides an intuitive interface for data analysis, real-time collaboration, and seamless user experience across all devices.',
    image: 'https://picsum.photos/800/600?random=1',
    gallery: [
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12',
      'https://picsum.photos/800/600?random=13',
      'https://picsum.photos/800/600?random=14'
    ],
    techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/interactive-web-app',
    featured: true,
    category: 'Projects',
    problem: 'Users needed a way to visualize and analyze complex datasets in real-time without technical expertise.',
    solution: 'Created an intuitive web application with drag-and-drop functionality, real-time collaboration, and automated insights generation.',
    challenges: ['Real-time data synchronization', 'Cross-browser compatibility', 'Performance optimization'],
    results: ['40% increase in user engagement', '60% reduction in data analysis time', '95% user satisfaction rate']
  },
  {
    slug: 'mobile-dashboard',
    title: 'Mobile Dashboard',
    description: 'Cross-platform mobile dashboard with intuitive UI design and seamless data synchronization across devices.',
    longDescription: 'A comprehensive mobile dashboard solution that provides users with instant access to critical business metrics, customizable widgets, and offline functionality. Designed with a mobile-first approach for optimal performance on all devices.',
    image: 'https://picsum.photos/800/600?random=2',
    gallery: [
      'https://picsum.photos/800/600?random=21',
      'https://picsum.photos/800/600?random=22',
      'https://picsum.photos/800/600?random=23'
    ],
    techStack: ['React Native', 'Expo', 'Firebase', 'Redux', 'TypeScript'],
    liveUrl: 'https://apps.apple.com/example',
    githubUrl: 'https://github.com/example/mobile-dashboard',
    featured: true,
    category: 'Projects',
    problem: 'Business users needed instant access to key metrics while on the go, with offline capabilities.',
    solution: 'Developed a cross-platform mobile app with real-time sync, offline mode, and customizable dashboard widgets.',
    challenges: ['Offline data synchronization', 'Cross-platform consistency', 'Performance on older devices'],
    results: ['50% increase in mobile engagement', '80% of users utilize offline features', '4.8/5 app store rating']
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and customer analytics.',
    longDescription: 'A complete e-commerce platform designed for scalability and performance. Features include advanced inventory management, multi-payment gateway integration, customer analytics, and a comprehensive admin dashboard.',
    image: 'https://picsum.photos/800/600?random=3',
    gallery: [
      'https://picsum.photos/800/600?random=31',
      'https://picsum.photos/800/600?random=32',
      'https://picsum.photos/800/600?random=33',
      'https://picsum.photos/800/600?random=34',
      'https://picsum.photos/800/600?random=35'
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
    slug: 'data-visualization-tool',
    title: 'Data Visualization Tool',
    description: 'Interactive data visualization platform with custom charts, filters, and export capabilities.',
    longDescription: 'An advanced data visualization platform that transforms complex datasets into interactive, beautiful charts and graphs. Features include real-time updates, custom chart types, collaborative filtering, and multiple export formats.',
    image: 'https://picsum.photos/800/600?random=4',
    gallery: [
      'https://picsum.photos/800/600?random=41',
      'https://picsum.photos/800/600?random=42',
      'https://picsum.photos/800/600?random=43'
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
    slug: 'ambient-soundscape',
    title: 'Ambient Soundscape',
    description: 'Experimental ambient composition blending electronic textures with organic instrumentation.',
    longDescription: 'An immersive ambient soundscape that explores the intersection of digital and organic sounds. This composition features layered synthesizers, field recordings, and live instrumentation to create a meditative listening experience.',
    image: 'https://picsum.photos/800/600?random=5',
    gallery: [
      'https://picsum.photos/800/600?random=51',
      'https://picsum.photos/800/600?random=52'
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
    slug: 'jazz-fusion-track',
    title: 'Jazz Fusion Track',
    description: 'Modern jazz fusion piece featuring complex rhythms and harmonic progressions.',
    longDescription: 'A contemporary jazz fusion composition that blends traditional jazz harmony with modern production techniques. Features complex time signatures, extended chord progressions, and improvisational sections.',
    image: 'https://picsum.photos/800/600?random=6',
    gallery: [
      'https://picsum.photos/800/600?random=61',
      'https://picsum.photos/800/600?random=62',
      'https://picsum.photos/800/600?random=63'
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
    slug: 'electronic-beat',
    title: 'Electronic Beat',
    description: 'Up-tempo electronic track with layered synthesizers and dynamic percussion elements.',
    longDescription: 'An energetic electronic dance track designed for clubs and festivals. Features driving basslines, evolving synth pads, and crisp percussion. The arrangement builds tension and releases with powerful drops, creating an engaging sonic journey.',
    image: 'https://picsum.photos/800/600?random=7',
    gallery: [
      'https://picsum.photos/800/600?random=71',
      'https://picsum.photos/800/600?random=72',
      'https://picsum.photos/800/600?random=73'
    ],
    techStack: ['FL Studio', 'Serum', 'Kontakt', 'Drum Programming'],
    liveUrl: 'https://soundcloud.com/example/electronic-beat',
    featured: true,
    category: 'Music',
    problem: 'Creating an electronic track that works both in clubs and for casual listening.',
    solution: 'Balanced high-energy drops with melodic breakdowns and professional mixing.',
    challenges: ['Sound design variety', 'Arrangement flow', 'Mixing clarity'],
    results: ['15,000+ plays', 'Used in DJ sets', 'Featured in electronic playlists']
  },
  {
    slug: 'acoustic-ballad',
    title: 'Acoustic Ballad',
    description: 'Intimate acoustic composition with fingerpicked guitar and heartfelt vocal melodies.',
    longDescription: 'A tender acoustic ballad featuring intricate fingerpicked guitar arrangements and soulful vocal melodies. The song tells a story of reflection and hope, with a minimalist production style that highlights the raw emotion of the performance.',
    image: 'https://picsum.photos/800/600?random=8',
    gallery: [
      'https://picsum.photos/800/600?random=81',
      'https://picsum.photos/800/600?random=82',
      'https://picsum.photos/800/600?random=83'
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
    slug: 'react-component-library',
    title: 'React Component Library',
    description: 'Reusable React components with TypeScript, Storybook documentation, and comprehensive testing.',
    longDescription: 'A comprehensive React component library designed for modern web applications. Features TypeScript support, Storybook documentation, comprehensive testing suite, and accessibility compliance.',
    image: 'https://picsum.photos/800/600?random=9',
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
    slug: 'api-microservice',
    title: 'API Microservice',
    description: 'Scalable microservice architecture with authentication, rate limiting, and comprehensive logging.',
    longDescription: 'A production-ready microservice built with modern architecture patterns. Features include JWT authentication, rate limiting, comprehensive logging, health checks, and horizontal scaling capabilities.',
    image: 'https://picsum.photos/800/600?random=10',
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
    slug: 'machine-learning-pipeline',
    title: 'Machine Learning Pipeline',
    description: 'End-to-end ML pipeline for data preprocessing, model training, and deployment automation.',
    longDescription: 'A comprehensive machine learning pipeline that automates the entire ML workflow from data ingestion to model deployment. Features include automated feature engineering, model selection, hyperparameter tuning, and A/B testing capabilities.',
    image: 'https://picsum.photos/800/600?random=11',
    gallery: [
      'https://picsum.photos/800/600?random=111',
      'https://picsum.photos/800/600?random=112',
      'https://picsum.photos/800/600?random=113'
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
    slug: 'devops-automation',
    title: 'DevOps Automation',
    description: 'CI/CD pipeline with Docker containerization, automated testing, and cloud deployment.',
    longDescription: 'A comprehensive DevOps automation solution that streamlines the entire software delivery process. Features include automated CI/CD pipelines, infrastructure as code, monitoring, and security scanning.',
    image: 'https://picsum.photos/800/600?random=12',
    gallery: [
      'https://picsum.photos/800/600?random=121',
      'https://picsum.photos/800/600?random=122',
      'https://picsum.photos/800/600?random=123'
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
