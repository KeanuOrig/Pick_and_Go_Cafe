import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-800 p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Pick & Go Cafe
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-200 transition">Home</Link>
          <Link href="/menu" className="text-white hover:text-gray-200 transition">Menu</Link>
          <Link href="/about" className="text-white hover:text-gray-200 transition">About</Link>
          <Link href="/contact" className="text-white hover:text-gray-200 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}