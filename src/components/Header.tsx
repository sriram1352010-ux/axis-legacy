"use client";

import Link from 'next/link';
import { Shield, LayoutGrid, Zap } from 'lucide-react'; 

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Axis Empire Signature */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 rounded-xl shadow-[0_8px_20px_rgba(37,99,235,0.2)] group-hover:scale-105 transition-transform duration-300">
            <Shield className="w-5 h-5 text-white fill-white/10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white italic leading-none">AXIS</span>
            <span className="text-[9px] font-black tracking-[0.4em] text-blue-500 uppercase leading-none mt-1">LEGACY</span>
          </div>
        </Link>

        {/* Desktop Navigation & System Pulse */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            <Link href="/" className="hover:text-blue-400 transition-colors">Archive</Link>
            <Link href="/colorize" className="hover:text-blue-400 transition-colors">Neural Tools</Link>
            <Link href="/pricing" className="hover:text-amber-500 transition-colors flex items-center gap-1">
              <Zap size={12} className="fill-current" /> Upgrade
            </Link>
          </div>

          <div className="h-6 w-[1px] bg-white/5 mx-2" />

          <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[11px] font-black uppercase tracking-tighter rounded-xl hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5">
            <LayoutGrid size={14} />
            DASHBOARD
          </button>
        </nav>

        {/* Mobile Status Only (Minimalist) */}
        <div className="md:hidden flex items-center gap-2">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Live</span>
        </div>
      </div>
    </header>
  );
}