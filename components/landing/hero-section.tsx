'use client';

import { AlertTriangle, Shield, TrendingUp, MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-20 w-20 text-blue-300" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
            Emergency Response Platform
          </h1>

          <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Centralized emergency management system integrating real-time data from 47+ sources
            for comprehensive disaster response and recovery planning
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <AlertTriangle className="h-10 w-10 text-yellow-300 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Real-Time Alerts</h3>
              <p className="text-blue-200 text-sm">
                Instant notifications from weather services, FEMA, and emergency systems
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <MapPin className="h-10 w-10 text-green-300 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Geospatial Mapping</h3>
              <p className="text-blue-200 text-sm">
                Visualize affected areas, resources, and emergency response coverage
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <TrendingUp className="h-10 w-10 text-purple-300 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Predictive Analytics</h3>
              <p className="text-blue-200 text-sm">
                ML-powered predictions based on historical disaster patterns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
