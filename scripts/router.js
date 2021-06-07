import { openUserDB, getGoals, getDatedEntries } from "../src/userDB.js";

export const router = {};
const body = document.querySelector("body");

// state is either:
// { state: 'main', username: 'name here' }
// { state: 'main' } (use prev username
// { state: 'create' }
router.setState = function(state, back) { 
    if (state.state === 'create') {
        if (!back) {
            window.history.pushState(state, "create page", "#create");
        }

        // nav to create page
        let createPage = document.createElement("create-page");
        body.innerHTML = '';
        document.querySelector('body').appendChild(createPage);
        body.className = "create-page";
        createPage.page = "";
        if (state.length > 10) {
            let dateString = state.slice(10)
            createPage.date = new Date(dateString);
        }
    } else {
        if (!back) {
            window.history.pushState(state, "main page", "#main");
        }

        if ("username" in state) {
            router.username = state.username;
        }
        var username = router.username

        // remove the createPage stuff
        document.querySelectorAll("create-page").forEach(x => x.remove());
        
        // create the main page with an empty inner html
        let mainPage = document.createElement("main-page");
        body.innerHTML = '';
        document.querySelector('body').appendChild(mainPage);

        // fetch user's task/goal list to update the Left view of the Main page
        openUserDB(username);

        // goal list to create plan view to update the right bottom view of the Main page
        getGoals().then(goals => {
            console.log(goals);
            for (var i = 0; i < goals.length; i++) {
                let newPlan = document.createElement('plan-node');
                console.log("new goal " + goals[i].g.description);

                let completed = goals[i].ts.filter(x => x.isCompleted).length;
                let all = goals[i].ts.length;

                newPlan.goal = {
                    title: goals[i].g.description,
                    content: completed + "/" + all + " completed"
                };

                document.querySelector("main-page").shadowRoot.querySelector('.plan_view_content').appendChild(newPlan);
            }
        });

        // populate record view
        getDatedEntries()
            .then(d => {
                for (var date in d) {
                    let newPost = document.createElement('record-node');
                    newPost.node = { date: date, entries: d[date] };
                    document.querySelector("main-page").shadowRoot.querySelector('.record_view').appendChild(newPost);
                }
            });

        // populate calender [sic]
        getDatedEntries()
            .then(d => {
                Object.keys(d).map(function(key, index) {
                    d[key] = d[key].length + " entries";
                });

                mainPage.calender = d;
            });

    }
}


