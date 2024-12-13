import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, BarChart2, PlusCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BarChart2 className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">MoodTracker</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/new-entry"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              New Entry
            </Link>
            <Link
              to="/settings"
              className="text-gray-500 hover:text-gray-700"
            >
              <Settings className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}