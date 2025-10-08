import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Helper function to get state FIPS codes
function getStateFipsCode(state: string): string {
  const fipsCodes: Record<string, string> = {
    AL: '01', AK: '02', AZ: '04', AR: '05', CA: '06', CO: '08', CT: '09', DE: '10',
    FL: '12', GA: '13', HI: '15', ID: '16', IL: '17', IN: '18', IA: '19', KS: '20',
    KY: '21', LA: '22', ME: '23', MD: '24', MA: '25', MI: '26', MN: '27', MS: '28',
    MO: '29', MT: '30', NE: '31', NV: '32', NH: '33', NJ: '34', NM: '35', NY: '36',
    NC: '37', ND: '38', OH: '39', OK: '40', OR: '41', PA: '42', RI: '44', SC: '45',
    SD: '46', TN: '47', TX: '48', UT: '49', VT: '50', VA: '51', WA: '53', WV: '54',
    WI: '55', WY: '56', DC: '11',
  };
  return fipsCodes[state.toUpperCase()] || '01';
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get('state');

  if (!state) {
    return NextResponse.json({ error: 'State parameter is required' }, { status: 400 });
  }

  try {
    console.log(`Fetching demographics data for state: ${state}`);

    const stateFips = getStateFipsCode(state);

    // US Census Bureau API - ACS 5-Year Estimates
    // Variables: B01003_001E (Total Population), B19013_001E (Median Household Income)
    const response = await axios.get(
      `https://api.census.gov/data/2022/acs/acs5`,
      {
        params: {
          get: 'B01003_001E,B19013_001E,B25001_001E,B25002_001E,B01002_001E,B17001_002E,B23025_005E',
          for: `state:${stateFips}`,
        },
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'EmergencyResponsePlatform/1.0',
        }
      }
    );

    console.log('Census API response received');

    if (response.data && Array.isArray(response.data) && response.data.length > 1) {
      // First row is headers, second row is data
      const headers = response.data[0];
      const data = response.data[1];

      const result = {
        state: state.toUpperCase(),
        headers: headers,
        data: data
      };

      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'No data available' }, { status: 404 });
  } catch (error: any) {
    console.error('Error fetching demographics data:', error.message);
    return NextResponse.json({ error: error.message, fallback: true }, { status: 500 });
  }
}
