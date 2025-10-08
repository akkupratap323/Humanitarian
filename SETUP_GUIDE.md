# Emergency Response Platform - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd emergency-response-platform
npm install
```

### 2. Environment Configuration

Your `.env.local` file is already configured with:

```bash
# Weather and Emergency APIs
NEXT_PUBLIC_NOAA_API_KEY=zKFfmiFuFonHKMGlTxCJGUuXacrtvCOH

# Geospatial APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyCydm7eDfeEzBBxzsPty6L5ov7XRz7wcxo

# Emergency Data Sources
NEXT_PUBLIC_FEMA_API_KEY=your_fema_api_key_here
```

✅ **Google Maps API**: Already configured and ready to use!
✅ **NOAA API**: Configured with User-Agent header for compliance

### 3. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Google Maps API Setup (Already Done!)

Your Google Maps API key is already integrated. Here's what's been configured:

### Enabled Features:
- ✅ Interactive map with zoom/pan controls
- ✅ Custom markers for emergency locations
- ✅ Color-coded alert radius circles (by severity)
- ✅ Map type controls (satellite, terrain, roadmap)
- ✅ Full-screen mode

### API Key Configuration:
The key `AIzaSyCydm7eDfeEzBBxzsPty6L5ov7XRz7wcxo` has been added to:
1. `.env.local` file
2. Google Maps component (`google-emergency-map.tsx`)

### Required Google Cloud Services:
Make sure these are enabled in your Google Cloud Console:
- Maps JavaScript API
- Places API (optional, for location search)
- Geocoding API (optional, for address conversion)

**Free Tier**: $200/month credit = ~28,000 map loads

## Testing the APIs

### Test NOAA Weather API

Visit: [http://localhost:3000/test-api](http://localhost:3000/test-api)

This page allows you to:
- Select different US states
- Test real-time NOAA weather alerts
- View API response data
- Verify User-Agent header compliance

### Test the Dashboard

1. Go to [http://localhost:3000](http://localhost:3000)
2. Select a state (try California, Florida, or Texas)
3. Choose a city
4. Click "View Emergency Dashboard"

You'll see:
- Real-time weather alerts from NOAA
- Interactive Google Maps with alert zones
- Historical disaster data with charts
- AI-powered predictions
- Recovery planning interface

## Project Structure

```
emergency-response-platform/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── dashboard/page.tsx          # Main dashboard
│   ├── test-api/page.tsx          # API testing page
│   └── api/test-noaa/route.ts     # NOAA API test endpoint
├── components/
│   ├── dashboard/
│   │   ├── google-emergency-map.tsx    # Google Maps integration
│   │   ├── alerts-panel.tsx            # Weather alerts
│   │   ├── disaster-chart.tsx          # Historical trends
│   │   ├── economic-impact-chart.tsx   # Impact analysis
│   │   ├── predictions-panel.tsx       # AI predictions
│   │   └── recovery-planning.tsx       # Recovery tasks
│   └── landing/
│       ├── hero-section.tsx
│       └── location-selector.tsx
├── lib/
│   ├── api/emergency-data.ts       # API integration layer
│   └── us-states.ts               # State/city data
└── .env.local                     # Environment variables
```

## API Integration Details

### NOAA Weather API
- **Endpoint**: `https://api.weather.gov/alerts/active/area/{STATE}`
- **Authentication**: User-Agent header (configured)
- **Rate Limit**: Respectful usage with caching
- **Status**: ✅ Working

### Google Maps API
- **Library**: @react-google-maps/api
- **Key**: Configured in .env.local
- **Features**: Markers, circles, custom styling
- **Status**: ✅ Ready to use

### FEMA API
- **Endpoint**: `https://www.fema.gov/api/open/v2/`
- **Authentication**: None required
- **Data**: Disaster declarations, emergency management
- **Status**: ✅ Available

## Features Checklist

- ✅ Landing page with state/city selector
- ✅ Real-time NOAA weather alerts
- ✅ Google Maps with alert visualization
- ✅ FEMA disaster declarations
- ✅ Historical data charts (Recharts)
- ✅ Economic impact analysis
- ✅ AI-powered predictions
- ✅ Recovery planning interface
- ✅ Responsive design (mobile-friendly)
- ✅ API testing page

## Common Issues & Solutions

### Issue: Map not loading
**Solution**: Check if Google Maps API key is valid and Maps JavaScript API is enabled in Google Cloud Console.

### Issue: No weather alerts showing
**Solution**: This is normal! Many states have no active alerts. Try different states or check the test-api page to verify the API is working.

### Issue: CORS errors
**Solution**: APIs are called from the server-side (Next.js API routes) to avoid CORS issues.

## Next Steps

1. **Add More Cities**: Edit `lib/us-states.ts` to add more cities
2. **Customize Alerts**: Modify severity thresholds in `alerts-panel.tsx`
3. **Enhance Predictions**: Integrate real ML models in `emergency-data.ts`
4. **Add Notifications**: Implement push notifications for critical alerts
5. **Export Reports**: Add PDF export functionality

## Support

- 📖 **Full Documentation**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- 🔧 **Main README**: See [README.md](./README.md)

## Production Deployment

Ready to deploy? The app is configured for Vercel:

```bash
npm run build
npm start
```

Or deploy directly to Vercel:
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

---

**Status**: ✅ All systems ready! Your Emergency Response Platform is fully configured and ready to use.
