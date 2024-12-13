import { MoodEntry } from '../types/mood';
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

export function calculateWeeklyStats(entries: MoodEntry[]) {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);

  const thisWeekEntries = entries.filter((entry) =>
    isWithinInterval(new Date(entry.date), { start: weekStart, end: weekEnd })
  );

  const averageMood = thisWeekEntries.length
    ? thisWeekEntries.reduce((sum, entry) => sum + entry.overallMood, 0) /
      thisWeekEntries.length
    : 0;

  const averageSleep = thisWeekEntries.length
    ? thisWeekEntries.reduce((sum, entry) => sum + entry.sleepHours, 0) /
      thisWeekEntries.length
    : 0;

  const allActivities = thisWeekEntries.flatMap((entry) => entry.hobbies);
  const activityFrequency = allActivities.reduce((acc, activity) => {
    acc[activity] = (acc[activity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topActivities = Object.entries(activityFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([activity]) => activity);

  return {
    averageMood: averageMood.toFixed(1),
    averageSleep: averageSleep.toFixed(1),
    topActivities,
    entryCount: thisWeekEntries.length,
  };
}