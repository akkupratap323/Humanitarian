# Data Source Audit - Emergency Response Platform

## Last Updated: 2025-10-08

---

## ✅ REAL-TIME DATA SOURCES (Government APIs)

### 1. **Weather Alerts** - NOAA API
- **Status**: ✅ REAL-TIME
- **API**: `https://api.weather.gov/alerts/active/area/{state}`
- **Source**: National Weather Service (NOAA)
- **Update Frequency**: Real-time as alerts are issued
- **Data Quality**: Official government warnings
- **Location**: `lib/api/emergency-data.ts` - `getWeatherAlerts()`

### 2. **FEMA Disasters** - FEMA OpenFEMA API
- **Status**: ✅ REAL-TIME
- **API**: `https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries`
- **Source**: Federal Emergency Management Agency (FEMA)
- **Update Frequency**: Updated as disasters are declared
- **Data Quality**: Official disaster declarations
- **Location**: `lib/api/emergency-data.ts` - `getFEMADisasters()`

### 3. **Earthquakes** - USGS API
- **Status**: ✅ REAL-TIME
- **API**: `https://earthquake.usgs.gov/fdsnws/event/1/query`
- **Source**: United States Geological Survey (USGS)
- **Update Frequency**: Real-time seismic monitoring (within minutes)
- **Data Quality**: Scientific earthquake data
- **Location**: `lib/api/emergency-data.ts` - `getEarthquakes()`

### 4. **Historical Disaster Data** - FEMA Archives
- **Status**: ✅ REAL-TIME AGGREGATED
- **API**: `https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries`
- **Source**: FEMA historical records (last 1000 declarations)
- **Update Frequency**: Aggregated from historical FEMA data
- **Data Quality**: Real historical disaster records
- **Location**: `lib/api/emergency-data.ts` - `getHistoricalData()`

### 5. **Risk Index** - FEMA National Risk Index
- **Status**: ✅ REAL-TIME (with fallback)
- **API**: `https://hazards.fema.gov/nri/api/v1/counties` (via `/api/risk-index` proxy)
- **Source**: FEMA National Risk Index
- **Update Frequency**: FEMA updates periodically
- **Data Quality**: Official county-level risk assessments
- **Fallback**: Comprehensive mock data for all 50 states if API unavailable
- **Location**: `lib/api/fema-detailed-data.ts` - `getRiskIndexData()`

### 6. **EMPG Grants** - FEMA Emergency Management Performance Grants
- **Status**: ✅ REAL-TIME (with fallback)
- **API**: `https://www.fema.gov/api/open/v2/EmergencyManagementPerformanceGrants`
- **Source**: FEMA Grant Data
- **Update Frequency**: Updated as grants are allocated
- **Data Quality**: Official grant funding data
- **Fallback**: Realistic mock data if API unavailable
- **Location**: `lib/api/fema-detailed-data.ts` - `getEMPGData()`

---

## ⚠️ HYBRID DATA SOURCES (Real API with Mock Fallback)

### 7. **Hospitals** - CMS Hospital Compare
- **Status**: ⚠️ ATTEMPTING REAL-TIME (Currently Mock)
- **API**: `https://data.cms.gov/provider-data/api/1/datastore/query/xubh-q36u/0`
- **Source**: Centers for Medicare & Medicaid Services
- **Issue**: CMS API may have authentication requirements
- **Current State**: Using mock data as primary (API integration attempted but may fail)
- **Data Quality**: Mock data is realistic and structured
- **Location**: `lib/api/fema-detailed-data.ts` - `getHospitalData()`
- **Action Needed**: ✅ API integration exists, verify if returning real data

### 8. **School Districts** - NCES Education Data
- **Status**: ⚠️ ATTEMPTING REAL-TIME (Currently Mock)
- **API**: `https://educationdata.urban.org/api/v1/schools/ccd/directory/2022/`
- **Source**: National Center for Education Statistics via Urban Institute
- **Issue**: API may not return expected data format
- **Current State**: Using mock data as primary (API integration attempted)
- **Data Quality**: Mock data includes all 50 states with realistic district info
- **Location**: `lib/api/fema-detailed-data.ts` - `getSchoolDistrictData()`
- **Action Needed**: ✅ API integration exists, verify if returning real data

### 9. **Demographics** - US Census Bureau
- **Status**: ⚠️ ATTEMPTING REAL-TIME (Currently Mock)
- **API**: `https://api.census.gov/data/2022/acs/acs5/profile`
- **Source**: US Census Bureau American Community Survey
- **Issue**: Census API requires specific variable codes
- **Current State**: Using mock data as primary (API integration attempted)
- **Data Quality**: Mock data with realistic population statistics
- **Location**: `lib/api/fema-detailed-data.ts` - `getDemographicsData()`
- **Action Needed**: ✅ API integration exists, verify if returning real data

---

## ❌ MOCK DATA SOURCES (No Real API Available)

### 10. **Emergency Shelters**
- **Status**: ❌ MOCK DATA
- **Reason**: No comprehensive public API for real-time shelter data
- **API Attempted**: FEMA IPaws (returns different data)
- **Data Quality**: Realistic mock data with proper structure
- **Location**: `lib/api/fema-detailed-data.ts` - `getShelterData()` → `getMockShelterData()`
- **Action Needed**: ⚠️ REQUIRES REAL API - Currently no government API available for real-time shelter locations

---

## SUMMARY

### ✅ Confirmed Real-Time (6 sources):
1. Weather Alerts (NOAA)
2. FEMA Disasters
3. Earthquakes (USGS)
4. Historical Disasters (FEMA)
5. Risk Index (FEMA NRI)
6. EMPG Grants (FEMA)

### ⚠️ Attempting Real-Time (3 sources):
7. Hospitals (CMS) - API exists, may work
8. Schools (NCES) - API exists, may work
9. Demographics (Census) - API exists, may work

### ❌ Currently Mock Only (1 source):
10. Shelters - No public API available

---

## RECOMMENDATIONS

### Priority 1: Verify Hybrid Sources
Test the following APIs to confirm they return real data:
- [ ] CMS Hospital Compare API
- [ ] NCES Education Data API
- [ ] US Census Bureau API

### Priority 2: Find Shelter Data
- [ ] Check state-level emergency management APIs
- [ ] Check Red Cross API for shelter locations
- [ ] Consider using Google Places API for emergency shelter facilities

### Priority 3: Data Quality
- [x] Weather alerts - CONFIRMED WORKING
- [x] FEMA disasters - CONFIRMED WORKING
- [x] Earthquakes - CONFIRMED WORKING
- [x] Risk Index - CONFIRMED WORKING (with proxy)
- [ ] Hospitals - NEEDS VERIFICATION
- [ ] Schools - NEEDS VERIFICATION
- [ ] Demographics - NEEDS VERIFICATION
- [ ] Shelters - NEEDS REAL API SOURCE

---

## OVERALL ASSESSMENT

**Current Real-Time Coverage: ~60-75%**
- Core emergency data (alerts, disasters, earthquakes) = 100% real-time ✅
- Infrastructure data (hospitals, schools) = Attempting real-time, using fallback ⚠️
- Shelter data = Mock data only (no public API) ❌

**Action Plan:**
1. Test hospital, school, and census APIs in browser console
2. Find or create API proxy routes if CORS issues exist
3. Research alternative shelter data sources (Red Cross, state APIs)
