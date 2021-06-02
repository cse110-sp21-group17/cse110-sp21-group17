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
  
    set goal(goal) {
      var randomColor = Math.floor(Math.random()*16777215).toString(16);
      this.shadowRoot.querySelector('.plan').style.backgroundColor = randomColor;

      this.shadowRoot.querySelector('.plan-label').innerText = goal.name;
      this.shadowRoot.querySelector('.plan-content').innerText = "this is a node" + goal.content;

    }
  
  }
  
  customElements.define('plan-node', PlanNode);