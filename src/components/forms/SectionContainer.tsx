import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Info, GripVertical } from 'lucide-react';
import { clsx } from 'clsx';

interface SectionContainerProps {
  id: string;
  title: string;
  description?: string;
  helpText?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionContainer({
  id,
  title,
  description,
  helpText,
  className,
  children,
}: SectionContainerProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'bg-white rounded-lg shadow-sm border border-gray-200 p-4',
        isDragging && 'shadow-lg',
        className
      )}
      {...attributes}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center">
            <button
              type="button"
              className="mr-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
              {...listeners}
            >
              <GripVertical className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {helpText && (
              <div className="relative group ml-2">
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-sm rounded px-2 py-1 max-w-xs">
                    {helpText}
                  </div>
                </div>
              </div>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}