import React from 'react';

interface MoodSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function MoodSlider({ value, onChange }: MoodSliderProps) {
  const emojis = ['😢', '😕', '😐', '🙂', '😊'];
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between px-2">
        {emojis.map((emoji, index) => (
          <span key={index} className="text-2xl">
            {emoji}
          </span>
        ))}
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
}