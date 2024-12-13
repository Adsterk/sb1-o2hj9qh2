import React from 'react';

interface ActivityListProps {
  title: string;
  items: string[];
  className?: string;
}

export function ActivityList({ title, items, className }: ActivityListProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 text-gray-700"
            >
              <span className="w-2 h-2 bg-indigo-400 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No items recorded</p>
      )}
    </div>
  );
}