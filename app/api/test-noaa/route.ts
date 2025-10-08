import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state') || 'CA';

  try {
    // Create axios instance with User-Agent header
    const noaaApi = axios.create({
      headers: {
        'User-Agent': 'EmergencyResponsePlatform/1.0 (contact@emergency-platform.com)',
      },
    });

    // Test NOAA Weather Alerts API
    const alertsResponse = await noaaApi.get(
      `https://api.weather.gov/alerts/active/area/${state}`
    );

    // Test NOAA Weather Points API (using a sample coordinate)
    const lat = 34.0522;
    const lon = -118.2437;
    const pointsResponse = await noaaApi.get(
      `https://api.weather.gov/points/${lat},${lon}`
    );

    return NextResponse.json({
      success: true,
      state: state,
      alerts: {
        count: alertsResponse.data.features?.length || 0,
        data: alertsResponse.data.features?.slice(0, 2) || [],
        title: alertsResponse.data.title,
        updated: alertsResponse.data.updated,
      },
      forecast: {
        gridId: pointsResponse.data.properties?.gridId,
        office: pointsResponse.data.properties?.cwa,
        forecastUrl: pointsResponse.data.properties?.forecast,
      },
      message: 'NOAA API is working correctly with User-Agent header',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.response?.data || 'No additional details',
      },
      { status: 500 }
    );
  }
}
