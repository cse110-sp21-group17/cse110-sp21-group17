import { router } from '../scripts/router.js'; // Router imported so you can use it to manipulate your SPA app here

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
const setState = router.setState;

window.onpopstate = function(e) {
    if (e.state == null) {
        // no-op?
        // setState("");
    } else {
        setState(e.state, true);
    }
};

window.addEventListener('load', function () {
    // if user already login in
    // router.setState("createPage");
})
