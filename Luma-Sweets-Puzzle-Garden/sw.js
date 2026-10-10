/**
 * LUMA SWEETS: PUZZLE GARDEN
 * Offline PWA Service Worker (Cache-First Strategy)
 */

const CACHE_NAME = "luma-sweets-cache-v1";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./css/animations.css",
  "./js/config.js",
  "./js/audio.js",
  "./js/storage.js",
  "./js/levels.js",
  "./js/special-pieces.js",
  "./js/matching.js",
  "./js/board.js",
  "./js/boosters.js",
  "./js/rewards.js",
  "./js/level-map.js",
  "./js/ui.js",
  "./js/game.js",
  "./js/main.js",
  "./assets/images/background.jpg",
  "./assets/images/mascot.jpg",
  "./assets/images/icon-192.png",
  "./assets/images/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  // Guard against non-http schemes (e.g. chrome-extension or file URI)
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
