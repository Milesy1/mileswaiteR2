import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="font-semibold text-lg">Miles Portfolio</Link>
        <div className="flex gap-6">
          <Link href="/projects">Projects</Link>
          <Link href="/music">Music</Link>
          <Link href="/code">Code</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}
