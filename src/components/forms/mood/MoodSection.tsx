import React from 'react';
import { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { CustomSlider } from '../CustomSlider';
import type { MoodEntry } from '../../../types/mood';

interface MoodSectionProps {
  control: Control<MoodEntry>;
}

export function MoodSection({ control }: MoodSectionProps) {
  return (
    <Controller
      name="overallMood"
      control={control}
      render={({ field }) => (
        <CustomSlider
          value={field.value}
          onChange={field.onChange}
          min={1}
          max={10}
          step={1}
          style="gradient"
          labels={['Very Low', 'Low', 'Neutral', 'Good', 'Excellent']}
          showTooltip
          tooltipContent="Rate how you're feeling overall today"
        />
      )}
    />
  );
}