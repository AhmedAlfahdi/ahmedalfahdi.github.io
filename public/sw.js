// Service Worker for ahmedalfahdi.github.io
// Strategy: stale-while-revalidate for pages, cache-first for WASM & static assets
const CACHE_VERSION = 'alfahdi-site-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const WASM_CACHE = `${CACHE_VERSION}-wasm`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;

// ── Critical Numbat WASM files to pre-cache on install ──
const PRECACHE_WASM = [
  '/vendor/numbat/numbat_wasm.js',
  '/vendor/numbat/numbat_wasm_bg.wasm',
];

// ── Install: pre-cache WASM files so Numbat works offline immediately ──
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(WASM_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_WASM);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// ── Activate: clean old caches ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key.startsWith('alfahdi-site-') && key !== STATIC_CACHE && key !== WASM_CACHE && key !== PAGE_CACHE)
          .map((key) => caches.delete(key))
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// ── Fetch: route by URL pattern ──
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin and known CDN requests
  const isSameOrigin = url.origin === self.location.origin;
  const isCDN = url.hostname === 'cdn.jsdelivr.net';

  if (!isSameOrigin && !isCDN) return;

  // ── WASM files: cache-first (they're versioned, rarely change) ──
  if (isSameOrigin && url.pathname.startsWith('/vendor/numbat/')) {
    event.respondWith(cacheFirst(event.request, WASM_CACHE));
    return;
  }

  // ── Navigation (HTML pages): network-first, fallback to cache ──
  if (event.request.mode === 'navigate') {
    event.respondWith(networkFirst(event.request, PAGE_CACHE));
    return;
  }

  // ── Static assets & CDN: stale-while-revalidate ──
  // Covers CSS, JS, fonts, images, KaTeX, Mermaid, Pyodide, MapLibre
  event.respondWith(staleWhileRevalidate(event.request, STATIC_CACHE));
});

// ── Cache strategies ──

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Offline and not cached — must fail
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);

  // Return cached immediately, update cache in background
  const networkResponse = await fetchPromise;
  return networkResponse || cached || new Response('Offline', { status: 503 });
}
