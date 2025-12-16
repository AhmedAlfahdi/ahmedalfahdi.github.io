// Utility functions for analytics data parsing

/**
 * Parse user agent to extract device, browser, and OS information
 */
export function parseUserAgent(userAgent) {
  const ua = userAgent.toLowerCase();
  
  // Device type
  let deviceType = 'desktop';
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    deviceType = 'mobile';
  } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = 'tablet';
  }
  
  // Browser detection
  let browser = 'unknown';
  let browserVersion = '';
  
  if (ua.includes('chrome') && !ua.includes('edg') && !ua.includes('opr')) {
    browser = 'chrome';
    const match = ua.match(/chrome\/([\d.]+)/);
    browserVersion = match ? match[1] : '';
  } else if (ua.includes('firefox')) {
    browser = 'firefox';
    const match = ua.match(/firefox\/([\d.]+)/);
    browserVersion = match ? match[1] : '';
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'safari';
    const match = ua.match(/version\/([\d.]+)/);
    browserVersion = match ? match[1] : '';
  } else if (ua.includes('edg')) {
    browser = 'edge';
    const match = ua.match(/edg\/([\d.]+)/);
    browserVersion = match ? match[1] : '';
  } else if (ua.includes('opr') || ua.includes('opera')) {
    browser = 'opera';
    const match = ua.match(/(?:opr|opera)\/([\d.]+)/);
    browserVersion = match ? match[1] : '';
  }
  
  // Operating system
  let os = 'unknown';
  if (ua.includes('windows')) {
    os = 'windows';
    if (ua.includes('windows nt 10')) os = 'windows 10/11';
    else if (ua.includes('windows nt 6.3')) os = 'windows 8.1';
    else if (ua.includes('windows nt 6.2')) os = 'windows 8';
    else if (ua.includes('windows nt 6.1')) os = 'windows 7';
  } else if (ua.includes('mac os x') || ua.includes('macintosh')) {
    os = 'macos';
  } else if (ua.includes('linux')) {
    os = 'linux';
  } else if (ua.includes('android')) {
    os = 'android';
  } else if (ua.includes('iphone') || ua.includes('ipad')) {
    os = 'ios';
  }
  
  return {
    deviceType,
    browser,
    browserVersion,
    os
  };
}

/**
 * Parse referrer to categorize traffic source
 */
export function parseTrafficSource(referrer) {
  if (!referrer || referrer === 'direct') {
    return {
      sourceType: 'direct',
      source: 'direct',
      referrerDomain: null
    };
  }
  
  try {
    const url = new URL(referrer);
    const domain = url.hostname.replace('www.', '');
    
    // Search engines
    const searchEngines = {
      'google.com': 'Google',
      'google.': 'Google',
      'bing.com': 'Bing',
      'yahoo.com': 'Yahoo',
      'duckduckgo.com': 'DuckDuckGo',
      'baidu.com': 'Baidu',
      'yandex.com': 'Yandex'
    };
    
    for (const [key, name] of Object.entries(searchEngines)) {
      if (domain.includes(key)) {
        return {
          sourceType: 'search',
          source: name,
          referrerDomain: domain
        };
      }
    }
    
    // Social media
    const socialPlatforms = {
      'twitter.com': 'Twitter',
      'x.com': 'Twitter',
      'facebook.com': 'Facebook',
      'linkedin.com': 'LinkedIn',
      'reddit.com': 'Reddit',
      'instagram.com': 'Instagram',
      'youtube.com': 'YouTube',
      'tiktok.com': 'TikTok',
      'pinterest.com': 'Pinterest'
    };
    
    for (const [key, name] of Object.entries(socialPlatforms)) {
      if (domain.includes(key)) {
        return {
          sourceType: 'social',
          source: name,
          referrerDomain: domain
        };
      }
    }
    
    // GitHub
    if (domain.includes('github.com')) {
      return {
        sourceType: 'social',
        source: 'GitHub',
        referrerDomain: domain
      };
    }
    
    // Other referral
    return {
      sourceType: 'referral',
      source: domain,
      referrerDomain: domain
    };
  } catch (e) {
    return {
      sourceType: 'unknown',
      source: 'unknown',
      referrerDomain: referrer
    };
  }
}

/**
 * Get or create session ID
 */
export function getSessionId() {
  const SESSION_KEY = 'analytics_session_id';
  const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
  
  let sessionId = localStorage.getItem(SESSION_KEY);
  let sessionTimestamp = localStorage.getItem(`${SESSION_KEY}_time`);
  
  // Check if session expired (30 minutes of inactivity)
  if (sessionId && sessionTimestamp) {
    const timeSinceLastVisit = Date.now() - parseInt(sessionTimestamp);
    if (timeSinceLastVisit > SESSION_DURATION) {
      // Session expired, create new one
      sessionId = null;
    }
  }
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  
  // Update timestamp
  localStorage.setItem(`${SESSION_KEY}_time`, Date.now().toString());
  
  return sessionId;
}

/**
 * Check if visitor is new or returning
 */
export function getVisitorType() {
  const VISITOR_KEY = 'analytics_visitor_id';
  
  let visitorId = localStorage.getItem(VISITOR_KEY);
  const isNew = !visitorId;
  
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(VISITOR_KEY, visitorId);
  }
  
  return {
    visitorId,
    isNew
  };
}

/**
 * Get time pattern data
 */
export function getTimePatterns(timestamp) {
  const date = new Date(timestamp);
  
  return {
    hour: date.getHours(),
    dayOfWeek: date.getDay(), // 0 = Sunday, 6 = Saturday
    dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
    date: date.toISOString().split('T')[0]
  };
}

