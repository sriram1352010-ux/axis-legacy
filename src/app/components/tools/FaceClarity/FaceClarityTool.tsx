"use client";

import React, { useState } from 'react';
import CustomSlider from '../../ui/CustomSlider';
import Modal from '../../ui/Modal';
import { processFaceClarity } from '@/app/components/tools/FaceClarity/GFPGANService';
import { StorageService } from '@/app/components/services/StorageService';
import { Loader2, Sparkles, Upload, ImageIcon } from 'lucide-react';

const FaceClarityTool = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clarity, setClarity] = useState(50);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


// ... inside the component
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setIsLoading(true); // Start scanning effect immediately
    try {
      // Upload to Supabase Bucket
      const cloudUrl = await StorageService.uploadImage(file);
      
      // Set the cloud URL as the source for the AI tool
      setSourceImage(cloudUrl);
      
      // Optional: Clear any old results when a new image is uploaded
      setResultImage(null); 
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image to the cloud.");
    } finally {
      setIsLoading(false);
    }
  }
};

  const handleApply = async () => {
    if (!sourceImage) return;
    
    setIsLoading(true);
    setIsModalOpen(false);

    try {
      // Calling the service we created earlier
      const enhancedImage = await processFaceClarity(sourceImage);
      setResultImage(enhancedImage);
    } catch (error) {
      console.error("Enhancement failed:", error);
      alert("Something went wrong with the AI processing.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl transition-all hover:border-emerald-500/50">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Sparkles className="text-emerald-400 w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Face Clarity</h2>
      </div>

      {/* Image Preview / Upload Area */}
      <div className="relative group mb-6 aspect-video bg-zinc-950 rounded-xl border-2 border-dashed border-zinc-800 flex items-center justify-center overflow-hidden">
        {resultImage ? (
          <img src={resultImage} alt="Enhanced" className="w-full h-full object-contain" />
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
            <p className="text-emerald-400 font-bold animate-pulse">NEURAL SCANNING...</p>
          </div>
        )}
      </div>

      {/* Tool Controls */}
      <div className="space-y-6">
        <CustomSlider 
          label="Enhancement Strength" 
          value={clarity} 
          onChange={setClarity} 
          unit="%"
        />
        
        <button 
          onClick={() => setIsModalOpen(true)}
          disabled={!sourceImage || isLoading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? "Processing..." : "Apply AI Restoration"}
        </button>
      </div>

      {/* Confirm Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Confirm Restoration"
      >
        <div className="space-y-4">
          <p className="text-zinc-400">
            This will use 1 of your 3 daily credits to enhance this image with <span className="text-emerald-400 font-bold">{clarity}%</span> intensity.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleApply}
              className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-500 transition-all"
            >
              Start Enhance
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FaceClarityTool;