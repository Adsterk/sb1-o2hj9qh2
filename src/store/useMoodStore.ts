import { create } from 'zustand';
import type { MoodEntry, UserPreferences } from '../types/mood';
import { useGoogleSheetsStore } from './useGoogleSheetsStore';

interface MoodStore {
  entries: MoodEntry[];
  preferences: UserPreferences;
  isSyncing: boolean;
  syncError: string | null;
  addEntry: (entry: MoodEntry) => Promise<void>;
  updateEntry: (id: string, entry: Partial<MoodEntry>) => Promise<void>;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  syncWithGoogleSheets: () => Promise<void>;
}

export const useMoodStore = create<MoodStore>((set, get) => ({
  entries: [],
  preferences: {
    name: '',
    email: '',
    notificationsEnabled: true,
    notificationTime: '20:00',
    customFields: [],
    theme: 'light',
  },
  isSyncing: false,
  syncError: null,

  addEntry: async (entry) => {
    set((state) => ({
      entries: [...state.entries, entry],
      isSyncing: true,
      syncError: null,
    }));

    try {
      const sheetsStore = useGoogleSheetsStore.getState();
      if (sheetsStore.isConnected && sheetsStore.service) {
        await sheetsStore.service.syncEntry(entry);
      }
    } catch (error) {
      set({ syncError: error instanceof Error ? error.message : 'Failed to sync entry' });
    } finally {
      set({ isSyncing: false });
    }
  },

  updateEntry: async (id, updatedEntry) => {
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      ),
      isSyncing: true,
      syncError: null,
    }));

    try {
      const sheetsStore = useGoogleSheetsStore.getState();
      if (sheetsStore.isConnected && sheetsStore.service) {
        const fullEntry = get().entries.find((e) => e.id === id);
        if (fullEntry) {
          await sheetsStore.service.syncEntry(fullEntry);
        }
      }
    } catch (error) {
      set({ syncError: error instanceof Error ? error.message : 'Failed to sync entry' });
    } finally {
      set({ isSyncing: false });
    }
  },

  updatePreferences: (prefs) =>
    set((state) => ({
      preferences: { ...state.preferences, ...prefs },
    })),

  syncWithGoogleSheets: async () => {
    const sheetsStore = useGoogleSheetsStore.getState();
    if (!sheetsStore.isConnected || !sheetsStore.service) {
      return;
    }

    set({ isSyncing: true, syncError: null });

    try {
      const entries = await sheetsStore.service.getAllEntries();
      set({ entries });
    } catch (error) {
      set({ syncError: error instanceof Error ? error.message : 'Failed to sync with Google Sheets' });
    } finally {
      set({ isSyncing: false });
    }
  },
}));