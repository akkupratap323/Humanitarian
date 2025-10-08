'use client';

import { useState } from 'react';
import { RefreshCw, CheckCircle, XCircle, Activity } from 'lucide-react';

type ApiType = 'noaa' | 'fema';

export default function TestAPIPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedState, setSelectedState] = useState('CA');
  const [activeApi, setActiveApi] = useState<ApiType>('noaa');

  const testAPI = async (apiType: ApiType) => {
    setLoading(true);
    setActiveApi(apiType);
    try {
      const endpoint = apiType === 'noaa' ? '/api/test-noaa' : '/api/test-fema';
      const response = await fetch(`${endpoint}?state=${selectedState}`);
      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Testing Dashboard</h1>
          <p className="text-gray-600">Test NOAA Weather and FEMA Disaster APIs</p>
        </div>

        {/* API Selection Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveApi('noaa')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              activeApi === 'noaa'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            NOAA Weather API
          </button>
          <button
            onClick={() => setActiveApi('fema')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              activeApi === 'fema'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            FEMA Disaster API
          </button>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Test {activeApi === 'noaa' ? 'NOAA Weather' : 'FEMA Disaster'} API
          </h2>

          <div className="flex gap-4 items-end mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              >
                <option value="CA">California (CA)</option>
                <option value="FL">Florida (FL)</option>
                <option value="TX">Texas (TX)</option>
                <option value="NY">New York (NY)</option>
                <option value="LA">Louisiana (LA)</option>
                <option value="OR">Oregon (OR)</option>
                <option value="WA">Washington (WA)</option>
                <option value="CO">Colorado (CO)</option>
              </select>
            </div>

            <button
              onClick={() => testAPI(activeApi)}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Activity className="h-5 w-5" />
                  Test API
                </>
              )}
            </button>
          </div>

          {/* API Info */}
          {activeApi === 'noaa' ? (
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-sm text-gray-700 mb-2">API Endpoint:</h3>
                <code className="text-xs text-blue-600 break-all">
                  https://api.weather.gov/alerts/active/area/{selectedState}
                </code>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> NOAA API requires User-Agent header. Tests real-time weather alerts.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-sm text-gray-700 mb-2">API Endpoint:</h3>
                <code className="text-xs text-red-600 break-all">
                  https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$filter=state eq '{selectedState}'
                </code>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  <strong>Note:</strong> FEMA OpenFEMA API is free and requires no authentication. Returns disaster declarations.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              {result.success ? (
                <>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h3 className="text-xl font-semibold text-green-700">API Test Successful</h3>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-red-500" />
                  <h3 className="text-xl font-semibold text-red-700">API Test Failed</h3>
                </>
              )}
            </div>

            {/* Summary for NOAA */}
            {result.success && activeApi === 'noaa' && (
              <div className="mb-4 border-b pb-4">
                <h4 className="font-semibold mb-2">Summary:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Active Alerts: {result.alerts?.count || 0}</li>
                  <li>✓ Last Updated: {result.alerts?.updated || 'N/A'}</li>
                  <li>✓ Forecast Grid ID: {result.forecast?.gridId || 'N/A'}</li>
                  <li>✓ Weather Office: {result.forecast?.office || 'N/A'}</li>
                </ul>

                {result.alerts?.count > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Active Alerts Found:
                    </h4>
                    {result.alerts.data.map((alert: any, index: number) => (
                      <div key={index} className="mb-2 text-sm">
                        <p className="font-semibold">{alert.properties?.event}</p>
                        <p className="text-gray-700">{alert.properties?.headline}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Summary for FEMA */}
            {result.success && activeApi === 'fema' && (
              <div className="mb-4 border-b pb-4">
                <h4 className="font-semibold mb-2">Summary:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Total Declarations: {result.totalRecords || 0}</li>
                  <li>✓ State: {result.state}</li>
                  <li>✓ API Endpoint: Working</li>
                </ul>

                {result.declarations && result.declarations.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-red-800 mb-3">
                      Recent Disaster Declarations:
                    </h4>
                    <div className="space-y-3">
                      {result.declarations.slice(0, 5).map((declaration: any, index: number) => (
                        <div key={index} className="border-l-4 border-red-400 pl-3">
                          <p className="font-semibold text-sm">{declaration.id} - {declaration.type}</p>
                          <p className="text-sm text-gray-700">{declaration.title}</p>
                          <p className="text-xs text-gray-600">
                            {declaration.county} | {declaration.incidentType} | {declaration.status}
                          </p>
                          <p className="text-xs text-gray-500">
                            Declared: {new Date(declaration.declaredDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Full Response */}
            <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
              <h4 className="font-semibold mb-2">Full API Response:</h4>
              <pre className="text-xs text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
