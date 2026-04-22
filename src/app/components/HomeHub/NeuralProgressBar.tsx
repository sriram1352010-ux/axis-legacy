"use client";

import { motion } from "framer-motion";

export default function NeuralProgressBar() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-neon.blue to-neon.pink"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%"] }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      <div className="text-center text-gray-400 text-sm">
        Neural Scanning in Progress...
      </div>
    </div>
  );
}
