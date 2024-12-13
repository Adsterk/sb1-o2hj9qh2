import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { clsx } from 'clsx';

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
  showTooltip?: boolean;
  tooltipContent?: string;
  className?: string;
  style?: 'default' | 'gradient' | 'segments';
}

export function CustomSlider({
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  labels,
  showTooltip = false,
  tooltipContent,
  className,
  style = 'default'
}: CustomSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  React.useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className={clsx('space-y-4', className)}>
      {/* Current value display */}
      <div className="text-center">
        <span className="text-4xl font-bold text-gray-900">
          {value}{labels ? '' : style === 'segments' ? 'h 0m' : '/10'}
        </span>
      </div>

      <div className="relative pt-2">
        {/* Labels */}
        {labels && (
          <div className="absolute -top-6 left-0 right-0 flex justify-between">
            {labels.map((label, index) => (
              <span
                key={index}
                className={clsx(
                  'text-sm transform -translate-x-1/2',
                  index === Math.floor((value - min) / step) 
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-500'
                )}
                style={{ left: `${(index / (labels.length - 1)) * 100}%` }}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Slider track */}
        <div className="relative h-2">
          <div
            className={clsx(
              'absolute w-full h-full rounded-full',
              style === 'gradient'
                ? 'bg-gradient-to-r from-red-400 via-yellow-400 to-green-400'
                : 'bg-gray-200'
            )}
          />
          
          {/* Filled track */}
          {style !== 'gradient' && (
            <div
              className="absolute h-full bg-indigo-600 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          )}

          {/* Segments */}
          {style === 'segments' && (
            <div className="absolute top-0 w-full h-full flex justify-between px-1">
              {Array.from({ length: (max - min) / step + 1 }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(
                    'w-0.5 h-full rounded',
                    i * step + min <= value ? 'bg-indigo-600' : 'bg-gray-300'
                  )}
                />
              ))}
            </div>
          )}

          {/* Thumb */}
          <div
            className={clsx(
              'absolute top-1/2 w-4 h-4 -mt-2 -ml-2 rounded-full bg-white border-2 transition-shadow',
              isDragging ? 'shadow-lg border-indigo-600' : 'border-indigo-500',
              'cursor-pointer'
            )}
            style={{ left: `${percentage}%` }}
          />
        </div>

        {/* Hidden input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={handleMouseDown}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Tooltip */}
      {showTooltip && tooltipContent && (
        <div className="relative group">
          <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
            <div className="bg-gray-900 text-white text-sm rounded px-2 py-1 max-w-xs">
              {tooltipContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}