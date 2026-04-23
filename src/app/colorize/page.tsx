"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { processColorize } from '@/app/components/tools/Colorize/DeOldifyService';
import { Upload, Palette, Zap } from 'lucide-react';
export const dynamic = 'force-dynamic';
export default function ColorizePage() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!image) return;
    if (usageCount >= 3) {
      alert("Daily Free Limit Reached! Upgrade to Axis Pro for unlimited colorizing.");
      return;
    }
    
    setLoading(true);
    try {
      const processedImage = await processColorize(image);
      setResult(processedImage);
      setUsageCount(prev => prev + 1);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <div className="min-h-screen bg-black p-4 md:p-10 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-black mb-2 tracking-tighter">COLORIZE TOOL</h1>
        <p className="text-zinc-500 mb-8 text-sm">Credits: <span className="text-blue-500 font-bold">{3 - usageCount} remaining</span></p>

        {/* Big Mobile-Friendly Upload Area */}
        {!image ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/30 hover:border-blue-500/50 transition-all cursor-pointer">
            <Upload className="w-10 h-10 text-blue-500 mb-4" />
            <span className="text-zinc-400 font-medium">Tap to upload black & white photo</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        ) : (
          <div className="space-y-6">
            <img src={image} alt="Original" className="mx-auto max-h-80 rounded-2xl border border-white/10" />
            <div className="flex gap-4">
               <button onClick={() => setImage(null)} className="flex-1 py-4 bg-zinc-800 rounded-2xl font-bold">Change</button>
               <button 
                 onClick={handleProcess} 
                 disabled={loading}
                 className="flex-[2] py-4 bg-blue-600 rounded-2xl font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
               >
                 {loading ? "AI WORKING..." : <><Zap size={18} /> COLORIZE NOW</>}
               </button>
            </div>
          </div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12">
            <h2 className="text-blue-400 font-bold mb-4 flex items-center justify-center gap-2">
              <Palette size={20}/> RESTORED VERSION
            </h2>
            <img src={result} alt="Result" className="mx-auto max-h-96 rounded-2xl shadow-2xl shadow-blue-500/20" />
            <a href={result} download="axis-colorized.jpg" className="inline-block mt-6 text-zinc-500 underline text-sm">Download High Quality</a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
