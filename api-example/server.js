// Example backend API for visitor analytics
// This is a simple Express server that you can deploy to Heroku, Railway, Render, etc.

const express = require('express');
const cors = require('cors');
const app = express();

// For production, use a real database like MongoDB, PostgreSQL, or Vercel KV
// This example uses in-memory storage (data will be lost on restart)
const visits = [];
const uniqueIPs = new Set();

app.use(cors());
app.use(express.json());

// Extract IP address from request
function getClientIP(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

// POST /api/track - Track a page view
app.post('/api/track', (req, res) => {
  try {
    const ip = getClientIP(req);
    const visitData = {
      ...req.body,
      ip: ip,
      timestamp: new Date().toISOString(),
    };

    // Store visit
    visits.push(visitData);
    
    // Track unique IPs
    uniqueIPs.add(ip);

    // In production, limit array size to prevent memory issues
    if (visits.length > 10000) {
      visits.shift(); // Remove oldest
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/stats - Get statistics
app.get('/api/stats', (req, res) => {
  try {
    // Count page views per path
    const pageCounts = {};
    visits.forEach(visit => {
      pageCounts[visit.path] = (pageCounts[visit.path] || 0) + 1;
    });

    // Get top pages
    const topPages = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get recent visitors (last 20)
    const recentVisitors = visits
      .slice(-20)
      .reverse()
      .map(v => ({
        ip: v.ip,
        path: v.path,
        timestamp: v.timestamp,
      }));

    res.json({
      totalViews: visits.length,
      distinctIPs: uniqueIPs.size,
      uniqueVisitors: uniqueIPs.size,
      topPage: topPages[0]?.path || '/',
      topPages: topPages,
      recentVisitors: recentVisitors,
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Analytics API server running on port ${PORT}`);
  console.log(`Track endpoint: http://localhost:${PORT}/api/track`);
  console.log(`Stats endpoint: http://localhost:${PORT}/api/stats`);
});

