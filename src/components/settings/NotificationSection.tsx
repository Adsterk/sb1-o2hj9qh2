import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationSectionProps {
  enabled: boolean;
  time: string;
  onUpdate: (data: { enabled: boolean; time: string }) => void;
}

export function NotificationSection({ enabled, time, onUpdate }: NotificationSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2">
        <Bell className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications-enabled"
            checked={enabled}
            onChange={(e) => onUpdate({ enabled: e.target.checked, time })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="notifications-enabled" className="ml-2 block text-sm text-gray-900">
            Enable daily reminders
          </label>
        </div>

        <div>
          <label htmlFor="notification-time" className="block text-sm font-medium text-gray-700">
            Reminder Time
          </label>
          <input
            type="time"
            id="notification-time"
            value={time}
            onChange={(e) => onUpdate({ enabled, time: e.target.value })}
            disabled={!enabled}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      </div>
    </section>
  );
}