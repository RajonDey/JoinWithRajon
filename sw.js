// sw.js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/images/fav/android-chrome-144x144.png",
        "/images/fav/android-chrome-192x192.png",
        "/images/fav/android-chrome-512x512.png",
        "/images/fav/apple-touch-icon.png",
        "/images/fav/favicon-32x32.png",
        "/images/fav/favicon-16x16.png",
        "/images/dev-black.png",
        "/images/hashnode.png",
        "/images/medium.png",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["v1"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
