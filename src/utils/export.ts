import { format } from 'date-fns';
import type { MoodEntry } from '../types/mood';

export function generateCSV(entries: MoodEntry[]): string {
  const headers = [
    'Date',
    'Overall Mood',
    'Sleep Hours',
    'Medications',
    'Hobbies',
    'Problematic Behaviors',
    'Coping Skills',
    'Notes'
  ].join(',');

  const rows = entries.map(entry => {
    return [
      format(new Date(entry.date), 'yyyy-MM-dd'),
      entry.overallMood,
      entry.sleepHours,
      `"${entry.medications.join('; ')}"`,
      `"${entry.hobbies.join('; ')}"`,
      `"${entry.problematicBehaviors.join('; ')}"`,
      `"${entry.copingSkills.join('; ')}"`,
      `"${entry.notes.replace(/"/g, '""')}"`
    ].join(',');
  });

  return [headers, ...rows].join('\n');
}

export function downloadCSV(data: string, filename: string) {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function shareViaWhatsApp(entries: MoodEntry[]) {
  const lastEntry = entries[entries.length - 1];
  if (!lastEntry) return;

  const message = `Mood Tracker Update (${format(new Date(lastEntry.date), 'PPP')})\n\n` +
    `Mood: ${lastEntry.overallMood}/5\n` +
    `Sleep: ${lastEntry.sleepHours} hours\n` +
    (lastEntry.hobbies.length ? `Activities: ${lastEntry.hobbies.join(', ')}\n` : '') +
    (lastEntry.copingSkills.length ? `Coping Skills: ${lastEntry.copingSkills.join(', ')}\n` : '') +
    (lastEntry.notes ? `\nNotes: ${lastEntry.notes}` : '');

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
}