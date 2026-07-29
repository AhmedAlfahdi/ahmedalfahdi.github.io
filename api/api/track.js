// Vercel Serverless Function for tracking page views
// Deploy this to Vercel by creating an 'analytics-api' directory and deploying it
// Uses Upstash Redis (compatible with @vercel/kv)

import { kv } from '@vercel/kv';

// Check if an IP address is localhost
function isLocalhost(ip) {
  if (!ip || ip === 'unknown') return false;
  const ipLower = ip.toLowerCase().trim();
  // Check for IPv4 localhost (127.0.0.0/8 range)
  if (ipLower === '127.0.0.1' || ipLower === 'localhost' || ipLower.startsWith('127.')) {
    return true;
  }
  // Check for IPv6 localhost
  if (ipLower === '::1' || ipLower === '::ffff:127.0.0.1') {
    return true;
  }
  return false;
}

// Optional: external IP geolocation fallback when Vercel geo headers are missing
async function lookupGeoFromIp(ip) {
  try {
    if (!ip || ip === 'unknown') return null;

    const response = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`);
    if (!response.ok) {
      console.warn('Geo lookup failed with status', response.status);
      return null;
    }

    const data = await response.json();

    const lat = typeof data.latitude === 'number' ? data.latitude : parseFloat(data.latitude);
    const lon = typeof data.longitude === 'number' ? data.longitude : parseFloat(data.longitude);

    return {
      countryCode: data.country_code || null,
      regionCode: data.region_code || null,
      city: data.city || null,
      latitude: Number.isFinite(lat) ? lat : null,
      longitude: Number.isFinite(lon) ? lon : null,
    };
  } catch (error) {
    console.warn('Geo lookup error for IP', ip, error);
    return null;
  }
}

export default async function handler(req, res) {
  // Enable CORS - allow all origins
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Lightweight version marker + header keys for debugging in Vercel logs
    console.log('analytics-track v2', {
      vercelEnv: process.env.VERCEL_ENV,
      headerKeys: Object.keys(req.headers || {}),
      now: new Date().toISOString(),
    });

    // Extract IP from headers (Vercel provides this)
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 
               req.headers['x-real-ip'] || 
               'unknown';

    // Extract basic geo information from Vercel Edge headers (if available)
    // See: https://vercel.com/docs/concepts/edge-network/headers#geolocation
    const countryCode = req.headers['x-vercel-ip-country'] || null;
    const regionCode = req.headers['x-vercel-ip-country-region'] || null;
    const city = req.headers['x-vercel-ip-city'] || null;
    const latitudeHeader = req.headers['x-vercel-ip-latitude'];
    const longitudeHeader = req.headers['x-vercel-ip-longitude'];

    const latitude = typeof latitudeHeader === 'string' ? parseFloat(latitudeHeader) : null;
    const longitude = typeof longitudeHeader === 'string' ? parseFloat(longitudeHeader) : null;

    // Normalize into user-friendly fields while still keeping raw codes
    let geo = {
      countryCode,
      regionCode,
      city,
      latitude: Number.isFinite(latitude) ? latitude : null,
      longitude: Number.isFinite(longitude) ? longitude : null,
    };

    // If Vercel headers did not provide geo, fall back to external IP lookup
    if (!geo.countryCode && !geo.city && (geo.latitude === null || geo.longitude === null)) {
      const fallbackGeo = await lookupGeoFromIp(ip);
      if (fallbackGeo) {
        geo = fallbackGeo;
      }
    }

    console.log('analytics-track geo', { ip, geo });

    // Skip tracking if IP is localhost
    if (isLocalhost(ip)) {
      console.log('Skipping localhost visit:', ip);
      return res.status(200).json({ success: true, skipped: true, reason: 'localhost' });
    }

    const visitData = {
      ...req.body,
      ip: ip,
      timestamp: new Date().toISOString(),
      ...geo,
    };

    // Store visit in a list (keeps last 10,000 visits)
    await kv.lpush('visits', JSON.stringify(visitData));
    await kv.ltrim('visits', 0, 9999); // Keep only last 10,000

    // Track unique IPs in a set (network-level identification)
    await kv.sadd('unique_ips', ip);

    // Track unique visitors by visitorId (browser-level identification)
    // This is more accurate than IP because:
    // - Multiple people behind same IP (NAT, corporate) = multiple visitors, one IP
    // - Same person on different networks = one visitor, multiple IPs
    if (req.body.visitorId) {
      await kv.sadd('unique_visitors', req.body.visitorId);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
