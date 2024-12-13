import React from 'react';
import { clsx } from 'clsx';

interface CheckboxGroupProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export function CheckboxGroup({
  options,
  selected,
  onChange,
  className
}: CheckboxGroupProps) {
  const toggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className={clsx('flex flex-wrap gap-2', className)}>
      {options.map((option) => (
        <label
          key={option}
          className={clsx(
            'inline-flex items-center px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer',
            'hover:border-indigo-300 hover:bg-indigo-50',
            selected.includes(option)
              ? 'bg-indigo-100 border-indigo-500 text-indigo-800'
              : 'bg-white border-gray-300 text-gray-700'
          )}
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggleOption(option)}
            className="sr-only"
          />
          <span className="text-sm font-medium">
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}