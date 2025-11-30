const CACHE_NAME = 'review-tracker-v1';
// List all files that must be cached for offline use.
// CRITICAL: Ensure all external URLs (CDNs) and all local JS files are listed.
const urlsToCache = [
    // Main structural files
    '/', 
    'index.html',
    // External CSS & JS Libraries (Required for functionality)
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/lucide@latest',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
    // Local Subject Logic Files
    'rem_logic.js', 
    'crim_logic.js',
    'lab_logic.js',
    'civ_logic.js',
    'comm_logic.js',
    'poli_logic.js',
    // Static Assets from GitHub URLs
    'https://raw.githubusercontent.com/ariiannemay/2026-USACOL-Comprehensive-Exam-Tracker/main/usacol%20logo.png',
    'https://raw.githubusercontent.com/ariiannemay/2026-USACOL-Comprehensive-Exam-Tracker/main/USA.png',
    'https://raw.githubusercontent.com/ariiannemay/2026-USACOL-Comprehensive-Exam-Tracker/main/missattycpa.PNG',
    'https://img.freepik.com/free-vector/blank-cream-notepaper-design_53876-97377.jpg?semt=ais_hybrid&w=740&q=80'
];

// 1. Installation: Cache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('[ServiceWorker] Caching App Shell');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// 2. Fetching: Intercept requests and serve cached content
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) { return response; }
            return fetch(event.request);
        })
    );
});

// 3. Activation: Delete old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[ServiceWorker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
