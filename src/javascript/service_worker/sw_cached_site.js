const cacheName = 'v1';

//Call install event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
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
    event.respondWith(
        fetch(event.request)
            .then(res => {
                // make a clone of the response
                const resClone = response.clone();
                //open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        //add response to cache
                        cache.put(event.request, resClone);
                    });
                return res;
            }).catch(err => caches.match(event.request).then(res => res))
    );
});