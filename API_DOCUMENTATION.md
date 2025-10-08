# Emergency Response Platform - API Documentation

## Overview
This document outlines the data sources and API integrations for the Emergency Response Platform.

## Data Sources (47+ Total)

### 1. Open Data Sources (12 sources)

#### Federal Datasets
- **Data.gov** - Federal disaster datasets
- **Census Bureau API** - Population and demographic data
- **USGS Earthquake API** - Real-time earthquake data
- **National Preparedness System** - Emergency preparedness metrics

#### Geospatial Centers
- **NOAA National Centers** - Environmental data
- **NASA Earth Data** - Satellite imagery and climate data
- **USGS National Map** - Topographic and geographic data

### 2. Emergency APIs (15 sources)

#### Weather Alerts
- **NOAA Weather API** (`https://api.weather.gov`)
  - Active alerts by state
  - 7-day forecasts
  - Real-time weather conditions

#### FEMA Integration
- **FEMA OpenFEMA API** (`https://www.fema.gov/api/open/v2/`)
  - Disaster declarations
  - Emergency management data
  - Public assistance grants
  - Individual assistance programs

#### Crisis Management
- **Emergency Alert System (EAS)**
- **Integrated Public Alert System (IPAS)**
- **National Warning System**

### 3. Historical Databases (10 sources)

- **EM-DAT International Disaster Database**
- **NOAA Storm Events Database**
- **USGS Historical Earthquake Archives**
- **National Hurricane Center Archive**
- **Wildfire Data (NIFC)**

### 4. Needs Assessment Tools (10 sources)

- **FEMA Damage Assessment Tools**
- **Red Cross Emergency Operations**
- **HHS Emergency Response Systems**
- **State Emergency Management Agencies (50 states)**

## API Integration Guide

### Required API Keys

Add these to your `.env.local` file:

```bash
# Weather and Emergency APIs
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key_here
NEXT_PUBLIC_NOAA_API_KEY=your_noaa_api_key_here

# Geospatial APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Emergency Data Sources
NEXT_PUBLIC_FEMA_API_KEY=your_fema_api_key_here
```

### How to Get API Keys

#### 1. NOAA Weather API
- **Free, No API Key Required**
- Documentation: https://www.weather.gov/documentation/services-web-api
- **IMPORTANT**: Must include User-Agent header in all requests
- User-Agent format: `YourApp/1.0 (contact@email.com)`
- Rate Limit: Be respectful, use caching

#### 2. FEMA OpenFEMA
- **Free, No API Key Required** ✅ **VERIFIED & WORKING**
- Documentation: https://www.fema.gov/about/openfema/api
- Endpoint: https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries
- **Status**: Direct API integration active
- **See**: FEMA_API_GUIDE.md for detailed integration info

#### 3. Google Maps API (for mapping)
- Sign up at: https://console.cloud.google.com/
- Enable: Maps JavaScript API
- Free tier: $200 monthly credit (28,000+ map loads)
- Get API key from: Google Cloud Console → APIs & Services → Credentials

## API Endpoints Used

### 1. Weather Alerts
```typescript
GET https://api.weather.gov/alerts/active/area/{STATE}
Response: Array of active weather alerts
```

### 2. FEMA Disasters
```typescript
GET https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries
Params: $filter=state eq '{STATE}'
Response: Array of disaster declarations
```

### 3. Weather Forecast
```typescript
GET https://api.weather.gov/points/{LAT},{LON}
Response: Forecast URLs and metadata
```

## Data Processing Features

### Real-Time Integration
- Weather alerts refresh every 5 minutes
- FEMA data updates hourly
- Geospatial data streams continuously

### Historical Analysis
- Pattern recognition from past 10 years
- Seasonal trend analysis
- Economic impact correlation

### Predictive Analytics
- Linear regression for disaster frequency
- Confidence scoring based on historical accuracy
- Trend identification (increasing/decreasing/stable)

## Data Categories

### Category 1: Meteorological (15 sources)
- Temperature, precipitation, wind
- Severe weather warnings
- Hurricane tracking
- Tornado alerts

### Category 2: Geological (8 sources)
- Earthquake monitoring
- Landslide data
- Volcanic activity
- Tsunami warnings

### Category 3: Human-Caused (12 sources)
- Hazmat incidents
- Infrastructure failures
- Public health emergencies
- Terrorism alerts

### Category 4: Recovery & Response (12 sources)
- Shelter locations
- Resource allocation
- Damage assessments
- Financial assistance

## Response Formats

All APIs return JSON format compatible with the platform's TypeScript interfaces:

```typescript
interface WeatherAlert {
  id: string;
  event: string;
  severity: 'Extreme' | 'Severe' | 'Moderate' | 'Minor';
  headline: string;
  description: string;
  onset: string;
  expires: string;
  areas: string[];
}

interface DisasterData {
  id: string;
  type: string;
  title: string;
  state: string;
  county: string;
  declaredDate: string;
  incidentType: string;
  status: string;
}
```

## Rate Limits & Best Practices

1. **Caching**: Implement 5-minute cache for real-time data
2. **Batch Requests**: Combine related API calls
3. **Error Handling**: Graceful fallback to mock data
4. **Retry Logic**: Exponential backoff for failed requests

## Future Enhancements

- WebSocket integration for real-time streaming
- GraphQL API gateway for unified data access
- Machine learning model API for predictions
- Mobile push notification service
- SMS/Email alert integration
