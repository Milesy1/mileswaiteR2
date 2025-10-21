import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="w-full px-[10%] sm:px-[8%] lg:px-[5%] py-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Left Section - Brand */}
          <div className="space-y-4">
            <h3 className="text-sm lg:text-base font-medium text-neutral-600 dark:text-neutral-300">mileswaite.net</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              Robust. Antifragile. Emergent.
            </p>
          </div>

          {/* Middle Section - Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm lg:text-base font-medium text-neutral-600 dark:text-neutral-300 text-center">social</h4>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://vercel.com/miles-projects-a6445319/milesy1-github-io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-600 dark:text-neutral-300 hover:border-primary-200 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7l-10-5z"/>
                </svg>
                Vercel
              </Link>
              
              <Link
                href="https://github.com/Milesy1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-600 dark:text-neutral-300 hover:border-primary-200 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Link>
              
              <Link
                href="https://www.patreon.com/c/u39389547"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-600 dark:text-neutral-300 hover:border-primary-200 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0 0 5.373 0 12zm7.58 0c0-2.485 2.014-4.5 4.5-4.5s4.5 2.015 4.5 4.5-2.014 4.5-4.5 4.5-4.5-2.015-4.5-4.5z"/>
                </svg>
                Patreon
              </Link>
              
              <Link
                href="mailto:lorenzsys@protonmail.com"
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-600 dark:text-neutral-300 hover:border-primary-200 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email
              </Link>
              
              <Link
                href="https://miles11.bandcamp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-600 dark:text-neutral-300 hover:border-primary-200 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Bandcamp
              </Link>
            </div>
          </div>

          {/* Right Section - Tech Stack */}
          <div className="space-y-4">
            <h4 className="text-sm lg:text-base font-medium text-neutral-600 dark:text-neutral-300 text-center">stack</h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js 14+', 'Tailwind CSS', 'Framer Motion', 'Three.js'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-xs text-neutral-600 dark:text-neutral-300 hover:border-primary-200 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            © {currentYear} Miles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

