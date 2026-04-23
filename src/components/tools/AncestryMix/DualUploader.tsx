"use client";

import { useState } from "react";

interface DualImageUploaderProps {
  onImagesUpload: (fatherImage: string, motherImage: string) => void;
}

export default function DualImageUploader({ onImagesUpload }: DualImageUploaderProps) {
  const [fatherImage, setFatherImage] = useState<string | null>(null);
  const [motherImage, setMotherImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'father' | 'mother') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        if (type === 'father') {
          setFatherImage(imageData);
        } else {
          setMotherImage(imageData);
        }
        // Call parent callback when both images are uploaded
        if (imageData && (type === 'father' ? motherImage : fatherImage)) {
          onImagesUpload(type === 'father' ? imageData : fatherImage!, type === 'mother' ? imageData : motherImage!);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium mb-2">Father Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'father')}
          className="hidden"
          id="father-upload"
        />
        <label htmlFor="father-upload" className="cursor-pointer">
          {fatherImage ? (
            <img src={fatherImage} alt="Father" className="mx-auto h-48 object-cover rounded" />
          ) : (
            <div className="text-gray-500">Click to upload</div>
          )}
        </label>
      </div>
      
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium mb-2">Mother Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'mother')}
          className="hidden"
          id="mother-upload"
        />
        <label htmlFor="mother-upload" className="cursor-pointer">
          {motherImage ? (
            <img src={motherImage} alt="Mother" className="mx-auto h-48 object-cover rounded" />
          ) : (
            <div className="text-gray-500">Click to upload</div>
          )}
        </label>
      </div>
    </div>
  );
}
