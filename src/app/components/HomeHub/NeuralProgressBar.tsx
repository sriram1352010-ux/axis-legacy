"use client";

import { motion } from "framer-motion";

export default function NeuralProgressBar() {
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* The Scanning Rail */}
      <div className="relative h-[1px] bg-zinc-900 rounded-full overflow-hidden mb-6">
        {/* The "Neural" Pulse Beam */}
        <motion.div
          className="absolute h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          initial={{ left: "-33%" }}
          animate={{ left: "100%" }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Subtle Static Glow behind the rail */}
        <div className="absolute inset-0 bg-blue-500/5 blur-sm" />
      </div>

      {/* System Metadata Line */}
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </div>
          <span className="text-[9px] font-black text-zinc-500 tracking-[0.4em] uppercase">
            Neural Core Active
          </span>
        </div>

        <span className="text-[9px] font-black text-zinc-800 tracking-[0.2em] uppercase font-mono">
          LGCY-PRTCL // 002.4
        </span>
      </div>
    </div>
  );
}
