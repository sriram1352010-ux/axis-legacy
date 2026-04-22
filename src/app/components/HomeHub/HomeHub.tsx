"use client";

import { motion } from "framer-motion";
import Card from "./Card";
import NeuralProgressBar from "./NeuralProgressBar";

export default function HomeHub() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neon.blue to-neon.pink">
            Axis Legacy
          </h1>
          <p className="text-gray-400">Nostalgia AI Suite</p>
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
            />
          </motion.div>
        </div>
        
        <NeuralProgressBar />
      </div>
    </div>
  );
}
