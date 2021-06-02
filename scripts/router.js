
export const router = {};
const body = document.querySelector("body");


router.setState = function(state) { 
    body.className = state;
    if (state === "") {

    } else if (state.includes("mainPage")) {
        window.history.pushState({page: state}, "main page", "mainpage");
        gotoPage(state)
    } else if (state.includes("createPage")) {
        window.history.pushState({page: state}, "create page", "createPage");
        gotoPage(state)
    } else {

    }
}

export function gotoPage(state) {
    
    if (state === "") {
        body.className = state;

    } else if (state.includes("createPage")) {
        // navigate to create page 

        let createPage = document.createElement("create-page");
        body.innerHTML = '';
        document.querySelector('body').appendChild(createPage);
        body.className = "create-page";
        createPage.page = "";
        if (state.length > 10) {
            let dateString = state.slice(10)
            createPage.date = new Date(dateString);
        }

    } else if (state.includes("mainPage")) {

        let mainPage = document.createElement("main-page");
        body.innerHTML = '';
        document.querySelector('body').appendChild(mainPage);
        body.className = "main-page";

        // user's goal list to create plan view to update the right TOP month view of the Main page
        mainPage.calender = "";
        

        // fetch user's task/goal list to update the Left view of the Main page
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

          // user's goal list to create plan view to update the right bottom view of the Main page
          var goals = []; // fake datas;
          goals.push({
            name:   "Goal 1",
            content: "6/14 done, 2 due this week"
          });
          goals.push({
            name:   "Goal 2",
            content: "6/24 done, 3 due this week"
          });

          goals.push({
            name:   "Goal 3",
            content: "6/24 done, 3 due this week"
          });

          goals.push({
            name:   "Goal 4",
            content: "6/24 done, 3 due this week"
          });

          goals.push({
            name:   "Goal 5",
            content: "6/24 done, 3 due this week"
          });

          goals.push({
            name:   "Goal 6",
            content: "6/24 done, 3 due this week"
          });


          for (var i = 0; i < goals.length; i++) {
            let newPlan = document.createElement('plan-node');
            console.log("new plan " + goals[i].name);

            newPlan.goal = goals[i];
            document.querySelector("main-page").shadowRoot.querySelector('.plan_view').appendChild(newPlan);

          }

        });


        //

    } else {
        body.className = state;
    }
}

