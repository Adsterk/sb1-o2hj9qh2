import { create } from 'zustand';
import { GoogleSheetsService } from '../utils/googleSheets';

interface GoogleSheetsStore {
  service: GoogleSheetsService | null;
  spreadsheetId: string | null;
  isConnected: boolean;
  error: string | null;
  initialize: (token: string) => Promise<void>;
  disconnect: () => void;
}

export const useGoogleSheetsStore = create<GoogleSheetsStore>((set) => ({
  service: null,
  spreadsheetId: null,
  isConnected: false,
  error: null,
  initialize: async (token: string) => {
    try {
      const service = new GoogleSheetsService(token);
      const spreadsheetId = await service.initializeSpreadsheet();
      
      set({
        service,
        spreadsheetId,
        isConnected: true,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to initialize Google Sheets',
        isConnected: false,
      });
    }
  },
  disconnect: () => {
    set({
      service: null,
      spreadsheetId: null,
      isConnected: false,
      error: null,
    });
  },
}));