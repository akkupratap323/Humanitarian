import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get('state');

  if (!state) {
    return NextResponse.json({ error: 'State parameter is required' }, { status: 400 });
  }

  try {
    console.log(`Fetching hospital data for state: ${state}`);

    // CMS Hospital General Information API
    const response = await axios.get(
      'https://data.cms.gov/provider-data/api/1/datastore/query/xubh-q36u/0',
      {
        params: {
          conditions: JSON.stringify([
            { property: 'state', value: state.toUpperCase() }
          ]),
          limit: 50,
          offset: 0
        },
        timeout: 15000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'EmergencyResponsePlatform/1.0',
        }
      }
    );

    console.log('Hospital API response received');

    if (response.data && response.data.results && response.data.results.length > 0) {
      return NextResponse.json(response.data.results);
    }

    return NextResponse.json([]);
  } catch (error: any) {
    console.error('Error fetching hospital data:', error.message);
    return NextResponse.json({ error: error.message, fallback: true }, { status: 500 });
  }
}
