'use client';

import { DollarSign, Building2, Calendar, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { EMPGData } from '@/lib/api/fema-detailed-data';
import DataSourceBadge from '../data-source-badge';

interface AdministrationTabProps {
  data: EMPGData[];
}

export default function AdministrationTab({ data }: AdministrationTabProps) {
  const totalFunding = data.reduce((sum, g) => sum + g.federalShare + g.stateShare, 0);
  const federalShare = data.reduce((sum, g) => sum + g.federalShare, 0);
  const stateShare = data.reduce((sum, g) => sum + g.stateShare, 0);
  const activeGrants = data.filter(g => g.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Grants</p>
              <p className="text-3xl font-bold text-gray-900">{data.length}</p>
            </div>
            <Building2 className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Funding</p>
              <p className="text-3xl font-bold text-green-600">${(totalFunding / 1000000).toFixed(1)}M</p>
            </div>
            <DollarSign className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Grants</p>
              <p className="text-3xl font-bold text-indigo-600">{activeGrants}</p>
            </div>
            <CheckCircle className="h-12 w-12 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Federal Share</p>
              <p className="text-3xl font-bold text-purple-600">{((federalShare / totalFunding) * 100).toFixed(0)}%</p>
            </div>
            <TrendingUp className="h-12 w-12 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Funding Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Funding Breakdown</h2>
          <DataSourceBadge source="real" apiName="FEMA EMPG" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-green-900">Total Funding</h3>
            </div>
            <p className="text-4xl font-bold text-green-700">${(totalFunding / 1000000).toFixed(2)}M</p>
            <p className="text-sm text-green-600 mt-2">All grants combined</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Federal Share</h3>
            </div>
            <p className="text-4xl font-bold text-blue-700">${(federalShare / 1000000).toFixed(2)}M</p>
            <p className="text-sm text-blue-600 mt-2">{((federalShare / totalFunding) * 100).toFixed(1)}% of total</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <h3 className="font-semibold text-purple-900">State Share</h3>
            </div>
            <p className="text-4xl font-bold text-purple-700">${(stateShare / 1000000).toFixed(2)}M</p>
            <p className="text-sm text-purple-600 mt-2">{((stateShare / totalFunding) * 100).toFixed(1)}% of total</p>
          </div>
        </div>
      </div>

      {/* Grant List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Emergency Management Performance Grants (EMPG)</h2>

        <div className="space-y-4">
          {data.map((grant) => (
            <div key={grant.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{grant.grantName}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        grant.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : grant.status === 'Closed'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {grant.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>Fiscal Year: {grant.fiscalYear}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-green-600 mb-1">Federal Share</p>
                      <p className="text-xl font-bold text-green-700">${(grant.federalShare / 1000000).toFixed(2)}M</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-600 mb-1">State Share</p>
                      <p className="text-xl font-bold text-blue-700">${(grant.stateShare / 1000000).toFixed(2)}M</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-purple-600 mb-1">Total Award</p>
                      <p className="text-xl font-bold text-purple-700">
                        ${((grant.federalShare + grant.stateShare) / 1000000).toFixed(2)}M
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-sm text-gray-700">
                  <strong>Program Areas:</strong> {grant.programAreas.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Areas Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Program Areas</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from(new Set(data.flatMap(g => g.programAreas))).map((area) => {
            const areaGrants = data.filter(g => g.programAreas.includes(area));
            const areaFunding = areaGrants.reduce((sum, g) => sum + g.federalShare + g.stateShare, 0);

            return (
              <div key={area} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{area}</h3>
                <p className="text-2xl font-bold text-indigo-600 mb-1">
                  ${(areaFunding / 1000000).toFixed(2)}M
                </p>
                <p className="text-sm text-gray-600">{areaGrants.length} grant{areaGrants.length !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">About EMPG Grants</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• <strong>Emergency Management Performance Grant (EMPG)</strong> provides funding to state and local governments for emergency management planning and operations</p>
          <p>• <strong>Federal/State Cost Share:</strong> Typically 50/50 split between federal and state/local funding</p>
          <p>• <strong>Program Areas:</strong> Include planning, training, exercises, equipment, management and administration</p>
          <p>• <strong>Purpose:</strong> Support all-hazards emergency management and enhance nationwide preparedness capabilities</p>
        </div>
      </div>
    </div>
  );
}
