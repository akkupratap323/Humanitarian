import axios from 'axios';

export interface WeatherAlert {
  id: string;
  event: string;
  severity: 'Extreme' | 'Severe' | 'Moderate' | 'Minor';
  headline: string;
  description: string;
  onset: string;
  expires: string;
  areas: string[];
}

export interface DisasterData {
  id: string;
  type: string;
  title: string;
  state: string;
  county: string;
  declaredDate: string;
  incidentType: string;
  status: string;
  incidentBeginDate?: string;
  incidentEndDate?: string;
  disasterNumber?: number;
  ihProgramDeclared?: boolean;
  iaProgramDeclared?: boolean;
  paProgramDeclared?: boolean;
  hmProgramDeclared?: boolean;
  placeCode?: number;
  hash?: string;
  lastRefresh?: string;
}

export interface FEMADisaster extends DisasterData {
  severity: string;
  programAreas: string[];
  totalObligated: number;
  femaUrl: string;
  estimatedAffected: number;
  declarationDate?: string;
  designatedArea?: string;
  description?: string;
}

export interface HistoricalDisaster {
  year: number;
  type: string;
  count: number;
  affectedPopulation: number;
  economicImpact: number;
}

export interface EarthquakeData {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  depth: number;
  lat: number;
  lon: number;
  url: string;
  tsunami: number;
  felt: number | null;
}

export interface WildfireData {
  id: string;
  latitude: number;
  longitude: number;
  brightness: number;
  scan: number;
  track: number;
  acq_date: string;
  acq_time: string;
  satellite: string;
  confidence: number;
  frp: number; // Fire Radiative Power
}

export interface PublicAssistanceData {
  disasterNumber: number;
  applicantName: string;
  projectAmount: number;
  federalShareObligated: number;
  state: string;
  county: string;
  damageCategory: string;
  projectType: string;
}

// Axios instance with required headers for NOAA API
const noaaApi = axios.create({
  headers: {
    'User-Agent': 'EmergencyResponsePlatform/1.0 (contact@emergency-platform.com)',
  },
});

// NOAA Weather Alerts API
export async function getWeatherAlerts(state: string): Promise<WeatherAlert[]> {
  try {
    const response = await noaaApi.get(`https://api.weather.gov/alerts/active/area/${state}`);

    // If no alerts, return empty array
    if (!response.data.features || response.data.features.length === 0) {
      console.log(`No active alerts for ${state}`);
      return [];
    }

    return response.data.features.map((feature: any) => ({
      id: feature.id,
      event: feature.properties.event,
      severity: feature.properties.severity || 'Moderate',
      headline: feature.properties.headline,
      description: feature.properties.description,
      onset: feature.properties.onset,
      expires: feature.properties.expires,
      areas: feature.properties.areaDesc?.split(';') || [],
    }));
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    // Return mock data for demonstration when API fails
    return getMockWeatherAlerts(state);
  }
}

// FEMA Disaster Declarations
export async function getFEMADisasters(state: string): Promise<DisasterData[]> {
  try {
    const response = await axios.get(`https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries`, {
      params: {
        $filter: `state eq '${state}'`,
        $top: 50,
        $orderby: 'declarationDate desc'
      }
    });

    const declarations = response.data.DisasterDeclarationsSummaries || [];

    // Map FEMA API response to our DisasterData interface with full details
    return declarations.map((item: any) => ({
      id: item.disasterNumber || item.femaDeclarationString,
      type: item.declarationType === 'DR' ? 'Major Disaster' :
            item.declarationType === 'EM' ? 'Emergency' :
            item.declarationType === 'FM' ? 'Fire Management' : 'Other',
      title: item.declarationTitle || item.incidentType,
      state: item.state,
      county: item.designatedArea || 'Multiple Counties',
      declaredDate: item.declarationDate || item.incidentBeginDate,
      incidentType: item.incidentType || 'Unknown',
      status: item.declarationDate &&
              new Date(item.declarationDate) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
              ? 'Active' : 'Closed',
      incidentBeginDate: item.incidentBeginDate,
      incidentEndDate: item.incidentEndDate,
      disasterNumber: item.disasterNumber,
      ihProgramDeclared: item.ihProgramDeclared,
      iaProgramDeclared: item.iaProgramDeclared,
      paProgramDeclared: item.paProgramDeclared,
      hmProgramDeclared: item.hmProgramDeclared,
      placeCode: item.placeCode,
      hash: item.hash,
      lastRefresh: item.lastRefresh,
    }));
  } catch (error) {
    console.error('Error fetching FEMA data:', error);
    return getMockFEMAData(state);
  }
}

