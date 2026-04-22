"use client";

import { useState } from "react";
import { processColorize } from './DeOldifyService';

export default function ColorizePage() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!image) return;
    
    setLoading(true);
    try {
      const processedImage = await processColorize(image);
      setResult(processedImage);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Colorize Tool</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          
          {image && (
            <div className="mb-6">
              <img src={image} alt="Original" className="mx-auto max-h-96 object-contain rounded" />
            </div>
          )}
          
          <button
            onClick={handleProcess}
            disabled={!image || loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : "Colorize Image"}
          </button>
        </div>
        
        {result && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Result</h2>
            <img src={result} alt="Processed" className="mx-auto max-h-96 object-contain rounded" />
          </div>
        )}
      </div>
    </div>
  );
}
