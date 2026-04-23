"use client";

import { useState } from "react";

interface CustomSliderProps {
  min: number;
  max: number;
  defaultValue: number;
  onChange: (value: number) => void;
}

export default function CustomSlider({ min, max, defaultValue, onChange }: CustomSliderProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full py-4">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        /* THICK SLIDER FOR MOBILE FINGERS */
        className="w-full h-4 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-400 transition-all shadow-inner"
        style={{
          WebkitAppearance: 'none',
        }}
      />
      <div className="flex justify-between mt-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
        <span>Birth ({min})</span>
        <span>Centennial ({max})</span>
      </div>
    </div>
  );
}
