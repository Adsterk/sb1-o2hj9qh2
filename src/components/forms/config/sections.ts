export const DEFAULT_SECTIONS = [
  {
    id: 'mood',
    title: 'How are you feeling?',
    description: 'Rate your overall mood for today',
    helpText: 'This helps track your emotional well-being over time',
  },
  {
    id: 'sleep',
    title: 'Sleep Duration',
    description: 'How many hours did you sleep?',
    helpText: 'Quality sleep is essential for mental health',
  },
  {
    id: 'activities',
    title: 'Daily Activities',
    description: 'What activities did you engage in today?',
    helpText: 'Track activities that influence your mood',
  },
  {
    id: 'behaviors',
    title: 'Behaviors',
    description: 'Track any challenging behaviors',
    helpText: 'Identifying patterns helps develop better coping strategies',
  },
] as const;

export type SectionId = typeof DEFAULT_SECTIONS[number]['id'];