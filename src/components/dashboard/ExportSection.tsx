import React from 'react';
import { Download, Share2 } from 'lucide-react';
import type { MoodEntry } from '../../types/mood';
import { generateCSV, downloadCSV, shareViaWhatsApp } from '../../utils/export';

interface ExportSectionProps {
  entries: MoodEntry[];
}

export function ExportSection({ entries }: ExportSectionProps) {
  const handleCSVExport = () => {
    const csv = generateCSV(entries);
    const filename = `mood-tracker-export-${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(csv, filename);
  };

  const handleWhatsAppShare = () => {
    shareViaWhatsApp(entries);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Export & Share</h2>
      <div className="space-y-4">
        <button
          onClick={handleCSVExport}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Download className="h-4 w-4 mr-2" />
          Export as CSV
        </button>
        
        <button
          onClick={handleWhatsAppShare}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share via WhatsApp
        </button>
      </div>
    </div>
  );
}