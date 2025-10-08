'use client';

import { Activity, MapPin, AlertTriangle } from 'lucide-react';
import { EarthquakeData } from '@/lib/api/emergency-data';
import { formatDistanceToNow } from 'date-fns';

interface EarthquakePanelProps {
  earthquakes: EarthquakeData[];
}

const getMagnitudeColor = (magnitude: number) => {
  if (magnitude >= 7) return 'bg-red-600 text-white';
  if (magnitude >= 6) return 'bg-orange-500 text-white';
  if (magnitude >= 5) return 'bg-yellow-500 text-white';
  if (magnitude >= 4) return 'bg-blue-500 text-white';
  return 'bg-gray-500 text-white';
};

const getMagnitudeLabel = (magnitude: number) => {
  if (magnitude >= 7) return 'Major';
  if (magnitude >= 6) return 'Strong';
  if (magnitude >= 5) return 'Moderate';
  if (magnitude >= 4) return 'Light';
  return 'Minor';
};

export default function EarthquakePanel({ earthquakes }: EarthquakePanelProps) {
  if (earthquakes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-6 w-6 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-900">Recent Earthquakes</h2>
        </div>
        <div className="text-center py-8">
          <Activity className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">No significant earthquakes in the last 30 days</p>
          <p className="text-sm text-gray-500 mt-2">Showing earthquakes magnitude 2.5+ within 500km</p>
        </div>
      </div>
    );
  }

  const significantEarthquakes = earthquakes.filter(eq => eq.magnitude >= 4);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-900">Recent Earthquakes (30 Days)</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Total: {earthquakes.length}
          </span>
          {significantEarthquakes.length > 0 && (
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
              {significantEarthquakes.length} Significant (M4.0+)
            </span>
          )}
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Data Source:</strong> USGS Earthquake Hazards Program (Real-time)
        </p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {earthquakes.slice(0, 20).map((earthquake) => (
          <div
            key={earthquake.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center ${getMagnitudeColor(earthquake.magnitude)}`}>
                  <span className="text-2xl font-bold">{earthquake.magnitude.toFixed(1)}</span>
                  <span className="text-xs">{getMagnitudeLabel(earthquake.magnitude)}</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{earthquake.place}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {earthquake.lat.toFixed(4)}°, {earthquake.lon.toFixed(4)}°
                      </span>
                      <span>Depth: {earthquake.depth.toFixed(1)} km</span>
                    </div>
                  </div>
                  {earthquake.tsunami === 1 && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Tsunami
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(earthquake.time), { addSuffix: true })}
                  </span>
                  <div className="flex items-center gap-3">
                    {earthquake.felt && earthquake.felt > 0 && (
                      <span className="text-xs text-gray-600">
                        Felt by {earthquake.felt.toLocaleString()} people
                      </span>
                    )}
                    <a
                      href={earthquake.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      More Details →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {earthquakes.length > 20 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Showing 20 of {earthquakes.length} earthquakes
          </p>
        </div>
      )}
    </div>
  );
}
