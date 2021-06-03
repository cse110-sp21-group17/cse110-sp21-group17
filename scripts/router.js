
export const router = {};
const body = document.querySelector("body");
var goalOptions = [];
var dateTasks = {};

import { FBService } from './FBService.js';


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

    let service = FBService.getInstance()

    if (state === "") {
        body.className = state;

    } else if (state.includes("createPage")) {
        // navigate to create page 

        let createPage = document.createElement("create-page");
        body.innerHTML = '';
        document.querySelector('body').appendChild(createPage);
        body.className = "create-page";
        createPage.page = goalOptions;
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


        service.getUserDateTasks((dateList)=>{
            let dates = Array.from( Object.keys(dateList))
            dateTasks = {};

            for (var i = 0; i < dates.length; i++) {
                let newPost = document.createElement('record-node');
                newPost.node = dateList[dates[i]]
                dateTasks[dates[i]] = dateList[dates[i]]

                document.querySelector("main-page").shadowRoot.querySelector('.record_view').appendChild(newPost);
            }
            mainPage.calender = dateTasks;

        }, (error) => {
             mainPage.calender = "";
        })

        goalOptions = [];
          // user's goal list to create plan view to update the right bottom view of the Main page
          service.getUserGoals((goalList)=>{
            let goals = Array.from(Object.keys(goalList))

            for (var i = 0; i < goals.length; i++) {
                let newPlan = document.createElement('plan-node');    
                newPlan.goal = goalList[goals[i]];

                goalOptions.push(goalList[goals[i]]);

                document.querySelector("main-page").shadowRoot.querySelector('.plan_view').appendChild(newPlan);
    
              }
          })

    } else {
        body.className = state;
    }
}

