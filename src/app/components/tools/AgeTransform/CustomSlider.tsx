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
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-gray-400">{min}</span>
        <span className="text-lg font-bold text-neon.blue">{value}</span>
        <span className="text-gray-400">{max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon.blue"
      />
    </div>
  );
}
