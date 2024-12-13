import React from 'react';
import { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { CheckboxGroup } from '../CheckboxGroup';
import type { MoodEntry } from '../../../types/mood';

interface BehaviorSectionProps {
  control: Control<MoodEntry>;
}

const BEHAVIOR_OPTIONS = [
  'Procrastination', 'Stress Eating', 'Social Withdrawal',
  'Excessive Worrying', 'Poor Sleep Habits'
];

export function BehaviorSection({ control }: BehaviorSectionProps) {
  return (
    <Controller
      name="problematicBehaviors"
      control={control}
      render={({ field }) => (
        <CheckboxGroup
          options={BEHAVIOR_OPTIONS}
          selected={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}