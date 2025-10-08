'use client';

import { AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react';
import { WeatherAlert } from '@/lib/api/emergency-data';
import { formatDistanceToNow } from 'date-fns';
import DataSourceBadge from './data-source-badge';

interface AlertsPanelProps {
  alerts: WeatherAlert[];
}

const severityConfig = {
  Extreme: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', icon: AlertTriangle },
  Severe: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', icon: AlertCircle },
  Moderate: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', icon: AlertCircle },
  Minor: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', icon: Info },
};

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Active Alerts</h2>
        <div className="text-center py-8">
          <Info className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">No active alerts for this location</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">Active Alerts</h2>
          <DataSourceBadge source="real" apiName="NOAA" />
        </div>
        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
          {alerts.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className={`${config.bg} ${config.border} border-l-4 rounded-r-lg p-4`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-6 w-6 ${config.text} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`font-semibold ${config.text}`}>{alert.event}</h3>
                    <span className={`text-xs ${config.text} px-2 py-1 rounded bg-white/50`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className={`text-sm ${config.text} mb-2`}>{alert.headline}</p>
                  <p className={`text-sm ${config.text} opacity-90 mb-3`}>
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className={config.text}>
                        Expires {formatDistanceToNow(new Date(alert.expires), { addSuffix: true })}
                      </span>
                    </div>
                    {alert.areas.length > 0 && (
                      <span className={config.text}>
                        Areas: {alert.areas.slice(0, 2).join(', ')}
                        {alert.areas.length > 2 && ` +${alert.areas.length - 2} more`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
