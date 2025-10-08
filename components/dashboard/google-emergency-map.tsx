'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';

interface EmergencyMapProps {
  lat: number;
  lon: number;
  cityName: string;
  alerts: any[];
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Extreme':
      return '#dc2626'; // red-600
    case 'Severe':
      return '#ea580c'; // orange-600
    case 'Moderate':
      return '#ca8a04'; // yellow-600
    default:
      return '#0284c7'; // blue-600
  }
};

export default function GoogleEmergencyMap({ lat, lon, cityName, alerts }: EmergencyMapProps) {
  const [mounted, setMounted] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    setMounted(true);
  }, []);

  const center = {
    lat: lat,
    lng: lon,
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
  };

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Geospatial Emergency Map</h2>
        <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Geospatial Emergency Map</h2>
      <div className="rounded-lg overflow-hidden border border-gray-200">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            options={mapOptions}
          >
            {/* Main location marker */}
            <Marker
              position={center}
              title={cityName}
              label={{
                text: cityName,
                className: 'font-semibold',
              }}
            />

            {/* Alert radius circles */}
            {alerts.slice(0, 3).map((alert, index) => (
              <Circle
                key={alert.id || index}
                center={{
                  lat: lat + (index * 0.1),
                  lng: lon + (index * 0.1),
                }}
                radius={50000} // 50km radius
                options={{
                  fillColor: getSeverityColor(alert.severity),
                  fillOpacity: 0.2,
                  strokeColor: getSeverityColor(alert.severity),
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded-full opacity-40"></div>
          <span className="text-gray-700">Extreme</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-600 rounded-full opacity-40"></div>
          <span className="text-gray-700">Severe</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-600 rounded-full opacity-40"></div>
          <span className="text-gray-700">Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full opacity-40"></div>
          <span className="text-gray-700">Minor</span>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-800">
          <strong>Map Legend:</strong> Colored circles represent alert coverage areas.
          Red indicates extreme severity, orange for severe, yellow for moderate, and blue for minor alerts.
        </p>
      </div>
    </div>
  );
}
