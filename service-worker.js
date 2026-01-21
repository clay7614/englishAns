'use strict';

const CACHE_VERSION = 'v5';
const CACHE_NAME = `english-ans-cache-${CACHE_VERSION}`;
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './pwa.js',
  './manifest.webmanifest',
  './translation-fallbacks-ja.json',
  './601~750.csv',
  './601~750_ja.csv',
  './751~900.csv',
  './751~900_ja.csv',
  './901~1050.csv',
  './901~1050_ja.csv',
  './1051~1200.csv',
  './1051~1200_ja.csv',
  './glammer-2A.csv',
  './glammer-2A_ja.csv',
  './glammer-2B.csv',
  './glammer-2B_ja.csv',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          cacheRuntimeResponse(request, response.clone());
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          cacheRuntimeResponse(request, networkResponse.clone());
          return networkResponse;
        })
        .catch(() => cachedResponse);
      return cachedResponse || fetchPromise;
    })
  );
});

function cacheRuntimeResponse(request, response) {
  if (!response || response.status !== 200 || response.type === 'opaque') {
    return;
  }
  caches.open(CACHE_NAME).then((cache) => cache.put(request, response)).catch(() => {});
}