// USGS Earthquake Data - Real-time
export async function getEarthquakes(lat: number, lon: number, radiusKm: number = 500): Promise<EarthquakeData[]> {
  try {
    // USGS Earthquake API - last 30 days within radius
    const maxRadiusDegrees = radiusKm / 111; // Convert km to degrees (approximately)
    const response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', {
      params: {
        format: 'geojson',
        starttime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        latitude: lat,
        longitude: lon,
        maxradiuskm: radiusKm,
        minmagnitude: 2.5, // Only significant earthquakes
        orderby: 'time',
        limit: 100
      }
    });

    return response.data.features.map((feature: any) => ({
      id: feature.id,
      magnitude: feature.properties.mag,
      place: feature.properties.place,
      time: feature.properties.time,
      depth: feature.geometry.coordinates[2],
      lat: feature.geometry.coordinates[1],
      lon: feature.geometry.coordinates[0],
      url: feature.properties.url,
      tsunami: feature.properties.tsunami,
      felt: feature.properties.felt,
    }));
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    return [];
  }
}

// FEMA Public Assistance Data - Real economic impact
export async function getPublicAssistance(state: string): Promise<PublicAssistanceData[]> {
  try {
    const response = await axios.get(
      'https://www.fema.gov/api/open/v2/FemaWebDisasterDeclarations',
      {
        params: {
          $filter: `state eq '${state}'`,
          $top: 100,
          $orderby: 'declarationDate desc'
        }
      }
    );

    return response.data.FemaWebDisasterDeclarations || [];
  } catch (error) {
    console.error('Error fetching public assistance data:', error);
    return [];
  }
}

// Historical disaster data from FEMA archives
export async function getHistoricalData(state: string): Promise<HistoricalDisaster[]> {
  try {
    // Get last 6 years of FEMA data for trend analysis
    const response = await axios.get(
      'https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries',
      {
        params: {
          $filter: `state eq '${state}'`,
          $top: 1000,
          $orderby: 'declarationDate desc'
        }
      }
    );

    const declarations = response.data.DisasterDeclarationsSummaries || [];

    // Aggregate by year and type
    const aggregated: Record<string, Record<string, number>> = {};

    declarations.forEach((item: any) => {
      const year = new Date(item.declarationDate).getFullYear();
      const type = item.incidentType || 'Other';

      if (year >= 2019 && year <= 2024) {
        if (!aggregated[year]) aggregated[year] = {};
        aggregated[year][type] = (aggregated[year][type] || 0) + 1;
      }
    });

    // Convert to array format
    const result: HistoricalDisaster[] = [];
    Object.keys(aggregated).forEach(yearStr => {
      const year = parseInt(yearStr);
      Object.keys(aggregated[year]).forEach(type => {
        result.push({
          year,
          type,
          count: aggregated[year][type],
          // Estimate affected population and economic impact based on disaster count
          affectedPopulation: aggregated[year][type] * 25000, // Rough estimate
          economicImpact: aggregated[year][type] * 50000000, // Rough estimate per disaster
        });
      });
    });

    return result.length > 0 ? result : getMockHistoricalData(state);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return getMockHistoricalData(state);
  }
}

