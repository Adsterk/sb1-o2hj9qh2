import type { MoodEntry } from '../types/mood';
import { format } from 'date-fns';

const SHEET_HEADERS = [
  'Date',
  'Overall Mood',
  'Sleep Hours',
  'Medications',
  'Hobbies',
  'Problematic Behaviors',
  'Coping Skills',
  'Notes',
  'Last Updated'
];

export class GoogleSheetsService {
  private spreadsheetId: string | null = null;
  private gapiInitialized: boolean = false;

  constructor(private accessToken: string) {}

  private async initializeGapi(): Promise<void> {
    if (this.gapiInitialized) return;

    await new Promise<void>((resolve) => {
      gapi.load('client', async () => {
        await gapi.client.init({});
        await gapi.client.load('sheets', 'v4');
        gapi.client.setToken({ access_token: this.accessToken });
        this.gapiInitialized = true;
        resolve();
      });
    });
  }

  async initializeSpreadsheet(title: string = 'Mood Tracker Data'): Promise<string> {
    await this.initializeGapi();

    if (this.spreadsheetId) return this.spreadsheetId;

    const response = await gapi.client.sheets.spreadsheets.create({
      resource: {
        properties: {
          title,
        },
        sheets: [
          {
            properties: {
              title: 'Mood Entries',
              gridProperties: {
                frozenRowCount: 1,
              },
            },
          },
        ],
      },
    });

    this.spreadsheetId = response.result.spreadsheetId;
    
    // Initialize headers
    await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: 'A1:I1',
      valueInputOption: 'RAW',
      resource: {
        values: [SHEET_HEADERS],
      },
    });

    return this.spreadsheetId;
  }

  async syncEntry(entry: MoodEntry): Promise<void> {
    if (!this.spreadsheetId) {
      throw new Error('Spreadsheet not initialized');
    }

    await this.initializeGapi();

    const values = [
      format(new Date(entry.date), 'yyyy-MM-dd'),
      entry.overallMood,
      entry.sleepHours,
      entry.medications.join(', '),
      entry.hobbies.join(', '),
      entry.problematicBehaviors.join(', '),
      entry.copingSkills.join(', '),
      entry.notes,
      format(new Date(entry.lastUpdated), 'yyyy-MM-dd HH:mm:ss'),
    ];

    await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: 'A2:I2',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [values],
      },
    });
  }

  async getAllEntries(): Promise<MoodEntry[]> {
    if (!this.spreadsheetId) {
      throw new Error('Spreadsheet not initialized');
    }

    await this.initializeGapi();

    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'A2:I',
    });

    const rows = response.result.values || [];
    
    return rows.map((row: any[]) => ({
      id: Date.now().toString(), // Generate a temporary ID
      date: new Date(row[0]),
      overallMood: Number(row[1]),
      sleepHours: Number(row[2]),
      medications: row[3] ? row[3].split(', ') : [],
      hobbies: row[4] ? row[4].split(', ') : [],
      problematicBehaviors: row[5] ? row[5].split(', ') : [],
      copingSkills: row[6] ? row[6].split(', ') : [],
      notes: row[7] || '',
      lastUpdated: new Date(row[8]),
    }));
  }
}