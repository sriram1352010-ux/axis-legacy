"use client";

import { motion } from "framer-motion";
import Card from "./Card";
import NeuralProgressBar from "./NeuralProgressBar";

export default function HomeHub() {
  return (
    <div className="min-h-screen p-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 pt-10">
          <h1 className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 tracking-tighter">
            Axis Legacy
          </h1>
          <p className="text-gray-400 tracking-[0.3em] uppercase text-xs font-bold">Nostalgia AI Suite</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              title="Colorize"
              emoji="📸"
              description="DeOldify"
              color="blue"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card
              title="Face Clarity"
              emoji="✨"
              description="GFPGAN"
              color="green"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              title="Age Transform"
              emoji="⏳"
              description="InstantID"
              color="yellow"
              isPremium={true}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card
              title="Ancestry Mix"
              emoji="🧬"
              description="InstantID Face Fusion"
              color="pink"
              isPremium={true}
            />
          </motion.div>
        </div>
        
        <NeuralProgressBar />

        {/* --- MNC Freemium Upsell Section --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-10 rounded-3xl border border-white/5 bg-gradient-to-b from-zinc-900/50 to-black text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <h2 className="text-3xl font-bold text-white mb-4 italic">Ready for the Empire Tier?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Upgrade to <span className="text-blue-500 font-bold">AXIS PRO</span> to unlock 4K Upscaling, priority processing, and commercial usage rights for your nostalgia projects.
          </p>
          <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-full transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            UPGRADE TO PREMIUM
          </button>
        </motion.div>
        {/* ---------------------------------- */}
        
      </div>
    </div>
  );
}