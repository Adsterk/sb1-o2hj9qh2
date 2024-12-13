import React from 'react';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export function StatsCard({ title, value, icon, trend, className }: StatsCardProps) {
  return (
    <div className={clsx('bg-white rounded-lg shadow p-6', className)}>
      <div className="flex items-center">
        <div className="p-2 bg-indigo-50 rounded-lg">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {trend && (
              <p className={clsx(
                'ml-2 text-sm',
                trend.value >= 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
                <span className="text-gray-500"> {trend.label}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}