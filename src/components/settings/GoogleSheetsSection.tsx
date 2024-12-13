import React from 'react';
import { Table, Cloud, RefreshCw } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleSheetsStore } from '../../store/useGoogleSheetsStore';
import { useMoodStore } from '../../store/useMoodStore';

export function GoogleSheetsSection() {
  const { isConnected, error, initialize, disconnect } = useGoogleSheetsStore();
  const { isSyncing, syncError, syncWithGoogleSheets } = useMoodStore();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await initialize(tokenResponse.access_token);
        await syncWithGoogleSheets();
      } catch (err) {
        console.error('Failed to initialize Google Sheets:', err);
      }
    },
    scope: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const handleSync = async () => {
    if (!isSyncing) {
      await syncWithGoogleSheets();
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2">
        <Table className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-medium text-gray-900">Google Sheets Sync</h2>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-900">
              {isConnected ? 'Connected to Google Sheets' : 'Connect to Google Sheets'}
            </h3>
            <p className="text-sm text-gray-500">
              {isConnected
                ? 'Your mood entries are being synced automatically'
                : 'Sync your mood entries with Google Sheets'}
            </p>
          </div>
          
          {(error || syncError) && (
            <p className="text-sm text-red-600">{error || syncError}</p>
          )}

          <div className="flex items-center space-x-2">
            {isConnected && (
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                Sync Now
              </button>
            )}
            
            <button
              onClick={isConnected ? disconnect : () => login()}
              className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                isConnected
                  ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <Cloud className="h-4 w-4 mr-2" />
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>

        {isConnected && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Sync Status</h4>
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${isSyncing ? 'bg-yellow-400' : 'bg-green-400'}`} />
              <span className="text-sm text-gray-600">
                {isSyncing ? 'Syncing...' : 'Syncing enabled'}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}