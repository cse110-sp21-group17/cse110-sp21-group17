// <plan-Node> custom web component
import { Goal, Task, Note } from "../classes/entry_classes.js";
import { createEntry, getGoals } from "../storage/userDB.js";
import { router } from '../router/router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

class CreatePage extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');

        template.innerHTML = `
          <style>
          .create-page {
            width: 100%;
            height: 100%;
            background-color: red;
        }

        .create-title {
            margin-top:20px;
            height: 30px;
            width:100%;
            text-align: center;
            font-size: 1.4rem;
            color: black;
            z-index:-1;
            position:fixed;
            top:0;
        }
        
        .choose-area {
            margin-top:10px;
            margin-left:10%;
            width:80%;
            height:40px;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
        }

        .choose-area button {
            margin-left: 30px;
            width: 80px;
            height: 35px;
            border: 1.5px solid gray;
            border-radius: 15px;
            user-action:none;
        }

        .choose-area  .choose-node {
          /*display: none;*/
        }

        .choose-area button:active {
          color: rgb(157, 201, 160);
        }

        .choose-area button:hover{
          filter: brightness(80%);
          background-color: rgb(157, 201, 160);
        }

        .title-input {
            margin-top:3%;
            margin-left: 30%;
            width: 40%;
            height: 40px;
            border: 1.5px solid gray;
            border-radius: 15px;
            outline: none;
            font-size:1.2rem;
        }

        .date-pick{
          margin-top:3%;
          text-align:center;
        }

        .create-goal {
            margin-top:2%;
            margin-left: 1%;
            margin-top: 0%;
            width: 300px;
            margin-top: 2%;
            margin-bottom:15px;
            position: relative;
            display: inline-block;
            border: 1.5px solid gray;
            border-radius: 15px;
            height:40px;
            z-index: 999;
        }

        .create-goal .create_img {
          margin-top: 5px;
          margin-left:10px;
          width: 30px;
          height:30px;
      }

      .create-goal .create_label{
          position: absolute;
          z-index: 999;
          margin-left:40px;
          margin-top:10px;
          font-size:16px;
          left: 0;
          right: 0;
          top: 0%; 
          text-align: center;
          width: 220px; 
      }

      .goal-view {
        border: 1.5px solid gray;
        border-radius: 15px;
        outline: none;
        margin-left:20%;
        width:60%;
      }

      .goal-view .add-task-view {
          width: 80%;
          margin-left:1%;
          height: 100px;
      }

      .goal-view  .add-task-view .task-title {
        margin-left: 12%;
        width: 40%;
        height: 40px;
        border: 1.5px solid gray;
        border-radius: 15px;
        outline: none;
        font-size:1.0rem;
      }

      .goal-view  .add-task-view .title-input {
        margin-top:-6px;
        margin-left: 8%;
        width: 40%;
        height: 40px;
        border: 1.5px solid gray;
        border-radius: 15px;
        outline: none;
        font-size:1.2rem;
    }

      .goal-view  .add-task-view .date-pick{
        margin-top:1%;
        margin-left: 8%;
        z-index:999;
      }

      .goal-view  .add-task-view  .task-delete{
        float:right;
        margin-right: 50%;
        width:20px;
        height:20px;
      }

      .task-view {
        z-index: -1;
        border: 1.5px solid gray;
        border-radius: 15px;
        margin-left:20%;
        width:60%;
      }
      .task-view .create-task {
            margin-top:2%;
            margin-left: 2%;
            margin-top: 0%;
            width: 300px;
            margin-top: 2%;
            margin-bottom:15px;
            position: relative;
            display: inline-block;
            border: 1.5px solid gray;
            border-radius: 15px;
            height:40px;
            z-index: 999;
      }

      .task-view .create-task .create_img {
        margin-top: 5px;
        margin-left:10px;
        width: 30px;
        height:30px;
    }

      .task-view .create-task .create_label{
        position: absolute;
        z-index: 999;
        margin-left:40px;
        margin-top:10px;
        font-size:16px;
        left: 0;
        right: 0;
        top: 0%; 
        text-align: center;
        width: 250px; 
    }

    .task-view .subtask-view {
        width: 80%;
        margin-left:6%;
        height: 100px;
    }

    .task-view .task-title {
      margin-left: 12%;
      width: 40%;
      height: 40px;
      border: 1.5px solid gray;
      border-radius: 15px;
      outline: none;
      font-size:1.0rem;
    }

    .task-view .title-input {
      margin-top:-6px;
      margin-left: 2%;
      width: 40%;
      height: 40px;
      border: 1.5px solid gray;
      border-radius: 15px;
      outline: none;
      font-size:1.2rem;
  }

    .task-view .date-pick{
      margin-top:1%;
      margin-left: 2%;
      z-index:999;
    }

    .task-view .subtask-delete{
      float:right;
      margin-right: 54%;
      width:20px;
      height:20px;
    }
      .note-title {
        display: none;
        margin-left: 12%;
      }
      .choose-goal-title{
        margin-left:2%;
      }

      .note-area {
        margin-top:5px;
        margin-left: 5%;
        height:20%;
        width:40%;
          box-sizing:border-box;
          display:block;
          max-width:50%;
          line-height:1.5;
          padding:15px 15px 30px;
          border-radius:3px;
          border:1px solid #F7E98D;
          font:13px;
          box-shadow:0 4px 6px rgba(0,0,0,0.1);
          background:linear-gradient(#F9EFAF, #F7E98D);
          background:-o-linear-gradient(#F9EFAF, #F7E98D);
          background:-ms-linear-gradient(#F9EFAF, #F7E98D);
          background:-moz-linear-gradient(#F9EFAF, #F7E98D);
        background:-webkit-linear-gradient(#F9EFAF, #F7E98D);
      }

      .hint-label {
        color:red;
        font-size:0.8rem;
        height:12px;
        text-align:center;
      }

      .submit-button {
        margin-top:10px;
        margin-left: 40%;
        width: 20%;
        height: 40px;
        border: 1.5px solid gray;
        border-radius: 15px;
        outline: none;
        font-size:1.0rem;
      }

      .submit-button:hover {
        filter: brightness(80%);
        background-color: rgb(157, 201, 160);
      }

        </style>


         <div class="create-title">ChimPlanzee</div>
         <div class="choose-area">
            <button class="choose-goal" >Goal</button>
            <button class="choose-task">Task</button>
            <button  class="choose-node">Note</button>
            <button class="choose-event">Event</button>
         </div>
         <input class="title-input" placeholder="enter the title here"></input>
         <form class="date-pick">
                <label>
                    Choose the date:
                    <input class="choose-date" type="date" name="bday">
                </label>
          </form>
         </div>
         <div class="goal-view">
            <div class="create-goal">
              <img class="create_img" src="./src/images/create.png"> </img>
              <p class="create_label">Create/add task for this goal</p>
            </div>
            <div class="add-task-view"> 
                <img class="task-delete" src="./src/images/delete.png"></img>
                 <input class="title-input" placeholder="enter the task title"></input>
                 <form class="date-pick">
                   <label>
                       Choose the task date:
                       <input class="choose-date-task" type="date" name="bday">
                   </label>
                  </form>
            </div>
         </div>

         <div class="task-view">
              <div class="create-task">
                  <img class="create_img" src="./src/images/create.png"> </img>
                  <p class="create_label">Create/add sub task for this task</p>
              </div>
              <div class="subtask-view">
                  <img class="subtask-delete" src="./src/images/delete.png"></img>
                  <input class="title-input" placeholder="enter the sub-task title"></input>
                  <form class="date-pick">
                  <label>
                      Choose the sub-task date:
                     <input class="choose-date-subtask" type="date" name="bday">
                  </label>
                  </form>
              </div>
              <h4 class="choose-goal-title">Choose Goal:
                  <select class="choose-goal-list">
                      <option value="0">No Goal</option>
                  </select>
              </h4>
         </div>
         <h4 class="note-title">Add note here:
          <textarea class="note-area" placeholer="add your note"> </textarea>
         </h4>

         <div class="hint-label"></div>
         <button class="submit-button"> Submit</button>

        </div>
          `;
        
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    
    get page() {
        let nodeObj = {
            'title': this.shadowRoot.querySelector('.plan-label').innerText,
            'content': this.shadowRoot.querySelector('.plan-content').innerText,
        };
        
        return property;
    }
    
    // on router.js file's  "gotoPage" function state "createPage"
    set page(info) {
        this.initialButtons();

    }


    set date(chooseDate) {
        // choose from the calendar
        console.log("=====Create date====" +  chooseDate);
    }

    initialButtons() {
        this.setupTaskAndGoalButton()

        this.setupAddTaskButton();

        //var goadlOptions = ["Family Goal", "Fitness Goal", "Study Goal"]
        getGoals().then(goals => {
          console.log(goals);
          let names = [];
          for(let i = 0; i < goals.length; i++)
          {
            console.log(goals[i].g.description);
            names.push(goals[i].g.description);
          }
          this.addGoalOptions(names);
        });
        //console.log(goalOptions);
        //this.addGoalOptions(goadlOptions);
        
        this.setUpSubmitButton();
        
        
        
        //tap submit button
    }

    setUpSubmitButton() {
        let submit_button = this.shadowRoot.querySelector(".submit-button");
        let goal_view =  this.shadowRoot.querySelector(".goal-view");
        let task_view =  this.shadowRoot.querySelector(".task-view");
        let note_button = this.shadowRoot.querySelector(".choose-node");
        let title_label =  this.shadowRoot.querySelector(".title-input");
        let select_date  = this.shadowRoot.querySelector(".choose-date");

        let hint_label = this.shadowRoot.querySelector(".hint-label");
        hint_label.style.height = "0px";
        let _this = this

        submit_button.addEventListener('click', function () {
            if (goal_view.hidden == false) { // current in the create goal view
                console.log("Goal name:" + title_label.value + ", goal date:" + select_date.value )

                if (title_label.value.length ==0) {
                    hint_label.style.height = "20px";
                    hint_label.innerHTML = "* Goal Title can not be empty";
                    return;
                } else {
                    hint_label.innerHTML = "";
                    hint_label.style.height = "0px";
                }

                if (select_date.value.length ==0) {
                    hint_label.style.height = "20px";
                    hint_label.innerHTML = "* Goal Date can not be empty";
                    return;
                } else {
                    hint_label.innerHTML = "";
                    hint_label.style.height = "0px";
                }

                let task_views = _this.shadowRoot.querySelectorAll(".add-task-view")
                for (let i = 0; i < task_views.length; i++) {
                    let task_title = task_views[i].querySelector(".title-input")  // task-title
                    let task_date = task_views[i].querySelector(".choose-date-task")//task-date
                    if (task_title.value.length > 0 && task_date.value.length > 0) {
                        // add task to this goal to submit
                        console.log("Task name: " + task_title.value + " task date: " + task_date.value)

                        createEntry(new Task(task_title.value, "", new Date(task_date.value), title_label.value));
                    }
                }

                let node_text = _this.shadowRoot.querySelector(".note-area");
                console.log("node for this goal and tasks are " + node_text.value);

                createEntry(new Goal(title_label.value, "", new Date(select_date.value)));

                //fetch create a new goal api
                // after success navigate to mainpage
                // window.history.back();
                setState({ state: 'main' });
            } else if( task_view.hidden == false) {
                if (title_label.value.length ==0) {
                    hint_label.style.height = "20px";
                    hint_label.innerHTML = "* Task Title can not be empty";
                    return;
                } else {
                    hint_label.innerHTML = "";
                    hint_label.style.height = "0px";
                }
                
                if (select_date.value.length ==0) {
                    hint_label.style.height = "20px";
                    hint_label.innerHTML = "* Task Date can not be empty";
                    return;
                } else {
                    hint_label.innerHTML = "";
                    hint_label.style.height = "0px";
                }
                
                let goal = _this.shadowRoot.querySelector('.choose-goal-list');
                console.log("Task name:" + title_label.value + ", Task date:" + select_date.value )

                let subtask_views = _this.shadowRoot.querySelectorAll(".subtask-view")
                for (let i = 0; i < subtask_views.length; i++) {
                    let task_title = subtask_views[i].querySelector(".title-input")  // task-title
                    let task_date = subtask_views[i].querySelector(".choose-date-subtask")//task-date
                    if (task_title.value.length > 0 && task_date.value.length > 0) {
                        // add task to this goal to submit
                        console.log("Sub Task name: " + task_title.value + "Sub task date: " + task_date.value)
                    }
                }
                let options = _this.shadowRoot.querySelector('.choose-goal-list')
                console.log("Goal options is " + options.value);
                let node_text = _this.shadowRoot.querySelector(".note-area");
                console.log("node for this goal and tasks are " + node_text.value);

                createEntry(new Task(title_label.value, "", new Date(select_date.value), goal.value ));
                // window.history.back();
                setState({ state: 'main' });
            }
            else if (note_button.style.backgroundColor == "orange"){
              if (title_label.value.length ==0) {
                hint_label.style.height = "20px";
                hint_label.innerHTML = "* Note Title can not be empty";
                return;
            } else {
                hint_label.innerHTML = "";
                hint_label.style.height = "0px";
            }
            
            if (select_date.value.length ==0) {
                hint_label.style.height = "20px";
                hint_label.innerHTML = "* Note Date can not be empty";
                return;
            } else {
                hint_label.innerHTML = "";
                hint_label.style.height = "0px";
            }
                console.log('creating note' + title_label.value + 'date:' + select_date.value);
                createEntry(new Note(title_label.value, new Date(select_date.value)));

                setState({state: 'main'});
            }
            else{
              if (title_label.value.length ==0) {
                hint_label.style.height = "20px";
                hint_label.innerHTML = "* Event Title can not be empty";
                return;
            } else {
                hint_label.innerHTML = "";
                hint_label.style.height = "0px";
            }
            
            if (select_date.value.length ==0) {
                hint_label.style.height = "20px";
                hint_label.innerHTML = "* Event Date can not be empty";
                return;
            } else {
                hint_label.innerHTML = "";
                hint_label.style.height = "0px";
            }
                console.log('creating Event' + title_label.value + 'date:' + select_date.value);
                createEntry(new Event(title_label.value, new Date(select_date.value)));

                setState({state: 'main'});
            }
        });
        
    }
    

    setupTaskAndGoalButton() {
        let goal_button = this.shadowRoot.querySelector(".choose-goal");
        let task_button = this.shadowRoot.querySelector(".choose-task");
        let note_button = this.shadowRoot.querySelector(".choose-node");
        let event_button = this.shadowRoot.querySelector(".choose-event");
        let goal_view =  this.shadowRoot.querySelector(".goal-view");
        let task_view =  this.shadowRoot.querySelector(".task-view");

        let title_label =  this.shadowRoot.querySelector(".title-input");
        let select_date  = this.shadowRoot.querySelector(".choose-date");

        let _this = this

        goal_button.addEventListener('click', function () {
            goal_button.style.backgroundColor = "orange";
            task_button.style.backgroundColor = "white";
            note_button.style.backgroundColor = "white";
            event_button.style.backgroundColor = "white";
            goal_view.hidden = false;
            goal_view.style.zIndex = "1000"
            task_view.style.zIndex = "-1"
            task_view.hidden = true;
            title_label.value = ""
            select_date.value = ""
        })
        
        task_button.addEventListener('click', function () {
            task_button.style.backgroundColor = "orange";
            goal_button.style.backgroundColor = "white";
            note_button.style.backgroundColor = "white";
            event_button.style.backgroundColor = "white";
            goal_view.hidden = true;
            task_view.hidden = false;
            task_view.style.zIndex = "1000"
            goal_view.style.zIndex = "-1"
            title_label.value = ""
            select_date.value = ""
        })
        
        note_button.addEventListener('click', function () {
            note_button.style.backgroundColor = "orange";
            goal_button.style.backgroundColor = "white";
            task_button.style.backgroundColor = "white";
            event_button.style.backgroundColor = "white";
            goal_view.hidden = true;
            task_view.hidden = true;
        
        })
        
        event_button.addEventListener('click', function () {
            note_button.style.backgroundColor = "white";
            goal_button.style.backgroundColor = "white";
            task_button.style.backgroundColor = "white";
            event_button.style.backgroundColor = "orange";
            goal_view.hidden = true;
            task_view.hidden = true;
        })

        goal_button.click();
    }

    setupAddTaskButton() {
        let goal_create_button = this.shadowRoot.querySelector(".create-goal");  
        let task_create_button = this.shadowRoot.querySelector(".create-task");  

        let _this = this

        this.shadowRoot.querySelector(".add-task-view").querySelector('.task-delete').hidden = true;
        this.shadowRoot.querySelector(".subtask-view").querySelector('.subtask-delete').hidden = true;

        
        // create task for goal
        goal_create_button.addEventListener('click', function () {
            console.log("create task for goal");
            let goal_view = _this.shadowRoot.querySelector(".goal-view");
            let create_task_view =  _this.shadowRoot.querySelector(".add-task-view").cloneNode(true);
            create_task_view.classList.add('add-task-view')
            let task_title = create_task_view.querySelector(".title-input")  // task-title
            let task_date = create_task_view.querySelector(".choose-date-task")//task-date

            task_title.value = "";
            task_date.value = "";

            goal_view.appendChild(create_task_view);
            create_task_view.querySelector('.task-delete').hidden = false;

            

            let delete_button = create_task_view.querySelector('.task-delete')
            delete_button.addEventListener('click', function() {
                create_task_view.remove();
            })
        })

        // create subtask for goal
        task_create_button .addEventListener('click', function () {
            console.log("create subtask for task");
            let task_view = _this.shadowRoot.querySelector(".task-view");
            let option_choose = _this.shadowRoot.querySelector(".choose-goal-title");

            let create_sub_task_view =  _this.shadowRoot.querySelector(".subtask-view").cloneNode(true);
            create_sub_task_view.classList.add('subtask-view')

            task_view.insertBefore(create_sub_task_view, option_choose);


            create_sub_task_view.querySelector('.subtask-delete').hidden = false;
            let delete_button = create_sub_task_view.querySelector('.subtask-delete')
            delete_button.addEventListener('click', function() {
                create_sub_task_view.remove();

            })

        })

    }

    addGoalOptions(options) {
        let select = this.shadowRoot.querySelector('.choose-goal-list')
        for (let i = 0; i<options.length; i++){
            let opt = document.createElement('option');
            opt.value = i+1;
            opt.innerHTML = options[i];
            select.appendChild(opt);
        }
    }
    
}


customElements.define('create-page', CreatePage);
