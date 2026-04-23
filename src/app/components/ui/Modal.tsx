"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Prevent scrolling behind the modal when active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* THE OVERLAY: Deep blur for that 'Midnight' premium feel */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          {/* THE MODAL: Axis Empire Style */}
          <motion.div 
            initial={{ scale: 0.98, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="relative bg-zinc-900 border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.5)] rounded-[2.5rem] w-full max-w-md overflow-hidden mx-auto"
          >
            {/* Header with explicit close icon */}
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/80">
              <h3 className="text-xl font-black italic tracking-tighter text-white uppercase">
                {title}
              </h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8">
              {children}
            </div>

            {/* Subtle bottom detail for that 'Tech' finish */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;