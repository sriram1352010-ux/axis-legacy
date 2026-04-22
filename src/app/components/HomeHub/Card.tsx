"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  emoji: string;
  description: string;
  color: "blue" | "green" | "yellow" | "pink";
}

export default function Card({ title, emoji, description, color }: CardProps) {
  const router = useRouter();
  
  const handleCardClick = () => {
    // Navigate to specific tool page based on title
    switch(title) {
      case "Colorize":
        router.push("/tools/colorize");
        break;
      case "Face Clarity":
        router.push("/tools/clarity");
        break;
      case "Age Transform":
        router.push("/tools/age");
        break;
      case "Ancestry Mix":
        router.push("/tools/ancestry");
        break;
      default:
        router.push("/tools/colorize");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-6 rounded-xl border-2 border-${color}-500 bg-background.card backdrop-blur-sm cursor-pointer overflow-hidden`}
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-${color}-500/10 z-0"></div>
      <div className="relative z-10">
        <div className="text-4xl mb-4">{emoji}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
      
      {/* Neon glow effect */}
      <div className={`absolute inset-0 rounded-xl border-2 border-${color}-500 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
    </motion.div>
  );
}
