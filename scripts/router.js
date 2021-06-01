
export const router = {};
const body = document.querySelector("body");


router.setState = function(state) { 
    body.className = state;
    if (state === "") {

    } else if (state.includes("mainPage")) {
        window.history.pushState({page: state}, "main page", "mainpage");
        gotoPage(state)
    } else {

    }
}

export function gotoPage(state) {
    console.log("click navigate" + state);
    if (state === "") {
        body.className = state;

    } else if (state.includes("mainPage")) {

        let mainPage = document.createElement("main-page");
        body.innerHTML = '';
        document.querySelector('body').appendChild(mainPage);
        body.className = "main-page";
        mainPage.calender = "";

        // fetch user's task/goal list~~~~~~
        fetch('https://cse110lab6.herokuapp.com/entries')
        .then(response => response.json())
        .then(entries => {
          entries.forEach((node, id) => {
            let newPost = document.createElement('record-node');
            newPost.node = node;
            document.querySelector("main-page").shadowRoot.querySelector('.record_view').appendChild(newPost);
            
            // newPost.onclick = e => {
            //   setState("entry" + id);
            // }
          });
        });

    } else {
        body.className = state;
    }
}

