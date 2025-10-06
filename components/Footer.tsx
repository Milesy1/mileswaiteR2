import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="w-full px-[10%] sm:px-[8%] lg:px-[5%] py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Section - Brand */}
          <div className="space-y-4">
            <h3 className="text-sm lg:text-base font-medium text-neutral-600">mileswaite.net</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Robust. Antifragile. Emergent.
            </p>
          </div>

          {/* Right Section - Tech Stack */}
          <div className="space-y-4">
            <h4 className="text-sm lg:text-base font-medium text-neutral-600">stack</h4>
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
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-neutral-500 text-sm">
            © {currentYear} Miles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
