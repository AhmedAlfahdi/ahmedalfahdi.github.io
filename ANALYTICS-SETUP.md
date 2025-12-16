# Analytics Setup Guide

This guide explains how to set up visitor tracking and statistics for your website.

## Recommended Solution: Vercel

**For the easiest setup, use Vercel Serverless Functions + Vercel KV.** See the `vercel-api/` folder for a ready-to-deploy solution. This is the recommended approach because:
- Free tier is generous (100GB bandwidth, 100GB storage)
- No server management required
- Easy deployment from GitHub
- Perfect for static sites
- Global CDN for fast performance

See `vercel-api/README.md` for detailed setup instructions.

## Overview

The website includes a visitor tracking system that:
- Tracks page views and visitor information
- Stores visitor IP addresses (for distinct IP counting)
- Provides a statistics page showing visitor data

## Components

1. **VisitorTracker.astro** - Client-side tracking component that sends page view data
2. **statistics.astro** - Statistics page that displays visitor analytics
3. **Backend API** - Required to store and retrieve visitor data

## Backend API Requirements

You need to set up a backend API with two endpoints:

### 1. POST `/api/track`

Receives page view data from the tracking component.

**Request Body:**
```json
{
  "path": "/",
  "referrer": "https://example.com",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "screenWidth": 1920,
  "screenHeight": 1080,
  "language": "en-US"
}
```

**Response:** 200 OK (or 201 Created)

**Implementation Notes:**
- Extract the visitor's IP address from the request headers
- Store the visit data in a database
- Track distinct IPs by storing unique IP addresses

### 2. GET `/api/stats`

Returns statistics about website visitors.

**Response:**
```json
{
  "totalViews": 1234,
  "distinctIPs": 456,
  "uniqueVisitors": 789,
  "topPage": "/",
  "topPages": [
    { "path": "/", "count": 234 },
    { "path": "/notes", "count": 189 }
  ],
  "recentVisitors": [
    {
      "ip": "192.168.1.1",
      "path": "/",
      "timestamp": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

## Backend Implementation Options

### Option 1: Vercel Serverless Functions (Recommended)

1. Create a `api/` directory in your project root
2. Create `api/track.js` and `api/stats.js`
3. Use a database like Vercel KV, Supabase, or MongoDB

**Example `api/track.js`:**
```javascript
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  const visitData = {
    ...req.body,
    ip: ip.split(',')[0].trim(), // Get first IP if multiple
    timestamp: new Date().toISOString(),
  };

  // Store in Vercel KV
  await kv.lpush('visits', JSON.stringify(visitData));
  await kv.sadd('unique_ips', visitData.ip);

  res.status(200).json({ success: true });
}
```

**Example `api/stats.js`:**
```javascript
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const visits = await kv.lrange('visits', 0, -1);
  const uniqueIPs = await kv.smembers('unique_ips');
  
  const visitData = visits.map(v => JSON.parse(v));
  const pageCounts = {};
  
  visitData.forEach(visit => {
    pageCounts[visit.path] = (pageCounts[visit.path] || 0) + 1;
  });

  const topPages = Object.entries(pageCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  res.json({
    totalViews: visitData.length,
    distinctIPs: uniqueIPs.length,
    uniqueVisitors: uniqueIPs.length, // Can be enhanced with cookie-based tracking
    topPage: topPages[0]?.path || '/',
    topPages: topPages,
    recentVisitors: visitData
      .slice(-20)
      .reverse()
      .map(v => ({ ip: v.ip, path: v.path, timestamp: v.timestamp })),
  });
}
```

### Option 2: Netlify Functions

Similar to Vercel, create functions in `netlify/functions/` directory.

### Option 3: Node.js/Express Server

Deploy a simple Express server to Heroku, Railway, or similar:

```javascript
const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

app.use(express.json());
app.use(cors());

// POST /api/track
app.post('/api/track', async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const visit = {
    ...req.body,
    ip: ip.split(',')[0].trim(),
    timestamp: new Date(),
  };
  
  await db.collection('visits').insertOne(visit);
  await db.collection('ips').updateOne(
    { ip: visit.ip },
    { $set: { ip: visit.ip } },
    { upsert: true }
  );
  
  res.json({ success: true });
});

// GET /api/stats
app.get('/api/stats', async (req, res) => {
  const totalViews = await db.collection('visits').countDocuments();
  const distinctIPs = await db.collection('ips').countDocuments();
  
  // Aggregate top pages
  const topPages = await db.collection('visits')
    .aggregate([
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { path: '$_id', count: 1, _id: 0 } }
    ])
    .toArray();
  
  const recentVisitors = await db.collection('visits')
    .find()
    .sort({ timestamp: -1 })
    .limit(20)
    .project({ ip: 1, path: 1, timestamp: 1 })
    .toArray();
  
  res.json({
    totalViews,
    distinctIPs,
    uniqueVisitors: distinctIPs,
    topPage: topPages[0]?.path || '/',
    topPages,
    recentVisitors: recentVisitors.map(v => ({
      ip: v.ip,
      path: v.path,
      timestamp: v.timestamp.toISOString(),
    })),
  });
});

app.listen(process.env.PORT || 3000);
```

### Option 4: Supabase (PostgreSQL)

Use Supabase's PostgreSQL database with Row Level Security:

```sql
-- Create visits table
CREATE TABLE visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip INET,
  path TEXT,
  referrer TEXT,
  user_agent TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique IPs table
CREATE TABLE unique_ips (
  ip INET PRIMARY KEY,
  first_seen TIMESTAMPTZ DEFAULT NOW()
);
```

## Configuration

1. Set the `PUBLIC_ANALYTICS_API` environment variable in your Astro project:

**For local development:**
Create a `.env` file:
```
PUBLIC_ANALYTICS_API=http://localhost:3000/api
```

**For production:**
- Vercel: Add in Project Settings > Environment Variables
- Netlify: Add in Site Settings > Environment Variables
- GitHub Pages: Use build-time environment variables (set in GitHub Actions)

2. Update `astro.config.mjs` if needed to include environment variables in the build.

## Privacy Considerations

- **IP Address Storage**: Consider GDPR/privacy regulations in your jurisdiction
- **Data Retention**: Implement automatic deletion of old visit data
- **Anonymization**: Consider hashing IP addresses before storage
- **Cookie Consent**: May be required depending on your location

## Testing

1. Start your backend API
2. Set `PUBLIC_ANALYTICS_API` to your API endpoint
3. Visit pages on your website
4. Check `/statistics` page to see if data is being collected

## Troubleshooting

- **No data showing**: Check browser console for API errors
- **CORS errors**: Ensure your API allows requests from your domain
- **IP not detected**: Check that your backend correctly extracts IP from headers
- **Statistics not updating**: Verify the API endpoint is correct and accessible

## Alternative: Third-Party Analytics

If you prefer not to build your own backend, consider:
- **Plausible Analytics** - Privacy-focused, GDPR compliant
- **GoatCounter** - Open source, simple analytics
- **Umami** - Self-hosted analytics platform

These services provide visitor statistics but may not show raw IP addresses.

