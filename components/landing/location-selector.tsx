'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, ChevronRight } from 'lucide-react';
import { US_STATES, MAJOR_CITIES } from '@/lib/us-states';

export default function LocationSelector() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      const city = MAJOR_CITIES[selectedState]?.find(c => c.name === selectedCity);
      router.push(`/dashboard?state=${selectedState}&city=${selectedCity}&lat=${city?.lat}&lon=${city?.lon}`);
    }
  };

  const cities = selectedState ? MAJOR_CITIES[selectedState] || [] : [];

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto -mt-16 relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">Select Your Location</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity('');
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            required
          >
            <option value="">Select a state</option>
            {US_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            disabled={!selectedState || cities.length === 0}
            required
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          {selectedState && cities.length === 0 && (
            <p className="mt-2 text-sm text-amber-600">
              No major cities data available for this state. Please select another state.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!selectedState || !selectedCity}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          View Emergency Dashboard
          <ChevronRight className="h-5 w-5" />
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800 mb-2">
          <strong>Coverage:</strong> All 50 US states with {Object.values(MAJOR_CITIES).flat().length}+ major cities across the United States.
        </p>
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This platform integrates data from NOAA, FEMA, USGS, and other federal agencies
          to provide comprehensive emergency information for your selected location.
        </p>
      </div>
    </div>
  );
}
