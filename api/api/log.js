// Vercel Serverless Function for server-side request logging
// This logs ALL requests to your site, even if JavaScript is blocked
// Works as a backup to client-side tracking

import { kv } from '@vercel/kv';

// Check if an IP address is localhost
function isLocalhost(ip) {
  if (!ip || ip === 'unknown') return false;
  const ipLower = ip.toLowerCase().trim();
  if (ipLower === '127.0.0.1' || ipLower === 'localhost' || ipLower.startsWith('127.')) {
    return true;
  }
  if (ipLower === '::1' || ipLower === '::ffff:127.0.0.1') {
    return true;
  }
  return false;
}

// Parse User-Agent for basic info
function parseUserAgent(userAgent) {
  if (!userAgent) return { browser: null, os: null, deviceType: 'unknown' };
  
  const ua = userAgent.toLowerCase();
  
  let deviceType = 'desktop';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    deviceType = 'mobile';
  } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = 'tablet';
  }
  
  let browser = null;
  if (ua.includes('chrome') && !ua.includes('edg') && !ua.includes('opr')) {
    browser = 'chrome';
  } else if (ua.includes('firefox')) {
    browser = 'firefox';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'safari';
  } else if (ua.includes('edg')) {
    browser = 'edge';
  } else if (ua.includes('opr') || ua.includes('opera')) {
    browser = 'opera';
  }
  
  let os = null;
  if (ua.includes('windows')) {
    os = 'windows';
  } else if (ua.includes('mac os x') || ua.includes('macintosh')) {
    os = 'macos';
  } else if (ua.includes('linux')) {
    os = 'linux';
  } else if (ua.includes('android')) {
    os = 'android';
  } else if (ua.includes('iphone') || ua.includes('ipad')) {
    os = 'ios';
  }
  
  return { browser, os, deviceType };
}

export default async function handler(req, res) {
  // Enable CORS
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract IP from headers
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 
               req.headers['x-real-ip'] || 
               'unknown';

    // Skip localhost
    if (isLocalhost(ip)) {
      return res.status(200).json({ success: true, skipped: true, reason: 'localhost' });
    }

    // Extract path from query parameter (sent by image pixel or fetch)
    const path = req.query.path || '/';
    const referrer = req.query.ref || req.headers.referer || 'direct';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Extract geo from Vercel headers
    const countryCode = req.headers['x-vercel-ip-country'] || null;
    const regionCode = req.headers['x-vercel-ip-country-region'] || null;
    const city = req.headers['x-vercel-ip-city'] || null;
    const latitudeHeader = req.headers['x-vercel-ip-latitude'];
    const longitudeHeader = req.headers['x-vercel-ip-longitude'];
    const latitude = typeof latitudeHeader === 'string' ? parseFloat(latitudeHeader) : null;
    const longitude = typeof longitudeHeader === 'string' ? parseFloat(longitudeHeader) : null;

    // Parse User-Agent for basic info
    const deviceInfo = parseUserAgent(userAgent);

    // Create server-side log entry
    const logEntry = {
      ip,
      path,
      referrer,
      userAgent,
      timestamp: new Date().toISOString(),
      source: 'server-log', // Mark as server-side log
      countryCode,
      regionCode,
      city,
      latitude: Number.isFinite(latitude) ? latitude : null,
      longitude: Number.isFinite(longitude) ? longitude : null,
      ...deviceInfo,
    };

    // Store in a separate list for server-side logs
    await kv.lpush('server_logs', JSON.stringify(logEntry));
    await kv.ltrim('server_logs', 0, 9999); // Keep last 10,000

    // Also track unique IPs
    await kv.sadd('unique_ips', ip);

    // Return a 1x1 transparent pixel
    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );

    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.status(200).send(pixel);

  } catch (error) {
    console.error('Error in server log:', error);
    // Still return pixel even on error
    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );
    res.setHeader('Content-Type', 'image/gif');
    res.status(200).send(pixel);
  }
}
