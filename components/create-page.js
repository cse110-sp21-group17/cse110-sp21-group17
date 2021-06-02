// <plan-Node> custom web component
class CreatePage extends HTMLElement {
    constructor() {
      super();
      const template = document.createElement('template');

      template.innerHTML = `
          <style>
          .create-page {
            width: 100%;
            height: 100%;
            background-color: rgb(202, 235, 204);
        }

        .create-title {
            margin-top:20px;
            height: 30px;
            width:100%;
            text-align: center;
            font-size: 1.4rem;
            color: black;
            position:fixed;
            top:0;
        }
        
        .choose-area {
            margin-top:10px;
            margin-left:10%;
            width:80%;
            height:40px;
        }

        .choose-area button {
            margin-left: 30px;
            width: 80px;
            height: 35px;
            border: 1.5px solid gray;
            border-radius: 15px;
        }

        .choose-area button:active {
          color: rgb(157, 201, 160);
        }

        .choose-area button:hover{background-color:rgb(157, 201, 160);}

        .title-input {
            margin-top:3%;
            margin-left: 12%;
            width: 40%;
            height: 50px;
            border: 1.5px solid gray;
            border-radius: 15px;
            outline: none;
            font-size:1.2rem;
        }

        .date-pick{
          margin-top:3%;
          margin-left: 12%;
        }
        </style>
         <div class="create-title">ChimPlanzee</div>
         <div class="choose-area">
            <button class="choose-goal" >Goal</button>
            <button class="choose-task">Task</button>
            <button class="choose-node">Node</button>
         </div>
         <input class="title-input" placeholder="enter the title here"></input>
         <form class="date-pick">
                <label>
                    Enter the date:
                    <input class="choose-date" type="date" name="bday">
                </label>
          </form>
         </div>
            
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
  
    set page(info) {
      console.log("fjsdlkafjlkfajdsklfjaslkf");
      var goal_button = this.shadowRoot.querySelector(".choose-goal");
      var task_button = this.shadowRoot.querySelector(".choose-task");
      var note_button = this.shadowRoot.querySelector(".choose-node");

      console.log(goal_button);


      goal_button.addEventListener('click', function () {
        goal_button.style.backgroundColor = "orange";
        task_button.style.backgroundColor = "white";
        note_button.style.backgroundColor = "white";
      })

      task_button.addEventListener('click', function () {
        task_button.style.backgroundColor = "orange";
        goal_button.style.backgroundColor = "white";
        note_button.style.backgroundColor = "white";
      })

      note_button.addEventListener('click', function () {
        note_button.style.backgroundColor = "orange";
        goal_button.style.backgroundColor = "white";
        task_button.style.backgroundColor = "white";
      })

      goal_button.click();

    //   var randomColor = Math.floor(Math.random()*16777215).toString(16);
    //   this.shadowRoot.querySelector('.plan').style.backgroundColor = randomColor;

    //   this.shadowRoot.querySelector('.plan-label').innerText = goal.name;
    //   this.shadowRoot.querySelector('.plan-content').innerText = "this is a node" + goal.content;
    }


    set date(chooseDate) {
        // choose from the calendar
        console.log("=====Create date====" +  chooseDate);


    }
  
  }
  
  customElements.define('create-page', CreatePage);