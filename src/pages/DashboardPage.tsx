import React from 'react';
import { Brain, Moon, Activity, Calendar } from 'lucide-react';
import { useMoodStore } from '../store/useMoodStore';
import { MoodChart } from '../components/dashboard/MoodChart';
import { StatsCard } from '../components/dashboard/StatsCard';
import { ActivityList } from '../components/dashboard/ActivityList';
import { ExportSection } from '../components/dashboard/ExportSection';
import { calculateWeeklyStats } from '../utils/stats';

export function DashboardPage() {
  const entries = useMoodStore((state) => state.entries);
  const stats = calculateWeeklyStats(entries);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Weekly Average Mood"
          value={stats.averageMood}
          icon={<Brain className="h-6 w-6 text-indigo-600" />}
        />
        <StatsCard
          title="Average Sleep"
          value={`${stats.averageSleep}h`}
          icon={<Moon className="h-6 w-6 text-indigo-600" />}
        />
        <StatsCard
          title="Activities Tracked"
          value={stats.topActivities.length}
          icon={<Activity className="h-6 w-6 text-indigo-600" />}
        />
        <StatsCard
          title="Entries This Week"
          value={stats.entryCount}
          icon={<Calendar className="h-6 w-6 text-indigo-600" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Mood & Sleep Trends</h2>
          <MoodChart entries={entries} />
        </div>
        <ExportSection entries={entries} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <ActivityList
            title="Top Activities"
            items={stats.topActivities}
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <ActivityList
            title="Recent Coping Skills"
            items={entries.slice(-3).flatMap(entry => entry.copingSkills)}
          />
        </div>
      </div>
    </div>
  );
}