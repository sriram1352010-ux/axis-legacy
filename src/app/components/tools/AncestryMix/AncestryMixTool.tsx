"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomSlider from '../../ui/CustomSlider';
import DualImageUploader from './DualUploader';
import { processAncestryMix } from "../../services/inferenceService"; 
import { Zap, Dna, Download, RefreshCw, Info, X, Crown, Check } from 'lucide-react';

const AncestryMixTool = () => {
  const [fatherImg, setFatherImg] = useState<string | null>(null);
  const [motherImg, setMotherImg] = useState<string | null>(null);
  const [mixPercentage, setMixPercentage] = useState(50);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Empire Logic: Tracking Credits and Premium Status
  const [usageCount, setUsageCount] = useState(0); 
  const [isPremium, setIsPremium] = useState(false); 
  const [showUpsell, setShowUpsell] = useState(false);

  const handleImagesUpload = (f: string, m: string) => {
    setFatherImg(f);
    setMotherImg(m);
  };

  const handleApply = async () => {
    // 1. THE HOOK: Check credits before processing
    if (usageCount >= 3 && !isPremium) {
      setShowUpsell(true);
      return;
    }

    if (!fatherImg || !motherImg) return;
    setLoading(true);
    
    try {
      const processedUrl = await processAncestryMix(fatherImg, motherImg);
      setResult(processedUrl);
      setUsageCount(prev => prev + 1); // Increment usage
    } catch (error) {
      console.error("Fusion Protocol Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-950/50 border border-white/5 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
      
      {/* Header with Credit Counter */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-500/10 rounded-2xl text-pink-500">
            <Dna size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white italic tracking-tighter">ANCESTRY FUSION</h2>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Genetic Feature Blending • v2.0</p>
          </div>
        </div>
        <div className="bg-zinc-900 px-4 py-2 rounded-full border border-white/5 text-[10px] font-bold text-zinc-500">
          CREDITS: {isPremium ? "UNLIMITED" : `${3 - usageCount} REMAINING`}
        </div>
      </div>

      {!result ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <DualImageUploader onImagesUpload={handleImagesUpload} />

          <div className="mt-8 p-6 bg-zinc-900/50 rounded-3xl border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Fusion Influence</span>
              <span className="text-sm font-mono font-bold text-pink-500">{mixPercentage}%</span>
            </div>
            
            <CustomSlider 
              label="Fusion Influence" 
              value={mixPercentage} 
              onChange={setMixPercentage} 
              min={0} max={100} step={1}
              unit="%"
            />

            <div className="flex items-start gap-3 mt-6 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
              <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Higher influence leans the AI generation toward the specific features of the Father's genetic profile.
              </p>
            </div>

            <button 
              onClick={handleApply}
              disabled={loading || !fatherImg || !motherImg}
              className={`w-full mt-8 py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all
                ${loading || !fatherImg || !motherImg 
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-[0_20px_40px_rgba(225,29,72,0.2)] hover:scale-[1.02]'}`}
            >
              {loading ? (
                <><RefreshCw size={18} className="animate-spin" /> SYNTHESIZING GENETICS...</>
              ) : (
                <><Zap size={18} fill="currentColor" /> INITIATE FUSION</>
              )}
            </button>
          </div>
        </motion.div>
      ) : (
        /* Result View with 4K Hook and Close Button */
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="relative group mx-auto max-w-sm">
             {/* Close Button */}
             <button 
                onClick={() => setResult(null)} 
                className="absolute -top-3 -right-3 z-10 p-2 bg-zinc-900 border border-white/10 rounded-full text-white hover:bg-red-500 transition-all shadow-xl"
             >
               <X size={16} />
             </button>
            
            <img src={result} alt="Fused Result" className="rounded-[2rem] shadow-2xl border-4 border-white/10" />
            
            <div className="mt-8 space-y-4">
              <a href={result} download="axis-fusion.jpg" className="block text-zinc-500 text-sm font-bold hover:text-white transition-colors">
                Download Standard Asset
              </a>

              {/* The Premium 4K Hook */}
              <button 
                onClick={() => !isPremium && setShowUpsell(true)}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-amber-900/20 hover:scale-[1.02] transition-transform"
              >
                <Zap size={18} fill="currentColor" /> DOWNLOAD ULTRA-HD 4K
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* PREMIUM UPSELL MODAL (The Empire Hook) */}
      <AnimatePresence>
        {showUpsell && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-4 z-50 bg-zinc-950/95 backdrop-blur-xl p-8 rounded-[2rem] border border-amber-500/20 flex flex-col justify-center"
          >
            <button onClick={() => setShowUpsell(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-2 text-amber-500 font-black tracking-[0.3em] text-[10px] mb-4">
              <Crown size={14} fill="currentColor" /> AXIS LEGACY PRO
            </div>
            
            <h3 className="text-3xl font-black text-white mb-6 italic tracking-tighter leading-none">EVOLVE YOUR ANCESTRY.</h3>
            
            <div className="space-y-4 mb-8 text-left">
              {[
                { f: "Standard Fusion", p: "Deep Genetic Mapping" },
                { f: "3 Daily Fusions", p: "Unlimited Generations" },
                { f: "Web Resolution", p: "4K Print-Ready Quality" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5">
                  <span className="text-zinc-500 text-xs font-medium">{item.f}</span>
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
                    <Check size={12} /> {item.p}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-5 bg-amber-500 text-black font-black rounded-2xl shadow-[0_20px_50px_rgba(245,158,11,0.3)]">
              UPGRADE TO PRO
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AncestryMixTool;
