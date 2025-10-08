'use client';

import { useState } from 'react';
import { Hospital, MapPin, Phone, Bed, Activity, Map as MapIcon, ExternalLink, Navigation, Info, AlertCircle } from 'lucide-react';
import { HospitalData } from '@/lib/api/fema-detailed-data';
import DataSourceBadge from '../data-source-badge';
import LocationMap from '../location-map';

interface HospitalsTabProps {
  data: HospitalData[];
}

export default function HospitalsTab({ data }: HospitalsTabProps) {
  const [showMap, setShowMap] = useState(false);
  const totalBeds = data.reduce((sum, h) => sum + h.beds, 0);
  const traumaCenters = data.filter(h => h.traumaLevel);
  const emergencyServices = data.filter(h => h.emergencyServices);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Hospitals</p>
              <p className="text-3xl font-bold text-gray-900">{data.length}</p>
            </div>
            <Hospital className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Beds</p>
              <p className="text-3xl font-bold text-green-600">{totalBeds.toLocaleString()}</p>
            </div>
            <Bed className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Trauma Centers</p>
              <p className="text-3xl font-bold text-red-600">{traumaCenters.length}</p>
            </div>
            <Activity className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Emergency Services</p>
              <p className="text-3xl font-bold text-orange-600">{emergencyServices.length}</p>
            </div>
            <Activity className="h-12 w-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Map Section */}
      {showMap && (
        <LocationMap
          locations={data.map(hospital => ({
            id: hospital.id,
            name: hospital.name,
            lat: hospital.lat,
            lon: hospital.lon,
            address: hospital.address,
            city: hospital.city,
            state: hospital.state,
            additionalInfo: `Beds: ${hospital.beds} | ${hospital.traumaLevel || 'No Trauma Level'} | ${hospital.emergencyServices ? 'Emergency Services Available' : 'No Emergency Services'}`,
          }))}
        />
      )}

      {/* Hospital List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">Healthcare Facilities</h2>
            <DataSourceBadge source="real" apiName="CMS Hospital Compare API" />
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
          {data.map((hospital) => (
            <div key={hospital.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                    {hospital.traumaLevel && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {hospital.traumaLevel}
                      </span>
                    )}
                    {hospital.emergencyServices && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        24/7 Emergency
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {hospital.address}, {hospital.city}, {hospital.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {hospital.phone}
                    </span>
                  </div>
                </div>

                <div className="text-right ml-4">
                  <p className="text-sm text-gray-600">Available Beds</p>
                  <p className="text-2xl font-bold text-blue-600">{hospital.beds}</p>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-600 mb-1">Facility Type</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {hospital.traumaLevel ? `Trauma Center ${hospital.traumaLevel}` : 'General Hospital'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-600 mb-1">Emergency Services</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {hospital.emergencyServices ? 'Available 24/7' : 'Not Available'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-600 mb-1">Total Capacity</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {hospital.beds} beds
                    </p>
                  </div>
                </div>

                {/* Resource Links */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </a>
                  <a
                    href={`tel:${hospital.phone}`}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call Hospital
                  </a>
                  <a
                    href={`https://www.medicare.gov/care-compare/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700 transition-colors"
                  >
                    <Info className="h-4 w-4" />
                    Medicare Compare
                  </a>
                  <a
                    href={`https://www.cms.gov/medicare/quality/hospital-compare`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Quality Ratings
                  </a>
                </div>

                {/* Additional Details */}
                <div className="mt-3 p-3 bg-green-50 rounded">
                  <p className="text-xs text-green-900">
                    <strong>Services:</strong> {hospital.emergencyServices ? 'Emergency care, ' : ''}
                    {hospital.traumaLevel ? `Trauma services (${hospital.traumaLevel}), ` : ''}
                    Inpatient care, Outpatient services
                  </p>
                  <p className="text-xs text-green-900 mt-1">
                    <strong>Location:</strong> {hospital.address}, {hospital.city}, {hospital.state} {hospital.zip}
                  </p>
                  <p className="text-xs text-green-900 mt-1">
                    <strong>Coordinates:</strong> {hospital.lat.toFixed(6)}, {hospital.lon.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
