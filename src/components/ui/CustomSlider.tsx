"use client";

import React, { useEffect } from 'react';

interface CustomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  defaultValue?: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  label, 
  value, 
  onChange, 
  defaultValue,
  min = 0, 
  max = 100, 
  step = 1, 
  unit = ''
}) => {
  
  useEffect(() => {
    if (defaultValue !== undefined && value === 0) {
      onChange(defaultValue);
    }
  }, [defaultValue, onChange, value]);

  // Logic to calculate progress percentage for the track styling
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6 group">
      <div className="flex justify-between items-end mb-3">
        <label className="text-zinc-500 text-[10px] font-black tracking-[0.3em] uppercase">
          {label}
        </label>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-white italic leading-none tracking-tighter">
            {value}
          </span>
          <span className="text-[10px] font-bold text-blue-500 uppercase">
            {unit}
          </span>
        </div>
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, #27272a ${percentage}%, #27272a 100%)`
          }}
          className="w-full h-[6px] rounded-full appearance-none cursor-pointer outline-none transition-all
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-5 
            [&::-webkit-slider-thumb]:h-5 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:border-[5px] 
            [&::-webkit-slider-thumb]:border-zinc-900
            [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(37,99,235,0.4)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            group-hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
        />
      </div>

      <div className="flex justify-between mt-3 px-1">
        <span className="text-[9px] font-bold text-zinc-700 tracking-widest">{min}{unit}</span>
        <span className="text-[9px] font-bold text-zinc-700 tracking-widest">{max}{unit}</span>
      </div>
    </div>
  );
};

export default CustomSlider;