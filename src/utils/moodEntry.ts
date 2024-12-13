import { MoodEntry } from '../types/mood';

export function createEmptyMoodEntry(): Omit<MoodEntry, 'id'> {
  return {
    date: new Date(),
    overallMood: 3,
    sleepHours: 8,
    medications: [],
    hobbies: [],
    problematicBehaviors: [],
    copingSkills: [],
    notes: '',
    lastUpdated: new Date(),
  };
}

export function generateEntryId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}