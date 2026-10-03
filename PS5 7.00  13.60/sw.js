const CACHE_NAME = 'alaa-ps5-cache-v2';

const urlsToCache = [
  './',
  './index.html',
  './relapse.html',
  './payloads.js',
  './core.js',
  './exploit.js',
  './firmware.js',
  './int64.js',
  './kexp.js',
  './main.js',
  './mem.js',
  './payloads/elfldr-ps5-1360.elf',
  './rop.js',
  './rop_slave.js',
  './syscalls.js',
  './background.jpg',
  './offsets/10.00.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});