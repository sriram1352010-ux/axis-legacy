"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  emoji: string;
  description: string;
  color: "blue" | "green" | "yellow" | "pink";
  isPremium?: boolean; // Added for Freemium showcase
}

export default function Card({ title, emoji, description, color, isPremium }: CardProps) {
  const router = useRouter();
  
  const handleCardClick = () => {
    // FIX: Removed "/tools" because your folders are at the root
    switch(title) {
      case "Colorize": router.push("/colorize"); break;
      case "Face Clarity": router.push("/face-clarity"); break;
      case "Age Transform": router.push("/age-transform"); break;
      case "Ancestry Mix": router.push("/ancestry-mix"); break;
      default: router.push("/colorize");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, translateY: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-6 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md cursor-pointer overflow-hidden group`}
      onClick={handleCardClick}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-blue-600 text-[10px] font-bold rounded-md text-white z-20 shadow-lg">
          PRO
        </div>
      )}

      <div className="relative z-10">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{emoji}</div>
        <h3 className="text-xl font-bold mb-1 text-white">{title}</h3>
        <p className="text-zinc-500 text-sm">{description}</p>
      </div>
      
      {/* Neon Glow Hover Effect */}
      <div className={`absolute inset-0 border-2 border-blue-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]`}></div>
    </motion.div>
  );
}