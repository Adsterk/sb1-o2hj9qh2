import React from 'react';
import { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { CheckboxGroup } from '../CheckboxGroup';
import type { MoodEntry } from '../../../types/mood';

interface ActivitySectionProps {
  control: Control<MoodEntry>;
}

const ACTIVITY_OPTIONS = [
  'Exercise', 'Reading', 'Meditation', 'Socializing', 'Work',
  'Hobbies', 'Entertainment', 'Outdoor Activities', 'Learning'
];

export function ActivitySection({ control }: ActivitySectionProps) {
  return (
    <Controller
      name="hobbies"
      control={control}
      render={({ field }) => (
        <CheckboxGroup
          options={ACTIVITY_OPTIONS}
          selected={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}