"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronRight, Lock, Zap, Crown } from "lucide-react";

interface CardProps {
  title: string;
  emoji: string;
  description: string;
  limit: number;
  remaining: number;
  isPremium?: boolean; // Added for Pro users
}

export default function Card({ title, emoji, description, limit, remaining, isPremium = false }: CardProps) {
  const router = useRouter();
  const isLocked = !isPremium && remaining <= 0;
  const progressPercentage = (remaining / limit) * 100;
  
  const handleCardClick = () => {
    // Even if locked, we might want them to click to see the Upsell
    const path = title.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${path}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className={`relative p-8 rounded-[3rem] border transition-all duration-500 flex flex-col h-full overflow-hidden group
        ${isLocked 
          ? "bg-zinc-950 border-white/5 cursor-pointer opacity-80" 
          : "bg-zinc-900/20 border-white/5 backdrop-blur-2xl cursor-pointer hover:border-blue-500/40 shadow-2xl hover:shadow-blue-500/10"
        }`}
    >
      {/* 1. Dynamic Credit/Status Badge */}
      <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[9px] font-black z-20 flex items-center gap-2 border tracking-tighter
        ${isPremium 
          ? "bg-amber-500/10 border-amber-500/20 text-amber-500" 
          : isLocked 
            ? "bg-red-500/10 border-red-500/20 text-red-500" 
            : "bg-zinc-800/80 border-white/10 text-blue-400"
        }`}
      >
        {isPremium ? <Crown size={10} fill="currentColor" /> : isLocked ? <Lock size={10} /> : <Zap size={10} />}
        {isPremium ? "PRO UNLIMITED" : isLocked ? "UPGRADE TO USE" : `${remaining}/${limit} CREDITS`}
      </div>

      <div className="relative z-10 flex flex-col h-full pt-4">
        {/* 2. Icon with Grayscale Logic */}
        <div className={`text-6xl mb-8 transition-all duration-700 
          ${isLocked ? "grayscale opacity-30" : "group-hover:scale-110 group-hover:rotate-6"}
        `}>
          {emoji}
        </div>
        
        <h3 className="text-2xl font-black mb-4 text-white tracking-tighter italic uppercase">
          {title}
        </h3>
        
        <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
          {description}
        </p>

        {/* 3. MNC Progress Bar (Visualizing the limit) */}
        {!isPremium && (
          <div className="w-full h-1 bg-zinc-800/50 rounded-full mb-6 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className={`h-full ${isLocked ? 'bg-red-500' : 'bg-blue-500'}`}
            />
          </div>
        )}
        
        <div className={`flex items-center text-[11px] font-black uppercase tracking-[0.2em] transition-all
          ${isLocked ? "text-amber-500 group-hover:gap-3" : "text-blue-500 group-hover:gap-3"}
        `}>
          {isLocked ? "Unlock with Pro" : "Initiate Protocol"} 
          <ChevronRight size={14} className="ml-1" />
        </div>
      </div>
      
      {/* 4. Background Decorative Glow */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] rounded-full transition-opacity duration-500
        ${isPremium ? "bg-amber-500/10 opacity-40" : isLocked ? "bg-red-500/5 opacity-100" : "bg-blue-500/10 opacity-0 group-hover:opacity-100"}
      `} />
    </motion.div>
  );
}