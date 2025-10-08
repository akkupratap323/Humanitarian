'use client';

import { Database, Activity, TrendingUp } from 'lucide-react';

interface DataSourceBadgeProps {
  source: 'real' | 'estimated' | 'calculated';
  apiName?: string;
  className?: string;
}

export default function DataSourceBadge({ source, apiName, className = '' }: DataSourceBadgeProps) {
  const configs = {
    real: {
      icon: Database,
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      label: 'Real-Time Data',
    },
    estimated: {
      icon: TrendingUp,
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      label: 'Estimated',
    },
    calculated: {
      icon: Activity,
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300',
      label: 'Calculated',
    },
  };

  const config = configs[source];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border ${config.bg} ${config.text} ${config.border} ${className}`}>
      <Icon className="h-3 w-3" />
      <span className="text-xs font-medium">{config.label}</span>
      {apiName && (
        <span className="text-xs opacity-75">({apiName})</span>
      )}
    </div>
  );
}
