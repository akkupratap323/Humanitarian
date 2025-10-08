import HeroSection from '@/components/landing/hero-section';
import LocationSelector from '@/components/landing/location-selector';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <LocationSelector />
      </div>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Integrated Data Sources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Open Data Sources</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Federal Datasets</li>
                <li>• Geospatial Centers</li>
                <li>• Disaster Portals</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Emergency APIs</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• NOAA Weather Alerts</li>
                <li>• Satellite Data</li>
                <li>• Crisis Management APIs</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Historical Databases</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Past Disaster Records</li>
                <li>• Pattern Analysis</li>
                <li>• Trend Identification</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Assessment Tools</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Post-Disaster Recovery</li>
                <li>• Impact Assessment</li>
                <li>• FEMA Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            Emergency Response Platform - Integrating 47+ data sources for comprehensive disaster management
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Data sources: NOAA, FEMA, USGS, NASA, and other federal agencies
          </p>
        </div>
      </footer>
    </div>
  );
}
