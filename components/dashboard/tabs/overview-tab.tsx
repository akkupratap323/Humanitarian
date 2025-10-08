'use client';

import AlertsPanel from '../alerts-panel';
import DisasterChart from '../disaster-chart';
import EconomicImpactChart from '../economic-impact-chart';
import PredictionsPanel from '../predictions-panel';
import DisasterSummary from '../disaster-summary';
import EarthquakePanel from '../earthquake-panel';
import GoogleEmergencyMap from '../google-emergency-map';
import {
  WeatherAlert,
  DisasterData,
  HistoricalDisaster,
  EarthquakeData,
} from '@/lib/api/emergency-data';

interface OverviewTabProps {
  alerts: WeatherAlert[];
  disasters: DisasterData[];
  historicalData: HistoricalDisaster[];
  earthquakes: EarthquakeData[];
  predictions: any[];
  lat: number;
  lon: number;
  city: string;
}

export default function OverviewTab({
  alerts,
  disasters,
  historicalData,
  earthquakes,
  predictions,
  lat,
  lon,
  city,
}: OverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* Alerts Section */}
      <AlertsPanel alerts={alerts} />

      {/* Map Section */}
      <GoogleEmergencyMap lat={lat} lon={lon} cityName={city} alerts={alerts} />

      {/* Disaster Summary */}
      <DisasterSummary disasters={disasters} />

      {/* Earthquake Data */}
      <EarthquakePanel earthquakes={earthquakes} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DisasterChart data={historicalData} />
        <EconomicImpactChart data={historicalData} />
      </div>

      {/* Predictions */}
      <PredictionsPanel predictions={predictions} />
    </div>
  );
}
