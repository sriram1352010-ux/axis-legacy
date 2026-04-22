"use client";
import Link from 'next/link';
import { Shield } from 'lucide-react'; 

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Axis Empire Signature */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Shield className="w-5 h-5 text-white fill-white/10" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-white">AXIS</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-blue-500">EMPIRE</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/colorize" className="hover:text-white transition-colors">Tools</Link>
          <button className="px-4 py-1.5 bg-white text-black text-xs font-bold rounded-full hover:bg-zinc-200 transition-all">
            DASHBOARD
          </button>
        </nav>
      </div>
    </header>
  );
}