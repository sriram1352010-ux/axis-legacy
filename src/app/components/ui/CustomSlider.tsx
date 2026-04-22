// src/components/ui/CustomSlider.tsx
import React from 'react';

interface CustomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  label, value, onChange, min = 0, max = 100, step = 1, unit = ''
}) => {
  return (
    <div className="mb-6 group">
      <div className="flex justify-between mb-2">
        <label className="text-zinc-400 text-sm font-medium tracking-wide uppercase">{label}</label>
        <span className="text-blue-400 font-mono font-bold drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer 
                   accent-blue-500 hover:accent-blue-400 transition-all
                   [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(59,130,246,0.8)]"
      />
    </div>
  );
};

export default CustomSlider;