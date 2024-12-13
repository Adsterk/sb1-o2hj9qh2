import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMoodStore } from '../store/useMoodStore';
import { FormProgress } from '../components/forms/FormProgress';
import { SectionContainer } from '../components/forms/SectionContainer';
import { MoodSection } from '../components/forms/mood/MoodSection';
import { SleepSection } from '../components/forms/sleep/SleepSection';
import { ActivitySection } from '../components/forms/activities/ActivitySection';
import { BehaviorSection } from '../components/forms/behaviors/BehaviorSection';
import { useSectionOrder } from '../components/forms/hooks/useSectionOrder';
import { createEmptyMoodEntry, generateEntryId } from '../utils/moodEntry';
import type { MoodEntry } from '../types/mood';

export function NewEntryPage() {
  const navigate = useNavigate();
  const { preferences, addEntry } = useMoodStore();
  const { sections, handleDragEnd } = useSectionOrder();
  const defaultValues = createEmptyMoodEntry();
  
  const { control, handleSubmit, watch } = useForm({
    defaultValues,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const formValues = watch();
  const completedFields = Object.values(formValues).filter(Boolean).length;
  const totalFields = Object.keys(defaultValues).length;

  const onSubmit = async (data: Omit<MoodEntry, 'id'>) => {
    const entry: MoodEntry = {
      ...data,
      id: generateEntryId(),
      lastUpdated: new Date(),
    };
    await addEntry(entry);
    navigate('/');
  };

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case 'mood':
        return <MoodSection control={control} />;
      case 'sleep':
        return <SleepSection control={control} />;
      case 'activities':
        return <ActivitySection control={control} />;
      case 'behaviors':
        return <BehaviorSection control={control} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Hello, {preferences.name || 'there'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Let's track your day and see how you're doing.
        </p>
        <FormProgress
          totalFields={totalFields}
          completedFields={completedFields}
          streak={7}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <SectionContainer
                key={section.id}
                id={section.id}
                title={section.title}
                description={section.description}
                helpText={section.helpText}
              >
                {renderSectionContent(section.id)}
              </SectionContainer>
            ))}
          </SortableContext>
        </DndContext>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
}