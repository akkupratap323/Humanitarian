'use client';

import { useState } from 'react';
import { Building2, MapPin, Phone, Users, CheckCircle, XCircle, Map as MapIcon, ExternalLink, Navigation, Info } from 'lucide-react';
import { ShelterData } from '@/lib/api/fema-detailed-data';
import DataSourceBadge from '../data-source-badge';
import LocationMap from '../location-map';

interface SheltersTabProps {
  data: ShelterData[];
}

export default function SheltersTab({ data }: SheltersTabProps) {
  const [showMap, setShowMap] = useState(false);
  const openShelters = data.filter(s => s.status === 'Open');
  const totalCapacity = data.reduce((sum, s) => sum + s.capacity, 0);
  const specialNeedsShelters = data.filter(s => s.specialNeeds);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Shelters</p>
              <p className="text-3xl font-bold text-gray-900">{data.length}</p>
            </div>
            <Building2 className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open Now</p>
              <p className="text-3xl font-bold text-green-600">{openShelters.length}</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Capacity</p>
              <p className="text-3xl font-bold text-gray-900">{totalCapacity.toLocaleString()}</p>
            </div>
            <Users className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Special Needs</p>
              <p className="text-3xl font-bold text-orange-600">{specialNeedsShelters.length}</p>
            </div>
            <Building2 className="h-12 w-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Map Section */}
      {showMap && (
        <LocationMap
          locations={data.map(shelter => ({
            id: shelter.id,
            name: shelter.name,
            lat: shelter.lat,
            lon: shelter.lon,
            address: shelter.address,
            city: shelter.city,
            state: shelter.state,
            additionalInfo: `Status: ${shelter.status} | Capacity: ${shelter.capacity} | ${shelter.specialNeeds ? 'Special Needs Facility' : 'Standard Shelter'}`,
          }))}
        />
      )}

      {/* Shelter List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Emergency Shelters</h2>
            <DataSourceBadge source="real" apiName="Emergency Management" />
          </div>
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MapIcon className="h-4 w-4" />
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>

        <div className="space-y-4">
          {data.map((shelter) => (
            <div key={shelter.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{shelter.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      shelter.status === 'Open' ? 'bg-green-100 text-green-800' :
                      shelter.status === 'Full' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {shelter.status}
                    </span>
                    {shelter.specialNeeds && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                        Special Needs
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {shelter.address}, {shelter.city}, {shelter.state} {shelter.zip}
                    </span>
                    {shelter.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {shelter.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right ml-4">
                  <p className="text-sm text-gray-600">Capacity</p>
                  <p className="text-2xl font-bold text-blue-600">{shelter.capacity}</p>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-600 mb-1">Facility Type</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {shelter.specialNeeds ? 'Special Needs Emergency Shelter' : 'General Emergency Shelter'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-600 mb-1">Current Availability</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {shelter.status === 'Open' ? `${shelter.capacity} beds available` :
                       shelter.status === 'Full' ? 'At full capacity' : 'Currently closed'}
                    </p>
                  </div>
                </div>

                {/* Resource Links */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${shelter.lat},${shelter.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </a>
                  <a
                    href={`tel:${shelter.phone}`}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call Shelter
                  </a>
                  <a
                    href={`https://www.fema.gov/emergency-managers/practitioners/shelter`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
                  >
                    <Info className="h-4 w-4" />
                    Shelter Info
                  </a>
                  <a
                    href={`https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Red Cross
                  </a>
                </div>

                {/* Additional Details */}
                <div className="mt-3 p-3 bg-blue-50 rounded">
                  <p className="text-xs text-blue-900">
                    <strong>Services Available:</strong> {shelter.specialNeeds ?
                      'Medical support, accessible facilities, specialized care for disabilities and medical needs' :
                      'Basic shelter, food, water, and emergency supplies'}
                  </p>
                  <p className="text-xs text-blue-900 mt-1">
                    <strong>Coordinates:</strong> {shelter.lat.toFixed(6)}, {shelter.lon.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Emergency Shelter Information:</strong> Shelter availability and status are updated in real-time during emergencies.
          Contact shelters directly to confirm current status and availability before traveling.
        </p>
      </div>
    </div>
  );
}
