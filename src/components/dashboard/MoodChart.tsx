import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import type { MoodEntry } from '../../types/mood';

interface MoodChartProps {
  entries: MoodEntry[];
  days?: number;
}

export function MoodChart({ entries, days = 7 }: MoodChartProps) {
  const data = entries
    .slice(-days)
    .map((entry) => ({
      date: format(new Date(entry.date), 'MMM dd'),
      mood: entry.overallMood,
      sleep: entry.sleepHours,
    }))
    .reverse();

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="mood"
            stroke="#8884d8"
            name="Mood"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="sleep"
            stroke="#82ca9d"
            name="Sleep (hours)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}