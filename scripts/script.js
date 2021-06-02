// stub. will be filled in with spa guts

import { router, gotoPage } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

window.addEventListener('popstate', (e) => {
    if (e.state == null) {
        setState("");
    } else {
        let state = e.state.page
        gotoPage(state)
    } 
  });

  window.addEventListener('load', function () {
      // if user already login in
   //router.setState("mainPage");

   
  })
