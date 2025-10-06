import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">Miles</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Modern portfolio showcasing music, code, and creative projects. 
              Built with cutting-edge web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/projects" 
                  className="text-neutral-600 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/music" 
                  className="text-neutral-600 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Music
                </Link>
              </li>
              <li>
                <Link 
                  href="/code" 
                  className="text-neutral-600 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  Code
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-neutral-600 hover:text-primary-600 transition-colors duration-200 text-sm"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900">Built With</h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js 14+', 'Tailwind CSS', 'Framer Motion', 'Three.js'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs text-neutral-600 hover:border-primary-200 hover:text-primary-600 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {currentYear} Miles. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span>Built with ❤️ using modern web technologies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
