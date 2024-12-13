import React from 'react';
import { clsx } from 'clsx';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 0.5,
  className,
}: NumberInputProps) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className={clsx(
        'block w-full rounded-md border-gray-300 shadow-sm',
        'focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
        className
      )}
    />
  );
}