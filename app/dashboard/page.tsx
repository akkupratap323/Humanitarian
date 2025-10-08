'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import DashboardTabs, { TabType } from '@/components/dashboard/dashboard-tabs';
import OverviewTab from '@/components/dashboard/tabs/overview-tab';
import RiskIndexTab from '@/components/dashboard/tabs/risk-index-tab';
import SheltersTab from '@/components/dashboard/tabs/shelters-tab';
import HospitalsTab from '@/components/dashboard/tabs/hospitals-tab';
import SchoolsTab from '@/components/dashboard/tabs/schools-tab';
import DemographicsTab from '@/components/dashboard/tabs/demographics-tab';
import AdministrationTab from '@/components/dashboard/tabs/administration-tab';
import DisastersTab from '@/components/dashboard/tabs/disasters-tab';
import {
  getWeatherAlerts,
  getFEMADisasters,
  getHistoricalData,
  getEarthquakes,
  generatePredictions,
  WeatherAlert,
  DisasterData,
  HistoricalDisaster,
  EarthquakeData,
  FEMADisaster,
} from '@/lib/api/emergency-data';
import {
  getRiskIndexData,
  getEMPGData,
  getShelterData,
  getHospitalData,
  getSchoolDistrictData,
  getDemographicsData,
  RiskIndexData,
  EMPGData,
  ShelterData,
  HospitalData,
  SchoolDistrictData,
  DemographicsData,
} from '@/lib/api/fema-detailed-data';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const state = searchParams.get('state') || '';
  const city = searchParams.get('city') || '';
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lon = parseFloat(searchParams.get('lon') || '0');

  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [disasters, setDisasters] = useState<DisasterData[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalDisaster[]>([]);
  const [earthquakes, setEarthquakes] = useState<EarthquakeData[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [femaDisasters, setFemaDisasters] = useState<FEMADisaster[]>([]);
  const [riskIndexData, setRiskIndexData] = useState<RiskIndexData[]>([]);
  const [empgData, setEmpgData] = useState<EMPGData[]>([]);
  const [shelterData, setShelterData] = useState<ShelterData[]>([]);
  const [hospitalData, setHospitalData] = useState<HospitalData[]>([]);
  const [schoolData, setSchoolData] = useState<SchoolDistrictData[]>([]);
  const [demographicsData, setDemographicsData] = useState<DemographicsData | null>(null);

  useEffect(() => {
    if (!state || !city) {
      router.push('/');
      return;
    }

    loadData();
  }, [state, city]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        alertsData,
        disastersData,
        historicalData,
        earthquakeData,
        riskData,
        empgGrantData,
      ] = await Promise.all([
        getWeatherAlerts(state),
        getFEMADisasters(state),
        getHistoricalData(state),
        getEarthquakes(lat, lon, 500),
        getRiskIndexData(state),
        getEMPGData(state),
      ]);

      setAlerts(alertsData);
      setDisasters(disastersData);
      setHistoricalData(historicalData);
      setEarthquakes(earthquakeData);
      setPredictions(generatePredictions(historicalData));

      // Set FEMA disasters for disasters tab
      setFemaDisasters(disastersData.map(d => ({
        ...d,
        severity: (d as any).severity || 'Moderate',
        programAreas: (d as any).programAreas || [],
        totalObligated: (d as any).totalObligated || 0,
        femaUrl: (d as any).femaUrl || '',
        estimatedAffected: (d as any).estimatedAffected || 0,
        declarationDate: d.declaredDate,
        designatedArea: `${d.county}, ${d.state}`,
      })));

      // Set detailed data for tabs - Load real-time data
      setRiskIndexData(riskData);
      setEmpgData(empgGrantData);

      // Load shelter, hospital, school, and demographics data in parallel
      const [shelterDataResult, hospitalDataResult, schoolDataResult, demographicsDataResult] = await Promise.all([
        getShelterData(state, city, lat, lon),
        getHospitalData(state, city, lat, lon),
        getSchoolDistrictData(state),
        getDemographicsData(state),
      ]);

      setShelterData(shelterDataResult);
      setHospitalData(hospitalDataResult);
      setSchoolData(schoolDataResult);
      setDemographicsData(demographicsDataResult);

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading emergency data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Emergency Dashboard - {city}, {state}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewTab
            alerts={alerts}
            disasters={disasters}
            historicalData={historicalData}
            earthquakes={earthquakes}
            predictions={predictions}
            lat={lat}
            lon={lon}
            city={city}
          />
        )}

        {activeTab === 'risk-index' && <RiskIndexTab data={riskIndexData} />}

        {activeTab === 'shelters' && <SheltersTab data={shelterData} />}

        {activeTab === 'hospitals' && <HospitalsTab data={hospitalData} />}

        {activeTab === 'schools' && <SchoolsTab data={schoolData} />}

        {activeTab === 'demographics' && demographicsData && (
          <DemographicsTab data={demographicsData} />
        )}

        {activeTab === 'administration' && <AdministrationTab data={empgData} />}

        {activeTab === 'disasters' && <DisastersTab data={femaDisasters} />}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
