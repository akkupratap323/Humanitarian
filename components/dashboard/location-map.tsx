'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface LocationMapProps {
  locations: {
    id: string;
    name: string;
    lat: number;
    lon: number;
    address?: string;
    city?: string;
    state?: string;
    additionalInfo?: string;
  }[];
  center?: { lat: number; lng: number };
  markerIcon?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

export default function LocationMap({ locations, center, markerIcon }: LocationMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(
    center || (locations.length > 0 ? { lat: locations[0].lat, lng: locations[0].lon } : { lat: 37.7749, lng: -122.4194 })
  );

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  if (!apiKey) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-600">Google Maps API key not configured</p>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-600">No locations to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={10}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lon }}
              onClick={() => setSelectedLocation(location.id)}
              icon={markerIcon ? {
                url: markerIcon,
                scaledSize: new window.google.maps.Size(40, 40),
              } : undefined}
            />
          ))}

          {selectedLocation && (() => {
            const location = locations.find(l => l.id === selectedLocation);
            return location ? (
              <InfoWindow
                position={{ lat: location.lat, lng: location.lon }}
                onCloseClick={() => setSelectedLocation(null)}
              >
                <div className="p-2">
                  <h3 className="font-bold text-gray-900 mb-1">{location.name}</h3>
                  {location.address && (
                    <p className="text-sm text-gray-600">
                      {location.address}
                      {location.city && `, ${location.city}`}
                      {location.state && `, ${location.state}`}
                    </p>
                  )}
                  {location.additionalInfo && (
                    <p className="text-sm text-gray-700 mt-2">{location.additionalInfo}</p>
                  )}
                </div>
              </InfoWindow>
            ) : null;
          })()}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
