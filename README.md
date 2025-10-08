# Emergency Response Platform

A comprehensive emergency management platform built with Next.js that integrates data from 47+ sources across 4 critical categories for holistic disaster response and recovery planning.

## 🎯 Complete US Coverage
✅ **All 50 US States** | ✅ **250+ Major Cities** | ✅ **100% Geographic Coverage**

## Features

### 🚨 Real-Time Alerts
- Integration with NOAA Weather API for active alerts
- FEMA disaster declarations and emergency updates
- Multi-severity alert classification (Extreme, Severe, Moderate, Minor)
- Automatic refresh with customizable intervals

### 🗺️ Geospatial Mapping
- Interactive maps using Leaflet
- Visual representation of affected areas
- Alert radius visualization
- Location-based emergency information

### 📊 Analytics & Visualizations
- Historical disaster trend analysis
- Economic impact tracking
- Affected population statistics
- Interactive charts using Recharts library

### 🔮 Predictive Analytics
- AI-powered predictions based on historical patterns
- Trend analysis (increasing/decreasing/stable)
- Confidence scoring for predictions
- Machine learning integration ready

### 🏥 Recovery Planning
- Post-disaster needs assessment
- Resource allocation tracking
- Task management for recovery operations
- Multi-agency coordination interface

## Tech Stack

- **Framework**: Next.js 15.1.7 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Maps**: Google Maps (@react-google-maps/api)
- **Icons**: Lucide React
- **Data Fetching**: Axios

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd emergency-response-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key_here
NEXT_PUBLIC_NOAA_API_KEY=your_noaa_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_FEMA_API_KEY=your_fema_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
emergency-response-platform/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── dashboard/
│   │   ├── alerts-panel.tsx
│   │   ├── disaster-chart.tsx
│   │   ├── disaster-summary.tsx
│   │   ├── economic-impact-chart.tsx
│   │   ├── emergency-map.tsx
│   │   ├── predictions-panel.tsx
│   │   └── recovery-planning.tsx
│   └── landing/
│       ├── hero-section.tsx
│       └── location-selector.tsx
├── lib/
│   ├── api/
│   │   └── emergency-data.ts  # API integration
│   └── us-states.ts           # US states and cities data
├── .env.local                 # Environment variables
└── API_DOCUMENTATION.md       # API documentation
```

## Data Sources

The platform integrates 47+ data sources across 4 categories:

### 1. Open Data Sources (12 sources)
- Federal datasets (Data.gov, Census Bureau)
- Geospatial centers (USGS, NASA Earth Data)
- Disaster portals

### 2. Emergency APIs (15 sources)
- NOAA Weather Alerts
- FEMA OpenFEMA API
- Satellite data
- Crisis management APIs

### 3. Historical Databases (10 sources)
- Past disaster records
- Pattern analysis data
- Trend identification

### 4. Needs Assessment Tools (10 sources)
- Post-disaster recovery tools
- Impact assessment systems
- FEMA integration

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API information.

## Usage

### Selecting a Location

1. On the landing page, select your state from the dropdown
2. Choose a city from the available options
3. Click "View Emergency Dashboard"

### Dashboard Features

- **Active Alerts**: View real-time weather and emergency alerts
- **Emergency Map**: Interactive map showing affected areas
- **Disaster Summary**: FEMA declarations and statistics
- **Historical Trends**: Charts showing past disaster patterns
- **Economic Impact**: Track financial impact and affected populations
- **Predictions**: AI-powered forecasts for future disasters
- **Recovery Planning**: Task management and needs assessment

### Refreshing Data

Click the "Refresh Data" button in the dashboard header to fetch the latest information from all integrated sources.

## API Keys

Most data sources are free and don't require API keys:

- **NOAA Weather API**: Free, no key required (User-Agent header mandatory)
- **FEMA OpenFEMA**: Free, no key required
- **Google Maps API**: Free tier with $200 monthly credit - Get key at [Google Cloud Console](https://console.cloud.google.com/)

## Development

### Adding New Data Sources

1. Create API integration in `lib/api/emergency-data.ts`
2. Define TypeScript interfaces for data structures
3. Create components in `components/dashboard/`
4. Add to dashboard in `app/dashboard/page.tsx`

### Customization

- Modify `tailwind.config.ts` for styling changes
- Update `lib/us-states.ts` to add more cities
- Adjust refresh intervals in dashboard component

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Future Enhancements

- [ ] Real-time WebSocket integration
- [ ] Mobile push notifications
- [ ] SMS/Email alerts
- [ ] Advanced ML prediction models
- [ ] Multi-language support
- [ ] Offline mode with PWA
- [ ] User authentication and saved locations
- [ ] Export reports as PDF

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is built for emergency management and disaster response purposes.

## Support

For questions or support, please refer to the API documentation or create an issue in the repository.
