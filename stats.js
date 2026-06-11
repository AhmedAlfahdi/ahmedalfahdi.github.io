// Vercel Serverless Function for getting statistics
// Deploy this to Vercel
// Uses Upstash Redis (compatible with @vercel/kv)

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

// Check if a traffic source is localhost
function isLocalhostSource(source) {
  if (!source) return false;
  const sourceLower = source.toLowerCase().trim();
  return sourceLower === 'localhost' || 
         sourceLower.includes('localhost') || 
         sourceLower.includes('127.0.0.1') ||
         sourceLower.startsWith('http://localhost') ||
         sourceLower.startsWith('https://localhost');
}

export default async function handler(req, res) {
  // Enable CORS - allow all origins
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get all visits - handle empty case
    const visits = await kv.lrange('visits', 0, -1) || [];
    // Get server-side logs (backup tracking)
    const serverLogs = await kv.lrange('server_logs', 0, -1) || [];
    const uniqueIPs = await kv.smembers('unique_ips') || [];
    const uniqueVisitorIds = await kv.smembers('unique_visitors') || [];

    // Parse visit data - handle empty array
    const visitData = visits.length > 0 
      ? visits.map(v => {
          try {
            return typeof v === 'string' ? JSON.parse(v) : v;
          } catch (e) {
            console.warn('Failed to parse visit:', v, e);
            return null;
          }
        }).filter(v => v !== null)
      : [];
    
    // Parse server logs and merge with visit data
    const serverLogData = serverLogs.length > 0
      ? serverLogs.map(v => {
          try {
            return typeof v === 'string' ? JSON.parse(v) : v;
          } catch (e) {
            console.warn('Failed to parse server log:', v, e);
            return null;
          }
        }).filter(v => v !== null)
      : [];
    
    // Merge server logs with visits (server logs are backup, so only add if not already tracked)
    const allVisitData = [...visitData, ...serverLogData];

    // Filter out localhost visits
    const nonLocalhostVisits = allVisitData.filter(v => v && !isLocalhost(v.ip));

    // Filter out exit events for main analytics (keep them for engagement metrics)
    const pageViews = nonLocalhostVisits.filter(v => !v.eventType || v.eventType !== 'page_exit');
    const exitEvents = nonLocalhostVisits.filter(v => v.eventType === 'page_exit');

    // Filter out localhost IPs from unique IPs count
    const nonLocalhostIPs = uniqueIPs.filter(ip => !isLocalhost(ip));

    // Calculate unique visitors from filtered pageViews (excludes localhost)
    const uniqueVisitorIdsFromFiltered = new Set(
      pageViews
        .map(v => v.visitorId)
        .filter(Boolean)
    );

    // Count page views per path
    const pageCounts = {};
    pageViews.forEach(visit => {
      if (visit && visit.path) {
        pageCounts[visit.path] = (pageCounts[visit.path] || 0) + 1;
      }
    });

    // Get top pages
    const topPages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Device type breakdown
    const deviceTypes = {};
    pageViews.forEach(visit => {
      if (visit && visit.deviceType) {
        deviceTypes[visit.deviceType] = (deviceTypes[visit.deviceType] || 0) + 1;
      }
    });

    // Browser breakdown
    const browsers = {};
    pageViews.forEach(visit => {
      if (visit && visit.browser) {
        browsers[visit.browser] = (browsers[visit.browser] || 0) + 1;
      }
    });

    // OS breakdown
    const operatingSystems = {};
    pageViews.forEach(visit => {
      if (visit && visit.os) {
        operatingSystems[visit.os] = (operatingSystems[visit.os] || 0) + 1;
      }
    });

    // Traffic source breakdown
    const trafficSources = {};
    const sourceTypes = {};
    pageViews.forEach(visit => {
      if (visit && visit.sourceType && !isLocalhostSource(visit.sourceType)) {
        sourceTypes[visit.sourceType] = (sourceTypes[visit.sourceType] || 0) + 1;
      }
      if (visit && visit.source && !isLocalhostSource(visit.source)) {
        trafficSources[visit.source] = (trafficSources[visit.source] || 0) + 1;
      }
    });

    // Country breakdown (NEW)
    const countryCounts = {};
    pageViews.forEach(visit => {
      if (visit && visit.countryCode) {
        countryCounts[visit.countryCode] = (countryCounts[visit.countryCode] || 0) + 1;
      }
    });

    // New vs returning visitors
    let newVisitors = 0;
    let returningVisitors = 0;
    pageViews.forEach(visit => {
      if (visit && visit.isNewVisitor !== undefined) {
        if (visit.isNewVisitor) {
          newVisitors++;
        } else {
          returningVisitors++;
        }
      }
    });

    // Time patterns
    const visitsByHour = {};
    const visitsByDay = {};
    pageViews.forEach(visit => {
      if (visit && visit.hour !== undefined) {
        visitsByHour[visit.hour] = (visitsByHour[visit.hour] || 0) + 1;
      }
      if (visit && visit.dayName) {
        visitsByDay[visit.dayName] = (visitsByDay[visit.dayName] || 0) + 1;
      }
    });

    // Engagement metrics (from exit events)
    const timeOnPageValues = exitEvents
      .filter(e => e.timeOnPage && e.timeOnPage > 0)
      .map(e => e.timeOnPage);
    const scrollDepths = exitEvents
      .filter(e => e.scrollDepth !== undefined)
      .map(e => e.scrollDepth);

    const avgTimeOnPage = timeOnPageValues.length > 0
      ? Math.round(timeOnPageValues.reduce((a, b) => a + b, 0) / timeOnPageValues.length)
      : 0;
    const avgScrollDepth = scrollDepths.length > 0
      ? Math.round(scrollDepths.reduce((a, b) => a + b, 0) / scrollDepths.length)
      : 0;

    // Sessions
    const uniqueSessions = new Set(pageViews.map(v => v.sessionId).filter(Boolean));
    const pagesPerSession = {};
    pageViews.forEach(visit => {
      if (visit && visit.sessionId) {
        pagesPerSession[visit.sessionId] = (pagesPerSession[visit.sessionId] || 0) + 1;
      }
    });
    const avgPagesPerSession = Object.keys(pagesPerSession).length > 0
      ? Math.round((Object.values(pagesPerSession).reduce((a, b) => a + b, 0) / Object.keys(pagesPerSession).length) * 10) / 10
      : 0;

    // Bounce rate (sessions with only 1 page view)
    const sessionCount = Object.keys(pagesPerSession).length;
    let bounceRate = 0;
    if (sessionCount > 0) {
      const bounceSessions = Object.values(pagesPerSession).filter(pages => pages === 1).length;
      bounceRate = Math.round((bounceSessions / sessionCount) * 100);
    }

    // Recent visitors (last 20)
    const recentVisitors = pageViews.slice(-20).reverse();

    // Convert object breakdowns to sorted arrays for easier frontend consumption
    const toSortedArray = (obj) =>
      Object.entries(obj)
        .map(([key, count]) => ({ name: key, count }))
        .sort((a, b) => b.count - a.count);

    res.status(200).json({
      totalViews: pageViews.length,
      distinctIPs: nonLocalhostIPs.length,
      uniqueVisitors: uniqueVisitorIdsFromFiltered.size,
      topPage: topPages[0]?.path || '/',
      topPages,
      recentVisitors,
      deviceTypes: toSortedArray(deviceTypes),
      browsers: toSortedArray(browsers),
      operatingSystems: toSortedArray(operatingSystems),
      trafficSources: toSortedArray(trafficSources),
      sourceTypes: toSortedArray(sourceTypes),
      countries: toSortedArray(countryCounts),   // NEW
      countryCounts,                                // NEW (raw counts by code)
      newVisitors,
      returningVisitors,
      totalSessions: uniqueSessions.size,
      avgPagesPerSession,
      bounceRate,
      avgTimeOnPage,
      avgScrollDepth,
      timeOnPageValues,
      visitsByHour: toSortedArray(visitsByHour).sort((a, b) => parseInt(a.name) - parseInt(b.name)),
      visitsByDay: toSortedArray(visitsByDay),
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
