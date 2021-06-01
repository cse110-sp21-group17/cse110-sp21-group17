const cacheName = 'v2';


//all files that need to be cached 
const cacheAssets = [
    'index.html',
    '/src/main.js',
    'style.css'
];
//Call install event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: cache pages');
                cache.addAll(cacheAssets) // assets to be added 
            })
            .then(() => self.skipWaiting())
    );
});

//Call activate event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    // clear out of use cache files
    event.waitUntil(
        event.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//Call fetch event
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching');
    event.respondWith(fetch(event.request).catch(() => cache.match(event.request)));

});