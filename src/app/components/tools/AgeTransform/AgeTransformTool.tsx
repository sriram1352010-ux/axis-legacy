"use client";

import React, { useState } from 'react';
import CustomSlider from '../../ui/CustomSlider'; 
import { InferenceService } from '../../services/inferenceService';
import { Upload, Zap, Clock, ShieldCheck, X, Crown, Check, Loader2 } from 'lucide-react';

const AgeTransformTool = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [targetAge, setTargetAge] = useState(25);
  
  // Empire Logic: Tracking Credits and Premium Status
  const [usageCount, setUsageCount] = useState(0); 
  const [isPremium, setIsPremium] = useState(false); 
  const [showUpsell, setShowUpsell] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null); // Clear previous results on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = async () => {
    // 1. THE HOOK: Check credits before processing
    if (usageCount >= 3 && !isPremium) {
      setShowUpsell(true);
      return;
    }

    if (!image) return;
    setLoading(true);
    try {
      const resultData = await InferenceService.processImage(
        image, 
        'age-transform', 
        { target_age: targetAge }
      );
      setResult(resultData); 
      setUsageCount(prev => prev + 1); // Track usage
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetTool = () => {
    setResult(null);
    setImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10 text-white relative">
      {/* Header with Credit Counter */}
      <div className="flex justify-between items-start mb-10">
        <div className="text-left">
          <h1 className="text-4xl font-black tracking-tighter mb-2 italic">AGE TRANSFORM</h1>
          <p className="text-blue-500/60 text-xs font-bold tracking-[0.2em] uppercase">Temporal Neural Engine</p>
        </div>
        <div className="bg-zinc-900 px-4 py-2 rounded-full border border-white/5 text-[10px] font-bold text-zinc-500">
          CREDITS: {isPremium ? "UNLIMITED" : `${3 - usageCount} REMAINING`}
        </div>
      </div>

      {!image ? (
        /* PRO Upload Area */
        <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-zinc-800 rounded-[2rem] bg-zinc-900/30 hover:border-blue-500/50 transition-all cursor-pointer group">
          <Upload className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
          <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Upload Face to Begin</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      ) : (
        <div className="space-y-8">
          {!result && (
            <div className="relative group animate-in fade-in zoom-in-95">
               <img src={image} alt="Source" className="mx-auto max-h-80 rounded-3xl border border-white/10 shadow-2xl" />
               <button 
                onClick={resetTool} 
                className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full text-white text-xs px-4 hover:bg-red-500 transition-colors"
               >
                Change Photo
               </button>
               
               {loading && (
                 <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center">
                   <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                   <p className="text-blue-400 font-bold animate-pulse tracking-tighter uppercase text-xs">Recalculating Temporal Markers...</p>
                 </div>
               )}
            </div>
          )}

          {/* MNC Grade Slider Section */}
          {!result && (
            <div className={`bg-zinc-900/80 p-8 rounded-[2.5rem] border border-white/5 shadow-inner transition-opacity ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex justify-between items-end mb-6">
                 <div>
                   <span className="text-blue-500 font-black text-xs tracking-widest block mb-1">TARGET IDENTITY</span>
                   <h3 className="text-3xl font-bold">{targetAge} <span className="text-sm text-zinc-500 italic">Years Old</span></h3>
                 </div>
                 <Clock className="text-zinc-700 w-8 h-8" />
              </div>

              <CustomSlider 
                label="Target Age" 
                value={targetAge} 
                onChange={setTargetAge} 
                min={1} max={100} step={1}
                unit=" Years"
              />
            </div>
          )}

          {!result && (
            <button 
              onClick={handleApply}
              disabled={loading}
              className="w-full py-5 bg-blue-600 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? "PROCESSING..." : <><Zap fill="currentColor" /> INITIATE TRANSFORMATION</>}
            </button>
          )}
        </div>
      )}

      {/* Result Area with 4K Hook and Close Button */}
      {result && (
        <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-4 relative group">
          <div className="relative inline-block">
            <button 
                onClick={() => setResult(null)} 
                className="absolute -top-4 -right-4 z-10 p-2 bg-zinc-900 border border-white/10 rounded-full text-white hover:bg-red-500 transition-all shadow-xl"
            >
              <X size={18} />
            </button>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-full text-xs font-bold mb-6 border border-green-500/20">
              <ShieldCheck size={14}/> TRANSFORMATION COMPLETE
            </div>
            
            <img src={result} alt="Result" className="mx-auto max-h-[500px] rounded-[2.5rem] shadow-[0_0_50px_rgba(59,130,246,0.2)] border-2 border-blue-500/20" />
          </div>

          <div className="max-w-sm mx-auto mt-8 space-y-4">
            <a href={result} download="axis-age-legacy.jpg" className="block text-zinc-500 text-sm font-bold hover:text-white transition-colors">
              Download Standard Asset
            </a>
            
            <button 
              onClick={() => !isPremium && setShowUpsell(true)}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-400 text-black font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-amber-900/20 hover:scale-[1.02] transition-transform"
            >
              <Zap size={18} fill="currentColor" /> DOWNLOAD ULTRA-HD 4K
            </button>
          </div>
        </div>
      )}

      {/* PREMIUM UPSELL MODAL */}
      {showUpsell && (
        <div className="absolute inset-x-4 top-20 z-50 bg-zinc-950/95 backdrop-blur-xl p-10 rounded-[3rem] border border-amber-500/20 flex flex-col justify-center animate-in fade-in zoom-in-95 shadow-2xl">
          <button onClick={() => setShowUpsell(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-white">
            <X size={24} />
          </button>
          
          <div className="flex items-center gap-2 text-amber-500 font-black tracking-[0.3em] text-[10px] mb-4">
            <Crown size={14} fill="currentColor" /> AXIS LEGACY PRO
          </div>
          
          <h3 className="text-4xl font-black text-white mb-8 italic tracking-tighter leading-none">MASTER YOUR LEGACY.</h3>
          
          <div className="space-y-5 mb-10 text-left">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-zinc-500 font-medium text-sm">Daily AI Transformations</span>
              <span className="text-emerald-400 font-black text-xs">UNLIMITED</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-zinc-500 font-medium text-sm">Export Quality</span>
              <span className="text-emerald-400 font-black text-xs">4K CINEMATIC</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-zinc-500 font-medium text-sm">Processing Priority</span>
              <span className="text-emerald-400 font-black text-xs">ULTRA-FAST</span>
            </div>
          </div>
          
          <button className="w-full py-6 bg-amber-500 text-black font-black rounded-3xl text-lg shadow-[0_20px_50px_rgba(245,158,11,0.3)] hover:bg-amber-400 transition-all">
            UPGRADE TO PRO
          </button>
        </div>
      )}
    </div>
  );
};

export default AgeTransformTool;
