'use client';

import { Users, Home, Briefcase, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { DemographicsData } from '@/lib/api/fema-detailed-data';
import DataSourceBadge from '../data-source-badge';

interface DemographicsTabProps {
  data: DemographicsData;
}

export default function DemographicsTab({ data }: DemographicsTabProps) {
  const vulnerablePopulation =
    data.seniors65Plus +
    data.childrenUnder5 +
    data.disability +
    data.povertyLine;

  const vulnerabilityPercentage = ((vulnerablePopulation / data.totalPopulation) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Population</p>
              <p className="text-3xl font-bold text-gray-900">{data.totalPopulation.toLocaleString()}</p>
            </div>
            <Users className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Median Income</p>
              <p className="text-3xl font-bold text-green-600">${(data.medianIncome / 1000).toFixed(0)}K</p>
            </div>
            <DollarSign className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unemployment</p>
              <p className="text-3xl font-bold text-orange-600">{data.unemploymentRate}%</p>
            </div>
            <Briefcase className="h-12 w-12 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Households</p>
              <p className="text-3xl font-bold text-purple-600">{data.households.toLocaleString()}</p>
            </div>
            <Home className="h-12 w-12 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Population Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Population Demographics</h2>
          <DataSourceBadge source="real" apiName="US Census Bureau" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Distribution */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Age Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Children (Under 5)</span>
                <span className="font-bold text-indigo-600">{data.childrenUnder5.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Seniors (65+)</span>
                <span className="font-bold text-indigo-600">{data.seniors65Plus.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Median Age</span>
                <span className="font-bold text-indigo-600">{data.medianAge} years</span>
              </div>
            </div>
          </div>

          {/* Economic Indicators */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Economic Indicators</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Below Poverty Line</span>
                <span className="font-bold text-orange-600">{data.povertyLine.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Unemployment Rate</span>
                <span className="font-bold text-orange-600">{data.unemploymentRate}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Median Household Income</span>
                <span className="font-bold text-green-600">${data.medianIncome.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vulnerability Analysis */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Vulnerability Assessment</h2>
          <Activity className="h-6 w-6 text-red-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-xs text-red-600 mb-1">Seniors (65+)</p>
            <p className="text-2xl font-bold text-red-700">{data.seniors65Plus.toLocaleString()}</p>
            <p className="text-xs text-red-600 mt-1">{((data.seniors65Plus / data.totalPopulation) * 100).toFixed(1)}% of population</p>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-xs text-orange-600 mb-1">Children (Under 5)</p>
            <p className="text-2xl font-bold text-orange-700">{data.childrenUnder5.toLocaleString()}</p>
            <p className="text-xs text-orange-600 mt-1">{((data.childrenUnder5 / data.totalPopulation) * 100).toFixed(1)}% of population</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-xs text-yellow-700 mb-1">With Disability</p>
            <p className="text-2xl font-bold text-yellow-800">{data.disability.toLocaleString()}</p>
            <p className="text-xs text-yellow-700 mt-1">{((data.disability / data.totalPopulation) * 100).toFixed(1)}% of population</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-xs text-purple-600 mb-1">Below Poverty Line</p>
            <p className="text-2xl font-bold text-purple-700">{data.povertyLine.toLocaleString()}</p>
            <p className="text-xs text-purple-600 mt-1">{((data.povertyLine / data.totalPopulation) * 100).toFixed(1)}% of population</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 mb-1">Total Vulnerable Population</p>
              <p className="text-3xl font-bold text-red-700">{vulnerablePopulation.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-700 mb-1">Vulnerability Index</p>
              <p className="text-3xl font-bold text-red-700">{vulnerabilityPercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Housing */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Housing Statistics</h2>
          <Home className="h-6 w-6 text-blue-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-xs text-blue-600 mb-1">Total Households</p>
            <p className="text-2xl font-bold text-blue-700">{data.households.toLocaleString()}</p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-xs text-indigo-600 mb-1">Avg Household Size</p>
            <p className="text-2xl font-bold text-indigo-700">{(data.totalPopulation / data.households).toFixed(2)}</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-xs text-purple-600 mb-1">Housing Units</p>
            <p className="text-2xl font-bold text-purple-700">{data.housingUnits.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Emergency Planning Considerations</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• <strong>Vulnerable populations</strong> include seniors, children under 5, people with disabilities, and those below the poverty line</p>
          <p>• <strong>High vulnerability areas</strong> require additional emergency resources and evacuation assistance</p>
          <p>• <strong>Economic indicators</strong> help determine community resilience and recovery capacity</p>
          <p>• <strong>Demographic data</strong> is used to plan shelter capacity, medical resources, and emergency services</p>
        </div>
      </div>
    </div>
  );
}
