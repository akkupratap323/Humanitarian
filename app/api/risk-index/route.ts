import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get('state');

  if (!state) {
    return NextResponse.json({ error: 'State parameter is required' }, { status: 400 });
  }

  try {
    console.log(`Fetching Risk Index data for state: ${state}`);

    // Try FEMA National Risk Index API
    const response = await axios.get(
      'https://hazards.fema.gov/nri/api/v1/counties',
      {
        params: {
          state: state.toUpperCase(),
        },
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'EmergencyResponsePlatform/1.0',
        }
      }
    );

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      return NextResponse.json(response.data);
    }

    // If no data, return empty array
    return NextResponse.json([]);
  } catch (error: any) {
    console.error('Error fetching risk index data:', error.message);

    // Return error status but don't fail completely
    return NextResponse.json({ error: error.message, fallback: true }, { status: 500 });
  }
}