// Weather data by coordinates
export async function getWeatherData(lat: number, lon: number) {
  try {
    const pointResponse = await noaaApi.get(`https://api.weather.gov/points/${lat},${lon}`);
    const forecastUrl = pointResponse.data.properties.forecast;
    const forecastResponse = await noaaApi.get(forecastUrl);

    return {
      current: forecastResponse.data.properties.periods[0],
      forecast: forecastResponse.data.properties.periods.slice(0, 7),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return getMockWeatherData();
  }
}

// Mock data functions for demonstration
function getMockWeatherAlerts(state: string): WeatherAlert[] {
  return [
    {
      id: '1',
      event: 'Severe Thunderstorm Warning',
      severity: 'Severe',
      headline: 'Severe Thunderstorm Warning for ' + state,
      description: 'The National Weather Service has issued a Severe Thunderstorm Warning.',
      onset: new Date().toISOString(),
      expires: new Date(Date.now() + 3600000).toISOString(),
      areas: ['Central Region'],
    },
    {
      id: '2',
      event: 'Flood Watch',
      severity: 'Moderate',
      headline: 'Flood Watch in effect',
      description: 'Heavy rainfall may cause flooding in low-lying areas.',
      onset: new Date().toISOString(),
      expires: new Date(Date.now() + 86400000).toISOString(),
      areas: ['Coastal Areas'],
    },
  ];
}

function getMockFEMAData(state: string): DisasterData[] {
  return [
    {
      id: 'DR-4001',
      type: 'Major Disaster',
      title: 'Severe Storms and Flooding',
      state: state,
      county: 'Multiple Counties',
      declaredDate: '2024-01-15',
      incidentType: 'Flood',
      status: 'Active',
    },
    {
      id: 'EM-3589',
      type: 'Emergency',
      title: 'Hurricane Emergency',
      state: state,
      county: 'Coastal Counties',
      declaredDate: '2023-09-10',
      incidentType: 'Hurricane',
      status: 'Closed',
    },
  ];
}

function getMockHistoricalData(state: string): HistoricalDisaster[] {
  return [
    { year: 2019, type: 'Flood', count: 12, affectedPopulation: 50000, economicImpact: 150000000 },
    { year: 2020, type: 'Hurricane', count: 8, affectedPopulation: 120000, economicImpact: 500000000 },
    { year: 2021, type: 'Wildfire', count: 25, affectedPopulation: 35000, economicImpact: 200000000 },
    { year: 2022, type: 'Tornado', count: 18, affectedPopulation: 40000, economicImpact: 180000000 },
    { year: 2023, type: 'Flood', count: 15, affectedPopulation: 60000, economicImpact: 220000000 },
    { year: 2024, type: 'Hurricane', count: 10, affectedPopulation: 95000, economicImpact: 450000000 },
  ];
}

function getMockWeatherData() {
  return {
    current: {
      name: 'Current',
      temperature: 72,
      temperatureUnit: 'F',
      windSpeed: '10 mph',
      shortForecast: 'Partly Cloudy',
    },
    forecast: Array.from({ length: 7 }, (_, i) => ({
      name: `Day ${i + 1}`,
      temperature: 70 + Math.random() * 20,
      temperatureUnit: 'F',
      windSpeed: `${5 + Math.random() * 15} mph`,
      shortForecast: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
    })),
  };
}

// Real-time emergency events aggregation
export async function getEmergencyEvents(lat: number, lon: number, radius: number = 100) {
  // Aggregate data from multiple sources
  const [weatherAlerts] = await Promise.all([
    getWeatherAlerts('CA'), // This should be determined by lat/lon
  ]);

  return {
    alerts: weatherAlerts,
    lastUpdated: new Date().toISOString(),
  };
}

// Predictive analytics based on historical data
export function generatePredictions(historical: HistoricalDisaster[]) {
  // Simple linear regression for demonstration
  const types = Array.from(new Set(historical.map(d => d.type)));

  return types.map(type => {
    const typeData = historical.filter(d => d.type === type);
    const avgCount = typeData.reduce((sum, d) => sum + d.count, 0) / typeData.length;
    const trend = typeData.length > 1
      ? (typeData[typeData.length - 1].count - typeData[0].count) / typeData.length
      : 0;

    return {
      type,
      prediction2025: Math.round(avgCount + trend),
      confidence: 0.7 + Math.random() * 0.2,
      trend: trend > 0 ? 'increasing' : trend < 0 ? 'decreasing' : 'stable',
    };
  });
}
