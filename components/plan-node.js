// <plan-Node> custom web component
class PlanNode extends HTMLElement {
    constructor() {
      super();
  
      const template = document.createElement('template');
  
      template.innerHTML = `
          <style>
              .plan {
                  background-color: rgb(157, 201, 160);
                  margin-top:2%;
                  margin-left:10%;
                  margin-right:10%;
                  width:80%;
                  height:50px;
                  border: 1.5px solid gray;
                  border-radius: 15px;
                  margin-bottom:25px;
              }

              .plan:hover {
                filter: brightness(80%);
                background-color: rgb(157, 201, 160);
                cursor: pointer;
              }
              
              .plan .plan-label {
                  margin-top:5px;
                  margin-left:5%;
                  font-size:16px;
                  text-color: black;
              }
             
              .plan .plan-content {
                margin-left:5%;
                font-size:13px;
                text-color: black;
            }

          </style>
          <div class="plan">
              <div class="plan-label"></div>
              <div class="plan-content"></div>
          </div>
          `;
  
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  
    get goal() {
      let nodeObj = {
        'title': this.shadowRoot.querySelector('.plan-label').innerText,
        'content': this.shadowRoot.querySelector('.plan-content').innerText,
      };
  
      return property;
    }
  
        // Just like the entry-page  Update the Goals by the Goal-list ----- on router.js file's  "gotoPage" function state "mainPage"
    set goal(goal) {
      let min = 0;
      let max = pastels.length;
      let randomIndex = Math.floor(Math.random() * (max - min) + min);
      this.shadowRoot.querySelector('.plan').style.backgroundColor = pastels[randomIndex];
      this.shadowRoot.querySelector('.plan-label').innerText = goal.name;
      this.shadowRoot.querySelector('.plan-content').innerText = "this is a node" + goal.content;

    }
  
  }

  let pastels = ["ABDEE6", "CBAACB", "FFFFB5", "FFCCB6","F3B0C3","C6DBDA","FEE1E8","FED7C3", "F6EAC2",
                  "ECD5E3", "FF968A", 'FFAEA5' , 'FFC5BF' , 'FFD8BE', 'FFC8A2', 'D4F0F0', '8FCACA',
                  'CCE2CB', 'B6CFB6', '97C1A9', 'FCB9AA' , 'FFDBCC' , 'ECEAE4', 'A2E1DB', '55CBCD'];
  
  customElements.define('plan-node', PlanNode);