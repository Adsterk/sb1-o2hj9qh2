import React from 'react';
import { Moon, Sun } from 'lucide-react';
import type { UserPreferences } from '../../types/mood';

interface ThemeSectionProps {
  theme: UserPreferences['theme'];
  onUpdate: (theme: UserPreferences['theme']) => void;
}

export function ThemeSection({ theme, onUpdate }: ThemeSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Theme Preference</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onUpdate('light')}
          className={`p-4 border rounded-lg flex items-center space-x-2 ${
            theme === 'light'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Sun className="h-5 w-5" />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => onUpdate('dark')}
          className={`p-4 border rounded-lg flex items-center space-x-2 ${
            theme === 'dark'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Moon className="h-5 w-5" />
          <span>Dark</span>
        </button>
      </div>
    </section>
  );
}