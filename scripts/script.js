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
    router.setState("mainPage");

    fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry, id) => {
        let newPost = document.createElement('record-node');

        newPost.entry = entry;
        document.getElementsByClassName('record_view"').appendChild(newPost);
        // newPost.onclick = e => {
        //   setState("entry" + id);
        // }
      });
    });
  })
