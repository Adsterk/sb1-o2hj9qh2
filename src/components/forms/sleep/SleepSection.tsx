import React from 'react';
import { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { CustomSlider } from '../CustomSlider';
import type { MoodEntry } from '../../../types/mood';

interface SleepSectionProps {
  control: Control<MoodEntry>;
}

export function SleepSection({ control }: SleepSectionProps) {
  return (
    <Controller
      name="sleepHours"
      control={control}
      render={({ field }) => (
        <CustomSlider
          value={field.value}
          onChange={field.onChange}
          min={0}
          max={12}
          step={0.5}
          style="segments"
          labels={['0h', '4h', '8h', '12h']}
          showTooltip
          tooltipContent="Track your sleep duration"
        />
      )}
    />
  );
}