'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Prediction {
  type: string;
  prediction2025: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface PredictionsPanelProps {
  predictions: Prediction[];
}

export default function PredictionsPanel({ predictions }: PredictionsPanelProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-5 w-5 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="h-5 w-5 text-green-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-red-600 bg-red-50';
      case 'decreasing':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">2025 Predictions</h2>
      <p className="text-sm text-gray-600 mb-6">
        AI-powered predictions based on historical patterns and trend analysis
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.map((prediction) => (
          <div
            key={prediction.type}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{prediction.type}</h3>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {prediction.prediction2025} events
                </p>
              </div>
              {getTrendIcon(prediction.trend)}
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${getTrendColor(prediction.trend)}`}>
                {prediction.trend.charAt(0).toUpperCase() + prediction.trend.slice(1)} trend
              </span>
              <span className="text-xs text-gray-500">
                {(prediction.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>

            <div className="mt-3 bg-gray-100 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${prediction.confidence * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Model Information:</strong> Predictions use linear regression analysis combined with
          seasonal patterns and climate trend data. Confidence levels reflect model accuracy based on
          historical validation.
        </p>
      </div>
    </div>
  );
}
