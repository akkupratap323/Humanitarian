import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get('state');

  if (!state) {
    return NextResponse.json({ error: 'State parameter is required' }, { status: 400 });
  }

  try {
    console.log(`Fetching school data for state: ${state}`);

    // NCES Education Data Portal API via Urban Institute
    const response = await axios.get(
      `https://educationdata.urban.org/api/v1/schools/ccd/directory/2022/`,
      {
        params: {
          state_location: state.toUpperCase(),
          per_page: 100
        },
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'EmergencyResponsePlatform/1.0',
        }
      }
    );

    console.log('School API response received');

    if (response.data && response.data.results && response.data.results.length > 0) {
      return NextResponse.json(response.data.results);
    }

    return NextResponse.json([]);
  } catch (error: any) {
    console.error('Error fetching school data:', error.message);
    return NextResponse.json({ error: error.message, fallback: true }, { status: 500 });
  }
}
