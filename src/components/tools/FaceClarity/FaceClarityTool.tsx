"use client";

import React, { useState } from 'react';
import CustomSlider from '../../ui/CustomSlider';
import Modal from '../../ui/Modal';
import { processFaceClarity } from '@/app/components/tools/FaceClarity/GFPGANService';
import { StorageService } from '@/app/components/services/StorageService';
import { Loader2, Sparkles, Upload, Zap, Crown, Check, X } from 'lucide-react';

const FaceClarityTool = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clarity, setClarity] = useState(50);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Empire Logic: Tracking Credits and Premium Status
  const [showUpsell, setShowUpsell] = useState(false);
  const [isPremium, setIsPremium] = useState(false); // Link this to your Supabase Auth Profile later
  const [usageCount, setUsageCount] = useState(0); // This should be fetched from your database

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const cloudUrl = await StorageService.uploadImage(file);
        setSourceImage(cloudUrl);
        setResultImage(null); 
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsLoading(false);
      }
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
      const enhancedImage = await processFaceClarity(sourceImage);
      setResultImage(enhancedImage);
      setUsageCount(prev => prev + 1); // Increment usage (MNCs update DB here)
    } catch (error) {
      console.error("Enhancement failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl transition-all hover:border-emerald-500/50 relative">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Sparkles className="text-emerald-400 w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Face Clarity</h2>
        </div>
        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Credits: {isPremium ? "UNLIMITED" : `${3 - usageCount} Remaining`}
        </div>
      </div>

      {/* Image Preview / Upload Area */}
      <div className="relative group mb-6 aspect-video bg-zinc-950 rounded-xl border-2 border-dashed border-zinc-800 flex items-center justify-center overflow-hidden">
        {resultImage ? (
          <div className="relative w-full h-full">
             <img src={resultImage} alt="Enhanced" className="w-full h-full object-contain" />
             {/* Close Button - Clean UI */}
             <button 
                onClick={() => setResultImage(null)} 
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500/80 backdrop-blur-md rounded-full text-white transition-all"
             >
               <X size={16} />
             </button>
          </div>
        ) : sourceImage ? (
          <img src={sourceImage} alt="Source" className="w-full h-full object-contain opacity-50" />
        ) : (
          <label className="flex flex-col items-center cursor-pointer">
            <Upload className="w-10 h-10 text-zinc-600 mb-2 group-hover:text-emerald-400 transition-colors" />
            <span className="text-zinc-500 font-medium">Upload Blurry Photo</span>
            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
          </label>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
            <p className="text-emerald-400 font-bold animate-pulse tracking-tighter">NEURAL SCANNING...</p>
          </div>
        )}
      </div>

      {/* Tool Controls */}
      <div className="space-y-6">
        <CustomSlider 
          label="Enhancement Strength" 
          value={clarity} 
          onChange={setClarity} 
          min={0} max={100} step={1}
          unit="%"
        />
        
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={!sourceImage || isLoading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? "Processing..." : "Apply AI Restoration"}
        </button>

        {/* The 4K Premium Hook */}
        {resultImage && (
          <button 
            onClick={() => !isPremium && setShowUpsell(true)}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-black rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-amber-900/20 hover:scale-[1.02] transition-transform"
          >
            <Zap size={18} fill="currentColor" /> DOWNLOAD ULTRA-HD 4K
          </button>
        )}
      </div>

      {/* PREMIUM UPSELL MODAL (The Hook) */}
      {showUpsell && (
        <div className="absolute inset-0 z-50 bg-zinc-950/95 backdrop-blur-md p-8 rounded-2xl flex flex-col justify-center animate-in fade-in zoom-in-95">
          <button onClick={() => setShowUpsell(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
            <X size={24} />
          </button>
          <div className="flex items-center gap-2 text-amber-500 font-black tracking-widest text-xs mb-2">
            <Crown size={14} fill="currentColor" /> AXIS LEGACY PRO
          </div>
          <h3 className="text-3xl font-black text-white mb-6 italic leading-none">DON'T SETTLE FOR STANDARD.</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
              <span className="text-zinc-500">Daily Limits</span>
              <span className="text-emerald-400 font-bold">UNLIMITED</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
              <span className="text-zinc-500">Resolution</span>
              <span className="text-emerald-400 font-bold">4K ULTRA-HD</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2 text-sm">
              <span className="text-zinc-500">Neural Speed</span>
              <span className="text-emerald-400 font-bold">PRIORITY TURBO</span>
            </div>
          </div>
          <button className="w-full py-5 bg-amber-500 text-black font-black rounded-2xl shadow-[0_20px_50px_rgba(245,158,11,0.3)]">
            GO PREMIUM NOW
          </button>
        </div>
      )}

      {/* Confirm Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Restoration">
        <div className="space-y-4">
          <p className="text-zinc-400 text-sm">
            This will use 1 of your 3 daily credits to enhance this image with <span className="text-emerald-400 font-bold">{clarity}%</span> intensity.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-zinc-400 font-bold">Cancel</button>
            <button onClick={handleApply} className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg">Start Enhance</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FaceClarityTool;