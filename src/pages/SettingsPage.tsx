import React from 'react';
import { useMoodStore } from '../store/useMoodStore';
import { ProfileSection } from '../components/settings/ProfileSection';
import { NotificationSection } from '../components/settings/NotificationSection';
import { CustomFieldsSection } from '../components/settings/CustomFieldsSection';
import { ThemeSection } from '../components/settings/ThemeSection';
import { GoogleSheetsSection } from '../components/settings/GoogleSheetsSection';
import type { UserPreferences } from '../types/mood';

export function SettingsPage() {
  const { preferences, updatePreferences } = useMoodStore();

  const handleProfileUpdate = (data: Pick<UserPreferences, 'name' | 'email'>) => {
    updatePreferences(data);
  };

  const handleNotificationUpdate = (data: Pick<UserPreferences, 'notificationsEnabled' | 'notificationTime'>) => {
    updatePreferences(data);
  };

  const handleCustomFieldsUpdate = (customFields: UserPreferences['customFields']) => {
    updatePreferences({ customFields });
  };

  const handleThemeUpdate = (theme: UserPreferences['theme']) => {
    updatePreferences({ theme });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white shadow rounded-lg divide-y">
        <div className="p-6">
          <ProfileSection
            name={preferences.name}
            email={preferences.email}
            onSave={handleProfileUpdate}
          />
        </div>

        <div className="p-6">
          <NotificationSection
            enabled={preferences.notificationsEnabled}
            time={preferences.notificationTime}
            onUpdate={handleNotificationUpdate}
          />
        </div>

        <div className="p-6">
          <GoogleSheetsSection />
        </div>

        <div className="p-6">
          <CustomFieldsSection
            fields={preferences.customFields}
            onUpdate={handleCustomFieldsUpdate}
          />
        </div>

        <div className="p-6">
          <ThemeSection
            theme={preferences.theme}
            onUpdate={handleThemeUpdate}
          />
        </div>
      </div>
    </div>
  );
}