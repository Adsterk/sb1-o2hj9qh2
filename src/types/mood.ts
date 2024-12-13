export interface MoodEntry {
  id: string;
  date: Date;
  overallMood: number;
  sleepHours: number;
  medications: string[];
  hobbies: string[];
  problematicBehaviors: string[];
  copingSkills: string[];
  notes: string;
  lastUpdated: Date;
}

export interface UserPreferences {
  name: string;
  email: string;
  notificationsEnabled: boolean;
  notificationTime: string;
  customFields: CustomField[];
  theme: 'light' | 'dark';
}

export interface CustomField {
  id: string;
  label: string;
  type: 'number' | 'text' | 'multiselect';
  options?: string[];
  required: boolean;
}