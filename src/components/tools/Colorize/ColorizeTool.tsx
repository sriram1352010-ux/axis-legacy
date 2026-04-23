"use client";

import React, { useState } from 'react';
import CustomSlider from '../../ui/CustomSlider';
import Modal from '../../ui/Modal';
import { Upload, Zap, Palette, ShieldCheck, X, Crown, Check, Loader2 } from 'lucide-react';

const ColorizeTool = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Empire Logic: Tracking Credits and Premium Status
  const [usageCount, setUsageCount] = useState(0); 
  const [isPremium, setIsPremium] = useState(false); 
  const [showUpsell, setShowUpsell] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = async () => {
    // 1. THE HOOK: Check credits before processing
    if (usageCount >= 3 && !isPremium) {
      setIsModalOpen(false);
      setShowUpsell(true);
      return;
    }

    if (!sourceImage) return;
    setIsLoading(true);
    setIsModalOpen(false);

    try {
      // Mocking the AI service call - replace with your actual colorize service
      await new Promise(resolve => setTimeout(resolve, 3000));
      setResultImage(sourceImage); // Placeholder: in production, set the colorized URL
      setUsageCount(prev => prev + 1);
    } catch (error) {
      console.error("Colorization Engine Failure:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] shadow-2xl transition-all hover:border-emerald-500/30 relative overflow-hidden">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
            <Palette size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Vibrant Colorize</h2>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Neural Chroma Mapping</p>
          </div>
        </div>
        <div className="bg-zinc-950 px-4 py-2 rounded-full border border-white/5 text-[10px] font-bold text-zinc-500">
          CREDITS: {isPremium ? "UNLIMITED" : `${3 - usageCount} REMAINING`}
        </div>
      </div>

      {/* Image Preview / Upload Area */}
      <div className="relative group mb-8 aspect-video bg-zinc-950 rounded-3xl border-2 border-dashed border-zinc-800 flex items-center justify-center overflow-hidden">
        {resultImage ? (
          <div className="relative w-full h-full">
             <img src={resultImage} alt="Colorized" className="w-full h-full object-contain" />
             <button 
                onClick={() => setResultImage(null)} 
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500/80 backdrop-blur-md rounded-full text-white transition-all shadow-xl"
             >
               <X size={16} />
             </button>
          </div>
        ) : sourceImage ? (
          <img src={sourceImage} alt="Source" className="w-full h-full object-contain opacity-40 grayscale" />
        ) : (
          <label className="flex flex-col items-center cursor-pointer">
            <Upload className="w-10 h-10 text-zinc-700 mb-2 group-hover:text-emerald-400 transition-colors" />
            <span className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Upload B&W Photo</span>
            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
          </label>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
            <p className="text-emerald-400 font-black animate-pulse tracking-widest text-xs uppercase">Injecting Chroma Data...</p>
          </div>
        )}
      </div>

      {/* Tool Controls */}
      {!resultImage && (
        <div className="space-y-8">
          <CustomSlider 
            label="Chroma Intensity" 
            value={intensity} 
            onChange={setIntensity} 
            min={0} max={100} step={1}
            unit="%"
          />
          
          <button 
            onClick={() => setIsModalOpen(true)}
            disabled={!sourceImage || isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-tighter"
          >
            {isLoading ? "Synthesizing..." : "Apply Neural Color"}
          </button>
        </div>
      )}

      {/* 4K Download Hook for Results */}
      {resultImage && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-center gap-2 text-emerald-400 text-[10px] font-black uppercase mb-2">
            <ShieldCheck size={14} /> Colorization Matrix Optimized
          </div>
          <a href={resultImage} download="axis-color-standard.jpg" className="block text-center text-zinc-500 text-xs font-bold hover:text-white transition-colors">
            Download Standard Chroma
          </a>
          <button 
            onClick={() => !isPremium && setShowUpsell(true)}
            className="w-full py-5 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-amber-900/20 hover:scale-[1.02] transition-transform"
          >
            <Zap size={18} fill="currentColor" /> EXPORT IN 4K PRECISION
          </button>
        </div>
      )}

      {/* PREMIUM UPSELL MODAL */}
      {showUpsell && (
        <div className="absolute inset-0 z-50 bg-zinc-950/98 backdrop-blur-xl p-10 rounded-[2.5rem] flex flex-col justify-center animate-in fade-in zoom-in-95">
          <button onClick={() => setShowUpsell(false)} className="absolute top-8 right-8 text-zinc-600 hover:text-white">
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-2 text-amber-500 font-black tracking-[0.3em] text-[10px] mb-4">
            <Crown size={14} fill="currentColor" /> AXIS LEGACY PRO
          </div>
          
          <h3 className="text-3xl font-black text-white mb-8 italic tracking-tighter leading-none">BRING HISTORY TO LIFE.</h3>
          
          <div className="space-y-5 mb-10">
            {[
              { f: "Standard Tint", p: "Deep Neural Colorization" },
              { f: "3 Daily Limit", p: "Unlimited Archive Access" },
              { f: "Standard Resolution", p: "4K Masterpiece Quality" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-white/5 text-[11px]">
                <span className="text-zinc-600">{item.f}</span>
                <span className="text-emerald-400 font-black flex items-center gap-1"><Check size={12}/> {item.p}</span>
              </div>
            ))}
          </div>
          
          <button className="w-full py-6 bg-amber-500 text-black font-black rounded-3xl shadow-[0_20px_50px_rgba(245,158,11,0.3)]">
            UPGRADE TO PRO
          </button>
        </div>
      )}

      {/* Confirm Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Initiate Colorization"
      >
        <div className="space-y-4">
          <p className="text-zinc-400 text-sm">
            This will use 1 of your 3 daily credits. We will process your photo with <span className="text-emerald-400 font-black">{intensity}%</span> chroma depth.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-zinc-500 font-bold hover:text-white transition-colors">Abort</button>
            <button onClick={handleApply} className="px-6 py-2 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-500 transition-all">Proceed</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ColorizeTool;
