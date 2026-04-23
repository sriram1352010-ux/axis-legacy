"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Card from "./Card";
import NeuralProgressBar from "./NeuralProgressBar";
import { Cpu, ShieldCheck, Globe } from "lucide-react";

export default function HomeHub() {
  const [mounted, setMounted] = useState(false);
  
  // Sriram, usually you'd fetch this from Supabase, but for the UI:
  const [userCredits, setUserCredits] = useState({
    standard: 3,
    advanced: 1
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="min-h-screen p-4 md:p-12 bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- LUXURY HEADER SECTION --- */}
        <header className="text-center mb-20 pt-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full -z-10" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-300 to-zinc-800 tracking-tighter italic">
              AXIS LEGACY
            </h1>
          </motion.div>
          
          <p className="text-blue-500 tracking-[0.5em] uppercase text-[10px] font-black mb-12">
            High-Fidelity Nostalgia Engine
          </p>

          {/* Real-time Credit Dashboard - MNC Grade Visuals */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="group px-8 py-4 bg-zinc-900/30 border border-white/5 rounded-[2rem] backdrop-blur-md transition-all hover:border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Standard Protocols</p>
              </div>
              <p className="text-2xl font-mono font-bold text-white tracking-tighter">
                {userCredits.standard} <span className="text-xs text-zinc-600 uppercase">Credits Left</span>
              </p>
            </div>

            <div className="group px-8 py-4 bg-zinc-900/30 border border-white/5 rounded-[2rem] backdrop-blur-md transition-all hover:border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Advanced Protocols</p>
              </div>
              <p className="text-2xl font-mono font-bold text-white tracking-tighter">
                {userCredits.advanced} <span className="text-xs text-zinc-600 uppercase">Credits Left</span>
              </p>
            </div>
          </div>
        </header>
        
        {/* --- DYNAMIC TOOLS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <Card
            title="Colorize"
            emoji="📸"
            description="Breathe life into grayscale history with our proprietary DeOldify neural mapping."
            limit={3}
            remaining={userCredits.standard}
          />
          <Card
            title="Face Clarity"
            emoji="✨"
            description="Ultra-sharp facial reconstruction using GFPGAN for blurred generation gaps."
            limit={3}
            remaining={userCredits.standard}
          />
          <Card
            title="Age Transform"
            emoji="⏳"
            description="Temporal visualization. Accurately predict aging or reverse time using InstantID."
            limit={1}
            remaining={userCredits.advanced}
          />
          <Card
            title="Ancestry Mix"
            emoji="🧬"
            description="The ultimate family fusion. Merging genetic features across generations."
            limit={1}
            remaining={userCredits.advanced}
          />
        </div>
        
        <NeuralProgressBar />

        {/* --- PREMIUM UPSELL ARCHITECTURE --- */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 rounded-[4rem] border border-white/5 bg-gradient-to-br from-zinc-900/40 via-black to-black text-center relative overflow-hidden group"
        >
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-[100px]" />
          
          <h2 className="text-4xl font-black mb-6 tracking-tight italic">COMMAND THE EMPIRE</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto mb-12 text-base leading-relaxed font-medium">
            Daily limits prevent system overload. Upgrade to <span className="text-blue-500 font-bold">AXIS PRO</span> to bypass credits, unlock 4K processing, and access the Batch-Processing Engine.
          </p>
          <button className="group relative px-16 py-6 bg-white text-black font-black rounded-3xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
            <span className="relative z-10 transition-colors group-hover:text-white">UPGRADE TO PRO</span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.section>

        {/* --- SYSTEM FOOTER --- */}
        <footer className="mt-32 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-12">
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                 <Cpu size={14} className="text-zinc-700" />
                 <span className="text-zinc-700 text-[10px] font-bold tracking-widest">CORE: v2.0.4</span>
               </div>
               <div className="flex items-center gap-2">
                 <Globe size={14} className="text-zinc-700" />
                 <span className="text-zinc-700 text-[10px] font-bold tracking-widest">REGION: PALANI IN</span>
               </div>
            </div>
            
            <p className="text-zinc-700 text-[10px] font-black tracking-[0.5em] uppercase">
              Axis Legacy • All Rights Reserved
            </p>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
               <ShieldCheck size={12} className="text-emerald-500" />
               <span className="text-emerald-500 text-[9px] font-bold">SYSTEMS NOMINAL</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}