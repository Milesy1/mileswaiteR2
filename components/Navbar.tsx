import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">Miles Portfolio</Link>
        <div className="flex gap-6">
          <Link href="/projects" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Projects</Link>
          <Link href="/music" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Music</Link>
          <Link href="/code" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Code</Link>
          <Link href="/about" className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">About</Link>
        </div>
      </div>
    </nav>
  );
}
