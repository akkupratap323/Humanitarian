'use client';

import { AlertTriangle, Calendar, MapPin, Users, DollarSign, ExternalLink, Info, FileText, Navigation } from 'lucide-react';
import { FEMADisaster } from '@/lib/api/emergency-data';
import DataSourceBadge from '../data-source-badge';

interface DisastersTabProps {
  data: FEMADisaster[];
}

export default function DisastersTab({ data }: DisastersTabProps) {
  const activeDisasters = data.filter(d => d.declarationDate && new Date(d.declarationDate).getFullYear() >= new Date().getFullYear() - 1);
  const totalAffected = data.reduce((sum, d) => sum + (d.estimatedAffected || 0), 0);

  // Group by disaster type
  const disastersByType = data.reduce((acc, d) => {
    acc[d.incidentType] = (acc[d.incidentType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Disasters</p>
              <p className="text-3xl font-bold text-gray-900">{data.length}</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recent (Last Year)</p>
              <p className="text-3xl font-bold text-orange-600">{activeDisasters.length}</p>
            </div>
            <Calendar className="h-12 w-12 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">People Affected</p>
              <p className="text-3xl font-bold text-purple-600">{totalAffected.toLocaleString()}</p>
            </div>
            <Users className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Disaster Types</p>
              <p className="text-3xl font-bold text-blue-600">{Object.keys(disastersByType).length}</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Disaster Type Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Disaster Types</h2>
          <DataSourceBadge source="real" apiName="FEMA" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(disastersByType)
            .sort(([, a], [, b]) => b - a)
            .map(([type, count]) => (
              <div key={type} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-red-600">{count}</p>
                <p className="text-xs text-gray-700 mt-1 font-medium">{type}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Disaster List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Disaster Declarations</h2>

        <div className="space-y-4">
          {data.map((disaster) => {
            const severityColor =
              disaster.severity === 'Major' || disaster.severity === 'Emergency'
                ? 'red'
                : disaster.severity === 'Moderate'
                ? 'orange'
                : 'yellow';

            return (
              <div
                key={disaster.id}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{disaster.title}</h3>
                      <span
                        className={`bg-${severityColor}-100 text-${severityColor}-800 px-3 py-1 rounded-full text-xs font-semibold`}
                        style={{
                          backgroundColor: severityColor === 'red' ? '#fee2e2' : severityColor === 'orange' ? '#ffedd5' : '#fef3c7',
                          color: severityColor === 'red' ? '#991b1b' : severityColor === 'orange' ? '#9a3412' : '#854d0e',
                        }}
                      >
                        {disaster.severity}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {disaster.incidentType}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {disaster.designatedArea}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {disaster.declarationDate ? new Date(disaster.declarationDate).toLocaleDateString() : 'N/A'}
                      </span>
                      {disaster.estimatedAffected && (
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {disaster.estimatedAffected.toLocaleString()} affected
                        </span>
                      )}
                    </div>

                    {disaster.description && (
                      <p className="text-sm text-gray-700 mb-3">{disaster.description}</p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {disaster.programAreas && disaster.programAreas.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {disaster.programAreas.map((program, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {program}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  {/* Financial Information */}
                  {disaster.totalObligated && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="bg-green-50 rounded p-3">
                        <p className="text-xs text-green-600 mb-1">Total Funds Obligated</p>
                        <p className="text-lg font-bold text-green-700">${disaster.totalObligated.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-50 rounded p-3">
                        <p className="text-xs text-blue-600 mb-1">Declaration Type</p>
                        <p className="text-lg font-bold text-blue-700">{disaster.severity || 'Major Disaster'}</p>
                      </div>
                    </div>
                  )}

                  {/* Resource Links */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {disaster.femaUrl && (
                      <a
                        href={disaster.femaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on FEMA
                      </a>
                    )}
                    <a
                      href={`https://www.disasterassistance.gov/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      <Info className="h-4 w-4" />
                      Apply for Assistance
                    </a>
                    <a
                      href={`https://www.fema.gov/disaster-recovery-centers`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 transition-colors"
                    >
                      <Navigation className="h-4 w-4" />
                      Find Recovery Center
                    </a>
                    <a
                      href={`https://www.fema.gov/about/news-multimedia`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      Latest Updates
                    </a>
                  </div>

                  {/* Additional Details */}
                  <div className="p-3 bg-orange-50 rounded">
                    <p className="text-xs text-orange-900">
                      <strong>Incident Type:</strong> {disaster.incidentType} |
                      <strong className="ml-2">Affected Area:</strong> {disaster.designatedArea} |
                      <strong className="ml-2">Date:</strong> {disaster.declarationDate ? new Date(disaster.declarationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                    </p>
                    {disaster.estimatedAffected && (
                      <p className="text-xs text-orange-900 mt-1">
                        <strong>People Affected:</strong> Approximately {disaster.estimatedAffected.toLocaleString()} individuals
                      </p>
                    )}
                    {disaster.programAreas && disaster.programAreas.length > 0 && (
                      <p className="text-xs text-orange-900 mt-1">
                        <strong>Available Programs:</strong> {disaster.programAreas.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {data.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No disaster declarations found for this location</p>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">About Disaster Declarations</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• <strong>Major Disaster:</strong> Any natural catastrophe that causes damage of sufficient severity to warrant federal assistance</p>
          <p>• <strong>Emergency Declaration:</strong> Federal assistance needed to supplement state/local efforts to save lives and protect property</p>
          <p>• <strong>Program Areas:</strong> Include Individual Assistance (IA), Public Assistance (PA), and Hazard Mitigation (HM)</p>
          <p>• <strong>Data Source:</strong> Real-time data from FEMA's OpenFEMA API with historical disaster declarations</p>
        </div>
      </div>
    </div>
  );
}
