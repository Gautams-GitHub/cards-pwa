// service-worker.js

const CACHE_NAME = 'pwa-card-app-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'manifest.json',
    'styles.css',
    'script.js',
    'data.json',
    'path/to/image1.jpg', // Replace with actual paths to your dummy images
    'path/to/image2.jpg'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
