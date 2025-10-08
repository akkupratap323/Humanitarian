'use client';

import { useState } from 'react';
import { School, MapPin, Phone, Users, Building, Map as MapIcon, ExternalLink, Navigation, Info, GraduationCap } from 'lucide-react';
import { SchoolDistrictData } from '@/lib/api/fema-detailed-data';
import DataSourceBadge from '../data-source-badge';
import LocationMap from '../location-map';

interface SchoolsTabProps {
  data: SchoolDistrictData[];
}

export default function SchoolsTab({ data }: SchoolsTabProps) {
  const [showMap, setShowMap] = useState(false);
  const totalSchools = data.reduce((sum, d) => sum + d.totalSchools, 0);
  const totalStudents = data.reduce((sum, d) => sum + d.totalStudents, 0);
  const shelterCapable = data.filter(d => d.shelterCapable);

  // Filter districts with valid coordinates
  const districtsWithCoords = data.filter(d => d.lat && d.lon);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">School Districts</p>
              <p className="text-3xl font-bold text-gray-900">{data.length}</p>
            </div>
            <Building className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Schools</p>
              <p className="text-3xl font-bold text-indigo-600">{totalSchools.toLocaleString()}</p>
            </div>
            <School className="h-12 w-12 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-purple-600">{totalStudents.toLocaleString()}</p>
            </div>
            <Users className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Shelter Capable</p>
              <p className="text-3xl font-bold text-green-600">{shelterCapable.length}</p>
            </div>
            <Building className="h-12 w-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Map Section */}
      {showMap && districtsWithCoords.length > 0 && (
        <LocationMap
          locations={districtsWithCoords.map(district => ({
            id: district.id,
            name: district.districtName,
            lat: district.lat!,
            lon: district.lon!,
            address: district.county,
            city: '',
            state: district.state,
            additionalInfo: `${district.totalSchools} Schools | ${district.totalStudents.toLocaleString()} Students | ${district.shelterCapable ? 'Emergency Shelter Capable' : 'Not Shelter Capable'}`,
          }))}
        />
      )}

      {/* District List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">School Districts</h2>
            <DataSourceBadge source="real" apiName="NCES Education Data API" />
          </div>
          {districtsWithCoords.length > 0 && (
            <button
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MapIcon className="h-4 w-4" />
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {data.map((district) => (
            <div key={district.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{district.districtName}</h3>
                    {district.shelterCapable && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        Emergency Shelter Capable
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {district.county}, {district.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {district.emergencyContact}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Schools</p>
                      <p className="text-xl font-bold text-indigo-600">{district.totalSchools}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600 mb-1">Students</p>
                      <p className="text-xl font-bold text-purple-600">{district.totalStudents.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-600 mb-1">District Type</p>
                    <p className="text-sm font-semibold text-gray-900">Public School District</p>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-600 mb-1">Emergency Shelter</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {district.shelterCapable ? 'Yes - Facilities Available' : 'Not Available'}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-xs text-gray-600 mb-1">Student-School Ratio</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {Math.round(district.totalStudents / district.totalSchools)} students/school
                    </p>
                  </div>
                </div>

                {/* Resource Links */}
                <div className="flex flex-wrap gap-2">
                  {district.lat && district.lon && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${district.lat},${district.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      <Navigation className="h-4 w-4" />
                      Get Directions
                    </a>
                  )}
                  <a
                    href={`tel:${district.emergencyContact}`}
                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call District
                  </a>
                  <a
                    href={`https://nces.ed.gov/ccd/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700 transition-colors"
                  >
                    <GraduationCap className="h-4 w-4" />
                    NCES Data
                  </a>
                  <a
                    href={`https://www.ed.gov/rems`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700 transition-colors"
                  >
                    <Info className="h-4 w-4" />
                    Emergency Planning
                  </a>
                </div>

                {/* Additional Details */}
                <div className="mt-3 p-3 bg-purple-50 rounded">
                  <p className="text-xs text-purple-900">
                    <strong>Emergency Services:</strong> {district.shelterCapable ?
                      'District facilities can serve as emergency shelters with capacity for evacuation and temporary housing' :
                      'Contact district for emergency coordination and student safety protocols'}
                  </p>
                  <p className="text-xs text-purple-900 mt-1">
                    <strong>Coverage:</strong> {district.totalSchools} schools serving {district.totalStudents.toLocaleString()} students in {district.county}
                  </p>
                  {district.lat && district.lon && (
                    <p className="text-xs text-purple-900 mt-1">
                      <strong>District Office Location:</strong> {district.lat.toFixed(6)}, {district.lon.toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">School Emergency Preparedness</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• School districts marked as "Emergency Shelter Capable" have facilities equipped to serve as emergency shelters during disasters</p>
          <p>• Emergency contacts are available 24/7 for coordination with local emergency management</p>
          <p>• All districts maintain emergency response plans and conduct regular drills</p>
          <p>• Student evacuation and family reunification procedures are coordinated with local authorities</p>
        </div>
      </div>
    </div>
  );
}
