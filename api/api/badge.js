// Vercel Serverless Function for badge/shield endpoints
// Returns visitor count in a format compatible with GitHub shields
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

export default async function handler(req, res) {
  // Enable CORS - allow all origins (important for badges)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get all visits
    const visits = await kv.lrange('visits', 0, -1) || [];
    const uniqueIPs = await kv.smembers('unique_ips') || [];
    const uniqueVisitorIds = await kv.smembers('unique_visitors') || [];

    // Parse visit data
    const visitData = visits.length > 0 
      ? visits.map(v => {
          try {
            return typeof v === 'string' ? JSON.parse(v) : v;
          } catch (e) {
            return null;
          }
        }).filter(v => v !== null)
      : [];

    // Filter out localhost visits
    const nonLocalhostVisits = visitData.filter(v => v && !isLocalhost(v.ip));
    const pageViews = nonLocalhostVisits.filter(v => !v.eventType || v.eventType !== 'page_exit');

    // Calculate unique visitors from filtered pageViews
    const uniqueVisitorIdsFromFiltered = new Set(
      pageViews
        .map(v => v.visitorId)
        .filter(Boolean)
    );

    // Filter out localhost IPs
    const nonLocalhostIPs = uniqueIPs.filter(ip => !isLocalhost(ip));

    // Get the metric type from query parameter (default: visitors)
    const metric = req.query.metric || 'visitors';
    let value;

    switch (metric) {
      case 'visitors':
        value = uniqueVisitorIdsFromFiltered.size;
        break;
      case 'views':
        value = pageViews.length;
        break;
      case 'ips':
        value = nonLocalhostIPs.length;
        break;
      default:
        value = uniqueVisitorIdsFromFiltered.size;
    }

    // Return format based on Accept header or query parameter
    const format = req.query.format || (req.headers.accept?.includes('application/json') ? 'json' : 'text');

    if (format === 'json') {
      return res.status(200).json({
        schemaVersion: 1,
        label: 'visitors',
        message: String(value),
        color: 'blue'
      });
    }

    // Default: return simple text (for shields.io and similar services)
    // Format: just the number
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(String(value));

  } catch (error) {
    console.error('Error getting badge stats:', error);
    
    // Return error in a format badges can handle
    const format = req.query.format || (req.headers.accept?.includes('application/json') ? 'json' : 'text');
    
    if (format === 'json') {
      return res.status(500).json({
        schemaVersion: 1,
        label: 'visitors',
        message: 'error',
        color: 'red'
      });
    }
    
    res.setHeader('Content-Type', 'text/plain');
    return res.status(500).send('error');
  }
}
