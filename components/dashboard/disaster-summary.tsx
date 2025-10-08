'use client';

import { Activity, Users, DollarSign, AlertTriangle } from 'lucide-react';
import { DisasterData } from '@/lib/api/emergency-data';
import DataSourceBadge from './data-source-badge';

interface DisasterSummaryProps {
  disasters: DisasterData[];
}

export default function DisasterSummary({ disasters }: DisasterSummaryProps) {
  const activeDisasters = disasters.filter(d => d.status === 'Active').length;
  const totalDisasters = disasters.length;

  const stats = [
    {
      label: 'Active Disasters',
      value: activeDisasters,
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-100',
    },
    {
      label: 'Total Declarations',
      value: totalDisasters,
      icon: Activity,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-4 rounded-full`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">FEMA Disaster Declarations</h2>
            <DataSourceBadge source="real" apiName="FEMA" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Title</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {disasters.map((disaster) => (
                <tr key={disaster.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">{disaster.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{disaster.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{disaster.incidentType}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {new Date(disaster.declaredDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        disaster.status === 'Active'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {disaster.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
