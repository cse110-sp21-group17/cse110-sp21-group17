//make sure service workers are supported.

if ('serviceWorker' in navigator) {
    // console.log('service worker supported')
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('./sw_cached_site.js')
            .then(reg => console.log('Service worked registered'))
            .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
}

// router