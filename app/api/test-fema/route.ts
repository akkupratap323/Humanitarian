import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state') || 'CA';

  try {
    // Test FEMA Disaster Declarations API
    const response = await axios.get(
      `https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries`,
      {
        params: {
          $filter: `state eq '${state}'`,
          $top: 10,
          $orderby: 'declarationDate desc'
        }
      }
    );

    const declarations = response.data.DisasterDeclarationsSummaries || [];

    // Map to our format
    const mappedDeclarations = declarations.map((item: any) => ({
      id: item.disasterNumber || item.femaDeclarationString,
      type: item.declarationType === 'DR' ? 'Major Disaster' :
            item.declarationType === 'EM' ? 'Emergency' :
            item.declarationType === 'FM' ? 'Fire Management' : 'Other',
      title: item.declarationTitle || item.incidentType,
      state: item.state,
      county: item.designatedArea || 'Multiple Counties',
      declaredDate: item.declarationDate || item.incidentBeginDate,
      incidentType: item.incidentType || 'Unknown',
      incidentBeginDate: item.incidentBeginDate,
      incidentEndDate: item.incidentEndDate,
      status: item.declarationDate &&
              new Date(item.declarationDate) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
              ? 'Active' : 'Closed',
    }));

    return NextResponse.json({
      success: true,
      state: state,
      totalRecords: declarations.length,
      declarations: mappedDeclarations,
      rawSample: declarations[0], // Show one raw record for reference
      metadata: response.data.metadata,
      message: 'FEMA API is working correctly',
      apiEndpoint: `https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$filter=state eq '${state}'&$top=10&$orderby=declarationDate desc`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.response?.data || 'No additional details',
        state: state,
      },
      { status: 500 }
    );
  }
}
