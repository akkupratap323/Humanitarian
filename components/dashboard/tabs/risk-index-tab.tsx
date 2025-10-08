'use client';

import { TrendingUp, AlertTriangle, Shield } from 'lucide-react';
import { RiskIndexData } from '@/lib/api/fema-detailed-data';
import DataSourceBadge from '../data-source-badge';

interface RiskIndexTabProps {
  data: RiskIndexData[];
}

const getRiskColor = (rating: string) => {
  switch (rating.toLowerCase()) {
    case 'very high':
      return 'bg-red-600 text-white';
    case 'relatively high':
      return 'bg-orange-500 text-white';
    case 'moderate':
      return 'bg-yellow-500 text-white';
    case 'relatively low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getHazardLevel = (score: number) => {
  if (score >= 80) return { label: 'Very High', color: 'text-red-600' };
  if (score >= 60) return { label: 'High', color: 'text-orange-600' };
  if (score >= 40) return { label: 'Moderate', color: 'text-yellow-600' };
  if (score >= 20) return { label: 'Low', color: 'text-green-600' };
  return { label: 'Very Low', color: 'text-gray-600' };
};

export default function RiskIndexTab({ data }: RiskIndexTabProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No risk index data available</p>
      </div>
    );
  }

  const topRiskCounty = data[0];
  const hazards = topRiskCounty.hazards;
  const topHazards = Object.entries(hazards)
    .filter(([_, value]) => value !== undefined && value > 0)
    .map(([key, value]) => ({
      name: key.replace(/([A-Z])/g, ' $1').trim(),
      score: value as number,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">FEMA National Risk Index</h2>
            <DataSourceBadge source="real" apiName="FEMA Risk Index" />
          </div>
        </div>
        <p className="text-gray-600">
          The National Risk Index is a dataset and online tool to help illustrate the U.S. communities most at risk for 18 natural hazards.
        </p>
      </div>

      {/* County Risk Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.slice(0, 6).map((county) => (
          <div key={county.county} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{county.county}</h3>
                <p className="text-sm text-gray-600">{county.stateCode}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(county.riskRating)}`}>
                {county.riskRating}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Risk Score</span>
                  <span className="font-semibold">{county.riskScore.toFixed(1)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${county.riskScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Social Vulnerability</span>
                  <span className="font-semibold">{county.socialVulnerability.toFixed(1)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${county.socialVulnerability}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Community Resilience</span>
                  <span className="font-semibold">{county.communityResilience.toFixed(1)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${county.communityResilience}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="text-xs text-gray-600 mb-1">Expected Annual Loss</p>
                <p className="text-lg font-bold text-gray-900">
                  ${(county.expectedAnnualLoss / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Hazards */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Top Natural Hazards - {topRiskCounty.county}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topHazards.map((hazard) => {
            const level = getHazardLevel(hazard.score);
            return (
              <div key={hazard.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`h-5 w-5 ${level.color}`} />
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{hazard.name}</p>
                    <p className={`text-sm ${level.color} font-semibold`}>{level.label}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{hazard.score.toFixed(0)}</p>
                  <p className="text-xs text-gray-600">Risk Score</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Risk Explanation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">About FEMA Risk Index</h4>
            <p className="text-sm text-blue-800 mb-2">
              The National Risk Index identifies communities most at risk to 18 natural hazards. It uses data, maps, and tools to help
              emergency managers identify risks and take action to reduce them.
            </p>
            <p className="text-sm text-blue-800">
              Risk scores combine expected annual loss, social vulnerability, and community resilience to provide a comprehensive
              view of disaster risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
