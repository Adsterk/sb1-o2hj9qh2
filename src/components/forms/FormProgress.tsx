import React from 'react';
import { clsx } from 'clsx';

interface FormProgressProps {
  totalFields: number;
  completedFields: number;
  streak?: number;
}

export function FormProgress({ totalFields, completedFields, streak }: FormProgressProps) {
  const percentage = (completedFields / totalFields) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Form Progress ({completedFields}/{totalFields})
        </span>
        {streak && streak > 0 && (
          <span className="text-sm font-medium text-indigo-600">
            🔥 {streak} day streak!
          </span>
        )}
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500',
            percentage === 100 ? 'bg-green-500' : 'bg-indigo-600'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {percentage === 100 && (
        <p className="text-sm text-green-600 animate-pulse">
          ✨ Great job completing today's entry!
        </p>
      )}
    </div>
  );
}