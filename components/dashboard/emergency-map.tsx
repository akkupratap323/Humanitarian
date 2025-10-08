'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface EmergencyMapProps {
  lat: number;
  lon: number;
  cityName: string;
  alerts: any[];
}

export default function EmergencyMap({ lat, lon, cityName, alerts }: EmergencyMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold">{cityName}</p>
                <p className="text-sm text-gray-600">Selected Location</p>
              </div>
            </Popup>
          </Marker>

          {/* Alert radius circles */}
          {alerts.slice(0, 3).map((alert, index) => (
            <Circle
              key={alert.id}
              center={[lat + (index * 0.1), lon + (index * 0.1)]}
              radius={50000}
              pathOptions={{
                color: alert.severity === 'Extreme' ? 'red' : alert.severity === 'Severe' ? 'orange' : 'yellow',
                fillColor: alert.severity === 'Extreme' ? 'red' : alert.severity === 'Severe' ? 'orange' : 'yellow',
                fillOpacity: 0.2,
              }}
            >
              <Popup>
                <div>
                  <p className="font-semibold">{alert.event}</p>
                  <p className="text-xs text-gray-600">{alert.severity}</p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full opacity-40"></div>
          <span>Extreme</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full opacity-40"></div>
          <span>Severe</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-40"></div>
          <span>Moderate</span>
        </div>
      </div>
    </div>
  );
}
